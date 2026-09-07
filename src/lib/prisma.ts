import { PrismaClient } from "@prisma/client";

// Next.js gelistirme modunda hot-reload sirasinda birden fazla
// PrismaClient ornegi olusmasini engellemek icin global cache kullanilir.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
