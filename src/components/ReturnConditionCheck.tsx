import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImagePlus, AlertTriangle, CheckCircle, X } from "lucide-react";
import type { ConditionRecord, DepositDeduction, DamageLevel } from "@/lib/mockData";

const damageLevels: DamageLevel[] = ["NONE", "MINOR", "MAJOR"];
const deductionPercentages = [10, 20, 30, 50, 100];

interface ReturnConditionCheckProps {
  rentalId: string;
  ownerName: string;
  borrowerName: string;
  toolName: string;
  depositAmount: number;
  onSubmit: (conditionRecord: ConditionRecord, deduction: DepositDeduction) => void;
  onCancel: () => void;
}

export const ReturnConditionCheck = ({
  rentalId,
  ownerName,
  borrowerName,
  toolName,
  depositAmount,
  onSubmit,
  onCancel,
}: ReturnConditionCheckProps) => {
  const [isGood, setIsGood] = useState<boolean | null>(null);
  const [description, setDescription] = useState("");
  const [damageLevel, setDamageLevel] = useState<DamageLevel | null>(null);
  const [deductionPercent, setDeductionPercent] = useState<number | null>(null);
  const [customDeduction, setCustomDeduction] = useState("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setUploadedImages(prev => [...prev, base64]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const getDeductionAmount = () => {
    const percent = deductionPercent || (customDeduction ? parseInt(customDeduction) : 0);
    return Math.round((percent / 100) * depositAmount);
  };

  const getRefundAmount = () => {
    return depositAmount - getDeductionAmount();
  };

  const handleSubmit = () => {
    if (isGood === null) {
      alert("Please select if the item is in good condition");
      return;
    }

    if (isGood === false) {
      if (!damageLevel) {
        alert("Please select a damage level");
        return;
      }
      const deductPercent = deductionPercent || (customDeduction ? parseInt(customDeduction) : null);
      if (deductPercent === null || deductPercent < 0 || deductPercent > 100) {
        alert("Please select a valid deduction percentage");
        return;
      }
    }

    setIsSubmitting(true);

    const conditionRecord: ConditionRecord = {
      status: isGood ? "GOOD" : "DAMAGED",
      damageLevel: isGood ? undefined : damageLevel || undefined,
      description: isGood ? undefined : description || undefined,
      images: uploadedImages,
      timestamp: new Date().toISOString(),
      recordedBy: "current-owner-id", // This will be replaced with actual user context
      recordedByName: ownerName,
    };

    const deductionRecord: DepositDeduction = {
      percentage: isGood ? 0 : deductionPercent || (customDeduction ? parseInt(customDeduction) : 0),
      reason: isGood ? undefined : description || undefined,
      recordedAt: new Date().toISOString(),
      recordedBy: "current-owner-id",
    };

    setTimeout(() => {
      onSubmit(conditionRecord, deductionRecord);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="mx-4 w-full max-w-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
          <h2 className="text-2xl font-bold">Return Condition Verification</h2>
          <p className="mt-2 text-sm text-purple-100">
            Verify the condition of <strong>{toolName}</strong> returned by <strong>{borrowerName}</strong>
          </p>
        </div>

        <div className="space-y-6 p-6">
          {/* Good Condition Question */}
          <div>
            <p className="mb-4 text-lg font-semibold">Is the item returned in good condition?</p>
            <div className="flex gap-3">
              <Button
                variant={isGood === true ? "default" : "outline"}
                size="lg"
                className="flex-1"
                onClick={() => setIsGood(true)}
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Yes, Condition is Good
              </Button>
              <Button
                variant={isGood === false ? "destructive" : "outline"}
                size="lg"
                className="flex-1"
                onClick={() => setIsGood(false)}
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                No, Item is Damaged
              </Button>
            </div>
          </div>

          {/* Damage Details & Deduction (shown only if No is selected) */}
          {isGood === false && (
            <div className="space-y-4 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
              <div>
                <label className="mb-2 block text-sm font-semibold">Damage Level</label>
                <div className="grid gap-2 sm:grid-cols-3">
                  {damageLevels.map(level => (
                    <Button
                      key={level}
                      variant={damageLevel === level ? "default" : "outline"}
                      onClick={() => setDamageLevel(level)}
                      className="justify-start"
                    >
                      {level === "MINOR" && <AlertTriangle className="mr-2 h-4 w-4" />}
                      {level === "MAJOR" && <X className="mr-2 h-4 w-4" />}
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Damage Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the damage found..."
                  className="min-h-24 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">Upload Evidence (Images/Videos)</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={img}
                        alt={`Evidence ${idx + 1}`}
                        className="h-32 w-full rounded-lg border border-border object-cover"
                      />
                      <button
                        onClick={() => removeImage(idx)}
                        className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/50 hover:bg-muted/70">
                    <ImagePlus className="h-8 w-8 text-muted-foreground" />
                    <span className="mt-2 text-xs text-muted-foreground">Add photos</span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Deposit Deduction Selection */}
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <label className="mb-3 block text-sm font-semibold text-yellow-900">
                  Deduction from Security Deposit
                </label>
                <p className="mb-3 text-xs text-yellow-800">Security Deposit: ₹{depositAmount}</p>

                <div className="space-y-3">
                  <div className="grid gap-2 sm:grid-cols-5">
                    {deductionPercentages.map(percent => (
                      <Button
                        key={percent}
                        variant={deductionPercent === percent ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setDeductionPercent(percent);
                          setCustomDeduction("");
                        }}
                        className="text-xs"
                      >
                        {percent}%
                      </Button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={customDeduction}
                      onChange={(e) => {
                        setCustomDeduction(e.target.value);
                        setDeductionPercent(null);
                      }}
                      placeholder="Or enter custom %"
                      className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  {(deductionPercent !== null || customDeduction) && (
                    <div className="rounded-lg bg-white p-3 text-sm">
                      <div className="mb-2 flex justify-between">
                        <span>Deduction Amount:</span>
                        <span className="font-semibold text-destructive">₹{getDeductionAmount()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Refund to Buyer:</span>
                        <span className="font-semibold text-success">₹{getRefundAmount()}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {isGood === true && (
            <div className="rounded-lg border border-success/20 bg-success/5 p-4">
              <p className="text-sm text-success">
                ✓ Item verified as in good condition. Full deposit of ₹{depositAmount} will be refunded to the
                buyer.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" size="lg" onClick={onCancel} disabled={isSubmitting} className="flex-1">
              Cancel
            </Button>
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={isGood === null || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Saving..." : "Confirm & Complete Return"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
