import type { StayDetails } from '@/reservation/types';
import type { StayValidation } from '@/reservation/utils/validation';

import { FormField, fieldControlClass } from './FormField';
import { StepHeading } from './StepHeading';

const adultsOptions = [1, 2, 3, 4, 5, 6];
const childrenOptions = [0, 1, 2, 3, 4];

interface StepStayProps {
  stay: StayDetails;
  onChange: (patch: Partial<StayDetails>) => void;
  errors: StayValidation['errors'];
  showErrors: boolean;
  nights: number;
}

/** Étape 1 — dates et voyageurs. */
export function StepStay({
  stay,
  onChange,
  errors,
  showErrors,
  nights,
}: StepStayProps) {
  return (
    <div>
      <StepHeading
        step="Étape 1"
        title="Votre séjour"
        subtitle="Indiquez vos dates et le nombre de voyageurs."
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <FormField label="Arrivée" htmlFor="arrival">
          <input
            id="arrival"
            type="date"
            value={stay.arrival}
            onChange={(event) => onChange({ arrival: event.target.value })}
            className={fieldControlClass}
          />
        </FormField>
        <FormField label="Départ" htmlFor="departure">
          <input
            id="departure"
            type="date"
            min={stay.arrival || undefined}
            value={stay.departure}
            onChange={(event) => onChange({ departure: event.target.value })}
            className={fieldControlClass}
          />
        </FormField>
        <FormField label="Adultes" htmlFor="adults">
          <select
            id="adults"
            value={stay.adults}
            onChange={(event) =>
              onChange({ adults: Number(event.target.value) })
            }
            className={fieldControlClass}
          >
            {adultsOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Enfants" htmlFor="children">
          <select
            id="children"
            value={stay.children}
            onChange={(event) =>
              onChange({ children: Number(event.target.value) })
            }
            className={fieldControlClass}
          >
            {childrenOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      {showErrors && errors.stay ? (
        <p role="alert" className="mt-6 text-sm text-red-700">
          {errors.stay}
        </p>
      ) : null}
      {showErrors && errors.guests ? (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {errors.guests}
        </p>
      ) : null}

      {nights > 0 ? (
        <p className="text-ink-500 mt-8 text-sm">
          Soit{' '}
          <span className="text-ink-900 font-medium">
            {nights} {nights > 1 ? 'nuits' : 'nuit'}
          </span>
          .
        </p>
      ) : null}
    </div>
  );
}
