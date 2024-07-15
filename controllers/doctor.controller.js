import { Doctors } from "../models/doctor.model.js"
import { backendResponse } from "../utils/asyncResponse.js"



export const registerDoctor = async(req , res)=>{
  
    try {
        const { name , email , passwordHash , specialty } = req.body 
        console.log(req.body);

        // ckeck all filed 
        if(!name || !email || !passwordHash || !specialty){
           return res.status(400).json({
                success:false,
                message:"all fileds are required"
            })
        }

        // check email exist or not 
        const doctor =await Doctors.find({email})
        if(doctor)  backendResponse({res , statusCode:400 , message:"emial alrady exist"})

        // if email is not exist then create new user 
        const data = await Doctors.create(req.body)
        console.log(data,"data");

        backendResponse({res , statusCode:400 , status:false , message:"doctor registered" , data}) 
    } catch (error) {
        backendResponse({res , statusCode:400 , status:false , message:"doctor not register" , error})
    }

}