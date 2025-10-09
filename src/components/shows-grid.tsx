'use client';

import { useModalStore } from '@/stores/modal';
import type { Show } from '@/types';
import ShowModal from './shows-modal';
import { ShowCard } from './shows-carousel';
import { usePathname } from 'next/navigation';
import { useSearchStore } from '@/stores/search';
import ShowsSkeleton from './shows-skeleton';
import { cn } from '@/lib/utils';

interface SearchedShowsProps {
  shows: Show[];
  query?: string;
}

const ShowsGrid = ({ shows, query }: SearchedShowsProps) => {
  const pathname = usePathname();
  // modal store
  const modalStore = useModalStore();
  const searchStore = useSearchStore();

  return (
    <section aria-label="Grid of shows" className="w-full max-w-none bg-terminal-bg font-terminal">
      {modalStore.open && <ShowModal />}
      <div className="main-view mt-4 min-h-[800px] pt-[5%] px-4" id="main-view">
        {query && searchStore.loading ? (
          <ShowsSkeleton classname="pl-0" />
        ) : query && !shows?.length ? (
          // Terminal-style no results
          <div className="text-center max-w-2xl mx-auto">
            <div className="border border-terminal-accent bg-terminal-bg-dark p-6">
              {/* Terminal header */}
              <div className="border-b border-terminal-accent pb-4 mb-4">
                <pre className="text-terminal-accent text-sm">
{`┌─────────────────────────────────────────────────────┐
│                 SEARCH ERROR 404                    │
└─────────────────────────────────────────────────────┘`}
                </pre>
              </div>
              
              <div className="text-left">
                <p className="text-terminal-text mb-4">
                  <span className="text-terminal-accent font-bold">ERROR:</span> No results found for query: 
                  <span className="text-terminal-accent-bright">&quot;{query}&quot;</span>
                </p>
                
                <div className="mb-4">
                  <div className="text-terminal-accent font-bold mb-2">SUGGESTED ACTIONS:</div>
                  <ul className="text-terminal-text text-sm space-y-1">
                    <li><span className="text-terminal-accent">{'>'}</span> Try different keywords</li>
                    <li><span className="text-terminal-accent">{'>'}</span> Search for movie/TV show titles</li>
                    <li><span className="text-terminal-accent">{'>'}</span> Try actor or director names</li>
                    <li><span className="text-terminal-accent">{'>'}</span> Search by genre (comedy, drama, etc.)</li>
                  </ul>
                </div>
                
                <div className="text-xs text-terminal-text opacity-75">
                  TIP: Use broader search terms for better results
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Terminal-style results header */}
            {query && (
              <div className="mb-6">
                <div className="border-l-4 border-terminal-accent pl-4">
                  <h2 className="text-terminal-accent font-bold text-xl uppercase tracking-wider">
                    SEARCH RESULTS
                  </h2>
                  <div className="text-terminal-text text-sm mt-1">
                    Found {shows.length} results for: <span className="text-terminal-accent-bright font-bold">&quot;{query}&quot;</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Terminal-style grid */}
            <div
              className={cn(
                'grid gap-4 xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
                query && 'max-sm:grid-cols-3 max-[375px]:grid-cols-2',
              )}>
              {shows.map((show: Show) => (
                <ShowCard key={show.id} show={show} pathname={pathname} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShowsGrid;
