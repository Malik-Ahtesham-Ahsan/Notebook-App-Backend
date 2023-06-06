const mongoose =require("mongoose")
const {Schema} =mongoose
const notesSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        title: {
            type: String,
            required: true,
        },
        discription: {
            type: String,
            
        },
        tag: {
            type: String,
            
        },
        date: {
            type: Date,
            default:Date.now
        }
       
       
        
        
        
    }
)

const Notes =new mongoose.model('Notes',notesSchema)
module.exports =Notes;