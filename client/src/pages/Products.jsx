import React, { useContext } from 'react'
import EmptyCard from '../components/EmptyCard';
import ProductForm from '../components/ProductForm';
import { IoMdAdd } from 'react-icons/io';
import ProductCard from '../components/ProductCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../components/Loader';
import ProductDetail from '../context/ProductContext/product';

const Products = () => {

    
    // const isEmpty = false;

    const context = useContext(ProductDetail);
    
    const {isProductFormOpen,setIsProductFormOpen} = context;

    // const[openCreateForm, setOpenCreateForm] = useState(false);

    const getProductData = async()=>{
        try {
            const res = await axios.get(`http://localhost:4020/productr/api/products/all-product`,{withCredentials:true});
            return res?.data?.data;
        } catch (error) {
            return error?.response?.msg;
        }
    }

    const {data, isLoading,isError} = useQuery({queryKey:['products'], queryFn:getProductData});

    console.log(data);

    
    //    if(data?.length === 0 ){
    //     return <main className='w-full h-[80vh] flex justify-center items-center' >
    //             <EmptyCard
    //               heading={`Feels a little empty over here...`} 
    //               summary={`You can create products without connecting store you can add products to store anytime`}
    //               needBtn={true}
    //               setOpenCreateForm={setOpenCreateForm}/>

    //         </main>
    //    }

    if(isError){
    return <> Error in fetching Data </>
        }
  
    return (
        <div> 
        { isProductFormOpen && <ProductForm formType={"Add"} BtnType={"Create"} /> }

     <section className={`text-[#344054] ${data?.length === 0 ? "hidden" : "flex" } text-[18px] p-5 flex justify-between`}>  
        <h1 className='font-semibold' >Products</h1>
        <button className='flex items-center cursor-pointer' onClick={()=>setIsProductFormOpen(true)} ><IoMdAdd /> Add Products </button>
     </section>
        
        { isLoading && <Loader/> }  
        {
            data?.length === 0 && <main className='w-full h-[80vh] flex justify-center items-center' >
                <EmptyCard
                  heading={`Feels a little empty over here...`} 
                  summary={`You can create products without connecting store you can add products to store anytime`}
                  needBtn={true}
                  />

            </main>
        }

     <section className='mx-5 gap-10 grid grid-cols-4 bred-500 ' >
        { data?.map((product)=>{
            // console.log(product.name);
            
            return  <ProductCard key={product._id} productId={product._id} name={product?.name} type={product?.type} brandName={product?.brandName} isReturnEligible={product?.isReturnEligible} mrp={product?.mrp} productImg={product?.productImgs} quatityInStock={product?.quantityInStock} sellingPrice={product?.sellingPrice} status={product?.status}  />
        })}
        {/* <ProductCard/> */}
        {/* <ProductCard/> */}
        

     </section>
        
    </div>
  )
}

export default Products
