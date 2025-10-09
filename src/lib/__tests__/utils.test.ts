import { describe, it, expect } from 'vitest';
import { cn, getYear, getIdFromSlug, getSlug } from '../../lib/utils';

describe('utils', () => {
  it('cn merges tailwind classes correctly (last wins)', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
    expect(cn('hidden', 'block')).toBe('block');
  });

  it('getYear parses year from ISO string', () => {
    expect(getYear('2020-01-02')).toBe(2020);
  });

  it('getSlug builds slug and getIdFromSlug extracts id', () => {
    const slug = getSlug(123, 'Hello World!');
    expect(slug.endsWith('-123')).toBe(true);
    expect(slug.startsWith('hello-world')).toBe(true);
    expect(getIdFromSlug(slug)).toBe(123);
  });
});
