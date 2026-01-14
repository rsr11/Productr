import { generateOTP } from "../constant/index.js";
import otpModel from "../models/otp.model.js";
import userModel from "../models/user.model.js";
import crypto from "crypto";
import { sendSmsViaOtp } from "../utils/otp.utils.js";


export const registerUser = async (req,res)=>{
    try {
        
        const {email,mobile} = req.body;

        const userExist = await userModel.findOne({$or : [{email,mobile}]});

        if(userExist) return res.status(400).json({ message: "User already exists" });

        const otp = generateOTP();

        const hashedOtp = crypto.createHash("sha256").update(otp.toString()).digest("hex");

        await otpModel.create({
            contact:mobile,
            otp:hashedOtp,
            expiresAt: Date.now() + 5*60*1000
        });

        await sendSmsViaOtp(mobile,otp);
        
        res.status(200).json({success: true,message: "OTP sent successfully"});        



    } catch (error) {
       
        console.log(`error in registrationUser`);
        res.status(404).json({msg:"server failed!", error})
    }
};



export const verifyOtp = async (req,res)=>{
    try {
        
    const record = await OTP.findOne({ identifier, purpose });

      if (!record || record.expiresAt < Date.now()) {
        throw new Error("OTP expired or invalid");
         }

       const hashedOTP = crypto.createHash("sha256").update(otp.toString()).digest("hex");

  if (hashedOTP !== record.otp) {
    throw new Error("Incorrect OTP");
  }

  // OTP is valid → delete it
  await OTP.deleteOne({ _id: record._id });

  return true;

     } catch (error) {
        
     }
};