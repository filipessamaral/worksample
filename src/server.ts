import cors from "cors";
import routes from "./Routes";
import { connectToDatabase } from "./DB";
import express, { Express, Request, Response } from "express";

const PORT = process.env.PORT || 3111;

export const startServer = async (connectToDb: boolean = true) => {
  const app: Express = express();

  app.use(cors()).use(express.json()).options("*", cors());

  app.use("/", routes);

  app.get("/", (req: Request, res: Response) => {
    res.send({ api: "ok" });
  });

  if (connectToDb) {
    await connectToDatabase();
  }

  const server = app.listen(PORT, () => {
    console.log(`[server]: Server is running at PORT:${PORT}`);
  });

  return { app, server };
};
