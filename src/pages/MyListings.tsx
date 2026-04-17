import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Edit2, Pause, Play, Eye, Trash2, Plus } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { sellerListings, tools } from "@/lib/mockData";

const MyListings = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [statusFilter, setStatusFilter] = useState<"all" | "Active" | "Paused" | "Inactive">("all");
  const [listings, setListings] = useState(sellerListings);

  // Access control
  if (!currentUser) {
    navigate("/signup");
    return null;
  }

  if (currentUser.mode !== "seller") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Seller Mode Required</h1>
            <p className="text-muted-foreground mb-6">
              Switch to Seller Mode to manage your listings.
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

  // Get seller's listings
  const sellerToolListings = listings.filter(l => l.sellerId === currentUser.id);
  
  // Filter by status
  const filteredListings = statusFilter === "all"
    ? sellerToolListings
    : sellerToolListings.filter(l => l.status === statusFilter);

  // Toggle listing status
  const toggleListingStatus = (listingId: string) => {
    setListings(listings.map(l =>
      l.id === listingId
        ? { ...l, status: l.status === "Active" ? "Paused" : "Active" }
        : l
    ));
  };

  // Delete listing
  const deleteListing = (listingId: string) => {
    setListings(listings.filter(l => l.id !== listingId));
  };

  // Calculate stats
  const activeCount = sellerToolListings.filter(l => l.status === "Active").length;
  const totalViews = sellerToolListings.reduce((sum, l) => sum + l.views, 0);
  const totalBookings = sellerToolListings.reduce((sum, l) => sum + l.bookings, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="container mx-auto flex-1 px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Listings</h1>
            <p className="text-muted-foreground">Manage your tools and track performance</p>
          </div>
          <Button size="lg" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add New Tool
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{sellerToolListings.length}</div>
              <p className="text-xs text-muted-foreground mt-1">{activeCount} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalBookings}</div>
              <p className="text-xs text-muted-foreground mt-1">Confirmed rentals</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {totalViews > 0 ? ((totalBookings / totalViews) * 100).toFixed(1) : "0"}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Views to bookings</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground py-2">Filter:</span>
          {(["all", "Active", "Paused", "Inactive"] as const).map(status => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
              className="capitalize"
            >
              {status === "all" ? "All Listings" : status}
            </Button>
          ))}
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map(listing => {
              const tool = tools.find(t => t.id === listing.toolId);
              if (!tool) return null;

              const statusColor = {
                "Active": "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300",
                "Paused": "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300",
                "Inactive": "bg-gray-100 dark:bg-gray-950 text-gray-700 dark:text-gray-300",
              }[listing.status];

              return (
                <Card key={listing.id} className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow">
                  {/* Tool Image */}
                  {tool.images && tool.images[0] && (
                    <div className="relative h-40 bg-muted overflow-hidden">
                      <img
                        src={tool.images[0]}
                        alt={tool.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                      <span className={`absolute top-3 right-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor}`}>
                        {listing.status}
                      </span>
                    </div>
                  )}

                  {/* Tool Details */}
                  <CardHeader className="pb-3">
                    <div>
                      <CardTitle className="text-base mb-1">{tool.name}</CardTitle>
                      <CardDescription className="text-xs">{tool.category}</CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="pb-4 flex-1">
                    {/* Price and Deposit */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Price/Day:</span>
                        <span className="font-semibold">₹{tool.pricePerDay}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Security Deposit:</span>
                        <span className="font-semibold">₹{tool.deposit}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" /> Views
                        </span>
                        <span>{listing.views}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Bookings</span>
                        <span>{listing.bookings}</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border/50 mb-4"></div>

                    {/* Description (truncated) */}
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                      {tool.description}
                    </p>
                  </CardContent>

                  {/* Actions */}
                  <div className="border-t border-border/50 p-3 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => navigate(`/list-tool?edit=${listing.id}`)}
                      >
                        <Edit2 className="h-3 w-3" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => toggleListingStatus(listing.id)}
                      >
                        {listing.status === "Active" ? (
                          <>
                            <Pause className="h-3 w-3" /> Pause
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3" /> Activate
                          </>
                        )}
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center gap-1"
                      onClick={() => navigate(`/tools/${listing.toolId}`)}
                    >
                      <Eye className="h-3 w-3" /> View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-1"
                      onClick={() => deleteListing(listing.id)}
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">No Listings Found</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {statusFilter === "all"
                      ? "Start by adding your first tool to begin earning!"
                      : `No ${statusFilter.toLowerCase()} listings found. Try a different filter.`}
                  </p>
                </div>
                <Button onClick={() => navigate("/list-tool")} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Your First Tool
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyListings;
