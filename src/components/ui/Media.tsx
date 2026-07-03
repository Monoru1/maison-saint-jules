import { cn } from '@/utils/cn';

interface MediaProps {
  /** URL de la photographie, ou `null` pour un placeholder de marque élégant. */
  src: string | null;
  alt: string;
  aspect?: string;
  tone?: 'ink' | 'foret';
  loading?: 'lazy' | 'eager';
  className?: string;
}

/**
 * Emplacement visuel « prêt-image ». Tant qu'aucune photographie n'est fournie,
 * un dégradé de marque et le monogramme tiennent lieu de placeholder soigné.
 */
export function Media({
  src,
  alt,
  aspect = 'aspect-[4/3]',
  tone = 'ink',
  loading = 'lazy',
  className,
}: MediaProps) {
  return (
    <div className={cn('relative overflow-hidden', aspect, className)}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className={cn(
            'grid h-full w-full place-items-center',
            tone === 'foret'
              ? 'from-foret-700 via-foret-800 to-foret-900 bg-gradient-to-br'
              : 'from-ink-700 via-ink-800 to-ink-950 bg-gradient-to-br',
          )}
        >
          <span className="font-display text-brass-500/35 text-2xl tracking-widest">
            MSJ
          </span>
        </div>
      )}
    </div>
  );
}
