/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import { ChevronLeft, ChevronRight, MapPin, Bed, Loader2 } from "lucide-react";
import { getHotels } from "../../hotels/services/hotelApi";
import { HotelImageHelper } from "../../../shared/utils/HotelImageHelper"; 

export function BestHotels() {
  const router = useRouter();
  const [hotels, setHotels] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHotels() {
      try {
        const data = await getHotels();
        setHotels(data);
      } catch (error) {
        console.error("Error loading hotels:", error);
      } finally {
        setLoading(false);
      }
    }
    loadHotels();
  }, []);

  const getVisibleHotels = () => {
    const total = hotels.length;
    if (total === 0) return [];
    
    const offsets = [-2, -1, 0, 1, 2];
    return offsets.map((offset) => {
      const index = (activeIndex + offset + total) % total;
      const safeIndex = index < 0 ? total + index : index;
      return { ...hotels[safeIndex], offset };
    });
  };

  const handleNext = () => {
    if (hotels.length > 0) {
      setActiveIndex((prev) => (prev + 1) % hotels.length);
    }
  };

  const handlePrev = () => {
    if (hotels.length > 0) {
      setActiveIndex((prev) => (prev === 0 ? hotels.length - 1 : prev - 1));
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] gap-4">
        <Loader2 className="animate-spin text-[#003B95]" size={40} />
        <p className="text-gray-500 font-medium">Finding the best accommodations...</p>
      </div>
    );
  }

  if (hotels.length === 0) return null;

  const visibleHotels = getVisibleHotels();

  return (
    <section className="py-16 relative overflow-hidden">
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-3 
        rounded-full border border-gray-200 hover:bg-[#D9D9D9] hover:text-white hover:border-[#1D9D9D9] 
        text-gray-400 transition-all bg-white shadow-lg cursor-pointer"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 p-2 sm:p-3 
        rounded-full border border-gray-200 hover:bg-[#D9D9D9] hover:text-white hover:border-[#D9D9D9] 
        text-gray-400 transition-all bg-white shadow-lg cursor-pointer"
      >
        <ChevronRight size={24} />
      </button>

      <div className="max-w-[1400px] mx-auto px-4 h-[500px] flex flex-col ">
        <div className="mb-8 px-4 sm:px-8 text-center">
          <h2 className="text-4xl font-normal text-[#003B95]">Best Hotels</h2>
        </div>

        <div className="relative flex-1 w-full">
          {visibleHotels.map((hotel, idx) => {
            const isCenter = hotel.offset === 0;
            const isNear = Math.abs(hotel.offset) === 1;
            const isFar = Math.abs(hotel.offset) === 2;

            let leftPosition = "50%";
            if (hotel.offset === -2) leftPosition = "9%";
            if (hotel.offset === -1) leftPosition = "29%";
            if (hotel.offset === 1) leftPosition = "71%";
            if (hotel.offset === 2) leftPosition = "91%";

            const minPrice = hotel.rooms && hotel.rooms.length > 0
              ? Math.min(...hotel.rooms.map((r: any) => r.price))
              : 0;
            const totalRooms = hotel.rooms ? hotel.rooms.length : 0;

            return (
              <div
                key={`${hotel.id}-${hotel.offset}-${idx}`}
                onClick={() => router.push(`/hotels/${hotel.id}`)}
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
                    src={hotel.image || HotelImageHelper.getImage(hotel.id)}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="p-4 flex flex-col justify-between h-[45%]">
                  <div>
                    <h3 className={`font-bold text-[#1A2B4F] truncate ${isCenter ? "text-lg" : "text-base"}`}>
                      {hotel.name}
                    </h3>
                    <div className="flex flex-col gap-1 text-gray-500 text-xs mt-2">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin size={12} /> {hotel.address}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed size={12} /> {totalRooms} rooms
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-1">
                    <div className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">
                      Starting at
                    </div>
                    <div className={`font-bold text-[#003B95] ${isCenter ? "text-xl" : "text-lg"}`}>
                      R$ {minPrice}
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