
import { PrismaClient, Skills } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const generateActionPoints = () => {
  const actionPoints = [];
  for(let i = 0; i < Math.floor(Math.random() * 4 + 1); i++) {
    actionPoints.push({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      resolved: Math.random() > 0.5,
    });
  }
  return actionPoints;
}

const generateReflections = () => {
  const reflections = [];
  for(let i = 0; i < Math.floor(Math.random() * 10 + 5); i++) {
    reflections.push({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      skills: faker.helpers.arrayElements(Object.values(Skills), Math.floor(Math.random() * 3 + 1)),
      actionPoints: {
        create: generateActionPoints(),
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

    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        reflections: {
          create: generateReflections(), // Pass the user's id as the authorId
        },
      },
    });
    console.log(`Created user with id: ${user.id}`);
  
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
