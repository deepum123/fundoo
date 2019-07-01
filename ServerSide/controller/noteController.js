/******************************************************************************
 *  @Purpose        : To create note controller to handle the incoming data.
 *  @file           : noteControllers.js
 *  @author         : Deepu M
 *  @version        : npm 3.5.2
 *  @since          : 01-07-2019
 ******************************************************************************/


const logger = require('../services/vendors/logger').logger
const noteService = require('../services/Internal/noteServices')


/************************************************************************************
 * 
 * @Description : note Controller createNote function is used to create the new note ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.noteControllerCreateNote = (req, res) => {
    try {
        logger.info(" create note req body data ", req.body)
        var data = {
            userId: req.id,
            title: req.body.title,
            description: req.body.description,
            color: req.body.color

        }

        noteService.noteServiceCreateNote(data, (err, data) => {
            if (err) {
                logger.error(" note controller note create error ", err)
                res.status(500).send({
                    success: false,
                    message: "error occured in  create note function",
                    data: err
                })
            } else {
                logger.info(" create note res  data ", data)
                res.status(200).send({
                    success: true,
                    message: "successfully new note created",
                    data: data
                })
            }
        })
    } catch (err) {
        res.send(err)
    }
}

/************************************************************************************
 * 
 * @Description : note Controller GetNotes is used to get all notes of in user  ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.noteControllerGetNotes = (req, res) => {
    try {
        logger.info("  get notes req body   data ", req.body)
        var data = {
            page: req.body.page,
            userId: req.id
        }
        noteService.noteServiceGetNotes(data, (err, data) => {
            if (err) {
                logger.error(" note controller get notes  ", err)
                res.status(500).send({
                    success: false,
                    message: "error occured in  get notes function",
                    data: err
                })
            } else {
                logger.error(" get notes res  data ", data)
                res.status(200).send({
                    success: true,
                    message: "successfully get all notes created",
                    data: data
                })

            }
        })
    } catch (err) {
        res.send(err)
    }
}

/************************************************************************************
 * 
 * @Description : note Controller DeleteNote is used to detete the perticulat note  ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.noteControllerDeleteNote = (req, res) => {
    try {
        logger.info(" note delete note req body   data ", req.body)
        var data = {
            noteid: req.body.noteid
        }
        noteService.noteServiceDeleteNote(data, (err, data) => {
            if (err) {
                logger.error(" note controller delete note  error ", err)
                res.status(500).send({
                    success: false,
                    message: "error occured in  delete note function",
                    data: err
                })
            } else {
                logger.info(" delete note  res  data ", data)
                res.status(200).send({
                    success: true,
                    message: "successfully  succesfully delete the note",
                    data: data
                })

            }
        })
    } catch (err) {
        res.send(err)
    }
}


/************************************************************************************
 * 
 * @Description : note Controller isArchive  function is used archive the perticular note  ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.noteControllerIsArchive = (req, res) => {
    try {
        logger.info(" note is archive req body   data ", req.body)
        var data = {
            noteid: req.body.noteid,
            archive: req.body.archive
        }
        noteService.noteServiceIsArchive(data, (err, data) => {
            console.log("########", data)
            if (err) {
                logger.error(" note controller is archive error ", err)
                res.status(500).send({
                    success: false,
                    message: "error in note controller is archive function",
                    data: err
                })
            } else {
                logger.info(" note is archive res  data ", data)
                res.status(200).send({
                    success: true,
                    message: "successfully note archive done",
                    data: data
                })
            }
        })
    } catch (err) {
        res.send(err)
    }
}

/************************************************************************************
 * 
 * @Description : note Controller isPinned  function is used pinned  the perticular note  ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.noteControllerIsPinned = (req, res) => {
    try {
        logger.info(" note is pinned req body   data ", req.body)
        var data = {
            noteid: req.body.noteid,
            pinned: req.body.pinned
        }
        noteService.noteServiceIsPinned(data, (err, data) => {

            if (err) {
                logger.error(" note controller is pinned error ", err)
                res.status(500).send({
                    success: false,
                    message: "error in note controller is Pinned function",
                    data: err
                })
            } else {
                logger.info(" note is pinned res  data ", data)
                res.status(200).send({
                    success: true,
                    message: "successfully note pinned function is  done",
                    data: data
                })
            }
        })
    } catch (err) {
        res.send(err)
    }
}

/************************************************************************************
 * 
 * @Description : note Controller isTrashed  function  used Trashed the perticular note  ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.noteControllerIsTrashed = (req, res) => {
    try {
        logger.info(" note is  trash req body   data ", req.body)
        var data = {
            noteid: req.body.noteid,
            trash: req.body.trash
        }
        noteService.noteServiceIsTrashed(data, (err, data) => {

            if (err) {
                logger.error(" note controller is trashed error ", err)
                res.status(500).send({
                    success: false,
                    message: "error in note controller is Trashed function",
                    data: err
                })
            } else {
                logger.info(" note is trashed res  data ", data)
                res.status(200).send({
                    success: true,
                    message: "successfully note Trashed function is  done",
                    data: data
                })
            }
        })
    } catch (err) {
        res.send(err)
    }
}

/************************************************************************************
 * 
 * @Description : note Controller editTitle  function  used edit the title of  the perticular note  ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.noteControllerEditTitle = (req, res) => {
    try {
        logger.info(" note  edit title req body   data ", req.body)
        var data = {
            noteid: req.body.noteid,
            newtitle: req.body.newtitle
        }
        noteService.noteServiceEditTitle(data, (err, data) => {

            if (err) {
                logger.error(" note controller edit titile error ", err)
                res.status(500).send({
                    success: false,
                    message: "error in note controller edit title function",
                    data: err
                })
            } else {
                logger.info(" note edit title res  data ", data)
                res.status(200).send({
                    success: true,
                    message: "successfully note edit title function is  done",
                    data: data
                })
            }
        })
    } catch (err) {
        res.send(err)
    }
}

/************************************************************************************
 * 
 * @Description : note Controller editDescription  function  used edit the description  of  the perticular note  ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.noteControllerEditDescription = (req, res) => {
    try {
        logger.info(" note edit description  req body   data ", req.body)
        var data = {
            noteid: req.body.noteid,
            description: req.body.description

        }
        noteService.noteServiceEditDescription(data, (err, data) => {
            if (err) {
                logger.error(" note controller idit description error ", err)
                res.status(500).send({
                    success: false,
                    message: "error in note controller edit title function",
                    data: err
                })
            } else {
                logger.info(" note edit description  res  data ", data)
                res.status(200).send({
                    success: true,
                    message: "successfully note edit decription function is  done",
                    data: data
                })
            }
        })
    } catch (err) {
        res.send(err)
    }
}

/************************************************************************************
 * 
 * @Description : note Controller Update color  function  used update  the color of  the perticular note  ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.noteControllerUpdateColor = (req, res) => {
    try {
        logger.info(" note update color req body   data ", req.body)
        var data = {
            noteid: req.body.noteid,
            color: req.body.color
        }
        noteService.noteServiceUpdateColor(data, (err, data) => {
            if (err) {
                logger.error(" note controller update color error ", err)
                res.status(500).send({
                    success: false,
                    message: "error in note controller update color  function",
                    data: err
                })
            } else {
                logger.info(" note update color res  data ", data)
                res.status(200).send({
                    success: true,
                    message: "successfully note edit decription function is  done",
                    data: data
                })
            }
        })
    } catch (err) {
        res.send(err)
    }
}


/************************************************************************************
 * 
 * @Description : note Controller note remainder  function  used to add remainder  to the perticular note  ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.noteControllerNoteRemainder = (req, res) => {
    try {
        logger.info(" note remainder req body   data ", req.body)
        var data = {
            noteid: req.body.noteid,
            remainder: req.body.remainder
        }
        noteService.noteServiceNoteRemainder(data, (err, data) => {
            if (err) {
                logger.error(" note controller note reminder  error ", err)
                res.status(500).send({
                    success: false,
                    message: "error in note controller update color  function",
                    data: err
                })
            } else {
                logger.info(" note remainder res  data ", data)
                res.status(200).send({
                    success: true,
                    message: "successfully note edit decription function is  done",
                    data: data
                })
            }
        })
    } catch (err) {
        res.send(err)
    }
}


/************************************************************************************
 * 
 * @Description : note Controller erashTrash function is used to to delete the all trashed notes  ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.noteControllerErashTrash = (req, res) => {
    try {
        logger.info(" note controller erash trash   req body   data ", req.body)
        var data = {
            userId: req.id
        }
        noteService.noteServiceErashTrash(data, (err, data) => {
            if (err) {
                logger.error(" note controller erash trash  error ", err)
                res.status(500).send({
                    success: false,
                    message: "error in note controller update color  function",
                    data: err
                })
            } else {
                logger.info(" note erash trash res data  ", data)
                res.status(200).send({
                    success: true,
                    message: "successfully note edit decription function is  done",
                    data: data
                })
            }
        })
    } catch (err) {
        res.send(err)
    }
}

/************************************************************************************
 * 
 * @Description : note Controller Update Image function is used to udate the image of perticular note  ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.noteControllerUpdateImage = (req, res) => {
    try {
        logger.info(" note image update req body   data ", req.body)
        console.log("\npic location --------<", req.file.location);
        var data = {
            address: req.file.location,
            userId: req.id
        }
        noteService.noteServicesUpdateImage(data, (err, data) => {
            if (err) {
                logger.error(" note controller update image  error ", err)
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            } else {
                logger.info(" note update iamge  res  data ", data)
                return res.status(200).send({
                    success: true,
                    message: "s3 api successfully completed",
                    data: data
                });
            }

        })
    } catch (err) {
        res.send(err)
    }
}

/************************************************************************************
 * 
 * @Description : note Controller search function is used to search notes based on note  properties ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.noteControllerSearch = (req, res) => {
    try {
        logger.info(" note search   req body   data ", req.body)
        var data = {
            userId: req.id,
            noteid: req.body.noteid,
            description: req.body.description,
            title: req.body.title,
            color: req.body.color,
        }
        noteService.noteServiceSearch(data, (err, data) => {
            if (err) {
                logger.error(" note controller search  error ", err)
                res.status(500).send({
                    success: false,
                    message: "error occured in  get note function",
                    data: err
                })
            } else {
                logger.info(" note search res  data ", data)
                res.status(200).send({
                    success: true,
                    message: "successfully  get the perticular node",
                    data: data
                })

            }
        })
    } catch (err) {
        res.send(err)
    }
}