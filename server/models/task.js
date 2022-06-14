//Imports required
import mysqlDB from "../database/mysqlDB.js";
import { DataTypes } from "sequelize";
import User from "./user.js";

//Task model
const Task = mysqlDB.define('tasks', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, require: true, allowNull: false },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false
    }
})

//Association
Task.belongsTo(User)

export default Task