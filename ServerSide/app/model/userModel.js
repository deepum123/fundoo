
/************************************************************************************
 * @purpose   : creats user schema and stores data in database.
 * 
 * @file      : userModel.js
 * @overview  : stores user data to database.
 * @author    : Deepu M
 * @version   : npm 3.5.2
 * @since     : 15.06.2019
 * 
 *************************************************************************************/



/******* require mongoose *******
*It manages relationships between data, provides schema validation, and is used to 
translate between objects in code and the representation of those objects in MongoDB.*/
const mongoose = require('mongoose')
var validator = require('mongoose-validator')


/****** require bcrypt **********
*It uses a 128-bit salt and encrypts a 192-bit magic value as noted in the USENIX documentation.
"`bcrypt` forces you to follow security best practices as it requires a salt as part of the 
hashing process. Hashing combined with salts protects you against rainbow table attacks!*/
const bcryptjs = require('bcryptjs')
const dbservices=require('/home/admin1/Desktop/fundoo/ServerSide/config/dbServices.js')
//create the instance of Schema
const Schema = mongoose.Schema
const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        validator: nameValidator
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        validator: nameValidator
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true ,
        validator: validator.isEmail,
    },
    password: {
        type: String,
        required: true,
    }, isVerified: {
        type: Boolean,
        default: false
    },uploadImage:{
        type:String
    }

},
    {
        timestamps: true  //mongoose has created this option to add automatically two fields - createdAt and updatedAt
    })

var nameValidator = [
    validator({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Name should be between {ARGS[3]} and {ARGS[50]} characters',
    })
]
module.exports.user = mongoose.model('user', userSchema)

//password-hash provides functions for generating a hashed passwords 
function hash(password) {
    var salt = bcryptjs.genSaltSync(10)
    var hashpassword = bcryptjs.hashSync(password, salt)
    return hashpassword
}

//user model constructor

function userModel() {

}

/** 
*@description : register new user to the database.
*@param       : body (request from client)
*@param       : callback (response from server)
*/
userModel.prototype.userModelRegister = (body, callback) => {
    try {
        dbservices.register(body,(err,data)=>{
            if(err){
      return  callback(err)
            }else{
          return    callback(null,data)
            }
        })
 
    }
    catch (err) {
        console.log("error in user model register block", err)
        callback(err)
    }
}



/**
*@description : To user Login
*@param       : body (request from client)
*@param       : callback (response from server)
*/

userModel.prototype.userModelLogin = (body, callback) => {
    try {
        console.log(body.password, "password")
        dbservices.login(body,(err,data)=>{
            if(err){
      return  callback(err)
            }else{
          return    callback(null,data)
            }
        })
      
    } catch (err) {
        console.log("error in user model login block", err)
        callback(err)
    }
}

/**
*@description : To forgot password.
*@param       : req (request from client)
*@param       : callback (response from server)
*/

userModel.prototype.userModelForgotPassword = (body, callback) => {
    try {
        console.log(body.password, "password")
        dbservices.forgetpassword(body,(err,data)=>{
            if(err){
      return  callback(err)
            }else{
          return    callback(null,data)
            }
        })
        
    } catch (err) {
        console.log("error in user model forgot password block", err)
        //res.send(err,"error in find methos")
        callback(err)
    }
}



/**
*@description : To reset password.
*@param       : req (request from client)
*@param       : callback (response from server)
*/

userModel.prototype.userModelResetPassword = (req, callback) => {
    try {

        dbservices.resetPassword(req,(err,data)=>{
            if(err){
      return  callback(err)
            }else{
          return    callback(null,data)
            }
        })
     
    } catch (err) {
        console.log("error in usermodel reset password block", err)
        callback(err)
    }
}


/**
*@description : To user email verification.
*@param       : req (request from client)
*@param       : callback (response from server)
*/

userModel.prototype.userModelEmailVerification = (req, callback) => {

    try {
        dbservices.verification(req,(err,data)=>{
            if(err){
      return  callback(err)
            }else{
          return    callback(null,data)
            }
        })
   
    }
    catch (err) {
        console.log("Error in user email verification catch block");
        callback(err);
    }
}

const  Schem  = mongoose.Schema;
const urlShortenSchema = new Schem({
    originalUrl: String,
    urlCode: String,
    email:String
 }, {
        timestamps: true 
});
module.exports.UrlShorten = mongoose.model("UrlShorten", urlShortenSchema);


/**
*@description : To user get url.
*@param       : req (request from client)
*@param       : callback (response from server)
*/
userModel.prototype.userModelgetUrl = (req, callback) => {
    try{
    dbservices.getUrl(req,(err,data)=>{
        if(err){
  return  callback(err)
        }else{
      return    callback(null,data)
        }
    })

}catch(err){
  callback(err)
}
}

/**
*@description : To user post url.
*@param       : req (request from client)
*@param       : callback (response from server)
*/
    userModel.prototype.userModelPosturl= (req, callback) => {
        try {
         //   console.log(req.body.urlCode, "utlllurlrurlr")
          //When finding documents in a collection, you can filter the result by using a query object.
          dbservices.postUrl(req,(err,data)=>{
            if(err){
      return  callback(err)
            }
            else {
          return    callback(null,data)
            }
          })
        } 
        catch (err) {
            console.log("error in user model login block", err)
            callback(err)
        }
    }

/**
*@description : To user UploadImage.
*@param       : req (request from client)
*@param       : callback (response from server)
*/
userModel.prototype.userModelUploadImage=(req,callback)=>{
    
    try {
        dbservices.uploadPhoto(req,(err,data)=>{
            if(err){
      return  callback(err)
            }else{
          return    callback(null,data)
            }
        })
  
    }
    catch (err) {
        console.log("Error in user email verification catch block");
        callback(err);
    }
}


module.exports = new userModel


