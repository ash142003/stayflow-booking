import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { rooms } from "@/data/rooms";
import ImageGallery from "@/components/rooms/ImageGallery";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Check, Wifi, Tv, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RoomDetailPage() {
  const { id } = useParams();
  const room = rooms.find((r) => r.id === id);

  if (!room) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold">Room not found</h1>
        <p className="mt-2 text-muted-foreground">Please browse our available rooms.</p>
        <Button asChild className="mt-4"><Link to="/rooms">Back to Rooms</Link></Button>
      </div>
    );
  }

  const disabled = room.unavailableDates.map((d) => new Date(d));

  return (
    <div className="container py-8">
      <Helmet>
        <title>{room.name} | ROOM BOOKING</title>
        <meta name="description" content={`₹{room.name} in ₹{room.location}. Amenities: ₹{room.amenities.join(", ")}. Book now at the best price.`} />
        <link rel="canonical" href={window.location.origin + `/rooms/₹{room.id}`} />
      </Helmet>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <ImageGallery images={room.images} alt={room.name} />
          <article className="mt-6 space-y-3">
            <h1 className="text-3xl font-bold">{room.name}</h1>
            <p className="text-muted-foreground">{room.location} · {room.type}</p>
            <p className="mt-2 leading-relaxed">{room.description}</p>
            <section className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Amenities</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {room.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" /> {a}
                  </li>
                ))}
                {/* Decorative icons */}
                <li className="flex items-center gap-2 text-sm text-muted-foreground"><Wifi className="h-4 w-4"/> High-speed Wi‑Fi</li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground"><Tv className="h-4 w-4"/> Smart TV</li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground"><Coffee className="h-4 w-4"/> Coffee & Tea</li>
              </ul>
            </section>
          </article>
        </div>
        <aside className="h-fit rounded-lg border p-5">
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-semibold">₹{room.pricePerNight}</p>
            <span className="text-sm text-muted-foreground">per night</span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Availability</h3>
            <Calendar
              mode="range"
              className={cn("p-3 pointer-events-auto rounded-md border")}
              disabled={(date) => disabled.some((d) => d.toDateString() === date.toDateString())}
              numberOfMonths={1}
            />
          </div>
          <Button asChild className="mt-4 w-full">
            <Link to={`/booking?roomId=₹{room.id}`}>Book Now</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
