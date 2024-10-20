const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

/**
 * @description: Review schema reviews of the webshops.
 * @param {Number} score - The score of the review from 1 to 5. 
 * @param {String} text - The text of the review.
**/

const ReviewSchema = new Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },
        score: { 
            type: Number, 
            min: 1, 
            max: 5 
        },
        text: String,
    },
    {
        timestamps: true,
        versionKey: false
    }
);

/**
 * @description: WebShop schema for the webshops.
 * @param {String} title - The title of the webshop.
 * @param {String} summary - The summary of the webshop.
 * @param {Array} texts - The texts of the webshop.
 * @param {Array} photos - The photos of the webshop.
 * @param {Number} scoring - The scoring of the webshop.
 * @param {Number} numRatings - The number of ratings of the webshop.
 * @param {Array} reviews - The reviews of the webshop.
**/

const WebShopSchema = new Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },
        
        title: String,
        
        summary: String,
        
        texts: [String],
        
        photos: [String],

        scoring: { 
            type: Number, 
            default: 0 
        },

        numRatings: { 
            type: Number, 
            default: 0 
        },

        reviews: [ReviewSchema],
    },
    {
        timestamps: true,
        versionKey: false
    }
);

/**
 * @description: Shop schema for the shops.
 * @param {String} name - The name of the shop.
 * @param {String} password - The password of the shop.
 * @param {String} cif - The cif of the shop.
 * @param {String} city - The city of the shop.
 * @param {String} email - The email of the shop.
 * @param {String} phone - The phone of the shop.
 * @param {String} activity - The activity of the shop.
 * @param {Object} webShop - The webshop of the shop.
**/ 

const ShopSchema = new Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },
        
        name: { 
            type: String,
            required: true 
        },
        
        password: {
            type: String,
            required: true
        },
        
        cif: { 
            type: String, 
            unique: true,
            required: true 
        },
        
        city: { 
            type: String, 
            required: true 
        },
        
        email: { 
            type: String, 
            required: true 
        },
        
        phone: { 
            type: String, 
            required: true 
        },

        activity: {
            type: String,
            required: true
        },
        
        webShop: WebShopSchema,
    },
    {
        timestamps: true,
        versionKey: false
    }
);

ShopSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("shop", ShopSchema); // Export the model