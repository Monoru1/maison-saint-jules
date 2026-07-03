import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

import { SmartLink } from './SmartLink';

/** Lien éditorial discret avec flèche animée (« En savoir plus → »). */
export function ArrowLink({
  href,
  children,
  tone = 'dark',
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <SmartLink
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase transition-colors',
        tone === 'light'
          ? 'text-ivory hover:text-brass-300'
          : 'text-ink-800 hover:text-brass-600',
        className,
      )}
    >
      {children}
      <ArrowRight
        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        strokeWidth={1.5}
      />
    </SmartLink>
  );
}
