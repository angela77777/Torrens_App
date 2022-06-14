//Imports required
import User from "../models/user.js";
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

//Config environment params
dotenv.config()

/**
 * @description Function to check if user exist and params match to allow login
 * @param {String} req.email the user email to check login 
 * @param {String} req.password the user password to check login
 * @param {String} res.token the token signed
 * @param {User} res.user the user athenticated
 */
export const authUser = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({where: {
                email: email, password: crypto.createHmac('sha256', process.env.TOKEN_SECRET)
                    .update(password)
                    .digest('hex')
            }
        })

        if (user !== null) {
            //Clear password
            delete user.dataValues.password

            //Create token
            jwt.sign({ user: { id: user.id, role: user.role } }, process.env.TOKEN_SECRET, {
                expiresIn: 3600 //Expires in 1 Hour
            }, (error, token) => {
                if (error) throw error;
                return res.status(200).json({ user, token });
            });
        } else {
            return res.status(404).json({ message: "The email/password is not related to any user" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

/**
 * @description Allows check if session is active in the client
 * @param {*} req.auth It has the auth information by the token if exist 
 * @param {User} res the user information founded
 */
export const checkConnection = async (req, res) => {
    try {
        const user = await User.findByPk(req.auth.user.id, { attributes: { exclude: ['password'] } })
        return res.status(200).json({user: user})
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

