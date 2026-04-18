import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImagePlus, AlertTriangle, CheckCircle, X } from "lucide-react";
import type { ConditionRecord, DamageLevel } from "@/lib/mockData";

const damageLevels: DamageLevel[] = ["NONE", "MINOR", "MAJOR"];

interface PickupConditionCheckProps {
  rentalId: string;
  borrowerName: string;
  toolName: string;
  onSubmit: (conditionRecord: ConditionRecord) => void;
  onCancel: () => void;
}

export const PickupConditionCheck = ({
  rentalId,
  borrowerName,
  toolName,
  onSubmit,
  onCancel,
}: PickupConditionCheckProps) => {
  const [isGood, setIsGood] = useState<boolean | null>(null);
  const [description, setDescription] = useState("");
  const [damageLevel, setDamageLevel] = useState<DamageLevel | null>(null);
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

  const handleSubmit = () => {
    if (isGood === null) {
      alert("Please select if the item is in good condition");
      return;
    }

    if (isGood === false && !damageLevel) {
      alert("Please select a damage level");
      return;
    }

    setIsSubmitting(true);

    const conditionRecord: ConditionRecord = {
      status: isGood ? "GOOD" : "DAMAGED",
      damageLevel: isGood ? undefined : damageLevel || undefined,
      description: isGood ? undefined : description || undefined,
      images: uploadedImages,
      timestamp: new Date().toISOString(),
      recordedBy: "current-user-id", // This will be replaced with actual user context
      recordedByName: borrowerName,
    };

    setTimeout(() => {
      onSubmit(conditionRecord);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="mx-4 w-full max-w-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <h2 className="text-2xl font-bold">Pickup Condition Verification</h2>
          <p className="mt-2 text-sm text-blue-100">
            Please verify the condition of <strong>{toolName}</strong> before proceeding with the rental
          </p>
        </div>

        <div className="space-y-6 p-6">
          {/* Good Condition Question */}
          <div>
            <p className="mb-4 text-lg font-semibold">Is the item in good condition?</p>
            <div className="flex gap-3">
              <Button
                variant={isGood === true ? "default" : "outline"}
                size="lg"
                className="flex-1"
                onClick={() => setIsGood(true)}
              >
                <CheckCircle className="mr-2 h-5 w-5" />
                Yes, Item is Good
              </Button>
              <Button
                variant={isGood === false ? "destructive" : "outline"}
                size="lg"
                className="flex-1"
                onClick={() => setIsGood(false)}
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                No, Item has Issues
              </Button>
            </div>
          </div>

          {/* Issue Details (shown only if No is selected) */}
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
                <label className="mb-2 block text-sm font-semibold">Issue Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the damage or issues you found..."
                  className="min-h-24 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold">Upload Photos (Optional but Recommended)</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={img}
                        alt={`Damage ${idx + 1}`}
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
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {isGood === true && (
            <div className="rounded-lg border border-success/20 bg-success/5 p-4">
              <p className="text-sm text-success">
                ✓ Item recorded as in good condition. You may proceed with the rental.
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
              {isSubmitting ? "Saving..." : "Confirm & Continue"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
