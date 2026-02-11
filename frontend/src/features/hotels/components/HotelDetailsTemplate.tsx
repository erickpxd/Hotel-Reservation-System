/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { HotelDetails } from "../services/hotelApi";
import { HotelHeader } from "./HotelHeader";
import { RoomList } from "./RoomList";
import { BookingSummary } from "./BookingSummary";
import { Promotions } from "./Promotions";
import { Footer } from "@/src/shared/components/footer";

interface HotelDetailsTemplateProps {
  hotel: HotelDetails | null;
  loading: boolean;
  isAuthenticated: boolean;
  selectedRoomIds: string[];
  dates: {
    checkIn: string;
    checkOut: string;
    displayCheckIn?: string;
    displayCheckOut?: string;
    nights: number;
  };
  guests: {
    adults: number;
    children: number;
  };
  financials: {
    perNight: number;
    total: number;
  };
  onToggleRoom: (roomId: string) => void;
  onUpdateFilters: (name: string, value: any) => void;
  onReserve: () => void;
}

export function HotelDetailsTemplate({
  hotel,
  loading,
  isAuthenticated,
  selectedRoomIds,
  dates,
  guests,
  financials,
  onToggleRoom,
  onUpdateFilters,
  onReserve,
}: HotelDetailsTemplateProps) {
  if (loading || !hotel) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003B95]"></div>
        <p className="mt-4 text-gray-500">Loading hotel details...</p>
      </div>
    );
  }

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[calc(100vh-100px)]">
        <div className="lg:col-span-2 space-y-8">
          <HotelHeader hotel={hotel} />
          <RoomList
            rooms={hotel.rooms}
            selectedRoomIds={selectedRoomIds}
            onToggleRoom={onToggleRoom}
          />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <BookingSummary
              dates={dates}
              guests={guests}
              financials={financials}
              onReserve={onReserve}
              onUpdateFilters={onUpdateFilters}
              isAuthenticated={isAuthenticated}
              hasSelectedRooms={selectedRoomIds.length > 0}
            />
            <Promotions />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
