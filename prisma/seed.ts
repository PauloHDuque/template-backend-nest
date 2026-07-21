import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '../src/generated/prisma/client';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL must be defined to seed the database.');
}

const adapter = new PrismaMariaDb(databaseUrl);
const prisma = new PrismaClient({ adapter });

async function seed(): Promise<void> {
  const password = await bcrypt.hash('admin1234', 12);

  await prisma.user.upsert({
    where: { email: 'master@admin.com' },
    update: { password },
    create: {
      email: 'master@admin.com',
      password,
    },
  });

  console.log('Initial administrator created successfully.');
}

async function main(): Promise<void> {
  try {
    await seed();
  } catch (error: unknown) {
    console.error('Database seed failed.', error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void main();
