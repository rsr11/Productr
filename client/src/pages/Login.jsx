import React, { useContext, useRef, useState } from 'react'
import RunnerImg from "../assets/boy_run.jpg";
import Bg from "../assets/bg.png";
// import logo from "../assets/logo_symbol.png";
import validator from "validator";
import Logo from '../components/Logo';
import OtpForm from '../components/OtpForm';
import axios from 'axios';
import Loader from '../components/Loader';
import UserDetail from '../context/UserContext/user';

const Login = () => {

const [isOtpSended, setIsOtpSended] = useState(false);
const [isLoading, setLoading] = useState(false);
const [contact, setContact] = useState(false);
// const [isError, setError] = useState(false);
const contactRef = useRef();




const validateLoginInput = (value) => {
  if (!value ) {
    return "Email or mobile number is required";
  }

   if (validator.isMobilePhone(value, "en-IN")) return null;

  if (validator.isEmail(value)) return null;

  // alert("Enter a valid email or Indian mobile number");
  return "Enter a valid email or Indian mobile number";
  
};


  
const LoginSubmit = async (e)=>{
  e.preventDefault();
  
  try {
    // alert(contactRef.current.value);
    const err = validateLoginInput(contactRef.current.value);
    setContact(contactRef.current.value);
    // alert(err);
    if(err){
      console.log(contactRef.current.value);
      
      // alert(err +" te");
      return;
    }
    
    setLoading(true);

    const response = await axios.post(`http://localhost:4020/productr/api/auth/login`,{contact:contactRef.current.value},{headers:{ "Content-Type": "application/json" } });
   
    if(response.status === 200){
      setLoading(false);
      setIsOtpSended(true);
    };
      
    } catch (error) {
        alert(error?.response?.data?.msg);
        console.log(error);
        setLoading(false);
        
    }

  };
 
   const context = useContext(UserDetail);
   const {user} = context;
 
   console.log(`the user is ${user}`);
 
  return (
    <section className='flex flex-col lg:flex-row md:gap-10 bg-[#F7F8FA] h-screen'>
        <section className='lg:w-1/2 mt-5 lg:mt-0 mx-3 h-[53%] lg:h-full flex' >
          <section className='bgCover relative flex flex-col w-full lg:m-10 rounded-4xl' >
             <img src={Bg} style={{mixBlendMode:"screen"}} className='border-[#D4D4D4] absolute mix-blend-scree opacity-95  h-full w-full rounded-3xl' alt="" />
              {/* <h1 className=' flex items-center gap-2'>Productr <img src={logo} alt="" /> </h1> */}
              <Logo styling={"logo px-5 lg:flex absolute py-4 text-[#071074] font-normal text-xl md:text-2xl"} />
              <section className='flex-1 flex mt-8 lg:mt-0 justify-center items-center'>
                <section className='bgRunner absolute flex justify-center items-end text-white w-52 lg:w-72 h-[75%] lg:h-100 rounded-[48px]' >
                 
                <section className='mb-6 font-semibold'>
                    <p className='text-center' >Uplist your</p>
                    <p>product to market</p>
                </section>
                </section>
              </section>
          </section>
        </section>

        <section className='lg:w-1/2 h-[50%] lg:h-full flex flex-col lg:justify-between md:items-center' > 
          <section>
            <h1 className='text-[#111652] text-xl md:text-[24px] font-semibold ml-5 md:ml-2 mt-10 md:mt-40' >Login to your Product Account</h1>
            
            { isOtpSended ?  <OtpForm purpose="login" contact={contact} /> : isLoading ? <Loader/> :
            <form action="" onSubmit={(e)=>{LoginSubmit(e)}} className='mt-5 mx-10 md:mx-0 md:mt-10' >
                <section className='flex flex-col' >
                <label htmlFor="contact">Email or Phone number</label>
                <input type="text" className='border bg-white mt-2 p-2 rounded-lg border-[#D4D4D4]' ref={contactRef} name="contact" placeholder='Enter email or phone number' id="contact" />
                <button type='submit' className='bg-[#071074] cursor-pointer text-white py-2 rounded-lg mt-2 md:mt-5' >Login</button>
                </section>
            </form>
            }
          </section>

          <section className='bg-white text-sm border mt-5 md:mt-0 mx-10 md:mx-0 border-[#D4D4D4] md:mb-20 py-2 md:py-5 md:px-14 rounded-lg' >
            <p className='text-[#98A2B3] text-center font-normal' >Don’t have a Productr Account </p>
            <h4 className='text-[#071074] text-center  font-medium' >SignUp Here</h4>
          </section>

        </section>
      {/* <Logo styling={"px-5 md:hidden pt-3 font-semibold text-lg"} /> */}
      
    </section>
  )
}

export default Login
