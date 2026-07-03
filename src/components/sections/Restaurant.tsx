import { ArrowLink } from '@/components/ui/ArrowLink';
import { Container } from '@/components/ui/Container';
import { Media } from '@/components/ui/Media';
import { Ornament } from '@/components/ui/Ornament';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { HOME_SECTIONS, ROUTES } from '@/config/routes';
import { restaurant } from '@/hotel/data';

/** Le restaurant gastronomique — section immersive sombre. */
export function Restaurant() {
  return (
    <section
      id={HOME_SECTIONS.restaurant}
      className="bg-ink-950 text-ivory py-24 md:py-32"
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal>
            <Media image={restaurant.image} aspect="aspect-[4/3]" />
          </Reveal>

          <Reveal delay={120}>
            <SectionLabel tone="light">Le restaurant</SectionLabel>
            <h2 className="mt-5 text-4xl md:text-5xl">{restaurant.name}</h2>
            <p className="text-brass-300 mt-3 font-sans text-sm tracking-[0.2em] uppercase">
              {restaurant.cuisine}
            </p>
            <Ornament tone="light" className="mt-7" />
            <p className="text-ivory/70 mt-8 leading-relaxed">
              {restaurant.description}
            </p>
            <p className="text-ivory/90 font-display mt-6 text-lg italic">
              {restaurant.chef.name}
              <span className="text-ivory/50 not-italic">
                {' '}
                — {restaurant.chef.title}
              </span>
            </p>
            <ArrowLink href={ROUTES.reservation} tone="light" className="mt-8">
              Réserver une table
            </ArrowLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
