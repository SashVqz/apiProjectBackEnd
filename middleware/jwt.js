const { handleHttpError } = require('../utils/handleError')
const { verifyToken } = require('../utils/handleJwt')
const { shopModel, userModel } = require('../models')

/**
 * 
 * Get token data --> Get the data from the token and check if it is valid
 * 
**/

const getTokenData = async (req, res) => {
    if (!req.headers.authorization) {
        handleHttpError(res, "NOT_TOKEN", 401);
        return null;
    }

    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token);

    if (!dataToken) {
        handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
        return null;
    }

    return dataToken;
};

/**
 * 
 * Auth user middleware --> Check if the user is authenticated
 *  
**/

const authUserMiddleware = async (req, res, next) => {
    try {
        const dataToken = await getTokenData(req, res);

        if (!dataToken) {
            handleHttpError(res, "NOT_SESSION", 401);
            return;
        }

        const { _id } = dataToken;
        const id = _id;
        const query = { _id: id};
        const user = await userModel.findOne(query);
        req.user = user;

        next();
    } catch (err) {
        console.log(err);
        handleHttpError(res, "NOT_SESSION", 401);
    }
};

/**
 * 
 * Auth shop middleware --> Check if the shop is authenticated
 * 
**/

const authShopMiddleware = async (req, res, next) => {
    try {
        const dataToken = await getTokenData(req, res);

        if (!dataToken) {
            handleHttpError(res, "NOT_SESSION", 401);
            return;
        }

        const { _id } = dataToken;
        const id = _id;
        const query = { _id: id};
        const shop = await shopModel.findOne(query);
        req.shop = shop;

        next();
    } catch (err) {
        console.log(err);
        handleHttpError(res, "NOT_SESSION", 401);
    }
};

/**
 *  
 * Check rol --> Check if the user has the correct role
 *
**/


const checkRol = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        const userRol = user.role;
        const checkValueRol = roles.includes(userRol);

        if (!checkValueRol) {
            return handleHttpError(res, "NOT_ALLOWED", 403);
        }

        next();
    } catch (err) {
        handleHttpError(res, "ERROR_PERMISSIONS", 403);
    }
};

module.exports = { authUserMiddleware, authShopMiddleware, checkRol }
