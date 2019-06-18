
/************************************************************************************
 * @purpose   : A JSON Web Token(JWT), defines an explicit, compact, and self-containing secured protocol for transmitting restricted informations
 * 
 * @file      : tokenGen.js
 * @overview  :generate the user token
 * @author    : Deepu M
 * @version   : npm 3.5.2
 * @since     : 15.06.2019
 * 
 *************************************************************************************/




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