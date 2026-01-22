import React, { useContext } from 'react'
import EmptyCard from '../../components/EmptyCard'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../../components/ProductCard';
import ProductForm from '../../components/ProductForm';
import ProductDetail from '../../context/ProductContext/product';

const Published = () => {
  
  const context = useContext(ProductDetail);
  const {isProductFormOpen} = context;   
  
  const getData = async() => {
    try {
      const res = await axios.get("http://localhost:4020/productr/api/products/all-product?status=publish", {withCredentials: true});
      return res.data?.data;
    } catch(err) {
      return err?.response?.msg;
    }
  };

  const {data, isLoading, isError} = useQuery({queryKey: ['publish-data'], queryFn: getData});

   
  if(data?.length === 0 || isError) {
    return (
      <main className='w-full h-[70vh] sm:h-[80vh] flex justify-center items-center px-4'>
        <EmptyCard 
          heading={`No Published Products`} 
          summary={`Your Published Products will appear here Create your first product to publish`}
          needBtn={false}
        />
      </main>
    )
  }

  return (
    <>
      {isProductFormOpen && <ProductForm formType={"Update"} BtnType={"update"} />}
    
      <main className='m-3 sm:m-4 md:m-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {isLoading ? (
          <div className='col-span-full flex justify-center items-center py-20'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto'></div>
              <p className='mt-4 text-gray-600'>Loading products...</p>
            </div>
          </div>
        ) : (
          data?.map((product) => {
            return (
              <ProductCard 
                key={product._id} 
                productId={product._id} 
                name={product?.name} 
                type={product?.type} 
                brandName={product?.brandName} 
                isReturnEligible={product?.isReturnEligible} 
                mrp={product?.mrp} 
                productImg={product?.productImgs} 
                quatityInStock={product?.quantityInStock} 
                sellingPrice={product?.sellingPrice} 
                status={product?.status}
              />
            )
          })
        )}
      </main>
    </>
  )
}

export default Published


// import React, { useContext } from 'react'
// import EmptyCard from '../../components/EmptyCard'
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';
// import ProductCard from '../../components/ProductCard';
// import ProductForm from '../../components/ProductForm';
// import ProductDetail from '../../context/ProductContext/product';

// const Published = () => {
  
    
//   // const isEmpty = true;
//   const context = useContext(ProductDetail);
//   const {isProductFormOpen} = context;   
//   const getData = async()=>{
//     try{
//     const res = await axios.get("http://localhost:4020/productr/api/products/all-product?status=publish",{withCredentials:true});
//     return res.data?.data;
//     }catch(err){
//       return err?.response?.msg;
//     }
//   };

//   const {data, isLoading, isError} = useQuery({queryKey:[`publish-data`],queryFn:getData});

   
//     if(data?.length === 0 || isError){
//         return (
//             <main className='w-full h-[80vh] flex justify-center items-center' >
//                 <EmptyCard 
//                   heading={`No Published Products`} 
//                   summary={`Your Published Products will appear here Create your first product to publish `}
//                   needBtn={false}/>

//             </main>
//         )
//     }

//   return (
//     <>
//     { isProductFormOpen && <ProductForm formType={"Update"} BtnType={"update"} /> }
    
//     <main className='m-5 gap-10 grid grid-cols-4'>
//       { isLoading ? <h1>Loading</h1> : data?.map((product)=>{
//             return  <ProductCard key={product._id} productId={product._id} name={product?.name} type={product?.type} brandName={product?.brandName} isReturnEligible={product?.isReturnEligible} mrp={product?.mrp} productImg={product?.productImgs} quatityInStock={product?.quantityInStock} sellingPrice={product?.sellingPrice} status={product?.status}  />
//         })}
//     </main>
//     </>
//   )
// }

// export default Published
