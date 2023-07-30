import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prismaClient = new PrismaClient();

//run command "npx prisma db seed" to generate default super admin user (in case of emergencies)

const main = async () => {
  const password = await bcrypt.hash('admin123', 12);
  //default admin
  const admin = await prismaClient.users.upsert({
    where: { email: 'brightonrope@gmail.com' },
    update: {},
    create: {
      email: 'brightonrope@gmail.com',
      hashedPassword: password,
      role: 'ADMIN',
      createdOn: new Date(),
    },
  });

  //default super admin
  const superAdmin = await prismaClient.users.upsert({
    where: { email: 'hawker.warren@gmail.com' },
    update: {},
    create: {
      email: 'hawker.warren@gmail.com',
      hashedPassword: password,
      role: 'SUPERADMIN',
      createdOn: new Date(),
    },
  });
};
main()
  .then(() => prismaClient.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
