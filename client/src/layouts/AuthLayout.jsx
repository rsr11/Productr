// import React, { useContext } from 'react'
import UserDetail from '../context/UserContext/user'
import { Navigate } from 'react-router-dom';
import Loader from "../components/Loader.jsx"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AuthLayout = ({children}) => {
 
  // const context = useContext(UserDetail);
  // const {user,loading} = context;

  const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4020/productr/api/auth/activeUser", {withCredentials: true});
        return res?.data?.data;
        // setUser(res?.data?.data || null);
      }catch (err) {
        // console.log(err);
       return err.response.data;
        // setUser(null);
      }
    };

  const {data,isLoading, isError} = useQuery({queryKey:["UserData"], queryFn:fetchUser,refetchInterval: 300000,refetchOnWindowFocus:true});

  console.log("data is "+ data?.status);
  

   if(isError) return <section className='absolute w-screen h-screen' > Server Error Plz try later </section>

   if (isLoading) return <section className='h-screen flex justify-center items-center' > <Loader/> </section>;


  return  data?.status ? children : <Navigate to="/login" replace />;
}

export default AuthLayout
