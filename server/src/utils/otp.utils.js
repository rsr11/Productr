import axios from "axios"




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