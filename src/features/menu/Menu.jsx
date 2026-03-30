import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem"

function Menu() {
  const menu = useLoaderData()
  return <ul className="max-w-4xl mx-auto space-y-4 mt-6 mb-15">
    {menu.map((pizza) => (
      <MenuItem pizza = {pizza} key = {pizza.id}/>
    ))}
  </ul>;
}

export async function loader () {
  const menu = await getMenu ()
  return menu;
}

export default Menu;
