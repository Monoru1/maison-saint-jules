import { cn } from '@/utils/cn';

/**
 * Signature de la Maison.
 * Le monogramme superpose trois initiales dans un cartouche vertical :
 * il doit rester lisible seul à petite taille, tandis que le mot-signe
 * porte le nom complet dans la navigation.
 */
export function Logo({
  tone = 'dark',
  showWordmark = true,
  className,
}: {
  tone?: 'dark' | 'light';
  showWordmark?: boolean;
  className?: string;
}) {
  const isLight = tone === 'light';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-3.5 leading-none',
        isLight ? 'text-ivory' : 'text-ink-900',
        className,
      )}
    >
      <svg
        viewBox="0 0 50 56"
        className="h-12 w-[2.7rem] shrink-0"
        aria-hidden="true"
      >
        <path
          d="M4 3.5h42v49H4z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path d="M9 49.5h32" stroke="currentColor" strokeWidth="0.75" />
        <text
          x="7"
          y="34"
          fill="currentColor"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="31"
          fontWeight="500"
          letterSpacing="-4"
        >
          M
        </text>
        <text
          x="22"
          y="31"
          fill="currentColor"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="22"
          fontWeight="500"
          fontStyle="italic"
        >
          S
        </text>
        <text
          x="30"
          y="42"
          fill="currentColor"
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="26"
          fontWeight="500"
        >
          J
        </text>
      </svg>

      {showWordmark ? (
        <span className="flex flex-col gap-1 pt-0.5 whitespace-nowrap">
          <span className="font-sans text-[0.54rem] font-medium tracking-[0.32em] uppercase">
            Maison
          </span>
          <span className="font-display text-[1.18rem] tracking-[0.015em]">
            Saint-Jules
          </span>
        </span>
      ) : null}
    </span>
  );
}
