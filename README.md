# watch.freelo.gay

🎬 **the ultimate streaming terminal** — a retro-inspired streaming platform that doesn't suck.

built this because finding good movies and shows shouldn't be a hassle. no subscriptions, no ads, no tracking, no bullshit — just pure streaming goodness with a terminal aesthetic that actually works.

## ✨ what you'll find:

- 🎯 **vast content library** — thousands of movies, tv shows, anime, and documentaries
- 🤖 **smart recommendations** — AI-powered suggestions tailored to your taste
- 📱 **multi-device streaming** — works on phones, tablets, laptops, smart TVs, and gaming consoles  
- 👥 **watch parties** — synchronized viewing with friends and real-time chat
- 🎨 **retro terminal ui** — nostalgic green-on-black interface with smooth animations
- 🔍 **powerful search** — find content by title, director, cast, genre, or year
- 💎 **4k/ultra hd quality** — crystal clear streaming with HDR support
- 🆓 **always free** — no subscriptions, no credit cards, no premium tiers
- ⚡ **blazing fast** — optimized for speed with minimal loading times
- 📱 **mobile responsive** — perfect experience on any screen size

## 🚀 getting it running:

### ⚡ quick deploy

**vercel (recommended)**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffr33lo%2Fwatch.freelo.gay.git&env=NEXT_PUBLIC_APP_URL,NEXT_PUBLIC_TMDB_TOKEN,NEXT_PUBLIC_SITE_NAME)

**cloudflare pages**
```bash
npm run build:opennext  # optimized for cloudflare
npm run preview:opennext  # test locally
```

### 🗔️ environment variables

you'll need these to get streaming working:
- `NEXT_PUBLIC_APP_URL`: your deployment URL (e.g., https://watch.freelo.gay)
- `NEXT_PUBLIC_TMDB_TOKEN`: grab your free API key from [TMDb](https://www.themoviedb.org/documentation/api)
- `NEXT_PUBLIC_SITE_NAME`: customize the site name (default: watch.freelo.gay)

### 📊 other hosting options

works perfectly on:
- **cloudflare pages** (with opennext build)
- **netlify** (standard next.js build)
- **railway**, **render**, **fly.io**
- any static host that supports next.js

## 💻 local development:

**requirements:** node.js 18.17.1 or higher

```bash
# clone the repo
git clone https://github.com/fr33lo/watch.freelo.gay.git
cd watch.freelo.gay

# install dependencies 
npm install

# set up environment
cp .env.example .env  # add your TMDb token

# fire it up
npm run dev
```

open **http://localhost:3000** and start streaming! 🎬

## 🔧 how it's built:

next.js 15 because it works. typescript because types save lives. tailwind because writing vanilla css is painful.

data comes from TMDb (they have a solid free API). streaming sources aggregated from various working providers.

**📚 tech stack:**
- **framework:** next.js 15 + typescript + tailwind css
- **ui components:** radix-ui primitives + custom terminal styling
- **state management:** zustand + tanstack query 
- **animations:** framer-motion + css keyframes
- **api:** tRPC for type-safe server functions
- **data source:** TMDb API for metadata
- **streaming:** aggregated embed providers
- **deployment:** vercel, cloudflare pages (opennext), netlify
- **analytics:** vercel analytics + speed insights
- **testing:** vitest + testing-library
- **linting:** eslint + prettier + husky hooks

**🎨 design philosophy:**
- terminal/retro aesthetic with modern UX
- performance-first (static generation where possible)
- mobile-responsive design
- accessibility-compliant components
- zero-config deployment

## 🔨 development scripts:

```bash
# development
npm run dev          # start dev server
npm run build        # production build  
npm run start        # start production server

# cloudflare specific
npm run build:opennext    # build for cloudflare
npm run preview:opennext  # preview cloudflare build

# code quality
npm run lint         # check for issues
npm run lint:fix     # auto-fix issues
npm run format       # format code with prettier
npm run typecheck    # typescript checking

# testing
npm run test         # run tests
npm run test:watch   # run tests in watch mode
```

## 🤝 contributing:

found a bug? have an idea? contributions are welcome!

1. **fork** the repo
2. **create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **commit** your changes (`git commit -m 'add amazing feature'`) 
4. **push** to the branch (`git push origin feature/amazing-feature`)
5. **open** a pull request

please keep code clean, add tests for new features, and follow the existing style.

## 🏆 credits:

- **TMDb** for the comprehensive movie/tv database API
- **embed providers** for actually working streaming sources
- **open source community** for the amazing tools and libraries

## 🗺️ roadmap:

- [ ] user accounts & watchlists
- [ ] advanced filtering & sorting 
- [ ] mobile app (react native)
- [ ] chromecast support
- [ ] subtitle support
- [ ] offline downloads
- [ ] dark/light theme toggle

---

<div align="center">

**🐈‍⬛ part of the freelo.gay ecosystem**

*no tracking • no ads • no subscriptions • no bullshit*

**© 2025 freelo** • built because finding good movies shouldn't suck 🎬

[![GitHub](https://img.shields.io/badge/GitHub-fr33lo-green?style=flat&logo=github)](https://github.com/fr33lo/watch.freelo.gay) 
[![Live Site](https://img.shields.io/badge/Live-watch.freelo.gay-brightgreen?style=flat&logo=vercel)](https://watch.freelo.gay)

</div>

