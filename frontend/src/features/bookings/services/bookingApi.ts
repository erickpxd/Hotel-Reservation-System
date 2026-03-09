/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface BookingPayload {
  checkInDate: string;
  checkOutDate: string;
  roomIds: string[];
  adultCount: number;
  children: {
    count: number;
    ages: number[];
  };
}

export interface BookingSummaryResponse {
  valid: boolean;
  checkInDate: string;
  checkOutDate: string;
  roomsSelected: any[];
  numberOfNights: number;
  adultCount: number;
  children: { count: number; ages: number[] };
  baseCost: number;
  promotionsApplied: string[];
  estimatedDiscount: number;
  finalCost: number;
  cancellationPolicy: string;
}

export async function createBooking(payload: BookingPayload, token: string) {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create booking");
  }

  return response.json();
}

export async function getBookingSummary(
  payload: BookingPayload,
  token: string,
): Promise<BookingSummaryResponse> {
  const response = await fetch(`${API_URL}/bookings/summary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error fetching summary");
  }
  return response.json();
}

export async function getUserBookings(token: string): Promise<any[]> {
  const response = await fetch(`${API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Error loading reservations");
  return response.json();
}

export async function cancelBooking(
  bookingId: string,
  token: string,
): Promise<void> {
  const response = await fetch(`${API_URL}/bookings/${bookingId}/cancel`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error canceling reservation");
  }
}
