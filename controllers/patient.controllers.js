import { Patients } from "../models/patient.model.js";


export const registerPatient = async(req , res)=>{
  
    try {
        const { name , email , passwordHash } = req.body 
        console.log(req.body);

        // ckeck all filed 
        if(!name || !email || !passwordHash || !specialty){
           return res.status(400).json({
                success:false,
                message:"all fileds are required"
            })
        }

        // check email exist or not 
        let patient =await Patients.findOne({email})
        if(patient) res.status(400).json({success:false , message:"email allrady exist , try another email"})

        // if email is not exist then create new user 
        patient = await Patients.create(req.body)
        console.log(patient,"data");

        // send response with token ...
        const token = tokenGenarate(patient)
        res.status(200).json({success:true , message:"patient registerd" , patient , token})

    } catch (error) {
        res.status(400).json({success:false , message:"somthing error , check your network connection " , error})   
    }

}


export const patientProfile = async(req , res)=>{
     try {
          const {id} = req.params
          const patient = await Patients.findById(id)
          res.status(200).json({
            success:true , 
            message:"patient profile",
            patient
          })
     } catch (error) {
        res.status(400).json({success:false , message:"somthing error , check your network connection " , error})   
        
     }
}

export const loginPatient = async(req , res)=>{
    try {
        const { email , password} = req.body
        if(!email && !password) res.status(400).json({ message:" all filed are required" })

        let patient = await Patients.findOne({email}).select("+passwordHash")
        
        if(!patient) res.status(400).json({success:false , message:"email or password is not corrent"})
        
        const isPasswordMatch = await patient.comparePassword(password)
        if(! isPasswordMatch) res.status(400).json({success:false , message:"email or password not correct"})

        const token = tokenGenarate(patient)
        res.status(200).json({success:true , message:"patient are login successfully" , patient , token})
    } catch (error) {
        res.status(400).json({success:false , message:"somthing error , check your network connection " , error})   
    }
}

export const logOutPatient = async(req , res)=>{
    try {
         res.status(200).json({
            success:true , 
            message:" patient are logout successfully "
         })
    } catch (error) {
        res.status(400).json({success:false, message:"somthing error , check your network connection " , error})   
        
    }
}