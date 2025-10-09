import React from 'react';
import EmbedPlayer from '@/components/watch/embed-player';
import { getEmbedUrl, DEFAULT_PROVIDER } from '@/lib/providers';
import { MediaType } from '@/types';

export const revalidate = 3600;

export default function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-').pop();
  const url = getEmbedUrl({
    provider: DEFAULT_PROVIDER,
    mediaType: 'movie',
    tmdbId: id,
    options: { autoplay: false },
  });
  return <EmbedPlayer url={url} mediaType={MediaType.MOVIE} tmdbId={id} />;
}
