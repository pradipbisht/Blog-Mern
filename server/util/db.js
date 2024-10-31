import mongoose from "mongoose";

const DBCon = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb has Connected");
  } catch (error) {
    console.log("MongoDb Error", error);
  }
};

export default DBCon;
