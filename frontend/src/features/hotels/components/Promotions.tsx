export function Promotions() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-bold text-[#1A2B4F] mb-4 text-sm uppercase tracking-wide">
        Available promotions
      </h3>

      <div className="flex flex-wrap gap-4">
        <div
          className="flex-1 text-center px-6 py-3 bg-white text-[#002558] text-sm font-normal 
        border border-gray-100 rounded-lg shadow-sm cursor-default select-none whitespace-nowrap"
        >
          Breakfast included
        </div>

        <div
          className="flex-1 text-center px-6 py-3 bg-white text-[#002558] text-sm font-normal 
        border border-gray-100 rounded-lg shadow-sm cursor-default select-none whitespace-nowrap"
        >
          Easter
        </div>

        <div
          className="flex-1 text-center px-6 py-3 bg-white text-[#002558] text-sm font-normal
          border border-gray-100 rounded-lg shadow-sm cursor-default select-none whitespace-nowrap"
        >
          Pet-friendly
        </div>
      </div>
    </div>
  );
}
