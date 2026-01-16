import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { AddProduct } from "../controllers/product.controller.js";
import { uploadProductImages } from "../utils/multer.utils.js";



const route = express.Router();


route.post(`/add`,authMiddleware,uploadProductImages,AddProduct);




export default route;