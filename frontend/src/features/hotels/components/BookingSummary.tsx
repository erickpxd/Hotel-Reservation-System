/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArrowRight,
  Users,
  Calendar,
  DollarSign,
  Plus,
  Minus,
} from "lucide-react";

interface BookingSummaryProps {
  dates: {
    checkIn: string;
    checkOut: string;
    nights: number;
  };
  guests: {
    adults: number;
    children: number;
  };
  financials: {
    perNight: number;
    total: number;
  };
  onReserve: () => void;
  onUpdateFilters: (name: string, value: any) => void;
  isAuthenticated: boolean;
  hasSelectedRooms: boolean;
}

export function BookingSummary({
  dates,
  guests,
  financials,
  onReserve,
  onUpdateFilters,
  isAuthenticated,
  hasSelectedRooms,
}: BookingSummaryProps) {
  const updateGuest = (
    type: "adults" | "children",
    operation: "add" | "remove",
  ) => {
    const currentVal = guests[type];
    const newVal =
      operation === "add" ? currentVal + 1 : Math.max(0, currentVal - 1);

    if (type === "adults" && newVal < 1) return;

    onUpdateFilters(type, newVal);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-3xl font-bold text-[#1A2B4F]">Details</h2>
      </div>

      <div className="p-6 space-y-6">
        <div className="p-4 border border-gray-100 rounded-xl bg-white">
          <label className="text-xs text-gray-400 font-bold flex items-center gap-2 mb-2">
            <Calendar size={14} /> Dates
          </label>
          <div className="flex items-center justify-between gap-2">
            <input
              type="date"
              value={dates.checkIn}
              onChange={(e) => onUpdateFilters("checkIn", e.target.value)}
              className="w-full text-sm font-bold text-[#1A2B4F] bg-transparent outline-none cursor-pointer focus:text-[#003B95]"
              style={{ colorScheme: "light" }}
            />

            <ArrowRight size={16} className="text-[#003B95] shrink-0" />

            <input
              type="date"
              value={dates.checkOut}
              onChange={(e) => onUpdateFilters("checkOut", e.target.value)}
              className="w-full text-sm font-bold text-[#1A2B4F] bg-transparent outline-none cursor-pointer focus:text-[#003B95] text-right"
              style={{ colorScheme: "light" }}
            />
          </div>
        </div>

        <div className="p-4 border border-gray-100 rounded-xl bg-white">
          <label className="text-xs text-gray-400 font-bold flex items-center gap-2 mb-4">
            <Users size={14} /> People
          </label>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#1A2B4F]">Adults</span>
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                <button
                  onClick={() => updateGuest("adults", "remove")}
                  className="p-1 hover:bg-white rounded shadow-sm transition-all text-[#003B95]"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold w-4 text-center">
                  {guests.adults}
                </span>
                <button
                  onClick={() => updateGuest("adults", "add")}
                  className="p-1 hover:bg-white rounded shadow-sm transition-all text-[#003B95]"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#1A2B4F]">Children</span>
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                <button
                  onClick={() => updateGuest("children", "remove")}
                  className="p-1 hover:bg-white rounded shadow-sm transition-all text-[#003B95]"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold w-4 text-center">
                  {guests.children}
                </span>
                <button
                  onClick={() => updateGuest("children", "add")}
                  className="p-1 hover:bg-white rounded shadow-sm transition-all text-[#003B95]"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border border-gray-100 rounded-xl bg-white space-y-3">
          <label className="text-xs text-gray-400 font-bold flex items-center gap-2">
            <DollarSign size={14} /> Price
          </label>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Per night</span>
            <span className="font-bold text-gray-700">
              R$ {financials.perNight.toFixed(0)}
            </span>
          </div>
          <div className="flex justify-between items-end pt-1">
            <span className="text-normal font-bold text-[#003B95]">
              Total
              <span className="text-sm text-gray-400 font-normal ml-1">
                ({dates.nights} {dates.nights === 1 ? "night" : "nights"})
              </span>
            </span>
            <span className="text-xl font-bold text-[#003B95]">
              R$ {financials.total.toFixed(0)}
            </span>
          </div>
        </div>

        <button
          onClick={onReserve}
          disabled={!hasSelectedRooms}
          className="w-full py-4 bg-[#003B95] hover:bg-[#002a6b] text-white font-bold rounded-xl
           shadow-lg transition-all active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isAuthenticated ? "Reserve Now" : "Login to Reserve"}
        </button>
      </div>
    </div>
  );
}
