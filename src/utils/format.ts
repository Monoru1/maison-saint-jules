import { APP } from '@/config/constants';

const currencyFormatter = new Intl.NumberFormat(APP.locale, {
  style: 'currency',
  currency: APP.defaultCurrency,
  maximumFractionDigits: 0,
});

/** Formate un montant en euros, sans décimales (ex. « 1 200 € »). */
export function formatPrice(amount: number): string {
  return currencyFormatter.format(amount);
}

const dateFormatter = new Intl.DateTimeFormat(APP.locale, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** Formate une date ISO `YYYY-MM-DD` en français court (ex. « 4 juil. 2026 »). */
export function formatDate(iso: string): string {
  const time = Date.parse(`${iso}T00:00:00Z`);
  return Number.isNaN(time) ? '—' : dateFormatter.format(new Date(time));
}
