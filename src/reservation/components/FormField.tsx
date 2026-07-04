import type { ReactNode } from 'react';

/** Classe partagée des contrôles du tunnel (style « ligne » sobre). */
export const fieldControlClass =
  'border-ink-300 focus:border-ink-900 w-full border-b bg-transparent py-2.5 font-sans text-ink-900 outline-none transition-colors placeholder:text-ink-400';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

/** Champ de formulaire : libellé, contrôle et message d'erreur accessibles. */
export function FormField({
  label,
  htmlFor,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="text-ink-500 font-sans text-[0.7rem] tracking-[0.2em] uppercase"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
