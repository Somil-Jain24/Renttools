import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { RentalStatusBadge, DepositStatusBadge } from "@/components/StatusBadge";
import { BorrowerProfileDialog } from "@/components/BorrowerProfileDialog";
import { RentalChat } from "@/components/RentalChat";
import { myRentals, myListings, negotiatedOffers, tools, borrowers, type Rental, type RentalStatus, type NegotiatedOffer } from "@/lib/mockData";
import { Package, List, Bell, Zap, CheckCircle, XCircle, Clock } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { getTimeRemaining, isOfferExpired } from "@/lib/utils";

const tabs = [
  { id: "rentals", label: "My Rentals", icon: Package },
  { id: "listings", label: "My Listings", icon: List },
  { id: "requests", label: "Requests", icon: Bell },
  { id: "offers", label: "Offers", icon: Zap },
] as const;

type Tab = typeof tabs[number]["id"];

function OfferItem({ offer, onAccept, onReject }: { offer: NegotiatedOffer; onAccept: (offerId: string) => void; onReject: (offerId: string) => void }) {
  const tool = tools.find(t => t.id === offer.toolId);
  const borrower = borrowers.find(b => b.id === offer.customerId);
  const isExpired = isOfferExpired(offer.expiresAt);

  if (!tool || !borrower) return null;

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-semibold text-sm">{tool.name}</p>
          <p className="text-xs text-muted-foreground">From: <span className="font-medium text-foreground">{borrower.name}</span></p>
          <p className="text-xs text-muted-foreground">{offer.startDate} → {offer.endDate}</p>
          <div className="flex gap-2 flex-wrap items-center">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2 py-0.5 text-xs font-medium">
              <Zap className="h-3 w-3" /> Offer: ₹{offer.proposedPrice}
            </span>
            <span className="text-xs text-muted-foreground">Original: ₹{offer.originalPrice}</span>
            {isExpired ? (
              <span className="text-xs text-red-600 dark:text-red-400 font-medium">Expired</span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 font-medium">
                <Clock className="h-3 w-3" /> {getTimeRemaining(offer.expiresAt)}
              </span>
            )}
          </div>
        </div>
        {offer.status === "PENDING" && !isExpired && (
          <div className="flex gap-2 shrink-0">
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onAccept(offer.id)}
            >
              <CheckCircle className="h-4 w-4 mr-1" /> Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onReject(offer.id)}
            >
              <XCircle className="h-4 w-4 mr-1" /> Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

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

const Dashboard = () => {
  const { currentUser } = useUser();
  const [tab, setTab] = useState<Tab>("rentals");
  const [offers, setOffers] = useState(negotiatedOffers);
  const [, setTimerTrigger] = useState(0); // For forcing re-renders to update timers
  const requests = myListings.filter(r => r.status === "REQUESTED");

  // Filter offers for the current user (owner)
  const myOffers = offers.filter(o => o.ownerId === currentUser?.id && o.status === "PENDING");

  const handleAcceptOffer = (offerId: string) => {
    setOffers(offers.map(o =>
      o.id === offerId
        ? { ...o, status: "ACCEPTED" as const }
        : o
    ));
    alert("Offer accepted! Customer has 2 hours to complete the rental.");
  };

  const handleRejectOffer = (offerId: string) => {
    setOffers(offers.map(o =>
      o.id === offerId
        ? { ...o, status: "REJECTED" as const }
        : o
    ));
  };

  // Check for expired offers and update timer every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Update status of expired offers
      setOffers(prevOffers =>
        prevOffers.map(o => {
          if (o.status === "PENDING" && isOfferExpired(o.expiresAt)) {
            return { ...o, status: "EXPIRED" as const };
          }
          return o;
        })
      );
      // Trigger re-render for time updates
      setTimerTrigger(prev => prev + 1);
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

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
              {t.id === "offers" && myOffers.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">{myOffers.length}</span>
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
          {tab === "offers" && (myOffers.length ? myOffers.map(o => <OfferItem key={o.id} offer={o} onAccept={handleAcceptOffer} onReject={handleRejectOffer} />) : (
            <p className="text-center py-12 text-muted-foreground">No pending offers</p>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
