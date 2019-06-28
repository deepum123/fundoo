
const noteService=require('../services/Internal/noteServices')


module.exports.noteControllerCreateNote=(req,res)=>{
   
    var data={
           userId:req.id,
           title:req.body.title,
           description:req.body.description,
           color:req.body.color
         
    }
    console.log("*******",data.color)
  noteService.noteServiceCreateNote(data,(err,data)=>{
       if(err){
           console.log("error occured in note controller create note ")
           res.status(500).send({
               success:false,
               message:"error occured in  create note function",
               data:err
           })
       }else{
           res.status(200).send({
               success:true,
               message:"successfully new note created",
               data:data
           })
       }
   })

}

module.exports.noteControllerGetNotes=(req,res)=>{
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
            res.status(200).send({
                success:true,
                message:"successfully get all notes created",
                data:data
            })

        }
    })
}

module.exports.noteControllerDeleteNote=(req,res)=>{

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
                    res.status(200).send({
                        success:true,
                        message:"successfully  succesfully delete the note",
                        data:data
                    })
        
                }
            })
        }
module.exports.noteControllerGetNote=(req,res)=>{
    var data={
          userId:req.id,
        noteid:req.body.noteid
    }
    noteService.noteServiceGetNote(data,(err,data)=>{
        if(err){
            res.status(500).send({
                success:false,
                message:"error occured in  get note function",
                data:err
            })
        }else{
            res.status(200).send({
                success:true,
                message:"successfully  get the perticular node",
                data:data
            })

        }
    })
}

module.exports.noteControllerIsArchive=(req,res)=>{
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
        res.status(200).send({
            success:true,
            message:"successfully note archive done",
            data:data
        })  
    }
})

}

module.exports.noteControllerIsPinned=(req,res)=>{
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
        res.status(200).send({
            success:true,
            message:"successfully note pinned function is  done",
            data:data
        })  
    }
})
}

module.exports.noteControllerIsTrashed=(req,res)=>{
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
        res.status(200).send({
            success:true,
            message:"successfully note Trashed function is  done",
            data:data
        })  
    }
})
}
module.exports.noteControllerEditTitle=(req,res)=>{
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
        res.status(200).send({
            success:true,
            message:"successfully note edit title function is  done",
            data:data
        })  
    }
})
}

module.exports.noteControllerEditDescription=(req,res)=>{
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
            res.status(200).send({
                success:true,
                message:"successfully note edit decription function is  done",
                data:data
            })
        }
    })

}
module.exports.noteControllerUpdateColor=(req,res)=>{
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
            res.status(200).send({
                success:true,
                message:"successfully note edit decription function is  done",
                data:data
            })
        }
    })
}
module.exports.noteControllerNoteRemainder=(req,res)=>{
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
            res.status(200).send({
                success:true,
                message:"successfully note edit decription function is  done",
                data:data
            })
        }
    })
}

module.exports.noteControllerErashTrash=(req,res)=>{
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
            res.status(200).send({
                success:true,
                message:"successfully note edit decription function is  done",
                data:data
            })
        }
    })
}
module.exports.noteControllerUpdateImage=(req,res)=>{
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
            console.log("message is coming here", data)
            return res.status(200).send({
                success:true,
                message: "s3 api successfully completed",
                data:data
            });
        }

    })

}

module.exports.noteControllerSearch=(req,res)=>{
    var data={
        userId:req.id,
      noteid:req.body.noteid,
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
          res.status(200).send({
              success:true,
              message:"successfully  get the perticular node",
              data:data
          })

      }
  })

}