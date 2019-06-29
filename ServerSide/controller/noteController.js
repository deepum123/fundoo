




/**
 * express-winston provides middlewares for request and error logging of your express.js application. 
 * It uses 'whitelists' to select properties from the request and (new in 0.2.x) response objects.
 */

const winston = require('winston')
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)

const noteService=require('../services/Internal/noteServices')


module.exports.noteControllerCreateNote=(req,res)=>{
    logger.info(" create note req body data ",req.body)
    var data={
           userId:req.id,
           title:req.body.title,
           description:req.body.description,
           color:req.body.color
         
    }
  
  noteService.noteServiceCreateNote(data,(err,data)=>{
       if(err){
           console.log("error occured in note controller create note ")
           res.status(500).send({
               success:false,
               message:"error occured in  create note function",
               data:err
           })
       }else{
        logger.info(" create note res  data ",data)
           res.status(200).send({
               success:true,
               message:"successfully new note created",
               data:data
           })
       }
   })

}

module.exports.noteControllerGetNotes=(req,res)=>{
    logger.info("  get notes req body   data ",req.body)
    var data ={
        userId:req.id
    }
    noteService.noteServiceGetNotes(data,(err,data)=>{
        if(err){
            res.status(500).send({
                success:false,
                message:"error occured in  get notes function",
                data:err
            })
        }else{
            logger.info(" get notes res  data ",data)
            res.status(200).send({
                success:true,
                message:"successfully get all notes created",
                data:data
            })

        }
    })
}

module.exports.noteControllerDeleteNote=(req,res)=>{
    logger.info(" note delete note req body   data ",req.body)
    var data={
        noteid:req.body.noteid
             }
             noteService.noteServiceDeleteNote(data,(err,data)=>{
                if(err){
                    res.status(500).send({
                        success:false,
                        message:"error occured in  delete note function",
                        data:err
                    })
                }else{
                    logger.info(" delete note  res  data ",data)
                    res.status(200).send({
                        success:true,
                        message:"successfully  succesfully delete the note",
                        data:data
                    })
        
                }
            })
        }


module.exports.noteControllerIsArchive=(req,res)=>{
    logger.info(" note is archive req body   data ",req.body)
    var data={
        noteid:req.body.noteid,
        archive:req.body.archive
    }
noteService.noteServiceIsArchive(data,(err,data)=>{
    console.log("########",data)
    if(err){
        res.status(500).send({
            success:false,
            message:"error in note controller is archive function",
            data:err
        }) 
    }else{
        logger.info(" note is archive res  data ",data)
        res.status(200).send({
            success:true,
            message:"successfully note archive done",
            data:data
        })  
    }
})

}

module.exports.noteControllerIsPinned=(req,res)=>{
    logger.info(" note is pinned req body   data ",req.body)
    var data={
        noteid:req.body.noteid,
        pinned:req.body.pinned
    }
noteService.noteServiceIsPinned(data,(err,data)=>{
   
    if(err){
        res.status(500).send({
            success:false,
            message:"error in note controller is Pinned function",
            data:err
        }) 
    }else{
        logger.info(" note is pinned res  data ",data)
        res.status(200).send({
            success:true,
            message:"successfully note pinned function is  done",
            data:data
        })  
    }
})
}

module.exports.noteControllerIsTrashed=(req,res)=>{
    logger.info(" note is  trash req body   data ",req.body)
    var data={
        noteid:req.body.noteid,
        trash:req.body.trash
    }
noteService.noteServiceIsTrashed(data,(err,data)=>{
   
    if(err){
        res.status(500).send({
            success:false,
            message:"error in note controller is Trashed function",
            data:err
        }) 
    }else{
        logger.info(" note is trashed res  data ",data)
        res.status(200).send({
            success:true,
            message:"successfully note Trashed function is  done",
            data:data
        })  
    }
})
}
module.exports.noteControllerEditTitle=(req,res)=>{
    logger.info(" note  edit title req body   data ",req.body)
    var data={
        noteid:req.body.noteid,
        newtitle:req.body.newtitle
    }
noteService.noteServiceEditTitle(data,(err,data)=>{
   
    if(err){
        res.status(500).send({
            success:false,
            message:"error in note controller edit title function",
            data:err
        }) 
    }else{
        logger.info(" note edit title res  data ",data)
        res.status(200).send({
            success:true,
            message:"successfully note edit title function is  done",
            data:data
        })  
    }
})
}

module.exports.noteControllerEditDescription=(req,res)=>{
    logger.info(" note edit description  req body   data ",req.body)
    var data={
        noteid:req.body.noteid,
        description:req.body.description
        
    }
    noteService.noteServiceEditDescription(data,(err,data)=>{
        if(err){
            res.status(500).send({
                success:false,
                message:"error in note controller edit title function",
                data:err
            }) 
        }else{
            logger.info(" note edit description  res  data ",data)
            res.status(200).send({
                success:true,
                message:"successfully note edit decription function is  done",
                data:data
            })
        }
    })

}
module.exports.noteControllerUpdateColor=(req,res)=>{
    logger.info(" note update color req body   data ",req.body)
    var data={
        noteid:req.body.noteid,
        color:req.body.color 
    }
    noteService.noteServiceUpdateColor(data,(err,data)=>{
        if(err){
            
            res.status(500).send({
                success:false,
                message:"error in note controller update color  function",
                data:err
            }) 
        }else{
            logger.info(" note update color res  data ",data)
            res.status(200).send({
                success:true,
                message:"successfully note edit decription function is  done",
                data:data
            })
        }
    })
}
module.exports.noteControllerNoteRemainder=(req,res)=>{
    logger.info(" note remainder req body   data ",req.body)
    var data={
        noteid:req.body.noteid,
        remainder:req.body.remainder
    }
    noteService.noteServiceNoteRemainder(data,(err,data)=>{
        if(err){
            res.status(500).send({
                success:false,
                message:"error in note controller update color  function",
                data:err
            }) 
        }else{
            logger.info(" note remainder res  data ",data)
            res.status(200).send({
                success:true,
                message:"successfully note edit decription function is  done",
                data:data
            })
        }
    })
}

module.exports.noteControllerErashTrash=(req,res)=>{
    logger.info(" note controller erash trash   req body   data ",req.body)
    var data ={
        userId:req.id
    }
    noteService.noteServiceErashTrash(data,(err,data)=>{
        if(err){
            res.status(500).send({
                success:false,
                message:"error in note controller update color  function",
                data:err
            }) 
        }else{
            logger.info(" note erash trash res data  ",data)
            res.status(200).send({
                success:true,
                message:"successfully note edit decription function is  done",
                data:data
            })
        }
    })
}
module.exports.noteControllerUpdateImage=(req,res)=>{
    logger.info(" note image update req body   data ",req.body)
    console.log("\npic location --------<", req.file.location);
    var data={  
         address:req.file.location, 
        userId:req.id
  }
    noteService.noteServicesUpdateImage(data, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send({
                message: err
            })
        } else {
            logger.info(" note update iamge  res  data ",data)
            return res.status(200).send({
                success:true,
                message: "s3 api successfully completed",
                data:data
            });
        }

    })

}

module.exports.noteControllerSearch=(req,res)=>{
    logger.info(" note search   req body   data ",req.body)
    var data={
        userId:req.id,

      noteid:req.body.noteid,
      description:req.body.description,
      title:req.body.title,
      color:req.body.color,
  }
  noteService.noteServiceSearch(data,(err,data)=>{
      if(err){
          res.status(500).send({
              success:false,
              message:"error occured in  get note function",
              data:err
          })
      }else{
        logger.info(" note search res  data ",data)
          res.status(200).send({
              success:true,
              message:"successfully  get the perticular node",
              data:data
          })

      }
  })

}