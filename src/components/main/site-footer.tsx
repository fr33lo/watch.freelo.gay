import React from "react";

const SiteFooter = () => {
  return (
    <footer aria-label="Footer" className="w-full bg-terminal-bg-dark font-terminal">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center text-sm font-terminal">
          <div className="mb-4">
            <span className="text-terminal-accent">BUILT BY:</span>{' '}
            <a
              href="https://freelo.gay"
              target="_blank"
              rel="noreferrer"
              className="text-terminal-accent hover:text-terminal-accent-bright transition-colors duration-150"
            >
              freelo
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-xs">
            <div><span className="text-terminal-accent">VERSION:</span> 2.0.1</div>
            <div><span className="text-terminal-accent">BUILD:</span> {new Date().getFullYear()}</div>
            <div><span className="text-terminal-accent">LICENSE:</span> MIT</div>
            <div><span className="text-terminal-accent">RUNTIME:</span> Next.js</div>
          </div>
          
          <div className="mt-6 text-terminal-text text-xs">
            © 2023-{new Date().getFullYear()} freelo |{' '}
            best viewed with a retro terminal emulator |{' '}
            no cookies tracked |{' '}
            powered by caffeine and nostalgia
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
