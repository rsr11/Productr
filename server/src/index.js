import express from 'express';
import cors from "cors";
import { connectDB } from './db/index.js';
import Dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import UserRoute from "./routes/user.route.js";
import ProductRoute from "./routes/product.route.js";

Dotenv.config();

const app = express();


// middlewares 
app.use(express.urlencoded({extended:true,limit:'16kb'}));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors());


app.use(`/productr/api/auth`,UserRoute);
// app.use(`/productr/api/products`,ProductRoute);



app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = 3000;

connectDB().then(() => {app.listen(process.env.PORT , () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});});




