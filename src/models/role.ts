import { BaseClass } from './base';

export interface RoleCreateInput {
  name: string;
}

export type RoleEditInput = BaseClass & RoleCreateInput;

export type Role = BaseClass & RoleCreateInput;
