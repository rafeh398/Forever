import { asyncHandler } from "../utils/asyncHandler.js"
import { Order } from "../models/order.model.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import Stripe from "stripe"

const currency = "PKR"
const deliveryCharge = 10



//gateway initialize

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)



//place order using COD

const placeOrder = asyncHandler(async (req, res) => {
    const { userId, items, amount, address } = req.body
    const orderData = {
        userId,
        amount,
        items,
        address,
        paymentMethod: "COD",
        payment: false,

    }

    const newOrder = await Order.create(orderData);

    await User.findByIdAndUpdate(userId, { cartData: {} })

    res
        .status(200)
        .json(new ApiResponse(200, newOrder, "order Placed"))

})

//place order using stripe
const placeOrderStripe = asyncHandler(async (req, res) => {
    const { userId, items, amount, address } = req.body
    const { origin } = req.headers;

    const orderData = {
        userId,
        items,
        amount,
        address,
        payment: false,
        paymentMethod: "Stripe"
    }

    const newOrder = await Order.create(orderData)

    const line_items = items.map((item) => ({
        price_data: {
            currency,
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity,
    }));

    line_items.push({
        price_data: {
            currency,
            product_data: {
                name: "Delivery Charge",
            },
            unit_amount: deliveryCharge * 100,
        },
        quantity: 1,
    })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        });

        return res
        .status(200)
        .json({ success: true, message: 'Order placed successfully with Stripe', session_url: session.url });
    } 

) 


//verify Stripe

const verifyStripe=asyncHandler(async(req,res)=>{
        const { orderId, success, userId } = req.body;


    if (success === 'true') {
            await Order.findByIdAndUpdate(orderId, { payment: true });
            await User.findByIdAndUpdate(userId, { cartData: {} });
            return res.status(200).json({ message: "Payment successful. Order marked as paid.", success: true });
        } else {
            await Order.findByIdAndDelete(orderId);
            return res.status(200).json({ message: "Payment failed. Order cancelled.", success: false });
        }
})




//All Orders Data for Admin Panel
const allOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({})
    res.json(new ApiResponse(200, orders, "Orders are successfully fetched"))


})

//user Orders Data for frontend
const userOrders = asyncHandler(async (req, res) => {
    const { userId } = req.body
    const orders = await Order.find({ userId })
    res.json(new ApiResponse(200, orders, "Orders are successfully fetched"))

})

//update Order Status for admin panel

const updateStatus = asyncHandler(async (req, res) => {

    const { orderId, status } = req.body

    await Order.findByIdAndUpdate(orderId, { status })
    res.json(new ApiResponse(200, {}, "status updated"))
})

export { placeOrder, placeOrderStripe,  allOrders, userOrders, updateStatus ,verifyStripe}