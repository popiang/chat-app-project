import mongoose from "mongoose";

export const connectDB = async () => {
	console.log("masuk connectDB");
	console.log("process.env.MONGODB_URI:", process.env.MONGODB_URI);
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error: ", error);
    }
};
