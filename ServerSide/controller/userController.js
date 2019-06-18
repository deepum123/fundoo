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

const services = require('../services/userServices')
const tokenGenn = require('../middleware/tokenGen')
const sendMailer = require('../middleware/sendMailer')

/*
*@description : To handel regester of new user
*@param       : req (request from client)
*@param       : res (response from server)
*/

module.exports.userControllerRegister = (req, res) => {
    try {

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
            services.userServiceRegister(req.body, (err, data) => {
                if (err) {
                    console.log(err + "error in userController callback block")
                    return res.status(500).send(err)
                } else {
                    const payload = { email: req.body.email }

                    //  A token is passed for authentication. It supports the stateless API calls.
                    const token = tokenGenn.tokenGen(payload)
                    const url = `http://localhost:3000/#!/emailverification/${token.token}`

                    //The Nodemailer module makes it easy to send url mails from your computer.
                    sendMailer.sendMailer(url)
                    return res.status(200).send({
                        message: data,
                        url: url,
                        token: token
                    })
                }
            })
        }
    } catch (err) {
        console.log("error in user controller register ", err)
        res.send(err)
    }
}
/*
*@description : To handel login of  user
*@param       : req (request from client)
*@param       : res (response from server)
*/

module.exports.userControllerLogin = (req, res) => {
    try {

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
            services.userServiceLogin(req.body, (err, data) => {
                console.log("emailofbody" + req.body.email)
                if (err) {
                    console.log(err)
                    return res.status(500).send(err)
                } else {
                    console.log("emailofbody" + req.body.email)
                    var payload = {
                        'email': req.body.email
                    }
                    console.log("emailofbody " + payload)

                    //  A token is passed for authentication. It supports the stateless API calls.
                    var token = tokenGenn.tokenGen(payload)
                    console.log(token + "token is generatefd")
                    return res.status(200).send({
                        message: data,
                        token: token
                    })
                }
            })
        }
    } catch (err) {
        console.log("error in usercontrollerLogin ", err)
        res.send(err)

    }
}

/*
*@description : To handel forgot password of user
*@param       : req (request from client)
*@param       : res (response from server)
*/
module.exports.userControllerForgotPassword = (req, res) => {
    try {

        //Express-validator is a middleware for Express on Node.js that can help you validate user input.
        req.checkBody('email', 'email is not valid validate by express validators ').isEmail()
        const errors = req.validationErrors();
        var response = {}
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(422).send(response)
        }
        else {
            services.userServiceForgotPassword(req.body, (err, data) => {
                if (err) {
                    return res.status(500).send(err)
                } else {
                    const payload = { email: req.body.email }

                    //  A token is passed for authentication. It supports the stateless API calls.
                    const token = tokenGenn.tokenGen(payload)
                    const url = `http://localhost:3000/#!/resetpassword/${token.token}`

                    //The Nodemailer module makes it easy to send url mails from your computer.
                    sendMailer.sendMailer(url)
                    return res.status(200).send({
                        message: data,
                        url: url,
                        token: token
                    })
                }

            })
        }
    } catch (err) {
        console.log("error in user controller forgor password", err)
        res.send(err)
    }
}

/*
*@description : To handel reset password of  user
*@param       : req (request from client)
*@param       : res (response from server)
*/
module.exports.userControllerResetPassword = (req, res) => {
    try {
        req.checkBody('password', 'password is not valid').isLength({ min: 5 })
        const errors = req.validationErrors();
        const response = {
            success: false,
            error: errors
        }
        if (errors) {
            res.status(422).send(response)
        } else {
            services.userServiceResetPassword(req, (err, data) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.status(200).send(data)
                }
            })
        }
    } catch (err) {
        console.log("error in user controllerreset password", err)
        res.send(err)
    }
}

/*
*@description : To handel the email verification of  user
*@param       : req (request from client)
*@param       : res (response from server)
*/

module.exports.userControllerEmailVerification = (req, res) => {
    try {
        services.userServiceEmailVerification(req, (err, data) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(data)
            }
        })

    } catch (err) {
        console.log("error in user controllerreset password", err)
        res.send(err)
    }
}
