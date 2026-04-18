import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/context/UserContext";
import { ShoppingBag, Bell, Star, AlertCircle, CheckCircle, ArrowRight, Eye, Package } from "lucide-react";
import { ReturnConditionCheck } from "@/components/ReturnConditionCheck";
import { myRentals } from "@/lib/mockData";
import type { ConditionRecord, DepositDeduction, Rental } from "@/lib/mockData";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [returnCheckDialogOpen, setReturnCheckDialogOpen] = useState(false);
  const [selectedRentalForReturn, setSelectedRentalForReturn] = useState<any>(null);

  const handleReturnConditionSubmit = (conditionRecord: ConditionRecord, deduction: DepositDeduction) => {
    if (selectedRentalForReturn) {
      selectedRentalForReturn.returnCondition = conditionRecord;
      selectedRentalForReturn.returnConditionPending = false;
      selectedRentalForReturn.depositDeduction = deduction;
      selectedRentalForReturn.depositStatus = deduction.percentage > 0 ? "DEDUCTED" : "RELEASED";

      // Calculate refund based on actual deposit amount
      const depositAmount = selectedRentalForReturn.amountDeposited || 0;
      const deductedAmount = Math.round((deduction.percentage / 100) * depositAmount);
      selectedRentalForReturn.depositRefundAmount = depositAmount - deductedAmount;

      alert(
        `✓ Return verified!\n\nDeposit: ₹${depositAmount}\nDeduction (${deduction.percentage}%): ₹${deductedAmount}\nRefund to Buyer: ₹${selectedRentalForReturn.depositRefundAmount}`
      );
      setReturnCheckDialogOpen(false);
      setSelectedRentalForReturn(null);
    }
  };

  // Get real rentals - currently borrowed items and items awaiting return verification
  const activeRentals = myRentals.filter(rental =>
    rental.status === "BORROWED" || (rental.status === "RETURNED" && rental.returnConditionPending)
  );

  // Items awaiting return verification (most urgent)
  const pendingReturnVerifications = activeRentals.filter(r =>
    r.status === "RETURNED" && r.returnConditionPending
  );

  // Mock data for seller listings
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


  // Action items for seller
  const actionItems = [
    ...(pendingReturnVerifications.length > 0 ? [
      {
        id: "action-return",
        type: "pending-return" as const,
        title: `${pendingReturnVerifications.length} Item${pendingReturnVerifications.length > 1 ? 's' : ''} Awaiting Return Verification`,
        description: "You need to verify items that buyers have returned",
        icon: Package,
        priority: "high" as const,
        cta: { label: "Verify Returns", href: "#pending-returns" },
      },
    ] : []),
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

        {/* Active & Pending Return Verification Section */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-blue/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Active Rentals & Returns
            </CardTitle>
            <CardDescription>Tools rented out to buyers and items awaiting verification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Currently Rented</p>
                <div className="text-3xl font-bold text-primary">
                  {activeRentals.filter(r => r.status === "BORROWED").length}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Awaiting Verification</p>
                <div className="text-3xl font-bold text-destructive">
                  {pendingReturnVerifications.length}
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Active</p>
                <div className="text-3xl font-bold">
                  {activeRentals.length}
                </div>
              </div>
            </div>

            {activeRentals.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm text-muted-foreground">No active rentals or pending verifications</p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Pending Return Verifications - High Priority */}
                {pendingReturnVerifications.length > 0 && (
                  <div id="pending-returns" className="mb-4 p-4 rounded-lg border-2 border-destructive/50 bg-destructive/5">
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      Return Verifications Required
                    </h4>
                    <div className="space-y-3">
                      {pendingReturnVerifications.map(rental => (
                        <div key={rental.id} className="border border-destructive/30 rounded-lg p-3 bg-white dark:bg-slate-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex-1">
                            <h5 className="font-semibold text-sm">{rental.tool.name}</h5>
                            <p className="text-xs text-muted-foreground mt-1">
                              Buyer: <span className="font-medium text-foreground">{rental.borrower?.name || "Unknown"}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Period: {rental.startDate} → {rental.endDate}
                            </p>
                            {rental.amountDeposited && (
                              <p className="text-xs font-semibold text-destructive mt-1">
                                Security Deposit: ₹{rental.amountDeposited}
                              </p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <Badge variant="destructive">Pending Verification</Badge>
                            <Button
                              size="sm"
                              className="whitespace-nowrap"
                              onClick={() => {
                                setSelectedRentalForReturn(rental);
                                setReturnCheckDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Verify Return
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Currently Borrowed Rentals */}
                {activeRentals.filter(r => r.status === "BORROWED").length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-3">Currently Rented Out</h4>
                    <div className="space-y-3">
                      {activeRentals.filter(r => r.status === "BORROWED").map(rental => (
                        <div key={rental.id} className="border border-border/60 rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex-1">
                              <h5 className="font-semibold text-sm">{rental.tool.name}</h5>
                              <p className="text-xs text-muted-foreground mt-1">
                                Rented by: <span className="font-medium text-foreground">{rental.borrower?.name || "Unknown"}</span>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Period: {rental.startDate} → {rental.endDate}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300">
                                Active Rental
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

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

      {/* Return Condition Check Dialog */}
      {selectedRentalForReturn && returnCheckDialogOpen && (
        <ReturnConditionCheck
          rentalId={selectedRentalForReturn.id}
          ownerName={currentUser?.name || "Owner"}
          borrowerName={selectedRentalForReturn.borrower?.name || "Buyer"}
          toolName={selectedRentalForReturn.tool.name}
          depositAmount={selectedRentalForReturn.amountDeposited || 0}
          onSubmit={handleReturnConditionSubmit}
          onCancel={() => {
            setReturnCheckDialogOpen(false);
            setSelectedRentalForReturn(null);
          }}
        />
      )}
    </div>
  );
};

export default SellerDashboard;
