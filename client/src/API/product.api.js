// import axios from "axios"
import api from "./axios.config";
// import { useNavigate } from "react-router-dom";


export const CreateProduct = async(productData)=>{
  const formData = new FormData(); 
  // Append all text fields
    formData.append('name', productData.name);
    formData.append('type', productData.type);
    formData.append('quantityInStock', productData.quantityInStock);
    formData.append('mrp', productData.mrp);
    formData.append('sellingPrice', productData.sellingPrice);
    formData.append('brandName', productData.brandName);
    formData.append('isReturnEligible', productData.isReturnEligible);
    
    // Append all images - multer will detect them as array
    if(productData.images && productData.images.length > 0){
      productData.images.forEach((img) => {
        formData.append('productImgs', img.file);
        console.log(img.file);
        
      });
    }
    
    try {
      
      const res = await api.post(`/productr/api/products/add-product`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });
        
        if(res.status >= 200 && res.status < 300) return {status:res.status,data:res.data};

      } catch (error) {
        console.error('Error creating product:', error);
        return error?.response?.data || error;
      }
}




export const DeleteProduct = async(productId)=>{
  try {  
    console.log(productId);
      
    const res = await api.delete(`/productr/api/products/delete-product/${productId}`,{
      withCredentials:true
    });
    
    // if(res.status === 200){
      return {status:res.status,msg:res.data.msg};
    // }
    
  } catch (error) {
    console.error('Error delete product:', error);
    return {status:400,msg:"can't able to delete it"};
  }
}

export const GetProductById = async(productId)=>{
     try {
        const res = await api.get(`/productr/api/products/${productId}`,{
            withCredentials:true
          });
          
          if(res.status === 200){
            return res.data?.data;
          }

     } catch (error) {
        console.error('Error fetching product:', error);
        return error?.response?.data || error;
     }
}

export const UpdateProduct = async(productData,productId)=>{
  const formData = new FormData(); 
  // Append all text fields
  formData.append('name', productData.name);
  formData.append('type', productData.type);
  formData.append('quantityInStock', productData.quantityInStock);
  formData.append('mrp', productData.mrp);
  formData.append('sellingPrice', productData.sellingPrice);
  formData.append('brandName', productData.brandName);
  formData.append('isReturnEligible', productData.isReturnEligible);
  
  const existingImg = [];
  // Append all images - multer will detect them as array
  if(productData.images && productData.images.length > 0){
      productData.images.forEach((img) => {
        // console.log(img);
        
        console.log(img?.file); 

        if(img?.file?.size >= 5*1024*1024){
          return {status:400,msg:"img size should be less then 5mb"};
        }
        
        
        // Only append if it's a new file (has .file property)
        if(img.file) {
          formData.append('productImgs', img.file);     
        }else{
          existingImg.push(img);
        }
      });
    }
    
    formData.append("existingImg",JSON.stringify(existingImg));

    
    try {
      const res = await api.put(`/productr/api/products/edit-product/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      
      if(res.status >= 200 && res.status < 300) return {status:res.status,data:res.data};
      
    } catch (error) {
      console.error('Error updating product:', error);
      return error?.response?.data || error;
    }
  }
  
  
  
  export const updateStatus = async(productId)=>{

    // const navigate = useNavigate();
    try {
    
    const res = await api.patch(`/productr/api/products/update-product-status/${productId}`,{},{withCredentials:true});
    
    if(res.status === 200) return {status: res.status, data: res?.data?.msg};
  

   } catch (error) {
      console.log(error);
      return {status: error?.response?.status, data: error?.response?.data};
   }
} 