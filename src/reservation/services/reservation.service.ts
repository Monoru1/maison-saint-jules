import type { BookingDraft, BookingRequestResult } from '@/reservation/types';

/**
 * Crée une demande de réservation à partir d'un brouillon validé.
 *
 * Implémentation actuelle : génération locale d'une référence horodatée, sans
 * aucune dépendance Appwrite (le SDK reste hors du bundle public). Point
 * d'extension : la persistance réelle (collection Appwrite dédiée) viendra
 * derrière cette même signature, sans modifier les composants du tunnel.
 */
export function createBookingRequest(
  draft: BookingDraft,
): Promise<BookingRequestResult> {
  return Promise.resolve({
    reference: generateReference(),
    status: 'ready',
    submittedAt: new Date().toISOString(),
    draft,
  });
}

function generateReference(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const random = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `MSJ-${stamp}${random}`;
}
