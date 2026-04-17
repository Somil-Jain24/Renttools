import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BrowseTools from "./pages/BrowseTools";
import ToolDetails from "./pages/ToolDetails";
import ListTool from "./pages/ListTool";
import Dashboard from "./pages/Dashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import SellerRegistration from "./pages/SellerRegistration";
import RequestsPage from "./pages/RequestsPage";
import Register, { OtpVerification } from "./pages/Auth";
import About from "./pages/About";
import Verification from "./pages/Verification";
import DamageCheck from "./pages/DamageCheck";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";
import MyProfile from "./pages/MyProfile";
import MyAccount from "./pages/MyAccount";
import MyListings from "./pages/MyListings";
import Earnings from "./pages/Earnings";
import Analytics from "./pages/Analytics";
import MyRentals from "./pages/MyRentals";
import MyOrders from "./pages/MyOrders";
import SellerProfile from "./pages/SellerProfile";
import Wishlist from "./pages/Wishlist";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/browse" element={<BrowseTools />} />
              <Route path="/tools/:id" element={<ToolDetails />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Register />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/otp" element={<OtpVerification />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/damage-check" element={<DamageCheck />} />

              {/* Protected routes - require authentication */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute requireAuth={true}>
                    <MyProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <ProtectedRoute requireAuth={true}>
                    <MyAccount />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/verification"
                element={
                  <ProtectedRoute requireAuth={true}>
                    <Verification />
                  </ProtectedRoute>
                }
              />

              {/* Buyer-only routes */}
              <Route
                path="/my-rentals"
                element={
                  <ProtectedRoute requiredMode="buyer">
                    <MyRentals />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-orders"
                element={
                  <ProtectedRoute requiredMode="buyer">
                    <MyOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute requiredMode="buyer">
                    <Wishlist />
                  </ProtectedRoute>
                }
              />

              {/* Seller-only routes */}
              <Route
                path="/seller-dashboard"
                element={
                  <ProtectedRoute requiredMode="seller">
                    <SellerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-listings"
                element={
                  <ProtectedRoute requiredMode="seller">
                    <MyListings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/list-tool"
                element={
                  <ProtectedRoute requiredMode="seller">
                    <ListTool />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/earnings"
                element={
                  <ProtectedRoute requiredMode="seller">
                    <Earnings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute requiredMode="seller">
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seller-registration"
                element={
                  <ProtectedRoute requireAuth={true}>
                    <SellerRegistration />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seller-profile"
                element={
                  <ProtectedRoute requiredMode="seller">
                    <SellerProfile />
                  </ProtectedRoute>
                }
              />

              {/* Shared routes (both buyer and seller can access, but mode-specific content) */}
              <Route
                path="/requests"
                element={
                  <ProtectedRoute requireAuth={true}>
                    <RequestsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute requireAuth={true}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
