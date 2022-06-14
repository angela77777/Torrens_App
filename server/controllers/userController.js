//Imports required
import User from "../models/user.js";
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

//Config environment params
dotenv.config()

/**
 * @description Method to get users according to limit and offset
 * @param {Integer} req.limit indicates the number of items to search
 * @param {Integer} req.page indicates the current page to calculate offset (default should be 1)
 * @param {User[]} res.users return the users if not exist and error
 */
export const getUsers = async (req, res) => {
    try {
        if (req.auth.role != 'administrator') {
            return res.status(403).json({ message: "You don't have permission to get users" }).send()
        }

        const { page, limit } = req.body
        let offset = (page - 1) * limit

        let users = await User.findAndCountAll({ attributes: { exclude: ['password'] }, offset: offset, limit: limit, order: [
            ['id', 'ASC']
        ]})

        return res.status(200).json({ users: users })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

/**
 * @description Functions that allows create user and sign token
 * @param {String} req.names the user names 
 * @param {String} req.lastNames the user last names 
 * @param {String} req.email the user email 
 * @param {Bigint} req.phone the user phone 
 * @param {String} req.role role in the system
 * @param {String} req.password the user password
 * @param {String} res.token the token signed
 * @param {User} res.user the user created
 */
export const postUser = async (req, res) => {
    try {
        let checkExistUser = await User.findOne({ where: { email: req.body.email } })

        if (checkExistUser !== null) {
            return res.status(400).json({ message: "Exist an user with this email" })
        } else {
            let newUser = await User.create({
                ...req.body, password: crypto.createHmac('sha256', process.env.TOKEN_SECRET)
                    .update(req.body.password)
                    .digest('hex')
            })

            //Clear password
            delete newUser.dataValues.password

            //Create token
            jwt.sign({ user: { id: newUser.id, role: newUser.role } }, process.env.TOKEN_SECRET, {
                expiresIn: 3600 //Expires in 1 Hour
            }, (error, token) => {
                if (error) throw error;
                return res.status(200).json({ user: newUser, token });
            });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}