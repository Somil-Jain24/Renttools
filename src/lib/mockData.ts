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
  usageGuide?: string;
}

export interface ToolOwner {
  id: string;
  name: string;
  avatar: string;
  trustScore: number;
  verified: boolean;
  phoneVerified: boolean;
  idVerified: boolean;
  isSeller: boolean;
  totalRentals?: number;
  completedRentals?: number;
  damageReports?: number;
  memberSince?: string;
}

export type RentalStatus = "REQUESTED" | "APPROVED" | "BORROWED" | "RETURNED";
export type DepositStatus = "LOCKED" | "DEDUCTED" | "RELEASED";
export type VerificationStatus = "NOT_VERIFIED" | "SUBMITTED" | "VERIFIED";
export type DamageLevel = "NONE" | "MINOR" | "MAJOR";
export type TrustLevel = "basic" | "verified" | "trusted";
export type OfferStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED" | "CONFIRMED";
export type RequestStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "EXPIRED";
export type TransactionStatus = "PENDING" | "PAID" | "FAILED";

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface Rental {
  id: string;
  tool: Tool;
  status: RentalStatus;
  depositStatus: DepositStatus;
  startDate: string;
  endDate: string;
  totalPrice: number;
  borrower?: ToolOwner;
  chatMessages?: ChatMessage[];
}

export interface NegotiatedOffer {
  id: string;
  toolId: string;
  customerId: string;
  ownerId: string;
  proposedPrice: number;
  originalPrice: number;
  status: OfferStatus;
  startDate: string;
  endDate: string;
  createdAt: string;
  expiresAt: string;
  confirmedAt?: string;
}

export interface Request {
  id: string;
  toolId: string;
  buyerId: string;
  sellerId: string;
  proposedPrice: number;
  startDate: string;
  endDate: string;
  message?: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  toolId: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  sellerId: string;
  toolId: string;
  buyerId: string;
  rentalStartDate: string;
  rentalEndDate: string;
  rentalAmount: number;
  depositAmount: number;
  depositRefunded: boolean;
  status: TransactionStatus;
  createdAt: string;
  paidAt?: string;
}

export interface ToolAnalytics {
  toolId: string;
  views: number;
  bookings: number;
  revenue: number;
}

export interface ToolViewData {
  toolId: string;
  toolName: string;
  views: number;
  bookings: number;
  conversionRate: number;
  revenue: number;
}

export const categories = [
  {
    name: "Power Tools", icon: "⚡",
    subcategories: ["Drill", "Sander", "Saw", "Grinder"],
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop",
  },
  {
    name: "Ladders", icon: "🪜",
    subcategories: ["Step Ladder", "Extension Ladder"],
    image: "https://images.unsplash.com/photo-1632923057155-1709362a2f04?w=400&h=300&fit=crop",
  },
  {
    name: "Cleaning", icon: "🧹",
    subcategories: ["Pressure Washer", "Vacuum", "Steam Cleaner"],
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=300&fit=crop",
  },
  {
    name: "Electrical", icon: "🔌",
    subcategories: ["Multimeter", "Wire Stripper", "Soldering Iron"],
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=400&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop",
  },
  {
    name: "Hand Tools", icon: "🔨",
    subcategories: ["Toolkit", "Saw", "Measuring Tape"],
    image: "https://images.unsplash.com/photo-1530124566582-a45a7c78ec43?w=400&h=300&fit=crop",
  },
];

export const owners: ToolOwner[] = [
  { id: "u1", name: "Rahul Sharma", avatar: "", trustScore: 92, verified: true, phoneVerified: true, idVerified: true, isSeller: true, totalRentals: 34, completedRentals: 32, damageReports: 0, memberSince: "Jan 2025" },
  { id: "u2", name: "Priya Patel", avatar: "", trustScore: 78, verified: true, phoneVerified: true, idVerified: false, isSeller: true, totalRentals: 18, completedRentals: 16, damageReports: 1, memberSince: "Mar 2025" },
  { id: "u3", name: "Amit Singh", avatar: "", trustScore: 55, verified: false, phoneVerified: true, idVerified: false, isSeller: true, totalRentals: 8, completedRentals: 6, damageReports: 2, memberSince: "Sep 2025" },
  { id: "u4", name: "Sneha Reddy", avatar: "", trustScore: 88, verified: true, phoneVerified: true, idVerified: true, isSeller: true, totalRentals: 25, completedRentals: 24, damageReports: 0, memberSince: "Feb 2025" },
];

export const borrowers: ToolOwner[] = [
  { id: "b1", name: "Vikram Joshi", avatar: "", trustScore: 72, verified: true, phoneVerified: true, idVerified: true, isSeller: false, totalRentals: 12, completedRentals: 11, damageReports: 1, memberSince: "Apr 2025" },
  { id: "b2", name: "Ananya Gupta", avatar: "", trustScore: 45, verified: false, phoneVerified: true, idVerified: false, isSeller: false, totalRentals: 3, completedRentals: 2, damageReports: 1, memberSince: "Dec 2025" },
];

export const tools: Tool[] = [
  {
    id: "t1", name: "Bosch Impact Drill", description: "Professional-grade impact drill perfect for concrete and masonry work. Comes with a set of drill bits.", pricePerDay: 150, deposit: 500, category: "Power Tools", subcategory: "Drill",
    images: ["https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop"],
    owner: owners[0], distance: 1.2, available: true, location: "Vijay Nagar, Indore",
    usageGuide: "1. Insert the correct drill bit for your material (masonry bit for concrete, wood bit for wood).\n2. Set the torque level — use high for concrete, medium for wood.\n3. Hold the drill firmly with both hands.\n4. Start at slow speed, then increase gradually.\n5. Do NOT force the drill — let the bit do the work.\n6. Wear safety goggles and ear protection.\n7. After use, remove the bit and wipe down the chuck.",
  },
  {
    id: "t2", name: "6ft Aluminium Ladder", description: "Sturdy aluminium step ladder, great for painting and ceiling work.", pricePerDay: 80, deposit: 300, category: "Ladders", subcategory: "Step Ladder",
    images: ["https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&h=400&fit=crop"],
    owner: owners[1], distance: 2.5, available: true, location: "Bhanwarkunj, Indore",
    usageGuide: "1. Open the ladder fully and lock the spreader bars.\n2. Place on flat, stable ground only.\n3. Never stand on the top two steps.\n4. Maintain 3 points of contact at all times.\n5. Do not lean to the side — reposition the ladder instead.\n6. Max weight capacity: 120 kg.",
  },
  {
    id: "t3", name: "Karcher Pressure Washer", description: "High-pressure washer for cleaning cars, driveways, and patios.", pricePerDay: 250, deposit: 1000, category: "Cleaning", subcategory: "Pressure Washer",
    images: ["https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop"],
    owner: owners[2], distance: 3.8, available: false, location: "Rau, Indore",
  },
  {
    id: "t4", name: "Bosch Circular Saw", description: "Powerful circular saw for woodworking projects.", pricePerDay: 200, deposit: 800, category: "Power Tools", subcategory: "Saw",
    images: ["https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=400&fit=crop"],
    owner: owners[3], distance: 0.8, available: true, location: "MG Road, Indore",
    usageGuide: "1. Clamp the workpiece securely before cutting.\n2. Set the blade depth to 5mm more than material thickness.\n3. Wait for full blade speed before starting the cut.\n4. Follow the guide line, do not twist the blade.\n5. Let the blade stop completely before lifting.\n6. Always wear safety goggles and hearing protection.",
  },
  {
    id: "t5", name: "Stanley Toolkit (65 pcs)", description: "Complete hand tool kit with wrenches, screwdrivers, pliers and more.", pricePerDay: 100, deposit: 400, category: "Hand Tools", subcategory: "Toolkit",
    images: ["https://images.unsplash.com/photo-1581147036324-c17ac41f3e6a?w=600&h=400&fit=crop"],
    owner: owners[0], distance: 1.5, available: true, location: "Vijay Nagar, Indore",
  },
  {
    id: "t6", name: "Makita Angle Grinder", description: "Heavy-duty angle grinder for cutting and grinding metal.", pricePerDay: 180, deposit: 600, category: "Power Tools", subcategory: "Grinder",
    images: ["https://images.unsplash.com/photo-1530124566582-a45a7c78ec43?w=600&h=400&fit=crop"],
    owner: owners[1], distance: 4.2, available: true, location: "Khajrana, Indore",
    usageGuide: "1. Attach the correct disc — cutting disc for cutting, grinding disc for grinding.\n2. Ensure the guard is properly positioned.\n3. Hold with both hands, brace against the workpiece.\n4. Let the disc reach full speed before contact.\n5. Move along the cut line slowly and steadily.\n6. ALWAYS wear face shield, gloves, and ear protection.",
  },
  {
    id: "t7", name: "Digital Multimeter", description: "Professional digital multimeter for electrical testing and diagnostics.", pricePerDay: 60, deposit: 200, category: "Electrical", subcategory: "Multimeter",
    images: ["https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600&h=400&fit=crop"],
    owner: owners[3], distance: 2.1, available: true, location: "Sudama Nagar, Indore",
  },
  {
    id: "t8", name: "Honda Lawn Mower", description: "Petrol-powered lawn mower for medium to large gardens.", pricePerDay: 300, deposit: 1500, category: "Garden", subcategory: "Lawn Mower",
    images: ["https://images.unsplash.com/photo-1590212151175-e31b2a227e6d?w=600&h=400&fit=crop"],
    owner: owners[0], distance: 3.0, available: true, location: "Palasia, Indore",
  },
  {
    id: "t9", name: "Paint Spray Gun", description: "HVLP spray gun for smooth, even paint application on walls and furniture.", pricePerDay: 120, deposit: 400, category: "Painting", subcategory: "Spray Gun",
    images: ["https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=600&h=400&fit=crop"],
    owner: owners[2], distance: 1.8, available: true, location: "Nanda Nagar, Indore",
  },
  {
    id: "t10", name: "Heavy Duty Pipe Wrench", description: "24-inch pipe wrench for plumbing work and heavy-duty applications.", pricePerDay: 50, deposit: 150, category: "Plumbing", subcategory: "Pipe Wrench",
    images: ["https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop"],
    owner: owners[1], distance: 5.0, available: true, location: "Geeta Bhawan, Indore",
  },
  {
    id: "t11", name: "Extension Ladder 12ft", description: "Extendable aluminium ladder, ideal for outdoor and rooftop work.", pricePerDay: 120, deposit: 500, category: "Ladders", subcategory: "Extension Ladder",
    images: ["https://images.unsplash.com/photo-1632923057155-1709362a2f04?w=600&h=400&fit=crop"],
    owner: owners[3], distance: 2.8, available: true, location: "Lokmanya Nagar, Indore",
  },
  {
    id: "t12", name: "Steam Cleaner Pro", description: "Multi-surface steam cleaner for deep cleaning floors, carpets and upholstery.", pricePerDay: 180, deposit: 600, category: "Cleaning", subcategory: "Steam Cleaner",
    images: ["https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&h=400&fit=crop"],
    owner: owners[0], distance: 1.0, available: true, location: "Vijay Nagar, Indore",
  },
  {
    id: "t13", name: "Orbital Sander", description: "Random orbital sander for smooth finishing on wood surfaces.", pricePerDay: 100, deposit: 350, category: "Power Tools", subcategory: "Sander",
    images: ["https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=600&h=400&fit=crop"],
    owner: owners[2], distance: 3.5, available: false, location: "Rajwada, Indore",
  },
  {
    id: "t14", name: "Hedge Trimmer Electric", description: "Electric hedge trimmer for shaping hedges and shrubs.", pricePerDay: 140, deposit: 450, category: "Garden", subcategory: "Hedge Trimmer",
    images: ["https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=600&h=400&fit=crop"],
    owner: owners[1], distance: 4.5, available: true, location: "Tejaji Nagar, Indore",
  },
  {
    id: "t15", name: "Soldering Iron Kit", description: "60W adjustable temperature soldering iron with accessories.", pricePerDay: 40, deposit: 150, category: "Electrical", subcategory: "Soldering Iron",
    images: ["https://images.unsplash.com/photo-1588599376442-6c4c1fc8a514?w=600&h=400&fit=crop"],
    owner: owners[3], distance: 2.0, available: true, location: "Yeshwant Niwas, Indore",
  },
  {
    id: "t16", name: "Paint Roller Set Pro", description: "Professional paint roller set with extension pole and multiple sleeves.", pricePerDay: 60, deposit: 200, category: "Painting", subcategory: "Roller Set",
    images: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop"],
    owner: owners[0], distance: 1.3, available: true, location: "Vijay Nagar, Indore",
  },
];

export const myRentals: Rental[] = [
  { id: "r1", tool: tools[0], status: "BORROWED", depositStatus: "LOCKED", startDate: "2026-04-10", endDate: "2026-04-14", totalPrice: 600,
    chatMessages: [
      { id: "m1", senderId: "u1", senderName: "Rahul Sharma", text: "Hi! Your request is approved. You can pick up the drill tomorrow.", timestamp: "2026-04-09 10:30" },
      { id: "m2", senderId: "me", senderName: "You", text: "Great! I'll come by around 11 AM.", timestamp: "2026-04-09 10:45" },
      { id: "m3", senderId: "u1", senderName: "Rahul Sharma", text: "Perfect, see you then!", timestamp: "2026-04-09 11:00" },
    ],
  },
  { id: "r2", tool: tools[1], status: "RETURNED", depositStatus: "RELEASED", startDate: "2026-04-01", endDate: "2026-04-03", totalPrice: 160 },
  { id: "r3", tool: tools[4], status: "REQUESTED", depositStatus: "LOCKED", startDate: "2026-04-15", endDate: "2026-04-17", totalPrice: 200 },
];

export const myListings: Rental[] = [
  { id: "l1", tool: tools[2], status: "APPROVED", depositStatus: "LOCKED", startDate: "2026-04-12", endDate: "2026-04-15", totalPrice: 750, borrower: borrowers[0],
    chatMessages: [
      { id: "m4", senderId: "b1", senderName: "Vikram Joshi", text: "Hey, can I pick it up at 3 PM?", timestamp: "2026-04-11 14:00" },
      { id: "m5", senderId: "me", senderName: "You", text: "Sure, 3 PM works fine.", timestamp: "2026-04-11 14:15" },
    ],
  },
  { id: "l2", tool: tools[5], status: "REQUESTED", depositStatus: "LOCKED", startDate: "2026-04-16", endDate: "2026-04-18", totalPrice: 360, borrower: borrowers[1] },
];

export const negotiatedOffers: NegotiatedOffer[] = [
  {
    id: "o1",
    toolId: "t1",
    customerId: "b1",
    ownerId: "u1",
    proposedPrice: 120,
    originalPrice: 150,
    status: "PENDING",
    startDate: "2026-04-20",
    endDate: "2026-04-22",
    createdAt: "2026-04-16 10:00",
    expiresAt: "2026-04-16 12:00",
  },
];

export const requests: Request[] = [
  {
    id: "req-1",
    toolId: "t1",
    buyerId: "b1",
    sellerId: "u1",
    proposedPrice: 120,
    startDate: "2026-04-20",
    endDate: "2026-04-22",
    message: "Would you accept ₹120/day? I have a small home repair project.",
    status: "PENDING",
    createdAt: "2026-04-16 10:00",
    updatedAt: "2026-04-16 10:00",
    expiresAt: "2026-04-17 10:00",
  },
  {
    id: "req-2",
    toolId: "t2",
    buyerId: "b1",
    sellerId: "u2",
    proposedPrice: 150,
    startDate: "2026-04-25",
    endDate: "2026-04-26",
    message: "Perfect timing for my project!",
    status: "ACCEPTED",
    createdAt: "2026-04-14 14:00",
    updatedAt: "2026-04-15 10:00",
    expiresAt: "2026-04-18 14:00",
  },
];

export const wishlistItems: WishlistItem[] = [
  { id: "w1", userId: "current-user", toolId: "t1", createdAt: "2026-04-10 09:00" },
  { id: "w2", userId: "current-user", toolId: "t5", createdAt: "2026-04-11 15:30" },
  { id: "w3", userId: "current-user", toolId: "t8", createdAt: "2026-04-12 11:45" },
];

export const transactions: Transaction[] = [
  {
    id: "txn-1",
    sellerId: "u1",
    toolId: "t1",
    buyerId: "b1",
    rentalStartDate: "2026-04-10",
    rentalEndDate: "2026-04-14",
    rentalAmount: 600,
    depositAmount: 500,
    depositRefunded: false,
    status: "PENDING",
    createdAt: "2026-04-10 08:00",
  },
  {
    id: "txn-2",
    sellerId: "u1",
    toolId: "t1",
    buyerId: "b2",
    rentalStartDate: "2026-04-01",
    rentalEndDate: "2026-04-04",
    rentalAmount: 450,
    depositAmount: 500,
    depositRefunded: true,
    status: "PAID",
    createdAt: "2026-04-01 08:00",
    paidAt: "2026-04-04 17:00",
  },
  {
    id: "txn-3",
    sellerId: "u1",
    toolId: "t5",
    buyerId: "b1",
    rentalStartDate: "2026-03-20",
    rentalEndDate: "2026-03-22",
    rentalAmount: 200,
    depositAmount: 400,
    depositRefunded: true,
    status: "PAID",
    createdAt: "2026-03-20 08:00",
    paidAt: "2026-03-22 18:00",
  },
];

export const toolAnalytics: ToolViewData[] = [
  { toolId: "t1", toolName: "Bosch Impact Drill", views: 124, bookings: 8, conversionRate: 6.45, revenue: 2400 },
  { toolId: "t2", toolName: "6ft Aluminium Ladder", views: 98, bookings: 6, conversionRate: 6.12, revenue: 480 },
  { toolId: "t5", toolName: "Stanley Toolkit (65 pcs)", views: 87, bookings: 5, conversionRate: 5.75, revenue: 500 },
  { toolId: "t8", toolName: "Honda Lawn Mower", views: 156, bookings: 4, conversionRate: 2.56, revenue: 900 },
  { toolId: "t12", toolName: "Steam Cleaner Pro", views: 112, bookings: 7, conversionRate: 6.25, revenue: 1260 },
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
