import { PrismaClient } from '../models/prisma.js';
import { RoleCreateInput, RoleEditInput } from '../models/role.js';
import { User } from '../models/user.js';
import { Utils } from '../utils/utils.js';

export namespace Roles {
  export const createRole = async (_: any, args: { data: RoleCreateInput }) => {
    const prisma = PrismaClient.instance;
    const { name } = args.data;

    if (Utils.isNullOrEmpty(name)) {
      throw new Error('missing "name"');
    }

    const role = await prisma.role.findUnique({
      where: {
        name,
      },
    });
    if (role) {
      throw new Error('role with the same name already exists');
    } else {
      return prisma.role.create({
        data: {
          name,
        },
      });
    }
  };

  export const deleteRole = async (_: any, args: { id: string }) => {
    const prisma = PrismaClient.instance;
    const { id } = args;

    const role = await prisma.role.findUnique({
      where: { id },
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
        return prisma.role.delete({
          where: {
            id: role.id,
          },
        });
      }
    } else {
      throw new Error('specified role does not exist');
    }
  };

  export const editRole = async (_: any, args: { data: RoleEditInput }) => {
    const prisma = PrismaClient.instance;
    const { id } = args.data;

    const role = await prisma.role.findUnique({
      where: { id },
    });
    if (role) {
      return prisma.role.update({
        data: {
          ...role,
          ...Utils.removeProperties(args.data),
        },
        where: { id },
      });
    } else {
      throw new Error('specified role does not exist');
    }
  };

  export const getRoleById = async (_: any, args: { id: string }) => {
    const prisma = PrismaClient.instance;
    const { id } = args;
    const role = await prisma.role.findUnique({ where: { id } });
    return role ?? null;
  };

  export const getRoleByName = async (_: any, args: { name: string }) => {
    const prisma = PrismaClient.instance;
    const { name } = args;
    const role = prisma.role.findUnique({ where: { name } });
    return role ?? null;
  };

  export const getRoles = async () => {
    const prisma = PrismaClient.instance;
    return prisma.role.findMany();
  };

  export const getUserRole = (user: User) => {
    const prisma = PrismaClient.instance;
    return prisma.role.findUnique({
      where: {
        id: user.roleId,
      },
    });
  };
}
