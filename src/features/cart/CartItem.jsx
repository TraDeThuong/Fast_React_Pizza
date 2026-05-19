import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { useSelector } from "react-redux";
import { getCurrentQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currenQuantity = useSelector (getCurrentQuantityById(pizzaId))

  return (
    <li className="flex items-center justify-between bg-amber-50 px-4 py-4 rounded-xl shadow-sm my-4">
      <p className="flex-1 text-gray-800 font-medium">
        <span className="text-amber-600 font-semibold"> {quantity}&times; {name} </span>
      </p>
      <div className = "w-28 text-right mx-3">
        <p className="text-gray-900 font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
      <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currenQuantity}/>
      <DeleteItem pizzaId = {pizzaId}/>
    </li>
  );
}

export default CartItem;
