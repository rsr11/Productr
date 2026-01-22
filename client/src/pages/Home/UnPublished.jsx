import React, { useContext } from 'react'
import EmptyCard from '../../components/EmptyCard';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';
import ProductDetail from '../../context/ProductContext/product';
import ProductForm from '../../components/ProductForm';

const UnPublished = () => {

  const context = useContext(ProductDetail);
  const {isProductFormOpen} = context;  

  const getData = async() => {
    try {
      const res = await axios.get("http://localhost:4020/productr/api/products/all-product?status=unpublish", {withCredentials: true});
      return res.data?.data;
    } catch(err) {
      return err?.response?.msg;
    }
  };

  const {data, isLoading, isError} = useQuery({queryKey: ['unpublish-data'], queryFn: getData});

  console.log(data);
   
  if(data?.length === 0 || isError) {
    return (
      <main className='w-full h-[70vh] sm:h-[80vh] flex justify-center items-center px-4'>
        <EmptyCard
          heading={`No Unpublished Products`} 
          summary={`Your Unpublished Products will appear here Create your first product to publish`}
          needBtn={false}
        />
      </main>
    )
  }
     
  return (
    <>
      {isProductFormOpen && <ProductForm formType={"Update"} BtnType={"update"} />}
      
      <main className='m-3 sm:m-4 md:m-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {isLoading && (
          <div className='col-span-full'>
            <Loader />
          </div>
        )}
        
        {data?.length > 0 && data?.map((product) => {
          return (
            <ProductCard 
              key={product?._id} 
              productId={product?._id} 
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
        })}
      </main>
    </>
  )


  // http://192.168.1.34:5173
}

export default UnPublished


// import React, { useContext } from 'react'
// import EmptyCard from '../../components/EmptyCard';
// import axios from 'axios';
// import { useQuery } from '@tanstack/react-query';
// import ProductCard from '../../components/ProductCard';
// import Loader from '../../components/Loader';
// import ProductDetail from '../../context/ProductContext/product';
// import ProductForm from '../../components/ProductForm';

// const UnPublished = () => {

//   // const isEmpty = true;
//     const context = useContext(ProductDetail);
//   const {isProductFormOpen} = context;  

//   const getData = async()=>{
//     try{
//     const res = await axios.get("http://localhost:4020/productr/api/products/all-product?status=unpublish",{withCredentials:true});
//     return res.data?.data;
//     }catch(err){
//       return err?.response?.msg;
//     }
//   };

//   const {data, isLoading, isError} = useQuery({queryKey:[`unpublish-data`],queryFn:getData});

//    console.log(data);
   
//      if(data?.length === 0 || isError){
//         return (
//             <main className='w-full h-[80vh] flex justify-center items-center' >
//                 <EmptyCard
//                   heading={`No Unpublished Products`} 
//                   summary={`Your Unpublished Products will appear here Create your first product to publish`}
//                   needBtn={false}/>

//             </main>
//         )
//      }

     
     
//      return (
//       <>
//       { isProductFormOpen && <ProductForm formType={"Update"} BtnType={"update"} /> }
//        <main className='m-5 gap-10 grid grid-cols-4'>
//       { isLoading && <Loader/>}
//       { data?.length > 0 && data?.map((product)=>{
//             return  <ProductCard key={product?._id} productId={product?._id} name={product?.name} type={product?.type} brandName={product?.brandName} isReturnEligible={product?.isReturnEligible} mrp={product?.mrp} productImg={product?.productImgs} quatityInStock={product?.quantityInStock} sellingPrice={product?.sellingPrice} status={product?.status}  />
//         })}
//     </main>
//     </>
//   )
// }

// export default UnPublished
