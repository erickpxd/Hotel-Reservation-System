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
                <div
                  className="flex items-center gap-2 text-blue-800 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors border 
                  border-transparent hover:border-blue-100 "
                >
                  <div className="w-4 h-4 rounded-full flex items-center justify-center">
                    <Hotel size={18} />
                  </div>
                  <span className="text-sm font-medium ">My reservations</span>
                </div>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors 
                  border border-transparent hover:border-red-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all hover:shadow-md"
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
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link href="/">
              <Image
                src="/logo2.svg"
                alt="JalaHotel"
                width={40}
                height={40}
                className="h-8 sm:h-10 w-auto"
              />
            </Link>

            <div className="border-t border-gray-100 my-2 pt-2">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 flex items-center gap-3 text-gray-700 mb-2">
                    <Hotel size={20} />
                    <span className="font-medium">My Profile</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 p-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
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
