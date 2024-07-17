import { model, Schema } from "mongoose";


const patientSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: 100
      },
      passwordHash: {
        type: String,
        required: true,
        minLangth:[8 , "password shoud be minimum 8 charectors"],
        maxlength: 15,
        Select:false
      }
    }, {
      timestamps: true
    })
  
export const Patients = model("Patients", patientSchema);

// Pre-save hook use to hash password ... change password to hashpassword
patientSchema.pre("save", async function (next) {
    if (!this.isModified("passwordHash")) {
        next();
    }
  
    try {
        this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  
    } catch (error) {
        next(error)
    }
  });
  
  patientSchema.methods.comparePassword= async(password)=>{
     return await bcrypt.compare(password , this.passwordHash)
  }
  