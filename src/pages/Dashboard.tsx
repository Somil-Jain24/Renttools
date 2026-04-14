import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { RentalStatusBadge, DepositStatusBadge } from "@/components/StatusBadge";
import { TrustBadge } from "@/components/TrustBadge";
import { StarRating } from "@/components/StarRating";
import { BorrowerProfileDialog } from "@/components/BorrowerProfileDialog";
import { RentalChat } from "@/components/RentalChat";
import { myRentals, myListings, type Rental, type RentalStatus } from "@/lib/mockData";
import { Package, List, Bell, User, Shield, Phone, CheckCircle } from "lucide-react";

const tabs = [
  { id: "rentals", label: "My Rentals", icon: Package },
  { id: "listings", label: "My Listings", icon: List },
  { id: "requests", label: "Requests", icon: Bell },
  { id: "profile", label: "Profile", icon: User },
] as const;

type Tab = typeof tabs[number]["id"];

function RentalItem({ rental, isOwner }: { rental: Rental; isOwner: boolean }) {
  const actions: Partial<Record<RentalStatus, string[]>> = {
    REQUESTED: isOwner ? ["Approve", "Decline"] : [],
    APPROVED: isOwner ? ["Mark as Borrowed"] : [],
    BORROWED: isOwner ? ["Mark as Returned"] : [],
  };

  const showBorrowerProfile = isOwner && rental.borrower && rental.status === "REQUESTED";

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-semibold text-sm">{rental.tool.name}</p>
          <p className="text-xs text-muted-foreground">{rental.startDate} → {rental.endDate} · ₹{rental.totalPrice}</p>
          <div className="flex gap-2 flex-wrap">
            <RentalStatusBadge status={rental.status} />
            <DepositStatusBadge status={rental.depositStatus} />
          </div>
          {showBorrowerProfile && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">From: <span className="font-medium text-foreground">{rental.borrower!.name}</span></span>
              <BorrowerProfileDialog borrower={rental.borrower!} />
            </div>
          )}
        </div>
        {actions[rental.status]?.length ? (
          <div className="flex gap-2 shrink-0">
            {actions[rental.status]!.map(a => (
              <Button key={a} size="sm" variant={a === "Decline" ? "outline" : "default"}>{a}</Button>
            ))}
          </div>
        ) : null}
      </div>
      <RentalChat
        messages={rental.chatMessages || []}
        rentalStatus={rental.status}
        isOwner={isOwner}
      />
    </div>
  );
}

function ProfileTab() {
  const mockUser = {
    name: "You (Demo User)",
    email: "demo@rentkart.com",
    phone: "+91 98765 43210",
    trustScore: 85,
    verified: true,
    phoneVerified: true,
    idVerified: true,
    memberSince: "Jan 2025",
    totalRentals: 15,
    totalListings: 4,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <User className="h-8 w-8 text-muted-foreground" />
        </div>
        <div>
          <p className="text-lg font-semibold">{mockUser.name}</p>
          <p className="text-sm text-muted-foreground">{mockUser.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <TrustBadge score={mockUser.trustScore} showScore />
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-4 space-y-3">
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

      <div className="rounded-xl border bg-card p-4 space-y-3">
        <h3 className="text-sm font-semibold">Verification</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Phone className={`h-4 w-4 ${mockUser.phoneVerified ? 'text-success' : 'text-muted-foreground'}`} />
            <span>Phone: {mockUser.phoneVerified ? 'Verified ✓' : 'Not Verified'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Shield className={`h-4 w-4 ${mockUser.idVerified ? 'text-success' : 'text-muted-foreground'}`} />
            <span>ID: {mockUser.idVerified ? 'Verified ✓' : 'Not Verified'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className={`h-4 w-4 ${mockUser.verified ? 'text-success' : 'text-muted-foreground'}`} />
            <span>Email: {mockUser.verified ? 'Verified ✓' : 'Not Verified'}</span>
          </div>
        </div>
      </div>

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

      <p className="text-xs text-muted-foreground">Member since {mockUser.memberSince}</p>
    </div>
  );
}

const Dashboard = () => {
  const [tab, setTab] = useState<Tab>("rentals");
  const requests = myListings.filter(r => r.status === "REQUESTED");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-8 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="flex gap-1 rounded-xl bg-muted p-1 mb-6">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${tab === t.id ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <t.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{t.label}</span>
              {t.id === "requests" && requests.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">{requests.length}</span>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {tab === "rentals" && myRentals.map(r => <RentalItem key={r.id} rental={r} isOwner={false} />)}
          {tab === "listings" && myListings.map(r => <RentalItem key={r.id} rental={r} isOwner={true} />)}
          {tab === "requests" && (requests.length ? requests.map(r => <RentalItem key={r.id} rental={r} isOwner={true} />) : (
            <p className="text-center py-12 text-muted-foreground">No pending requests</p>
          ))}
          {tab === "profile" && <ProfileTab />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
