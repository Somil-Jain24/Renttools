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
            <h4 className="font-semibold mb-3 text-sm">Explore</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/about" className="block hover:text-foreground">About Us</Link>
              <Link to="/browse" className="block hover:text-foreground">Browse Tools</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Legal</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="cursor-pointer hover:text-foreground">Privacy Policy</p>
              <p className="cursor-pointer hover:text-foreground">Terms of Service</p>
              <p className="cursor-pointer hover:text-foreground">Refund Policy</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>support@rentkart.com</p>
              <p>+91 98765 43210</p>
              <p>Bengaluru, India</p>
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
