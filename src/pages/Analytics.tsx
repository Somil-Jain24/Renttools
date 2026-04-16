import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, TrendingUp, DollarSign, Lock, ArrowUp } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { toolAnalytics, tools } from "@/lib/mockData";

type PeriodFilter = "7days" | "30days" | "90days" | "alltime";

const Analytics = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>("30days");
  const [sortBy, setSortBy] = useState<"views" | "bookings" | "revenue">("views");

  // Access control
  if (!currentUser) {
    navigate("/signup");
    return null;
  }

  if (currentUser.mode !== "seller") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Seller Mode Required</h1>
            <p className="text-muted-foreground mb-6">
              Switch to Seller Mode to view analytics.
            </p>
            <Button onClick={() => navigate("/profile")}>
              Go to Profile
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate global metrics
  const totalViews = toolAnalytics.reduce((sum, t) => sum + t.views, 0);
  const totalBookings = toolAnalytics.reduce((sum, t) => sum + t.bookings, 0);
  const totalRevenue = toolAnalytics.reduce((sum, t) => sum + t.revenue, 0);
  const globalConversionRate = totalViews > 0 ? ((totalBookings / totalViews) * 100).toFixed(2) : "0.00";

  // Sort analytics data
  const sortedAnalytics = [...toolAnalytics].sort((a, b) => {
    switch (sortBy) {
      case "views":
        return b.views - a.views;
      case "bookings":
        return b.bookings - a.bookings;
      case "revenue":
        return b.revenue - a.revenue;
      default:
        return 0;
    }
  });

  // Calculate max values for chart scaling
  const maxViews = Math.max(...toolAnalytics.map(t => t.views), 1);
  const maxRevenue = Math.max(...toolAnalytics.map(t => t.revenue), 1);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="container mx-auto flex-1 px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Track your tool performance and optimize pricing</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Eye className="h-4 w-4" /> Total Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">all tools</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Total Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalBookings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">{globalConversionRate}% conversion</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" /> Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">{toolAnalytics.length} active tools</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ArrowUp className="h-4 w-4" /> Avg. Conversion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {toolAnalytics.length > 0 
                  ? ((toolAnalytics.reduce((sum, t) => sum + t.conversionRate, 0) / toolAnalytics.length).toFixed(2))
                  : "0.00"}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">across all tools</p>
            </CardContent>
          </Card>
        </div>

        {/* Period Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="text-sm font-medium text-muted-foreground py-2">Period:</span>
          {(["7days", "30days", "90days", "alltime"] as const).map(period => {
            const labels = {
              "7days": "Last 7 Days",
              "30days": "Last 30 Days",
              "90days": "Last 90 Days",
              "alltime": "All Time"
            };
            return (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {labels[period]}
              </Button>
            );
          })}
        </div>

        {/* Tool Performance Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tool Performance</CardTitle>
                <CardDescription>Detailed metrics for each of your tools</CardDescription>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex gap-2 mt-4">
              <span className="text-sm font-medium text-muted-foreground py-2">Sort by:</span>
              {(["views", "bookings", "revenue"] as const).map(option => (
                <Button
                  key={option}
                  variant={sortBy === option ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy(option)}
                  className="capitalize"
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardHeader>

          <CardContent>
            {sortedAnalytics.length > 0 ? (
              <div className="space-y-6">
                {sortedAnalytics.map((analytics, index) => {
                  const tool = tools.find(t => t.id === analytics.toolId);
                  const viewsPercent = (analytics.views / maxViews) * 100;
                  const revenuePercent = (analytics.revenue / maxRevenue) * 100;

                  return (
                    <div key={analytics.toolId} className="border-b pb-6 last:border-b-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{index + 1}. {analytics.toolName}</h3>
                          {tool && (
                            <p className="text-xs text-muted-foreground mt-1">
                              ₹{tool.pricePerDay}/day • {tool.location}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-6 sm:justify-end">
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Conversion Rate</p>
                            <p className="font-semibold text-lg">{analytics.conversionRate.toFixed(2)}%</p>
                          </div>
                        </div>
                      </div>

                      {/* Views Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium flex items-center gap-2">
                            <Eye className="h-4 w-4 text-blue-500" /> Views
                          </span>
                          <span className="text-sm font-semibold">{analytics.views.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-blue-500 h-full rounded-full transition-all"
                            style={{ width: `${viewsPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Bookings & Revenue Side by Side */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-green-500" /> Bookings
                            </span>
                            <span className="text-sm font-semibold">{analytics.bookings}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-green-500 h-full rounded-full transition-all"
                              style={{ width: `${(analytics.bookings / Math.max(...toolAnalytics.map(t => t.bookings))) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-orange-500" /> Revenue
                            </span>
                            <span className="text-sm font-semibold">₹{analytics.revenue.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-orange-500 h-full rounded-full transition-all"
                              style={{ width: `${revenuePercent}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          Optimize Pricing
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground mb-2">No analytics data available</p>
                <p className="text-xs text-muted-foreground">List tools to start tracking analytics</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="mt-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-base">💡 Tips to Improve Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong>High Views, Low Bookings?</strong> Consider lowering your rental price or improving your tool photos and description.</p>
            <p>• <strong>Optimize Availability:</strong> Tools with consistent availability tend to get more bookings.</p>
            <p>• <strong>Respond Quickly:</strong> Answer buyer questions and negotiate offers promptly to increase conversions.</p>
            <p>• <strong>Add Usage Guides:</strong> Detailed instructions help buyers feel confident renting from you.</p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Analytics;
