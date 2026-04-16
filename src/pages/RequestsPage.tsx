import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";
import { Bell, Clock, CheckCircle, XCircle, Star, MessageSquare } from "lucide-react";

const RequestsPage = () => {
  const { currentUser } = useUser();
  const [selectedTab, setSelectedTab] = useState("all");

  // Mock buyer requests sent
  const buyerRequestsSent = [
    {
      id: "req-1",
      toolName: "Cordless Drill",
      ownerName: "John Doe",
      ownerScore: 92,
      proposedPrice: 300,
      originalPrice: 350,
      startDate: "2025-01-20",
      endDate: "2025-01-22",
      status: "Pending" as const,
      sentDate: "2025-01-15",
      daysToExpire: 2,
      message: "Would you accept ₹300 instead? I have a small home repair project.",
    },
    {
      id: "req-2",
      toolName: "Extension Ladder",
      ownerName: "Sarah Smith",
      ownerScore: 88,
      proposedPrice: 150,
      originalPrice: 200,
      startDate: "2025-01-25",
      endDate: "2025-01-26",
      status: "Accepted" as const,
      sentDate: "2025-01-14",
      daysToExpire: 0,
      message: "Perfect timing for my project!",
    },
    {
      id: "req-3",
      toolName: "Power Saw",
      ownerName: "Mike Johnson",
      ownerScore: 85,
      proposedPrice: 400,
      originalPrice: 450,
      startDate: "2025-01-18",
      endDate: "2025-01-20",
      status: "Rejected" as const,
      sentDate: "2025-01-12",
      daysToExpire: 0,
      message: "Looking for a reasonable rate.",
    },
  ];

  // Mock incoming requests (seller)
  const incomingRequests = [
    {
      id: "incoming-1",
      toolName: "Cordless Drill",
      buyerName: "Alice Renter",
      buyerScore: 88,
      proposedPrice: 300,
      listedPrice: 350,
      startDate: "2025-01-20",
      endDate: "2025-01-22",
      status: "New" as const,
      receivedDate: "2025-01-15",
      message: "Would you accept ₹300 instead? I have a small home repair project.",
    },
    {
      id: "incoming-2",
      toolName: "Extension Ladder",
      buyerName: "Bob Constructor",
      buyerScore: 92,
      proposedPrice: 180,
      listedPrice: 200,
      startDate: "2025-01-25",
      endDate: "2025-01-26",
      status: "New" as const,
      receivedDate: "2025-01-14",
      message: "Need it for a quick job.",
    },
  ];

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Please log in to view requests</p>
        </div>
        <Footer />
      </div>
    );
  }

  const isBuyerMode = currentUser.mode === "buyer";
  const requests = isBuyerMode ? buyerRequestsSent : incomingRequests;
  const filteredRequests = selectedTab === "all" 
    ? requests 
    : requests.filter(r => r.status.toLowerCase() === selectedTab);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto flex-1 px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {isBuyerMode ? "My Requests" : "Incoming Requests"}
          </h1>
          <p className="text-muted-foreground">
            {isBuyerMode 
              ? "Track negotiation offers you've sent to tool owners" 
              : "Review and manage rental requests from buyers"}
          </p>
        </div>

        {/* Tabs for filtering */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Requests List */}
        {filteredRequests.length > 0 ? (
          <div className="space-y-4">
            {filteredRequests.map(request => (
              isBuyerMode ? (
                // Buyer view of sent requests
                <Card key={request.id} className="border-border/60">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      {/* Left side - Request details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">{request.toolName}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Owner: <span className="font-medium text-foreground">{request.ownerName}</span>
                              <span className="ml-2 inline-flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                {request.ownerScore}
                              </span>
                            </p>
                          </div>
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                            request.status === "Pending"
                              ? "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300"
                              : request.status === "Accepted"
                              ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
                              : "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300"
                          }`}>
                            {request.status === "Pending" && <Clock className="h-3 w-3 mr-1" />}
                            {request.status === "Accepted" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {request.status === "Rejected" && <XCircle className="h-3 w-3 mr-1" />}
                            {request.status}
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground mt-3 mb-3">
                          {request.startDate} to {request.endDate}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Original Price</p>
                            <p className="font-semibold">₹{request.originalPrice}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Your Offer</p>
                            <p className="font-semibold text-primary">₹{request.proposedPrice}</p>
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
                          <p className="flex gap-2">
                            <MessageSquare className="h-4 w-4 flex-shrink-0 mt-0.5" />
                            <span>"{request.message}"</span>
                          </p>
                        </div>
                      </div>

                      {/* Right side - Actions */}
                      <div className="flex flex-col gap-2 sm:items-end">
                        {request.status === "Pending" && (
                          <>
                            <p className="text-xs text-muted-foreground">Expires in {request.daysToExpire} days</p>
                            <Button size="sm" variant="outline">Cancel Request</Button>
                          </>
                        )}
                        {request.status === "Accepted" && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">Proceed to Payment</Button>
                            <Button size="sm" variant="outline">View Details</Button>
                          </>
                        )}
                        {request.status === "Rejected" && (
                          <>
                            <Button size="sm" variant="outline">Make New Offer</Button>
                            <Button size="sm" variant="ghost">View Details</Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                // Seller view of incoming requests
                <Card key={request.id} className="border-border/60">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      {/* Left side - Request details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">{request.toolName}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Buyer: <span className="font-medium text-foreground">{request.buyerName}</span>
                              <span className="ml-2 inline-flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                {request.buyerScore}
                              </span>
                            </p>
                          </div>
                          <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-3 py-1 text-xs font-medium">
                            <Bell className="h-3 w-3 mr-1" />
                            {request.status}
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground mt-3 mb-3">
                          {request.startDate} to {request.endDate}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Listed Price</p>
                            <p className="font-semibold">₹{request.listedPrice}/day</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Offered Price</p>
                            <p className={`font-semibold ${request.proposedPrice < request.listedPrice ? 'text-orange-600' : 'text-success'}`}>
                              ₹{request.proposedPrice}
                            </p>
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
                          <p className="flex gap-2">
                            <MessageSquare className="h-4 w-4 flex-shrink-0 mt-0.5" />
                            <span>"{request.message}"</span>
                          </p>
                        </div>
                      </div>

                      {/* Right side - Actions */}
                      <div className="flex flex-col gap-2 sm:items-end">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">Accept</Button>
                        <Button size="sm" variant="outline">Counter Offer</Button>
                        <Button size="sm" variant="outline" className="text-red-600">Reject</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        ) : (
          <Card className="border-border/60">
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Requests</h3>
              <p className="text-muted-foreground text-sm">
                {isBuyerMode
                  ? "You haven't sent any negotiation requests yet."
                  : "No incoming requests at this time."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default RequestsPage;
