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

/* 
*@description : To send new user register data to models/userModel
*@param       : req (request from client)
*@param       : callback (response from server)
*/
module.exports.userServiceRegister = (req, callback) => {
    try{
    model.userModelRegister(req, (err, data) => {
        if (err) {
         return   callback(err)
        } else {
            console.log("user service data :", data)
          return  callback(null, data)
        }
    })
    }catch(err){
        console.log("error occured in user service register block",err)
        callback(err)
    }
}


/* 
*@description : To send new user login data to models/userModel
*@param       : req (request from client)
*@param       : callback (response from server)
*/
module.exports.userServiceLogin = (req, callback) => {
    try{
    model.userModelLogin(req, (err, data) => {
        if (err) {
          return  callback(err)
        } else {
          return  callback(null, data)
        }
    })
}catch(err){
    console.log("error occured in user services block",err)
    callback(err)
}
}

/* 
*@description : To send new user forgot password data to models/userModel
*@param       : req (request from client)
*@param       : callback (response from server)
*/
module.exports.userServiceForgotPassword=(req,callback)=>{
    try{
        model.userModelForgotPassword(req,(err,data)=>{
            if(err){
              return  callback(err)
            }else{
             return   callback(null,data)
            }
        })
    }catch(err){
        console.log("error occured in user service forgot password",err)
        callback(err)
    }
}

    /* 
*@description : To send new user reset password data to models/userModel
*@param       : req (request from client)
*@param       : callback (response from server)
*/
module.exports.userServiceResetPassword=(req,callback)=>{
    try{
    model.userModelResetPassword(req,(err,data)=>{
        if(err){
         return   callback(err)
        }else{
         return   callback(null,data)
        }
    })
}catch(err){
    console.log("error occcures in user model reset password block",err)
    callback(err)
}
}

    /* 
*@description : To send new user user service email verification to models/userModel
*@param       : req (request from client)
*@param       : callback (response from server)
*/
module.exports.userServiceEmailVerification=(req,callback)=>{
    try{
    model.userModelEmailVerification(req,(err,data)=>{
        if(err){
         return   callback(err)
        }else{
         return   callback(null,data)
        }
    })
}catch(err){
    console.log("error occcures in user model reset password block",err)
    callback(err)
}
}
