import { PrismaClient } from '@prisma/client';
import { cache } from 'react';

const getPrismaClient = cache(() => new PrismaClient());

export default getPrismaClient;
