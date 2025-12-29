import { PrismaClient } from "@prisma/client";

import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const getPrismaClient = () => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.warn('DATABASE_URL is missing during Prisma initialization.');
  }

  // Prisma 7 recommended approach for direct connections without schema URLs:
  // Use the pg adapter to provide the connection at runtime.
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | PrismaClient;
}

// We use a Proxy to ensure PrismaClient is only instantiated when actually accessed.
// This prevents "module evaluation" errors during the static build phase.
const prismaProxy = new Proxy({} as PrismaClient, {
  get: (target, prop) => {
    if (!globalThis.prisma) {
      console.log('Initializing lazy Prisma client...');
      globalThis.prisma = getPrismaClient();
    }

    const value = (globalThis.prisma as any)[prop];
    if (typeof value === 'function') {
      return value.bind(globalThis.prisma);
    }
    return value;
  }
});

export { prismaProxy as prisma };
