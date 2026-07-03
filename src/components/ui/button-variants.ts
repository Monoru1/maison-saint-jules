import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'outline' | 'inverted';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2.5 font-sans text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brass-500 text-ink-900 hover:bg-brass-400',
  outline:
    'border border-brass-500/50 text-ink-900 hover:border-brass-500 hover:bg-brass-500/5',
  inverted:
    'border border-ivory/30 text-ivory hover:border-ivory/70 hover:bg-ivory/5',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2.5',
  md: 'px-6 py-3.5',
  lg: 'px-8 py-4',
};

/** Classes partagées par `Button` et par les CTA rendus comme liens (DRY). */
export function buttonClasses(options?: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}): string {
  const { variant = 'primary', size = 'md', className } = options ?? {};
  return cn(base, variantClasses[variant], sizeClasses[size], className);
}
