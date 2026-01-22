import React, { useContext } from 'react'
import EmptyCard from '../components/EmptyCard';
import ProductForm from '../components/ProductForm';
import { IoMdAdd } from 'react-icons/io';
import ProductCard from '../components/ProductCard';
import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import Loader from '../components/Loader';
import ProductDetail from '../context/ProductContext/product';
import api from '../API/axios.config';

const Products = () => {

    
    const context = useContext(ProductDetail);  
    const {isProductFormOpen,setIsProductFormOpen} = context;

    const getProductData = async()=>{
        try {
            const res = await api.get(`/products/all-product`,{withCredentials:true});
            return res?.data?.data;
        } catch (error) {
            return error?.response?.msg;
        }
    }

    const {data, isLoading,isError} = useQuery({queryKey:['products'], queryFn:getProductData});

    console.log(data);


    if(isError){
    return <> Error in fetching Data </>
        }
  
    return (

         <div className="min-h-screen"> 
        {isProductFormOpen && <ProductForm formType={"Add"} BtnType={"Create"} />}

        {/* Responsive Header Section */}
        <section className={`text-[#344054] ${data?.length === 0 ? "hidden" : "flex"} text-base sm:text-lg p-4 sm:p-5 flex flex-row sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0`}>  
            <h1 className='font-semibold'>Products</h1>
            <button 
                className='flex items-center gap-1 cursor-pointer hover:text-[#1d2939] transition-colors px-3 py-2 rounded-md hover:bg-gray-100' 
                onClick={() => setIsProductFormOpen(true)}
            >
                <IoMdAdd className="text-xl" /> 
                <span className="hidden sm:inline">Add Products</span>
                <span className="sm:hidden">Add</span>
            </button>
        </section>
    
        {isLoading && <Loader/>}
        
        {/* Empty State */}
        {data?.length === 0 && (
            <main className='w-full h-[70vh] sm:h-[80vh] flex justify-center items-center px-4'>
                <EmptyCard
                    heading={`Feels a little empty over here...`} 
                    summary={`You can create products without connecting store you can add products to store anytime`}
                    needBtn={true}
                />
            </main>
        )}

        {/* Responsive Product Grid */}
        <section className='mx-3 sm:mx-4 md:mx-5 mb-6 gap-4 sm:gap-6 md:gap-8 lg:gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {data?.map((product) => {
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
            })}
        </section>
    </div>

    //     <div> 
    //     { isProductFormOpen && <ProductForm formType={"Add"} BtnType={"Create"} /> }

    //  <section className={`text-[#344054] ${data?.length === 0 ? "hidden" : "flex" } text-[18px] p-5 flex justify-between`}>  
    //     <h1 className='font-semibold' >Products</h1>
    //     <button className='flex items-center cursor-pointer' onClick={()=>setIsProductFormOpen(true)} ><IoMdAdd /> Add Products </button>
    //  </section>
        
    //     { isLoading && <Loader/> }  
    //     {
    //         data?.length === 0 && <main className='w-full h-[80vh] flex justify-center items-center' >
    //             <EmptyCard
    //               heading={`Feels a little empty over here...`} 
    //               summary={`You can create products without connecting store you can add products to store anytime`}
    //               needBtn={true}
    //               />

    //         </main>
    //     }

    //  <section className='mx-5 gap-10 grid grid-cols-4 bred-500 ' >
    //     { data?.map((product)=>{
    //         // console.log(product.name);
            
    //         return  <ProductCard key={product._id} productId={product._id} name={product?.name} type={product?.type} brandName={product?.brandName} isReturnEligible={product?.isReturnEligible} mrp={product?.mrp} productImg={product?.productImgs} quatityInStock={product?.quantityInStock} sellingPrice={product?.sellingPrice} status={product?.status}  />
    //     })}
    //     {/* <ProductCard/> */}
    //     {/* <ProductCard/> */}
        

    //  </section>
        
    // </div>
  )
}

export default Products
