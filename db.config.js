// src/db.config.ts
import "dotenv/config";
import { PrismaClient } from "./generated/prisma/client.js";
export const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});
//# sourceMappingURL=db.config.js.map