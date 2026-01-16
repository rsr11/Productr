import mongoose from "mongoose";


const Otp = new mongoose.Schema({

    contact: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    enum: ["login", "register"],
    required: true
  },
  UserName:{
    type:String
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 } 
  }
}, { timestamps: true });


export default mongoose.model('otp',Otp);
