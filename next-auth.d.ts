import { Role } from '@prisma/client';
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    role: Role;
    claimed: boolean;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      claimed: boolean;
      name: string | undefined;
    } & DefaultSession;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: Role;
    claimed: boolean;
  }
}
