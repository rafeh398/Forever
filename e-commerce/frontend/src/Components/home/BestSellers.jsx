import React, { useEffect, useState } from 'react'
import { useShop } from "../../context/shopContext"
import Title from "../common/Title"
import ProductItem from "../common/ProductItem";

function BestSellers() {
    const {products}=useShop();
    const[bestSellerProducts,setBestSellerProducts]=useState([]);

    useEffect(() => {
      
      
        const filteredProducts=products.filter((item)=>(item.bestSeller))

    setBestSellerProducts(filteredProducts.slice(0,5))
    }, [products])
   
    
  return (
    <div className="my-10">
      <div className="text-3xl py-8 text-center">
        <Title text1={"BEST"} text2={"SELLERS"}/>
        <p className="w-3/4 text-xs sm:text-sm md:text-base m-auto text-gray-600">Lorem ipsum dolor sit 
        amet conse  tetur adipisicing elit ligendi minima aut
         commodi quam repellendus sequi.</p>

      </div>
      {/* rendering products/ */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellerProducts.map((item)=>(<ProductItem key={item._id} id={item._id} image={item.image} name={item.name } price={item.price}/>))}

      </div>
    </div>
  )
}

export default BestSellers;
