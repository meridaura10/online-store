import { useSelector } from "react-redux"

export const useCart = () =>{
   const {items,totalPrice,count,status,error} =  useSelector(state => state.cart)
   return {
    items,
    totalPrice,
    count,
    status,
    error
   }
}