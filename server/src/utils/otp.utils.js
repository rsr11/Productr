import axios from "axios"
import nodemailer from "nodemailer";
import twilio from "twilio";
import { Resend } from 'resend';

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid,authToken);

console.log(process.env.RESEND_API);

const resend = new Resend("re_7CpnM3Ba_NqgqhKtfcEgmjyBiqL3LjP3N");



export const sendSmsViaOtp = async (mobile,otp)=>{
    try {
        const res = await axios.post("https://api.sendmator.com/sms/send",{
            to: mobile,
            message: `Your OTPis ${otp}. Valid for 5 minutes. Do not share it.`
        },
    {
        headers:{
            Authorization: `Bearer ${process.env.SENDMATOR_API_KEY}`,
            "Content-Type": "application/json"
        }
    });

    return res?.data;    
    } catch (error) {
        console.log("Error in sendSmsViaOtp : "+error);
        return;
    }
};




export const sendOtpWithSMS = async(mobile,otp)=>{

    const message = await client.messages.create({
        body:`The Otp is from Productr is ${otp}`,
        from:"+919119222577",
        to:`+91${mobile}`
    });

    console.log(message.body);
    
}


export const sendOtpViaEmail = async (toEmail, otp) => {

    // console.log(process.env.EMAIL_ID + "  " + process.env.EMAIL_PASSKEY);
    
    
//    const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: false,  // use TLS
//   auth: {
//     user: process.env.EMAIL_ID,
//     pass: process.env.EMAIL_PASSKEY 
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });


    try {

        resend.emails.send({
        from: 'onboarding@resend.dev',
        to: toEmail,
        subject: 'Hello World',
        html: `<p>Your OTP is : <strong>${otp}</strong></p>`
          });

//         const info = await transporter.sendMail({
//     from: '"Productr" <rsr45411@gmail.com>',
//     to: toEmail,
//     subject: 'Your OTP Code',
//     html: `
//     <div>
//     <h1>The Otp is valid for 5 min ! </h1>
//     <p>Your OTP is : <strong>${otp}</strong></p>
//     <div>
//     `
//   });

  // console.log(info);
  
  console.log('Message sent:', info.messageId);
  return true;
      
    } catch (error) {
        console.log("error in otp sending "+error);
        return false;
     
    }
  
};