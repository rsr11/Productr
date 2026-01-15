import React from 'react'
import demo1Img from "../assets/demo_product2.png";
import { RiDeleteBin5Line } from 'react-icons/ri';

// const demoData=[{name:"Product type-",}]

const ProductCard = () => {
  return (
    <section  className='bg-white border-[#DCDFE3] rounded-2xl border'>
       <section className=' w-[90%] m-3 relative bg-[#F8F9FB] border-[#DCDFE3] rounded-lg border mx-auto' >
         <img src={demo1Img} className='w-1/2 mx-auto' alt="" />
         <div className='absolute right-[50%] translate-x-[50%] bg-white border p-1 rounded-lg border-[#DCDFE3] -bottom-2 flex gap-1'>
             <div className='size-2 rounded-full bg-orange-500' ></div>
             <div className='size-2 rounded-full bg-[#DCDFE3]' ></div>
             {/* <div className='size-2 rounded-full bg-[#DCDFE3]' ></div> */}
         </div>
       </section>
       <h1 className='text-[1rem] mx-3 font-semibold' >CakeZone Walnut Brownie</h1>

       <section className='text-[1rem] text-[#98A2B3]' >
        <ul className='mx-3 flex justify-between' >
            <li className="text-[#98A2B3]" >Product type -</li>
            <li className='text-[#344054]' >Food</li>
        </ul>
        <ul className='mx-3 flex justify-between' >
            <li className="text-[#98A2B3]" >Quantity Stock -</li>
            <li className='text-[#344054]' >200</li>
        </ul>
        <ul className='mx-3 flex justify-between' >
            <li className="text-[#98A2B3]" >MRP -</li>
            <li className='text-[#344054]' >2000</li>
        </ul>
        <ul className='mx-3 flex justify-between' >
            <li className="text-[#98A2B3]" >Selling Price -</li>
            <li className='text-[#344054]' >2000</li>
        </ul>
        <ul className='mx-3 flex justify-between' >
            <li className='text-[#98A2B3]' >Brand type -</li>
            <li className='text-[#344054]' >CakeZone</li>
        </ul>
        <ul className='mx-3 flex justify-between' >
            <li className="text-[#98A2B3]" >Total Number of images -</li>
            <li className='text-[#344054]' >2</li>
        </ul>
        <ul className='mx-3 flex justify-between' >
            <li className="text-[#98A2B3]" >Exchange Eligibility -</li>
            <li className='text-[#344054]' >Yes</li>
        </ul>
       </section>

       <section className='gap-2 m-3 flex' >
        {/* <section className='flex gap-2' > */}
        <button className='py-1 w-[40%]  cursor-pointer  px-3 rounded-lg GreenGradientBtn text-white' >Unpublish</button>
        <button className='py-1 w-[40%] cursor-pointer  px-3 rounded-lg border' >Edit</button>
        {/* </section> */}
        <button className='border w  cursor-pointer border-[#D4D4D4] px-2 rounded-lg' > <RiDeleteBin5Line size={20} className='mx-auto' color='#98A2B3' /> </button>
       </section>
    </section>
  )
}

export default ProductCard
