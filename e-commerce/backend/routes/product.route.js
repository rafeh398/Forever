import express from "express"

import { addProduct,removeProduct,listProducts,singleProduct } from "../controllers/product.controller.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyAdminJWT } from "../middlewares/adminAuth.middleware.js"
const productRouter=express.Router()

  

productRouter.post("/add",verifyAdminJWT,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct)
productRouter.post("/remove",verifyAdminJWT,removeProduct)
productRouter.post("/single",singleProduct)
productRouter.get("/list",listProducts)

export  default productRouter

