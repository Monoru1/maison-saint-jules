import { ROUTES } from '@/config/routes';
import type { NavItem } from '@/hotel/types';

/** Navigation principale du site public. */
export const primaryNav: readonly NavItem[] = [
  { label: 'La Maison', href: ROUTES.maison },
  { label: 'Suites', href: ROUTES.suites },
  { label: 'Le Cabinet', href: ROUTES.cabinet },
  { label: 'Les Bains', href: ROUTES.bains },
  { label: 'Le Jardin', href: ROUTES.jardin },
  { label: 'La Nuit', href: ROUTES.nuit },
] as const;

/** Liens du pied de page. */
export const footerNav: readonly NavItem[] = [
  { label: 'La Maison', href: ROUTES.maison },
  { label: 'Suites & Chambres', href: ROUTES.suites },
  { label: 'Le Cabinet', href: ROUTES.cabinet },
  { label: 'Les Bains', href: ROUTES.bains },
  { label: 'Le Jardin', href: ROUTES.jardin },
  { label: 'Le Journal', href: ROUTES.journal },
  { label: 'Réserver', href: ROUTES.reservation },
] as const;

export const legalNav: readonly NavItem[] = [
  { label: 'Mentions légales', href: ROUTES.home },
  { label: 'Confidentialité', href: ROUTES.home },
  { label: 'Conditions de réservation', href: ROUTES.home },
] as const;
