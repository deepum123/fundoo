/************************************************************************************
 * @purpose   : Used to provide user routes to web pages.
 * 
 * @file      : routes.js
 * @overview  : provides routes to web pages.
 * @author    : Deepu M
 * @version   : 1.0
 * @since     : 15.06.2019
 * 
 *************************************************************************************/

const controller=require('../controller/userController')

const token=require('../middleware/tokenVerify')
const redis=require('../config/redis')

const express=require('express')
const router=express.Router()
const upload=require('../config/s3ApiServices')


router.post('/register',controller.userControllerRegister)
router.post('/emailverification',redis.tokenVerify,controller.userControllerEmailVerification)
router.post('/login',controller.userControllerLogin)
router.post('/forgotpassword',controller.userControllerForgotPassword)
router.post('/resetpassword',redis.tokenVerify,controller.userControllerResetPassword)
//router.post('/:code', controller.userControllerPosturl)
router.post('/uploadImage',upload.single('image'),token.tokenVerify,controller.userControllerUploadImage)
module.exports=router