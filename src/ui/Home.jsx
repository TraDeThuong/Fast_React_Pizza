
import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser"
import Button from "../ui/Button"
function Home() {
   const username = useSelector((state)=>state.user.username)

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">

      <h1 className="mb-4 text-4xl md:text-5xl font-bold text-gray-800 leading-tight max-w-2xl"> The best pizza. </h1>
      <h2 className="text-amber-600 text-3xl md:text-medium"> Straight out of the oven, straight to you.</h2>

      <p className="mt-4 text-gray-600 max-w-xl mb-6">
        Fresh ingredients, fast delivery, and flavors you’ll never forget.
      </p>

      <div className="mt-8 w-full max-w-md m-2">
        {username==="" 
          ? <CreateUser />
          : <Button to = "/menu" type = "primary"> Continue ordering, {username} </Button>}
      </div>

    </div>
  );
}

export default Home;