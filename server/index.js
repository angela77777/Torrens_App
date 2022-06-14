//Imports required to create index paths
import express from "express";
import cors from 'cors'
import routes from "./routes/routes.js"
import { expressjwt as jwtMiddleware } from 'express-jwt'
import crypto from 'crypto'
import dotenv from 'dotenv'
import { authenticateDatabase } from "./database/helper.js";

//Config environment params
dotenv.config()

//Server PORT
const PORT = process.env.PORT

//Config express, cors and paths
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', jwtMiddleware({
    secret: process.env.TOKEN_SECRET || crypto.randomBytes(20).toString('hex'), algorithms: ["HS256"],
    requestProperty: 'auth',
    getToken: function (req) {
        if (req.headers['x-auth-token']) {
            return req.headers['x-auth-token'];
        }
        return null;
    }
}).unless({path: [{url: "/api/auth/login", method: 'POST'}, {url: "/api/users/", method: 'POST'}]}), routes)

//Authenticate database
try {
    authenticateDatabase()
    console.log('Mysql DB is connected successfully')
} catch (err) {
    console.log(`Connection error with message ${err.message}`)
}

//Listen to know if server is running
app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
})