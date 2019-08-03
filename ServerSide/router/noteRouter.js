
const auth=require('../middleware/authentication')
const noteController=require('../controller/noteController')
const upload=require('../services/vendors/s3ApiServices')
const express=require('express')
const router=express.Router()

//router.post('/createNote',auth.auth,noteController.noteControllerCreateNote)
router.route('/createNote').post(auth.auth, noteController.noteControllerCreateNote);
//router.post('/deleteNote',auth.auth,noteController.noteControllerDeleteNote)
router.route('/deleteNote').put(auth.auth,noteController.noteControllerDeleteNote);
//router.post('/getAllNotes',auth.auth,noteController.noteControllerGetNotes)
router.route('/getAllNotes').get(auth.auth, noteController.noteControllerGetNotes);
//router.post('/isArchive',auth.auth,noteController.noteControllerIsArchive)
router.route('/isArchive').put(auth.auth,noteController.noteControllerIsArchive);
//router.post('/isPinned',auth.auth,noteController.noteControllerIsPinned)
router.route('/isPinned').put(auth.auth,noteController.noteControllerIsPinned);
router.post('/isTrashed',auth.auth,noteController.noteControllerIsTrashed)
router.route('/saveLabelToNote').post(auth.auth,noteController.labelControllerAddNoteTolabel);
router.route('/RemoveLabelFromNote').post(auth.auth,noteController.labelControllerRemoveNoteTolabel);

//router.post('/editTitle',auth.auth,noteController.noteControllerEditTitle)
router.route('/editTitle').put(auth.auth,noteController.noteControllerEditTitle);
//router.post('/editDescription',auth.auth,noteController.noteControllerEditDescription)
router.route('/editDescription').put(auth.auth,noteController.noteControllerEditDescription);
//router.post('/updateColor',auth.auth,noteController.noteControllerUpdateColor)
router.route('/updateColor').put(auth.auth,noteController.noteControllerUpdateColor);
router.post('/search',auth.auth,noteController.noteControllerSearch)
//router.post('/remainder',auth.auth,noteController.noteControllerNoteRemainder)
router.route('/remainder').put(auth.auth,noteController.noteControllerNoteRemainder);
router.route('/Removeremainder').put(auth.auth,noteController.noteControllerRemoveRemainder);
router.post('/erashTrash',auth.auth,noteController.noteControllerErashTrash)
//router.post('/updateImagee',auth.auth,upload.single('image'),noteController.noteControllerUpdateImage)

module.exports=router
