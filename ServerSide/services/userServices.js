/************************************************************************************
 * @purpose   : Used to create user services that will send the data recived from client to 
 *              user.model and save that data in database.
 * 
 * @file      : userServices.js
 * @overview  : create user services and send data to model and save data in database.
 * @author    : Deepu M
 * @version   : npm  3.5.2
 * @since     : 15.06.2019
 * 
 *************************************************************************************/

const model = require('../app/model/userModel')
const dbservices=require('../config/dbServices')
/**
*@description : To send new user register data to dbservices
*@param       : req (request from client)
*@param       : callback (response from server)
*/
module.exports.userServiceRegister = (req, callback) => {
    try {
        dbservices.register(req, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                console.log("user service data :", data)
                return callback(null, data)
            }
        })
    } catch (err) {
        console.log("error occured in user service register block", err)
        callback(err)
    }
}


/**
*@description : To send new user login data to dbservices
*@param       : req (request from client)
*@param       : callback (response from server)
*/
module.exports.userServiceLogin = (req, callback) => {
    try {
        dbservices.login(req, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    } catch (err) {
        console.log("error occured in user services block", err)
        callback(err)
    }
}

/**  
*@description : To send new user forgot password data to dbservices
*@param       : req (request from client)
*@param       : callback (response from server)
*/
module.exports.userServiceForgotPassword = (req, callback) => {
    try {
        dbservices.forgetpassword(req, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    } catch (err) {
        console.log("error occured in user service forgot password", err)
        callback(err)
    }
}

/**  
*@description : To send new user reset password data to dbservices
*@param       : req (request from client)
*@param       : callback (response from server)
*/
module.exports.userServiceResetPassword = (req, callback) => {
    try {
        dbservices.resetPassword(req, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    } catch (err) {
        console.log("error occcures in user model reset password block", err)
        callback(err)
    }
}

/**  
*@description : To send new user user service email verification to dbservices
*@param       : req (request from client)
*@param       : callback (response from server)
*/
module.exports.userServiceEmailVerification = (req, callback) => {
    try {
        dbservices.verification(req, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    } catch (err) {
        console.log("error occcures in user model reset password block", err)
        callback(err)
    }
}

/**  
*@description : To send new user user service getUrl to dbservices
*@param       : req (request from client)
*@param       : callback (response from server)
*/
module.exports.userServicegetUrl = (req, callback) => {
    try {
        dbservices.getUrl(req, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    } catch (err) {
        console.log("error occcures in user model reset password block", err)
        callback(err)
    }
}

/**  
*@description : To send new user user service UploadImage to dbservices
*@param       : req (request from client)
*@param       : callback (response from server)
*/
module.exports.userServicesUploadImage = (req, callback) => {
    try {
        dbservices.uploadPhoto(req, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    } catch (err) {
        console.log("error occcures in user model reset password block", err)
        callback(err)
    }
}
