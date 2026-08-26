// import Dotenv from "dotenv";
// Dotenv.
// Dotenv.config();
import express from 'express';
import cors from "cors";
import { connectDB } from './db/index.js';
import cookieParser from 'cookie-parser';
import UserRoute from "./routes/user.route.js";
import ProductRoute from "./routes/product.route.js";
import { initCloudinary } from "./config/cloudnary.config.js";


const app = express();


// middlewares 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors({origin:"https://productrsr.netlify.app", credentials:true}));

initCloudinary();


app.use(`/productr/api/auth`,UserRoute);
app.use(`/productr/api/products`,ProductRoute);



app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT =  process.env.PORT || 5000;

connectDB().then(() => {app.listen(PORT , () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});});




