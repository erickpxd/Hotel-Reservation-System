import Image from "next/image";
import { Mail } from "lucide-react";

export function Newsletter() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative bg-[#003B95] rounded-3xl p-10 md:p-16 overflow-hidden shadow-2xl">
        
        <div className="absolute right-0 bottom-0 pointer-events-none select-none opacity-40">
          <Image 
            src="/images/details/corcovado-2.png" 
            alt="Detail" 
            width={500} 
            height={200} 
            className="object-contain"
          />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 text-white">
            <h2 className="text-2xl md:text-xl font-bold leading-tight">
              Join Our Exclusive Travel Circle
            </h2>
            <p className="text-blue-100/90 text-lg max-w-md leading-relaxed">
              Get access to exclusive hotels and private retreats. Receive curated deals and seasonal offers. Join now and upgrade your travel.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={20} />
              </span>
              <input 
                type="email" 
                placeholder="Maria@example.com" 
                className="w-full pl-12 pr-6 py-4 rounded-xl bg-white text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none"
              />
            </div>
            <button className="w-full sm:w-auto px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all active:scale-95">
              Join Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}