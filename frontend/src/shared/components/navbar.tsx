"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Hotel, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Image from "next/image";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return null;
  }

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <Image
              src="/logo2.svg"
              alt="JalaHotel"
              width={40}
              height={40}
              className="h-8 sm:h-10 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  href="/my-bookings"
                  className="flex items-center gap-2 text-blue-800 px-4 py-2 hover:bg-blue-50 rounded-lg 
                  transition-colors border border-transparent hover:border-blue-100"
                >
                  <Hotel size={18} />
                  <span className="text-sm font-medium">My reservations</span>
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg
                   transition-colors border border-transparent hover:border-red-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="w-[6rem] px-4 py-2 text-sm font-medium text-[#003B95] border border-[#003B95]
                   rounded-lg hover:text-[#0653C9] transition-colors text-center"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="w-[6rem] px-4 py-2 text-sm font-medium text-white bg-[#003B95] hover:bg-[#0653C9] 
                   rounded-lg shadow-sm transition-all hover:shadow-md text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            
            <div className="mt-2"> 
              {isAuthenticated ? (
                <>
                  <Link 
                    href="/my-bookings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3 py-2 flex items-center gap-3 text-gray-700 hover:bg-gray-50 rounded-md mb-2"
                  >
                    <Hotel size={20} />
                    <span className="font-medium">My reservations</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-base 
                    font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 p-2"> 
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-2 border border-[#003B95] rounded-lg 
                    text-[#003B95] font-medium hover:text-[#0653C9] transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-2 bg-[#003B95] text-white rounded-lg 
                    font-medium hover:bg-[#0653C9] shadow-sm hover:shadow-md transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}