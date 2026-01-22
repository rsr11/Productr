// import React, { useContext } from 'react'
import UserDetail from '../context/UserContext/user'
import { Navigate } from 'react-router-dom';
import Loader from "../components/Loader.jsx"
import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import api from '../API/axios.config.js';
import { toast } from 'react-toastify';

const AuthLayout = ({children}) => {
 
  // const context = useContext(UserDetail);
  // const {user,loading} = context;

  const fetchUser = async () => {
     console.log("the the value of api is "+ api);
     
      try {
        const res = await api.get(`/productr/api/auth/activeUser`, {withCredentials: true});
        return res?.data?.data;
        // setUser(res?.data?.data || null);
      }catch (err) {
        // console.log(err);
       return err.response.data;
        // setUser(null);
      }
    };

  const {data,isLoading, isError} = useQuery({queryKey:["UserData"], queryFn:fetchUser,refetchInterval: 300000,refetchOnWindowFocus:true});

  console.log("data is "+ data);
  

   if(isError) {
     toast.error("Server Error Plz try later");
     return <Navigate to="/login" replace />;
  }

   if (isLoading) return <section className='h-screen flex justify-center items-center' > <Loader/> </section>;


  return  data?.status ? children : <Navigate to="/login" replace />;
}

export default AuthLayout
