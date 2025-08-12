import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Room } from "@/data/rooms";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";
export default function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group rounded-lg border overflow-hidden bg-card">
      <Link to={`/rooms/${room.id}`} aria-label={`View ${room.name}`}>
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={room.thumbnail}
            alt={`${room.name} thumbnail`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">{room.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{room.rating.toFixed(1)} ({room.reviews})</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{room.location} · {room.type}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-base"><span className="font-semibold">{formatINR(room.pricePerNight)}</span> <span className="text-muted-foreground">/ night</span></p>
          <Button asChild variant="secondary">
            <Link to={`/booking?roomId=${room.id}`}>Book</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
