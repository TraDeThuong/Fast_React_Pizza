// import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { Children } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getTotalCartPrice } from "../cart/cartSlice";
// import {store} from "../../Store"
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  // const cart = fakeCart;
  const navigate = useNavigation ();
  const isSubmitting = navigate.state === "submitting"
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress
  } = useSelector((state)=>state.user)

  const isLoadingAddress = addressStatus === "loading"


  const cart = useSelector(getCart)
  const formErrors = useActionData()

  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priorityPrice

  const dispatch = useDispatch()

  if (!cart.length) return <EmptyCart/>

  return (
    <div className = "max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className = "text-3xl font-bold text-amber-600 text-center pb-6">Ready to order? Let's go!</h2>
      <Form method = "POST" className = "space-y-5" action="/order/new" >
        <div className = "flex gap-4 items-start">
          <label className = "pt-2 min-w-30 block text-md font-medium text-gray-400 mb-1">First Name</label>
          <input 
            type="text" 
            name="customer" 
            defaultValue = {username}
            required 
            className="input"/>
        </div>

        <div className = "flex gap-4 items-start">
          <label className = "pt-2 min-w-30 block text-md font-medium text-gray-400 mb-1">Phone number</label>
          <div className = "flex-1">
            <input 
              type="tel" 
              name="phone" 
              required 
              className="input"/>
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div className = "flex gap-4 items-start relative">
          <label className = "pt-2 min-w-30 block text-md font-medium text-gray-400 mb-1">Address</label>
          <div className = "flex-1">
            <input 
              type="text" 
              name="address" 
              required 
              disabled = {isLoadingAddress}
              defaultValue={address}
              className="input"/>

            {addressStatus === 'error' && (
              <p
                className = "mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {errorAddress} error
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude &&
            <span className = "absolute right-0">
            <Button 
              disabled = {isLoadingAddress}
              type = "small"
              button onClick ={(e)=>
              {
                e.preventDefault ()
                dispatch (fetchAddress())
              }} > Get Position 
            </Button>
          </span>}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="w-4 h-4 accent-amber-600"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label 
            htmlFor="priority"
            className="text-sm text-gray-700">
              Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input 
            type = "hidden"
            name = "cart"
            value = {JSON.stringify(cart)}
            />
          <input
            type = "hidden"
            name = "position"
            value = {position.longitude && position.latitude
              ? `${position.latitude}, ${position.longitude}`
              :''}
          />
          <Button 
            disabled = {isSubmitting}
            type = "primary">
            {isSubmitting || isLoadingAddress ? "Placing order..." : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action ( {request}) {

  // get all the data from the form
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  
  //create our new object
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  }

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please give us your correct phone number. We might need it to contact you"
  if (Object.keys(errors).length > 0) return errors;


  //if everything is okay, create new order and redirect
  const newOrder = await createOrder (order)

  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;
