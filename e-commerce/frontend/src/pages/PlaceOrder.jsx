import React, { useState } from 'react'
import Title from "../Components/common/Title"
import CartTotal from "../Components/Cart/CartTotal"
import { assets } from "../assets/assets"
import { useShop } from "../context/shopContext"
import axios from "axios"
import { toast } from "react-toastify"

function PlaceOrder() {
  const [method, setMethod] = useState("cod")
  const { navigate, products, cartItems, backendURL, delivery_fee, setCartItems, user, totalBill, } = useShop()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value

    setFormData(data => ({ ...data, [name]: value }))
  }


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id == items))
            if (itemInfo) {
              itemInfo.size = item,
                itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        userId: user._id,
        address: formData,
        items: orderItems,
        amount: totalBill() + delivery_fee

      }



      switch (method) {
        case "cod":{
          //APi calls for COD
          const response = await axios.post(`${backendURL}/api/v1/order/place`, orderData, { withCredentials: true })


          if (response.data.success) {
            setCartItems({})



            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }


          break;}

        //api call for stripe 
        case "stripe":{
          const responseStripe = await axios.post(`${backendURL}/api/v1/order/stripe`, orderData, { withCredentials: true })


          if (responseStripe.data.success) {
            const {session_url}=responseStripe.data
            window.location.replace(session_url)

          }

          break;}
        default:
          break;

      }

    }




    catch (error) {
      console.log(error);

    }



  }


  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={'INFORMATION'} />

        </div>
        <div className="flex gap-3">
          <input type="text" name="firstName" onChange={onChangeHandler} value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="First Name" />
          <input type="text" name="lastName" onChange={onChangeHandler} value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Last Name" />


        </div>
        <input type="email" name="email" onChange={onChangeHandler} value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Email Address" />
        <input type="text" name="street" onChange={onChangeHandler} value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Street" />
        <div className="flex gap-3">
          <input type="text" name="city" onChange={onChangeHandler} value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="City" />
          <input type="text" name="state" onChange={onChangeHandler} value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="State" />


        </div>
        <div className="flex gap-3">
          <input type="number" name="zipcode" onChange={onChangeHandler} value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Zipcode" />
          <input type="text" name="country" onChange={onChangeHandler} value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Country" />


        </div>

        <input type="number" name="phone" onChange={onChangeHandler} value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full" placeholder="Phone Number" />






      </div>
      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />

        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* payment method */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div onClick={() => setMethod("stripe")} className="flex items-center gap-3 border py-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method == "stripe" ? "bg-green-400 " : ""} `}></p>
              <img src={assets.stripe_logo} className="h-5 mx-4" />
            </div>
            {/* <div onClick={() => setMethod("razorpay")} className="flex items-center gap-3 border py-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method == "razorpay" ? "bg-green-400 " : ""}`}></p>
              <img src={assets.razorpay_logo} className="h-5 mx-4" />
            </div> */}
            <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border py-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method == "cod" ? "bg-green-400 " : ""} `}></p>
              <p className="text-gray-500 text-sm font-medium mx-4   ">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8 ">
            <button className="bg-black text-white text-sm px-16 py-3" type="submit">PLACE ORDER</button>

          </div>

        </div>

      </div>

    </form>
  )
}

export default PlaceOrder
