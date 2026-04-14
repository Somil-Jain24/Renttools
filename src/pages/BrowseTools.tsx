import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToolCard } from "@/components/ToolCard";
import { tools, categories } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Filter, X } from "lucide-react";
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
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-sm mb-3">Category</h4>
        <div className="space-y-1">
          <button onClick={() => setSelectedCategory("")} className={`block w-full text-left rounded-lg px-3 py-2 text-sm ${!selectedCategory ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary'}`}>
            All Categories
          </button>
          {categories.map(c => (
            <button key={c.name} onClick={() => setSelectedCategory(c.name)} className={`block w-full text-left rounded-lg px-3 py-2 text-sm ${selectedCategory === c.name ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary'}`}>
              {c.icon} {c.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3">Price Range (₹/day)</h4>
        <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={500} step={10} className="mt-2" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>₹{priceRange[0]}</span><span>₹{priceRange[1]}</span>
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-3">Max Distance</h4>
        <Slider value={[maxDistance]} onValueChange={([v]) => setMaxDistance(v)} min={1} max={20} step={1} className="mt-2" />
        <span className="text-xs text-muted-foreground">{maxDistance} km</span>
      </div>
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} className="rounded" />
        Available only
      </label>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Browse Tools</h1>
          <div className="flex items-center gap-2">
            <Button variant={sortBy === "nearest" ? "default" : "outline"} size="sm" onClick={() => setSortBy("nearest")}>Nearest</Button>
            <Button variant={sortBy === "cheapest" ? "default" : "outline"} size="sm" onClick={() => setSortBy("cheapest")}>Cheapest</Button>
            <Button variant="outline" size="sm" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? <X className="h-4 w-4" /> : <Filter className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-20 rounded-xl border bg-card p-5">
              <FilterPanel />
            </div>
          </aside>

          {/* Mobile filters */}
          {showFilters && (
            <div className="fixed inset-0 z-40 bg-background/80 md:hidden" onClick={() => setShowFilters(false)}>
              <div className="absolute right-0 top-0 h-full w-80 bg-card border-l p-6 overflow-auto" onClick={e => e.stopPropagation()}>
                <FilterPanel />
              </div>
            </div>
          )}

          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{filtered.length} tools found</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map(t => <ToolCard key={t.id} tool={t} />)}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg font-medium">No tools found</p>
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
