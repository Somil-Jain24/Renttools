import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, MapPin, Bell, Shield, LogOut } from "lucide-react";
import { useUser } from "@/context/UserContext";

const MyAccount = () => {
  const { currentUser, switchRole } = useUser();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">My Account</h1>

        <div className="space-y-6">
          {/* Account Type / Role Switcher */}
          <div className="rounded-xl border bg-card p-5 space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Shield className="h-4 w-4" /> Account Type
            </h3>
            <div className="flex gap-2">
              <Button
                onClick={() => switchRole("buyer")}
                variant={currentUser?.role === "buyer" ? "default" : "outline"}
                size="sm"
                className="flex-1"
              >
                👤 Buyer
              </Button>
              <Button
                onClick={() => switchRole("seller")}
                variant={currentUser?.role === "seller" ? "default" : "outline"}
                size="sm"
                className="flex-1"
              >
                🏪 Seller
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {currentUser?.role === "seller" ? (
                <>You can list and rent items. Visit your listings to get started!</>
              ) : (
                <>Switch to Seller to list and rent items</>
              )}
            </p>
          </div>

          {/* Personal Info */}
          <div className="rounded-xl border bg-card p-5 space-y-4">
            <h3 className="text-sm font-semibold">Personal Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10" defaultValue="Demo User" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10" defaultValue="demo@rentkart.com" type="email" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10" defaultValue="+91 98765 43210" type="tel" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10" defaultValue="Indore, India" />
                </div>
              </div>
            </div>
            <Button size="sm">Save Changes</Button>
          </div>

          {/* Notification Preferences */}
          <div className="rounded-xl border bg-card p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Notifications</h3>
            </div>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" /> Email notifications for rental requests
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" /> SMS alerts for approved rentals
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" /> Marketing updates
              </label>
            </div>
          </div>

          {/* Security */}
          <div className="rounded-xl border bg-card p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold">Security</h3>
            </div>
            <Button variant="outline" size="sm">Change Password</Button>
          </div>

          {/* Danger Zone */}
          <div className="rounded-xl border border-destructive/30 bg-card p-5 space-y-3">
            <h3 className="text-sm font-semibold text-destructive">Danger Zone</h3>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                <LogOut className="h-4 w-4 mr-1" /> Log Out
              </Button>
              <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccount;
