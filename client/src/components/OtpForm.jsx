import React, { useRef, useState } from 'react'
const OtpForm = () => {

    const [theOtp, setTheOtp] = useState(new Array(6).fill(""));
    const otpRef = useRef([]);

    

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



  return (
    <section className='mt-10' > 
         
         <h1 className='text-[#344054]  text-lg' >Enter OTP</h1>

         
         <form className='flex  flex-col w-fit' >

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
             
             <button className='cursor-pointer text-white py-2 rounded-lg mt-5 bg-[#071074]' >Enter your OTP</button>
               </form>
             <p className='text-[#98A2B3] mt-3 ml-5 text-sm' > Didnt recive OTP ? <a className='text-[#071074]' > Resend in 20s </a> </p>  

    </section>
  )
}

export default OtpForm
