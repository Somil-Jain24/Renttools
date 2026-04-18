import { useState, useMemo } from "react";
import { tools } from "@/lib/mockData";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchAutocompleteProps {
  placeholder?: string;
  className?: string;
}

export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  placeholder = "Drill, ladder, saw...",
  className = "",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Get unique tool names and categories for suggestions
  const allSearchableItems = useMemo(() => {
    const items = new Set<string>();

    // Add tool names
    tools.forEach((tool) => {
      items.add(tool.name);
    });

    // Add categories
    tools.forEach((tool) => {
      items.add(tool.category);
      if (tool.subcategory) {
        items.add(tool.subcategory);
      }
    });

    return Array.from(items).sort();
  }, []);

  // Filter suggestions based on query
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase();
    return allSearchableItems
      .filter((item) => item.toLowerCase().includes(query))
      .slice(0, 8); // Limit to 8 suggestions
  }, [searchQuery, allSearchableItems]);

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setIsOpen(false);
    // Navigate to browse page with search query
    const matchingCategory = tools.find(
      (t) =>
        t.category.toLowerCase() === suggestion.toLowerCase() ||
        t.subcategory?.toLowerCase() === suggestion.toLowerCase()
    );

    if (matchingCategory) {
      navigate(`/browse?category=${encodeURIComponent(matchingCategory.category)}`);
    } else {
      navigate(`/browse?search=${encodeURIComponent(suggestion)}`);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsOpen(false);
      navigate(`/browse?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="flex flex-1 items-center gap-2.5 rounded-xl bg-secondary/70 px-4 py-3.5 transition-colors focus-within:bg-secondary">
        <Search className="h-4 w-4 text-primary shrink-0" />
        <input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setIsOpen(false);
            }}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/60 rounded-xl shadow-elevated-lg z-50">
          <div className="max-h-64 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSelectSuggestion(suggestion)}
                className="w-full text-left px-4 py-2.5 hover:bg-secondary/60 transition-colors border-b border-border/30 last:border-b-0 text-sm"
              >
                <div className="flex items-center gap-2">
                  <Search className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-foreground">{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
