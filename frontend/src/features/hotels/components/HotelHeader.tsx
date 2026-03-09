"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { HotelDetails } from "../services/hotelApi";
import { HotelImageHelper } from "../../../shared/utils/HotelImageHelper";

interface HotelHeaderProps {
  hotel: HotelDetails;
}

export function HotelHeader({ hotel }: HotelHeaderProps) {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 w-full">
        <button
          onClick={() => router.back()}
          className="flex items-center w-fit gap-1 text-gray-400 hover:text-gray-500 
          font-medium px-4 py-2 rounded-full transition-all "
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg group">
          <Image
            src={HotelImageHelper.getImage(hotel.id, hotel.name)}
            alt={hotel.name}
            fill
            quality={100}
            priority
            className="object-cover"
          />
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-[#1A2B4F] mb-2">{hotel.name}</h1>
        <div className="flex items-center text-gray-500 mb-6">
          <MapPin size={18} className="mr-1 text-[#003B95]" />
          <span>{hotel.address}</span>
        </div>
        <p className="text-gray-600 leading-relaxed text-justify">
          {hotel.description ||
            "This hotel offers a serene and elegant retreat, blending classic architecture with tropical charm. Guests enjoy comfort, beauty, and tranquility, making every stay a memorable experience."}
        </p>
      </div>
    </div>
  );
}
