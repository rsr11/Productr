import React, { useContext, useState } from 'react'
import demo1Img from "../assets/demo_product2.png";
import { RiDeleteBin5Line } from 'react-icons/ri';
import { DeleteProduct, updateStatus } from '../API/product.api';
import ProductDetail from '../context/ProductContext/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
// import { toast } from 'react-toastify';
// import {notig} from "react-toastify";
// import { Navigate } from 'react-router-dom';

// const demoData=[{name:"Product type-",}]

const ProductCard = ({name, type, brandName, isReturnEligible, mrp, productImg, quatityInStock, sellingPrice, status, productId}) => {
 
    const context = useContext(ProductDetail);
    const { setIsProductFormOpen, setIsEditingOn } = context;
    const queryClient = useQueryClient();
    const [currentImg, setCurrentImg] = useState({indx:0,link:productImg?.[0]});
 
  
    const deleteMutation = useMutation({
             mutationFn: () => DeleteProduct(productId),
             onMutate: async () => {   // 🔥 OPTIMISTIC UPDATE
             // 1. Stop any ongoing refetch
             await queryClient.cancelQueries(["products"]);

            // 2. Backup current products
            const previousProducts = queryClient.getQueryData(["products"]);

            // 3. Remove product instantly from UI
            queryClient.setQueryData(["products"], (old) =>
            old?.filter((product) => product._id !== productId)
            );

            // 4. Return backup for rollback
           return { previousProducts };
           },

            // ❌ If API fails → rollback
           onError: (error, _, context) => {
             queryClient.setQueryData(
               ["products"],
               context.previousProducts
             );
           },

           // ✅ Always sync with backend
           onSettled: () => {
            toast.success("Deleted successfully")
           queryClient.invalidateQueries(["products"]);
           },
           });


    // const deleteProduct =async ()=>{
    //     const deleted = await DeleteProduct(productId);
    //     queryClient.invalidateQueries(["products"]);     
    //     toast.success(deleted.msg,{position:"bottom-center",theme:"colored",transition:"Slide",autoClose:1000});
    //      queryClient.invalidateQueries(["products"]);  
    //         // toast("server error")
        
    // };

    const EditCard = ()=>{
        setIsProductFormOpen(true);
        setIsEditingOn({ status: true, productId: productId});
    }


    const updateProductStatus= async ()=>{
     
        const res= await updateStatus(productId);
        if(res.status === 200){
        toast.success("status changed!");
        queryClient.invalidateQueries(["products"]);
            
            // navigate(location.pathname,{replace:true});
        }
        

    }
 
    return (
    <section  className='bg-white border-[#DCDFE3] rounded-2xl border'>
       <section className=' w-[90%] m-3 relative bg-[#F8F9FB] border-[#DCDFE3] rounded-lg border mx-auto' >
         <img src={currentImg.link || demo1Img} className='size-32 mx-auto' alt="" />
         <div className='absolute right-[50%] translate-x-[50%] bg-white border p-1 rounded-lg border-[#DCDFE3] -bottom-2 flex gap-1'>
             {
                productImg?.map((data,index)=>{
                    // console.log(data+" "+ index);
                    // console.log(currentImg);
                    
                    return <button key={data} onClick={()=>{setCurrentImg({indx:index,link:data})}} className={`cursor-pointer size-2 rounded-full ${data === currentImg.link ? "bg-orange-500" : "bg-[#DCDFE3]"} `} ></button>
                   
                })
             }
              {/* <div className='size-2 rounded-full bg-orange-500' ></div>
             <div className='size-2 rounded-full bg-[#DCDFE3]' ></div> */}
             {/* <div className='size-2 rounded-full bg-[#DCDFE3]' ></div> */}
         </div>
       </section>
       <h1 className='text-[1rem] mx-3 font-semibold' >{name}</h1>

       <section className='text-[1rem] text-[#98A2B3]' >
        <ul className='mx-3 flex justify-between' >
            <li className="text-[#98A2B3]" >Product type -</li>
            <li className='text-[#344054]' >{type}</li>
        </ul>
        <ul className='mx-3 flex justify-between' >
            <li className="text-[#98A2B3]" >Quantity Stock -</li>
            <li className='text-[#344054]' >{quatityInStock}</li>
        </ul>
        <ul className='mx-3 flex justify-between' >
            <li className="text-[#98A2B3]" >MRP -</li>
            <li className='text-[#344054]' >{mrp}</li>
        </ul>
        <ul className='mx-3 flex justify-between' >
            <li className="text-[#98A2B3]" >Selling Price -</li>
            <li className='text-[#344054]' >{sellingPrice}</li>
        </ul>
        <ul className='mx-3 flex justify-between' >
            <li className='text-[#98A2B3]' >Brand type -</li>
            <li className='text-[#344054]' >{brandName}</li>
        </ul>
        <ul className='mx-3 flex justify-between' >
            <li className="text-[#98A2B3]" >Total Number of images -</li>
            <li className='text-[#344054]' >{productImg?.length}</li>
        </ul>
        <ul className='mx-3 flex justify-between' >
            <li className="text-[#98A2B3]" >Return Eligibility -</li>
            <li className='text-[#344054]' >{isReturnEligible ? "Yes" : "No"}</li>
        </ul>
       </section>

       <section className='gap-2 m-3 flex' >
        {/* <section className='flex gap-2' > */}
        <button type='button' onClick={updateProductStatus}  className={`py-1 w-[40%]  cursor-pointer  px-3 rounded-lg  ${status === "publish" ? "GreenGradientBtn" : "GradientBtn"} text-white`} >{status === "publish" ? "Unpublish" : "Publish"}</button>
        <button onClick={EditCard} className='py-1 w-[40%] cursor-pointer  px-3 rounded-lg border' >Edit</button>
        {/* </section> */}
        <button type='button' onClick={()=>deleteMutation.mutate()} className='border w  cursor-pointer border-[#D4D4D4] px-2 rounded-lg' > <RiDeleteBin5Line size={20} className='mx-auto' color='#98A2B3' /> </button>
       </section>
    </section>
    )}

export default ProductCard
