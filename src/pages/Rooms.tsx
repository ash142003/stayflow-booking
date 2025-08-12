import { useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { rooms as allRooms, Room, RoomType } from "@/data/rooms";
import RoomCard from "@/components/rooms/RoomCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn, formatINR } from "@/lib/utils";
import { format } from "date-fns";

interface DateRange { from?: Date; to?: Date }

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function RoomsPage() {
  const query = useQuery();
  const [location, setLocation] = useState(query.get("location") || "");
  const [type, setType] = useState<RoomType | "All">((query.get("type") as RoomType) || "All");
  const [price, setPrice] = useState<number[]>([80, 400]);
  const [range, setRange] = useState<DateRange>({
    from: query.get("from") ? new Date(query.get("from")!) : undefined,
    to: query.get("to") ? new Date(query.get("to")!) : undefined,
  });

  const filtered = allRooms.filter((r) => {
    const locOk = location ? r.location.toLowerCase().includes(location.toLowerCase()) : true;
    const typeOk = type === "All" ? true : r.type === type;
    const priceOk = r.pricePerNight >= price[0] && r.pricePerNight <= price[1];
    // If dates selected, require that none of the range days are in unavailable
    let dateOk = true;
    if (range.from && range.to) {
      const unavailable = new Set(r.unavailableDates);
      const start = new Date(range.from);
      const end = new Date(range.to);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const iso = d.toISOString().slice(0, 10);
        if (unavailable.has(iso)) { dateOk = false; break; }
      }
    }
    return locOk && typeOk && priceOk && dateOk;
  });

  return (
    <div className="container py-8">
      <Helmet>
        <title>Rooms and Suites | ROOM BOOKING</title>
        <meta name="description" content="Browse modern rooms and suites with real-time availability and filters by price, type, and location." />
        <link rel="canonical" href={window.location.origin + "/rooms"} />
      </Helmet>

      <h1 className="text-3xl font-bold">Rooms</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-[280px_1fr]">
        <aside className="rounded-lg border p-4 h-fit">
          <h2 className="text-sm font-semibold mb-4">Search & Filters</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="loc">Location</Label>
              <Input id="loc" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City or area" />
            </div>
            <div>
              <Label>Dates</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !(range.from && range.to) && "text-muted-foreground")}> 
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    {range.from && range.to ? `${format(range.from, "MMM d")} - ${format(range.to, "MMM d")}` : "Select dates"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="range" selected={range as any} onSelect={(v: any) => setRange(v)} numberOfMonths={2} className={cn("p-3 pointer-events-auto")} />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Type</Label>
              <Select value={type} onValueChange={(v) => setType(v as any)}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Double">Double</SelectItem>
                  <SelectItem value="Deluxe">Deluxe</SelectItem>
                  <SelectItem value="Suite">Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price range {formatINR(price[0])} - {formatINR(price[1])}</Label>
              <Slider value={price} min={50} max={500} step={5} onValueChange={setPrice} className="mt-2" />
            </div>
            <Button asChild className="w-full">
              <Link to="/booking">Book Now</Link>
            </Button>
          </div>
        </aside>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((room: Room) => (
            <RoomCard room={room} key={room.id} />
          ))}
          {filtered.length === 0 && (
            <p className="text-muted-foreground">No rooms match your filters.</p>
          )}
        </section>
      </div>
    </div>
  );
}