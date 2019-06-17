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
const express=require('express')
const router=express.Router()
router.post('/register',controller.userControllerRegister)
router.post('/emailverification/:token',token.tokenVerify,controller.userControllerEmailVerification)
router.post('/login',controller.userControllerLogin)
router.post('/forgotpassword',controller.userControllerForgotPassword)
router.post('/resetpassword/:token',token.tokenVerify,controller.userControllerResetPassword)

module.exports=router