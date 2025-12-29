import { PrismaClient } from "@prisma/client";

const getPrismaClient = () => {
  const url = process.env.DATABASE_URL;

  // During build, we provide a dummy URL to prevent the constructor from crashing.
  // The actual connection will only be attempted when a query is run.
  return new PrismaClient({
    datasources: {
      db: {
        url: url || "postgresql://never:connect@localhost:5432/never"
      }
    }
  });
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
