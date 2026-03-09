/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface SearchRoom {
  id: string;
  type: string;
  price: number;
  capacity: number;
}

export interface SearchOption {
  optionLabel: string;
  rooms: SearchRoom[];
  totalPrice: number;
}

export interface SearchResult {
  hotelId: string;
  hotelName: string;
  hotelDescription: string | null;
  location: string;
  options: SearchOption[];
}

export const searchApi = {
  searchHotels: async (
    params: Record<string, any>,
  ): Promise<SearchResult[]> => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${API_URL}/search?${query}`,
    );
    if (!response.ok) throw new Error("Search failure");
    return response.json();
  },
};
