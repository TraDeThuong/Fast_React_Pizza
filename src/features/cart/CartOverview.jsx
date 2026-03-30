import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {getTotalCartQuantity, getTotalCartPrice} from "./cartSlice"
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector (getTotalCartQuantity)
  const totalCartPrice = useSelector (getTotalCartPrice)

  if (!totalCartQuantity) return null
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <p className ="flex items-center gap-6 text-sm sm:text-base font-medium">
        <span className="text-amber-400 font-semibold">{totalCartQuantity} pizzas</span>
        <span className="text-gray-200">{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link 
        to = "./cart"
        className="bg-amber-600 px-5 py-2 rounded-full font-medium hover:bg-amber-700 transition"> 
          Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
