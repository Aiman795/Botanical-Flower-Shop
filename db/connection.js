import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const URI = process.env.MongoDBURI;
    if (!URI) throw new Error("MongoDB URI not defined in environment variables.");
    
    await mongoose.connect(URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.stack);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectDB;
