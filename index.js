// all imports are here 
import express from "express"

import bodyParser from "body-parser"
import fileUpload from "express-fileupload"
import cors from "cors"

import "dotenv/config"

import { dbConnection } from "./database/database.js"
import { doctorRouter } from "./routers/doctor.router.js"
import { patientRouter } from "./routers/patient.router.js"
import { awsConfig } from "./config/awsConfig.js"






// create server 
const server = express()

// configure usefull packages 

server.use(bodyParser.json({limit:"50mb"}))
server.use(bodyParser.urlencoded({limit:"50mb" , extended:true}))
server.use(express.json({limit:"50mb"}))
server.use(fileUpload({limits:{fileSize:  50 * 1024 *1024} }))


// database conectivity...

dbConnection();

// frontend conectivity...
server.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    exposedHeaders: ['X-Total-Count'],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}
))

// other configration ...

// all routers ...
server.use("/api/v1/doctor" , doctorRouter)
server.use("/api/v1/patient" , patientRouter)


// run server .....
server.listen(process.env.PORT , ()=>{
    console.log("server is running port 8080");
})