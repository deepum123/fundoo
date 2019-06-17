const jwt=require('jsonwebtoken')

const secret='fundoo'
module.exports.tokenGen=(payload)=>{
    try{
    const token=jwt.sign({payload},secret,{expiresIn:'2h'})
    const obj={
        success:true,
        message:'token generated',
        token:token
    }
return obj
    }catch(err){
        console.log("error occured in the token gen block",err)
    }
}