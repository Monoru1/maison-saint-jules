import { ArrowLink } from '@/components/ui/ArrowLink';
import { Container } from '@/components/ui/Container';
import { Media } from '@/components/ui/Media';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { HOME_SECTIONS, ROUTES } from '@/config/routes';
import { galleryImages } from '@/hotel/data';
import { cn } from '@/utils/cn';

/** Aperçu de la galerie — composition « bento » élégante. */
export function Gallery() {
  return (
    <section id={HOME_SECTIONS.gallery} className="bg-ivory py-24 md:py-32">
      <Container>
        <div className="flex flex-col items-center text-center">
          <SectionLabel>Galerie</SectionLabel>
          <h2 className="text-ink-900 mt-5 text-4xl md:text-5xl">
            L’esprit des lieux
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 md:[grid-auto-rows:14rem] md:grid-cols-4 md:grid-rows-2">
          {galleryImages.map((image, index) => (
            <Reveal
              key={image.id}
              delay={index * 60}
              className={cn(
                'h-full',
                image.featured && 'md:col-span-2 md:row-span-2',
              )}
            >
              <Media
                src={image.image}
                alt={image.alt}
                aspect="h-full w-full"
                tone={index % 2 === 0 ? 'ink' : 'foret'}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <ArrowLink href={ROUTES.reservation}>Vivre l’expérience</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
