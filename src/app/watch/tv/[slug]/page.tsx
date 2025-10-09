import React from 'react';
import EmbedPlayer from '@/components/watch/embed-player';
import { getEmbedUrl, DEFAULT_PROVIDER } from '@/lib/providers';
import { MediaType } from '@/types';

export const runtime = 'edge';

export const revalidate = 3600;

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = slug.split('-').pop();
  const movieId: string | undefined = slug.split('/').pop();
  const url = getEmbedUrl({
    provider: DEFAULT_PROVIDER,
    mediaType: 'tv',
    tmdbId: id,
    season: 1,
    episode: 1,
  });
  return (
    <EmbedPlayer
      url={url}
      movieId={movieId}
      mediaType={MediaType.TV}
      tmdbId={id}
    />
  );
}
