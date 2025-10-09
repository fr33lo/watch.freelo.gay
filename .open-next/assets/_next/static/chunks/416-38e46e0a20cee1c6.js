'use strict';
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [416],
  {
    1424: (e, t, n) => {
      n.d(t, { _: () => i });
      var r = n(4863),
        o = n(3220),
        a = n(5704);
      let i = (0, r.w)({
        server: {
          NODE_ENV: o.k5n(['development', 'test', 'production']),
          MAL_CLIENT_ID: o.YjP().optional(),
          MAL_CLIENT_SECRET: o.YjP().optional(),
        },
        client: {
          NEXT_PUBLIC_APP_URL: o.YjP().url(),
          NEXT_PUBLIC_TMDB_TOKEN: o.YjP(),
          NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: o.YjP().optional(),
          NEXT_PUBLIC_SITE_NAME: o.YjP(),
          NEXT_PUBLIC_TWITTER: o.YjP().url().optional(),
          NEXT_PUBLIC_FACEBOOK: o.YjP().url().optional(),
          NEXT_PUBLIC_INSTAGRAM: o.YjP().url().optional(),
          NEXT_PUBLIC_YOUTUBE: o.YjP().url().optional(),
          NEXT_PUBLIC_IMAGE_DOMAIN: o.YjP().optional(),
          NEXT_PUBLIC_DEFAULT_PROVIDER: o
            .k5n(['vidsrc', 'vidplay', 'vidlink', 'vidking', 'autoembed'])
            .optional(),
          NEXT_PUBLIC_PROVIDERS: o.YjP().optional(),
        },
        runtimeEnv: {
          NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
          MAL_CLIENT_ID: a.env.MAL_CLIENT_ID,
          MAL_CLIENT_SECRET: a.env.MAL_CLIENT_SECRET,
          NODE_ENV: 'production',
          NEXT_PUBLIC_TMDB_TOKEN:
            'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDNjZTk2ZTMyNWIwOWNmNzQyNDQzMjI4MGQ2MDYxMSIsIm5iZiI6MTY5OTkwMDkxNC4wMzMsInN1YiI6IjY1NTI2ZGYyOTY1M2Y2MTNmNDc0MDA0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.s1VoUlE-OWjsKNddJgBO7EjfEli7LA2yvHrv2rkUPoE',
          NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: '',
          NEXT_PUBLIC_SITE_NAME: 'watch.freelo.gay',
          NEXT_PUBLIC_TWITTER: 'https://twitter.com/',
          NEXT_PUBLIC_FACEBOOK: 'https://facebook.com/',
          NEXT_PUBLIC_INSTAGRAM: 'https://instagram.com/',
          NEXT_PUBLIC_YOUTUBE: 'https://youtube.com/',
          NEXT_PUBLIC_IMAGE_DOMAIN: a.env.NEXT_PUBLIC_IMAGE_DOMAIN,
          NEXT_PUBLIC_DEFAULT_PROVIDER: 'vidlink',
          NEXT_PUBLIC_PROVIDERS: 'vidlink,vidking,vidsrc,vidplay',
        },
        skipValidation: !!a.env.SKIP_ENV_VALIDATION,
      });
    },
    1692: (e, t, n) => {
      n.d(t, { A: () => g });
      var r = n(4269),
        o = n(5125),
        a = n(1424);
      class i {
        static axios(e) {
          let t = this.getConfig(e),
            n = o.A.create(t);
          return (
            n.interceptors.request.use(
              (e) => {
                var t;
                return (
                  (null == (t = e.baseURL)
                    ? void 0
                    : t.includes('themoviedb')) &&
                    (e.headers.Authorization = 'Bearer '.concat(
                      a._.NEXT_PUBLIC_TMDB_TOKEN,
                    )),
                  e
                );
              },
              (e) => (
                console.error('error in request: '.concat(e.message)),
                Promise.reject(e)
              ),
            ),
            n
          );
        }
        static getConfig(e) {
          return {
            timeout: 15e3,
            baseURL: e,
            responseType: 'json',
            maxContentLength: 1e5,
            validateStatus: (e) => e >= 200 && e < 300,
            maxRedirects: 5,
          };
        }
        constructor() {
          if (this.constructor === i)
            throw Error("Classes can't be instantiated.");
        }
      }
      ((i.isRejected = (e) => 'rejected' === e.status),
        (i.isFulfilled = (e) => 'fulfilled' === e.status));
      let s = i;
      var l = (function (e) {
          return (
            (e.TRENDING = 'trending'),
            (e.TOP_RATED = 'top_rated'),
            (e.NETFLIX = 'netflix'),
            (e.POPULAR = 'popular'),
            (e.GENRE = 'genre'),
            (e.ANIME_GENRE = 'anime_genre'),
            (e.KOREAN = 'korean'),
            (e.DEFAULT = 'default'),
            (e.ANIME_LATEST = 'anime_latest'),
            (e.ANIME_TRENDING = 'anime_trending'),
            (e.ANIME_TOP_RATED = 'anime_top_rated'),
            (e.ANIME_NETFLIX = 'anime_netflix'),
            e
          );
        })({}),
        c = (function (e) {
          return (
            (e[(e.ACTION = 28)] = 'ACTION'),
            (e[(e.ADVENTURE = 12)] = 'ADVENTURE'),
            (e[(e.ANIMATION = 16)] = 'ANIMATION'),
            (e[(e.COMEDY = 35)] = 'COMEDY'),
            (e[(e.CRIME = 80)] = 'CRIME'),
            (e[(e.DOCUMENTARY = 99)] = 'DOCUMENTARY'),
            (e[(e.DRAMA = 18)] = 'DRAMA'),
            (e[(e.FAMILY = 10751)] = 'FAMILY'),
            (e[(e.FANTASY = 14)] = 'FANTASY'),
            (e[(e.HISTORY = 36)] = 'HISTORY'),
            (e[(e.HORROR = 27)] = 'HORROR'),
            (e[(e.MUSIC = 10402)] = 'MUSIC'),
            (e[(e.MYSTERY = 9648)] = 'MYSTERY'),
            (e[(e.ROMANCE = 10749)] = 'ROMANCE'),
            (e[(e.SCIENCE_FICTION = 878)] = 'SCIENCE_FICTION'),
            (e[(e.TV_MOVIE = 10770)] = 'TV_MOVIE'),
            (e[(e.THRILLER = 53)] = 'THRILLER'),
            (e[(e.WAR = 10752)] = 'WAR'),
            (e[(e.WESTERN = 37)] = 'WESTERN'),
            (e[(e.ACTION_ADVENTURE = 10759)] = 'ACTION_ADVENTURE'),
            (e[(e.KIDS = 10762)] = 'KIDS'),
            (e[(e.NEWS = 10763)] = 'NEWS'),
            (e[(e.REALITY = 10764)] = 'REALITY'),
            (e[(e.SCIFI_FANTASY = 10765)] = 'SCIFI_FANTASY'),
            (e[(e.SOAP = 10766)] = 'SOAP'),
            (e[(e.TALK = 10767)] = 'TALK'),
            (e[(e.WAR_POLITICS = 10768)] = 'WAR_POLITICS'),
            e
          );
        })({}),
        u = n(2115);
      let d = [l.TOP_RATED, l.NETFLIX, l.POPULAR, l.GENRE, l.KOREAN],
        h = 'https://api.themoviedb.org/3';
      class _ extends s {
        static async findCurrentMovie(e, t) {
          let n = (
            await Promise.allSettled([this.findMovie(e), this.findTvSeries(e)])
          )
            .filter(this.isFulfilled)
            .map((e) => {
              var t;
              return null == (t = e.value) ? void 0 : t.data;
            })
            .filter((e) => t.includes((0, r.iy)(e.id, (0, r.tc)(e))));
          return (null == n ? void 0 : n.length)
            ? Promise.resolve(n[0])
            : Promise.reject('not found');
        }
        static async getKeywords(e, t) {
          return this.axios(h).get('/'.concat(t, '/').concat(e, '/keywords'));
        }
        static async getSeasons(e, t) {
          return this.axios(h).get('/tv/'.concat(e, '/season/').concat(t));
        }
        static async getTvExternalIds(e) {
          return this.axios(h).get('/tv/'.concat(e, '/external_ids'));
        }
        static urlBuilder(e) {
          var t, n, r, o, a, i, s;
          switch (e.requestType) {
            case l.ANIME_LATEST:
              return '/discover/'.concat(
                e.mediaType,
                '?with_keywords=210024%2C&language=en-US&sort_by=primary_release_date.desc&release_date.lte=2024-11-10&with_runtime.gte=1',
              );
            case l.ANIME_TRENDING:
              return '/discover/'.concat(
                e.mediaType,
                '?with_keywords=210024%2C&language=en-US&sort_by=popularity.desc&release_date.lte=2024-11-10&with_runtime.gte=1',
              );
            case l.ANIME_TOP_RATED:
              return '/discover/'.concat(
                e.mediaType,
                '?with_keywords=210024%2C&language=en-US&sort_by=vote_count.desc&air_date.lte=2024-11-10',
              );
            case l.ANIME_NETFLIX:
              return '/discover/'.concat(
                e.mediaType,
                '?with_keywords=210024%2C&with_networks=213&language=en-US',
              );
            case l.TRENDING:
              return '/trending/'
                .concat(
                  e.mediaType,
                  '/day?language=en-US&with_original_language=en&page=',
                )
                .concat(null != (t = e.page) ? t : 1);
            case l.TOP_RATED:
              return '/'
                .concat(e.mediaType, '/top_rated?page=')
                .concat(
                  null != (n = e.page) ? n : 1,
                  '&with_original_language=en&language=en-US',
                );
            case l.NETFLIX:
              return '/discover/'
                .concat(
                  e.mediaType,
                  '?with_networks=213&with_original_language=en&language=en-US&page=',
                )
                .concat(null != (r = e.page) ? r : 1);
            case l.POPULAR:
              return '/'
                .concat(
                  e.mediaType,
                  '/popular?language=en-US&with_original_language=en&page=',
                )
                .concat(null != (o = e.page) ? o : 1, '&without_genres=')
                .concat(c.TALK, ',')
                .concat(c.NEWS);
            case l.GENRE:
              return '/discover/'
                .concat(e.mediaType, '?with_genres=')
                .concat(
                  e.genre,
                  '&language=en-US&with_original_language=en&page=',
                )
                .concat(null != (a = e.page) ? a : 1, '&without_genres=')
                .concat(c.TALK, ',')
                .concat(c.NEWS);
            case l.ANIME_GENRE:
              return '/discover/'
                .concat(e.mediaType, '?with_genres=')
                .concat(
                  e.genre,
                  '&with_keywords=210024%2C&language=en-US&with_original_language=en&page=',
                )
                .concat(null != (i = e.page) ? i : 1, '&without_genres=')
                .concat(c.TALK, ',')
                .concat(c.NEWS);
            case l.KOREAN:
              return '/discover/'
                .concat(e.mediaType, '?with_genres=')
                .concat(
                  e.genre,
                  '&with_original_language=ko&language=en-US&page=',
                )
                .concat(null != (s = e.page) ? s : 1);
            default:
              throw Error(
                'request type '.concat(
                  e.requestType,
                  ' is not implemented yet',
                ),
              );
          }
        }
        static executeRequest(e) {
          return this.axios(h).get(this.urlBuilder(e));
        }
      }
      ((_.findMovie = (0, u.cache)(async (e) =>
        _.axios(h).get('/movie/'.concat(e, '?append_to_response=keywords')),
      )),
        (_.findTvSeries = (0, u.cache)(async (e) =>
          _.axios(h).get('/tv/'.concat(e, '?append_to_response=keywords')),
        )),
        (_.findMovieByIdAndType = (0, u.cache)(async (e, t) =>
          Promise.resolve(
            (
              await _.axios(h).get('/'.concat(t, '/').concat(e), {
                params: {
                  language: 'en-US',
                  append_to_response: 'videos,keywords',
                },
              })
            ).data,
          ),
        )),
        (_.getShows = (0, u.cache)(async (e) => {
          let t = [],
            n = e.map((e) => _.executeRequest(e.req)),
            r = await Promise.allSettled(n);
          for (let n = 0; n < e.length; n++) {
            let o = r[n];
            if (_.isRejected(o))
              (console.warn(
                'Failed to fetch shows '.concat(e[n].title),
                o.reason,
              ),
                t.push({
                  title: e[n].title,
                  shows: [],
                  visible: e[n].visible,
                }));
            else if (_.isFulfilled(o))
              (d.indexOf(e[n].req.requestType) > -1 &&
                o.value.data.results.forEach(
                  (t) => (t.media_type = e[n].req.mediaType),
                ),
                t.push({
                  title: e[n].title,
                  shows: o.value.data.results,
                  visible: e[n].visible,
                }));
            else throw Error('unexpected response');
          }
          return t;
        })),
        (_.searchMovies = (0, u.cache)(async (e, t) => {
          let { data: n } = await _.axios(h).get(
            '/search/multi?query='
              .concat(encodeURIComponent(e), '&language=en-US&page=')
              .concat(null != t ? t : 1),
          );
          return (n.results.sort((e, t) => t.popularity - e.popularity), n);
        })));
      let g = _;
    },
    4269: (e, t, n) => {
      let r;
      n.d(t, {
        Cp: () => d,
        Ht: () => g,
        L$: () => I,
        WM: () => h,
        _A: () => w,
        a3: () => v,
        cn: () => u,
        iP: () => p,
        iy: () => _,
        sg: () => T,
        tc: () => E,
      });
      var o = n(7435),
        a = n(1424),
        i = n(1692);
      n(8566);
      var s = n(2821),
        l = n(2115),
        c = n(5889);
      function u() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
          t[n] = arguments[n];
        return (0, c.QP)((0, s.$)(t));
      }
      function d(e) {
        return new Date(e).getFullYear();
      }
      function h(e) {
        var t;
        return window.location.search &&
          null != (t = new URLSearchParams(window.location.search).get(e))
          ? t
          : '';
      }
      function _(e, t) {
        return ''
          .concat(
            t
              .toLowerCase()
              .replace(
                /([^\x00-\x7F]|[&$\+,:;=\?@#\s<>\[\]\{\}|\\\^%])+/gm,
                '-',
              ),
            '-',
          )
          .concat(e);
      }
      function g(e) {
        let t = e.split('-').pop();
        return t ? parseInt(t) : 0;
      }
      function p() {
        let e = document.getElementById('search-input');
        (e.blur(), (e.value = ''), (e.defaultValue = ''));
      }
      function E(e) {
        var t, n;
        return null !=
          (n =
            null != (t = null == e ? void 0 : e.name)
              ? t
              : null == e
                ? void 0
                : e.title)
          ? n
          : '';
      }
      function T(e, t) {
        return function () {
          for (var n = arguments.length, o = Array(n), a = 0; a < n; a++)
            o[a] = arguments[a];
          (clearTimeout(r),
            (r = setTimeout(() => {
              e(...o);
            }, t)));
        };
      }
      function v(e) {
        let t = () => !!e.match(/Android/i),
          n = () => !!e.match(/iPhone|iPad|iPod/i),
          r = () => !!e.match(/SSR/i),
          o = () =>
            !!(t() || n() || e.match(/Opera Mini/i) || e.match(/IEMobile/i));
        return {
          isMobile: o,
          isDesktop: () => !!(!o() && !r()),
          isAndroid: t,
          isIos: n,
          isSSR: r,
        };
      }
      function w() {
        let e = document.getElementById('search-btn');
        null != e && e.focus();
      }
      function I() {
        let e = document.getElementById('search-input');
        if (null != e) {
          let t = h('q');
          ((e.value = t),
            (e.defaultValue = t),
            e.setSelectionRange(t.length, t.length),
            e.focus());
        }
      }
      (0, l.cache)(async (e, t, n) => {
        var r, s, l, c, u, d;
        let h = g(e),
          _ = [],
          p = null;
        try {
          p = ('tv' === n ? await i.A.findTvSeries(h) : await i.A.findMovie(h))
            .data;
          let e = await i.A.getKeywords(h, n);
          _ = ('tv' === n ? e.data.results : e.data.keywords).map(
            (e) => e.name,
          );
        } catch (e) {
          console.error(e);
        }
        return {
          description: null == p ? void 0 : p.overview,
          title: E(p),
          keywords: [
            ..._,
            e.replace('-'.concat(h), ''),
            a._.NEXT_PUBLIC_SITE_NAME,
          ],
          openGraph: {
            type: 'website',
            locale: 'en_US',
            url: ''.concat(o.C.url, '/').concat(t, '/').concat(e),
            images: 'https://image.tmdb.org/t/p/original'.concat(
              null !=
                (s =
                  null != (r = null == p ? void 0 : p.backdrop_path)
                    ? r
                    : null == p
                      ? void 0
                      : p.poster_path)
                ? s
                : '',
            ),
            title: E(p),
            description: null != (l = null == p ? void 0 : p.overview) ? l : '',
            siteName: o.C.name,
          },
          twitter: {
            card: 'summary_large_image',
            title: E(p),
            description: null != (c = null == p ? void 0 : p.overview) ? c : '',
            images: 'https://image.tmdb.org/t/p/original'.concat(
              null !=
                (d =
                  null != (u = null == p ? void 0 : p.backdrop_path)
                    ? u
                    : null == p
                      ? void 0
                      : p.poster_path)
                ? d
                : '',
            ),
            creator: o.C.author,
          },
        };
      });
    },
    5141: (e, t, n) => {
      n.d(t, { F: () => w });
      var r = n(5155),
        o = n(4172),
        a = n(5626),
        i = n(368),
        s = n(7937),
        l = n(3327),
        c = n(6651),
        u = n(5921),
        d = n(3511),
        h = n(5130),
        _ = n(2068),
        g = n(69),
        p = n(2196),
        E = n(5229),
        T = n(7161),
        v = n(64);
      let w = {
        server: o.A,
        arrowLeft: a.A,
        chevronLeft: i.A,
        chevronRight: s.A,
        info: l.A,
        search: c.A,
        logo: u.A,
        play: u.A,
        pause: d.A,
        volume: h.A,
        volumeMute: _.A,
        nextjs: (e) =>
          (0, r.jsx)('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 24 24',
            ...e,
            children: (0, r.jsx)('path', {
              fill: 'currentColor',
              d: 'M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z',
            }),
          }),
        gitHub: (e) =>
          (0, r.jsx)('svg', {
            viewBox: '0 0 438.549 438.549',
            ...e,
            children: (0, r.jsx)('path', {
              fill: 'currentColor',
              d: 'M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z',
            }),
          }),
        google: (e) => {
          let { ...t } = e;
          return (0, r.jsx)('svg', {
            role: 'img',
            viewBox: '0 0 24 24',
            ...t,
            children: (0, r.jsx)('path', {
              fill: 'currentColor',
              d: 'M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z',
            }),
          });
        },
        twitter: (e) =>
          (0, r.jsx)('svg', {
            stroke: 'currentColor',
            fill: 'none',
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 24 24',
            ...e,
            children: (0, r.jsx)('path', {
              fill: 'currentColor',
              d: 'M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148a13.98 13.98 0 0 0 10.15 5.144 4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z',
            }),
          }),
        facebook: (e) => {
          let { ...t } = e;
          return (0, r.jsx)('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 320 512',
            ...t,
            children: (0, r.jsx)('path', {
              fill: 'currentColor',
              d: 'M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z',
            }),
          });
        },
        discord: (e) => {
          let { ...t } = e;
          return (0, r.jsx)('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 640 512',
            ...t,
            children: (0, r.jsx)('path', {
              fill: 'currentColor',
              d: 'M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z',
            }),
          });
        },
        spinner: (e) =>
          (0, r.jsx)('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            ...e,
            children: (0, r.jsx)('path', { d: 'M21 12a9 9 0 1 1-6.219-8.56' }),
          }),
        cart: (e) =>
          (0, r.jsxs)('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            ...e,
            children: [
              (0, r.jsx)('circle', { cx: '8', cy: '21', r: '1' }),
              (0, r.jsx)('circle', { cx: '19', cy: '21', r: '1' }),
              (0, r.jsx)('path', {
                d: 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12',
              }),
            ],
          }),
        product: (e) =>
          (0, r.jsxs)('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            ...e,
            children: [
              (0, r.jsx)('path', {
                d: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z',
              }),
              (0, r.jsx)('path', { d: 'M3 6h18' }),
              (0, r.jsx)('path', { d: 'M16 10a4 4 0 0 1-8 0' }),
            ],
          }),
        store: (e) =>
          (0, r.jsxs)('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            ...e,
            children: [
              (0, r.jsx)('path', {
                d: 'm2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7',
              }),
              (0, r.jsx)('path', {
                d: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8',
              }),
              (0, r.jsx)('path', {
                d: 'M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4',
              }),
              (0, r.jsx)('path', { d: 'M2 7h20' }),
              (0, r.jsx)('path', {
                d: 'M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7',
              }),
            ],
          }),
        credit: (e) =>
          (0, r.jsxs)('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            ...e,
            children: [
              (0, r.jsx)('rect', {
                width: '20',
                height: '14',
                x: '2',
                y: '5',
                rx: '2',
              }),
              (0, r.jsx)('line', { x1: '2', x2: '22', y1: '10', y2: '10' }),
            ],
          }),
        dollarSign: (e) =>
          (0, r.jsxs)('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            ...e,
            children: [
              (0, r.jsx)('line', { x1: '12', x2: '12', y1: '2', y2: '22' }),
              (0, r.jsx)('path', {
                d: 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
              }),
            ],
          }),
        bot: (e) =>
          (0, r.jsxs)('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            ...e,
            children: [
              (0, r.jsx)('path', { d: 'M12 8V4H8' }),
              (0, r.jsx)('rect', {
                width: '16',
                height: '12',
                x: '4',
                y: '8',
                rx: '2',
              }),
              (0, r.jsx)('path', { d: 'M2 14h2' }),
              (0, r.jsx)('path', { d: 'M20 14h2' }),
              (0, r.jsx)('path', { d: 'M15 13v2' }),
              (0, r.jsx)('path', { d: 'M9 13v2' }),
            ],
          }),
        shirt: (e) =>
          (0, r.jsx)('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            ...e,
            children: (0, r.jsx)('path', {
              d: 'M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z',
            }),
          }),
        footprints: (e) =>
          (0, r.jsxs)('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 24 24',
            fill: 'none',
            stroke: 'currentColor',
            strokeWidth: '2',
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            ...e,
            children: [
              (0, r.jsx)('path', {
                d: 'M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z',
              }),
              (0, r.jsx)('path', {
                d: 'M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z',
              }),
              (0, r.jsx)('path', { d: 'M16 17h4' }),
              (0, r.jsx)('path', { d: 'M4 13h4' }),
            ],
          }),
        avatar: g.A,
        placeholder: p.A,
        close: E.A,
        instagram: T.A,
        youtube: v.A,
      };
    },
    7435: (e, t, n) => {
      n.d(t, { C: () => a });
      var r = n(5141),
        o = n(1424);
      let a = {
        name: o._.NEXT_PUBLIC_SITE_NAME,
        author: o._.NEXT_PUBLIC_SITE_NAME,
        slogan: 'Watch TV Shows Online, Watch Movies Online.',
        description:
          'Watch movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.',
        keywords: [
          'watch movies',
          'movies online',
          'watch TV',
          'TV online',
          'TV shows online',
          'watch TV shows',
          'stream movies',
          'stream tv',
          'instant streaming',
          'watch online',
          'movies',
          'watch TV online',
          'no download',
          'full length movies',
          o._.NEXT_PUBLIC_SITE_NAME,
        ],
        url: o._.NEXT_PUBLIC_APP_URL,
        ogImage: ''.concat(o._.NEXT_PUBLIC_APP_URL, '/images/hero.jpg'),
        links: {
          twitter: ''.concat(o._.NEXT_PUBLIC_TWITTER),
          github: 'https://github.com/bitfreee/movie-web-kickstart',
          githubAccount: '',
        },
        socialLinks: [
          {
            title: 'Facebook',
            href: ''.concat(o._.NEXT_PUBLIC_FACEBOOK),
            icon: r.F.facebook,
          },
          {
            title: 'Instagram',
            href: ''.concat(o._.NEXT_PUBLIC_INSTAGRAM),
            icon: r.F.instagram,
          },
          {
            title: 'Twitter',
            href: ''.concat(o._.NEXT_PUBLIC_TWITTER),
            icon: r.F.twitter,
          },
          {
            title: 'Youtube',
            href: ''.concat(o._.NEXT_PUBLIC_YOUTUBE),
            icon: r.F.youtube,
          },
        ],
        footerItems: [
          { title: 'Audio Description', href: '/' },
          { title: 'Help Center', href: '/' },
          { title: 'Gift Cards', href: '/' },
          { title: 'Media Center', href: '/' },
          { title: 'Investor Relations', href: '/' },
          { title: 'Jobs', href: '/' },
          { title: 'Terms of Use', href: '/terms-of-use' },
          { title: 'Privacy', href: '/' },
          { title: 'Legal Notices', href: '/' },
          { title: 'Cookie Preferences', href: '/' },
          { title: 'Corporate Information', href: '/' },
          { title: 'Contact Us', href: '/' },
        ],
        mainNav: [
          { title: 'Home', href: '/home' },
          { title: 'TV Shows', href: '/tv-shows' },
          { title: 'Movies', href: '/movies' },
          { title: 'Anime', href: '/anime' },
          { title: 'New & Popular', href: '/new-and-popular' },
        ],
      };
    },
    8566: (e, t, n) => {
      n.d(t, { z: () => r });
      var r = (function (e) {
        return (
          (e.ALL = 'all'),
          (e.TV = 'tv'),
          (e.MOVIE = 'movie'),
          (e.ANIME = 'anime'),
          e
        );
      })({});
    },
  },
]);
