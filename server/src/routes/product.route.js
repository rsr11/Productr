import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { AddProduct, deleteProduct, editProduct, SendProduct } from "../controllers/product.controller.js";
import upload, { uploadProductImages } from "../utils/multer.utils.js";
import { productValidator } from "../validator/product.validator.js";
import { dataValidator } from "../middlewares/validate.middleware.js";



const route = express.Router();


route.post(`/add-product`,authMiddleware,upload.array("productImgs", 5) ,productValidator, dataValidator,AddProduct);
route.delete(`/delete-product/:productId`,authMiddleware,deleteProduct);
route.put(`/edit-product/:productId`,authMiddleware,editProduct);
route.get(`/get-product/:productId`,authMiddleware,SendProduct);




export default route;