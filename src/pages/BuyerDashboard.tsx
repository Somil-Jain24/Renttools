import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { Package, ShoppingBag, Bell, Heart, Star } from "lucide-react";
import { myRentals, tools } from "@/lib/mockData";

const BuyerDashboard = () => {
  const { currentUser } = useUser();
  const [selectedTab, setSelectedTab] = useState("rentals");

  // Mock data for buyer
  const myOrders = myRentals.filter(r => r.status === "BORROWED").slice(0, 3);
  const requestsSent = [
    {
      id: "req-1",
      toolId: "tool-1",
      toolName: "Cordless Drill",
      ownerName: "John Doe",
      proposedPrice: 300,
      originalPrice: 350,
      startDate: "2025-01-20",
      endDate: "2025-01-22",
      status: "Pending" as const,
      sentDate: "2025-01-15",
    },
    {
      id: "req-2",
      toolId: "tool-5",
      toolName: "Extension Ladder",
      ownerName: "Sarah Smith",
      proposedPrice: 150,
      originalPrice: 200,
      startDate: "2025-01-25",
      endDate: "2025-01-26",
      status: "Accepted" as const,
      sentDate: "2025-01-14",
    },
  ];

  const wishlistItems = [
    { id: "wish-1", toolName: "Circular Saw", ownerName: "Mike Johnson", price: 450, distance: "2 km" },
    { id: "wish-2", toolName: "Jigsaw", ownerName: "Emma Davis", price: 250, distance: "5 km" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto flex-1 px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Buyer Dashboard</h1>
          <p className="text-muted-foreground">Manage your rentals and track your activity</p>
        </div>

        {/* Trust Score Card */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-success/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              Your Buyer Trust Score
            </CardTitle>
            <CardDescription>Based on timely returns, payments, and reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-6">
              <div>
                <div className="text-5xl font-bold text-primary">{currentUser?.trustScores.buyerScore}</div>
                <p className="text-sm text-muted-foreground mt-2">/100</p>
              </div>
              <div className="flex-1">
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary to-success h-3 rounded-full transition-all" 
                    style={{ width: `${currentUser?.trustScores.buyerScore}%` }}
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
              ✓ On-time returns • ✓ Verified payments • ✓ Excellent feedback
            </p>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="rentals" className="flex gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Rentals</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Requests</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Wishlist</span>
            </TabsTrigger>
          </TabsList>

          {/* My Rentals Tab */}
          <TabsContent value="rentals" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Active Rentals</h3>
              {myRentals.filter(r => r.status === "BORROWED").length > 0 ? (
                <div className="space-y-3">
                  {myRentals.filter(r => r.status === "BORROWED").map(rental => (
                    <Card key={rental.id} className="border-border/60">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <h4 className="font-semibold">{rental.tool.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {rental.startDate} to {rental.endDate}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Owner: <span className="font-medium text-foreground">{rental.borrower?.name}</span>
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 text-xs font-medium">
                                Active
                              </span>
                              <span className="text-xs text-muted-foreground">₹{rental.totalPrice}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 sm:items-end">
                            <Button size="sm">View Details</Button>
                            <Button size="sm" variant="outline">Contact Owner</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No active rentals. Start renting to explore tools!</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* My Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Order History</h3>
              {myOrders.length > 0 ? (
                <div className="space-y-3">
                  {myOrders.map(order => (
                    <Card key={order.id} className="border-border/60">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <h4 className="font-semibold">{order.tool.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {order.startDate} to {order.endDate}
                            </p>
                            <p className="text-sm font-medium mt-2">₹{order.totalPrice}</p>
                          </div>
                          <div className="flex flex-col gap-2 sm:items-end">
                            <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 px-2.5 py-0.5 text-xs font-medium">
                              Returned
                            </span>
                            <Button size="sm" variant="outline">Leave Review</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No completed orders yet.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Requests Sent Tab */}
          <TabsContent value="requests" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Negotiation Requests</h3>
              {requestsSent.length > 0 ? (
                <div className="space-y-3">
                  {requestsSent.map(request => (
                    <Card key={request.id} className="border-border/60">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <h4 className="font-semibold">{request.toolName}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {request.startDate} to {request.endDate} • Owner: {request.ownerName}
                            </p>
                            <div className="flex gap-3 mt-2 text-sm">
                              <span className="text-muted-foreground">Original: ₹{request.originalPrice}</span>
                              <span className="font-semibold text-primary">Offered: ₹{request.proposedPrice}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 sm:items-end">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              request.status === "Pending" 
                                ? "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300"
                                : "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
                            }`}>
                              {request.status}
                            </span>
                            <Button size="sm" variant="outline">View Details</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No negotiation requests sent yet.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Saved Tools</h3>
              {wishlistItems.length > 0 ? (
                <div className="space-y-3">
                  {wishlistItems.map(item => (
                    <Card key={item.id} className="border-border/60">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <h4 className="font-semibold">{item.toolName}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Owner: {item.ownerName} • {item.distance}
                            </p>
                            <p className="text-sm font-semibold mt-2">₹{item.price}/day</p>
                          </div>
                          <div className="flex flex-col gap-2 sm:items-end">
                            <Button size="sm">Quick Rent</Button>
                            <Button size="sm" variant="outline">Remove</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No saved tools yet. Start adding favorites to your wishlist!</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default BuyerDashboard;
