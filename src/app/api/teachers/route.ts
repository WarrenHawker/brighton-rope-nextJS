import { prismaClient } from '@/lib/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

//get all teacher bios, excludes email field
export const GET = async (request: NextRequest) => {
  return NextResponse.json({});
};

// Exclude keys from user
// https://www.prisma.io/docs/concepts/components/prisma-client/excluding-fields
// function exclude<User, Key extends keyof User>(
//   user: User,
//   keys: Key[]
// ): Omit<User, Key> {
//   return Object.fromEntries(
//     Object.entries(user).filter(([key]) => !keys.includes(key))
//   );
// }

// function main() {
//   const user = await prisma.user.findUnique({ where: 1 });
//   const userWithoutPassword = exclude(user, ['password']);
// }
