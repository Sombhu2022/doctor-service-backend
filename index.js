// all imports are here 
import express from "express"

import bodyParser from "body-parser"
import fileUpload from "express-fileupload"
import cors from "cors"

import "dotenv/config"

import { dbConnection } from "./database/database.js"
import { doctorRouter } from "./routers/doctor.router.js"



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
server.use("/doctor" ,doctorRouter)

// run server .....
server.listen(process.env.PORT , ()=>{
    console.log("server is running port 8080");
})