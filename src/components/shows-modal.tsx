'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { getMobileDetect, getYear } from '@/lib/utils';
import MovieService from '@/services/MovieService';
import { useModalStore } from '@/stores/modal';
import {
  type KeyWord,
  MediaType,
  type Genre,
  type ShowWithGenreAndVideo,
  type VideoResult,
} from '@/types';
import Link from 'next/link';
import * as React from 'react';
import Youtube from 'react-youtube';
import CustomImage from './custom-image';

type YouTubePlayer = {
  mute: () => void;
  unMute: () => void;
  playVideo: () => void;
  seekTo: (value: number) => void;
  container: HTMLDivElement;
  internalPlayer: YouTubePlayer;
};

type YouTubeEvent = {
  target?: YouTubePlayer | null;
};

// Strongly type the YouTube options so state updates type-check
// per the iframe API (strings, numbers, booleans)
type PlayerVars = Record<string, string | number | boolean | undefined>;
interface YTPlayerOptions {
  host?: string;
  origin?: string;
  playerVars?: PlayerVars;
}

const userAgent =
  typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
const { isMobile } = getMobileDetect(userAgent);
const defaultOptions: YTPlayerOptions = {
  // Use standard host; this aligns better with widget expectations in dev
  host: 'https://www.youtube.com',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    rel: 0,
    mute: isMobile() ? 1 : 0,
    loop: 1,
    autoplay: 1,
    controls: 0,
    disablekb: 1,
    enablejsapi: 1,
    playsinline: 1,
    cc_load_policy: 0,
    modestbranding: 3,
    // origin is set on mount too; include here for redundancy
    origin: typeof window !== 'undefined' ? window.location.origin : undefined,
  },
};

const ShowModal = () => {
  // stores
  const modalStore = useModalStore();
  const IS_MOBILE: boolean = isMobile();

  const [trailer, setTrailer] = React.useState('');
  const [isPlaying] = React.useState(true);
  const [genres, setGenres] = React.useState<Genre[]>([]);
  const [isAnime, setIsAnime] = React.useState<boolean>(false);
  const [isMuted, setIsMuted] = React.useState<boolean>(
    modalStore.firstLoad || IS_MOBILE,
  );
  const [options, setOptions] = React.useState<YTPlayerOptions>(defaultOptions);

  const youtubeRef = React.useRef(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  const handleGetData = React.useCallback(async () => {
    const id: number | undefined = modalStore.show?.id;
    // Prefer explicit tv/movie, but guard against unexpected values by falling back
    const preferredType: 'tv' | 'movie' =
      modalStore.show?.media_type === MediaType.TV ? 'tv' : 'movie';
    if (!id) return;

    let data: ShowWithGenreAndVideo | null = null;
    try {
      data = await MovieService.findMovieByIdAndType(id, preferredType);
    } catch {
      // If the preferred type 404s (e.g., mixed/trending result mislabels), try the other type
      try {
        const altType: 'tv' | 'movie' = preferredType === 'tv' ? 'movie' : 'tv';
        data = await MovieService.findMovieByIdAndType(id, altType);
      } catch (err2: unknown) {
        console.error('Failed to fetch show details for modal', err2);
        return;
      }
    }

    if (!data) return;

    const keywords: KeyWord[] =
      data?.keywords?.results || data?.keywords?.keywords;

    if (keywords?.length) {
      setIsAnime(
        !!keywords.find((keyword: KeyWord) => keyword.name === 'anime'),
      );
    }

    if (data?.genres) {
      setGenres(data.genres);
    }
    if (data.videos?.results?.length) {
      const videoData: VideoResult[] = data.videos?.results;
      const result: VideoResult | undefined = videoData.find(
        (item: VideoResult) => item.type === 'Trailer',
      );
      if (result?.key) setTrailer(result.key);
    }
  }, [modalStore.show]);

  // get trailer and genres of show
  React.useEffect(() => {
    if (modalStore.firstLoad || IS_MOBILE) {
      setOptions((state) => ({
        ...state,
        playerVars: { ...(state.playerVars ?? {}), mute: 1 },
      }));
    }
    // Ensure origin matches exactly to avoid target origin errors
    try {
      const origin = window.location.origin;
      setOptions((state) => ({
        ...state,
        origin,
        playerVars: { ...(state.playerVars ?? {}), origin },
      }));
    } catch {}

    void handleGetData();
  }, [IS_MOBILE, modalStore.firstLoad, handleGetData]);

  React.useEffect(() => {
    setIsAnime(false);
  }, [modalStore]);

  const handleCloseModal = () => {
    // Snapshot state before clearing
    const hadShow = !!modalStore.show;
    const wasFirstLoad = modalStore.firstLoad;
    const pathname =
      typeof window !== 'undefined' ? window.location.pathname : '';
    const previousPath = modalStore.previousPath;
    const pushedSlug = modalStore.pushedSlug;

    modalStore.reset();

    // If a slug was pushed when opening, always return to the previous path
    if (pushedSlug && previousPath) {
      window.history.pushState(null, '', previousPath);
      return;
    }

    // If we opened directly on a slug (first load), return to the section page
    const slugRe = /^\/(movies|tv-shows|anime)\/[^/]+$/;
    const slugMatch = slugRe.exec(pathname);
    if (wasFirstLoad && slugMatch) {
      window.history.pushState(null, '', `/${slugMatch[1]}`);
      return;
    }

    // Otherwise, do nothing (stay on the current page)
    if (!hadShow) {
      // As a last resort, keep user on the current path
      return;
    }
  };

  const onEnd = (event: YouTubeEvent) => {
    try {
      if (event?.target && typeof event.target.seekTo === 'function') {
        event.target.seekTo(0);
      }
    } catch {}
  };

  const onPlay = () => {
    if (imageRef.current) {
      imageRef.current.style.opacity = '0';
    }
    if (youtubeRef.current) {
      const iframeRef: HTMLElement | null =
        document.getElementById('video-trailer');
      if (iframeRef) iframeRef.classList.remove('opacity-0');
    }
  };

  const onReady = (event: YouTubeEvent) => {
    try {
      if (event?.target && typeof event.target.playVideo === 'function') {
        // Defer to ensure the iframe is attached
        setTimeout(() => {
          try {
            event.target!.playVideo();
          } catch {}
        }, 0);
      }
    } catch {}
  };

  const handleChangeMute = () => {
    setIsMuted((state: boolean) => !state);
    if (!youtubeRef.current) return;
    const videoRef: YouTubePlayer = youtubeRef.current as YouTubePlayer;
    if (isMuted && youtubeRef.current) {
      videoRef.internalPlayer.unMute();
    } else if (youtubeRef.current) {
      videoRef.internalPlayer.mute();
    }
  };

  const handleHref = (): string => {
    const type = isAnime
      ? 'anime'
      : modalStore.show?.media_type === MediaType.MOVIE
        ? 'movie'
        : 'tv';
    let id = `${modalStore.show?.id}`;
    if (isAnime) {
      const prefix: string =
        modalStore.show?.media_type === MediaType.MOVIE ? 'm' : 't';
      id = `${prefix}-${id}`;
    }
    return `/watch/${type}/${id}`;
  };

  return (
    <Dialog
      open={modalStore.open}
      onOpenChange={handleCloseModal}
      aria-label="Modal containing show's details">
      <DialogContent className="w-full overflow-hidden rounded-md bg-zinc-900 p-0 text-left align-middle shadow-xl dark:bg-zinc-900 sm:max-w-3xl lg:max-w-4xl">
        <div className="video-wrapper relative aspect-video">
          <CustomImage
            fill
            priority
            ref={imageRef}
            alt={modalStore?.show?.title ?? 'poster'}
            className="-z-40 z-[1] h-auto w-full object-cover"
            src={`https://image.tmdb.org/t/p/original${
              modalStore.show?.backdrop_path ?? modalStore.show?.poster_path
            }`}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 100vw, 33vw"
          />
          {trailer && (
            <Youtube
              key={trailer}
              opts={options}
              onEnd={onEnd}
              onPlay={onPlay}
              ref={youtubeRef}
              onReady={onReady}
              videoId={trailer}
              id="video-trailer"
              title={
                modalStore.show?.title ??
                modalStore.show?.name ??
                'video-trailer'
              }
              className="relative aspect-video w-full"
              style={{ width: '100%', height: '100%' }}
              iframeClassName={`relative pointer-events-none w-[100%] h-[100%] z-[-10] opacity-0`}
            />
          )}
          <div className="absolute bottom-6 z-20 flex w-full items-center justify-between gap-2 px-10">
            <div className="flex items-center gap-2.5">
              <Link href={handleHref()}>
                <Button
                  aria-label={`${isPlaying ? 'Pause' : 'Play'} show`}
                  className="group h-auto rounded py-1.5">
                  <>
                    <Icons.play
                      className="mr-1.5 h-6 w-6 fill-current"
                      aria-hidden="true"
                    />
                    Play
                  </>
                </Button>
              </Link>
            </div>
            <Button
              aria-label={`${isMuted ? 'Unmute' : 'Mute'} video`}
              variant="ghost"
              className="h-auto rounded-full bg-neutral-800 p-1.5 opacity-50 ring-1 ring-slate-400 hover:bg-neutral-800 hover:opacity-100 hover:ring-white focus:ring-offset-0 dark:bg-neutral-800 dark:hover:bg-neutral-800"
              onClick={handleChangeMute}>
              {isMuted ? (
                <Icons.volumeMute className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Icons.volume className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
        <div className="grid gap-2.5 px-10 pb-10">
          <DialogTitle className="text-lg font-medium leading-6 text-slate-50 sm:text-xl">
            {modalStore.show?.title ?? modalStore.show?.name}
          </DialogTitle>
          <div className="flex items-center space-x-4 font-terminal text-sm sm:text-base">
            <div className="text-terminal-accent">
              <span className="text-terminal-text">RATING:</span>{' '}
              {Math.round((Number(modalStore.show?.vote_average) / 10) * 100) ??
                '-'}
              %
            </div>
            {modalStore.show?.release_date ? (
              <div className="text-terminal-accent">
                <span className="text-terminal-text">YEAR:</span>{' '}
                {getYear(modalStore.show?.release_date)}
              </div>
            ) : modalStore.show?.first_air_date ? (
              <div className="text-terminal-accent">
                <span className="text-terminal-text">YEAR:</span>{' '}
                {getYear(modalStore.show?.first_air_date)}
              </div>
            ) : null}
            {modalStore.show?.original_language && (
              <div className="text-terminal-accent">
                <span className="text-terminal-text">LANG:</span> [
                {modalStore.show.original_language.toUpperCase()}]
              </div>
            )}
          </div>
          <DialogDescription className="line-clamp-3 text-xs text-slate-50 dark:text-slate-50 sm:text-sm">
            {modalStore.show?.overview ?? '-'}
          </DialogDescription>
          <div className="flex items-center gap-2 font-terminal text-xs sm:text-sm">
            <span className="text-terminal-text">GENRES:</span>
            <span className="text-terminal-accent">
              [{genres.map((genre) => genre.name).join(', ')}]
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowModal;
