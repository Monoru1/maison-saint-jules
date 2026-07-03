import { AppwriteException } from 'appwrite';
import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { APP } from '@/config';
import { ROUTES } from '@/config/routes';
import { useAuth } from '@/hooks/useAuth';

/**
 * Page de connexion à l'espace d'administration.
 * Authentification e-mail / mot de passe via Appwrite Auth.
 */
export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      void navigate(ROUTES.admin.root, { replace: true });
    } catch (err) {
      const message =
        err instanceof AppwriteException
          ? err.message
          : 'Connexion impossible. Veuillez réessayer.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleSubmit();
  };

  const inputClass =
    'w-full rounded-sm border border-ink-700 bg-ink-800 px-3 py-2 text-ivory ' +
    'placeholder:text-ink-400 focus:border-brass-400 focus:outline-none';

  return (
    <div className="bg-ink-900 grid min-h-dvh place-items-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-brass-400 text-center text-xs tracking-[0.3em] uppercase">
          Administration
        </p>
        <h1 className="font-display text-ivory mt-2 text-center text-3xl">
          {APP.name}
        </h1>

        <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-ink-200 block text-xs">
              Adresse e-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-ink-200 block text-xs">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
            />
          </div>

          {error ? (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="bg-brass-500 hover:bg-brass-400 text-ink-900 w-full rounded-sm px-3 py-2 font-medium transition-colors disabled:opacity-60"
          >
            {submitting ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
