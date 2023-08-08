import mongoose from "mongoose";
import { UserDocument } from "../Models/UserModel";
import { userSchema } from "./Schemas/userSchema";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error;
  }
};

const UserCollection = mongoose.model<UserDocument>("User", userSchema);

export { UserCollection };
