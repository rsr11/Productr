import React from 'react'
import Logo from '../components/Logo'
import { CiSearch } from 'react-icons/ci'
import { GoHome } from 'react-icons/go'
import { NavLink, Outlet } from 'react-router-dom'
import { BsHandbag } from 'react-icons/bs'
import { IoIosArrowDown } from 'react-icons/io'

const DashboardLayout = () => {
  return (
    <section className='flex' >
      <aside className=' bg-[#1D222B] w-1/6 min-h-screen' >
        <Logo styling={"text-white text-[24px] p-5 font-bold"} />
        <input type="search" className='p-2 w-[90%] text-[#98A2B3] bg-[#2F343D] rounded-sm ml-3' name="search" id="search" placeholder={` Search`}  />
         
         <hr className='text-[#2F343D] my-6' />
         <ul className='text-[#98A2B3] font-semibold flex flex-col gap-5 ml-5' >
            <NavLink to={'/published'} className={({isActive})=> isActive || location.pathname === "/unpublished" ? "flex text-white items-center gap-3" : "flex items-center gap-3" } > <GoHome size={25} /> Home </NavLink>
            {/* "flex items-center gap-3" */}
            <NavLink to={`/product`} className={({isActive})=> isActive ? "flex text-white items-center gap-3" : "flex items-center gap-3" }> <BsHandbag size={25} /> Products </NavLink>
         </ul>


      
      </aside>

      <section className='w-5/6 flex flex-col' >
         <header className='h-16  border-b flex items-center justify-end border-[#D1D5DB]' >
            {/* header */}
            <menu className='mr-20 flex gap-3 items-center' >
                <div className='size-10 bg-red-400 rounded-full' ></div>
                <IoIosArrowDown />
            </menu>
         </header>
         <section className='flex-1' >
            <Outlet/>
         </section>

      </section>

    
    </section>
  )
}

export default DashboardLayout
