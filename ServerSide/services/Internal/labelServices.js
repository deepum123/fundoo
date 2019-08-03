/******************************************************************************
 *  @Purpose        : To create note services that will send the incoming data
 *                  to labelModel and save that data to database and at login
 *                  time fetching correct information from database.
 *  @file           : labelServices.js
 *  @author         : Deepu.M
 *  @version        : npm 3.5.2
 *  @since          : 08-07-2019
 *
 ******************************************************************************/




const labelModel=require('../../app/model/labelModel')

class labelServices{
constructor(){}

  /**************************************************************************** 
    *@description : To send create new label  data to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
noteServiceCreateLabel(data, callback) {
    labelModel.createLabel(data, (err, data) => {
        if (err) {
            callback(err)
        } else {
            callback(null, data)
        }
    })

}
/**************************************************************************** 
    *@description : To send get labels   data to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
noteServiceGetLabels(data, callback) {
    labelModel.getAll(data, (err, data) => {
        if (err) {
            callback(err)
        } else {
            callback(null, data)
        }
    })

}
/**************************************************************************** 
    *@description : To send delete label data to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
noteServiceDeleteLabel(data,callback) {
    labelModel.delete(data, (err, data) => {
        if (err) {
            callback(err)
        } else {
            callback(null, data)
        }
    })
}
/**************************************************************************** 
    *@description : To send edit label name to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
noteServiceEditLabelName(data, callback) {
    var field = {
        label:data.label
    }
    labelModel.Update(data, field, (err, data) => {
        if (err) {
            callback(err)
        } else {
            callback(null, data)
        }
    })
}

/**************************************************************************** 
    *@description : To send add note to label data to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
noteServiceAddNoteToLabel(data, callback) {
    var field = {
        $addToSet:{label: data.labelid}
    }
    console.log("33333333333",field)
    labelModel.Update(data, field, (err, data) => {
        if (err) {
            callback(err)
        } else {
            callback(null, data)
        }
    })
}
/**************************************************************************** 
    *@description : To send RemoveNote from label  data to models and callback the return data to controller
    *@param       : req (request from client)
    *@param       : callback (response from server)
    ****************************************************************************/
noteServiceRemoveNoteFromLabel(data, callback) {
    var field = {
        $unset:{noteid: data.noteid}
    }
    console.log("33333333333",field)
    labelModel.Update(data, field, (err, data) => {
        if (err) {
            callback(err)
        } else {
            callback(null, data)
        }
    })
}


}
const labelServicesObj=new labelServices()
module.exports=labelServicesObj