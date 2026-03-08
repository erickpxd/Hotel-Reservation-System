/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getHotels } from "../../hotels/services/hotelApi";

export function HausHirtSpotlight() {
  const router = useRouter(); 
  const [hotelId, setHotelId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHotel() {
      try {
        const hotels = await getHotels(); 
        const haus = hotels.find((h: any) => h.name === "Haus Hirt");
        if (haus) setHotelId(haus.id);
      } catch (error) {
        console.error("Error while fetching hotel:", error);
      }
    }
    fetchHotel();
  }, []);

  const handleBookNow = () => {
    if (hotelId) {
      router.push(`/hotels/${hotelId}`);
    }
  };

  return (
    <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        <div className="hidden lg:block relative w-full h-[500px]">
          <div className="absolute top-0 left-0 w-2/3 h-4/5 rounded-2xl overflow-hidden shadow-2xl z-10">
            <Image
              src="/images/hotels/paradisiacal/haus-7.png"
              alt="Haus Hirt Exterior"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-2/3 h-4/5 rounded-2xl overflow-hidden shadow-2xl z-20">
            <Image
              src="/images/hotels/paradisiacal/haus-2.jpg"
              alt="Haus Hirt Interior"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-6 text-center lg:text-left">
          
          <h2 className="text-[2rem] md:text-[2rem] font-medium text-[#003B95] leading-tight">
            Haus Hirt
          </h2>

          <div className="lg:hidden relative w-full h-[350px] sm:h-[450px] my-4">
            <div className="absolute top-0 left-0 w-[70%] h-[85%] rounded-2xl overflow-hidden shadow-2xl z-10">
              <Image
                src="/images/hotels/paradisiacal/haus-7.png"
                alt="Haus Hirt Exterior"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[70%] h-[85%] rounded-2xl overflow-hidden shadow-2xl z-20 border-2 border-white">
              <Image
                src="/images/hotels/paradisiacal/haus-2.jpg"
                alt="Haus Hirt Interior"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="text-gray-600 leading-relaxed space-y-4 text-lg text-justify hidden lg:block">
            <p>
              Haus Hirt is a boutique retreat in the Austrian Alps, located in Bad Gastein. 
              It blends intimate charm with understated luxury.
            </p>
            <p>
              The hotel is surrounded by stunning mountain views and offers cozy 
              rooms and suites designed for comfort.
            </p>
            <p>
              Guests can enjoy a full spa with Aveda therapies, making it an ideal
               place to relax and recharge in the Alps.
            </p>
          </div>

          <button
            onClick={handleBookNow} 
            disabled={!hotelId} 
            className="w-full px-10 py-4 bg-[#003B95] text-white font-bold rounded-lg 
            hover:bg-white border hover:text-[#003B95] transition-all duration-300 shadow-lg active:scale-95 disabled:bg-gray-400"
          >
            {hotelId ? "Book Now" : "Loading..."}
          </button>
        </div>

      </div>
    </section>
  );
}