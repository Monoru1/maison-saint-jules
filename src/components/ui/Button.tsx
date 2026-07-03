import type { ButtonHTMLAttributes } from 'react';

import {
  buttonClasses,
  type ButtonSize,
  type ButtonVariant,
} from './button-variants';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** Bouton d'action. Pour les CTA de navigation, appliquer `buttonClasses` à un `Link`. */
export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...props}
    />
  );
}
