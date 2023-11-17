import { PrismaClient, Role, Session } from '../models';
import { v4 as uuidv4 } from 'uuid';

export namespace Sessions {
  export const createSession = async (userGuid: string): Promise<Session> => {
    const prisma = PrismaClient.instance;
    const session = await prisma.session.findUnique({
      where: {
        userGuid,
      },
    });
    if (session) {
      throw new Error('session for the specified user already exists');
    } else {
      return prisma.session.create({
        data: {
          guid: uuidv4(),
          userGuid,
        },
      });
    }
  };

  export const deleteSession = async (guid: string): Promise<Session> => {
    const prisma = PrismaClient.instance;
    const session = await prisma.session.delete({
      where: {
        guid,
      },
    });
    if (session) {
      return session;
    } else {
      throw new Error('specified session does not exist');
    }
  };

  export const getSessionByRoleGuidAndUserGuid = async (
    roleGuid: string,
    userGuid: string
  ): Promise<Session | null> => {
    const prisma = PrismaClient.instance;
    const role = await prisma.role.findUnique({
      where: {
        guid: roleGuid,
      },
    });
    if (role) {
      const user = await prisma.user.findUnique({
        where: {
          guid: userGuid,
          roleId: role.id,
        },
      });
      if (user) {
        return prisma.session.findUnique({
          where: {
            userGuid: user.guid,
          },
        });
      } else {
        throw new Error('specified user does not exist');
      }
    } else {
      throw new Error('specified role does not exist');
    }
  };

  export const getSessionByUserGuid = async (
    userGuid: string
  ): Promise<Session | null> => {
    const prisma = PrismaClient.instance;
    return prisma.session.findUnique({
      where: {
        userGuid,
      },
    });
  };

  export const getSessions = async (): Promise<Session[]> => {
    const prisma = PrismaClient.instance;
    return prisma.session.findMany();
  };

  export const getSessionsByRoleGuid = async (
    roleGuid: string
  ): Promise<Session[]> => {
    const prisma = PrismaClient.instance;
    const role = await prisma.role.findUnique({
      where: { guid: roleGuid },
    });
    if (role) {
      const users = await prisma.user.findMany({
        where: {
          roleId: role.id,
        },
      });
      if (users && users.length > 0) {
        const userGuids = users.map((user) => user.guid);
        return prisma.session.findMany({
          where: {
            userGuid: {
              in: userGuids,
            },
          },
        });
      } else {
        return [];
      }
    } else {
      throw new Error('specified role does not exist');
    }
  };
}
