import { HOME_SECTIONS, ROUTES } from '@/config/routes';
import type { NavItem } from '@/hotel/types';

/** Navigation principale du site public. */
export const primaryNav: readonly NavItem[] = [
  { label: 'La Maison', href: `#${HOME_SECTIONS.signature}` },
  { label: 'Suites', href: `#${HOME_SECTIONS.suites}` },
  { label: 'Restaurant', href: `#${HOME_SECTIONS.restaurant}` },
  { label: 'Spa', href: `#${HOME_SECTIONS.spa}` },
  { label: 'Expériences', href: `#${HOME_SECTIONS.experiences}` },
  { label: 'Galerie', href: `#${HOME_SECTIONS.gallery}` },
] as const;

/** Liens du pied de page. */
export const footerNav: readonly NavItem[] = [
  { label: 'La Maison', href: `#${HOME_SECTIONS.signature}` },
  { label: 'Suites & Chambres', href: `#${HOME_SECTIONS.suites}` },
  { label: 'Restaurant', href: `#${HOME_SECTIONS.restaurant}` },
  { label: 'Spa & Bien-être', href: `#${HOME_SECTIONS.spa}` },
  { label: 'Expériences', href: `#${HOME_SECTIONS.experiences}` },
  { label: 'Réserver', href: ROUTES.reservation },
] as const;

export const legalNav: readonly NavItem[] = [
  { label: 'Mentions légales', href: ROUTES.home },
  { label: 'Confidentialité', href: ROUTES.home },
  { label: 'Conditions de réservation', href: ROUTES.home },
] as const;
