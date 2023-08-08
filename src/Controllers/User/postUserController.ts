import { Request, Response } from "express";
import { UserService } from "../../Services/userService";

const postUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password, status } = req.body;

    const userService = new UserService();
    const newUser = await userService.createUser(firstName, lastName, email, password, status);
    delete newUser.password;
    res.json(newUser);
  } catch (error) {
    console.error("[postUserController] Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

export default postUserController;
