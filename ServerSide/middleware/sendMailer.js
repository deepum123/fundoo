const nodemailer=require('nodemailer')

module.exports.sendMailer=(url)=>{
    try{
    const transpoter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    })

    const mailOption={
        from:'deepum648@gmail.com',
        to:'deepum648@gmail.com',
        subject:'fundoo app reset password link',
        text:'click this link and reset your password'+url
    }
    transpoter.sendMail(mailOption,(err,info)=>{
        if(err){
            console.log("error in send mailer")
            console.log(err)
        }else{
         console.log("successfully reset mail send to the user email address")
         console.log(info)
        }
    })
}catch(err){
    console.log("error occured in the send mailer block",err)
}
}