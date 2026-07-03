import { Seo } from '@/components/seo';
import { Container } from '@/components/ui/Container';
import { Ornament } from '@/components/ui/Ornament';
import { SmartLink } from '@/components/ui/SmartLink';
import { buttonClasses } from '@/components/ui/button-variants';
import { ROUTES } from '@/config/routes';
import { pageMeta } from '@/config/seo';

/** Page 404. */
export function NotFound() {
  return (
    <>
      <Seo {...pageMeta.notFound} />
      <section className="bg-ivory grid min-h-[70vh] place-items-center px-6 pt-20 text-center">
        <Container>
          <p className="font-display text-brass-500 text-7xl">404</p>
          <Ornament className="mt-6" />
          <h1 className="font-display text-ink-900 mt-6 text-3xl">
            Cette page s’est éclipsée
          </h1>
          <p className="text-ink-500 mx-auto mt-4 max-w-md text-sm leading-relaxed">
            La page que vous recherchez n’existe pas ou a été déplacée.
          </p>
          <SmartLink
            href={ROUTES.home}
            className={`${buttonClasses({ variant: 'outline', size: 'md' })} mt-10`}
          >
            Retour à la Maison
          </SmartLink>
        </Container>
      </section>
    </>
  );
}
