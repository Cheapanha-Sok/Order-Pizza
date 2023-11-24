import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";
export default function Header() {
  return (
    <header className="flex justify-between text-[12px] md:text-base uppercase bg-yellow-500 font-semibold py-3 px-3 md:px-5 md:py-5 border-b border-stone-500">
      <Link className="tracking-widest" to="/">
        Fast React Pizza
      </Link>
      <SearchOrder />
      <UserName/>
    </header>
  );
}
