import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const prizes = await prisma.prize.findMany();
  console.log(prizes);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });