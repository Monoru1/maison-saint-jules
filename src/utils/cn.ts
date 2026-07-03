import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fusionne des classes conditionnelles (clsx) puis résout les conflits
 * d'utilitaires Tailwind (tailwind-merge). Primitive du design system.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
