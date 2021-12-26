import {
  S as Y,
  i as j,
  s as C,
  k as m,
  e as r,
  t as d,
  T as D,
  d as a,
  n as _,
  c,
  a as p,
  g as h,
  b as K,
  f as L,
  H as e,
  I as P,
} from "../chunks/vendor-812880e1.js";
const R = !0,
  V = !1;
function z(M) {
  let l, t, u, g, w, s, k, i, b, T, E, v, x, S, f, A;
  return {
    c() {
      (l = m()),
        (t = r("div")),
        (u = r("h1")),
        (g = d("About this app")),
        (w = m()),
        (s = r("p")),
        (k = d("This is a ")),
        (i = r("a")),
        (b = d("SvelteKit")),
        (T = d(` app. You can make your
    own by typing the following into your command line and following the prompts:`)),
        (E = m()),
        (v = r("pre")),
        (x = d("npm init svelte@next")),
        (S = m()),
        (f = r("p")),
        (A =
          d(`The page you're looking at is purely static HTML, with no client-side
    interactivity needed. Because of that, we don't need to load any JavaScript.
    Try viewing the page's source, or opening the devtools network panel and
    reloading.`)),
        this.h();
    },
    l(n) {
      D('[data-svelte="svelte-1myew8g"]', document.head).forEach(a),
        (l = _(n)),
        (t = c(n, "DIV", { class: !0 }));
      var o = p(t);
      u = c(o, "H1", {});
      var q = p(u);
      (g = h(q, "About this app")),
        q.forEach(a),
        (w = _(o)),
        (s = c(o, "P", {}));
      var y = p(s);
      (k = h(y, "This is a ")), (i = c(y, "A", { href: !0 }));
      var B = p(i);
      (b = h(B, "SvelteKit")),
        B.forEach(a),
        (T = h(
          y,
          ` app. You can make your
    own by typing the following into your command line and following the prompts:`
        )),
        y.forEach(a),
        (E = _(o)),
        (v = c(o, "PRE", {}));
      var I = p(v);
      (x = h(I, "npm init svelte@next")),
        I.forEach(a),
        (S = _(o)),
        (f = c(o, "P", {}));
      var J = p(f);
      (A = h(
        J,
        `The page you're looking at is purely static HTML, with no client-side
    interactivity needed. Because of that, we don't need to load any JavaScript.
    Try viewing the page's source, or opening the devtools network panel and
    reloading.`
      )),
        J.forEach(a),
        o.forEach(a),
        this.h();
    },
    h() {
      (document.title = "About"),
        K(i, "href", "https://kit.svelte.dev"),
        K(t, "class", "content svelte-10k3ssc");
    },
    m(n, H) {
      L(n, l, H),
        L(n, t, H),
        e(t, u),
        e(u, g),
        e(t, w),
        e(t, s),
        e(s, k),
        e(s, i),
        e(i, b),
        e(s, T),
        e(t, E),
        e(t, v),
        e(v, x),
        e(t, S),
        e(t, f),
        e(f, A);
    },
    p: P,
    i: P,
    o: P,
    d(n) {
      n && a(l), n && a(t);
    },
  };
}
const G = V,
  N = R,
  O = !0;
class Q extends Y {
  constructor(l) {
    super();
    j(this, l, null, z, C, {});
  }
}
export { Q as default, G as hydrate, O as prerender, N as router };
