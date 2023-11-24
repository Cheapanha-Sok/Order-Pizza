import { formatCurrency } from "../../utils/helpers";
import DeleteCart from "./DeleteCart";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice, imageUrl } = item;
  

  return (
    <li className="sm:flex sm:justify-between sm:items-center py-3">
      <div className="flex gap-5 flex-row">
        <img className="w-30 h-20 rounded-lg " src={imageUrl} alt="pizzaImage" />
        <p className="font-semibold mb-1 sm:mb-0">
          {quantity}&times; {name}
        </p>
      </div>

      <div className="flex items-center justify-between sm:gap-4">
        <p>{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={quantity} />
        <DeleteCart pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
