
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DashboardLayout from './layouts/DashboardLayout'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path='/' element={<DashboardLayout/>}>
       </Route>
    <Route path='/login' element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
