import React from 'react'
import EmptyCard from '../components/EmptyCard';
import ProductForm from '../components/ProductForm';

const Products = () => {

    const isEmpty = false;

   
    if(isEmpty){
        return (
            <main className='w-full h-[80vh] flex justify-center items-center' >
                <EmptyCard
                  heading={`Feels a little empty over here...`} 
                  summary={`You can create products without connecting store you can add products to store anytime`}
                  needBtn={true}/>

            </main>
        )
    }

  return (
    <div>
      <ProductForm formType={"Add Product"} BtnType={"Create"} />
    </div>
  )
}

export default Products
