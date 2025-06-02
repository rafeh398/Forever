import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import {ApiResponse} from "../utils/ApiResponse.js"
//add product to user Cart
const addToCart = asyncHandler(async (req, res) => {
    const { userId, itemId, size } = req.body

    const user = await User.findById(userId)

    let cartData = user.cartData // model mein cartData

    if (cartData[itemId]) {
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1
        }
        else {
            cartData[itemId][size] = 1
        }

    } else { //completely new item
           cartData[itemId] = {}
    } cartData[itemId][size] = 1 

    await User.findByIdAndUpdate(userId, {cartData})

    
    res
    .status(200)
    .json(new ApiResponse(200,cartData,"Cart Data added"))






})


//update product

const updateCart = asyncHandler(async (req, res) => {

     const { userId, itemId, size,quantity } = req.body

    const user = await User.findById(userId)

    let cartData = user.cartData 

    cartData[itemId][size]=quantity

    await User.findByIdAndUpdate(userId, {cartData})

    
    res
    .status(200)
    .json(new ApiResponse(200,cartData,"Cart Data updated"))
})


// get user Cart Data
const getCartData = asyncHandler(async (req, res) => {

    const {userId}=req.body
    const user=await User.findById(userId)

    let cartData=user.cartData

    res.status(200)
    .json(new ApiResponse(200,cartData,"cart data fetched"))

})

export {
    addToCart, updateCart, getCartData
}