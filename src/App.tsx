import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BrowseTools from "./pages/BrowseTools";
import ToolDetails from "./pages/ToolDetails";
import ListTool from "./pages/ListTool";
import Dashboard from "./pages/Dashboard";
import Register, { OtpVerification } from "./pages/Auth";
import About from "./pages/About";
import Verification from "./pages/Verification";
import DamageCheck from "./pages/DamageCheck";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";
import MyProfile from "./pages/MyProfile";
import MyAccount from "./pages/MyAccount";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/browse" element={<BrowseTools />} />
          <Route path="/tools/:id" element={<ToolDetails />} />
          <Route path="/list-tool" element={<ListTool />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Register />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/otp" element={<OtpVerification />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/damage-check" element={<DamageCheck />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/account" element={<MyAccount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
