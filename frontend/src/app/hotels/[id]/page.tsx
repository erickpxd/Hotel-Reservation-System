/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";

import {
  getHotelById,
  getAvailableRooms,
  HotelDetails,
  Room,
} from "../../../features/hotels/services/hotelApi";
import {
  createBooking,
  getBookingSummary,
  BookingSummaryResponse,
} from "../../../features/bookings/services/bookingApi";
import { useAuth } from "../../../context/AuthContext";
import { HotelDetailsTemplate } from "../../../features/hotels/components/HotelDetailsTemplate";
import { ConfirmationModal } from "../../../features/bookings/components/ConfirmationModal";

export default function HotelDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const hotelId = resolvedParams.id;
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [hotel, setHotel] = useState<HotelDetails | null>(null);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summary, setSummary] = useState<BookingSummaryResponse | null>(null);
  const [isReserving, setIsReserving] = useState(false);

  const [filters, setFilters] = useState({
    checkIn:
      searchParams.get("startDate") ||
      new Date(Date.now() + 86400000).toISOString().split("T")[0],
    checkOut:
      searchParams.get("endDate") ||
      new Date(Date.now() + 172800000).toISOString().split("T")[0],
    adults: parseInt(searchParams.get("adultsCount") || "2"),
    children: parseInt(searchParams.get("childrenCount") || "0"),
  });

  const calculateNights = (start: string, end: string) => {
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const updateFilters = (name: string, value: any) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    async function loadHotel() {
      try {
        const data = await getHotelById(hotelId);
        setHotel(data);
      } catch (error) {
        toast.error("Error loading hotel details");
      } finally {
        setLoading(false);
      }
    }
    loadHotel();
  }, [hotelId]);

  useEffect(() => {
    async function loadAvailableRooms() {
      if (!filters.checkIn || !filters.checkOut) return;

      setLoadingRooms(true);
      try {
        const rooms = await getAvailableRooms(hotelId, {
          startDate: filters.checkIn,
          endDate: filters.checkOut,
          adultsCount: filters.adults,
          childrenCount: filters.children,
        });
        setAvailableRooms(rooms);
        setSelectedRoomIds([]);
      } catch (error) {
        console.error("Error loading available rooms:", error);
        toast.error("Could not fetch available rooms for these dates.");
      } finally {
        setLoadingRooms(false);
      }
    }

    loadAvailableRooms();
  }, [
    hotelId,
    filters.checkIn,
    filters.checkOut,
    filters.adults,
    filters.children,
  ]);

  const calculateTotal = () => {
    const nights = calculateNights(filters.checkIn, filters.checkOut);
    const perNight = availableRooms
      .filter((r) => selectedRoomIds.includes(r.id))
      .reduce((acc, room) => acc + Number(room.price), 0);

    return { perNight, total: perNight * nights, nights };
  };

  const handleOpenConfirmation = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in");
      router.push("/login");
      return;
    }

    if (selectedRoomIds.length === 0) {
      toast.error("Select at least one room");
      return;
    }

    const token = getCookie("auth_token") as string;

    const checkInDateStr = new Date(
      `${filters.checkIn}T00:00:00`,
    ).toISOString();
    const checkOutDateStr = new Date(
      `${filters.checkOut}T00:00:00`,
    ).toISOString();

    const payload = {
      checkInDate: checkInDateStr,
      checkOutDate: checkOutDateStr,
      roomIds: selectedRoomIds,
      adultCount: filters.adults,
      children: {
        count: filters.children,
        ages: filters.children > 0 ? Array(filters.children).fill(5) : [],
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
    const token = getCookie("auth_token") as string;
    setIsReserving(true);

    const payload = {
      checkInDate: new Date(`${filters.checkIn}T00:00:00`).toISOString(),
      checkOutDate: new Date(`${filters.checkOut}T00:00:00`).toISOString(),
      roomIds: selectedRoomIds,
      adultCount: filters.adults,
      children: {
        count: filters.children,
        ages: filters.children > 0 ? Array(filters.children).fill(5) : [],
      },
    };

    try {
      await createBooking(payload, token);
      toast.success("Reservation successfully completed!");
      setIsModalOpen(false);
      router.push("/my-bookings");
    } catch (error: any) {
      toast.error(error.message || "Failed to complete reservation");
    } finally {
      setIsReserving(false);
    }
  };

  return (
    <>
      <HotelDetailsTemplate
        hotel={hotel ? { ...hotel, rooms: availableRooms } : null}
        loading={loading || loadingRooms}
        isAuthenticated={isAuthenticated}
        selectedRoomIds={selectedRoomIds}
        dates={{
          checkIn: filters.checkIn,
          checkOut: filters.checkOut,
          nights: calculateTotal().nights,
        }}
        guests={{ adults: filters.adults, children: filters.children }}
        financials={calculateTotal()}
        onToggleRoom={(id) =>
          setSelectedRoomIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
          )
        }
        onUpdateFilters={updateFilters}
        onReserve={handleOpenConfirmation}
      />

      {summary && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmReservation}
          summary={summary}
          loading={isReserving}
        />
      )}
    </>
  );
}
