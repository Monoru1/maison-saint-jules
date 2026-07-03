import { Outlet, useLocation } from 'react-router-dom';

import { Footer } from '@/components/navigation/Footer';
import { Navbar } from '@/components/navigation/Navbar';
import { ROUTES } from '@/config/routes';

/**
 * Gabarit du site public : lien d'évitement, navigation, contenu, pied de page.
 * La navigation est transparente au-dessus des pages à hero sombre.
 */
export function RootLayout() {
  const { pathname } = useLocation();
  const overDarkHero =
    pathname === ROUTES.home ||
    pathname === ROUTES.reservation ||
    pathname.startsWith(ROUTES.suites);

  return (
    <>
      <a
        href="#contenu"
        className="focus:bg-ink-900 focus:text-ivory sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:text-sm"
      >
        Aller au contenu
      </a>
      <Navbar transparentAtTop={overDarkHero} />
      <main id="contenu">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
