import { type FormEvent, type ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { buttonClasses } from '@/components/ui/button-variants';
import { ROUTES } from '@/config/routes';
import { cn } from '@/utils/cn';

const controlClass =
  'w-full bg-transparent font-sans text-sm text-ivory outline-none [color-scheme:dark] placeholder:text-ivory/40';

const adultsOptions = [1, 2, 3, 4, 5, 6];
const childrenOptions = [0, 1, 2, 3, 4];

/**
 * Premier geste de réservation du parcours public.
 *
 * Les choix sont transmis au funnel et validés à son entrée par
 * `parseStayState`, sans dupliquer les règles métier du domaine réservation.
 */
export function BookingBar() {
  const navigate = useNavigate();
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [adults, setAdults] = useState('2');
  const [kids, setKids] = useState('0');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void navigate(ROUTES.reservation, {
      state: {
        arrival,
        departure,
        adults: Number(adults),
        children: Number(kids),
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Vérifier les disponibilités"
      className="border-ivory/15 bg-ink-900/50 flex flex-col gap-px border backdrop-blur-md md:flex-row md:items-stretch"
    >
      <Field label="Arrivée">
        <input
          type="date"
          required
          value={arrival}
          onChange={(event) => setArrival(event.target.value)}
          className={controlClass}
        />
      </Field>
      <Field label="Départ">
        <input
          type="date"
          required
          min={arrival || undefined}
          value={departure}
          onChange={(event) => setDeparture(event.target.value)}
          className={controlClass}
        />
      </Field>
      <Field label="Adultes">
        <select
          value={adults}
          onChange={(event) => setAdults(event.target.value)}
          className={controlClass}
        >
          {adultsOptions.map((value) => (
            <option key={value} value={value} className="text-ink-900">
              {value}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Enfants">
        <select
          value={kids}
          onChange={(event) => setKids(event.target.value)}
          className={controlClass}
        >
          {childrenOptions.map((value) => (
            <option key={value} value={value} className="text-ink-900">
              {value}
            </option>
          ))}
        </select>
      </Field>
      <button
        type="submit"
        className={cn(
          buttonClasses({ variant: 'primary', size: 'md' }),
          'md:w-auto',
        )}
      >
        Vérifier les disponibilités
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-w-40 flex-1 flex-col gap-1.5 px-5 py-4">
      <span className="text-ivory/50 font-sans text-[0.65rem] tracking-[0.25em] uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}
