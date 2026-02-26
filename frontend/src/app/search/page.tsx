"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { fetchSearchResults, SearchResult } from "@/src/features/search/services/searchApi";
import { HeroSection } from "@/src/features/home/components/HeroSection";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const query = searchParams.toString();
        const data = await fetchSearchResults(query);
        setResults(data);
      } catch (error) {
        console.error("Erro na busca:", error);
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

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-2xl font-bold text-[#1A2B4F] mb-6">
          {results.length} {results.length === 1 ? "Option found" : "Option found"}
        </h2>

        {loading ? (
          <div className="text-center py-20 text-[#003B95] font-bold">Searching for the best options...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#1A2B4F]">{result.hotelName}</h3>
                  <p className="text-sm text-gray-500 mb-4">{result.location}</p>
                  
                  <div className="bg-blue-50 text-blue-800 text-sm font-semibold px-3 py-2 rounded-lg mb-4">
                    {result.optionLabel}
                  </div>

                  <div className="space-y-1 mb-4">
                    {result.rooms.map((room) => (
                      <p key={room.id} className="text-xs text-gray-600">
                        • 1x Room ({room.type}) - R$ {room.price}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Total Price</p>
                    <p className="text-2xl font-bold text-[#003B95]">R$ {result.totalPrice}</p>
                  </div>
                  <button className="bg-[#003B95] text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-[#002a6b]">
                    Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}