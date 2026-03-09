"use client";

import Image from "next/image";
import { SearchResult } from "../services/searchApi";
import { HotelImageHelper } from "@/src/shared/utils/HotelImageHelper";
import { SearchOptionCard } from "./SearchOptionCard";

interface SearchHotelCardProps {
  hotel: SearchResult;
  onSelectOption: (roomIds: string[]) => void;
}

export function SearchHotelCard({
  hotel,
  onSelectOption,
}: SearchHotelCardProps) {

  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[450px]">
      <div className="md:w-1/3 flex flex-col border-b md:border-b-0 md:border-r border-gray-100">
        <div className="relative w-full h-48 md:h-56">
          <Image
            src={HotelImageHelper.getImage(hotel.hotelId)}
            alt={hotel.hotelName || "Hotel Image"}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="p-6 flex-1 bg-gray-50/30">
          <h3 className="text-2xl font-bold text-[#1A2B4F] mb-2 Montserrat">
            {hotel.hotelName}
          </h3>
          <p className="text-sm text-[#003B95] font-medium mb-4 italic Montserrat">
            {hotel.location}
          </p>
          <p className="text-sm text-gray-600 leading-relaxed text-justify">
            {hotel.hotelDescription || "An exclusive retreat waiting for you."}
          </p>
        </div>
      </div>

      <div className="p-8 md:w-2/3 flex flex-col">
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
          Accommodation Options
        </h4>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-[400px] custom-scrollbar">
          {hotel.options.map((option, idx) => (
            <SearchOptionCard
              key={idx}
              option={option}
              onSelect={() => onSelectOption(option.rooms.map((r) => r.id))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
