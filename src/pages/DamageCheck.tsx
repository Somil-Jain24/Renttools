import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowLeft, RotateCcw, Clock } from "lucide-react";
import { myRentals } from "@/lib/mockData";

const DamageCheck = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rentalId = searchParams.get("rentalId");
  const rental = myRentals.find(r => r.id === rentalId);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!rental) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="container mx-auto flex-1 px-4 py-8 max-w-3xl">
          <Card className="mt-8">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">Rental Not Found</h2>
              <p className="text-sm text-muted-foreground mb-4">The rental you're trying to return doesn't exist.</p>
              <Button onClick={() => navigate("/my-rentals")} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to My Rentals
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (rental.status !== "BORROWED") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="container mx-auto flex-1 px-4 py-8 max-w-3xl">
          <Card className="mt-8">
            <CardContent className="pt-6 text-center">
              <AlertCircle className="h-12 w-12 text-warning mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">Cannot Return This Rental</h2>
              <p className="text-sm text-muted-foreground mb-4">
                This item cannot be returned at this time. Current status: {rental.status}
              </p>
              <Button onClick={() => navigate("/my-rentals")} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to My Rentals
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInitiateReturn = () => {
    setIsProcessing(true);
    // Mark rental as returned after a brief delay
    setTimeout(() => {
      rental.status = "RETURNED";
      rental.returnConditionPending = true;
      alert("✓ Return initiated! The owner will verify the condition and process your deposit refund.");
      navigate("/my-rentals");
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/my-rentals")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-bold mb-2">Return Tool</h1>
          <p className="text-muted-foreground">Initiate the return process for your rental</p>
        </div>

        {/* Rental Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{rental.tool.name}</CardTitle>
            <CardDescription>{rental.tool.location}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Owner</p>
                <p className="font-semibold">{rental.tool.owner.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Rental Period</p>
                <p className="font-semibold">{rental.startDate} to {rental.endDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                <p className="font-semibold">₹{rental.totalPrice}</p>
              </div>
              {rental.amountDeposited && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Security Deposit</p>
                  <p className="font-semibold">₹{rental.amountDeposited}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pickup Condition Reference */}
        {rental.pickupCondition && (
          <Card className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-base">📥 Initial Pickup Condition (Reference)</CardTitle>
              <CardDescription>This is the condition when you picked up the item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Condition Status:</span>
                <Badge variant="outline">{rental.pickupCondition.status}</Badge>
              </div>
              {rental.pickupCondition.damageLevel && (
                <div className="flex items-center justify-between">
                  <span className="text-sm">Damage Level:</span>
                  <Badge>{rental.pickupCondition.damageLevel}</Badge>
                </div>
              )}
              {rental.pickupCondition.description && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Description:</p>
                  <p className="text-sm">{rental.pickupCondition.description}</p>
                </div>
              )}
              <div className="text-xs text-muted-foreground pt-2 border-t">
                Recorded on: {new Date(rental.pickupCondition.timestamp).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Return Instructions */}
        <Card className="mb-6 border-orange-200 bg-orange-50 dark:bg-orange-950/30 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-5 w-5" /> Return Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              By clicking "Initiate Return" below, you're confirming that:
            </p>
            <ul className="space-y-2 pl-4 list-disc">
              <li>The tool will be physically returned to the owner</li>
              <li>The owner will verify the condition upon receiving it</li>
              <li>Based on the owner's assessment, your security deposit will be refunded (minus any deductions for damage)</li>
              <li>The return process typically takes 2-3 business days</li>
            </ul>
          </CardContent>
        </Card>

        {/* Important Security Deposit Info */}
        {rental.amountDeposited && (
          <Card className="mb-6 border-green-200 bg-green-50 dark:bg-green-950/30 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-base">💰 Security Deposit Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Current Deposit (Locked):</span>
                <span className="font-semibold">₹{rental.amountDeposited}</span>
              </div>
              <div className="text-xs text-muted-foreground pt-2 border-t">
                ✓ Your deposit is secure and will be processed after the owner verifies the item's return condition.
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate("/my-rentals")}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 flex items-center gap-2"
            size="lg"
            onClick={handleInitiateReturn}
            disabled={isProcessing}
          >
            <RotateCcw className="h-4 w-4" />
            {isProcessing ? "Processing..." : "Initiate Return"}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DamageCheck;
