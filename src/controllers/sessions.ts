import { PrismaClient, Session } from '../models';
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
}
