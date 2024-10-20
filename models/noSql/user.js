const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

/**
 * @description: User schema for the users.
 * @param {String} name - The name of the user.
 * @param {String} email - The email of the user.
 * @param {String} password - The password of the user.
 * @param {String} edad - The age of the user.
 * @param {String} city - The city of the user.
 * @param {String} interests - The interests of the user.
 * @param {Boolean} allowsReceivingOffers - The boolean that allows receiving offers.
 * @param {String} rol - The role of the user.
**/

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: function() {
            return this.rol !== 'admin';
        }
    },

    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },
    
    age: {
        type: String,
        required: function() {
            return this.rol !== 'admin';
        }
    },
    
    city: {
        type: String,
        index: true,
        required: function() {
            return this.rol !== 'admin';
        }
    },
    
    interests: {
        type: String,
        index: true,
        required: function() {
            return this.rol !== 'admin';
        }
    },

    allowsReceivingOffers: {
        type: Boolean,
        index: true,
        required: function() {
            return this.rol !== 'admin';
        }
    },
    
    role: {
        type: String,
        index: true,
        enum: ['admin', 'user', null],
        default: null
    }
    
    },{
        timestamps: true,
        versionKey: false
    }
);

UserSchema.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("user", UserSchema); // Export the model