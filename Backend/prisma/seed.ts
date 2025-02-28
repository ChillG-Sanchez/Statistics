import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Romance', 'Non-fiction'];
  const authors = ['Author 1', 'Author 2', 'Author 3', 'Author 4', 'Author 5'];

  const books = Array.from({ length: 30 }).map(() => ({
    title: faker.lorem.words(3),
    genre: faker.helpers.arrayElement(genres),
    published: faker.date.past({ years: 10 }),
    price: faker.number.int({ min: 990, max: 12990 }),
    sold: faker.number.int({ min: 0, max: 1000 }),
    author: faker.helpers.arrayElement(authors),
  }));

  await prisma.book.createMany({
    data: books,
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });