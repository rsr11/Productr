import axios from "axios"
import nodemailer from "nodemailer";




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


export const sendOtpViaEmail = async (toEmail, otp) => {

    // console.log(process.env.EMAIL_ID + "  " + process.env.EMAIL_PASSKEY);
    
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port:465,
      secure:true,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSKEY 
      }
    });


    try {

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

  // console.log(info);
  
  console.log('Message sent:', info.messageId);
  return true;
      
    } catch (error) {
        console.log("error in otp sending "+error);
        return false;
     
    }
  
};