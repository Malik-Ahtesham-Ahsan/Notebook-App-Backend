const mongoose =require("mongoose")


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique:true
        },
       
        password: {
            type: String,
            required: true,
            
        },
        date: {
            type: Date,
            default:Date.now
        }
        
        
    }
)

const User =new mongoose.model('User',userSchema)
//avoid to duplicate entries
User.createIndexes();
module.exports =User;