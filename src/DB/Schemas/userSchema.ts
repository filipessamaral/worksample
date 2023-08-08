import mongoose from "mongoose";
import { UserDocument, UserStatus } from "../../Models/UserModel";

export const userSchema = new mongoose.Schema<UserDocument>({
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: Object.values(UserStatus), default: UserStatus.ACTIVE },
  firstName: String,
  lastName: String,
  email: String,
  password: String
});
