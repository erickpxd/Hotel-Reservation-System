
import 'dotenv/config';
import { PrismaClient, RoomType } from '../generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding ...');

  const hotelsData = [
    {
      name: 'Grand Plaza Hotel',
      address: '123 Main St, New York, NY',
      description: 'A luxury hotel in the heart of the city.',
    },
    {
      name: 'Seaside Resort',
      address: '456 Ocean Dr, Miami, FL',
      description: 'Relax by the beach in our stunning resort.',
    },
    {
      name: 'Mountain Retreat',
      address: '789 Alpine Way, Aspen, CO',
      description: 'Experience the mountains like never before.',
    },
    {
      name: 'Urban Oasis',
      address: '101 City Center, Chicago, IL',
      description: 'Modern comfort for the urban traveler.',
    },
  ];

  const roomTypes = [
    RoomType.SINGLE_ONE_BED,
    RoomType.SINGLE_TWO_BEDS,
    RoomType.SINGLE_THREE_BEDS,
    RoomType.SUITE_ONE_BIG_BED,
    RoomType.SUITE_BIG_AND_SMALL_BED,
  ];

  for (const hotelData of hotelsData) {
    const hotel = await prisma.hotel.create({
      data: hotelData,
    });
    console.log(`Created hotel with id: ${hotel.id}`);

    const roomsData = Array.from({ length: 13 }).map((_, index) => ({
      number: `${100 + index + 1}`,
      price: 100 + (index * 20),
      type: roomTypes[index % roomTypes.length],
      capacity: (index % 3) + 1,
      available: true,
      hotelId: hotel.id,
    }));

    await prisma.room.createMany({
      data: roomsData,
    });
    console.log(`Created 13 rooms for hotel ${hotel.name}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
