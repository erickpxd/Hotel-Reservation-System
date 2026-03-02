"use client";

import { useState } from "react";
import { formatCurrency } from "@/src/shared/utils/formatters";

interface SearchFiltersProps {
  onFilterChange: (filters: { minPrice?: number; maxPrice?: number }) => void;
}

export function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(2000);

  const handleApply = () => {
    onFilterChange({ minPrice, maxPrice });
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit sticky top-24">
      <h3 className="text-lg font-bold text-[#1A2B4F] mb-6 Montserrat">
        Filters
      </h3>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-bold text-gray-700 mb-4 block uppercase tracking-wider">
            Total Stay Price
          </label>
          <div className="space-y-4">
            <div>
              <span className="text-xs text-gray-400">
                Minimum: {formatCurrency(minPrice)}
              </span>
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003B95]"
              />
            </div>
            <div>
              <span className="text-xs text-gray-400">
                Maximum: {formatCurrency(maxPrice)}
              </span>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#003B95]"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleApply}
          className="w-full bg-[#003B95] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#002a6b] 
          transition-all shadow-lg shadow-blue-900/10"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
