"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin } from "lucide-react";

const HERO_IMAGES = [
  "/images/hero/hero-1.jpg", 
  "/images/hero/hero-2.png",
  "/images/hero/hero-3.png",
];

export function HeroSection() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  
  const [filters, setFilters] = useState({
    city: "",
    startDate: "",
    endDate: "",
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const handleSearch = () => {
    const query = new URLSearchParams({
      city: filters.city,
      startDate: filters.startDate,
      endDate: filters.endDate,
      peopleCount: (Number(filters.adults) + Number(filters.children)).toString(),
    }).toString();

    console.log("Searching for:", query);
    // router.push(`/search?${query}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="relative mb-15 ">
      <div className="h-[600px] w-full relative overflow-hidden bg-gray-900">
        {HERO_IMAGES.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out`}
            style={{
              backgroundImage: `url('${src}')`,
              opacity: index === currentImageIndex ? 1 : 0, 
              zIndex: index === currentImageIndex ? 1 : 0,
            }}
          >
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-13 z-20">
        <div className="bg-white rounded-[20px] shadow-2xl p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-y-4 
        lg:gap-y-0 items-center divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          
          <div className="lg:col-span-3 py-2 lg:py-0 lg:pr-4 space-y-1 relative group">
            <label className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
              <MapPin size={12} /> Location
            </label>
            <input
              name="city"
              type="text"
              placeholder="Where are you going?"
              className="w-full font-medium text-gray-800 placeholder-gray-300 focus:outline-none bg-transparent 
              text-sm lg:text-base truncate"
              value={filters.city}
              onChange={handleInputChange}
            />
          </div>

          <div className="lg:col-span-2 py-2 lg:py-0 lg:px-4 space-y-1 border-b lg:border-b-0 lg:border-r border-gray-100">
            <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
               Check-in
            </label>
            <input
              name="startDate"
              type="date"
              className="w-fit font-medium text-gray-800 text-sm lg:text-base focus:outline-none bg-transparent 
              uppercase cursor-pointer"
              value={filters.startDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="lg:col-span-2 py-2 lg:py-0 lg:px-4 space-y-1 border-b lg:border-b-0 lg:border-r border-gray-100">
            <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
               Check-out
            </label>
            <input
              name="endDate"
              type="date"
              className="w-fit font-medium text-gray-800 text-sm lg:text-base focus:outline-none bg-transparent 
              uppercase cursor-pointer"
              value={filters.endDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="lg:col-span-1 py-2 lg:py-0 lg:px-4 space-y-1">
            <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
              Adults
            </label>
            <input
              name="adults"
              type="number"
              min={1}
              className="w-full font-medium text-gray-800 text-sm lg:text-base focus:outline-none bg-transparent"
              value={filters.adults}
              onChange={handleInputChange}
            />
          </div>

          <div className="lg:col-span-1 py-2 lg:py-0 lg:px-4 space-y-1">
            <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
              Children
            </label>
            <input
              name="children"
              type="number"
              min={0}
              className="w-full font-medium text-gray-800 text-sm lg:text-base focus:outline-none bg-transparent"
              value={filters.children}
              onChange={handleInputChange}
            />
          </div>

          <div className="lg:col-span-1 py-2 lg:py-0 lg:px-4 space-y-1">
            <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
              Rooms
            </label>
            <input
              name="rooms"
              type="number"
              min={1}
              className="w-full font-medium text-gray-800 text-sm lg:text-base focus:outline-none bg-transparent"
              value={filters.rooms}
              onChange={handleInputChange}
            />
          </div>

          <div className="lg:col-span-2 py-2 lg:py-0 lg:pl-4">
            <button 
              onClick={handleSearch}
              className="w-full bg-[#003B95] hover:bg-[#0653C9] text-white font-medium text-sm lg:text-base py-4 rounded-xl 
              transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}