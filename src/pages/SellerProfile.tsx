import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, CheckCircle, AlertCircle, Download, Edit2, Star, Shield, DollarSign, FileText, Upload } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SellerProfile = () => {
  const navigate = useNavigate();
  const { currentUser } = useUser();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullName: currentUser?.name || "",
    phone: currentUser?.phone || "",
    address: currentUser?.location || "",
    bankAccountNumber: "****1234",
    bankIFSC: "SBIN0001234",
    accountHolderName: currentUser?.name || "",
  });

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
              Switch to Seller Mode to access your profile.
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

  if (!currentUser.isSeller) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Seller Registration Required</h1>
            <p className="text-muted-foreground mb-6">
              Complete seller registration to set up your KYC profile.
            </p>
            <Button onClick={() => navigate("/seller-registration")}>
              Complete Registration
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const kycStatus = currentUser.sellerProfile?.verificationStatus || "pending";
  const kycRejectReason = currentUser.sellerProfile?.rejectionReason || null;

  const handleSaveChanges = () => {
    toast({
      title: "Success",
      description: "Your profile changes have been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleDownloadStatement = () => {
    toast({
      title: "Download started",
      description: "Your payout statement is being prepared.",
    });
    // Mock download functionality
    setTimeout(() => {
      const element = document.createElement("a");
      element.setAttribute("href", "data:text/plain;charset=utf-8,Payout Statement");
      element.setAttribute("download", "payout-statement.pdf");
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300";
      case "rejected":
        return "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300";
      default:
        return "bg-gray-100 dark:bg-gray-950 text-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5" />;
      case "pending":
        return <AlertCircle className="h-5 w-5" />;
      case "rejected":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="container mx-auto flex-1 px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Seller Profile & KYC</h1>
          <p className="text-muted-foreground">Manage your legal information and verification status</p>
        </div>

        {/* Trust Score Card */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-success/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              Your Seller Trust Score
            </CardTitle>
            <CardDescription>Based on ratings, response time, and reliability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-6">
              <div>
                <div className="text-5xl font-bold text-primary">{currentUser.trustScores.sellerScore}</div>
                <p className="text-sm text-muted-foreground mt-2">/100</p>
              </div>
              <div className="flex-1">
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary to-success h-3 rounded-full transition-all" 
                    style={{ width: `${currentUser.trustScores.sellerScore}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Poor</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              ✓ 4.8 avg rating • ✓ 2.5 hrs avg response time • ✓ 98% acceptance rate
            </p>
          </CardContent>
        </Card>

        {/* KYC Status Card */}
        <Card className="mb-8 border-border/60">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Verification Status
              </CardTitle>
              <Badge className={`${getStatusColor(kycStatus)} flex items-center gap-1`}>
                {getStatusIcon(kycStatus)}
                {kycStatus.charAt(0).toUpperCase() + kycStatus.slice(1)}
              </Badge>
            </div>
            <CardDescription>
              {kycStatus === "verified" 
                ? "Your account has been verified and you can list and sell tools."
                : kycStatus === "pending"
                ? "Your verification is under review. This usually takes 24-48 hours."
                : "Your verification was rejected. Please review the reason below and resubmit."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {kycStatus === "rejected" && kycRejectReason && (
                <div className="rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 p-4">
                  <p className="text-sm font-medium text-red-700 dark:text-red-300 mb-2">Rejection Reason:</p>
                  <p className="text-sm text-red-600 dark:text-red-400">{kycRejectReason}</p>
                </div>
              )}

              {kycStatus === "verified" && (
                <div className="rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-4">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    ✓ Verified on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">ID Type</p>
                  <p className="font-medium">Aadhar Card</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">ID Status</p>
                  <p className="font-medium">{kycStatus === "verified" ? "Verified" : "Pending Verification"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Bank Account</p>
                  <p className="font-medium">{currentUser.sellerProfile?.bankAccountLinked ? "Linked & Verified" : "Not Linked"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legal Information */}
        <Card className="mb-8 border-border/60">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Legal Information</CardTitle>
              {!isEditing && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Edit2 className="h-4 w-4" /> Edit
                </Button>
              )}
            </div>
            <CardDescription>Your personal and legal details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        value={editData.fullName}
                        onChange={(e) => setEditData({...editData, fullName: e.target.value})}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input
                        value={editData.phone}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <Input
                      value={editData.address}
                      onChange={(e) => setEditData({...editData, address: e.target.value})}
                      placeholder="Your complete address"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveChanges} size="sm">Save Changes</Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      size="sm"
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{editData.fullName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium">{editData.phone}</p>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{editData.address}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card className="mb-8 border-border/60">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Bank Account Details
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="h-4 w-4" /> Update
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Update Bank Details</DialogTitle>
                    <DialogDescription>
                      Your payouts will be sent to this account
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Account Number</label>
                      <Input
                        type="password"
                        defaultValue="1234567890123456"
                        placeholder="Your 16-digit account number"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">IFSC Code</label>
                      <Input
                        defaultValue="SBIN0001234"
                        placeholder="SBIN0001234"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Account Holder Name</label>
                      <Input
                        defaultValue={editData.accountHolderName}
                        placeholder="Name as per bank records"
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => {
                      toast({ title: "Success", description: "Bank details updated successfully" });
                    }}
                  >
                    Save Bank Details
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
            <CardDescription>Your payouts will be transferred to this account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentUser.sellerProfile?.bankAccountLinked ? (
                <div className="rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <p className="font-medium text-green-700 dark:text-green-300">Account Linked & Verified</p>
                  </div>
                  <div className="grid gap-3 text-sm">
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Account Number</p>
                      <p className="font-medium">****{editData.bankAccountNumber.slice(-4)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">IFSC Code</p>
                      <p className="font-medium">{editData.bankIFSC}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-muted-foreground">Account Holder</p>
                      <p className="font-medium">{editData.accountHolderName}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 p-4">
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    No bank account linked. Add your bank details to start receiving payouts.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Download Statement */}
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Payout Statements
            </CardTitle>
            <CardDescription>Download your earnings statements for tax and record purposes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border/60 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium">Monthly Payout Statement</p>
                  <p className="text-sm text-muted-foreground">All transactions from the current month</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDownloadStatement}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" /> Download
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border/60 hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium">Annual Payout Statement</p>
                  <p className="text-sm text-muted-foreground">All transactions from the current year (for tax filing)</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDownloadStatement}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" /> Download
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default SellerProfile;
