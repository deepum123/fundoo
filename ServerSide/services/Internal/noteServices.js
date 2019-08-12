/******************************************************************************
 *  @Purpose        : To create note services that will send the incoming data
 *                  to noteModel and save that data to database and at login
 *                  time fetching correct information from database.
 *  @file           : noteServices.js
 *  @author         : Deepu.M
 *  @version        : npm 3.5.2
 *  @since          : 01-07-2019
 *
 ******************************************************************************/

const noteModel = require('/home/admin1/Desktop/fundoo/ServerSide/app/model/noteModel.js')

class noteServices {
    constructor() { }

    /**************************************************************************** 
    *@description : To send create new note  data to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    noteServiceCreateNote(data, callback) {
        noteModel.createNote(data, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })

    }

    /**************************************************************************** 
    *@description : To send   data about  getAll note api to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    noteServiceGetNotes(data, callback) {
        noteModel.getAll(data, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })

    }


    /**************************************************************************** 
    *@description : To send   data about  delete note api to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    noteServiceDeleteNote(data, callback) {
        noteModel.deleteNote(data, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }


    /**************************************************************************** 
    *@description : To send   data about  isArchive api to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
   noteServiceIsArchive(data, callback) {
        var field = {
            archive: data.archive,
            trash: false,
            pinned: false
        }
        noteModel.Update(data, field, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)

            }
        })
    }

    /**************************************************************************** 
    *@description : To send   data about isPinned api to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    noteServiceIsPinned(data, callback) {

        var field = {
            pinned: data.pinned,
            trash: false,
            archive: false
        }
        noteModel.Update(data, field, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }
    /**************************************************************************** 
    *@description : To send   data about isTrashed api to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    noteServiceIsTrashed(data, callback) {
        var field = {
            trash: data.trash,
            archive: false,
            pinned: false
        }
        noteModel.Update(data, field, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }

    /**************************************************************************** 
    *@description : To send   data about editTitle api to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    noteServiceEditTitle(data, callback) {
        var field = {
            title: data.newtitle,
        }
        noteModel.Update(data, field, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }

    /**************************************************************************** 
    *@description : To send   data about editDescription api to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    noteServiceEditDescription(data, callback) {
        var field = {
            description: data.description
        }
        noteModel.Update(data, field, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }

    /**************************************************************************** 
    *@description : To send   data about Update color api to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    noteServiceUpdateColor(data, callback) {
        var field = {
            color: data.color
        }
        noteModel.Update(data, field, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }

    /**************************************************************************** 
    *@description : To send   data about note Remaider api to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    noteServiceNoteRemainder(data, callback) {
        var field = {
            $addToSet:{ remainder: data.remainder}
           
        }
        noteModel.Update(data, field, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }
    noteServiceRemoveRemainder(data, callback) {
        var field = {
            $pull:{remainder: data.remainder}
        }
        noteModel.Update(data, field, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }

    /**************************************************************************** 
    *@description : To send   data about  erashTrash api to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    noteServiceErashTrash(data, callback) {
        var field = {
            trash: true
        }
        noteModel.deleteMany(data, field, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }
    /**************************************************************************** 
    *@description : To send   data about  update image api to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    noteServicesUpdateImage(data, callback) {
        var field = { image: data.address }
        noteModel.Update(data, field, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    }
    /**************************************************************************** 
    *@description : To send   data about  note search api to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
    noteServiceSearch(data, callback) {
        var field =
        {
             title: data.title 
            // $or: [
            //     { "description": data.description },
            //     { '_id': data.noteid },
            //     { title: data.title },
            //     { color: data.color },

            // ]
        }

        noteModel.search(data, field, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    }


    noteServiceAddNoteToLabel(data, callback) {
        var field = {
            $addToSet:{label: data.labelid}
        }
        console.log("33333333333",field)
        noteModel.Update(data, field, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }
    noteServiceRemoveNoteToLabel(data, callback) {
        var field = {
            $pull:{label: data.label}
        }
        console.log("33333333333",field)
        noteModel.Update(data, field, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }
}

const noteServicesOBj = new noteServices()
module.exports = noteServicesOBj