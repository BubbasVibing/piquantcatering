'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RouteError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Route error:', error);
  }, [error]);

  return (
    <section
      style={{
        padding: '160px 5% 80px',
        minHeight: '60vh',
        textAlign: 'center',
        color: '#471f3a',
      }}
    >
      <h1 style={{ fontSize: '2.4rem', marginBottom: 12 }}>Something went wrong</h1>
      <p style={{ color: '#666', maxWidth: 540, margin: '0 auto 28px' }}>
        We hit an unexpected issue rendering this page. Try again, or head back to the home page.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button
          type="button"
          onClick={reset}
          style={{
            padding: '12px 28px',
            borderRadius: 30,
            background: '#471f3a',
            color: '#fff',
            fontWeight: 500,
          }}
        >
          Try again
        </button>
        <Link
          href="/"
          style={{
            padding: '12px 28px',
            borderRadius: 30,
            background: 'transparent',
            color: '#471f3a',
            border: '1px solid #471f3a',
            fontWeight: 500,
          }}
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
