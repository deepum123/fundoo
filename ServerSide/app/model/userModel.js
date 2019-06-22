
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

/*
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
    /*    var newUser = new user({
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            password: hash(body.password)

        })

        //save method is used to save the user data in data base
        newUser.save((err, data) => {
            if (err) {
                console.log("error in new user save")
               return callback(err)
            } else {
                console.log("sdata successfully added", data)
               return callback(null, data)
            }
        })*/
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
        //When finding documents in a collection, you can filter the result by using a query object.
     /*   user.find({ $and: [{ 'email': body.email }, { isVerified: true }] }, (err, data) => {
            if (err) {
                console.log("error occured in email finding  ")
              return  callback(err)
            }
            else if (data.length > 0) {
                // compare the pass word based on hashing
               // console.log("data password", data[0].password)
              //  console.log("data password", data[0])
                // var pass=hash(body.password)
                bcryptjs.compare(body.password, data[0].password, (err, res) => {
                    if (err) {
                      return  callback(err)
                    } else if (res) {
                        console.log("succesfully login")
                        console.log(res)
                      return  callback(null, data)
                    } else {
                        console.log("password does not match")
                      return  callback("incorrect password")
                    }
                })

            } else {
                console.log("your email id not present in data base")
                callback("invali email id and invalid email")
            }
        })*/
    } catch (err) {
        console.log("error in user model login block", err)
        callback(err)
    }
}

/* 
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
        //W
        //When finding documents in a collection, you can filter the result by using a query object.
      /*  user.find({ 'email': body.email }, (err, data) => {
            if (err) {
                callback(err)
            } else if (data.length > 0) {
                console.log("forgotpassword function data", data)
             return   callback(null, data)
            } else {
                console.log("user is not found")
               return callback("user is not found")
            }
        })*/
    } catch (err) {
        console.log("error in user model forgot password block", err)
        //res.send(err,"error in find methos")
        callback(err)
    }
}



/* 
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
     /*   console.log("fdsfgfg", req.body.password)
        console.log("dfgfdg", req.decoded)
        const newpassword = hash(req.body.password)

        // updateOne() Updates a single document within the collection based on the filter.
        user.updateOne({ 'email': req.decoded.payload.email }, { 'password': newpassword }, (err, data) => {
            if (err) {
               return callback(err)
            } else {
             return   callback(null, data)
            }
        })*/
    } catch (err) {
        console.log("error in usermodel reset password block", err)
        callback(err)
    }
}


/* 
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
   /*     console.log("Decoded id", req.decoded.payload.email);
        //findOneand  updateOne() Updates a single document within the collection based on the filter.
        user.findOneAndUpdate({ 'email': req.decoded.payload.email }, { isVerified: true }, (err, result) => {
            if (err) {
                console.log("token on decode email", err);
              return  callback(err);
            }
            else {
                console.log("verify successfully", req.decoded.payload.email);
               return callback(null, result)
            }
        })*/
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
    token:String
 }, {
        timestamps: true 
});
const UrlShorten = mongoose.model("UrlShorten", urlShortenSchema);
const shortid = require("shortid");


userModel.prototype.userModelgetUrl = (req, callback) => {
    console.log("incomming body ", req);
    const  originalUrl = req.url;
    const token=req.tok
    
    console.log(originalUrl)
 
  // console.log("aaaaaaaaaaa",a)
    const urlCode = shortid.generate();
    console.log("22222",urlCode)
  //  const updatedAt = new Date();
 //   console.log("12121",updatedAt)
    
    console.log("1111111111111111")
            const item = new UrlShorten({
               
                originalUrl:originalUrl,
                urlCode:urlCode,
                token:token
                
            })
// save new user object to mongoose data base
            item.save((err, data) => {
                if (err) {
                    console.log(" error in registration")
                    console.log("error", err)
                    return callback(err)
                } else {
                    console.log("1.firstone model works registration succesfull", data)
                   //
                    //console.log(body.firstname)
                    callback(null, data)
                }

            })
        

    }

    userModel.prototype.userModelPosturl= (req, callback) => {
        try {
         //   console.log(req.body.urlCode, "utlllurlrurlr")
          //When finding documents in a collection, you can filter the result by using a query object.
          UrlShorten.find({ urlCode :req.body.urlCode}, (err, data) => {
                if (err) {
                    console.log("lllllllllllllll ")
                  return  callback(err)
                }
                else if (data.length > 0) {
                    // compare the pass word based on hashing
                   // console.log("data password", data[0].password)
                  //  console.log("data password", data[0])
                    // var pass=hash(body.password)
                    console.log("sssssssssss")
                    console.log("sssssssssss",data)
                 return  callback(null,data)
                } else {
                  //  console.log("jjjjjjjjjjjjjjjjjj")
                  //  callback("eeeeeeeeeeee")
                }
            })
        } catch (err) {
            console.log("error in user model login block", err)
            callback(err)
        }
    }
    
    
userModel.prototype.userModelUploadImage=(req,callback)=>{
    
    try {
        dbservices.uploadPhoto(req,(err,data)=>{
            if(err){
      return  callback(err)
            }else{
          return    callback(null,data)
            }
        })
   /*     console.log("Decoded id", req.decoded.payload.email);
        //findOneand  updateOne() Updates a single document within the collection based on the filter.
        user.findOneAndUpdate({ 'email': req.decoded.payload.email }, { isVerified: true }, (err, result) => {
            if (err) {
                console.log("token on decode email", err);
              return  callback(err);
            }
            else {
                console.log("verify successfully", req.decoded.payload.email);
               return callback(null, result)
            }
        })*/
    }
    catch (err) {
        console.log("Error in user email verification catch block");
        callback(err);
    }
}


module.exports = new userModel


