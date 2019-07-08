
/******************************************************************************
 *  @Purpose        : To create label controller to handle the incoming data.
 *  @file           : labelController.js
 *  @author         : Deepu M
 *  @version        : npm 3.5.2
 *  @since          : 08-07-2019
 ******************************************************************************/




const labelService = require('../services/Internal/labelServices')
const logger = require('../services/vendors/logger').logger



/************************************************************************************
 * 
 * @Description : label Controller createLabel function is used to create new label ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.labelControllerCreateLabel = (req, res) => {
    try {
        logger.info(" create label req body data ", req.body)
        console.log("req.id", req.id)
        var data = {
            userId: req.id,
            label: req.body.label
        }
        req.checkBody('label', 'label is required').notEmpty();
        var errors = req.validationErrors();
        var response = {}
        if (errors) {
            response.success = false
            response.error = errors
            return res.status(422).send(response)
        } else {
            labelService.noteServiceCreateLabel(data, (err, data) => {
                console.log("11111111111", err)
                console.log("22222", data)
                if (err) {
                    logger.error(" label controller label creat error ", err)
                    console.log("33333333333", err)
                    res.status(404).send({
                        success: false,
                        message: "error occured in  create label function",
                        data: err
                    })
                } else {
                    logger.info(" create label res  data ", data)
                    console.log("%%%%%%%", data)
                    res.status(200).send({
                        success: true,
                        message: "successfully new label created",
                        data: data
                    })
                }
            })
        }
    } catch (err) {
        res.send(err)
    }
}

/************************************************************************************
 * 
 * @Description : label Controller get labels is used to get all labels  ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.labelControllerGetLabels = (req, res) => {
    try {
        logger.info("  get notes req body   data ", req.body)
        var data = {
            userId: req.id,

        }
        //   req.check('id','labelid is required').notEmpty();
        var errors = req.validationErrors();
        var response = {}
        if (errors) {
            response.success = false
            response.error = errors
            return res.status(422).send(response)
        } else {
            labelService.labelServiceGetLabels(data, (err, data) => {
                if (err) {
                    logger.error(" label controller get label  ", err)
                    res.status(404).send({
                        success: false,
                        message: "error occured in  get label function",
                    })
                } else {
                    logger.error(" get label res  data ", data)
                    res.status(200).send({
                        success: true,
                        message: "successfully get all label ",
                        data: data
                    })

                }
            })
        }
    } catch (err) {
        res.send(err)
    }
}
/************************************************************************************
 * 
 * @Description : label Controller delete label is used to delete the label   ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.labelControllerDeleteLabel = (req, res) => {
    try {
        logger.info(" label delete  req body   data ", req.body)
        var data = {
            labelid: req.body.labelid
        }
        req.checkBody('labelid', 'label id required').notEmpty();
        var errors = req.validationErrors();
        var response = {}
        if (errors) {
            response.success = false
            response.error = errors
            return res.status(422).send(response)
        } else {
            labelService.noteServiceDeleteLabel(data, (err, data) => {
                if (err) {
                    logger.error(" label controller delete label  error ", err)
                    res.status(404).send({
                        success: false,
                        message: "error occured in  delete label function",
                    })
                    res.status(200).send({
                        success: true,
                        message: "successfully  succesfully delete the label",
                        data: data
                    })

                }
            })
        }
    } catch (err) {
        res.send(err)
    }
}
/************************************************************************************
 * 
 * @Description : label controller editName function used to edit the name of label ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.labelControllerEditLabelName = (req, res) => {
    try {
        logger.info(" edit label name req body   data ", req.body)
        console.log("sssssssssssss", req.body)
        var data = {
            userId: req.id,
            labelid: req.body.labelid,
            label: req.body.label
        }

        req.checkBody('labelid', 'labelid is required').notEmpty();
        req.checkBody('label', 'label is required').notEmpty();
        var errors = req.validationErrors();
        var response = {}
        if (errors) {
            response.success = false
            response.error = errors
            return res.status(422).send(response)
        } else {
            labelService.noteServiceEditLabelName(data, (err, data) => {

                if (err) {
                    logger.error("  edit label name  error ", err)
                    res.status(404).send({
                        success: false,
                        message: "error in  edit label name  function",
                        data: err
                    })
                } else {
                    logger.info("  edit label name  res  data ", data)
                    res.status(200).send({
                        success: true,
                        message: "successfully  edit label name  function is  done",
                        data: data
                    })
                }
            })
        }
    } catch (err) {
        res.send(err)
    }
}
/************************************************************************************
 * 
 * @Description : label controller add note to label is used to add note to label ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.labelControllerAddNoteTolabel = (req, res) => {
    try {
        logger.info(" add note to label req body   data ", req.body)
        console.log("sssssssssssss", req.body)
        var data = {
            userId: req.id,
            labelid: req.body.labelid,
            noteid: req.body.noteid
        }
        req.checkBody('labelid', 'labelid is required').notEmpty();
        req.checkBody('noteid', 'noteid is required').notEmpty();
        var errors = req.validationErrors();
        var response = {}
        if (errors) {
            response.success = false
            response.error = errors
            return res.status(422).send(response)
        } else {
            labelService.noteServiceAddNoteToLabel(data, (err, data) => {

                if (err) {
                    logger.error("  Add Note To Label  error ", err)
                    res.status(404).send({
                        success: false,
                        message: "error in  Add Note To Label function",
                        data: err
                    })
                } else {
                    logger.info("  Add Note To Label  res  data ", data)
                    res.status(200).send({
                        success: true,
                        message: "successfully  Add Note To Label function is  done",
                        data: data
                    })
                }
            })
        }
    } catch (err) {
        res.send(err)
    }
}

/************************************************************************************
 * 
 * @Description : label Controller RemoveNoteFromLabel function is used to  remove the note from label ...
 * @param : req from client
 * @param : res from server
 ****************************************************************************************/
module.exports.labelControllerRemoveNoteFromLabel = (req, res) => {
    try {
        logger.info(" Remove Note From Label req body   data ", req.body)
        console.log("sssssssssssss", req.body)
        var data = {
            userId: req.id,
            labelid: req.body.labelid,
            noteid: req.body.noteid
        }
        req.checkBody('labelid', 'labelid is required').notEmpty();
        req.checkBody('noteid', 'noteid is required').notEmpty();
        var errors = req.validationErrors();
        var response = {}
        if (errors) {
            response.success = false
            response.error = errors
            return res.status(422).send(response)
        } else {
            labelService.noteServiceRemoveNoteFromLabel(data, (err, data) => {

                if (err) {
                    logger.error("  Remove Note From Label error ", err)
                    res.status(404).send({
                        success: false,
                        message: "error in  Remove Note From Label function",
                        data: err
                    })
                } else {
                    logger.info("  Remove Note From Label  res  data ", data)
                    res.status(200).send({
                        success: true,
                        message: "successfully   Remove Note From Label function is  done",
                        data: data
                    })
                }
            })
        }
    } catch (err) {
        res.send(err)
    }
}