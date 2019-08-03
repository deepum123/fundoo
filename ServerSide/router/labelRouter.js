const auth=require('../middleware/authentication')
const labelController=require('../controller/labelController')
const express=require('express')
const router=express.Router()
//router.post('/createlabel',auth.auth,labelController.labelControllerCreateLabel)
router.route('/createlabel').post(auth.auth,labelController.labelControllerCreateLabel);
//router.post('/getlabels',auth.auth,labelController.labelControllerGetLabels)
router.route('/getlabels').post(auth.auth,labelController.labelControllerGetLabels);
//router.post('/deletelabel',auth.auth,labelController.labelControllerDeleteLabel)
router.route('/deletelabel').post(auth.auth,labelController.labelControllerDeleteLabel);
//router.post('/editlabelname',auth.auth,labelController.labelControllerEditLabelName)
router.route('/editlabelname').post(auth.auth,labelController.labelControllerEditLabelName);
//router.post('/saveLabelToNote',auth.auth,labelController.labelControllerAddNoteTolabel)
//router.route('/saveLabelToNotee').post(auth.auth,labelController.labelControllerAddNoteTolabel);
router.post('/removenotefromlabel',auth.auth,labelController.labelControllerRemoveNoteFromLabel)
module.exports=router