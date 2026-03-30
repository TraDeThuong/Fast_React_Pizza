import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const username = useSelector((state)=>state.user.username)
  const cart = useSelector(getCart)
  const dispatch = useDispatch ()

  if (!cart.length) return <EmptyCart/>

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6 mb-20">
  
    <LinkButton to = "/menu">
      &larr; Back to menu
    </LinkButton>

    <h2 className="text-2xl font-bold text-gray-800">
      Your cart, <span className="text-amber-600">{username}</span>
    </h2>

    <ul className = "divide-y divide-stone-300 m-2">
      {cart.map ((item) => (
        <CartItem item = {item} key = {item.id} />
      ))}
    </ul>

    <div className="flex items-center justify-between gap-4">

      <LinkButton to = "/order/new" variant='primary'>
        Order pizzas
      </LinkButton>

      <button 
        onClick={() => dispatch(clearCart())}
        className="border border-gray-300 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100 transition">
        Clear cart
      </button>

    </div>

  </div>
  );
}

export default Cart;
