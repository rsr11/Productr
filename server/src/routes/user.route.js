
import express from "express";
import { registrationValidation } from "../validator/user.validator.js";
import { registerUser } from "../controllers/user.controller.js";


const route = express.Router();


route.post(`/register`,registrationValidation,registerUser);


export default route;
