# watch.freelo.gay

a curated collection of things worth watching.

built this because finding good movies shouldn't be a hassle. no ads, no tracking, no bullshit — just clean movie discovery that actually works.

## what you'll find:

- **clean movie browsing** — sort by genre, year, or popularity without the noise
- **search that works** — find stuff by title, director, or cast
- **honest ratings** — community ratings without manipulation
- **works everywhere** — responsive design that doesn't suck
- **fast loading** — because waiting is annoying

## getting it running:

### quick deploy (vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbitfreee%2Fmovie-web-kickstart&env=NEXT_PUBLIC_APP_URL,NEXT_PUBLIC_TMDB_TOKEN,NEXT_PUBLIC_SITE_NAME)

you'll need these environment variables:
- `NEXT_PUBLIC_APP_URL`: where you're hosting this thing
- `NEXT_PUBLIC_TMDB_TOKEN`: grab one from [TMDb](https://www.themoviedb.org/documentation/api) (or use the example one for testing)
- `NEXT_PUBLIC_SITE_NAME`: whatever you want to call it

### other hosting

works on cloudflare pages, netlify, or wherever you deploy next.js apps. it's just a static site.

## running locally:

```bash
git clone [your-repo-url]
cd watch.freelo.gay-dev
npm install
cp .env.example .env  # add your TMDb token
npm run dev
```

open http://localhost:3000 and you're good.

## how it's built:

next.js because it works. typescript because types are helpful. tailwind because writing css is tedious.

data comes from TMDb (they have a solid API). embeds from various sources that actually work.

**stack:**
- next.js + typescript + tailwind
- TMDb for movie data
- various embed sources for streaming
- deployed statically because simple is better

## contributing:

found a bug? have an idea? cool.

fork it, fix it, PR it. keep the code clean and the commits descriptive.

## credits:

thanks to TMDb for the movie data and the various embed providers for actually working.

---

*part of the freelo.gay ecosystem | no tracking, no ads, no nonsense*

© 2025 freelo | built because finding good movies shouldn't suck

