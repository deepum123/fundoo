var redis = require('redis');
var client = redis.createClient();
module.exports.redisset=(payload,token)=>{
try{
  console.log("2222222aw",payload)
client.set(payload.id.toString(), token.token.toString(), function (err, result) {
    if (err) {
        console.log("errr in setting token in redis cache");
    }
    else {
        console.log("token saved in redis", result)
        console.log("payload data", payload.id)
    }
})
}catch(err){
console.log("error occure in redis set",err)
}
}