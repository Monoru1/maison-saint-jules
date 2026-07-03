import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Démonte le DOM rendu après chaque test pour éviter toute fuite d'état.
afterEach(() => {
  cleanup();
});
