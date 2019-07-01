/******************************************************************************
*  @Purpose        : To create a note schema and store data into database.
*  @file           : noteModels.js
*  @author         : Deepu M
*  @version        : npm 3.5.2
*  @since          : 01-07-2019
******************************************************************************/

const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false);

/*******************************************************************************
 * @description : Creating note schema using mongoose
 ******************************************************************************/
const schema = mongoose.Schema
const noteSchema = new schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    title: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    remainder: {
        type: String
    },
    color: {
        type: String
    },
    image: {
        type: String
    },
    archive: {
        type: Boolean,
        default: false
    },
    pinned: {
        type: Boolean,
        default: false
    },
    trash: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    })
const note = mongoose.model('notes', noteSchema)



class notemodel {
    constructor() { }

    /*******************************************************************************************************
     * @description:it will add the notes data using note schema and save the data into the database
     * @param {*request from frontend} objectNote
     * @param {*response from  backend to frontend } callback
     ******************************************************************************************************/

    async  createNote(data, callback) {
        try {
            const newNote = new note({
                userId: data.userId,
                title: data.title,
                description: data.description,
                color: data.color
            })
            await newNote.save((err, data) => {
                if (err) {
                    callback(err)
                } else {
                    callback(null, data)
                }
            })

        } catch (err) {
            callback(err)
        }
    }


    /*******************************************************************************************************
     * @description:it will delete the perticular note from database
     * @param {*request from frontend} objectNote
     * @param {*response from  backend to frontend } callback
     ******************************************************************************************************/

    async deleteNote(data, callback) {
        try {
            await note.findOneAndDelete({ "_id": data.noteid }, (err, data) => {
                if (err) {
                    callback(err)
                } else {
                    callback(null, data)
                }
            })
        }
        catch (err) {
            callback(err)
        }
    }


    /*******************************************************************************************************
     * @description:it will get all notes stored in data basebase for perticular user
     * @param {*request from frontend} objectNote
     * @param {*response from  backend to frontend } callback
     ******************************************************************************************************/

    /* async  getAll(data, callback) {
           try {
    
          await   note.find({ 'userId': data.userId }, (err, data) => {
                   if (err) {
                       callback(err)
                   } else {
                       callback(null, data)
                   }
   
               })
           }
           catch (err) {
               callback(err)
           }
       }
   */
    async  getAll(data, callback) {

        var perPage = 3
        var page = data.page || 1


        await note.find({ 'userId': data.userId })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .then((data) => {
                callback(null, data)

            }).catch((err) => {
                callback(err)
            })
    }

    /*******************************************************************************************************
     * @description:it will Update perticular field of note and stored data in database
     * @param {*request from frontend} objectNote
     * @param {*response from  backend to frontend } callback
     ******************************************************************************************************/

    async  Update(data, field, callback) {
        try {
            console.log(data, "%%%%%%%%%%%", field)
            await note.findOneAndUpdate({ '_id': data.noteid }, field, (err, data) => {
                if (err) {
                    callback(err)

                } else {
                    callback(null, data)
                    console.log("1111111111", data)
                }

            })
        }
        catch (err) {
            callback(err)
        }

    }


    /*******************************************************************************************************
     * @description:it will delete the all trashed notes of user
     * @param {*request from frontend} objectNote
     * @param {*response from  backend to frontend } callback
     ******************************************************************************************************/

    async deleteMany(data, field, callback) {
        try {

            await note.deleteMany({ $and: [{ 'userId': data.userId }, field] }, (err, data) => {
                if (err) {
                    callback(err)
                } else {
                    callback(null, data)
                }

            })
        }
        catch (err) {
            callback(err)
        }
    }


    /*******************************************************************************************************
     * @description:it will search the perticular note based on that properties and return the note 
     * @param {*request from frontend} objectNote
     * @param {*response from  backend to frontend } callback
     ******************************************************************************************************/

    async  search(data, field, callback) {
        try {
            await note.find({ $and: [{ 'userId': data.userId }, field] }, (err, data) => {
                if (err) {
                    callback(err)
                } else {
                    callback(null, data)
                    console.log("&&&&&", data)
                }

            })

        }

        catch (err) {
            callback(err)
        }
    }
}

const noteObj = new notemodel()
module.exports = noteObj