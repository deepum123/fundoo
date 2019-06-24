
/************************************************************************************
 * @purpose   : A JSON Web Token(JWT), defines an explicit, compact, and self-containing secured protocol for transmitting restricted informations
 * 
 * @file      : tokenGen.js
 * @overview  : verify the user token 
 * @author    : Deepu M
 * @version   : npm 3.5.2
 * @since     : 15.06.2019
 * 
 *************************************************************************************/


 
const jwt = require('jsonwebtoken')
const secret = 'fundoo'

module.exports.tokenVerify = (req, res, next) => {
    try {
        // var token=req.headers['token']
        var token = req.headers['token']
        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    console.log("error in token verify")
                    res.status(500).send(err)
                } else {
                    console.log("decode data " + JSON.stringify(decoded))
                    req.decoded = decoded
                    next()
                }
            })
        } else {
            console.log("token is not there in header")
        }
    }
    catch (err) {
        console.log("error occured in token verify block", err)
        res.send(err)
    }
}