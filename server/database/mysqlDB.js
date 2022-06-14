//Imports required
import Sequalize from 'sequelize'
import dotenv from 'dotenv'

//Config environment params
dotenv.config()

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

//Create Mysql db instance
const mysqlDB = new Sequalize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
})

export default mysqlDB