import { Search, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/ToolCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { tools, categories } from "@/lib/mockData";
import { Link } from "react-router-dom";

const Index = () => {
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
            🛠️ Peer-to-Peer Tool Rental Platform
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl text-foreground leading-[1.1]">
            Rent Tools <span className="text-gradient">Near You</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground leading-relaxed">
            Borrow tools from neighbors and save money. No need to buy what you'll only use once.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl border border-border/60 bg-card p-3 shadow-elevated-lg md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-2.5 rounded-xl bg-secondary/70 px-4 py-3.5 transition-colors focus-within:bg-secondary">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <input placeholder="Your location" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            </div>
            <div className="flex flex-1 items-center gap-2.5 rounded-xl bg-secondary/70 px-4 py-3.5 transition-colors focus-within:bg-secondary">
              <Search className="h-4 w-4 text-primary shrink-0" />
              <input placeholder="Drill, ladder, saw..." className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            </div>
            <Link to="/browse">
              <Button className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-primary to-success text-primary-foreground shadow-glow hover:shadow-card-hover transition-all duration-200 hover:scale-[1.02] rounded-xl">Search</Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">✅ Free to list</span>
            <span className="flex items-center gap-1.5">🔒 Verified users</span>
            <span className="flex items-center gap-1.5">⚡ Instant booking</span>
          </div>
        </div>
      </section>

      {/* Categories */}
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

      {/* Featured Tools */}
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

      <Footer />
    </div>
  );
};

export default Index;
