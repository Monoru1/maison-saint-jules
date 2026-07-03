import type { ReactNode } from 'react';

import { Logo } from '@/components/ui/Logo';
import { SmartLink } from '@/components/ui/SmartLink';
import { Ornament } from '@/components/ui/Ornament';
import { footerNav, hotel, legalNav, motto, socials } from '@/hotel/data';

const currentYear = new Date().getFullYear();

const footerLink = 'text-ink-400 transition-colors hover:text-brass-400';

const signature = [
  hotel.name,
  hotel.location,
  'Hôtel particulier',
  'Expérience intime',
  'Excellence',
];

/** Pied de page premium : identité, navigation, contact, réseaux, mentions. */
export function Footer() {
  const telHref = `tel:${hotel.phone.replace(/\s/g, '')}`;
  const mailHref = `mailto:${hotel.email}`;

  return (
    <footer className="bg-ink-950 text-ink-300">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="text-ink-400 mt-6 max-w-xs text-sm leading-relaxed">
              {motto}
            </p>
            <Ornament tone="light" className="mt-6" />
          </div>

          <FooterColumn title="La Maison">
            {footerNav.map((item) => (
              <li key={item.label}>
                <SmartLink href={item.href} className={footerLink}>
                  {item.label}
                </SmartLink>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            <li className="text-ink-400">
              {hotel.address.street}
              <br />
              {hotel.address.postalCode} {hotel.address.city}
            </li>
            <li>
              <a href={telHref} className={footerLink}>
                {hotel.phone}
              </a>
            </li>
            <li>
              <a href={mailHref} className={`${footerLink} break-all`}>
                {hotel.email}
              </a>
            </li>
          </FooterColumn>

          <FooterColumn title="Suivez-nous">
            {socials.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={footerLink}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </FooterColumn>
        </div>

        <div className="border-ink-800 mt-16 border-t pt-8">
          <ul className="text-ink-500 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.7rem] tracking-[0.25em] uppercase">
            {signature.map((word, index) => (
              <li key={word} className="flex items-center gap-4">
                {word}
                {index < signature.length - 1 ? (
                  <span className="text-brass-600" aria-hidden="true">
                    ·
                  </span>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="text-ink-500 mt-8 flex flex-col items-center justify-between gap-4 text-xs sm:flex-row">
            <p>
              © {currentYear} {hotel.name}. Tous droits réservés.
            </p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
              {legalNav.map((item) => (
                <li key={item.label}>
                  <SmartLink
                    href={item.href}
                    className="hover:text-ink-300 transition-colors"
                  >
                    {item.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="text-brass-500 font-sans text-[0.7rem] tracking-[0.3em] uppercase">
        {title}
      </h2>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}
