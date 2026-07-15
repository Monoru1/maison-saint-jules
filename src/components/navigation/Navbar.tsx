import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { buttonClasses } from '@/components/ui';
import { Logo } from '@/components/ui/Logo';
import { ROUTES } from '@/config/routes';
import { primaryNav } from '@/hotel/data';
import { cn } from '@/utils/cn';

/**
 * Barre de navigation du site public.
 * Transparente au-dessus d'un hero sombre, elle devient opaque au défilement.
 * Sur mobile, un menu plein écran accessible (Échap, verrou de défilement,
 * focus) remplace la navigation horizontale.
 */
export function Navbar({
  transparentAtTop = false,
}: {
  transparentAtTop?: boolean;
}) {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 24,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    closeButtonRef.current?.focus();

    const body = document.body;
    const lockedPath = window.location.pathname;
    const scrollY = window.scrollY;
    const previousBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      right: body.style.right,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    Object.assign(body.style, {
      position: 'fixed',
      top: `-${scrollY}px`,
      right: '0',
      left: '0',
      width: '100%',
      overflow: 'hidden',
    });

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      Object.assign(body.style, previousBodyStyles);
      if (window.location.pathname === lockedPath) window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  const light = transparentAtTop && !scrolled;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        light
          ? 'bg-transparent'
          : 'border-ink-100 bg-ivory/90 border-b backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:px-10">
        <Link
          to={ROUTES.home}
          aria-label="Maison Saint-Jules — accueil"
          className="shrink-0"
        >
          <Logo tone={light ? 'light' : 'dark'} />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    'font-sans text-xs tracking-[0.18em] uppercase transition-colors',
                    light
                      ? 'text-ivory/80 hover:text-ivory'
                      : 'text-ink-600 hover:text-brass-600',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to={ROUTES.reservation}
            className={cn(
              buttonClasses({ variant: 'primary', size: 'sm' }),
              'hidden sm:inline-flex',
            )}
          >
            Réserver
          </Link>
          <button
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={() => setMenuOpen(true)}
            className={cn('lg:hidden', light ? 'text-ivory' : 'text-ink-800')}
          >
            <Menu className="size-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          className="bg-ink-950 fixed inset-0 z-50 flex min-h-0 flex-col overflow-hidden lg:hidden"
        >
          <div className="flex h-20 shrink-0 items-center justify-between px-6">
            <Logo tone="light" />
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Fermer le menu"
              onClick={() => setMenuOpen(false)}
              className="text-ivory"
            >
              <X className="size-6" strokeWidth={1.5} />
            </button>
          </div>

          <nav
            aria-label="Navigation principale"
            className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6"
          >
            <div className="my-auto py-8">
              <ul className="space-y-6">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-ivory hover:text-brass-300 text-3xl transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <Link
                to={ROUTES.reservation}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  buttonClasses({ variant: 'primary', size: 'md' }),
                  'mt-12 w-full',
                )}
              >
                Réserver un séjour
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
