import express from "express"
import {placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus, verifyStripe} from "../controllers/order.controller.js"
import { verifyAdminJWT } from "../middlewares/adminAuth.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const orderRouter=express.Router()

//admin features
orderRouter.post("/list",verifyAdminJWT,allOrders)
orderRouter.post("/status",verifyAdminJWT,updateStatus)


//payment features

orderRouter.post("/place",verifyJWT,placeOrder)
orderRouter.post("/stripe",verifyJWT,placeOrderStripe)


//user feature
orderRouter.post("/userorders",verifyJWT,userOrders)

//verify payment

orderRouter.post("/verifyStripe",verifyJWT,verifyStripe)

export default orderRouter;