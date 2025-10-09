import { expect, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import type * as ReactType from 'react';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers as unknown as Parameters<typeof expect.extend>[0]);

// Provide a stable stub for React's server cache in test env
vi.mock('react', async () => {
  const actual = await vi.importActual<typeof ReactType>('react');
  return {
    ...actual,
    cache: <T extends (...args: unknown[]) => unknown>(fn: T) => fn,
  };
});

// Provide minimal env vars expected by src/env.mjs during tests
process.env.NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://example.com';
process.env.NEXT_PUBLIC_TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN ?? 'test-token';
process.env.NEXT_PUBLIC_SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Example Site';
