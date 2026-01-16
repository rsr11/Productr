


export const AddProduct = async(req,res)=>{
    
   const{name,Type,quantityInStock,mrp,sellingPrice,brandName,isReturnEligible} = req.body;

   if(!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "Product images required" });
    };

    

     
}