/**
 * Calcule le nombre de nuits entre deux dates ISO `YYYY-MM-DD`.
 * Retourne 0 si l'une des dates est absente/invalide ou si le départ n'est
 * pas strictement postérieur à l'arrivée. Calcul en UTC (indépendant du fuseau).
 */
export function computeNights(arrival: string, departure: string): number {
  const start = Date.parse(`${arrival}T00:00:00Z`);
  const end = Date.parse(`${departure}T00:00:00Z`);
  if (Number.isNaN(start) || Number.isNaN(end)) return 0;

  const diff = Math.round((end - start) / 86_400_000);
  return diff > 0 ? diff : 0;
}
