import mongoose from "mongoose"



export const connectDB = async () => {
    try {
        
        let connection = await mongoose.connect(process.env.MONGO_URI);
            console.log(`MongoDB connected in port ${connection.connection.port}`);
        // return connection;);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }};



    