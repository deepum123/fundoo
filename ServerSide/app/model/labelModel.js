
/******************************************************************************
*  @Purpose        : To create label schema and store data into database.
*  @file           : noteModels.js
*  @author         : Deepu M
*  @version        : npm 3.5.2
*  @since          : 08-07-2019
******************************************************************************/

const mongoose = require('mongoose')
const schema = mongoose.Schema



/*******************************************************************************
 * @description : Creating label schema using mongoose
 ******************************************************************************/

let labelSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userSchema"
    },
    label: {
        type: String,
        required: true,
        unique: true
    },
    noteid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "noteSchema"
    }]

}, {
        timestamps: true
    })

let label = mongoose.model("label", labelSchema)

class labelModel {
    constructor() { }

     /*******************************************************************************************************
     * @description:it will create the label using label schema and save the data into the database
     * @param {*request from frontend} data
     * @param {*response from  backend to frontend } callback
     ******************************************************************************************************/
    async  createLabel(data, callback) {

        const newLabel = new label({
            userId: data.userId,
             label:data.label
        })
        var myPromise = new Promise(function(resolve, reject) { 
            newLabel.save((err, data) => {
                if(err){
                    reject(err)
                }else{
                resolve(data) 
                }
            })
        })
       myPromise. 
        then(function (result) { 
            callback(null,result)
        }). 
        catch(function (result) { 
            callback(result) 
        });

    }
     /*******************************************************************************************************
     * @description:it will get all labels  store in data base of perticular person
     * @param {*request from frontend} data
     * @param {*response from  backend to frontend } callback
     ******************************************************************************************************/
    async  getAll(data, callback) {
        var myPromise = new Promise(function(resolve, reject) { 
            label.find({ 'userId': data.userId }, (err, data) => {
                if(err){
                    reject(err)
                }else{
                resolve(data) 
                }
            })
        })
       myPromise. 
        then(function (result) { 
            callback(null,result) 
        }). 
        catch(function (result) { 
            callback(result)
        });

    }

    /*******************************************************************************************************
     * @description:it will delete the label from data base
     * @param {*request from frontend} data
     * @param {*response from  backend to frontend } callback
     ******************************************************************************************************/
    async delete(data, callback) {
        console.log("heeeeeeeeeeeeeeeeeeeeeeee",data.labelid)
        var myPromise = new Promise(function(resolve, reject) { 
            label.findOneAndDelete({ '_id': data.labelid }, (err, data) => {
                if(err){
                    console.log("heeeeeeeeeeeeeeeeeeeeeeee")
                    reject(err)
                }else{
                    console.log("yyyyyyyyyyyyyyyyyyyyyyyy")
                resolve(data) 
                }
            })
        })
       myPromise. 
        then(function (result) { 
            console.log("resul",result)
            callback(null,result) 
        }). 
        catch(function (result) { 
            callback(result)
        });

    }
 /*******************************************************************************************************
     * @description:it will update the label and stored in database
     * @param {*request from frontend} data
     * @param {*response from  backend to frontend } callback
     ******************************************************************************************************/
    async Update(data, field, callback) {
        console.log("11111111111",data)
        var myPromise =  new Promise(function(resolve, reject) { 
            note.findOneAndUpdate({ $and:[{userId: data.userId},{"_id":data.noteid}]}, field, (err, data) => {
                if(err){
                    reject(err)
                }else{
                resolve(data) 
                }
            })
        })
       myPromise. 
        then(function (result) { 
            console.log("777777777777",result)
            callback(null,result)
        }). 
        catch(function (result) { 
            callback(result) 
        });
}
}

const labelModelobj = new labelModel()
module.exports = labelModelobj