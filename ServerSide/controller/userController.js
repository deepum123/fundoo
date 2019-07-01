/************************************************************************************
 * @purpose   : Controller will contain method for all RLFR operations.
 * 
 * @file      : user.controller.js
 * @overview  : Methods for all RLFR operation of user.
 * @author    : Deepu M
 * @version   : npm 3.5.2
 * @since     : 15.06.2019
 * 
 *************************************************************************************/

const services=require('../services/Internal/userServices')
const tokenGenn = require('../services/vendors/tokenGen')
const sendMailer = require('../services/vendors/sendMailer')
const redisSet = require('../services/vendors/redisSet')



/**
 * @description : To handel regester of new user
 * @param       : req (request from client)
 * @param       : res (response from server)
 */
module.exports.userControllerRegister = (req, res) => {
    try {
      var data={
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password

      }
        //Express-validator is a middleware for Express on Node.js that can help you validate user input.

        req.checkBody('firstname', 'first name is not valid').isAlpha().isLength({ min: 3 })
        req.checkBody('lastname', 'last name is not valid').isAlpha().isLength({ min: 3 })
        req.checkBody('email', 'email is not valid').isEmail()
        req.checkBody('password', 'password is not valid').isLength({ min: 5 })

        var errors = req.validationErrors();
        var response = {}
        if (errors) {
            response.success = false
            response.error = errors
            return res.status(422).send(response)
        } else {
           
           
            services.userServiceRegister(data, (err, data) => {
                if (err) {
                    console.log(err + "error in userController callback block")
                    return res.status(500).send(err)
                } else {
                    console.log("55555",data.id)
                   const payload = { id: data.id}
                    //  A token is passed for authentication. It supports the stateless API calls.
                    const token = tokenGenn.tokenGen(payload)
                  //  console.log("111", token.token
                   redisSet.redisset(payload, token)
                  
                    const url = process.env.verfEmail+token.token
                    subject="email verification link"
                    sendMailer.sendMailer(url,subject)
                             return res.status(200).send({
                                  success:true,
                                  message: "user registration succesfully completed",
                                  token:token.token,
                                  data:data
                            })
                        }
                    })
                }
    } catch (err) {
        console.log("error in user controller register ", err)
        res.send(err)
    }
}
/** 
*@description : To handel login of  user
*@param       : req (request from client)
*@param       : res (response from server)
*/

module.exports.userControllerLogin = (req, res) => {
    try {
        var data={
          
            email:req.body.email,
            password:req.body.password

      }
        //Express-validator is a middleware for Express on Node.js that can help you validate user input.
        req.checkBody('email', 'email is not validate validate by express validator').isEmail()
        req.checkBody('password', 'password is not valid validate by express validators').isLength({ min: 5 })
        var errors = req.validationErrors()
        var response = {}
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response)

        } else {
            services.userServiceLogin(data, (err, data) => {
                console.log("emailofbody" + req.body.email)
                if (err) {
                    console.log(err)
                    return res.status(500).send(err)
                } else {
                    console.log("emailofbody" + req.body.email)
                    const payload = { id: data.id}
                    //  A token is passed for authentication. It supports the stateless API calls.
                    const token = tokenGenn.tokenGen(payload)
                    redisSet.redisset(payload, token)
                  return res.status(200).send({
                        success:true,
                        message: "user is successfully login",
                        token: token.token,
                        data,data
                    })
                }
            })
        }
    } catch (err) {
        console.log("error in usercontrollerLogin ", err)
        res.send(err)

    }
}

/**
*@description : To handel forgot password of user
*@param       : req (request from client)
*@param       : res (response from server)
*/
module.exports.userControllerForgotPassword = (req, res) => {
    try {

        var data={  
            email:req.body.email
      }
        //Express-validator is a middleware for Express on Node.js that can help you validate user input
        req.checkBody('email', 'email is not valid').isEmail()
        var errors = req.validationErrors();
        var response = {}
        if (errors) {
            response.success = false
            response.error = errors
            return res.status(422).send(response)
        } else {
           
           
            services.userServiceForgotPassword(data, (err, data) => {
                if (err) {
                    console.log(err + "error in userController callback block")
                    return res.status(500).send(err)
                } else {
                    console.log("55555",data[0]._id)
                   const payload = { id: data[0].id}
                 
                    //  A token is passed for authentication. It supports the stateless API calls.
                    const token = tokenGenn.tokenGen(payload)
                  //  console.log("111", token.token
                   redisSet.redisset(payload, token)
                   
                    const url = process.env.resetlink+token.token
                    subject="resetPassword link"
                    sendMailer.sendMailer(url,subject)
                             return res.status(200).send({
                                  success:true,
                                  message: "user forgot password succefully link sent to user mail id",
                                  token:token.token,
                                  data:data
                            })
                        }
                    })
                }
    } catch (err) {
        console.log("error in user controller forgot password block ", err)
        res.send(err)
    }
}

/**
*@description : To handel reset password of  user
*@param       : req (request from client)
*@param       : res (response from server)
*/
module.exports.userControllerResetPassword = (req, res) => {
    try {
        var data={  
            password:req.body.password,
            userId:req.id
      }
        req.checkBody('password', 'password is not valid').isLength({ min: 5 })
        const errors = req.validationErrors();
        const response = {
            success: false,
            error: errors
        }
        if (errors) {
            res.status(422).send(response)
        } else {
           
            services.userServiceResetPassword(data, (err, data) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.status(200).send({
                        success:true,
                        message:"resetpassword is successufull ",
                        data:data
                    }
                    )
                }
            })
        }
    } catch (err) {
        console.log("error in user controllerreset password", err)
        res.send(err)
    }
}

/**
*@description : To handel the emailVerification of  user
*@param       : req (request from client)
*@param       : res (response from server)
*/

module.exports.userControllerVerification = (req, res) => {
    try {

        var data={
            userId:req.id
        }
        services.userServiceVerification(data, (err, data) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send({
                    success:true,
                    message:"email verification is successfully done",
                    data:data
                })
            }
        })

    } catch (err) {
        console.log("error in user controllerreset password", err)
        res.send(err)
    }
}


/**
*@description : To handel the ControllerUploadImage of user
*@param       : req (request from client)
*@param       : res (response from server)
*/
module.exports.userControllerUploadImage = (req, res) => {
    try{

    console.log("\npic location --------<", req.file.location);
    var data={  
         address:req.file.location, 
        userId:req.id
  }
    services.userServicesUploadImage(data, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: err
            })
        } else {
            console.log("message is coming here", data)
            return res.status(200).send({
                success:true,
                message: "s3 api successfully completed",
                data:data
            });
        }

    })
 }catch(err){
        res.send(err)
    }
}



