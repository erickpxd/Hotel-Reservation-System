"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, Bed } from "lucide-react";

const BEST_HOTELS = [
  {
    id: 1,
    name: "Mountain Retreat",
    location: "Aspen, USA",
    price: 120,
    rooms: 4,
    image: "/images/hotels/best/besthotel-1.jpg",
  },
  {
    id: 2,
    name: "Bali Resort",
    location: "Bali, Indonesia",
    price: 220,
    rooms: 12,
    image: "/images/hotels/best/besthotel-2.jpg",
  },
  {
    id: 3,
    name: "Palm Springs Hotel",
    location: "California, USA",
    price: 300,
    rooms: 10,
    image: "/images/hotels/best/besthotel-3.jpg",
  },
  {
    id: 4,
    name: "Maldivas Sunset",
    location: "Atol de Malé, Maldivas",
    price: 310,
    rooms: 12,
    image: "/images/hotels/best/besthotel-4.jpg",
  },
  {
    id: 5,
    name: "Cartagena Colonial",
    location: "Bolívar, Colômbia",
    price: 110,
    rooms: 4,
    image: "/images/hotels/best/besthotel-5.jpg",
  },
  {
    id: 6,
    name: "Villa Solare Resort",
    location: "Andaluzia, Espanha",
    price: 450,
    rooms: 8,
    image: "/images/hotels/best/besthotel-6.jpg",
  },
  {
    id: 7,
    name: "Gavoa Beach Resort Flat",
    location: "Pernambuco, Brasil",
    price: 280,
    rooms: 6,
    image: "/images/hotels/best/besthotel-7.jpg",
  },
  {
    id: 8,
    name: "Casas Elilula Eco Retreat",
    location: "Ceará, Brasil",
    price: 350,
    rooms: 5,
    image: "/images/hotels/best/besthotel-8.jpg",
  },
  {
    id: 9,
    name: "Serena Boutique Hotel Búzios",
    location: "Rio de Janeiro, Brasil",
    price: 500,
    rooms: 15,
    image: "/images/hotels/best/besthotel-9.jpg",
  },
  {
    id: 10,
    name: "Aesthesis Coastline Resort",
    location: "Santorini, Grécia",
    price: 180,
    rooms: 20,
    image: "/images/hotels/best/besthotel-10.jpg",
  },
];

export function BestHotels() {
  const [activeIndex, setActiveIndex] = useState(0);

  const getVisibleHotels = () => {
    const total = BEST_HOTELS.length;
    const offsets = [-2, -1, 0, 1, 2];
    return offsets.map((offset) => {
      const index = (activeIndex + offset + total) % total;
      return { ...BEST_HOTELS[index], offset };
    });
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % BEST_HOTELS.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + BEST_HOTELS.length) % BEST_HOTELS.length,
    );
  };

  const visibleHotels = getVisibleHotels();

  return (
    <section className="py-16 relative overflow-hidden">
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-3 
        rounded-full border border-gray-200 hover:bg-[#D9D9D9] hover:text-white hover:border-[#1D9D9D9] 
        text-gray-400 transition-all bg-white shadow-lg"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-3 
        rounded-full border border-gray-200 hover:bg-[#D9D9D9] hover:text-white hover:border-[#D9D9D9] 
        text-gray-400 transition-all bg-white shadow-lg"
      >
        <ChevronRight size={24} />
      </button>

      <div className="max-w-[1400px] mx-auto px-4 h-[500px] flex flex-col ">
        <div className="mb-8 px-4 sm:px-8 text-center">
          <h2 className="text-4xl font-normal text-[#003B95]">Best Hotels</h2>
        </div>

        <div className="relative flex-1 w-full">
          {visibleHotels.map((hotel) => {
            const isCenter = hotel.offset === 0;
            const isNear = Math.abs(hotel.offset) === 1;
            const isFar = Math.abs(hotel.offset) === 2;

            let leftPosition = "50%";

            if (hotel.offset === -2) leftPosition = "9%";
            if (hotel.offset === -1) leftPosition = "29%";
            if (hotel.offset === 1) leftPosition = "71%";
            if (hotel.offset === 2) leftPosition = "91%";

            return (
              <div
                key={`${hotel.id}-${hotel.offset}`}
                className={`
                  absolute top-1/2 -translate-y-1/2 -translate-x-1/2
                  transition-all duration-500 ease-in-out rounded-2xl bg-white shadow-md overflow-hidden cursor-pointer
                  
                  ${isCenter ? "z-30 shadow-2xl block" : ""} 
                  ${isNear ? "z-20 hidden md:block" : ""}
                  ${isFar ? "z-10 hidden lg:block" : ""}
                `}
                style={{
                  left: leftPosition,
                  width: isCenter ? "280px" : "260px",
                  height: isCenter ? "380px" : "320px",
                }}
              >
                <div className="relative w-full h-[55%]">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between h-[45%]">
                  <div>
                    <h3
                      className={`font-bold text-[#1A2B4F] truncate ${
                        isCenter ? "text-lg" : "text-base"
                      }`}
                    >
                      {hotel.name}
                    </h3>
                    <div className="flex flex-col gap-1 text-gray-500 text-xs mt-2">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin size={12} /> {hotel.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed size={12} /> {hotel.rooms} rooms
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-1">
                    <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                      Per Night
                    </div>
                    <div
                      className={`font-bold text-[#003B95] ${
                        isCenter ? "text-xl" : "text-lg"
                      }`}
                    >
                      R$ {hotel.price}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
