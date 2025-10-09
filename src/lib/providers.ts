import { env } from '@/env';

export type Provider = 'vidsrc' | 'vidplay' | 'vidlink' | 'vidking';

export type ProviderOptions = {
  autoplay?: boolean;
  variant?: 'sub' | 'dub';
  primaryColor?: string; // vidlink
  secondaryColor?: string; // vidlink
  iconColor?: string; // vidlink
  icons?: 'vid' | 'default'; // vidlink
  title?: boolean; // vidlink
  poster?: boolean; // vidlink
  nextbutton?: boolean; // vidlink
  player?: 'jw' | 'default'; // vidlink
  startAt?: number; // vidlink (seconds)
  sub_file?: string; // vidlink
  sub_label?: string; // vidlink
  // anime-specific
  fallback?: boolean; // vidlink anime

  // vidking options
  color?: string; // hex without #
  nextEpisode?: boolean; // tv only
  episodeSelector?: boolean; // tv only
  progress?: number; // seconds (alias for startAt)
};

export const DEFAULT_PROVIDER: Provider = (env.NEXT_PUBLIC_DEFAULT_PROVIDER as Provider) || 'vidlink';

function toQuery(params: Record<string, string | number | boolean | undefined>) {
  const entries = Object.entries(params).filter(([, v]) => v !== undefined);
  if (!entries.length) return '';
  const usp = new URLSearchParams();
  for (const [k, v] of entries) usp.set(k, String(v));
  return `?${usp.toString()}`;
}

export function getEmbedUrl(args: {
  provider: Provider;
  mediaType: 'movie' | 'tv' | 'anime';
  tmdbId?: number | string; // used by vidsrc & vidlink
  imdbId?: string; // used by vidplay
  malId?: number | string; // used by vidlink anime
  season?: number | string;
  episode?: number | string;
  options?: ProviderOptions;
}): string {
  const {
    provider,
    mediaType,
    tmdbId,
    imdbId,
    malId,
    season,
    episode,
    options = {},
  } = args;

  switch (provider) {
    case 'vidsrc': {
      if (!tmdbId) throw new Error('tmdbId is required for vidsrc');
      if (mediaType === 'movie') return `https://vidsrc.cc/v2/embed/movie/${tmdbId}`;
      if (mediaType === 'tv') {
        const s = season ?? 1;
        const e = episode ?? 1;
        return `https://vidsrc.cc/v2/embed/tv/${tmdbId}/${s}/${e}`;
      }
      // anime: follows existing pattern in the codebase
      const ep = episode ?? 1;
      const variant = options.variant ?? 'sub';
      const qp = options.autoplay === false ? '?autoPlay=false' : '';
      return `https://vidsrc.cc/v2/embed/anime/tmdb${tmdbId}/${ep}/${variant}${qp}`;
    }

    case 'vidlink': {
      // Movies and TV use TMDB IDs
      if (mediaType === 'movie') {
        if (!tmdbId) throw new Error('tmdbId is required for vidlink movie');
        const qp = toQuery({
          autoplay: options.autoplay,
          primaryColor: options.primaryColor,
          secondaryColor: options.secondaryColor,
          iconColor: options.iconColor,
          icons: options.icons,
          title: options.title,
          poster: options.poster,
          nextbutton: options.nextbutton,
          player: options.player,
          startAt: options.startAt,
          sub_file: options.sub_file,
          sub_label: options.sub_label,
        });
        return `https://vidlink.pro/movie/${tmdbId}${qp}`;
      }
      if (mediaType === 'tv') {
        if (!tmdbId) throw new Error('tmdbId is required for vidlink tv');
        const s = season ?? 1;
        const e = episode ?? 1;
        const qp = toQuery({
          autoplay: options.autoplay,
          primaryColor: options.primaryColor,
          secondaryColor: options.secondaryColor,
          iconColor: options.iconColor,
          icons: options.icons,
          title: options.title,
          poster: options.poster,
          nextbutton: options.nextbutton,
          player: options.player,
          startAt: options.startAt,
          sub_file: options.sub_file,
          sub_label: options.sub_label,
        });
        return `https://vidlink.pro/tv/${tmdbId}/${s}/${e}${qp}`;
      }
      // anime requires MAL id
      if (!malId) throw new Error('malId is required for vidlink anime');
      const variant = options.variant ?? 'sub';
      const qp = toQuery({ fallback: options.fallback, autoplay: options.autoplay });
      return `https://vidlink.pro/anime/${malId}/${episode ?? 1}/${variant}${qp}`;
    }

    case 'vidplay': {
      if (!imdbId) throw new Error('imdbId is required for vidplay');
      if (mediaType === 'movie') return `https://vidplay.to/movie/${imdbId}`;
      const s = season ?? 1;
      const e = episode ?? 1;
      return `https://vidplay.to/tv/${imdbId}/${s}/${e}`;
    }

    case 'vidking': {
      // https://www.vidking.net/embed/movie/{tmdbId}
      // https://www.vidking.net/embed/tv/{tmdbId}/{season}/{episode}
      if (!tmdbId) throw new Error('tmdbId is required for vidking');
      const qp = toQuery({
        color: options.color ?? options.primaryColor, // allow reuse of primaryColor
        autoPlay: options.autoplay,
        nextEpisode: options.nextEpisode ?? options.nextbutton, // map nextbutton
        episodeSelector: options.episodeSelector,
        progress: options.progress ?? options.startAt,
      });
      if (mediaType === 'movie') return `https://www.vidking.net/embed/movie/${tmdbId}${qp}`;
      if (mediaType === 'tv') {
        const s = season ?? 1;
        const e = episode ?? 1;
        return `https://www.vidking.net/embed/tv/${tmdbId}/${s}/${e}${qp}`;
      }
      throw new Error('vidking does not support anime');
    }


    default:
      throw new Error('Unknown provider');
  }
}