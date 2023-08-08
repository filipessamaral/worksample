import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { UserStatus } from "../Models/UserModel";

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  status: Joi.string()
    .valid(...Object.values(UserStatus))
    .optional()
    .default(UserStatus.ACTIVE)
});

const userValidationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

export default userValidationMiddleware;
