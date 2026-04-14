import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ImagePlus, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import type { DamageLevel } from "@/lib/mockData";

const damageLevels: { level: DamageLevel; label: string; icon: React.ElementType; className: string }[] = [
  { level: "NONE", label: "No Damage", icon: CheckCircle, className: "border-success text-success bg-success/10" },
  { level: "MINOR", label: "Minor Damage", icon: AlertTriangle, className: "border-warning text-warning-foreground bg-warning/10" },
  { level: "MAJOR", label: "Major Damage", icon: XCircle, className: "border-destructive text-destructive bg-destructive/10" },
];

const DamageCheck = () => {
  const [selected, setSelected] = useState<DamageLevel | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-8 max-w-3xl">
        <h1 className="text-2xl font-bold mb-2">Damage Check</h1>
        <p className="text-sm text-muted-foreground mb-8">Compare before and after photos to assess tool condition.</p>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {["Before (Owner Upload)", "After (Return Upload)"].map(label => (
            <div key={label} className="space-y-2">
              <h3 className="text-sm font-semibold">{label}</h3>
              <label className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/50">
                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                <span className="mt-2 text-sm text-muted-foreground">Upload photo</span>
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-semibold mb-3">Assessment</h3>
        <div className="grid gap-3 sm:grid-cols-3 mb-8">
          {damageLevels.map(d => (
            <button
              key={d.level}
              onClick={() => setSelected(d.level)}
              className={`flex items-center gap-2 rounded-xl border-2 p-4 text-sm font-medium transition-colors ${selected === d.level ? d.className : "border-border bg-card hover:bg-muted"}`}
            >
              <d.icon className="h-5 w-5 shrink-0" />
              {d.label}
            </button>
          ))}
        </div>

        <Button className="w-full" size="lg" disabled={!selected}>Submit Assessment</Button>
      </div>
      <Footer />
    </div>
  );
};

export default DamageCheck;
