import { Helmet } from "react-helmet-async";
import HeroSearch from "@/components/home/HeroSearch";
import { rooms } from "@/data/rooms";
import RoomCard from "@/components/rooms/RoomCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Sunny Hotel | Modern Room Booking in Mumbai</title>
        <meta
          name="description"
          content="Book beautiful rooms at Sunny Hotel in Mumbai. Check availability by date and amenities with real-time updates."
        />
        <link
          rel="canonical"
          href={`${window.location.origin}${import.meta.env.BASE_URL}`}
        />
      </Helmet>

      <div className="container pt-6">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-700">
            Welcome to Sunny Hotel
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Your Premier Stay in Mumbai
          </p>
        </div>

        {/* Search Component */}
        <HeroSearch />

        {/* Featured Rooms */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Featured Rooms</h2>
            <Button asChild variant="secondary">
              <Link to="/rooms">View all</Link>
            </Button>
          </div>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
