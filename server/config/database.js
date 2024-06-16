import mongoose from 'mongoose'

const connectToDb=async()=>{
    await mongoose.connect(process.env.MONGO_URI).then(()=>console.log("Database is connected")).catch(()=>{
        console.log("Error while connecting Database")
    })
}

export default connectToDb