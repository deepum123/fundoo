
const model = require('/home/admin1/Desktop/fundoo/ServerSide/app/model/userModel.js')
const bcryptjs = require('bcryptjs')
class userServices {
   
    constructor() { }
    
    userServiceRegister(data,callback) {
       var hashPassword  =this.hash(data.password)
       data.hashPassword=hashPassword
        model.put( data, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                console.log("user service data :", data)
                return callback(null, data)
            }
        })

    }
    userServiceLogin(data,callback) {
        model.getVer(data, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    }
    userServiceForgotPassword(req,callback) {
        model.get(req, (err, data) => {
            if (err) {
                console.log(err + "error in userServiceeeee")
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    }
    userServiceResetPassword(data,callback) {
        console.log("##########",data)
        var hashPassword  =this.hash(data.password)

        var field= { password: hashPassword }
        
        model.Update(data,field, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    }
    userServiceVerification(data,callback) {
       var field= { isVerified: true }
        model.Update(data, field,(err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    }
    userServicesUploadImage(data,callback) {
      
       var field= { uploadImage: data.address }
        model.Update(data,field, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    }

    hash(password) 
{
    var salt = bcryptjs.genSaltSync(10)
    var hashpassword = bcryptjs.hashSync(password, salt)
    return hashpassword
}
}


const s=new userServices()
module.exports=s
