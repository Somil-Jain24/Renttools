import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Menu, X, User, Wrench, ChevronDown, LayoutDashboard, Shield, UserCircle, Settings, LogOut, Moon, Sun, ShoppingBag, Plus, BarChart3, DollarSign, Bell, Heart, BookOpen, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { useTheme } from "@/context/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout, switchMode } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  // Get navbar items based on current mode
  const getNavItems = () => {
    if (!currentUser) {
      return [
        { label: "Browse", href: "/browse", icon: ShoppingBag },
        { label: "How it works", href: "/how-it-works", icon: BookOpen },
        { label: "About", href: "/about", icon: UserCircle },
      ];
    }

    if (currentUser.mode === "buyer") {
      return [
        { label: "Browse", href: "/browse", icon: ShoppingBag },
        { label: "My Rentals", href: "/my-rentals", icon: Package },
        { label: "My Orders", href: "/my-orders", icon: LayoutDashboard },
        { label: "Requests", href: "/requests", icon: Bell },
        { label: "Wishlist", href: "/wishlist", icon: Heart },
      ];
    } else {
      // Seller mode
      return [
        { label: "Dashboard", href: "/seller-dashboard", icon: LayoutDashboard },
        { label: "My Listings", href: "/my-listings", icon: ShoppingBag },
        { label: "Requests", href: "/requests", icon: Bell },
        { label: "Earnings", href: "/earnings", icon: DollarSign },
        { label: "Analytics", href: "/analytics", icon: BarChart3 },
        { label: "List Tool", href: "/list-tool", icon: Plus },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-card/70 backdrop-blur-xl shadow-navbar">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-success shadow-glow transition-transform duration-200 group-hover:scale-105">
            <Wrench className="h-4.5 w-4.5 text-primary-foreground" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-foreground">Rent<span className="text-primary">Kart</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/60 px-4 py-2 text-sm shadow-soft transition-shadow focus-within:shadow-card focus-within:border-primary/30 w-full max-w-[500px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search tools..." className="bg-transparent outline-none w-48 placeholder:text-muted-foreground text-foreground" />
        </div>

        <div className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={`text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors ${
                  location.pathname === item.href ? 'text-foreground bg-secondary/80' : ''
                }`}
              >
                <item.icon className="h-4 w-4 mr-1" />
                <span className="hidden lg:inline">{item.label}</span>
              </Button>
            </Link>
          ))}

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>

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
              <DropdownMenuContent align="end" className="w-56 shadow-elevated-lg border-border/60 rounded-xl p-1">
                <div className="px-3 py-2 border-b border-border/60">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">ACCOUNT</p>
                </div>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2.5 cursor-pointer rounded-lg px-3 py-2">
                    <UserCircle className="h-4 w-4 text-muted-foreground" /> My Profile
                  </Link>
                </DropdownMenuItem>

                {currentUser.isSeller && (
                  <>
                    <DropdownMenuSeparator className="my-1" />
                    <div className="px-3 py-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">MODE</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={currentUser.mode === "buyer" ? "default" : "outline"}
                          className="flex-1 text-xs"
                          onClick={() => switchMode("buyer")}
                        >
                          Buyer
                        </Button>
                        <Button
                          size="sm"
                          variant={currentUser.mode === "seller" ? "default" : "outline"}
                          className="flex-1 text-xs"
                          onClick={() => switchMode("seller")}
                        >
                          Seller
                        </Button>
                      </div>
                    </div>
                    {currentUser.mode === "seller" && (
                      <>
                        <DropdownMenuSeparator className="my-1" />
                        <DropdownMenuItem asChild>
                          <Link to="/seller-profile" className="flex items-center gap-2.5 cursor-pointer rounded-lg px-3 py-2">
                            <Shield className="h-4 w-4 text-muted-foreground" /> KYC & Profile
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                  </>
                )}

                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem asChild>
                  <Link to="/verification" className="flex items-center gap-2.5 cursor-pointer rounded-lg px-3 py-2">
                    <Shield className="h-4 w-4 text-muted-foreground" /> Verification
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/account" className="flex items-center gap-2.5 cursor-pointer rounded-lg px-3 py-2">
                    <Settings className="h-4 w-4 text-muted-foreground" /> Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    navigate("/");
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2.5 cursor-pointer rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-secondary transition-colors"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <button className="p-2 rounded-xl hover:bg-secondary transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border/60 bg-card px-4 py-5 space-y-2 animate-fade-in">
          <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-secondary/60 px-3 py-2.5 text-sm">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search tools..." className="bg-transparent outline-none w-full placeholder:text-muted-foreground" />
          </div>

          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 py-2.5 px-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors ${
                location.pathname === item.href ? 'bg-secondary text-foreground' : ''
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}

          {currentUser && (
            <>
              <div className="border-t border-border/60 pt-3 mt-3">
                <p className="text-xs text-muted-foreground mb-3 px-3 font-medium uppercase tracking-wider">Account</p>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors">My Profile</Link>

                {currentUser.isSeller && (
                  <>
                    <div className="mt-2 pt-2 border-t border-border/60">
                      <p className="text-xs text-muted-foreground mb-2 px-3 font-medium uppercase tracking-wider">Mode</p>
                      <div className="flex gap-2 px-3">
                        <Button
                          size="sm"
                          variant={currentUser.mode === "buyer" ? "default" : "outline"}
                          className="flex-1 text-xs"
                          onClick={() => {
                            switchMode("buyer");
                            setMenuOpen(false);
                          }}
                        >
                          Buyer
                        </Button>
                        <Button
                          size="sm"
                          variant={currentUser.mode === "seller" ? "default" : "outline"}
                          className="flex-1 text-xs"
                          onClick={() => {
                            switchMode("seller");
                            setMenuOpen(false);
                          }}
                        >
                          Seller
                        </Button>
                      </div>
                    </div>
                    {currentUser.mode === "seller" && (
                      <Link to="/seller-profile" onClick={() => setMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors mt-2">KYC & Profile</Link>
                    )}
                  </>
                )}

                <Link to="/verification" onClick={() => setMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors mt-2">Verification</Link>
                <Link to="/account" onClick={() => setMenuOpen(false)} className="block py-2.5 px-3 text-sm font-medium rounded-lg hover:bg-secondary transition-colors">Settings</Link>
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
