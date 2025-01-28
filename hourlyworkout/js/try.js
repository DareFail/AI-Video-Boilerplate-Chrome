// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@mediapipe/tasks-vision/vision_bundle.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionTaskRunner = exports.PoseLandmarker = exports.ObjectDetector = exports.MPMask = exports.MPImage = exports.InteractiveSegmenterResult = exports.InteractiveSegmenter = exports.ImageSegmenterResult = exports.ImageSegmenter = exports.ImageEmbedder = exports.ImageClassifier = exports.HolisticLandmarker = exports.HandLandmarker = exports.GestureRecognizer = exports.FilesetResolver = exports.FaceStylizer = exports.FaceLandmarker = exports.FaceDetector = exports.DrawingUtils = void 0;
var t = "undefined" != typeof self ? self : {};
function e(e) {
  t: {
    for (var n = ["CLOSURE_FLAGS"], r = t, i = 0; i < n.length; i++) if (null == (r = r[n[i]])) {
      n = null;
      break t;
    }
    n = r;
  }
  return null != (e = n && n[e]) && e;
}
function n() {
  throw Error("Invalid UTF8");
}
function r(t, e) {
  return e = String.fromCharCode.apply(null, e), null == t ? e : t + e;
}
let i, s;
const o = "undefined" != typeof TextDecoder;
let a;
const h = "undefined" != typeof TextEncoder;
function c(t) {
  if (h) t = (a ||= new TextEncoder()).encode(t);else {
    let n = 0;
    const r = new Uint8Array(3 * t.length);
    for (let i = 0; i < t.length; i++) {
      var e = t.charCodeAt(i);
      if (128 > e) r[n++] = e;else {
        if (2048 > e) r[n++] = e >> 6 | 192;else {
          if (55296 <= e && 57343 >= e) {
            if (56319 >= e && i < t.length) {
              const s = t.charCodeAt(++i);
              if (56320 <= s && 57343 >= s) {
                e = 1024 * (e - 55296) + s - 56320 + 65536, r[n++] = e >> 18 | 240, r[n++] = e >> 12 & 63 | 128, r[n++] = e >> 6 & 63 | 128, r[n++] = 63 & e | 128;
                continue;
              }
              i--;
            }
            e = 65533;
          }
          r[n++] = e >> 12 | 224, r[n++] = e >> 6 & 63 | 128;
        }
        r[n++] = 63 & e | 128;
      }
    }
    t = n === r.length ? r : r.subarray(0, n);
  }
  return t;
}
var u,
  l = e(610401301),
  d = e(188588736);
const f = t.navigator;
function p(t) {
  return !!l && !!u && u.brands.some(({
    brand: e
  }) => e && -1 != e.indexOf(t));
}
function g(e) {
  var n;
  return (n = t.navigator) && (n = n.userAgent) || (n = ""), -1 != n.indexOf(e);
}
function m() {
  return !!l && !!u && 0 < u.brands.length;
}
function y() {
  return m() ? p("Chromium") : (g("Chrome") || g("CriOS")) && !(!m() && g("Edge")) || g("Silk");
}
function _(t) {
  return _[" "](t), t;
}
u = f && f.userAgentData || null, _[" "] = function () {};
var v = !m() && (g("Trident") || g("MSIE"));
!g("Android") || y(), y(), g("Safari") && (y() || !m() && g("Coast") || !m() && g("Opera") || !m() && g("Edge") || (m() ? p("Microsoft Edge") : g("Edg/")) || m() && p("Opera"));
var E = {},
  w = null;
function T(t) {
  var e = t.length,
    n = 3 * e / 4;
  n % 3 ? n = Math.floor(n) : -1 != "=.".indexOf(t[e - 1]) && (n = -1 != "=.".indexOf(t[e - 2]) ? n - 2 : n - 1);
  var r = new Uint8Array(n),
    i = 0;
  return function (t, e) {
    function n(e) {
      for (; r < t.length;) {
        var n = t.charAt(r++),
          i = w[n];
        if (null != i) return i;
        if (!/^[\s\xa0]*$/.test(n)) throw Error("Unknown base64 encoding at char: " + n);
      }
      return e;
    }
    A();
    for (var r = 0;;) {
      var i = n(-1),
        s = n(0),
        o = n(64),
        a = n(64);
      if (64 === a && -1 === i) break;
      e(i << 2 | s >> 4), 64 != o && (e(s << 4 & 240 | o >> 2), 64 != a && e(o << 6 & 192 | a));
    }
  }(t, function (t) {
    r[i++] = t;
  }), i !== n ? r.subarray(0, i) : r;
}
function A() {
  if (!w) {
    w = {};
    for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), e = ["+/=", "+/", "-_=", "-_.", "-_"], n = 0; 5 > n; n++) {
      var r = t.concat(e[n].split(""));
      E[n] = r;
      for (var i = 0; i < r.length; i++) {
        var s = r[i];
        void 0 === w[s] && (w[s] = i);
      }
    }
  }
}
var b = "undefined" != typeof Uint8Array,
  k = !v && "function" == typeof btoa;
function x(t) {
  if (!k) {
    var e;
    void 0 === e && (e = 0), A(), e = E[e];
    var n = Array(Math.floor(t.length / 3)),
      r = e[64] || "";
    let h = 0,
      c = 0;
    for (; h < t.length - 2; h += 3) {
      var i = t[h],
        s = t[h + 1],
        o = t[h + 2],
        a = e[i >> 2];
      i = e[(3 & i) << 4 | s >> 4], s = e[(15 & s) << 2 | o >> 6], o = e[63 & o], n[c++] = a + i + s + o;
    }
    switch (a = 0, o = r, t.length - h) {
      case 2:
        o = e[(15 & (a = t[h + 1])) << 2] || r;
      case 1:
        t = t[h], n[c] = e[t >> 2] + e[(3 & t) << 4 | a >> 4] + o + r;
    }
    return n.join("");
  }
  for (e = "", n = 0, r = t.length - 10240; n < r;) e += String.fromCharCode.apply(null, t.subarray(n, n += 10240));
  return e += String.fromCharCode.apply(null, n ? t.subarray(n) : t), btoa(e);
}
const S = /[-_.]/g,
  L = {
    "-": "+",
    _: "/",
    ".": "="
  };
function F(t) {
  return L[t] || "";
}
function R(t) {
  if (!k) return T(t);
  S.test(t) && (t = t.replace(S, F)), t = atob(t);
  const e = new Uint8Array(t.length);
  for (let n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
  return e;
}
function M(t) {
  return b && null != t && t instanceof Uint8Array;
}
let P;
function C() {
  return P ||= new Uint8Array(0);
}
var O = {};
let I;
function U(t) {
  if (t !== O) throw Error("illegal external caller");
}
function D() {
  return I ||= new B(null, O);
}
function N(t) {
  U(O);
  var e = t.g;
  return null == (e = null == e || M(e) ? e : "string" == typeof e ? R(e) : null) ? e : t.g = e;
}
var B = class {
  constructor(t, e) {
    if (U(e), this.g = t, null != t && 0 === t.length) throw Error("ByteString should be constructed with non-empty values");
  }
  h() {
    const t = N(this);
    return t ? new Uint8Array(t) : C();
  }
};
function G(t, e) {
  return Error(`Invalid wire type: ${t} (at position ${e})`);
}
function j() {
  return Error("Failed to read varint, encoding is invalid.");
}
function V(t, e) {
  return Error(`Tried to read past the end of the data ${e} > ${t}`);
}
function X(t) {
  if ("string" == typeof t) return {
    buffer: R(t),
    P: !1
  };
  if (Array.isArray(t)) return {
    buffer: new Uint8Array(t),
    P: !1
  };
  if (t.constructor === Uint8Array) return {
    buffer: t,
    P: !1
  };
  if (t.constructor === ArrayBuffer) return {
    buffer: new Uint8Array(t),
    P: !1
  };
  if (t.constructor === B) return {
    buffer: N(t) || C(),
    P: !0
  };
  if (t instanceof Uint8Array) return {
    buffer: new Uint8Array(t.buffer, t.byteOffset, t.byteLength),
    P: !1
  };
  throw Error("Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers");
}
function H() {
  return "function" == typeof BigInt;
}
const W = "function" == typeof Uint8Array.prototype.slice;
let z,
  K = 0,
  Y = 0;
function $(t) {
  const e = 0 > t;
  let n = (t = Math.abs(t)) >>> 0;
  if (t = Math.floor((t - n) / 4294967296), e) {
    const [e, r] = rt(n, t);
    t = r, n = e;
  }
  K = n >>> 0, Y = t >>> 0;
}
function q(t) {
  const e = z ||= new DataView(new ArrayBuffer(8));
  e.setFloat32(0, +t, !0), Y = 0, K = e.getUint32(0, !0);
}
function J(t, e) {
  return 4294967296 * e + (t >>> 0);
}
function Z(t, e) {
  const n = 2147483648 & e;
  return n && (e = ~e >>> 0, 0 == (t = 1 + ~t >>> 0) && (e = e + 1 >>> 0)), t = J(t, e), n ? -t : t;
}
function Q(t, e) {
  if (t >>>= 0, 2097151 >= (e >>>= 0)) var n = "" + (4294967296 * e + t);else H() ? n = "" + (BigInt(e) << BigInt(32) | BigInt(t)) : (t = (16777215 & t) + 6777216 * (n = 16777215 & (t >>> 24 | e << 8)) + 6710656 * (e = e >> 16 & 65535), n += 8147497 * e, e *= 2, 1e7 <= t && (n += Math.floor(t / 1e7), t %= 1e7), 1e7 <= n && (e += Math.floor(n / 1e7), n %= 1e7), n = e + tt(n) + tt(t));
  return n;
}
function tt(t) {
  return t = String(t), "0000000".slice(t.length) + t;
}
function et() {
  var t = K,
    e = Y;
  if (2147483648 & e) {
    if (H()) t = "" + (BigInt(0 | e) << BigInt(32) | BigInt(t >>> 0));else {
      const [n, r] = rt(t, e);
      t = "-" + Q(n, r);
    }
  } else t = Q(t, e);
  return t;
}
function nt(t) {
  if (16 > t.length) $(Number(t));else if (H()) t = BigInt(t), K = Number(t & BigInt(4294967295)) >>> 0, Y = Number(t >> BigInt(32) & BigInt(4294967295));else {
    const e = +("-" === t[0]);
    Y = K = 0;
    const n = t.length;
    for (let r = e, i = (n - e) % 6 + e; i <= n; r = i, i += 6) {
      const e = Number(t.slice(r, i));
      Y *= 1e6, K = 1e6 * K + e, 4294967296 <= K && (Y += Math.trunc(K / 4294967296), Y >>>= 0, K >>>= 0);
    }
    if (e) {
      const [t, e] = rt(K, Y);
      K = t, Y = e;
    }
  }
}
function rt(t, e) {
  return e = ~e, t ? t = 1 + ~t : e += 1, [t, e];
}
function it(t, e) {
  let n,
    r = 0,
    i = 0,
    s = 0;
  const o = t.h;
  let a = t.g;
  do {
    n = o[a++], r |= (127 & n) << s, s += 7;
  } while (32 > s && 128 & n);
  for (32 < s && (i |= (127 & n) >> 4), s = 3; 32 > s && 128 & n; s += 7) n = o[a++], i |= (127 & n) << s;
  if (dt(t, a), 128 > n) return e(r >>> 0, i >>> 0);
  throw j();
}
function st(t) {
  let e = 0,
    n = t.g;
  const r = n + 10,
    i = t.h;
  for (; n < r;) {
    const r = i[n++];
    if (e |= r, 0 == (128 & r)) return dt(t, n), !!(127 & e);
  }
  throw j();
}
function ot(t) {
  const e = t.h;
  let n = t.g,
    r = e[n++],
    i = 127 & r;
  if (128 & r && (r = e[n++], i |= (127 & r) << 7, 128 & r && (r = e[n++], i |= (127 & r) << 14, 128 & r && (r = e[n++], i |= (127 & r) << 21, 128 & r && (r = e[n++], i |= r << 28, 128 & r && 128 & e[n++] && 128 & e[n++] && 128 & e[n++] && 128 & e[n++] && 128 & e[n++]))))) throw j();
  return dt(t, n), i;
}
function at(t) {
  return ot(t) >>> 0;
}
function ht(t) {
  var e = t.h;
  const n = t.g,
    r = e[n],
    i = e[n + 1],
    s = e[n + 2];
  return e = e[n + 3], dt(t, t.g + 4), (r << 0 | i << 8 | s << 16 | e << 24) >>> 0;
}
function ct(t) {
  var e = ht(t);
  t = 2 * (e >> 31) + 1;
  const n = e >>> 23 & 255;
  return e &= 8388607, 255 == n ? e ? NaN : 1 / 0 * t : 0 == n ? t * Math.pow(2, -149) * e : t * Math.pow(2, n - 150) * (e + Math.pow(2, 23));
}
function ut(t) {
  return ot(t);
}
function lt(t, e, {
  ca: n = !1
} = {}) {
  t.ca = n, e && (e = X(e), t.h = e.buffer, t.m = e.P, t.j = 0, t.l = t.h.length, t.g = t.j);
}
function dt(t, e) {
  if (t.g = e, e > t.l) throw V(t.l, e);
}
function ft(t, e) {
  if (0 > e) throw Error(`Tried to read a negative byte length: ${e}`);
  const n = t.g,
    r = n + e;
  if (r > t.l) throw V(e, t.l - n);
  return t.g = r, n;
}
function pt(t, e) {
  if (0 == e) return D();
  var n = ft(t, e);
  return t.ca && t.m ? n = t.h.subarray(n, n + e) : (t = t.h, n = n === (e = n + e) ? C() : W ? t.slice(n, e) : new Uint8Array(t.subarray(n, e))), 0 == n.length ? D() : new B(n, O);
}
var gt = [];
function mt(t) {
  var e = t.g;
  if (e.g == e.l) return !1;
  t.l = t.g.g;
  var n = at(t.g);
  if (e = n >>> 3, !(0 <= (n &= 7) && 5 >= n)) throw G(n, t.l);
  if (1 > e) throw Error(`Invalid field number: ${e} (at position ${t.l})`);
  return t.m = e, t.h = n, !0;
}
function yt(t) {
  switch (t.h) {
    case 0:
      0 != t.h ? yt(t) : st(t.g);
      break;
    case 1:
      dt(t = t.g, t.g + 8);
      break;
    case 2:
      if (2 != t.h) yt(t);else {
        var e = at(t.g);
        dt(t = t.g, t.g + e);
      }
      break;
    case 5:
      dt(t = t.g, t.g + 4);
      break;
    case 3:
      for (e = t.m;;) {
        if (!mt(t)) throw Error("Unmatched start-group tag: stream EOF");
        if (4 == t.h) {
          if (t.m != e) throw Error("Unmatched end-group tag");
          break;
        }
        yt(t);
      }
      break;
    default:
      throw G(t.h, t.l);
  }
}
function _t(t, e, n) {
  const r = t.g.l,
    i = at(t.g),
    s = t.g.g + i;
  let o = s - r;
  if (0 >= o && (t.g.l = s, n(e, t, void 0, void 0, void 0), o = s - t.g.g), o) throw Error(`Message parsing ended unexpectedly. Expected to read ${i} bytes, instead read ${i - o} bytes, either the data ended unexpectedly or the message misreported its own length`);
  return t.g.g = s, t.g.l = r, e;
}
function vt(t) {
  var e = at(t.g),
    a = ft(t = t.g, e);
  if (t = t.h, o) {
    var h,
      c = t;
    (h = s) || (h = s = new TextDecoder("utf-8", {
      fatal: !0
    })), e = a + e, c = 0 === a && e === c.length ? c : c.subarray(a, e);
    try {
      var u = h.decode(c);
    } catch (t) {
      if (void 0 === i) {
        try {
          h.decode(new Uint8Array([128]));
        } catch (t) {}
        try {
          h.decode(new Uint8Array([97])), i = !0;
        } catch (t) {
          i = !1;
        }
      }
      throw !i && (s = void 0), t;
    }
  } else {
    e = (u = a) + e, a = [];
    let i,
      s = null;
    for (; u < e;) {
      var l = t[u++];
      128 > l ? a.push(l) : 224 > l ? u >= e ? n() : (i = t[u++], 194 > l || 128 != (192 & i) ? (u--, n()) : a.push((31 & l) << 6 | 63 & i)) : 240 > l ? u >= e - 1 ? n() : (i = t[u++], 128 != (192 & i) || 224 === l && 160 > i || 237 === l && 160 <= i || 128 != (192 & (h = t[u++])) ? (u--, n()) : a.push((15 & l) << 12 | (63 & i) << 6 | 63 & h)) : 244 >= l ? u >= e - 2 ? n() : (i = t[u++], 128 != (192 & i) || 0 != i - 144 + (l << 28) >> 30 || 128 != (192 & (h = t[u++])) || 128 != (192 & (c = t[u++])) ? (u--, n()) : (l = (7 & l) << 18 | (63 & i) << 12 | (63 & h) << 6 | 63 & c, l -= 65536, a.push(55296 + (l >> 10 & 1023), 56320 + (1023 & l)))) : n(), 8192 <= a.length && (s = r(s, a), a.length = 0);
    }
    u = r(s, a);
  }
  return u;
}
function Et(t) {
  const e = at(t.g);
  return pt(t.g, e);
}
function wt(t, e, n) {
  var r = at(t.g);
  for (r = t.g.g + r; t.g.g < r;) n.push(e(t.g));
}
var Tt = [];
function At(t) {
  return t ? /^\d+$/.test(t) ? (nt(t), new bt(K, Y)) : null : kt ||= new bt(0, 0);
}
var bt = class {
  constructor(t, e) {
    this.h = t >>> 0, this.g = e >>> 0;
  }
};
let kt;
function xt(t) {
  return t ? /^-?\d+$/.test(t) ? (nt(t), new St(K, Y)) : null : Lt ||= new St(0, 0);
}
var St = class {
  constructor(t, e) {
    this.h = t >>> 0, this.g = e >>> 0;
  }
};
let Lt;
function Ft(t, e, n) {
  for (; 0 < n || 127 < e;) t.g.push(127 & e | 128), e = (e >>> 7 | n << 25) >>> 0, n >>>= 7;
  t.g.push(e);
}
function Rt(t, e) {
  for (; 127 < e;) t.g.push(127 & e | 128), e >>>= 7;
  t.g.push(e);
}
function Mt(t, e) {
  if (0 <= e) Rt(t, e);else {
    for (let n = 0; 9 > n; n++) t.g.push(127 & e | 128), e >>= 7;
    t.g.push(1);
  }
}
function Pt(t, e) {
  t.g.push(e >>> 0 & 255), t.g.push(e >>> 8 & 255), t.g.push(e >>> 16 & 255), t.g.push(e >>> 24 & 255);
}
function Ct(t, e) {
  0 !== e.length && (t.l.push(e), t.h += e.length);
}
function Ot(t, e, n) {
  Rt(t.g, 8 * e + n);
}
function It(t, e) {
  return Ot(t, e, 2), e = t.g.end(), Ct(t, e), e.push(t.h), e;
}
function Ut(t, e) {
  var n = e.pop();
  for (n = t.h + t.g.length() - n; 127 < n;) e.push(127 & n | 128), n >>>= 7, t.h++;
  e.push(n), t.h++;
}
function Dt(t, e, n) {
  Ot(t, e, 2), Rt(t.g, n.length), Ct(t, t.g.end()), Ct(t, n);
}
function Nt(t, e, n, r) {
  null != n && (e = It(t, e), r(n, t), Ut(t, e));
}
class Bt {
  constructor(t, e, n, r) {
    this.g = t, this.h = e, this.l = n, this.pa = r;
  }
}
function Gt(t) {
  return Array.prototype.slice.call(t);
}
function jt(t) {
  return "function" == typeof Symbol && "symbol" == typeof Symbol() ? Symbol() : t;
}
var Vt = jt(),
  Xt = jt("0di"),
  Ht = jt("2ex"),
  Wt = jt("0dg"),
  zt = Vt ? (t, e) => {
    t[Vt] |= e;
  } : (t, e) => {
    void 0 !== t.g ? t.g |= e : Object.defineProperties(t, {
      g: {
        value: e,
        configurable: !0,
        writable: !0,
        enumerable: !1
      }
    });
  },
  Kt = Vt ? (t, e) => {
    t[Vt] &= ~e;
  } : (t, e) => {
    void 0 !== t.g && (t.g &= ~e);
  };
function Yt(t, e, n) {
  return n ? t | e : t & ~e;
}
var $t = Vt ? t => 0 | t[Vt] : t => 0 | t.g,
  qt = Vt ? t => t[Vt] : t => t.g,
  Jt = Vt ? (t, e) => (t[Vt] = e, t) : (t, e) => (void 0 !== t.g ? t.g = e : Object.defineProperties(t, {
    g: {
      value: e,
      configurable: !0,
      writable: !0,
      enumerable: !1
    }
  }), t);
function Zt(t) {
  return zt(t, 34), t;
}
function Qt(t, e) {
  Jt(e, -14591 & (0 | t));
}
function te(t, e) {
  Jt(e, -14557 & (34 | t));
}
function ee(t) {
  return 0 === (t = t >> 14 & 1023) ? 536870912 : t;
}
var ne,
  re = {},
  ie = {};
function se(t) {
  return !(!t || "object" != typeof t || t.Ja !== ie);
}
function oe(t) {
  return null !== t && "object" == typeof t && !Array.isArray(t) && t.constructor === Object;
}
function ae(t, e, n) {
  if (null != t) if ("string" == typeof t) t = t ? new B(t, O) : D();else if (t.constructor !== B) if (M(t)) t = t.length ? new B(n ? t : new Uint8Array(t), O) : D();else {
    if (!e) throw Error();
    t = void 0;
  }
  return t;
}
function he(t, e, n) {
  if (!Array.isArray(t) || t.length) return !1;
  const r = $t(t);
  return !!(1 & r) || !(!e || !(Array.isArray(e) ? e.includes(n) : e.has(n))) && (Jt(t, 1 | r), !0);
}
const ce = [];
function ue(t) {
  if (2 & t) throw Error();
}
Jt(ce, 55), ne = Object.freeze(ce);
class le {
  constructor(t, e, n) {
    this.l = 0, this.g = t, this.h = e, this.m = n;
  }
  next() {
    if (this.l < this.g.length) {
      const t = this.g[this.l++];
      return {
        done: !1,
        value: this.h ? this.h.call(this.m, t) : t
      };
    }
    return {
      done: !0,
      value: void 0
    };
  }
  [Symbol.iterator]() {
    return new le(this.g, this.h, this.m);
  }
}
let de, fe, pe;
function ge(t, e) {
  (e = de ? e[de] : void 0) && (t[de] = Gt(e));
}
function me(t, e) {
  t.__closure__error__context__984382 || (t.__closure__error__context__984382 = {}), t.__closure__error__context__984382.severity = e;
}
function ye() {
  const e = Error();
  me(e, "incident"), function (e) {
    t.setTimeout(() => {
      throw e;
    }, 0);
  }(e);
}
function _e(t) {
  return me(t = Error(t), "warning"), t;
}
function ve(t) {
  return null == t || "number" == typeof t ? t : "NaN" === t || "Infinity" === t || "-Infinity" === t ? Number(t) : void 0;
}
function Ee(t) {
  return null == t || "boolean" == typeof t ? t : "number" == typeof t ? !!t : void 0;
}
Object.freeze(new class {}()), Object.freeze(new class {}());
const we = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;
function Te(t) {
  const e = typeof t;
  return "number" === e ? Number.isFinite(t) : "string" === e && we.test(t);
}
function Ae(t) {
  if (null == t) return t;
  if ("string" == typeof t) {
    if (!t) return;
    t = +t;
  }
  return "number" == typeof t && Number.isFinite(t) ? 0 | t : void 0;
}
function be(t) {
  if (null == t) return t;
  if ("string" == typeof t) {
    if (!t) return;
    t = +t;
  }
  return "number" == typeof t && Number.isFinite(t) ? t >>> 0 : void 0;
}
function ke(t) {
  return "-" !== t[0] && (20 > t.length || 20 === t.length && 184467 > Number(t.substring(0, 6)));
}
function xe(t) {
  return "-" === t[0] ? 20 > t.length || 20 === t.length && -922337 < Number(t.substring(0, 7)) : 19 > t.length || 19 === t.length && 922337 > Number(t.substring(0, 6));
}
function Se(t) {
  return t = Math.trunc(t), Number.isSafeInteger(t) || ($(t), t = Z(K, Y)), t;
}
function Le(t) {
  var e = Math.trunc(Number(t));
  return Number.isSafeInteger(e) ? String(e) : (-1 !== (e = t.indexOf(".")) && (t = t.substring(0, e)), xe(t) || (nt(t), t = et()), t);
}
function Fe(t) {
  return null == t ? t : Te(t) ? "number" == typeof t ? Se(t) : Le(t) : void 0;
}
function Re(t) {
  if ("string" != typeof t) throw Error();
  return t;
}
function Me(t) {
  if (null != t && "string" != typeof t) throw Error();
  return t;
}
function Pe(t) {
  return null == t || "string" == typeof t ? t : void 0;
}
function Ce(t, e, n, r) {
  if (null != t && "object" == typeof t && t.X === re) return t;
  if (!Array.isArray(t)) return n ? 2 & r ? (t = e[Xt]) ? e = t : (Zt((t = new e()).s), e = e[Xt] = t) : e = new e() : e = void 0, e;
  let i = n = $t(t);
  return 0 === i && (i |= 32 & r), i |= 2 & r, i !== n && Jt(t, i), new e(t);
}
function Oe(t, e, n) {
  if (e) {
    var r = !!r;
    if (!Te(e = t)) throw _e("int64");
    "string" == typeof e ? r = Le(e) : r ? (r = Math.trunc(e), Number.isSafeInteger(r) ? r = String(r) : xe(e = String(r)) ? r = e : ($(r), r = et())) : r = Se(e);
  } else r = Fe(t);
  return "string" == typeof (n = null == (t = r) ? n ? 0 : void 0 : t) && (r = +n, Number.isSafeInteger(r)) ? r : n;
}
let Ie, Ue, De;
function Ne(t) {
  switch (typeof t) {
    case "boolean":
      return Ue ||= [0, void 0, !0];
    case "number":
      return 0 < t ? void 0 : 0 === t ? De ||= [0, void 0] : [-t, void 0];
    case "string":
      return [0, t];
    case "object":
      return t;
  }
}
function Be(t, e) {
  return Ge(t, e[0], e[1]);
}
function Ge(t, e, n) {
  if (null == t && (t = Ie), Ie = void 0, null == t) {
    var r = 96;
    n ? (t = [n], r |= 512) : t = [], e && (r = -16760833 & r | (1023 & e) << 14);
  } else {
    if (!Array.isArray(t)) throw Error("narr");
    if (2048 & (r = $t(t))) throw Error("farr");
    if (64 & r) return t;
    if (r |= 64, n && (r |= 512, n !== t[0])) throw Error("mid");
    t: {
      const i = (n = t).length;
      if (i) {
        const t = i - 1;
        if (oe(n[t])) {
          if (1024 <= (e = t - (+!!(512 & (r |= 256)) - 1))) throw Error("pvtlmt");
          r = -16760833 & r | (1023 & e) << 14;
          break t;
        }
      }
      if (e) {
        if (1024 < (e = Math.max(e, i - (+!!(512 & r) - 1)))) throw Error("spvt");
        r = -16760833 & r | (1023 & e) << 14;
      }
    }
  }
  return Jt(t, r), t;
}
const je = {};
let Ve = function () {
  try {
    return _(new class extends Map {
      constructor() {
        super();
      }
    }()), !1;
  } catch {
    return !0;
  }
}();
class Xe {
  constructor() {
    this.g = new Map();
  }
  get(t) {
    return this.g.get(t);
  }
  set(t, e) {
    return this.g.set(t, e), this.size = this.g.size, this;
  }
  delete(t) {
    return t = this.g.delete(t), this.size = this.g.size, t;
  }
  clear() {
    this.g.clear(), this.size = this.g.size;
  }
  has(t) {
    return this.g.has(t);
  }
  entries() {
    return this.g.entries();
  }
  keys() {
    return this.g.keys();
  }
  values() {
    return this.g.values();
  }
  forEach(t, e) {
    return this.g.forEach(t, e);
  }
  [Symbol.iterator]() {
    return this.entries();
  }
}
const He = Ve ? (Object.setPrototypeOf(Xe.prototype, Map.prototype), Object.defineProperties(Xe.prototype, {
  size: {
    value: 0,
    configurable: !0,
    enumerable: !0,
    writable: !0
  }
}), Xe) : class extends Map {
  constructor() {
    super();
  }
};
function We(t) {
  return t;
}
function ze(t) {
  if (2 & t.N) throw Error("Cannot mutate an immutable Map");
}
var Ke = class extends He {
  constructor(t, e, n = We, r = We) {
    super();
    let i = $t(t);
    i |= 64, Jt(t, i), this.N = i, this.U = e, this.S = n, this.Z = this.U ? Ye : r;
    for (let s = 0; s < t.length; s++) {
      const o = t[s],
        a = n(o[0], !1, !0);
      let h = o[1];
      e ? void 0 === h && (h = null) : h = r(o[1], !1, !0, void 0, void 0, i), super.set(a, h);
    }
  }
  oa(t = $e) {
    if (0 !== this.size) return this.Y(t);
  }
  Y(t = $e) {
    const e = [],
      n = super.entries();
    for (var r; !(r = n.next()).done;) (r = r.value)[0] = t(r[0]), r[1] = t(r[1]), e.push(r);
    return e;
  }
  clear() {
    ze(this), super.clear();
  }
  delete(t) {
    return ze(this), super.delete(this.S(t, !0, !1));
  }
  entries() {
    var t = this.na();
    return new le(t, qe, this);
  }
  keys() {
    return this.Ia();
  }
  values() {
    var t = this.na();
    return new le(t, Ke.prototype.get, this);
  }
  forEach(t, e) {
    super.forEach((n, r) => {
      t.call(e, this.get(r), r, this);
    });
  }
  set(t, e) {
    return ze(this), null == (t = this.S(t, !0, !1)) ? this : null == e ? (super.delete(t), this) : super.set(t, this.Z(e, !0, !0, this.U, !1, this.N));
  }
  Oa(t) {
    const e = this.S(t[0], !1, !0);
    t = t[1], t = this.U ? void 0 === t ? null : t : this.Z(t, !1, !0, void 0, !1, this.N), super.set(e, t);
  }
  has(t) {
    return super.has(this.S(t, !1, !1));
  }
  get(t) {
    t = this.S(t, !1, !1);
    const e = super.get(t);
    if (void 0 !== e) {
      var n = this.U;
      return n ? ((n = this.Z(e, !1, !0, n, this.ta, this.N)) !== e && super.set(t, n), n) : e;
    }
  }
  na() {
    return Array.from(super.keys());
  }
  Ia() {
    return super.keys();
  }
  [Symbol.iterator]() {
    return this.entries();
  }
};
function Ye(t, e, n, r, i, s) {
  return t = Ce(t, r, n, s), i && (t = an(t)), t;
}
function $e(t) {
  return t;
}
function qe(t) {
  return [t, this.get(t)];
}
let Je;
function Ze() {
  return Je ||= new Ke(Zt([]), void 0, void 0, void 0, je);
}
function Qe(t, e, n, r, i) {
  if (null != t) {
    if (Array.isArray(t)) t = he(t, void 0, 0) ? void 0 : i && 2 & $t(t) ? t : tn(t, e, n, void 0 !== r, i);else if (oe(t)) {
      const s = {};
      for (let o in t) s[o] = Qe(t[o], e, n, r, i);
      t = s;
    } else t = e(t, r);
    return t;
  }
}
function tn(t, e, n, r, i) {
  const s = r || n ? $t(t) : 0;
  r = r ? !!(32 & s) : void 0;
  const o = Gt(t);
  for (let t = 0; t < o.length; t++) o[t] = Qe(o[t], e, n, r, i);
  return n && (ge(o, t), n(s, o)), o;
}
function en(t) {
  return Qe(t, nn, void 0, void 0, !1);
}
function nn(t) {
  return t.X === re ? t.toJSON() : t instanceof Ke ? t.oa(en) : function (t) {
    switch (typeof t) {
      case "number":
        return isFinite(t) ? t : String(t);
      case "boolean":
        return t ? 1 : 0;
      case "object":
        if (t) if (Array.isArray(t)) {
          if (he(t, void 0, 0)) return;
        } else {
          if (M(t)) return x(t);
          if (t instanceof B) {
            const e = t.g;
            return null == e ? "" : "string" == typeof e ? e : t.g = x(e);
          }
          if (t instanceof Ke) return t.oa();
        }
    }
    return t;
  }(t);
}
function rn(t, e, n = te) {
  if (null != t) {
    if (b && t instanceof Uint8Array) return e ? t : new Uint8Array(t);
    if (Array.isArray(t)) {
      var r = $t(t);
      return 2 & r || (e &&= 0 === r || !!(32 & r) && !(64 & r || !(16 & r)), t = e ? Jt(t, -12293 & (34 | r)) : tn(t, rn, 4 & r ? te : n, !0, !0)), t;
    }
    return t.X === re ? (n = t.s, t = 2 & (r = qt(n)) ? t : sn(t, n, r, !0)) : t instanceof Ke && !(2 & t.N) && (n = Zt(t.Y(rn)), t = new Ke(n, t.U, t.S, t.Z)), t;
  }
}
function sn(t, e, n, r) {
  return t = t.constructor, Ie = e = on(e, n, r), e = new t(e), Ie = void 0, e;
}
function on(t, e, n) {
  const r = n || 2 & e ? te : Qt,
    i = !!(32 & e);
  return t = function (t, e, n) {
    const r = Gt(t);
    var i = r.length;
    const s = 256 & e ? r[i - 1] : void 0;
    for (i += s ? -1 : 0, e = 512 & e ? 1 : 0; e < i; e++) r[e] = n(r[e]);
    if (s) {
      e = r[e] = {};
      for (const t in s) e[t] = n(s[t]);
    }
    return ge(r, t), r;
  }(t, e, t => rn(t, i, r)), zt(t, 32 | (n ? 2 : 0)), t;
}
function an(t) {
  const e = t.s,
    n = qt(e);
  return 2 & n ? sn(t, e, n, !1) : t;
}
function hn(t, e, n, r) {
  return !(4 & e) || null != n && (!r && 0 === n && (4096 & e || 8192 & e) && 5 > (t.constructor[Wt] = 1 + (0 | t.constructor[Wt])) && ye(), 0 !== n && !(n & e));
}
function cn(t, e) {
  return ln(t = t.s, qt(t), e);
}
function un(t, e, n, r) {
  if (!(0 > (e = r + (+!!(512 & e) - 1)) || e >= t.length || e >= n)) return t[e];
}
function ln(t, e, n, r) {
  if (-1 === n) return null;
  const i = ee(e);
  if (!(n >= i)) {
    var s = t.length;
    return r && 256 & e && null != (r = t[s - 1][n]) ? (un(t, e, i, n) && null != Ht && (4 <= (e = (t = pe ??= {})[Ht] || 0) || (t[Ht] = e + 1, ye())), r) : un(t, e, i, n);
  }
  return 256 & e ? t[t.length - 1][n] : void 0;
}
function dn(t, e, n, r) {
  const i = t.s;
  let s = qt(i);
  return ue(s), fn(i, s, e, n, r), t;
}
function fn(t, e, n, r, i) {
  const s = ee(e);
  if (n >= s || i) {
    let o = e;
    if (256 & e) i = t[t.length - 1];else {
      if (null == r) return o;
      i = t[s + (+!!(512 & e) - 1)] = {}, o |= 256;
    }
    return i[n] = r, n < s && (t[n + (+!!(512 & e) - 1)] = void 0), o !== e && Jt(t, o), o;
  }
  return t[n + (+!!(512 & e) - 1)] = r, 256 & e && n in (t = t[t.length - 1]) && delete t[n], e;
}
function pn(t, e, n, r, i) {
  var s = 2 & e;
  let o = ln(t, e, n, i);
  Array.isArray(o) || (o = ne);
  const a = !(2 & r);
  r = !(1 & r);
  const h = !!(32 & e);
  let c = $t(o);
  return 0 !== c || !h || s || a ? 1 & c || (c |= 1, Jt(o, c)) : (c |= 33, Jt(o, c)), s ? (t = !1, 2 & c || (Zt(o), t = !!(4 & c)), (r || t) && Object.freeze(o)) : (s = !!(2 & c) || !!(2048 & c), r && s ? (o = Gt(o), r = 1, h && !a && (r |= 32), Jt(o, r), fn(t, e, n, o, i)) : a && 32 & c && !s && Kt(o, 32)), o;
}
function gn(t, e) {
  t = t.s;
  let n = qt(t);
  const r = ln(t, n, e),
    i = ve(r);
  return null != i && i !== r && fn(t, n, e, i), i;
}
function mn(t) {
  t = t.s;
  let e = qt(t);
  const n = ln(t, e, 1),
    r = ae(n, !0, !!(34 & e));
  return null != r && r !== n && fn(t, e, 1, r), r;
}
function yn(t, e, n) {
  const r = t.s;
  let i = qt(r);
  const s = 2 & i ? 1 : 2;
  let o = _n(r, i, e);
  var a = $t(o);
  if (hn(t, a, void 0, !1)) {
    (4 & a || Object.isFrozen(o)) && (o = Gt(o), a = In(a, i), i = fn(r, i, e, o));
    let s = t = 0;
    for (; t < o.length; t++) {
      const e = n(o[t]);
      null != e && (o[s++] = e);
    }
    s < t && (o.length = s), a = Yt(a = vn(a, i), 20, !0), a = Yt(a, 4096, !1), a = Yt(a, 8192, !1), Jt(o, a), 2 & a && Object.freeze(o);
  }
  return En(a) || (n = a, (a = (t = 1 === s || 4 === s && !!(32 & a)) ? Yt(a, 2, !0) : Un(a, i, !1)) !== n && Jt(o, a), t && Object.freeze(o)), 2 === s && En(a) && (o = Gt(o), a = Un(a = In(a, i), i, !1), Jt(o, a), fn(r, i, e, o)), o;
}
function _n(t, e, n) {
  return t = ln(t, e, n), Array.isArray(t) ? t : ne;
}
function vn(t, e) {
  return 0 === t && (t = In(t, e)), Yt(t, 1, !0);
}
function En(t) {
  return !!(2 & t) && !!(4 & t) || !!(2048 & t);
}
function wn(t) {
  t = Gt(t);
  for (let e = 0; e < t.length; e++) {
    const n = t[e] = Gt(t[e]);
    Array.isArray(n[1]) && (n[1] = Zt(n[1]));
  }
  return t;
}
function Tn(t, e, n) {
  {
    const a = t.s;
    let h = qt(a);
    if (ue(h), null == n) fn(a, h, e);else {
      var r,
        i = $t(n),
        s = i,
        o = !!(2 & i) || Object.isFrozen(n);
      if ((r = !o) && (r = !1), hn(t, i)) for (i = 21, o && (n = Gt(n), s = 0, i = Un(i = In(i, h), h, !0)), t = 0; t < n.length; t++) n[t] = Re(n[t]);
      r && (n = Gt(n), s = 0, i = Un(i = In(i, h), h, !0)), i !== s && Jt(n, i), fn(a, h, e, n);
    }
  }
}
function An(t, e, n, r) {
  t = t.s;
  let i = qt(t);
  ue(i), fn(t, i, e, ("0" === r ? 0 === Number(n) : n === r) ? void 0 : n);
}
function bn(t, e, n, r) {
  const i = qt(t);
  ue(i), t = pn(t, i, e, 2), r = n(r, !!(4 & (e = $t(t))) && !!(4096 & e)), t.push(r);
}
function kn(t) {
  return t;
}
function xn(t, e) {
  return Sn(t = t.s, qt(t), ws) === e ? e : -1;
}
function Sn(t, e, n) {
  let r = 0;
  for (let i = 0; i < n.length; i++) {
    const s = n[i];
    null != ln(t, e, s) && (0 !== r && (e = fn(t, e, r)), r = s);
  }
  return r;
}
function Ln(t, e, n, r) {
  let i = qt(t);
  ue(i);
  const s = ln(t, i, n, r);
  let o;
  if (null != s && s.X === re) return (e = an(s)) !== s && fn(t, i, n, e, r), e.s;
  if (Array.isArray(s)) {
    const t = $t(s);
    o = 2 & t ? on(s, t, !1) : s, o = Be(o, e);
  } else o = Be(void 0, e);
  return o !== s && fn(t, i, n, o, r), o;
}
function Fn(t, e, n, r) {
  t = t.s;
  let i = qt(t);
  const s = ln(t, i, n, r);
  return (e = Ce(s, e, !1, i)) !== s && null != e && fn(t, i, n, e, r), e;
}
function Rn(t, e, n, r = !1) {
  if (null == (e = Fn(t, e, n, r))) return e;
  t = t.s;
  let i = qt(t);
  if (!(2 & i)) {
    const s = an(e);
    s !== e && fn(t, i, n, e = s, r);
  }
  return e;
}
function Mn(t, e, n, r, i, s) {
  var o = 2,
    a = !!(2 & e);
  o = a ? 1 : o, i = !!i, s &&= !a, a = _n(t, e, r);
  var h = $t(a);
  const c = !!(4 & h);
  if (!c) {
    var u = a,
      l = e;
    const t = !!(2 & (h = vn(h, e)));
    t && (l = Yt(l, 2, !0));
    let r = !t,
      i = !0,
      s = 0,
      o = 0;
    for (; s < u.length; s++) {
      const e = Ce(u[s], n, !1, l);
      if (e instanceof n) {
        if (!t) {
          const t = !!(2 & $t(e.s));
          r &&= !t, i &&= t;
        }
        u[o++] = e;
      }
    }
    o < s && (u.length = o), h = Yt(h, 4, !0), h = Yt(h, 16, i), h = Yt(h, 8, r), Jt(u, h), t && Object.freeze(u);
  }
  if (s && !(8 & h || !a.length && (1 === o || 4 === o && 32 & h))) {
    for (En(h) && (a = Gt(a), h = In(h, e), e = fn(t, e, r, a)), n = a, s = h, u = 0; u < n.length; u++) (h = n[u]) !== (l = an(h)) && (n[u] = l);
    s = Yt(s, 8, !0), s = Yt(s, 16, !n.length), Jt(n, s), h = s;
  }
  return En(h) || (n = h, (h = (s = 1 === o || 4 === o && !!(32 & h)) ? Yt(h, !a.length || 16 & h && (!c || 32 & h) ? 2 : 2048, !0) : Un(h, e, i)) !== n && Jt(a, h), s && Object.freeze(a)), 2 === o && En(h) && (a = Gt(a), h = Un(h = In(h, e), e, i), Jt(a, h), fn(t, e, r, a)), a;
}
function Pn(t, e, n) {
  t = t.s;
  const r = qt(t);
  return Mn(t, r, e, n, !1, !(2 & r));
}
function Cn(t, e, n, r, i) {
  return null == r && (r = void 0), dn(t, n, r, i);
}
function On(t, e, n, r) {
  null == r && (r = void 0), t = t.s;
  let i = qt(t);
  ue(i), (n = Sn(t, i, n)) && n !== e && null != r && (i = fn(t, i, n)), fn(t, i, e, r);
}
function In(t, e) {
  return t = Yt(t, 2, !!(2 & e)), t = Yt(t, 32, !0), Yt(t, 2048, !1);
}
function Un(t, e, n) {
  return 32 & e && n || (t = Yt(t, 32, !1)), t;
}
function Dn(t, e, n, r) {
  t = t.s;
  const i = qt(t);
  ue(i), e = Mn(t, i, n, e, !0), n = null != r ? r : new n(), e.push(n), 2 & $t(n.s) ? Kt(e, 8) : Kt(e, 16);
}
function Nn(t, e) {
  return Ae(cn(t, e));
}
function Bn(t, e) {
  return t ?? e;
}
function Gn(t, e) {
  return Bn(gn(t, e), 0);
}
function jn(t, e) {
  return Bn(Pe(cn(t, e)), "");
}
function Vn(t, e, n) {
  if (null != n && "boolean" != typeof n) throw t = typeof n, Error(`Expected boolean but got ${"object" != t ? t : n ? Array.isArray(n) ? "array" : t : "null"}: ${n}`);
  dn(t, e, n);
}
function Xn(t, e, n) {
  if (null != n) {
    if ("number" != typeof n) throw _e("int32");
    if (!Number.isFinite(n)) throw _e("int32");
    n |= 0;
  }
  dn(t, e, n);
}
function Hn(t, e, n) {
  if (null != n && "number" != typeof n) throw Error(`Value of float/double field must be a number, found ${typeof n}: ${n}`);
  dn(t, e, n);
}
function Wn(t, e, n) {
  e.g ? e.m(t, e.g, e.h, n, !0) : e.m(t, e.h, n, !0);
}
Ke.prototype.toJSON = void 0, Ke.prototype.Ja = ie;
var zn = class {
  constructor(t, e) {
    this.s = Ge(t, e);
  }
  toJSON() {
    return Kn(this, tn(this.s, nn, void 0, void 0, !1), !0);
  }
  l() {
    var t = ko;
    return t.g ? t.l(this, t.g, t.h, !0) : t.l(this, t.h, t.defaultValue, !0);
  }
  clone() {
    const t = this.s;
    return sn(this, t, qt(t), !1);
  }
  P() {
    return !!(2 & $t(this.s));
  }
};
function Kn(t, e, n) {
  var r = d ? void 0 : t.constructor.B;
  const i = qt(n ? t.s : e);
  if (!(t = e.length)) return e;
  let s, o;
  if (oe(n = e[t - 1])) {
    t: {
      var a = n;
      let t = {},
        e = !1;
      for (var h in a) {
        let n = a[h];
        if (Array.isArray(n)) {
          let t = n;
          (he(n, r, +h) || se(n) && 0 === n.size) && (n = null), n != t && (e = !0);
        }
        null != n ? t[h] = n : e = !0;
      }
      if (e) {
        for (var c in t) {
          a = t;
          break t;
        }
        a = null;
      }
    }
    a != n && (s = !0), t--;
  }
  for (h = +!!(512 & i) - 1; 0 < t && (n = e[c = t - 1], c -= h, null == n || he(n, r, c) || se(n) && 0 === n.size); t--) o = !0;
  return s || o ? (e = Array.prototype.slice.call(e, 0, t), a && e.push(a), e) : e;
}
function Yn(t) {
  return Array.isArray(t) ? t[0] instanceof Bt ? t : [$r, t] : [t, void 0];
}
function $n(t, e) {
  if (Array.isArray(e)) {
    var n = $t(e);
    if (4 & n) return e;
    for (var r = 0, i = 0; r < e.length; r++) {
      const n = t(e[r]);
      null != n && (e[i++] = n);
    }
    return i < r && (e.length = i), Jt(e, -12289 & (5 | n)), 2 & n && Object.freeze(e), e;
  }
}
zn.prototype.X = re, zn.prototype.toString = function () {
  return Kn(this, this.s, !1).toString();
};
const qn = Symbol();
function Jn(t) {
  let e = t[qn];
  if (!e) {
    const n = sr(t),
      r = yr(t),
      i = r.l;
    e = i ? (t, e) => i(t, e, r) : (t, e) => {
      for (; mt(e) && 4 != e.h;) {
        var i = e.m,
          s = r[i];
        if (!s) {
          var o = r.ea;
          o && (o = o[i]) && (s = r[i] = Zn(o));
        }
        s && s(e, t, i) || (i = (s = e).l, yt(s), s.ia ? s = void 0 : (o = s.g.g - i, s.g.g = i, s = pt(s.g, o)), i = t, s && (de ||= Symbol(), (o = i[de]) ? o.push(s) : i[de] = [s]));
      }
      n === tr || n === er || n.j || (t[fe ||= Symbol()] = n);
    }, t[qn] = e;
  }
  return e;
}
function Zn(t) {
  const e = (t = Yn(t))[0].g;
  if (t = t[1]) {
    const n = Jn(t),
      r = yr(t).T;
    return (t, i, s) => e(t, i, s, r, n);
  }
  return e;
}
class Qn {}
let tr, er;
const nr = Symbol();
function rr(t, e, n) {
  const r = n[1];
  let i;
  if (r) {
    const n = r[nr];
    i = n ? n.T : Ne(r[0]), t[e] = n ?? r;
  }
  i && i === Ue ? (t.g || (t.g = new Set())).add(e) : n[0] && (t.h || (t.h = new Set())).add(e);
}
function ir(t, e) {
  return [t.l, !e || 0 < e[0] ? void 0 : e];
}
function sr(t) {
  var e = t[nr];
  if (e) return e;
  if (!(e = ar(t, t[nr] = new Qn(), ir, ir, rr)).ea && !e.h && !e.g) {
    let n = !0;
    for (let t in e) isNaN(t) || (n = !1);
    n ? (Ne(t[0]) === Ue ? er ? e = er : ((e = new Qn()).T = Ne(!0), e = er = e) : e = tr ||= new Qn(), e = t[nr] = e) : e.j = !0;
  }
  return e;
}
function or(t, e, n) {
  t[e] = n;
}
function ar(t, e, n, r, i = or) {
  e.T = Ne(t[0]);
  let s = 0;
  var o = t[++s];
  o && o.constructor === Object && (e.ea = o, "function" == typeof (o = t[++s]) && (e.l = o, e.m = t[++s], o = t[++s]));
  const a = {};
  for (; Array.isArray(o) && "number" == typeof o[0] && 0 < o[0];) {
    for (var h = 0; h < o.length; h++) a[o[h]] = o;
    o = t[++s];
  }
  for (h = 1; void 0 !== o;) {
    let l;
    "number" == typeof o && (h += o, o = t[++s]);
    var c = void 0;
    if (o instanceof Bt ? l = o : (l = qr, s--), l.pa) {
      o = t[++s], c = t;
      var u = s;
      "function" == typeof o && (o = o(), c[u] = o), c = o;
    }
    for (u = h + 1, "number" == typeof (o = t[++s]) && 0 > o && (u -= o, o = t[++s]); h < u; h++) {
      const t = a[h];
      i(e, h, c ? r(l, c, t) : n(l, t));
    }
  }
  return e;
}
const hr = Symbol();
function cr(t) {
  let e = t[hr];
  if (!e) {
    const n = fr(t);
    e = (t, e) => Er(t, e, n), t[hr] = e;
  }
  return e;
}
const ur = Symbol();
function lr(t) {
  return t.h;
}
function dr(t, e) {
  let n, r;
  const i = t.h;
  return (t, s, o) => i(t, s, o, r ||= fr(e).T, n ||= cr(e));
}
function fr(t) {
  let e = t[ur];
  return e || (e = ar(t, t[ur] = {}, lr, dr), _r(t), e);
}
const pr = Symbol();
function gr(t, e) {
  const n = t.g;
  return e ? (t, r, i) => n(t, r, i, e) : n;
}
function mr(t, e, n) {
  const r = t.g;
  let i, s;
  return (t, o, a) => r(t, o, a, s ||= yr(e).T, i ||= Jn(e), n);
}
function yr(t) {
  let e = t[pr];
  return e || (sr(t), e = ar(t, t[pr] = {}, gr, mr), _r(t), e);
}
function _r(t) {
  pr in t && nr in t && ur in t && (t.length = 0);
}
function vr(t, e) {
  var n = t[e];
  if (n) return n;
  if ((n = t.ea) && (n = n[e])) {
    var r = (n = Yn(n))[0].h;
    if (n = n[1]) {
      const e = cr(n),
        i = fr(n).T;
      n = (n = t.m) ? n(i, e) : (t, n, s) => r(t, n, s, i, e);
    } else n = r;
    return t[e] = n;
  }
}
function Er(t, e, n) {
  for (var r = qt(t), i = +!!(512 & r) - 1, s = t.length, o = 512 & r ? 1 : 0, a = s + (256 & r ? -1 : 0); o < a; o++) {
    const r = t[o];
    if (null == r) continue;
    const s = o - i,
      a = vr(n, s);
    a && a(e, r, s);
  }
  if (256 & r) {
    r = t[s - 1];
    for (let t in r) i = +t, Number.isNaN(i) || null != (s = r[t]) && (a = vr(n, i)) && a(e, s, i);
  }
  if (t = de ? t[de] : void 0) for (Ct(e, e.g.end()), n = 0; n < t.length; n++) Ct(e, N(t[n]) || C());
}
function wr(t, e) {
  return new Bt(t, e, !1, !1);
}
function Tr(t, e) {
  return new Bt(t, e, !0, !1);
}
function Ar(t, e) {
  return new Bt(t, e, !1, !0);
}
function br(t, e, n) {
  fn(t, qt(t), e, n);
}
var kr = Ar(function (t, e, n, r, i) {
  return 2 === t.h && (t = _t(t, Be([void 0, void 0], r), i), ue(r = qt(e)), (i = ln(e, r, n)) instanceof Ke ? 0 != (2 & i.N) ? ((i = i.Y()).push(t), fn(e, r, n, i)) : i.Oa(t) : Array.isArray(i) ? (2 & $t(i) && fn(e, r, n, i = wn(i)), i.push(t)) : fn(e, r, n, [t]), !0);
}, function (t, e, n, r, i) {
  if (e instanceof Ke) e.forEach((e, s) => {
    Nt(t, n, Be([s, e], r), i);
  });else if (Array.isArray(e)) for (let s = 0; s < e.length; s++) {
    const o = e[s];
    Array.isArray(o) && Nt(t, n, Be(o, r), i);
  }
});
function xr(t, e, n) {
  t: if (null != e) {
    if (Te(e)) {
      if ("string" == typeof e) {
        e = Le(e);
        break t;
      }
      if ("number" == typeof e) {
        e = Se(e);
        break t;
      }
    }
    e = void 0;
  }
  null != e && ("string" == typeof e && xt(e), null != e && (Ot(t, n, 0), "number" == typeof e ? (t = t.g, $(e), Ft(t, K, Y)) : (n = xt(e), Ft(t.g, n.h, n.g))));
}
function Sr(t, e, n) {
  null != (e = Ae(e)) && null != e && (Ot(t, n, 0), Mt(t.g, e));
}
function Lr(t, e, n) {
  null != (e = Ee(e)) && (Ot(t, n, 0), t.g.g.push(e ? 1 : 0));
}
function Fr(t, e, n) {
  null != (e = Pe(e)) && Dt(t, n, c(e));
}
function Rr(t, e, n, r, i) {
  Nt(t, n, e instanceof zn ? e.s : Array.isArray(e) ? Be(e, r) : void 0, i);
}
function Mr(t, e, n) {
  null != (e = null == e || "string" == typeof e || M(e) || e instanceof B ? e : void 0) && Dt(t, n, X(e).buffer);
}
function Pr(t, e, n) {
  return (5 === t.h || 2 === t.h) && (e = pn(e, qt(e), n, 2, !1), 2 == t.h ? wt(t, ct, e) : e.push(ct(t.g)), !0);
}
var Cr,
  Or = wr(function (t, e, n) {
    if (1 !== t.h) return !1;
    var r = t.g;
    t = ht(r);
    const i = ht(r);
    r = 2 * (i >> 31) + 1;
    const s = i >>> 20 & 2047;
    return t = 4294967296 * (1048575 & i) + t, br(e, n, 2047 == s ? t ? NaN : 1 / 0 * r : 0 == s ? r * Math.pow(2, -1074) * t : r * Math.pow(2, s - 1075) * (t + 4503599627370496)), !0;
  }, function (t, e, n) {
    null != (e = ve(e)) && (Ot(t, n, 1), t = t.g, (n = z ||= new DataView(new ArrayBuffer(8))).setFloat64(0, +e, !0), K = n.getUint32(0, !0), Y = n.getUint32(4, !0), Pt(t, K), Pt(t, Y));
  }),
  Ir = wr(function (t, e, n) {
    return 5 === t.h && (br(e, n, ct(t.g)), !0);
  }, function (t, e, n) {
    null != (e = ve(e)) && (Ot(t, n, 5), t = t.g, q(e), Pt(t, K));
  }),
  Ur = Tr(Pr, function (t, e, n) {
    if (null != (e = $n(ve, e))) for (let o = 0; o < e.length; o++) {
      var r = t,
        i = n,
        s = e[o];
      null != s && (Ot(r, i, 5), r = r.g, q(s), Pt(r, K));
    }
  }),
  Dr = Tr(Pr, function (t, e, n) {
    if (null != (e = $n(ve, e)) && e.length) {
      Ot(t, n, 2), Rt(t.g, 4 * e.length);
      for (let r = 0; r < e.length; r++) n = t.g, q(e[r]), Pt(n, K);
    }
  }),
  Nr = wr(function (t, e, n) {
    return 0 === t.h && (br(e, n, it(t.g, Z)), !0);
  }, xr),
  Br = wr(function (t, e, n) {
    return 0 === t.h && (br(e, n, 0 === (t = it(t.g, Z)) ? void 0 : t), !0);
  }, xr),
  Gr = wr(function (t, e, n) {
    return 0 === t.h && (br(e, n, it(t.g, J)), !0);
  }, function (t, e, n) {
    t: if (null != e) {
      if (Te(e)) {
        if ("string" == typeof e) {
          var r = Math.trunc(Number(e));
          Number.isSafeInteger(r) && 0 <= r ? e = String(r) : (-1 !== (r = e.indexOf(".")) && (e = e.substring(0, r)), ke(e) || (nt(e), e = Q(K, Y)));
          break t;
        }
        if ("number" == typeof e) {
          e = 0 <= (e = Math.trunc(e)) && Number.isSafeInteger(e) ? e : function (t) {
            if (0 > t) {
              $(t);
              const e = Q(K, Y);
              return t = Number(e), Number.isSafeInteger(t) ? t : e;
            }
            return ke(String(t)) ? t : ($(t), J(K, Y));
          }(e);
          break t;
        }
      }
      e = void 0;
    }
    null != e && ("string" == typeof e && At(e), null != e && (Ot(t, n, 0), "number" == typeof e ? (t = t.g, $(e), Ft(t, K, Y)) : (n = At(e), Ft(t.g, n.h, n.g))));
  }),
  jr = wr(function (t, e, n) {
    return 0 === t.h && (br(e, n, ot(t.g)), !0);
  }, Sr),
  Vr = Tr(function (t, e, n) {
    return (0 === t.h || 2 === t.h) && (e = pn(e, qt(e), n, 2, !1), 2 == t.h ? wt(t, ot, e) : e.push(ot(t.g)), !0);
  }, function (t, e, n) {
    if (null != (e = $n(Ae, e)) && e.length) {
      n = It(t, n);
      for (let n = 0; n < e.length; n++) Mt(t.g, e[n]);
      Ut(t, n);
    }
  }),
  Xr = wr(function (t, e, n) {
    return 0 === t.h && (br(e, n, 0 === (t = ot(t.g)) ? void 0 : t), !0);
  }, Sr),
  Hr = wr(function (t, e, n) {
    return 0 === t.h && (br(e, n, st(t.g)), !0);
  }, Lr),
  Wr = wr(function (t, e, n) {
    return 0 === t.h && (br(e, n, !1 === (t = st(t.g)) ? void 0 : t), !0);
  }, Lr),
  zr = Tr(function (t, e, n) {
    return 2 === t.h && (bn(e, n, kn, t = vt(t)), !0);
  }, function (t, e, n) {
    if (null != (e = $n(Pe, e))) for (let o = 0; o < e.length; o++) {
      var r = t,
        i = n,
        s = e[o];
      null != s && Dt(r, i, c(s));
    }
  }),
  Kr = wr(function (t, e, n) {
    return 2 === t.h && (br(e, n, "" === (t = vt(t)) ? void 0 : t), !0);
  }, Fr),
  Yr = wr(function (t, e, n) {
    return 2 === t.h && (br(e, n, vt(t)), !0);
  }, Fr),
  $r = Ar(function (t, e, n, r, i) {
    return 2 === t.h && (_t(t, Ln(e, r, n, !0), i), !0);
  }, Rr),
  qr = Ar(function (t, e, n, r, i) {
    return 2 === t.h && (_t(t, Ln(e, r, n), i), !0);
  }, Rr);
Cr = new Bt(function (t, e, n, r, i) {
  if (2 !== t.h) return !1;
  r = Be(void 0, r);
  let s = qt(e);
  ue(s);
  let o = pn(e, s, n, 3);
  return s = qt(e), 4 & $t(o) && (o = Gt(o), Jt(o, -2079 & (1 | $t(o))), fn(e, s, n, o)), o.push(r), _t(t, r, i), !0;
}, function (t, e, n, r, i) {
  if (Array.isArray(e)) for (let s = 0; s < e.length; s++) Rr(t, e[s], n, r, i);
}, !0, !0);
var Jr = Ar(function (t, e, n, r, i, s) {
    if (2 !== t.h) return !1;
    let o = qt(e);
    return ue(o), (s = Sn(e, o, s)) && n !== s && fn(e, o, s), _t(t, e = Ln(e, r, n), i), !0;
  }, Rr),
  Zr = wr(function (t, e, n) {
    return 2 === t.h && (br(e, n, Et(t)), !0);
  }, Mr),
  Qr = Tr(function (t, e, n) {
    return (0 === t.h || 2 === t.h) && (e = pn(e, qt(e), n, 2, !1), 2 == t.h ? wt(t, at, e) : e.push(at(t.g)), !0);
  }, function (t, e, n) {
    if (null != (e = $n(be, e))) for (let o = 0; o < e.length; o++) {
      var r = t,
        i = n,
        s = e[o];
      null != s && (Ot(r, i, 0), Rt(r.g, s));
    }
  }),
  ti = wr(function (t, e, n) {
    return 0 === t.h && (br(e, n, ot(t.g)), !0);
  }, function (t, e, n) {
    null != (e = Ae(e)) && (e = parseInt(e, 10), Ot(t, n, 0), Mt(t.g, e));
  }),
  ei = Tr(function (t, e, n) {
    return (0 === t.h || 2 === t.h) && (e = pn(e, qt(e), n, 2, !1), 2 == t.h ? wt(t, ut, e) : e.push(ot(t.g)), !0);
  }, function (t, e, n) {
    if (null != (e = $n(Ae, e)) && e.length) {
      n = It(t, n);
      for (let n = 0; n < e.length; n++) Mt(t.g, e[n]);
      Ut(t, n);
    }
  });
class ni {
  constructor(t, e) {
    this.h = t, this.g = e, this.l = Rn, this.m = Cn, this.defaultValue = void 0;
  }
}
function ri(t, e) {
  return new ni(t, e);
}
function ii(t, e) {
  return (n, r) => {
    if (Tt.length) {
      const t = Tt.pop();
      t.o(r), lt(t.g, n, r), n = t;
    } else n = new class {
      constructor(t, e) {
        if (gt.length) {
          const n = gt.pop();
          lt(n, t, e), t = n;
        } else t = new class {
          constructor(t, e) {
            this.h = null, this.m = !1, this.g = this.l = this.j = 0, lt(this, t, e);
          }
          clear() {
            this.h = null, this.m = !1, this.g = this.l = this.j = 0, this.ca = !1;
          }
        }(t, e);
        this.g = t, this.l = this.g.g, this.h = this.m = -1, this.o(e);
      }
      o({
        ia: t = !1
      } = {}) {
        this.ia = t;
      }
    }(n, r);
    try {
      const r = new t(),
        s = r.s;
      Jn(e)(s, n);
      var i = r;
    } finally {
      n.g.clear(), n.m = -1, n.h = -1, 100 > Tt.length && Tt.push(n);
    }
    return i;
  };
}
function si(t) {
  return function () {
    const e = new class {
      constructor() {
        this.l = [], this.h = 0, this.g = new class {
          constructor() {
            this.g = [];
          }
          length() {
            return this.g.length;
          }
          end() {
            const t = this.g;
            return this.g = [], t;
          }
        }();
      }
    }();
    Er(this.s, e, fr(t)), Ct(e, e.g.end());
    const n = new Uint8Array(e.h),
      r = e.l,
      i = r.length;
    let s = 0;
    for (let t = 0; t < i; t++) {
      const e = r[t];
      n.set(e, s), s += e.length;
    }
    return e.l = [n], n;
  };
}
var oi = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  ai = [0, Kr, wr(function (t, e, n) {
    return 2 === t.h && (br(e, n, (t = Et(t)) === D() ? void 0 : t), !0);
  }, function (t, e, n) {
    if (null != e) {
      if (e instanceof zn) {
        const r = e.Qa;
        return void (r && (e = r(e), null != e && Dt(t, n, X(e).buffer)));
      }
      if (Array.isArray(e)) return;
    }
    Mr(t, e, n);
  })],
  hi = [0, Yr],
  ci = [0, jr, ti, Hr, -1, Vr, ti, -1],
  ui = [0, Hr, -1],
  li = class extends zn {
    constructor() {
      super();
    }
  };
li.B = [6];
var di = [0, Hr, Yr, Hr, ti, -1, ei, Yr, -1, ui, ti],
  fi = [0, Yr, -2],
  pi = class extends zn {
    constructor() {
      super();
    }
  },
  gi = [0],
  mi = [0, jr, Hr, -4],
  yi = class extends zn {
    constructor(t) {
      super(t, 2);
    }
  },
  _i = {},
  vi = [-2, _i, Hr];
_i[336783863] = [0, Yr, Hr, -1, jr, [0, [1, 2, 3, 4, 5, 6], Jr, gi, Jr, di, Jr, fi, Jr, mi, Jr, ci, Jr, [0, Yr]], hi, Hr, [0, [1, 3], [2, 4], Jr, [0, Vr], -1, Jr, [0, zr], -1, Cr, [0, Yr, -1]], Yr];
var Ei = [0, Kr, Wr],
  wi = [0, Br, -1, Wr, -3, Br, Vr, Kr, Xr, Br, -1, Wr, Xr, Wr, -2, Kr],
  Ti = [-1, {}],
  Ai = [0, Yr, 1, Ti],
  bi = [0, Yr, zr, Ti];
function ki(t, e) {
  An(t, 2, Me(e), "");
}
function xi(t, e) {
  bn(t.s, 3, Re, e);
}
function Si(t, e) {
  bn(t.s, 4, Re, e);
}
var Li = class extends zn {
  constructor(t) {
    super(t, 500);
  }
  o(t) {
    return Cn(this, 0, 7, t);
  }
};
Li.B = [3, 4, 5, 6, 8, 13, 17, 1005];
var Fi = [-500, Kr, -1, zr, -3, vi, Cr, ai, Xr, -1, Ai, bi, Cr, Ei, Kr, wi, Xr, zr, 987, zr],
  Ri = [0, Kr, -1, Ti],
  Mi = [-500, Yr, -1, [-1, {}], 998, Yr],
  Pi = [-500, Yr, zr, -1, [-2, {}, Hr], 997, zr, -1],
  Ci = [-500, Yr, zr, Ti, 998, zr];
function Oi(t, e) {
  Dn(t, 1, Li, e);
}
function Ii(t, e) {
  bn(t.s, 10, Re, e);
}
function Ui(t, e) {
  bn(t.s, 15, Re, e);
}
var Di = class extends zn {
  constructor(t) {
    super(t, 500);
  }
  o(t) {
    return Cn(this, 0, 1001, t);
  }
};
Di.B = [1, 6, 7, 9, 10, 15, 16, 17, 14, 1002];
var Ni = [-500, Cr, Fi, 4, Cr, Mi, Cr, Pi, Xr, Cr, Ci, zr, Xr, Ai, bi, Cr, Ri, zr, -2, wi, Kr, -1, Wr, 979, Ti, Cr, ai],
  Bi = ii(Di, Ni);
Di.prototype.g = si(Ni);
var Gi = [0, Cr, [0, jr, -2]],
  ji = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Vi = [0, jr, Ir, Yr, -1],
  Xi = class extends zn {
    constructor(t) {
      super(t);
    }
    g() {
      return Pn(this, ji, 1);
    }
  };
Xi.B = [1];
var Hi = [0, Cr, Vi],
  Wi = ii(Xi, Hi),
  zi = [0, jr, Ir],
  Ki = [0, jr, -1, Gi],
  Yi = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  $i = [0, jr, -3],
  qi = [0, Ir, -3],
  Ji = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Zi = [0, Ir, -1, Yr, Ir],
  Qi = class extends zn {
    constructor(t) {
      super(t);
    }
    h() {
      return Rn(this, Yi, 2);
    }
    g() {
      return Pn(this, Ji, 5);
    }
  };
Qi.B = [5];
var ts = [0, ti, $i, qi, Ki, Cr, Zi],
  es = class extends zn {
    constructor(t) {
      super(t);
    }
  };
es.B = [1, 2, 3, 8, 9];
var ns = ii(es, [0, zr, Vr, Dr, ts, Yr, -1, Nr, Cr, zi, zr, Nr]),
  rs = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  is = [0, Ir, -4],
  ss = class extends zn {
    constructor(t) {
      super(t);
    }
  };
ss.B = [1];
var os = ii(ss, [0, Cr, is]),
  as = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  hs = [0, Ir, -4],
  cs = class extends zn {
    constructor(t) {
      super(t);
    }
  };
cs.B = [1];
var us = ii(cs, [0, Cr, hs]),
  ls = class extends zn {
    constructor(t) {
      super(t);
    }
  };
ls.B = [3];
var ds = [0, jr, -1, Dr, ti],
  fs = class extends zn {
    constructor() {
      super();
    }
  };
fs.prototype.g = si([0, Ir, -4, Nr]);
var ps = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  gs = [0, 1, jr, Yr, Hi],
  ms = class extends zn {
    constructor(t) {
      super(t);
    }
  };
ms.B = [1];
var ys = ii(ms, [0, Cr, gs, Nr]),
  _s = class extends zn {
    constructor(t) {
      super(t);
    }
  };
_s.B = [1];
var vs = class extends zn {
    constructor(t) {
      super(t);
    }
    qa() {
      const t = mn(this);
      return null == t ? D() : t;
    }
  },
  Es = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  ws = [1, 2],
  Ts = [0, ws, Jr, [0, Dr], Jr, [0, Zr], jr, Yr],
  As = class extends zn {
    constructor(t) {
      super(t);
    }
  };
As.B = [1];
var bs = ii(As, [0, Cr, Ts, Nr]),
  ks = class extends zn {
    constructor(t) {
      super(t);
    }
  };
ks.B = [4, 5];
var xs = [0, Yr, jr, Ir, zr, -1],
  Ss = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Ls = [0, Hr, -1],
  Fs = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Rs = [1, 2, 3, 4, 5],
  Ms = class extends zn {
    constructor(t) {
      super(t);
    }
    g() {
      return null != mn(this);
    }
    h() {
      return null != Pe(cn(this, 2));
    }
  },
  Ps = [0, Zr, Yr, [0, jr, Nr, -1], [0, Gr, Nr]],
  Cs = class extends zn {
    constructor(t) {
      super(t);
    }
    g() {
      return Ee(cn(this, 2)) ?? !1;
    }
  },
  Os = [0, Ps, Hr, [0, Rs, Jr, mi, Jr, di, Jr, ci, Jr, gi, Jr, fi], ti],
  Is = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Us = [0, Os, Ir, -1, jr],
  Ds = ri(502141897, Is);
_i[502141897] = Us;
var Ns = [0, Ps];
_i[512499200] = Ns;
var Bs = [0, Ns];
_i[515723506] = Bs;
var Gs = ii(class extends zn {
    constructor(t) {
      super(t);
    }
  }, [0, [0, ti, -1, Ur, Qr], ds]),
  js = [0, Os];
_i[508981768] = js;
var Vs = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Xs = [0, Os, Ir, js, Hr],
  Hs = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Ws = [0, Os, Us, Xs, Ir, Bs];
_i[508968149] = Xs;
var zs = ri(508968150, Hs);
_i[508968150] = Ws;
var Ks = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Ys = ri(513916220, Ks);
_i[513916220] = [0, Os, Ws, jr];
var $s = class extends zn {
    constructor(t) {
      super(t);
    }
    h() {
      return Rn(this, ks, 2);
    }
    g() {
      dn(this, 2);
    }
  },
  qs = [0, Os, xs];
_i[478825465] = qs;
var Js = [0, Os];
_i[478825422] = Js;
var Zs = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Qs = [0, Os, Js, qs, -1],
  to = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  eo = [0, Os, Ir, jr],
  no = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  ro = [0, Os, Ir],
  io = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  so = [0, Os, eo, ro, Ir],
  oo = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  ao = [0, Os, so, Qs];
_i[463370452] = Qs, _i[464864288] = eo, _i[474472470] = ro;
var ho = ri(462713202, io);
_i[462713202] = so;
var co = ri(479097054, oo);
_i[479097054] = ao;
var uo = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  lo = [0, Os],
  fo = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  po = [0, Os, Ir, -1, jr];
_i[514774813] = po;
var go = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  mo = [0, Os, Ir, Hr];
_i[518928384] = mo;
var yo = class extends zn {
  constructor() {
    super();
  }
};
yo.prototype.g = si([0, Os, ro, lo, Us, Xs, po, mo]);
var _o = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  vo = ri(456383383, _o);
_i[456383383] = [0, Os, xs];
var Eo = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  wo = ri(476348187, Eo);
_i[476348187] = [0, Os, Ls];
var To = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Ao = [0, ti, -1],
  bo = class extends zn {
    constructor(t) {
      super(t);
    }
  };
bo.B = [3];
var ko = ri(458105876, class extends zn {
  constructor(t) {
    super(t);
  }
  g() {
    var t = this.s;
    const e = qt(t);
    var n = 2 & e;
    return t = function (t, e, n) {
      var r = bo;
      const i = 2 & e;
      let s = !1;
      if (null == n) {
        if (i) return Ze();
        n = [];
      } else if (n.constructor === Ke) {
        if (0 == (2 & n.N) || i) return n;
        n = n.Y();
      } else Array.isArray(n) ? s = !!(2 & $t(n)) : n = [];
      if (i) {
        if (!n.length) return Ze();
        s || (s = !0, Zt(n));
      } else s && (s = !1, n = wn(n));
      return s || (64 & $t(n) ? Kt(n, 32) : 32 & e && zt(n, 32)), fn(t, e, 2, r = new Ke(n, r, Oe, void 0), !1), r;
    }(t, e, ln(t, e, 2)), null == t || !n && bo && (t.ta = !0), n = t;
  }
});
_i[458105876] = [0, Ao, kr, [!0, Nr, [0, Yr, -1, zr]]];
var xo = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  So = ri(458105758, xo);
_i[458105758] = [0, Os, Yr, Ao];
var Lo = class extends zn {
  constructor(t) {
    super(t);
  }
};
Lo.B = [5, 6];
var Fo = ri(443442058, Lo);
_i[443442058] = [0, Os, Yr, jr, Ir, zr, -1];
var Ro = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Mo = ri(516587230, Ro);
function Po(t, e) {
  return e = e ? e.clone() : new ks(), void 0 !== t.displayNamesLocale ? dn(e, 1, Me(t.displayNamesLocale)) : void 0 === t.displayNamesLocale && dn(e, 1), void 0 !== t.maxResults ? Xn(e, 2, t.maxResults) : "maxResults" in t && dn(e, 2), void 0 !== t.scoreThreshold ? Hn(e, 3, t.scoreThreshold) : "scoreThreshold" in t && dn(e, 3), void 0 !== t.categoryAllowlist ? Tn(e, 4, t.categoryAllowlist) : "categoryAllowlist" in t && dn(e, 4), void 0 !== t.categoryDenylist ? Tn(e, 5, t.categoryDenylist) : "categoryDenylist" in t && dn(e, 5), e;
}
function Co(t, e = -1, n = "") {
  return {
    categories: t.map(t => ({
      index: Bn(Nn(t, 1), 0) ?? -1,
      score: Gn(t, 2) ?? 0,
      categoryName: jn(t, 3) ?? "",
      displayName: jn(t, 4) ?? ""
    })),
    headIndex: e,
    headName: n
  };
}
function Oo(t) {
  var e = yn(t, 3, ve),
    n = yn(t, 2, Ae),
    r = yn(t, 1, Pe),
    i = yn(t, 9, Pe);
  const s = {
    categories: [],
    keypoints: []
  };
  for (let t = 0; t < e.length; t++) s.categories.push({
    score: e[t],
    index: n[t] ?? -1,
    categoryName: r[t] ?? "",
    displayName: i[t] ?? ""
  });
  if ((e = Rn(t, Qi, 4)?.h()) && (s.boundingBox = {
    originX: Nn(e, 1) ?? 0,
    originY: Nn(e, 2) ?? 0,
    width: Nn(e, 3) ?? 0,
    height: Nn(e, 4) ?? 0,
    angle: 0
  }), Rn(t, Qi, 4)?.g().length) for (const e of Rn(t, Qi, 4).g()) s.keypoints.push({
    x: gn(e, 1) ?? 0,
    y: gn(e, 2) ?? 0,
    score: gn(e, 4) ?? 0,
    label: Pe(cn(e, 3)) ?? ""
  });
  return s;
}
function Io(t) {
  const e = [];
  for (const n of Pn(t, as, 1)) e.push({
    x: Gn(n, 1) ?? 0,
    y: Gn(n, 2) ?? 0,
    z: Gn(n, 3) ?? 0,
    visibility: Gn(n, 4) ?? 0
  });
  return e;
}
function Uo(t) {
  const e = [];
  for (const n of Pn(t, rs, 1)) e.push({
    x: Gn(n, 1) ?? 0,
    y: Gn(n, 2) ?? 0,
    z: Gn(n, 3) ?? 0,
    visibility: Gn(n, 4) ?? 0
  });
  return e;
}
function Do(t) {
  return Array.from(t, t => 127 < t ? t - 256 : t);
}
function No(t, e) {
  if (t.length !== e.length) throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t.length} vs. ${e.length}).`);
  let n = 0,
    r = 0,
    i = 0;
  for (let s = 0; s < t.length; s++) n += t[s] * e[s], r += t[s] * t[s], i += e[s] * e[s];
  if (0 >= r || 0 >= i) throw Error("Cannot compute cosine similarity on embedding with 0 norm.");
  return n / Math.sqrt(r * i);
}
let Bo;
_i[516587230] = [0, Os, po, mo, Ir];
const Go = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11]);
async function jo() {
  if (void 0 === Bo) try {
    await WebAssembly.instantiate(Go), Bo = !0;
  } catch {
    Bo = !1;
  }
  return Bo;
}
async function Vo(t, e = "") {
  const n = (await jo()) ? "wasm_internal" : "wasm_nosimd_internal";
  return {
    wasmLoaderPath: `${e}/${t}_${n}.js`,
    wasmBinaryPath: `${e}/${t}_${n}.wasm`
  };
}
var Xo = class {};
exports.FilesetResolver = Xo;
function Ho() {
  var t = navigator;
  return "undefined" != typeof OffscreenCanvas && (!function (t = navigator) {
    return (t = t.userAgent).includes("Safari") && !t.includes("Chrome");
  }(t) || !!((t = t.userAgent.match(/Version\/([\d]+).*Safari/)) && 1 <= t.length && 17 <= Number(t[1])));
}
async function Wo(t) {
  if ("function" != typeof importScripts) {
    const e = document.createElement("script");
    return e.src = t.toString(), e.crossOrigin = "anonymous", new Promise((t, n) => {
      e.addEventListener("load", () => {
        t();
      }, !1), e.addEventListener("error", t => {
        n(t);
      }, !1), document.body.appendChild(e);
    });
  }
  importScripts(t.toString());
}
function zo(t) {
  return void 0 !== t.videoWidth ? [t.videoWidth, t.videoHeight] : void 0 !== t.naturalWidth ? [t.naturalWidth, t.naturalHeight] : void 0 !== t.displayWidth ? [t.displayWidth, t.displayHeight] : [t.width, t.height];
}
function Ko(t, e, n) {
  t.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"), n(e = t.i.stringToNewUTF8(e)), t.i._free(e);
}
function Yo(t, e, n) {
  if (!t.i.canvas) throw Error("No OpenGL canvas configured.");
  if (n ? t.i._bindTextureToStream(n) : t.i._bindTextureToCanvas(), !(n = t.i.canvas.getContext("webgl2") || t.i.canvas.getContext("webgl"))) throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");
  t.i.gpuOriginForWebTexturesIsBottomLeft && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !0), n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, e), t.i.gpuOriginForWebTexturesIsBottomLeft && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !1);
  const [r, i] = zo(e);
  return !t.l || r === t.i.canvas.width && i === t.i.canvas.height || (t.i.canvas.width = r, t.i.canvas.height = i), [r, i];
}
function $o(t, e, n) {
  t.m || console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");
  const r = new Uint32Array(e.length);
  for (let n = 0; n < e.length; n++) r[n] = t.i.stringToNewUTF8(e[n]);
  e = t.i._malloc(4 * r.length), t.i.HEAPU32.set(r, e >> 2), n(e);
  for (const e of r) t.i._free(e);
  t.i._free(e);
}
function qo(t, e, n) {
  t.i.simpleListeners = t.i.simpleListeners || {}, t.i.simpleListeners[e] = n;
}
function Jo(t, e, n) {
  let r = [];
  t.i.simpleListeners = t.i.simpleListeners || {}, t.i.simpleListeners[e] = (t, e, i) => {
    e ? (n(r, i), r = []) : r.push(t);
  };
}
Xo.forVisionTasks = function (t) {
  return Vo("vision", t);
}, Xo.forTextTasks = function (t) {
  return Vo("text", t);
}, Xo.forGenAiExperimentalTasks = function (t) {
  return Vo("genai_experimental", t);
}, Xo.forGenAiTasks = function (t) {
  return Vo("genai", t);
}, Xo.forAudioTasks = function (t) {
  return Vo("audio", t);
}, Xo.isSimdSupported = function () {
  return jo();
};
async function Zo(t, e, n, r) {
  return t = await (async (t, e, n, r, i) => {
    if (e && (await Wo(e)), !self.ModuleFactory) throw Error("ModuleFactory not set.");
    if (n && (await Wo(n), !self.ModuleFactory)) throw Error("ModuleFactory not set.");
    return self.Module && i && ((e = self.Module).locateFile = i.locateFile, i.mainScriptUrlOrBlob && (e.mainScriptUrlOrBlob = i.mainScriptUrlOrBlob)), i = await self.ModuleFactory(self.Module || i), self.ModuleFactory = self.Module = void 0, new t(i, r);
  })(t, n.wasmLoaderPath, n.assetLoaderPath, e, {
    locateFile: t => t.endsWith(".wasm") ? n.wasmBinaryPath.toString() : n.assetBinaryPath && t.endsWith(".data") ? n.assetBinaryPath.toString() : t
  }), await t.o(r), t;
}
function Qo(t, e) {
  const n = Rn(t.baseOptions, Ms, 1) || new Ms();
  "string" == typeof e ? (dn(n, 2, Me(e)), dn(n, 1)) : e instanceof Uint8Array && (dn(n, 1, ae(e, !1, !1)), dn(n, 2)), Cn(t.baseOptions, 0, 1, n);
}
function ta(t) {
  try {
    const e = t.K.length;
    if (1 === e) throw Error(t.K[0].message);
    if (1 < e) throw Error("Encountered multiple errors: " + t.K.map(t => t.message).join(", "));
  } finally {
    t.K = [];
  }
}
function ea(t, e) {
  t.J = Math.max(t.J, e);
}
function na(t, e) {
  t.C = new Li(), ki(t.C, "PassThroughCalculator"), xi(t.C, "free_memory"), Si(t.C, "free_memory_unused_out"), Ii(e, "free_memory"), Oi(e, t.C);
}
function ra(t, e) {
  xi(t.C, e), Si(t.C, e + "_unused_out");
}
function ia(t) {
  t.g.addBoolToStream(!0, "free_memory", t.J);
}
var sa = class {
  constructor(t) {
    this.g = t, this.K = [], this.J = 0, this.g.setAutoRenderToScreen(!1);
  }
  l(t, e = !0) {
    if (e) {
      const e = t.baseOptions || {};
      if (t.baseOptions?.modelAssetBuffer && t.baseOptions?.modelAssetPath) throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");
      if (!(Rn(this.baseOptions, Ms, 1)?.g() || Rn(this.baseOptions, Ms, 1)?.h() || t.baseOptions?.modelAssetBuffer || t.baseOptions?.modelAssetPath)) throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");
      if (function (t, e) {
        let n = Rn(t.baseOptions, Fs, 3);
        if (!n) {
          var r = n = new Fs(),
            i = new pi();
          On(r, 4, Rs, i);
        }
        "delegate" in e && ("GPU" === e.delegate ? (e = n, r = new li(), On(e, 2, Rs, r)) : (e = n, r = new pi(), On(e, 4, Rs, r))), Cn(t.baseOptions, 0, 3, n);
      }(this, e), e.modelAssetPath) return fetch(e.modelAssetPath.toString()).then(t => {
        if (t.ok) return t.arrayBuffer();
        throw Error(`Failed to fetch model: ${e.modelAssetPath} (${t.status})`);
      }).then(t => {
        try {
          this.g.i.FS_unlink("/model.dat");
        } catch {}
        this.g.i.FS_createDataFile("/", "model.dat", new Uint8Array(t), !0, !1, !1), Qo(this, "/model.dat"), this.m(), this.L();
      });
      if (e.modelAssetBuffer instanceof Uint8Array) Qo(this, e.modelAssetBuffer);else if (e.modelAssetBuffer) return async function (t) {
        const e = [];
        for (var n = 0;;) {
          const {
            done: r,
            value: i
          } = await t.read();
          if (r) break;
          e.push(i), n += i.length;
        }
        if (0 === e.length) return new Uint8Array(0);
        if (1 === e.length) return e[0];
        t = new Uint8Array(n), n = 0;
        for (const r of e) t.set(r, n), n += r.length;
        return t;
      }(e.modelAssetBuffer).then(t => {
        Qo(this, t), this.m(), this.L();
      });
    }
    return this.m(), this.L(), Promise.resolve();
  }
  L() {}
  fa() {
    let t;
    if (this.g.fa(e => {
      t = Bi(e);
    }), !t) throw Error("Failed to retrieve CalculatorGraphConfig");
    return t;
  }
  setGraph(t, e) {
    this.g.attachErrorListener((t, e) => {
      this.K.push(Error(e));
    }), this.g.Ma(), this.g.setGraph(t, e), this.C = void 0, ta(this);
  }
  finishProcessing() {
    this.g.finishProcessing(), ta(this);
  }
  close() {
    this.C = void 0, this.g.closeGraph();
  }
};
function oa(t, e) {
  if (!t) throw Error(`Unable to obtain required WebGL resource: ${e}`);
  return t;
}
sa.prototype.close = sa.prototype.close, function (e, n) {
  e = e.split(".");
  var r,
    i = t;
  e[0] in i || void 0 === i.execScript || i.execScript("var " + e[0]);
  for (; e.length && (r = e.shift());) e.length || void 0 === n ? i = i[r] && i[r] !== Object.prototype[r] ? i[r] : i[r] = {} : i[r] = n;
}("TaskRunner", sa);
class aa {
  constructor(t, e, n, r) {
    this.g = t, this.h = e, this.m = n, this.l = r;
  }
  bind() {
    this.g.bindVertexArray(this.h);
  }
  close() {
    this.g.deleteVertexArray(this.h), this.g.deleteBuffer(this.m), this.g.deleteBuffer(this.l);
  }
}
function ha(t, e, n) {
  const r = t.g;
  if (n = oa(r.createShader(n), "Failed to create WebGL shader"), r.shaderSource(n, e), r.compileShader(n), !r.getShaderParameter(n, r.COMPILE_STATUS)) throw Error(`Could not compile WebGL shader: ${r.getShaderInfoLog(n)}`);
  return r.attachShader(t.h, n), n;
}
function ca(t, e) {
  const n = t.g,
    r = oa(n.createVertexArray(), "Failed to create vertex array");
  n.bindVertexArray(r);
  const i = oa(n.createBuffer(), "Failed to create buffer");
  n.bindBuffer(n.ARRAY_BUFFER, i), n.enableVertexAttribArray(t.K), n.vertexAttribPointer(t.K, 2, n.FLOAT, !1, 0, 0), n.bufferData(n.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), n.STATIC_DRAW);
  const s = oa(n.createBuffer(), "Failed to create buffer");
  return n.bindBuffer(n.ARRAY_BUFFER, s), n.enableVertexAttribArray(t.J), n.vertexAttribPointer(t.J, 2, n.FLOAT, !1, 0, 0), n.bufferData(n.ARRAY_BUFFER, new Float32Array(e ? [0, 1, 0, 0, 1, 0, 1, 1] : [0, 0, 0, 1, 1, 1, 1, 0]), n.STATIC_DRAW), n.bindBuffer(n.ARRAY_BUFFER, null), n.bindVertexArray(null), new aa(n, r, i, s);
}
function ua(t, e) {
  if (t.g) {
    if (e !== t.g) throw Error("Cannot change GL context once initialized");
  } else t.g = e;
}
function la(t, e, n, r) {
  return ua(t, e), t.h || (t.m(), t.D()), n ? (t.v || (t.v = ca(t, !0)), n = t.v) : (t.A || (t.A = ca(t, !1)), n = t.A), e.useProgram(t.h), n.bind(), t.l(), t = r(), n.g.bindVertexArray(null), t;
}
function da(t, e, n) {
  return ua(t, e), t = oa(e.createTexture(), "Failed to create texture"), e.bindTexture(e.TEXTURE_2D, t), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, n ?? e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, n ?? e.LINEAR), e.bindTexture(e.TEXTURE_2D, null), t;
}
function fa(t, e, n) {
  ua(t, e), t.u || (t.u = oa(e.createFramebuffer(), "Failed to create framebuffe.")), e.bindFramebuffer(e.FRAMEBUFFER, t.u), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, n, 0);
}
function pa(t) {
  t.g?.bindFramebuffer(t.g.FRAMEBUFFER, null);
}
var ga = class {
  H() {
    return "\n  precision mediump float;\n  varying vec2 vTex;\n  uniform sampler2D inputTexture;\n  void main() {\n    gl_FragColor = texture2D(inputTexture, vTex);\n  }\n ";
  }
  m() {
    const t = this.g;
    if (this.h = oa(t.createProgram(), "Failed to create WebGL program"), this.ba = ha(this, "\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }", t.VERTEX_SHADER), this.aa = ha(this, this.H(), t.FRAGMENT_SHADER), t.linkProgram(this.h), !t.getProgramParameter(this.h, t.LINK_STATUS)) throw Error(`Error during program linking: ${t.getProgramInfoLog(this.h)}`);
    this.K = t.getAttribLocation(this.h, "aVertex"), this.J = t.getAttribLocation(this.h, "aTex");
  }
  D() {}
  l() {}
  close() {
    if (this.h) {
      const t = this.g;
      t.deleteProgram(this.h), t.deleteShader(this.ba), t.deleteShader(this.aa);
    }
    this.u && this.g.deleteFramebuffer(this.u), this.A && this.A.close(), this.v && this.v.close();
  }
};
var ma = class extends ga {
    H() {
      return "\n  precision mediump float;\n  uniform sampler2D backgroundTexture;\n  uniform sampler2D maskTexture;\n  uniform sampler2D colorMappingTexture;\n  varying vec2 vTex;\n  void main() {\n    vec4 backgroundColor = texture2D(backgroundTexture, vTex);\n    float category = texture2D(maskTexture, vTex).r;\n    vec4 categoryColor = texture2D(colorMappingTexture, vec2(category, 0.0));\n    gl_FragColor = mix(backgroundColor, categoryColor, categoryColor.a);\n  }\n ";
    }
    D() {
      const t = this.g;
      t.activeTexture(t.TEXTURE1), this.C = da(this, t, t.LINEAR), t.activeTexture(t.TEXTURE2), this.j = da(this, t, t.NEAREST);
    }
    m() {
      super.m();
      const t = this.g;
      this.M = oa(t.getUniformLocation(this.h, "backgroundTexture"), "Uniform location"), this.V = oa(t.getUniformLocation(this.h, "colorMappingTexture"), "Uniform location"), this.L = oa(t.getUniformLocation(this.h, "maskTexture"), "Uniform location");
    }
    l() {
      super.l();
      const t = this.g;
      t.uniform1i(this.L, 0), t.uniform1i(this.M, 1), t.uniform1i(this.V, 2);
    }
    close() {
      this.C && this.g.deleteTexture(this.C), this.j && this.g.deleteTexture(this.j), super.close();
    }
  },
  ya = class extends ga {
    H() {
      return "\n  precision mediump float;\n  uniform sampler2D maskTexture;\n  uniform sampler2D defaultTexture;\n  uniform sampler2D overlayTexture;\n  varying vec2 vTex;\n  void main() {\n    float confidence = texture2D(maskTexture, vTex).r;\n    vec4 defaultColor = texture2D(defaultTexture, vTex);\n    vec4 overlayColor = texture2D(overlayTexture, vTex);\n    // Apply the alpha from the overlay and merge in the default color\n    overlayColor = mix(defaultColor, overlayColor, overlayColor.a);\n    gl_FragColor = mix(defaultColor, overlayColor, confidence);\n  }\n ";
    }
    D() {
      const t = this.g;
      t.activeTexture(t.TEXTURE1), this.j = da(this, t), t.activeTexture(t.TEXTURE2), this.C = da(this, t);
    }
    m() {
      super.m();
      const t = this.g;
      this.L = oa(t.getUniformLocation(this.h, "defaultTexture"), "Uniform location"), this.M = oa(t.getUniformLocation(this.h, "overlayTexture"), "Uniform location"), this.I = oa(t.getUniformLocation(this.h, "maskTexture"), "Uniform location");
    }
    l() {
      super.l();
      const t = this.g;
      t.uniform1i(this.I, 0), t.uniform1i(this.L, 1), t.uniform1i(this.M, 2);
    }
    close() {
      this.j && this.g.deleteTexture(this.j), this.C && this.g.deleteTexture(this.C), super.close();
    }
  };
function _a(t, e) {
  switch (e) {
    case 0:
      return t.g.find(t => t instanceof Uint8Array);
    case 1:
      return t.g.find(t => t instanceof Float32Array);
    case 2:
      return t.g.find(t => "undefined" != typeof WebGLTexture && t instanceof WebGLTexture);
    default:
      throw Error(`Type is not supported: ${e}`);
  }
}
function va(t) {
  var e = _a(t, 1);
  if (!e) {
    if (e = _a(t, 0)) e = new Float32Array(e).map(t => t / 255);else {
      e = new Float32Array(t.width * t.height);
      const r = wa(t);
      var n = Aa(t);
      if (fa(n, r, Ea(t)), "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in self.document) {
        n = new Float32Array(t.width * t.height * 4), r.readPixels(0, 0, t.width, t.height, r.RGBA, r.FLOAT, n);
        for (let t = 0, r = 0; t < e.length; ++t, r += 4) e[t] = n[r];
      } else r.readPixels(0, 0, t.width, t.height, r.RED, r.FLOAT, e);
    }
    t.g.push(e);
  }
  return e;
}
function Ea(t) {
  let e = _a(t, 2);
  if (!e) {
    const n = wa(t);
    e = ba(t);
    const r = va(t),
      i = Ta(t);
    n.texImage2D(n.TEXTURE_2D, 0, i, t.width, t.height, 0, n.RED, n.FLOAT, r), ka(t);
  }
  return e;
}
function wa(t) {
  if (!t.canvas) throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");
  return t.h || (t.h = oa(t.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), t.h;
}
function Ta(t) {
  if (t = wa(t), !xa) if (t.getExtension("EXT_color_buffer_float") && t.getExtension("OES_texture_float_linear") && t.getExtension("EXT_float_blend")) xa = t.R32F;else {
    if (!t.getExtension("EXT_color_buffer_half_float")) throw Error("GPU does not fully support 4-channel float32 or float16 formats");
    xa = t.R16F;
  }
  return xa;
}
function Aa(t) {
  return t.l || (t.l = new ga()), t.l;
}
function ba(t) {
  const e = wa(t);
  e.viewport(0, 0, t.width, t.height), e.activeTexture(e.TEXTURE0);
  let n = _a(t, 2);
  return n || (n = da(Aa(t), e, t.m ? e.LINEAR : e.NEAREST), t.g.push(n), t.j = !0), e.bindTexture(e.TEXTURE_2D, n), n;
}
function ka(t) {
  t.h.bindTexture(t.h.TEXTURE_2D, null);
}
var xa,
  Sa = class {
    constructor(t, e, n, r, i, s, o) {
      this.g = t, this.m = e, this.j = n, this.canvas = r, this.l = i, this.width = s, this.height = o, this.j && 0 === --La && console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.");
    }
    Ha() {
      return !!_a(this, 0);
    }
    la() {
      return !!_a(this, 1);
    }
    R() {
      return !!_a(this, 2);
    }
    ka() {
      return (e = _a(t = this, 0)) || (e = va(t), e = new Uint8Array(e.map(t => 255 * t)), t.g.push(e)), e;
      var t, e;
    }
    ja() {
      return va(this);
    }
    O() {
      return Ea(this);
    }
    clone() {
      const t = [];
      for (const e of this.g) {
        let n;
        if (e instanceof Uint8Array) n = new Uint8Array(e);else if (e instanceof Float32Array) n = new Float32Array(e);else {
          if (!(e instanceof WebGLTexture)) throw Error(`Type is not supported: ${e}`);
          {
            const t = wa(this),
              e = Aa(this);
            t.activeTexture(t.TEXTURE1), n = da(e, t, this.m ? t.LINEAR : t.NEAREST), t.bindTexture(t.TEXTURE_2D, n);
            const r = Ta(this);
            t.texImage2D(t.TEXTURE_2D, 0, r, this.width, this.height, 0, t.RED, t.FLOAT, null), t.bindTexture(t.TEXTURE_2D, null), fa(e, t, n), la(e, t, !1, () => {
              ba(this), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), t.drawArrays(t.TRIANGLE_FAN, 0, 4), ka(this);
            }), pa(e), ka(this);
          }
        }
        t.push(n);
      }
      return new Sa(t, this.m, this.R(), this.canvas, this.l, this.width, this.height);
    }
    close() {
      this.j && wa(this).deleteTexture(_a(this, 2)), La = -1;
    }
  };
exports.MPMask = Sa;
Sa.prototype.close = Sa.prototype.close, Sa.prototype.clone = Sa.prototype.clone, Sa.prototype.getAsWebGLTexture = Sa.prototype.O, Sa.prototype.getAsFloat32Array = Sa.prototype.ja, Sa.prototype.getAsUint8Array = Sa.prototype.ka, Sa.prototype.hasWebGLTexture = Sa.prototype.R, Sa.prototype.hasFloat32Array = Sa.prototype.la, Sa.prototype.hasUint8Array = Sa.prototype.Ha;
var La = 250;
const Fa = {
  color: "white",
  lineWidth: 4,
  radius: 6
};
function Ra(t) {
  return {
    ...Fa,
    fillColor: (t = t || {}).color,
    ...t
  };
}
function Ma(t, e) {
  return t instanceof Function ? t(e) : t;
}
function Pa(t, e, n) {
  return Math.max(Math.min(e, n), Math.min(Math.max(e, n), t));
}
function Ca(t) {
  if (!t.l) throw Error("CPU rendering requested but CanvasRenderingContext2D not provided.");
  return t.l;
}
function Oa(t) {
  if (!t.j) throw Error("GPU rendering requested but WebGL2RenderingContext not provided.");
  return t.j;
}
function Ia(t, e, n) {
  if (e.R()) n(e.O());else {
    const r = e.la() ? e.ja() : e.ka();
    t.m = t.m ?? new ga();
    const i = Oa(t);
    n((t = new Sa([r], e.m, !1, i.canvas, t.m, e.width, e.height)).O()), t.close();
  }
}
function Ua(t, e, n, r) {
  const i = function (t) {
      return t.g || (t.g = new ma()), t.g;
    }(t),
    s = Oa(t),
    o = Array.isArray(n) ? new ImageData(new Uint8ClampedArray(n), 1, 1) : n;
  la(i, s, !0, () => {
    !function (t, e, n, r) {
      const i = t.g;
      if (i.activeTexture(i.TEXTURE0), i.bindTexture(i.TEXTURE_2D, e), i.activeTexture(i.TEXTURE1), i.bindTexture(i.TEXTURE_2D, t.C), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, n), t.I && function (t, e) {
        if (t !== e) return !1;
        t = t.entries(), e = e.entries();
        for (const [r, i] of t) {
          t = r;
          const s = i;
          var n = e.next();
          if (n.done) return !1;
          const [o, a] = n.value;
          if (n = a, t !== o || s[0] !== n[0] || s[1] !== n[1] || s[2] !== n[2] || s[3] !== n[3]) return !1;
        }
        return !!e.next().done;
      }(t.I, r)) i.activeTexture(i.TEXTURE2), i.bindTexture(i.TEXTURE_2D, t.j);else {
        t.I = r;
        const e = Array(1024).fill(0);
        r.forEach((t, n) => {
          if (4 !== t.length) throw Error(`Color at index ${n} is not a four-channel value.`);
          e[4 * n] = t[0], e[4 * n + 1] = t[1], e[4 * n + 2] = t[2], e[4 * n + 3] = t[3];
        }), i.activeTexture(i.TEXTURE2), i.bindTexture(i.TEXTURE_2D, t.j), i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, 256, 1, 0, i.RGBA, i.UNSIGNED_BYTE, new Uint8Array(e));
      }
    }(i, e, o, r), s.clearColor(0, 0, 0, 0), s.clear(s.COLOR_BUFFER_BIT), s.drawArrays(s.TRIANGLE_FAN, 0, 4);
    const t = i.g;
    t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE2), t.bindTexture(t.TEXTURE_2D, null);
  });
}
function Da(t, e, n, r) {
  const i = Oa(t),
    s = function (t) {
      return t.h || (t.h = new ya()), t.h;
    }(t),
    o = Array.isArray(n) ? new ImageData(new Uint8ClampedArray(n), 1, 1) : n,
    a = Array.isArray(r) ? new ImageData(new Uint8ClampedArray(r), 1, 1) : r;
  la(s, i, !0, () => {
    var t = s.g;
    t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, e), t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, s.j), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, o), t.activeTexture(t.TEXTURE2), t.bindTexture(t.TEXTURE_2D, s.C), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, a), i.clearColor(0, 0, 0, 0), i.clear(i.COLOR_BUFFER_BIT), i.drawArrays(i.TRIANGLE_FAN, 0, 4), i.bindTexture(i.TEXTURE_2D, null), (t = s.g).activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE2), t.bindTexture(t.TEXTURE_2D, null);
  });
}
var Na = class {
  constructor(t, e) {
    t instanceof CanvasRenderingContext2D || t instanceof OffscreenCanvasRenderingContext2D ? (this.l = t, this.j = e) : this.j = t;
  }
  Aa(t, e) {
    if (t) {
      var n = Ca(this);
      e = Ra(e), n.save();
      var r = n.canvas,
        i = 0;
      for (const s of t) n.fillStyle = Ma(e.fillColor, {
        index: i,
        from: s
      }), n.strokeStyle = Ma(e.color, {
        index: i,
        from: s
      }), n.lineWidth = Ma(e.lineWidth, {
        index: i,
        from: s
      }), (t = new Path2D()).arc(s.x * r.width, s.y * r.height, Ma(e.radius, {
        index: i,
        from: s
      }), 0, 2 * Math.PI), n.fill(t), n.stroke(t), ++i;
      n.restore();
    }
  }
  za(t, e, n) {
    if (t && e) {
      var r = Ca(this);
      n = Ra(n), r.save();
      var i = r.canvas,
        s = 0;
      for (const o of e) {
        r.beginPath(), e = t[o.start];
        const a = t[o.end];
        e && a && (r.strokeStyle = Ma(n.color, {
          index: s,
          from: e,
          to: a
        }), r.lineWidth = Ma(n.lineWidth, {
          index: s,
          from: e,
          to: a
        }), r.moveTo(e.x * i.width, e.y * i.height), r.lineTo(a.x * i.width, a.y * i.height)), ++s, r.stroke();
      }
      r.restore();
    }
  }
  wa(t, e) {
    const n = Ca(this);
    e = Ra(e), n.save(), n.beginPath(), n.lineWidth = Ma(e.lineWidth, {}), n.strokeStyle = Ma(e.color, {}), n.fillStyle = Ma(e.fillColor, {}), n.moveTo(t.originX, t.originY), n.lineTo(t.originX + t.width, t.originY), n.lineTo(t.originX + t.width, t.originY + t.height), n.lineTo(t.originX, t.originY + t.height), n.lineTo(t.originX, t.originY), n.stroke(), n.fill(), n.restore();
  }
  xa(t, e, n = [0, 0, 0, 255]) {
    this.l ? function (t, e, n, r) {
      const i = Oa(t);
      Ia(t, e, e => {
        Ua(t, e, n, r), (e = Ca(t)).drawImage(i.canvas, 0, 0, e.canvas.width, e.canvas.height);
      });
    }(this, t, n, e) : Ua(this, t.O(), n, e);
  }
  ya(t, e, n) {
    this.l ? function (t, e, n, r) {
      const i = Oa(t);
      Ia(t, e, e => {
        Da(t, e, n, r), (e = Ca(t)).drawImage(i.canvas, 0, 0, e.canvas.width, e.canvas.height);
      });
    }(this, t, e, n) : Da(this, t.O(), e, n);
  }
  close() {
    this.g?.close(), this.g = void 0, this.h?.close(), this.h = void 0, this.m?.close(), this.m = void 0;
  }
};
exports.DrawingUtils = Na;
function Ba(t, e) {
  switch (e) {
    case 0:
      return t.g.find(t => t instanceof ImageData);
    case 1:
      return t.g.find(t => "undefined" != typeof ImageBitmap && t instanceof ImageBitmap);
    case 2:
      return t.g.find(t => "undefined" != typeof WebGLTexture && t instanceof WebGLTexture);
    default:
      throw Error(`Type is not supported: ${e}`);
  }
}
function Ga(t) {
  var e = Ba(t, 0);
  if (!e) {
    e = Va(t);
    const n = Xa(t),
      r = new Uint8Array(t.width * t.height * 4);
    fa(n, e, ja(t)), e.readPixels(0, 0, t.width, t.height, e.RGBA, e.UNSIGNED_BYTE, r), pa(n), e = new ImageData(new Uint8ClampedArray(r.buffer), t.width, t.height), t.g.push(e);
  }
  return e;
}
function ja(t) {
  let e = Ba(t, 2);
  if (!e) {
    const n = Va(t);
    e = Ha(t);
    const r = Ba(t, 1) || Ga(t);
    n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, r), Wa(t);
  }
  return e;
}
function Va(t) {
  if (!t.canvas) throw Error("Conversion to different image formats require that a canvas is passed when iniitializing the image.");
  return t.h || (t.h = oa(t.canvas.getContext("webgl2"), "You cannot use a canvas that is already bound to a different type of rendering context.")), t.h;
}
function Xa(t) {
  return t.l || (t.l = new ga()), t.l;
}
function Ha(t) {
  const e = Va(t);
  e.viewport(0, 0, t.width, t.height), e.activeTexture(e.TEXTURE0);
  let n = Ba(t, 2);
  return n || (n = da(Xa(t), e), t.g.push(n), t.m = !0), e.bindTexture(e.TEXTURE_2D, n), n;
}
function Wa(t) {
  t.h.bindTexture(t.h.TEXTURE_2D, null);
}
function za(t) {
  const e = Va(t);
  return la(Xa(t), e, !0, () => function (t, e) {
    const n = t.canvas;
    if (n.width === t.width && n.height === t.height) return e();
    const r = n.width,
      i = n.height;
    return n.width = t.width, n.height = t.height, t = e(), n.width = r, n.height = i, t;
  }(t, () => {
    if (e.bindFramebuffer(e.FRAMEBUFFER, null), e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT), e.drawArrays(e.TRIANGLE_FAN, 0, 4), !(t.canvas instanceof OffscreenCanvas)) throw Error("Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas");
    return t.canvas.transferToImageBitmap();
  }));
}
Na.prototype.close = Na.prototype.close, Na.prototype.drawConfidenceMask = Na.prototype.ya, Na.prototype.drawCategoryMask = Na.prototype.xa, Na.prototype.drawBoundingBox = Na.prototype.wa, Na.prototype.drawConnectors = Na.prototype.za, Na.prototype.drawLandmarks = Na.prototype.Aa, Na.lerp = function (t, e, n, r, i) {
  return Pa(r * (1 - (t - e) / (n - e)) + i * (1 - (n - t) / (n - e)), r, i);
}, Na.clamp = Pa;
var Ka = class {
  constructor(t, e, n, r, i, s, o) {
    this.g = t, this.j = e, this.m = n, this.canvas = r, this.l = i, this.width = s, this.height = o, (this.j || this.m) && 0 === --Ya && console.error("You seem to be creating MPImage instances without invoking .close(). This leaks resources.");
  }
  Ga() {
    return !!Ba(this, 0);
  }
  ma() {
    return !!Ba(this, 1);
  }
  R() {
    return !!Ba(this, 2);
  }
  Ea() {
    return Ga(this);
  }
  Da() {
    var t = Ba(this, 1);
    return t || (ja(this), Ha(this), t = za(this), Wa(this), this.g.push(t), this.j = !0), t;
  }
  O() {
    return ja(this);
  }
  clone() {
    const t = [];
    for (const e of this.g) {
      let n;
      if (e instanceof ImageData) n = new ImageData(e.data, this.width, this.height);else if (e instanceof WebGLTexture) {
        const t = Va(this),
          e = Xa(this);
        t.activeTexture(t.TEXTURE1), n = da(e, t), t.bindTexture(t.TEXTURE_2D, n), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this.width, this.height, 0, t.RGBA, t.UNSIGNED_BYTE, null), t.bindTexture(t.TEXTURE_2D, null), fa(e, t, n), la(e, t, !1, () => {
          Ha(this), t.clearColor(0, 0, 0, 0), t.clear(t.COLOR_BUFFER_BIT), t.drawArrays(t.TRIANGLE_FAN, 0, 4), Wa(this);
        }), pa(e), Wa(this);
      } else {
        if (!(e instanceof ImageBitmap)) throw Error(`Type is not supported: ${e}`);
        ja(this), Ha(this), n = za(this), Wa(this);
      }
      t.push(n);
    }
    return new Ka(t, this.ma(), this.R(), this.canvas, this.l, this.width, this.height);
  }
  close() {
    this.j && Ba(this, 1).close(), this.m && Va(this).deleteTexture(Ba(this, 2)), Ya = -1;
  }
};
exports.MPImage = Ka;
Ka.prototype.close = Ka.prototype.close, Ka.prototype.clone = Ka.prototype.clone, Ka.prototype.getAsWebGLTexture = Ka.prototype.O, Ka.prototype.getAsImageBitmap = Ka.prototype.Da, Ka.prototype.getAsImageData = Ka.prototype.Ea, Ka.prototype.hasWebGLTexture = Ka.prototype.R, Ka.prototype.hasImageBitmap = Ka.prototype.ma, Ka.prototype.hasImageData = Ka.prototype.Ga;
var Ya = 250;
function $a(...t) {
  return t.map(([t, e]) => ({
    start: t,
    end: e
  }));
}
const qa = function (t) {
  return class extends t {
    Ma() {
      this.i._registerModelResourcesGraphService();
    }
  };
}((Ja = class {
  constructor(t, e) {
    this.l = !0, this.i = t, this.g = null, this.h = 0, this.m = "function" == typeof this.i._addIntToInputStream, void 0 !== e ? this.i.canvas = e : Ho() ? this.i.canvas = new OffscreenCanvas(1, 1) : (console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."), this.i.canvas = document.createElement("canvas"));
  }
  async initializeGraph(t) {
    const e = await (await fetch(t)).arrayBuffer();
    t = !(t.endsWith(".pbtxt") || t.endsWith(".textproto")), this.setGraph(new Uint8Array(e), t);
  }
  setGraphFromString(t) {
    this.setGraph(new TextEncoder().encode(t), !1);
  }
  setGraph(t, e) {
    const n = t.length,
      r = this.i._malloc(n);
    this.i.HEAPU8.set(t, r), e ? this.i._changeBinaryGraph(n, r) : this.i._changeTextGraph(n, r), this.i._free(r);
  }
  configureAudio(t, e, n, r, i) {
    this.i._configureAudio || console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'), Ko(this, r || "input_audio", r => {
      Ko(this, i = i || "audio_header", i => {
        this.i._configureAudio(r, i, t, e, n);
      });
    });
  }
  setAutoResizeCanvas(t) {
    this.l = t;
  }
  setAutoRenderToScreen(t) {
    this.i._setAutoRenderToScreen(t);
  }
  setGpuBufferVerticalFlip(t) {
    this.i.gpuOriginForWebTexturesIsBottomLeft = t;
  }
  fa(t) {
    qo(this, "__graph_config__", e => {
      t(e);
    }), Ko(this, "__graph_config__", t => {
      this.i._getGraphConfig(t, void 0);
    }), delete this.i.simpleListeners.__graph_config__;
  }
  attachErrorListener(t) {
    this.i.errorListener = t;
  }
  attachEmptyPacketListener(t, e) {
    this.i.emptyPacketListeners = this.i.emptyPacketListeners || {}, this.i.emptyPacketListeners[t] = e;
  }
  addAudioToStream(t, e, n) {
    this.addAudioToStreamWithShape(t, 0, 0, e, n);
  }
  addAudioToStreamWithShape(t, e, n, r, i) {
    const s = 4 * t.length;
    this.h !== s && (this.g && this.i._free(this.g), this.g = this.i._malloc(s), this.h = s), this.i.HEAPF32.set(t, this.g / 4), Ko(this, r, t => {
      this.i._addAudioToInputStream(this.g, e, n, t, i);
    });
  }
  addGpuBufferToStream(t, e, n) {
    Ko(this, e, e => {
      const [r, i] = Yo(this, t, e);
      this.i._addBoundTextureToStream(e, r, i, n);
    });
  }
  addBoolToStream(t, e, n) {
    Ko(this, e, e => {
      this.i._addBoolToInputStream(t, e, n);
    });
  }
  addDoubleToStream(t, e, n) {
    Ko(this, e, e => {
      this.i._addDoubleToInputStream(t, e, n);
    });
  }
  addFloatToStream(t, e, n) {
    Ko(this, e, e => {
      this.i._addFloatToInputStream(t, e, n);
    });
  }
  addIntToStream(t, e, n) {
    Ko(this, e, e => {
      this.i._addIntToInputStream(t, e, n);
    });
  }
  addUintToStream(t, e, n) {
    Ko(this, e, e => {
      this.i._addUintToInputStream(t, e, n);
    });
  }
  addStringToStream(t, e, n) {
    Ko(this, e, e => {
      Ko(this, t, t => {
        this.i._addStringToInputStream(t, e, n);
      });
    });
  }
  addStringRecordToStream(t, e, n) {
    Ko(this, e, e => {
      $o(this, Object.keys(t), r => {
        $o(this, Object.values(t), i => {
          this.i._addFlatHashMapToInputStream(r, i, Object.keys(t).length, e, n);
        });
      });
    });
  }
  addProtoToStream(t, e, n, r) {
    Ko(this, n, n => {
      Ko(this, e, e => {
        const i = this.i._malloc(t.length);
        this.i.HEAPU8.set(t, i), this.i._addProtoToInputStream(i, t.length, e, n, r), this.i._free(i);
      });
    });
  }
  addEmptyPacketToStream(t, e) {
    Ko(this, t, t => {
      this.i._addEmptyPacketToInputStream(t, e);
    });
  }
  addBoolVectorToStream(t, e, n) {
    Ko(this, e, e => {
      const r = this.i._allocateBoolVector(t.length);
      if (!r) throw Error("Unable to allocate new bool vector on heap.");
      for (const e of t) this.i._addBoolVectorEntry(r, e);
      this.i._addBoolVectorToInputStream(r, e, n);
    });
  }
  addDoubleVectorToStream(t, e, n) {
    Ko(this, e, e => {
      const r = this.i._allocateDoubleVector(t.length);
      if (!r) throw Error("Unable to allocate new double vector on heap.");
      for (const e of t) this.i._addDoubleVectorEntry(r, e);
      this.i._addDoubleVectorToInputStream(r, e, n);
    });
  }
  addFloatVectorToStream(t, e, n) {
    Ko(this, e, e => {
      const r = this.i._allocateFloatVector(t.length);
      if (!r) throw Error("Unable to allocate new float vector on heap.");
      for (const e of t) this.i._addFloatVectorEntry(r, e);
      this.i._addFloatVectorToInputStream(r, e, n);
    });
  }
  addIntVectorToStream(t, e, n) {
    Ko(this, e, e => {
      const r = this.i._allocateIntVector(t.length);
      if (!r) throw Error("Unable to allocate new int vector on heap.");
      for (const e of t) this.i._addIntVectorEntry(r, e);
      this.i._addIntVectorToInputStream(r, e, n);
    });
  }
  addUintVectorToStream(t, e, n) {
    Ko(this, e, e => {
      const r = this.i._allocateUintVector(t.length);
      if (!r) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const e of t) this.i._addUintVectorEntry(r, e);
      this.i._addUintVectorToInputStream(r, e, n);
    });
  }
  addStringVectorToStream(t, e, n) {
    Ko(this, e, e => {
      const r = this.i._allocateStringVector(t.length);
      if (!r) throw Error("Unable to allocate new string vector on heap.");
      for (const e of t) Ko(this, e, t => {
        this.i._addStringVectorEntry(r, t);
      });
      this.i._addStringVectorToInputStream(r, e, n);
    });
  }
  addBoolToInputSidePacket(t, e) {
    Ko(this, e, e => {
      this.i._addBoolToInputSidePacket(t, e);
    });
  }
  addDoubleToInputSidePacket(t, e) {
    Ko(this, e, e => {
      this.i._addDoubleToInputSidePacket(t, e);
    });
  }
  addFloatToInputSidePacket(t, e) {
    Ko(this, e, e => {
      this.i._addFloatToInputSidePacket(t, e);
    });
  }
  addIntToInputSidePacket(t, e) {
    Ko(this, e, e => {
      this.i._addIntToInputSidePacket(t, e);
    });
  }
  addUintToInputSidePacket(t, e) {
    Ko(this, e, e => {
      this.i._addUintToInputSidePacket(t, e);
    });
  }
  addStringToInputSidePacket(t, e) {
    Ko(this, e, e => {
      Ko(this, t, t => {
        this.i._addStringToInputSidePacket(t, e);
      });
    });
  }
  addProtoToInputSidePacket(t, e, n) {
    Ko(this, n, n => {
      Ko(this, e, e => {
        const r = this.i._malloc(t.length);
        this.i.HEAPU8.set(t, r), this.i._addProtoToInputSidePacket(r, t.length, e, n), this.i._free(r);
      });
    });
  }
  addBoolVectorToInputSidePacket(t, e) {
    Ko(this, e, e => {
      const n = this.i._allocateBoolVector(t.length);
      if (!n) throw Error("Unable to allocate new bool vector on heap.");
      for (const e of t) this.i._addBoolVectorEntry(n, e);
      this.i._addBoolVectorToInputSidePacket(n, e);
    });
  }
  addDoubleVectorToInputSidePacket(t, e) {
    Ko(this, e, e => {
      const n = this.i._allocateDoubleVector(t.length);
      if (!n) throw Error("Unable to allocate new double vector on heap.");
      for (const e of t) this.i._addDoubleVectorEntry(n, e);
      this.i._addDoubleVectorToInputSidePacket(n, e);
    });
  }
  addFloatVectorToInputSidePacket(t, e) {
    Ko(this, e, e => {
      const n = this.i._allocateFloatVector(t.length);
      if (!n) throw Error("Unable to allocate new float vector on heap.");
      for (const e of t) this.i._addFloatVectorEntry(n, e);
      this.i._addFloatVectorToInputSidePacket(n, e);
    });
  }
  addIntVectorToInputSidePacket(t, e) {
    Ko(this, e, e => {
      const n = this.i._allocateIntVector(t.length);
      if (!n) throw Error("Unable to allocate new int vector on heap.");
      for (const e of t) this.i._addIntVectorEntry(n, e);
      this.i._addIntVectorToInputSidePacket(n, e);
    });
  }
  addUintVectorToInputSidePacket(t, e) {
    Ko(this, e, e => {
      const n = this.i._allocateUintVector(t.length);
      if (!n) throw Error("Unable to allocate new unsigned int vector on heap.");
      for (const e of t) this.i._addUintVectorEntry(n, e);
      this.i._addUintVectorToInputSidePacket(n, e);
    });
  }
  addStringVectorToInputSidePacket(t, e) {
    Ko(this, e, e => {
      const n = this.i._allocateStringVector(t.length);
      if (!n) throw Error("Unable to allocate new string vector on heap.");
      for (const e of t) Ko(this, e, t => {
        this.i._addStringVectorEntry(n, t);
      });
      this.i._addStringVectorToInputSidePacket(n, e);
    });
  }
  attachBoolListener(t, e) {
    qo(this, t, e), Ko(this, t, t => {
      this.i._attachBoolListener(t);
    });
  }
  attachBoolVectorListener(t, e) {
    Jo(this, t, e), Ko(this, t, t => {
      this.i._attachBoolVectorListener(t);
    });
  }
  attachIntListener(t, e) {
    qo(this, t, e), Ko(this, t, t => {
      this.i._attachIntListener(t);
    });
  }
  attachIntVectorListener(t, e) {
    Jo(this, t, e), Ko(this, t, t => {
      this.i._attachIntVectorListener(t);
    });
  }
  attachUintListener(t, e) {
    qo(this, t, e), Ko(this, t, t => {
      this.i._attachUintListener(t);
    });
  }
  attachUintVectorListener(t, e) {
    Jo(this, t, e), Ko(this, t, t => {
      this.i._attachUintVectorListener(t);
    });
  }
  attachDoubleListener(t, e) {
    qo(this, t, e), Ko(this, t, t => {
      this.i._attachDoubleListener(t);
    });
  }
  attachDoubleVectorListener(t, e) {
    Jo(this, t, e), Ko(this, t, t => {
      this.i._attachDoubleVectorListener(t);
    });
  }
  attachFloatListener(t, e) {
    qo(this, t, e), Ko(this, t, t => {
      this.i._attachFloatListener(t);
    });
  }
  attachFloatVectorListener(t, e) {
    Jo(this, t, e), Ko(this, t, t => {
      this.i._attachFloatVectorListener(t);
    });
  }
  attachStringListener(t, e) {
    qo(this, t, e), Ko(this, t, t => {
      this.i._attachStringListener(t);
    });
  }
  attachStringVectorListener(t, e) {
    Jo(this, t, e), Ko(this, t, t => {
      this.i._attachStringVectorListener(t);
    });
  }
  attachProtoListener(t, e, n) {
    qo(this, t, e), Ko(this, t, t => {
      this.i._attachProtoListener(t, n || !1);
    });
  }
  attachProtoVectorListener(t, e, n) {
    Jo(this, t, e), Ko(this, t, t => {
      this.i._attachProtoVectorListener(t, n || !1);
    });
  }
  attachAudioListener(t, e, n) {
    this.i._attachAudioListener || console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'), qo(this, t, (t, n) => {
      t = new Float32Array(t.buffer, t.byteOffset, t.length / 4), e(t, n);
    }), Ko(this, t, t => {
      this.i._attachAudioListener(t, n || !1);
    });
  }
  finishProcessing() {
    this.i._waitUntilIdle();
  }
  closeGraph() {
    this.i._closeGraph(), this.i.simpleListeners = void 0, this.i.emptyPacketListeners = void 0;
  }
}, class extends Ja {
  get ha() {
    return this.i;
  }
  sa(t, e, n) {
    Ko(this, e, e => {
      const [r, i] = Yo(this, t, e);
      this.ha._addBoundTextureAsImageToStream(e, r, i, n);
    });
  }
  W(t, e) {
    qo(this, t, e), Ko(this, t, t => {
      this.ha._attachImageListener(t);
    });
  }
  da(t, e) {
    Jo(this, t, e), Ko(this, t, t => {
      this.ha._attachImageVectorListener(t);
    });
  }
}));
var Ja,
  Za = class extends qa {};
async function Qa(t, e, n) {
  return async function (t, e, n, r) {
    return Zo(t, e, n, r);
  }(t, n.canvas ?? (Ho() ? void 0 : document.createElement("canvas")), e, n);
}
function th(t, e, n, r) {
  if (t.V) {
    const s = new fs();
    if (n?.regionOfInterest) {
      if (!t.ra) throw Error("This task doesn't support region-of-interest.");
      var i = n.regionOfInterest;
      if (i.left >= i.right || i.top >= i.bottom) throw Error("Expected RectF with left < right and top < bottom.");
      if (0 > i.left || 0 > i.top || 1 < i.right || 1 < i.bottom) throw Error("Expected RectF values to be in [0,1].");
      Hn(s, 1, (i.left + i.right) / 2), Hn(s, 2, (i.top + i.bottom) / 2), Hn(s, 4, i.right - i.left), Hn(s, 3, i.bottom - i.top);
    } else Hn(s, 1, .5), Hn(s, 2, .5), Hn(s, 4, 1), Hn(s, 3, 1);
    if (n?.rotationDegrees) {
      if (0 != n?.rotationDegrees % 90) throw Error("Expected rotation to be a multiple of 90°.");
      if (Hn(s, 5, -Math.PI * n.rotationDegrees / 180), 0 != n?.rotationDegrees % 180) {
        const [t, r] = zo(e);
        n = Gn(s, 3) * r / t, i = Gn(s, 4) * t / r, Hn(s, 4, n), Hn(s, 3, i);
      }
    }
    t.g.addProtoToStream(s.g(), "mediapipe.NormalizedRect", t.V, r);
  }
  t.g.sa(e, t.ba, r ?? performance.now()), t.finishProcessing();
}
function eh(t, e, n) {
  if (t.baseOptions?.g()) throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");
  th(t, e, n, t.J + 1);
}
function nh(t, e, n, r) {
  if (!t.baseOptions?.g()) throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");
  th(t, e, n, r);
}
function rh(t, e, n, r) {
  var i = e.data;
  const s = e.width,
    o = s * (e = e.height);
  if ((i instanceof Uint8Array || i instanceof Float32Array) && i.length !== o) throw Error("Unsupported channel count: " + i.length / o);
  return t = new Sa([i], n, !1, t.g.i.canvas, t.M, s, e), r ? t.clone() : t;
}
var ih = class extends sa {
  constructor(t, e, n, r) {
    super(t), this.g = t, this.ba = e, this.V = n, this.ra = r, this.M = new ga();
  }
  l(t, e = !0) {
    if ("runningMode" in t && Vn(this.baseOptions, 2, !!t.runningMode && "IMAGE" !== t.runningMode), void 0 !== t.canvas && this.g.i.canvas !== t.canvas) throw Error("You must create a new task to reset the canvas.");
    return super.l(t, e);
  }
  close() {
    this.M.close(), super.close();
  }
};
exports.VisionTaskRunner = ih;
ih.prototype.close = ih.prototype.close;
var sh = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect_in", !1), this.j = {
      detections: []
    }, Cn(t = this.h = new Is(), 0, 1, e = new Cs()), Hn(this.h, 2, .5), Hn(this.h, 3, .3);
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.h, 0, 1, t);
  }
  o(t) {
    return "minDetectionConfidence" in t && Hn(this.h, 2, t.minDetectionConfidence ?? .5), "minSuppressionThreshold" in t && Hn(this.h, 3, t.minSuppressionThreshold ?? .3), this.l(t);
  }
  F(t, e) {
    return this.j = {
      detections: []
    }, eh(this, t, e), this.j;
  }
  G(t, e, n) {
    return this.j = {
      detections: []
    }, nh(this, t, n, e), this.j;
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "norm_rect_in"), Ui(t, "detections");
    const e = new yi();
    Wn(e, Ds, this.h);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.face_detector.FaceDetectorGraph"), xi(n, "IMAGE:image_in"), xi(n, "NORM_RECT:norm_rect_in"), Si(n, "DETECTIONS:detections"), n.o(e), Oi(t, n), this.g.attachProtoVectorListener("detections", (t, e) => {
      for (const e of t) t = ns(e), this.j.detections.push(Oo(t));
      ea(this, e);
    }), this.g.attachEmptyPacketListener("detections", t => {
      ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.FaceDetector = sh;
sh.prototype.detectForVideo = sh.prototype.G, sh.prototype.detect = sh.prototype.F, sh.prototype.setOptions = sh.prototype.o, sh.createFromModelPath = async function (t, e) {
  return Qa(sh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, sh.createFromModelBuffer = function (t, e) {
  return Qa(sh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, sh.createFromOptions = function (t, e) {
  return Qa(sh, t, e);
};
var oh = $a([61, 146], [146, 91], [91, 181], [181, 84], [84, 17], [17, 314], [314, 405], [405, 321], [321, 375], [375, 291], [61, 185], [185, 40], [40, 39], [39, 37], [37, 0], [0, 267], [267, 269], [269, 270], [270, 409], [409, 291], [78, 95], [95, 88], [88, 178], [178, 87], [87, 14], [14, 317], [317, 402], [402, 318], [318, 324], [324, 308], [78, 191], [191, 80], [80, 81], [81, 82], [82, 13], [13, 312], [312, 311], [311, 310], [310, 415], [415, 308]),
  ah = $a([263, 249], [249, 390], [390, 373], [373, 374], [374, 380], [380, 381], [381, 382], [382, 362], [263, 466], [466, 388], [388, 387], [387, 386], [386, 385], [385, 384], [384, 398], [398, 362]),
  hh = $a([276, 283], [283, 282], [282, 295], [295, 285], [300, 293], [293, 334], [334, 296], [296, 336]),
  ch = $a([474, 475], [475, 476], [476, 477], [477, 474]),
  uh = $a([33, 7], [7, 163], [163, 144], [144, 145], [145, 153], [153, 154], [154, 155], [155, 133], [33, 246], [246, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173], [173, 133]),
  lh = $a([46, 53], [53, 52], [52, 65], [65, 55], [70, 63], [63, 105], [105, 66], [66, 107]),
  dh = $a([469, 470], [470, 471], [471, 472], [472, 469]),
  fh = $a([10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389], [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397], [397, 365], [365, 379], [379, 378], [378, 400], [400, 377], [377, 152], [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172], [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162], [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10]),
  ph = [...oh, ...ah, ...hh, ...uh, ...lh, ...fh],
  gh = $a([127, 34], [34, 139], [139, 127], [11, 0], [0, 37], [37, 11], [232, 231], [231, 120], [120, 232], [72, 37], [37, 39], [39, 72], [128, 121], [121, 47], [47, 128], [232, 121], [121, 128], [128, 232], [104, 69], [69, 67], [67, 104], [175, 171], [171, 148], [148, 175], [118, 50], [50, 101], [101, 118], [73, 39], [39, 40], [40, 73], [9, 151], [151, 108], [108, 9], [48, 115], [115, 131], [131, 48], [194, 204], [204, 211], [211, 194], [74, 40], [40, 185], [185, 74], [80, 42], [42, 183], [183, 80], [40, 92], [92, 186], [186, 40], [230, 229], [229, 118], [118, 230], [202, 212], [212, 214], [214, 202], [83, 18], [18, 17], [17, 83], [76, 61], [61, 146], [146, 76], [160, 29], [29, 30], [30, 160], [56, 157], [157, 173], [173, 56], [106, 204], [204, 194], [194, 106], [135, 214], [214, 192], [192, 135], [203, 165], [165, 98], [98, 203], [21, 71], [71, 68], [68, 21], [51, 45], [45, 4], [4, 51], [144, 24], [24, 23], [23, 144], [77, 146], [146, 91], [91, 77], [205, 50], [50, 187], [187, 205], [201, 200], [200, 18], [18, 201], [91, 106], [106, 182], [182, 91], [90, 91], [91, 181], [181, 90], [85, 84], [84, 17], [17, 85], [206, 203], [203, 36], [36, 206], [148, 171], [171, 140], [140, 148], [92, 40], [40, 39], [39, 92], [193, 189], [189, 244], [244, 193], [159, 158], [158, 28], [28, 159], [247, 246], [246, 161], [161, 247], [236, 3], [3, 196], [196, 236], [54, 68], [68, 104], [104, 54], [193, 168], [168, 8], [8, 193], [117, 228], [228, 31], [31, 117], [189, 193], [193, 55], [55, 189], [98, 97], [97, 99], [99, 98], [126, 47], [47, 100], [100, 126], [166, 79], [79, 218], [218, 166], [155, 154], [154, 26], [26, 155], [209, 49], [49, 131], [131, 209], [135, 136], [136, 150], [150, 135], [47, 126], [126, 217], [217, 47], [223, 52], [52, 53], [53, 223], [45, 51], [51, 134], [134, 45], [211, 170], [170, 140], [140, 211], [67, 69], [69, 108], [108, 67], [43, 106], [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 130], [130, 247], [247, 226], [63, 53], [53, 52], [52, 63], [238, 20], [20, 242], [242, 238], [46, 70], [70, 156], [156, 46], [78, 62], [62, 96], [96, 78], [46, 53], [53, 63], [63, 46], [143, 34], [34, 227], [227, 143], [123, 117], [117, 111], [111, 123], [44, 125], [125, 19], [19, 44], [236, 134], [134, 51], [51, 236], [216, 206], [206, 205], [205, 216], [154, 153], [153, 22], [22, 154], [39, 37], [37, 167], [167, 39], [200, 201], [201, 208], [208, 200], [36, 142], [142, 100], [100, 36], [57, 212], [212, 202], [202, 57], [20, 60], [60, 99], [99, 20], [28, 158], [158, 157], [157, 28], [35, 226], [226, 113], [113, 35], [160, 159], [159, 27], [27, 160], [204, 202], [202, 210], [210, 204], [113, 225], [225, 46], [46, 113], [43, 202], [202, 204], [204, 43], [62, 76], [76, 77], [77, 62], [137, 123], [123, 116], [116, 137], [41, 38], [38, 72], [72, 41], [203, 129], [129, 142], [142, 203], [64, 98], [98, 240], [240, 64], [49, 102], [102, 64], [64, 49], [41, 73], [73, 74], [74, 41], [212, 216], [216, 207], [207, 212], [42, 74], [74, 184], [184, 42], [169, 170], [170, 211], [211, 169], [170, 149], [149, 176], [176, 170], [105, 66], [66, 69], [69, 105], [122, 6], [6, 168], [168, 122], [123, 147], [147, 187], [187, 123], [96, 77], [77, 90], [90, 96], [65, 55], [55, 107], [107, 65], [89, 90], [90, 180], [180, 89], [101, 100], [100, 120], [120, 101], [63, 105], [105, 104], [104, 63], [93, 137], [137, 227], [227, 93], [15, 86], [86, 85], [85, 15], [129, 102], [102, 49], [49, 129], [14, 87], [87, 86], [86, 14], [55, 8], [8, 9], [9, 55], [100, 47], [47, 121], [121, 100], [145, 23], [23, 22], [22, 145], [88, 89], [89, 179], [179, 88], [6, 122], [122, 196], [196, 6], [88, 95], [95, 96], [96, 88], [138, 172], [172, 136], [136, 138], [215, 58], [58, 172], [172, 215], [115, 48], [48, 219], [219, 115], [42, 80], [80, 81], [81, 42], [195, 3], [3, 51], [51, 195], [43, 146], [146, 61], [61, 43], [171, 175], [175, 199], [199, 171], [81, 82], [82, 38], [38, 81], [53, 46], [46, 225], [225, 53], [144, 163], [163, 110], [110, 144], [52, 65], [65, 66], [66, 52], [229, 228], [228, 117], [117, 229], [34, 127], [127, 234], [234, 34], [107, 108], [108, 69], [69, 107], [109, 108], [108, 151], [151, 109], [48, 64], [64, 235], [235, 48], [62, 78], [78, 191], [191, 62], [129, 209], [209, 126], [126, 129], [111, 35], [35, 143], [143, 111], [117, 123], [123, 50], [50, 117], [222, 65], [65, 52], [52, 222], [19, 125], [125, 141], [141, 19], [221, 55], [55, 65], [65, 221], [3, 195], [195, 197], [197, 3], [25, 7], [7, 33], [33, 25], [220, 237], [237, 44], [44, 220], [70, 71], [71, 139], [139, 70], [122, 193], [193, 245], [245, 122], [247, 130], [130, 33], [33, 247], [71, 21], [21, 162], [162, 71], [170, 169], [169, 150], [150, 170], [188, 174], [174, 196], [196, 188], [216, 186], [186, 92], [92, 216], [2, 97], [97, 167], [167, 2], [141, 125], [125, 241], [241, 141], [164, 167], [167, 37], [37, 164], [72, 38], [38, 12], [12, 72], [38, 82], [82, 13], [13, 38], [63, 68], [68, 71], [71, 63], [226, 35], [35, 111], [111, 226], [101, 50], [50, 205], [205, 101], [206, 92], [92, 165], [165, 206], [209, 198], [198, 217], [217, 209], [165, 167], [167, 97], [97, 165], [220, 115], [115, 218], [218, 220], [133, 112], [112, 243], [243, 133], [239, 238], [238, 241], [241, 239], [214, 135], [135, 169], [169, 214], [190, 173], [173, 133], [133, 190], [171, 208], [208, 32], [32, 171], [125, 44], [44, 237], [237, 125], [86, 87], [87, 178], [178, 86], [85, 86], [86, 179], [179, 85], [84, 85], [85, 180], [180, 84], [83, 84], [84, 181], [181, 83], [201, 83], [83, 182], [182, 201], [137, 93], [93, 132], [132, 137], [76, 62], [62, 183], [183, 76], [61, 76], [76, 184], [184, 61], [57, 61], [61, 185], [185, 57], [212, 57], [57, 186], [186, 212], [214, 207], [207, 187], [187, 214], [34, 143], [143, 156], [156, 34], [79, 239], [239, 237], [237, 79], [123, 137], [137, 177], [177, 123], [44, 1], [1, 4], [4, 44], [201, 194], [194, 32], [32, 201], [64, 102], [102, 129], [129, 64], [213, 215], [215, 138], [138, 213], [59, 166], [166, 219], [219, 59], [242, 99], [99, 97], [97, 242], [2, 94], [94, 141], [141, 2], [75, 59], [59, 235], [235, 75], [24, 110], [110, 228], [228, 24], [25, 130], [130, 226], [226, 25], [23, 24], [24, 229], [229, 23], [22, 23], [23, 230], [230, 22], [26, 22], [22, 231], [231, 26], [112, 26], [26, 232], [232, 112], [189, 190], [190, 243], [243, 189], [221, 56], [56, 190], [190, 221], [28, 56], [56, 221], [221, 28], [27, 28], [28, 222], [222, 27], [29, 27], [27, 223], [223, 29], [30, 29], [29, 224], [224, 30], [247, 30], [30, 225], [225, 247], [238, 79], [79, 20], [20, 238], [166, 59], [59, 75], [75, 166], [60, 75], [75, 240], [240, 60], [147, 177], [177, 215], [215, 147], [20, 79], [79, 166], [166, 20], [187, 147], [147, 213], [213, 187], [112, 233], [233, 244], [244, 112], [233, 128], [128, 245], [245, 233], [128, 114], [114, 188], [188, 128], [114, 217], [217, 174], [174, 114], [131, 115], [115, 220], [220, 131], [217, 198], [198, 236], [236, 217], [198, 131], [131, 134], [134, 198], [177, 132], [132, 58], [58, 177], [143, 35], [35, 124], [124, 143], [110, 163], [163, 7], [7, 110], [228, 110], [110, 25], [25, 228], [356, 389], [389, 368], [368, 356], [11, 302], [302, 267], [267, 11], [452, 350], [350, 349], [349, 452], [302, 303], [303, 269], [269, 302], [357, 343], [343, 277], [277, 357], [452, 453], [453, 357], [357, 452], [333, 332], [332, 297], [297, 333], [175, 152], [152, 377], [377, 175], [347, 348], [348, 330], [330, 347], [303, 304], [304, 270], [270, 303], [9, 336], [336, 337], [337, 9], [278, 279], [279, 360], [360, 278], [418, 262], [262, 431], [431, 418], [304, 408], [408, 409], [409, 304], [310, 415], [415, 407], [407, 310], [270, 409], [409, 410], [410, 270], [450, 348], [348, 347], [347, 450], [422, 430], [430, 434], [434, 422], [313, 314], [314, 17], [17, 313], [306, 307], [307, 375], [375, 306], [387, 388], [388, 260], [260, 387], [286, 414], [414, 398], [398, 286], [335, 406], [406, 418], [418, 335], [364, 367], [367, 416], [416, 364], [423, 358], [358, 327], [327, 423], [251, 284], [284, 298], [298, 251], [281, 5], [5, 4], [4, 281], [373, 374], [374, 253], [253, 373], [307, 320], [320, 321], [321, 307], [425, 427], [427, 411], [411, 425], [421, 313], [313, 18], [18, 421], [321, 405], [405, 406], [406, 321], [320, 404], [404, 405], [405, 320], [315, 16], [16, 17], [17, 315], [426, 425], [425, 266], [266, 426], [377, 400], [400, 369], [369, 377], [322, 391], [391, 269], [269, 322], [417, 465], [465, 464], [464, 417], [386, 257], [257, 258], [258, 386], [466, 260], [260, 388], [388, 466], [456, 399], [399, 419], [419, 456], [284, 332], [332, 333], [333, 284], [417, 285], [285, 8], [8, 417], [346, 340], [340, 261], [261, 346], [413, 441], [441, 285], [285, 413], [327, 460], [460, 328], [328, 327], [355, 371], [371, 329], [329, 355], [392, 439], [439, 438], [438, 392], [382, 341], [341, 256], [256, 382], [429, 420], [420, 360], [360, 429], [364, 394], [394, 379], [379, 364], [277, 343], [343, 437], [437, 277], [443, 444], [444, 283], [283, 443], [275, 440], [440, 363], [363, 275], [431, 262], [262, 369], [369, 431], [297, 338], [338, 337], [337, 297], [273, 375], [375, 321], [321, 273], [450, 451], [451, 349], [349, 450], [446, 342], [342, 467], [467, 446], [293, 334], [334, 282], [282, 293], [458, 461], [461, 462], [462, 458], [276, 353], [353, 383], [383, 276], [308, 324], [324, 325], [325, 308], [276, 300], [300, 293], [293, 276], [372, 345], [345, 447], [447, 372], [352, 345], [345, 340], [340, 352], [274, 1], [1, 19], [19, 274], [456, 248], [248, 281], [281, 456], [436, 427], [427, 425], [425, 436], [381, 256], [256, 252], [252, 381], [269, 391], [391, 393], [393, 269], [200, 199], [199, 428], [428, 200], [266, 330], [330, 329], [329, 266], [287, 273], [273, 422], [422, 287], [250, 462], [462, 328], [328, 250], [258, 286], [286, 384], [384, 258], [265, 353], [353, 342], [342, 265], [387, 259], [259, 257], [257, 387], [424, 431], [431, 430], [430, 424], [342, 353], [353, 276], [276, 342], [273, 335], [335, 424], [424, 273], [292, 325], [325, 307], [307, 292], [366, 447], [447, 345], [345, 366], [271, 303], [303, 302], [302, 271], [423, 266], [266, 371], [371, 423], [294, 455], [455, 460], [460, 294], [279, 278], [278, 294], [294, 279], [271, 272], [272, 304], [304, 271], [432, 434], [434, 427], [427, 432], [272, 407], [407, 408], [408, 272], [394, 430], [430, 431], [431, 394], [395, 369], [369, 400], [400, 395], [334, 333], [333, 299], [299, 334], [351, 417], [417, 168], [168, 351], [352, 280], [280, 411], [411, 352], [325, 319], [319, 320], [320, 325], [295, 296], [296, 336], [336, 295], [319, 403], [403, 404], [404, 319], [330, 348], [348, 349], [349, 330], [293, 298], [298, 333], [333, 293], [323, 454], [454, 447], [447, 323], [15, 16], [16, 315], [315, 15], [358, 429], [429, 279], [279, 358], [14, 15], [15, 316], [316, 14], [285, 336], [336, 9], [9, 285], [329, 349], [349, 350], [350, 329], [374, 380], [380, 252], [252, 374], [318, 402], [402, 403], [403, 318], [6, 197], [197, 419], [419, 6], [318, 319], [319, 325], [325, 318], [367, 364], [364, 365], [365, 367], [435, 367], [367, 397], [397, 435], [344, 438], [438, 439], [439, 344], [272, 271], [271, 311], [311, 272], [195, 5], [5, 281], [281, 195], [273, 287], [287, 291], [291, 273], [396, 428], [428, 199], [199, 396], [311, 271], [271, 268], [268, 311], [283, 444], [444, 445], [445, 283], [373, 254], [254, 339], [339, 373], [282, 334], [334, 296], [296, 282], [449, 347], [347, 346], [346, 449], [264, 447], [447, 454], [454, 264], [336, 296], [296, 299], [299, 336], [338, 10], [10, 151], [151, 338], [278, 439], [439, 455], [455, 278], [292, 407], [407, 415], [415, 292], [358, 371], [371, 355], [355, 358], [340, 345], [345, 372], [372, 340], [346, 347], [347, 280], [280, 346], [442, 443], [443, 282], [282, 442], [19, 94], [94, 370], [370, 19], [441, 442], [442, 295], [295, 441], [248, 419], [419, 197], [197, 248], [263, 255], [255, 359], [359, 263], [440, 275], [275, 274], [274, 440], [300, 383], [383, 368], [368, 300], [351, 412], [412, 465], [465, 351], [263, 467], [467, 466], [466, 263], [301, 368], [368, 389], [389, 301], [395, 378], [378, 379], [379, 395], [412, 351], [351, 419], [419, 412], [436, 426], [426, 322], [322, 436], [2, 164], [164, 393], [393, 2], [370, 462], [462, 461], [461, 370], [164, 0], [0, 267], [267, 164], [302, 11], [11, 12], [12, 302], [268, 12], [12, 13], [13, 268], [293, 300], [300, 301], [301, 293], [446, 261], [261, 340], [340, 446], [330, 266], [266, 425], [425, 330], [426, 423], [423, 391], [391, 426], [429, 355], [355, 437], [437, 429], [391, 327], [327, 326], [326, 391], [440, 457], [457, 438], [438, 440], [341, 382], [382, 362], [362, 341], [459, 457], [457, 461], [461, 459], [434, 430], [430, 394], [394, 434], [414, 463], [463, 362], [362, 414], [396, 369], [369, 262], [262, 396], [354, 461], [461, 457], [457, 354], [316, 403], [403, 402], [402, 316], [315, 404], [404, 403], [403, 315], [314, 405], [405, 404], [404, 314], [313, 406], [406, 405], [405, 313], [421, 418], [418, 406], [406, 421], [366, 401], [401, 361], [361, 366], [306, 408], [408, 407], [407, 306], [291, 409], [409, 408], [408, 291], [287, 410], [410, 409], [409, 287], [432, 436], [436, 410], [410, 432], [434, 416], [416, 411], [411, 434], [264, 368], [368, 383], [383, 264], [309, 438], [438, 457], [457, 309], [352, 376], [376, 401], [401, 352], [274, 275], [275, 4], [4, 274], [421, 428], [428, 262], [262, 421], [294, 327], [327, 358], [358, 294], [433, 416], [416, 367], [367, 433], [289, 455], [455, 439], [439, 289], [462, 370], [370, 326], [326, 462], [2, 326], [326, 370], [370, 2], [305, 460], [460, 455], [455, 305], [254, 449], [449, 448], [448, 254], [255, 261], [261, 446], [446, 255], [253, 450], [450, 449], [449, 253], [252, 451], [451, 450], [450, 252], [256, 452], [452, 451], [451, 256], [341, 453], [453, 452], [452, 341], [413, 464], [464, 463], [463, 413], [441, 413], [413, 414], [414, 441], [258, 442], [442, 441], [441, 258], [257, 443], [443, 442], [442, 257], [259, 444], [444, 443], [443, 259], [260, 445], [445, 444], [444, 260], [467, 342], [342, 445], [445, 467], [459, 458], [458, 250], [250, 459], [289, 392], [392, 290], [290, 289], [290, 328], [328, 460], [460, 290], [376, 433], [433, 435], [435, 376], [250, 290], [290, 392], [392, 250], [411, 416], [416, 433], [433, 411], [341, 463], [463, 464], [464, 341], [453, 464], [464, 465], [465, 453], [357, 465], [465, 412], [412, 357], [343, 412], [412, 399], [399, 343], [360, 363], [363, 440], [440, 360], [437, 399], [399, 456], [456, 437], [420, 456], [456, 363], [363, 420], [401, 435], [435, 288], [288, 401], [372, 383], [383, 353], [353, 372], [339, 255], [255, 249], [249, 339], [448, 261], [261, 255], [255, 448], [133, 243], [243, 190], [190, 133], [133, 155], [155, 112], [112, 133], [33, 246], [246, 247], [247, 33], [33, 130], [130, 25], [25, 33], [398, 384], [384, 286], [286, 398], [362, 398], [398, 414], [414, 362], [362, 463], [463, 341], [341, 362], [263, 359], [359, 467], [467, 263], [263, 249], [249, 255], [255, 263], [466, 467], [467, 260], [260, 466], [75, 60], [60, 166], [166, 75], [238, 239], [239, 79], [79, 238], [162, 127], [127, 139], [139, 162], [72, 11], [11, 37], [37, 72], [121, 232], [232, 120], [120, 121], [73, 72], [72, 39], [39, 73], [114, 128], [128, 47], [47, 114], [233, 232], [232, 128], [128, 233], [103, 104], [104, 67], [67, 103], [152, 175], [175, 148], [148, 152], [119, 118], [118, 101], [101, 119], [74, 73], [73, 40], [40, 74], [107, 9], [9, 108], [108, 107], [49, 48], [48, 131], [131, 49], [32, 194], [194, 211], [211, 32], [184, 74], [74, 185], [185, 184], [191, 80], [80, 183], [183, 191], [185, 40], [40, 186], [186, 185], [119, 230], [230, 118], [118, 119], [210, 202], [202, 214], [214, 210], [84, 83], [83, 17], [17, 84], [77, 76], [76, 146], [146, 77], [161, 160], [160, 30], [30, 161], [190, 56], [56, 173], [173, 190], [182, 106], [106, 194], [194, 182], [138, 135], [135, 192], [192, 138], [129, 203], [203, 98], [98, 129], [54, 21], [21, 68], [68, 54], [5, 51], [51, 4], [4, 5], [145, 144], [144, 23], [23, 145], [90, 77], [77, 91], [91, 90], [207, 205], [205, 187], [187, 207], [83, 201], [201, 18], [18, 83], [181, 91], [91, 182], [182, 181], [180, 90], [90, 181], [181, 180], [16, 85], [85, 17], [17, 16], [205, 206], [206, 36], [36, 205], [176, 148], [148, 140], [140, 176], [165, 92], [92, 39], [39, 165], [245, 193], [193, 244], [244, 245], [27, 159], [159, 28], [28, 27], [30, 247], [247, 161], [161, 30], [174, 236], [236, 196], [196, 174], [103, 54], [54, 104], [104, 103], [55, 193], [193, 8], [8, 55], [111, 117], [117, 31], [31, 111], [221, 189], [189, 55], [55, 221], [240, 98], [98, 99], [99, 240], [142, 126], [126, 100], [100, 142], [219, 166], [166, 218], [218, 219], [112, 155], [155, 26], [26, 112], [198, 209], [209, 131], [131, 198], [169, 135], [135, 150], [150, 169], [114, 47], [47, 217], [217, 114], [224, 223], [223, 53], [53, 224], [220, 45], [45, 134], [134, 220], [32, 211], [211, 140], [140, 32], [109, 67], [67, 108], [108, 109], [146, 43], [43, 91], [91, 146], [231, 230], [230, 120], [120, 231], [113, 226], [226, 247], [247, 113], [105, 63], [63, 52], [52, 105], [241, 238], [238, 242], [242, 241], [124, 46], [46, 156], [156, 124], [95, 78], [78, 96], [96, 95], [70, 46], [46, 63], [63, 70], [116, 143], [143, 227], [227, 116], [116, 123], [123, 111], [111, 116], [1, 44], [44, 19], [19, 1], [3, 236], [236, 51], [51, 3], [207, 216], [216, 205], [205, 207], [26, 154], [154, 22], [22, 26], [165, 39], [39, 167], [167, 165], [199, 200], [200, 208], [208, 199], [101, 36], [36, 100], [100, 101], [43, 57], [57, 202], [202, 43], [242, 20], [20, 99], [99, 242], [56, 28], [28, 157], [157, 56], [124, 35], [35, 113], [113, 124], [29, 160], [160, 27], [27, 29], [211, 204], [204, 210], [210, 211], [124, 113], [113, 46], [46, 124], [106, 43], [43, 204], [204, 106], [96, 62], [62, 77], [77, 96], [227, 137], [137, 116], [116, 227], [73, 41], [41, 72], [72, 73], [36, 203], [203, 142], [142, 36], [235, 64], [64, 240], [240, 235], [48, 49], [49, 64], [64, 48], [42, 41], [41, 74], [74, 42], [214, 212], [212, 207], [207, 214], [183, 42], [42, 184], [184, 183], [210, 169], [169, 211], [211, 210], [140, 170], [170, 176], [176, 140], [104, 105], [105, 69], [69, 104], [193, 122], [122, 168], [168, 193], [50, 123], [123, 187], [187, 50], [89, 96], [96, 90], [90, 89], [66, 65], [65, 107], [107, 66], [179, 89], [89, 180], [180, 179], [119, 101], [101, 120], [120, 119], [68, 63], [63, 104], [104, 68], [234, 93], [93, 227], [227, 234], [16, 15], [15, 85], [85, 16], [209, 129], [129, 49], [49, 209], [15, 14], [14, 86], [86, 15], [107, 55], [55, 9], [9, 107], [120, 100], [100, 121], [121, 120], [153, 145], [145, 22], [22, 153], [178, 88], [88, 179], [179, 178], [197, 6], [6, 196], [196, 197], [89, 88], [88, 96], [96, 89], [135, 138], [138, 136], [136, 135], [138, 215], [215, 172], [172, 138], [218, 115], [115, 219], [219, 218], [41, 42], [42, 81], [81, 41], [5, 195], [195, 51], [51, 5], [57, 43], [43, 61], [61, 57], [208, 171], [171, 199], [199, 208], [41, 81], [81, 38], [38, 41], [224, 53], [53, 225], [225, 224], [24, 144], [144, 110], [110, 24], [105, 52], [52, 66], [66, 105], [118, 229], [229, 117], [117, 118], [227, 34], [34, 234], [234, 227], [66, 107], [107, 69], [69, 66], [10, 109], [109, 151], [151, 10], [219, 48], [48, 235], [235, 219], [183, 62], [62, 191], [191, 183], [142, 129], [129, 126], [126, 142], [116, 111], [111, 143], [143, 116], [118, 117], [117, 50], [50, 118], [223, 222], [222, 52], [52, 223], [94, 19], [19, 141], [141, 94], [222, 221], [221, 65], [65, 222], [196, 3], [3, 197], [197, 196], [45, 220], [220, 44], [44, 45], [156, 70], [70, 139], [139, 156], [188, 122], [122, 245], [245, 188], [139, 71], [71, 162], [162, 139], [149, 170], [170, 150], [150, 149], [122, 188], [188, 196], [196, 122], [206, 216], [216, 92], [92, 206], [164, 2], [2, 167], [167, 164], [242, 141], [141, 241], [241, 242], [0, 164], [164, 37], [37, 0], [11, 72], [72, 12], [12, 11], [12, 38], [38, 13], [13, 12], [70, 63], [63, 71], [71, 70], [31, 226], [226, 111], [111, 31], [36, 101], [101, 205], [205, 36], [203, 206], [206, 165], [165, 203], [126, 209], [209, 217], [217, 126], [98, 165], [165, 97], [97, 98], [237, 220], [220, 218], [218, 237], [237, 239], [239, 241], [241, 237], [210, 214], [214, 169], [169, 210], [140, 171], [171, 32], [32, 140], [241, 125], [125, 237], [237, 241], [179, 86], [86, 178], [178, 179], [180, 85], [85, 179], [179, 180], [181, 84], [84, 180], [180, 181], [182, 83], [83, 181], [181, 182], [194, 201], [201, 182], [182, 194], [177, 137], [137, 132], [132, 177], [184, 76], [76, 183], [183, 184], [185, 61], [61, 184], [184, 185], [186, 57], [57, 185], [185, 186], [216, 212], [212, 186], [186, 216], [192, 214], [214, 187], [187, 192], [139, 34], [34, 156], [156, 139], [218, 79], [79, 237], [237, 218], [147, 123], [123, 177], [177, 147], [45, 44], [44, 4], [4, 45], [208, 201], [201, 32], [32, 208], [98, 64], [64, 129], [129, 98], [192, 213], [213, 138], [138, 192], [235, 59], [59, 219], [219, 235], [141, 242], [242, 97], [97, 141], [97, 2], [2, 141], [141, 97], [240, 75], [75, 235], [235, 240], [229, 24], [24, 228], [228, 229], [31, 25], [25, 226], [226, 31], [230, 23], [23, 229], [229, 230], [231, 22], [22, 230], [230, 231], [232, 26], [26, 231], [231, 232], [233, 112], [112, 232], [232, 233], [244, 189], [189, 243], [243, 244], [189, 221], [221, 190], [190, 189], [222, 28], [28, 221], [221, 222], [223, 27], [27, 222], [222, 223], [224, 29], [29, 223], [223, 224], [225, 30], [30, 224], [224, 225], [113, 247], [247, 225], [225, 113], [99, 60], [60, 240], [240, 99], [213, 147], [147, 215], [215, 213], [60, 20], [20, 166], [166, 60], [192, 187], [187, 213], [213, 192], [243, 112], [112, 244], [244, 243], [244, 233], [233, 245], [245, 244], [245, 128], [128, 188], [188, 245], [188, 114], [114, 174], [174, 188], [134, 131], [131, 220], [220, 134], [174, 217], [217, 236], [236, 174], [236, 198], [198, 134], [134, 236], [215, 177], [177, 58], [58, 215], [156, 143], [143, 124], [124, 156], [25, 110], [110, 7], [7, 25], [31, 228], [228, 25], [25, 31], [264, 356], [356, 368], [368, 264], [0, 11], [11, 267], [267, 0], [451, 452], [452, 349], [349, 451], [267, 302], [302, 269], [269, 267], [350, 357], [357, 277], [277, 350], [350, 452], [452, 357], [357, 350], [299, 333], [333, 297], [297, 299], [396, 175], [175, 377], [377, 396], [280, 347], [347, 330], [330, 280], [269, 303], [303, 270], [270, 269], [151, 9], [9, 337], [337, 151], [344, 278], [278, 360], [360, 344], [424, 418], [418, 431], [431, 424], [270, 304], [304, 409], [409, 270], [272, 310], [310, 407], [407, 272], [322, 270], [270, 410], [410, 322], [449, 450], [450, 347], [347, 449], [432, 422], [422, 434], [434, 432], [18, 313], [313, 17], [17, 18], [291, 306], [306, 375], [375, 291], [259, 387], [387, 260], [260, 259], [424, 335], [335, 418], [418, 424], [434, 364], [364, 416], [416, 434], [391, 423], [423, 327], [327, 391], [301, 251], [251, 298], [298, 301], [275, 281], [281, 4], [4, 275], [254, 373], [373, 253], [253, 254], [375, 307], [307, 321], [321, 375], [280, 425], [425, 411], [411, 280], [200, 421], [421, 18], [18, 200], [335, 321], [321, 406], [406, 335], [321, 320], [320, 405], [405, 321], [314, 315], [315, 17], [17, 314], [423, 426], [426, 266], [266, 423], [396, 377], [377, 369], [369, 396], [270, 322], [322, 269], [269, 270], [413, 417], [417, 464], [464, 413], [385, 386], [386, 258], [258, 385], [248, 456], [456, 419], [419, 248], [298, 284], [284, 333], [333, 298], [168, 417], [417, 8], [8, 168], [448, 346], [346, 261], [261, 448], [417, 413], [413, 285], [285, 417], [326, 327], [327, 328], [328, 326], [277, 355], [355, 329], [329, 277], [309, 392], [392, 438], [438, 309], [381, 382], [382, 256], [256, 381], [279, 429], [429, 360], [360, 279], [365, 364], [364, 379], [379, 365], [355, 277], [277, 437], [437, 355], [282, 443], [443, 283], [283, 282], [281, 275], [275, 363], [363, 281], [395, 431], [431, 369], [369, 395], [299, 297], [297, 337], [337, 299], [335, 273], [273, 321], [321, 335], [348, 450], [450, 349], [349, 348], [359, 446], [446, 467], [467, 359], [283, 293], [293, 282], [282, 283], [250, 458], [458, 462], [462, 250], [300, 276], [276, 383], [383, 300], [292, 308], [308, 325], [325, 292], [283, 276], [276, 293], [293, 283], [264, 372], [372, 447], [447, 264], [346, 352], [352, 340], [340, 346], [354, 274], [274, 19], [19, 354], [363, 456], [456, 281], [281, 363], [426, 436], [436, 425], [425, 426], [380, 381], [381, 252], [252, 380], [267, 269], [269, 393], [393, 267], [421, 200], [200, 428], [428, 421], [371, 266], [266, 329], [329, 371], [432, 287], [287, 422], [422, 432], [290, 250], [250, 328], [328, 290], [385, 258], [258, 384], [384, 385], [446, 265], [265, 342], [342, 446], [386, 387], [387, 257], [257, 386], [422, 424], [424, 430], [430, 422], [445, 342], [342, 276], [276, 445], [422, 273], [273, 424], [424, 422], [306, 292], [292, 307], [307, 306], [352, 366], [366, 345], [345, 352], [268, 271], [271, 302], [302, 268], [358, 423], [423, 371], [371, 358], [327, 294], [294, 460], [460, 327], [331, 279], [279, 294], [294, 331], [303, 271], [271, 304], [304, 303], [436, 432], [432, 427], [427, 436], [304, 272], [272, 408], [408, 304], [395, 394], [394, 431], [431, 395], [378, 395], [395, 400], [400, 378], [296, 334], [334, 299], [299, 296], [6, 351], [351, 168], [168, 6], [376, 352], [352, 411], [411, 376], [307, 325], [325, 320], [320, 307], [285, 295], [295, 336], [336, 285], [320, 319], [319, 404], [404, 320], [329, 330], [330, 349], [349, 329], [334, 293], [293, 333], [333, 334], [366, 323], [323, 447], [447, 366], [316, 15], [15, 315], [315, 316], [331, 358], [358, 279], [279, 331], [317, 14], [14, 316], [316, 317], [8, 285], [285, 9], [9, 8], [277, 329], [329, 350], [350, 277], [253, 374], [374, 252], [252, 253], [319, 318], [318, 403], [403, 319], [351, 6], [6, 419], [419, 351], [324, 318], [318, 325], [325, 324], [397, 367], [367, 365], [365, 397], [288, 435], [435, 397], [397, 288], [278, 344], [344, 439], [439, 278], [310, 272], [272, 311], [311, 310], [248, 195], [195, 281], [281, 248], [375, 273], [273, 291], [291, 375], [175, 396], [396, 199], [199, 175], [312, 311], [311, 268], [268, 312], [276, 283], [283, 445], [445, 276], [390, 373], [373, 339], [339, 390], [295, 282], [282, 296], [296, 295], [448, 449], [449, 346], [346, 448], [356, 264], [264, 454], [454, 356], [337, 336], [336, 299], [299, 337], [337, 338], [338, 151], [151, 337], [294, 278], [278, 455], [455, 294], [308, 292], [292, 415], [415, 308], [429, 358], [358, 355], [355, 429], [265, 340], [340, 372], [372, 265], [352, 346], [346, 280], [280, 352], [295, 442], [442, 282], [282, 295], [354, 19], [19, 370], [370, 354], [285, 441], [441, 295], [295, 285], [195, 248], [248, 197], [197, 195], [457, 440], [440, 274], [274, 457], [301, 300], [300, 368], [368, 301], [417, 351], [351, 465], [465, 417], [251, 301], [301, 389], [389, 251], [394, 395], [395, 379], [379, 394], [399, 412], [412, 419], [419, 399], [410, 436], [436, 322], [322, 410], [326, 2], [2, 393], [393, 326], [354, 370], [370, 461], [461, 354], [393, 164], [164, 267], [267, 393], [268, 302], [302, 12], [12, 268], [312, 268], [268, 13], [13, 312], [298, 293], [293, 301], [301, 298], [265, 446], [446, 340], [340, 265], [280, 330], [330, 425], [425, 280], [322, 426], [426, 391], [391, 322], [420, 429], [429, 437], [437, 420], [393, 391], [391, 326], [326, 393], [344, 440], [440, 438], [438, 344], [458, 459], [459, 461], [461, 458], [364, 434], [434, 394], [394, 364], [428, 396], [396, 262], [262, 428], [274, 354], [354, 457], [457, 274], [317, 316], [316, 402], [402, 317], [316, 315], [315, 403], [403, 316], [315, 314], [314, 404], [404, 315], [314, 313], [313, 405], [405, 314], [313, 421], [421, 406], [406, 313], [323, 366], [366, 361], [361, 323], [292, 306], [306, 407], [407, 292], [306, 291], [291, 408], [408, 306], [291, 287], [287, 409], [409, 291], [287, 432], [432, 410], [410, 287], [427, 434], [434, 411], [411, 427], [372, 264], [264, 383], [383, 372], [459, 309], [309, 457], [457, 459], [366, 352], [352, 401], [401, 366], [1, 274], [274, 4], [4, 1], [418, 421], [421, 262], [262, 418], [331, 294], [294, 358], [358, 331], [435, 433], [433, 367], [367, 435], [392, 289], [289, 439], [439, 392], [328, 462], [462, 326], [326, 328], [94, 2], [2, 370], [370, 94], [289, 305], [305, 455], [455, 289], [339, 254], [254, 448], [448, 339], [359, 255], [255, 446], [446, 359], [254, 253], [253, 449], [449, 254], [253, 252], [252, 450], [450, 253], [252, 256], [256, 451], [451, 252], [256, 341], [341, 452], [452, 256], [414, 413], [413, 463], [463, 414], [286, 441], [441, 414], [414, 286], [286, 258], [258, 441], [441, 286], [258, 257], [257, 442], [442, 258], [257, 259], [259, 443], [443, 257], [259, 260], [260, 444], [444, 259], [260, 467], [467, 445], [445, 260], [309, 459], [459, 250], [250, 309], [305, 289], [289, 290], [290, 305], [305, 290], [290, 460], [460, 305], [401, 376], [376, 435], [435, 401], [309, 250], [250, 392], [392, 309], [376, 411], [411, 433], [433, 376], [453, 341], [341, 464], [464, 453], [357, 453], [453, 465], [465, 357], [343, 357], [357, 412], [412, 343], [437, 343], [343, 399], [399, 437], [344, 360], [360, 440], [440, 344], [420, 437], [437, 456], [456, 420], [360, 420], [420, 363], [363, 360], [361, 401], [401, 288], [288, 361], [265, 372], [372, 353], [353, 265], [390, 339], [339, 249], [249, 390], [339, 448], [448, 255], [255, 339]);
function mh(t) {
  t.u = {
    faceLandmarks: [],
    faceBlendshapes: [],
    facialTransformationMatrixes: []
  };
}
var yh = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect", !1), this.u = {
      faceLandmarks: [],
      faceBlendshapes: [],
      facialTransformationMatrixes: []
    }, this.outputFacialTransformationMatrixes = this.outputFaceBlendshapes = !1, Cn(t = this.h = new Hs(), 0, 1, e = new Cs()), this.H = new Vs(), Cn(this.h, 0, 3, this.H), this.j = new Is(), Cn(this.h, 0, 2, this.j), Xn(this.j, 4, 1), Hn(this.j, 2, .5), Hn(this.H, 2, .5), Hn(this.h, 4, .5);
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.h, 0, 1, t);
  }
  o(t) {
    return "numFaces" in t && Xn(this.j, 4, t.numFaces ?? 1), "minFaceDetectionConfidence" in t && Hn(this.j, 2, t.minFaceDetectionConfidence ?? .5), "minTrackingConfidence" in t && Hn(this.h, 4, t.minTrackingConfidence ?? .5), "minFacePresenceConfidence" in t && Hn(this.H, 2, t.minFacePresenceConfidence ?? .5), "outputFaceBlendshapes" in t && (this.outputFaceBlendshapes = !!t.outputFaceBlendshapes), "outputFacialTransformationMatrixes" in t && (this.outputFacialTransformationMatrixes = !!t.outputFacialTransformationMatrixes), this.l(t);
  }
  F(t, e) {
    return mh(this), eh(this, t, e), this.u;
  }
  G(t, e, n) {
    return mh(this), nh(this, t, n, e), this.u;
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "norm_rect"), Ui(t, "face_landmarks");
    const e = new yi();
    Wn(e, zs, this.h);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"), xi(n, "IMAGE:image_in"), xi(n, "NORM_RECT:norm_rect"), Si(n, "NORM_LANDMARKS:face_landmarks"), n.o(e), Oi(t, n), this.g.attachProtoVectorListener("face_landmarks", (t, e) => {
      for (const e of t) t = us(e), this.u.faceLandmarks.push(Io(t));
      ea(this, e);
    }), this.g.attachEmptyPacketListener("face_landmarks", t => {
      ea(this, t);
    }), this.outputFaceBlendshapes && (Ui(t, "blendshapes"), Si(n, "BLENDSHAPES:blendshapes"), this.g.attachProtoVectorListener("blendshapes", (t, e) => {
      if (this.outputFaceBlendshapes) for (const e of t) t = Wi(e), this.u.faceBlendshapes.push(Co(t.g() ?? []));
      ea(this, e);
    }), this.g.attachEmptyPacketListener("blendshapes", t => {
      ea(this, t);
    })), this.outputFacialTransformationMatrixes && (Ui(t, "face_geometry"), Si(n, "FACE_GEOMETRY:face_geometry"), this.g.attachProtoVectorListener("face_geometry", (t, e) => {
      if (this.outputFacialTransformationMatrixes) for (const e of t) (t = Rn(Gs(e), ls, 2)) && this.u.facialTransformationMatrixes.push({
        rows: Bn(Nn(t, 1), 0) ?? 0,
        columns: Bn(Nn(t, 2), 0) ?? 0,
        data: yn(t, 3, ve).slice() ?? []
      });
      ea(this, e);
    }), this.g.attachEmptyPacketListener("face_geometry", t => {
      ea(this, t);
    })), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.FaceLandmarker = yh;
yh.prototype.detectForVideo = yh.prototype.G, yh.prototype.detect = yh.prototype.F, yh.prototype.setOptions = yh.prototype.o, yh.createFromModelPath = function (t, e) {
  return Qa(yh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, yh.createFromModelBuffer = function (t, e) {
  return Qa(yh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, yh.createFromOptions = function (t, e) {
  return Qa(yh, t, e);
}, yh.FACE_LANDMARKS_LIPS = oh, yh.FACE_LANDMARKS_LEFT_EYE = ah, yh.FACE_LANDMARKS_LEFT_EYEBROW = hh, yh.FACE_LANDMARKS_LEFT_IRIS = ch, yh.FACE_LANDMARKS_RIGHT_EYE = uh, yh.FACE_LANDMARKS_RIGHT_EYEBROW = lh, yh.FACE_LANDMARKS_RIGHT_IRIS = dh, yh.FACE_LANDMARKS_FACE_OVAL = fh, yh.FACE_LANDMARKS_CONTOURS = ph, yh.FACE_LANDMARKS_TESSELATION = gh;
var _h = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect", !0), Cn(t = this.j = new Ks(), 0, 1, e = new Cs());
  }
  get baseOptions() {
    return Rn(this.j, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.j, 0, 1, t);
  }
  o(t) {
    return super.l(t);
  }
  Pa(t, e, n) {
    const r = "function" != typeof e ? e : {};
    if (this.h = "function" == typeof e ? e : n, eh(this, t, r ?? {}), !this.h) return this.u;
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "norm_rect"), Ui(t, "stylized_image");
    const e = new yi();
    Wn(e, Ys, this.j);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.face_stylizer.FaceStylizerGraph"), xi(n, "IMAGE:image_in"), xi(n, "NORM_RECT:norm_rect"), Si(n, "STYLIZED_IMAGE:stylized_image"), n.o(e), Oi(t, n), this.g.W("stylized_image", (t, e) => {
      var n = !this.h,
        r = t.data,
        i = t.width;
      const s = i * (t = t.height);
      if (r instanceof Uint8Array) {
        if (r.length === 3 * s) {
          const e = new Uint8ClampedArray(4 * s);
          for (let t = 0; t < s; ++t) e[4 * t] = r[3 * t], e[4 * t + 1] = r[3 * t + 1], e[4 * t + 2] = r[3 * t + 2], e[4 * t + 3] = 255;
          r = new ImageData(e, i, t);
        } else {
          if (r.length !== 4 * s) throw Error("Unsupported channel count: " + r.length / s);
          r = new ImageData(new Uint8ClampedArray(r.buffer, r.byteOffset, r.length), i, t);
        }
      } else if (!(r instanceof WebGLTexture)) throw Error(`Unsupported format: ${r.constructor.name}`);
      i = new Ka([r], !1, !1, this.g.i.canvas, this.M, i, t), this.u = n = n ? i.clone() : i, this.h && this.h(n), ea(this, e);
    }), this.g.attachEmptyPacketListener("stylized_image", t => {
      this.u = null, this.h && this.h(null), ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.FaceStylizer = _h;
_h.prototype.stylize = _h.prototype.Pa, _h.prototype.setOptions = _h.prototype.o, _h.createFromModelPath = function (t, e) {
  return Qa(_h, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, _h.createFromModelBuffer = function (t, e) {
  return Qa(_h, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, _h.createFromOptions = function (t, e) {
  return Qa(_h, t, e);
};
var vh = $a([0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]);
function Eh(t) {
  t.gestures = [], t.landmarks = [], t.worldLandmarks = [], t.handedness = [];
}
function wh(t) {
  return 0 === t.gestures.length ? {
    gestures: [],
    landmarks: [],
    worldLandmarks: [],
    handedness: [],
    handednesses: []
  } : {
    gestures: t.gestures,
    landmarks: t.landmarks,
    worldLandmarks: t.worldLandmarks,
    handedness: t.handedness,
    handednesses: t.handedness
  };
}
function Th(t, e = !0) {
  const n = [];
  for (const i of t) {
    var r = Wi(i);
    t = [];
    for (const n of r.g()) r = e && null != Nn(n, 1) ? Bn(Nn(n, 1), 0) : -1, t.push({
      score: Gn(n, 2) ?? 0,
      index: r,
      categoryName: jn(n, 3) ?? "",
      displayName: jn(n, 4) ?? ""
    });
    n.push(t);
  }
  return n;
}
var Ah = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect", !1), this.gestures = [], this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Cn(t = this.v = new oo(), 0, 1, e = new Cs()), this.A = new io(), Cn(this.v, 0, 2, this.A), this.u = new no(), Cn(this.A, 0, 3, this.u), this.h = new to(), Cn(this.A, 0, 2, this.h), this.j = new Zs(), Cn(this.v, 0, 3, this.j), Hn(this.h, 2, .5), Hn(this.A, 4, .5), Hn(this.u, 2, .5);
  }
  get baseOptions() {
    return Rn(this.v, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.v, 0, 1, t);
  }
  o(t) {
    if (Xn(this.h, 3, t.numHands ?? 1), "minHandDetectionConfidence" in t && Hn(this.h, 2, t.minHandDetectionConfidence ?? .5), "minTrackingConfidence" in t && Hn(this.A, 4, t.minTrackingConfidence ?? .5), "minHandPresenceConfidence" in t && Hn(this.u, 2, t.minHandPresenceConfidence ?? .5), t.cannedGesturesClassifierOptions) {
      var e = new $s(),
        n = e,
        r = Po(t.cannedGesturesClassifierOptions, Rn(this.j, $s, 3)?.h());
      Cn(n, 0, 2, r), Cn(this.j, 0, 3, e);
    } else void 0 === t.cannedGesturesClassifierOptions && Rn(this.j, $s, 3)?.g();
    return t.customGesturesClassifierOptions ? (Cn(n = e = new $s(), 0, 2, r = Po(t.customGesturesClassifierOptions, Rn(this.j, $s, 4)?.h())), Cn(this.j, 0, 4, e)) : void 0 === t.customGesturesClassifierOptions && Rn(this.j, $s, 4)?.g(), this.l(t);
  }
  Ka(t, e) {
    return Eh(this), eh(this, t, e), wh(this);
  }
  La(t, e, n) {
    return Eh(this), nh(this, t, n, e), wh(this);
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "norm_rect"), Ui(t, "hand_gestures"), Ui(t, "hand_landmarks"), Ui(t, "world_hand_landmarks"), Ui(t, "handedness");
    const e = new yi();
    Wn(e, co, this.v);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"), xi(n, "IMAGE:image_in"), xi(n, "NORM_RECT:norm_rect"), Si(n, "HAND_GESTURES:hand_gestures"), Si(n, "LANDMARKS:hand_landmarks"), Si(n, "WORLD_LANDMARKS:world_hand_landmarks"), Si(n, "HANDEDNESS:handedness"), n.o(e), Oi(t, n), this.g.attachProtoVectorListener("hand_landmarks", (t, e) => {
      for (const e of t) {
        t = us(e);
        const n = [];
        for (const e of Pn(t, as, 1)) n.push({
          x: Gn(e, 1) ?? 0,
          y: Gn(e, 2) ?? 0,
          z: Gn(e, 3) ?? 0,
          visibility: Gn(e, 4) ?? 0
        });
        this.landmarks.push(n);
      }
      ea(this, e);
    }), this.g.attachEmptyPacketListener("hand_landmarks", t => {
      ea(this, t);
    }), this.g.attachProtoVectorListener("world_hand_landmarks", (t, e) => {
      for (const e of t) {
        t = os(e);
        const n = [];
        for (const e of Pn(t, rs, 1)) n.push({
          x: Gn(e, 1) ?? 0,
          y: Gn(e, 2) ?? 0,
          z: Gn(e, 3) ?? 0,
          visibility: Gn(e, 4) ?? 0
        });
        this.worldLandmarks.push(n);
      }
      ea(this, e);
    }), this.g.attachEmptyPacketListener("world_hand_landmarks", t => {
      ea(this, t);
    }), this.g.attachProtoVectorListener("hand_gestures", (t, e) => {
      this.gestures.push(...Th(t, !1)), ea(this, e);
    }), this.g.attachEmptyPacketListener("hand_gestures", t => {
      ea(this, t);
    }), this.g.attachProtoVectorListener("handedness", (t, e) => {
      this.handedness.push(...Th(t)), ea(this, e);
    }), this.g.attachEmptyPacketListener("handedness", t => {
      ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.GestureRecognizer = Ah;
function bh(t) {
  return {
    landmarks: t.landmarks,
    worldLandmarks: t.worldLandmarks,
    handednesses: t.handedness,
    handedness: t.handedness
  };
}
Ah.prototype.recognizeForVideo = Ah.prototype.La, Ah.prototype.recognize = Ah.prototype.Ka, Ah.prototype.setOptions = Ah.prototype.o, Ah.createFromModelPath = function (t, e) {
  return Qa(Ah, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, Ah.createFromModelBuffer = function (t, e) {
  return Qa(Ah, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, Ah.createFromOptions = function (t, e) {
  return Qa(Ah, t, e);
}, Ah.HAND_CONNECTIONS = vh;
var kh = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect", !1), this.landmarks = [], this.worldLandmarks = [], this.handedness = [], Cn(t = this.j = new io(), 0, 1, e = new Cs()), this.u = new no(), Cn(this.j, 0, 3, this.u), this.h = new to(), Cn(this.j, 0, 2, this.h), Xn(this.h, 3, 1), Hn(this.h, 2, .5), Hn(this.u, 2, .5), Hn(this.j, 4, .5);
  }
  get baseOptions() {
    return Rn(this.j, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.j, 0, 1, t);
  }
  o(t) {
    return "numHands" in t && Xn(this.h, 3, t.numHands ?? 1), "minHandDetectionConfidence" in t && Hn(this.h, 2, t.minHandDetectionConfidence ?? .5), "minTrackingConfidence" in t && Hn(this.j, 4, t.minTrackingConfidence ?? .5), "minHandPresenceConfidence" in t && Hn(this.u, 2, t.minHandPresenceConfidence ?? .5), this.l(t);
  }
  F(t, e) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], eh(this, t, e), bh(this);
  }
  G(t, e, n) {
    return this.landmarks = [], this.worldLandmarks = [], this.handedness = [], nh(this, t, n, e), bh(this);
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "norm_rect"), Ui(t, "hand_landmarks"), Ui(t, "world_hand_landmarks"), Ui(t, "handedness");
    const e = new yi();
    Wn(e, ho, this.j);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"), xi(n, "IMAGE:image_in"), xi(n, "NORM_RECT:norm_rect"), Si(n, "LANDMARKS:hand_landmarks"), Si(n, "WORLD_LANDMARKS:world_hand_landmarks"), Si(n, "HANDEDNESS:handedness"), n.o(e), Oi(t, n), this.g.attachProtoVectorListener("hand_landmarks", (t, e) => {
      for (const e of t) t = us(e), this.landmarks.push(Io(t));
      ea(this, e);
    }), this.g.attachEmptyPacketListener("hand_landmarks", t => {
      ea(this, t);
    }), this.g.attachProtoVectorListener("world_hand_landmarks", (t, e) => {
      for (const e of t) t = os(e), this.worldLandmarks.push(Uo(t));
      ea(this, e);
    }), this.g.attachEmptyPacketListener("world_hand_landmarks", t => {
      ea(this, t);
    }), this.g.attachProtoVectorListener("handedness", (t, e) => {
      var n = this.handedness,
        r = n.push;
      const i = [];
      for (const e of t) {
        t = Wi(e);
        const n = [];
        for (const e of t.g()) n.push({
          score: Gn(e, 2) ?? 0,
          index: Bn(Nn(e, 1), 0) ?? -1,
          categoryName: jn(e, 3) ?? "",
          displayName: jn(e, 4) ?? ""
        });
        i.push(n);
      }
      r.call(n, ...i), ea(this, e);
    }), this.g.attachEmptyPacketListener("handedness", t => {
      ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.HandLandmarker = kh;
kh.prototype.detectForVideo = kh.prototype.G, kh.prototype.detect = kh.prototype.F, kh.prototype.setOptions = kh.prototype.o, kh.createFromModelPath = function (t, e) {
  return Qa(kh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, kh.createFromModelBuffer = function (t, e) {
  return Qa(kh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, kh.createFromOptions = function (t, e) {
  return Qa(kh, t, e);
}, kh.HAND_CONNECTIONS = vh;
var xh = $a([0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10], [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], [27, 29], [28, 30], [29, 31], [30, 32], [27, 31], [28, 32]);
function Sh(t) {
  t.h = {
    faceLandmarks: [],
    faceBlendshapes: [],
    poseLandmarks: [],
    poseWorldLandmarks: [],
    poseSegmentationMasks: [],
    leftHandLandmarks: [],
    leftHandWorldLandmarks: [],
    rightHandLandmarks: [],
    rightHandWorldLandmarks: []
  };
}
function Lh(t) {
  try {
    if (!t.I) return t.h;
    t.I(t.h);
  } finally {
    ia(t);
  }
}
function Fh(t, e) {
  t = us(t), e.push(Io(t));
}
var Rh = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "input_frames_image", null, !1), this.h = {
      faceLandmarks: [],
      faceBlendshapes: [],
      poseLandmarks: [],
      poseWorldLandmarks: [],
      poseSegmentationMasks: [],
      leftHandLandmarks: [],
      leftHandWorldLandmarks: [],
      rightHandLandmarks: [],
      rightHandWorldLandmarks: []
    }, this.outputPoseSegmentationMasks = this.outputFaceBlendshapes = !1, Cn(t = this.A = new yo(), 0, 1, e = new Cs()), this.u = new no(), Cn(this.A, 0, 2, this.u), this.aa = new uo(), Cn(this.A, 0, 3, this.aa), this.j = new Is(), Cn(this.A, 0, 4, this.j), this.H = new Vs(), Cn(this.A, 0, 5, this.H), this.v = new fo(), Cn(this.A, 0, 6, this.v), this.D = new go(), Cn(this.A, 0, 7, this.D), Hn(this.j, 2, .5), Hn(this.j, 3, .3), Hn(this.H, 2, .5), Hn(this.v, 2, .5), Hn(this.v, 3, .3), Hn(this.D, 2, .5), Hn(this.u, 2, .5);
  }
  get baseOptions() {
    return Rn(this.A, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.A, 0, 1, t);
  }
  o(t) {
    return "minFaceDetectionConfidence" in t && Hn(this.j, 2, t.minFaceDetectionConfidence ?? .5), "minFaceSuppressionThreshold" in t && Hn(this.j, 3, t.minFaceSuppressionThreshold ?? .3), "minFacePresenceConfidence" in t && Hn(this.H, 2, t.minFacePresenceConfidence ?? .5), "outputFaceBlendshapes" in t && (this.outputFaceBlendshapes = !!t.outputFaceBlendshapes), "minPoseDetectionConfidence" in t && Hn(this.v, 2, t.minPoseDetectionConfidence ?? .5), "minPoseSuppressionThreshold" in t && Hn(this.v, 3, t.minPoseSuppressionThreshold ?? .3), "minPosePresenceConfidence" in t && Hn(this.D, 2, t.minPosePresenceConfidence ?? .5), "outputPoseSegmentationMasks" in t && (this.outputPoseSegmentationMasks = !!t.outputPoseSegmentationMasks), "minHandLandmarksConfidence" in t && Hn(this.u, 2, t.minHandLandmarksConfidence ?? .5), this.l(t);
  }
  F(t, e, n) {
    const r = "function" != typeof e ? e : {};
    return this.I = "function" == typeof e ? e : n, Sh(this), eh(this, t, r), Lh(this);
  }
  G(t, e, n, r) {
    const i = "function" != typeof n ? n : {};
    return this.I = "function" == typeof n ? n : r, Sh(this), nh(this, t, i, e), Lh(this);
  }
  m() {
    var t = new Di();
    Ii(t, "input_frames_image"), Ui(t, "pose_landmarks"), Ui(t, "pose_world_landmarks"), Ui(t, "face_landmarks"), Ui(t, "left_hand_landmarks"), Ui(t, "left_hand_world_landmarks"), Ui(t, "right_hand_landmarks"), Ui(t, "right_hand_world_landmarks");
    const e = new yi(),
      n = new oi();
    An(n, 1, Me("type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"), ""), function (t, e) {
      if (null != e) if (Array.isArray(e)) dn(t, 2, tn(e, nn, void 0, void 0, !1));else {
        if (!("string" == typeof e || e instanceof B || M(e))) throw Error("invalid value in Any.value field: " + e + " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");
        An(t, 2, ae(e, !1, !1), D());
      }
    }(n, this.A.g());
    const r = new Li();
    ki(r, "mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"), Dn(r, 8, oi, n), xi(r, "IMAGE:input_frames_image"), Si(r, "POSE_LANDMARKS:pose_landmarks"), Si(r, "POSE_WORLD_LANDMARKS:pose_world_landmarks"), Si(r, "FACE_LANDMARKS:face_landmarks"), Si(r, "LEFT_HAND_LANDMARKS:left_hand_landmarks"), Si(r, "LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"), Si(r, "RIGHT_HAND_LANDMARKS:right_hand_landmarks"), Si(r, "RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"), r.o(e), Oi(t, r), na(this, t), this.g.attachProtoListener("pose_landmarks", (t, e) => {
      Fh(t, this.h.poseLandmarks), ea(this, e);
    }), this.g.attachEmptyPacketListener("pose_landmarks", t => {
      ea(this, t);
    }), this.g.attachProtoListener("pose_world_landmarks", (t, e) => {
      var n = this.h.poseWorldLandmarks;
      t = os(t), n.push(Uo(t)), ea(this, e);
    }), this.g.attachEmptyPacketListener("pose_world_landmarks", t => {
      ea(this, t);
    }), this.outputPoseSegmentationMasks && (Si(r, "POSE_SEGMENTATION_MASK:pose_segmentation_mask"), ra(this, "pose_segmentation_mask"), this.g.W("pose_segmentation_mask", (t, e) => {
      this.h.poseSegmentationMasks = [rh(this, t, !0, !this.I)], ea(this, e);
    }), this.g.attachEmptyPacketListener("pose_segmentation_mask", t => {
      this.h.poseSegmentationMasks = [], ea(this, t);
    })), this.g.attachProtoListener("face_landmarks", (t, e) => {
      Fh(t, this.h.faceLandmarks), ea(this, e);
    }), this.g.attachEmptyPacketListener("face_landmarks", t => {
      ea(this, t);
    }), this.outputFaceBlendshapes && (Ui(t, "extra_blendshapes"), Si(r, "FACE_BLENDSHAPES:extra_blendshapes"), this.g.attachProtoListener("extra_blendshapes", (t, e) => {
      var n = this.h.faceBlendshapes;
      this.outputFaceBlendshapes && (t = Wi(t), n.push(Co(t.g() ?? []))), ea(this, e);
    }), this.g.attachEmptyPacketListener("extra_blendshapes", t => {
      ea(this, t);
    })), this.g.attachProtoListener("left_hand_landmarks", (t, e) => {
      Fh(t, this.h.leftHandLandmarks), ea(this, e);
    }), this.g.attachEmptyPacketListener("left_hand_landmarks", t => {
      ea(this, t);
    }), this.g.attachProtoListener("left_hand_world_landmarks", (t, e) => {
      var n = this.h.leftHandWorldLandmarks;
      t = os(t), n.push(Uo(t)), ea(this, e);
    }), this.g.attachEmptyPacketListener("left_hand_world_landmarks", t => {
      ea(this, t);
    }), this.g.attachProtoListener("right_hand_landmarks", (t, e) => {
      Fh(t, this.h.rightHandLandmarks), ea(this, e);
    }), this.g.attachEmptyPacketListener("right_hand_landmarks", t => {
      ea(this, t);
    }), this.g.attachProtoListener("right_hand_world_landmarks", (t, e) => {
      var n = this.h.rightHandWorldLandmarks;
      t = os(t), n.push(Uo(t)), ea(this, e);
    }), this.g.attachEmptyPacketListener("right_hand_world_landmarks", t => {
      ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.HolisticLandmarker = Rh;
Rh.prototype.detectForVideo = Rh.prototype.G, Rh.prototype.detect = Rh.prototype.F, Rh.prototype.setOptions = Rh.prototype.o, Rh.createFromModelPath = function (t, e) {
  return Qa(Rh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, Rh.createFromModelBuffer = function (t, e) {
  return Qa(Rh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, Rh.createFromOptions = function (t, e) {
  return Qa(Rh, t, e);
}, Rh.HAND_CONNECTIONS = vh, Rh.POSE_CONNECTIONS = xh, Rh.FACE_LANDMARKS_LIPS = oh, Rh.FACE_LANDMARKS_LEFT_EYE = ah, Rh.FACE_LANDMARKS_LEFT_EYEBROW = hh, Rh.FACE_LANDMARKS_LEFT_IRIS = ch, Rh.FACE_LANDMARKS_RIGHT_EYE = uh, Rh.FACE_LANDMARKS_RIGHT_EYEBROW = lh, Rh.FACE_LANDMARKS_RIGHT_IRIS = dh, Rh.FACE_LANDMARKS_FACE_OVAL = fh, Rh.FACE_LANDMARKS_CONTOURS = ph, Rh.FACE_LANDMARKS_TESSELATION = gh;
var Mh = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "input_image", "norm_rect", !0), this.j = {
      classifications: []
    }, Cn(t = this.h = new _o(), 0, 1, e = new Cs());
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.h, 0, 1, t);
  }
  o(t) {
    return Cn(this.h, 0, 2, Po(t, Rn(this.h, ks, 2))), this.l(t);
  }
  ua(t, e) {
    return this.j = {
      classifications: []
    }, eh(this, t, e), this.j;
  }
  va(t, e, n) {
    return this.j = {
      classifications: []
    }, nh(this, t, n, e), this.j;
  }
  m() {
    var t = new Di();
    Ii(t, "input_image"), Ii(t, "norm_rect"), Ui(t, "classifications");
    const e = new yi();
    Wn(e, vo, this.h);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"), xi(n, "IMAGE:input_image"), xi(n, "NORM_RECT:norm_rect"), Si(n, "CLASSIFICATIONS:classifications"), n.o(e), Oi(t, n), this.g.attachProtoListener("classifications", (t, e) => {
      this.j = function (t) {
        const e = {
          classifications: Pn(t, ps, 1).map(t => Co(Rn(t, Xi, 4)?.g() ?? [], Bn(Nn(t, 2), 0), jn(t, 3)))
        };
        return null != Fe(cn(t, 2)) && (e.timestampMs = Bn(Fe(cn(t, 2)), 0)), e;
      }(ys(t)), ea(this, e);
    }), this.g.attachEmptyPacketListener("classifications", t => {
      ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.ImageClassifier = Mh;
Mh.prototype.classifyForVideo = Mh.prototype.va, Mh.prototype.classify = Mh.prototype.ua, Mh.prototype.setOptions = Mh.prototype.o, Mh.createFromModelPath = function (t, e) {
  return Qa(Mh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, Mh.createFromModelBuffer = function (t, e) {
  return Qa(Mh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, Mh.createFromOptions = function (t, e) {
  return Qa(Mh, t, e);
};
var Ph = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect", !0), this.h = new Eo(), this.embeddings = {
      embeddings: []
    }, Cn(t = this.h, 0, 1, e = new Cs());
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.h, 0, 1, t);
  }
  o(t) {
    var e = this.h,
      n = Rn(this.h, Ss, 2);
    return n = n ? n.clone() : new Ss(), void 0 !== t.l2Normalize ? Vn(n, 1, t.l2Normalize) : "l2Normalize" in t && dn(n, 1), void 0 !== t.quantize ? Vn(n, 2, t.quantize) : "quantize" in t && dn(n, 2), Cn(e, 0, 2, n), this.l(t);
  }
  Ba(t, e) {
    return eh(this, t, e), this.embeddings;
  }
  Ca(t, e, n) {
    return nh(this, t, n, e), this.embeddings;
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "norm_rect"), Ui(t, "embeddings_out");
    const e = new yi();
    Wn(e, wo, this.h);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"), xi(n, "IMAGE:image_in"), xi(n, "NORM_RECT:norm_rect"), Si(n, "EMBEDDINGS:embeddings_out"), n.o(e), Oi(t, n), this.g.attachProtoListener("embeddings_out", (t, e) => {
      t = bs(t), this.embeddings = function (t) {
        return {
          embeddings: Pn(t, Es, 1).map(t => {
            const e = {
              headIndex: Bn(Nn(t, 3), 0) ?? -1,
              headName: jn(t, 4) ?? ""
            };
            if (void 0 !== Fn(t, _s, xn(t, 1))) t = yn(t = Rn(t, _s, xn(t, 1)), 1, ve), e.floatEmbedding = t.slice();else {
              const n = new Uint8Array(0);
              e.quantizedEmbedding = Rn(t, vs, xn(t, 2))?.qa()?.h() ?? n;
            }
            return e;
          }),
          timestampMs: Bn(Fe(cn(t, 2)), 0)
        };
      }(t), ea(this, e);
    }), this.g.attachEmptyPacketListener("embeddings_out", t => {
      ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.ImageEmbedder = Ph;
Ph.cosineSimilarity = function (t, e) {
  if (t.floatEmbedding && e.floatEmbedding) t = No(t.floatEmbedding, e.floatEmbedding);else {
    if (!t.quantizedEmbedding || !e.quantizedEmbedding) throw Error("Cannot compute cosine similarity between quantized and float embeddings.");
    t = No(Do(t.quantizedEmbedding), Do(e.quantizedEmbedding));
  }
  return t;
}, Ph.prototype.embedForVideo = Ph.prototype.Ca, Ph.prototype.embed = Ph.prototype.Ba, Ph.prototype.setOptions = Ph.prototype.o, Ph.createFromModelPath = function (t, e) {
  return Qa(Ph, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, Ph.createFromModelBuffer = function (t, e) {
  return Qa(Ph, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, Ph.createFromOptions = function (t, e) {
  return Qa(Ph, t, e);
};
var Ch = class {
  constructor(t, e, n) {
    this.confidenceMasks = t, this.categoryMask = e, this.qualityScores = n;
  }
  close() {
    this.confidenceMasks?.forEach(t => {
      t.close();
    }), this.categoryMask?.close();
  }
};
exports.ImageSegmenterResult = Ch;
function Oh(t) {
  t.categoryMask = void 0, t.confidenceMasks = void 0, t.qualityScores = void 0;
}
function Ih(t) {
  try {
    const e = new Ch(t.confidenceMasks, t.categoryMask, t.qualityScores);
    if (!t.j) return e;
    t.j(e);
  } finally {
    ia(t);
  }
}
Ch.prototype.close = Ch.prototype.close;
var Uh = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect", !1), this.u = [], this.outputCategoryMask = !1, this.outputConfidenceMasks = !0, this.h = new xo(), this.v = new To(), Cn(this.h, 0, 3, this.v), Cn(t = this.h, 0, 1, e = new Cs());
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.h, 0, 1, t);
  }
  o(t) {
    return void 0 !== t.displayNamesLocale ? dn(this.h, 2, Me(t.displayNamesLocale)) : "displayNamesLocale" in t && dn(this.h, 2), "outputCategoryMask" in t && (this.outputCategoryMask = t.outputCategoryMask ?? !1), "outputConfidenceMasks" in t && (this.outputConfidenceMasks = t.outputConfidenceMasks ?? !0), super.l(t);
  }
  L() {
    !function (t) {
      const e = Pn(t.fa(), Li, 1).filter(t => jn(t, 1).includes("mediapipe.tasks.TensorsToSegmentationCalculator"));
      if (t.u = [], 1 < e.length) throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");
      1 === e.length && (Rn(e[0], yi, 7)?.l()?.g() ?? new Map()).forEach((e, n) => {
        t.u[Number(n)] = jn(e, 1);
      });
    }(this);
  }
  ga(t, e, n) {
    const r = "function" != typeof e ? e : {};
    return this.j = "function" == typeof e ? e : n, Oh(this), eh(this, t, r), Ih(this);
  }
  Na(t, e, n, r) {
    const i = "function" != typeof n ? n : {};
    return this.j = "function" == typeof n ? n : r, Oh(this), nh(this, t, i, e), Ih(this);
  }
  Fa() {
    return this.u;
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "norm_rect");
    const e = new yi();
    Wn(e, So, this.h);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"), xi(n, "IMAGE:image_in"), xi(n, "NORM_RECT:norm_rect"), n.o(e), Oi(t, n), na(this, t), this.outputConfidenceMasks && (Ui(t, "confidence_masks"), Si(n, "CONFIDENCE_MASKS:confidence_masks"), ra(this, "confidence_masks"), this.g.da("confidence_masks", (t, e) => {
      this.confidenceMasks = t.map(t => rh(this, t, !0, !this.j)), ea(this, e);
    }), this.g.attachEmptyPacketListener("confidence_masks", t => {
      this.confidenceMasks = [], ea(this, t);
    })), this.outputCategoryMask && (Ui(t, "category_mask"), Si(n, "CATEGORY_MASK:category_mask"), ra(this, "category_mask"), this.g.W("category_mask", (t, e) => {
      this.categoryMask = rh(this, t, !1, !this.j), ea(this, e);
    }), this.g.attachEmptyPacketListener("category_mask", t => {
      this.categoryMask = void 0, ea(this, t);
    })), Ui(t, "quality_scores"), Si(n, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", (t, e) => {
      this.qualityScores = t, ea(this, e);
    }), this.g.attachEmptyPacketListener("quality_scores", t => {
      this.categoryMask = void 0, ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.ImageSegmenter = Uh;
Uh.prototype.getLabels = Uh.prototype.Fa, Uh.prototype.segmentForVideo = Uh.prototype.Na, Uh.prototype.segment = Uh.prototype.ga, Uh.prototype.setOptions = Uh.prototype.o, Uh.createFromModelPath = function (t, e) {
  return Qa(Uh, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, Uh.createFromModelBuffer = function (t, e) {
  return Qa(Uh, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, Uh.createFromOptions = function (t, e) {
  return Qa(Uh, t, e);
};
var Dh = class {
  constructor(t, e, n) {
    this.confidenceMasks = t, this.categoryMask = e, this.qualityScores = n;
  }
  close() {
    this.confidenceMasks?.forEach(t => {
      t.close();
    }), this.categoryMask?.close();
  }
};
exports.InteractiveSegmenterResult = Dh;
Dh.prototype.close = Dh.prototype.close;
var Nh = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Bh = [0, jr, -2],
  Gh = [0, Or, -3, Hr],
  jh = [0, Or, -3, Hr, Or, -1],
  Vh = [0, jh],
  Xh = [0, Vh, Bh],
  Hh = [0, jh, Bh],
  Wh = [0, jh, jr, -1],
  zh = [0, Wh, Bh],
  Kh = [0, Or, -3, Hr, Bh, -1],
  Yh = [0, Or, -3, Hr, ti],
  $h = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  qh = [0, Or, -1, Hr],
  Jh = class extends zn {
    constructor() {
      super();
    }
  };
Jh.B = [1];
var Zh = class extends zn {
    constructor(t) {
      super(t);
    }
  },
  Qh = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15],
  tc = [0, Qh, Jr, jh, Jr, Hh, Jr, Vh, Jr, Xh, Jr, qh, Jr, Yh, Jr, Gh, Jr, [0, Yr, Or, -2, Hr, jr, Hr, -1, 2, Or, Bh], Jr, Wh, Jr, zh, Or, Bh, Yr, Jr, Kh, Jr, [0, Cr, qh]],
  ec = [0, Yr, jr, -1, Hr],
  nc = class extends zn {
    constructor() {
      super();
    }
  };
nc.B = [1], nc.prototype.g = si([0, Cr, tc, Yr, ec]);
var rc = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect_in", !1), this.outputCategoryMask = !1, this.outputConfidenceMasks = !0, this.h = new xo(), this.v = new To(), Cn(this.h, 0, 3, this.v), Cn(t = this.h, 0, 1, e = new Cs());
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.h, 0, 1, t);
  }
  o(t) {
    return "outputCategoryMask" in t && (this.outputCategoryMask = t.outputCategoryMask ?? !1), "outputConfidenceMasks" in t && (this.outputConfidenceMasks = t.outputConfidenceMasks ?? !0), super.l(t);
  }
  ga(t, e, n, r) {
    const i = "function" != typeof n ? n : {};
    this.j = "function" == typeof n ? n : r, this.qualityScores = this.categoryMask = this.confidenceMasks = void 0, n = this.J + 1, r = new nc();
    const s = new Zh();
    var o = new Nh();
    if (Xn(o, 1, 255), Cn(s, 0, 12, o), e.keypoint && e.scribble) throw Error("Cannot provide both keypoint and scribble.");
    if (e.keypoint) {
        var a = new $h();
        Vn(a, 3, !0);
        Hn(a, 1, e.keypoint.x);
        Hn(a, 2, e.keypoint.y);
        On(s, 5, Qh, a);
    } else {
        if (!e.scribble) {
            throw Error("Must provide either a keypoint or a scribble.");
        }
    
        var o = new Jh();
        for (a of e.scribble) {
            var e = new $h();
            Vn(e, 3, !0);
            Hn(e, 1, a.x);
            Hn(e, 2, a.y);
            Dn(o, 1, $h, e);
        }
        On(s, 15, Qh, o);
    }
    Dn(r, 1, Zh, s), this.g.addProtoToStream(r.g(), "drishti.RenderData", "roi_in", n), eh(this, t, i);
    t: {
      try {
        const t = new Dh(this.confidenceMasks, this.categoryMask, this.qualityScores);
        if (!this.j) {
          var h = t;
          break t;
        }
        this.j(t);
      } finally {
        ia(this);
      }
      h = void 0;
    }
    return h;
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "roi_in"), Ii(t, "norm_rect_in");
    const e = new yi();
    Wn(e, So, this.h);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraph"), xi(n, "IMAGE:image_in"), xi(n, "ROI:roi_in"), xi(n, "NORM_RECT:norm_rect_in"), n.o(e), Oi(t, n), na(this, t), this.outputConfidenceMasks && (Ui(t, "confidence_masks"), Si(n, "CONFIDENCE_MASKS:confidence_masks"), ra(this, "confidence_masks"), this.g.da("confidence_masks", (t, e) => {
      this.confidenceMasks = t.map(t => rh(this, t, !0, !this.j)), ea(this, e);
    }), this.g.attachEmptyPacketListener("confidence_masks", t => {
      this.confidenceMasks = [], ea(this, t);
    })), this.outputCategoryMask && (Ui(t, "category_mask"), Si(n, "CATEGORY_MASK:category_mask"), ra(this, "category_mask"), this.g.W("category_mask", (t, e) => {
      this.categoryMask = rh(this, t, !1, !this.j), ea(this, e);
    }), this.g.attachEmptyPacketListener("category_mask", t => {
      this.categoryMask = void 0, ea(this, t);
    })), Ui(t, "quality_scores"), Si(n, "QUALITY_SCORES:quality_scores"), this.g.attachFloatVectorListener("quality_scores", (t, e) => {
      this.qualityScores = t, ea(this, e);
    }), this.g.attachEmptyPacketListener("quality_scores", t => {
      this.categoryMask = void 0, ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.InteractiveSegmenter = rc;
rc.prototype.segment = rc.prototype.ga, rc.prototype.setOptions = rc.prototype.o, rc.createFromModelPath = function (t, e) {
  return Qa(rc, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, rc.createFromModelBuffer = function (t, e) {
  return Qa(rc, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, rc.createFromOptions = function (t, e) {
  return Qa(rc, t, e);
};
var ic = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "input_frame_gpu", "norm_rect", !1), this.j = {
      detections: []
    }, Cn(t = this.h = new Lo(), 0, 1, e = new Cs());
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.h, 0, 1, t);
  }
  o(t) {
    return void 0 !== t.displayNamesLocale ? dn(this.h, 2, Me(t.displayNamesLocale)) : "displayNamesLocale" in t && dn(this.h, 2), void 0 !== t.maxResults ? Xn(this.h, 3, t.maxResults) : "maxResults" in t && dn(this.h, 3), void 0 !== t.scoreThreshold ? Hn(this.h, 4, t.scoreThreshold) : "scoreThreshold" in t && dn(this.h, 4), void 0 !== t.categoryAllowlist ? Tn(this.h, 5, t.categoryAllowlist) : "categoryAllowlist" in t && dn(this.h, 5), void 0 !== t.categoryDenylist ? Tn(this.h, 6, t.categoryDenylist) : "categoryDenylist" in t && dn(this.h, 6), this.l(t);
  }
  F(t, e) {
    return this.j = {
      detections: []
    }, eh(this, t, e), this.j;
  }
  G(t, e, n) {
    return this.j = {
      detections: []
    }, nh(this, t, n, e), this.j;
  }
  m() {
    var t = new Di();
    Ii(t, "input_frame_gpu"), Ii(t, "norm_rect"), Ui(t, "detections");
    const e = new yi();
    Wn(e, Fo, this.h);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.ObjectDetectorGraph"), xi(n, "IMAGE:input_frame_gpu"), xi(n, "NORM_RECT:norm_rect"), Si(n, "DETECTIONS:detections"), n.o(e), Oi(t, n), this.g.attachProtoVectorListener("detections", (t, e) => {
      for (const e of t) t = ns(e), this.j.detections.push(Oo(t));
      ea(this, e);
    }), this.g.attachEmptyPacketListener("detections", t => {
      ea(this, t);
    }), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.ObjectDetector = ic;
ic.prototype.detectForVideo = ic.prototype.G, ic.prototype.detect = ic.prototype.F, ic.prototype.setOptions = ic.prototype.o, ic.createFromModelPath = async function (t, e) {
  return Qa(ic, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, ic.createFromModelBuffer = function (t, e) {
  return Qa(ic, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, ic.createFromOptions = function (t, e) {
  return Qa(ic, t, e);
};
var sc = class {
  constructor(t, e, n) {
    this.landmarks = t, this.worldLandmarks = e, this.segmentationMasks = n;
  }
  close() {
    this.segmentationMasks?.forEach(t => {
      t.close();
    });
  }
};
function oc(t) {
  t.landmarks = [], t.worldLandmarks = [], t.segmentationMasks = void 0;
}
function ac(t) {
  try {
    const e = new sc(t.landmarks, t.worldLandmarks, t.segmentationMasks);
    if (!t.j) return e;
    t.j(e);
  } finally {
    ia(t);
  }
}
sc.prototype.close = sc.prototype.close;
var hc = class extends ih {
  constructor(t, e) {
    super(new Za(t, e), "image_in", "norm_rect", !1), this.landmarks = [], this.worldLandmarks = [], this.outputSegmentationMasks = !1, Cn(t = this.h = new Ro(), 0, 1, e = new Cs()), this.D = new go(), Cn(this.h, 0, 3, this.D), this.v = new fo(), Cn(this.h, 0, 2, this.v), Xn(this.v, 4, 1), Hn(this.v, 2, .5), Hn(this.D, 2, .5), Hn(this.h, 4, .5);
  }
  get baseOptions() {
    return Rn(this.h, Cs, 1);
  }
  set baseOptions(t) {
    Cn(this.h, 0, 1, t);
  }
  o(t) {
    return "numPoses" in t && Xn(this.v, 4, t.numPoses ?? 1), "minPoseDetectionConfidence" in t && Hn(this.v, 2, t.minPoseDetectionConfidence ?? .5), "minTrackingConfidence" in t && Hn(this.h, 4, t.minTrackingConfidence ?? .5), "minPosePresenceConfidence" in t && Hn(this.D, 2, t.minPosePresenceConfidence ?? .5), "outputSegmentationMasks" in t && (this.outputSegmentationMasks = t.outputSegmentationMasks ?? !1), this.l(t);
  }
  F(t, e, n) {
    const r = "function" != typeof e ? e : {};
    return this.j = "function" == typeof e ? e : n, oc(this), eh(this, t, r), ac(this);
  }
  G(t, e, n, r) {
    const i = "function" != typeof n ? n : {};
    return this.j = "function" == typeof n ? n : r, oc(this), nh(this, t, i, e), ac(this);
  }
  m() {
    var t = new Di();
    Ii(t, "image_in"), Ii(t, "norm_rect"), Ui(t, "normalized_landmarks"), Ui(t, "world_landmarks"), Ui(t, "segmentation_masks");
    const e = new yi();
    Wn(e, Mo, this.h);
    const n = new Li();
    ki(n, "mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"), xi(n, "IMAGE:image_in"), xi(n, "NORM_RECT:norm_rect"), Si(n, "NORM_LANDMARKS:normalized_landmarks"), Si(n, "WORLD_LANDMARKS:world_landmarks"), n.o(e), Oi(t, n), na(this, t), this.g.attachProtoVectorListener("normalized_landmarks", (t, e) => {
      this.landmarks = [];
      for (const e of t) t = us(e), this.landmarks.push(Io(t));
      ea(this, e);
    }), this.g.attachEmptyPacketListener("normalized_landmarks", t => {
      this.landmarks = [], ea(this, t);
    }), this.g.attachProtoVectorListener("world_landmarks", (t, e) => {
      this.worldLandmarks = [];
      for (const e of t) t = os(e), this.worldLandmarks.push(Uo(t));
      ea(this, e);
    }), this.g.attachEmptyPacketListener("world_landmarks", t => {
      this.worldLandmarks = [], ea(this, t);
    }), this.outputSegmentationMasks && (Si(n, "SEGMENTATION_MASK:segmentation_masks"), ra(this, "segmentation_masks"), this.g.da("segmentation_masks", (t, e) => {
      this.segmentationMasks = t.map(t => rh(this, t, !0, !this.j)), ea(this, e);
    }), this.g.attachEmptyPacketListener("segmentation_masks", t => {
      this.segmentationMasks = [], ea(this, t);
    })), t = t.g(), this.setGraph(new Uint8Array(t), !0);
  }
};
exports.PoseLandmarker = hc;
hc.prototype.detectForVideo = hc.prototype.G, hc.prototype.detect = hc.prototype.F, hc.prototype.setOptions = hc.prototype.o, hc.createFromModelPath = function (t, e) {
  return Qa(hc, t, {
    baseOptions: {
      modelAssetPath: e
    }
  });
}, hc.createFromModelBuffer = function (t, e) {
  return Qa(hc, t, {
    baseOptions: {
      modelAssetBuffer: e
    }
  });
}, hc.createFromOptions = function (t, e) {
  return Qa(hc, t, e);
}, hc.POSE_CONNECTIONS = xh;
},{}],"main.js":[function(require,module,exports) {
"use strict";

var _tasksVision = require("@mediapipe/tasks-vision");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var modal = null;
var mediaStream = null;
var bounding_box_colors = {};
var user_confidence = 0.6;
var confidence_threshold = 0.1;
var model_name = "rock-paper-scissors-sxsw";
var model_version = 11;
var model_type = "pushups";
var video;
var video_camera;

// Pushups
var countPushup = 0;
var currentStatusPushup = "nothing";
var verifyTimesPushup = 10;
var currentVerifyPushup = 0;
var newStatusPushup = "nothing";
var shoulderOffset = 0;

// Situps
var countSitup = 0;
var currentStatusSitup = "nothing";
var verifyTimesSitup = 10;
var currentVerifySitup = 0;
var newStatusSitup = "nothing";

// Squats
var countSquat = 0;
var currentStatusSquat = "squat-up";
var verifyTimesSquat = 10;
var currentVerifySquat = 0;
var newStatusSquat = "squat-up";
var shouldMirrorVideo = true;

// Update the colors in this list to set the bounding box colors
var color_choices = ["#C7FC00", "#FF00FF", "#8622FF", "#FE0056", "#00FFCE", "#FF8000", "#00B7EB", "#FFFF00", "#0E7AFE", "#FFABAB", "#0000FF", "#CCCCCC"];
var canvas_painted = false;
var canvas;
var ctx;
var canvas_input;
var ctx_input;
var inferEngine = new inferencejs.InferenceEngine();
var modelWorkerId = null;
var publishable_key = "ROBOFLOW";
var drawingSelected = false;
var poseLandmarker = undefined;
var runningMode = "IMAGE";
var lastVideoTime = -1;
var POSE_CONNECTIONS_PUSHUP = [{
  "start": 0,
  "end": 1
}, {
  "start": 0,
  "end": 2
}, {
  "start": 2,
  "end": 4
}, {
  "start": 1,
  "end": 3
}, {
  "start": 3,
  "end": 5
}, {
  "start": 0,
  "end": 6
}, {
  "start": 1,
  "end": 7
}, {
  "start": 6,
  "end": 7
}, {
  "start": 6,
  "end": 8
}, {
  "start": 7,
  "end": 8
}, {
  "start": 8,
  "end": 10
}, {
  "start": 9,
  "end": 11
}];
var POSE_CONNECTIONS_SITUP = [{
  "start": 0,
  "end": 1
}, {
  "start": 0,
  "end": 2
}, {
  "start": 1,
  "end": 3
}, {
  "start": 2,
  "end": 3
}, {
  "start": 2,
  "end": 4
}, {
  "start": 4,
  "end": 6
}, {
  "start": 3,
  "end": 5
}, {
  "start": 5,
  "end": 7
}];
var POSE_CONNECTIONS_SQUAT = [{
  "start": 0,
  "end": 1
}, {
  "start": 0,
  "end": 2
}, {
  "start": 1,
  "end": 3
}, {
  "start": 2,
  "end": 3
}, {
  "start": 2,
  "end": 4
}, {
  "start": 4,
  "end": 6
}, {
  "start": 6,
  "end": 8
}, {
  "start": 8,
  "end": 10
}, {
  "start": 6,
  "end": 10
}, {
  "start": 3,
  "end": 5
}, {
  "start": 5,
  "end": 7
}, {
  "start": 7,
  "end": 9
}, {
  "start": 9,
  "end": 11
}, {
  "start": 11,
  "end": 7
}];
chrome.runtime.onMessage.addListener(function (request) {
  if (request.command === "start") {

    const vision = _tasksVision.FilesetResolver.forVisionTasks(
      chrome.runtime.getURL("js/wasm")
    );
      
    poseLandmarker = _tasksVision.PoseLandmarker.createFromOptions(vision, {
      /*baseOptions: {
        modelAssetPath: chrome.runtime.getURL("js/pose_landmarker_lite.task"),
        delegate: "GPU"
      },*/
      runningMode: runningMode,
      numPoses: 1
    });
    
    createRightSideModal();
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user"
      },
      audio: false
    }).then(function (stream) {
      mediaStream = stream;
      video_camera = document.createElement("video");
      video_camera.srcObject = stream;
      video_camera.onloadedmetadata = function () {
        video_camera.play();
      };
      video = document.createElement("video");
      var canvasStream = canvas_input.captureStream(25);
      video.srcObject = canvasStream;
      video.id = "webcam";

      // hide video until the web stream is ready
      video.style.display = "none";
      video.setAttribute("playsinline", "");
      document.getElementById("result_canvas").after(video);
      video.onloadedmetadata = function () {
        video.play();
      };

      // on full load, set the video height and width
      video.onplay = function () {
        var height = video.videoHeight;
        var width = video.videoWidth;

        // scale down video by 0.75

        video.width = width;
        video.height = height;
        video.style.width = 640 + "px";
        video.style.height = 480 + "px";
        canvas.style.width = 640 + "px";
        canvas.style.height = 480 + "px";
        canvas.width = width;
        canvas.height = height;
        document.getElementById("result_canvas").style.display = "block";
      };
      ctx = canvas.getContext("2d");
      ctx_input = canvas_input.getContext("2d");
      ctx.scale(1, 1);

      // Load the Roboflow model using the publishable_key set in index.html
      // and the model name and version set at the top of this file
      inferEngine.startWorker(model_name, model_version, publishable_key, [{
        scoreThreshold: confidence_threshold
      }]).then(function (id) {
        modelWorkerId = id;
        // Start inference
        detectFrame();
      });
    }).catch(function (err) {
      console.log(err);
    });
    function createRightSideModal() {
      modal = document.createElement('div');
      modal.setAttribute('id', 'myModal');
      modal.style.display = 'block';
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.right = '0';
      modal.style.height = '100%';
      modal.style.width = '100%';
      modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
      modal.style.zIndex = '1';
      var innerDiv = document.createElement('div');
      innerDiv.style.textAlign = 'center';
      var inferWidgetDiv = document.createElement('div');
      inferWidgetDiv.className = 'infer-widget';
      canvas_input = document.createElement('canvas');
      canvas_input.id = 'input_canvas';
      canvas_input.style.display = "block";
      canvas_input.style.position = "absolute";
      canvas_input.style.zIndex = 50;
      canvas_input.width = 640;
      canvas_input.height = 480;
      inferWidgetDiv.appendChild(canvas_input);
      canvas = document.createElement('canvas');
      canvas.id = 'result_canvas';
      canvas.width = 640;
      canvas.height = 480;
      inferWidgetDiv.appendChild(canvas);
      var hideButton = document.createElement('button');
      hideButton.textContent = 'Hide';
      hideButton.style.width = '200px';
      hideButton.style.height = '30px';
      hideButton.style.marginTop = "20px";
      hideButton.style.background = 'white';
      hideButton.style.color = 'black';
      hideButton.onclick = function () {
        modal.style.visibility = "hidden";
      };
      var exitButton = document.createElement('button');
      exitButton.textContent = 'Exit';
      exitButton.style.width = '200px';
      exitButton.style.height = '30px';
      exitButton.style.marginTop = "40px";
      exitButton.style.background = 'white';
      exitButton.style.color = 'black';
      exitButton.onclick = function () {
        if (mediaStream) {
          mediaStream.getTracks().forEach(function (track) {
            return track.stop();
          });
          mediaStream = null;
        }
        modal.style.display = 'none';
        var element = document.getElementById("coverDiv");
        element.parentNode.removeChild(element);
        chrome.runtime.sendMessage({
          command: "unmuteTab"
        });
      };
      modal.appendChild(innerDiv);
      innerDiv.appendChild(inferWidgetDiv);
      innerDiv.appendChild(hideButton);
      innerDiv.appendChild(exitButton);
      document.body.appendChild(modal);
    }
    function detectFrame() {
      // On first run, initialize a canvas
      // On all runs, run inference using a video frame
      // For each video frame, draw bounding boxes on the canvas
      if (!modelWorkerId) {
        return requestAnimationFrame(detectFrame);
      }
      if (!drawingSelected) {
        if (shouldMirrorVideo) {
          ctx_input.save();
          ctx_input.scale(-1, 1);
          ctx_input.translate(-canvas_input.width, 0);
          ctx_input.drawImage(video_camera, 0, 0, canvas_input.width, canvas_input.height);
          ctx_input.restore();
        } else {
          ctx_input.drawImage(video_camera, 0, 0, canvas_input.width, canvas_input.height);
        }
      }
      if (!canvas_painted) {
        var video_start = document.getElementById("webcam");
        canvas.top = video_start.top;
        canvas.left = video_start.left;
        canvas.style.top = video_start.top + "px";
        canvas.style.left = video_start.left + "px";
        canvas.style.position = "absolute";
        canvas.style.zIndex = 100;
        video_start.style.display = "block";
        canvas.style.display = "absolute";
        canvas_painted = true;
      }
      requestAnimationFrame(detectFrame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (video) {
        pose.send({
          image: video
        });
        //drawBoundingBoxes(predictions, ctx)
      }

      /*inferEngine.infer(modelWorkerId, new inferencejs.CVImage(video)).then(function(predictions) {
             if (!canvas_painted) {
          var video_start = document.getElementById("webcam");
               canvas.top = video_start.top;
          canvas.left = video_start.left;
          canvas.style.top = video_start.top + "px";
          canvas.style.left = video_start.left + "px";
          canvas.style.position = "absolute";
          canvas.style.zIndex = 100;
          video_start.style.display = "block";
          canvas.style.display = "absolute";
          canvas_painted = true;
               var loading = document.getElementById("loading");
          loading.style.display = "none";
          document.getElementById("videoSource").style.display = "none";
          document.getElementById("infer-widget").style.display = "block";
        }
        requestAnimationFrame(detectFrame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
             if (video) {
               //drawBoundingBoxes(predictions, ctx)
        }
      });*/
    }
    function drawBoundingBoxes(predictions, ctx) {
      if (model_type == "pushups") {
        if (runningMode === "IMAGE") {
          runningMode = "VIDEO";
          poseLandmarker.setOptions({
            runningMode: "VIDEO"
          });
        }
        var startTimeMs = performance.now();
        if (lastVideoTime !== video.currentTime) {
          lastVideoTime = video.currentTime;
          poseLandmarker.detectForVideo(video, startTimeMs, function (result) {
            var _iterator = _createForOfIteratorHelper(result.landmarks),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var landmark = _step.value;
                landmark.splice(0, 11);
                landmark.splice(6, 7);
                landmark.splice(11);
                var newLandmark = landmark;
                drawLandmarks(ctx, newLandmark);
                if (currentStatusPushup != "nothing" && (newLandmark[2].y < newLandmark[0].y || newLandmark[2].y < newLandmark[1].y || newLandmark[3].y < newLandmark[0].y || newLandmark[3].y < newLandmark[1].y)) {
                  drawConnectors(ctx, newLandmark, POSE_CONNECTIONS_PUSHUP, {
                    color: "#00FF00",
                    lineWidth: 5
                  });
                  if (currentVerifyPushup >= verifyTimesPushup && currentStatusPushup == "push-downs") {
                    countPushup = countPushup + 1;
                    document.getElementById("pushupCount").innerHTML = countPushup;
                    currentStatusPushup = "push-ups";
                  } else if (newStatusPushup == "push-ups") {
                    currentVerifyPushup = currentVerifyPushup + 1;
                  } else {
                    currentVerifyPushup = 0;
                    newStatusPushup = "push-ups";
                  }
                } else if (currentStatusPushup == "nothing" && (newLandmark[2].y > newLandmark[0].y + shoulderOffset || newLandmark[2].y > newLandmark[1].y + shoulderOffset || newLandmark[3].y > newLandmark[0].y + shoulderOffset || newLandmark[3].y > newLandmark[1].y + shoulderOffset)) {
                  drawConnectors(ctx, newLandmark, POSE_CONNECTIONS_PUSHUP, {
                    color: "#FFFFFF",
                    lineWidth: 5
                  });
                  currentStatusPushup = "push-downs";
                } else {
                  drawConnectors(ctx, newLandmark, POSE_CONNECTIONS_PUSHUP, {
                    color: "#FFFFFF",
                    lineWidth: 5
                  });
                  if (currentVerifyPushup >= verifyTimesPushup && currentStatusPushup == "push-ups") {
                    currentStatusPushup = "push-downs";
                  } else if (newStatusPushup == "push-downs") {
                    currentVerifyPushup = currentVerifyPushup + 1;
                  } else {
                    currentVerifyPushup = 0;
                    newStatusPushup = "push-downs";
                  }
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          });
        }
        for (var i = 0; i < predictions.length && i < 1; i++) {
          var confidence = predictions[i].confidence;
          if (confidence < user_confidence) {
            continue;
          }
          if (predictions[i].class in bounding_box_colors) {
            ctx.strokeStyle = bounding_box_colors[predictions[i].class];
          } else {
            var color = color_choices[Math.floor(Math.random() * color_choices.length)];
            ctx.strokeStyle = color;
            // remove color from choices
            color_choices.splice(color_choices.indexOf(color), 1);
            bounding_box_colors[predictions[i].class] = color;
          }
          var prediction = predictions[i];
          var x = prediction.bbox.x - prediction.bbox.width / 2;
          var y = prediction.bbox.y - prediction.bbox.height / 2;
          var width = prediction.bbox.width;
          var height = prediction.bbox.height;
          ctx.rect(x, y, width, height);
          ctx.fillStyle = "rgba(0, 0, 0, 0)";
          ctx.fill();
          ctx.fillStyle = ctx.strokeStyle;
          ctx.lineWidth = "4";
          ctx.strokeRect(x, y, width, height);

          // Text stays the same regardless of mirroring
          ctx.font = "25px Arial";
          ctx.fillText(prediction.class + " " + Math.round(confidence * 100) + "%", x, y - 10);
        }
      } else if (model_type == "situps") {
        if (runningMode === "IMAGE") {
          runningMode = "VIDEO";
          poseLandmarker.setOptions({
            runningMode: "VIDEO"
          });
        }
        var _startTimeMs = performance.now();
        if (lastVideoTime !== video.currentTime) {
          lastVideoTime = video.currentTime;
          poseLandmarker.detectForVideo(video, _startTimeMs, function (result) {
            var _iterator2 = _createForOfIteratorHelper(result.landmarks),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var landmark = _step2.value;
                landmark.splice(0, 11);
                landmark.splice(2, 10);
                landmark.splice(7);
                var newLandmark = landmark;
                drawLandmarks(ctx, newLandmark);
                if (currentStatusSitup != "nothing" && (newLandmark[0].y < newLandmark[4].y || newLandmark[0].y < newLandmark[5].y || newLandmark[1].y < newLandmark[4].y || newLandmark[1].y < newLandmark[5].y)) {
                  drawConnectors(ctx, newLandmark, POSE_CONNECTIONS_SITUP, {
                    color: "#00FF00",
                    lineWidth: 5
                  });
                  if (currentVerifySitup >= verifyTimesSitup && currentStatusSitup == "sit-down") {
                    countSitup = countSitup + 1;
                    document.getElementById("situpCount").innerHTML = countSitup;
                    currentStatusSitup = "sit-up";
                  } else if (newStatusSitup == "sit-up") {
                    currentVerifySitup = currentVerifySitup + 1;
                  } else {
                    currentVerifySitup = 0;
                    newStatusSitup = "sit-up";
                  }
                } else if (currentStatusSitup == "nothing" && (newLandmark[0].y > newLandmark[4].y || newLandmark[0].y > newLandmark[5].y || newLandmark[1].y > newLandmark[4].y || newLandmark[1].y > newLandmark[5].y)) {
                  drawConnectors(ctx, newLandmark, POSE_CONNECTIONS_SITUP, {
                    color: "#FFFFFF",
                    lineWidth: 5
                  });
                  currentStatusSitup = "sit-down";
                } else {
                  drawConnectors(ctx, newLandmark, POSE_CONNECTIONS_SITUP, {
                    color: "#FFFFFF",
                    lineWidth: 5
                  });
                  if (currentVerifySitup >= verifyTimesSitup && currentStatusSitup == "sit-up") {
                    currentStatusSitup = "sit-down";
                  } else if (newStatusSitup == "sit-down") {
                    currentVerifySitup = currentVerifySitup + 1;
                  } else {
                    currentVerifySitup = 0;
                    newStatusSitup = "sit-down";
                  }
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          });
        }
        var filteredPredictions = predictions.filter(function (prediction) {
          return prediction.class.toLowerCase().includes("sit");
        });
        for (var i = 0; i < filteredPredictions.length && i < 1; i++) {
          var confidence = filteredPredictions[i].confidence;
          if (confidence < user_confidence) {
            continue;
          }
          if (filteredPredictions[i].class in bounding_box_colors) {
            ctx.strokeStyle = bounding_box_colors[filteredPredictions[i].class];
          } else {
            var color = color_choices[Math.floor(Math.random() * color_choices.length)];
            ctx.strokeStyle = color;
            // remove color from choices
            color_choices.splice(color_choices.indexOf(color), 1);
            bounding_box_colors[filteredPredictions[i].class] = color;
          }
          var prediction = filteredPredictions[i];
          var x = prediction.bbox.x - prediction.bbox.width / 2;
          var y = prediction.bbox.y - prediction.bbox.height / 2;
          var width = prediction.bbox.width;
          var height = prediction.bbox.height;
          ctx.rect(x, y, width, height);
          ctx.fillStyle = "rgba(0, 0, 0, 0)";
          ctx.fill();
          ctx.fillStyle = ctx.strokeStyle;
          ctx.lineWidth = "4";
          ctx.strokeRect(x, y, width, height);

          // Text stays the same regardless of mirroring
          ctx.font = "25px Arial";
          ctx.fillText(prediction.class + " " + Math.round(confidence * 100) + "%", x, y - 10);
        }
      } else if (model_type == "squats") {
        if (runningMode === "IMAGE") {
          runningMode = "VIDEO";
          poseLandmarker.setOptions({
            runningMode: "VIDEO"
          });
        }
        var _startTimeMs2 = performance.now();
        if (lastVideoTime !== video.currentTime) {
          lastVideoTime = video.currentTime;
          poseLandmarker.detectForVideo(video, _startTimeMs2, function (result) {
            var _iterator3 = _createForOfIteratorHelper(result.landmarks),
              _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var landmark = _step3.value;
                landmark.splice(0, 11);
                landmark.splice(2, 10);
                var newLandmark = landmark;
                drawLandmarks(ctx, newLandmark);
                if (newLandmark[2].y > newLandmark[4].y || newLandmark[2].y > newLandmark[5].y || newLandmark[3].y > newLandmark[4].y || newLandmark[3].y > newLandmark[5].y) {
                  drawConnectors(ctx, newLandmark, POSE_CONNECTIONS_SQUAT, {
                    color: "#00FF00",
                    lineWidth: 5
                  });
                  if (currentVerifySquat >= verifyTimesSquat && currentStatusSquat == "squat-down") {
                    countSquat = countSquat + 1;
                    document.getElementById("squatCount").innerHTML = countSquat;
                    currentStatusSquat = "squat-up";
                  } else if (newStatusSquat == "squat-up") {
                    currentVerifySquat = currentVerifySquat + 1;
                  } else {
                    currentVerifySquat = 0;
                    newStatusSquat = "squat-up";
                  }
                } else {
                  drawConnectors(ctx, newLandmark, POSE_CONNECTIONS_SQUAT, {
                    color: "#FFFFFF",
                    lineWidth: 5
                  });
                  if (currentVerifySquat >= verifyTimesSquat && currentStatusSquat == "squat-up") {
                    currentStatusSquat = "squat-down";
                  } else if (newStatusSquat == "squat-down") {
                    currentVerifySquat = currentVerifySquat + 1;
                  } else {
                    currentVerifySquat = 0;
                    newStatusSquat = "squat-down";
                  }
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          });
        }
        var _filteredPredictions = predictions.filter(function (prediction) {
          return prediction.class.toLowerCase().includes("squat");
        });
        for (var i = 0; i < _filteredPredictions.length && i < 1; i++) {
          var confidence = _filteredPredictions[i].confidence;
          if (confidence < user_confidence) {
            continue;
          }
          if (_filteredPredictions[i].class in bounding_box_colors) {
            ctx.strokeStyle = bounding_box_colors[_filteredPredictions[i].class];
          } else {
            var color = color_choices[Math.floor(Math.random() * color_choices.length)];
            ctx.strokeStyle = color;
            // remove color from choices
            color_choices.splice(color_choices.indexOf(color), 1);
            bounding_box_colors[_filteredPredictions[i].class] = color;
          }
          var prediction = _filteredPredictions[i];
          var x = prediction.bbox.x - prediction.bbox.width / 2;
          var y = prediction.bbox.y - prediction.bbox.height / 2;
          var width = prediction.bbox.width;
          var height = prediction.bbox.height;
          ctx.rect(x, y, width, height);
          ctx.fillStyle = "rgba(0, 0, 0, 0)";
          ctx.fill();
          ctx.fillStyle = ctx.strokeStyle;
          ctx.lineWidth = "4";
          ctx.strokeRect(x, y, width, height);

          // Text stays the same regardless of mirroring
          ctx.font = "25px Arial";
          ctx.fillText(prediction.class + " " + Math.round(confidence * 100) + "%", x, y - 10);
        }
      }
    }
    function changeModel(modelName) {
      if (modelName == "pushup") {
        model_type = "pushups";
        document.getElementById("pushupCountContainer").style.display = "block";
        document.getElementById("situpCountContainer").style.display = "none";
        document.getElementById("squatCountContainer").style.display = "none";
        model_name = "push-up-ditection";
        model_version = 3;
      } else if (modelName == "situp") {
        model_type = "situps";
        document.getElementById("pushupCountContainer").style.display = "none";
        document.getElementById("situpCountContainer").style.display = "block";
        document.getElementById("squatCountContainer").style.display = "none";
        model_name = "p-s-s";
        model_version = 1;
      } else if (modelName == "squat") {
        model_type = "squats";
        document.getElementById("pushupCountContainer").style.display = "none";
        document.getElementById("situpCountContainer").style.display = "none";
        document.getElementById("squatCountContainer").style.display = "block";
        model_name = "p-s-s";
        model_version = 1;
      }
    }
    function onResultsPose(results) {
      document.body.classList.add('loaded');
      fpsControl.tick();
      canvasCtx5.save();
      canvasCtx5.clearRect(0, 0, out5.width, out5.height);
      canvasCtx5.drawImage(results.image, 0, 0, out5.width, out5.height);
      drawConnectors(canvasCtx5, results.poseLandmarks, POSE_CONNECTIONS, {
        color: function color(data) {
          var x0 = out5.width * data.from.x;
          var y0 = out5.height * data.from.y;
          var x1 = out5.width * data.to.x;
          var y1 = out5.height * data.to.y;
          var z0 = clamp(data.from.z + 0.5, 0, 1);
          var z1 = clamp(data.to.z + 0.5, 0, 1);
          var gradient = canvasCtx5.createLinearGradient(x0, y0, x1, y1);
          gradient.addColorStop(0, "rgba(0, ".concat(255 * z0, ", ").concat(255 * (1 - z0), ", 1)"));
          gradient.addColorStop(1.0, "rgba(0, ".concat(255 * z1, ", ").concat(255 * (1 - z1), ", 1)"));
          return gradient;
        }
      });
      drawLandmarks(canvasCtx5, Object.values(POSE_LANDMARKS_LEFT).map(function (index) {
        return results.poseLandmarks[index];
      }), {
        color: zColor,
        fillColor: '#FF0000'
      });
      drawLandmarks(canvasCtx5, Object.values(POSE_LANDMARKS_RIGHT).map(function (index) {
        return results.poseLandmarks[index];
      }), {
        color: zColor,
        fillColor: '#00FF00'
      });
      drawLandmarks(canvasCtx5, Object.values(POSE_LANDMARKS_NEUTRAL).map(function (index) {
        return results.poseLandmarks[index];
      }), {
        color: zColor,
        fillColor: '#AAAAAA'
      });
      canvasCtx5.restore();
    }

    /*const pose = new Pose({locateFile: (file) => {
      return `./mediapipe/pose/${file}`;
    }});
    pose.onResults(onResultsPose);*/
  }
});
},{"@mediapipe/tasks-vision":"node_modules/@mediapipe/tasks-vision/vision_bundle.mjs"}]},{},["main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map