import axios, { type AxiosInstance } from 'axios';
import { env } from '@/env.mjs';

// Minimal MAL API client for server-side use only.
// We only need search to retrieve MAL IDs given an anime title.

export type MalAnime = {
  id: number;
  title: string;
  alternative_titles?: {
    synonyms?: string[];
    en?: string | null;
    ja?: string | null;
  };
  start_date?: string | null;
  media_type?: string | null;
};

export type MalSearchResponse = {
  data: Array<{
    node: MalAnime;
  }>;
};

class MALService {
  private static client: AxiosInstance = axios.create({
    baseURL: 'https://api.myanimelist.net/v2',
    timeout: 8000,
  });

  // in-memory cache for this server process
  private static cache = new Map<string, MalAnime | undefined>();

  private static cacheKey(q: string, year?: number) {
    return `${q.toLowerCase().trim()}|${year ?? ''}`;
  }

  static async searchAnime(q: string, limit = 5) {
    if (!env.MAL_CLIENT_ID) {
      throw new Error('MAL_CLIENT_ID is not configured');
    }
    const { data } = await this.client.get<MalSearchResponse>(
      `/anime`,
      {
        headers: {
          'X-MAL-CLIENT-ID': env.MAL_CLIENT_ID,
        },
        params: {
          q,
          limit,
          fields: 'id,title,alternative_titles,start_date,media_type',
        },
      },
    );
    return data?.data?.map((d) => d.node) ?? [];
  }

  static async resolveAnimeId(q: string, year?: number): Promise<MalAnime | undefined> {
    const key = this.cacheKey(q, year);
    if (this.cache.has(key)) return this.cache.get(key);
    const items = await this.searchAnime(q, 5);
    const best = this.pickBestMatch(q, items, year);
    this.cache.set(key, best);
    return best;
  }

  // score-based best match using title, alt titles, synonyms, and optional year
  static pickBestMatch(q: string, items: MalAnime[], year?: number): MalAnime | undefined {
    if (!items?.length) return undefined;
    const norm = (s?: string | null) => (s ?? '').trim().toLowerCase();
    const nq = norm(q);

    let best: { item: MalAnime; score: number } | undefined;

    for (const item of items) {
      let score = 0;
      const title = norm(item.title);
      const en = norm(item.alternative_titles?.en ?? undefined);
      const synonyms = (item.alternative_titles?.synonyms ?? []).map(norm);

      if (title === nq) score += 10;
      if (en && en === nq) score += 8;
      if (synonyms.includes(nq)) score += 6;
      if (title.includes(nq) && nq.length >= 4) score += 4;
      if (en.includes(nq) && nq.length >= 4) score += 3;
      if (synonyms.some((s) => s.includes(nq) && nq.length >= 4)) score += 2;

      if (year) {
        const startYear = item.start_date ? Number(String(item.start_date).slice(0, 4)) : undefined;
        if (startYear && startYear === year) score += 5;
      }

      if (!best || score > best.score) best = { item, score };
    }

    return best?.item ?? items[0];
  }
}

export default MALService;
