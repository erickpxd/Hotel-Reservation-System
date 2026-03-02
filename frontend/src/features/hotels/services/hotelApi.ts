const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Room {
  id: string;
  number: string;
  price: number;
  type: string; 
  capacity: number;
  available: boolean;
  hotelId: string;
}

export interface HotelDetails {
  id: string;
  name: string;
  address: string;
  description: string;
  rooms: Room[];
  images?: string[]; 
}

export async function getHotels() {
  const response = await fetch(`${API_URL}/hotels`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels from server.");
  }

  return response.json();
}

export async function getHotelById(id: string): Promise<HotelDetails> {
  const response = await fetch(`${API_URL}/hotels/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching hotel details.");
  }

  return response.json();
}

export async function getAvailableRooms(
  hotelId: string,
  params: {
    startDate: string;
    endDate: string;
    adultsCount: number;
    childrenCount: number;
  },
): Promise<Room[]> { 
  const query = new URLSearchParams({
    startDate: params.startDate,
    endDate: params.endDate,
    adultsCount: params.adultsCount.toString(),
    childrenCount: params.childrenCount.toString(),
  }).toString();

  const response = await fetch(
    `${API_URL}/search/available-rooms/${hotelId}?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Error while searching for available rooms");
  }

  return response.json();
}