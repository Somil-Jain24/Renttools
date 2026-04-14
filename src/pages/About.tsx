import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Recycle, Users, Shield, Heart } from "lucide-react";

const values = [
  { icon: Recycle, title: "Reduce Waste", desc: "Why buy a tool you'll use once? Borrow it instead and reduce unnecessary consumption." },
  { icon: Users, title: "Share with Neighbors", desc: "Build community connections by sharing tools and skills with people nearby." },
  { icon: Shield, title: "Trust Economy", desc: "Our verification and escrow system ensures every transaction is safe and secure." },
  { icon: Heart, title: "Save Money", desc: "Access professional-grade tools at a fraction of the purchase price." },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-16 max-w-3xl">
        <div className="text-center mb-14">
          <h1 className="text-3xl font-extrabold md:text-4xl">About <span className="text-primary">RentKart</span></h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto">
            We're building a peer-to-peer tool sharing platform that helps you save money, reduce waste, and connect with your community.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {values.map(v => (
            <div key={v.title} className="rounded-xl border bg-card p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <v.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-primary/5 border border-primary/10 p-8 text-center">
          <h2 className="text-xl font-bold mb-3">How it works</h2>
          <div className="grid gap-4 sm:grid-cols-3 mt-6">
            {["Browse tools near you", "Request to rent & pay deposit", "Pick up, use, and return"].map((step, i) => (
              <div key={step} className="space-y-2">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">{i + 1}</div>
                <p className="text-sm font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
