import React from 'react'
import { useShop } from "../context/shopContext"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"

function Verify() {

    const {navigate,user,setCartItems,backendURL}=useShop()
    const[searchParams,setSearchParams]=useSearchParams()

    const success=searchParams.get("success")
    const orderId=searchParams.get("orderId")
    const verifyPayment=async()=>{
        try {
            if (!user) {
                return null
                
            }
            const response=await axios.post(`${backendURL}/api/v1/order/verifyStripe`,{userId:user._id,success,orderId},{withCredentials:true})
            if(response.data.success){
                setCartItems({})
                navigate("/orders")
            }else{
                navigate("/cart")
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
            
        }
    }

    useEffect(() => {
    verifyPayment()
    }, [user])

  return (
    <div>
      
    </div>
  )
}

export default Verify
