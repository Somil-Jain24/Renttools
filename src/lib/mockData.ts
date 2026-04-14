export interface Tool {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  deposit: number;
  category: string;
  subcategory?: string;
  images: string[];
  owner: ToolOwner;
  distance: number;
  available: boolean;
  location: string;
}

export interface ToolOwner {
  id: string;
  name: string;
  avatar: string;
  trustScore: number;
  verified: boolean;
  phoneVerified: boolean;
  idVerified: boolean;
}

export type RentalStatus = "REQUESTED" | "APPROVED" | "BORROWED" | "RETURNED";
export type DepositStatus = "LOCKED" | "DEDUCTED" | "RELEASED";
export type VerificationStatus = "NOT_VERIFIED" | "SUBMITTED" | "VERIFIED";
export type DamageLevel = "NONE" | "MINOR" | "MAJOR";
export type TrustLevel = "basic" | "verified" | "trusted";

export interface Rental {
  id: string;
  tool: Tool;
  status: RentalStatus;
  depositStatus: DepositStatus;
  startDate: string;
  endDate: string;
  totalPrice: number;
}

export const categories = [
  { name: "Power Tools", icon: "⚡", subcategories: ["Drill", "Sander", "Saw", "Grinder"] },
  { name: "Ladders", icon: "🪜", subcategories: ["Step Ladder", "Extension Ladder"] },
  { name: "Cleaning", icon: "🧹", subcategories: ["Pressure Washer", "Vacuum", "Steam Cleaner"] },
  { name: "Electrical", icon: "🔌", subcategories: ["Multimeter", "Wire Stripper", "Soldering Iron"] },
  { name: "Garden", icon: "🌿", subcategories: ["Lawn Mower", "Hedge Trimmer", "Leaf Blower"] },
  { name: "Plumbing", icon: "🔧", subcategories: ["Pipe Wrench", "Plunger", "Snake"] },
  { name: "Painting", icon: "🎨", subcategories: ["Spray Gun", "Roller Set", "Scaffolding"] },
  { name: "Hand Tools", icon: "🔨", subcategories: ["Toolkit", "Saw", "Measuring Tape"] },
];

const owners: ToolOwner[] = [
  { id: "u1", name: "Rahul Sharma", avatar: "", trustScore: 92, verified: true, phoneVerified: true, idVerified: true },
  { id: "u2", name: "Priya Patel", avatar: "", trustScore: 78, verified: true, phoneVerified: true, idVerified: false },
  { id: "u3", name: "Amit Singh", avatar: "", trustScore: 55, verified: false, phoneVerified: true, idVerified: false },
  { id: "u4", name: "Sneha Reddy", avatar: "", trustScore: 88, verified: true, phoneVerified: true, idVerified: true },
];

export const tools: Tool[] = [
  {
    id: "t1", name: "Bosch Impact Drill", description: "Professional-grade impact drill perfect for concrete and masonry work. Comes with a set of drill bits.", pricePerDay: 150, deposit: 500, category: "Power Tools", subcategory: "Drill",
    images: ["/placeholder.svg"], owner: owners[0], distance: 1.2, available: true, location: "Koramangala, Bangalore",
  },
  {
    id: "t2", name: "6ft Aluminium Ladder", description: "Sturdy aluminium step ladder, great for painting and ceiling work.", pricePerDay: 80, deposit: 300, category: "Ladders", subcategory: "Step Ladder",
    images: ["/placeholder.svg"], owner: owners[1], distance: 2.5, available: true, location: "Indiranagar, Bangalore",
  },
  {
    id: "t3", name: "Karcher Pressure Washer", description: "High-pressure washer for cleaning cars, driveways, and patios.", pricePerDay: 250, deposit: 1000, category: "Cleaning", subcategory: "Pressure Washer",
    images: ["/placeholder.svg"], owner: owners[2], distance: 3.8, available: false, location: "HSR Layout, Bangalore",
  },
  {
    id: "t4", name: "Bosch Circular Saw", description: "Powerful circular saw for woodworking projects.", pricePerDay: 200, deposit: 800, category: "Power Tools", subcategory: "Saw",
    images: ["/placeholder.svg"], owner: owners[3], distance: 0.8, available: true, location: "Whitefield, Bangalore",
  },
  {
    id: "t5", name: "Stanley Toolkit (65 pcs)", description: "Complete hand tool kit with wrenches, screwdrivers, pliers and more.", pricePerDay: 100, deposit: 400, category: "Hand Tools", subcategory: "Toolkit",
    images: ["/placeholder.svg"], owner: owners[0], distance: 1.5, available: true, location: "Koramangala, Bangalore",
  },
  {
    id: "t6", name: "Makita Angle Grinder", description: "Heavy-duty angle grinder for cutting and grinding metal.", pricePerDay: 180, deposit: 600, category: "Power Tools", subcategory: "Grinder",
    images: ["/placeholder.svg"], owner: owners[1], distance: 4.2, available: true, location: "Marathahalli, Bangalore",
  },
];

export const myRentals: Rental[] = [
  { id: "r1", tool: tools[0], status: "BORROWED", depositStatus: "LOCKED", startDate: "2026-04-10", endDate: "2026-04-14", totalPrice: 600 },
  { id: "r2", tool: tools[1], status: "RETURNED", depositStatus: "RELEASED", startDate: "2026-04-01", endDate: "2026-04-03", totalPrice: 160 },
  { id: "r3", tool: tools[4], status: "REQUESTED", depositStatus: "LOCKED", startDate: "2026-04-15", endDate: "2026-04-17", totalPrice: 200 },
];

export const myListings: Rental[] = [
  { id: "l1", tool: tools[2], status: "APPROVED", depositStatus: "LOCKED", startDate: "2026-04-12", endDate: "2026-04-15", totalPrice: 750 },
  { id: "l2", tool: tools[5], status: "REQUESTED", depositStatus: "LOCKED", startDate: "2026-04-16", endDate: "2026-04-18", totalPrice: 360 },
];

export function getTrustLevel(score: number): TrustLevel {
  if (score >= 80) return "trusted";
  if (score >= 60) return "verified";
  return "basic";
}

export function getTrustLabel(score: number): string {
  if (score >= 80) return "Trusted User";
  if (score >= 60) return "Verified User";
  return "Basic User";
}

export function scoreToStars(score: number): number {
  return Math.round((score / 100) * 5 * 10) / 10;
}
