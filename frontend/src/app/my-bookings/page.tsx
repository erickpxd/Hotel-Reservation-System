/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { getUserBookings, cancelBooking } from "@/src/features/bookings/services/bookingApi";
import { BookingCard } from "@/src/features/bookings/components/BookingCard";

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
    <div className="min-h-screen flex items-center justify-center font-bold text-[#003B95]">Loading history...</div>
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-20 pt-12">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-[#1A2B4F] Montserrat">My Reservations</h1>
          <p className="text-gray-500 mt-2">Track your bookings and cancellation status</p>
        </header>

        {bookings.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-20 text-center">
            <p className="text-gray-400 Montserrat font-medium text-lg">You don&apos;t have any reservations yet.</p>
            <button 
              onClick={() => router.push("/")}
              className="mt-6 text-[#003B95] font-bold hover:underline"
            >
              Start planning your trip
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
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