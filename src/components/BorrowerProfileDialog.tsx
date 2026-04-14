import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrustBadge } from "@/components/TrustBadge";
import { StarRating } from "@/components/StarRating";
import type { ToolOwner } from "@/lib/mockData";
import { User, Shield, Phone, CheckCircle, AlertTriangle } from "lucide-react";

interface BorrowerProfileDialogProps {
  borrower: ToolOwner;
}

export function BorrowerProfileDialog({ borrower }: BorrowerProfileDialogProps) {
  const completionRate = borrower.totalRentals
    ? Math.round(((borrower.completedRentals || 0) / borrower.totalRentals) * 100)
    : 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs">View Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Borrower Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <User className="h-7 w-7 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-lg">{borrower.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <TrustBadge score={borrower.trustScore} showScore />
              </div>
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <StarRating score={borrower.trustScore} showScore />
            <span className="text-sm text-muted-foreground">Trust Score: {borrower.trustScore}/100</span>
          </div>

          {/* Verification Status */}
          <div className="rounded-xl border bg-card p-4 space-y-2">
            <h4 className="text-sm font-semibold">Verification Status</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className={`h-4 w-4 ${borrower.phoneVerified ? 'text-success' : 'text-muted-foreground'}`} />
                <span>Phone {borrower.phoneVerified ? 'Verified' : 'Not Verified'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className={`h-4 w-4 ${borrower.idVerified ? 'text-success' : 'text-muted-foreground'}`} />
                <span>ID {borrower.idVerified ? 'Verified' : 'Not Verified'}</span>
              </div>
            </div>
          </div>

          {/* Rental History */}
          <div className="rounded-xl border bg-card p-4 space-y-3">
            <h4 className="text-sm font-semibold">Rental Behavior</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg bg-muted">
                <p className="text-2xl font-bold text-foreground">{borrower.totalRentals || 0}</p>
                <p className="text-xs text-muted-foreground">Total Rentals</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted">
                <p className="text-2xl font-bold text-success">{completionRate}%</p>
                <p className="text-xs text-muted-foreground">Completion Rate</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted">
                <p className="text-2xl font-bold text-foreground">{borrower.completedRentals || 0}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted">
                <div className="flex items-center justify-center gap-1">
                  {(borrower.damageReports || 0) > 0 && <AlertTriangle className="h-4 w-4 text-warning" />}
                  <p className={`text-2xl font-bold ${(borrower.damageReports || 0) > 0 ? 'text-warning' : 'text-success'}`}>{borrower.damageReports || 0}</p>
                </div>
                <p className="text-xs text-muted-foreground">Damage Reports</p>
              </div>
            </div>
          </div>

          {/* Member Since */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4" />
            <span>Member since {borrower.memberSince}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
