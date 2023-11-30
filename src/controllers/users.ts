import { PrismaClient } from '../models/prisma.js';
import { UserCreateInput, UserEditInput } from '../models/user.js';
import { Utils } from '../utils/utils.js';

export namespace Users {
  export const createUser = async (_: any, args: { data: UserCreateInput }) => {
    const prisma = PrismaClient.instance;
    const errors = Utils.validateStringValues(args.data, [
      'firstName',
      'lastName',
      'roleId',
    ]);
    if (errors.length > 0) {
      throw new Error(`missing ${errors.join(', ')}`);
    }

    const { firstName, lastName, roleId } = args.data;
    const r = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });
    if (!r) {
      throw new Error('specified role does not exist');
    } else {
      return prisma.user.create({
        data: {
          firstName,
          lastName,
          roleId,
        },
      });
    }
  };

  export const editUser = async (_: any, args: { data: UserEditInput }) => {
    const prisma = PrismaClient.instance;
    const { id } = args.data;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      return prisma.user.update({
        data: {
          ...user,
          ...Utils.removeProperties(args.data),
        },
        where: { id },
      });
    } else {
      throw new Error('specified user does not exist');
    }
  };

  export const getUserById = (_: any, args: { id: string }) => {
    const prisma = PrismaClient.instance;
    return prisma.user.findUnique({ where: { id: args.id } });
  };

  export const getUsers = async () => {
    const prisma = PrismaClient.instance;
    return await prisma.user.findMany();
  };
}
