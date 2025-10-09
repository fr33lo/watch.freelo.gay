'use client';
import React from 'react';
import Loading from '../ui/loading';
import { useRouter } from 'next/navigation';
import { MediaType, type Show } from '@/types';
import MovieService from '@/services/MovieService';
import { type AxiosResponse } from 'axios';
import { getEmbedUrl, DEFAULT_PROVIDER, type Provider, type ProviderOptions } from '@/lib/providers';
import { env } from '@/env.mjs';
import { Icons } from '@/components/icons';

interface EmbedPlayerProps {
  url: string;
  movieId?: string; // for tv/anime routes, contains prefix like t-123
  mediaType?: MediaType;
  malId?: number | string; // for vidlink anime
  tmdbId?: number | string; // general id for building URLs
}

function EmbedPlayer(props: EmbedPlayerProps) {
  const router = useRouter();


  // Initialize provider order from env/localStorage
  React.useEffect(() => {
    const list = (env.NEXT_PUBLIC_PROVIDERS ?? 'vidlink,vidking,vidsrc,vidplay')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean) as Provider[];
    const stored = (typeof window !== 'undefined' && localStorage.getItem('provider')) as Provider | null;
    setProviderOrder(list);
    if (stored) {
      setSelectedProvider(stored);
      setExplicitSelection(true);
    }
  }, []);

  // For MOVIE: set URL using provider selection and fetch imdbId if needed
  React.useEffect(() => {
    if (props.mediaType === MediaType.MOVIE) {
      void (async () => {
        try {
          // fetch imdb_id if needed for providers like vidplay
          if (props.tmdbId) {
            const res: AxiosResponse<Show> = await MovieService.findMovie(Number(props.tmdbId));
            if (res?.data?.imdb_id) setImdbId(res.data.imdb_id);
          }
        } catch {}
        buildAndSetUrl();
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.mediaType, props.tmdbId]);

  React.useEffect(() => {
    if (!props.movieId || (props.mediaType !== MediaType.ANIME && props.mediaType !== MediaType.TV)) {
      return;
    }

    void handleSeries(props.movieId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.movieId, props.mediaType]);

  // For TV: fetch imdb external id for fallback providers
  React.useEffect(() => {
    if (props.mediaType === MediaType.TV && props.tmdbId) {
      void (async () => {
        try {
          const { data } = await MovieService.getTvExternalIds(Number(props.tmdbId));
          if (data?.imdb_id) setImdbId(data.imdb_id);
        } catch {}
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.mediaType, props.tmdbId]);

  const loadingRef = React.useRef<HTMLDivElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const [providerOrder, setProviderOrder] = React.useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = React.useState<Provider>(DEFAULT_PROVIDER);
  const [explicitSelection, setExplicitSelection] = React.useState<boolean>(false);
  const [currentSeason, setCurrentSeason] = React.useState<number>(1);
  const [currentEpisode, setCurrentEpisode] = React.useState<number>(1);
  const [imdbId, setImdbId] = React.useState<string | undefined>(undefined);
  // Enable all features by default with site-matching colors
  const [providerOpts] = React.useState<ProviderOptions>({
    // VidLink options - using site's golden theme
    primaryColor: 'D4AF37', // Golden yellow to match site primary
    secondaryColor: '073D2D', // Dark green to match site background
    iconColor: 'D4AF37', // Golden yellow for icons
    autoplay: true,
    title: true,
    poster: true,
    nextbutton: true,
    icons: 'default',
    player: 'default',
    variant: 'sub',
    fallback: true,
    startAt: 0,
    // VidKing options - also using golden theme
    color: 'D4AF37', // Golden instead of red
    progress: 0,
    nextEpisode: true,
    episodeSelector: true
  });
  const fallbackTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const [toast, setToast] = React.useState<string | null>(null);
  const toastTimerRef = React.useRef<NodeJS.Timeout | null>(null);


  const handleSeries = async (movieId: string) => {
    try {
      const id = Number(movieId.replace('t-', ''));
      
      // Validate the ID
      if (isNaN(id) || id <= 0) {
        console.warn('Invalid TV series ID:', movieId);
        notify('Invalid TV series ID');
        return;
      }

      // Just validate that the TV series exists, then build URL
      // Providers have their own episode selectors, so we don't need to load episodes
      const response: AxiosResponse<Show> = await MovieService.findTvSeries(id);
      const { data } = response;
      
      if (!data) {
        notify('TV series not found');
        return;
      }
      
      // Set default to season 1, episode 1 and let the provider handle the rest
      setCurrentSeason(1);
      setCurrentEpisode(1);
      buildAndSetUrl({ tmdbIdOverride: id });
      
    } catch (error) {
      console.error('Error in handleSeries:', error);
      if (error instanceof Error && error.message.includes('404')) {
        notify('TV series not found. It may have been removed or the ID is invalid.');
      } else {
        notify('Failed to load TV series information');
      }
    }
  };

  const cancelFallbackTimer = () => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  };

  const handleSetIframeUrl = (url: string, withFallback = true): void => {
    if (!iframeRef.current) {
      return;
    }
    // show loading while navigating
    if (loadingRef.current) loadingRef.current.style.display = 'flex';
    iframeRef.current.style.opacity = '0';
    iframeRef.current.src = url;
    const { current } = iframeRef;
    const iframe: HTMLIFrameElement | null = current;
    iframe.addEventListener('load', handleIframeLoaded);

    // fallback if iframe doesn't load within timeout
    cancelFallbackTimer();
    if (withFallback && !explicitSelection) {
      fallbackTimerRef.current = setTimeout(() => {
        tryNextProvider();
      }, 8000);
    }
  };

  const handleIframeLoaded = () => {
    cancelFallbackTimer();
    if (!iframeRef.current) {
      return;
    }
    const iframe: HTMLIFrameElement = iframeRef.current;
    if (iframe) {
      iframe.style.opacity = '1';
      iframe.removeEventListener('load', handleIframeLoaded);
      if (loadingRef.current) loadingRef.current.style.display = 'none';
    }
  };

  const supportedProviders = React.useMemo(() => {
    const list = providerOrder.length
      ? providerOrder
      : (['vidlink', 'vidking', 'vidsrc', 'vidplay'] as Provider[]);
    
    const filtered = list.filter((p) => {
      if (props.mediaType === MediaType.ANIME) {
        if (p === 'vidlink') return !!props.malId;
        if (p === 'vidsrc') return true;
        return false; // others do not support anime
      }
      if (props.mediaType === MediaType.TV) {
        // vidplay requires imdbId for TV
        if (p === 'vidplay') return !!imdbId;
        // All others support TV shows
        return ['vidlink', 'vidking', 'vidsrc'].includes(p);
      }
      // movie - check vidplay requires imdbId for movies too
      if (p === 'vidplay') return !!imdbId;
      return ['vidlink', 'vidking', 'vidsrc'].includes(p);
    });
    
    return filtered;
  }, [providerOrder, props.mediaType, props.malId, imdbId]);

  // Ensure selected provider is supported, fallback to first available if not
  React.useEffect(() => {
    if (supportedProviders.length > 0 && !supportedProviders.includes(selectedProvider)) {
      setSelectedProvider(supportedProviders[0]);
      // Don't set explicit selection here to allow automatic fallback
    }
  }, [supportedProviders, selectedProvider, props.mediaType]);

  const notify = (msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 3500);
  };

  const tryNextProvider = () => {
    const idx = supportedProviders.indexOf(selectedProvider);
    const next = supportedProviders[idx + 1];
    if (next) {
      notify(`Provider '${selectedProvider}' failed to load. Switching to '${next}'.`);
      setSelectedProvider(next);
      buildAndSetUrl();
    } else {
      notify('No more providers available for fallback.');
    }
  };

  const buildAndSetUrl = (opts?: { tmdbIdOverride?: number | string }) => {
    const id = opts?.tmdbIdOverride ?? props.tmdbId;
    try {
      let url = '';
      if (props.mediaType === MediaType.ANIME) {
        if (selectedProvider === 'vidlink' && props.malId) {
          url = getEmbedUrl({ provider: 'vidlink', mediaType: 'anime', malId: props.malId, episode: currentEpisode, options: { ...providerOpts, variant: providerOpts.variant ?? 'sub', fallback: providerOpts.fallback ?? true } });
        } else {
          url = getEmbedUrl({ provider: 'vidsrc', mediaType: 'anime', tmdbId: id, episode: currentEpisode, options: { variant: 'sub' } });
        }
      } else if (props.mediaType === MediaType.TV) {
        if (selectedProvider === 'vidplay') {
          if (imdbId) url = getEmbedUrl({ provider: 'vidplay', mediaType: 'tv', imdbId, season: currentSeason, episode: currentEpisode, options: providerOpts });
          else throw new Error('IMDB id required for vidplay tv');
        } else if (selectedProvider === 'vidking') {
          url = getEmbedUrl({ provider: 'vidking', mediaType: 'tv', tmdbId: id, season: currentSeason, episode: currentEpisode, options: providerOpts });
        } else if (selectedProvider === 'vidlink') {
          url = getEmbedUrl({ provider: 'vidlink', mediaType: 'tv', tmdbId: id, season: currentSeason, episode: currentEpisode, options: providerOpts });
        } else {
          url = getEmbedUrl({ provider: 'vidsrc', mediaType: 'tv', tmdbId: id, season: currentSeason, episode: currentEpisode });
        }
      } else {
        // MOVIE
        if (selectedProvider === 'vidplay') {
          if (imdbId) url = getEmbedUrl({ provider: 'vidplay', mediaType: 'movie', imdbId, options: providerOpts });
          else throw new Error('IMDB id required for vidplay movie');
        } else if (selectedProvider === 'vidking') {
          url = getEmbedUrl({ provider: 'vidking', mediaType: 'movie', tmdbId: id, options: providerOpts });
        } else if (selectedProvider === 'vidlink') {
          url = getEmbedUrl({ provider: 'vidlink', mediaType: 'movie', tmdbId: id, options: providerOpts });
        } else {
          url = getEmbedUrl({ provider: 'vidsrc', mediaType: 'movie', tmdbId: id });
        }
      }
      handleSetIframeUrl(url);
    } catch (e) {
      if (explicitSelection) notify(`Provider '${selectedProvider}' cannot be used for this title.`);
      // if selected provider cannot build URL, try next automatically
      if (!explicitSelection) tryNextProvider();
    }
  };


  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#000',
      }}>
      <div className="header-top absolute left-0 right-0 top-8 z-[2] flex h-fit w-full items-center justify-between gap-x-5 px-4 md:h-20 md:gap-x-8 md:px-10 lg:h-24">
        <div className="flex items-center gap-x-5 md:gap-x-8">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md bg-black/20 text-white transition-all hover:bg-black/40 hover:scale-105 backdrop-blur-sm"
            onClick={() => {
              // Check if we have a referrer or if we're in a new browser session
              const hasHistory = window.history.length > 1;
              const hasReferrer = document?.referrer && document.referrer !== window.location.href;
              
              if (hasHistory && hasReferrer) {
                // We have history and came from somewhere, safe to go back
                router.back();
              } else {
                // No proper history (new browser, direct link, etc.), go to home
                router.push('/');
              }
            }}
            aria-label="Go back"
          >
            <Icons.arrowLeft className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center gap-3 text-white">
          <div className="relative">
            {supportedProviders.length > 0 ? (
              <>
                <select
                  value={selectedProvider}
                  onChange={(e) => {
                    const provider = e.target.value as Provider;
                    setSelectedProvider(provider);
                    setExplicitSelection(true);
                    if (typeof window !== 'undefined') localStorage.setItem('provider', provider);
                    buildAndSetUrl();
                  }}
                  className="flex items-center gap-2 rounded-md bg-black/20 pl-8 pr-10 py-2 backdrop-blur-sm border-0 text-sm font-medium text-white appearance-none cursor-pointer hover:bg-black/30 transition-colors"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em'
                  }}
                >
                  {supportedProviders.map((provider) => (
                    <option key={provider} value={provider} className="bg-black text-white">
                      {provider}
                    </option>
                  ))}
                </select>
                <Icons.server className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70 pointer-events-none" />
              </>
            ) : (
              <div className="flex items-center gap-2 rounded-md bg-black/20 px-3 py-2 backdrop-blur-sm text-sm font-medium text-white/50">
                <Icons.server className="h-4 w-4" />
                <span>No providers available</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {!!toast && (
        <div className="pointer-events-none absolute left-1/2 top-4 z-[3] -translate-x-1/2 rounded bg-black/80 px-3 py-2 text-xs text-white shadow">
          {toast}
        </div>
      )}
      <div
        ref={loadingRef}
        className="absolute z-[1] flex h-full w-full items-center justify-center">
        <Loading />
      </div>
      <iframe
        width="100%"
        height="100%"
        allowFullScreen
        ref={iframeRef}
        style={{ opacity: 0 }}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default EmbedPlayer;
