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
      <div className="overflow-hidden rounded-xl border bg-card shadow-card transition-shadow duration-200 hover:shadow-card-hover">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={tool.images[0]}
            alt={tool.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span
            className={cn(
              "absolute left-3 top-3 rounded-full px-2 py-0.5 text-xs font-medium",
              tool.available
                ? "bg-success text-success-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {tool.available ? "Available" : "Unavailable"}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-card/90 px-2 py-0.5 text-xs font-medium text-card-foreground backdrop-blur-sm">
            {tool.subcategory || tool.category}
          </span>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-card-foreground line-clamp-1">{tool.name}</h3>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">₹{tool.pricePerDay}<span className="text-xs font-normal text-muted-foreground">/day</span></span>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{tool.distance} km away</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <StarRating score={tool.owner.trustScore} />
              <span className="text-xs font-semibold text-muted-foreground">{tool.owner.trustScore}/100</span>
            </div>
            <TrustBadge score={tool.owner.trustScore} showLabel={false} />
          </div>
        </div>
      </div>
    </Link>
  );
}
