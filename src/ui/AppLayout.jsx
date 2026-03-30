import { Outlet, useNavigation} from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";


export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading"
  return (
    <div className="min-h-screen bg-amber-300 grid grid-rows-[auto_1fr_auto] h-full">
      {isLoading && <Loader />}
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">
        <Outlet />
      </main>
      <CartOverview />
    </div>
  )
}
