const mongoose = require('mongoose');

/**
 * Connects to the MongoDB database.
 */

const dbConnect = async () => {
    try {
        const db_uri = process.env.DB_URI 
 
        mongoose.set('strictQuery', false);
        
        await mongoose.connect(db_uri);

        console.log('DB connected!');
    } catch (err) {
        console.log('DB connection failed!', err);
    }
};

module.exports = dbConnect;
