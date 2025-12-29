import { PrismaClient } from "@prisma/client";

const getPrismaClient = () => {
  // During build, we don't provide any configuration. 
  // Prisma 7 will read from prisma.config.ts or DATABASE_URL at runtime.
  return new PrismaClient();
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
