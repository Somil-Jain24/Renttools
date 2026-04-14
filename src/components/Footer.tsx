import { Wrench } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Wrench className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">RentKart</span>
            </div>
            <p className="text-sm text-muted-foreground">Rent tools from neighbors. Save money, reduce waste.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Platform</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/browse" className="block hover:text-foreground">Browse Tools</Link>
              <Link to="/list-tool" className="block hover:text-foreground">List a Tool</Link>
              <Link to="/about" className="block hover:text-foreground">About Us</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Account</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/dashboard" className="block hover:text-foreground">Dashboard</Link>
              <Link to="/verification" className="block hover:text-foreground">Verification</Link>
              <Link to="/login" className="block hover:text-foreground">Login</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Trust & Safety</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Verified users only</p>
              <p>Escrow-protected deposits</p>
              <p>Damage check system</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          © 2026 RentKart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
