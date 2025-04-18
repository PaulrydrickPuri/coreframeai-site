
'use client';

const StaticLanding = () => {
  return (
    <>
      <style jsx global>{`
        body {
          background: #0e0e0e;
          color: #f1f1f1;
          font-family: system-ui, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
          margin: 0;
          padding: 0 2rem;
          overflow-x: hidden;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }
        p {
          max-width: 600px;
          font-size: 1.25rem;
          color: #ccc;
        }
        a {
          margin-top: 2rem;
          color: #7cc0ff;
        }
      `}</style>

      <main>
        <h1>CoreframeAI™</h1>
        <p>Coming soon: Build agents that think in loops.</p>
        <a href="https://linktr.ee/chevngko" target="_blank" rel="noopener noreferrer">
          Visit My Linktree
        </a>
      </main>
    </>
  );
};

export default StaticLanding;
