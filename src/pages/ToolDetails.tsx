import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TrustBadge } from "@/components/TrustBadge";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tools, negotiatedOffers } from "@/lib/mockData";
import { MapPin, User, Shield, ArrowLeft, FileText, Download, Zap } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { createOffer } from "@/lib/utils";

const ToolDetails = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { id } = useParams();
  const tool = tools.find(t => t.id === id);
  const [days, setDays] = useState(1);
  const [showGuide, setShowGuide] = useState(false);
  const [showOfferInput, setShowOfferInput] = useState(false);
  const [offerPrice, setOfferPrice] = useState("");
  const [offers, setOffers] = useState(negotiatedOffers);

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

  const totalPrice = tool.pricePerDay * days;
  const today = new Date().toISOString().split("T")[0];
  const endDate = new Date(new Date().setDate(new Date().getDate() + days)).toISOString().split("T")[0];

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
    if (!offerPrice || Number(offerPrice) <= 0) {
      alert("Please enter a valid price");
      return;
    }

    if (!currentUser || !tool) return;

    const newOffer = createOffer(
      tool.id,
      currentUser.id,
      tool.owner.id,
      Number(offerPrice),
      totalPrice,
      today,
      endDate
    );

    setOffers([...offers, newOffer]);
    setOfferPrice("");
    setShowOfferInput(false);
    alert("Offer sent to the owner! They will review it within 2 hours.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-8">
        <Link to="/browse" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to browse
        </Link>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Images */}
          <div className="lg:col-span-3">
            <div className="aspect-[4/3] rounded-2xl bg-muted overflow-hidden border">
              <img src={tool.images[0]} alt={tool.name} className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Details & Rental */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-2 py-1">{tool.subcategory || tool.category}</span>
              <h1 className="text-2xl font-bold mt-2">{tool.name}</h1>
              <p className="text-muted-foreground mt-2 text-sm">{tool.description}</p>
            </div>

            <div className="text-3xl font-bold text-primary">
              ₹{tool.pricePerDay}<span className="text-sm font-normal text-muted-foreground">/day</span>
            </div>

            {/* Owner */}
            <div className="rounded-xl border bg-card p-4 space-y-3">
              <h3 className="text-sm font-semibold">Owner</h3>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">{tool.owner.name}</p>
                  <div className="flex items-center gap-2">
                    <StarRating score={tool.owner.trustScore} showScore />
                    <span className="text-xs text-muted-foreground">{tool.owner.trustScore}/100</span>
                  </div>
                </div>
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

            {/* Usage Guide */}
            {tool.usageGuide && (
              <div className="rounded-xl border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
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
                </div>
                {showGuide && (
                  <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground whitespace-pre-line">
                    {tool.usageGuide}
                  </div>
                )}
              </div>
            )}

            {/* Rental section */}
            <div className="rounded-xl border bg-card p-4 space-y-4">
              <h3 className="text-sm font-semibold">Rent this tool</h3>
              <div>
                <label className="text-xs text-muted-foreground">Duration (days)</label>
                <div className="flex items-center gap-3 mt-1">
                  <Button variant="outline" size="sm" onClick={() => setDays(Math.max(1, days - 1))}>-</Button>
                  <span className="text-lg font-semibold w-8 text-center">{days}</span>
                  <Button variant="outline" size="sm" onClick={() => setDays(days + 1)}>+</Button>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">₹{tool.pricePerDay} × {days} day{days > 1 ? "s" : ""}</span><span className="font-medium">₹{totalPrice}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Security deposit</span><span className="font-medium">₹{tool.deposit}</span></div>
                <div className="border-t pt-2 flex justify-between font-semibold"><span>Total</span><span className="text-primary">₹{totalPrice + tool.deposit}</span></div>
              </div>

              {/* Negotiated Offer Section */}
              {currentUser && !currentUser.isSeller && (
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Make an Offer</span>
                  </div>
                  {!showOfferInput ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setShowOfferInput(true)}
                    >
                      Negotiate Price
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-blue-800 dark:text-blue-200">Your offer price (₹)</label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder={String(totalPrice - 50)}
                          value={offerPrice}
                          onChange={(e) => setOfferPrice(e.target.value)}
                          className="h-8 text-sm"
                          min={1}
                          max={totalPrice}
                        />
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-300">Original: ₹{totalPrice} | Min: ₹{Math.floor(totalPrice * 0.7)}</p>
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
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Button
                className="w-full"
                size="lg"
                disabled={!tool.available || !currentUser}
                onClick={() => {
                  if (!currentUser) {
                    navigate("/signup");
                  } else {
                    // Handle rental request
                    alert("Rental request submitted!");
                  }
                }}
              >
                {!currentUser ? "Login to Rent" : tool.available ? "Request to Rent" : "Currently Unavailable"}
              </Button>
              {!currentUser && (
                <p className="text-xs text-muted-foreground text-center">You must be logged in to rent tools</p>
              )}
              {currentUser?.isSeller && (
                <p className="text-xs text-blue-600 dark:text-blue-400 text-center">To list items for rent, switch to Renter Mode from your dashboard</p>
              )}
            </div>

            {/* Pickup */}
            <div className="rounded-xl border bg-card p-4 space-y-2">
              <h3 className="text-sm font-semibold flex items-center gap-2"><MapPin className="h-4 w-4" /> Pickup Location</h3>
              <p className="text-sm text-muted-foreground">{tool.location}</p>
              <p className="text-xs text-muted-foreground">Self Pickup from Owner Location</p>
              <div className="aspect-[16/9] rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-sm">
                <MapPin className="h-5 w-5 mr-1" /> Map placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ToolDetails;
