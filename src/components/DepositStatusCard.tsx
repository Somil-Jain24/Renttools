import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock, Lock } from "lucide-react";
import type { DepositStatus, DepositDeduction } from "@/lib/mockData";

interface DepositStatusCardProps {
  depositAmount: number;
  depositStatus: DepositStatus;
  deductionPercent?: number;
  deductionReason?: string;
  refundAmount?: number;
  showDetails?: boolean;
}

export const DepositStatusCard = ({
  depositAmount,
  depositStatus,
  deductionPercent = 0,
  deductionReason,
  refundAmount,
  showDetails = true,
}: DepositStatusCardProps) => {
  const getStatusIcon = (status: DepositStatus) => {
    switch (status) {
      case "LOCKED":
        return <Lock className="h-5 w-5 text-warning" />;
      case "RELEASED":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "DEDUCTED":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
    }
  };

  const getStatusLabel = (status: DepositStatus) => {
    switch (status) {
      case "LOCKED":
        return "Locked";
      case "RELEASED":
        return "Released";
      case "DEDUCTED":
        return "Deducted";
    }
  };

  const getStatusColor = (status: DepositStatus) => {
    switch (status) {
      case "LOCKED":
        return "bg-warning/10 border-warning/30 text-warning-foreground";
      case "RELEASED":
        return "bg-success/10 border-success/30 text-success";
      case "DEDUCTED":
        return "bg-destructive/10 border-destructive/30 text-destructive";
    }
  };

  const calculatedDeductedAmount = refundAmount 
    ? depositAmount - refundAmount 
    : Math.round((deductionPercent / 100) * depositAmount);

  const finalRefundAmount = refundAmount || (depositAmount - calculatedDeductedAmount);

  return (
    <Card className={`p-4 border-2 ${getStatusColor(depositStatus)}`}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(depositStatus)}
            <span className="font-semibold text-sm">Security Deposit</span>
          </div>
          <Badge variant="outline" className={getStatusColor(depositStatus)}>
            {getStatusLabel(depositStatus)}
          </Badge>
        </div>

        {/* Deposit Amount */}
        <div className="rounded-lg bg-white/50 dark:bg-slate-900/50 p-3">
          <p className="text-xs text-muted-foreground mb-1">Original Deposit Amount</p>
          <p className="text-2xl font-bold">₹{depositAmount.toLocaleString()}</p>
        </div>

        {/* Deduction Details */}
        {showDetails && deductionPercent > 0 && (
          <div className="space-y-2 border-t pt-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Deduction ({deductionPercent}%):</span>
              <span className="font-semibold text-destructive">
                -₹{calculatedDeductedAmount.toLocaleString()}
              </span>
            </div>
            {deductionReason && (
              <div className="text-xs">
                <p className="text-muted-foreground mb-1">Reason:</p>
                <p className="text-foreground">{deductionReason}</p>
              </div>
            )}
          </div>
        )}

        {/* Refund Amount */}
        {showDetails && (
          <div className="border-t pt-3 rounded-lg bg-white/50 dark:bg-slate-900/50 p-3">
            <p className="text-xs text-muted-foreground mb-1">
              {depositStatus === "LOCKED" && "Expected Refund"}
              {depositStatus === "DEDUCTED" && "Amount to be Refunded"}
              {depositStatus === "RELEASED" && "Refund Amount"}
            </p>
            <p className={`text-xl font-bold ${
              depositStatus === "RELEASED" ? "text-success" : 
              depositStatus === "DEDUCTED" ? "text-warning" : 
              "text-foreground"
            }`}>
              ₹{finalRefundAmount.toLocaleString()}
            </p>
          </div>
        )}

        {/* Status Messages */}
        <div className="text-xs text-muted-foreground border-t pt-3">
          {depositStatus === "LOCKED" && (
            <p>✓ Your deposit is secure and will be released after return verification.</p>
          )}
          {depositStatus === "RELEASED" && (
            <p>✓ Deposit refunded! Check your account for the transfer.</p>
          )}
          {depositStatus === "DEDUCTED" && (
            <p>⚠️ Partial deduction applied due to damage. Refund will be processed soon.</p>
          )}
        </div>
      </div>
    </Card>
  );
};
