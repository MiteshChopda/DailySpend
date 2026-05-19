import mongoose from "mongoose"

const mongoDB = "mongodb://localhost:27017";

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed', err);
    process.exit(1);
  }
};
