
const auth=require('../middleware/authentication')
const noteController=require('../controller/noteController')
const upload=require('../services/vendors/s3ApiServices')
const express=require('express')
const router=express.Router()

router.post('/createNote',auth.auth,noteController.noteControllerCreateNote)
router.post('/deleteNote',auth.auth,noteController.noteControllerDeleteNote)
router.post('/getAllNotes',auth.auth,noteController.noteControllerGetNotes)
router.post('/isArchive',auth.auth,noteController.noteControllerIsArchive)
router.post('/isPinned',auth.auth,noteController.noteControllerIsPinned)
router.post('/isTrashed',auth.auth,noteController.noteControllerIsTrashed)
router.post('/editTitle',auth.auth,noteController.noteControllerEditTitle)
router.post('/editDescription',auth.auth,noteController.noteControllerEditDescription)
router.post('/updateColor',auth.auth,noteController.noteControllerUpdateColor)
router.post('/search',auth.auth,noteController.noteControllerSearch)
router.post('/remainder',auth.auth,noteController.noteControllerNoteRemainder)
router.post('/erashTrash',auth.auth,noteController.noteControllerErashTrash)
router.post('/updateImage',auth.auth,upload.single('image'),noteController.noteControllerUpdateImage)

module.exports=router