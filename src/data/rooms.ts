import hero from "@/assets/hero.jpg";
import single1 from "@/assets/room-single-1.jpg";
import single2 from "@/assets/room-single-2.jpg";
import deluxe1 from "@/assets/room-deluxe-1.jpg";
import deluxe2 from "@/assets/room-deluxe-2.jpg";
import suite1 from "@/assets/room-suite-1.jpg";
import suite2 from "@/assets/room-suite-2.jpg";

export type RoomType = "Single" | "Double" | "Deluxe" | "Suite";

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  location: string;
  pricePerNight: number;
  images: string[];
  thumbnail: string;
  description: string;
  amenities: string[];
  rating: number;
  reviews: number;
  unavailableDates: string[]; // ISO date strings
}

export const rooms: Room[] = [
  {
    id: "r1",
    name: "Cozy Single Room",
    type: "Single",
    location: "Downtown, New York",
    pricePerNight: 109,
    images: [single1, single2],
    thumbnail: single1,
    description:
      "A warm and comfortable single room ideal for solo travelers. Includes a plush bed, study desk, and a serene city view.",
    amenities: ["Free Wi‑Fi", "Air Conditioning", "Smart TV", "Work Desk", "Room Service"],
    rating: 4.5,
    reviews: 128,
    unavailableDates: [
      "2025-08-20",
      "2025-08-21",
      "2025-09-05",
      "2025-09-12",
    ],
  },
  {
    id: "r2",
    name: "Deluxe Double Room",
    type: "Deluxe",
    location: "Midtown, New York",
    pricePerNight: 189,
    images: [deluxe1, deluxe2],
    thumbnail: deluxe1,
    description:
      "Spacious deluxe room with two beds, lounge area, and panoramic window. Perfect for couples or friends seeking comfort and style.",
    amenities: ["Free Wi‑Fi", "Air Conditioning", "55\" TV", "Minibar", "In-room Safe"],
    rating: 4.7,
    reviews: 221,
    unavailableDates: [
      "2025-08-25",
      "2025-08-26",
      "2025-09-18",
    ],
  },
  {
    id: "r3",
    name: "Executive Luxury Suite",
    type: "Suite",
    location: "Uptown, New York",
    pricePerNight: 329,
    images: [suite1, suite2],
    thumbnail: suite1,
    description:
      "Indulge in a refined suite featuring a separate living area, king-size bed, and premium finishes for an unforgettable stay.",
    amenities: [
      "Free Wi‑Fi",
      "Air Conditioning",
      "65\" TV",
      "Coffee Machine",
      "Walk-in Wardrobe",
      "Butler Service",
    ],
    rating: 4.9,
    reviews: 87,
    unavailableDates: [
      "2025-08-22",
      "2025-09-02",
      "2025-09-03",
    ],
  },
];

export const heroImage = hero;
