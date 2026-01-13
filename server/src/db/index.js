// mongodb+srv://rajeshwar:<db_password>@cluster0.jazzrzl.mongodb.net/?appName=Cluster0
import mongoose from "mongoose"



export const connectDB = async () => {
    try {
        console.log("eega");
        
        let connection = await mongoose.connect("mongodb+srv://rajeshwar:q0eVcxzqiIbUzj8p@cluster0.jazzrzl.mongodb.net/?appName=Cluster0");
            console.log('MongoDB connected');
        // return connection;);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }};



    // q0eVcxzqiIbUzj8p