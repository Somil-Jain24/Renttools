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
    basic: { icon: ShieldAlert, className: "bg-muted text-muted-foreground" },
    verified: { icon: Shield, className: "bg-info/10 text-info" },
    trusted: { icon: ShieldCheck, className: "bg-primary/10 text-primary" },
  };

  const { icon: Icon, className } = config[level];
  const iconSize = size === "sm" ? "h-3 w-3" : "h-4 w-4";

  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", className)}>
      <Icon className={iconSize} />
      {showScore && <span className="font-bold">{score}</span>}
      {showLabel && getTrustLabel(score)}
    </span>
  );
}
