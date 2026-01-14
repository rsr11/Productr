
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/Home/Home.jsx'
import Published from './pages/Home/Published.jsx'
import UnPublished from './pages/Home/UnPublished.jsx'
import Products from './pages/Products.jsx'
import HomeLayout from './layouts/HomeLayout.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<DashboardLayout/>}>
       
       <Route index element={<Navigate to={"published"} replace />} />

       <Route  element={<HomeLayout/>} >
       {/* <Route index element={<Home/>} /> */}
        <Route path='published' element={<Published/>} />
        <Route path='unpublished' element={<UnPublished/>} />
       </Route>
       <Route path='product' element={<Products/>} />
       </Route>
    <Route path='/login' element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
