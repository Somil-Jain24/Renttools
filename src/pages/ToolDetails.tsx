import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TrustBadge } from "@/components/TrustBadge";
import { StarRating } from "@/components/StarRating";
import { ConnectionBadge } from "@/components/ConnectionBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { tools, negotiatedOffers, userConnections, followedUsers, wishlistItems } from "@/lib/mockData";
import { MapPin, User, Shield, ArrowLeft, FileText, Download, Zap, CheckCircle, AlertCircle, Edit2, Star, ChevronLeft, ChevronRight, Heart, Plus } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { createOffer } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const ToolDetails = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { toast } = useToast();
  const { id } = useParams();
  const tool = tools.find(t => t.id === id);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [showOfferInput, setShowOfferInput] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [offerMessage, setOfferMessage] = useState("");
  const [offers, setOffers] = useState(negotiatedOffers);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoRequestMessage, setDemoRequestMessage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFollowing, setIsFollowing] = useState(
    currentUser && tool ? followedUsers.some(f => f.userId === currentUser.id && f.followedUserId === tool.owner.id) : false
  );
  const [isWishlisted, setIsWishlisted] = useState(
    currentUser && tool ? wishlistItems.some(w => w.userId === currentUser.id && w.toolId === tool.id) : false
  );

  // Check if current user is the owner of this tool
  const isOwner = currentUser && tool && currentUser.id === tool.owner.id;

  // Get connection level for the seller
  const getSellerConnection = () => {
    if (!currentUser || !tool) return { level: "none" as const, connectedVia: [] };
    const connection = userConnections.find(
      c => c.userId === currentUser.id && c.targetUserId === tool.owner.id
    );
    return connection || { level: "none" as const, connectedVia: [] };
  };

  const sellerConnection = getSellerConnection();

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Tool not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate rental duration and price
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const days = calculateDays();
  const totalRentalPrice = tool.pricePerDay * days;
  const securityDeposit = tool.deposit;
  const totalAmount = totalRentalPrice + securityDeposit;
  const minDate = new Date().toISOString().split("T")[0];
  const maxDate = new Date(new Date().setDate(new Date().getDate() + 365)).toISOString().split("T")[0];

  const handleDownloadGuide = () => {
    if (!tool.usageGuide) return;
    const blob = new Blob([`Usage Guide: ${tool.name}\n${"=".repeat(40)}\n\n${tool.usageGuide}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tool.name.replace(/\s+/g, "_")}_Usage_Guide.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmitOffer = () => {
    if (!startDate || !endDate) {
      toast({ title: "Error", description: "Please select rental dates first" });
      return;
    }

    if (!offerPrice || Number(offerPrice) <= 0) {
      toast({ title: "Error", description: "Please enter a valid price" });
      return;
    }

    if (!currentUser || !tool) return;

    const newOffer = createOffer(
      tool.id,
      currentUser.id,
      tool.owner.id,
      Number(offerPrice),
      totalRentalPrice,
      startDate,
      endDate
    );

    setOffers([...offers, newOffer]);
    setOfferPrice("");
    setOfferMessage("");
    setShowOfferInput(false);
    setShowSuccessModal(true);
    toast({ title: "Success", description: "Your negotiation offer has been sent!" });
  };

  const handleRentNow = () => {
    if (!startDate || !endDate) {
      toast({ title: "Error", description: "Please select rental dates first" });
      return;
    }

    if (!tool.available) {
      toast({ title: "Error", description: "This tool is not available for selected dates" });
      return;
    }

    setShowSuccessModal(true);
    toast({ title: "Success", description: "Proceeding to booking..." });
  };

  const handleRequestDemo = () => {
    if (!currentUser) {
      navigate("/signup");
      return;
    }

    setShowDemoModal(true);
    setDemoRequestMessage("");
    toast({ title: "Success", description: "Demo request sent to the owner!" });
  };

  const handleFollowToggle = () => {
    if (!currentUser || !tool) {
      navigate("/signup");
      return;
    }

    if (isFollowing) {
      setIsFollowing(false);
      toast({ title: "Unfollowed", description: `You unfollowed ${tool.owner.name}` });
    } else {
      setIsFollowing(true);
      toast({ title: "Followed", description: `You're now following ${tool.owner.name}` });
    }
  };

  const handleWishlistToggle = () => {
    if (!currentUser || !tool) {
      navigate("/signup");
      return;
    }

    if (isWishlisted) {
      setIsWishlisted(false);
      toast({ title: "Removed", description: "Tool removed from wishlist" });
    } else {
      setIsWishlisted(true);
      toast({ title: "Added", description: "Tool added to wishlist" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-8">
        <Link to="/browse" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to browse
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column: Image Gallery & Owner */}
          <div className="lg:col-span-1 space-y-5">
            {/* Product Image Gallery */}
            <div className="space-y-3">
              {/* Main Image */}
              <div className="aspect-[4/3] rounded-2xl bg-muted overflow-hidden border relative">
                <img src={tool.images[currentImageIndex]} alt={`${tool.name} - View ${currentImageIndex + 1}`} className="h-full w-full object-cover" />

                {/* Image Navigation Arrows - Only show if multiple images */}
                {tool.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? tool.images.length - 1 : prev - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => (prev === tool.images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs font-medium">
                      {currentImageIndex + 1} / {tool.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Navigation - Only show if multiple images */}
              {tool.images.length > 1 && (
                <div className="flex gap-2">
                  {tool.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-16 w-16 rounded-lg border-2 overflow-hidden transition-colors flex-shrink-0 ${
                        index === currentImageIndex ? 'border-primary' : 'border-muted'
                      }`}
                    >
                      <img src={image} alt={`${tool.name} - Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Owner Section */}
            <div className="rounded-xl border bg-card p-4 space-y-3">
              <h3 className="text-sm font-semibold">Owner</h3>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted flex-shrink-0">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-sm">{tool.owner.name}</p>
                      {sellerConnection && sellerConnection.level !== "none" && (
                        <ConnectionBadge level={sellerConnection.level} connectedVia={sellerConnection.connectedVia} />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating score={tool.owner.trustScore} showScore />
                      <span className="text-xs text-muted-foreground">{tool.owner.trustScore}/100</span>
                    </div>
                  </div>
                </div>
                {currentUser && !isOwner && currentUser.mode === "buyer" && (
                  <Button
                    variant={isFollowing ? "default" : "outline"}
                    size="sm"
                    className="h-8 text-xs flex-shrink-0"
                    onClick={handleFollowToggle}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <TrustBadge score={tool.owner.trustScore} showScore />
                {tool.owner.idVerified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/10 text-success px-2 py-0.5 text-xs font-medium">
                    <Shield className="h-3 w-3" /> ID Verified
                  </span>
                )}
              </div>
            </div>

            {/* Usage Guide Section */}
            {tool.usageGuide && (
              <div className="rounded-xl border bg-card p-4 space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" /> Usage Guide
                </h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => setShowGuide(!showGuide)}>
                    {showGuide ? "Hide" : "View"}
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs h-7" onClick={handleDownloadGuide}>
                    <Download className="h-3 w-3 mr-1" /> Download
                  </Button>
                </div>
                {showGuide && (
                  <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground whitespace-pre-line max-h-40 overflow-y-auto">
                    {tool.usageGuide}
                  </div>
                )}
              </div>
            )}

            {/* Location Section */}
            <div className="rounded-xl border bg-card p-4 space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Location
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{tool.location}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 w-full"
                  onClick={() => {
                    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tool.location)}`;
                    window.open(mapsUrl, "_blank");
                  }}
                >
                  <MapPin className="h-3 w-3 mr-1" /> Get Directions
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Rental */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2 py-1">{tool.subcategory || tool.category}</span>
              <h1 className="text-2xl font-bold mt-2">{tool.name}</h1>
              <p className="text-muted-foreground mt-2 text-sm">{tool.description}</p>
            </div>

            <div className="text-3xl font-bold text-primary">
              ₹{tool.pricePerDay}<span className="text-sm font-normal text-muted-foreground">/day</span>
            </div>

            {/* Rental section */}
            <div className="rounded-xl border bg-card p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">
                  {isOwner ? "Manage Listing" : "Rent this tool"}
                </h3>
                {currentUser && currentUser.mode === "buyer" && !isOwner && (
                  <Button
                    variant={isWishlisted ? "default" : "outline"}
                    size="sm"
                    className="h-8 text-xs"
                    onClick={handleWishlistToggle}
                  >
                    <Heart className={`h-3.5 w-3.5 mr-1 ${isWishlisted ? "fill-current" : ""}`} />
                    {isWishlisted ? "Wishlisted" : "Wishlist"}
                  </Button>
                )}
              </div>

              {/* Date Selection - Only for Buyer Mode */}
              {currentUser && currentUser.mode === "buyer" && !isOwner && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1.5">From</label>
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={minDate}
                        max={maxDate}
                        className="text-sm h-9"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1.5">To</label>
                      <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || minDate}
                        max={maxDate}
                        disabled={!startDate}
                        className="text-sm h-9"
                      />
                    </div>
                  </div>
                  {startDate && endDate && days > 0 && (
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">{days}</span> day{days > 1 ? "s" : ""} • {startDate} to {endDate}
                    </p>
                  )}
                </div>
              )}

              {/* Price Breakdown */}
              {startDate && endDate && days > 0 && (
                <div className="space-y-2 text-sm bg-muted/50 rounded-lg p-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">₹{tool.pricePerDay} × {days} day{days > 1 ? "s" : ""}</span>
                    <span className="font-medium">₹{totalRentalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Security deposit</span>
                    <span className="font-medium">₹{securityDeposit}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold text-primary">
                    <span>Total amount</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>
              )}

              {/* Negotiated Offer Section - Buyer Mode Only */}
              {currentUser && currentUser.mode === "buyer" && !isOwner && startDate && endDate && (
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Send a Negotiation Offer</span>
                  </div>
                  {!showOfferInput ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => setShowOfferInput(true)}
                    >
                      Propose Different Price
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs font-medium text-blue-800 dark:text-blue-200 block mb-1">Total Price (₹)</label>
                        <Input
                          type="number"
                          placeholder={String(totalRentalPrice)}
                          value={offerPrice}
                          onChange={(e) => setOfferPrice(e.target.value)}
                          className="h-8 text-sm"
                          min={Math.floor(totalRentalPrice * 0.5)}
                          max={totalRentalPrice}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-blue-800 dark:text-blue-200 block mb-1">Message (optional)</label>
                        <Input
                          type="text"
                          placeholder="e.g., I have a small project..."
                          value={offerMessage}
                          onChange={(e) => setOfferMessage(e.target.value)}
                          className="h-8 text-sm"
                          maxLength={100}
                        />
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-300">Original: ₹{totalRentalPrice} | Min: ₹{Math.floor(totalRentalPrice * 0.5)}</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="h-8 text-xs flex-1"
                          onClick={handleSubmitOffer}
                        >
                          Send Offer
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs flex-1"
                          onClick={() => {
                            setShowOfferInput(false);
                            setOfferPrice("");
                            setOfferMessage("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons - Mode & Ownership Specific */}
              {isOwner && currentUser?.mode === "seller" ? (
                // Owner in Seller Mode - Show management actions
                <div className="space-y-2">
                  <Button className="w-full" size="lg">
                    <Edit2 className="h-4 w-4 mr-2" /> Edit Listing
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Manage Availability
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">You own this tool</p>
                </div>
              ) : currentUser && currentUser.mode === "buyer" && !isOwner ? (
                // Buyer Mode - Show rent buttons
                <>
                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!startDate || !endDate || !tool.available}
                    onClick={handleRentNow}
                  >
                    Send Request
                  </Button>
                  {(!startDate || !endDate) && (
                    <div className="flex items-center gap-2 text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 p-2 rounded">
                      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>Select rental dates to proceed</span>
                    </div>
                  )}
                  {!tool.available && startDate && endDate && (
                    <div className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 p-2 rounded">
                      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>Not available for selected dates</span>
                    </div>
                  )}
                </>
              ) : currentUser && currentUser.mode === "seller" && !isOwner ? (
                // Seller Mode but not owner - Show restriction
                <div className="space-y-2">
                  <Button
                    className="w-full"
                    size="lg"
                    disabled
                    variant="outline"
                  >
                    Cannot Rent in Seller Mode
                  </Button>
                  <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 p-2 rounded">
                    <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>Switch to Buyer Mode to rent tools</span>
                  </div>
                </div>
              ) : (
                // Not logged in
                <>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => navigate("/signup")}
                  >
                    Login to Rent
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">Create an account to start renting tools</p>
                </>
              )}
            </div>

            {/* Product Reviews Section */}
            {tool.productReviews && tool.productReviews.length > 0 && (
              <div className="rounded-xl border bg-card p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary fill-primary" /> Product Reviews
                  </h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                    {tool.productReviews.length} review{tool.productReviews.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="space-y-4">
                  {tool.productReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium">{review.reviewerName}</p>
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3.5 w-3.5 ${i < Math.round(review.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-950 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="text-center">Request Sent Successfully!</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-2 text-sm text-muted-foreground">
            <div>Your request has been sent to the owner.</div>
            <div className="font-semibold text-foreground">The owner will review it within 24hrs.</div>
          </div>
          <Button
            onClick={() => setShowSuccessModal(false)}
            className="w-full mt-4"
          >
            Great, Thanks!
          </Button>
        </DialogContent>
      </Dialog>

      {/* Demo Request Modal */}
      <Dialog open={showDemoModal} onOpenChange={setShowDemoModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 mb-4">
              <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <DialogTitle className="text-center">Demo Request Sent!</DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-2 text-sm text-muted-foreground">
            <div>Your demo request has been sent to the owner.</div>
            <div className="font-semibold text-foreground">The owner will contact you shortly to schedule the demo.</div>
          </div>
          <Button
            onClick={() => setShowDemoModal(false)}
            className="w-full mt-4"
          >
            Got it!
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ToolDetails;
