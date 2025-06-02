import express from "express"
import { addToCart,updateCart,getCartData } from "../controllers/cart.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const cartRouter=express.Router()

cartRouter.post('/get',verifyJWT,getCartData)
cartRouter.post('/update',verifyJWT,updateCart)
cartRouter.post('/add',verifyJWT,addToCart)

export default cartRouter;

