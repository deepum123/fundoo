
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
//create the instance of Schema
const Schema = mongoose.Schema
const userSchema = new Schema({
    firstname: {
        type: String,
        required: [true,"Fisrtname is required"],
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
        required: true,
        validator: validator.isEmail,
    },
    password: {
        type: String,
        required: true,
    }, 
    isVerified: {
        type: Boolean,
        default: false
    }, 
    uploadImage: {
        type: String
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
var user = mongoose.model('user', userSchema)

// short url schema
class userModel {
    constructor() { }


    /*******************************************************************************************************
     * @description:it will add new user  using user schema and save the data into the database
     * @param {*request from frontend} objectNote
     * @param {*response from  backend to frontend } callback
     ******************************************************************************************************/
    put(data, callback) {
        try {
            var newUser = new user({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: data.hashPassword

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
            })
        } catch (err) {
            callback(err)
        }
    }

    /**************************************************************************** 
    *@description : To find the registered user in database using find()
    *@param       : body (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    getVer(data, callback) {
        try {
            console.log("@@@@@@@@@@", data.email)
            user.find({ $and: [{ 'email': data.email }, { isVerified: true }] }, (err, result) => {
                if (err) {
                    console.log("error occured in email finding  ")
                    return callback(err)
                }
                else if (result.length > 0) {
                    // compare the pass word based on hashing
                    bcryptjs.compare(data.password, result[0].password, (err, res) => {
                        if (err) {
                            return callback(err)
                        } else if (res) {
                            console.log("succesfully login")
                            console.log(res)
                            return callback(null, result)
                        } else {
                            console.log("password does not match")
                            return callback("incorrect password")
                        }
                    })

                } else {
                    console.log("your email id not present in data base")
                    callback("invali email id and invalid email")
                }

            })
        } catch (err) {
            callback(err)
        }
    }


    /**************************************************************************** 
    *@description :  To find the registered user in database using find()
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    get(data, callback) {
        try {
            user.find({ 'email': data.email }, (err, data) => {
                if (err) {
                    callback(err)
                } else if (data.length > 0) {
                    console.log("forgotpassword function data", data)
                    return callback(null, data)
                } else {
                    console.log("user is not found")
                    return callback("user is not found")
                }
            })
        } catch (err) {
            callback(err)
        }
    }

    /**************************************************************************** 
*@description : it will update the perticular user based data 
*@param       : req (request from client)
*@param       : callback (response from server)
****************************************************************************/
    Update(data, field, callback) {
        try {

            user.findOneAndUpdate({ '_id': data.userId }, field, (err, result) => {
                if (err) {
                    console.log("token on decode email", err);
                    return callback(err);
                }
                else {
                    console.log("verify successfully", data.userId);
                    return callback(null, result)
                }
            })


        } catch (err) {
            callback(err)
        }
    }
}
const userModelObj = new userModel()
module.exports = userModelObj

