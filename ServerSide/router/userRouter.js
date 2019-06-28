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

const express=require('express')
const router=express.Router()
const upload=require('../services/vendors/s3ApiServices')
const auth=require('../middleware/authentication')


router.post('/register',controller.userControllerRegister)
router.post('/verification/:token',auth.auth,controller.userControllerVerification)
router.post('/login',controller.userControllerLogin)
router.post('/forgotpassword',controller.userControllerForgotPassword)
router.post('/resetpassword/:token',auth.auth,controller.userControllerResetPassword)

router.post('/uploadImage',auth.auth,upload.single('image'),controller.userControllerUploadImage)
module.exports=router