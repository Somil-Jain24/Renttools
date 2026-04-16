import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { NegotiatedOffer } from "./mockData";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isOfferExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date();
}

export function getTimeRemaining(expiresAt: string): string {
  const now = new Date();
  const expires = new Date(expiresAt);
  const diffMs = expires.getTime() - now.getTime();

  if (diffMs <= 0) return "Expired";

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export function createOffer(
  toolId: string,
  customerId: string,
  ownerId: string,
  proposedPrice: number,
  originalPrice: number,
  startDate: string,
  endDate: string
): NegotiatedOffer {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now

  return {
    id: `o-${Date.now()}`,
    toolId,
    customerId,
    ownerId,
    proposedPrice,
    originalPrice,
    status: "PENDING",
    startDate,
    endDate,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  };
}
