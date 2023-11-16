import { PrismaClient, Role } from '../models';
import { v4 as uuidv4 } from 'uuid';

export namespace Roles {
  export const createRole = async (role: Role): Promise<Role> => {
    const prisma = PrismaClient.instance;
    const r = await prisma.role.findUnique({
      where: {
        name: role.name,
      },
    });
    if (r) {
      throw new Error('role with the same name already exists');
    } else {
      return prisma.role.create({
        data: {
          ...role,
          guid: uuidv4(),
        },
      });
    }
  };

  export const deleteRole = async (guid: string): Promise<Role> => {
    const prisma = PrismaClient.instance;
    const role = await prisma.role.findUnique({
      where: { guid },
    });
    if (role) {
      const users = await prisma.user.findFirst({
        where: {
          roleId: role.id,
        },
      });
      if (users) {
        throw new Error(
          'specified role cannot be deleted because it is assigned to one or more users'
        );
      } else {
        const result = await prisma.role.delete({
          where: {
            guid,
          },
        });
        return result;
      }
    } else {
      throw new Error('specified role does not exist');
    }
  };

  export const editRole = async (guid: string, role: Role): Promise<Role> => {
    const prisma = PrismaClient.instance;
    const r = await prisma.role.findUnique({
      where: { guid },
    });
    if (r) {
      return prisma.role.update({ data: role, where: { guid } });
    } else {
      throw new Error('specified role does not exist');
    }
  };

  export const getRole = async (guid: string): Promise<Role | null> => {
    const prisma = PrismaClient.instance;
    return prisma.role.findUnique({ where: { guid } });
  };

  export const getRoles = async (): Promise<Role[]> => {
    const prisma = PrismaClient.instance;
    return prisma.role.findMany();
  };
}
