/************************************************************************************
 * @purpose   : creats user  stores data in database.
 * 
 * @file      : dbServices.js
 * @overview  : stores user data to database.
 * @author    : Deepu M
 * @version   : npm 3.5.2
 * @since     : 24.06.2019
 * 
 *************************************************************************************/




const model = require('../app/model/userModel')
const bcryptjs = require('bcryptjs')
const shortid = require("shortid");

function hash(password) {
    var salt = bcryptjs.genSaltSync(10)
    var hashpassword = bcryptjs.hashSync(password, salt)
    return hashpassword
}
function dbService() {

}


/** 
*@description : register new user to the database.
*@param       : body (request from client)
*@param       : callback (response from server)
*/

dbService.prototype.register = (body, callback) => {
    var newUser = new model.user({
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
    })
}


/**
*@description : To user Login
*@param       : body (request from client)
*@param       : callback (response from server)
*/
dbService.prototype.login = (body, callback) => {

    model.user.find({ $and: [{ 'email': body.email }, { isVerified: true }] }, (err, data) => {
        if (err) {
            console.log("error occured in email finding  ")
            return callback(err)
        }
        else if (data.length > 0) {
            // compare the pass word based on hashing
            
            bcryptjs.compare(body.password, data[0].password, (err, res) => {
                if (err) {
                    return callback(err)
                } else if (res) {
                    console.log("succesfully login")
                    console.log(res)
                    return callback(null, data)
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
}

/**
*@description : To user email verification.
*@param       : req (request from client)
*@param       : callback (response from server)
*/

dbService.prototype.verification = (req, callback) => {
    try {
        console.log("Decoded id", req.decoded.payload.email);
        //findOneand  updateOne() Updates a single document within the collection based on the filter.
        model.user.findOneAndUpdate({ 'email': req.decoded.payload.email }, { isVerified: true }, (err, result) => {
            if (err) {
                console.log("token on decode email", err);
                return callback(err);
            }
            else {
                console.log("verify successfully", req.decoded.payload.email);
                return callback(null, result)
            }
        })
    }
    catch (err) {
        console.log("Error in user email verification catch block");
        callback(err);
    }

}


/**
*@description : To forgot password.
*@param       : req (request from client)
*@param       : callback (response from server)
*/

dbService.prototype.forgetpassword = (body, callback) => {
    try {
        //When finding documents in a collection, you can filter the result by using a query object.
        model.user.find({ 'email': body.email }, (err, data) => {
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
dbService.prototype.resetPassword = (req, callback) => {
    console.log("fdsfgfg", req.body.password)
    console.log("dfgfdg", req.decoded)
    const newpassword = hash(req.body.password)

    // updateOne() Updates a single document within the collection based on the filter.
    model.user.updateOne({ 'email': req.decoded.payload.email }, { 'password': newpassword }, (err, data) => {
        if (err) {
            return callback(err)
        } else {
            return callback(null, data)
        }
    })

}

/**
*@description : To user UploadImage.
*@param       : req (request from client)
*@param       : callback (response from server)
*/

dbService.prototype.uploadPhoto = (req, callback) => {
    // updateOne() Updates a single document within the collection based on the filter.
    try {
        console.log("request in model... ==>", req.decoded.payload.email);

        model.user.findOneAndUpdate({ email: req.decoded.payload.email }, {
            $set: {
                uploadImage: req.file.location
            },
        }, (err, data) => {
            if (err) {
                console.log("Error in");
                return callback(err);
            } else {
                console.log("adadad", data)
                return callback(null, data);
            }
        });
    } catch (err) {
        callback(err)
    }
}

dbService.prototype.postUrl = (req, callback) => {
    // updateOne() Updates a single document within the collection based on the filter.
    try {
        //   console.log(req.body.urlCode, "utlllurlrurlr")
        //When finding documents in a collection, you can filter the result by using a query object.
        model.UrlShorten.find({ urlCode: req.body.urlCode }, (err, data) => {
            if (err) {
                console.log("lllllllllllllll ")
                return callback(err)
            }
            else if (data.length > 0) {
                // compare the pass word based on hashing

                console.log("sssssssssss")
                console.log("sssssssssss", data)
                return callback(null, data)
            } else {

                callback("error")
            }
        })
    } catch (err) {
        console.log("error in user model login block", err)
        callback(err)
    }
}

/**
*@description : To user post url.
*@param       : req (request from client)
*@param       : callback (response from server)
*/

dbService.prototype.getUrl = (req, callback) => {
    console.log("incomming body ", req);
    const originalUrl = req.url;
    const email = req.email

    console.log(originalUrl)

  
    const urlCode = shortid.generate();
    console.log("22222", urlCode)
  

    console.log("1111111111111111")
    const item = new model.UrlShorten({

        originalUrl: originalUrl,
        urlCode: urlCode,
        email: email

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





module.exports = new dbService