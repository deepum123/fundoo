
/************************************************************************************
 * @purpose   : Redis is a fast and efficient in-memory key-value store.
 *              It is also known as a data structure server, as the keys can contain strings, lists, sets, hashes and other data structures
 * 
 * @file      :redis.js
 * @overview  : verify the user token 
 * @author    : Deepu M
 * @version   : npm 3.5.2
 * @since     : 24.06.2019
 * 
 *************************************************************************************/



const jwt = require('jsonwebtoken')
const secret = 'fundoo'

var redis = require('redis');
var client = redis.createClient();


module.exports.tokenVerify = (req, res, next) => {
    try {


        client.get(req.body.email, function (err, token) {
            if (err) {

            }
            else {
                console.log("token provided is:", token);

            };
            console.log("reply", token)

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
        })
    }
    catch (err) {
        console.log("error occured in token verify block", err)
        res.send(err)
    }
}