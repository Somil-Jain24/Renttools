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
  {
    name: "Power Tools", icon: "⚡",
    subcategories: ["Drill", "Sander", "Saw", "Grinder"],
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
  },
  {
    name: "Ladders", icon: "🪜",
    subcategories: ["Step Ladder", "Extension Ladder"],
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop",
  },
  {
    name: "Cleaning", icon: "🧹",
    subcategories: ["Pressure Washer", "Vacuum", "Steam Cleaner"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
  },
  {
    name: "Electrical", icon: "🔌",
    subcategories: ["Multimeter", "Wire Stripper", "Soldering Iron"],
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
  },
  {
    name: "Garden", icon: "🌿",
    subcategories: ["Lawn Mower", "Hedge Trimmer", "Leaf Blower"],
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
  },
  {
    name: "Plumbing", icon: "🔧",
    subcategories: ["Pipe Wrench", "Plunger", "Snake"],
    image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop",
  },
  {
    name: "Painting", icon: "🎨",
    subcategories: ["Spray Gun", "Roller Set", "Scaffolding"],
    image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&h=300&fit=crop",
  },
  {
    name: "Hand Tools", icon: "🔨",
    subcategories: ["Toolkit", "Saw", "Measuring Tape"],
    image: "https://images.unsplash.com/photo-1581147036324-c17ac41f3e6a?w=400&h=300&fit=crop",
  },
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
    images: ["https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop"], owner: owners[0], distance: 1.2, available: true, location: "Koramangala, Bangalore",
  },
  {
    id: "t2", name: "6ft Aluminium Ladder", description: "Sturdy aluminium step ladder, great for painting and ceiling work.", pricePerDay: 80, deposit: 300, category: "Ladders", subcategory: "Step Ladder",
    images: ["https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop"], owner: owners[1], distance: 2.5, available: true, location: "Indiranagar, Bangalore",
  },
  {
    id: "t3", name: "Karcher Pressure Washer", description: "High-pressure washer for cleaning cars, driveways, and patios.", pricePerDay: 250, deposit: 1000, category: "Cleaning", subcategory: "Pressure Washer",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop"], owner: owners[2], distance: 3.8, available: false, location: "HSR Layout, Bangalore",
  },
  {
    id: "t4", name: "Bosch Circular Saw", description: "Powerful circular saw for woodworking projects.", pricePerDay: 200, deposit: 800, category: "Power Tools", subcategory: "Saw",
    images: ["https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=400&fit=crop"], owner: owners[3], distance: 0.8, available: true, location: "Whitefield, Bangalore",
  },
  {
    id: "t5", name: "Stanley Toolkit (65 pcs)", description: "Complete hand tool kit with wrenches, screwdrivers, pliers and more.", pricePerDay: 100, deposit: 400, category: "Hand Tools", subcategory: "Toolkit",
    images: ["https://images.unsplash.com/photo-1581147036324-c17ac41f3e6a?w=600&h=400&fit=crop"], owner: owners[0], distance: 1.5, available: true, location: "Koramangala, Bangalore",
  },
  {
    id: "t6", name: "Makita Angle Grinder", description: "Heavy-duty angle grinder for cutting and grinding metal.", pricePerDay: 180, deposit: 600, category: "Power Tools", subcategory: "Grinder",
    images: ["https://images.unsplash.com/photo-1530124566582-a45a7c78ec43?w=600&h=400&fit=crop"], owner: owners[1], distance: 4.2, available: true, location: "Marathahalli, Bangalore",
  },
  // Additional tools for more categories
  {
    id: "t7", name: "Digital Multimeter", description: "Professional digital multimeter for electrical testing and diagnostics.", pricePerDay: 60, deposit: 200, category: "Electrical", subcategory: "Multimeter",
    images: ["https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop"], owner: owners[3], distance: 2.1, available: true, location: "JP Nagar, Bangalore",
  },
  {
    id: "t8", name: "Honda Lawn Mower", description: "Petrol-powered lawn mower for medium to large gardens.", pricePerDay: 300, deposit: 1500, category: "Garden", subcategory: "Lawn Mower",
    images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop"], owner: owners[0], distance: 3.0, available: true, location: "Jayanagar, Bangalore",
  },
  {
    id: "t9", name: "Paint Spray Gun", description: "HVLP spray gun for smooth, even paint application on walls and furniture.", pricePerDay: 120, deposit: 400, category: "Painting", subcategory: "Spray Gun",
    images: ["https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&h=400&fit=crop"], owner: owners[2], distance: 1.8, available: true, location: "BTM Layout, Bangalore",
  },
  {
    id: "t10", name: "Heavy Duty Pipe Wrench", description: "24-inch pipe wrench for plumbing work and heavy-duty applications.", pricePerDay: 50, deposit: 150, category: "Plumbing", subcategory: "Pipe Wrench",
    images: ["https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop"], owner: owners[1], distance: 5.0, available: true, location: "Electronic City, Bangalore",
  },
  {
    id: "t11", name: "Extension Ladder 12ft", description: "Extendable aluminium ladder, ideal for outdoor and rooftop work.", pricePerDay: 120, deposit: 500, category: "Ladders", subcategory: "Extension Ladder",
    images: ["https://images.unsplash.com/photo-1632923057155-1709362a2f04?w=600&h=400&fit=crop"], owner: owners[3], distance: 2.8, available: true, location: "Hebbal, Bangalore",
  },
  {
    id: "t12", name: "Steam Cleaner Pro", description: "Multi-surface steam cleaner for deep cleaning floors, carpets and upholstery.", pricePerDay: 180, deposit: 600, category: "Cleaning", subcategory: "Steam Cleaner",
    images: ["https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=600&h=400&fit=crop"], owner: owners[0], distance: 1.0, available: true, location: "Koramangala, Bangalore",
  },
  {
    id: "t13", name: "Orbital Sander", description: "Random orbital sander for smooth finishing on wood surfaces.", pricePerDay: 100, deposit: 350, category: "Power Tools", subcategory: "Sander",
    images: ["https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=600&h=400&fit=crop"], owner: owners[2], distance: 3.5, available: false, location: "Yelahanka, Bangalore",
  },
  {
    id: "t14", name: "Hedge Trimmer Electric", description: "Electric hedge trimmer for shaping hedges and shrubs.", pricePerDay: 140, deposit: 450, category: "Garden", subcategory: "Hedge Trimmer",
    images: ["https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=600&h=400&fit=crop"], owner: owners[1], distance: 4.5, available: true, location: "Sarjapur, Bangalore",
  },
  {
    id: "t15", name: "Soldering Iron Kit", description: "60W adjustable temperature soldering iron with accessories.", pricePerDay: 40, deposit: 150, category: "Electrical", subcategory: "Soldering Iron",
    images: ["https://images.unsplash.com/photo-1588599376442-6c4c1fc8a514?w=600&h=400&fit=crop"], owner: owners[3], distance: 2.0, available: true, location: "Domlur, Bangalore",
  },
  {
    id: "t16", name: "Paint Roller Set Pro", description: "Professional paint roller set with extension pole and multiple sleeves.", pricePerDay: 60, deposit: 200, category: "Painting", subcategory: "Roller Set",
    images: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop"], owner: owners[0], distance: 1.3, available: true, location: "Koramangala, Bangalore",
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
