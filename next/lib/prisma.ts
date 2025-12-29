import { PrismaClient } from "@prisma/client";

const getPrismaClient = () => {
  // Prisma 7 requires explicit configuration when the schema doesn't contain a URL.
  // We use @ts-ignore because the generated types might not reflect the runtime config yet.
  return new PrismaClient({
    // @ts-ignore
    datasourceUrl: process.env.DATABASE_URL,
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
