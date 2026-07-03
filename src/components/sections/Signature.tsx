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
    <section id={HOME_SECTIONS.signature} className="bg-ivory py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <Reveal>
            <SectionLabel>Notre histoire</SectionLabel>
            <h2 className="text-ink-900 mt-5 text-4xl md:text-5xl">
              Un hôtel particulier.
              <br />
              Une histoire de famille.
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
            <Media image={maisonImage} aspect="aspect-[4/5]" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
