import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { ShoppingBag, Bell, Star, AlertCircle, CheckCircle, ArrowRight } from "lucide-react";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();

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


  const earningsData = {
    totalRentals: 47,
  };

  const activeRentals = [
    {
      id: "rental-1",
      toolName: "Cordless Drill",
      buyerName: "John Doe",
      rentalStartDate: "2025-01-15",
      expectedReturnDate: "2025-01-20",
      status: "Active",
      daysLeft: 2,
    },
    {
      id: "rental-2",
      toolName: "Extension Ladder",
      buyerName: "Sarah Smith",
      rentalStartDate: "2025-01-18",
      expectedReturnDate: "2025-01-22",
      status: "Active",
      daysLeft: 4,
    },
    {
      id: "rental-3",
      toolName: "Power Drill",
      buyerName: "Mike Johnson",
      rentalStartDate: "2025-01-10",
      expectedReturnDate: "2025-01-19",
      status: "Active",
      daysLeft: 1,
    },
  ];


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

        {/* Active Rentals Section */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-blue/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Active Rentals
            </CardTitle>
            <CardDescription>Tools currently rented out to buyers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="text-4xl font-bold text-primary">{activeRentals.length}</div>
              <p className="text-sm text-muted-foreground mt-1">Tools currently rented</p>
            </div>
            <div className="space-y-3">
              {activeRentals.map(rental => (
                <div key={rental.id} className="border border-border/60 rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{rental.toolName}</h4>
                      <p className="text-xs text-muted-foreground mb-2">Rented by: <span className="font-medium text-foreground">{rental.buyerName}</span></p>
                      <p className="text-xs text-muted-foreground">Rental Period: {rental.rentalStartDate} → {rental.expectedReturnDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-lg font-bold text-success">{rental.daysLeft}</p>
                        <p className="text-xs text-muted-foreground">days left</p>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 text-xs font-medium">
                        {rental.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards - Keep Total Rentals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Rentals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{earningsData.totalRentals}</p>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
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

        {/* Action Items */}
        <Card className="mb-8 border-orange-200/30 dark:border-orange-800/30 bg-gradient-to-br from-orange-50/50 dark:from-orange-950/20 to-transparent">
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

        {/* Recent Activity and Inventory Status - Main Dashboard Content */}
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
      </div>

      <Footer />
    </div>
  );
};

export default SellerDashboard;
