(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [647],
  {
    5939: (e, s, t) => {
      'use strict';
      t.d(s, { default: () => i });
      var u = t(5155),
        r = t(2115),
        o = t(7699),
        l = t(8563),
        n = t(4269);
      let i = function (e) {
        let { shows: s, query: t } = e,
          i = (0, l.j)();
        return (
          r.useEffect(() => {
            (i.setOpen(!0), i.setQuery(t), i.setShows(s));
            let e = setTimeout(() => {
                (0, n._A)();
              }, 5),
              u = setTimeout(() => {
                (0, n.L$)();
              }, 10);
            return () => {
              (clearTimeout(e), clearTimeout(u));
            };
          }, [t, s, i]),
          (0, u.jsx)(o.A, { shows: i.shows, query: i.query })
        );
      };
    },
    7964: (e, s, t) => {
      Promise.resolve().then(t.bind(t, 5939));
    },
  },
  (e) => {
    (e.O(0, [360, 619, 951, 416, 699, 441, 255, 358], () => e((e.s = 7964))),
      (_N_E = e.O()));
  },
]);
