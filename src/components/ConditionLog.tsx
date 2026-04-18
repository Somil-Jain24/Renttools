import { CheckCircle, AlertTriangle, XCircle, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ConditionRecord } from "@/lib/mockData";
import { compareConditions } from "@/lib/mockData";

interface ConditionLogProps {
  pickupCondition?: ConditionRecord;
  returnCondition?: ConditionRecord;
  depositDeductionPercent?: number;
  depositAmount?: number;
}

const getDamageLevelIcon = (level?: string) => {
  switch (level) {
    case "MINOR":
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    case "MAJOR":
      return <XCircle className="h-5 w-5 text-destructive" />;
    case "NONE":
    default:
      return <CheckCircle className="h-5 w-5 text-success" />;
  }
};

const getDamageLevelColor = (level?: string) => {
  switch (level) {
    case "MINOR":
      return "bg-warning/10 border-warning/30 text-warning-foreground";
    case "MAJOR":
      return "bg-destructive/10 border-destructive/30 text-destructive";
    case "NONE":
    default:
      return "bg-success/10 border-success/30 text-success";
  }
};

const ConditionRecord = ({
  title,
  condition,
}: {
  title: string;
  condition?: ConditionRecord;
}) => {
  if (!condition) {
    return (
      <div className="rounded-lg border-2 border-dashed border-muted-foreground/30 p-4 text-center">
        <p className="text-sm text-muted-foreground">{title} - Pending</p>
      </div>
    );
  }

  const timestamp = new Date(condition.timestamp);
  const formattedDate = timestamp.toLocaleDateString();
  const formattedTime = timestamp.toLocaleTimeString();

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-start justify-between">
        <h3 className="font-semibold">{title}</h3>
        <div className="text-right text-xs text-muted-foreground">
          <div>{formattedDate}</div>
          <div>{formattedTime}</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {getDamageLevelIcon(condition.damageLevel)}
            <span className="text-sm font-medium">{condition.damageLevel || "GOOD"}</span>
          </div>
          <Badge variant="outline" className={getDamageLevelColor(condition.damageLevel)}>
            {condition.status}
          </Badge>
        </div>

        {condition.description && (
          <div>
            <p className="text-xs text-muted-foreground">Description:</p>
            <p className="mt-1 text-sm">{condition.description}</p>
          </div>
        )}

        <div className="text-xs text-muted-foreground">Recorded by: {condition.recordedByName}</div>

        {condition.images && condition.images.length > 0 && (
          <div>
            <div className="mb-2 flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <ImageIcon className="h-3 w-3" />
              Photos ({condition.images.length})
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {condition.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Condition ${idx + 1}`}
                  className="h-20 w-full rounded border border-border object-cover"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export const ConditionLog = ({
  pickupCondition,
  returnCondition,
  depositDeductionPercent,
  depositAmount,
}: ConditionLogProps) => {
  const deductionAmount = depositAmount && depositDeductionPercent ? Math.round((depositDeductionPercent / 100) * depositAmount) : 0;
  const refundAmount = depositAmount ? depositAmount - deductionAmount : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-lg font-bold">Condition Verification History</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          This log compares the item condition at pickup and return to ensure fairness for both buyer and seller.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ConditionRecord title="📥 Pickup Condition (Buyer)" condition={pickupCondition} />
        <ConditionRecord title="📤 Return Condition (Owner)" condition={returnCondition} />
      </div>

      {/* Comparison & Deduction Summary */}
      {pickupCondition && returnCondition && (
        <Card className="border-2 border-blue-200 bg-blue-50 p-4 dark:border-blue-700 dark:bg-blue-950">
          <h3 className="mb-4 font-semibold text-blue-900 dark:text-blue-100">⚖️ Condition Comparison & Deposit Summary</h3>

          <div className="space-y-3">
            {/* Damage Analysis */}
            {(() => {
              const { newDamageDetected, damageAnalysis } = compareConditions(pickupCondition, returnCondition);
              return (
                <div className={`rounded-lg p-3 ${
                  newDamageDetected
                    ? "border border-orange-300 bg-orange-100/50 dark:border-orange-700 dark:bg-orange-950/40"
                    : "border border-green-300 bg-green-100/50 dark:border-green-700 dark:bg-green-950/40"
                }`}>
                  <p className={`text-xs font-semibold ${
                    newDamageDetected ? "text-orange-900 dark:text-orange-200" : "text-green-900 dark:text-green-200"
                  }`}>
                    {newDamageDetected ? "🚨 Damage Detected" : "✓ No New Damage Detected"}
                  </p>
                  {damageAnalysis && (
                    <p className={`text-xs mt-1 ${
                      newDamageDetected ? "text-orange-800 dark:text-orange-300" : "text-green-800 dark:text-green-300"
                    }`}>
                      {damageAnalysis}
                    </p>
                  )}
                </div>
              );
            })()}

            <div className="flex items-center justify-between rounded-lg bg-white p-3 dark:bg-slate-900">
              <span className="text-sm">Pickup Condition:</span>
              <span className="font-semibold capitalize">{pickupCondition.status}</span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-white p-3 dark:bg-slate-900">
              <span className="text-sm">Return Condition:</span>
              <span className="font-semibold capitalize">{returnCondition.status}</span>
            </div>

            {depositDeductionPercent !== undefined && depositDeductionPercent > 0 && (
              <>
                <div className="border-t border-blue-200 dark:border-blue-700" />
                <div className="space-y-2 pt-2">
                  <p className="text-xs text-blue-800 dark:text-blue-200">
                    Damage was reported at return. The owner has deducted a portion of the security deposit.
                  </p>
                  <div className="rounded-lg bg-white p-3 dark:bg-slate-900">
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Original Deposit:</span>
                      <span className="font-semibold">₹{depositAmount?.toLocaleString()}</span>
                    </div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Deduction ({depositDeductionPercent}%):</span>
                      <span className="font-semibold text-destructive">-₹{deductionAmount.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-blue-200 pt-2 dark:border-blue-700">
                      <div className="flex justify-between text-sm font-semibold">
                        <span>Refund to Buyer:</span>
                        <span className="text-success">₹{refundAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {depositDeductionPercent === 0 && returnCondition.status === "GOOD" && (
              <div className="border-t border-blue-200 dark:border-blue-700 pt-2">
                <div className="rounded-lg bg-white p-3 text-center dark:bg-slate-900">
                  <p className="text-sm font-semibold text-success">
                    ✓ Full Deposit Refund: ₹{depositAmount?.toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Item returned in good condition</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {(!pickupCondition || !returnCondition) && (
        <Card className="border-2 border-dashed border-muted-foreground/30 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Condition verification is still in progress. Both pickup and return confirmations are required to complete
            the rental.
          </p>
        </Card>
      )}
    </div>
  );
};
