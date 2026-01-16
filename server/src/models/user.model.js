import mongoose, { Model } from "mongoose";


const User = new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    contact:{
        type : String,           
        required : true,
        unique:true
    }
 
},{timestamps:true});



export default mongoose.model('user',User);