import React from 'react'
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice'

export default function UpdateItemQuantity({pizzaId, currentQuantity}) {
    
    const dispatch = useDispatch ()
  return (
    <div className = "mr-3 flex items-center md:gap-3 gap-2">
      <Button onClick = {() => dispatch(decreaseItemQuantity(pizzaId))} type = "round">-</Button>
      <span className = "text-sm font-medium ">{currentQuantity}</span>
      <Button onClick = {() => dispatch(increaseItemQuantity(pizzaId))}type = "round">+</Button>
    </div>
  )
}
