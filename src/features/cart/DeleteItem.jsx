import { useDispatch } from "react-redux"
import Button from "../../ui/Button"
import { deleteItem } from "./cartSlice"
export default function DeleteItem({pizzaId}) {

    const dispatch = useDispatch()

  return (
    <div className = "w-20">
        <Button 
            onClick = {() => dispatch (deleteItem(pizzaId))}
            type = "primary"> Delete </Button>
    </div>
  )
}
