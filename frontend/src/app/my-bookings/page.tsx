/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { getUserBookings, cancelBooking } from "@/src/features/bookings/services/bookingApi";
import { BookingCard } from "@/src/features/bookings/components/BookingCard";
import { Hotel } from "lucide-react";

export default function MyBookingsPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    const token = getCookie("auth_token") as string;
    if (!token) return;
    try {
      const data = await getUserBookings(token);
      setBookings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
      return;
    }
    if (isAuthenticated) loadBookings();
  }, [isAuthenticated, authLoading]);

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center font-bold text-[#003B95]">
      Loading history...
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-20 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-[#003B95] Montserrat">
            My Reservations
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Track your bookings and cancellation status
          </p>
        </header>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white 
          border-2 border-gray-200 rounded-3xl p-16 text-center shadow-sm">
            <div className="bg-blue-50 p-4 rounded-full mb-6">
              <Hotel size={48} className="text-[#003B95]" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2 Montserrat">
              No reservations found
            </h2>
            <p className="text-gray-500 max-w-sm mb-8">
              You don&apos;t have any reservations yet. Start exploring our hotels to plan your next trip!
            </p>
            <button 
              onClick={() => router.push("/")}
              className="bg-[#003B95] text-white px-8 py-3 rounded-xl font-bold 
              hover:bg-[#0653C9] transition-all shadow-md hover:shadow-lg"
            >
              Start planning your trip
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            {bookings.map((booking) => (
              <BookingCard 
                key={booking.id} 
                booking={booking} 
                token={getCookie("auth_token") as string}
                onCancelSuccess={loadBookings}
                cancelAction={cancelBooking}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}