//Imports required
import mysqlDB from "../database/mysqlDB.js";
import { DataTypes } from "sequelize";

//User model
const User = mysqlDB.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    names: { type: DataTypes.STRING(50), allowNull: false },
    lastNames: { type: DataTypes.STRING(50), allowNull: false },
    email: { type: DataTypes.STRING(50), allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING(20), allowNull: false },
    state: { type: DataTypes.BOOLEAN, defaultValue: true },
    role: { type: DataTypes.STRING(15), allowNull: false }
},
{
    hooks: {
        afterCreate: (record) => {
            delete record.dataValues.password;
        }
    }
})


export default User