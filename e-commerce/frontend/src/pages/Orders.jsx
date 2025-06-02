import React from 'react'
import { useShop } from "../context/shopContext"
import Title from "../Components/common/Title"
import { useState,useEffect } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"


function Orders() {
  const {backendURL,user,currency} = useShop()

  const[orderData,setOrderData]=useState([])


  const loadOrderData=async()=>{
 try {
     if(!user) {return null}
 
     const response=await axios.post(`${backendURL}/api/v1/order/userorders`,{userId:user._id},{withCredentials:true})
 
   if (response.data.success) {
  const allOrdersData = [];

  response.data.data.forEach((order) => {
    order.items.forEach((item) => {
      allOrdersData.push({
        ...item,
        status: order.status,
        payment: order.payment,
        paymentMethod: order.paymentMethod,
        date: order.createdAt 
      }); 
    });
  });

  setOrderData(allOrdersData.reverse());
  toast.success(response.data.message)
} else {
  toast.error(response.data.message);
}

 
       
  
 } catch (error) {
  console.log(error);
  
 }
    

  }
  useEffect(() => {
  loadOrderData()
  }, [user])


  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'}/>

      </div>
      <div>
        {
          orderData.map((item,index)=>(
          <div key={index} className="border-t py-4 border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start text-sm gap-6">
                <img src={item.image[0]} className="w-16 sm:w-20" />
                <div>
                  <p className="sm:text-base md:font-medium ">
                    {item.name}

                  </p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700 ">
                    <p>{currency}{item.price*item.quantity}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>

                  </div>
                  <p className="mt-2">Date : <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                  <p className="mt-1">Payment Method :<span className="text-gray-400">{item.paymentMethod}</span></p>


                </div>

              </div>
              <div className="md:w-1/2 flex justify-between ">
              <div className="items-center flex gap-2">
              <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
              <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>

              </div>
          </div>))
        }

      </div>
      
    </div>
  )
}

export default Orders
