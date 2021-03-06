function _() {}
function H(t, n) {
  for (const e in n) t[e] = n[e];
  return t;
}
function q(t) {
  return t();
}
function M() {
  return Object.create(null);
}
function m(t) {
  t.forEach(q);
}
function I(t) {
  return typeof t == "function";
}
function P(t, n) {
  return t != t
    ? n == n
    : t !== n || (t && typeof t == "object") || typeof t == "function";
}
function G(t) {
  return Object.keys(t).length === 0;
}
function L(t, ...n) {
  if (t == null) return _;
  const e = t.subscribe(...n);
  return e.unsubscribe ? () => e.unsubscribe() : e;
}
function lt(t) {
  let n;
  return L(t, (e) => (n = e))(), n;
}
function st(t, n, e) {
  t.$$.on_destroy.push(L(n, e));
}
function ft(t, n, e, i) {
  if (t) {
    const c = T(t, n, e, i);
    return t[0](c);
  }
}
function T(t, n, e, i) {
  return t[1] && i ? H(e.ctx.slice(), t[1](i(n))) : e.ctx;
}
function at(t, n, e, i) {
  if (t[2] && i) {
    const c = t[2](i(e));
    if (n.dirty === void 0) return c;
    if (typeof c == "object") {
      const s = [],
        o = Math.max(n.dirty.length, c.length);
      for (let u = 0; u < o; u += 1) s[u] = n.dirty[u] | c[u];
      return s;
    }
    return n.dirty | c;
  }
  return n.dirty;
}
function dt(t, n, e, i, c, s) {
  if (c) {
    const o = T(n, e, i, s);
    t.p(o, c);
  }
}
function _t(t) {
  if (t.ctx.length > 32) {
    const n = [],
      e = t.ctx.length / 32;
    for (let i = 0; i < e; i++) n[i] = -1;
    return n;
  }
  return -1;
}
function ht(t) {
  return t == null ? "" : t;
}
let x = !1;
function J() {
  x = !0;
}
function K() {
  x = !1;
}
function Q(t, n, e, i) {
  for (; t < n; ) {
    const c = t + ((n - t) >> 1);
    e(c) <= i ? (t = c + 1) : (n = c);
  }
  return t;
}
function R(t) {
  if (t.hydrate_init) return;
  t.hydrate_init = !0;
  let n = t.childNodes;
  if (t.nodeName === "HEAD") {
    const r = [];
    for (let l = 0; l < n.length; l++) {
      const a = n[l];
      a.claim_order !== void 0 && r.push(a);
    }
    n = r;
  }
  const e = new Int32Array(n.length + 1),
    i = new Int32Array(n.length);
  e[0] = -1;
  let c = 0;
  for (let r = 0; r < n.length; r++) {
    const l = n[r].claim_order,
      a =
        (c > 0 && n[e[c]].claim_order <= l
          ? c + 1
          : Q(1, c, (b) => n[e[b]].claim_order, l)) - 1;
    i[r] = e[a] + 1;
    const f = a + 1;
    (e[f] = r), (c = Math.max(f, c));
  }
  const s = [],
    o = [];
  let u = n.length - 1;
  for (let r = e[c] + 1; r != 0; r = i[r - 1]) {
    for (s.push(n[r - 1]); u >= r; u--) o.push(n[u]);
    u--;
  }
  for (; u >= 0; u--) o.push(n[u]);
  s.reverse(), o.sort((r, l) => r.claim_order - l.claim_order);
  for (let r = 0, l = 0; r < o.length; r++) {
    for (; l < s.length && o[r].claim_order >= s[l].claim_order; ) l++;
    const a = l < s.length ? s[l] : null;
    t.insertBefore(o[r], a);
  }
}
function W(t, n) {
  if (x) {
    for (
      R(t),
        (t.actual_end_child === void 0 ||
          (t.actual_end_child !== null &&
            t.actual_end_child.parentElement !== t)) &&
          (t.actual_end_child = t.firstChild);
      t.actual_end_child !== null && t.actual_end_child.claim_order === void 0;

    )
      t.actual_end_child = t.actual_end_child.nextSibling;
    n !== t.actual_end_child
      ? (n.claim_order !== void 0 || n.parentNode !== t) &&
        t.insertBefore(n, t.actual_end_child)
      : (t.actual_end_child = n.nextSibling);
  } else (n.parentNode !== t || n.nextSibling !== null) && t.appendChild(n);
}
function mt(t, n, e) {
  x && !e
    ? W(t, n)
    : (n.parentNode !== t || n.nextSibling != e) &&
      t.insertBefore(n, e || null);
}
function U(t) {
  t.parentNode.removeChild(t);
}
function pt(t, n) {
  for (let e = 0; e < t.length; e += 1) t[e] && t[e].d(n);
}
function V(t) {
  return document.createElement(t);
}
function X(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function k(t) {
  return document.createTextNode(t);
}
function yt() {
  return k(" ");
}
function gt() {
  return k("");
}
function bt(t, n, e, i) {
  return t.addEventListener(n, e, i), () => t.removeEventListener(n, e, i);
}
function xt(t, n, e) {
  e == null
    ? t.removeAttribute(n)
    : t.getAttribute(n) !== e && t.setAttribute(n, e);
}
function Y(t) {
  return Array.from(t.childNodes);
}
function Z(t) {
  t.claim_info === void 0 &&
    (t.claim_info = { last_index: 0, total_claimed: 0 });
}
function z(t, n, e, i, c = !1) {
  Z(t);
  const s = (() => {
    for (let o = t.claim_info.last_index; o < t.length; o++) {
      const u = t[o];
      if (n(u)) {
        const r = e(u);
        return (
          r === void 0 ? t.splice(o, 1) : (t[o] = r),
          c || (t.claim_info.last_index = o),
          u
        );
      }
    }
    for (let o = t.claim_info.last_index - 1; o >= 0; o--) {
      const u = t[o];
      if (n(u)) {
        const r = e(u);
        return (
          r === void 0 ? t.splice(o, 1) : (t[o] = r),
          c
            ? r === void 0 && t.claim_info.last_index--
            : (t.claim_info.last_index = o),
          u
        );
      }
    }
    return i();
  })();
  return (
    (s.claim_order = t.claim_info.total_claimed),
    (t.claim_info.total_claimed += 1),
    s
  );
}
function B(t, n, e, i) {
  return z(
    t,
    (c) => c.nodeName === n,
    (c) => {
      const s = [];
      for (let o = 0; o < c.attributes.length; o++) {
        const u = c.attributes[o];
        e[u.name] || s.push(u.name);
      }
      s.forEach((o) => c.removeAttribute(o));
    },
    () => i(n)
  );
}
function $t(t, n, e) {
  return B(t, n, e, V);
}
function wt(t, n, e) {
  return B(t, n, e, X);
}
function tt(t, n) {
  return z(
    t,
    (e) => e.nodeType === 3,
    (e) => {
      const i = "" + n;
      if (e.data.startsWith(i)) {
        if (e.data.length !== i.length) return e.splitText(i.length);
      } else e.data = i;
    },
    () => k(n),
    !0
  );
}
function Et(t) {
  return tt(t, " ");
}
function St(t, n) {
  (n = "" + n), t.wholeText !== n && (t.data = n);
}
function kt(t, n, e) {
  t.classList[e ? "add" : "remove"](n);
}
function At(t, n = document.body) {
  return Array.from(n.querySelectorAll(t));
}
let p;
function y(t) {
  p = t;
}
function $() {
  if (!p) throw new Error("Function called outside component initialization");
  return p;
}
function Nt(t) {
  $().$$.on_mount.push(t);
}
function jt(t) {
  $().$$.after_update.push(t);
}
function vt(t, n) {
  $().$$.context.set(t, n);
}
function Ct(t) {
  return $().$$.context.get(t);
}
const g = [],
  O = [],
  w = [],
  D = [],
  nt = Promise.resolve();
let A = !1;
function et() {
  A || ((A = !0), nt.then(F));
}
function N(t) {
  w.push(t);
}
const j = new Set();
let E = 0;
function F() {
  const t = p;
  do {
    for (; E < g.length; ) {
      const n = g[E];
      E++, y(n), it(n.$$);
    }
    for (y(null), g.length = 0, E = 0; O.length; ) O.pop()();
    for (let n = 0; n < w.length; n += 1) {
      const e = w[n];
      j.has(e) || (j.add(e), e());
    }
    w.length = 0;
  } while (g.length);
  for (; D.length; ) D.pop()();
  (A = !1), j.clear(), y(t);
}
function it(t) {
  if (t.fragment !== null) {
    t.update(), m(t.before_update);
    const n = t.dirty;
    (t.dirty = [-1]),
      t.fragment && t.fragment.p(t.ctx, n),
      t.after_update.forEach(N);
  }
}
const S = new Set();
let d;
function qt() {
  d = { r: 0, c: [], p: d };
}
function Mt() {
  d.r || m(d.c), (d = d.p);
}
function rt(t, n) {
  t && t.i && (S.delete(t), t.i(n));
}
function Lt(t, n, e, i) {
  if (t && t.o) {
    if (S.has(t)) return;
    S.add(t),
      d.c.push(() => {
        S.delete(t), i && (e && t.d(1), i());
      }),
      t.o(n);
  }
}
function Tt(t, n) {
  const e = {},
    i = {},
    c = { $$scope: 1 };
  let s = t.length;
  for (; s--; ) {
    const o = t[s],
      u = n[s];
    if (u) {
      for (const r in o) r in u || (i[r] = 1);
      for (const r in u) c[r] || ((e[r] = u[r]), (c[r] = 1));
      t[s] = u;
    } else for (const r in o) c[r] = 1;
  }
  for (const o in i) o in e || (e[o] = void 0);
  return e;
}
function zt(t) {
  return typeof t == "object" && t !== null ? t : {};
}
function Bt(t) {
  t && t.c();
}
function Ot(t, n) {
  t && t.l(n);
}
function ct(t, n, e, i) {
  const { fragment: c, on_mount: s, on_destroy: o, after_update: u } = t.$$;
  c && c.m(n, e),
    i ||
      N(() => {
        const r = s.map(q).filter(I);
        o ? o.push(...r) : m(r), (t.$$.on_mount = []);
      }),
    u.forEach(N);
}
function ot(t, n) {
  const e = t.$$;
  e.fragment !== null &&
    (m(e.on_destroy),
    e.fragment && e.fragment.d(n),
    (e.on_destroy = e.fragment = null),
    (e.ctx = []));
}
function ut(t, n) {
  t.$$.dirty[0] === -1 && (g.push(t), et(), t.$$.dirty.fill(0)),
    (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
}
function Dt(t, n, e, i, c, s, o, u = [-1]) {
  const r = p;
  y(t);
  const l = (t.$$ = {
    fragment: null,
    ctx: null,
    props: s,
    update: _,
    not_equal: c,
    bound: M(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(n.context || (r ? r.$$.context : [])),
    callbacks: M(),
    dirty: u,
    skip_bound: !1,
    root: n.target || r.$$.root,
  });
  o && o(l.root);
  let a = !1;
  if (
    ((l.ctx = e
      ? e(t, n.props || {}, (f, b, ...v) => {
          const C = v.length ? v[0] : b;
          return (
            l.ctx &&
              c(l.ctx[f], (l.ctx[f] = C)) &&
              (!l.skip_bound && l.bound[f] && l.bound[f](C), a && ut(t, f)),
            b
          );
        })
      : []),
    l.update(),
    (a = !0),
    m(l.before_update),
    (l.fragment = i ? i(l.ctx) : !1),
    n.target)
  ) {
    if (n.hydrate) {
      J();
      const f = Y(n.target);
      l.fragment && l.fragment.l(f), f.forEach(U);
    } else l.fragment && l.fragment.c();
    n.intro && rt(t.$$.fragment),
      ct(t, n.target, n.anchor, n.customElement),
      K(),
      F();
  }
  y(r);
}
class Ft {
  $destroy() {
    ot(this, 1), (this.$destroy = _);
  }
  $on(n, e) {
    const i = this.$$.callbacks[n] || (this.$$.callbacks[n] = []);
    return (
      i.push(e),
      () => {
        const c = i.indexOf(e);
        c !== -1 && i.splice(c, 1);
      }
    );
  }
  $set(n) {
    this.$$set &&
      !G(n) &&
      ((this.$$.skip_bound = !0), this.$$set(n), (this.$$.skip_bound = !1));
  }
}
const h = [];
function Ht(t, n = _) {
  let e;
  const i = new Set();
  function c(u) {
    if (P(t, u) && ((t = u), e)) {
      const r = !h.length;
      for (const l of i) l[1](), h.push(l, t);
      if (r) {
        for (let l = 0; l < h.length; l += 2) h[l][0](h[l + 1]);
        h.length = 0;
      }
    }
  }
  function s(u) {
    c(u(t));
  }
  function o(u, r = _) {
    const l = [u, r];
    return (
      i.add(l),
      i.size === 1 && (e = n(c) || _),
      u(t),
      () => {
        i.delete(l), i.size === 0 && (e(), (e = null));
      }
    );
  }
  return { set: c, update: s, subscribe: o };
}
export {
  Nt as A,
  H as B,
  Ht as C,
  Ct as D,
  X as E,
  wt as F,
  kt as G,
  W as H,
  _ as I,
  st as J,
  ft as K,
  dt as L,
  _t as M,
  at as N,
  lt as O,
  ht as P,
  bt as Q,
  pt as R,
  Ft as S,
  At as T,
  Y as a,
  xt as b,
  $t as c,
  U as d,
  V as e,
  mt as f,
  tt as g,
  St as h,
  Dt as i,
  Bt as j,
  yt as k,
  gt as l,
  Ot as m,
  Et as n,
  ct as o,
  Tt as p,
  zt as q,
  qt as r,
  P as s,
  k as t,
  Lt as u,
  ot as v,
  Mt as w,
  rt as x,
  vt as y,
  jt as z,
};
