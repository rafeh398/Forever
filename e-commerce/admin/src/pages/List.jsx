import axios from "axios"
import React, { useState, useEffect } from 'react'
import { backendUrl, currency } from "../config"
import { toast } from "react-toastify"

function List() {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/product/list`)
     
     
      
      
      if (response.data.success) {
        setList(response.data.data)

      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)


    }


  }

  const removeProduct=async(id)=>{

 try {
     const response=await axios.post(`${backendUrl}/api/v1/product/remove`,{id},{withCredentials:true})
    console.log(response);
    
     if (response.data.success){
       toast.success(response.data.message)
       await fetchList();
     }else{
       toast.error(response.data.message)
     }
 } catch (error) {
  
  
  toast.error(error.message)
 }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <>
      <p className="mb-2">All products list</p>
      <div className="flex flex-col gap-2">
        {/* list table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* list products */}
        <div>
          {Array.isArray(list) &&
  list.map((item, index) => (
    <div
      key={index}
      className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
    >
      <img src={item.image?.[0]} alt={item.name} className="w-12 " />
      <p>{item.name}</p>
      <p>{item.category}</p>
      <p>{currency}{item.price}</p>
      <p onClick={()=>removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg">X</p>
    </div>
  ))
}

        </div>
      </div>  

    </>
  )
}

export default List
