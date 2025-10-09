import React from 'react';
import EmbedPlayer from '@/components/watch/embed-player';
import { MediaType, type Show } from '@/types';
import { getEmbedUrl, DEFAULT_PROVIDER } from '@/lib/providers';
import MovieService from '@/services/MovieService';
import MALService from '@/services/MALService/MALService';
import { type AxiosResponse } from 'axios';

export const revalidate = 3600;

export default async function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-').pop();
  const movieId: string | undefined = params.slug.split('/').pop();
  const isAnime = movieId?.includes('t');

  let malId: number | undefined;
  let initialUrl: string;

  if (isAnime && id) {
    // Resolve MAL id by searching MAL with the TMDB TV title
    try {
      const res: AxiosResponse<Show> = await MovieService.findTvSeries(Number(id));
const title = res.data?.name ?? res.data?.original_name ?? res.data?.title ?? '';
      const year = res.data?.first_air_date ? Number(res.data.first_air_date.slice(0, 4)) : undefined;
      if (title) {
        const best = await MALService.resolveAnimeId(title, year);
        if (best?.id) malId = best.id;
      }
    } catch {}
  }

  if (isAnime && malId) {
    initialUrl = getEmbedUrl({
      provider: DEFAULT_PROVIDER,
      mediaType: 'anime',
      malId,
      episode: 1,
      options: { autoplay: false, variant: 'sub', fallback: true },
    });
  } else {
    // fallback to vidsrc anime with tmdb id if MAL lookup failed or not anime
    initialUrl = getEmbedUrl({
      provider: 'vidsrc',
      mediaType: isAnime ? 'anime' : 'movie',
      tmdbId: id,
      episode: isAnime ? 1 : undefined,
      options: isAnime ? { autoplay: false, variant: 'sub' } : undefined,
    });
  }

  return (
    <EmbedPlayer
      movieId={movieId}
      mediaType={isAnime ? MediaType.ANIME : undefined}
      url={initialUrl}
      malId={malId}
      tmdbId={id}
    />
  );
}
