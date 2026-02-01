import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { RoomTypeEnum } from 'src/modules/room/enum/room-type.enum';
import { randomUUID } from 'crypto';

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
    RoomTypeEnum.SINGLE_ONE_BED,
    RoomTypeEnum.SINGLE_TWO_BEDS,
    RoomTypeEnum.SINGLE_THREE_BEDS,
    RoomTypeEnum.SUITE_ONE_BIG_BED,
    RoomTypeEnum.SUITE_BIG_AND_SMALL_BED,
  ];

  for (const hotelData of hotelsData) {
    const rooms = Array.from({ length: 13 }).map((_, index) => ({
      id: randomUUID(),
      number: `${100 + index + 1}`,
      price: 100 + index * 20,
      type: roomTypes[index % roomTypes.length],
      capacity: (index % 3) + 1,
      available: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const hotel = await prisma.hotel.create({
      data: {
        ...hotelData,
        rooms: rooms,
      },
    });
    console.log(`Created hotel with rooms, hotel name: ${hotel.name}`);
  }

  // Festive Calendar Seeding
  const hotel = await prisma.hotel.findFirst();

  if (hotel) {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    nextMonth.setDate(15);
    nextMonth.setHours(0, 0, 0, 0);

    const festiveDate = await prisma.festiveCalendar.create({
      data: {
        date: nextMonth,
        hotelId: hotel.id,
        discountPercentage: 20,
        description: 'Super Festive Holiday',
      },
    });

    console.log(
      `Created festive date: ${festiveDate.date} for hotel ${hotel.name}`,
    );
  } else {
    console.log('No hotel found for festive calendar seeding.');
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
