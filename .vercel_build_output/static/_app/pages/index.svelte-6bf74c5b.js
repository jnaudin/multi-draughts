var pe = Object.defineProperty,
  ve = Object.defineProperties;
var me = Object.getOwnPropertyDescriptors;
var Z = Object.getOwnPropertySymbols;
var ge = Object.prototype.hasOwnProperty,
  be = Object.prototype.propertyIsEnumerable;
var x = (o, e, t) =>
    e in o
      ? pe(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t })
      : (o[e] = t),
  D = (o, e) => {
    for (var t in e || (e = {})) ge.call(e, t) && x(o, t, e[t]);
    if (Z) for (var t of Z(e)) be.call(e, t) && x(o, t, e[t]);
    return o;
  },
  K = (o, e) => ve(o, me(e));
import {
  C as R,
  O as b,
  S as J,
  i as V,
  s as G,
  e as y,
  c as w,
  a as P,
  d as _,
  b as h,
  P as C,
  f as S,
  Q as ee,
  I as q,
  k as L,
  n as N,
  H as B,
  x as k,
  j as O,
  m as Q,
  o as W,
  u as E,
  v as F,
  r as te,
  w as se,
  R as le,
  J as oe,
  t as U,
  g as X,
  h as ke,
} from "../chunks/vendor-812880e1.js";
const re = (o) => (o ? 8 : 10),
  ne = (o) => (o === "black" ? "white" : "black"),
  $e = () => {
    const { subscribe: o, set: e, update: t } = R("white");
    return { subscribe: o, set: e, update: t, change: () => t((r) => ne(r)) };
  },
  H = $e(),
  I = R(void 0),
  T = R([]),
  z = R(!1),
  ae = () =>
    new Array(re(!1))
      .fill(0)
      .map((o, e) =>
        new Array(re(!1))
          .fill(void 0)
          .map((t, n) =>
            (n + e) % 2
              ? { background: "white" }
              : e < 3
              ? { background: "black", piece: { color: "black", type: "pawn" } }
              : e > 6
              ? { background: "black", piece: { color: "white", type: "pawn" } }
              : { background: "black" }
          )
      ),
  ye = () => {
    const { subscribe: o, set: e, update: t } = R(ae()),
      n = () => e(ae()),
      r = (i, c, u, d) => {
        const p = b($)[i][c].piece;
        l(i, c, void 0), l(u, d, p);
      },
      a = (i, c) => l(i, c, void 0),
      s = (i, c, u = "lady") => {
        const d = b($)[i][c].piece;
        l(i, c, K(D({}, d), { type: u }));
      },
      l = (i, c, u) =>
        t((d) =>
          d.map((p, f) =>
            f === i
              ? p.map((v, A) =>
                  A === c && v.background === "black"
                    ? K(D({}, v), { piece: u })
                    : v
                )
              : p
          )
        );
    return {
      subscribe: o,
      set: e,
      update: t,
      movePiece: r,
      removePiece: a,
      reset: n,
      setPieceType: s,
      updateBox: l,
    };
  },
  $ = ye(),
  ie = !0,
  ce = (o, e = !1) => {
    if (!o) return [];
    const t = b($),
      { line: n, col: r } = o,
      a = t[n][r];
    if (!a.piece) return [];
    const s = a.piece.color === "black" ? 1 : -1,
      l = ne(a.piece.color),
      i = a.piece.type === "lady",
      c = (d, p = !1, f = [], v = n, A = r, j = !0) => {
        const g = p ? v - s : v + s,
          m = d === "left" ? A - 1 : A + 1;
        return e ||
          (p && !i) ||
          (!j && !i) ||
          g < 0 ||
          g > 9 ||
          m < 0 ||
          m > 9 ||
          !!t[g][m].piece
          ? f
          : c(
              d,
              p,
              [...f, { coord: { line: g, col: m }, type: "move" }],
              g,
              m,
              !1
            );
      },
      u = (d, p, f = n, v = r, A = !0) => {
        var Y;
        const j = d === "up" ? f - 1 : f + 1,
          g = p === "left" ? v - 1 : v + 1,
          m = d === "up" ? f - 2 : f + 2,
          M = p === "left" ? v - 2 : v + 2;
        return (!A && !i) ||
          M < 0 ||
          M > 9 ||
          m < 0 ||
          m > 9 ||
          (t[j][g].piece && t[m][M].piece)
          ? []
          : ((Y = t[j][g].piece) == null ? void 0 : Y.color) === l &&
            !t[m][M].piece
          ? [
              {
                coord: { line: m, col: M },
                type: "take",
                takeCoord: { line: j, col: g },
              },
            ]
          : u(d, p, j, g, !1);
      };
    return [
      ...c("left"),
      ...c("right"),
      ...c("left", ie),
      ...c("right", ie),
      ...u("down", "left"),
      ...u("down", "right"),
      ...u("up", "left"),
      ...u("up", "right"),
    ];
  },
  we = (o, e) => {
    var a;
    let t;
    I.subscribe((s) => {
      t = s;
    });
    const n =
        o === (t == null ? void 0 : t.line) &&
        e === (t == null ? void 0 : t.col),
      r = ((a = b($)[o][e].piece) == null ? void 0 : a.color) === b(H);
    !b(z) &&
      r &&
      (n && T.set(void 0),
      I.set(n ? void 0 : { line: o, col: e }),
      T.set(ce(t)));
  },
  Pe = (o, e) => {
    var a;
    const t = b(I),
      n = b(H),
      r =
        (a = b(T)) == null
          ? void 0
          : a.find((s) => s.coord.line === o && s.coord.col === e);
    if (t && r) {
      if (
        (z.set(!1),
        $.movePiece(t.line, t.col, o, e),
        ((o === 0 && n === "white") || (o === 9 && n === "black")) &&
          $.setPieceType(o, e, "lady"),
        r.type === "take")
      ) {
        $.removePiece(r.takeCoord.line, r.takeCoord.col);
        const s = ce({ line: o, col: e }, !0);
        s.length && (z.set(!0), I.set({ line: o, col: e }), T.set(s));
      }
      b(z) || (I.set(void 0), H.change(), T.set(void 0));
    }
  };
function ue(o) {
  let e, t, n, r, a;
  return {
    c() {
      (e = y("div")), this.h();
    },
    l(s) {
      (e = w(s, "DIV", { "data-testid": !0, class: !0 })),
        P(e).forEach(_),
        this.h();
    },
    h() {
      h(e, "data-testid", (t = `piece-${o[0]}-${o[1]}`)),
        h(
          e,
          "class",
          (n =
            "" +
            (C(`${o[3].type} piece-${o[2] ? "selected" : o[3].color}`) +
              " svelte-dcre72"))
        );
    },
    m(s, l) {
      S(s, e, l), r || ((a = ee(e, "click", o[8])), (r = !0));
    },
    p(s, l) {
      l & 3 && t !== (t = `piece-${s[0]}-${s[1]}`) && h(e, "data-testid", t),
        l & 12 &&
          n !==
            (n =
              "" +
              (C(`${s[3].type} piece-${s[2] ? "selected" : s[3].color}`) +
                " svelte-dcre72")) &&
          h(e, "class", n);
    },
    d(s) {
      s && _(e), (r = !1), a();
    },
  };
}
function Ce(o) {
  let e,
    t,
    n,
    r,
    a,
    s = o[3] && ue(o);
  return {
    c() {
      (e = y("div")), s && s.c(), this.h();
    },
    l(l) {
      e = w(l, "DIV", { "data-testid": !0, class: !0 });
      var i = P(e);
      s && s.l(i), i.forEach(_), this.h();
    },
    h() {
      h(e, "data-testid", (t = `box-${o[0]}-${o[1]}`)),
        h(
          e,
          "class",
          (n =
            "" +
            (C(`${o[4]} box${o[4] ? " possible" : ""}`) + " svelte-dcre72"))
        );
    },
    m(l, i) {
      S(l, e, i),
        s && s.m(e, null),
        r || ((a = ee(e, "click", o[9])), (r = !0));
    },
    p(l, [i]) {
      l[3]
        ? s
          ? s.p(l, i)
          : ((s = ue(l)), s.c(), s.m(e, null))
        : s && (s.d(1), (s = null)),
        i & 3 && t !== (t = `box-${l[0]}-${l[1]}`) && h(e, "data-testid", t),
        i & 16 &&
          n !==
            (n =
              "" +
              (C(`${l[4]} box${l[4] ? " possible" : ""}`) +
                " svelte-dcre72")) &&
          h(e, "class", n);
    },
    i: q,
    o: q,
    d(l) {
      l && _(e), s && s.d(), (r = !1), a();
    },
  };
}
function Se(o, e, t) {
  let { line: n } = e,
    { col: r } = e,
    a,
    s,
    l;
  $.subscribe((f) => {
    t(5, (a = f));
  }),
    I.subscribe((f) => {
      t(6, (s = f));
    }),
    T.subscribe((f) => {
      t(7, (l = f));
    });
  let i, c, u;
  const d = () => we(n, r),
    p = () => Pe(n, r);
  return (
    (o.$$set = (f) => {
      "line" in f && t(0, (n = f.line)), "col" in f && t(1, (r = f.col));
    }),
    (o.$$.update = () => {
      var f;
      o.$$.dirty & 67 &&
        t(
          2,
          (i =
            n === (s == null ? void 0 : s.line) &&
            r === (s == null ? void 0 : s.col))
        ),
        o.$$.dirty & 35 && t(3, (c = (f = a[n][r]) == null ? void 0 : f.piece)),
        o.$$.dirty & 131 &&
          t(
            4,
            (u = !!(l == null
              ? void 0
              : l.find((v) => v.coord.line === n && v.coord.col === r)))
          );
    }),
    [n, r, i, c, u, a, s, l, d, p]
  );
}
class Be extends J {
  constructor(e) {
    super();
    V(this, e, Se, Ce, G, { line: 0, col: 1 });
  }
}
function fe(o, e, t) {
  const n = o.slice();
  return (n[1] = e[t]), (n[3] = t), n;
}
function de(o, e, t) {
  const n = o.slice();
  return (n[4] = e[t]), (n[6] = t), n;
}
function he(o) {
  let e, t, n, r;
  return (
    (t = new Be({ props: { line: o[3], col: o[6] } })),
    {
      c() {
        (e = y("td")), O(t.$$.fragment), this.h();
      },
      l(a) {
        e = w(a, "TD", { "data-testid": !0, class: !0 });
        var s = P(e);
        Q(t.$$.fragment, s), s.forEach(_), this.h();
      },
      h() {
        h(e, "data-testid", "box-container"),
          h(e, "class", (n = "" + (C(o[4].background) + " svelte-1ca4vdi")));
      },
      m(a, s) {
        S(a, e, s), W(t, e, null), (r = !0);
      },
      p(a, s) {
        (!r ||
          (s & 1 &&
            n !== (n = "" + (C(a[4].background) + " svelte-1ca4vdi")))) &&
          h(e, "class", n);
      },
      i(a) {
        r || (k(t.$$.fragment, a), (r = !0));
      },
      o(a) {
        E(t.$$.fragment, a), (r = !1);
      },
      d(a) {
        a && _(e), F(t);
      },
    }
  );
}
function _e(o) {
  let e,
    t,
    n,
    r = o[1],
    a = [];
  for (let l = 0; l < r.length; l += 1) a[l] = he(de(o, r, l));
  const s = (l) =>
    E(a[l], 1, 1, () => {
      a[l] = null;
    });
  return {
    c() {
      e = y("tr");
      for (let l = 0; l < a.length; l += 1) a[l].c();
      t = L();
    },
    l(l) {
      e = w(l, "TR", {});
      var i = P(e);
      for (let c = 0; c < a.length; c += 1) a[c].l(i);
      (t = N(i)), i.forEach(_);
    },
    m(l, i) {
      S(l, e, i);
      for (let c = 0; c < a.length; c += 1) a[c].m(e, null);
      B(e, t), (n = !0);
    },
    p(l, i) {
      if (i & 1) {
        r = l[1];
        let c;
        for (c = 0; c < r.length; c += 1) {
          const u = de(l, r, c);
          a[c]
            ? (a[c].p(u, i), k(a[c], 1))
            : ((a[c] = he(u)), a[c].c(), k(a[c], 1), a[c].m(e, t));
        }
        for (te(), c = r.length; c < a.length; c += 1) s(c);
        se();
      }
    },
    i(l) {
      if (!n) {
        for (let i = 0; i < r.length; i += 1) k(a[i]);
        n = !0;
      }
    },
    o(l) {
      a = a.filter(Boolean);
      for (let i = 0; i < a.length; i += 1) E(a[i]);
      n = !1;
    },
    d(l) {
      l && _(e), le(a, l);
    },
  };
}
function Ee(o) {
  let e,
    t,
    n = o[0],
    r = [];
  for (let s = 0; s < n.length; s += 1) r[s] = _e(fe(o, n, s));
  const a = (s) =>
    E(r[s], 1, 1, () => {
      r[s] = null;
    });
  return {
    c() {
      e = y("table");
      for (let s = 0; s < r.length; s += 1) r[s].c();
      this.h();
    },
    l(s) {
      e = w(s, "TABLE", { class: !0 });
      var l = P(e);
      for (let i = 0; i < r.length; i += 1) r[i].l(l);
      l.forEach(_), this.h();
    },
    h() {
      h(e, "class", "svelte-1ca4vdi");
    },
    m(s, l) {
      S(s, e, l);
      for (let i = 0; i < r.length; i += 1) r[i].m(e, null);
      t = !0;
    },
    p(s, [l]) {
      if (l & 1) {
        n = s[0];
        let i;
        for (i = 0; i < n.length; i += 1) {
          const c = fe(s, n, i);
          r[i]
            ? (r[i].p(c, l), k(r[i], 1))
            : ((r[i] = _e(c)), r[i].c(), k(r[i], 1), r[i].m(e, null));
        }
        for (te(), i = n.length; i < r.length; i += 1) a(i);
        se();
      }
    },
    i(s) {
      if (!t) {
        for (let l = 0; l < n.length; l += 1) k(r[l]);
        t = !0;
      }
    },
    o(s) {
      r = r.filter(Boolean);
      for (let l = 0; l < r.length; l += 1) E(r[l]);
      t = !1;
    },
    d(s) {
      s && _(e), le(r, s);
    },
  };
}
function Ae(o, e, t) {
  let n;
  return oe(o, $, (r) => t(0, (n = r))), [n];
}
class je extends J {
  constructor(e) {
    super();
    V(this, e, Ae, Ee, G, {});
  }
}
function Ie(o) {
  let e,
    t = { white: "blanc", black: "noir" }[o[0]] + "",
    n,
    r,
    a;
  return {
    c() {
      (e = y("div")), (n = U(t)), (r = U(", \xE0 toi de jouer")), this.h();
    },
    l(s) {
      e = w(s, "DIV", { class: !0 });
      var l = P(e);
      (n = X(l, t)), (r = X(l, ", \xE0 toi de jouer")), l.forEach(_), this.h();
    },
    h() {
      h(e, "class", (a = "" + (C(`text ${o[0]}`) + " svelte-1dpp0qj")));
    },
    m(s, l) {
      S(s, e, l), B(e, n), B(e, r);
    },
    p(s, [l]) {
      l & 1 &&
        t !== (t = { white: "blanc", black: "noir" }[s[0]] + "") &&
        ke(n, t),
        l & 1 &&
          a !== (a = "" + (C(`text ${s[0]}`) + " svelte-1dpp0qj")) &&
          h(e, "class", a);
    },
    i: q,
    o: q,
    d(s) {
      s && _(e);
    },
  };
}
function Te(o, e, t) {
  let n;
  return oe(o, H, (r) => t(0, (n = r))), [n];
}
class Me extends J {
  constructor(e) {
    super();
    V(this, e, Te, Ie, G, {});
  }
}
function Re(o) {
  let e, t, n, r, a, s, l, i;
  return (
    (a = new je({})),
    (l = new Me({})),
    {
      c() {
        (e = y("main")),
          (t = y("h1")),
          (n = U("Jeu de dames")),
          (r = L()),
          O(a.$$.fragment),
          (s = L()),
          O(l.$$.fragment),
          this.h();
      },
      l(c) {
        e = w(c, "MAIN", { class: !0 });
        var u = P(e);
        t = w(u, "H1", { class: !0 });
        var d = P(t);
        (n = X(d, "Jeu de dames")),
          d.forEach(_),
          (r = N(u)),
          Q(a.$$.fragment, u),
          (s = N(u)),
          Q(l.$$.fragment, u),
          u.forEach(_),
          this.h();
      },
      h() {
        h(t, "class", "svelte-1h1ddme"), h(e, "class", "svelte-1h1ddme");
      },
      m(c, u) {
        S(c, e, u),
          B(e, t),
          B(t, n),
          B(e, r),
          W(a, e, null),
          B(e, s),
          W(l, e, null),
          (i = !0);
      },
      p: q,
      i(c) {
        i || (k(a.$$.fragment, c), k(l.$$.fragment, c), (i = !0));
      },
      o(c) {
        E(a.$$.fragment, c), E(l.$$.fragment, c), (i = !1);
      },
      d(c) {
        c && _(e), F(a), F(l);
      },
    }
  );
}
class Ve extends J {
  constructor(e) {
    super();
    V(this, e, null, Re, G, {});
  }
}
export { Ve as default };
