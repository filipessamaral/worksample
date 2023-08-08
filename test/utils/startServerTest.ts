import { startServer } from "../../src/server";
import { Server } from "http";


export async function startTestServer() {
  return await startServer(false); // Do not connect to the database
}

export async function closeTestServer(server: Server) {
  await server.close();
}
