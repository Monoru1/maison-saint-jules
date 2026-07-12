import { Container } from '@/components/ui/Container';
import { Ornament } from '@/components/ui/Ornament';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { HOME_SECTIONS } from '@/config/routes';
import { spaIntroduction, spaTreatments } from '@/hotel/data';

/** Spa & bien-être — « Un écrin de sérénité ». */
export function Spa() {
  return (
    <section
      id={HOME_SECTIONS.spa}
      data-scene="baths"
      className="cinematic-scene cinematic-baths bg-foret-800 text-ivory py-28 md:py-40"
    >
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel tone="light">Acte IV · Les bains</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl">Un écrin de sérénité</h2>
          <Ornament tone="light" className="mt-6" />
          <p className="text-ivory/70 mt-7 leading-relaxed">
            {spaIntroduction}
          </p>
        </Reveal>

        <div className="border-ivory/10 mt-16 grid gap-px overflow-hidden border md:grid-cols-3">
          {spaTreatments.map((treatment, index) => (
            <Reveal
              as="article"
              key={treatment.id}
              delay={index * 100}
              className="bg-foret-800 px-8 py-10"
            >
              <p className="text-brass-300 font-sans text-[0.7rem] tracking-[0.25em] uppercase">
                {treatment.duration} minutes
              </p>
              <h3 className="font-display mt-4 text-2xl">{treatment.name}</h3>
              <p className="text-ivory/65 mt-4 text-sm leading-relaxed">
                {treatment.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
