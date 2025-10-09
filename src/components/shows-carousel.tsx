'use client';

import { useModalStore } from '@/stores/modal';
import { MediaType, type Show } from '@/types';
import * as React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn, getNameFromShow, getSlug } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import CustomImage from './custom-image';

interface ShowsCarouselProps {
  title: string;
  shows: Show[];
}

const ShowsCarousel = ({ title, shows }: ShowsCarouselProps) => {
  const pathname = usePathname();

  const showsRef = React.useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = React.useState(false);

  // handle scroll to left and right
  const scrollToDirection = (direction: 'left' | 'right') => {
    if (!showsRef.current) return;

    setIsScrollable(true);
    const { scrollLeft, offsetWidth } = showsRef.current;
    const handleSize = offsetWidth > 1400 ? 60 : 0.04 * offsetWidth;
    const offset =
      direction === 'left'
        ? scrollLeft - (offsetWidth - 2 * handleSize)
        : scrollLeft + (offsetWidth - 2 * handleSize);
    showsRef.current.scrollTo({ left: offset, behavior: 'smooth' });

    if (scrollLeft === 0 && direction === 'left') {
      showsRef.current.scrollTo({
        left: showsRef.current.scrollWidth,
        behavior: 'smooth',
      });
    } else if (
      scrollLeft + offsetWidth === showsRef.current.scrollWidth &&
      direction === 'right'
    ) {
      showsRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section aria-label="Carousel of shows" className="relative my-[3vw] p-0 font-terminal">
      {shows.length !== 0 && (
        <div className="space-y-4">
          {/* Terminal-style section header */}
          <div className="px-[4%] 2xl:px-[60px]">
            <div className="border-l-4 border-terminal-accent pl-4">
              <h2 className="text-terminal-accent font-bold text-lg sm:text-xl uppercase tracking-wider m-0">
                {title ?? 'CONTENT'}
              </h2>
              <div className="text-terminal-text text-xs mt-1">
                [{shows.length} items available]
              </div>
            </div>
          </div>
          
          <div className="relative w-full items-center justify-center overflow-hidden">
            {/* Terminal-style navigation buttons */}
            <Button
              aria-label="Scroll to left"
              variant="ghost"
              className={cn(
                'absolute left-0 top-0 z-10 mr-2 hidden h-full w-[4%] items-center justify-center bg-terminal-bg-dark/90 border-r border-terminal-accent py-0 text-terminal-accent hover:bg-terminal-accent hover:text-terminal-bg transition-colors duration-150 md:block 2xl:w-[60px]',
                isScrollable ? 'md:block' : 'md:hidden',
              )}
              onClick={() => scrollToDirection('left')}>
              <Icons.chevronLeft className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </Button>
            
            <div
              ref={showsRef}
              className="no-scrollbar m-0 grid auto-cols-[calc(100%/3)] grid-flow-col overflow-x-auto overflow-y-hidden px-[4%] py-0 duration-500 ease-in-out sm:auto-cols-[25%] md:touch-pan-y lg:auto-cols-[20%] xl:auto-cols-[calc(100%/6)] 2xl:px-[60px] gap-3">
              {shows.map((show) => (
                <ShowCard key={show.id} show={show} pathname={pathname} />
              ))}
            </div>
            
            <Button
              aria-label="Scroll to right"
              variant="ghost"
              className="absolute right-0 top-0 z-10 m-0 ml-2 hidden h-full w-[4%] items-center justify-center bg-terminal-bg-dark/90 border-l border-terminal-accent py-0 text-terminal-accent hover:bg-terminal-accent hover:text-terminal-bg transition-colors duration-150 md:block 2xl:w-[60px]"
              onClick={() => scrollToDirection('right')}>
              <Icons.chevronRight className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShowsCarousel;

export const ShowCard = ({ show }: { show: Show; pathname: string }) => {
  const router = useRouter();
  
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = '/images/grey-thumbnail.jpg';
  };

  const showName = getNameFromShow(show);
  const releaseYear = show.release_date ? new Date(show.release_date).getFullYear() : 
                      show.first_air_date ? new Date(show.first_air_date).getFullYear() : '';
  
  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const watchPath = `/watch/${show.media_type}/${getSlug(show.id, showName)}`;
    router.push(watchPath);
  };
  
  const handleMoreInfoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    useModalStore.setState({
      show: show,
      open: true,
      play: false,
    });
  };
  
  return (
    <div className="relative aspect-[2/3] group font-terminal">
      {/* Terminal-style container */}
      <div className="relative h-full border border-terminal-accent bg-terminal-bg-dark transition-all duration-150 hover:border-terminal-accent-bright hover:bg-terminal-bg group-hover:shadow-lg">
        {/* Hidden link for accessibility */}
        <a
          className="pointer-events-none absolute inset-0 z-10"
          aria-hidden={false}
          role="link"
          aria-label={showName}
          href={`/watch/${show.media_type}/${getSlug(show.id, showName)}`}
        />
        
        {/* Terminal header bar */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-terminal-bg-dark border-b border-terminal-accent px-2 py-1">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <span className="text-terminal-accent font-bold text-[10px] uppercase">
              {show.media_type === MediaType.TV ? 'TV' : 'MOVIE'}
            </span>
          </div>
        </div>

        {/* Movie poster */}
        <div className="relative h-full pt-8">
          <CustomImage
            src={
              show.poster_path ?? show.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${
                    show.poster_path ?? show.backdrop_path
                  }`
                : '/images/grey-thumbnail.jpg'
            }
            alt={show.title ?? show.name ?? 'poster'}
            className="h-full w-full cursor-pointer px-1 transition-all duration-150 object-cover group-hover:opacity-80"
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 100vw, 33vw"
            style={{
              objectFit: 'cover',
            }}
            onClick={handlePlayClick}
            onError={imageOnErrorHandler}
          />
          
          {/* Terminal-style overlay on hover */}
          <div className="absolute inset-0 pt-8 bg-terminal-bg-dark/90 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex flex-col justify-center items-center p-3 text-center">
            <div className="text-terminal-accent font-bold text-sm mb-2 line-clamp-2">
              {showName}
            </div>
            {releaseYear && (
              <div className="text-terminal-text text-xs mb-3">[ {releaseYear} ]</div>
            )}
            <div className="flex gap-2">
              <button 
                className="text-terminal-accent text-xs font-bold border border-terminal-accent px-2 py-1 hover:bg-terminal-accent hover:text-terminal-bg transition-colors cursor-pointer" 
                onClick={handlePlayClick}
                aria-label={`Play ${showName}`}
              >
                [ PLAY ]
              </button>
              <button 
                className="text-terminal-accent text-xs font-bold border border-terminal-accent px-2 py-1 hover:bg-terminal-accent hover:text-terminal-bg transition-colors cursor-pointer" 
                onClick={handleMoreInfoClick}
                aria-label={`More info about ${showName}`}
              >
                [ INFO ]
              </button>
            </div>
          </div>
        </div>
        
        {/* Terminal footer with title */}
        <div className="absolute bottom-0 left-0 right-0 bg-terminal-bg-dark border-t border-terminal-accent px-2 py-1">
          <div className="text-terminal-accent text-xs font-bold truncate" title={showName}>
            {showName.length > 20 ? `${showName.substring(0, 17)}...` : showName}
          </div>
          {releaseYear && (
            <div className="text-terminal-text text-[10px]">({releaseYear})</div>
          )}
        </div>
      </div>
    </div>
  );
};
