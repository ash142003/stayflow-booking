import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">ROOM BOOKING</h3>
            <p className="mt-2 text-muted-foreground">
              Modern, comfortable stays designed for your perfect trip.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link className="hover:underline" to="/">Home</Link></li>
              <li><Link className="hover:underline" to="/rooms">Rooms</Link></li>
              <li><Link className="hover:underline" to="/booking">Book Now</Link></li>
              <li><Link className="hover:underline" to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
            <div className="flex items-center gap-3">
              <a className="p-2 rounded-md border hover:bg-accent" href="#" aria-label="Facebook"><Facebook className="h-5 w-5"/></a>
              <a className="p-2 rounded-md border hover:bg-accent" href="#" aria-label="Instagram"><Instagram className="h-5 w-5"/></a>
              <a className="p-2 rounded-md border hover:bg-accent" href="#" aria-label="Twitter"><Twitter className="h-5 w-5"/></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} ROOM BOOKING. All rights reserved.</p>
          <p>
            <a className="hover:underline" href="#">Privacy Policy</a> · {" "}
            <a className="hover:underline" href="#">Terms</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
