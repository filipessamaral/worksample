import { Request, Response } from "express";
import { UserService } from "../../Services/userService";
import Joi from "joi";

const getUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const schema = Joi.object({
      created: Joi.string().valid("asc", "desc").optional()
    });

    const { error, value } = schema.validate(req.query);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { created } = value;

    const userService = new UserService();
    const users = await userService.getAllUsers(created);
    res.json(users);
  } catch (error) {
    console.error("[getUsersController] Error getting users:", error);
    res.status(500).json({ error: "Failed to get users" });
  }
};

export default getUsersController;
