import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import store from "../../store";
import { clear, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { getUser } from "../user/userSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const navigate = useNavigation();
  const dispatch = useDispatch()
  const [withPriority, setWithPriority] = useState(false);
  const isSubmitting = navigate.state === "submitting";
  const formError = useActionData();

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priorityPrice;

  const cart = useSelector(getCart);
  const {username , status : addressStatus , position , address , error : errorAddress} = useSelector(getUser);
  const isLoadingAddress = addressStatus === "loading"
   console.log(address)
  function handleGetUserPosition (e){
      e.preventDefault()
      dispatch(fetchAddress())
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div>
      <h2 className="pb-5">Ready to order? Let go!</h2>

      <Form className="space-y-5 px-5" method="POST">
        <div className="flex flex-col md:gap-20 md:flex-row md:items-center">
          <label className="font-semibold w-28">First Name</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="customer"
              required
              defaultValue={username}
            />
          </div>
        </div>

        <div className="flex flex-col md:gap-20 md:flex-row md:items-center">
          <label className="font-semibold w-28">Phone number</label>
          <div className="grow">
            <input className="input" type="tel" name="phone" required />
          </div>
          {formError?.phone && (
            <p className="bg-red-300 rounded-full px-3 py-2 mt-2 border border-red-600">
              {formError.phone}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 md:gap-20 md:flex-row md:items-center">
          <label className="font-semibold w-28">Address</label>
          <div className="grow">
            <input
              className="input"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="bg-red-300 rounded-full px-3 py-2 mt-2 border border-red-600">
                {errorAddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <div className="">
              <Button type="small" onClick={handleGetUserPosition}>
                Get Position
              </Button>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-start gap-2 md:flex-row">
          <label htmlFor="priority">Want to yo give your order priority?</label>
          <input
            className="h-6 w-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-100 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <input type="hidden" name="position" value={position.latitude && position.longitude ? `${position.latitude} , ${position.longitude}` : ""}/>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting || isLoadingAddress
              ? "Placing order "
              : `Order Now ${withPriority ? formatCurrency(totalPrice) : ""}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  console.log(order);
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number . We might need it to contact you";
  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect
  const newOrder = await createOrder(order);
  store.dispatch(clear());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
