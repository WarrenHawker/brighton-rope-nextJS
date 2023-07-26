import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prismaClient = new PrismaClient();

//run command "npx prisma db seed" to generate default super admin user (in case of emergencies)

const main = async () => {
  const password = await bcrypt.hash('admin123', 12);
  const user = await prismaClient.users.upsert({
    where: { email: 'hawker.warren@gmail.com' },
    update: {},
    create: {
      email: 'hawker.warren@gmail.com',
      name: 'Default SuperAdmin',
      hashedPassword: password,
      role: 'SUPERADMIN',
    },
  });
  console.log({ user });
};
main()
  .then(() => prismaClient.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
