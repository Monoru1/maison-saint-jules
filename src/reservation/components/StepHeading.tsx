import { SectionLabel } from '@/components/ui/SectionLabel';

/** En-tête commun aux étapes du tunnel. */
export function StepHeading({
  step,
  title,
  subtitle,
}: {
  step: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="mb-10">
      <SectionLabel>{step}</SectionLabel>
      <h2 className="text-ink-900 mt-4 text-3xl md:text-4xl">{title}</h2>
      <p className="text-ink-500 mt-3 leading-relaxed">{subtitle}</p>
    </header>
  );
}
