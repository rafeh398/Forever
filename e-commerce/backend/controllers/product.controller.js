import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js" 
import { uploadOnCloudinary } from "../config/cloudinary.js"
import {Product} from "../models/product.model.js"

//function for add product 
const addProduct=asyncHandler(async(req,res)=>{

const{name,description,price,category,subCategory,sizes,bestSeller}=req.body;
console.log("REQ.FILES:", req.files);
console.log("REQ.BODY:", req.body);


//check if all files are provided
const imageFiles=["image1","image2","image3","image4"]

const imagePaths=imageFiles
.map((image)=>req.files?.[image]?.[0]?.path)
.filter(Boolean) //remove undefined /null


  // If no images are uploaded, throw an error
  if (imagePaths.length < 1) {
    throw new ApiError(400, "At least one image is required.");
  }

  //upload on cloudinary

  const imageUrls=await Promise.all(
    imagePaths.map(async(imagePath)=>{
        
        const result=await uploadOnCloudinary(imagePath)
        return result.secure_url;
    })

  )
  console.log("BODY =>", req.body);
  console.log("FILES =>", req.files);



const productData=await Product.create({
    name,
    description,
    price,
    category,
    subCategory,
    sizes:JSON.parse(sizes),
    price:Number(price),
    bestSeller:bestSeller==="true"?true:false,
    image:imageUrls
    
})
return res.
status(201).
json(
    new ApiResponse(200,productData,"product created successfully")

);


})

//function for list products

const listProducts=asyncHandler(async(req,res)=>{
//this is a bridge between database and ui
//having many product in db and add them in array and display on frontend

const products=await Product.find({}).sort({createdAt:-1})
//find({}) means give all documents ..no filtering
return res.status(200).json(new ApiResponse(200,products,"list product fetched successfully"))

})

//function for removing product
const removeProduct = asyncHandler(async (req, res) => {
    const { id } = req.body;
  
    if (!id) {
      throw new ApiError(400, "Product ID is required");
    }
  
    const product = await Product.findById(id);
  
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
  
    await Product.findByIdAndDelete(id);
  
    return res.status(200).json(
      new ApiResponse(200, null, "Product removed successfully")
    );
  });
  
//function for single product info

const singleProduct=asyncHandler(async(req,res)=>{
    const { productId } = req.body;
  
    if (!productId) {
      throw new ApiError(400, "Product ID is required");
    }
  
    const product = await Product.findById(productId);
  
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    return res.status(200).json(
        new ApiResponse(200, product, "single Product fetched successfully")
      );
})

export {addProduct,removeProduct,listProducts,singleProduct}