const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const shopModel = require("../models/noSql/shop")

const shopValidatorLogin = [
    check("email").notEmpty().custom(async (email) => {
        const shop = await shopModel.findOne({ email: email });
        if (!shop) throw new Error("Shop not found");
    }),
    check("password").notEmpty().withMessage("Password is required"),

    (req, res, next) => {
        validateResults(req, res, next);
    }
];

const validatorWebShop = [
    check("web").notEmpty().isEmail().custom(async (id) => {
        const shop = await shopModel.findById(id);
        if (shop.webShop) throw new Error("WebShop already exist");
    }),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorWebShopData = [
    check("title").notEmpty().withMessage("Title is required"),
    check("summary").notEmpty().withMessage("Summary is required"),
    check("texts").isArray({ min: 1 }).withMessage("At least one text is required"),
    check("photos").isArray({ min: 1 }).withMessage("At least one photo is required"),
    
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorWebShopPhoto = [
    check("photo").notEmpty().withMessage("Photo is required"),
    
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorWebShopText = [
    check("text").notEmpty().withMessage("Photo is required"),
    
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorShop = [
    check("id").exists().notEmpty().isMongoId(),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorShopData = [
    check("cif").notEmpty().withMessage("CIF is required").isString().withMessage("CIF must be a text"),
    check("name").notEmpty().withMessage("Name is required").isLength({ min: 1, max: 20 }).withMessage("Name must have a length between 1 and 20 characters"),
    check("email").notEmpty().withMessage("Email is required").isEmail(),
    check("password").notEmpty().withMessage("Password is required").isStrongPassword().withMessage("Password must have at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol"),
    check("city").notEmpty().withMessage("City is required").isString().withMessage("City must be a text"),
    check("activity").notEmpty().withMessage("Activity are required").isString().withMessage("Activity must be a text"),
    check("phone").notEmpty().withMessage("Phone is required").isString(),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorReview = [
    check("score").notEmpty().withMessage("Score is required").isInt({ min: 1, max: 5 }),
    check("text").notEmpty().withMessage("Text is required"),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

module.exports = { shopValidatorLogin, validatorWebShop, validatorWebShopData, validatorWebShopPhoto, validatorWebShopText , validatorShop, validatorShopData, validatorReview }