import { Outlet, useNavigation } from "react-router-dom"
import CartOverview from "../features/cart/CartOverview"
import Header from "./Header"
import Loader from "./Loader"

export default function AppLayout() {
    const navigate = useNavigation()
   
    const isLoading = navigate.state === "loading"
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] bg-slate-200">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-y-scroll">
        <main className="max-w-3xl mx-auto">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}
