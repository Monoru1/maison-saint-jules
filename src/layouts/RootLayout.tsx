import { Outlet } from 'react-router-dom';

/**
 * Gabarit racine du site public.
 * Volontairement minimal à ce stade : la navigation et l'habillage seront
 * ajoutés lors des itérations dédiées au site public.
 */
export function RootLayout() {
  return (
    <div className="min-h-dvh">
      <Outlet />
    </div>
  );
}
