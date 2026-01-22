
import express from "express";
import { loginUser, registerUser, UserLogOut, verifyOtp } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const route = express.Router();


route.post(`/register`,registerUser);

route.post('/login',loginUser);

route.post(`/checkOtp`,verifyOtp);

route.get(`/activeUser`,authMiddleware,(req,res)=>{
    const userId = req.user;
    res.status(200).json({msg:"Valid User",data:{status:200,username:userId.name}});
});


route.get(`/logout`,authMiddleware,UserLogOut);




export default route;
