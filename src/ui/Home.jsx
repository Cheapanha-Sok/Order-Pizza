import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser"
import Button from "./Button";

function Home() {

  const userName = useSelector((state)=>state.user.username)

  return (
    <div className="text-center space-y-10 px-4 md:px-0 text-sm md:text-3xl">
      <h1 className="text-center font-semibold text-stone-800 py-5">
        The best pizza.
        <br />
        <span className="text-yellow-500">Straight out of the oven, straight to you.</span>
      </h1>
      {userName === ''? (<CreateUser/>) : (<Button to="/menu" type="primary">Continues ordering ,{userName}</Button>)}
    </div>
  );
}

export default Home;
