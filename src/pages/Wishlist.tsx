import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MapPin, Star, Lock, Zap, Trash2 } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { wishlistItems, tools, categories } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const Wishlist = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { toast } = useToast();
  const [wishlist, setWishlist] = useState(wishlistItems.filter(w => w.userId === currentUser?.id));

  // Access control
  if (!currentUser) {
    navigate("/signup");
    return null;
  }

  if (currentUser.mode !== "buyer") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Buyer Mode Required</h1>
            <p className="text-muted-foreground mb-6">
              Switch to Buyer Mode to view your wishlist.
            </p>
            <Button onClick={() => navigate("/profile")}>
              Go to Profile
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const wishlistTools = wishlist
    .map(item => tools.find(t => t.id === item.toolId))
    .filter((tool): tool is typeof tools[0] => tool !== undefined);

  const handleRemoveFromWishlist = (toolId: string) => {
    setWishlist(wishlist.filter(w => w.toolId !== toolId));
    toast({ title: "Removed", description: "Tool removed from wishlist" });
  };

  const handleQuickRent = (toolId: string) => {
    navigate(`/tools/${toolId}?focus=dates`);
    toast({ title: "Info", description: "Scroll down to select rental dates" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="container mx-auto flex-1 px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500 fill-red-500" /> Wishlist
          </h1>
          <p className="text-muted-foreground">
            {wishlistTools.length} {wishlistTools.length === 1 ? "tool" : "tools"} saved
          </p>
        </div>

        {wishlistTools.length > 0 ? (
          <>
            {/* Grid of Wishlist Items */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {wishlistTools.map((tool) => {
                const category = categories.find(c => c.name === tool.category);
                
                return (
                  <Card key={tool.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Tool Image */}
                    <div className="relative aspect-video bg-muted overflow-hidden">
                      <img
                        src={tool.images[0]}
                        alt={tool.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => handleRemoveFromWishlist(tool.id)}
                          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
                          title="Remove from wishlist"
                        >
                          <Heart className="h-5 w-5 fill-white" />
                        </button>
                      </div>
                      {!tool.available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-semibold">Not Available</span>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4 space-y-3">
                      {/* Category Badge */}
                      <div>
                        <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1 w-fit">
                          {category?.icon} {tool.subcategory || tool.category}
                        </span>
                      </div>

                      {/* Tool Name */}
                      <div>
                        <Link
                          to={`/tools/${tool.id}`}
                          className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2"
                        >
                          {tool.name}
                        </Link>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {tool.description}
                      </p>

                      {/* Owner Info */}
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          <span className="text-xs font-semibold">{tool.owner.name[0]}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">{tool.owner.name}</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            <span className="text-xs font-medium">{tool.owner.trustScore}/100</span>
                          </div>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{tool.location}</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-primary">₹{tool.pricePerDay}</span>
                        <span className="text-xs text-muted-foreground">/day</span>
                      </div>

                      {/* Deposit Info */}
                      <p className="text-xs text-muted-foreground">
                        Security deposit: <span className="font-semibold">₹{tool.deposit}</span>
                      </p>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          asChild
                        >
                          <Link to={`/tools/${tool.id}`} className="flex items-center justify-center gap-1">
                            View Details
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          className="w-full flex items-center justify-center gap-1"
                          disabled={!tool.available}
                          onClick={() => handleQuickRent(tool.id)}
                        >
                          <Zap className="h-4 w-4" /> Rent
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Recommendations Section */}
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-2xl font-bold mb-4">You Might Also Like</h2>
              <p className="text-muted-foreground mb-6">
                Similar tools that might interest you
              </p>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tools
                  .filter(t => !wishlistTools.find(w => w.id === t.id))
                  .slice(0, 3)
                  .map((tool) => {
                    const category = categories.find(c => c.name === tool.category);
                    
                    return (
                      <Card key={tool.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative aspect-video bg-muted overflow-hidden">
                          <img
                            src={tool.images[0]}
                            alt={tool.name}
                            className="w-full h-full object-cover"
                          />
                          {!tool.available && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white font-semibold">Not Available</span>
                            </div>
                          )}
                        </div>

                        <CardContent className="p-4 space-y-3">
                          <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1 w-fit">
                            {category?.icon} {tool.subcategory || tool.category}
                          </span>

                          <Link
                            to={`/tools/${tool.id}`}
                            className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2 block"
                          >
                            {tool.name}
                          </Link>

                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-primary">₹{tool.pricePerDay}</span>
                            <span className="text-xs text-muted-foreground">/day</span>
                          </div>

                          <Button
                            size="sm"
                            className="w-full"
                            disabled={!tool.available}
                          >
                            Add to Wishlist
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md text-center">
              Start adding tools to your wishlist! When you like a tool, you can quickly rent it later.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/browse")}
            >
              Browse Tools
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
