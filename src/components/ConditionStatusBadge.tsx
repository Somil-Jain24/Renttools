import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import type { ConditionRecord } from "@/lib/mockData";

interface ConditionStatusBadgeProps {
  pickupCondition?: ConditionRecord;
  returnCondition?: ConditionRecord;
  pickupPending?: boolean;
  returnPending?: boolean;
  compact?: boolean;
}

export const ConditionStatusBadge = ({
  pickupCondition,
  returnCondition,
  pickupPending,
  returnPending,
  compact = false,
}: ConditionStatusBadgeProps) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {pickupCondition && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 text-xs font-medium">
            <CheckCircle className="h-3 w-3" />
            Pickup OK
          </div>
        )}
        {pickupPending && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 text-xs font-medium">
            <Clock className="h-3 w-3" />
            Pickup Pending
          </div>
        )}
        {returnCondition && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-medium">
            <CheckCircle className="h-3 w-3" />
            Return Verified
          </div>
        )}
        {returnPending && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 text-xs font-medium">
            <AlertCircle className="h-3 w-3" />
            Return Pending
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Pickup Status */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">📥 Pickup Verification</p>
        </div>
        {pickupCondition ? (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 text-xs font-medium">
            <CheckCircle className="h-3 w-3" />
            Verified
          </div>
        ) : pickupPending ? (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 text-xs font-medium">
            <Clock className="h-3 w-3" />
            Pending
          </div>
        ) : (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-950 text-gray-700 dark:text-gray-300 text-xs font-medium">
            <AlertCircle className="h-3 w-3" />
            Not Started
          </div>
        )}
      </div>

      {/* Return Status */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">📤 Return Verification</p>
        </div>
        {returnCondition ? (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-medium">
            <CheckCircle className="h-3 w-3" />
            Verified
          </div>
        ) : returnPending ? (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 text-xs font-medium">
            <AlertCircle className="h-3 w-3" />
            Awaiting
          </div>
        ) : (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-950 text-gray-700 dark:text-gray-300 text-xs font-medium">
            <Clock className="h-3 w-3" />
            Pending
          </div>
        )}
      </div>
    </div>
  );
};
