/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getHotels } from "../../hotels/services/hotelApi";

export function JumaSpotlight() {
  const router = useRouter();
  const [hotelId, setHotelId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHotel() {
      try {
        const hotels = await getHotels();
        const juma = hotels.find((h: any) => h.name === "Juma Amazon Lodge");
        if (juma) setHotelId(juma.id);
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
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-3xl md:text-4xl font-normal text-[#003B95] text-center mb-12 lg:mb-20">
        Paradisiacal and Secluded Hotels
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="flex flex-col space-y-6 text-center lg:text-left">
          <h2 className="text-[2rem] md:text-[2rem] font-medium text-[#003B95] leading-tight">
            Juma Amazon Lodge
          </h2>

          <div className="lg:hidden relative w-full h-[350px] sm:h-[450px] my-4">
            <div className="absolute top-0 right-0 w-[70%] h-[85%] rounded-2xl overflow-hidden shadow-2xl z-10">
              <Image
                src="/images/hotels/paradisiacal/juma-1.jpg"
                alt="Juma Lodge Exterior"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[70%] h-[85%] rounded-2xl overflow-hidden shadow-2xl z-20 border-2 border-white">
              <Image
                src="/images/hotels/paradisiacal/juma-2.jpg"
                alt="Juma Lodge Interior"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="text-gray-600 leading-relaxed space-y-2 text-lg text-justify hidden lg:block">
            <p>
              Juma Amazon Lodge is a jewel of Brazilian eco-hospitality, located
              deep in the Amazon rainforest along the banks of the Juma River.
            </p>
            <p>
              With stilted bungalows harmoniously integrated into the natural
              surroundings,the lodge offers a unique jungle immersion experience
              that combines comfort with sophistication.
            </p>
            <p>
              Perfect for travelers seeking tranquility and direct contact with
              Amazonian biodiversity, Juma blends sustainable architecture,
              regional cuisine, and activities such as canoe trips, guided
              forest walks, and wildlife observation.
            </p>
          </div>

          <button
            onClick={handleBookNow}
            className="w-full px-10 py-4 bg-[#003B95] text-white font-bold rounded-lg 
            hover:bg-white border hover:text-[#003B95]  transition-all duration-300 shadow-lg active:scale-95"
          >
            {hotelId ? "Book Now" : "Loading..."}
          </button>
        </div>

        <div className="hidden lg:block relative w-full h-[500px]">
          <div className="absolute top-0 right-0 w-2/3 h-4/5 rounded-2xl overflow-hidden shadow-2xl z-10">
            <Image
              src="/images/hotels/paradisiacal/juma-1.jpg"
              alt="Juma Lodge Exterior"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-2/3 h-4/5 rounded-2xl overflow-hidden shadow-2xl z-20 ">
            <Image
              src="/images/hotels/paradisiacal/juma-2.jpg"
              alt="Juma Lodge Interior"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
