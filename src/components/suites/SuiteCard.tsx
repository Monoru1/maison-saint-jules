import { ArrowLink } from '@/components/ui/ArrowLink';
import { Media } from '@/components/ui/Media';
import { Reveal } from '@/components/ui/Reveal';
import { SmartLink } from '@/components/ui/SmartLink';
import { buttonClasses } from '@/components/ui/button-variants';
import { ROUTES } from '@/config/routes';
import { suiteKindLabels } from '@/hotel/data';
import type { Suite } from '@/hotel/types';
import { formatPrice } from '@/utils/format';

interface SuiteCardProps {
  suite: Suite;
  delay?: number;
  /** Affiche le CTA « Réserver » en plus du lien de détail (page liste). */
  showReserve?: boolean;
}

/** Carte de suite réutilisable (aperçu d'accueil et page `/suites`). */
export function SuiteCard({
  suite,
  delay = 0,
  showReserve = false,
}: SuiteCardProps) {
  const detailHref = ROUTES.suiteDetail(suite.slug);

  return (
    <Reveal as="article" delay={delay} className="group flex flex-col">
      <SmartLink
        href={detailHref}
        aria-label={`Découvrir ${suite.name}`}
        className="block overflow-hidden"
      >
        <Media
          image={suite.cover}
          aspect="aspect-[4/5]"
          imgClassName="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </SmartLink>

      <div className="mt-6 flex flex-1 flex-col">
        <div className="text-ink-400 flex items-center gap-3 font-sans text-[0.7rem] tracking-[0.2em] uppercase">
          <span>{suiteKindLabels[suite.kind]}</span>
          <span aria-hidden="true">·</span>
          <span>{suite.area} m²</span>
          <span aria-hidden="true">·</span>
          <span>
            {suite.guests} {suite.guests > 1 ? 'personnes' : 'personne'}
          </span>
        </div>

        <h3 className="font-display text-ink-900 mt-3 text-2xl">
          <SmartLink
            href={detailHref}
            className="hover:text-brass-600 transition-colors"
          >
            {suite.name}
          </SmartLink>
        </h3>
        <p className="text-ink-500 mt-2 text-sm italic">{suite.tagline}</p>
        <p className="text-ink-400 mt-4 font-sans text-xs tracking-[0.15em] uppercase">
          {suite.services.slice(0, 3).join(' · ')}
        </p>

        <div className="border-ink-200/70 mt-6 flex items-center justify-between border-t pt-5">
          <span className="text-ink-800 font-sans text-sm">
            À partir de{' '}
            <span className="text-brass-600 font-medium">
              {formatPrice(suite.priceFrom)}
            </span>
          </span>
          <div className="flex items-center gap-4">
            {showReserve ? (
              <SmartLink
                href={ROUTES.reservation}
                className={buttonClasses({ variant: 'outline', size: 'sm' })}
              >
                Réserver
              </SmartLink>
            ) : null}
            <ArrowLink href={detailHref}>Découvrir</ArrowLink>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
