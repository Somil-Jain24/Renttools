import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrustBadge } from "@/components/TrustBadge";
import { StarRating } from "@/components/StarRating";
import { useUser } from "@/context/UserContext";
import { User, Phone, Shield, CheckCircle, Mail, MapPin, Calendar, ArrowRight, ShoppingBag, Package } from "lucide-react";

const MyProfile = () => {
  const { currentUser, switchMode } = useUser();
  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Please log in to view your profile</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="space-y-6">
          {/* Avatar & Name */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-success/15">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{currentUser.name}</p>
                <p className="text-sm text-muted-foreground">Member since {new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
              </div>
            </div>
          </div>

          {/* Mode Toggle */}
          {currentUser.isSeller && (
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-success/5">
              <CardHeader>
                <CardTitle>Switch Mode</CardTitle>
                <CardDescription>Choose what you want to do</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button
                    variant={currentUser.mode === "buyer" ? "default" : "outline"}
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => switchMode("buyer")}
                  >
                    <ShoppingBag className="h-6 w-6" />
                    <span className="font-semibold">Buyer Mode</span>
                    <span className="text-xs font-normal text-muted-foreground">Rent tools from others</span>
                  </Button>
                  <Button
                    variant={currentUser.mode === "seller" ? "default" : "outline"}
                    className="h-auto py-4 flex flex-col items-center gap-2"
                    onClick={() => switchMode("seller")}
                  >
                    <Package className="h-6 w-6" />
                    <span className="font-semibold">Seller Mode</span>
                    <span className="text-xs font-normal text-muted-foreground">List and earn from tools</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Trust Scores */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Buyer Trust Score */}
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-blue-500" />
                  Buyer Trust Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-end gap-4">
                  <div>
                    <div className="text-3xl font-bold text-primary">{currentUser.trustScores.buyerScore}</div>
                    <p className="text-xs text-muted-foreground mt-1">/100</p>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${currentUser.trustScores.buyerScore}%` }}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Based on timely returns, payments, and reviews</p>
              </CardContent>
            </Card>

            {/* Seller Trust Score */}
            {currentUser.isSeller && (
              <Card className="border-border/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-green-500" />
                    Seller Trust Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-end gap-4">
                    <div>
                      <div className="text-3xl font-bold text-primary">{currentUser.trustScores.sellerScore}</div>
                      <p className="text-xs text-muted-foreground mt-1">/100</p>
                    </div>
                    <div className="flex-1">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${currentUser.trustScores.sellerScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Based on ratings, response time, and reliability</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Info */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{currentUser.email}</p>
                </div>
              </div>
              {currentUser.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{currentUser.phone}</p>
                  </div>
                </div>
              )}
              {currentUser.location && (
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium">{currentUser.location}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Verification Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className={`h-4 w-4 ${currentUser.emailVerified ? 'text-success' : 'text-muted-foreground'}`} />
                <span>Email: {currentUser.emailVerified ? 'Verified' : 'Not Verified'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className={`h-4 w-4 ${currentUser.phoneVerified ? 'text-success' : 'text-muted-foreground'}`} />
                <span>Phone: {currentUser.phoneVerified ? 'Verified' : 'Not Verified'}</span>
              </div>
              {currentUser.isSeller && (
                <div className="flex items-center gap-2 text-sm">
                  <Shield className={`h-4 w-4 ${currentUser.sellerProfile.verificationStatus === 'verified' ? 'text-success' : 'text-muted-foreground'}`} />
                  <span>Seller: {currentUser.sellerProfile.verificationStatus === 'verified' ? 'Verified' : 'Pending'}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seller Registration CTA */}
          {!currentUser.isSeller && (
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-success/5">
              <CardHeader>
                <CardTitle>Become a Seller</CardTitle>
                <CardDescription>Start earning by listing your tools</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full gap-2">
                  Register as Seller
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyProfile;
