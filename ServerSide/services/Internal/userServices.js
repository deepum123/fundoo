/************************************************************************************
 * @purpose   : Used to create user services that will send the data recived from client to 
 *              user.model and save that data in database.
 * 
 * @file      : user.services.js
 * @overview  : create user services and send data to model and save data in database.
 * @author    : Deepu M
 * @version   :   
 * @since     : 
 * 
 *************************************************************************************/



const model = require('/home/admin1/Desktop/fundoo/ServerSide/app/model/userModel.js')
const bcryptjs = require('bcryptjs')
class userServices {

    constructor() { }

    /**************************************************************************** 
   *@description : To send new user register data to models/user.model
   *@param       : req (request from client)
   *@param       : callback (response from server)
   ****************************************************************************/
    userServiceRegister(data, callback) {
        var hashPassword = this.hash(data.password)
        data.hashPassword = hashPassword
        model.put(data, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                console.log("user service data :", data)
                return callback(null, data)
            }
        })

    }

    /**************************************************************************** 
   *@description : To send registerd user login data to models/user.model
   *@param       : req (request from client)
   *@param       : callback (response from server)
   ****************************************************************************/
    userServiceLogin(data, callback) {
        model.getVer(data, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    }

    /**************************************************************************** 
    *@description : To send registered user forgot password data to models/user.model
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    userServiceForgotPassword(req, callback) {
        model.get(req, (err, data) => {
            if (err) {
                console.log(err + "error in userServiceeeee")
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    }

    /**************************************************************************** 
   *@description : To send registerd user reset password data to models/user.model
   *@param       : req (request from client)
   *@param       : callback (response from server)
   ****************************************************************************/
    userServiceResetPassword(data, callback) {
        console.log("##########", data)
        var hashPassword = this.hash(data.password)

        var field = { password: hashPassword }

        model.Update(data, field, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    }
    /**************************************************************************** 
    *@description : To send registerd email verification data to models/user.model
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    userServiceVerification(data, callback) {
        var field = { isVerified: true }
        model.Update(data, field, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    }
    /**************************************************************************** 
    *@description : To send registerd uploaded  image address  to models/user.model
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    userServicesUploadImage(data, callback) {

        var field = { uploadImage: data.address }
        model.Update(data, field, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    }

    hash(password) {
        var salt = bcryptjs.genSaltSync(10)
        var hashpassword = bcryptjs.hashSync(password, salt)
        return hashpassword
    }
}


const s = new userServices()
module.exports = s
