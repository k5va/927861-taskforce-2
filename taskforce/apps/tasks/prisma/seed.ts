import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.category.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Cleaning',
      tasks: {
        create: [
          {
            title: 'Need to clean my appartment',
            description: 'Three rooms + kitchen',
            customer: '11',
            status: 'new',
            city: 'Москва',
          },
          {
            title: 'Need to clean my studio',
            description: 'One rooms only',
            customer: '22',
            status: 'new',
            city: 'Владивосток',
            tags: ['cleaning', 'studio'],
            comments: {
              create: [
                {
                  text: 'pleast provide address!',
                  author: '14',
                },
              ],
            },
          },
        ],
      },
    },
  });
  await prisma.category.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'courier',
      tasks: {
        create: [
          {
            title: 'Need to deliver a package',
            description: 'Urgent!',
            customer: '33',
            status: 'new',
            address: 'Somewhere in Tashkent',
            city: 'Владивосток',
            responses: {
              create: [
                {
                  contractor: '44',
                },
              ],
            },
            comments: {
              create: [
                {
                  text: 'please provide exact address',
                  author: '44',
                },
              ],
            },
          },
        ],
      },
    },
  });
  console.info('🤘️ Database was filled');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });
