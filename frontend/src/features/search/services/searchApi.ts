const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface SearchRoom {
  id: string;
  type: string;
  price: number;
  capacity: number;
}

export interface SearchResult {
  hotelId: string;
  hotelName: string;
  location: string;
  optionLabel: string;
  rooms: SearchRoom[];
  totalPrice: number;
  available: boolean;
}

export async function fetchSearchResults(queryString: string): Promise<SearchResult[]> {
  const response = await fetch(`${API_URL}/search?${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error while fetching hotels");
  }

  return response.json();
}