import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, User, Wrench, ChevronDown, LayoutDashboard, Shield, UserCircle, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-card/70 backdrop-blur-xl shadow-navbar">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-success shadow-glow transition-transform duration-200 group-hover:scale-105">
            <Wrench className="h-4.5 w-4.5 text-primary-foreground" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-foreground">Rent<span className="text-primary">Kart</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/60 px-4 py-2 text-sm shadow-soft transition-shadow focus-within:shadow-card focus-within:border-primary/30">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search tools..." className="bg-transparent outline-none w-48 placeholder:text-muted-foreground text-foreground" />
        </div>

        <div className="hidden md:flex items-center gap-0.5">
          <Link to="/browse">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors">Browse</Button>
          </Link>
          <Link to="/list-tool">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors">List a Tool</Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors">About Us</Button>
          </Link>

          {!currentUser ? (
            <Link to="/signup">
              <Button size="sm" className="ml-1 bg-gradient-to-r from-primary to-success text-primary-foreground shadow-glow hover:shadow-card-hover transition-all duration-200 hover:scale-[1.02]">Register</Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 ml-2 rounded-full border border-border/60 bg-card px-2.5 py-1.5 hover:shadow-card transition-all duration-200">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-success/15">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 shadow-elevated-lg border-border/60 rounded-xl p-1">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2.5 cursor-pointer rounded-lg px-3 py-2">
                    <UserCircle className="h-4 w-4 text-muted-foreground" /> My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center gap-2.5 cursor-pointer rounded-lg px-3 py-2">
                    <LayoutDashboard className="h-4 w-4 text-muted-foreground" /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/verification" className="flex items-center gap-2.5 cursor-pointer rounded-lg px-3 py-2">
                    <Shield className="h-4 w-4 text-muted-foreground" /> Verification
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem asChild>
                  <Link to="/account" className="flex items-center gap-2.5 cursor-pointer rounded-lg px-3 py-2">
                    <Settings className="h-4 w-4 text-muted-foreground" /> My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="flex items-center gap-2.5 cursor-pointer rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <button className="md:hidden p-2 rounded-xl hover:bg-secondary transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border/60 bg-card px-4 py-5 space-y-2 animate-fade-in">
          <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-secondary/60 px-3 py-2.5 text-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search tools..." className="bg-transparent outline-none w-full placeholder:text-muted-foreground" />
          </div>
          <Link to="/browse" onClick={() => setMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors">Browse Tools</Link>
          <Link to="/list-tool" onClick={() => setMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors">List a Tool</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors">About Us</Link>

          {currentUser && (
            <>
              <div className="border-t border-border/60 pt-3 mt-3">
                <p className="text-xs text-muted-foreground mb-2 px-3 font-medium uppercase tracking-wider">Account</p>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors">My Profile</Link>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors">Dashboard</Link>
                <Link to="/verification" onClick={() => setMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors">Verification</Link>
                <Link to="/account" onClick={() => setMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors">My Account</Link>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                  setMenuOpen(false);
                }}
                className="block w-full text-left py-2.5 px-3 text-sm font-medium rounded-lg hover:bg-red-50 text-red-600 transition-colors mt-2"
              >
                Logout
              </button>
            </>
          )}

          {!currentUser && (
            <Link to="/signup" onClick={() => setMenuOpen(false)}>
              <Button className="w-full mt-2 bg-gradient-to-r from-primary to-success text-primary-foreground shadow-glow" size="sm">Register</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
