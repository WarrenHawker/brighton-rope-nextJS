import { Role } from '@prisma/client';
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: number | string;
    role: Role;
    claimed: boolean;
  }

  interface Session {
    user: {
      id: number | string;
      role: Role;
      claimed: boolean;
      name: string | undefined;
      email: string;
    } & DefaultSession;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: number | string;
    role: Role;
    claimed: boolean;
  }
}
