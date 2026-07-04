import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { buttonClasses } from '@/components/ui/button-variants';
import { getSuiteBySlug, suites } from '@/hotel/data';
import { extras } from '@/reservation/data/extras';
import { createBookingRequest } from '@/reservation/services/reservation.service';
import type {
  BookingDraft,
  BookingRequestResult,
  CustomerInfo,
  StayDetails,
} from '@/reservation/types';
import { computePricing } from '@/reservation/utils/pricing';
import {
  parseStayState,
  validateCustomer,
  validateStay,
} from '@/reservation/utils/validation';

import { FunnelStepper } from './FunnelStepper';
import { StepConfirmation } from './StepConfirmation';
import { StepCustomer } from './StepCustomer';
import { StepOptions } from './StepOptions';
import { StepStay } from './StepStay';
import { StepSuite } from './StepSuite';
import { SummaryAside } from './SummaryAside';

const STEPS = ['Séjour', 'Suite', 'Options', 'Informations', 'Confirmation'];

const DEFAULT_STAY: StayDetails = {
  arrival: '',
  departure: '',
  adults: 2,
  children: 0,
};

const DEFAULT_CUSTOMER: CustomerInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  specialRequest: '',
  consent: false,
};

/**
 * Tunnel de réservation en cinq étapes. État local typé ; toutes les règles de
 * calcul et de validation proviennent du domaine `@/reservation`. Rendu
 * déterministe (SSG-safe) : le pré-remplissage depuis la barre de réservation
 * passe par l'état de navigation, jamais par l'URL.
 */
export function ReservationFunnel() {
  const location = useLocation();

  const [step, setStep] = useState(0);
  const [stay, setStay] = useState<StayDetails>(
    () => parseStayState(location.state) ?? DEFAULT_STAY,
  );
  const [suiteSlug, setSuiteSlug] = useState<string | null>(null);
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);
  const [customer, setCustomer] = useState<CustomerInfo>(DEFAULT_CUSTOMER);
  const [showErrors, setShowErrors] = useState(false);
  const [result, setResult] = useState<BookingRequestResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const suite = suiteSlug ? getSuiteBySlug(suiteSlug) : undefined;
  const guests = stay.adults + stay.children;
  const stayValidation = validateStay(stay);
  const nights = stayValidation.nights;
  const selectedExtras = extras.filter((extra) =>
    selectedExtraIds.includes(extra.id),
  );
  const pricing = computePricing({
    nightlyRate: suite?.priceFrom ?? 0,
    nights,
    guests,
    selectedExtras,
  });
  const customerValidation = validateCustomer(customer);

  const canProceed = [
    stayValidation.valid,
    suite !== undefined,
    true,
    customerValidation.valid,
    true,
  ][step];

  const goNext = () => {
    if (!canProceed) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setShowErrors(false);
    setStep((current) => Math.max(current - 1, 0));
  };

  const goToStep = (index: number) => {
    if (index < step) {
      setShowErrors(false);
      setStep(index);
    }
  };

  const toggleExtra = (id: string) => {
    setSelectedExtraIds((ids) =>
      ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id],
    );
  };

  const submit = async () => {
    if (!suite || !stayValidation.valid || !customerValidation.valid) {
      setShowErrors(true);
      return;
    }
    setSubmitting(true);
    try {
      const draft: BookingDraft = {
        stay,
        suiteSlug: suite.slug,
        selectedExtraIds,
        customer,
        pricing,
      };
      setResult(await createBookingRequest(draft));
    } finally {
      setSubmitting(false);
    }
  };

  const completed = step === STEPS.length - 1 && result !== null;

  return (
    <div>
      <FunnelStepper steps={STEPS} current={step} onStepSelect={goToStep} />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_340px]">
        <div>
          {step === 0 && (
            <StepStay
              stay={stay}
              onChange={(patch) => setStay((prev) => ({ ...prev, ...patch }))}
              errors={stayValidation.errors}
              showErrors={showErrors}
              nights={nights}
            />
          )}
          {step === 1 && (
            <StepSuite
              suites={suites}
              selectedSlug={suiteSlug}
              onSelect={setSuiteSlug}
              showError={showErrors}
            />
          )}
          {step === 2 && (
            <StepOptions
              extras={extras}
              selectedIds={selectedExtraIds}
              onToggle={toggleExtra}
              nights={nights}
              guests={guests}
            />
          )}
          {step === 3 && (
            <StepCustomer
              customer={customer}
              onChange={(patch) =>
                setCustomer((prev) => ({ ...prev, ...patch }))
              }
              errors={customerValidation.errors}
              showErrors={showErrors}
            />
          )}
          {step === 4 && (
            <StepConfirmation
              stay={stay}
              suite={suite}
              selectedExtras={selectedExtras}
              customer={customer}
              pricing={pricing}
              result={result}
              submitting={submitting}
              onSubmit={() => void submit()}
            />
          )}

          {!completed && (
            <div className="border-ink-200 mt-12 flex items-center justify-between border-t pt-8">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className={buttonClasses({ variant: 'outline', size: 'md' })}
                >
                  Retour
                </button>
              ) : (
                <span />
              )}
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className={buttonClasses({ variant: 'primary', size: 'md' })}
                >
                  Continuer
                </button>
              ) : null}
            </div>
          )}
        </div>

        {step >= 1 ? (
          <SummaryAside
            stay={stay}
            suite={suite}
            selectedExtras={selectedExtras}
            pricing={pricing}
          />
        ) : (
          <div className="hidden lg:block" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
