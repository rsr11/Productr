import axios from "axios"
import nodemailer from "nodemailer";
import twilio from "twilio";
import { Resend } from 'resend';

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid,authToken);



// console.log(process.env.RESEND_API);


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
    
    try {
    
   const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,  // use TLS
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSKEY 
  },
  tls: {
    rejectUnauthorized: false
  }
});

        const info = await transporter.sendMail({
    from: '"Productr" <rsr45411@gmail.com>',
    to: toEmail,
    subject: 'Your OTP Code',
    html: `
    <div>
    <h1>The Otp is valid for 5 min ! </h1>
    <p>Your OTP is : <strong>${otp}</strong></p>
    <div>
    `
  });

  console.log(info);
  
  console.log('Message sent:', info.messageId);
//     const data = await resend.emails.send({
//       from: 'onboarding@resend.dev', // Use this for testing
//       to: toEmail,
//       subject: 'Your OTP Code',
//       html: `<p>Your OTP is: <strong>${otp}</strong></p>`
//     });
    
//     console.log('Email sent:', data);
//     return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
  
};