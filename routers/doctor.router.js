import express from "express"
import { registerDoctor } from "../controllers/doctor.controller.js"

const router = express.Router()

router
 .post("/register" , registerDoctor)


export const doctorRouter = router