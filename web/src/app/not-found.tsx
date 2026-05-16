import Link from 'next/link';

export default function NotFound() {
  return (
    <section
      style={{
        padding: '160px 5% 80px',
        minHeight: '60vh',
        textAlign: 'center',
        color: '#471f3a',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: 12 }}>404</h1>
      <p style={{ color: '#666', maxWidth: 540, margin: '0 auto 28px' }}>
        We couldn&apos;t find the page you were looking for. It may have moved or never existed.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          padding: '12px 28px',
          borderRadius: 30,
          background: '#471f3a',
          color: '#fff',
          fontWeight: 500,
        }}
      >
        Back to home
      </Link>
    </section>
  );
}
