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

 let multer  = require('multer'); 
 let upload  = multer({ storage: multer.memoryStorage() });
const controller=require('../controller/userController')

const express=require('express')
const router=express.Router()
const s3service=require('../services/vendors/s3ApiServices')
const auth=require('../middleware/authentication')
//router.route('/S3CreateBucket').post(upload.single('image'),uploadd.uploaddd);
router.route('/register').post(controller.userControllerRegister);
router.route('/verification/:token').get(auth.auth,controller.userControllerVerification)
//router.post('/verification/:token',auth.auth,controller.userControllerVerification)
router.post('/login',controller.userControllerLogin)
router.post('/forgotpassword',controller.userControllerForgotPassword)
//router.post('/resetpassword/:token',auth.auth,controller.userControllerResetPassword)
router.route('/resetpassword/:token').post(auth.auth,controller.userControllerResetPassword)
router.post('/uploadImage',auth.auth,upload.single('image'),s3service.upload,controller.userControllerUploadImage)
module.exports=router