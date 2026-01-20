import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { AddProduct, deleteProduct, editProduct, SendAllProduct, SendProduct, updateProductStatus } from "../controllers/product.controller.js";
import upload, { uploadProductImages } from "../utils/multer.utils.js";
import { productValidator } from "../validator/product.validator.js";
import { dataValidator } from "../middlewares/validate.middleware.js";



const route = express.Router();


route.post(`/add-product`,authMiddleware,upload.array("productImgs", 5) ,productValidator, dataValidator,AddProduct);
route.delete(`/delete-product/:productId`,authMiddleware,deleteProduct);
route.put(`/edit-product/:productId`,authMiddleware,upload.array("productImgs", 5),editProduct);
route.get(`/get-product/:productId`,authMiddleware,SendProduct);
route.get(`/all-product`,authMiddleware,SendAllProduct);
route.patch(`/update-product-status/:productId`,authMiddleware,updateProductStatus);



export default route;