import { MapPin, ArrowRight, Zap, DollarSign, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/ToolCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";
import { tools, categories } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const Index = () => {
  const { currentUser } = useUser();

  // Determine if we're showing buyer or seller mode
  const isBuyerMode = !currentUser || currentUser.mode === "buyer";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Gradient background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-success/6" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-success/5 blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            {isBuyerMode ? "🛠️ Peer-to-Peer Tool Rental Platform" : "💰 Start Earning Today"}
          </div>

          {isBuyerMode ? (
            <>
              <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl text-foreground leading-[1.1]">
                Rent Tools <span className="text-gradient">Near You</span>
              </h1>
              <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground leading-relaxed">
                Find verified local tools with instant booking and secure deposits. Save money, avoid waste.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl text-foreground leading-[1.1]">
                Earn Money by <span className="text-gradient">Renting Your Tools</span>
              </h1>
              <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground leading-relaxed">
                Turn your idle tools into steady income. List tools in minutes and start earning today.
              </p>
            </>
          )}

          {isBuyerMode ? (
            <>
              {/* Buyer search bar */}
              <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl border border-border/60 bg-card p-3 shadow-elevated-lg md:flex-row md:items-center">
                <div className="flex flex-1 items-center gap-2.5 rounded-xl bg-secondary/70 px-4 py-3.5 transition-colors focus-within:bg-secondary">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <input placeholder="Your location" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <SearchAutocomplete />
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1.5">✅ Instant Booking</span>
                <span className="flex items-center gap-1.5">🔒 Verified Users</span>
                <span className="flex items-center gap-1.5">💳 Secure Payments</span>
                <span className="flex items-center gap-1.5">🤝 Flexible Negotiations</span>
              </div>
            </>
          ) : (
            <>
              {/* Seller CTA section */}
              <Link to="/list-tool">
                <Button className="mt-10 px-10 py-3 bg-gradient-to-r from-primary to-success text-primary-foreground shadow-glow hover:shadow-card-hover transition-all duration-200 hover:scale-[1.02] rounded-xl text-lg">
                  List a Tool
                </Button>
              </Link>

              <div className="mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
                <div className="rounded-xl border border-border/60 bg-card/50 p-4 text-center">
                  <div className="text-2xl mb-2">1️⃣</div>
                  <p className="font-semibold text-sm">Create your profile</p>
                  <p className="text-xs text-muted-foreground mt-1">Complete your seller profile in minutes</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-card/50 p-4 text-center">
                  <div className="text-2xl mb-2">2️⃣</div>
                  <p className="font-semibold text-sm">List your tools</p>
                  <p className="text-xs text-muted-foreground mt-1">Add photos and pricing for each tool</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-card/50 p-4 text-center">
                  <div className="text-2xl mb-2">3️⃣</div>
                  <p className="font-semibold text-sm">Start earning</p>
                  <p className="text-xs text-muted-foreground mt-1">Get paid securely for each rental</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1.5">✅ Zero Listing Fee</span>
                <span className="flex items-center gap-1.5">🔐 Secure Payouts</span>
                <span className="flex items-center gap-1.5">📊 Control Pricing</span>
                <span className="flex items-center gap-1.5">⭐ Build Trust Score</span>
              </div>
            </>
          )}
        </div>
      </section>

      {isBuyerMode ? (
        <>
          {/* Buyer Categories */}
          <section className="container mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Browse Categories</h2>
                <p className="text-muted-foreground mt-1.5 text-sm">Find the right tool for your project</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={`/browse?category=${encodeURIComponent(cat.name)}`}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                    <span className="text-lg mr-1">{cat.icon}</span>
                    <span className="text-sm font-semibold text-white drop-shadow-md">{cat.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Buyer Featured Tools */}
          <section className="container mx-auto px-4 pb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Tools</h2>
                <p className="text-muted-foreground mt-1.5 text-sm">Popular tools available near you</p>
              </div>
              <Link to="/browse">
                <Button variant="ghost" size="sm" className="gap-1.5 text-primary hover:text-primary hover:bg-primary/10">
                  View all <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tools.filter(t => t.available).map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Seller Benefits Section */}
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Benefits of Listing Your Tools</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Zero Listing Fee</h3>
                  <p className="text-muted-foreground text-sm mt-1">No upfront costs to list your tools</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Instant Bookings</h3>
                  <p className="text-muted-foreground text-sm mt-1">Get paid instantly when tools are rented</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Verified Renters</h3>
                  <p className="text-muted-foreground text-sm mt-1">Rent to verified and trusted renters</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Build Your Reputation</h3>
                  <p className="text-muted-foreground text-sm mt-1">Earn a seller trust score and grow your income</p>
                </div>
              </div>
            </div>
          </section>

          {/* Seller Top Performing Tools */}
          <section className="container mx-auto px-4 pb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Top Performing Tool Categories</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <div className="text-2xl mb-3">🔨</div>
                <h3 className="font-semibold text-lg">Power Drills</h3>
                <p className="text-muted-foreground text-sm mt-2">~45 rentals/month</p>
                <p className="text-success font-semibold text-sm mt-1">Average ₹2,500/month</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <div className="text-2xl mb-3">📐</div>
                <h3 className="font-semibold text-lg">Ladders</h3>
                <p className="text-muted-foreground text-sm mt-2">~32 rentals/month</p>
                <p className="text-success font-semibold text-sm mt-1">Average ₹1,800/month</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-card p-6">
                <div className="text-2xl mb-3">🪚</div>
                <h3 className="font-semibold text-lg">Power Saws</h3>
                <p className="text-muted-foreground text-sm mt-2">~28 rentals/month</p>
                <p className="text-success font-semibold text-sm mt-1">Average ₹2,200/month</p>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Index;
