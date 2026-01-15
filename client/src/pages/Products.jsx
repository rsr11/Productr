import React, { useState } from 'react'
import EmptyCard from '../components/EmptyCard';
import ProductForm from '../components/ProductForm';
import { IoMdAdd } from 'react-icons/io';
import ProductCard from '../components/ProductCard';

const Products = () => {

    const isEmpty = false;
    const[openCreateForm, setOpenCreateForm] = useState(false);

   
    // if(isEmpty){
    //     return (
    //         <main className='w-full h-[80vh] flex justify-center items-center' >
    //             <EmptyCard
    //               heading={`Feels a little empty over here...`} 
    //               summary={`You can create products without connecting store you can add products to store anytime`}
    //               needBtn={true}
    //               setOpenCreateForm={setOpenCreateForm}/>

    //         </main>
    //     )
    // }

    

    return (
        <div>
        { openCreateForm && <ProductForm formType={"Add"} setOpenCreateForm={setOpenCreateForm} BtnType={"Create"} /> }
        {
            isEmpty && <main className='w-full h-[80vh] flex justify-center items-center' >
                <EmptyCard
                  heading={`Feels a little empty over here...`} 
                  summary={`You can create products without connecting store you can add products to store anytime`}
                  needBtn={true}
                  setOpenCreateForm={setOpenCreateForm}/>

            </main>
        }

     <section className='text-[#344054] text-[18px] p-5 flex justify-between'>  
        <h1 className='font-semibold' >Products</h1>
        <button className='flex items-center cursor-pointer' onClick={()=>setOpenCreateForm(true)} ><IoMdAdd /> Add Products </button>
     </section>

     <section className='mx-5 gap-10 grid grid-cols-4 bred-500 ' >
        <ProductCard/>
        <ProductCard/>
        

     </section>
        
    </div>
  )
}

export default Products
