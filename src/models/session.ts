import { BaseClass } from './base';

export interface SessionCreateInput {
  userId: string;
}

export type Session = BaseClass & SessionCreateInput;
