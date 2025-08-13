// src/components/home/HeroSearch.tsx

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import hero from "@/assets/hero.jpg";

interface DateRange {
  from?: Date;
  to?: Date;
}

interface HeroSearchProps {
  hideLocation?: boolean; // ✅ Added prop
}

export default function HeroSearch({ hideLocation }: HeroSearchProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [guests, setGuests] = useState(1);
  const [range, setRange] = useState<DateRange>({});
  const navigate = useNavigate();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const onSearch = () => {
    const params = new URLSearchParams();
    if (range.from) params.set("from", range.from.toISOString().slice(0, 10));
    if (range.to) params.set("to", range.to.toISOString().slice(0, 10));
    params.set("guests", String(guests));
    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden rounded-xl border bg-card"
      style={{
        backgroundImage: `linear-gradient(to bottom, hsl(var(--background)/.0), hsl(var(--background)/.3)), url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px 200px at var(--mx,50%) var(--my,30%), hsl(var(--primary)/.25), transparent 60%)`,
        }}
      />
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Modern Room Booking — find your perfect stay
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Stylish rooms, premium comfort, and seamless booking.
          </p>
        </div>

        <div className="mx-auto mt-8 w-full max-w-4xl rounded-xl border bg-background/80 backdrop-blur p-3 md:p-4">
          <div className={`grid gap-3 ${hideLocation ? "md:grid-cols-3" : "md:grid-cols-5"}`}>
            {!hideLocation && (
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Location</label>
                <div className="mt-1 flex items-center gap-2 rounded-md border px-3">
                  <Input
                    placeholder="City or area"
                    className="border-0 focus-visible:ring-0"
                  />
                </div>
              </div>
            )}

            <div className={hideLocation ? "md:col-span-2" : "md:col-span-2"}>
              <label className="text-sm font-medium">Dates</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !(range.from && range.to) && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {range.from && range.to ? (
                      `${format(range.from, "MMM d")} - ${format(range.to, "MMM d")}`
                    ) : (
                      <span>Select dates</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={range as any}
                    onSelect={(v: any) => setRange(v)}
                    numberOfMonths={2}
                    className={cn("p-3 pointer-events-auto")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="md:col-span-1">
              <label className="text-sm font-medium">Guests</label>
              <div className="mt-1 flex items-center gap-2 rounded-md border px-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
                  className="border-0 focus-visible:ring-0"
                />
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <Button size="lg" onClick={onSearch}>
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
