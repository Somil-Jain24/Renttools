import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { getTrustLevel, getTrustLabel } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  score: number;
  showLabel?: boolean;
  showScore?: boolean;
  size?: "sm" | "md";
}

export function TrustBadge({ score, showLabel = true, showScore = false, size = "sm" }: TrustBadgeProps) {
  const level = getTrustLevel(score);

  const config = {
    basic: { icon: ShieldAlert, className: "bg-muted text-muted-foreground border border-border/60" },
    verified: { icon: Shield, className: "bg-info/10 text-info border border-info/20" },
    trusted: { icon: ShieldCheck, className: "bg-success/10 text-success border border-success/20" },
  };

  const { icon: Icon, className } = config[level];
  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";

  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold", className)}>
      <Icon className={iconSize} />
      {showScore && <span className="font-bold">{score}</span>}
      {showLabel && getTrustLabel(score)}
    </span>
  );
}
