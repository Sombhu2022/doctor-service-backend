import express from "express"
import { loginPatient, logOutPatient, patientProfile, registerPatient } from "../controllers/patient.controllers.js"

const router = express.Router()

router
  .post("/register" , registerPatient)
  .get("profile/:id" , patientProfile)
  .post("/login" , loginPatient)
  .get("/logout" , logOutPatient)

export const patientRouter = router