import { X, Users, Info, CheckCircle2 } from "lucide-react";
import { BookingSummaryResponse } from "../services/bookingApi";
import { formatRoomType } from "../../../shared/utils/formatters";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  summary: BookingSummaryResponse;
  loading: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  summary,
  loading,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const extractSavedValue = (promoText: string) => {
    const match = promoText.match(/saved\s+([\d.]+)/i);
    return match ? match[1] : null;
  };

  const labelStyle =
    "text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1";
  const valueStyle = "text-sm font-bold text-slate-700";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in 
        fade-in zoom-in duration-200 "
      >
        <div className="p-5 flex justify-between items-center bg-[#003B95] text-white">
          <h3 className="text-lg font-bold tracking-tight">
            Confirm Your Reservation
          </h3>
          <button
            onClick={onClose}
            className="hover:bg-white/20 rounded-full p-1.5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-start gap-3">
              <div className="text-[#003B95] mt-1"></div>
              <div>
                <span className={labelStyle}>Check-in</span>
                <p className={valueStyle}>
                  {new Date(summary.checkInDate).toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 justify-end text-right">
              <div>
                <span className={labelStyle}>Check-out</span>
                <p className={valueStyle}>
                  {new Date(summary.checkOutDate).toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="text-[#003B95] mt-1"></div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
            <span className="text-sm font-semibold text-slate-600 flex items-center gap-2 ">
              <Users size={16} className="text-slate-600" /> Guests
            </span>
            <span className="text-sm font-bold text-slate-800">
              {summary.adultCount} Adults • {summary.children.count} Children
            </span>
          </div>

          <div className="space-y-3">
            <span className={labelStyle}> Accommodation Details</span>
            <div className="space-y-2">
              {summary.roomsSelected.map((room) => (
                <div
                  key={room.id}
                  className="flex justify-between items-center p-3 border border-slate-100 rounded-xl 
                  bg-white hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-700">
                      {formatRoomType(room.type)}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                      Room {room.number}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#003B95]">
                      R$ {Number(room.price).toFixed(2)}
                    </p>
                    <p className="text-[9px] text-slate-400 uppercase font-bold">
                      night
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex justify-between text-sm text-slate-500 font-medium px-1">
              <span>Standard Rate ({summary.numberOfNights} nights)</span>
              <span>R$ {summary.baseCost.toFixed(2)}</span>
            </div>

            {summary.promotionsApplied.length > 0 && (
              <div className="space-y-1.5">
                {summary.promotionsApplied.map((promo, i) => {
                  const savedAmount = extractSavedValue(promo);
                  const promoName = promo.split("(")[0].trim();

                  return (
                    <div
                      key={i}
                      className="flex justify-between text-sm bg-emerald-50/60 px-3 py-2 rounded-lg border border-emerald-100/50"
                    >
                      <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-600" />
                        {promoName}
                      </span>
                      <span className="font-bold text-emerald-600">
                        {savedAmount
                          ? `- R$ ${parseFloat(savedAmount).toFixed(2)}`
                          : "Applied"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex justify-between items-center pt-3 mt-2 border-t border-slate-100 px-1">
              <div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block">
                  Total to Pay
                </span>
              </div>
              <span className="text-2xl font-extrabold text-[#003B95]">
                R$ {summary.finalCost.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg flex gap-3 border border-slate-100 items-center justify-center">
            <Info size={16} className="text-slate-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-500 leading-relaxed italic">
              <strong>Policy:</strong> {summary.cancellationPolicy}
            </p>
          </div>
        </div>

        <div className="p-5 bg-slate-50 flex gap-3 border-t border-slate-200">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-500 hover:bg-slate-200 transition-all text-sm"
          >
            Go Back
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-2 py-3 px-6 bg-[#003B95] text-white rounded-xl font-bold hover:bg-[#002a6b] 
            transition-all shadow-md shadow-blue-900/20 disabled:bg-slate-300 text-sm flex items-center justify-center gap-2"
          >
            {loading ? "Confirming..." : "Confirm My Stay"}
          </button>
        </div>
      </div>
    </div>
  );
}
