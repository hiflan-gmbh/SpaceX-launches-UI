'use client';

export default function Error({ error, reset }) {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}
      >
        Try Again
      </button>
    </main>
  );
}
