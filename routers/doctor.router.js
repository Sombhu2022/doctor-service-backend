import express from "express"
import { createSignUrlForFileUploading, doctorProfile, loginDoctor, logOutDoctor, registerDoctor } from "../controllers/doctor.controller.js"

const router = express.Router()

router
 .post("/register" , registerDoctor)
 .get("profile/:id" , doctorProfile )
 .post("/login" , loginDoctor)
 .get('/logout' , logOutDoctor)
 .post('/get-signed-url' , createSignUrlForFileUploading)


export const doctorRouter = router