import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search, CalendarCheck, Handshake, Star, ShieldCheck, Shield, CreditCard, MessageSquare, UserCheck } from "lucide-react";

const steps = [
  { icon: Search, title: "Find a Tool", desc: "Search by name, category, or browse what's available in your neighborhood." },
  { icon: CalendarCheck, title: "Book & Pay", desc: "Select your dates, pay securely through the platform, and confirm your rental." },
  { icon: Handshake, title: "Pick Up & Use", desc: "Meet your neighbor, pick up the tool, and get your project done." },
  { icon: Star, title: "Return & Review", desc: "Return the tool on time and leave a review to help the community." },
];

const trustFeatures = [
  { icon: UserCheck, title: "Verified Users", desc: "Every user is ID-verified. We check government IDs and cross-reference profiles for your safety." },
  { icon: Shield, title: "Damage Protection", desc: "Every rental includes basic protection. Owners are covered if something goes wrong." },
  { icon: CreditCard, title: "Secure Payments", desc: "Payments are held in escrow until the rental is complete. No cash exchanges needed." },
  { icon: MessageSquare, title: "In-App Messaging", desc: "Communicate directly with renters and owners through our secure messaging system." },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Simple Process</span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-3">How RentKart works</h1>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            From search to return, we make tool rental effortless and secure.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-14 max-w-5xl mx-auto">
            {steps.map((s, i) => (
              <div key={s.title} className="flex flex-col items-center text-center space-y-4">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <s.icon className="h-7 w-7 text-primary" />
                  <span className="absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{i + 1}</span>
                </div>
                <h3 className="font-bold text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">Built on Trust</span>
              <h2 className="text-3xl md:text-4xl font-extrabold mt-3">Your safety is our priority</h2>
              <p className="text-muted-foreground mt-4 max-w-lg">
                We've built multiple layers of protection so you can rent and lend with confidence. Every transaction is backed by our guarantee.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 mt-10">
                {trustFeatures.map(f => (
                  <div key={f.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <f.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{f.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust card illustration */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm space-y-4">
                <div className="rounded-2xl border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10" />
                    <div className="flex-1">
                      <div className="h-3 w-24 rounded bg-muted" />
                      <div className="h-2 w-16 rounded bg-muted mt-2" />
                    </div>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Verified ✓</span>
                  </div>
                  <div className="flex items-center gap-1 mt-4">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="h-4 w-4 rounded-full bg-amber-400" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">5.0 (42 rentals)</span>
                  </div>
                </div>
                <div className="rounded-2xl border bg-card p-5 shadow-sm flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Protected Rental</p>
                    <p className="text-sm text-muted-foreground">₹500 damage coverage included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
