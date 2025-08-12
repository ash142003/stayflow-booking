import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const NavItem = ({ to, label }: { to: string; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
        isActive ? "text-primary" : "text-foreground/80"
      }`
    }
  >
    {label}
  </NavLink>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-primary/60" />
          <span className="text-lg font-semibold">ROOM BOOKING</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <NavItem to="/" label="Home" />
          <NavItem to="/rooms" label="Rooms" />
          <NavItem to="/contact" label="Contact" />
          <Button asChild variant="default" className="ml-2">
            <Link to={location.pathname.startsWith("/booking") ? "/rooms" : "/booking"}>
              Book Now
            </Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-2">
                <NavLink onClick={() => setOpen(false)} to="/" className="px-3 py-2 rounded-md hover:bg-accent">Home</NavLink>
                <NavLink onClick={() => setOpen(false)} to="/rooms" className="px-3 py-2 rounded-md hover:bg-accent">Rooms</NavLink>
                <NavLink onClick={() => setOpen(false)} to="/contact" className="px-3 py-2 rounded-md hover:bg-accent">Contact</NavLink>
                <Button asChild className="mt-2">
                  <Link to="/booking" onClick={() => setOpen(false)}>Book Now</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}