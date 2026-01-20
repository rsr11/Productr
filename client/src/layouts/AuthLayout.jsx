import React, { useContext } from 'react'
import UserDetail from '../context/UserContext/user'
import { Navigate } from 'react-router-dom';
import Loader from "../components/Loader.jsx"

const AuthLayout = ({children}) => {
 
  const context = useContext(UserDetail);
  const {user,loading} = context;

   if (loading) return <section className='h-screen flex justify-center items-center' > <Loader/> </section>;


  return  user ? children : <Navigate to="/login" replace />;
}

export default AuthLayout
