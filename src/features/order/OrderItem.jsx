import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="bg-white rounded-xl shadow-sm px-4 py-3 hover:shadow-md transition space-y-1">
      <div className="flex items-center justify-between">
        <p className="text-gray-800">
          <span className="text-amber-600 font-semibold mr-1">{quantity}&times;</span> {name}
        </p>
        <p className="font-medium">{formatCurrency(totalPrice)}</p>
      </div>
      <p className = "text-sm capitalize italic text-stone-500">
        {isLoadingIngredients ? 'Loading...' : ingredients.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
