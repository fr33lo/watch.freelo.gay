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
  const url = getEmbedUrl({
    provider: DEFAULT_PROVIDER,
    mediaType: 'movie',
    tmdbId: id,
    options: { autoplay: false },
  });
  return <EmbedPlayer url={url} mediaType={MediaType.MOVIE} tmdbId={id} />;
}
