import { BaseClass } from './base';

export interface UserCreateInput {
  firstName: string;
  lastName: string;
  roleId: string;
}

export type UserEditInput = BaseClass & UserCreateInput;

export type User = BaseClass & UserCreateInput;
