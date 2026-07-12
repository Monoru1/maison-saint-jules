import { Container } from '@/components/ui/Container';
import { Media } from '@/components/ui/Media';
import { Ornament } from '@/components/ui/Ornament';
import { Reveal } from '@/components/ui/Reveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { HOME_SECTIONS } from '@/config/routes';
import { maisonImage, motto, story } from '@/hotel/data';

/** Section éditoriale — le récit fondateur de la Maison. */
export function Signature() {
  return (
    <section
      data-scene="vestibule"
      id={HOME_SECTIONS.signature}
      className="cinematic-scene cinematic-vestibule bg-ivory py-28 md:py-40"
    >
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal>
            <SectionLabel>Acte II · Le vestibule</SectionLabel>
            <h2 className="text-ink-900 mt-5 text-4xl md:text-5xl">
              Le dehors reste
              <br />
              derrière la porte.
            </h2>
            <Ornament className="mt-7" />
            <div className="text-ink-600 mt-8 space-y-5 leading-relaxed">
              {story.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <p className="font-display text-ink-800 mt-8 text-xl italic">
              « {motto} »
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="cinematic-doorway">
              <Media image={maisonImage} aspect="aspect-[4/5]" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
