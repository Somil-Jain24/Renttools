import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle, Lock, ChevronDown } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { transactions, tools } from "@/lib/mockData";

const Earnings = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const [selectedPeriod, setSelectedPeriod] = useState<"month" | "allTime">("month");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "paid" | "pending" | "failed">("all");

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
              Switch to Seller Mode to view your earnings.
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

  // Filter transactions for current seller
  const sellerTransactions = transactions.filter(t => t.sellerId === currentUser.id);

  // Calculate summary stats
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  
  const monthTransactions = sellerTransactions.filter(t => t.createdAt.startsWith(currentMonth));
  const paidTransactions = sellerTransactions.filter(t => t.status === "PAID");
  const pendingTransactions = sellerTransactions.filter(t => t.status === "PENDING");

  const totalEarnings = paidTransactions.reduce((sum, t) => sum + t.rentalAmount, 0);
  const monthlyEarnings = monthTransactions
    .filter(t => t.status === "PAID")
    .reduce((sum, t) => sum + t.rentalAmount, 0);
  const pendingPayout = pendingTransactions.reduce((sum, t) => sum + t.rentalAmount, 0);

  // Filter transactions by status
  const filteredTransactions = selectedStatus === "all"
    ? sellerTransactions
    : sellerTransactions.filter(t => t.status.toLowerCase() === selectedStatus.toLowerCase());

  // Group by date for mini chart
  const earningsByDate: { [key: string]: number } = {};
  sellerTransactions
    .filter(t => t.status === "PAID")
    .forEach(t => {
      const dateKey = t.paidAt?.substring(0, 10) || t.createdAt.substring(0, 10);
      earningsByDate[dateKey] = (earningsByDate[dateKey] || 0) + t.rentalAmount;
    });

  const sortedDates = Object.keys(earningsByDate).sort().slice(-7);
  const maxEarning = Math.max(...Object.values(earningsByDate), 1);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto flex-1 px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Earnings</h1>
          <p className="text-muted-foreground">Track your rental earnings and manage payouts</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {/* Total Earnings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" /> Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{totalEarnings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">{paidTransactions.length} completed rentals</p>
            </CardContent>
          </Card>

          {/* Monthly Earnings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{monthlyEarnings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">{monthTransactions.filter(t => t.status === "PAID").length} rentals</p>
            </CardContent>
          </Card>

          {/* Pending Payouts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" /> Pending Payout
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{pendingPayout.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">{pendingTransactions.length} pending</p>
            </CardContent>
          </Card>
        </div>

        {/* Mini Earnings Chart */}
        {sortedDates.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Last 7 Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2 h-32">
                {sortedDates.map(date => {
                  const earning = earningsByDate[date];
                  const heightPercent = (earning / maxEarning) * 100;
                  return (
                    <div key={date} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
                        style={{ height: `${Math.max(heightPercent, 5)}%` }}
                        title={`₹${earning}`}
                      />
                      <span className="text-xs text-muted-foreground">
                        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>Complete list of all your rental earnings</CardDescription>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mt-4 flex-wrap">
              <div className="flex gap-1">
                {(["all", "paid", "pending", "failed"] as const).map(status => (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(status)}
                    className="capitalize"
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {filteredTransactions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Tool</th>
                      <th className="text-left py-3 px-3 font-semibold text-muted-foreground">Period</th>
                      <th className="text-right py-3 px-3 font-semibold text-muted-foreground">Amount</th>
                      <th className="text-center py-3 px-3 font-semibold text-muted-foreground">Deposit</th>
                      <th className="text-center py-3 px-3 font-semibold text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map(transaction => {
                      const tool = tools.find(t => t.id === transaction.toolId);
                      const statusColor = {
                        "PAID": "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300",
                        "PENDING": "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300",
                        "FAILED": "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300",
                      }[transaction.status];

                      return (
                        <tr key={transaction.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-3 text-muted-foreground">
                            {new Date(transaction.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-3 font-medium">{tool?.name || "Unknown Tool"}</td>
                          <td className="py-3 px-3 text-sm text-muted-foreground">
                            {transaction.rentalStartDate} to {transaction.rentalEndDate}
                          </td>
                          <td className="py-3 px-3 text-right font-semibold">₹{transaction.rentalAmount.toLocaleString()}</td>
                          <td className="py-3 px-3 text-center text-sm">
                            {transaction.depositRefunded ? (
                              <span className="inline-flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-4 w-4" /> Refunded
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-orange-600">
                                <Clock className="h-4 w-4" /> ₹{transaction.depositAmount}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}>
                              {transaction.status === "PAID" && <CheckCircle className="h-3 w-3" />}
                              {transaction.status === "PENDING" && <Clock className="h-3 w-3" />}
                              {transaction.status === "FAILED" && <AlertCircle className="h-3 w-3" />}
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground mb-2">No transactions found</p>
                <p className="text-xs text-muted-foreground">Start listing tools to earn money</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bank Account Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Bank Account</CardTitle>
            <CardDescription>Your earnings will be transferred to this account</CardDescription>
          </CardHeader>
          <CardContent>
            {currentUser.sellerProfile?.bankAccountLinked ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Account linked and verified</p>
                <Button variant="outline" className="w-full">Update Bank Details</Button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Link a bank account to receive payouts</p>
                <Button className="w-full">Add Bank Account</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Earnings;
