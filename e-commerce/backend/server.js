import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js"
import cartRouter from "./routes/cart.route.js"
import cookieParser from "cookie-parser"
import orderRouter from "./routes/order.route.js"

//App Config
const app=express()
const port= process.env.PORT || 4000




//middlewares
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
  origin: function (origin, callback) {
    
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({limit:"16kb",extended:true}))

app.use(express.static("public"))  //public asseets like pdfs and imgs

app.use(cookieParser())
 

//api endpoints

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart",cartRouter);
app.use("/api/v1/order",orderRouter)



connectDB()
.then(()=>{
   app.listen(port,()=>{
      console.log(`server is running at port : ${port}`);
      
   })
})
.catch((err)=>{
console.log("Mongo db connection failed!",err);

})


