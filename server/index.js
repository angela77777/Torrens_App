//Imports required to create index paths
import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'

//Config environment params
dotenv.config()

//Server PORT
const PORT = process.env.PORT

//Config express, cors and paths
const app = express()
app.use(cors())
app.use(express.json())

//Listen to know if server is running
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
})