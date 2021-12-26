import {
  D as T,
  S as Z,
  i as q,
  s as G,
  e as g,
  E as I,
  k as L,
  t as k,
  c as $,
  a as p,
  F as M,
  d as l,
  n as H,
  g as x,
  b as s,
  G as j,
  f as B,
  H as n,
  I as J,
  J as U,
  K as V,
  j as Q,
  m as W,
  o as X,
  L as Y,
  M as ee,
  N as se,
  x as K,
  u as P,
  v as te,
} from "../chunks/vendor-812880e1.js";
const ae = () => {
    const o = T("__svelte__");
    return {
      page: { subscribe: o.page.subscribe },
      navigating: { subscribe: o.navigating.subscribe },
      get preloading() {
        return (
          console.error(
            "stores.preloading is deprecated; use stores.navigating instead"
          ),
          { subscribe: o.navigating.subscribe }
        );
      },
      session: o.session,
    };
  },
  re = {
    subscribe(o) {
      return ae().page.subscribe(o);
    },
  };
function le(o) {
  let t, c, a, u, h, v, b, f, y, w, _, m, i, e, r, z;
  return {
    c() {
      (t = g("header")),
        (c = g("nav")),
        (a = I("svg")),
        (u = I("path")),
        (h = L()),
        (v = g("ul")),
        (b = g("li")),
        (f = g("a")),
        (y = k("Home")),
        (w = L()),
        (_ = g("li")),
        (m = g("a")),
        (i = k("About")),
        (e = L()),
        (r = I("svg")),
        (z = I("path")),
        this.h();
    },
    l(d) {
      t = $(d, "HEADER", { class: !0 });
      var E = p(t);
      c = $(E, "NAV", { class: !0 });
      var A = p(c);
      a = M(A, "svg", { viewBox: !0, "aria-hidden": !0, class: !0 });
      var N = p(a);
      (u = M(N, "path", { d: !0, class: !0 })),
        p(u).forEach(l),
        N.forEach(l),
        (h = H(A)),
        (v = $(A, "UL", { class: !0 }));
      var C = p(v);
      b = $(C, "LI", { class: !0 });
      var S = p(b);
      f = $(S, "A", { "sveltekit:prefetch": !0, href: !0, class: !0 });
      var D = p(f);
      (y = x(D, "Home")),
        D.forEach(l),
        S.forEach(l),
        (w = H(C)),
        (_ = $(C, "LI", { class: !0 }));
      var F = p(_);
      m = $(F, "A", { "sveltekit:prefetch": !0, href: !0, class: !0 });
      var O = p(m);
      (i = x(O, "About")),
        O.forEach(l),
        F.forEach(l),
        C.forEach(l),
        (e = H(A)),
        (r = M(A, "svg", { viewBox: !0, "aria-hidden": !0, class: !0 }));
      var R = p(r);
      (z = M(R, "path", { d: !0, class: !0 })),
        p(z).forEach(l),
        R.forEach(l),
        A.forEach(l),
        E.forEach(l),
        this.h();
    },
    h() {
      s(u, "d", "M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"),
        s(u, "class", "svelte-1rbc0z9"),
        s(a, "viewBox", "0 0 2 3"),
        s(a, "aria-hidden", "true"),
        s(a, "class", "svelte-1rbc0z9"),
        s(f, "sveltekit:prefetch", ""),
        s(f, "href", "/"),
        s(f, "class", "svelte-1rbc0z9"),
        s(b, "class", "svelte-1rbc0z9"),
        j(b, "active", o[0].path === "/"),
        s(m, "sveltekit:prefetch", ""),
        s(m, "href", "/about"),
        s(m, "class", "svelte-1rbc0z9"),
        s(_, "class", "svelte-1rbc0z9"),
        j(_, "active", o[0].path === "/about"),
        s(v, "class", "svelte-1rbc0z9"),
        s(z, "d", "M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"),
        s(z, "class", "svelte-1rbc0z9"),
        s(r, "viewBox", "0 0 2 3"),
        s(r, "aria-hidden", "true"),
        s(r, "class", "svelte-1rbc0z9"),
        s(c, "class", "svelte-1rbc0z9"),
        s(t, "class", "svelte-1rbc0z9");
    },
    m(d, E) {
      B(d, t, E),
        n(t, c),
        n(c, a),
        n(a, u),
        n(c, h),
        n(c, v),
        n(v, b),
        n(b, f),
        n(f, y),
        n(v, w),
        n(v, _),
        n(_, m),
        n(m, i),
        n(c, e),
        n(c, r),
        n(r, z);
    },
    p(d, [E]) {
      E & 1 && j(b, "active", d[0].path === "/"),
        E & 1 && j(_, "active", d[0].path === "/about");
    },
    i: J,
    o: J,
    d(d) {
      d && l(t);
    },
  };
}
function ne(o, t, c) {
  let a;
  return U(o, re, (u) => c(0, (a = u))), [a];
}
class oe extends Z {
  constructor(t) {
    super();
    q(this, t, ne, le, G, {});
  }
}
function ce(o) {
  let t, c, a, u, h, v, b, f, y, w, _;
  t = new oe({});
  const m = o[1].default,
    i = V(m, o, o[0], null);
  return {
    c() {
      Q(t.$$.fragment),
        (c = L()),
        (a = g("main")),
        i && i.c(),
        (u = L()),
        (h = g("footer")),
        (v = g("p")),
        (b = k("visit ")),
        (f = g("a")),
        (y = k("my github")),
        (w = k(` to see more apps and
    games`)),
        this.h();
    },
    l(e) {
      W(t.$$.fragment, e), (c = H(e)), (a = $(e, "MAIN", { class: !0 }));
      var r = p(a);
      i && i.l(r),
        r.forEach(l),
        (u = H(e)),
        (h = $(e, "FOOTER", { class: !0 }));
      var z = p(h);
      v = $(z, "P", {});
      var d = p(v);
      (b = x(d, "visit ")), (f = $(d, "A", { href: !0, class: !0 }));
      var E = p(f);
      (y = x(E, "my github")),
        E.forEach(l),
        (w = x(
          d,
          ` to see more apps and
    games`
        )),
        d.forEach(l),
        z.forEach(l),
        this.h();
    },
    h() {
      s(a, "class", "svelte-1nw0d5b"),
        s(f, "href", "https://github.com/jnaudin"),
        s(f, "class", "svelte-1nw0d5b"),
        s(h, "class", "svelte-1nw0d5b");
    },
    m(e, r) {
      X(t, e, r),
        B(e, c, r),
        B(e, a, r),
        i && i.m(a, null),
        B(e, u, r),
        B(e, h, r),
        n(h, v),
        n(v, b),
        n(v, f),
        n(f, y),
        n(v, w),
        (_ = !0);
    },
    p(e, [r]) {
      i &&
        i.p &&
        (!_ || r & 1) &&
        Y(i, m, e, e[0], _ ? se(m, e[0], r, null) : ee(e[0]), null);
    },
    i(e) {
      _ || (K(t.$$.fragment, e), K(i, e), (_ = !0));
    },
    o(e) {
      P(t.$$.fragment, e), P(i, e), (_ = !1);
    },
    d(e) {
      te(t, e), e && l(c), e && l(a), i && i.d(e), e && l(u), e && l(h);
    },
  };
}
function ie(o, t, c) {
  let { $$slots: a = {}, $$scope: u } = t;
  return (
    (o.$$set = (h) => {
      "$$scope" in h && c(0, (u = h.$$scope));
    }),
    [u, a]
  );
}
class ve extends Z {
  constructor(t) {
    super();
    q(this, t, ie, ce, G, {});
  }
}
export { ve as default };
