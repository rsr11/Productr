import React from 'react'
import { IoClose } from 'react-icons/io5'

const ProductForm = ({formType, BtnType}) => {
  return (
    <section className='absolute top-0 left-0 flex justify-center items-center bgShadow min-w-screen min-h-screen' >
        {/* absolute top-[50%] translate-[-50%] left-[50%] */}
    <section className=' bg-white rounded-lg' >
       <section className='flex border-b p-3 text-[16px] font-medium border-[#DCDFE3] items-center justify-between' >
         <h1>{formType}</h1>
         <IoClose size={25} />
       </section>

      <form action="" className='flex text-[14px]  pt-2 flex-col ' >
    
        <label className="mx-5 mb-1" htmlFor="">Product Name</label>
        <input className="mx-5 mb-2 border p-1 px-2 rounded-lg border-[#DCDFE3]" type="text" placeholder='Product Name' />

        <label className="mx-5 mb-1 " htmlFor="">Product Type</label>
         <select className="mx-5 mb-2 border p-1 px-2 rounded-lg border-[#DCDFE3]" name="" id="">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
         </select>

         <label className="mx-5 mb-1" htmlFor="">Quantity Stock</label>
         <input className="mx-5 mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" type="number" placeholder='Total numbers of Stock available' name="" id="" />

         <label className="mx-5 mb-1" htmlFor="">MRP</label>
         <input className="mx-5 mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" placeholder='MRP' type="number" name="" id="" />

         <label className="mx-5 mb-1" htmlFor="">Selling Price</label>
         <input className="mx-5 mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" placeholder='Selling Price' type="number" name="" id="" />

         <label className="mx-5 mb-1" htmlFor="">Brand Name</label>
         <input className="mx-5 mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" placeholder='Brand Name' type="text" name="" id="" />

         <label className="mx-5 mb-1" htmlFor="">Upload Product Images</label>
         <input className="mx-5 mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" type="file" name="" id="" />

         <label className="mx-5 mb-1" htmlFor="">Exchange or return eligibility</label>
         <select className="mx-5 mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" name="" id="">
            <option value="">Yes</option>
            <option value="">No</option>
         </select>

         <section className='flex justify-end py-3 rounded-b-lg border-t border-[#DCDFE3] bg-[#F7F8FA]' >
            <button type='submit' className='GradientBtn text-white py-3 rounded-md px-4 mr-5'  >{BtnType}</button>
         </section>

      </form>

    </section>
    </section>
  )
}

export default ProductForm
