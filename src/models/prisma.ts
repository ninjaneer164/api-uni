import { PrismaClient as PC } from '@prisma/client';

export class PrismaClient {
  private static _prismaClient: PC;

  public static get instance(): PC {
    return PrismaClient._prismaClient || new PC();
  }
}
