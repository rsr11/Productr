// import { log } from "console";
// import { configDotenv } from "dotenv";
import mongoose from "mongoose"
import Dotenv from "dotenv";
// Dotenv.
Dotenv.config();
// configDotenv.config();



export const connectDB = async () => {
    try {
        // console.log("the uri " +process.env.MONGO_URI);

        let connection = await mongoose.connect(process.env.MONGO_URI);
            console.log(`MongoDB connected in port ${connection.connection.port}`);
        // return connection;);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }};



    