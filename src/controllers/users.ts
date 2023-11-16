import { PrismaClient, User } from '../models';
import { v4 as uuidv4 } from 'uuid';

export namespace Users {
  export const createUser = async (user: User): Promise<User> => {
    const prisma = PrismaClient.instance;
    return prisma.user.create({
      data: {
        ...user,
        guid: uuidv4(),
      },
    });
  };

  export const editUser = async (guid: string, user: User): Promise<User> => {
    const prisma = PrismaClient.instance;
    const u = await prisma.user.findUnique({
      where: {
        guid,
      },
    });
    if (u) {
      return prisma.user.update({ data: user, where: { guid } });
    } else {
      throw new Error('specified user does not exist');
    }
  };

  export const getUser = async (guid: string): Promise<User | null> => {
    const prisma = PrismaClient.instance;
    return prisma.user.findUnique({ where: { guid } });
  };

  export const getUsers = async (): Promise<User[]> => {
    const prisma = PrismaClient.instance;
    return prisma.user.findMany();
  };
}
