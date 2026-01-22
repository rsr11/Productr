import mongoose from "mongoose";
import cloudinary from "../config/cloudnary.config.js";
import productModel from "../models/product.model.js";
import { uploadInCloudnary } from "../utils/cloudnary.utils.js";
// import moongoose from "moongoose";



 
export const AddProduct = async(req,res)=>{
   try{
     const{name,type,quantityInStock,mrp,sellingPrice,brandName,isReturnEligible} = req.body;
     const userId = req.user._id; // Get from authenticated user, NOT from req.body

    //  console.log("FILES:", req.files);
    //  console.log("BODY:", req.body);

   if(!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "Product images required" });
    };

    const productImages = await uploadInCloudnary(req.files);

    const product = await productModel.create({
      name,
      type,
      brandName,
      quantityInStock,
      mrp,
      sellingPrice,
      owner: new mongoose.Types.ObjectId(userId),
      productImgs: productImages,
      isReturnEligible,
    });

    res.status(201).json({msg: "Product created",product});

  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }  
};




export const SendAllProduct = async(req,res)=>{
       try {
         const userId = req.user._id;
         const {status} = req.query;
         let theProduct;

         if(status){
           theProduct = await productModel.find({owner: new mongoose.Types.ObjectId(userId), status: status}); 
         }else{
           theProduct = await productModel.find({owner:new mongoose.Types.ObjectId(userId)});
         }
         res.status(200).json({data:theProduct});
       } catch (error) {
        res.status(400).json({msg:"server error"});
       }
}




export const SendProduct =  async (req,res)=>{
      try {
        
        let {productId} = req.params;
        productId = productId?.trim();

        // let {status} = req.query;
        
        if(!productId) return res.status(400).json({msg:"didn't get the product id"});
        if(!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({msg:"Invalid product ID format"});

        const theProduct = await productModel.findOne({_id: new mongoose.Types.ObjectId(productId)});

        if(!theProduct) return res.status(404).json({msg:"The Product is not available!"});
        res.status(200).json({msg:"Got the product", data: theProduct});

      } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server error", error: error.message});
      }
};




export const updateProductStatus = async (req,res)=>{
     try {
       let {productId} = req.params;
       productId = productId?.trim();

       if(!productId) return res.status(400).json({msg:"didn't get the product id"});
       if(!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({msg:"Invalid product ID format"});

       const theProduct = await productModel.findOne({_id: new mongoose.Types.ObjectId(productId)});
        // }

       if(!theProduct) return res.status(404).json({msg:"The Product is not available!"});
      
       
       if(theProduct.status === "publish"){
       const updatedProdut = await productModel.findByIdAndUpdate(new mongoose.Types.ObjectId(productId),{$set:{status:"unpublish"}},{new:true});
       
       return res.status(200).json({data:updatedProdut,msg:"Status is changed"});

       }else{
       const updatedProdut = await productModel.findByIdAndUpdate(new mongoose.Types.ObjectId(productId),{$set:{status:"publish"}},{new:true});   
        return res.status(200).json({data:updatedProdut,msg:"Status is changed"});
       }

     } catch (error) {
        console.log(error);
        return res.status(400).json({error:error,msg:"server error!"})     
     }
}




export const editProduct = async(req,res)=>{
   try {
    const ProductDetail = req.body;

    const existingImg = JSON.parse(req.body.existingImg);
    console.log(existingImg);
    
    console.log(ProductDetail);
    console.log("FILES:", req.files);

    let { productId } = req.params;
    productId = productId?.trim();

    const theProduct = await productModel.findById(new mongoose.Types.ObjectId(productId));
    if (!theProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    const newImages = theProduct?.productImgs?.filter(item => !existingImg.includes(item));
    console.log(`new images =  ${newImages}`);
    
    
    // req.files && req.files?.length > 0 

        if (newImages.length > 0 || req.files && req.files?.length > 0) {
      // images changed
      console.log(newImages);
      
      if(newImages.length>0){
       for (const img of newImages) {
        const publicId = img.split('/').pop().split('.')[0];
        console.log(publicId);   
        await cloudinary.uploader.destroy(`products/${publicId}`);
      }; };

      let newProductImges = [];

      if (req.files && req.files?.length > 0){
       newProductImges = await uploadInCloudnary(req.files); }

      let updated =  await productModel.findByIdAndUpdate(
        productId,
        {$set: {...req.body, productImgs:[...newProductImges,...existingImg] }},
        {new : true}
      );
     
    res.status(200).json({msg: "Updated successfully",data: updated});

    } else {
      // no new images, just update other fields
      let updated = await productModel.findByIdAndUpdate(
        productId,
        {$set: req.body},
        {new : true}
      );

       res.status(200).json({msg: "Updated successfully",data: updated});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error });
  }
};




export const deleteProduct = async(req, res)=>{
       try {
        
        let {productId} = req.params;
        productId = productId?.trim();

        if(!productId) return res.status(400).json({msg:"select a product to delete it"});
        // if(!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({msg:"Invalid product ID format"});

        const theProduct = await productModel.findOne({_id: new mongoose.Types.ObjectId(productId)});

        if(!theProduct) return res.status(404).json({msg:"The Product is already deleted or never been created!"});

        // Delete images from Cloudinary
        if(theProduct.productImgs && theProduct.productImgs.length > 0) {
          for(const imageUrl of theProduct.productImgs) {
            const publicId = imageUrl.split('/').pop().split('.')[0];
           const isDeleted =  await cloudinary.uploader.destroy(`products/${publicId}`);
            console.log(isDeleted);
          }
        }

        const productDeleted = await productModel.deleteOne({_id:new mongoose.Types.ObjectId(productId)}); 

        if(productDeleted.deletedCount === 0) return res.status(404).json({msg:"Unable to delete the product!"});
        res.status(200).json({msg:"product deleted successfully!"});
        
       } catch (error) {
          console.log(error);
          res.status(500).json({msg:"Server error", error: error.message});
       }
};




