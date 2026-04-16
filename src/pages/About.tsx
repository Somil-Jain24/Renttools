import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Recycle, Users, Shield, Heart, Mail, Phone, MapPin, Search, CalendarCheck, Handshake, Star, ShieldCheck, CreditCard, MessageSquare, UserCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const values = [
  { icon: Recycle, title: "Reduce Waste", desc: "Why buy a tool you'll use once? Borrow it instead and reduce unnecessary consumption." },
  { icon: Users, title: "Share with Neighbors", desc: "Build community connections by sharing tools and skills with people nearby." },
  { icon: Shield, title: "Trust Economy", desc: "Our verification and escrow system ensures every transaction is safe and secure." },
  { icon: Heart, title: "Save Money", desc: "Access professional-grade tools at a fraction of the purchase price." },
];

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

const faqs = [
  { q: "How does pricing work?", a: "Tool owners set their own daily rental price. You'll see the price per day on each listing, and the total cost is calculated based on how many days you rent. A refundable security deposit is also collected at the time of booking." },
  { q: "What if a tool is damaged during my rental?", a: "Every rental includes basic damage protection. If damage occurs, the security deposit may be partially or fully used to cover repair costs. For major damage, our support team will mediate between the renter and owner." },
  { q: "How do I know the tools are in good condition?", a: "Owners upload photos of their tools before each rental. You can also check owner ratings and reviews from previous renters. Our damage check system compares before and after photos to ensure transparency." },
  { q: "Is my personal information safe?", a: "Yes. We use industry-standard encryption for all data. Your personal details are only shared with the other party in an active rental, and payment information is handled securely through our escrow system." },
  { q: "Can I list my own tools for rent?", a: "Absolutely! Click 'List a Tool' in the navigation bar, fill in your tool details including photos and pricing, and your listing will be live for nearby renters to discover." },
  { q: "What areas does RentKart serve?", a: "RentKart is currently available in major Indian cities including Bangalore, Mumbai, Delhi, and Chennai. We're expanding to more cities soon. Enter your location to see tools available near you." },
  { q: "How do deposits and payments work?", a: "When you book a tool, the rental fee and a refundable security deposit are held in escrow. The rental fee is released to the owner after the tool is returned, and the deposit is refunded to you if no damage is reported." },
  { q: "How do I become a verified user?", a: "Go to your Dashboard → Verification page and upload a valid government ID (Aadhaar, driving license, or student ID). Our team will verify your identity within 24 hours." },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-16 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-14">
          <h1 className="text-3xl font-extrabold md:text-4xl">About <span className="text-primary">RentKart</span></h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-xl mx-auto">
            We're building a peer-to-peer tool sharing platform that helps you save money, reduce waste, and connect with your community.
          </p>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="about">About Us</TabsTrigger>
            <TabsTrigger value="how">How It Works</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-8">
            {/* Values Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Our Values</h2>
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
            </div>

            {/* Contact Section */}
            <div className="rounded-2xl border bg-card p-8">
              <h2 className="text-xl font-bold mb-6 text-center">Contact Us</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Email</p>
                  <a href="mailto:support@rentkart.in" className="text-sm text-primary hover:underline">support@rentkart.in</a>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Phone</p>
                  <a href="tel:+918001234567" className="text-sm text-primary hover:underline">+91 800-123-4567</a>
                </div>
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm text-muted-foreground">Koramangala, Bangalore, India 560034</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* How It Works Tab */}
          <TabsContent value="how" className="space-y-8">
            {/* Process Steps */}
            <div>
              <h2 className="text-2xl font-bold mb-8 text-center">Our Simple Process</h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

            {/* Trust & Safety */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Trust & Safety</h2>
              <div className="grid gap-12 lg:grid-cols-2 items-start">
                <div>
                  <p className="text-muted-foreground mb-6 max-w-lg">
                    We've built multiple layers of protection so you can rent and lend with confidence. Every transaction is backed by our guarantee.
                  </p>
                  <div className="grid gap-6">
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
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <div>
              <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="rounded-xl border bg-card px-6">
                    <AccordionTrigger className="text-left font-medium hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default About;
