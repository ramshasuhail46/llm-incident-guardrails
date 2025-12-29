import { PrismaClient } from "@prisma/client";

const getPrismaClient = () => {
  const url = process.env.DATABASE_URL;

  if (!url) {
    console.error('DATABASE_URL is missing in environment variables!');
  }

  // Use the standard datasources property for Prisma 7 compatibility
  return new PrismaClient({
    // @ts-ignore
    datasources: {
      db: {
        url: url,
      },
    },
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
