import bcrypt from "bcryptjs";
import { UserCollection } from "../DB";
import { UserDocument, UserStatus } from "../Models/UserModel";

export const BCRYPT_SALT = 11;

export class UserService {
  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    status: UserStatus
  ): Promise<UserDocument> {
    try {
      const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT);
      const newUser: UserDocument = await UserCollection.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        status
      });

      return newUser.toObject();
    } catch (error) {
      console.error("[UserService][createUser] Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }

  async getAllUsers(sortByCreatedAt: "asc" | "desc" = "asc"): Promise<UserDocument[]> {
    try {
      const usersQuery = UserCollection.find().sort({
        createdAt: sortByCreatedAt === "asc" ? 1 : -1
      });
      usersQuery.select("-password");

      const users: UserDocument[] = await usersQuery.exec();

      return users;
    } catch (error) {
      console.error("[UserService][getAllUsers] Error getting users:", error);
      throw new Error("Failed to get users");
    }
  }
}
