import React from 'react'
import { IoClose } from 'react-icons/io5'

const ProductForm = ({formType, BtnType, setOpenCreateForm, itemName}) => {
   
    if(formType === "Delete"){
        return (
     <section className='absolute top-0 left-0 flex justify-center items-center bgShadow min-w-screen min-h-screen' >
        <section className=' bg-white p-5 rounded-lg' >
            <section className='flex   font-medium items-center justify-between' >
            <h1 className='text-[#363942] text-[20px] font-semibold' >Delete Product</h1>
            <IoClose onClick={()=>{setOpenCreateForm(false)}} className='cursor-pointer' size={25} />   
            </section>
            <p className='text-[#344054] text-[14px] mt-5' >Are you sure you really want to delete this Product </p>
            <p className='text-[#344054] font-semibold'>{`" ${itemName} " ?`}</p>
            <section className='flex justify-end'>
            <button type='button' className='GradientBtn cursor-pointer text-white py-2 rounded-md px-4 mr-5'  >Delete</button>
            </section>

        </section>
     </section>
        )
    }

  return (
    <section className='absolute top-0 left-0 flex justify-center items-center bgShadow min-w-screen min-h-screen' >
        {/* absolute top-[50%] translate-[-50%] left-[50%] */}
    <section className=' bg-white rounded-lg' >
       <section className='flex border-b p-3 text-[16px] font-medium border-[#DCDFE3] items-center justify-between' >
         <h1>{`${formType} Product`}</h1>
         <IoClose onClick={()=>{setOpenCreateForm(false)}} className='cursor-pointer' size={25} />
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
         <input className="mx-5 mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" type="file" accept='images/*' placeholder='Enter Description' multiple name="" id="" />

         <label className="mx-5 mb-1" htmlFor="">Exchange or return eligibility</label>
         <select className="mx-5 mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" name="" id="">
            <option value="">Yes</option>
            <option value="">No</option>
         </select>

         <section className='flex justify-end py-3 rounded-b-lg border-t border-[#DCDFE3] bg-[#F7F8FA]' >
            <button type='submit' className='GradientBtn text-white py-2 rounded-md px-4 mr-5'  >{BtnType}</button>
         </section>

      </form>

    </section>
    </section>
  )
}

export default ProductForm
