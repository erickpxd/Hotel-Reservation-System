import Image from "next/image";
import Link from "next/link";

export function RegisterBanner() {
  return (
    <div className="hidden lg:flex relative w-full h-full bg-slate-900 text-white flex-col justify-between p-12 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />

      <div className="relative z-10">
        <Link href="/">
          <Image
            src="/logo1.svg"
            alt="JalaHotel"
            width={40}
            height={40}
            className="h-8 sm:h-10 w-auto"
          />
        </Link>
      </div>

      <div className="relative z-10 space-y-6">
        <h1 className="text-5xl font-bold leading-tight">
          Experience the world <br />
          in absolute comfort.
        </h1>
      </div>

      <div className="relative z-10 grid grid-cols-4 gap-4 pt-8">
        <div>
          <p className="text-3xl font-bold">150+</p>
          <p className="text-sm text-gray-300">Destinations</p>
        </div>
        <div>
          <p className="text-3xl font-bold">12k+</p>
          <p className="text-sm text-gray-300">Luxury Hotels</p>
        </div>
        <div>
          <p className="text-3xl font-bold">1M+</p>
          <p className="text-sm text-gray-300">Bookings Made</p>
        </div>
        <div>
          <p className="text-3xl font-bold">4.9/5</p>
          <p className="text-sm text-gray-300">User Rating</p>
        </div>
      </div>
    </div>
  );
}
