import type { RentalStatus, DepositStatus } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const rentalConfig: Record<RentalStatus, string> = {
  REQUESTED: "bg-warning/10 text-warning-foreground border border-warning/20",
  APPROVED: "bg-info/10 text-info border border-info/20",
  BORROWED: "bg-primary/10 text-primary border border-primary/20",
  RETURNED: "bg-success/10 text-success border border-success/20",
};

const depositConfig: Record<DepositStatus, string> = {
  LOCKED: "bg-warning/10 text-warning-foreground border border-warning/20",
  DEDUCTED: "bg-destructive/10 text-destructive border border-destructive/20",
  RELEASED: "bg-success/10 text-success border border-success/20",
};

export function RentalStatusBadge({ status }: { status: RentalStatus }) {
  return (
    <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold", rentalConfig[status])}>
      {status}
    </span>
  );
}

export function DepositStatusBadge({ status }: { status: DepositStatus }) {
  return (
    <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold", depositConfig[status])}>
      Deposit: {status}
    </span>
  );
}
