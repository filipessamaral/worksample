import mongoose from "mongoose";

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface UserDocument extends mongoose.Document {
  createdAt: Date;
  status: UserStatus;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
