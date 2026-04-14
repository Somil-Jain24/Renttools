import { Star } from "lucide-react";
import { scoreToStars } from "@/lib/mockData";

interface StarRatingProps {
  score: number;
  showScore?: boolean;
}

export function StarRating({ score, showScore = false }: StarRatingProps) {
  const stars = scoreToStars(score);
  const fullStars = Math.floor(stars);
  const hasHalf = stars - fullStars >= 0.5;

  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < fullStars
              ? "fill-accent text-accent"
              : i === fullStars && hasHalf
              ? "fill-accent/50 text-accent"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      {showScore && <span className="ml-1 text-xs text-muted-foreground">{stars}</span>}
    </span>
  );
}
