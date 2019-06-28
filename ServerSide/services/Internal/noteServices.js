
const noteModel=require('/home/admin1/Desktop/fundoo/ServerSide/app/model/noteModel.js')



class noteServices{
    constructor(){}
    noteServiceCreateNote(data,callback){
        noteModel.createNote(data,(err,data)=>{
            if(err){
                callback(err)
            }else {
                callback(null,data)
            }
        })

    }
    noteServiceGetNotes(data,callback){
        noteModel.getAll(data,(err,data)=>{
            if(err){
                callback(err)
            }else {
                callback(null,data)
            }
        })

    }
    noteServiceDeleteNote(data,callback){
        noteModel.deleteNote(data,(err,data)=>{
            if(err){
                callback(err)
            }else {
                callback(null,data)
            } 
        })
    }
    noteServiceGetNote(data,callback){
           
        noteModel.get(data,(err,data)=>{
            if(err){
                callback(err)
            }else {
                callback(null,data)
            } 
        })

    }
    noteServiceIsArchive(data,callback){
        var field={
            archive:data.archive,
            trash:false,
            pinned:false
        }
   noteModel.Update(data,field,(err,data)=>{
       if(err){
           callback(err)
       }else{
           callback(null,data)

       }
   })


    }

    noteServiceIsPinned(data,callback){

        var field={
            pinned:data.pinned,
            trash:false,
            archive:false
        }
        noteModel.Update(data,field,(err,data)=>{
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
    }
    noteServiceIsTrashed(data,callback){
        var field={
            trash:data.trash,
            archive:false,
            pinned:false
        }
        noteModel.Update(data,field,(err,data)=>{
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
    }
    noteServiceEditTitle(data,callback){
        var field={
            title:data.newtitle, 
        }
        noteModel.Update(data,field,(err,data)=>{
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
    }

    noteServiceEditDescription(data,callback){
        var field={
            description:data.description
        }
        noteModel.Update(data,field,(err,data)=>{
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
    }
    noteServiceUpdateColor(data,callback){
        var field={
            color:data.color
        }
        noteModel.Update(data,field,(err,data)=>{
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
    }
    noteServiceNoteRemainder(data,callback){
        var field={
            remainder:data.remainder
        }
        noteModel.Update(data,field,(err,data)=>{
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
    }

    noteServiceErashTrash(data,callback){
        var field={
             trash: true 
        }
        noteModel.deleteMany(data,field,(err,data)=>{
        if(err){
            callback(err)
        }else{
            callback(null,data)
        }
    })
    }
    noteServicesUpdateImage(data,callback){
        var field= { image: data.address }
        noteModel.Update(data,field, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    }
    noteServiceSearch(data,callback){
        var field= 
            {
                $or: [
                    { 'userId': data.userId},
                  {  '_id': data.noteid },
                  { title: data.title }
                ]
              }
           
        noteModel.search(data,field, (err, data) => {
            if (err) {
                return callback(err)
            } else {
                return callback(null, data)
            }
        })
    }

    



}

const noteServicesOBj=new noteServices()
module.exports=noteServicesOBj