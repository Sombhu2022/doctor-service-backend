// import mongoose 
import mongoose from "mongoose";

export const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("database connection successfully");
    } catch (error) {
        console.log("database not connected " , error);
    }
}

