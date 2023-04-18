import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password1 = await hash('test1', 12);
  const password2 = await hash('test2', 12);

  const user1 = await prisma.user.upsert({
    where: { email: 'test1@test.com' },
    update: {},
    create: {
      email: 'test1@test.com',
      name: 'Test User1',
      password: password1,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'test2@test.com' },
    update: {},
    create: {
      email: 'test2@test.com',
      name: 'Test User2',
      password: password2,
    },
  });

  const car1 = await prisma.car.create({
    data: {
      make: 'Tesla',
      model: 'Model S',
      year: 2020,
      color: 'Red',
      rentPrice: 100,
      seatCapacity: 5,
      fuelCapacity: 0,
      bodyType: 'Electric',
      location: 'San Francisco, CA',
      description: 'A sleek and modern electric car with autopilot.',
      ownerId: user1.id,
      images: {
        create: [
          { url: 'https://example.com/tesla-model-s-1.jpg' },
          { url: 'https://example.com/tesla-model-s-2.jpg' },
        ],
      },
    },
  });

  const car2 = await prisma.car.create({
    data: {
      make: 'Ford',
      model: 'Mustang GT',
      year: 2019,
      color: 'Blue',
      rentPrice: 90,
      seatCapacity: 4,
      fuelCapacity: 15,
      bodyType: 'Coupe',
      location: 'Los Angeles, CA',
      description: 'An iconic American muscle car, perfect for cruising.',
      ownerId: user2.id,
      images: {
        create: [
          { url: 'https://example.com/ford-mustang-gt-1.jpg' },
          { url: 'https://example.com/ford-mustang-gt-2.jpg' },
        ],
      },
    },
  });

  const rental1 = await prisma.rental.create({
    data: {
      startDate: new Date(2023, 4, 10),
      endDate: new Date(2023, 4, 12),
      carId: car2.id,
      userId: user1.id,
    },
  });

  const rental2 = await prisma.rental.create({
    data: {
      startDate: new Date(2023, 4, 10),
      endDate: new Date(2023, 4, 12),
      carId: car1.id,
      userId: user2.id,
    },
  });

  console.log('Seeding complete!');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
