const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false);

const schema = mongoose.Schema
const noteSchema = new schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    title: {
        type: String
    },
    description: {
        type: String
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
        type: Boolean
    },
    pinned: {
        type: Boolean
    },
    trash: {
        type: Boolean
    }
},
    {
        timestamps: true
    })
const note = mongoose.model('notes', noteSchema)



class notemodel {
    constructor() { }

    createNote(data, callback) {
        const newNote = new note({
            userId: data.userId,
            title: data.title,
            description: data.description,
            color: data.color
        })
        newNote.save((err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })



    }

    deleteNote(data, callback) {
        note.findOneAndDelete({ "_id": data.noteid }, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }
        })
    }

    getAll(data, callback) {

        note.find({ 'userId': data.userId }, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }

        })
    }

    get(data, callback) {
console.log("&&&&&",data)
        note.find({'_id': data.noteid }, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
                console.log("&&&&&",data)
            }

        })
    }
    Update(data,field,callback) {
        console.log(data,"%%%%%%%%%%%",field)
        note.findOneAndUpdate({ '_id': data.noteid },field,(err,data)=>{
            if (err) {
                callback(err)

            } else {
                callback(null, data)
                console.log("1111111111",data)
            }

        })

     }

     deleteMany(data,field, callback) {

        note.deleteMany({ $and: [{ 'userId': data.userId  }, field] }, (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
            }

        })
    }
    search(data,field,callback){
        note.find([ { 'userId': data.userId  }&{  '_id': data.noteid }||{ description: data.description} ], (err, data) => {
            if (err) {
                callback(err)
            } else {
                callback(null, data)
                console.log("&&&&&",data)
            }

        })

    }

}

const noteObj = new notemodel()
module.exports = noteObj