import React, { useContext } from 'react'
import { HiOutlineViewGridAdd } from 'react-icons/hi'
import ProductDetail from '../context/ProductContext/product'

const EmptyCard = ({heading,summary,needBtn, }) => {

  const context = useContext(ProductDetail);
  const {setIsProductFormOpen} = context;

  return (
    <section className=' ' >
      <HiOutlineViewGridAdd size={100} color='#071074' className='mx-auto'  />
      <h2 className='text-center text-[#344054] font-semibold text-[20px] mt-5' >{heading}</h2>
      <p className='text-[#98A2B3] text-center text-[14px] font-normal w-72' > {summary}</p>
      {needBtn && <button onClick={()=>{setIsProductFormOpen(true)}} type='button'  className='GradientBtn cursor-pointer text-white w-full p-3 mt-5 rounded-lg'>Add your Products</button> }
    </section>
  )
}

export default EmptyCard
