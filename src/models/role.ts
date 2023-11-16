export enum RoleName {
  admin = 'admin',
  guest = 'guest',
  user = 'user',
}

export interface Role {
  id: number;
  guid: string;
  name: string;
}
