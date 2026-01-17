import React, { useRef, useState } from 'react'
import RunnerImg from "../assets/boy_run.jpg";
import Bg from "../assets/bg.png";
// import logo from "../assets/logo_symbol.png";
import validator from "validator";
import Logo from '../components/Logo';
import OtpForm from '../components/OtpForm';






const LoginRes = () => {

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
   <section className="flex flex-col lg:flex-row bg-[#F7F8FA] min-h-screen">

  {/* LEFT IMAGE SECTION (HIDDEN ON MOBILE) */}
  <section className="hidden lg:flex lg:w-1/2">
    <section className="relative flex flex-col w-full m-10 rounded-4xl">
      <img
        src={Bg}
        className="absolute opacity-95 h-full w-full rounded-3xl"
        alt=""
      />

      <Logo styling="logo px-5 absolute py-4 text-[#071074] font-normal text-2xl" />

      <section className="flex-1 flex justify-center items-center">
        <section className="absolute flex justify-center items-end text-white w-72 h-96 rounded-[48px] bgRunner">
          <section className="mb-6 font-semibold">
            <p className="text-center">Uplist your</p>
            <p>product to market</p>
          </section>
        </section>
      </section>
    </section>
  </section>

  {/* RIGHT LOGIN SECTION */}
  <section className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6">

    <section className="w-full max-w-md">
      <h1 className="text-[#111652] text-[22px] sm:text-[24px] font-semibold mt-10 text-center lg:text-left">
        Login to your Product Account
      </h1>

      {isOtpSended ? (
        <OtpForm />
      ) : (
        <form onSubmit={LoginSubmit} className="mt-8">
          <section className="flex flex-col">
            <label htmlFor="contact" className="text-sm">
              Email or Phone number
            </label>

            <input
              type="text"
              ref={contactRef}
              name="contact"
              id="contact"
              placeholder="Enter email or phone number"
              className="border bg-white mt-2 p-3 rounded-lg border-[#D4D4D4]"
            />

            <button
              type="submit"
              className="bg-[#071074] cursor-pointer text-white py-3 rounded-lg mt-5"
            >
              Login
            </button>
          </section>
        </form>
      )}
    </section>

    {/* SIGNUP CARD */}
    <section className="bg-white border border-[#D4D4D4] mt-12 mb-10 py-5 px-10 rounded-lg text-center max-w-md w-full">
      <p className="text-[#98A2B3] font-normal">
        Don’t have a Productr Account
      </p>
      <h4 className="text-[#071074] font-medium cursor-pointer">
        SignUp Here
      </h4>
    </section>
  </section>
</section>

  )
}

export default LoginRes
