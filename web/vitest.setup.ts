import '@testing-library/jest-dom/vitest';

if (typeof globalThis.IntersectionObserver === 'undefined') {
  class StubIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
    root = null;
    rootMargin = '';
    thresholds = [];
  }

  (
    globalThis as unknown as { IntersectionObserver: typeof IntersectionObserver }
  ).IntersectionObserver = StubIntersectionObserver as unknown as typeof IntersectionObserver;
}
