import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";

export default function ConfirmationPage() {
  const { state } = useLocation() as { state?: any };
  const data = state;

  return (
    <div className="container py-10">
      <Helmet>
        <title>Booking Confirmation | ROOM BOOKING</title>
        <meta name="description" content="Your booking is confirmed. See your reservation details and next steps." />
        <link rel="canonical" href={window.location.origin + "/confirmation"} />
      </Helmet>

      <h1 className="text-3xl font-bold">Booking Confirmation</h1>
      {!data ? (
        <div className="mt-4">
          <p className="text-muted-foreground">No booking found. Please make a reservation first.</p>
          <Button asChild className="mt-4"><Link to="/rooms">Browse Rooms</Link></Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 rounded-lg border p-6 sm:max-w-xl">
          <p><span className="font-medium">Guest:</span> {data.name}</p>
          <p><span className="font-medium">Email:</span> {data.email}</p>
          <p><span className="font-medium">Phone:</span> {data.phone}</p>
          <p><span className="font-medium">Room:</span> {data.room.name}</p>
          <p><span className="font-medium">Check-in:</span> {new Date(data.checkin).toDateString()}</p>
          <p><span className="font-medium">Check-out:</span> {new Date(data.checkout).toDateString()}</p>
          <p><span className="font-medium">Nights:</span> {data.nights}</p>
          <p className="border-t pt-2"><span className="font-semibold">Total:</span> {formatINR(data.total)}</p>
          <p className="text-xs text-muted-foreground">A confirmation email will be sent when email service is connected.</p>
          <div className="flex gap-3 pt-2">
            <Button asChild variant="secondary"><Link to="/rooms">Book another room</Link></Button>
            <Button asChild><Link to="/">Back to Home</Link></Button>
          </div>
        </div>
      )}
    </div>
  );
}
