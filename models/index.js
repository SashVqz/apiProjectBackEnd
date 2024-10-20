/**
 * @description: This file is used to export all the models in the application.
**/
 
const models = {
    userModel: require('./noSql/user'),
    shopModel: require('./noSql/shop'),
}

module.exports = models