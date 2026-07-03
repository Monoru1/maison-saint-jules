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
