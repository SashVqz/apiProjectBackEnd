const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const userModel = require("../models/noSql/user")

const userValidatorRegister = [
    check("email").notEmpty().isEmail().custom(async (email) => {
        const user = await userModel.findOne({ email: email });
        if (user) throw new Error("Email already in use");
    }),
    check("name").notEmpty().withMessage("Name is required").isLength({ min: 1, max: 20 }).withMessage("Name must have a length between 1 and 20 characters"),
    check("password").notEmpty().withMessage("Password is required").isStrongPassword().withMessage("Password must have at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol"),
    check("age").notEmpty().withMessage("Age is required").isNumeric().withMessage("Age must be a number"),
    check("city").notEmpty().withMessage("City is required").isString().withMessage("City must be a text"),
    check("interests").notEmpty().withMessage("Interests are required").isString().withMessage("Interests must be a text"),
    check("allowsReceivingOffers").notEmpty().withMessage("Allows receiving offers is required").isBoolean().withMessage("Allows receiving offers must be a boolean"),
    check("role").notEmpty().withMessage("Role is required").isIn(["admin", "user"]).withMessage("Invalid role"),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const userValidatorLogin = [
    check("email").notEmpty().isEmail().custom(async (email) => {
        const user = await userModel.findOne({ email: email });
        if (!user) throw new Error("User not found");
    }),
    check("password").notEmpty().withMessage("Password is required"),

    (req, res, next) => {
        validateResults(req, res, next);
    }
];

const userValidator = [
    check("id").exists().notEmpty().isMongoId(),
    
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const userValidatorUserData = [
    check("name").notEmpty().withMessage("Name is required").isLength({ min: 1, max: 20 }).withMessage("Name must have a length between 1 and 20 characters"),
    check("age").notEmpty().withMessage("Age is required").isNumeric().withMessage("Age must be a number"),
    check("city").notEmpty().withMessage("City is required").isString().withMessage("City must be a text"),
    check("interests").notEmpty().withMessage("Interests are required").isString().withMessage("Interests must be a text"),
    check("allowsReceivingOffers").notEmpty().withMessage("Allows receiving offers is required").isBoolean().withMessage("Allows receiving offers must be a boolean"),
    check("role").notEmpty().withMessage("Role is required").isIn(["admin", "user"]).withMessage("Invalid role"),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = { userValidatorRegister, userValidatorLogin, userValidator, userValidatorUserData }