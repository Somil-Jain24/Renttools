import { Search, MapPin } from "lucide-react";
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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl text-foreground">
            Rent Tools <span className="text-primary">Near You</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
            Borrow tools from neighbors and save money. No need to buy what you'll only use once.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border bg-card p-3 shadow-elevated md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-secondary px-4 py-3">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
              <input placeholder="Your location" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-xl bg-secondary px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input placeholder="Drill, ladder, saw..." className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
            </div>
            <Link to="/browse">
              <Button className="w-full md:w-auto px-8">Search</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-foreground mb-6">Browse Categories</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/browse?category=${encodeURIComponent(cat.name)}`}
              className="group relative overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-card-hover"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-3 text-center">
                <span className="text-lg mr-1">{cat.icon}</span>
                <span className="text-sm font-medium text-card-foreground">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Featured Tools</h2>
          <Link to="/browse">
            <Button variant="ghost" size="sm">View all →</Button>
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
