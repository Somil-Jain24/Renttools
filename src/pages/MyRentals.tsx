import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, CheckCircle, MessageSquare, Eye, Zap, RotateCcw, Lock } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { myRentals, Rental, ConditionRecord } from "@/lib/mockData";
import { ExtendRentalDialog } from "@/components/ExtendRentalDialog";
import { PickupConditionCheck } from "@/components/PickupConditionCheck";
import { DepositStatusCard } from "@/components/DepositStatusCard";
import { ConditionStatusBadge } from "@/components/ConditionStatusBadge";

const MyRentals = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [statusFilter, setStatusFilter] = useState<"all" | "REQUESTED" | "APPROVED" | "BORROWED">("all");
  const [extendDialogOpen, setExtendDialogOpen] = useState(false);
  const [selectedRentalForExtend, setSelectedRentalForExtend] = useState<Rental | null>(null);
  const [pickupCheckDialogOpen, setPickupCheckDialogOpen] = useState(false);
  const [selectedRentalForPickup, setSelectedRentalForPickup] = useState<Rental | null>(null);

  // Filter for active and upcoming rentals only (exclude RETURNED)
  const activeRentals = myRentals.filter(r => r.status !== "RETURNED");

  // Apply status filter
  const filteredRentals = statusFilter === "all"
    ? activeRentals
    : activeRentals.filter(r => r.status === statusFilter);

  // Helper to determine rental status display
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "BORROWED":
        return "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300";
      case "APPROVED":
        return "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300";
      case "REQUESTED":
        return "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300";
      default:
        return "bg-gray-100 dark:bg-gray-950 text-gray-700 dark:text-gray-300";
    }
  };

  // Helper to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "BORROWED":
        return <CheckCircle className="h-4 w-4" />;
      case "APPROVED":
        return <Clock className="h-4 w-4" />;
      case "REQUESTED":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "BORROWED":
        return "Active";
      case "APPROVED":
        return "Approved - Upcoming";
      case "REQUESTED":
        return "Pending Approval";
      default:
        return status;
    }
  };

  const handlePickupConditionSubmit = (conditionRecord: ConditionRecord) => {
    if (selectedRentalForPickup) {
      selectedRentalForPickup.pickupCondition = conditionRecord;
      selectedRentalForPickup.pickupConditionPending = false;
      selectedRentalForPickup.status = "BORROWED";
      alert("✓ Pickup condition verified! Item is now marked as borrowed.");
      setPickupCheckDialogOpen(false);
      setSelectedRentalForPickup(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="container mx-auto flex-1 px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Rentals</h1>
          <p className="text-muted-foreground">Track your active and upcoming tool rentals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Zap className="h-4 w-4" /> Active Rentals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {activeRentals.filter(r => r.status === "BORROWED").length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Currently in use</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" /> Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {activeRentals.filter(r => r.status === "APPROVED").length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Ready to pick up</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertCircle className="h-4 w-4" /> Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {activeRentals.filter(r => r.status === "REQUESTED").length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground py-2">Filter:</span>
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            All Rentals
          </Button>
          <Button
            variant={statusFilter === "BORROWED" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("BORROWED")}
          >
            Active
          </Button>
          <Button
            variant={statusFilter === "APPROVED" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("APPROVED")}
          >
            Upcoming
          </Button>
          <Button
            variant={statusFilter === "REQUESTED" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("REQUESTED")}
          >
            Pending
          </Button>
        </div>

        {/* Rentals List */}
        {filteredRentals.length > 0 ? (
          <div className="space-y-4">
            {filteredRentals.map(rental => (
              <Card key={rental.id} className="overflow-hidden border-border/60 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Tool Info */}
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold">{rental.tool.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{rental.tool.location}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Price/Day:</span>
                          <span className="font-semibold">₹{rental.tool.pricePerDay}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Total Amount:</span>
                          <span className="font-semibold">₹{rental.totalPrice}</span>
                        </div>
                        {rental.amountDeposited && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Security Deposit:</span>
                            <span className="font-semibold">₹{rental.amountDeposited}</span>
                          </div>
                        )}
                      </div>

                      {/* Show Deposit Status Card for active rentals */}
                      {rental.amountDeposited && rental.status === "BORROWED" && rental.pickupCondition && (
                        <div className="pt-2 mt-2 border-t">
                          <DepositStatusCard
                            depositAmount={rental.amountDeposited}
                            depositStatus={rental.depositStatus}
                            deductionPercent={rental.depositDeduction?.percentage}
                            deductionReason={rental.depositDeduction?.reason}
                            refundAmount={rental.depositRefundAmount}
                            showDetails={false}
                          />
                        </div>
                      )}
                    </div>

                    {/* Rental Dates & Owner */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Rental Period</p>
                        <p className="text-sm font-medium">{rental.startDate} to {rental.endDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Owner</p>
                        <p className="text-sm font-medium">{rental.tool.owner.name}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(Math.round(rental.tool.owner.trustScore / 20))].map((_, i) => (
                            <span key={i} className="text-yellow-500">★</span>
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            {rental.tool.owner.trustScore} trust score
                          </span>
                        </div>
                      </div>

                      {/* Condition Status */}
                      <div className="border-t pt-3">
                        <ConditionStatusBadge
                          pickupCondition={rental.pickupCondition}
                          returnCondition={rental.returnCondition}
                          pickupPending={rental.pickupConditionPending}
                          returnPending={rental.returnConditionPending}
                        />
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="space-y-3">
                      <div>
                        <Badge className={`${getStatusBadgeColor(rental.status)} flex items-center gap-2 w-fit`}>
                          {getStatusIcon(rental.status)}
                          {getStatusLabel(rental.status)}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">
                          {rental.status === "BORROWED" && (
                            <>
                              {rental.pickupCondition ? "Item currently in use" : "⚠️ Pickup verification pending"}
                            </>
                          )}
                          {rental.status === "APPROVED" && "🔒 Pickup verification required"}
                          {rental.status === "REQUESTED" && "Waiting for owner approval"}
                        </p>

                        {/* Show pickup verification pending alert */}
                        {rental.status === "APPROVED" && (
                          <div className="mt-2 p-3 rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800">
                            <p className="text-xs font-medium text-blue-900 dark:text-blue-200">
                              ✓ Owner approved! Now verify the item condition before using it.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full flex items-center gap-2"
                          onClick={() => navigate(`/tools/${rental.tool.id}`)}
                        >
                          <Eye className="h-4 w-4" /> View Details
                        </Button>
                        {rental.status !== "REQUESTED" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full flex items-center gap-2"
                            onClick={() => navigate(`/chat/${rental.id}`)}
                          >
                            <MessageSquare className="h-4 w-4" /> Chat with Owner
                          </Button>
                        )}
                        {rental.status === "APPROVED" && (
                          <Button
                            size="sm"
                            variant="default"
                            className="w-full flex items-center gap-2"
                            onClick={() => {
                              setSelectedRentalForPickup(rental);
                              setPickupCheckDialogOpen(true);
                            }}
                          >
                            <Lock className="h-4 w-4" /> Verify & Confirm Pickup
                          </Button>
                        )}
                        {rental.status === "BORROWED" && (
                          <>
                            {/* Show warning if pickup verification is missing */}
                            {!rental.pickupCondition && (
                              <Button
                                size="sm"
                                variant="destructive"
                                className="w-full flex items-center gap-2"
                                onClick={() => {
                                  setSelectedRentalForPickup(rental);
                                  setPickupCheckDialogOpen(true);
                                }}
                              >
                                <AlertCircle className="h-4 w-4" /> ⚠️ Complete Pickup Verification
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                              onClick={() => {
                                setSelectedRentalForExtend(rental);
                                setExtendDialogOpen(true);
                              }}
                              disabled={!rental.pickupCondition}
                              title={!rental.pickupCondition ? "Complete pickup verification first" : ""}
                            >
                              Extend Rental
                            </Button>
                            <Button
                              size="sm"
                              variant="default"
                              className="w-full flex items-center gap-2"
                              onClick={() => navigate(`/damage-check?rentalId=${rental.id}`)}
                              disabled={!rental.pickupCondition}
                              title={!rental.pickupCondition ? "Complete pickup verification first" : ""}
                            >
                              <RotateCcw className="h-4 w-4" /> Return Tool
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">No Active Rentals</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {statusFilter === "all"
                      ? "You don't have any active or upcoming rentals. Browse tools to get started!"
                      : `No ${statusFilter.toLowerCase()} rentals found.`}
                  </p>
                </div>
                <Button onClick={() => navigate("/browse")} variant="default">
                  Browse Tools
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />

      {/* Extend Rental Dialog */}
      {selectedRentalForExtend && (
        <ExtendRentalDialog
          open={extendDialogOpen}
          onOpenChange={setExtendDialogOpen}
          rental={selectedRentalForExtend}
          onExtend={(newEndDate) => {
            alert(`Rental extended to ${newEndDate}`);
            setExtendDialogOpen(false);
          }}
        />
      )}

      {/* Pickup Condition Check Dialog */}
      {selectedRentalForPickup && pickupCheckDialogOpen && (
        <PickupConditionCheck
          rentalId={selectedRentalForPickup.id}
          borrowerName={currentUser?.name || "Borrower"}
          toolName={selectedRentalForPickup.tool.name}
          onSubmit={handlePickupConditionSubmit}
          onCancel={() => {
            setPickupCheckDialogOpen(false);
            setSelectedRentalForPickup(null);
          }}
        />
      )}
    </div>
  );
};

export default MyRentals;
