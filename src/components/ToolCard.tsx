import { MapPin } from "lucide-react";
import type { Tool } from "@/lib/mockData";
import { TrustBadge } from "./TrustBadge";
import { StarRating } from "./StarRating";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link to={`/tools/${tool.id}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={tool.images[0]}
            alt={tool.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow-soft backdrop-blur-sm",
              tool.available
                ? "bg-success/90 text-success-foreground"
                : "bg-muted/90 text-muted-foreground"
            )}
          >
            {tool.available ? "Available" : "Unavailable"}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-card/85 px-2.5 py-1 text-xs font-semibold text-card-foreground backdrop-blur-sm shadow-soft">
            {tool.subcategory || tool.category}
          </span>
        </div>

        <div className="p-4 space-y-2.5">
          <h3 className="font-bold text-card-foreground line-clamp-1 text-[15px]">{tool.name}</h3>

          <div className="flex items-center justify-between">
            <span className="text-lg font-extrabold text-primary">₹{tool.pricePerDay}<span className="text-xs font-normal text-muted-foreground ml-0.5">/day</span></span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 text-primary/60" />
            <span>{tool.distance} km away</span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-border/40">
            <div className="flex items-center gap-2">
              <StarRating score={tool.owner.trustScore} />
              <span className="text-xs font-bold text-muted-foreground">{tool.owner.trustScore}</span>
            </div>
            <TrustBadge score={tool.owner.trustScore} showLabel={false} />
          </div>
        </div>
      </div>
    </Link>
  );
}
