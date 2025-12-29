import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
    // @ts-ignore - Prisma 7 property, might need @ts-ignore for local types
    directUrl: process.env["DIRECT_URL"],
  },
});
