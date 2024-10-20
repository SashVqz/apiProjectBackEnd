const { userModel } = require("../models")
const { matchedData } = require("express-validator")
const { tokenSign } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")
const { handleHttpError } = require("../utils/handleError")

const registerCtrl = async (req, res) => {
    try {
        const dataValidated = matchedData(req)
        
        const password = await encrypt(dataValidated.password)
        
        const body = {...dataValidated, password} 

        const dataUser = await userModel.create(body)
        dataUser.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser._id),
            user: dataUser
        }

        res.send(data)  
    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}

const registerCtrlAdmin = async (req, res) =>{
    try {
        const { password: rawPassword, ...otherData } = req.body;
        
        const password = await encrypt(rawPassword)
        
        const body = { ...otherData, password }

        const dataUser = await userModel.create(body)
        dataUser.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser._id),
            user: dataUser
        }

        res.send(data)  
    } catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}

const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        var user = await userModel.findOne({ email: req.email }).select("password name role email") 
                                              
        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        
        const hashPassword = user.password;
        const check = await compare(req.password, hashPassword)

        if(!check){
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        user.set('password', undefined, {strict: false})
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

// get
const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.send(users)
    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_GET_USERS")
    }
}

const getUsersFiltered = async (req, res) => {
    try {
        const { city, interests } = req.query;
        
        let filter = { city, role: { $ne: "admin" }, allowsReceivingOffers: true };

        if (city && interests) {
            filter = { ...filter, interests: { $in: interests.split(",") } };
        } else if (city) {
            filter = { ...filter };
        } else if (interests) {
            filter = { ...filter, interests: { $in: interests.split(",") } };
        } else {
            handleHttpError(res, "INVALID_PARAMETERS", 400);
            return;
        }

        const users = await userModel.find(filter).select("name email");
        res.send(users);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_GET_USERS_BY_CITY");
    }
}

// put
const putUser = async (req, res) => {
    try {
        const { id, ...updates } = matchedData(req);
        const user = await userModel.findByIdAndUpdate(id, updates, { new: true });
        res.send(user);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_UPDATING_USER", 500);
    }
}

// patch
const patchUser = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const updates = req.body;
        const user = await userModel.findById(id);
        if (!user) {
            handleHttpError(res, "ERROR_USER_NOT_FOUND", 404);
            return;
        }
        Object.assign(user, updates);
        await user.save();
        res.send(user);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_UPDATING_USER", 500);
    }
}

// delete
const deleteUser = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            handleHttpError(res, "USER_NOT_FOUND", 404);
            return;
        }
        res.send(user);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_DELETING_USER", 500);
    }
}

module.exports = { registerCtrl, registerCtrlAdmin, loginCtrl , getUsers, getUsersFiltered , putUser, patchUser, deleteUser}