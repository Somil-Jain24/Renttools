import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { ShoppingBag, Bell, DollarSign, BarChart3, Star, Edit2, Pause, Eye, AlertCircle, CheckCircle, ArrowRight, Plus } from "lucide-react";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [selectedTab, setSelectedTab] = useState("overview");

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

  // Action items for seller
  const actionItems = [
    {
      id: "action-1",
      type: "pending-request" as const,
      title: "2 Pending Requests",
      description: "You have 2 requests awaiting your response",
      icon: Bell,
      priority: "high" as const,
      cta: { label: "Review Requests", href: "/requests" },
    },
    {
      id: "action-2",
      type: "incomplete-listing" as const,
      title: "1 Incomplete Listing",
      description: "Finish setting up your Extension Ladder listing",
      icon: AlertCircle,
      priority: "medium" as const,
      cta: { label: "Complete Listing", href: "/list-tool" },
    },
    {
      id: "action-3",
      type: "kycNotVerified" as const,
      title: "KYC Verification Pending",
      description: "Complete your KYC to ensure smooth payouts",
      icon: CheckCircle,
      priority: "medium" as const,
      cta: { label: "Check Status", href: "/seller-profile" },
    },
  ];

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

        {/* Action Items & Quick Links */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Action Items */}
          <Card className="border-orange-200/30 dark:border-orange-800/30 bg-gradient-to-br from-orange-50/50 dark:from-orange-950/20 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                Action Items
              </CardTitle>
              <CardDescription>Things that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {actionItems.map(item => {
                  const Icon = item.icon;
                  const bgColor = item.priority === "high"
                    ? "bg-red-50 dark:bg-red-950/20 border-red-200/30 dark:border-red-800/30"
                    : "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200/30 dark:border-yellow-800/30";

                  return (
                    <div key={item.id} className={`rounded-lg border p-3 ${bgColor}`}>
                      <div className="flex items-start gap-3">
                        <Icon className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                          item.priority === "high" ? "text-red-600 dark:text-red-400" : "text-yellow-600 dark:text-yellow-400"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2 w-full text-xs h-8"
                        onClick={() => navigate(item.cta.href)}
                      >
                        {item.cta.label}
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle className="text-base">Quick Links</CardTitle>
              <CardDescription>Access key seller features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="h-auto flex flex-col items-center justify-center py-4 rounded-lg hover:bg-primary/5 transition-colors"
                  onClick={() => navigate("/list-tool")}
                >
                  <Plus className="h-5 w-5 mb-2 text-primary" />
                  <span className="text-xs font-medium text-center">List Tool</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto flex flex-col items-center justify-center py-4 rounded-lg hover:bg-primary/5 transition-colors"
                  onClick={() => navigate("/my-listings")}
                >
                  <ShoppingBag className="h-5 w-5 mb-2 text-primary" />
                  <span className="text-xs font-medium text-center">My Listings</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto flex flex-col items-center justify-center py-4 rounded-lg hover:bg-primary/5 transition-colors"
                  onClick={() => navigate("/requests")}
                >
                  <Bell className="h-5 w-5 mb-2 text-primary" />
                  <span className="text-xs font-medium text-center">Requests</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto flex flex-col items-center justify-center py-4 rounded-lg hover:bg-primary/5 transition-colors"
                  onClick={() => navigate("/seller-profile")}
                >
                  <CheckCircle className="h-5 w-5 mb-2 text-primary" />
                  <span className="text-xs font-medium text-center">KYC</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview" className="flex gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="listings" className="flex gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Listings</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Requests</span>
            </TabsTrigger>
            <TabsTrigger value="earnings" className="flex gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Earnings</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline text-xs">Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Recent Activity */}
              <Card className="border-border/60">
                <CardHeader>
                  <CardTitle className="text-base">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 pb-4 border-b border-border/60 last:border-b-0">
                      <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm">Rental Completed</p>
                        <p className="text-xs text-muted-foreground">Cordless Drill returned by John Buyer</p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pb-4 border-b border-border/60 last:border-b-0">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center flex-shrink-0">
                        <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm">New Request</p>
                        <p className="text-xs text-muted-foreground">Jane requested Extension Ladder</p>
                        <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-950 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm">Payout Processed</p>
                        <p className="text-xs text-muted-foreground">₹2,450 transferred to your account</p>
                        <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Status */}
              <Card className="border-border/60">
                <CardHeader>
                  <CardTitle className="text-base">Inventory Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myListings.slice(0, 3).map(listing => (
                      <div key={listing.id} className="flex items-center justify-between pb-3 border-b border-border/60 last:border-b-0">
                        <div>
                          <p className="font-medium text-sm">{listing.name}</p>
                          <p className="text-xs text-muted-foreground">{listing.availability}</p>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          listing.status === "Active"
                            ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
                            : "bg-gray-100 dark:bg-gray-950 text-gray-700 dark:text-gray-300"
                        }`}>
                          {listing.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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
