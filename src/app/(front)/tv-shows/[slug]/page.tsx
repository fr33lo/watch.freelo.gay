import { type Metadata } from 'next';
import { handleMetadata } from '@/lib/utils';
import TvShowPage from '../page';

export const runtime = 'edge';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return handleMetadata(slug, 'tv-shows', 'tv');
}

export default async function Home() {
  return TvShowPage();
}
