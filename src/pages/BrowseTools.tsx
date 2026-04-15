import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToolCard } from "@/components/ToolCard";
import { tools, categories } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const BrowseTools = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [maxDistance, setMaxDistance] = useState(10);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"nearest" | "cheapest">("nearest");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...tools];
    if (selectedCategory) result = result.filter(t => t.category === selectedCategory);
    result = result.filter(t => t.pricePerDay >= priceRange[0] && t.pricePerDay <= priceRange[1]);
    result = result.filter(t => t.distance <= maxDistance);
    if (availableOnly) result = result.filter(t => t.available);
    result.sort((a, b) => sortBy === "nearest" ? a.distance - b.distance : a.pricePerDay - b.pricePerDay);
    return result;
  }, [selectedCategory, priceRange, maxDistance, availableOnly, sortBy]);

  const FilterPanel = () => (
    <div className="space-y-7">
      <div>
        <h4 className="font-bold text-sm mb-3 text-foreground flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-primary" />
          Category
        </h4>
        <div className="space-y-0.5">
          <button onClick={() => setSelectedCategory("")} className={`block w-full text-left rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${!selectedCategory ? 'bg-primary/10 text-primary font-semibold shadow-soft' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
            All Categories
          </button>
          {categories.map(c => (
            <button key={c.name} onClick={() => setSelectedCategory(c.name)} className={`block w-full text-left rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${selectedCategory === c.name ? 'bg-primary/10 text-primary font-semibold shadow-soft' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}>
              <span className="mr-2">{c.icon}</span>{c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-border/60 pt-6">
        <h4 className="font-bold text-sm mb-4 text-foreground flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-primary" />
          Price Range (₹/day)
        </h4>
        <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={500} step={10} className="mt-2" />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span className="font-semibold bg-secondary rounded-md px-2 py-0.5">₹{priceRange[0]}</span>
          <span className="font-semibold bg-secondary rounded-md px-2 py-0.5">₹{priceRange[1]}</span>
        </div>
      </div>

      <div className="border-t border-border/60 pt-6">
        <h4 className="font-bold text-sm mb-4 text-foreground flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-primary" />
          Max Distance
        </h4>
        <Slider value={[maxDistance]} onValueChange={([v]) => setMaxDistance(v)} min={1} max={20} step={1} className="mt-2" />
        <span className="text-xs font-semibold text-muted-foreground bg-secondary rounded-md px-2 py-0.5 mt-2 inline-block">{maxDistance} km</span>
      </div>

      <div className="border-t border-border/60 pt-6">
        <label className="flex items-center gap-3 text-sm cursor-pointer group">
          <div className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${availableOnly ? 'bg-primary border-primary' : 'border-border hover:border-primary/50'}`}>
            {availableOnly && <span className="text-primary-foreground text-xs font-bold">✓</span>}
          </div>
          <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} className="hidden" />
          <span className="text-foreground font-medium">Available only</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Browse Tools</h1>
            <p className="text-sm text-muted-foreground mt-1">{filtered.length} tools available</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center bg-secondary/80 rounded-xl p-1 border border-border/60">
              <Button variant={sortBy === "nearest" ? "default" : "ghost"} size="sm" onClick={() => setSortBy("nearest")} className={`rounded-lg text-xs ${sortBy === "nearest" ? "bg-card shadow-soft" : ""}`}>Nearest</Button>
              <Button variant={sortBy === "cheapest" ? "default" : "ghost"} size="sm" onClick={() => setSortBy("cheapest")} className={`rounded-lg text-xs ${sortBy === "cheapest" ? "bg-card shadow-soft" : ""}`}>Cheapest</Button>
            </div>
            <Button variant="outline" size="sm" className="md:hidden rounded-xl border-border/60" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-20 rounded-2xl border border-border/60 bg-card p-6 shadow-card">
              <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                <h3 className="font-bold text-foreground">Filters</h3>
              </div>
              <FilterPanel />
            </div>
          </aside>

          {showFilters && (
            <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden" onClick={() => setShowFilters(false)}>
              <div className="absolute right-0 top-0 h-full w-80 bg-card border-l border-border/60 p-6 overflow-auto shadow-elevated-lg animate-fade-in" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-primary" />
                    <h3 className="font-bold text-foreground">Filters</h3>
                  </div>
                  <button onClick={() => setShowFilters(false)} className="p-1 rounded-lg hover:bg-secondary transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <FilterPanel />
              </div>
            </div>
          )}

          <div className="flex-1">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map(t => <ToolCard key={t.id} tool={t} />)}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-24 text-muted-foreground">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-lg font-semibold text-foreground">No tools found</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseTools;
