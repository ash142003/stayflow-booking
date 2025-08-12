import { Helmet } from "react-helmet-async";
import HeroSearch from "@/components/home/HeroSearch";
import { rooms } from "@/data/rooms";
import RoomCard from "@/components/rooms/RoomCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>StayEase | Modern Room Booking</title>
        <meta name="description" content="Book beautiful rooms and suites. Search by date, price, and amenities with real-time availability." />
        <link rel="canonical" href={window.location.origin + "/"} />
      </Helmet>

      <div className="container pt-6">
        <HeroSearch />

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Featured Rooms</h2>
            <Button asChild variant="secondary"><Link to="/rooms">View all</Link></Button>
          </div>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((r) => (<RoomCard key={r.id} room={r} />))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
