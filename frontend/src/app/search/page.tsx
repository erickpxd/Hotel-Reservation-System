/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";

import {
  SearchResult,
  searchApi,
} from "@/src/features/search/services/searchApi";
import { HeroSection } from "@/src/features/home/components/HeroSection";
import { SearchHotelCard } from "@/src/features/search/components/SearchHotelCard";
import { SearchFilters } from "@/src/features/search/components/SearchFilters";
import { ConfirmationModal } from "@/src/features/bookings/components/ConfirmationModal";
import {
  getBookingSummary,
  createBooking,
  BookingSummaryResponse,
} from "@/src/features/bookings/services/bookingApi";
import { useAuth } from "@/src/context/AuthContext";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [hotels, setHotels] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summary, setSummary] = useState<BookingSummaryResponse | null>(null);
  const [isReserving, setIsReserving] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const params = Object.fromEntries(searchParams.entries());
        if (!params.peopleCount && params.adultsCount) {
          params.peopleCount = (
            Number(params.adultsCount) + Number(params.childrenCount || 0)
          ).toString();
        }
        const data = await searchApi.searchHotels(params);
        setHotels(data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }

    if (searchParams.get("startDate") && searchParams.get("endDate")) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const handleFilterChange = (filters: {
    minPrice?: number;
    maxPrice?: number;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (filters.minPrice !== undefined)
      params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== undefined)
      params.set("maxPrice", filters.maxPrice.toString());

    router.push(`/search?${params.toString()}`);
  };

  const handleSelectOption = async (roomIds: string[]) => {
    if (!isAuthenticated) {
      toast.error("Please log in to make a reservation");
      router.push("/login");
      return;
    }

    const token = getCookie("auth_token") as string;
    const adults = parseInt(searchParams.get("adultsCount") || "2");
    const childrenCount = parseInt(searchParams.get("childrenCount") || "0");

    const payload = {
      checkInDate: new Date(
        searchParams.get("startDate")!,
      ).toISOString() as any,
      checkOutDate: new Date(searchParams.get("endDate")!).toISOString() as any,
      roomIds,
      adultCount: adults,
      children: {
        count: childrenCount,
        ages: childrenCount > 0 ? Array(childrenCount).fill(5) : [],
      },
    };

    try {
      const data = await getBookingSummary(payload, token);
      setSummary(data);
      setIsModalOpen(true);
    } catch (error: any) {
      toast.error(error.message || "Failed to load booking summary");
    }
  };

  const handleConfirmReservation = async () => {
    if (!summary) return;
    const token = getCookie("auth_token") as string;
    setIsReserving(true);

    const payload = {
      checkInDate: summary.checkInDate,
      checkOutDate: summary.checkOutDate,
      roomIds: summary.roomsSelected.map((r) => r.id),
      adultCount: summary.adultCount,
      children: summary.children,
    };

    try {
      await createBooking(payload, token);
      toast.success("Reservation completed successfully!");
      setIsModalOpen(false);
      router.push("/my-bookings");
    } catch (error: any) {
      toast.error(error.message || "Failed to complete reservation");
    } finally {
      setIsReserving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-[#1A2B4F] mb-8 Montserrat">
          {hotels.length} {hotels.length === 1 ? "Hotel found" : "Hotels found"}
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <SearchFilters onFilterChange={handleFilterChange} />
          </aside>
          <div className="lg:w-3/4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003B95] mb-4"></div>
                <p className="text-[#003B95] font-bold Montserrat">
                  Searching...
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {hotels.map((hotel) => (
                  <SearchHotelCard
                    key={hotel.hotelId}
                    hotel={hotel}
                    onSelectOption={handleSelectOption}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {summary && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmReservation}
          summary={summary}
          loading={isReserving}
        />
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-bold text-[#003B95]">
          Loading...
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}
