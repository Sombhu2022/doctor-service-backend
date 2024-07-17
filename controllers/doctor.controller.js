import { Doctors } from "../models/doctor.model.js"
import { backendResponse } from "../utils/asyncResponse.js"
import { tokenGenarate } from "../utils/sendToken.js";



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
        let doctor =await Doctors.findOne({email})
        if(doctor)  backendResponse({res , statusCode:400 , message:"emial alrady exist"})

        // if email is not exist then create new user 
        doctor = await Doctors.create(req.body)
        console.log(doctor,"data");

        // send response with token ...
        const token = tokenGenarate(doctor)
        res.status(200).json({success:true , message:"doctor registerd" , doctor , token})

    } catch (error) {
        res.status(400).json({success:false , message:"somthing error , check your network connection " , error})   
    }

}


export const doctorProfile = async(req , res)=>{
     try {
          const {id} = req.params
          const doctor = await Doctors.findById(id)
          res.status(200).json({
            success:true , 
            message:"doctor profile",
            doctor
          })
     } catch (error) {
        res.status(400).json({success:false , message:"somthing error , check your network connection " , error})   
        
     }
}

export const loginDoctor = async(req , res)=>{
    try {
        const { email , password} = req.body
        if(!email && !password) res.status(400).json({ message:" all filed are required" })

        let doctor = await Doctors.findOne({email}).select("+passwordHash")
        
        if(!doctor) res.status(400).json({success:false , message:"email or password is not corrent"})
        
        const isPasswordMatch = await doctor.comparePassword(password)
        if(! isPasswordMatch) res.status(400).json({success:false , message:"email or password not correct"})

        const token = tokenGenarate(doctor)
        res.status(200).json({success:true , message:"doctor are login successfully" , doctor , token})
    } catch (error) {
        res.status(400).json({success:false , message:"somthing error , check your network connection " , error})   
    }
}

export const logOutDoctor = async(req , res)=>{
    try {
         res.status(200).json({
            success:true , 
            message:" doctor are logout successfully "
         })
    } catch (error) {
        res.status(400).json({success:false, message:"somthing error , check your network connection " , error})   
        
    }
}