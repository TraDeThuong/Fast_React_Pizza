import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";
export default function Header() {
  return (
    <header className="bg-amber-600 w-full shadow-md sticky top-0 z-10 border-b-3 border-amber-900">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="md:text-xl font-bold text-white tracking-widest uppercase text-[15px]"
        >
          🍕 Fast React Pizza Co.
        </Link>

        <div className="flex-1 px-6">
          <SearchOrder />
        </div>

        <UserName />


      </div>
    </header>
  );
}