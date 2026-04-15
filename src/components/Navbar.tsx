import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, User, Wrench, ChevronDown, LayoutDashboard, Shield, UserCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Wrench className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">RentKart</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 rounded-full border bg-secondary px-4 py-2 text-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search tools..." className="bg-transparent outline-none w-48 placeholder:text-muted-foreground" />
        </div>

        <div className="hidden md:flex items-center gap-1">
          <Link to="/browse">
            <Button variant="ghost" size="sm">Browse</Button>
          </Link>
          <Link to="/list-tool">
            <Button variant="ghost" size="sm">List a Tool</Button>
          </Link>
          <Link to="/how-it-works">
            <Button variant="ghost" size="sm">How It Works</Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost" size="sm">About Us</Button>
          </Link>
          <Link to="/faq">
            <Button variant="ghost" size="sm">FAQ</Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Register</Button>
          </Link>

          {/* My Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 ml-1 rounded-full bg-muted px-2 py-1.5 hover:bg-muted/80 transition-colors">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                  <UserCircle className="h-4 w-4" /> My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer">
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/verification" className="flex items-center gap-2 cursor-pointer">
                  <Shield className="h-4 w-4" /> Verification
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/account" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" /> My Account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t bg-card px-4 py-4 space-y-2">
          <div className="flex items-center gap-1 rounded-lg border bg-secondary px-3 py-2 text-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search tools..." className="bg-transparent outline-none w-full placeholder:text-muted-foreground" />
          </div>
          <Link to="/browse" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium">Browse Tools</Link>
          <Link to="/list-tool" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium">List a Tool</Link>
          <Link to="/how-it-works" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium">How It Works</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium">About Us</Link>
          <Link to="/faq" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium">FAQ</Link>
          <div className="border-t pt-2 mt-2">
            <p className="text-xs text-muted-foreground mb-2">Account</p>
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium">My Profile</Link>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium">Dashboard</Link>
            <Link to="/verification" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium">Verification</Link>
            <Link to="/account" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium">My Account</Link>
          </div>
          <Link to="/register" onClick={() => setMenuOpen(false)}>
            <Button className="w-full" size="sm">Register</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
