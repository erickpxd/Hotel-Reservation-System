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
    {
      name: 'Desert Palm Inn',
      address: '555 Cactus Blvd, Phoenix, AZ',
      description:
        'A warm stay in the middle of the desert with premium pools.',
    },
    {
      name: 'Golden Gate View',
      address: '222 Bay St, San Francisco, CA',
      description: 'Breathtaking views of the bridge and the bay.',
    },
    {
      name: 'Savannah Charm',
      address: '333 Historic District, Savannah, GA',
      description: 'Classic southern hospitality in a historic building.',
    },
    {
      name: 'Pacific Heights',
      address: '888 Coastline Hwy, Seattle, WA',
      description: 'Modern design meets the tranquility of the northwest.',
    },
    {
      name: 'French Quarter Suites',
      address: '900 Bourbon St, New Orleans, LA',
      description: 'Immerse yourself in the music and culture of the city.',
    },
    {
      name: 'The Austin Loft',
      address: '120 Music Row, Austin, TX',
      description:
        'Trendy accommodations in the live music capital of the world.',
    },
    {
      name: 'Nashville Rhythm Hotel',
      address: '50 Broadway, Nashville, TN',
      description:
        'Stay in the heart of Music City with live performances nightly.',
    },
    {
      name: 'Boston Harbor Inn',
      address: '200 Atlantic Ave, Boston, MA',
      description:
        'Elegant waterfront rooms with a view of the historic harbor.',
    },
    {
      name: 'Denver Peak Lodge',
      address: '1500 Skyline Dr, Denver, CO',
      description:
        'The perfect base for your Colorado hiking and skiing adventures.',
    },
    {
      name: 'Portland Pine Hotel',
      address: '77 Forest St, Portland, OR',
      description:
        'Eco-friendly stays surrounded by the natural beauty of Oregon.',
    },
    {
      name: 'Vegas Lights Resort',
      address: '3600 Las Vegas Blvd, Las Vegas, NV',
      description: 'Luxury and entertainment on the world-famous Strip.',
    },
    {
      name: 'Charleston Manor',
      address: '12 King St, Charleston, SC',
      description:
        'Experience the elegance of the Old South in a restored mansion.',
    },
    {
      name: 'San Diego Surf House',
      address: '101 Ocean Front, San Diego, CA',
      description: 'Casual beach vibes just steps away from the Pacific waves.',
    },
    {
      name: 'Philly Heritage Suites',
      address: '400 Independence Mall, Philadelphia, PA',
      description:
        'Modern amenities in the most historic square mile in America.',
    },
    {
      name: 'Atlanta Skyview',
      address: '250 Peachtree St, Atlanta, GA',
      description:
        'A soaring glass tower with panoramic views of the city skyline.',
    },
    {
      name: 'Santa Fe Adobe Inn',
      address: '80 Old Santa Fe Trail, Santa Fe, NM',
      description:
        'Traditional Southwestern architecture with a modern luxury twist.',
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
