import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { rooms } from "@/data/rooms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, differenceInCalendarDays } from "date-fns";
import { toast } from "@/hooks/use-toast";

const BookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(6, "Phone is required"),
  checkin: z.date({ required_error: "Check-in required" }),
  checkout: z.date({ required_error: "Check-out required" }),
  guests: z.coerce.number().min(1).max(6),
  roomId: z.string(),
  requests: z.string().optional(),
  promo: z.string().optional(),
}).refine((data) => data.checkout > data.checkin, { message: "Check-out must be after check-in", path: ["checkout"] });

export type BookingFormValues = z.infer<typeof BookingSchema>;

export default function BookingPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialRoomId = params.get("roomId") || rooms[0].id;

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      checkin: undefined as any,
      checkout: undefined as any,
      guests: 1,
      roomId: initialRoomId,
      requests: "",
      promo: "",
    },
  });

  const values = form.watch();
  const room = rooms.find((r) => r.id === values.roomId)!;
  const nights = values.checkin && values.checkout ? differenceInCalendarDays(values.checkout, values.checkin) : 0;
  const baseTotal = nights * room.pricePerNight;
  const discount = values.promo?.toUpperCase() === "WELCOME10" ? Math.round(baseTotal * 0.1) : 0;
  const total = Math.max(0, baseTotal - discount);

  function onSubmit(data: BookingFormValues) {
    const payload = { ...data, nights, baseTotal, discount, total, room: { id: room.id, name: room.name, pricePerNight: room.pricePerNight } };
    toast({ title: "Booking created (demo)", description: `${room.name} • ${nights} nights • $${total}` });
    navigate("/confirmation", { state: payload });
  }

  return (
    <div className="container py-8">
      <Helmet>
        <title>Book Your Stay | StayEase</title>
        <meta name="description" content="Book your perfect room with secure form validation and instant pricing calculation." />
        <link rel="canonical" href={window.location.origin + "/booking"} />
      </Helmet>

      <h1 className="text-3xl font-bold">Book Now</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-lg border p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
              <FormField name="name" control={form.control} render={({ field }) => (
                <FormItem className="sm:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="email" control={form.control} render={({ field }) => (
                <FormItem className="sm:col-span-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input placeholder="you@example.com" type="email" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="phone" control={form.control} render={({ field }) => (
                <FormItem className="sm:col-span-1">
                  <FormLabel>Phone</FormLabel>
                  <FormControl><Input placeholder="+1 555 555 5555" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="guests" control={form.control} render={({ field }) => (
                <FormItem className="sm:col-span-1">
                  <FormLabel>Guests</FormLabel>
                  <FormControl><Input type="number" min={1} max={6} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="checkin" control={form.control} render={({ field }) => (
                <FormItem className="sm:col-span-1">
                  <FormLabel>Check-in</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}> 
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar selected={field.value} onSelect={field.onChange} className={cn("p-3 pointer-events-auto")} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="checkout" control={form.control} render={({ field }) => (
                <FormItem className="sm:col-span-1">
                  <FormLabel>Check-out</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}> 
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar selected={field.value} onSelect={field.onChange} className={cn("p-3 pointer-events-auto")} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="roomId" control={form.control} render={({ field }) => (
                <FormItem className="sm:col-span-1">
                  <FormLabel>Room Type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder="Select room" /></SelectTrigger>
                    <SelectContent>
                      {rooms.map((r) => (
                        <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="promo" control={form.control} render={({ field }) => (
                <FormItem className="sm:col-span-1">
                  <FormLabel>Promo Code</FormLabel>
                  <FormControl><Input placeholder="WELCOME10" {...field} /></FormControl>
                </FormItem>
              )} />

              <FormField name="requests" control={form.control} render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Special Requests</FormLabel>
                  <FormControl><Textarea placeholder="Any special needs or requests" rows={4} {...field} /></FormControl>
                </FormItem>
              )} />

              <div className="sm:col-span-2 flex justify-end gap-3 mt-2">
                <Button type="button" variant="secondary" onClick={() => form.reset()}>Reset</Button>
                <Button type="submit">Confirm Booking</Button>
              </div>
            </form>
          </Form>
        </section>

        <aside className="rounded-lg border p-6 h-fit">
          <h2 className="text-lg font-semibold">Pricing</h2>
          <div className="mt-3 space-y-1 text-sm">
            <p>Room: <span className="font-medium">{room.name}</span></p>
            <p>Price per night: <span className="font-medium">${room.pricePerNight}</span></p>
            <p>Nights: <span className="font-medium">{nights}</span></p>
            {discount > 0 && <p>Discount: <span className="font-medium text-green-600">-${discount}</span></p>}
            <p className="pt-2 border-t font-semibold">Total: ${total}</p>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">This is a demo. For real bookings, we'll connect Supabase and email confirmations.</p>
        </aside>
      </div>
    </div>
  );
}
