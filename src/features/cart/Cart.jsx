import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clear, getCart } from './cartSlice';
import { getUser } from '../user/userSlice';
import EmptyCart from "./EmptyCart"



function Cart() {
  const dispatch = useDispatch()
  function handleClearCart(e){
    e.preventDefault()
    dispatch(clear())

  }
  const cart = useSelector(getCart);
  const {username} = useSelector(getUser)

  const user = useSelector((state)=>state.user)
  console.log(user)

  if(!cart.length ) return <EmptyCart/>

  return (
    <div className="px-3 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="pb-5 pt-5 text-xl font-semibold">Your cart, {username}</h2>
      <ul className='mt-3 divide-y-2 divide-white border-b bg-slate-400 px-3 rounded-3xl text-white'>
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>
      <div className="space-x-5 py-5 text-right">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="primary" onClick={handleClearCart}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
