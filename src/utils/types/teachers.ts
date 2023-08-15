import { Position, Prisma } from '@prisma/client';
import { UserIdEmail } from './globals';

export interface TeacherDB {
  id: number;
  name: string;
  pronouns: string;
  description: string;
  position: Position;
  imageUrl: string;
}

export interface TeacherDBAdmin extends TeacherDB {
  public: boolean;
  createdOn: Date;
  updatedOn: Date | null;
  updatedBy: Prisma.JsonObject;
  email: string;
}

export interface TeacherAdminClient extends TeacherDB {
  public: boolean;
  createdOn: Date;
  updatedOn: Date | null;
  updatedBy: UserIdEmail;
  email: string;
}

export interface TeacherUpdateData {
  name?: string;
  pronouns?: string;
  position?: Position;
  public?: boolean;
  description?: string;
  imageUrl?: string;
}
