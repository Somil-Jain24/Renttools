import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { ShoppingBag, Bell, DollarSign, BarChart3, Star, Edit2, Pause, Eye } from "lucide-react";

const SellerDashboard = () => {
  const { currentUser } = useUser();
  const [selectedTab, setSelectedTab] = useState("listings");

  // Mock data for seller
  const myListings = [
    {
      id: "list-1",
      name: "Cordless Drill",
      price: 350,
      views: 245,
      status: "Active" as const,
      availability: "Available",
    },
    {
      id: "list-2",
      name: "Extension Ladder",
      price: 200,
      views: 189,
      status: "Active" as const,
      availability: "Available",
    },
    {
      id: "list-3",
      name: "Jigsaw",
      price: 280,
      views: 156,
      status: "Paused" as const,
      availability: "Out of stock",
    },
  ];

  const incomingRequests = [
    {
      id: "req-1",
      buyerName: "John Buyer",
      toolName: "Cordless Drill",
      proposedPrice: 300,
      listedPrice: 350,
      startDate: "2025-01-20",
      endDate: "2025-01-22",
      buyerScore: 88,
      status: "New" as const,
    },
    {
      id: "req-2",
      buyerName: "Jane Renter",
      toolName: "Extension Ladder",
      proposedPrice: 180,
      listedPrice: 200,
      startDate: "2025-01-25",
      endDate: "2025-01-26",
      buyerScore: 92,
      status: "New" as const,
    },
  ];

  const earningsData = {
    totalEarnings: 15420,
    currentMonthEarnings: 2850,
    pendingPayments: 450,
    totalRentals: 47,
  };

  const analyticsData = {
    totalViews: 1240,
    bookingRate: 18.5,
    topTool: "Cordless Drill",
    thisMonthViews: 245,
    thisMonthBookings: 12,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto flex-1 px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
          <p className="text-muted-foreground">Manage your listings, requests, and earnings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹{earningsData.totalEarnings}</p>
              <p className="text-xs text-success mt-1">Lifetime</p>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹{earningsData.currentMonthEarnings}</p>
              <p className="text-xs text-success mt-1">+12% from last month</p>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Rentals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{earningsData.totalRentals}</p>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payout</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹{earningsData.pendingPayments}</p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Processing</p>
            </CardContent>
          </Card>
        </div>

        {/* Trust Score Card */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-success/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              Your Seller Trust Score
            </CardTitle>
            <CardDescription>Based on ratings, response time, and reliability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-6">
              <div>
                <div className="text-5xl font-bold text-primary">{currentUser?.trustScores.sellerScore}</div>
                <p className="text-sm text-muted-foreground mt-2">/100</p>
              </div>
              <div className="flex-1">
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary to-success h-3 rounded-full transition-all" 
                    style={{ width: `${currentUser?.trustScores.sellerScore}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Poor</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              ✓ 4.8 avg rating • ✓ 2.5 hrs avg response time • ✓ 98% acceptance rate
            </p>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="listings" className="flex gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Listings</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Requests</span>
            </TabsTrigger>
            <TabsTrigger value="earnings" className="flex gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Earnings</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* My Listings Tab */}
          <TabsContent value="listings" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">My Listings</h3>
              <Button size="sm">+ Add New</Button>
            </div>
            {myListings.length > 0 ? (
              <div className="space-y-3">
                {myListings.map(listing => (
                  <Card key={listing.id} className="border-border/60">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{listing.name}</h4>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              listing.status === "Active"
                                ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
                                : "bg-gray-100 dark:bg-gray-950 text-gray-700 dark:text-gray-300"
                            }`}>
                              {listing.status}
                            </span>
                          </div>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>₹{listing.price}/day</span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" /> {listing.views} views
                            </span>
                            <span>{listing.availability}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Pause className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No listings yet. Create your first listing to start earning!</p>
              </div>
            )}
          </TabsContent>

          {/* Incoming Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Incoming Rental Requests</h3>
              {incomingRequests.length > 0 ? (
                <div className="space-y-3">
                  {incomingRequests.map(request => (
                    <Card key={request.id} className="border-border/60">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <h4 className="font-semibold">{request.toolName}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Buyer: <span className="font-medium text-foreground">{request.buyerName}</span>
                              <span className="ml-2 inline-flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                {request.buyerScore}
                              </span>
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {request.startDate} to {request.endDate}
                            </p>
                            <div className="flex gap-3 mt-2 text-sm">
                              <span className="text-muted-foreground">Listed: ₹{request.listedPrice}</span>
                              <span className="font-semibold text-blue-600">Offered: ₹{request.proposedPrice}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 sm:items-end">
                            <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 text-xs font-medium">
                              {request.status}
                            </span>
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">Accept</Button>
                              <Button size="sm" variant="outline">Reject</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No incoming requests. Your tools will appear when buyers request them.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Earnings Summary</h3>
              <Card className="border-border/60 mb-4">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Lifetime Earnings</p>
                      <p className="text-3xl font-bold text-success">₹{earningsData.totalEarnings}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Pending Payout</p>
                      <p className="text-3xl font-bold text-orange-600">₹{earningsData.pendingPayments}</p>
                      <p className="text-xs text-muted-foreground mt-1">Processing within 3-5 business days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h4 className="font-semibold mb-3">Recent Transactions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-border/60">
                    <span>Cordless Drill - 3 days rental</span>
                    <span className="font-semibold text-success">+₹1,050</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/60">
                    <span>Extension Ladder - 1 day rental</span>
                    <span className="font-semibold text-success">+₹200</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/60">
                    <span>Jigsaw - 2 days rental</span>
                    <span className="font-semibold text-success">+₹560</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Platform fee</span>
                    <span className="font-semibold text-red-600">-₹105</span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4">View Full Earnings Report</Button>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Performance Analytics</h3>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Card className="border-border/60">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{analyticsData.totalViews}</p>
                    <p className="text-xs text-muted-foreground mt-1">All time</p>
                  </CardContent>
                </Card>
                <Card className="border-border/60">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Booking Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{analyticsData.bookingRate}%</p>
                    <p className="text-xs text-success mt-1">Above average</p>
                  </CardContent>
                </Card>
                <Card className="border-border/60">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Top Tool</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-bold">{analyticsData.topTool}</p>
                    <p className="text-xs text-muted-foreground mt-1">Most popular</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border/60">
                <CardHeader>
                  <CardTitle className="text-base">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Views</span>
                      <span className="font-semibold">{analyticsData.thisMonthViews}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Confirmed Bookings</span>
                      <span className="font-semibold">{analyticsData.thisMonthBookings}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Conversion Rate</span>
                      <span className="font-semibold">{((analyticsData.thisMonthBookings / analyticsData.thisMonthViews) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default SellerDashboard;
