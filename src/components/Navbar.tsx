import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, User, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "./TrustBadge";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Wrench className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">RentKart</span>
        </Link>

        {/* Desktop search */}
        <div className="hidden md:flex items-center gap-1 rounded-full border bg-secondary px-4 py-2 text-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search tools..." className="bg-transparent outline-none w-48 placeholder:text-muted-foreground" />
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/browse">
            <Button variant="ghost" size="sm">Browse</Button>
          </Link>
          <Link to="/list-tool">
            <Button variant="outline" size="sm">List a Tool</Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-card px-4 py-4 space-y-2">
          <div className="flex items-center gap-1 rounded-lg border bg-secondary px-3 py-2 text-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search tools..." className="bg-transparent outline-none w-full placeholder:text-muted-foreground" />
          </div>
          <Link to="/browse" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium">Browse Tools</Link>
          <Link to="/list-tool" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium">List a Tool</Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium">Dashboard</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium">Login</Link>
          <Link to="/signup" onClick={() => setMenuOpen(false)}>
            <Button className="w-full" size="sm">Sign Up</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
