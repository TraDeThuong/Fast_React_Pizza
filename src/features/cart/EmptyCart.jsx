import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
      <Link
        to="/menu"
        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
      >
        &larr; Back to menu
      </Link>

      <p className="text-lg font-semibold text-stone-700">
        Your cart is still empty.
      </p>

      <p className="text-sm text-stone-500">
        Start adding some pizzas 🍕
      </p>

      <Link
        to="/menu"
        className="mt-4 inline-block rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-stone-800 transition hover:bg-yellow-300"
      >
        Browse menu
      </Link>
    </div>
  );
}

export default EmptyCart;