import React, { useContext, useRef, useState, useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import "./imageUpload.css";
// import ImageUpload from './ImageUpload'
import { CreateProduct, GetProductById, UpdateProduct } from '../API/product.api';
import ProductDetail from '../context/ProductContext/product';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const ProductForm = ({formType, BtnType, itemName}) => {
   
  const context = useContext(ProductDetail);
const {setIsProductFormOpen, isEditingOn,setIsEditingOn} = context;

  const getData = async ()=>{
    try{
    const res = await axios.get(`http://localhost:4020/productr/api/products/get-product/${isEditingOn.productId}`,{withCredentials:true});
    
    return res.data?.data;

    }catch(err){
      console.log(err);
      return ;     
    } 
  }

  // Fetch product data if editing
  const { data: productData, isLoading, isError } = useQuery({queryKey: ['product',isEditingOn.productId], queryFn: getData });
  
  const imagesInitializedRef = useRef(false);
  const [images,setImages] = useState([]);
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


  const createProduct = async(e)=>{ 
   e.preventDefault();
   // Validate form data first
   if (!validateFormData()) {
     return;
   }

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
       // Update existing product
       res = await UpdateProduct( productData,isEditingOn?.productId);
       if(res.status === 200){
         console.log('Product updated successfully:', res);
         alert('Product updated successfully!');
       }
     } else {
       // Create new product
       res = await CreateProduct(productData);
       if(res.status === 200){
         console.log('Product created successfully:', res);
         alert('Product created successfully!');
       }
     }

     
     // Call the refresh callback if provided to reload data
    //  if (onRefresh && typeof onRefresh === 'function') {
    //    await onRefresh();
    //  }
     
     setIsProductFormOpen(false);
   } catch (error) {
     console.error('Error creating/updating product:', error);
     alert('Failed to create/update product');
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
   <section className='absolute top-0 left-0 flex justify-center items-center bgShadow min-w-screen min-h-screen' >
      <section className=' bg-white p-5 rounded-lg' >
          <section className='flex   font-medium items-center justify-between' >
          <h1 className='text-[#363942] text-[20px] font-semibold' >Delete Product</h1>
          <IoClose onClick={()=>{setIsProductFormOpen(false)}} className='cursor-pointer' size={25} />   
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
    <section className='absolute z-30 top-0 left-0 flex justify-center items-center bgShadow min-w-screen min-h-screen' >
        {/* absolute top-[50%] translate-[-50%] left-[50%] */}
    <section className=' bg-white z-40 min-w-[30%] rounded-lg' >
       <section className='flex border-b p-3 text-[16px] font-medium border-[#DCDFE3] items-center justify-between' >
         <h1>{`${formType} Product`}</h1>
         <IoClose onClick={ClosingForm} className='cursor-pointer' size={25} />
       </section>

      {isEditingOn?.status && isLoading ? (
        <div className='p-10 flex justify-center items-center'>
          <p>Loading product data...</p>
        </div>
      ) : (
      <form onSubmit={createProduct} className='flex text-[14px]  pt-2 flex-col ' >
    
        <label className="mx-5 mb-1" htmlFor="">Product Name</label>
        <input ref={nameRef} defaultValue={isEditingOn?.status ? productData?.name : ""} className="mx-5 mb-2 border p-1 px-2 rounded-lg border-[#DCDFE3]" type="text" placeholder='Product Name' />

        <label className="mx-5 mb-1 " htmlFor="">Product Type</label>
         <select ref={typeRef} defaultValue={isEditingOn?.status ? (productData?.type || '') : ''} className="mx-5 mb-2 border p-1 px-2 rounded-lg border-[#DCDFE3]" name="" id="">
           {ProductType.map((types)=>{
             return <option key={types} value={types}>{types}</option>
           })}
            {/* <option value=""></option>
            <option value=""></option>
            <option value=""></option> */}
         </select>

         <label className="mx-5 mb-1" htmlFor="">Quantity Stock</label>
         <input ref={quantityRef} defaultValue={isEditingOn?.status ? (productData?.quantityInStock || '') : ''} className="mx-5 mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" type="number" placeholder='Total numbers of Stock available' name="" id="" />

         <label className="mx-5 mb-1" htmlFor="">MRP</label>
         <input ref={mrpRef} defaultValue={isEditingOn?.status ? (productData?.mrp || '') : ''} className="mx-5 mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" placeholder='MRP' type="number" name="" id="" />

         <label className="mx-5 mb-1" htmlFor="">Selling Price</label>
         <input ref={sellingPriceRef} defaultValue={isEditingOn?.status ? (productData?.sellingPrice || '') : ''} className="mx-5 mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" placeholder='Selling Price' type="number" name="" id="" />

         <label className="mx-5 mb-1" htmlFor="">Brand Name</label>
         <input ref={brandRef} defaultValue={isEditingOn?.status ? (productData?.brandName || '') : ''} className="mx-5 mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" placeholder='Brand Name' type="text" name="" id="" />
   
         <section className='flex justify-between' >
         <h1 className="mx-5 text-sm mb-1">Upload Product Images</h1>
         { images?.length > 0 && <label className={`${images?.length >= 5 ? "hidden" : "block"}  mx-5 text-xs mb-1 cursor-pointer`}  htmlFor="images">Add more photos</label>}
         </section>
         <input onChange={handleImageChange} type="file" accept='image/*' hidden multiple name="images" id="images" />
         <div className='mx-5 mb-2 p-2 px-2  flex justify-center items-center rounded-lg border border-dotted border-[#DCDFE3]' >
            
            { images?.length === 0 ? <section className='p-2 flex flex-col items-center'>
               <label className='cursor-pointer' htmlFor='images' >Enter Description </label>
               <label className='cursor-pointer' htmlFor='images' >Browse </label>
            </section> : <section className='grid grid-cols-5 grid-rows-1 w-full h-full gap-2' >
                {images.map((img, index) => (
          <div className="image-card size-20 flex justify-center items-center" key={index}>
            <img src={img.preview || img} alt="product image" />
            <button
              type="button"
              className="remove-btn cursor-pointer flex justify-center items-center p-1 text-xs"
              onClick={() => removeImage(index)}
            >
              ✕
            </button>
          </div>
        ))}
            </section> }

         </div>

         <label className="mx-5 mb-1" htmlFor="">Exchange or return eligibility</label>
         <select ref={returnEligibilityRef} defaultValue={isEditingOn?.status ? (productData?.isReturnEligible ? 'Yes' : 'No') : 'Yes'} className="mx-5 cursor-pointer mb-2 p-1 px-2 rounded-lg border border-[#DCDFE3]" name="" id="">
            <option className='cursor-pointer' value="Yes">Yes</option>
            <option className='cursor-pointer' value="No">No</option>
         </select>
         {/* <ImageUpload/> */}

         <section className='flex justify-end py-3 rounded-b-lg border-t border-[#DCDFE3] bg-[#F7F8FA]' >
            <button type='submit' className='GradientBtn cursor-pointer text-white py-2 rounded-md px-4 mr-5'  >{ isEditingOn.status ? "Update" : BtnType}</button>
         </section>

      </form>
      )}

    </section>
    </section>
  )
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
