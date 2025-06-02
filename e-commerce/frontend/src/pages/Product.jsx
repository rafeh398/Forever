import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useShop } from "../context/shopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../Components/product/RelatedProduct";


function Product() {
  const { productId } = useParams();
  const { products, currency,cartItems,addToCart } = useShop();
  const [productData, setProductData] = useState();
  const [image, setImage] = useState();
  const [size, setSize] = useState("");




  const foundProduct = () => {
    const singleProduct = products.find(item => item._id === productId);
    if (singleProduct) {
      setProductData(singleProduct);
      setImage(singleProduct.image[0]); // Set the first image as default
    }
  };

  useEffect(() => {
    foundProduct()
  }, [productId, products])
 




  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}

      <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">
        {/* product img */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row sm:gap-10">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img src={item} alt="" key={index} className="w-[24%]  sm:w-full  sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(item)} />))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />

          </div>

        </div>
        {/* Product INFO */}
        <div className="flex-1 ">
          <h1 className="mt-2 font-medium text-2xl">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>



          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 w-4/5">{productData.description}</p>
          <div className="mt-5 flex flex-col gap-3">
            <p>Select Size</p>
            <div className="flex gap-3">
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} key={index}
                  className={`py-2 px-4 bg-gray-100 border ${item === size ? "border-orange-500" : ""}`}>
                  {item}
                </button>
              ))}

            </div>


          </div>
          <button className="bg-gray-700 text-white px-8 py-3 active:bg-gray-500 mt-3" 
          onClick={()=>addToCart({itemId:productData._id,size})}>ADD TO CART</button>
          <hr className="sm:w-4/5 mt-8" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-2">
            <p>100% original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>

          </div>


        </div>

      </div>
      {/* Description and review */}
      <div className="mt-20">
        <div className="flex ">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>

        </div>
        <div className="flex flex-col gap-5 border px-6 py-6 text-sm">
          <p>An e-commerce website is an online platform that allows businesses and individuals to buy and sell goods and services over the internet.
            It typically features product listings, a shopping cart, and a secure checkout process. </p>
          <p> It often integrates features like promotions, discounts, and customer loyalty programs to enhance the shopping experience.</p>

        </div>

      </div>
      <RelatedProduct category={productData.category} subcategory={productData.subcategory}/>

    </div>

  ) : <div className="opacity-0"></div>;
}




export default Product;
