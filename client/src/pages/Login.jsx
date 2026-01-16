import React, { useRef, useState } from 'react'
import RunnerImg from "../assets/boy_run.jpg";
import Bg from "../assets/bg.png";
// import logo from "../assets/logo_symbol.png";
import validator from "validator";
import Logo from '../components/Logo';
import OtpForm from '../components/OtpForm';

const Login = () => {

const [isOtpSended, setIsOtpSended] = useState(false);
const contactRef = useRef();




const validateLoginInput = (value) => {
  if (!value ) {
    return "Email or mobile number is required";
  }

   if (validator.isMobilePhone(value, "en-IN")) return null;

  if (validator.isEmail(value)) return null;

  alert("Enter a valid email or Indian mobile number");
  return "Enter a valid email or Indian mobile number";
  
};


  
const LoginSubmit = (e)=>{
     e.preventDefault();
     alert(contactRef.current.value);

  const err = validateLoginInput(contactRef.current.value);
  if (err) {
    // setError(err);
    alert(err);
    return;
  }

 
};


  return (
    <section className='flex gap-10 bg-[#F7F8FA] h-screen'>
        <section className='w-1/2 flex' >
          <section className='bgCover relative flex flex-col w-full m-10 rounded-4xl' >
             <img src={Bg} style={{mixBlendMode:"screen"}} className='border-[#D4D4D4] absolute mix-blend-scree opacity-95 h-full w-full rounded-3xl' alt="" />
              {/* <h1 className=' flex items-center gap-2'>Productr <img src={logo} alt="" /> </h1> */}
              <Logo styling={"logo px-5 absolute py-4 text-[#071074] font-normal text-2xl"} />
              <section className='flex-1 flex justify-center items-center'>

                <section className='bgRunner absolute flex justify-center items-end text-white w-72 h-100 rounded-[48px]' >
                 
                <section className='mb-6 font-semibold'>
                    <p className='text-center' >Uplist your</p>
                    <p>product to market</p>
                </section>
                </section>
              </section>
          </section>
        </section>

        <section className='w-1/2 flex flex-col justify-between items-center' >
          
          <section>
            <h1 className='text-[#111652] text-[24px] font-semibold ml-2 mt-20' >Login to your Product Account</h1>

            { isOtpSended ? <OtpForm/> : 
            <form action="" onSubmit={(e)=>{LoginSubmit(e)}} className='mt-10' >
                <section className='flex flex-col' >
                <label htmlFor="contact">Email or Phone number</label>
                <input type="text" className='border bg-white mt-2 p-2 rounded-lg border-[#D4D4D4]' ref={contactRef} name="contact" placeholder='Enter email or phone number' id="contact" />
                <button type='submit' className='bg-[#071074] cursor-pointer text-white py-2 rounded-lg mt-5' >Login</button>
                </section>
            </form>
            }
          </section>

          <section className='bg-white border border-[#D4D4D4] mb-20 py-5 px-14 rounded-lg' >
            <p className='text-[#98A2B3] text-center font-normal' >Don’t have a Productr Account </p>
            <h4 className='text-[#071074] text-center  font-medium' >SignUp Here</h4>
          </section>

        </section>
      
    </section>
  )
}

export default Login
