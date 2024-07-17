import mongoose, { model, Schema } from "mongoose";
import autoIncrement  from 'mongoose-sequence'

import bcrypt from 'bcrypt'

const doctorSchema =new Schema({
    doctorId: {
      type: Number,
      unique: true
    },
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
    },
    specialty: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    }
  }, {
    timestamps: true
  })

// autoincrement doctorid ... 
  doctorSchema.plugin(autoIncrement(mongoose) , { inc_field: "doctorId"})



// Pre-save hook use to hash password ... change password to hashpassword
doctorSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) {
      next();
  }

  try {
      this.passwordHash = await bcrypt.hash(this.passwordHash, 10);

  } catch (error) {
      next(error)
  }
});

doctorSchema.methods.comparePassword= async(password)=>{
   return await bcrypt.compare(password , this.passwordHash)
}

export const Doctors = model("Doctors", doctorSchema);