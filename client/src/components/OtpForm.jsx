// import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserDetail from '../context/UserContext/user';
import api from '../API/axios.config';
import Loader from './Loader';

const OtpForm = ({purpose,name,contact}) => {

    const [theOtp, setTheOtp] = useState(new Array(6).fill(""));
    // const [otpTry, setOtpTry] = useState(2);
    const [ResendSec, setResendSec] = useState(20);
    const otpRef = useRef([]);
    const naviagte = useNavigate();
    const context = useContext(UserDetail);
    const [loading,setLoading] = useState(false);

    const {setUser} = context;



    useEffect(()=>{
       if (ResendSec === 0) return;
        const timer = setInterval(() => {
    setResendSec(prev => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

      return () => clearInterval(timer);

    },[ResendSec])

    

    const otpOnChange = (value,indx)=>{
      if(isNaN(value)){
        return;
      };

      const newArr = [...theOtp];
       const newVal = value.trim(); 
      newArr[indx] = newVal.slice(-1);
      setTheOtp(newArr); 
     newVal && otpRef.current[indx+1]?.focus();
    };


    function onKeyDownFunc(e,indx){
      // console.log(e.key);    
      if(e.key == "Backspace"){
        // console.log("tingggg");   
         if(!e.currentTarget.value){
           otpRef.current[indx-1]?.focus();
         };
      };
    };



    // empty all the field of otp grid
    function AllEmpty(){
      console.log("all empty");  
      setTheOtp(new Array(6).fill(""));
    };

   console.log(ResendSec);
   

    // alert(contact);




    const onOtpSubmit = async(e)=>{  
      e.preventDefault();

      const theval = theOtp.join("");

      if(theval.length <6){
        alert("complete the otp field!");
        return;
      };
         
      
        try {
          const res = await api.post("/auth/checkOtp",{contact,purpose, otp:theval},{headers:{"Content-Type":"application/json"},withCredentials:true});

          if(res.status === 200){
            alert(res?.data?.msg);
            setUser(res?.data?.msg);
            naviagte("/");

          };


        } catch (error) {
           alert(error?.response?.data?.msg);
           AllEmpty();
        }
    }


    const reSendotp = async(purpose,name,contact)=>{
          setLoading(true);
       try {
       
        const res = await api.post(`/auth/${purpose}`,
           purpose === 'login' ? {contact} : {name,contact},
          {headers:{"Content-Type":"application/json"}} );

          if(res.status===200){
            setLoading(false);
            alert("Otp is Resended successfully");
            setResendSec(20);
          }
        
       } catch (error) {
         console.log(error);        
       }
    }



  return (
    <section className='mt-10' > 
         
         {loading ? <Loader/> : <>
          
         <h1 className='text-[#344054]  text-lg' >Enter OTP</h1>

         
         <form onSubmit={(e)=>onOtpSubmit(e)}  className='flex  flex-col w-fit' >

            <section className='flex mt-2 w-fit gap-2' >
            {theOtp?.map((value,index)=>{
              console.log(index);
              
                return (
                   <input type="text" 
                   key={index}
                   ref={(e)=>{otpRef.current[index] = e}}
                   onKeyDown={(e)=>{onKeyDownFunc(e,index)}}
                   value={theOtp[index]}
                   onChange={(e)=>{otpOnChange(e.currentTarget.value,index)}}
                   className='w-10 rounded-lg border-2 active:border-[#07107466] border-[#D4D4D4] bg-white p-1 text-center' />
                )
            })}
            </section>
             
             <button type='submit' className='cursor-pointer text-white py-2 rounded-lg mt-5 bg-[#071074]' >Enter your OTP</button>
               </form>
             <p className='text-[#98A2B3] mt-3 ml-5 text-sm' > Didnt recive OTP ? <button onClick={()=>reSendotp(purpose,name,contact)} disabled={ResendSec > 0 ? true : false} className={`${ResendSec > 0 ? "cursor-not-allowed" : "cursor-pointer"} text-[#071074]`} > {ResendSec > 0 ? `Resend in ${ResendSec}s` : "Resend OTP" }  </button> </p>  
         </> }
    </section>
  )
}

export default OtpForm
