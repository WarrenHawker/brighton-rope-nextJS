import { Prisma, Role } from '@prisma/client';
import { UserIdEmail } from './globals';

export interface UserDB {
  email: string;
  role: Role;
  name: string | null;
  id: number;
  claimed: boolean;
  preferences: Prisma.JsonObject;
  createdOn: Date;
  claimedOn?: Date;
  updatedOn?: Date;
  updatedBy?: Prisma.JsonObject;
}

export interface UserClient {
  email: string;
  role: Role;
  name?: string;
  id: number;
  claimed: boolean;
  preferences: {};
  createdOn: Date;
  claimedOn?: Date;
  updatedOn?: Date;
  updatedBy?: UserIdEmail;
}

export interface UserUpdateData {
  email?: string | null;
  name?: string | null;
  role?: Role | null;
  password?: string | null;
}
