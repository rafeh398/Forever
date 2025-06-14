import React, { useState } from 'react'
import { assets } from "../assets/admin_assets/assets"
import axios from "axios"
import { backendUrl } from "../config"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function Add() {
  const navigate= useNavigate()

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])

  const toggleSize = (size) => {
    setSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size])
  }
  //   Checks if size is already in prev (the current state)

  // If it is, remove it (filter)

  // If it isn't, add it (...prev, size)
  //sizes is array and size is one which i selected

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestSeller", bestSeller)
      formData.append("sizes", JSON.stringify(sizes))
      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(`${backendUrl}/api/v1/product/add`, formData, {
        withCredentials: true
      });

      if (response.data.success) {
        toast.success(response.data.message)

        setName("")
        setDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice("")
        setSizes([]);
        setBestSeller(false);
        setCategory("Men");
        setSubCategory("Topwear");
        
           // Navigate to /list
      setTimeout(() => {
        navigate("/list");
      }, 1000);


      } else {
        toast.error(response.data.message)
      }






    } catch (error) {
      toast.error(
        error?.response?.data?.message
      );
    }

  }



  return (
    <div>
      <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
        <div>
          <p className="mb-2">Upload Image</p>
          <div className="flex gap-2">
            <label htmlFor="image1">
              <img className="w-20 cursor-pointer" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
              <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
            </label>
            <label htmlFor="image2">
              <img className="w-20 cursor-pointer" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
              <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
            </label>
            <label htmlFor="image3">
              <img className="w-20 cursor-pointer" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
              <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
            </label>
            <label htmlFor="image4">
              <img className="w-20 cursor-pointer" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
              <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
            </label>
          </div>
        </div>
        <div className="w-full">
          <p className="mb-2">Product name</p>
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="w-full max-w-[500px] px-3 py-2 " id="" placeholder="Type here" required />
        </div>
        <div className="w-full">
          <p className="mb-2">Product description</p>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full max-w-[500px] px-3 py-2 " id="" placeholder="write content here" required></textarea>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product category</p>
            <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 ">
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="mb-2">Sub category</p>
            <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2 ">
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div className="">
            <p className="mb-2">Product price</p>
            <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full px-3 py-2 sm:w-[120px]" type="Number" placeholder="25" />
          </div>

        </div>

        <div>
          <p className="mb-2">Product sizes</p>
          <div className="flex gap-3">
            {["S", "M", "L", "XL", "XXL"].map(size => (
              <div
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-3 py-1 cursor-pointer rounded ${sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'
                  }`}
              >
                <p>{size}</p>
              </div>
            ))}
          </div>

        </div>

        <div className="flex gap-2 mt-2">
          <input type="checkbox" onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} id="bestSeller" />

          <label className="cursor-pointer" htmlFor="bestSeller">Add to bestSeller</label>
        </div>

        <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">ADD</button>
      </form>

    </div>
  )
}

export default Add
