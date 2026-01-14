import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <section className='flex flex-col' >
       <nav className='border-b pl-5 font-semibold  pt-5 p border-[#DCDFE3]' >
          <ul className=' text-[#98A2B3] flex gap-5' >
            {/* #0B99FF border-b color on active */}
            {/* #344054 text-color on active */}
            {/* #98A2B3 text-color on unactive */}
            <NavLink to={`/published`} className={({isActive})=> isActive ? "border-b-2 border-[#0B99FF] pb-3 text-[#344054]" : ""}  >Published</NavLink>
            <NavLink to={`/unpublished`} className={({isActive})=> isActive ? "border-b-2 border-[#0B99FF] pb-3 text-[#344054]" : ""} >Unpublished</NavLink>
          </ul>
       </nav>
        
        <section  >
            <Outlet/>
        </section>

    </section>
  )
}

export default HomeLayout
