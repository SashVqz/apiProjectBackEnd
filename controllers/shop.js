const { shopModel } = require('../models')
const { tokenSign } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require('express-validator')

const loginCtrl = async (req, res) => {
    try {
        req = matchedData(req)
        shop = await shopModel.findOne({ email: req.email }).select("password") 
                                             
        if(!shop){
            handleHttpError(res, "SHOP_NOT_EXISTS", 404)
            return
        }
       
        const hashPassword = shop.password;
        const check = await compare(req.password, hashPassword)

        if(!check){
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        shop.set('password', undefined, {strict: false})
        const data = {
            token: await tokenSign(shop),
            shop
        }

        res.send(data)
   }catch(err){
       console.log(err)
       handleHttpError(res, "ERROR_LOGIN_SHOP")
   }
}

// get
const getShop = async (req, res) => {
    try {
        const shop = await shopModel.find()

        res.send(shop)
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_GETTING_SHOP", 500)
    }
}

const getShopById = async (req, res) => {
    try {
        const id = req.params.id

        const shop = await shopModel.findById(id);
        if (!shop) {
            handleHttpError(res, "SHOP_NOT_FOUND", 404);
            return;
        }
        res.send(shop);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_GETTING_SHOP", 404);
    }
}

const getShopByName = async (req, res) => {
    try {
        const name = req.params.name
        
        const shop = await shopModel.findOne({ name });
        res.send(shop);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_GETTING_SHOP", 404);
    }
}

const getShopsCity = async (req, res) => {
    try {
        const city = req.params.city
        
        const shop = await shopModel.find({ city });
        res.send(shop);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_GETTING_SHOP", 404);
    }
}

const getShopByActivity = async (req, res) => {
    try {
        const activity = req.params.activity
    
        const shop = await shopModel.find({ activity });
        res.send(shop);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_GETTING_SHOP", 404);
    }
}

const getShopsCityAndActivity = async (req, res) => {
    try {
        const city = req.params.city
        const activity = req.params.activity

        //const { city, activity } = matchedData(req);
        const shop = await shopModel.find({ city, activity });
        res.send(shop);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_GETTING_SHOP", 404);
    }
}

const getShopByScore = async (req, res) => {
    try {
        const { score, city, activity } = req.query;

        let query = {};
        let shop; 
        if (city) {
            query.city = city;
        }

        if (activity) {
            query.activity = activity;
        }

        if (score === 'true') {
            shop = await shopModel.find(query).sort({ 'webShop.scoring': -1 });
        } else {
            shop = await shopModel.find(query);
        }

        res.send(shop);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_GETTING_SHOP", 404);
    }
}

const getWebShopReviews = async (req, res) => {
    try {
        const id = req.params.id
        const shop = await shopModel.findById(id);
        if (!shop) {
            return handleHttpError(res, "SHOP_NOT_FOUND", 404);
        }

        const reviews = shop.webShop.reviews;
        res.send(reviews);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_GETTING_REVIEWS", 500);
    }
}

const getWebShopPhoto = async (req, res) => {
    try {
        const id = req.params.id
        const shop = await shopModel.findById(id);
        if (!shop) {
            return handleHttpError(res, "SHOP_NOT_FOUND", 404);
        }

        const photos = shop.webShop.photos;
        res.send(photos);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_GETTING_PHOTOS", 500);
    }
}

const getWebShopText = async (req, res) => {
    try {
        const id = req.params.id
        const shop = await shopModel.findById(id);
        if (!shop) {
            return handleHttpError(res, "SHOP_NOT_FOUND", 404);
        }
        const texts = shop.webShop.texts;
        res.send(texts);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_GETTING_TEXT", 500);
    }
}

// post
const postShop = async (req, res) => {
    try {
        req = matchedData(req)

        const password = await encrypt(req.password)
        const body = {...req, password} 
        const dataShop = await shopModel.create(body)

        dataShop.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataShop._id),            
            shop: dataShop
        }

        res.send(data)  
    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_REGISTER_Shop")
    }
}

const postReviewToShop = async (req, res) => {
    try {
        const id = req.params.id;
        const { score, text } = req.body;
        
        //console.log(score, "score")
        //console.log(text, "text")

        //const id = matchedData(req);
        //const { score, text } = matchedData(req);

        const shop = await shopModel.findById(id);
        console.log(shop)
        if (!shop) {
            handleHttpError(res, "SHOP_NOT_FOUND", 404);
            return;
        }

        const review = {
            score: score,
            text: text
        };

        const webShop = shop.webShop;
        console.log(webShop)
        console.log(webShop.reviews)
        if (!webShop) {
            handleHttpError(res, "WEBSHOP_NOT_FOUND", 404);
            return;
        }

        webShop.reviews.push(review);

        const averageScore = webShop.reviews.reduce((total, review) => total + review.score, 0) / webShop.reviews.length;
        webShop.scoring = averageScore;
        webShop.numRatings += 1;
        await shop.save();

        res.send(shop);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_ADDING_REVIEW", 500);
    }
}

const postWebShop = async (req, res) => {
    try {
        const id = req.params.id
        webShopData = req.body   
        //const { webShopData } = matchedData(req);

        //const { id, ...webShopData } = matchedData(req);

        const shop = await shopModel.findById(id);
        if (!shop) {
            handleHttpError(res, "SHOP_NOT_FOUND", 404);
            return;
        }

        shop.webShop = webShopData;
        await shop.save();
        res.send(shop);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_ADDING_WEBSHOP", 500);
    }
}

// put
const putShop = async (req, res) => {
    try {        
        // const id = req.params.id
        const { id } = matchedData(req);
        const updates = req.body
 
        if (updates.password) {
            updates.password = await encrypt(updates.password);
        }
        
        const shop = await shopModel.findByIdAndUpdate(id, updates, { new: true });
        res.send(shop);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_UPDATING_SHOP", 500);
    }
}

const putWebShop = async (req, res) => {
    try {
        const id = req.params.id;
        const webShopData = req.body;
        const shop = await shopModel.findById(id);
        if (!shop) {
            handleHttpError(res, "SHOP_NOT_FOUND", 404);
            return;
        }

        Object.assign(shop.webShop, webShopData);
        await shop.save();
        res.send(shop);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_UPDATING_WEBSHOP", 500);
    }
}

// patch
const patchShop = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const updates = req.body;
        const shop = await shopModel.findById(id);
        if (!shop) {
            handleHttpError(res, "ERROR_SHOP_NOT_FOUND", 404);
            return;
        }
        Object.assign(shop, updates);
        if (updates.password) {
            shop.password = await encrypt(updates.password);
        }
        await shop.save();
        res.send(shop);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_UPDATING_SHOP", 500);
    }
}

const patchWebShop = async (req, res) => {
    try {
        const id = req.params.id;
        const webShopData = req.body;

        const shop = await shopModel.findById(id);
        if (!shop) {
            handleHttpError(res, "SHOP_NOT_FOUND", 404);
            return;
        }

        shop.webShop = { ...shop.webShop, ...webShopData };
        await shop.save();
        res.send(shop);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_UPDATING_WEBSHOP", 500);
    }
}

const patchWebShopPhoto = async (req, res) => {
    try {
        const id = req.params.id
        const { photo } = matchedData(req);

        const shop = await shopModel.findById(id);
        if (!shop) {
            handleHttpError(res, "SHOP_NOT_FOUND", 404);
            return;
        }

        const webShop = shop.webShop;
        if (!webShop) {
            handleHttpError(res, "WEBSHOP_NOT_FOUND", 404);
            return;
        }

        webShop.photos.push(photo);
        await shop.save();

        res.send(shop);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_ADDING_PHOTO", 500);
    }
}

const patchWebShopText = async (req, res) => {
    try {
        const id = req.params.id
        const { text } = matchedData(req);

        const shop = await shopModel.findById(id);
        if (!shop) {
            handleHttpError(res, "SHOP_NOT_FOUND", 404);
            return;
        }

        const webShop = shop.webShop;
        if (!webShop) {
            handleHttpError(res, "WEBSHOP_NOT_FOUND", 404);
            return;
        }

        webShop.texts.push(text);
        await shop.save();

        res.send(shop);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_ADDING_TEXT", 500);
    }
}

// delete
const deleteShop = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const shop = await shopModel.findByIdAndDelete(id);
        if (!shop) {
            handleHttpError(res, "SHOP_NOT_FOUND", 404);
            return;
        }
        res.send(shop);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_DELETING_SHOP", 500);
    }
}

const deleteWebShop = async (req, res) => {
    try {
        const id = req.params.id;
        const shop = await shopModel.findById(id);
        if (!shop) {
            handleHttpError(res, "SHOP_NOT_FOUND", 404);
            return;
        }
        shop.webShop = undefined;
        await shop.save();
        res.send(shop);
    } catch (err) {
        console.log(err);
        handleHttpError(res, "ERROR_DELETING_WEBSHOP", 500);
    }
}

module.exports = { 
    loginCtrl, getShop, getShopById, getShopByName, getShopsCity, getShopByActivity, getShopsCityAndActivity, 
    getShopByScore, postShop, putShop, patchShop, deleteShop, postReviewToShop, 
    getWebShopReviews, postWebShop, putWebShop, patchWebShop, patchWebShopPhoto, patchWebShopText, 
    deleteWebShop, getWebShopPhoto, getWebShopText 
};
