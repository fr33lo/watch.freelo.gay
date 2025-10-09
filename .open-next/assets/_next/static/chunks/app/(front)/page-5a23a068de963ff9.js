(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [179],
  {
    2760: (e, t, s) => {
      (Promise.resolve().then(s.t.bind(s, 2619, 23)),
        Promise.resolve().then(s.bind(s, 9514)));
    },
    9514: (e, t, s) => {
      'use strict';
      s.d(t, { default: () => c });
      var n = s(5155),
        a = s(2115);
      function c(e) {
        let {
            text: t,
            speed: s = 50,
            delay: c = 0,
            cursor: r = !0,
            onComplete: i,
            className: l = '',
          } = e,
          [u, o] = (0, a.useState)(''),
          [f, m] = (0, a.useState)(0),
          [h, p] = (0, a.useState)(!0);
        return (
          (0, a.useEffect)(() => {
            if (c > 0) {
              let e = setTimeout(() => {
                m(0);
              }, c);
              return () => clearTimeout(e);
            }
          }, [c]),
          (0, a.useEffect)(() => {
            if (f < t.length) {
              let e = setTimeout(() => {
                (o(t.slice(0, f + 1)), m(f + 1));
              }, s);
              return () => clearTimeout(e);
            }
            i && i();
          }, [f, t, s, i]),
          (0, a.useEffect)(() => {
            if (r) {
              let e = setInterval(() => {
                p((e) => !e);
              }, 500);
              return () => clearInterval(e);
            }
          }, [r]),
          (0, n.jsxs)('span', {
            className: 'font-terminal '.concat(l),
            children: [
              u,
              r &&
                f <= t.length &&
                (0, n.jsx)('span', {
                  className: 'text-terminal-accent '.concat(
                    h ? 'opacity-100' : 'opacity-0',
                    ' transition-opacity',
                  ),
                  children: '▋',
                }),
            ],
          })
        );
      }
    },
  },
  (e) => {
    (e.O(0, [619, 441, 255, 358], () => e((e.s = 2760))), (_N_E = e.O()));
  },
]);
