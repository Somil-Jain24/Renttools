import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, Clock, AlertCircle } from "lucide-react";

type Status = "NOT_VERIFIED" | "SUBMITTED" | "VERIFIED";

const statusConfig: Record<Status, { icon: React.ElementType; label: string; className: string }> = {
  NOT_VERIFIED: { icon: AlertCircle, label: "Not Verified", className: "bg-muted text-muted-foreground" },
  SUBMITTED: { icon: Clock, label: "Verification Submitted", className: "bg-warning/10 text-warning-foreground" },
  VERIFIED: { icon: CheckCircle, label: "Verified", className: "bg-success/10 text-success" },
};

const Verification = () => {
  const [status, setStatus] = useState<Status>("NOT_VERIFIED");
  const { icon: StatusIcon, label, className } = statusConfig[status];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-8 max-w-lg">
        <h1 className="text-2xl font-bold mb-2">Identity Verification</h1>
        <p className="text-sm text-muted-foreground mb-8">Verify your identity to build trust and unlock all features.</p>

        <div className={`flex items-center gap-3 rounded-xl p-4 mb-8 ${className}`}>
          <StatusIcon className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold text-sm">{label}</p>
            <p className="text-xs opacity-80">
              {status === "NOT_VERIFIED" && "Please upload a valid ID to get verified."}
              {status === "SUBMITTED" && "We're reviewing your submission. This usually takes 24-48 hours."}
              {status === "VERIFIED" && "Your identity has been verified. You now have full access."}
            </p>
          </div>
        </div>

        {status !== "VERIFIED" && (
          <form className="space-y-6" onSubmit={e => { e.preventDefault(); setStatus("SUBMITTED"); }}>
            <div>
              <label className="text-sm font-medium">Upload ID Document</label>
              <p className="text-xs text-muted-foreground mb-3">Aadhaar Card, Driving License, or Student ID</p>
              <label className="flex aspect-[16/7] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/50 transition-colors hover:border-primary/30">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="mt-2 text-sm text-muted-foreground">Click to upload</span>
                <input type="file" accept="image/*,.pdf" className="hidden" />
              </label>
            </div>
            <Button className="w-full" size="lg" disabled={status === "SUBMITTED"}>Submit for Verification</Button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Verification;
