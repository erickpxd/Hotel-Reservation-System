/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { formatCurrency } from "@/src/shared/utils/formatters";
import { Calendar, Tag, XCircle, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

interface BookingCardProps {
  booking: any;
  onCancelSuccess: () => void;
  token: string;
  cancelAction: (id: string, token: string) => Promise<void>;
}

export function BookingCard({
  booking,
  onCancelSuccess,
  token,
  cancelAction,
}: BookingCardProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const isCancelled = booking.status === "CANCELLED";

  const handleCancel = async () => {
    try {
      await cancelAction(booking.id, token);
      toast.success("Reservation successfully canceled!");
      onCancelSuccess();
      setIsConfirming(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`bg-white border border-[#003B95] rounded-3xl p-6 shadow-sm transition-all ${
        isCancelled ? "opacity-50" : "hover:shadow-md"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span
            className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
              isCancelled
                ? "bg-gray-400 text-white-500"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {booking.status}
          </span>
          <p className="text-xs text-gray-400 mt-2 font-mono">
            ID: {booking.id}
          </p>
        </div>
        <p className="text-xl font-black text-[#003B95]">
          {formatCurrency(booking.totalCost)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Calendar size={18} className="text-[#003B95]" />
          <span>
            {new Date(booking.checkInDate).toLocaleDateString("pt-BR", {
              timeZone: "UTC",
            })}
            {" "}—{" "}
            {new Date(booking.checkOutDate).toLocaleDateString("pt-BR", {
              timeZone: "UTC",
            })}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Tag size={18} className="text-[#003B95]" />
          <span>{booking.roomIds.length} Selected room(s)</span>
        </div>
      </div>

      {!isCancelled && (
        <div className="mt-4">
          {!isConfirming ? (
            <button
              onClick={() => setIsConfirming(true)}
              className="w-full flex items-center justify-center gap-2 border-2 border-red-100 
              text-red-600 py-3 rounded-xl font-bold text-sm hover:bg-red-50 transition-colors"
            >
              <XCircle size={18} />
              Cancel Reservation
            </button>
          ) : (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-4 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center gap-3 mb-4 text-red-800">
                <AlertTriangle size={20} className="shrink-0" />
                <p className="text-sm font-semibold">
                  Are you sure? This action cannot be undone and must respect
                  the 3-day policy.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold text-xs hover:bg-red-700 transition-colors"
                >
                  Yes, cancel it
                </button>
                <button
                  onClick={() => setIsConfirming(false)}
                  className="flex-1 bg-white border border-gray-200 text-gray-600 py-2 rounded-lg font-bold text-xs hover:bg-gray-50 transition-colors"
                >
                  No, keep it
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
