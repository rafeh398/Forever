import React, { useState, useEffect } from 'react'
import { useShop } from "../context/shopContext";
import Title from "../Components/common/Title";
import { assets } from "../assets/assets";
import CartTotal from "../Components/Cart/CartTotal";
import { Navigate } from "react-router-dom";

// cartItems = {
//   "item1": { "small": 2, "medium": 1 },
//   "item2": { "large": 3 }
// }

const Cart = () => {
  const { cartItems, totalBill, products, currency, updateQuantity ,navigate} = useShop();
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    const tempData = [];
    //item 1 and item2 ..iterate through items
    for (const items in cartItems) {
      //iterate through small medium inside the  itms
      for (const size in cartItems[items]) {
        if (cartItems[items][size] > 0) {  //check if data available
          tempData.push({
            _id: items,
            size: size,
            quantity: cartItems[items][size]

          })
        }
      }

    }
    setCartData(tempData);
  }, [cartItems])

  








  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />


      </div>
      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id == item._id);
            if (!productData) return null; // Ensure product exists
            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 
              grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className="flex items-start gap-6">
                  <img src={productData.image[0]} className="w-16 sm:w-20 " />
                  <div>
                    <p className="text-xs sm:text-lg font-medium ">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{currency}{productData.price}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 ">{item.size}</p>

                    </div>
                  </div>

                </div>
                <input
                  type="number"
                  value={item.quantity}  // Correct way to bind to state (controlled input)
                  onChange={(e) => {
                    const newQuantity = Number(e.target.value);
                    if (newQuantity >= 1) {
                      updateQuantity({ itemId: item._id, size: item.size, quantity: newQuantity });
                    }
                  }}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  min={1}
                />

                <img
                  src={assets.bin_icon}
                  onClick={() => updateQuantity({ itemId: item._id, size: item.size, quantity: 0 })}
                  className="w-4 sm:w-5 mr-4 cursor-pointer"
                />
                <div>

                </div>
            
              </div>
            )
          })
        }
      </div>
      <div className="flex justify-end my-20 ">
                  <div className="w-full sm:w-[450px]">
                    <CartTotal />
                    <div className="w-full text-end">
                    <button onClick={()=>navigate("/placeOrder")} className="bg-black text-white my-8 text-sm px-8 py-3">PROCEED TO CHECKOUT</button>
                    </div>


                  </div>

                </div>


    </div>
  );
};

export default Cart;