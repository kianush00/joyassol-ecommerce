import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateName = (name: string, maxLength: number = 20) => {
  if (name.length <= maxLength) return name;
  return `${name.slice(0, maxLength).trim()}...`;
};
