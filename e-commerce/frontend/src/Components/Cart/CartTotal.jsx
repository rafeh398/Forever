import React from 'react'
import { useShop } from "../../context/shopContext"
import Title from "../common/Title"

function CartTotal() {
    const { currency, totalBill, delivery_fee } = useShop()
    return (
        <div className="w-full">
            <div className="text-2xl">
                <Title text1={"CART"} text2={'TOTALS'} />

            </div>
            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency}{totalBill()}.00</p>


                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping Fee</p>
                    <p>{currency}{delivery_fee}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <b>Total</b>
                    <b>{currency}{totalBill() === 0 ? 0 : totalBill() + delivery_fee}</b>

                </div>

            </div>

        </div>
    )
}

export default CartTotal
