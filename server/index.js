import express from "express"
import dotenv from "dotenv"
import connectToDb from "./config/database.js"
import post from "./routes/post.js"
import user from "./routes/user.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import cloudinary from "cloudinary"

const app= express()
dotenv.config({path:"config/config.env"})

//Connect to database
connectToDb()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    
})

//middlewares
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb",extended:true}))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true
  }));
//routes
app.use("/api/v1",user)
app.use("/api/v1",post)
// app.use("api/v1",user)


app.get("/",(req,res)=>{
    res.send("YOOO")
})


app.listen(process.env.PORT,()=>{
    console.log(`Server is running ${process.env.PORT}`)
})