import type { CustomerInfo } from '@/reservation/types';
import type { CustomerErrors } from '@/reservation/utils/validation';

import { FormField, fieldControlClass } from './FormField';
import { StepHeading } from './StepHeading';

interface StepCustomerProps {
  customer: CustomerInfo;
  onChange: (patch: Partial<CustomerInfo>) => void;
  errors: CustomerErrors;
  showErrors: boolean;
}

/** Étape 4 — informations client. */
export function StepCustomer({
  customer,
  onChange,
  errors,
  showErrors,
}: StepCustomerProps) {
  const errorFor = (field: keyof CustomerInfo) =>
    showErrors ? errors[field] : undefined;

  return (
    <div>
      <StepHeading
        step="Étape 4"
        title="Vos informations"
        subtitle="Nous en avons besoin pour confirmer votre demande de séjour."
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <FormField
          label="Prénom"
          htmlFor="firstName"
          error={errorFor('firstName')}
        >
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            value={customer.firstName}
            onChange={(event) => onChange({ firstName: event.target.value })}
            className={fieldControlClass}
          />
        </FormField>
        <FormField label="Nom" htmlFor="lastName" error={errorFor('lastName')}>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            value={customer.lastName}
            onChange={(event) => onChange({ lastName: event.target.value })}
            className={fieldControlClass}
          />
        </FormField>
        <FormField label="E-mail" htmlFor="email" error={errorFor('email')}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={customer.email}
            onChange={(event) => onChange({ email: event.target.value })}
            className={fieldControlClass}
          />
        </FormField>
        <FormField label="Téléphone" htmlFor="phone" error={errorFor('phone')}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={customer.phone}
            onChange={(event) => onChange({ phone: event.target.value })}
            className={fieldControlClass}
          />
        </FormField>
      </div>

      <FormField
        label="Demande particulière (facultatif)"
        htmlFor="specialRequest"
        className="mt-8"
      >
        <textarea
          id="specialRequest"
          rows={3}
          value={customer.specialRequest}
          onChange={(event) => onChange({ specialRequest: event.target.value })}
          className={`${fieldControlClass} resize-none`}
        />
      </FormField>

      <div className="mt-8">
        <label className="text-ink-600 flex items-start gap-3 text-sm leading-relaxed">
          <input
            type="checkbox"
            checked={customer.consent}
            onChange={(event) => onChange({ consent: event.target.checked })}
            className="accent-brass-600 mt-0.5 size-4 shrink-0"
          />
          <span>
            J’accepte que la Maison Saint-Jules utilise ces informations pour
            traiter ma demande de réservation.
          </span>
        </label>
        {showErrors && errors.consent ? (
          <p role="alert" className="mt-2 text-sm text-red-700">
            {errors.consent}
          </p>
        ) : null}
      </div>
    </div>
  );
}
