import { body, validationResult } from 'express-validator'

/**
 * @description Check auth connection to verify that email and password are the expected values
 * @returns validation with express validator
 */
export const validateAuthInfo = () => {
    return [
        body('email')
            .isEmail()
            .withMessage('Email is invalid'),
        body('password')
            .isLength({ min: 7 })
            .withMessage('Password must have at least 7 characters')
            .matches("^(?=.*[A-Z])(?=.*[0-9]).*$")
            .withMessage('Password needs at least one capital letter and one number')
    ]
}

/**
 * @description Check user creation to be sure that te information is as expected
 * @returns validation with express validator
 */
export const validateUser = () => {
    return [
        validateAuthInfo(),
        body('names')
            .isLength({ min: 1 })
            .escape(),
        body('lastNames')
            .isLength({ min: 1 })
            .escape(),
        body('phone')
            .isMobilePhone(),
        body('role')
            .toLowerCase()
            .matches(/^(standard|administrator)$/)
    ]
}

/**
 * @description Method to validate every tasks request and check all the array
 * @returns validation with express validator
 */
export const validateTasks = () => {
    return [
        body('tasks.*.id')
            .isNumeric()
            .optional(),
        body('tasks.*.name')
            .isLength({ min: 1 })
            .escape(),
        body('tasks.*.userId')
            .isNumeric(),
        body('task.*.completed')
            .isBoolean().optional()
    ]
}

/**
 * @description Method to validate every request that has params
 * @returns validation and errors
 */
export const validate = (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}