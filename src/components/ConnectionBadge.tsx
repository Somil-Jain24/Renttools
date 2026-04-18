import { ConnectionLevel } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

interface ConnectionBadgeProps {
  level: ConnectionLevel;
  connectedVia?: string[];
}

export const ConnectionBadge: React.FC<ConnectionBadgeProps> = ({
  level,
  connectedVia = [],
}) => {
  if (level === "none") {
    return null;
  }

  if (level === "1st") {
    return (
      <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-900">
        ✓ Followed by You (1st Connection)
      </Badge>
    );
  }

  if (level === "2nd") {
    const viaText = connectedVia && connectedVia.length > 0 ? connectedVia[0] : "Someone";
    return (
      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900">
        2nd Connection via {viaText}
      </Badge>
    );
  }

  if (level === "3rd") {
    const viaText =
      connectedVia && connectedVia.length > 0
        ? connectedVia.slice(0, 2).join(" & ")
        : "Others";
    return (
      <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-900">
        3rd Connection via {viaText}
      </Badge>
    );
  }

  return null;
};
