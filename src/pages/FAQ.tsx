import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto flex-1 px-4 py-16 max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Support</span>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-3">Frequently asked questions</h1>
        </div>

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
      <Footer />
    </div>
  );
};

export default FAQ;
