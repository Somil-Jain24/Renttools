import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TrustBadge } from "@/components/TrustBadge";
import { StarRating } from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { tools } from "@/lib/mockData";
import { MapPin, User, Shield, ArrowLeft, FileText, Download } from "lucide-react";
import { useUser } from "@/context/UserContext";

const ToolDetails = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { id } = useParams();
  const tool = tools.find(t => t.id === id);
  const [days, setDays] = useState(1);
  const [showGuide, setShowGuide] = useState(false);

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
              <Button
                className="w-full"
                size="lg"
                disabled={!tool.available || !currentUser}
                onClick={() => {
                  if (!currentUser) {
                    navigate("/signup");
                  } else if (currentUser.isSeller) {
                    alert("Sellers cannot rent tools. Switch to buyer account to rent.");
                  } else {
                    // Handle rental request
                    alert("Rental request submitted!");
                  }
                }}
              >
                {!currentUser ? "Login to Rent" : currentUser.isSeller ? "Sellers Cannot Rent" : tool.available ? "Request to Rent" : "Currently Unavailable"}
              </Button>
              {!currentUser && (
                <p className="text-xs text-muted-foreground text-center">You must be logged in to rent tools</p>
              )}
              {currentUser?.isSeller && (
                <p className="text-xs text-amber-600 text-center">Switch to a buyer account to rent tools</p>
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
