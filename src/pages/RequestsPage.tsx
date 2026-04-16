import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { Bell, Clock, CheckCircle, XCircle, Star, MessageSquare, AlertCircle, User } from "lucide-react";
import { tools, requests as mockRequests, owners } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const RequestsPage = () => {
  const { currentUser } = useUser();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("all");
  const [showBuyerProfile, setShowBuyerProfile] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState<typeof owners[0] | null>(null);
  const [requestStates, setRequestStates] = useState<{ [key: string]: string }>({});

  // Filter requests based on role
  const buyerRequestsSent = mockRequests.filter(r => r.buyerId === currentUser?.id).map(req => {
    const tool = tools.find(t => t.id === req.toolId);
    const seller = owners.find(o => o.id === req.sellerId);
    const startDate = new Date(req.startDate);
    const endDate = new Date(req.endDate);
    const daysRemaining = Math.ceil((new Date(req.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    return {
      id: req.id,
      toolName: tool?.name || "Unknown Tool",
      toolImage: tool?.images[0],
      ownerName: seller?.name || "Unknown",
      ownerScore: seller?.trustScore || 0,
      proposedPrice: req.proposedPrice,
      originalPrice: tool ? tool.pricePerDay * Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) : 0,
      startDate: req.startDate,
      endDate: req.endDate,
      status: req.status as const,
      sentDate: req.createdAt,
      daysToExpire: Math.max(0, daysRemaining),
      message: req.message || "",
    };
  });

  const incomingRequests = mockRequests.filter(r => {
    const tool = tools.find(t => t.id === r.toolId);
    return tool && tool.owner.id === currentUser?.id;
  }).map(req => {
    const tool = tools.find(t => t.id === req.toolId);
    const buyer = owners.find(o => o.id === req.buyerId);
    const startDate = new Date(req.startDate);
    const endDate = new Date(req.endDate);

    return {
      id: req.id,
      toolName: tool?.name || "Unknown Tool",
      toolImage: tool?.images[0],
      buyerId: req.buyerId,
      buyerName: buyer?.name || "Unknown",
      buyerScore: buyer?.trustScore || 0,
      proposedPrice: req.proposedPrice,
      listedPrice: tool ? tool.pricePerDay * Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) : 0,
      startDate: req.startDate,
      endDate: req.endDate,
      status: req.status as const,
      receivedDate: req.createdAt,
      message: req.message || "",
    };
  });

  const handleCancelRequest = (requestId: string) => {
    setRequestStates({ ...requestStates, [requestId]: "CANCELLED" });
    toast({ title: "Success", description: "Request cancelled" });
  };

  const handleAcceptRequest = (requestId: string) => {
    setRequestStates({ ...requestStates, [requestId]: "ACCEPTED" });
    toast({ title: "Success", description: "Request accepted" });
  };

  const handleRejectRequest = (requestId: string) => {
    setRequestStates({ ...requestStates, [requestId]: "REJECTED" });
    toast({ title: "Success", description: "Request rejected" });
  };

  const handleViewBuyerProfile = (buyer: typeof owners[0]) => {
    setSelectedBuyer(buyer);
    setShowBuyerProfile(true);
  };

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
    : requests.filter(r => {
        const currentStatus = requestStates[r.id] || r.status;
        return currentStatus.toLowerCase() === selectedTab;
      });

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
            {filteredRequests.map(request => {
              const currentStatus = requestStates[request.id] || request.status;
              const statusColor = {
                "PENDING": "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300",
                "ACCEPTED": "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300",
                "REJECTED": "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300",
                "EXPIRED": "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300",
              }[currentStatus] || "bg-gray-100 dark:bg-gray-900";

              return (
                <Card key={request.id} className="border-border/60 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Tool Image */}
                      {request.toolImage && (
                        <div className="sm:w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                          <img src={request.toolImage} alt={request.toolName} className="w-full h-full object-cover" />
                        </div>
                      )}

                      {/* Left side - Request details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="min-w-0">
                            <h3 className="text-lg font-semibold truncate">{request.toolName}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {isBuyerMode ? "Owner" : "Buyer"}:{" "}
                              <span className="font-medium text-foreground">
                                {isBuyerMode ? request.ownerName : request.buyerName}
                              </span>
                              <span className="ml-2 inline-flex items-center gap-0.5">
                                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                {isBuyerMode ? request.ownerScore : request.buyerScore}
                              </span>
                            </p>
                          </div>
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${statusColor}`}>
                            {currentStatus === "PENDING" && <Clock className="h-3 w-3 mr-1" />}
                            {currentStatus === "ACCEPTED" && <CheckCircle className="h-3 w-3 mr-1" />}
                            {currentStatus === "REJECTED" && <XCircle className="h-3 w-3 mr-1" />}
                            {currentStatus}
                          </span>
                        </div>

                        <p className="text-sm text-muted-foreground mt-3 mb-3">
                          {request.startDate} to {request.endDate}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">{isBuyerMode ? "Original Price" : "Listed Price"}</p>
                            <p className="font-semibold">₹{isBuyerMode ? request.originalPrice : request.listedPrice}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Offered Price</p>
                            <p className={`font-semibold ${request.proposedPrice < (isBuyerMode ? request.originalPrice : request.listedPrice) ? 'text-orange-600' : 'text-green-600'}`}>
                              ₹{request.proposedPrice}
                            </p>
                          </div>
                        </div>

                        {request.message && (
                          <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
                            <p className="flex gap-2">
                              <MessageSquare className="h-4 w-4 flex-shrink-0 mt-0.5" />
                              <span>"{request.message}"</span>
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Right side - Actions */}
                      <div className="flex flex-col gap-2 sm:items-end sm:justify-start">
                        {isBuyerMode ? (
                          // Buyer Mode Actions
                          <>
                            {currentStatus === "PENDING" && (
                              <>
                                <p className="text-xs text-muted-foreground text-right">Expires in {request.daysToExpire} days</p>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCancelRequest(request.id)}
                                >
                                  Cancel Request
                                </Button>
                              </>
                            )}
                            {currentStatus === "ACCEPTED" && (
                              <>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  Proceed to Payment
                                </Button>
                                <Button size="sm" variant="outline">View Details</Button>
                              </>
                            )}
                            {currentStatus === "REJECTED" && (
                              <>
                                <Button size="sm" variant="outline">Make New Offer</Button>
                              </>
                            )}
                          </>
                        ) : (
                          // Seller Mode Actions
                          <>
                            {currentStatus === "PENDING" && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleAcceptRequest(request.id)}
                                >
                                  Accept
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleRejectRequest(request.id)}
                                  className="text-red-600"
                                >
                                  Reject
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleViewBuyerProfile(owners.find(o => o.id === (request as any).buyerId) || owners[0])}
                                >
                                  View Profile
                                </Button>
                              </>
                            )}
                            {currentStatus === "ACCEPTED" && (
                              <p className="text-xs text-green-600 font-medium">Accepted</p>
                            )}
                            {currentStatus === "REJECTED" && (
                              <p className="text-xs text-red-600 font-medium">Rejected</p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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

      {/* Buyer Profile Modal */}
      <Dialog open={showBuyerProfile} onOpenChange={setShowBuyerProfile}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buyer Profile</DialogTitle>
          </DialogHeader>
          {selectedBuyer && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedBuyer.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    <span>{selectedBuyer.trustScore}/100</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Rentals Completed</p>
                  <p className="font-semibold">{selectedBuyer.completedRentals || 0}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Member Since</p>
                  <p className="font-semibold">{selectedBuyer.memberSince || "Recently"}</p>
                </div>
                {selectedBuyer.damageReports !== undefined && selectedBuyer.damageReports > 0 && (
                  <div className="rounded-lg bg-yellow-50 dark:bg-yellow-950/30 p-3">
                    <p className="text-xs text-yellow-700 dark:text-yellow-300">
                      <AlertCircle className="h-3 w-3 inline mr-1" />
                      {selectedBuyer.damageReports} damage report{selectedBuyer.damageReports > 1 ? 's' : ''} on record
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t space-y-2">
                <Button className="w-full">Accept Request</Button>
                <Button variant="outline" className="w-full">Send Message</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RequestsPage;
