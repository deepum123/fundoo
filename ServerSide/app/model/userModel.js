
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

const  Schem  = mongoose.Schema;
const urlShortenSchema = new Schem({
    originalUrl: String,
    urlCode: String,
    email:String
 }, {
        timestamps: true 
});
module.exports.UrlShorten = mongoose.model("UrlShorten", urlShortenSchema);







