import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine class names conditionally while resolving Tailwind conflicts.
 * Example: cn("p-2", isActive && "bg-green-500")
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Converts a string to lowercase kebab-case.
 * - Replaces spaces with dashes
 * - Returns empty string for invalid input
 *
 * Example: updateKey("Student Dashboard") => "student-dashboard"
 */
export function updateKey(str: unknown): string {
  if (typeof str !== "string") return ""
  return str.trim().toLowerCase().replace(/\\s+/g, "-")
}
