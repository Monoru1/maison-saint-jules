import { Car, Landmark, ShoppingBag, Sparkles } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { HOME_SECTIONS } from '@/config/routes';
import { experiences } from '@/hotel/data';
import type { ExperienceIcon } from '@/hotel/types';

const iconByKey: Record<ExperienceIcon, typeof Sparkles> = {
  concierge: Sparkles,
  chauffeur: Car,
  visite: Landmark,
  shopping: ShoppingBag,
};

/** Expériences parisiennes — services signature de la Maison. */
export function Experiences() {
  return (
    <section id={HOME_SECTIONS.experiences} className="bg-ivory py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Expériences</SectionLabel>
          <h2 className="text-ink-900 mt-5 text-4xl md:text-5xl">
            Paris, comme un privilège
          </h2>
          <p className="text-ink-500 mt-6 leading-relaxed">
            Une conciergerie qui ouvre les portes les plus confidentielles de la
            capitale.
          </p>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((experience, index) => {
            const Icon = iconByKey[experience.icon];
            return (
              <Reveal
                as="article"
                key={experience.id}
                delay={index * 90}
                className="text-center"
              >
                <span className="border-brass-500/40 text-brass-600 inline-flex size-14 items-center justify-center rounded-full border">
                  <Icon
                    className="size-6"
                    strokeWidth={1.25}
                    aria-hidden="true"
                  />
                </span>
                <h3 className="font-display text-ink-900 mt-6 text-xl">
                  {experience.title}
                </h3>
                <p className="text-ink-500 mt-3 text-sm leading-relaxed">
                  {experience.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
