import { generateOTP } from "../constant/index.js";
import otpModel from "../models/otp.model.js";
import userModel from "../models/user.model.js";
import crypto from "crypto";
import { sendOtpViaEmail, sendSmsViaOtp } from "../utils/otp.utils.js";
import validator from "validator";
import { validateLoginInput } from "../validator/user.validator.js";
import jwt from "jsonwebtoken";




export const registerUser = async (req,res)=>{
      
    try {       
        const {name,contact} = req.body;
        console.log(name+" "+" "+contact);
        const isContactValid = validateLoginInput(contact);
        console.log("validated!");
        

        if(!isContactValid) return res.status(404).json({msg:"invalid data!"});
        const userExist = await userModel.findOne({contact:contact});

        console.log(userExist);
        

        if(userExist) return res.status(400).json({ message: "User already exists" });

        const otp = generateOTP();
        const hashedOtp = crypto.createHash("sha256").update(otp.toString()).digest("hex");
        console.log(otp);
         
       const theOtpDoc =  await otpModel.create({
            contact:contact,
            otp:hashedOtp,
            purpose:'register',
            UserName: name, 
            expiresAt: Date.now() + 5*60*1000
        });

        console.log(theOtpDoc);
        

        // await sendSmsViaOtp(mobile,otp);
        const isOtpSendViaEmail = sendOtpViaEmail(contact,otp);


        if(isOtpSendViaEmail){
         res.status(201).json({msg:"otp is sended successfully"});
        }else{
         res.status(404).json({msg:"server error ! retry!"});   
        };
         
        // res.status(200).json({success: true,message: "OTP sent successfully"});        

    } catch (error) {
       
        console.log(`error in registrationUser`);
        res.status(404).json({msg:"server failed!", error})
    }
};





export const verifyOtp = async (req,res)=>{
     const {contact, purpose,otp} = req.body;

     console.log(contact+" "+purpose+" "+otp);
     

    try {
    const record = await otpModel.findOne({contact});

    console.log("finding record");
    
    // const theUser = await userModel.findOne({contact}); 

    if (!record) return res.status(404).json({msg:"otp is expired!"});

     if(record.expiresAt < Date.now()) {
      await otpModel.deleteOne({ _id: record._id });
      return res.status(400).json({ msg: "OTP expired" });
    };
        

     const hashedOTP = crypto.createHash("sha256").update(otp.toString()).digest("hex");

     console.log(otp);

  if(hashedOTP !== record.otp) return res.status(401).json({msg:"incorrect otp!"});

  let user;
  
  if(purpose === "register"){
    user = await userModel.create({
        name:record.UserName,
        contact:contact
    });
   }else {
      user = await userModel.findOne({ contact });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
    }
   
    await otpModel.deleteOne({ _id: record._id });
    console.log("otp is deleted");
    

    const token = jwt.sign({_id:user._id,name:user.name},process.env.JWT_SECRET,{expiresIn:'24h'});

    console.log(token);
    
    
    res.cookie("token", token,{ httpOnly: true, secure:true, sameSite:'strict', maxAge: 24 * 60 * 60 * 1000})
    res.status(200).json({msg:"user logged In!"});
    
}catch (error) {
      res.status(404).json({msg:"server error!", error});
     }
};





export const loginUser = async (req,res)=>{
     const {contact} = req.body;
     console.log(contact);
     
     try {

        const isValid = validateLoginInput(contact);

        console.log(isValid.ok);
        

        if(!isValid.ok) return res.status(404).json({msg:isValid.msg});

        const isUserExist = await userModel.findOne({contact:contact});

        console.log(isUserExist);
        

        if(!isUserExist) return res.status(404).json({msg:"User not exist!"});

        const otp = generateOTP();
        const hashedOtp = crypto.createHash("sha256").update(otp.toString()).digest("hex");

        // await otpModel.create({
        //     contact:contact,
        //     otp:hashedOtp,
        //     purpose:"login",
        //     expiresAt: Date.now() + 5*60*1000
        // });

        await otpModel.findOneAndUpdate(
            { contact }, 
            { otp:hashedOtp,
             expiresAt: Date.now() + 5 * 60 * 1000 
            },
           { upsert: true, 
             new: true });
        
        if(isValid?.type === "mobile"){     
       const isSmsSended =  await sendSmsViaOtp(contact,otp);
        res.status(200).json({success: true,message: "OTP sent successfully",oneMore:isSmsSended}); 
        }else{
            const funcRes = await sendOtpViaEmail(contact,otp);
            if(funcRes){
                res.status(200).json({msg:"otp is sended to your email!"});
            }else{
                res.status(404).json({msg:"server error ! retry!"});
            }
        }      
     } catch (error) {
        console.log(error);
        res.status(404).json({msg:"somthing went wrong!", error});
        
     }

};