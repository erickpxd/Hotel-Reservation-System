import { Room } from "../services/hotelApi";

interface RoomCardProps {
  room: Room;
  isSelected: boolean;
  onToggle: () => void;
}

const formatRoomType = (type: string) => {
    return type.toLowerCase().split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

export function RoomCard({ room, isSelected, onToggle }: RoomCardProps) {
  return (
    <div
      onClick={onToggle}
      className={`
        border rounded-xl p-5 cursor-pointer transition-all duration-200
        flex flex-col justify-between h-44 relative overflow-hidden
        ${
          isSelected
            ? "border-[#003B95] ring-1 ring-[#003B95]"
            : "border-gray-200 hover:border-blue-300 hover:shadow-md bg-white"
        }
    `}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-[#003B95] text-lg">
            {formatRoomType(room.type)}
          </h4>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            Room {room.number}
          </p>
        </div>
        <div className="text-right">
          <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium">
            {room.capacity} Person{room.capacity > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-end mt-4">
        <div>
          <span className="text-xs text-gray-400 font-medium uppercase">
            Price per night
          </span>
          <p className="font-bold text-gray-900 text-xl">
            R$ {Number(room.price).toFixed(0)}
          </p>
        </div>

        <button
          className={`
            px-6 py-2 rounded-lg text-sm font-bold transition-colors
            ${
              isSelected
                ? "bg-white text-[#003B95] border border-[#003B95]"
                : "bg-[#003B95] text-white hover:bg-[#002a6b]"
            }
        `}
        >
          {isSelected ? "Selected" : "Select"}
        </button>
      </div>
    </div>
  );
}
