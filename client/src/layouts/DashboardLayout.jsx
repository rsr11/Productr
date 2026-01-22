import React, { useState } from 'react'
import Logo from '../components/Logo'
import { CiSearch } from 'react-icons/ci'
import { GoHome } from 'react-icons/go'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { BsHandbag } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'
import { HiMenuAlt3 } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { FaRegUserCircle } from 'react-icons/fa'
// import axios from 'axios'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import api from '../API/axios.config'

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(true);

  const queryClient = useQueryClient();
  const navigate = useNavigate();


  const LogoutFunc = async ()=>{
   const res = await api.get(`/auth/logout`,{withCredentials:true});
   if(res.status === 200){
      toast.success("Logout Successfully!!");
      navigate("/login");
      queryClient.invalidateQueries({queryKey:"UserData",refetchType:"active"});

   }

  }


  return (
    <section className='flex relative' >
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        bg-[#1D222B] 
        w-64 lg:w-1/6 
        min-h-screen 
        fixed lg:static 
        top-0 left-0 
        z-50 
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Close button for mobile */}
        <div className='flex justify-between items-center p-5 lg:block'>
          <Logo styling={"text-white text-[20px] sm:text-[24px] font-bold"} />
          <button 
            className='lg:hidden text-white'
            onClick={() => setIsSidebarOpen(false)}
          >
            <IoClose size={28} />
          </button>
        </div>

        <input 
          type="search" 
          className='p-2 w-[90%] text-[#98A2B3] bg-[#2F343D] rounded-sm ml-3 text-sm sm:text-base' 
          name="search" 
          id="search" 
          placeholder="Search"  
        />
         
        <hr className='text-[#2F343D] my-6' />
        
        <ul className='text-[#98A2B3] font-semibold flex flex-col gap-5 ml-5 pr-3'>
          <NavLink 
            to={'/published'} 
            className={({isActive})=> isActive || location.pathname === "/unpublished" 
              ? "flex text-white items-center gap-3 py-2" 
              : "flex items-center gap-3 py-2"
            }
            onClick={() => setIsSidebarOpen(false)}
          > 
            <GoHome size={25} /> 
            <span>Home</span>
          </NavLink>

          <NavLink 
            to={`/product`} 
            className={({isActive})=> isActive 
              ? "flex text-white items-center gap-3 py-2" 
              : "flex items-center gap-3 py-2"
            }
            onClick={() => setIsSidebarOpen(false)}
          > 
            <BsHandbag size={25} /> 
            <span>Products</span>
          </NavLink>
        </ul>
      </aside>

      {/* Main Content */}
      <section className='w-full lg:w-5/6 flex flex-col min-h-screen'>
        <header className='h-14 sm:h-16 border-b flex items-center justify-between lg:justify-end border-[#D1D5DB] px-4 sm:px-6'>
          {/* Mobile Menu Button */}
          <button 
            className='lg:hidden text-[#1D222B]'
            onClick={() => setIsSidebarOpen(true)}
          >
            <HiMenuAlt3 size={28} />
          </button>

          {/* User Menu */}
          <menu className={`${isProfileMenuOpen ? "bg-white transition-discrete": "border-none"} lg:mr-20 flex relative gap-2 sm:gap-3 items-center`}>
            {/* <div className='flex gap-2 items-center' > */}
            {/* <div  className='size-8 sm:size-10 bg-red-400 rounded-full' /> */}
            <FaRegUserCircle size={25} className='' />
            <button type='button' onClick={LogoutFunc} className={`${isProfileMenuOpen ?  "block" :"hidden"} text-sm hover:font-semibold cursor-pointer`} >Logout</button>
            <IoIosArrowDown onClick={()=>{setIsProfileMenuOpen(prev => !prev)}} className={` ${isProfileMenuOpen ? " -rotate-90" : "rotate-0" } text-sm cursor-pointer rounded-full shadow-2xs  bg-[#] sm:text-lg`} />
            {/* </div> */}
            {/* <ul className={`${isProfileMenuOpen? "block bg-white border border-t-0" : "hidden"} absolute p-2 px-5`} >
               <li>Logout</li>
            </ul> */}
          </menu>
        </header>

        <section className='flex-1 overflow-x-hidden'>
          <Outlet/>
        </section>
      </section>
    </section>
  )
}

export default DashboardLayout


// import React from 'react'
// import Logo from '../components/Logo'
// import { CiSearch } from 'react-icons/ci'
// import { GoHome } from 'react-icons/go'
// import { NavLink, Outlet } from 'react-router-dom'
// import { BsHandbag } from 'react-icons/bs'
// import { IoIosArrowDown } from 'react-icons/io'

// const DashboardLayout = () => {
//   return (
//     <section className='flex' >
//       <aside className=' bg-[#1D222B] w-1/6 min-h-screen' >
//         <Logo styling={"text-white text-[24px] p-5 font-bold"} />
//         <input type="search" className='p-2 w-[90%] text-[#98A2B3] bg-[#2F343D] rounded-sm ml-3' name="search" id="search" placeholder={` Search`}  />
         
//          <hr className='text-[#2F343D] my-6' />
//          <ul className='text-[#98A2B3] font-semibold flex flex-col gap-5 ml-5' >
//             <NavLink to={'/published'} className={({isActive})=> isActive || location.pathname === "/unpublished" ? "flex text-white items-center gap-3" : "flex items-center gap-3" } > <GoHome size={25} /> Home </NavLink>
//             {/* "flex items-center gap-3" */}
//             <NavLink to={`/product`} className={({isActive})=> isActive ? "flex text-white items-center gap-3" : "flex items-center gap-3" }> <BsHandbag size={25} /> Products </NavLink>
//          </ul>


      
//       </aside>

//       <section className='w-5/6 flex flex-col' >
//          <header className='h-16  border-b flex items-center justify-end border-[#D1D5DB]' >
//             {/* header */}
//             <menu className='mr-20 flex gap-3 items-center' >
//                 <div className='size-10 bg-red-400 rounded-full' ></div>
//                 <IoIosArrowDown />
//             </menu>
//          </header>
//          <section className='flex-1' >
//             <Outlet/>
//          </section>

//       </section>

    
//     </section>
//   )
// }

// export default DashboardLayout
