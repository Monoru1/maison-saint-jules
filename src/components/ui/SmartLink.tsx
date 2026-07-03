import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type SmartLinkProps = {
  /** Chemin de route interne (« /… ») ou ancre/lien externe (« #… », « https… »). */
  href: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

/**
 * Rend un `<Link>` du routeur pour les routes internes, un `<a>` sinon.
 * Évite de dupliquer ce branchement dans chaque lien.
 */
export function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  if (href.startsWith('/')) {
    return (
      <Link to={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
