import { BaseClass } from './base';

export interface User extends BaseClass {
  firstName: string;
  lastName: string;
  roleId: number;
}
