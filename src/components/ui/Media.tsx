import type { HotelImage, MediaCategory } from '@/hotel/types';
import { cn } from '@/utils/cn';
import { responsiveImageProps } from '@/utils/responsive-image';

interface MediaProps {
  image: HotelImage;
  /** Classe de ratio Tailwind (ex. `aspect-[4/5]`) ou dimension libre. */
  aspect?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
  imgClassName?: string;
  sizes?: string;
}

const placeholderGradient: Record<MediaCategory, string> = {
  hotel: 'from-ink-700 via-ink-800 to-ink-950',
  suites: 'from-ink-700 via-ink-800 to-ink-950',
  restaurant: 'from-ink-800 via-ink-900 to-ink-950',
  spa: 'from-foret-700 via-foret-800 to-foret-900',
  gallery: 'from-ink-700 via-ink-800 to-ink-950',
};

/**
 * Emplacement visuel « prêt-image » du système média.
 * Rend la photographie si `image.src` est défini (avec cadrage `focalPoint`
 * et dimensions pour limiter le CLS), sinon un placeholder de marque élégant.
 */
export function Media({
  image,
  aspect = 'aspect-[4/3]',
  loading = 'lazy',
  className,
  imgClassName,
  sizes = '(max-width: 767px) 100vw, 50vw',
}: MediaProps) {
  return (
    <div className={cn('relative overflow-hidden', aspect, className)}>
      {image.src ? (
        <img
          {...responsiveImageProps(image.src, sizes)}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={loading}
          decoding="async"
          style={
            image.focalPoint
              ? {
                  objectPosition: `${image.focalPoint.x * 100}% ${image.focalPoint.y * 100}%`,
                }
              : undefined
          }
          className={cn('h-full w-full object-cover', imgClassName)}
        />
      ) : (
        <div
          role="img"
          aria-label={image.alt}
          className={cn(
            'grid h-full w-full place-items-center bg-gradient-to-br',
            placeholderGradient[image.category],
          )}
        >
          <span className="font-display text-brass-500/35 text-2xl tracking-[0.3em]">
            MSJ
          </span>
        </div>
      )}
    </div>
  );
}
