import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

/** Sur-titre de section en petites capitales espacées (kicker éditorial). */
export function SectionLabel({
  children,
  tone = 'dark',
  className,
}: {
  children: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <p
      className={cn(
        'font-sans text-[0.7rem] tracking-[0.35em] uppercase',
        tone === 'light' ? 'text-brass-400' : 'text-brass-600',
        className,
      )}
    >
      {children}
    </p>
  );
}
