var redis = require('redis')
var client = redis.createClient()
module.exports.redisset = (token1, token) => {
    try {
     
        client.set(token1, token, function (err, result) {
            if (err) {
                console.log("errr in setting token in redis cache");
            }
            else {
                console.log("token saved in redis", result)
            
            }
        })
    } catch (err) {
        console.log("error occure in redis set", err)
    }
}