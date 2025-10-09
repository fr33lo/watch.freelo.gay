'use client';

import React from 'react';
import { type Show, type NavItem } from '@/types';
import Link from 'next/link';
import {
  cn,
  getSearchValue,
  handleDefaultSearchBtn,
  handleDefaultSearchInp,
} from '@/lib/utils';
import { siteConfig } from '@/configs/site';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchStore } from '@/stores/search';
import { DebouncedInput } from '@/components/debounced-input';
import MovieService from '@/services/MovieService';

interface MainNavProps {
  items?: NavItem[];
}

interface SearchResult {
  results: Show[];
}

export function MainNav({ items }: MainNavProps) {
  const path = usePathname();
  const router = useRouter();
  // search store
  const searchStore = useSearchStore();
  const [, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handlePopstateEvent = React.useCallback(() => {
    const pathname = window.location.pathname;
    const search: string = getSearchValue('q');

    if (!search?.length || !pathname.includes('/search')) {
      searchStore.reset();
      searchStore.setOpen(false);
    } else if (search?.length) {
      searchStore.setOpen(true);
      searchStore.setLoading(true);
      searchStore.setQuery(search);
      setTimeout(() => {
        handleDefaultSearchBtn();
      }, 10);
      setTimeout(() => {
        handleDefaultSearchInp();
      }, 20);
      MovieService.searchMovies(search)
        .then((response: SearchResult) => {
          void searchStore.setShows(response.results);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => searchStore.setLoading(false));
    }
  }, [searchStore]);

  React.useEffect(() => {
    window.addEventListener('popstate', handlePopstateEvent, false);
    return () => {
      window.removeEventListener('popstate', handlePopstateEvent, false);
    };
  }, [handlePopstateEvent]);

  async function searchShowsByQuery(value: string) {
    if (!value?.trim()?.length) {
      if (path === '/search') {
        router.push('/home');
      } else {
        window.history.pushState(null, '', path);
      }
      return;
    }

    if (getSearchValue('q')?.trim()?.length) {
      window.history.replaceState(null, '', `search?q=${value}`);
    } else {
      window.history.pushState(null, '', `search?q=${value}`);
    }

    searchStore.setQuery(value);
    searchStore.setLoading(true);
    const shows = await MovieService.searchMovies(value);
    searchStore.setLoading(false);
    void searchStore.setShows(shows.results);

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // change background color on scroll
  React.useEffect(() => {
    const changeBgColor = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', changeBgColor);
    return () => window.removeEventListener('scroll', changeBgColor);
  }, []);

  const handleChangeStatusOpen = (value: boolean): void => {
    searchStore.setOpen(value);
    if (!value) searchStore.reset();
  };

  return (
    <nav className="bg-terminal-bg-dark border-t border-b border-dashed border-terminal-accent font-terminal sticky top-0 z-50 py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Site Logo/Name */}
        <Link
          href="/"
          className="text-terminal-accent font-bold text-lg md:text-xl transition-colors duration-150 hover:text-terminal-accent-bright"
          onClick={() => handleChangeStatusOpen(false)}>
          {siteConfig.name}
        </Link>
        
        {/* Main Navigation - Desktop */}
        {items?.length ? (
          <nav className="hidden md:flex items-center gap-6">
            {items?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      'text-terminal-accent font-bold py-1 px-3 transition-colors duration-150 text-sm uppercase tracking-wider border',
                      path === item.href 
                        ? 'bg-terminal-accent text-terminal-bg border-terminal-accent'
                        : 'border-terminal-accent hover:text-terminal-accent-bright hover:border-terminal-accent-bright',
                      item.disabled && 'cursor-not-allowed opacity-50',
                    )}
                    onClick={() => handleChangeStatusOpen(false)}>
                    {item.title}
                  </Link>
                ),
            )}
          </nav>
        ) : null}
        
        {/* Mobile Menu Button + Search */}
        <div className="flex items-center gap-4">
          <DebouncedInput
            id="search-input"
            open={searchStore.isOpen}
            value={searchStore.query}
            onChange={searchShowsByQuery}
            onChangeStatusOpen={handleChangeStatusOpen}
            containerClassName={cn(path === '/' ? 'hidden' : 'flex')}
          />
          
          <div className="md:hidden">
            <button
              className="text-terminal-accent font-bold px-3 py-1 border border-terminal-accent hover:bg-terminal-accent hover:text-terminal-bg transition-colors duration-150 text-sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              [ MENU ]
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 border-t border-dashed border-terminal-accent pt-4">
          {items?.length ? (
            <div className="flex flex-col gap-2">
              {items?.map(
                (item, index) =>
                  item.href && (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        'text-terminal-accent font-bold py-2 px-4 border border-terminal-accent text-center transition-colors duration-150 text-sm uppercase tracking-wider',
                        path === item.href 
                          ? 'bg-terminal-accent text-terminal-bg'
                          : 'hover:text-terminal-accent-bright hover:border-terminal-accent-bright',
                        item.disabled && 'cursor-not-allowed opacity-50',
                      )}
                      onClick={() => {
                        handleChangeStatusOpen(false);
                        setMobileMenuOpen(false);
                      }}>
                      {item.title}
                    </Link>
                  ),
              )}
            </div>
          ) : null}
        </div>
      )}
    </nav>
  );
}

export default MainNav;
