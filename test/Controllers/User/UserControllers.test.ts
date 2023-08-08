import request from "supertest";
import { Express } from "express";
import { UserService } from "../../../src/Services/userService";
import { closeTestServer, startTestServer } from "../../utils/startServerTest";
import { UserStatus } from "../../../src/Models/UserModel";
import { Server } from "http";

jest.mock("../../../src/Services/userService");

describe("User Controllers", () => {
  let app: Express;
  let server: Server;

  beforeAll(async () => {
    const serverStart = await startTestServer();
    app = serverStart.app;
    server = serverStart.server;
  });

  afterAll(async () => {
    await closeTestServer(server);
  });


  describe("getUsersController", () => {

    it("should get users with valid query parameter", async () => {
      const mockUsers = [
        {
          "_id": "64d0c6e32e33cf90a1b885a8",
          "status": "active",
          "firstName": "Fizz2",
          "lastName": "buzz2",
          "email": "foo2@buzz2.com",
          "createdAt": "2023-08-07T10:26:43.797Z",
          "__v": 0
        },
        {
          "_id": "64d0c6cf2e33cf90a1b885a6",
          "status": "active",
          "firstName": "Fizz2",
          "lastName": "buzz2",
          "email": "foo2@buzz2.com",
          "createdAt": "2023-08-07T10:26:23.170Z",
          "__v": 0
        }
      ];

      (UserService.prototype.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

      const response = await request(app)
        .get("/users")
        .query({ created: "asc" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
    });

    it("should handle errors when getting users", async () => {
      const error = new Error("Failed to get users");

      (UserService.prototype.getAllUsers as jest.Mock).mockRejectedValue(error);

      const response = await request(app)
        .get("/users")
        .query({ created: "asc" });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to get users" });
    });

    it("should handle validation error with invalid query parameter", async () => {
      const response = await request(app)
        .get("/users")
        .query({ created: "invalid" });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });
  });

  describe("postUserController", () => {

    it("should create a new user", async () => {
      const newUser = {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        password: "password123"
      };

      (UserService.prototype.createUser as jest.Mock).mockResolvedValue(newUser);

      const response = await request(app)
        .post("/users")
        .send(newUser);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.objectContaining(newUser));
    });

    it("should handle errors when creating a user", async () => {
      const error = new Error("Failed to create user");

      (UserService.prototype.createUser as jest.Mock).mockRejectedValue(error);

      const response = await request(app)
        .post("/users")
        .send({
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@example.com",
          password: "password123",
          status: UserStatus.INACTIVE
        });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to create user" });
    });
  });

});
