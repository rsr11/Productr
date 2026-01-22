
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DashboardLayout from './layouts/DashboardLayout'
import Published from './pages/Home/Published.jsx'
import UnPublished from './pages/Home/UnPublished.jsx'
import Products from './pages/Products.jsx'
import HomeLayout from './layouts/HomeLayout.jsx'
import LoginRes from './pages/LoginRes.jsx'
import Productaa from './pages/Productaa.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() { 
  return (
    <>
    
    <BrowserRouter>
    <Routes>
       <Route path='/' element={ <AuthLayout><DashboardLayout/> </AuthLayout>}>
       
       <Route index element={ <Navigate to={"published"} replace />} />

       <Route  element={<HomeLayout/>} >
        <Route path='published' element={<Published/>} />
        <Route path='unpublished' element={<UnPublished/>} />
       </Route>
       <Route path='product' element={<Products/>} />
       <Route path='/producta' element={<Productaa/>} />
       </Route>
    <Route path='/login' element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    </Routes>
    </BrowserRouter>
    <ToastContainer 
    position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored" />
    </>
  )
}

export default App
