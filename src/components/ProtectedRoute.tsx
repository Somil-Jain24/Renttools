import { Navigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredMode?: "buyer" | "seller";
  requireAuth?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requiredMode, 
  requireAuth = true 
}: ProtectedRouteProps) {
  const { currentUser, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-flex h-8 w-8 animate-spin rounded-full border 4 border-primary border-r-transparent" />
          <p className="mt-2 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Check authentication requirement
  if (requireAuth && !currentUser) {
    return <Navigate to="/signup" replace />;
  }

  // Check mode requirement
  if (requiredMode && currentUser) {
    if (requiredMode === "seller" && !currentUser.isSeller) {
      // User is not registered as seller, redirect to seller registration
      return <Navigate to="/seller-registration" replace />;
    }
    if (requiredMode === "seller" && currentUser.mode !== "seller") {
      // User is registered as seller but not in seller mode
      return <Navigate to="/profile" replace />;
    }
    if (requiredMode === "buyer" && currentUser.mode !== "buyer") {
      // User is not in buyer mode
      return <Navigate to="/profile" replace />;
    }
  }

  return <>{children}</>;
}
