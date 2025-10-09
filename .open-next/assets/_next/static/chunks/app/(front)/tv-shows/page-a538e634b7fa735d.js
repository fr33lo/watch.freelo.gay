(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [28, 117, 215, 266, 551, 739, 897],
  {
    1541: (e, t, l) => {
      'use strict';
      l.d(t, { default: () => f });
      var s = l(5155),
        a = l(5141),
        i = l(3998),
        n = l(4269),
        o = l(1692),
        r = l(1956),
        d = l(8563),
        c = l(8566),
        u = l(2619),
        h = l.n(u),
        v = l(2115),
        m = l(4184),
        p = l(63);
      let f = (e) => {
        var t, l, u, f, x, w, b;
        let { randomShow: j } = e,
          y = (0, p.usePathname)(),
          g = (0, r.K)(),
          N = (0, d.j)(),
          k = v.useCallback(() => {
            let e = window.location.pathname;
            if (/\d/.test(e)) {
              if (/\d/.test(e)) {
                let t = (0, n.Ht)(e);
                if (!t) return;
                (e.includes('/tv-shows')
                  ? o.A.findTvSeries(t)
                  : o.A.findMovie(t)
                )
                  .then((e) => {
                    let { data: t } = e;
                    r.K.setState({ show: t, open: !0, play: !0 });
                  })
                  .catch((e) => {
                    console.error('findMovie: ', e);
                  });
              }
            } else g.reset();
          }, [g]);
        return (v.useEffect(
          () => (
            window.addEventListener('popstate', k, !1),
            () => {
              window.removeEventListener('popstate', k, !1);
            }
          ),
          [k],
        ),
        N.query.length > 0)
          ? null
          : (0, s.jsx)('section', {
              'aria-label': 'Hero',
              className: 'w-full',
              children:
                j &&
                (0, s.jsxs)(s.Fragment, {
                  children: [
                    (0, s.jsxs)('div', {
                      className:
                        'absolute inset-0 z-0 h-[100vw] w-full sm:h-[56.25vw]',
                      children: [
                        (0, s.jsx)(m.A, {
                          src: 'https://image.tmdb.org/t/p/original'.concat(
                            null !=
                              (l =
                                null !=
                                (t = null == j ? void 0 : j.backdrop_path)
                                  ? t
                                  : null == j
                                    ? void 0
                                    : j.poster_path)
                              ? l
                              : '',
                          ),
                          alt:
                            null != (u = null == j ? void 0 : j.title)
                              ? u
                              : 'poster',
                          className: '-z-40 h-auto w-full object-cover',
                          sizes:
                            '(max-width: 768px) 50vw, (max-width: 1200px) 100vw, 33vw',
                          fill: !0,
                          priority: !0,
                        }),
                        (0, s.jsx)('div', {
                          className: 'absolute bottom-0 left-0 right-0 top-0',
                          children: (0, s.jsxs)('div', {
                            className:
                              'absolute bottom-[35%] left-[4%] top-0 z-10 flex w-[36%] flex-col justify-end space-y-2',
                            children: [
                              (0, s.jsx)('h1', {
                                className: 'text-[3vw] font-bold',
                                children:
                                  null != (f = null == j ? void 0 : j.title)
                                    ? f
                                    : null == j
                                      ? void 0
                                      : j.name,
                              }),
                              (0, s.jsxs)('div', {
                                className:
                                  'flex space-x-2 text-[2vw] font-semibold md:text-[1.2vw]',
                                children: [
                                  (0, s.jsxs)('p', {
                                    className: 'text-green-600',
                                    children: [
                                      null !=
                                      (x = Math.round(
                                        (null == j ? void 0 : j.vote_average) *
                                          10,
                                      ))
                                        ? x
                                        : '-',
                                      '% Match',
                                    ],
                                  }),
                                  (0, s.jsx)('p', {
                                    children:
                                      null !=
                                      (w = null == j ? void 0 : j.release_date)
                                        ? w
                                        : '-',
                                  }),
                                ],
                              }),
                              (0, s.jsx)('p', {
                                className:
                                  'hidden text-[1.2vw] sm:line-clamp-3',
                                children:
                                  null != (b = null == j ? void 0 : j.overview)
                                    ? b
                                    : '-',
                              }),
                              (0, s.jsxs)('div', {
                                className:
                                  'mt-[1.5vw] flex items-center space-x-2',
                                children: [
                                  (0, s.jsx)(h(), {
                                    prefetch: !1,
                                    href: (() => {
                                      if (!j) return '#';
                                      if (!y.includes('/anime')) {
                                        let e =
                                          j.media_type === c.z.MOVIE
                                            ? 'movie'
                                            : 'tv';
                                        return '/watch/'
                                          .concat(e, '/')
                                          .concat(j.id);
                                      }
                                      let e =
                                          (null == j
                                            ? void 0
                                            : j.media_type) === c.z.MOVIE
                                            ? 'm'
                                            : 't',
                                        t = ''.concat(e, '-').concat(j.id);
                                      return '/watch/anime/'.concat(t);
                                    })(),
                                    children: (0, s.jsxs)(i.$, {
                                      'aria-label': 'Play video',
                                      className:
                                        'h-auto flex-shrink-0 gap-2 rounded-xl',
                                      children: [
                                        (0, s.jsx)(a.F.play, {
                                          className: 'fill-current',
                                          'aria-hidden': 'true',
                                        }),
                                        'Play',
                                      ],
                                    }),
                                  }),
                                  (0, s.jsxs)(i.$, {
                                    'aria-label': "Open show's details modal",
                                    variant: 'outline',
                                    className:
                                      'h-auto flex-shrink-0 gap-2 rounded-xl',
                                    onClick: () => {
                                      let e = (0, n.tc)(j),
                                        t =
                                          j.media_type === c.z.TV
                                            ? 'tv-shows'
                                            : 'movies';
                                      (window.history.pushState(
                                        null,
                                        '',
                                        ''
                                          .concat(t, '/')
                                          .concat((0, n.iy)(j.id, e)),
                                      ),
                                        r.K.setState({
                                          show: j,
                                          open: !0,
                                          play: !0,
                                        }));
                                    },
                                    children: [
                                      (0, s.jsx)(a.F.info, {
                                        'aria-hidden': 'true',
                                      }),
                                      'More Info',
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                        ' ',
                        (0, s.jsx)('div', {
                          className:
                            'opacity-71 absolute inset-0 right-[26.09%] z-[8] bg-gradient-to-r from-secondary to-85%',
                        }),
                        (0, s.jsx)('div', {
                          className:
                            'absolute bottom-[-1px] left-0 right-0 z-[8] h-[14.7vw] bg-gradient-to-b from-background/0 from-30% via-background/30 via-50% to-background to-80%',
                        }),
                      ],
                    }),
                    (0, s.jsx)('div', {
                      className:
                        'relative inset-0 -z-50 mb-5 pb-[60%] sm:pb-[40%]',
                    }),
                  ],
                }),
            });
      };
    },
    2215: (e, t, l) => {
      (Promise.resolve().then(l.bind(l, 1541)),
        Promise.resolve().then(l.bind(l, 9759)));
    },
    9759: (e, t, l) => {
      'use strict';
      l.d(t, { default: () => v });
      var s = l(5155),
        a = l(63),
        i = l(8563),
        n = l(4269),
        o = l(3248),
        r = l(8844),
        d = l(7699),
        c = l(1956),
        u = l(2115),
        h = l(1692);
      let v = (e) => {
        let { shows: t } = e,
          l = (0, a.usePathname)(),
          v = (0, c.K)(),
          m = (0, i.j)(),
          p = u.useCallback(async () => {
            if (!/\d/.test(l) || v.open) return;
            let e = (0, n.Ht)(l);
            if (e)
              try {
                let t = (
                  l.includes('/tv-shows')
                    ? await h.A.findTvSeries(e)
                    : await h.A.findMovie(e)
                ).data;
                t &&
                  c.K.setState({ show: t, open: !0, play: !0, firstLoad: !0 });
              } catch (e) {}
          }, [l, v.open]);
        return (u.useEffect(() => {
          p();
        }, [p]),
        m.query.length > 0)
          ? (0, s.jsx)(d.A, { shows: m.shows, query: m.query })
          : (0, s.jsxs)(s.Fragment, {
              children: [
                v.open && (0, s.jsx)(o.A, {}),
                t.map((e) => {
                  var t;
                  return (
                    e.visible &&
                    (0, s.jsx)(
                      r.A,
                      { title: e.title, shows: null != (t = e.shows) ? t : [] },
                      e.title,
                    )
                  );
                }),
              ],
            });
      };
    },
  },
  (e) => {
    (e.O(0, [360, 619, 951, 416, 699, 441, 255, 358], () => e((e.s = 2215))),
      (_N_E = e.O()));
  },
]);
