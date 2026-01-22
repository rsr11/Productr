import React, { useContext, useRef, useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import "./imageUpload.css";
// import ImageUpload from './ImageUpload'
import { CreateProduct,  UpdateProduct } from '../API/product.api';
import ProductDetail from '../context/ProductContext/product';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({formType, BtnType, itemName}) => {
   
  const context = useContext(ProductDetail);
const {setIsProductFormOpen, isEditingOn,setIsEditingOn} = context;
const queryClient = useQueryClient();
const navigate = useNavigate();


  const getData = async ()=>{
    try{
    const res = await axios.get(`http://localhost:4020/productr/api/products/get-product/${isEditingOn.productId}`,{withCredentials:true});  
    return res.data?.data;
    }catch(err){
      console.log(err);
      return err.response.data;     
    } 
  }

  // Fetch product data if editing
  // if(isEditingOn.productId){
  const { data: productData, isLoading:productDataLoading, isError } = useQuery({queryKey: ['product',isEditingOn.productId], queryFn: getData });
  // }
  const imagesInitializedRef = useRef(false);
  const [images,setImages] = useState([]);
  const [isLoading,setLoading] = useState(false);
  const nameRef = useRef();
  const typeRef = useRef();
  const quantityRef = useRef();
  const mrpRef = useRef();
  const sellingPriceRef = useRef();
  const brandRef = useRef();
  const returnEligibilityRef = useRef();

  // Update images when product data is loaded
  useEffect(() => {
    if (isEditingOn?.status && productData?.productImgs && !imagesInitializedRef.current) {
      setImages(productData.productImgs);
      imagesInitializedRef.current = true;
    }
  }, [productData, isEditingOn?.status]);

  // Reset images when closing form
  useEffect(() => {
    if (!isEditingOn?.status) {
      setImages([]);
      imagesInitializedRef.current = false;
    }
  }, [isEditingOn?.status]);

  
  
  
   
const ProductType = [`Foods`,`Electronics`,`Clothes`,`Beauty Products`,`Others`];


const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  if(files.size >= 5*1024*1024){
    console.log(files); 
    return; 
  }
  console.log(files?.size);
  
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };


  const removeImage = (index) => {
    setImages((prev) => {
      const imageToRemove = prev[index];
      if (imageToRemove && imageToRemove.preview) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };


  const validateFormData = () => {
    // Get all values from refs
    const name = nameRef.current?.value?.trim();
    const type = typeRef.current?.value?.trim();
    const quantity = quantityRef.current?.value;
    const mrp = mrpRef.current?.value;
    const sellingPrice = sellingPriceRef.current?.value;
    const brand = brandRef.current?.value?.trim();
    const returnEligibility = returnEligibilityRef.current?.value;

    // Validation checks
    if (!name) {
      alert('Product Name is required');
      return false;
    }

    if (!type) {
      alert('Product Type is required');
      return false;
    }

    if (!quantity || quantity <= 0) {
      alert('Quantity must be greater than 0');
      return false;
    }

    if (!mrp || mrp <= 0) {
      alert('MRP must be greater than 0');
      return false;
    }

    if (!sellingPrice || sellingPrice <= 0) {
      alert('Selling Price must be greater than 0');
      return false;
    }

    if (parseFloat(sellingPrice) > parseFloat(mrp)) {
      alert('Selling Price cannot be greater than MRP');
      return false;
    }

    if (!brand) {
      alert('Brand Name is required');
      return false;
    }

    if (!returnEligibility) {s
      alert('Exchange or return eligibility is required');
      return false;
    }

    if (images?.length === 0) {
      alert('At least one product image is required');
      return false;
    }

    return true;
  };



  // const createProduct = async(e)=>{ 
  // setIsProductFormOpen(false);  
  // setLoading(true);
  //  e.preventDefault();
  //  // Validate form data first
  //  if (!validateFormData()) {
  //    return;
  //  }
  //  // Prepare product data
  //  const productData = {
  //    name: nameRef.current.value,
  //    type: typeRef.current.value,
  //    quantityInStock: quantityRef.current.value,
  //    mrp: mrpRef.current.value,
  //    sellingPrice: sellingPriceRef.current.value,
  //    brandName: brandRef.current.value,
  //    isReturnEligible: returnEligibilityRef.current.value === 'Yes' ? true : false,
  //    images: images
  //  };

  //  try {
  //    let res;
  //    if (isEditingOn?.status && isEditingOn?.productId) {
  //      // Update existing product
  //      res = await UpdateProduct( productData,isEditingOn?.productId);
  //      if(res.status === 200){
  //        console.log('Product updated successfully:', res);
  //        alert('Product updated successfully!');
  //        setLoading(false);
  //       toast.success("Product is updated !",{position:"bottom-center",hideProgressBar:true,theme:"colored",transition:"Slide"});
  //       // queryClient.invalidateQueries(["products"]);
  //       await queryClient.invalidateQueries({queryKey:['products'],refetchType:"all"});
  //      }
  //    } else {
  //      // Create new product
  //      res = await CreateProduct(productData);
  //      if(res.status === 200){
  //       console.log('Product created successfully:', res);
  //       alert('Product created successfully!');
  //       setLoading(false);
  //       toast.success("Product is created !",{position:"bottom-center",hideProgressBar:true,theme:"colored",transition:"Slide"});
  //       await queryClient.invalidateQueries({queryKey:['products',],refetchType:"all"});

  //      }
  //    }

     
  //    // Call the refresh callback if provided to reload data
  //   //  if (onRefresh && typeof onRefresh === 'function') {
  //   //    await onRefresh();
  //   //  }
     
  //    setIsProductFormOpen(false);
  //  } catch (error) {
  //    console.error('Error creating/updating product:', error);
  //    alert('Failed to create/update product');
  //    setLoading(false);
  //  }

  // }


  const createProduct = async(e) => {
  e.preventDefault();
  
  // Validate form data first
  if (!validateFormData()) {
    return;
  }

  setLoading(true); // Start loading

  // Prepare product data
  const productData = {
    name: nameRef.current.value,
    type: typeRef.current.value,
    quantityInStock: quantityRef.current.value,
    mrp: mrpRef.current.value,
    sellingPrice: sellingPriceRef.current.value,
    brandName: brandRef.current.value,
    isReturnEligible: returnEligibilityRef.current.value === 'Yes' ? true : false,
    images: images
  };

  try {
    let res;
    
    if (isEditingOn?.status && isEditingOn?.productId) {
      // Update existing product - ADD AWAIT
      res = await UpdateProduct(productData, isEditingOn?.productId);
      
      if(res.status === 200) {
        console.log('Product updated successfully:', res);
        toast.success("Product is updated!", {
          position: "bottom-center",
          hideProgressBar: true,
          theme: "colored"
        });
        
        // Invalidate all product-related queries
        await queryClient.invalidateQueries({
          queryKey: ['products'],
          refetchType: 'active'
        });
        await queryClient.invalidateQueries({
          queryKey: ['publish-data'],
          refetchType: 'active'
        });
        await queryClient.invalidateQueries({
          queryKey: ['unpublish-data'],
          refetchType: 'active'
        });
      }
    } else {
      // Create new product - ADD AWAIT
      res = await CreateProduct(productData);
      
      if(res.status === 200) {
        console.log('Product created successfully:', res);
        toast.success("Product is created!", {
          position: "bottom-center",
          hideProgressBar: true,
          theme: "colored"
        });
        navigate("/product");
        // Invalidate all product-related queries
        await queryClient.refetchQueries({
          queryKey: ['products'],
          refetchType: 'active'
        });
      }
    }
    
    setLoading(false);
    setIsProductFormOpen(false);
    
    // Reset editing state
    if (isEditingOn.status) {
      setIsEditingOn({ status: false, productId: null });
    }
    
  } catch (error) {
    console.error('Error creating/updating product:', error);
    toast.error('Failed to create/update product', {
      position: "bottom-center",
      hideProgressBar: true,
      theme: "colored"
    });
    setLoading(false);
    setIsProductFormOpen(false);
  }
}



   
  
  
  const ClosingForm =()=>{
    if(isEditingOn.status){
      setIsProductFormOpen(false);
      setIsEditingOn(false);
    }else{
      setIsProductFormOpen(false);
    }
  };

  

  if(formType === "Delete"){
  return (
    <section className='fixed top-0 left-0 flex justify-center items-center bgShadow w-full h-full z-50 px-4'>
      <section className='bg-white p-4 sm:p-5 md:p-6 rounded-lg w-full max-w-md'>
        <section className='flex font-medium items-center justify-between'>
          <h1 className='text-[#363942] text-lg sm:text-xl font-semibold'>Delete Product</h1>
          <IoClose 
            onClick={() => {setIsProductFormOpen(false)}} 
            className='cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-colors' 
            size={28} 
          />   
        </section>
        <p className='text-[#344054] text-sm sm:text-base mt-4 sm:mt-5'>
          Are you sure you really want to delete this Product
        </p>
        <p className='text-[#344054] font-semibold text-sm sm:text-base mt-1'>{`" ${itemName} " ?`}</p>
        <section className='flex justify-end gap-3 mt-5'>
          <button 
            type='button' 
            onClick={() => setIsProductFormOpen(false)}
            className='border border-[#D4D4D4] cursor-pointer py-2 rounded-md px-4 text-sm sm:text-base hover:bg-gray-50 transition-colors'
          >
            Cancel
          </button>
          <button 
            type='button' 
            className='GradientBtn cursor-pointer text-white py-2 rounded-md px-4 text-sm sm:text-base hover:opacity-90 transition-opacity'
          >
            Delete
          </button>
        </section>
      </section>
    </section>
  )
}

return (
  <section className='fixed z-30 top-0 left-0 flex justify-center items-center bgShadow w-full h-full overflow-y-auto p-4'>
    {/* {isLoading && <Loader/>} */}
    
    <section className='bg-white z-40 w-full max-w-xl sm:max-w-lg rounded-lg my-auto max-h-[95vh] overflow-y-auto'>
      <section className='flex border-b p-3 sm:p-4 text-sm sm:text-base font-medium border-[#DCDFE3] items-center justify-between sticky top-0 bg-white z-10'>
        <h1>{ isEditingOn ? "Edit Product" : "Add Product"}</h1>
        <IoClose 
          onClick={ClosingForm} 
          className='cursor-pointer hover:bg-gray-100 rounded-full p-1 transition-colors' 
          size={28} 
        />
      </section>

      {isEditingOn?.status && isLoading ? (
        <Loader/>
        // <div className='p-10 flex justify-center items-center'>
        //   <p className='text-sm sm:text-base'>Updating the data</p>
        // </div>
      ) : (
        <form onSubmit={createProduct} className='flex text-xs sm:text-sm pt-2 flex-col pb-4'>
    
          <label className="mx-4 sm:mx-5 mb-1 font-medium text-[#344054]" htmlFor="productName">Product Name</label>
          <input 
            ref={nameRef} 
            defaultValue={isEditingOn?.status ? productData?.name : ""} 
            className="mx-4 sm:mx-5 mb-3 border p-2 px-3 rounded-lg border-[#DCDFE3] focus:outline-none focus:ring-2 focus:ring-[#071074] focus:border-transparent transition-all" 
            type="text" 
            placeholder='Product Name'
            id="productName"
          />

          <label className="mx-4 sm:mx-5 mb-1 font-medium text-[#344054]" htmlFor="productType">Product Type</label>
          <select 
            ref={typeRef} 
            defaultValue={isEditingOn?.status ? (productData?.type || '') : ''} 
            className="mx-4 sm:mx-5 mb-3 border p-2 px-3 rounded-lg border-[#DCDFE3] focus:outline-none focus:ring-2 focus:ring-[#071074] focus:border-transparent transition-all cursor-pointer"
            id="productType"
          >
            {ProductType.map((types) => {
              return <option key={types} value={types}>{types}</option>
            })}
          </select>

          <label className="mx-4 sm:mx-5 mb-1 font-medium text-[#344054]" htmlFor="quantity">Quantity Stock</label>
          <input 
            ref={quantityRef} 
            defaultValue={isEditingOn?.status ? (productData?.quantityInStock || '') : ''} 
            className="mx-4 sm:mx-5 mb-3 p-2 px-3 rounded-lg border border-[#DCDFE3] focus:outline-none focus:ring-2 focus:ring-[#071074] focus:border-transparent transition-all" 
            type="number" 
            placeholder='Total numbers of Stock available'
            id="quantity"
          />

          <label className="mx-4 sm:mx-5 mb-1 font-medium text-[#344054]" htmlFor="mrp">MRP</label>
          <input 
            ref={mrpRef} 
            defaultValue={isEditingOn?.status ? (productData?.mrp || '') : ''} 
            className="mx-4 sm:mx-5 mb-3 p-2 px-3 rounded-lg border border-[#DCDFE3] focus:outline-none focus:ring-2 focus:ring-[#071074] focus:border-transparent transition-all" 
            placeholder='MRP' 
            type="number"
            id="mrp"
          />

          <label className="mx-4 sm:mx-5 mb-1 font-medium text-[#344054]" htmlFor="sellingPrice">Selling Price</label>
          <input 
            ref={sellingPriceRef} 
            defaultValue={isEditingOn?.status ? (productData?.sellingPrice || '') : ''} 
            className="mx-4 sm:mx-5 mb-3 p-2 px-3 rounded-lg border border-[#DCDFE3] focus:outline-none focus:ring-2 focus:ring-[#071074] focus:border-transparent transition-all" 
            placeholder='Selling Price' 
            type="number"
            id="sellingPrice"
          />

          <label className="mx-4 sm:mx-5 mb-1 font-medium text-[#344054]" htmlFor="brandName">Brand Name</label>
          <input 
            ref={brandRef} 
            defaultValue={isEditingOn?.status ? (productData?.brandName || '') : ''} 
            className="mx-4 sm:mx-5 mb-3 p-2 px-3 rounded-lg border border-[#DCDFE3] focus:outline-none focus:ring-2 focus:ring-[#071074] focus:border-transparent transition-all" 
            placeholder='Brand Name' 
            type="text"
            id="brandName"
          />
   
          <section className='flex justify-between items-center'>
            <h1 className="mx-4 sm:mx-5 text-xs sm:text-sm mb-1 font-medium text-[#344054]">Upload Product Images</h1>
            {images?.length > 0 && (
              <label 
                className={`${images?.length >= 5 ? "hidden" : "block"} mx-4 sm:mx-5 text-xs mb-1 cursor-pointer text-[#071074] hover:underline`} 
                htmlFor="images"
              >
                Add more photos
              </label>
            )}
          </section>

          <input 
            onChange={handleImageChange} 
            type="file" 
            accept='image/*' 
            hidden 
            multiple 
            name="images" 
            id="images" 
          />

          <div className='mx-4 sm:mx-5 mb-3 p-3 sm:p-4 flex justify-center items-center rounded-lg border border-dotted border-[#DCDFE3] min-h-[100px]'>
            {images?.length === 0 ? (
              <section className='p-2 flex flex-col items-center text-center'>
                <label className='cursor-pointer text-[#344054] mb-1' htmlFor='images'>
                  Enter Description
                </label>
                <label className='cursor-pointer text-[#071074] font-medium hover:underline' htmlFor='images'>
                  Browse
                </label>
              </section>
            ) : (
              <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full gap-2 sm:gap-3'>
                {images.map((img, index) => (
                  <div className="image-card relative w-full aspect-square flex justify-center items-center border border-[#DCDFE3] rounded-lg overflow-hidden" key={index}>
                    <img src={img.preview || img} alt="product" className='w-full h-full object-cover' />
                    <button
                      type="button"
                      className="remove-btn absolute top-1 right-1 cursor-pointer flex justify-center items-center bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 text-sm transition-colors"
                      onClick={() => removeImage(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </section>
            )}
          </div>

          <label className="mx-4 sm:mx-5 mb-1 font-medium text-[#344054]" htmlFor="returnEligibility">Exchange or return eligibility</label>
          <select 
            ref={returnEligibilityRef} 
            defaultValue={isEditingOn?.status ? (productData?.isReturnEligible ? 'Yes' : 'No') : 'Yes'} 
            className="mx-4 sm:mx-5 cursor-pointer mb-3 p-2 px-3 rounded-lg border border-[#DCDFE3] focus:outline-none focus:ring-2 focus:ring-[#071074] focus:border-transparent transition-all"
            id="returnEligibility"
          >
            <option className='cursor-pointer' value="Yes">Yes</option>
            <option className='cursor-pointer' value="No">No</option>
          </select>

          <section className='flex justify-end gap-3 py-3 sm:py-4 px-4 sm:px-5 rounded-b-lg border-t border-[#DCDFE3] bg-[#F7F8FA] mt-2 sticky bottom-0'>
            <button 
              type='button'
              onClick={ClosingForm}
              className='border border-[#D4D4D4] cursor-pointer py-2 rounded-md px-4 text-xs sm:text-sm hover:bg-white transition-colors'
            >
              Cancel
            </button>
            <button 
              type='submit' 
              className='GradientBtn cursor-pointer text-white py-2 rounded-md px-4 sm:px-6 text-xs sm:text-sm hover:opacity-90 transition-opacity'
            >
              {isEditingOn.status ? "Update" : BtnType}
            </button>
          </section>
        </form>
      )}
    </section>
  </section>
)

  
  
  
  // if(formType === "Delete"){
  //     return (
  //  <section className='absolute top-0 left-0 flex justify-center items-center bgShadow min-w-screen min-h-screen' >
  //     <section className=' bg-white p-5 rounded-lg' >
  //         <section className='flex   font-medium items-center justify-between' >
  //         <h1 className='text-[#363942] text-[20px] font-semibold' >Delete Product</h1>
  //         <IoClose onClick={()=>{setIsProductFormOpen(false)}} className='cursor-pointer' size={25} />   
  //         </section>
  //         <p className='text-[#344054] text-[14px] mt-5' >Are you sure you really want to delete this Product </p>
  //         <p className='text-[#344054] font-semibold'>{`" ${itemName} " ?`}</p>
  //         <section className='flex justify-end'>
  //         <button type='button' className='GradientBtn cursor-pointer text-white py-2 rounded-md px-4 mr-5'  >Delete</button>
  //         </section>

  //     </section>
  //  </section>
  //     )
  // }

  // return (
  //   <section className='absolute z-30 top-0 left-0 flex justify-center items-center bgShadow min-w-screen min-h-screen' >

  //     {isLoading && <Loader/>}
  //       {/* absolute top-[50%] translate-[-50%] left-[50%] */}
  //   <section className=' bg-white z-40 min-w-[30%] rounded-lg' >
  //      <section className='flex border-b p-3 text-[16px] font-medium border-[#DCDFE3] items-center justify-between' >
  //        <h1>{`${formType} Product`}</h1>
  //        <IoClose onClick={ClosingForm} className='cursor-pointer' size={25} />
  //      </section>

  //     {isEditingOn?.status && isLoading ? (
  //       <div className='p-10 flex justify-center items-center'>
  //         <p>Updating the data</p>
  //       </div>
  //     ) : (
  //     <form onSubmit={createProduct} className='flex text-[14px]  pt-2 flex-col ' >
    
  //       <label className="mx-5 mb-1" htmlFor="">Product Name</label>
  //       <input ref={nameRef} defaultValue={isEditingOn?.status ? productData?.name : ""} className="mx-5 mb-2 border p-1 px-2 rounded-lg border-[#DCDFE3]" type="text" placeholder='Product Name' />

  //       <label className="mx-5 mb-1 " htmlFor="">Product Type</label>
  //        <select ref={typeRef} defaultValue={isEditingOn?.status ? (productData?.type || '') : ''} className="mx-5 mb-2 border p-1 px-2 rounded-lg border-[#DCDFE3]" name="" id="">
  //          {ProductType.map((types)=>{
  //            return <option key={types} value={types}>{types}</option>
  //          })}

  //        </select>

  //        <label className="mx-5 mb-1" htmlFor="">Quantity Stock</label>
  //        <input ref={quantityRef} defaultValue={isEditingOn?.status ? (productData?.quantityInStock || '') : ''} className="mx-5 mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" type="number" placeholder='Total numbers of Stock available' name="" id="" />

  //        <label className="mx-5 mb-1" htmlFor="">MRP</label>
  //        <input ref={mrpRef} defaultValue={isEditingOn?.status ? (productData?.mrp || '') : ''} className="mx-5 mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" placeholder='MRP' type="number" name="" id="" />

  //        <label className="mx-5 mb-1" htmlFor="">Selling Price</label>
  //        <input ref={sellingPriceRef} defaultValue={isEditingOn?.status ? (productData?.sellingPrice || '') : ''} className="mx-5 mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" placeholder='Selling Price' type="number" name="" id="" />

  //        <label className="mx-5 mb-1" htmlFor="">Brand Name</label>
  //        <input ref={brandRef} defaultValue={isEditingOn?.status ? (productData?.brandName || '') : ''} className="mx-5 mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" placeholder='Brand Name' type="text" name="" id="" />
   
  //        <section className='flex justify-between' >
  //        <h1 className="mx-5 text-sm mb-1">Upload Product Images</h1>
  //        { images?.length > 0 && <label className={`${images?.length >= 5 ? "hidden" : "block"}  mx-5 text-xs mb-1 cursor-pointer`}  htmlFor="images">Add more photos</label>}
  //        </section>
  //        <input onChange={handleImageChange} type="file" accept='image/*' hidden multiple name="images" id="images" />
  //        <div className='mx-5 mb-2 p-2 px-2  flex justify-center items-center rounded-lg border border-dotted border-[#DCDFE3]' >
            
  //           { images?.length === 0 ? <section className='p-2 flex flex-col items-center'>
  //              <label className='cursor-pointer' htmlFor='images' >Enter Description </label>
  //              <label className='cursor-pointer' htmlFor='images' >Browse </label>
  //           </section> : <section className='grid grid-cols-5 grid-rows-1 w-full h-full gap-2' >
  //               {images.map((img, index) => (
  //         <div className="image-card size-20 flex justify-center items-center" key={index}>
  //           <img src={img.preview || img} alt="product image" />
  //           <button
  //             type="button"
  //             className="remove-btn cursor-pointer flex justify-center items-center p-1 text-xs"
  //             onClick={() => removeImage(index)}
  //           >
  //             ✕
  //           </button>
  //         </div>
  //       ))}
  //           </section> }

  //        </div>

  //        <label className="mx-5 mb-1" htmlFor="">Exchange or return eligibility</label>
  //        <select ref={returnEligibilityRef} defaultValue={isEditingOn?.status ? (productData?.isReturnEligible ? 'Yes' : 'No') : 'Yes'} className="mx-5 cursor-pointer mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" name="" id="">
  //           <option className='cursor-pointer' value="Yes">Yes</option>
  //           <option className='cursor-pointer' value="No">No</option>
  //        </select>

  //        <section className='flex justify-end py-3 rounded-b-lg border-t border-[#DCDFE3] bg-[#F7F8FA]' >
  //           <button type='submit' className='GradientBtn cursor-pointer text-white py-2 rounded-md px-4 mr-5'  >{ isEditingOn.status ? "Update" : BtnType}</button>
  //        </section>

  //     </form>
  //     )}

  //   </section>
  //   </section>
  // )
}

export default ProductForm











// useEffect(() => {
//     if (isEditingOn?.status && productData) {
//       nameRef.current.value = productData.name || '';
//       typeRef.current.value = productData.type || '';
//       quantityRef.current.value = productData.quantityInStock || '';
//       mrpRef.current.value = productData.mrp || '';
//       sellingPriceRef.current.value = productData.sellingPrice || '';
//       brandRef.current.value = productData.brandName || '';
//       returnEligibilityRef.current.value = productData.isReturnEligible ? 'Yes' : 'No';

//       // Set existing images only once
//       if (!imagesInitializedRef.current && productData.productImgs && productData.productImgs.length > 0) {
//         const existingImages = productData.productImgs.map((img) => ({
//           file: null,
//           preview: img,
//           isExisting: true
//         }));
//         setImages(existingImages);
//         imagesInitializedRef.current = true;
//       }
//     } else if (!isEditingOn?.status) {
//       // Reset when not editing
//       imagesInitializedRef.current = false;
//     }
//   }, [productData, isEditingOn?.status]);
