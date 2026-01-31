"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AuthBanner() {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  const content = isLoginPage
    ? {
        title: (
          <>
            Manage your stays <br />
            with ease.
          </>
        ),
        image:
          "url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        stats: [
          { value: "24h", label: "Customer Support" },
          { value: "100%", label: "Secure Booking" },
          { value: "5x", label: "Faster Check-in" },
          { value: "500k+", label: "Active Users" },
        ],
      }
    : {
        title: (
          <>
            Experience the world <br />
            in absolute comfort.
          </>
        ),
        image:
          "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop')",
        stats: [
          { value: "150+", label: "Destinations" },
          { value: "12k+", label: "Luxury Hotels" },
          { value: "1M+", label: "Bookings Made" },
          { value: "4.9/5", label: "User Rating" },
        ],
      };

  return (
    <div className="hidden lg:flex relative w-full h-full bg-slate-900 text-white flex-col justify-between p-12 overflow-hidden transition-all duration-500">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: content.image,
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
        <h1 className="text-5xl font-bold leading-tight drop-shadow-lg">
          {content.title}
        </h1>
      </div>

      <div className="relative z-10 grid grid-cols-4 gap-4 pt-8">
        {content.stats.map((stat, index) => (
          <div key={index}>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-300">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
