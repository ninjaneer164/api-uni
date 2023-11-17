import { BaseClass } from './base';

export enum RoleName {
  admin = 'admin',
  guest = 'guest',
  user = 'user',
}

export interface Role extends BaseClass {
  name: string;
}
