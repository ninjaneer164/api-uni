import { PrismaClient } from '../models/prisma.js';
import { SessionCreateInput } from '../models/session.js';
import { User } from '../models/user.js';

export namespace Sessions {
  export const createSession = async (
    _: any,
    args: { data: SessionCreateInput }
  ) => {
    const prisma = PrismaClient.instance;
    const { userId } = args.data;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      const session = await prisma.session.findUnique({
        where: {
          userId,
        },
      });
      if (session) {
        throw new Error('session for the specified user already exists');
      } else {
        return prisma.session.create({
          data: {
            userId,
          },
        });
      }
    } else {
      throw new Error('specified user does not exists');
    }
  };

  export const deleteSession = async (_: any, args: { id: string }) => {
    const prisma = PrismaClient.instance;
    const { id } = args;

    const session = await prisma.session.findUnique({
      where: {
        id,
      },
    });
    if (session) {
      return prisma.session.delete({
        where: {
          id,
        },
      });
    } else {
      throw new Error('specified session does not exist');
    }
  };

  export const getSessionById = (_: any, args: { id: string }) => {
    const prisma = PrismaClient.instance;
    return prisma.session.findUnique({ where: { id: args.id } });
  };

  export const getSessionByRoleIdAndUserId = async (
    _: any,
    args: { roleId: string; userId: string }
  ) => {
    const prisma = PrismaClient.instance;
    const { roleId, userId } = args;

    const role = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });
    if (role) {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
          roleId: role.id,
        },
      });
      if (user) {
        return prisma.session.findUnique({
          where: {
            userId,
          },
        });
      } else {
        throw new Error('specified user does not exist');
      }
    } else {
      throw new Error('specified role does not exist');
    }
  };

  export const getSessions = () => {
    const prisma = PrismaClient.instance;
    return prisma.session.findMany();
  };

  export const getUserSession = (user: User) => {
    const prisma = PrismaClient.instance;
    return prisma.session.findUnique({
      where: {
        userId: user.id,
      },
    });
  };
}
