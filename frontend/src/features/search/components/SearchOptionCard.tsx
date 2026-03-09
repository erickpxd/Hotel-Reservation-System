import { SearchOption } from "../services/searchApi";
import { formatCurrency } from "@/src/shared/utils/formatters";

interface SearchOptionCardProps {
  option: SearchOption;
  onSelect: () => void;
}

export function SearchOptionCard({ option, onSelect }: SearchOptionCardProps) {
  return (
    <div
      className="group border border-gray-100 rounded-2xl p-5 hover:border-[#003B95]/30 
      hover:bg-blue-50/30 transition-all flex flex-col sm:flex-row justify-between items-center gap-4"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-[#003B95] text-white text-[10px] font-semibold px-2 py-1 rounded uppercase tracking-tighter">
            {option.optionLabel}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {option.rooms.map((room) => (
            <span
              key={room.id}
              className="text-[11px] bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600 shadow-sm font-medium"
            >
              1x {room.type.replace(/_/g, " ")}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
            Total
          </p>
          <p className="text-xl font-black text-[#003B95]">
            {formatCurrency(option.totalPrice)}
          </p>
        </div>
        <button
          onClick={onSelect}
          className="bg-[#003B95] text-white px-6 py-3 rounded-xl font-bold text-sm 
           hover:bg-[#002a6b] transition-all shadow-md active:scale-95"
        >
          Select
        </button>
      </div>
    </div>
  );
}
