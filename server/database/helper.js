
import mysqlDB from "./mysqlDB.js";
import mysql from 'mysql2/promise'
import User from "../models/user.js";
import Task from "../models/task.js";
import dotenv from 'dotenv'

//Config environment params
dotenv.config()

/**
 * @description Method to create database if not exist and sync tables according to the model in Sequalize
 */
export const authenticateDatabase = async () => {
    const { DB_NAME, DB_PORT, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
    const connection = await mysql.createConnection({ host: DB_HOST, user: DB_USER, password: DB_PASSWORD, port: DB_PORT});
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);

    mysqlDB.User = User
    mysqlDB.Task = Task

    await mysqlDB.sync()
    await mysqlDB.authenticate()
}