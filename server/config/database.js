import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect database successfully!");
    return connect;
  } catch (error) {
    console.log("Connect database fail ", error);
  }
};

export default connectDatabase;
