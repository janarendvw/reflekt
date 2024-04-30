
import { PrismaClient, ReflectionModelType, Skills } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const generateActionPoints = (id: string) => {
  const actionPoints = [];
  for(let i = 0; i < Math.floor(Math.random() * 4 + 1); i++) {
    actionPoints.push({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: id,
      resolved: Math.random() > 0.5,
      createdAt: faker.date.recent({days: 20}),
    });
  }
  return actionPoints;
}

const generateReflections = (id: string) => {
  const reflections = [];
  for(let i = 0; i < Math.floor(Math.random() * 10 + 5); i++) {
    reflections.push({
      title: faker.lorem.sentence(),
      content: [faker.lorem.paragraph()],
      skills: faker.helpers.arrayElements(Object.values(Skills), Math.floor(Math.random() * 3 + 1)),
      reflectionType: faker.helpers.arrayElement([ReflectionModelType.STARR]),
      createdAt: faker.date.recent({days: 20}),
      actionPoints: {
        create: generateActionPoints(id),
      },

    });
  }
  return reflections;
}

async function main() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Seed is only allowed in development environment');
  }

  await prisma.actionPoint.deleteMany();
  await prisma.reflection.deleteMany();
  await prisma.user.deleteMany();

    await prisma.user.create({
      data: {
        id: '0001',
        name: 'frank',
        email: 'frank@reflekt.com',
        password: await bcrypt.hash('test', 12),
        reflections: {
          create: generateReflections('0001'), // Pass the user's id as the authorId
        },
      },
    });
    await prisma.user.create({
      data: {
        id: '0002',
        name: 'gerard',
        email: 'gerard@reflekt.com',
        password: await bcrypt.hash('test', 12),
        reflections: {
          create: generateReflections('0002'), // Pass the user's id as the authorId
        },
      },
    });
  
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
