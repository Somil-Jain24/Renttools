import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TrustBadge } from "@/components/TrustBadge";
import { StarRating } from "@/components/StarRating";
import { User, Phone, Shield, CheckCircle, Mail, MapPin, Calendar } from "lucide-react";

const mockUser = {
  name: "You (Demo User)",
  email: "demo@rentkart.com",
  phone: "+91 98765 43210",
  location: "Bengaluru, India",
  trustScore: 85,
  verified: true,
  phoneVerified: true,
  idVerified: true,
  memberSince: "Jan 2025",
  totalRentals: 15,
  totalListings: 4,
};

const MyProfile = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        <div className="space-y-6">
          {/* Avatar & Name */}
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xl font-semibold">{mockUser.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <TrustBadge score={mockUser.trustScore} showScore />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="rounded-xl border bg-card p-5 space-y-3">
            <h3 className="text-sm font-semibold">Contact Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" />{mockUser.email}</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" />{mockUser.phone}</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" />{mockUser.location}</div>
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" />Member since {mockUser.memberSince}</div>
            </div>
          </div>

          {/* Trust Score */}
          <div className="rounded-xl border bg-card p-5 space-y-3">
            <h3 className="text-sm font-semibold">Trust Score</h3>
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold text-primary">{mockUser.trustScore}</div>
              <div className="text-sm text-muted-foreground">/100</div>
            </div>
            <StarRating score={mockUser.trustScore} showScore />
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${mockUser.trustScore}%` }} />
            </div>
          </div>

          {/* Verification */}
          <div className="rounded-xl border bg-card p-5 space-y-3">
            <h3 className="text-sm font-semibold">Verification Status</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className={`h-4 w-4 ${mockUser.phoneVerified ? 'text-success' : 'text-muted-foreground'}`} />
                Phone: {mockUser.phoneVerified ? 'Verified ✓' : 'Not Verified'}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className={`h-4 w-4 ${mockUser.idVerified ? 'text-success' : 'text-muted-foreground'}`} />
                ID: {mockUser.idVerified ? 'Verified ✓' : 'Not Verified'}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className={`h-4 w-4 ${mockUser.verified ? 'text-success' : 'text-muted-foreground'}`} />
                Email: {mockUser.verified ? 'Verified ✓' : 'Not Verified'}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border bg-card p-4 text-center">
              <p className="text-2xl font-bold">{mockUser.totalRentals}</p>
              <p className="text-xs text-muted-foreground">Total Rentals</p>
            </div>
            <div className="rounded-xl border bg-card p-4 text-center">
              <p className="text-2xl font-bold">{mockUser.totalListings}</p>
              <p className="text-xs text-muted-foreground">Active Listings</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyProfile;
