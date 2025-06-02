import mongoose,{Schema} from "mongoose";

const productSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    subCategory:{
        type:String,
        required:true,
    },
    image:{
        type:Array,
        required:true,
    },
    sizes:{
        type:Array,
        required:true,
    },
    bestSeller:{type:Boolean},
 
},{timestamps:true})

export const Product=mongoose.model("Product",productSchema)