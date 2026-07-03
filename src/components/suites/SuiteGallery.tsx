import { Media } from '@/components/ui/Media';
import { Reveal } from '@/components/ui/Reveal';
import type { HotelImage } from '@/hotel/types';
import { cn } from '@/utils/cn';

/** Galerie d'une suite (page détail) — première image mise en avant. */
export function SuiteGallery({ images }: { images: readonly HotelImage[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {images.map((image, index) => (
        <Reveal
          key={index}
          delay={index * 60}
          className={cn('overflow-hidden', index === 0 && 'col-span-2')}
        >
          <Media image={image} aspect="aspect-[4/3]" />
        </Reveal>
      ))}
    </div>
  );
}
