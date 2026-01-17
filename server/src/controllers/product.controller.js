import mongoose from "mongoose";
import cloudinary from "../config/cloudnary.config.js";
import productModel from "../models/product.model.js";



 
export const AddProduct = async(req,res)=>{
  
   try{
   
   const{name,type,quantityInStock,mrp,sellingPrice,brandName,isReturnEligible} = req.body;

//    console.log("FILES:", req.files);
//  console.log("BODY:", req.body);

   if(!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "Product images required" });
    };

     const imageUrls = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
        { folder: "products" }
      );
      imageUrls.push(result.secure_url);
    }

    const product = await productModel.create({
      name,
      type,
      brandName,
      quantityInStock,
      mrp,
      sellingPrice,
      productImgs: imageUrls,
      isReturnEligible,
    });

    res.status(201).json({
      msg: "Product created",
      product,
    });

  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }  
};



export const SendProduct =  async (req,res)=>{
      try {
        
        const {productId} = req.params;
        if(!productId) return res.status(400).json({msg:"didn't get the product id"});
        const theProduct = await productModel.findOne({_id: new mongoose.Types.ObjectId(productId)});
        if(!theProduct) return res.status(404).json({msg:"The Product is not available!"});
        res.status(200).json({msg:"Got the product", data: theProduct});

      } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Server error", error: error.message});
      }
};



export const editProduct = async()=>{

};



export const deleteProduct = async(req, res)=>{
       try {
        
        const {productId} = req.params;

        if(!productId) return res.status(400).json({msg:"select a product to delete it"});

        const theProduct = await productModel.findOne({_id: new mongoose.Types.ObjectId(productId)});

        if(!theProduct) return res.status(404).json({msg:"The Product is already deleted or never been created!"});

        // Delete images from Cloudinary
        if(theProduct.productImgs && theProduct.productImgs.length > 0) {
          for(const imageUrl of theProduct.productImgs) {
            const publicId = imageUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`products/${publicId}`);
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