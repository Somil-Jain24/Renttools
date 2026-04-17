import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MessageSquare, Archive } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { myRentals, rentalRatings } from "@/lib/mockData";

const MyOrders = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);

  // Filter for past rentals only (RETURNED status)
  const pastRentals = myRentals.filter(r => r.status === "RETURNED");

  // Get rating for a rental
  const getRatingForRental = (rentalId: string) => {
    return rentalRatings.find(r => r.rentalId === rentalId);
  };

  // Calculate stats
  const totalSpent = pastRentals.reduce((sum, r) => sum + r.totalPrice, 0);
  const avgRating = pastRentals.length > 0
    ? (rentalRatings
        .filter(r => pastRentals.some(pr => pr.id === r.rentalId))
        .reduce((sum, r) => sum + r.rating, 0) / rentalRatings.filter(r => pastRentals.some(pr => pr.id === r.rentalId)).length)
    : 0;

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="text-sm font-medium ml-2">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="container mx-auto flex-1 px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My History</h1>
          <p className="text-muted-foreground">View rental history and manage reviews</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Rentals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pastRentals.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Completed rentals</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{totalSpent.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" /> Avg Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{avgRating.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground mt-1">From {rentalRatings.filter(r => pastRentals.some(pr => pr.id === r.rentalId)).length} reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        {pastRentals.length > 0 ? (
          <div className="space-y-4">
            {pastRentals.map(rental => {
              const rating = getRatingForRental(rental.id);
              return (
                <Card key={rental.id} className="overflow-hidden border-border/60">
                  <CardContent className="p-6">
                    {/* Main Order Info */}
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      {/* Tool Info */}
                      <div>
                        <h3 className="font-semibold text-base mb-1">{rental.tool.name}</h3>
                        <p className="text-xs text-muted-foreground">{rental.tool.location}</p>
                        <p className="text-sm font-medium text-primary mt-2">₹{rental.totalPrice}</p>
                      </div>

                      {/* Dates */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Rental Period</p>
                        <p className="text-sm font-medium">
                          {new Date(rental.startDate).toLocaleDateString()} to{" "}
                          {new Date(rental.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {Math.ceil((new Date(rental.endDate).getTime() - new Date(rental.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                        </p>
                      </div>

                      {/* Owner */}
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Owner</p>
                        <p className="text-sm font-medium">{rental.tool.owner.name}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(Math.round(rental.tool.owner.trustScore / 20))].map((_, i) => (
                            <span key={i} className="text-yellow-500 text-xs">★</span>
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">
                            {rental.tool.owner.trustScore}
                          </span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex flex-col justify-between gap-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Rental Status</p>
                          <p className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 px-2.5 py-0.5 text-xs font-medium">
                            Returned
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Deposit Status</p>
                          <p className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            rental.depositStatus === "RELEASED"
                              ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
                              : "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300"
                          }`}>
                            {rental.depositStatus === "RELEASED" ? "Deposit Release" : "Deposit Locked"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Review Section */}
                    <div className="border-t border-border/50 pt-4 mt-4">
                      {rating ? (
                        // Existing Review
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-sm mb-1">Your Review</h4>
                            {renderStars(rating.rating)}
                          </div>

                          {expandedReviewId === rating.id ? (
                            <div className="space-y-2">
                              <p className="text-sm text-foreground">{rating.comment}</p>
                              <p className="text-xs text-muted-foreground">
                                Reviewed on {new Date(rating.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          ) : (
                            <p className="text-sm text-foreground line-clamp-2">{rating.comment}</p>
                          )}

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setExpandedReviewId(expandedReviewId === rating.id ? null : rating.id)}
                            className="text-xs"
                          >
                            {expandedReviewId === rating.id ? "Show Less" : "Show More"}
                          </Button>
                        </div>
                      ) : (
                        // No Review Yet
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium mb-1">No review yet</p>
                            <p className="text-xs text-muted-foreground">
                              Share your experience with this rental to help the owner and other users
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="default"
                            className="flex items-center gap-2 flex-shrink-0"
                            onClick={() => alert("Review form coming soon")}
                          >
                            <MessageSquare className="h-4 w-4" /> Leave Review
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <Archive className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">No Past Rentals</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your completed rental history will appear here. Start renting tools today!
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
    </div>
  );
};

export default MyOrders;
