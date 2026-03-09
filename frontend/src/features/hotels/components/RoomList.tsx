import { Room } from "../services/hotelApi";
import { RoomCard } from "./RoomCard";

interface RoomListProps {
  rooms: Room[];
  selectedRoomIds: string[];
  onToggleRoom: (roomId: string) => void;
  loadingRooms: boolean;
}

export function RoomList({ rooms, selectedRoomIds, onToggleRoom, loadingRooms }: RoomListProps) {
  return (
   <div className="pt-8 border-t border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <h3 className="text-2xl font-bold text-[#1A2B4F]">Available rooms</h3>
        {loadingRooms && (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#003B95]"></div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pt-2 pl-1 pr-2 pb-2">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            isSelected={selectedRoomIds.includes(room.id)}
            onToggle={() => onToggleRoom(room.id)}
          />
        ))}
      </div>
    </div>
  );
}
