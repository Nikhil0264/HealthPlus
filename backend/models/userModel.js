import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requird:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        requird:true,
    },
    role:{
        type:String,
        enum:["patient","doctor","admin"],
        default:"patient",
    },
    isActive:{
        type:Boolean,
        default:true,
    }

})

const User = mongoose.model("User",userSchema);

export default User;