var n,
  t,
  __assign =
    (this && this.__assign) ||
    function () {
      return (__assign =
        Object.assign ||
        function (t) {
          for (var e, i = 1, n = arguments.length; i < n; i++)
            for (var o in (e = arguments[i]))
              Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o])
          return t
        }).apply(this, arguments)
    },
  CountUp = (function () {
    function t(t, e, i) {
      var l = this
      ;(this.endVal = e),
        (this.options = i),
        (this.version = '2.7.1'),
        (this.defaults = {
          startVal: 0,
          decimalPlaces: 0,
          duration: 2,
          useEasing: !0,
          useGrouping: !0,
          useIndianSeparators: !1,
          smartEasingThreshold: 999,
          smartEasingAmount: 333,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: '',
          enableScrollSpy: !1,
          scrollSpyDelay: 200,
          scrollSpyOnce: !1,
        }),
        (this.finalEndVal = null),
        (this.useEasing = !0),
        (this.countDown = !1),
        (this.error = ''),
        (this.startVal = 0),
        (this.paused = !0),
        (this.once = !1),
        (this.count = function (t) {
          l.startTime || (l.startTime = t)
          var t = t - l.startTime,
            e =
              ((l.remaining = l.duration - t),
              l.useEasing
                ? l.countDown
                  ? (l.frameVal =
                      l.startVal -
                      l.easingFn(t, 0, l.startVal - l.endVal, l.duration))
                  : (l.frameVal = l.easingFn(
                      t,
                      l.startVal,
                      l.endVal - l.startVal,
                      l.duration,
                    ))
                : (l.frameVal =
                    l.startVal + (l.endVal - l.startVal) * (t / l.duration)),
              l.countDown ? l.frameVal < l.endVal : l.frameVal > l.endVal)
          ;(l.frameVal = e ? l.endVal : l.frameVal),
            (l.frameVal = Number(l.frameVal.toFixed(l.options.decimalPlaces))),
            l.printValue(l.frameVal),
            t < l.duration
              ? (l.rAF = requestAnimationFrame(l.count))
              : null !== l.finalEndVal
                ? l.update(l.finalEndVal)
                : l.options.onCompleteCallback && l.options.onCompleteCallback()
        }),
        (this.formatNumber = function (t) {
          var e = t < 0 ? '-' : '',
            t = Math.abs(t).toFixed(l.options.decimalPlaces),
            t = (t += '').split('.'),
            i = t[0],
            t = 1 < t.length ? l.options.decimal + t[1] : ''
          if (l.options.useGrouping) {
            for (var n = '', o = 3, s = 0, r = 0, a = i.length; r < a; ++r)
              l.options.useIndianSeparators && 4 === r && ((o = 2), (s = 1)),
                0 !== r && s % o == 0 && (n = l.options.separator + n),
                s++,
                (n = i[a - r - 1] + n)
            i = n
          }
          return (
            l.options.numerals &&
              l.options.numerals.length &&
              ((i = i.replace(/[0-9]/g, function (t) {
                return l.options.numerals[+t]
              })),
              (t = t.replace(/[0-9]/g, function (t) {
                return l.options.numerals[+t]
              }))),
            e + l.options.prefix + i + t + l.options.suffix
          )
        }),
        (this.easeOutExpo = function (t, e, i, n) {
          return (i * (1 - Math.pow(2, (-10 * t) / n)) * 1024) / 1023 + e
        }),
        (this.options = __assign(__assign({}, this.defaults), i)),
        (this.formattingFn = this.options.formattingFn || this.formatNumber),
        (this.easingFn = this.options.easingFn || this.easeOutExpo),
        (this.startVal = this.validateValue(this.options.startVal)),
        (this.frameVal = this.startVal),
        (this.endVal = this.validateValue(e)),
        (this.options.decimalPlaces = Math.max(this.options.decimalPlaces)),
        this.resetDuration(),
        (this.options.separator = String(this.options.separator)),
        (this.useEasing = this.options.useEasing),
        '' === this.options.separator && (this.options.useGrouping = !1),
        (this.el = 'string' == typeof t ? document.getElementById(t) : t),
        this.el
          ? this.printValue(this.startVal)
          : (this.error = '[CountUp] target is null or undefined'),
        'undefined' != typeof window &&
          this.options.enableScrollSpy &&
          (this.error
            ? console.error(this.error, t)
            : ((window.onScrollFns = window.onScrollFns || []),
              window.onScrollFns.push(function () {
                return l.handleScroll(l)
              }),
              (window.onscroll = function () {
                window.onScrollFns.forEach(function (t) {
                  return t()
                })
              }),
              this.handleScroll(this)))
    }
    return (
      (t.prototype.handleScroll = function (t) {
        var e, i, n
        t &&
          window &&
          !t.once &&
          ((e = window.innerHeight + window.scrollY),
          (i = (n = t.el.getBoundingClientRect()).top + window.pageYOffset),
          (n = n.top + n.height + window.pageYOffset) < e &&
          n > window.scrollY &&
          t.paused
            ? ((t.paused = !1),
              setTimeout(function () {
                return t.start()
              }, t.options.scrollSpyDelay),
              t.options.scrollSpyOnce && (t.once = !0))
            : (window.scrollY > n || e < i) && !t.paused && t.reset())
      }),
      (t.prototype.determineDirectionAndSmartEasing = function () {
        var t = this.finalEndVal || this.endVal,
          e = ((this.countDown = this.startVal > t), t - this.startVal)
        Math.abs(e) > this.options.smartEasingThreshold &&
        this.options.useEasing
          ? ((this.finalEndVal = t),
            (e = this.countDown ? 1 : -1),
            (this.endVal = t + e * this.options.smartEasingAmount),
            (this.duration = this.duration / 2))
          : ((this.endVal = t), (this.finalEndVal = null)),
          null !== this.finalEndVal
            ? (this.useEasing = !1)
            : (this.useEasing = this.options.useEasing)
      }),
      (t.prototype.start = function (t) {
        this.error ||
          (t && (this.options.onCompleteCallback = t),
          0 < this.duration
            ? (this.determineDirectionAndSmartEasing(),
              (this.paused = !1),
              (this.rAF = requestAnimationFrame(this.count)))
            : this.printValue(this.endVal))
      }),
      (t.prototype.pauseResume = function () {
        this.paused
          ? ((this.startTime = null),
            (this.duration = this.remaining),
            (this.startVal = this.frameVal),
            this.determineDirectionAndSmartEasing(),
            (this.rAF = requestAnimationFrame(this.count)))
          : cancelAnimationFrame(this.rAF),
          (this.paused = !this.paused)
      }),
      (t.prototype.reset = function () {
        cancelAnimationFrame(this.rAF),
          (this.paused = !0),
          this.resetDuration(),
          (this.startVal = this.validateValue(this.options.startVal)),
          (this.frameVal = this.startVal),
          this.printValue(this.startVal)
      }),
      (t.prototype.update = function (t) {
        cancelAnimationFrame(this.rAF),
          (this.startTime = null),
          (this.endVal = this.validateValue(t)),
          this.endVal !== this.frameVal &&
            ((this.startVal = this.frameVal),
            null == this.finalEndVal && this.resetDuration(),
            (this.finalEndVal = null),
            this.determineDirectionAndSmartEasing(),
            (this.rAF = requestAnimationFrame(this.count)))
      }),
      (t.prototype.printValue = function (t) {
        var e
        this.el &&
          ((t = this.formattingFn(t)),
          null != (e = this.options.plugin) && e.render
            ? this.options.plugin.render(this.el, t)
            : 'INPUT' === this.el.tagName
              ? (this.el.value = t)
              : 'text' === this.el.tagName || 'tspan' === this.el.tagName
                ? (this.el.textContent = t)
                : (this.el.innerHTML = t))
      }),
      (t.prototype.ensureNumber = function (t) {
        return 'number' == typeof t && !isNaN(t)
      }),
      (t.prototype.validateValue = function (t) {
        var e = Number(t)
        return this.ensureNumber(e)
          ? e
          : ((this.error = '[CountUp] invalid start or end value: '.concat(t)),
            null)
      }),
      (t.prototype.resetDuration = function () {
        ;(this.startTime = null),
          (this.duration = 1e3 * Number(this.options.duration)),
          (this.remaining = this.duration)
      }),
      t
    )
  })(),
  Delighters = new (function () {
    var l = (this.dels = []),
      c = {
        attribute: 'data-delighter',
        classNames: ['delighter', 'started', 'ended'],
        start: 0.75,
        end: 0.75,
        autoInit: !0,
      }
    function t() {
      document.addEventListener('scroll', d)
      for (
        var t = document.querySelectorAll('[' + c.attribute + ']'), e = 0;
        e < t.length;
        e++
      ) {
        var i = t[e],
          n = i.getAttribute(c.attribute, 2).split(';'),
          o = {}
        ;(o.start = c.start), (o.end = c.end)
        for (var s = 0; s < n.length; s++) {
          var r = n[s].split(':'),
            a = r[0],
            r = isNaN(+r[1]) ? r[1] : +r[1]
          a && (o[a] = void 0 === r || r)
        }
        ;(o.el = i),
          (o.id = l.length),
          l.push(o),
          i.classList.add(c.classNames[0]),
          o.debug && (i.style.outline = 'solid red 4px')
      }
      d()
    }
    function d() {
      for (var t = window.innerHeight, e = 0; e < l.length; e++) {
        var i = l[e],
          n = i.el.getBoundingClientRect(),
          o = n.top / t,
          n = n.bottom / t
        i.debug &&
          (0 <= o &&
            o <= 1 &&
            (i.startLine ||
              ((i.startLine = document.createElement('div')),
              document.body.appendChild(i.startLine),
              (i.startLine.style =
                'position:fixed;height:0;width:100%;border-bottom:dotted red 2px;top:' +
                100 * i.start +
                'vh'))),
          n < i.end || 1 < o) &&
          i.startLine &&
          (i.startLine.parentNode.removeChild(i.startLine), delete i.startLine),
          o < i.start && !i.started
            ? ((i.started = !0), i.el.classList.add(c.classNames[1]))
            : o > i.start &&
              i.started &&
              ((i.started = !1), i.el.classList.remove(c.classNames[1])),
          n < i.end && !i.ended
            ? ((i.ended = !0), i.el.classList.add(c.classNames[2]))
            : n > i.end &&
              i.ended &&
              ((i.ended = !1), i.el.classList.remove(c.classNames[2]))
      }
    }
    document.addEventListener('DOMContentLoaded', function () {
      c.autoInit && t()
    }),
      (this.init = t),
      (this.config = function (t) {
        for (var e in t) c[e] = t[e]
      })
  })()
function r(t, e) {
  for (var i = 0; i < e.length; i++) {
    var n = e[i]
    ;(n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      'value' in n && (n.writable = !0),
      Object.defineProperty(t, n.key, n)
  }
}
function Jt(t, e, i) {
  e && r(t.prototype, e),
    i && r(t, i),
    Object.defineProperty(t, 'prototype', { writable: !1 })
}
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
      ? define(['exports'], e)
      : e(((t = t || self).window = t.window || {}))
})(this, function (t) {
  'use strict'
  function e() {
    return 'undefined' != typeof window
  }
  function i() {
    return n || (e() && (n = window.gsap) && n.registerPlugin && n)
  }
  function c(t) {
    return Math.round(1e4 * t) / 1e4
  }
  function d(t) {
    return parseFloat(t) || 0
  }
  function u(t, e) {
    var i = d(t)
    return ~t.indexOf('%') ? (i / 100) * e : i
  }
  function f(t, e) {
    return d(t.getAttribute(e))
  }
  function h(t, e, i, n, o, s) {
    return x(Math.pow((d(i) - d(t)) * o, 2) + Math.pow((d(n) - d(e)) * s, 2))
  }
  function m(t) {
    console.warn(t)
  }
  function g(t) {
    return 'non-scaling-stroke' === t.getAttribute('vector-effect')
  }
  function p(t) {
    if (!(t = w(t)[0])) return 0
    var e,
      i,
      n,
      o,
      s = t.tagName.toLowerCase(),
      r = t.style,
      a = 1,
      l = 1
    g(t) &&
      ((l = t.getScreenCTM()),
      (a = x(l.a * l.a + l.b * l.b)),
      (l = x(l.d * l.d + l.c * l.c)))
    try {
      o = t.getBBox()
    } catch (t) {
      m(
        "Some browsers won't measure invisible elements (like display:none or masks inside defs).",
      )
    }
    var c = o || { x: 0, y: 0, width: 0, height: 0 },
      d = c.x,
      u = c.y,
      p = c.width,
      c = c.height
    if (
      ((o && (p || c)) ||
        !S[s] ||
        ((p = f(t, S[s][0])),
        (c = f(t, S[s][1])),
        'rect' !== s && 'line' !== s && ((p *= 2), (c *= 2)),
        'line' === s &&
          ((d = f(t, 'x1')),
          (u = f(t, 'y1')),
          (p = Math.abs(p - d)),
          (c = Math.abs(c - u)))),
      'path' === s)
    )
      (o = r.strokeDasharray),
        (r.strokeDasharray = 'none'),
        (e = t.getTotalLength() || 0),
        a !== l &&
          m(
            "Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled.",
          ),
        (e *= (a + l) / 2),
        (r.strokeDasharray = o)
    else if ('rect' === s) e = 2 * p * a + 2 * c * l
    else if ('line' === s) e = h(d, u, d + p, u + c, a, l)
    else if ('polyline' === s || 'polygon' === s)
      for (
        i = t.getAttribute('points').match(k) || [],
          'polygon' === s && i.push(i[0], i[1]),
          e = 0,
          n = 2;
        n < i.length;
        n += 2
      )
        e += h(i[n - 2], i[n - 1], i[n], i[n + 1], a, l) || 0
    else
      ('circle' !== s && 'ellipse' !== s) ||
        ((r = (p / 2) * a),
        (o = (c / 2) * l),
        (e = Math.PI * (3 * (r + o) - x((3 * r + o) * (r + 3 * o)))))
    return e || 0
  }
  function v(t, e) {
    if (!(t = w(t)[0])) return [0, 0]
    e = e || p(t) + 1
    var t = _.getComputedStyle(t),
      i = t.strokeDasharray || '',
      t = d(t.strokeDashoffset),
      n = i.indexOf(',')
    return [
      -t || 0,
      (i =
        e < (i = (n = n < 0 ? i.indexOf(' ') : n) < 0 ? e : d(i.substr(0, n)))
          ? e
          : i) - t || 0,
    ]
  }
  function y() {
    e() &&
      ((_ = window),
      (T = n = i()),
      (w = n.utils.toArray),
      (b = -1 !== ((_.navigator || {}).userAgent || '').indexOf('Edge')))
  }
  var n,
    w,
    _,
    b,
    T,
    k = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
    S = {
      rect: ['width', 'height'],
      circle: ['r', 'r'],
      ellipse: ['rx', 'ry'],
      line: ['x2', 'y2'],
    },
    x = Math.sqrt,
    o = {
      version: '3.6.1',
      name: 'drawSVG',
      register: function (t) {
        ;(n = t), y()
      },
      init: function (t, e) {
        if (!t.getBBox) return !1
        T || y()
        var i,
          n,
          o,
          s,
          r,
          a,
          l = p(t)
        return (
          (this._style = t.style),
          (this._target = t),
          e + '' == 'true'
            ? (e = '0 100%')
            : e
              ? -1 === (e + '').indexOf(' ') && (e = '0 ' + e)
              : (e = '0 0'),
          (n = e),
          (s = (i = v(t, (o = l)))[0]),
          (r = n.indexOf(' ')),
          (s =
            r < 0
              ? ((a = void 0 !== s ? s + '' : n), n)
              : ((a = n.substr(0, r)), n.substr(r + 1))),
          (a = u(a, o)),
          (n = (s = u(s, o)) < a ? [s, a] : [a, s]),
          (this._length = c(l)),
          (this._dash = c(i[1] - i[0])),
          (this._offset = c(-i[0])),
          (this._dashPT = this.add(this, '_dash', this._dash, c(n[1] - n[0]))),
          (this._offsetPT = this.add(this, '_offset', this._offset, c(-n[0]))),
          b &&
            (r = _.getComputedStyle(t)).strokeLinecap !== r.strokeLinejoin &&
            ((n = d(r.strokeMiterlimit)),
            this.add(t.style, 'strokeMiterlimit', n, n + 0.01)),
          (this._live = g(t) || ~(e + '').indexOf('live')),
          (this._nowrap = ~(e + '').indexOf('nowrap')),
          this._props.push('drawSVG'),
          1
        )
      },
      render: function (t, e) {
        var i,
          n,
          o,
          s = e._pt,
          r = e._style
        if (s) {
          for (
            e._live &&
            (i = p(e._target)) !== e._length &&
            ((n = i / e._length),
            (e._length = i),
            e._offsetPT && ((e._offsetPT.s *= n), (e._offsetPT.c *= n)),
            e._dashPT
              ? ((e._dashPT.s *= n), (e._dashPT.c *= n))
              : (e._dash *= n));
            s;

          )
            s.r(t, s.d), (s = s._next)
          ;(n = e._dash || (t && 1 !== t ? 1e-4 : 0)),
            (i = e._length - n + 0.1),
            (o = e._offset),
            n &&
              o &&
              n + Math.abs(o % e._length) > e._length - 0.2 &&
              (o += o < 0 ? 0.1 : -0.1) &&
              (i += 0.1),
            (r.strokeDashoffset = n ? o : o + 0.001),
            (r.strokeDasharray =
              i < 0.2
                ? 'none'
                : n
                  ? n + 'px,' + (e._nowrap ? 999999 : i) + 'px'
                  : '0px, 999999px')
        }
      },
      getLength: p,
      getPosition: v,
    }
  i() && n.registerPlugin(o),
    (t.DrawSVGPlugin = o),
    (t.default = o),
    'undefined' == typeof window || window !== t
      ? Object.defineProperty(t, '__esModule', { value: !0 })
      : delete t.default
}),
  (function (t, e) {
    'object' == typeof exports && 'undefined' != typeof module
      ? e(exports)
      : 'function' == typeof define && define.amd
        ? define(['exports'], e)
        : e(((t = t || self).window = t.window || {}))
  })(this, function (t) {
    'use strict'
    function i(t, e) {
      ;(t.prototype = Object.create(e.prototype)),
        ((t.prototype.constructor = t).__proto__ = e)
    }
    function I(t) {
      if (void 0 === t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called",
        )
      return t
    }
    function R(t) {
      return 'string' == typeof t
    }
    function u(t) {
      return 'function' == typeof t
    }
    function Z(t) {
      return 'number' == typeof t
    }
    function s(t) {
      return void 0 === t
    }
    function E(t) {
      return 'object' == typeof t
    }
    function L(t) {
      return !1 !== t
    }
    function a() {
      return 'undefined' != typeof window
    }
    function K(t) {
      return u(t) || R(t)
    }
    function n(t) {
      return (Gt = Nt(t, r)) && m
    }
    function J(t, e) {
      return console.warn(
        'Invalid property',
        t,
        'set to',
        e,
        'Missing plugin? gsap.registerPlugin()',
      )
    }
    function tt(t, e) {
      return !e && console.warn(t)
    }
    function g(t, e) {
      return (t && (r[t] = e) && Gt && (Gt[t] = e)) || r
    }
    function v() {
      return 0
    }
    function et(t) {
      var e,
        i,
        n = t[0]
      if ((E(n) || u(n) || (t = [t]), !(e = (n._gsap || {}).harness))) {
        for (i = Fe.length; i-- && !Fe[i].targetTest(n); );
        e = Fe[i]
      }
      for (i = t.length; i--; )
        (t[i] && (t[i]._gsap || (t[i]._gsap = new Je(t[i], e)))) ||
          t.splice(i, 1)
      return t
    }
    function it(t) {
      return t._gsap || et(M(t))[0]._gsap
    }
    function y(t, e, i) {
      return (i = t[e]) && u(i)
        ? t[e]()
        : (s(i) && t.getAttribute && t.getAttribute(e)) || i
    }
    function f(t, e) {
      return (t = t.split(',')).forEach(e) || t
    }
    function D(t) {
      return Math.round(1e5 * t) / 1e5 || 0
    }
    function O(t) {
      return Math.round(1e7 * t) / 1e7 || 0
    }
    function nt(t, e) {
      var i = e.charAt(0),
        e = parseFloat(e.substr(2))
      return (
        (t = parseFloat(t)),
        '+' === i ? t + e : '-' === i ? t - e : '*' === i ? t * e : t / e
      )
    }
    function ot() {
      var t,
        e,
        i = Ie.length,
        n = Ie.slice(0)
      for (Le = {}, t = Ie.length = 0; t < i; t++)
        (e = n[t]) &&
          e._lazy &&
          (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0)
    }
    function w(t, e, i, n) {
      Ie.length && !F && ot(),
        t.render(e, i, n || (F && e < 0 && (t._initted || t._startAt))),
        Ie.length && !F && ot()
    }
    function _(t) {
      var e = parseFloat(t)
      return (e || 0 === e) && (t + '').match(Oe).length < 2
        ? e
        : R(t)
          ? t.trim()
          : t
    }
    function T(t) {
      return t
    }
    function j(t, e) {
      for (var i in e) i in t || (t[i] = e[i])
      return t
    }
    function k(t, e) {
      for (var i in e)
        '__proto__' !== i &&
          'constructor' !== i &&
          'prototype' !== i &&
          (t[i] = E(e[i]) ? k(t[i] || (t[i] = {}), e[i]) : e[i])
      return t
    }
    function st(t, e) {
      var i,
        n = {}
      for (i in t) i in e || (n[i] = t[i])
      return n
    }
    function rt(t) {
      var n,
        e = t.parent || H,
        i = t.keyframes
          ? ((n = P(t.keyframes)),
            function (t, e) {
              for (var i in e)
                i in t ||
                  ('duration' === i && n) ||
                  'ease' === i ||
                  (t[i] = e[i])
            })
          : j
      if (L(t.inherit))
        for (; e; ) i(t, e.vars.defaults), (e = e.parent || e._dp)
      return t
    }
    function S(t, e, i, n, o) {
      void 0 === i && (i = '_first')
      var s,
        r = t[(n = void 0 === n ? '_last' : n)]
      if (o) for (s = e[o]; r && r[o] > s; ) r = r._prev
      r ? ((e._next = r._next), (r._next = e)) : ((e._next = t[i]), (t[i] = e)),
        e._next ? (e._next._prev = e) : (t[n] = e),
        (e._prev = r),
        (e.parent = e._dp = t)
    }
    function x(t, e, i, n) {
      void 0 === i && (i = '_first'), void 0 === n && (n = '_last')
      var o = e._prev,
        s = e._next
      o ? (o._next = s) : t[i] === e && (t[i] = s),
        s ? (s._prev = o) : t[n] === e && (t[n] = o),
        (e._next = e._prev = e.parent = null)
    }
    function at(t, e) {
      t.parent &&
        (!e || t.parent.autoRemoveChildren) &&
        t.parent.remove &&
        t.parent.remove(t),
        (t._act = 0)
    }
    function C(t, e) {
      if (t && (!e || e._end > t._dur || e._start < 0))
        for (var i = t; i; ) (i._dirty = 1), (i = i.parent)
      return t
    }
    function lt(t, e, i, n) {
      t._startAt &&
        (F
          ? t._startAt.revert(Me)
          : (t.vars.immediateRender && !t.vars.autoRevert) ||
            t._startAt.render(e, !0, n))
    }
    function ct(t) {
      return t._repeat ? Vt(t._tTime, (t = t.duration() + t._rDelay)) * t : 0
    }
    function dt(t, e) {
      return (
        (t - e._start) * e._ts +
        (0 <= e._ts ? 0 : e._dirty ? e.totalDuration() : e._tDur)
      )
    }
    function ut(t) {
      t._end = O(t._start + (t._tDur / Math.abs(t._ts || t._rts || W) || 0))
    }
    function pt(t, e) {
      var i = t._dp
      i &&
        i.smoothChildTiming &&
        t._ts &&
        ((t._start = O(
          i._time -
            (0 < t._ts
              ? e / t._ts
              : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts),
        )),
        ut(t),
        i._dirty || C(i, t))
    }
    function ft(t, e) {
      var i
      if (
        ((e._time ||
          (!e._dur && e._initted) ||
          (e._start < t._time && (e._dur || !e.add))) &&
          ((i = dt(t.rawTime(), e)),
          !e._dur || Qt(0, e.totalDuration(), i) - e._tTime > W) &&
          e.render(i, !0),
        C(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
      ) {
        if (t._dur < t.duration())
          for (i = t; i._dp; )
            0 <= i.rawTime() && i.totalTime(i._tTime), (i = i._dp)
        t._zTime = -W
      }
    }
    function A(t, e, i, n) {
      return (
        e.parent && at(e),
        (e._start = O(
          (Z(i) ? i : i || t !== H ? c(t, i, e) : t._time) + e._delay,
        )),
        (e._end = O(
          e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0),
        )),
        S(t, e, '_first', '_last', t._sort ? '_start' : 0),
        Wt(e) || (t._recent = e),
        n || ft(t, e),
        t._ts < 0 && pt(t, t._tTime),
        t
      )
    }
    function ht(t, e) {
      ;(r.ScrollTrigger || J('scrollTrigger', e)) &&
        r.ScrollTrigger.create(e, t)
    }
    function mt(t, e, i, n, o) {
      return (
        si(t, e, o),
        !t._initted ||
          (!i &&
            t._pt &&
            !F &&
            ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
            Kt !== h.frame &&
            (Ie.push(t), (t._lazy = [o, n])))
      )
    }
    function gt(t, e, i, n) {
      var o = t._repeat,
        e = O(e) || 0,
        s = t._tTime / t._tDur
      return (
        s && !n && (t._time *= e / t._dur),
        (t._dur = e),
        (t._tDur = o ? (o < 0 ? 1e10 : O(e * (o + 1) + t._rDelay * o)) : e),
        0 < s && !n && pt(t, (t._tTime = t._tDur * s)),
        t.parent && ut(t),
        i || C(t.parent, t),
        t
      )
    }
    function vt(t) {
      return t instanceof z ? C(t) : gt(t, t._dur)
    }
    function yt(t, e, i) {
      var n,
        o,
        s = Z(e[1]),
        r = (s ? 2 : 1) + (t < 2 ? 0 : 1),
        a = e[r]
      if ((s && (a.duration = e[1]), (a.parent = i), t)) {
        for (n = a, o = i; o && !('immediateRender' in n); )
          (n = o.vars.defaults || {}), (o = L(o.vars.inherit) && o.parent)
        ;(a.immediateRender = L(n.immediateRender)),
          t < 2 ? (a.runBackwards = 1) : (a.startAt = e[r - 1])
      }
      return new q(e[0], a, e[1 + r])
    }
    function wt(t, e) {
      return t || 0 === t ? e(t) : e
    }
    function B(t, e) {
      return R(t) && (e = Ae.exec(t)) ? e[1] : ''
    }
    function _t(t, e) {
      return (
        t &&
        E(t) &&
        'length' in t &&
        ((!e && !t.length) || (t.length - 1 in t && E(t[0]))) &&
        !t.nodeType &&
        t !== d
      )
    }
    function bt(i) {
      return (
        (i = M(i)[0] || tt('Invalid scope') || {}),
        function (t) {
          var e = i.current || i.nativeElement || i
          return M(
            t,
            e.querySelectorAll
              ? e
              : e === i
                ? tt('Invalid scope') || Xt.createElement('div')
                : i,
          )
        }
      )
    }
    function Tt(t) {
      return t.sort(function () {
        return 0.5 - Math.random()
      })
    }
    function kt(t) {
      var f, h, m, g, v, y, w, _, b
      return u(t)
        ? t
        : ((f = E(t) ? t : { each: t }),
          (h = Ge(f.ease)),
          (m = f.from || 0),
          (g = parseFloat(f.base) || 0),
          (v = {}),
          (t = 0 < m && m < 1),
          (y = isNaN(m) || t),
          (w = f.axis),
          R((b = _ = m))
            ? (_ = b = { center: 0.5, edges: 0.5, end: 1 }[m] || 0)
            : !t && y && ((_ = m[0]), (b = m[1])),
          function (t, e, i) {
            var n,
              o,
              s,
              r,
              a,
              l,
              c,
              d,
              u = (i || f).length,
              p = v[u]
            if (!p) {
              if (!(d = 'auto' === f.grid ? 0 : (f.grid || [1, V])[1])) {
                for (
                  l = -V;
                  l < (l = i[d++].getBoundingClientRect().left) && d < u;

                );
                d--
              }
              for (
                p = v[u] = [],
                  n = y ? Math.min(d, u) * _ - 0.5 : m % d,
                  o = d === V ? 0 : y ? (u * b) / d - 0.5 : (m / d) | 0,
                  c = V,
                  a = l = 0;
                a < u;
                a++
              )
                (r = (a % d) - n),
                  (s = o - ((a / d) | 0)),
                  (p[a] = r =
                    w ? Math.abs('y' === w ? s : r) : we(r * r + s * s)),
                  l < r && (l = r),
                  r < c && (c = r)
              'random' === m && Tt(p),
                (p.max = l - c),
                (p.min = c),
                (p.v = u =
                  (parseFloat(f.amount) ||
                    parseFloat(f.each) *
                      (u < d
                        ? u - 1
                        : w
                          ? 'y' === w
                            ? u / d
                            : d
                          : Math.max(d, u / d)) ||
                    0) * ('edges' === m ? -1 : 1)),
                (p.b = u < 0 ? g - u : g),
                (p.u = B(f.amount || f.each) || 0),
                (h = h && u < 0 ? Xe(h) : h)
            }
            return (
              (u = (p[t] - p.min) / p.max || 0),
              O(p.b + (h ? h(u) : u) * p.v) + p.u
            )
          })
    }
    function St(i) {
      var n = Math.pow(10, ((i + '').split('.')[1] || '').length)
      return function (t) {
        var e = O(Math.round(parseFloat(t) / i) * i * n)
        return (e - (e % 1)) / n + (Z(t) ? 0 : B(t))
      }
    }
    function xt(l, t) {
      var c,
        d,
        e = P(l)
      return (
        !e &&
          E(l) &&
          ((c = e = l.radius || V),
          l.values
            ? ((l = M(l.values)), (d = !Z(l[0])) && (c *= c))
            : (l = St(l.increment))),
        wt(
          t,
          e
            ? u(l)
              ? function (t) {
                  return (d = l(t)), Math.abs(d - t) <= c ? d : t
                }
              : function (t) {
                  for (
                    var e,
                      i,
                      n = parseFloat(d ? t.x : t),
                      o = parseFloat(d ? t.y : 0),
                      s = V,
                      r = 0,
                      a = l.length;
                    a--;

                  )
                    (e = d
                      ? (e = l[a].x - n) * e + (i = l[a].y - o) * i
                      : Math.abs(l[a] - n)) < s && ((s = e), (r = a))
                  return (
                    (r = !c || s <= c ? l[r] : t),
                    d || r === t || Z(t) ? r : r + B(t)
                  )
                }
            : St(l),
        )
      )
    }
    function Ct(t, e, i, n) {
      return wt(P(t) ? !e : !0 === i ? !!(i = 0) : !n, function () {
        return P(t)
          ? t[~~(Math.random() * t.length)]
          : (i = i || 1e-5) &&
              (n = i < 1 ? Math.pow(10, (i + '').length - 2) : 1) &&
              Math.floor(
                Math.round(
                  (t - i / 2 + Math.random() * (e - t + 0.99 * i)) / i,
                ) *
                  i *
                  n,
              ) / n
      })
    }
    function Et(e, i, t) {
      return wt(t, function (t) {
        return e[~~i(t)]
      })
    }
    function Ot(t) {
      for (var e, i, n, o, s = 0, r = ''; ~(e = t.indexOf('random(', s)); )
        (n = t.indexOf(')', e)),
          (o = '[' === t.charAt(e + 7)),
          (i = t.substr(e + 7, n - e - 7).match(o ? Oe : ke)),
          (r +=
            t.substr(s, e - s) +
            Ct(o ? i : +i[0], o ? 0 : +i[1], +i[2] || 1e-5)),
          (s = n + 1)
      return r + t.substr(s, t.length - s)
    }
    function At(t, e, i) {
      var n,
        o,
        s,
        r = t.labels,
        a = V
      for (n in r)
        (o = r[n] - e) < 0 == !!i &&
          o &&
          a > (o = Math.abs(o)) &&
          ((s = n), (a = o))
      return s
    }
    function Pt(t) {
      return (
        at(t),
        t.scrollTrigger && t.scrollTrigger.kill(!!F),
        t.progress() < 1 && b(t, 'onInterrupt'),
        t
      )
    }
    function Mt(t) {
      if (a() && t) {
        var e = (t = (!t.name && t.default) || t).name,
          i = u(t),
          i =
            e && !i && t.init
              ? function () {
                  this._props = []
                }
              : t,
          n = {
            init: v,
            render: Ti,
            add: di,
            kill: Si,
            modifier: ki,
            rawVars: 0,
          },
          o = {
            targetTest: 0,
            get: 0,
            getSetter: yi,
            aliases: {},
            register: 0,
          }
        if ((qe(), t !== i)) {
          if (Q[e]) return
          j(i, j(st(t, n), o)),
            Nt(i.prototype, Nt(n, st(t, o))),
            (Q[(i.prop = e)] = i),
            t.targetTest && (Fe.push(i), (ze[e] = 1)),
            (e =
              ('css' === e ? 'CSS' : e.charAt(0).toUpperCase() + e.substr(1)) +
              'Plugin')
        }
        g(e, i), t.register && t.register(m, i, Y)
      } else t && Ne.push(t)
    }
    function $t(t, e, i) {
      return (
        ((6 * (t += t < 0 ? 1 : 1 < t ? -1 : 0) < 1
          ? e + (i - e) * t * 6
          : t < 0.5
            ? i
            : 3 * t < 2
              ? e + (i - e) * (2 / 3 - t) * 6
              : e) *
          p +
          0.5) |
        0
      )
    }
    function zt(t, e, i) {
      var n,
        o,
        s,
        r,
        a,
        l,
        c,
        d = t ? (Z(t) ? [t >> 16, (t >> 8) & p, t & p] : 0) : Ve.black
      if (!d) {
        if ((',' === t.substr(-1) && (t = t.substr(0, t.length - 1)), Ve[t]))
          d = Ve[t]
        else if ('#' === t.charAt(0)) {
          if (
            9 ===
            (t =
              t.length < 6
                ? '#' +
                  (n = t.charAt(1)) +
                  n +
                  (o = t.charAt(2)) +
                  o +
                  (s = t.charAt(3)) +
                  s +
                  (5 === t.length ? t.charAt(4) + t.charAt(4) : '')
                : t).length
          )
            return [
              (d = parseInt(t.substr(1, 6), 16)) >> 16,
              (d >> 8) & p,
              d & p,
              parseInt(t.substr(7), 16) / 255,
            ]
          d = [(t = parseInt(t.substr(1), 16)) >> 16, (t >> 8) & p, t & p]
        } else if ('hsl' === t.substr(0, 3))
          if (((d = c = t.match(ke)), e)) {
            if (~t.indexOf('='))
              return (d = t.match(Se)), i && d.length < 4 && (d[3] = 1), d
          } else
            (r = (+d[0] % 360) / 360),
              (a = d[1] / 100),
              (n =
                2 * (l = d[2] / 100) -
                (o = l <= 0.5 ? l * (a + 1) : l + a - l * a)),
              3 < d.length && (d[3] *= 1),
              (d[0] = $t(r + 1 / 3, n, o)),
              (d[1] = $t(r, n, o)),
              (d[2] = $t(r - 1 / 3, n, o))
        else d = t.match(ke) || Ve.transparent
        d = d.map(Number)
      }
      return (
        e &&
          !c &&
          ((n = d[0] / p),
          (o = d[1] / p),
          (s = d[2] / p),
          (l = ((t = Math.max(n, o, s)) + (e = Math.min(n, o, s))) / 2),
          t === e
            ? (r = a = 0)
            : ((c = t - e),
              (a = 0.5 < l ? c / (2 - t - e) : c / (t + e)),
              (r =
                t === n
                  ? (o - s) / c + (o < s ? 6 : 0)
                  : t === o
                    ? (s - n) / c + 2
                    : (n - o) / c + 4),
              (r *= 60)),
          (d[0] = ~~(r + 0.5)),
          (d[1] = ~~(100 * a + 0.5)),
          (d[2] = ~~(100 * l + 0.5))),
        i && d.length < 4 && (d[3] = 1),
        d
      )
    }
    function It(t) {
      var e = [],
        i = [],
        n = -1
      return (
        t.split(We).forEach(function (t) {
          t = t.match(xe) || []
          e.push.apply(e, t), i.push((n += t.length + 1))
        }),
        (e.c = i),
        e
      )
    }
    function Lt(t, e, i) {
      var n,
        o,
        s,
        r,
        a = '',
        l = (t + a).match(We),
        c = e ? 'hsla(' : 'rgba(',
        d = 0
      if (!l) return t
      if (
        ((l = l.map(function (t) {
          return (
            (t = zt(t, e, 1)) &&
            c +
              (e
                ? t[0] + ',' + t[1] + '%,' + t[2] + '%,' + t[3]
                : t.join(',')) +
              ')'
          )
        })),
        i && ((s = It(t)), (n = i.c).join(a) !== s.c.join(a)))
      )
        for (r = (o = t.replace(We, '1').split(xe)).length - 1; d < r; d++)
          a +=
            o[d] +
            (~n.indexOf(d)
              ? l.shift() || c + '0,0,0,0)'
              : (s.length ? s : l.length ? l : i).shift())
      if (!o)
        for (r = (o = t.split(We)).length - 1; d < r; d++) a += o[d] + l[d]
      return a + o[r]
    }
    function Dt(t) {
      var e = t.join(' ')
      if (((We.lastIndex = 0), We.test(e)))
        return (
          (e = Qe.test(e)),
          (t[1] = Lt(t[1], e)),
          (t[0] = Lt(t[0], e, It(t[1]))),
          !0
        )
    }
    function jt(t, e) {
      for (var i, n = t._first; n; )
        n instanceof z
          ? jt(n, e)
          : !n.vars.yoyoEase ||
            (n._yoyo && n._repeat) ||
            n._yoyo === e ||
            (n.timeline
              ? jt(n.timeline, e)
              : ((i = n._ease),
                (n._ease = n._yEase),
                (n._yEase = i),
                (n._yoyo = e))),
          (n = n._next)
    }
    function Ft(t, e, i, n) {
      var o,
        s = {
          easeIn: e,
          easeOut: (i =
            void 0 === i
              ? function (t) {
                  return 1 - e(1 - t)
                }
              : i),
          easeInOut: (n =
            void 0 === n
              ? function (t) {
                  return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2
                }
              : n),
        }
      f(t, function (t) {
        for (var e in (($[t] = r[t] = s), ($[(o = t.toLowerCase())] = i), s))
          $[
            o + ('easeIn' === e ? '.in' : 'easeOut' === e ? '.out' : '.inOut')
          ] = $[t + '.' + e] = s[e]
      })
    }
    function Ht(e) {
      return function (t) {
        return t < 0.5 ? (1 - e(1 - 2 * t)) / 2 : 0.5 + e(2 * (t - 0.5)) / 2
      }
    }
    function Rt(i, t, e) {
      function n(t) {
        return 1 === t ? 1 : o * Math.pow(2, -10 * t) * be((t - s) * r) + 1
      }
      var o = 1 <= t ? t : 1,
        s =
          ((r = (e || (i ? 0.3 : 0.45)) / (t < 1 ? t : 1)) / ge) *
          (Math.asin(1 / o) || 0),
        e =
          'out' === i
            ? n
            : 'in' === i
              ? function (t) {
                  return 1 - n(1 - t)
                }
              : Ht(n),
        r = ge / r
      return (
        (e.config = function (t, e) {
          return Rt(i, t, e)
        }),
        e
      )
    }
    function Bt(e, i) {
      function n(t) {
        return t ? --t * t * ((i + 1) * t + i) + 1 : 0
      }
      void 0 === i && (i = 1.70158)
      var t =
        'out' === e
          ? n
          : 'in' === e
            ? function (t) {
                return 1 - n(1 - t)
              }
            : Ht(n)
      return (
        (t.config = function (t) {
          return Bt(e, t)
        }),
        t
      )
    }
    function Nt(t, e) {
      for (var i in e) t[i] = e[i]
      return t
    }
    function Vt(t, e) {
      return (e = Math.floor((t /= e))), t && e === t ? e - 1 : e
    }
    function Wt(t) {
      return 'isFromStart' === (t = t.data) || 'isStart' === t
    }
    function c(t, e, i) {
      var n,
        o,
        s,
        r = t.labels,
        a = t._recent || Re,
        l = t.duration() >= V ? a.endTime(!1) : t._dur
      return R(e) && (isNaN(e) || e in r)
        ? ((o = e.charAt(0)),
          (s = '%' === e.substr(-1)),
          (n = e.indexOf('=')),
          '<' === o || '>' === o
            ? (0 <= n && (e = e.replace(/=/, '')),
              ('<' === o ? a._start : a.endTime(0 <= a._repeat)) +
                (parseFloat(e.substr(1)) || 0) *
                  (s ? (n < 0 ? a : i).totalDuration() / 100 : 1))
            : n < 0
              ? (e in r || (r[e] = l), r[e])
              : ((o = parseFloat(e.charAt(n - 1) + e.substr(n + 1))),
                s && i && (o = (o / 100) * (P(i) ? i[0] : i).totalDuration()),
                1 < n ? c(t, e.substr(0, n - 1), i) + o : l + o))
        : null == e
          ? l
          : +e
    }
    function Qt(t, e, i) {
      return i < t ? t : e < i ? e : i
    }
    function qt(e, t, i, n, o) {
      var s = t - e,
        r = n - i
      return wt(o, function (t) {
        return i + (((t - e) / s) * r || 0)
      })
    }
    function b(t, e, i) {
      var n = t.vars,
        o = n[e],
        s = l,
        r = t._ctx
      if (o)
        (e = n[e + 'Params']),
          (n = n.callbackScope || t),
          i && Ie.length && ot(),
          r && (l = r),
          (t = e ? o.apply(n, e) : o.call(n)),
          (l = s)
    }
    var Yt,
      F,
      l,
      H,
      d,
      Ut,
      Xt,
      Gt,
      Zt,
      Kt,
      Jt,
      te,
      ee,
      ie,
      ne,
      oe,
      se,
      re,
      ae,
      le,
      ce,
      de,
      ue,
      pe,
      fe,
      he,
      N = {
        autoSleep: 120,
        force3D: 'auto',
        nullTargetWarn: 1,
        units: { lineHeight: '' },
      },
      me = { duration: 0.5, overwrite: !1, delay: 0 },
      V = 1e8,
      W = 1 / V,
      ge = 2 * Math.PI,
      ve = ge / 4,
      ye = 0,
      we = Math.sqrt,
      _e = Math.cos,
      be = Math.sin,
      Te =
        ('function' == typeof ArrayBuffer && ArrayBuffer.isView) ||
        function () {},
      P = Array.isArray,
      ke = /(?:-?\.?\d|\.)+/gi,
      Se = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
      xe = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
      Ce = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
      Ee = /[+-]=-?[.\d]+/,
      Oe = /[^,'"\[\]\s]+/gi,
      Ae = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
      r = {},
      Pe = { suppressEvents: !0, isStart: !0, kill: !1 },
      Me = { suppressEvents: !0, kill: !1 },
      $e = { suppressEvents: !0 },
      ze = {},
      Ie = [],
      Le = {},
      Q = {},
      De = {},
      je = 30,
      Fe = [],
      He = '',
      Re = { _start: 0, endTime: v, totalDuration: v },
      Be = [].slice,
      M = function (t, e, i) {
        return l && !e && l.selector
          ? l.selector(t)
          : !R(t) || i || (!Ut && qe())
            ? P(t)
              ? ((n = i),
                void 0 === o && (o = []),
                t.forEach(function (t) {
                  return (R(t) && !n) || _t(t, 1)
                    ? o.push.apply(o, M(t))
                    : o.push(t)
                }) || o)
              : _t(t)
                ? Be.call(t, 0)
                : t
                  ? [t]
                  : []
            : Be.call((e || Xt).querySelectorAll(t), 0)
        var n, o
      },
      Ne = [],
      p = 255,
      Ve = {
        aqua: [0, p, p],
        lime: [0, p, 0],
        silver: [192, 192, 192],
        black: [0, 0, 0],
        maroon: [128, 0, 0],
        teal: [0, 128, 128],
        blue: [0, 0, p],
        navy: [0, 0, 128],
        white: [p, p, p],
        olive: [128, 128, 0],
        yellow: [p, p, 0],
        orange: [p, 165, 0],
        gray: [128, 128, 128],
        purple: [128, 0, 128],
        green: [0, 128, 0],
        red: [p, 0, 0],
        pink: [p, 192, 203],
        cyan: [0, p, p],
        transparent: [p, p, p, 0],
      },
      We = (function () {
        var t,
          e =
            '(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b'
        for (t in Ve) e += '|' + t + '\\b'
        return new RegExp(e + ')', 'gi')
      })(),
      Qe = /hsl[a]?\(/,
      h =
        ((re = Date.now),
        (ae = 500),
        (le = 33),
        (ce = re()),
        (de = ce),
        (pe = ue = 1e3 / 240),
        (ne = {
          time: 0,
          frame: 0,
          tick: function () {
            Ze(!0)
          },
          deltaRatio: function (t) {
            return oe / (1e3 / (t || 60))
          },
          wake: function () {
            Zt &&
              (!Ut &&
                a() &&
                ((d = Ut = window),
                (Xt = d.document || {}),
                (r.gsap = m),
                (d.gsapVersions || (d.gsapVersions = [])).push(m.version),
                n(Gt || d.GreenSockGlobals || (!d.gsap && d) || {}),
                (ie = d.requestAnimationFrame),
                Ne.forEach(Mt)),
              te && ne.sleep(),
              (ee =
                ie ||
                function (t) {
                  return setTimeout(t, (pe - 1e3 * ne.time + 1) | 0)
                }),
              (Jt = 1),
              Ze(2))
          },
          sleep: function () {
            ;(ie ? d.cancelAnimationFrame : clearTimeout)(te),
              (Jt = 0),
              (ee = v)
          },
          lagSmoothing: function (t, e) {
            ;(ae = t || 1 / 0), (le = Math.min(e || 33, ae))
          },
          fps: function (t) {
            ;(ue = 1e3 / (t || 240)), (pe = 1e3 * ne.time + ue)
          },
          add: function (o, t, e) {
            var s = t
              ? function (t, e, i, n) {
                  o(t, e, i, n), ne.remove(s)
                }
              : o
            return ne.remove(o), fe[e ? 'unshift' : 'push'](s), qe(), s
          },
          remove: function (t, e) {
            ~(e = fe.indexOf(t)) && fe.splice(e, 1) && e <= se && se--
          },
          _listeners: (fe = []),
        })),
      qe = function () {
        return !Jt && h.wake()
      },
      $ = {},
      Ye = /^[\d.\-M][\d.\-,\s]/,
      Ue = /["']/g,
      Xe = function (e) {
        return function (t) {
          return 1 - e(1 - t)
        }
      },
      Ge = function (t, e) {
        return (
          (t &&
            (u(t)
              ? t
              : $[t] ||
                ((s = ((t = t) + '').split('(')),
                (r = $[s[0]]) && 1 < s.length && r.config
                  ? r.config.apply(
                      null,
                      ~t.indexOf('{')
                        ? [
                            (function (t) {
                              for (
                                var e,
                                  i,
                                  n,
                                  o = {},
                                  s = t.substr(1, t.length - 3).split(':'),
                                  r = s[0],
                                  a = 1,
                                  l = s.length;
                                a < l;
                                a++
                              )
                                (i = s[a]),
                                  (e =
                                    a !== l - 1
                                      ? i.lastIndexOf(',')
                                      : i.length),
                                  (n = i.substr(0, e)),
                                  (o[r] = isNaN(n)
                                    ? n.replace(Ue, '').trim()
                                    : +n),
                                  (r = i.substr(e + 1).trim())
                              return o
                            })(s[1]),
                          ]
                        : ((i = (s = t).indexOf('(') + 1),
                          (n = s.indexOf(')')),
                          (o = s.indexOf('(', i)),
                          s
                            .substring(
                              i,
                              ~o && o < n ? s.indexOf(')', n + 1) : n,
                            )
                            .split(',')
                            .map(_)),
                    )
                  : $._CE && Ye.test(t)
                    ? $._CE('', t)
                    : r))) ||
          e
        )
        var i, n, o, s, r
      }
    function Ze(t) {
      var e,
        i,
        n,
        o = re() - de,
        s = !0 === t
      if (
        (ae < o && (ce += o - le),
        (0 < (o = (i = (de += o) - ce) - pe) || s) &&
          ((n = ++ne.frame),
          (oe = i - 1e3 * ne.time),
          (ne.time = i /= 1e3),
          (pe += o + (ue <= o ? 4 : ue - o)),
          (e = 1)),
        s || (te = ee(Ze)),
        e)
      )
        for (se = 0; se < fe.length; se++) fe[se](i, oe, n, t)
    }
    function Ke(t) {
      return t < 1 / 2.75
        ? he * t * t
        : t < 0.7272727272727273
          ? he * Math.pow(t - 1.5 / 2.75, 2) + 0.75
          : t < 0.9090909090909092
            ? he * (t -= 2.25 / 2.75) * t + 0.9375
            : he * Math.pow(t - 2.625 / 2.75, 2) + 0.984375
    }
    f('Linear,Quad,Cubic,Quart,Quint,Strong', function (t, e) {
      var i = e < 5 ? e + 1 : e
      Ft(
        t + ',Power' + (i - 1),
        e
          ? function (t) {
              return Math.pow(t, i)
            }
          : function (t) {
              return t
            },
        function (t) {
          return 1 - Math.pow(1 - t, i)
        },
        function (t) {
          return t < 0.5
            ? Math.pow(2 * t, i) / 2
            : 1 - Math.pow(2 * (1 - t), i) / 2
        },
      )
    }),
      ($.Linear.easeNone = $.none = $.Linear.easeIn),
      Ft('Elastic', Rt('in'), Rt('out'), Rt()),
      (he = 7.5625),
      Ft(
        'Bounce',
        function (t) {
          return 1 - Ke(1 - t)
        },
        Ke,
      ),
      Ft('Expo', function (t) {
        return t ? Math.pow(2, 10 * (t - 1)) : 0
      }),
      Ft('Circ', function (t) {
        return -(we(1 - t * t) - 1)
      }),
      Ft('Sine', function (t) {
        return 1 === t ? 1 : 1 - _e(t * ve)
      }),
      Ft('Back', Bt('in'), Bt('out'), Bt()),
      ($.SteppedEase =
        $.steps =
        r.SteppedEase =
          {
            config: function (t, e) {
              var i = 1 / (t = void 0 === t ? 1 : t),
                n = t + (e ? 0 : 1),
                o = e ? 1 : 0
              return function (t) {
                return (((n * Qt(0, 0.99999999, t)) | 0) + o) * i
              }
            },
          }),
      (me.ease = $['quad.out']),
      f(
        'onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt',
        function (t) {
          return (He += t + ',' + t + 'Params,')
        },
      )
    var Je = function (t, e) {
        ;(this.id = ye++),
          ((t._gsap = this).target = t),
          (this.harness = e),
          (this.get = e ? e.get : y),
          (this.set = e ? e.getSetter : yi)
      },
      ti =
        (((e = ei.prototype).delay = function (t) {
          return t || 0 === t
            ? (this.parent &&
                this.parent.smoothChildTiming &&
                this.startTime(this._start + t - this._delay),
              (this._delay = t),
              this)
            : this._delay
        }),
        (e.duration = function (t) {
          return arguments.length
            ? this.totalDuration(
                0 < this._repeat ? t + (t + this._rDelay) * this._repeat : t,
              )
            : this.totalDuration() && this._dur
        }),
        (e.totalDuration = function (t) {
          return arguments.length
            ? ((this._dirty = 0),
              gt(
                this,
                this._repeat < 0
                  ? t
                  : (t - this._repeat * this._rDelay) / (this._repeat + 1),
              ))
            : this._tDur
        }),
        (e.totalTime = function (t, e) {
          if ((qe(), !arguments.length)) return this._tTime
          var i = this._dp
          if (i && i.smoothChildTiming && this._ts) {
            for (
              pt(this, t), i._dp && !i.parent && ft(i, this);
              i && i.parent;

            )
              i.parent._time !==
                i._start +
                  (0 <= i._ts
                    ? i._tTime / i._ts
                    : (i.totalDuration() - i._tTime) / -i._ts) &&
                i.totalTime(i._tTime, !0),
                (i = i.parent)
            !this.parent &&
              this._dp.autoRemoveChildren &&
              ((0 < this._ts && t < this._tDur) ||
                (this._ts < 0 && 0 < t) ||
                (!this._tDur && !t)) &&
              A(this._dp, this, this._start - this._delay)
          }
          return (
            (this._tTime !== t ||
              (!this._dur && !e) ||
              (this._initted && Math.abs(this._zTime) === W) ||
              (!t && !this._initted && (this.add || this._ptLookup))) &&
              (this._ts || (this._pTime = t), w(this, t, e)),
            this
          )
        }),
        (e.time = function (t, e) {
          return arguments.length
            ? this.totalTime(
                Math.min(this.totalDuration(), t + ct(this)) %
                  (this._dur + this._rDelay) || (t ? this._dur : 0),
                e,
              )
            : this._time
        }),
        (e.totalProgress = function (t, e) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * t, e)
            : this.totalDuration()
              ? Math.min(1, this._tTime / this._tDur)
              : this.ratio
        }),
        (e.progress = function (t, e) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                  ct(this),
                e,
              )
            : this.duration()
              ? Math.min(1, this._time / this._dur)
              : this.ratio
        }),
        (e.iteration = function (t, e) {
          var i = this.duration() + this._rDelay
          return arguments.length
            ? this.totalTime(this._time + (t - 1) * i, e)
            : this._repeat
              ? Vt(this._tTime, i) + 1
              : 1
        }),
        (e.timeScale = function (t) {
          if (!arguments.length) return this._rts === -W ? 0 : this._rts
          if (this._rts === t) return this
          for (
            var e =
                this.parent && this._ts
                  ? dt(this.parent._time, this)
                  : this._tTime,
              t =
                ((this._rts = +t || 0),
                (this._ts = this._ps || t === -W ? 0 : this._rts),
                this.totalTime(Qt(-Math.abs(this._delay), this._tDur, e), !0),
                ut(this),
                this),
              i = t.parent;
            i && i.parent;

          )
            (i._dirty = 1), i.totalDuration(), (i = i.parent)
          return t
        }),
        (e.paused = function (t) {
          return arguments.length
            ? (this._ps !== t &&
                ((this._ps = t)
                  ? ((this._pTime =
                      this._tTime || Math.max(-this._delay, this.rawTime())),
                    (this._ts = this._act = 0))
                  : (qe(),
                    (this._ts = this._rts),
                    this.totalTime(
                      this.parent && !this.parent.smoothChildTiming
                        ? this.rawTime()
                        : this._tTime || this._pTime,
                      1 === this.progress() &&
                        Math.abs(this._zTime) !== W &&
                        (this._tTime -= W),
                    ))),
              this)
            : this._ps
        }),
        (e.startTime = function (t) {
          var e
          return arguments.length
            ? ((this._start = t),
              !(e = this.parent || this._dp) ||
                (!e._sort && this.parent) ||
                A(e, this, t - this._delay),
              this)
            : this._start
        }),
        (e.endTime = function (t) {
          return (
            this._start +
            (L(t) ? this.totalDuration() : this.duration()) /
              Math.abs(this._ts || 1)
          )
        }),
        (e.rawTime = function (t) {
          var e = this.parent || this._dp
          return e
            ? t &&
              (!this._ts ||
                (this._repeat && this._time && this.totalProgress() < 1))
              ? this._tTime % (this._dur + this._rDelay)
              : this._ts
                ? dt(e.rawTime(t), this)
                : this._tTime
            : this._tTime
        }),
        (e.revert = function (t) {
          var e = F
          return (
            (F = t = void 0 === t ? $e : t),
            (this._initted || this._startAt) &&
              (this.timeline && this.timeline.revert(t),
              this.totalTime(-0.01, t.suppressEvents)),
            'nested' !== this.data && !1 !== t.kill && this.kill(),
            (F = e),
            this
          )
        }),
        (e.globalTime = function (t) {
          for (var e = this, i = arguments.length ? t : e.rawTime(); e; )
            (i = e._start + i / (e._ts || 1)), (e = e._dp)
          return !this.parent && this._sat
            ? this._sat.vars.immediateRender
              ? -1 / 0
              : this._sat.globalTime(t)
            : i
        }),
        (e.repeat = function (t) {
          return arguments.length
            ? ((this._repeat = t === 1 / 0 ? -2 : t), vt(this))
            : -2 === this._repeat
              ? 1 / 0
              : this._repeat
        }),
        (e.repeatDelay = function (t) {
          var e
          return arguments.length
            ? ((e = this._time),
              (this._rDelay = t),
              vt(this),
              e ? this.time(e) : this)
            : this._rDelay
        }),
        (e.yoyo = function (t) {
          return arguments.length ? ((this._yoyo = t), this) : this._yoyo
        }),
        (e.seek = function (t, e) {
          return this.totalTime(c(this, t), L(e))
        }),
        (e.restart = function (t, e) {
          return this.play().totalTime(t ? -this._delay : 0, L(e))
        }),
        (e.play = function (t, e) {
          return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
        }),
        (e.reverse = function (t, e) {
          return (
            null != t && this.seek(t || this.totalDuration(), e),
            this.reversed(!0).paused(!1)
          )
        }),
        (e.pause = function (t, e) {
          return null != t && this.seek(t, e), this.paused(!0)
        }),
        (e.resume = function () {
          return this.paused(!1)
        }),
        (e.reversed = function (t) {
          return arguments.length
            ? (!!t !== this.reversed() &&
                this.timeScale(-this._rts || (t ? -W : 0)),
              this)
            : this._rts < 0
        }),
        (e.invalidate = function () {
          return (this._initted = this._act = 0), (this._zTime = -W), this
        }),
        (e.isActive = function () {
          var t = this.parent || this._dp,
            e = this._start
          return !(
            t &&
            !(
              this._ts &&
              this._initted &&
              t.isActive() &&
              (t = t.rawTime(!0)) >= e &&
              t < this.endTime(!0) - W
            )
          )
        }),
        (e.eventCallback = function (t, e, i) {
          var n = this.vars
          return 1 < arguments.length
            ? (e
                ? ((n[t] = e),
                  i && (n[t + 'Params'] = i),
                  'onUpdate' === t && (this._onUpdate = e))
                : delete n[t],
              this)
            : n[t]
        }),
        (e.then = function (n) {
          var o = this
          return new Promise(function (e) {
            function t() {
              var t = o.then
              ;(o.then = null),
                u(i) && (i = i(o)) && (i.then || i === o) && (o.then = t),
                e(i),
                (o.then = t)
            }
            var i = u(n) ? n : T
            ;(o._initted && 1 === o.totalProgress() && 0 <= o._ts) ||
            (!o._tTime && o._ts < 0)
              ? t()
              : (o._prom = t)
          })
        }),
        (e.kill = function () {
          Pt(this)
        }),
        ei)
    function ei(t) {
      ;(this.vars = t),
        (this._delay = +t.delay || 0),
        (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
          ((this._rDelay = t.repeatDelay || 0),
          (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
        (this._ts = 1),
        gt(this, +t.duration, 1, 1),
        (this.data = t.data),
        l && (this._ctx = l).data.push(this),
        Jt || h.wake()
    }
    j(ti.prototype, {
      _time: 0,
      _start: 0,
      _end: 0,
      _tTime: 0,
      _tDur: 0,
      _dirty: 0,
      _repeat: 0,
      _yoyo: !1,
      parent: null,
      _initted: !1,
      _rDelay: 0,
      _ts: 1,
      _dp: 0,
      ratio: 0,
      _zTime: -W,
      _prom: 0,
      _ps: !1,
      _rts: 1,
    })
    i(ni, (ii = ti)),
      ((e = ni.prototype).to = function (t, e, i) {
        return yt(0, arguments, this), this
      }),
      (e.from = function (t, e, i) {
        return yt(1, arguments, this), this
      }),
      (e.fromTo = function (t, e, i, n) {
        return yt(2, arguments, this), this
      }),
      (e.set = function (t, e, i) {
        return (
          (e.duration = 0),
          (e.parent = this),
          rt(e).repeatDelay || (e.repeat = 0),
          (e.immediateRender = !!e.immediateRender),
          new q(t, e, c(this, i), 1),
          this
        )
      }),
      (e.call = function (t, e, i) {
        return A(this, q.delayedCall(0, t, e), i)
      }),
      (e.staggerTo = function (t, e, i, n, o, s, r) {
        return (
          (i.duration = e),
          (i.stagger = i.stagger || n),
          (i.onComplete = s),
          (i.onCompleteParams = r),
          (i.parent = this),
          new q(t, i, c(this, o)),
          this
        )
      }),
      (e.staggerFrom = function (t, e, i, n, o, s, r) {
        return (
          (i.runBackwards = 1),
          (rt(i).immediateRender = L(i.immediateRender)),
          this.staggerTo(t, e, i, n, o, s, r)
        )
      }),
      (e.staggerFromTo = function (t, e, i, n, o, s, r, a) {
        return (
          (n.startAt = i),
          (rt(n).immediateRender = L(n.immediateRender)),
          this.staggerTo(t, e, n, o, s, r, a)
        )
      }),
      (e.render = function (t, e, i) {
        var n,
          o,
          s,
          r,
          a,
          l,
          c,
          d,
          u,
          p,
          f = this._time,
          h = this._dirty ? this.totalDuration() : this._tDur,
          m = this._dur,
          g = t <= 0 ? 0 : O(t),
          v = this._zTime < 0 != t < 0 && (this._initted || !m)
        if (
          (g = this !== H && h < g && 0 <= t ? h : g) !== this._tTime ||
          i ||
          v
        ) {
          if (
            (f !== this._time &&
              m &&
              ((g += this._time - f), (t += this._time - f)),
            (n = g),
            (d = this._start),
            (a = !(c = this._ts)),
            v && (m || (f = this._zTime), (!t && e) || (this._zTime = t)),
            this._repeat)
          ) {
            if (
              ((v = this._yoyo),
              (r = m + this._rDelay),
              this._repeat < -1 && t < 0)
            )
              return this.totalTime(100 * r + t, e, i)
            if (
              ((n = O(g % r)),
              g === h
                ? ((s = this._repeat), (n = m))
                : ((s = ~~(g / r)) && s === g / r && ((n = m), s--),
                  m < n && (n = m)),
              (u = Vt(this._tTime, r)),
              v && 1 & s && ((n = m - n), (p = 1)),
              s !==
                (u =
                  !f &&
                  this._tTime &&
                  u !== s &&
                  this._tTime - u * r - this._dur <= 0
                    ? s
                    : u) && !this._lock)
            ) {
              var y = v && 1 & u,
                v = y === (v && 1 & s),
                f = (y = s < u ? !y : y) ? 0 : g % m ? m : g
              if (
                ((this._lock = 1),
                (this.render(f || (p ? 0 : O(s * r)), e, !m)._lock = 0),
                (this._tTime = g),
                !e && this.parent && b(this, 'onRepeat'),
                this.vars.repeatRefresh && !p && (this.invalidate()._lock = 1),
                (f && f !== this._time) ||
                  a != !this._ts ||
                  (this.vars.onRepeat && !this.parent && !this._act))
              )
                return this
              if (
                ((m = this._dur),
                (h = this._tDur),
                v &&
                  ((this._lock = 2),
                  this.render((f = y ? m : -1e-4), !0),
                  this.vars.repeatRefresh) &&
                  !p &&
                  this.invalidate(),
                (this._lock = 0),
                !this._ts && !a)
              )
                return this
              jt(this, p)
            }
          }
          if (
            (this._hasPause &&
              !this._forcing &&
              this._lock < 2 &&
              (l = (function (t, e, i) {
                var n
                if (e < i)
                  for (n = t._first; n && n._start <= i; ) {
                    if ('isPause' === n.data && n._start > e) return n
                    n = n._next
                  }
                else
                  for (n = t._last; n && n._start >= i; ) {
                    if ('isPause' === n.data && n._start < e) return n
                    n = n._prev
                  }
              })(this, O(f), O(n))) &&
              (g -= n - (n = l._start)),
            (this._tTime = g),
            (this._time = n),
            (this._act = !c),
            this._initted ||
              ((this._onUpdate = this.vars.onUpdate),
              (this._initted = 1),
              (this._zTime = t),
              (f = 0)),
            !f && n && !e && !s && (b(this, 'onStart'), this._tTime !== g))
          )
            return this
          if (f <= n && 0 <= t)
            for (w = this._first; w; ) {
              if (
                ((o = w._next), (w._act || n >= w._start) && w._ts && l !== w)
              ) {
                if (w.parent !== this) return this.render(t, e, i)
                if (
                  (w.render(
                    0 < w._ts
                      ? (n - w._start) * w._ts
                      : (w._dirty ? w.totalDuration() : w._tDur) +
                          (n - w._start) * w._ts,
                    e,
                    i,
                  ),
                  n !== this._time || (!this._ts && !a))
                ) {
                  ;(l = 0), o && (g += this._zTime = -W)
                  break
                }
              }
              w = o
            }
          else
            for (var w = this._last, _ = t < 0 ? t : n; w; ) {
              if (
                ((o = w._prev), (w._act || _ <= w._end) && w._ts && l !== w)
              ) {
                if (w.parent !== this) return this.render(t, e, i)
                if (
                  (w.render(
                    0 < w._ts
                      ? (_ - w._start) * w._ts
                      : (w._dirty ? w.totalDuration() : w._tDur) +
                          (_ - w._start) * w._ts,
                    e,
                    i || (F && (w._initted || w._startAt)),
                  ),
                  n !== this._time || (!this._ts && !a))
                ) {
                  ;(l = 0), o && (g += this._zTime = _ ? -W : W)
                  break
                }
              }
              w = o
            }
          if (
            l &&
            !e &&
            (this.pause(),
            (l.render(f <= n ? 0 : -W)._zTime = f <= n ? 1 : -1),
            this._ts)
          )
            return (this._start = d), ut(this), this.render(t, e, i)
          this._onUpdate && !e && b(this, 'onUpdate', !0),
            !((g === h && this._tTime >= this.totalDuration()) || (!g && f)) ||
              (d !== this._start && Math.abs(c) === Math.abs(this._ts)) ||
              this._lock ||
              ((!t && m) ||
                !((g === h && 0 < this._ts) || (!g && this._ts < 0)) ||
                at(this, 1),
              e) ||
              (t < 0 && !f) ||
              (!g && !f && h) ||
              (b(
                this,
                g === h && 0 <= t ? 'onComplete' : 'onReverseComplete',
                !0,
              ),
              !this._prom) ||
              (g < h && 0 < this.timeScale()) ||
              this._prom()
        }
        return this
      }),
      (e.add = function (t, e) {
        var i = this
        if ((Z(e) || (e = c(this, e, t)), !(t instanceof ti))) {
          if (P(t))
            return (
              t.forEach(function (t) {
                return i.add(t, e)
              }),
              this
            )
          if (R(t)) return this.addLabel(t, e)
          if (!u(t)) return this
          t = q.delayedCall(0, t)
        }
        return this !== t ? A(this, t, e) : this
      }),
      (e.getChildren = function (t, e, i, n) {
        void 0 === t && (t = !0),
          void 0 === e && (e = !0),
          void 0 === i && (i = !0),
          void 0 === n && (n = -V)
        for (var o = [], s = this._first; s; )
          s._start >= n &&
            (s instanceof q
              ? e && o.push(s)
              : (i && o.push(s),
                t && o.push.apply(o, s.getChildren(!0, e, i)))),
            (s = s._next)
        return o
      }),
      (e.getById = function (t) {
        for (var e = this.getChildren(1, 1, 1), i = e.length; i--; )
          if (e[i].vars.id === t) return e[i]
      }),
      (e.remove = function (t) {
        return R(t)
          ? this.removeLabel(t)
          : u(t)
            ? this.killTweensOf(t)
            : (x(this, t),
              t === this._recent && (this._recent = this._last),
              C(this))
      }),
      (e.totalTime = function (t, e) {
        return arguments.length
          ? ((this._forcing = 1),
            !this._dp &&
              this._ts &&
              (this._start = O(
                h.time -
                  (0 < this._ts
                    ? t / this._ts
                    : (this.totalDuration() - t) / -this._ts),
              )),
            ii.prototype.totalTime.call(this, t, e),
            (this._forcing = 0),
            this)
          : this._tTime
      }),
      (e.addLabel = function (t, e) {
        return (this.labels[t] = c(this, e)), this
      }),
      (e.removeLabel = function (t) {
        return delete this.labels[t], this
      }),
      (e.addPause = function (t, e, i) {
        e = q.delayedCall(0, e || v, i)
        return (
          (e.data = 'isPause'), (this._hasPause = 1), A(this, e, c(this, t))
        )
      }),
      (e.removePause = function (t) {
        var e = this._first
        for (t = c(this, t); e; )
          e._start === t && 'isPause' === e.data && at(e), (e = e._next)
      }),
      (e.killTweensOf = function (t, e, i) {
        for (var n = this.getTweensOf(t, i), o = n.length; o--; )
          ai !== n[o] && n[o].kill(t, e)
        return this
      }),
      (e.getTweensOf = function (t, e) {
        for (var i, n = [], o = M(t), s = this._first, r = Z(e); s; )
          s instanceof q
            ? (function (t, e) {
                for (var i = e.length, n = 0; t.indexOf(e[n]) < 0 && ++n < i; );
                return n < i
              })(s._targets, o) &&
              (r
                ? (!ai || (s._initted && s._ts)) &&
                  s.globalTime(0) <= e &&
                  s.globalTime(s.totalDuration()) > e
                : !e || s.isActive()) &&
              n.push(s)
            : (i = s.getTweensOf(o, e)).length && n.push.apply(n, i),
            (s = s._next)
        return n
      }),
      (e.tweenTo = function (t, e) {
        e = e || {}
        var i,
          n = this,
          o = c(n, t),
          s = e.startAt,
          r = e.onStart,
          a = e.onStartParams,
          t = e.immediateRender,
          l = q.to(
            n,
            j(
              {
                ease: e.ease || 'none',
                lazy: !1,
                immediateRender: !1,
                time: o,
                overwrite: 'auto',
                duration:
                  e.duration ||
                  Math.abs(
                    (o - (s && 'time' in s ? s.time : n._time)) / n.timeScale(),
                  ) ||
                  W,
                onStart: function () {
                  var t
                  n.pause(),
                    i ||
                      ((t =
                        e.duration ||
                        Math.abs(
                          (o - (s && 'time' in s ? s.time : n._time)) /
                            n.timeScale(),
                        )),
                      l._dur !== t && gt(l, t, 0, 1).render(l._time, !0, !0),
                      (i = 1)),
                    r && r.apply(l, a || [])
                },
              },
              e,
            ),
          )
        return t ? l.render(0) : l
      }),
      (e.tweenFromTo = function (t, e, i) {
        return this.tweenTo(e, j({ startAt: { time: c(this, t) } }, i))
      }),
      (e.recent = function () {
        return this._recent
      }),
      (e.nextLabel = function (t) {
        return void 0 === t && (t = this._time), At(this, c(this, t))
      }),
      (e.previousLabel = function (t) {
        return void 0 === t && (t = this._time), At(this, c(this, t), 1)
      }),
      (e.currentLabel = function (t) {
        return arguments.length
          ? this.seek(t, !0)
          : this.previousLabel(this._time + W)
      }),
      (e.shiftChildren = function (t, e, i) {
        void 0 === i && (i = 0)
        for (var n, o = this._first, s = this.labels; o; )
          o._start >= i && ((o._start += t), (o._end += t)), (o = o._next)
        if (e) for (n in s) s[n] >= i && (s[n] += t)
        return C(this)
      }),
      (e.invalidate = function (t) {
        var e = this._first
        for (this._lock = 0; e; ) e.invalidate(t), (e = e._next)
        return ii.prototype.invalidate.call(this, t)
      }),
      (e.clear = function (t) {
        void 0 === t && (t = !0)
        for (var e, i = this._first; i; ) (e = i._next), this.remove(i), (i = e)
        return (
          this._dp && (this._time = this._tTime = this._pTime = 0),
          t && (this.labels = {}),
          C(this)
        )
      }),
      (e.totalDuration = function (t) {
        var e,
          i,
          n,
          o = 0,
          s = this,
          r = s._last,
          a = V
        if (arguments.length)
          return s.timeScale(
            (s._repeat < 0 ? s.duration() : s.totalDuration()) /
              (s.reversed() ? -t : t),
          )
        if (s._dirty) {
          for (n = s.parent; r; )
            (e = r._prev),
              r._dirty && r.totalDuration(),
              a < (i = r._start) && s._sort && r._ts && !s._lock
                ? ((s._lock = 1), (A(s, r, i - r._delay, 1)._lock = 0))
                : (a = i),
              i < 0 &&
                r._ts &&
                ((o -= i),
                ((!n && !s._dp) || (n && n.smoothChildTiming)) &&
                  ((s._start += i / s._ts), (s._time -= i), (s._tTime -= i)),
                s.shiftChildren(-i, !1, -1 / 0),
                (a = 0)),
              r._end > o && r._ts && (o = r._end),
              (r = e)
          gt(s, s === H && s._time > o ? s._time : o, 1, 1), (s._dirty = 0)
        }
        return s._tDur
      }),
      (ni.updateRoot = function (t) {
        if ((H._ts && (w(H, dt(t, H)), (Kt = h.frame)), h.frame >= je)) {
          je += N.autoSleep || 120
          var e = H._first
          if ((!e || !e._ts) && N.autoSleep && h._listeners.length < 2) {
            for (; e && !e._ts; ) e = e._next
            e || h.sleep()
          }
        }
      })
    var ii,
      z = ni
    function ni(t, e) {
      var i
      return (
        ((i = ii.call(this, (t = void 0 === t ? {} : t)) || this).labels = {}),
        (i.smoothChildTiming = !!t.smoothChildTiming),
        (i.autoRemoveChildren = !!t.autoRemoveChildren),
        (i._sort = L(t.sortChildren)),
        H && A(t.parent || H, I(i), e),
        t.reversed && i.reverse(),
        t.paused && i.paused(!0),
        t.scrollTrigger && ht(I(i), t.scrollTrigger),
        i
      )
    }
    function oi(t, e, i, n, o, s) {
      var r, a, l, c
      if (
        Q[t] &&
        !1 !==
          (r = new Q[t]()).init(
            o,
            r.rawVars
              ? e[t]
              : (function (t, e, i, n, o) {
                  if (
                    !E((t = u(t) ? ri(t, o, e, i, n) : t)) ||
                    (t.style && t.nodeType) ||
                    P(t) ||
                    Te(t)
                  )
                    return R(t) ? ri(t, o, e, i, n) : t
                  var s,
                    r = {}
                  for (s in t) r[s] = ri(t[s], o, e, i, n)
                  return r
                })(e[t], n, o, s, i),
            i,
            n,
            s,
          ) &&
        ((i._pt = a = new Y(i._pt, o, t, 0, 1, r.render, r, 0, r.priority)),
        i !== Ri)
      )
        for (l = i._ptLookup[i._targets.indexOf(o)], c = r._props.length; c--; )
          l[r._props[c]] = a
      return r
    }
    j(z.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 })
    function si(t, e, i) {
      var n,
        o,
        s,
        r,
        a,
        l,
        c,
        d,
        u,
        p,
        f,
        h,
        m,
        g = t.vars,
        v = g.ease,
        y = g.startAt,
        w = g.immediateRender,
        _ = g.lazy,
        b = g.onUpdate,
        T = g.onUpdateParams,
        k = g.callbackScope,
        S = g.runBackwards,
        x = g.yoyoEase,
        C = g.keyframes,
        E = g.autoRevert,
        O = t._dur,
        A = t._startAt,
        P = t._targets,
        M = t.parent,
        $ = M && 'nested' === M.data ? M.vars.targets : P,
        z = 'auto' === t._overwrite && !Yt,
        I = t.timeline
      if (
        ((t._ease = Ge((v = !I || (C && v) ? v : 'none'), me.ease)),
        (t._yEase = x ? Xe(Ge(!0 === x ? v : x, me.ease)) : 0),
        x &&
          t._yoyo &&
          !t._repeat &&
          ((x = t._yEase), (t._yEase = t._ease), (t._ease = x)),
        (t._from = !I && !!g.runBackwards),
        !I || (C && !g.stagger))
      ) {
        if (
          ((h = (d = P[0] ? it(P[0]).harness : 0) && g[d.prop]),
          (n = st(g, ze)),
          A &&
            (A._zTime < 0 && A.progress(1),
            e < 0 && S && w && !E
              ? A.render(-1, !0)
              : A.revert(S && O ? Me : Pe),
            (A._lazy = 0)),
          y)
        ) {
          if (
            (at(
              (t._startAt = q.set(
                P,
                j(
                  {
                    data: 'isStart',
                    overwrite: !1,
                    parent: M,
                    immediateRender: !0,
                    lazy: !A && L(_),
                    startAt: null,
                    delay: 0,
                    onUpdate: b,
                    onUpdateParams: T,
                    callbackScope: k,
                    stagger: 0,
                  },
                  y,
                ),
              )),
            ),
            (t._startAt._dp = 0),
            (t._startAt._sat = t),
            e < 0 && (F || (!w && !E)) && t._startAt.revert(Me),
            w && O && e <= 0 && i <= 0)
          )
            return void (e && (t._zTime = e))
        } else if (S && O && !A)
          if (
            ((s = j(
              {
                overwrite: !1,
                data: 'isFromStart',
                lazy: (w = e ? !1 : w) && !A && L(_),
                immediateRender: w,
                stagger: 0,
                parent: M,
              },
              n,
            )),
            h && (s[d.prop] = h),
            at((t._startAt = q.set(P, s))),
            (t._startAt._dp = 0),
            (t._startAt._sat = t),
            e < 0 && (F ? t._startAt.revert(Me) : t._startAt.render(-1, !0)),
            (t._zTime = e),
            w)
          ) {
            if (!e) return
          } else si(t._startAt, W, W)
        for (
          t._pt = t._ptCache = 0, _ = (O && L(_)) || (_ && !O), o = 0;
          o < P.length;
          o++
        ) {
          if (
            ((c = (a = P[o])._gsap || et(P)[o]._gsap),
            (t._ptLookup[o] = p = {}),
            Le[c.id] && Ie.length && ot(),
            (f = $ === P ? o : $.indexOf(a)),
            d &&
              !1 !== (u = new d()).init(a, h || n, t, f, $) &&
              ((t._pt = r =
                new Y(t._pt, a, u.name, 0, 1, u.render, u, 0, u.priority)),
              u._props.forEach(function (t) {
                p[t] = r
              }),
              u.priority) &&
              (l = 1),
            !d || h)
          )
            for (s in n)
              Q[s] && (u = oi(s, n, t, f, a, $))
                ? u.priority && (l = 1)
                : (p[s] = r =
                    di.call(t, a, s, 'get', n[s], f, $, 0, g.stringFilter))
          t._op && t._op[o] && t.kill(a, t._op[o]),
            z &&
              t._pt &&
              ((ai = t),
              H.killTweensOf(a, p, t.globalTime(e)),
              (m = !t.parent),
              (ai = 0)),
            t._pt && _ && (Le[c.id] = 1)
        }
        l && xi(t), t._onInit && t._onInit(t)
      }
      ;(t._onUpdate = b),
        (t._initted = (!t._op || t._pt) && !m),
        C && e <= 0 && I.render(V, !0, !0)
    }
    function ri(t, e, i, n, o) {
      return u(t)
        ? t.call(e, i, n, o)
        : R(t) && ~t.indexOf('random(')
          ? Ot(t)
          : t
    }
    var ai,
      li,
      ci,
      di = function (t, e, i, n, o, s, r, a, l, c) {
        u(n) && (n = n(o || 0, t, s))
        var d,
          o = t[e],
          s =
            'get' !== i
              ? i
              : u(o)
                ? l
                  ? t[
                      e.indexOf('set') || !u(t['get' + e.substr(3)])
                        ? e
                        : 'get' + e.substr(3)
                    ](l)
                  : t[e]()
                : o,
          i = u(o) ? (l ? vi : gi) : mi
        if (
          (!R(n) ||
            '=' !== (n = ~n.indexOf('random(') ? Ot(n) : n).charAt(1) ||
            (!(d = nt(s, n) + (B(s) || 0)) && 0 !== d) ||
            (n = d),
          !c || s !== n || li)
        )
          return isNaN(s * n) || '' === n
            ? (o || e in t || J(e, n),
              function (t, e, i, n, o, s, r) {
                var a,
                  l,
                  c,
                  d,
                  u,
                  p = new Y(this._pt, t, e, 0, 1, bi, null, o),
                  f = 0,
                  h = 0
                for (
                  p.b = i,
                    p.e = n,
                    i += '',
                    (o = ~(n += '').indexOf('random(')) && (n = Ot(n)),
                    s && (s((s = [i, n]), t, e), (i = s[0]), (n = s[1])),
                    a = i.match(Ce) || [];
                  (d = Ce.exec(n));

                )
                  (c = d[0]),
                    (d = n.substring(f, d.index)),
                    l ? (l = (l + 1) % 5) : 'rgba(' === d.substr(-5) && (l = 1),
                    c !== a[h++] &&
                      ((u = parseFloat(a[h - 1]) || 0),
                      (p._pt = {
                        _next: p._pt,
                        p: d || 1 === h ? d : ',',
                        s: u,
                        c:
                          '=' === c.charAt(1)
                            ? nt(u, c) - u
                            : parseFloat(c) - u,
                        m: l && l < 4 ? Math.round : 0,
                      }),
                      (f = Ce.lastIndex))
                return (
                  (p.c = f < n.length ? n.substring(f, n.length) : ''),
                  (p.fp = r),
                  (Ee.test(n) || o) && (p.e = 0),
                  (this._pt = p)
                )
              }.call(this, t, e, s, n, i, a || N.stringFilter, l))
            : ((d = new Y(
                this._pt,
                t,
                e,
                +s || 0,
                n - (s || 0),
                'boolean' == typeof o ? _i : wi,
                0,
                i,
              )),
              l && (d.fp = l),
              r && d.modifier(r, this, t),
              (this._pt = d))
      },
      ui = He + 'repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert',
      pi = {},
      q =
        (f(
          ui + ',id,stagger,delay,duration,paused,scrollTrigger',
          function (t) {
            return (pi[t] = 1)
          },
        ),
        i(o, (ci = ti)),
        ((e = o.prototype).render = function (t, e, i) {
          var n,
            o,
            s,
            r = this._time,
            a = this._tDur,
            l = this._dur,
            c = t < 0,
            d = a - W < t && !c ? a : t < W ? 0 : t
          if (l) {
            if (
              d !== this._tTime ||
              !t ||
              i ||
              (!this._initted && this._tTime) ||
              (this._startAt && this._zTime < 0 != c)
            ) {
              if (((h = d), (f = this.timeline), this._repeat)) {
                if (((u = l + this._rDelay), this._repeat < -1 && c))
                  return this.totalTime(100 * u + t, e, i)
                if (
                  ((h = O(d % u)),
                  d === a
                    ? ((v = this._repeat), (h = l))
                    : ((v = ~~(d / u)) && v === d / u && ((h = l), v--),
                      l < h && (h = l)),
                  (o = this._yoyo && 1 & v) && ((p = this._yEase), (h = l - h)),
                  (w = Vt(this._tTime, u)),
                  h === r && !i && this._initted)
                )
                  return (this._tTime = d), this
                v !== w &&
                  (f && this._yEase && jt(f, o),
                  !this.vars.repeatRefresh ||
                    o ||
                    this._lock ||
                    ((this._lock = i = 1),
                    (this.render(O(u * v), !0).invalidate()._lock = 0)))
              }
              if (!this._initted) {
                if (mt(this, c ? t : h, i, e, d)) return (this._tTime = 0), this
                if (r !== this._time) return this
                if (l !== this._dur) return this.render(t, e, i)
              }
              if (
                ((this._tTime = d),
                (this._time = h),
                !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                (this.ratio = s = (p || this._ease)(h / l)),
                this._from && (this.ratio = s = 1 - s),
                h && !r && !e && !v && (b(this, 'onStart'), this._tTime !== d))
              )
                return this
              for (n = this._pt; n; ) n.r(s, n.d), (n = n._next)
              ;(f &&
                f.render(
                  t < 0 ? t : !h && o ? -W : f._dur * f._ease(h / this._dur),
                  e,
                  i,
                )) ||
                (this._startAt && (this._zTime = t)),
                this._onUpdate &&
                  !e &&
                  (c && lt(this, t, 0, i), b(this, 'onUpdate')),
                this._repeat &&
                  v !== w &&
                  this.vars.onRepeat &&
                  !e &&
                  this.parent &&
                  b(this, 'onRepeat'),
                (d !== this._tDur && d) ||
                  this._tTime !== d ||
                  (c && !this._onUpdate && lt(this, t, 0, !0),
                  (!t && l) ||
                    !(
                      (d === this._tDur && 0 < this._ts) ||
                      (!d && this._ts < 0)
                    ) ||
                    at(this, 1),
                  e) ||
                  (c && !r) ||
                  !(d || r || o) ||
                  (b(this, d === a ? 'onComplete' : 'onReverseComplete', !0),
                  !this._prom) ||
                  (d < a && 0 < this.timeScale()) ||
                  this._prom()
            }
          } else {
            var u = this
            var p = t
            var f = e
            var h = i
            var m,
              g,
              v = u.ratio,
              y =
                p < 0 ||
                (!p &&
                  ((!u._start &&
                    (function t(e) {
                      e = e.parent
                      return (
                        e &&
                        e._ts &&
                        e._initted &&
                        !e._lock &&
                        (e.rawTime() < 0 || t(e))
                      )
                    })(u) &&
                    (u._initted || !Wt(u))) ||
                    ((u._ts < 0 || u._dp._ts < 0) && !Wt(u))))
                  ? 0
                  : 1,
              w = u._rDelay,
              l = 0
            if (
              (w &&
                u._repeat &&
                ((l = Qt(0, u._tDur, p)),
                (g = Vt(l, w)),
                u._yoyo && 1 & g && (y = 1 - y),
                g !== Vt(u._tTime, w)) &&
                ((v = 1 - y), u.vars.repeatRefresh) &&
                u._initted &&
                u.invalidate(),
              y !== v || F || h || u._zTime === W || (!p && u._zTime))
            ) {
              if (u._initted || !mt(u, p, h, f, l)) {
                for (
                  g = u._zTime,
                    u._zTime = p || (f ? W : 0),
                    f = f || (p && !g),
                    u.ratio = y,
                    u._from && (y = 1 - y),
                    u._time = 0,
                    u._tTime = l,
                    m = u._pt;
                  m;

                )
                  m.r(y, m.d), (m = m._next)
                p < 0 && lt(u, p, 0, !0),
                  u._onUpdate && !f && b(u, 'onUpdate'),
                  l && u._repeat && !f && u.parent && b(u, 'onRepeat'),
                  (p >= u._tDur || p < 0) &&
                    u.ratio === y &&
                    (y && at(u, 1),
                    f ||
                      F ||
                      (b(u, y ? 'onComplete' : 'onReverseComplete', !0),
                      u._prom && u._prom()))
              }
            } else u._zTime || (u._zTime = p)
          }
          return this
        }),
        (e.targets = function () {
          return this._targets
        }),
        (e.invalidate = function (t) {
          return (
            (t && this.vars.runBackwards) || (this._startAt = 0),
            (this._pt =
              this._op =
              this._onUpdate =
              this._lazy =
              this.ratio =
                0),
            (this._ptLookup = []),
            this.timeline && this.timeline.invalidate(t),
            ci.prototype.invalidate.call(this, t)
          )
        }),
        (e.resetTo = function (t, e, i, n) {
          Jt || h.wake(), this._ts || this.play()
          var o,
            s = Math.min(this._dur, (this._dp._time - this._start) * this._ts)
          return (
            this._initted || si(this, s),
            (o = this._ease(s / this._dur)),
            (function (t, e, i, n, o, s, r) {
              var a,
                l,
                c,
                d,
                u = ((t._pt && t._ptCache) || (t._ptCache = {}))[e]
              if (!u)
                for (
                  u = t._ptCache[e] = [],
                    c = t._ptLookup,
                    d = t._targets.length;
                  d--;

                ) {
                  if ((a = c[d][e]) && a.d && a.d._pt)
                    for (a = a.d._pt; a && a.p !== e && a.fp !== e; )
                      a = a._next
                  if (!a)
                    return (li = 1), (t.vars[e] = '+=0'), si(t, r), (li = 0), 1
                  u.push(a)
                }
              for (d = u.length; d--; )
                ((a = (l = u[d])._pt || l).s =
                  (!n && 0 !== n) || o ? a.s + (n || 0) + s * a.c : n),
                  (a.c = i - a.s),
                  l.e && (l.e = D(i) + B(l.e)),
                  l.b && (l.b = a.s + B(l.b))
            })(this, t, e, i, n, o, s)
              ? this.resetTo(t, e, i, n)
              : (pt(this, 0),
                this.parent ||
                  S(
                    this._dp,
                    this,
                    '_first',
                    '_last',
                    this._dp._sort ? '_start' : 0,
                  ),
                this.render(0))
          )
        }),
        (e.kill = function (t, e) {
          if ((void 0 === e && (e = 'all'), !(t || (e && 'all' !== e))))
            return (this._lazy = this._pt = 0), this.parent ? Pt(this) : this
          if (this.timeline)
            (p = this.timeline.totalDuration()),
              this.timeline.killTweensOf(t, e, ai && !0 !== ai.vars.overwrite)
                ._first || Pt(this),
              this.parent &&
                p !== this.timeline.totalDuration() &&
                gt(this, (this._dur * this.timeline._tDur) / p, 0, 1)
          else {
            var i,
              n,
              o,
              s,
              r,
              a,
              l,
              c = this._targets,
              d = t ? M(t) : c,
              u = this._ptLookup,
              p = this._pt
            if (
              (!e || 'all' === e) &&
              (function (t, e) {
                for (
                  var i = t.length, n = i === e.length;
                  n && i-- && t[i] === e[i];

                );
                return i < 0
              })(c, d)
            )
              return 'all' === e && (this._pt = 0), Pt(this)
            for (
              i = this._op = this._op || [],
                'all' !== e &&
                  (R(e) &&
                    ((r = {}),
                    f(e, function (t) {
                      return (r[t] = 1)
                    }),
                    (e = r)),
                  (e = (function (t, e) {
                    var i,
                      n,
                      o,
                      s,
                      t = t[0] ? it(t[0]).harness : 0,
                      r = t && t.aliases
                    if (!r) return e
                    for (n in ((i = Nt({}, e)), r))
                      if ((n in i))
                        for (o = (s = r[n].split(',')).length; o--; )
                          i[s[o]] = i[n]
                    return i
                  })(c, e))),
                l = c.length;
              l--;

            )
              if (~d.indexOf(c[l]))
                for (r in ((n = u[l]),
                'all' === e
                  ? ((i[l] = e), (s = n), (o = {}))
                  : ((o = i[l] = i[l] || {}), (s = e)),
                s))
                  (a = n && n[r]) &&
                    (('kill' in a.d && !0 !== a.d.kill(r)) || x(this, a, '_pt'),
                    delete n[r]),
                    'all' !== o && (o[r] = 1)
            this._initted && !this._pt && p && Pt(this)
          }
          return this
        }),
        (o.to = function (t, e, i) {
          return new o(t, e, i)
        }),
        (o.from = function (t, e) {
          return yt(1, arguments)
        }),
        (o.delayedCall = function (t, e, i, n) {
          return new o(e, 0, {
            immediateRender: !1,
            lazy: !1,
            overwrite: !1,
            delay: t,
            onComplete: e,
            onReverseComplete: e,
            onCompleteParams: i,
            onReverseCompleteParams: i,
            callbackScope: n,
          })
        }),
        (o.fromTo = function (t, e, i) {
          return yt(2, arguments)
        }),
        (o.set = function (t, e) {
          return (e.duration = 0), e.repeatDelay || (e.repeat = 0), new o(t, e)
        }),
        (o.killTweensOf = function (t, e, i) {
          return H.killTweensOf(t, e, i)
        }),
        o)
    function o(t, e, i, n) {
      var o
      'number' == typeof e && ((i.duration = e), (e = i), (i = null))
      var s,
        r,
        a,
        l,
        c,
        d,
        u,
        p,
        n = (o = ci.call(this, n ? e : rt(e)) || this).vars,
        f = n.duration,
        h = n.delay,
        m = n.immediateRender,
        g = n.stagger,
        v = n.overwrite,
        y = n.keyframes,
        w = n.defaults,
        _ = n.scrollTrigger,
        b = n.yoyoEase,
        n = e.parent || H,
        T = (P(t) || Te(t) ? Z(t[0]) : 'length' in e) ? [t] : M(t)
      if (
        ((o._targets = T.length
          ? et(T)
          : tt(
              'GSAP target ' + t + ' not found. https://greensock.com',
              !N.nullTargetWarn,
            ) || []),
        (o._ptLookup = []),
        (o._overwrite = v),
        y || g || K(f) || K(h))
      ) {
        if (
          ((e = o.vars),
          (s = o.timeline =
            new z({
              data: 'nested',
              defaults: w || {},
              targets: n && 'nested' === n.data ? n.vars.targets : T,
            })).kill(),
          (s.parent = s._dp = I(o)),
          (s._start = 0),
          g || K(f) || K(h))
        ) {
          if (((l = T.length), (u = g && kt(g)), E(g)))
            for (c in g) ~ui.indexOf(c) && ((p = p || {})[c] = g[c])
          for (r = 0; r < l; r++)
            ((a = st(e, pi)).stagger = 0),
              b && (a.yoyoEase = b),
              p && Nt(a, p),
              (d = T[r]),
              (a.duration = +ri(f, I(o), r, d, T)),
              (a.delay = (+ri(h, I(o), r, d, T) || 0) - o._delay),
              !g &&
                1 === l &&
                a.delay &&
                ((o._delay = h = a.delay), (o._start += h), (a.delay = 0)),
              s.to(d, a, u ? u(r, d, T) : 0),
              (s._ease = $.none)
          s.duration() ? (f = h = 0) : (o.timeline = 0)
        } else if (y) {
          rt(j(s.vars.defaults, { ease: 'none' })),
            (s._ease = Ge(y.ease || e.ease || 'none'))
          var k,
            S,
            x,
            C = 0
          if (P(y))
            y.forEach(function (t) {
              return s.to(T, t, '>')
            }),
              s.duration()
          else {
            for (c in ((a = {}), y))
              'ease' !== c &&
                'easeEach' !== c &&
                (function (t, i, e, n) {
                  var o,
                    s,
                    r = i.ease || n || 'power1.inOut'
                  if (P(i))
                    (s = e[t] || (e[t] = [])),
                      i.forEach(function (t, e) {
                        return s.push({
                          t: (e / (i.length - 1)) * 100,
                          v: t,
                          e: r,
                        })
                      })
                  else
                    for (o in i)
                      (s = e[o] || (e[o] = [])),
                        'ease' !== o &&
                          s.push({ t: parseFloat(t), v: i[o], e: r })
                })(c, y[c], a, y.easeEach)
            for (c in a)
              for (
                k = a[c].sort(function (t, e) {
                  return t.t - e.t
                }),
                  r = C = 0;
                r < k.length;
                r++
              )
                ((x = {
                  ease: (S = k[r]).e,
                  duration: ((S.t - (r ? k[r - 1].t : 0)) / 100) * f,
                })[c] = S.v),
                  s.to(T, x, C),
                  (C += x.duration)
            s.duration() < f && s.to({}, { duration: f - s.duration() })
          }
        }
        f || o.duration((f = s.duration()))
      } else o.timeline = 0
      return (
        !0 !== v || Yt || ((ai = I(o)), H.killTweensOf(T), (ai = 0)),
        A(n, I(o), i),
        e.reversed && o.reverse(),
        e.paused && o.paused(!0),
        (m ||
          (!f &&
            !y &&
            o._start === O(n._time) &&
            L(m) &&
            (function t(e) {
              return !e || (e._ts && t(e.parent))
            })(I(o)) &&
            'nested' !== n.data)) &&
          ((o._tTime = -W), o.render(Math.max(0, -h) || 0)),
        _ && ht(I(o), _),
        o
      )
    }
    function fi(t, e, i) {
      return t.setAttribute(e, i)
    }
    function hi(t, e, i, n) {
      n.mSet(t, e, n.m.call(n.tween, i, n.mt), n)
    }
    j(q.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
      f('staggerTo,staggerFrom,staggerFromTo', function (i) {
        q[i] = function () {
          var t = new z(),
            e = Be.call(arguments, 0)
          return e.splice('staggerFromTo' === i ? 5 : 4, 0, 0), t[i].apply(t, e)
        }
      })
    var mi = function (t, e, i) {
        return (t[e] = i)
      },
      gi = function (t, e, i) {
        return t[e](i)
      },
      vi = function (t, e, i, n) {
        return t[e](n.fp, i)
      },
      yi = function (t, e) {
        return u(t[e]) ? gi : s(t[e]) && t.setAttribute ? fi : mi
      },
      wi = function (t, e) {
        return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e)
      },
      _i = function (t, e) {
        return e.set(e.t, e.p, !!(e.s + e.c * t), e)
      },
      bi = function (t, e) {
        var i = e._pt,
          n = ''
        if (!t && e.b) n = e.b
        else if (1 === t && e.e) n = e.e
        else {
          for (; i; )
            (n =
              i.p +
              (i.m
                ? i.m(i.s + i.c * t)
                : Math.round(1e4 * (i.s + i.c * t)) / 1e4) +
              n),
              (i = i._next)
          n += e.c
        }
        e.set(e.t, e.p, n, e)
      },
      Ti = function (t, e) {
        for (var i = e._pt; i; ) i.r(t, i.d), (i = i._next)
      },
      ki = function (t, e, i, n) {
        for (var o, s = this._pt; s; )
          (o = s._next), s.p === n && s.modifier(t, e, i), (s = o)
      },
      Si = function (t) {
        for (var e, i, n = this._pt; n; )
          (i = n._next),
            (n.p === t && !n.op) || n.op === t
              ? x(this, n, '_pt')
              : n.dep || (e = 1),
            (n = i)
        return !e
      },
      xi = function (t) {
        for (var e, i, n, o, s = t._pt; s; ) {
          for (e = s._next, i = n; i && i.pr > s.pr; ) i = i._next
          ;(s._prev = i ? i._prev : o) ? (s._prev._next = s) : (n = s),
            (s._next = i) ? (i._prev = s) : (o = s),
            (s = e)
        }
        t._pt = n
      },
      Y =
        ((Ci.prototype.modifier = function (t, e, i) {
          ;(this.mSet = this.mSet || this.set),
            (this.set = hi),
            (this.m = t),
            (this.mt = i),
            (this.tween = e)
        }),
        Ci)
    function Ci(t, e, i, n, o, s, r, a, l) {
      ;(this.t = e),
        (this.s = n),
        (this.c = o),
        (this.p = i),
        (this.r = s || wi),
        (this.d = r || this),
        (this.set = a || mi),
        (this.pr = l || 0),
        (this._next = t) && (t._prev = this)
    }
    function Ei(t) {
      ;(Pi[t] || Mi).map(function (t) {
        return t()
      })
    }
    function Oi() {
      var t = Date.now(),
        a = []
      2 < t - $i &&
        (Ei('matchMediaInit'),
        Ai.forEach(function (t) {
          var e,
            i,
            n,
            o,
            s = t.queries,
            r = t.conditions
          for (i in s)
            (e = d.matchMedia(s[i]).matches) && (n = 1),
              e !== r[i] && ((r[i] = e), (o = 1))
          o && (t.revert(), n) && a.push(t)
        }),
        Ei('matchMediaRevert'),
        a.forEach(function (t) {
          return t.onMatch(t)
        }),
        ($i = t),
        Ei('matchMedia'))
    }
    f(
      He +
        'parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger',
      function (t) {
        return (ze[t] = 1)
      },
    ),
      (r.TweenMax = r.TweenLite = q),
      (r.TimelineLite = r.TimelineMax = z),
      (H = new z({
        sortChildren: !1,
        defaults: me,
        autoRemoveChildren: !0,
        id: 'root',
        smoothChildTiming: !0,
      })),
      (N.stringFilter = Dt)
    var Ai = [],
      Pi = {},
      Mi = [],
      $i = 0,
      zi = 0,
      Ii =
        (((e = Li.prototype).add = function (t, n, o) {
          function e() {
            var t,
              e = l,
              i = s.selector
            return (
              e && e !== s && e.data.push(s),
              o && (s.selector = bt(o)),
              (l = s),
              u((t = n.apply(s, arguments))) && s._r.push(t),
              (l = e),
              (s.selector = i),
              (s.isReverted = !1),
              t
            )
          }
          u(t) && ((o = n), (n = t), (t = u))
          var s = this
          return (s.last = e), t === u ? e(s) : t ? (s[t] = e) : e
        }),
        (e.ignore = function (t) {
          var e = l
          ;(l = null), t(this), (l = e)
        }),
        (e.getTweens = function () {
          var e = []
          return (
            this.data.forEach(function (t) {
              return t instanceof Li
                ? e.push.apply(e, t.getTweens())
                : t instanceof q &&
                    !(t.parent && 'nested' === t.parent.data) &&
                    e.push(t)
            }),
            e
          )
        }),
        (e.clear = function () {
          this._r.length = this.data.length = 0
        }),
        (e.kill = function (e, t) {
          var i,
            n = this
          if (
            (e
              ? ((i = this.getTweens()),
                this.data.forEach(function (t) {
                  'isFlip' === t.data &&
                    (t.revert(),
                    t.getChildren(!0, !0, !1).forEach(function (t) {
                      return i.splice(i.indexOf(t), 1)
                    }))
                }),
                i
                  .map(function (t) {
                    return { g: t.globalTime(0), t: t }
                  })
                  .sort(function (t, e) {
                    return e.g - t.g || -1 / 0
                  })
                  .forEach(function (t) {
                    return t.t.revert(e)
                  }),
                this.data.forEach(function (t) {
                  return !(t instanceof q) && t.revert && t.revert(e)
                }),
                this._r.forEach(function (t) {
                  return t(e, n)
                }),
                (this.isReverted = !0))
              : this.data.forEach(function (t) {
                  return t.kill && t.kill()
                }),
            this.clear(),
            t)
          )
            for (var o = Ai.length; o--; )
              Ai[o].id === this.id && Ai.splice(o, 1)
        }),
        (e.revert = function (t) {
          this.kill(t || {})
        }),
        Li)
    function Li(t, e) {
      ;(this.selector = e && bt(e)),
        (this.data = []),
        (this._r = []),
        (this.isReverted = !1),
        (this.id = zi++),
        t && this.add(t)
    }
    ;((e = ji.prototype).add = function (t, e, i) {
      E(t) || (t = { matches: t })
      var n,
        o,
        s,
        r = new Ii(0, i || this.scope),
        a = (r.conditions = {})
      for (o in (l && !r.selector && (r.selector = l.selector),
      this.contexts.push(r),
      (e = r.add('onMatch', e)),
      (r.queries = t)))
        'all' === o
          ? (s = 1)
          : (n = d.matchMedia(t[o])) &&
            (Ai.indexOf(r) < 0 && Ai.push(r),
            (a[o] = n.matches) && (s = 1),
            n.addListener
              ? n.addListener(Oi)
              : n.addEventListener('change', Oi))
      return s && e(r), this
    }),
      (e.revert = function (t) {
        this.kill(t || {})
      }),
      (e.kill = function (e) {
        this.contexts.forEach(function (t) {
          return t.kill(e, !0)
        })
      })
    var Di = ji
    function ji(t) {
      ;(this.contexts = []), (this.scope = t)
    }
    var Fi = {
      registerPlugin: function () {
        for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
          e[i] = arguments[i]
        e.forEach(Mt)
      },
      timeline: function (t) {
        return new z(t)
      },
      getTweensOf: function (t, e) {
        return H.getTweensOf(t, e)
      },
      getProperty: function (n, t, e, i) {
        var o = it((n = R(n) ? M(n)[0] : n) || {}).get,
          s = e ? T : _
        return (
          'native' === e && (e = ''),
          n &&
            (t
              ? s(((Q[t] && Q[t].get) || o)(n, t, e, i))
              : function (t, e, i) {
                  return s(((Q[t] && Q[t].get) || o)(n, t, e, i))
                })
        )
      },
      quickSetter: function (i, e, n) {
        var o, s
        if (1 < (i = M(i)).length)
          return (
            (o = i.map(function (t) {
              return m.quickSetter(t, e, n)
            })),
            (s = o.length),
            function (t) {
              for (var e = s; e--; ) o[e](t)
            }
          )
        i = i[0] || {}
        var r = Q[e],
          a = it(i),
          l = (a.harness && (a.harness.aliases || {})[e]) || e,
          c = r
            ? function (t) {
                var e = new r()
                ;(Ri._pt = 0),
                  e.init(i, n ? t + n : t, Ri, 0, [i]),
                  e.render(1, e),
                  Ri._pt && Ti(1, Ri)
              }
            : a.set(i, l)
        return r
          ? c
          : function (t) {
              return c(i, l, n ? t + n : t, a, 1)
            }
      },
      quickTo: function (t, n, e) {
        function i(t, e, i) {
          return o.resetTo(n, t, e, i)
        }
        var o = m.to(
          t,
          Nt((((t = {})[n] = '+=0.1'), (t.paused = !0), t), e || {}),
        )
        return (i.tween = o), i
      },
      isTweening: function (t) {
        return 0 < H.getTweensOf(t, !0).length
      },
      defaults: function (t) {
        return t && t.ease && (t.ease = Ge(t.ease, me.ease)), k(me, t || {})
      },
      config: function (t) {
        return k(N, t || {})
      },
      registerEffect: function (t) {
        var n = t.name,
          o = t.effect,
          e = t.plugins,
          s = t.defaults,
          t = t.extendTimeline
        ;(e || '').split(',').forEach(function (t) {
          return (
            t && !Q[t] && !r[t] && tt(n + ' effect requires ' + t + ' plugin.')
          )
        }),
          (De[n] = function (t, e, i) {
            return o(M(t), j(e || {}, s), i)
          }),
          t &&
            (z.prototype[n] = function (t, e, i) {
              return this.add(De[n](t, E(e) ? e : (i = e) && {}, this), i)
            })
      },
      registerEase: function (t, e) {
        $[t] = Ge(e)
      },
      parseEase: function (t, e) {
        return arguments.length ? Ge(t, e) : $
      },
      getById: function (t) {
        return H.getById(t)
      },
      exportRoot: function (t, e) {
        var i,
          n,
          o = new z((t = void 0 === t ? {} : t))
        for (
          o.smoothChildTiming = L(t.smoothChildTiming),
            H.remove(o),
            o._dp = 0,
            o._time = o._tTime = H._time,
            i = H._first;
          i;

        )
          (n = i._next),
            (!e &&
              !i._dur &&
              i instanceof q &&
              i.vars.onComplete === i._targets[0]) ||
              A(o, i, i._start - i._delay),
            (i = n)
        return A(H, o, 0), o
      },
      context: function (t, e) {
        return t ? new Ii(t, e) : l
      },
      matchMedia: function (t) {
        return new Di(t)
      },
      matchMediaRefresh: function () {
        return (
          Ai.forEach(function (t) {
            var e,
              i,
              n = t.conditions
            for (i in n) n[i] && ((n[i] = !1), (e = 1))
            e && t.revert()
          }) || Oi()
        )
      },
      addEventListener: function (t, e) {
        t = Pi[t] || (Pi[t] = [])
        ~t.indexOf(e) || t.push(e)
      },
      removeEventListener: function (t, e) {
        ;(t = Pi[t]), (e = t && t.indexOf(e))
        0 <= e && t.splice(e, 1)
      },
      utils: {
        wrap: function t(e, i, n) {
          var o = i - e
          return P(e)
            ? Et(e, t(0, e.length), i)
            : wt(n, function (t) {
                return ((o + ((t - e) % o)) % o) + e
              })
        },
        wrapYoyo: function t(e, i, n) {
          var o = i - e,
            s = 2 * o
          return P(e)
            ? Et(e, t(0, e.length - 1), i)
            : wt(n, function (t) {
                return e + (o < (t = (s + ((t - e) % s)) % s || 0) ? s - t : t)
              })
        },
        distribute: kt,
        random: Ct,
        snap: xt,
        normalize: function (t, e, i) {
          return qt(t, e, 0, 1, i)
        },
        getUnit: B,
        clamp: function (e, i, t) {
          return wt(t, function (t) {
            return Qt(e, i, t)
          })
        },
        splitColor: zt,
        toArray: M,
        selector: bt,
        mapRange: qt,
        pipe: function () {
          for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
            e[i] = arguments[i]
          return function (t) {
            return e.reduce(function (t, e) {
              return e(t)
            }, t)
          }
        },
        unitize: function (e, i) {
          return function (t) {
            return e(parseFloat(t)) + (i || B(t))
          }
        },
        interpolate: function t(e, i, n, o) {
          var s = isNaN(e + i)
            ? 0
            : function (t) {
                return (1 - t) * e + t * i
              }
          if (!s) {
            var r,
              a,
              l,
              c,
              d,
              u = R(e),
              p = {}
            if ((!0 === n && ((o = 1), (n = null)), u))
              (e = { p: e }), (i = { p: i })
            else if (P(e) && !P(i)) {
              for (l = [], c = e.length, d = c - 2, a = 1; a < c; a++)
                l.push(t(e[a - 1], e[a]))
              c--,
                (s = function (t) {
                  t *= c
                  var e = Math.min(d, ~~t)
                  return l[e](t - e)
                }),
                (n = i)
            } else o || (e = Nt(P(e) ? [] : {}, e))
            if (!l) {
              for (r in i) di.call(p, e, r, 'get', i[r])
              s = function (t) {
                return Ti(t, p) || (u ? e.p : e)
              }
            }
          }
          return wt(n, s)
        },
        shuffle: Tt,
      },
      install: n,
      effects: De,
      ticker: h,
      updateRoot: z.updateRoot,
      plugins: Q,
      globalTimeline: H,
      core: {
        PropTween: Y,
        globals: g,
        Tween: q,
        Timeline: z,
        Animation: ti,
        getCache: it,
        _removeLinkedListItem: x,
        reverting: function () {
          return F
        },
        context: function (t) {
          return t && l && (l.data.push(t), (t._ctx = l)), l
        },
        suppressOverwrites: function (t) {
          return (Yt = t)
        },
      },
    }
    function Hi(t, d) {
      return {
        name: t,
        rawVars: 1,
        init: function (t, c, e) {
          e._onInit = function (t) {
            var e, i
            if (
              (R(c) &&
                ((e = {}),
                f(c, function (t) {
                  return (e[t] = 1)
                }),
                (c = e)),
              d)
            ) {
              for (i in ((e = {}), c)) e[i] = d(c[i])
              c = e
            }
            var n,
              o,
              s,
              r = t,
              a = c,
              l = r._targets
            for (n in a)
              for (o = l.length; o--; )
                (s = (s = r._ptLookup[o][n]) && s.d) &&
                  (s._pt &&
                    (s = (function (t, e) {
                      for (
                        var i = t._pt;
                        i && i.p !== e && i.op !== e && i.fp !== e;

                      )
                        i = i._next
                      return i
                    })(s, n)),
                  s) &&
                  s.modifier &&
                  s.modifier(a[n], r, l[o], n)
          }
        },
      }
    }
    f('to,from,fromTo,delayedCall,set,killTweensOf', function (t) {
      return (Fi[t] = q[t])
    }),
      h.add(z.updateRoot)
    var Ri = Fi.to({}, { duration: 0 }),
      m =
        Fi.registerPlugin(
          {
            name: 'attr',
            init: function (t, e, i, n, o) {
              var s, r, a
              for (s in ((this.tween = i), e))
                (a = t.getAttribute(s) || ''),
                  ((r = this.add(
                    t,
                    'setAttribute',
                    (a || 0) + '',
                    e[s],
                    n,
                    o,
                    0,
                    0,
                    s,
                  )).op = s),
                  (r.b = a),
                  this._props.push(s)
            },
            render: function (t, e) {
              for (var i = e._pt; i; )
                F ? i.set(i.t, i.p, i.b, i) : i.r(t, i.d), (i = i._next)
            },
          },
          {
            name: 'endArray',
            init: function (t, e) {
              for (var i = e.length; i--; )
                this.add(t, i, t[i] || 0, e[i], 0, 0, 0, 0, 0, 1)
            },
          },
          Hi('roundProps', St),
          Hi('modifiers'),
          Hi('snap', xt),
        ) || Fi
    function Bi(t, e) {
      return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
    }
    function Ni(t, e) {
      return e.set(
        e.t,
        e.p,
        1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
        e,
      )
    }
    function Vi(t, e) {
      return e.set(
        e.t,
        e.p,
        t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
        e,
      )
    }
    function Wi(t, e) {
      t = e.s + e.c * t
      e.set(e.t, e.p, ~~(t + (t < 0 ? -0.5 : 0.5)) + e.u, e)
    }
    function Qi(t, e) {
      return e.set(e.t, e.p, t ? e.e : e.b, e)
    }
    function qi(t, e) {
      return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e)
    }
    function Yi(t, e, i) {
      return (t.style[e] = i)
    }
    function Ui(t, e, i) {
      return t.style.setProperty(e, i)
    }
    function Xi(t, e, i) {
      return (t._gsap[e] = i)
    }
    function Gi(t, e, i) {
      return (t._gsap.scaleX = t._gsap.scaleY = i)
    }
    function Zi(t, e, i, n, o) {
      t = t._gsap
      ;(t.scaleX = t.scaleY = i), t.renderTransform(o, t)
    }
    function Ki(t, e, i, n, o) {
      t = t._gsap
      ;(t[e] = i), t.renderTransform(o, t)
    }
    function Ji(t, e) {
      var i = this,
        n = this.target,
        o = n.style
      if (t in Qn && o) {
        if (((this.tfm = this.tfm || {}), 'transform' === t))
          return Kn.transform.split(',').forEach(function (t) {
            return Ji.call(i, t, e)
          })
        if (
          (~(t = Kn[t] || t).indexOf(',')
            ? t.split(',').forEach(function (t) {
                return (i.tfm[t] = no(n, t))
              })
            : (this.tfm[t] = n._gsap.x ? n._gsap[t] : no(n, t)),
          0 <= this.props.indexOf(X))
        )
          return
        n._gsap.svg &&
          ((this.svgo = n.getAttribute('data-svg-origin')),
          this.props.push(G, e, '')),
          (t = X)
      }
      ;(o || e) && this.props.push(t, e, o[t])
    }
    function tn(t) {
      t.translate &&
        (t.removeProperty('translate'),
        t.removeProperty('scale'),
        t.removeProperty('rotate'))
    }
    function en() {
      for (
        var t, e = this.props, i = this.target, n = i.style, o = i._gsap, s = 0;
        s < e.length;
        s += 3
      )
        e[s + 1]
          ? (i[e[s]] = e[s + 2])
          : e[s + 2]
            ? (n[e[s]] = e[s + 2])
            : n.removeProperty(
                '--' === e[s].substr(0, 2)
                  ? e[s]
                  : e[s].replace(Xn, '-$1').toLowerCase(),
              )
      if (this.tfm) {
        for (t in this.tfm) o[t] = this.tfm[t]
        o.svg &&
          (o.renderTransform(),
          i.setAttribute('data-svg-origin', this.svgo || '')),
          ((s = Cn()) && s.isStart) || n[X] || (tn(n), (o.uncache = 1))
      }
    }
    function nn(t, e) {
      var i = { target: t, props: [], revert: en, save: Ji }
      return (
        t._gsap || m.core.getCache(t),
        e &&
          e.split(',').forEach(function (t) {
            return i.save(t)
          }),
        i
      )
    }
    function on(t, e) {
      e = bn.createElementNS
        ? bn.createElementNS(
            (e || 'http://www.w3.org/1999/xhtml').replace(/^https/, 'http'),
            t,
          )
        : bn.createElement(t)
      return e.style ? e : bn.createElement(t)
    }
    function U(t, e, i) {
      var n = getComputedStyle(t)
      return (
        n[e] ||
        n.getPropertyValue(e.replace(Xn, '-$1').toLowerCase()) ||
        n.getPropertyValue(e) ||
        (!i && U(t, to(e) || e, 1)) ||
        ''
      )
    }
    function sn() {
      'undefined' != typeof window &&
        window.document &&
        ((Tn = (bn = window.document).documentElement),
        (Sn = on('div') || { style: {} }),
        on('div'),
        (X = to(X)),
        (G = X + 'Origin'),
        (Sn.style.cssText =
          'border-width:0;line-height:0;position:absolute;padding:0'),
        (En = !!to('perspective')),
        (Cn = m.core.reverting),
        (kn = 1))
    }
    function rn(t) {
      var e,
        i = on(
          'svg',
          (this.ownerSVGElement &&
            this.ownerSVGElement.getAttribute('xmlns')) ||
            'http://www.w3.org/2000/svg',
        ),
        n = this.parentNode,
        o = this.nextSibling,
        s = this.style.cssText
      if (
        (Tn.appendChild(i),
        i.appendChild(this),
        (this.style.display = 'block'),
        t)
      )
        try {
          ;(e = this.getBBox()),
            (this._gsapBBox = this.getBBox),
            (this.getBBox = rn)
        } catch (t) {}
      else this._gsapBBox && (e = this._gsapBBox())
      return (
        n && (o ? n.insertBefore(this, o) : n.appendChild(this)),
        Tn.removeChild(i),
        (this.style.cssText = s),
        e
      )
    }
    function an(t, e) {
      for (var i = e.length; i--; )
        if (t.hasAttribute(e[i])) return t.getAttribute(e[i])
    }
    function ln(e) {
      var i
      try {
        i = e.getBBox()
      } catch (t) {
        i = rn.call(e, !0)
      }
      return !(i =
        (i && (i.width || i.height)) || e.getBBox === rn
          ? i
          : rn.call(e, !0)) ||
        i.width ||
        i.x ||
        i.y
        ? i
        : {
            x: +an(e, ['x', 'cx', 'x1']) || 0,
            y: +an(e, ['y', 'cy', 'y1']) || 0,
            width: 0,
            height: 0,
          }
    }
    function cn(t) {
      return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !ln(t))
    }
    function dn(t, e) {
      e &&
        ((t = t.style),
        e in Qn && e !== G && (e = X),
        t.removeProperty
          ? (('ms' !== e.substr(0, 2) && 'webkit' !== e.substr(0, 6)) ||
              (e = '-' + e),
            t.removeProperty(e.replace(Xn, '-$1').toLowerCase()))
          : t.removeAttribute(e))
    }
    function un(t, e, i, n, o, s) {
      e = new Y(t._pt, e, i, 0, 1, s ? qi : Qi)
      ;((t._pt = e).b = n), (e.e = o), t._props.push(i)
    }
    function pn(t, e, i, n) {
      var o,
        s = parseFloat(i) || 0,
        r = (i + '').trim().substr((s + '').length) || 'px',
        a = Sn.style,
        l = Gn.test(e),
        c = 'svg' === t.tagName.toLowerCase(),
        d = (c ? 'client' : 'offset') + (l ? 'Width' : 'Height'),
        u = 'px' === n,
        p = '%' === n
      return n === r || !s || eo[n] || eo[r]
        ? s
        : ('px' === r || u || (s = pn(t, e, i, 'px')),
          (i = t.getCTM && cn(t)),
          (!p && '%' !== r) || (!Qn[e] && !~e.indexOf('adius'))
            ? ((a[l ? 'width' : 'height'] = 100 + (u ? r : n)),
              (e =
                ~e.indexOf('adius') || ('em' === n && t.appendChild && !c)
                  ? t
                  : t.parentNode),
              (n = (e =
                (e = i ? (t.ownerSVGElement || {}).parentNode : e) &&
                e !== bn &&
                e.appendChild
                  ? e
                  : bn.body)._gsap) &&
              p &&
              n.width &&
              l &&
              n.time === h.time &&
              !n.uncache
                ? D((s / n.width) * 100)
                : ((!p && '%' !== r) ||
                    io[U(e, 'display')] ||
                    (a.position = U(t, 'position')),
                  e === t && (a.position = 'static'),
                  e.appendChild(Sn),
                  (o = Sn[d]),
                  e.removeChild(Sn),
                  (a.position = 'absolute'),
                  l && p && (((n = it(e)).time = h.time), (n.width = e[d])),
                  D(u ? (o * s) / 100 : o && s ? (100 / o) * s : 0)))
            : ((o = i ? t.getBBox()[l ? 'width' : 'height'] : t[d]),
              D(p ? (s / o) * 100 : (s / 100) * o)))
    }
    function fn(t, e, i, n) {
      var o
      ;(i && 'none' !== i) ||
        ((o = (s = to(e, t, 1)) && U(t, s, 1)) && o !== i
          ? ((e = s), (i = o))
          : 'borderColor' === e && (i = U(t, 'borderTopColor')))
      var s,
        r,
        a,
        l,
        c,
        d,
        u,
        p,
        f,
        h = new Y(this._pt, t.style, e, 0, 1, bi),
        m = 0,
        g = 0
      if (
        ((h.b = i),
        (h.e = n),
        (i += ''),
        'auto' == (n += '') &&
          ((t.style[e] = n), (n = U(t, e) || n), (t.style[e] = i)),
        Dt((s = [i, n])),
        (n = s[1]),
        (r = (i = s[0]).match(xe) || []),
        (n.match(xe) || []).length)
      ) {
        for (; (u = xe.exec(n)); )
          (p = u[0]),
            (u = n.substring(m, u.index)),
            l
              ? (l = (l + 1) % 5)
              : ('rgba(' !== u.substr(-5) && 'hsla(' !== u.substr(-5)) ||
                (l = 1),
            p !== (c = r[g++] || '') &&
              ((a = parseFloat(c) || 0),
              (f = c.substr((a + '').length)),
              '=' === p.charAt(1) && (p = nt(a, p) + f),
              (d = parseFloat(p)),
              (p = p.substr((d + '').length)),
              (m = xe.lastIndex - p.length),
              p ||
                ((p = p || N.units[e] || f),
                m === n.length && ((n += p), (h.e += p))),
              f !== p && (a = pn(t, e, c, p) || 0),
              (h._pt = {
                _next: h._pt,
                p: u || 1 === g ? u : ',',
                s: a,
                c: d - a,
                m: (l && l < 4) || 'zIndex' === e ? Math.round : 0,
              }))
        h.c = m < n.length ? n.substring(m, n.length) : ''
      } else h.r = 'display' === e && 'none' === n ? qi : Qi
      return Ee.test(n) && (h.e = 0), (this._pt = h)
    }
    function hn(t, e) {
      if (e.tween && e.tween._time === e.tween._dur) {
        var i,
          n,
          o,
          s = e.t,
          r = s.style,
          a = e.u,
          e = s._gsap
        if ('all' === a || !0 === a) (r.cssText = ''), (n = 1)
        else
          for (o = (a = a.split(',')).length; -1 < --o; )
            (i = a[o]),
              Qn[i] && ((n = 1), (i = 'transformOrigin' === i ? G : X)),
              dn(s, i)
        n &&
          (dn(s, X), e) &&
          (e.svg && s.removeAttribute('transform'),
          lo(s, 1),
          (e.uncache = 1),
          tn(r))
      }
    }
    function mn(t) {
      return 'matrix(1, 0, 0, 1, 0, 0)' === t || 'none' === t || !t
    }
    function gn(t) {
      t = U(t, X)
      return mn(t) ? ro : t.substr(7).match(Se).map(D)
    }
    function vn(t, e) {
      var i,
        n,
        o,
        s = t._gsap || it(t),
        r = t.style,
        a = gn(t)
      return s.svg && t.getAttribute('transform')
        ? '1,0,0,1,0,0' ===
          (a = [
            (n = t.transform.baseVal.consolidate().matrix).a,
            n.b,
            n.c,
            n.d,
            n.e,
            n.f,
          ]).join(',')
          ? ro
          : a
        : (a !== ro ||
            t.offsetParent ||
            t === Tn ||
            s.svg ||
            ((n = r.display),
            (r.display = 'block'),
            ((s = t.parentNode) && t.offsetParent) ||
              ((o = 1), (i = t.nextElementSibling), Tn.appendChild(t)),
            (a = gn(t)),
            n ? (r.display = n) : dn(t, 'display'),
            o &&
              (i
                ? s.insertBefore(t, i)
                : s
                  ? s.appendChild(t)
                  : Tn.removeChild(t))),
          e && 6 < a.length ? [a[0], a[1], a[4], a[5], a[12], a[13]] : a)
    }
    function yn(t, e, i, n, o, s) {
      var r,
        a = t._gsap,
        o = o || vn(t, !0),
        l = a.xOrigin || 0,
        c = a.yOrigin || 0,
        d = a.xOffset || 0,
        u = a.yOffset || 0,
        p = o[0],
        f = o[1],
        h = o[2],
        m = o[3],
        g = o[4],
        v = o[5],
        y = e.split(' '),
        w = parseFloat(y[0]) || 0,
        _ = parseFloat(y[1]) || 0
      i
        ? o !== ro &&
          (o = p * m - f * h) &&
          ((r = w * (-f / o) + _ * (p / o) - (p * v - f * g) / o),
          (w = w * (m / o) + _ * (-h / o) + (h * v - m * g) / o),
          (_ = r))
        : ((w = (o = ln(t)).x + (~y[0].indexOf('%') ? (w / 100) * o.width : w)),
          (_ =
            o.y + (~(y[1] || y[0]).indexOf('%') ? (_ / 100) * o.height : _))),
        n || (!1 !== n && a.smooth)
          ? ((a.xOffset = d + ((g = w - l) * p + (v = _ - c) * h) - g),
            (a.yOffset = u + (g * f + v * m) - v))
          : (a.xOffset = a.yOffset = 0),
        (a.xOrigin = w),
        (a.yOrigin = _),
        (a.smooth = !!n),
        (a.origin = e),
        (a.originIsAbsolute = !!i),
        (t.style[G] = '0px 0px'),
        s &&
          (un(s, a, 'xOrigin', l, w),
          un(s, a, 'yOrigin', c, _),
          un(s, a, 'xOffset', d, a.xOffset),
          un(s, a, 'yOffset', u, a.yOffset)),
        t.setAttribute('data-svg-origin', w + ' ' + _)
    }
    function wn(t, e, i) {
      var n = B(e)
      return D(parseFloat(e) + parseFloat(pn(t, 'x', i + 'px', n))) + n
    }
    function _n(t, e) {
      for (var i in e) t[i] = e[i]
      return t
    }
    ;(q.version = z.version = m.version = '3.12.2'), (Zt = 1), a() && qe()
    var bn,
      Tn,
      kn,
      Sn,
      xn,
      Cn,
      En,
      e = $.Power0,
      On = $.Power1,
      An = $.Power2,
      Pn = $.Power3,
      Mn = $.Power4,
      $n = $.Linear,
      zn = $.Quad,
      In = $.Cubic,
      Ln = $.Quart,
      Dn = $.Quint,
      jn = $.Strong,
      Fn = $.Elastic,
      Hn = $.Back,
      Rn = $.SteppedEase,
      Bn = $.Bounce,
      Nn = $.Sine,
      Vn = $.Expo,
      Wn = $.Circ,
      Qn = {},
      qn = 180 / Math.PI,
      Yn = Math.PI / 180,
      Un = Math.atan2,
      Xn = /([A-Z])/g,
      Gn = /(left|right|width|margin|padding|x)/i,
      Zn = /[\s,\(]\S/,
      Kn = {
        autoAlpha: 'opacity,visibility',
        scale: 'scaleX,scaleY',
        alpha: 'opacity',
      },
      X = 'transform',
      G = X + 'Origin',
      Jn = 'O,Moz,ms,Ms,Webkit'.split(','),
      to = function (t, e, i) {
        var n = (e || Sn).style,
          o = 5
        if (t in n && !i) return t
        for (
          t = t.charAt(0).toUpperCase() + t.substr(1);
          o-- && !(Jn[o] + t in n);

        );
        return o < 0 ? null : (3 === o ? 'ms' : 0 <= o ? Jn[o] : '') + t
      },
      eo = { deg: 1, rad: 1, turn: 1 },
      io = { grid: 1, flex: 1 },
      no = function (t, e, i, n) {
        var o
        return (
          kn || sn(),
          e in Kn &&
            'transform' !== e &&
            ~(e = Kn[e]).indexOf(',') &&
            (e = e.split(',')[0]),
          Qn[e] && 'transform' !== e
            ? ((o = lo(t, n)),
              (o =
                'transformOrigin' !== e
                  ? o[e]
                  : o.svg
                    ? o.origin
                    : co(U(t, G)) + ' ' + o.zOrigin + 'px'))
            : ((o = t.style[e]) &&
                'auto' !== o &&
                !n &&
                !~(o + '').indexOf('calc(')) ||
              (o =
                (so[e] && so[e](t, e, i)) ||
                U(t, e) ||
                y(t, e) ||
                ('opacity' === e ? 1 : 0)),
          i && !~(o + '').trim().indexOf(' ') ? pn(t, e, o, i) + i : o
        )
      },
      oo = {
        top: '0%',
        bottom: '100%',
        left: '0%',
        right: '100%',
        center: '50%',
      },
      so = {
        clearProps: function (t, e, i, n, o) {
          if ('isFromStart' !== o.data)
            return (
              ((e = t._pt = new Y(t._pt, e, i, 0, 0, hn)).u = n),
              (e.pr = -10),
              (e.tween = o),
              t._props.push(i),
              1
            )
        },
      },
      ro = [1, 0, 0, 1, 0, 0],
      ao = {},
      lo = function (t, e) {
        var i,
          n,
          o,
          s,
          r,
          a,
          l,
          c,
          d,
          u,
          p,
          f,
          h,
          m,
          g,
          v,
          y,
          w,
          _,
          b,
          T,
          k,
          S,
          x,
          C,
          E,
          O,
          A,
          P,
          M,
          $,
          z,
          I = t._gsap || new Je(t)
        return (
          ('x' in I && !e && !I.uncache) ||
            ((E = t.style),
            (O = I.scaleX < 0),
            (A = 'deg'),
            (P = getComputedStyle(t)),
            (M = U(t, G) || '0'),
            ($ = i = n = s = r = a = l = c = 0),
            (z = o = 1),
            (I.svg = !(!t.getCTM || !cn(t))),
            P.translate &&
              (('none' === P.translate &&
                'none' === P.scale &&
                'none' === P.rotate) ||
                (E[X] =
                  ('none' !== P.translate
                    ? 'translate3d(' +
                      (P.translate + ' 0 0').split(' ').slice(0, 3).join(', ') +
                      ') '
                    : '') +
                  ('none' !== P.rotate ? 'rotate(' + P.rotate + ') ' : '') +
                  ('none' !== P.scale
                    ? 'scale(' + P.scale.split(' ').join(',') + ') '
                    : '') +
                  ('none' !== P[X] ? P[X] : '')),
              (E.scale = E.rotate = E.translate = 'none')),
            (P = vn(t, I.svg)),
            I.svg &&
              ((y = I.uncache
                ? ((w = t.getBBox()),
                  (M = I.xOrigin - w.x + 'px ' + (I.yOrigin - w.y) + 'px'),
                  '')
                : !e && t.getAttribute('data-svg-origin')),
              yn(t, y || M, !!y || I.originIsAbsolute, !1 !== I.smooth, P)),
            (C = I.xOrigin || 0),
            (S = I.yOrigin || 0),
            P !== ro &&
              ((p = P[0]),
              (f = P[1]),
              (h = P[2]),
              (m = P[3]),
              ($ = g = P[4]),
              (i = v = P[5]),
              6 === P.length
                ? ((z = Math.sqrt(p * p + f * f)),
                  (o = Math.sqrt(m * m + h * h)),
                  (s = p || f ? Un(f, p) * qn : 0),
                  (l = h || m ? Un(h, m) * qn + s : 0) &&
                    (o *= Math.abs(Math.cos(l * Yn))),
                  I.svg &&
                    (($ -= C - (C * p + S * h)), (i -= S - (C * f + S * m))))
                : ((C = P[6]),
                  (S = P[7]),
                  (b = P[8]),
                  (T = P[9]),
                  (k = P[10]),
                  (x = P[11]),
                  ($ = P[12]),
                  (i = P[13]),
                  (n = P[14]),
                  (r = (P = Un(C, k)) * qn),
                  P &&
                    ((y = g * (d = Math.cos(-P)) + b * (u = Math.sin(-P))),
                    (w = v * d + T * u),
                    (_ = C * d + k * u),
                    (b = g * -u + b * d),
                    (T = v * -u + T * d),
                    (k = C * -u + k * d),
                    (x = S * -u + x * d),
                    (g = y),
                    (v = w),
                    (C = _)),
                  (a = (P = Un(-h, k)) * qn),
                  P &&
                    ((d = Math.cos(-P)),
                    (x = m * (u = Math.sin(-P)) + x * d),
                    (p = y = p * d - b * u),
                    (f = w = f * d - T * u),
                    (h = _ = h * d - k * u)),
                  (s = (P = Un(f, p)) * qn),
                  P &&
                    ((y = p * (d = Math.cos(P)) + f * (u = Math.sin(P))),
                    (w = g * d + v * u),
                    (f = f * d - p * u),
                    (v = v * d - g * u),
                    (p = y),
                    (g = w)),
                  r &&
                    359.9 < Math.abs(r) + Math.abs(s) &&
                    ((r = s = 0), (a = 180 - a)),
                  (z = D(Math.sqrt(p * p + f * f + h * h))),
                  (o = D(Math.sqrt(v * v + C * C))),
                  (P = Un(g, v)),
                  (l = 2e-4 < Math.abs(P) ? P * qn : 0),
                  (c = x ? 1 / (x < 0 ? -x : x) : 0)),
              I.svg) &&
              ((y = t.getAttribute('transform')),
              (I.forceCSS = t.setAttribute('transform', '') || !mn(U(t, X))),
              y) &&
              t.setAttribute('transform', y),
            90 < Math.abs(l) &&
              Math.abs(l) < 270 &&
              (O
                ? ((z *= -1),
                  (l += s <= 0 ? 180 : -180),
                  (s += s <= 0 ? 180 : -180))
                : ((o *= -1), (l += l <= 0 ? 180 : -180))),
            (e = e || I.uncache),
            (I.x =
              $ -
              ((I.xPercent =
                $ &&
                ((!e && I.xPercent) ||
                  (Math.round(t.offsetWidth / 2) === Math.round(-$) ? -50 : 0)))
                ? (t.offsetWidth * I.xPercent) / 100
                : 0) +
              'px'),
            (I.y =
              i -
              ((I.yPercent =
                i &&
                ((!e && I.yPercent) ||
                  (Math.round(t.offsetHeight / 2) === Math.round(-i)
                    ? -50
                    : 0)))
                ? (t.offsetHeight * I.yPercent) / 100
                : 0) +
              'px'),
            (I.z = n + 'px'),
            (I.scaleX = D(z)),
            (I.scaleY = D(o)),
            (I.rotation = D(s) + A),
            (I.rotationX = D(r) + A),
            (I.rotationY = D(a) + A),
            (I.skewX = l + A),
            (I.skewY = 0 + A),
            (I.transformPerspective = c + 'px'),
            (I.zOrigin = parseFloat(M.split(' ')[2]) || 0) && (E[G] = co(M)),
            (I.xOffset = I.yOffset = 0),
            (I.force3D = N.force3D),
            (I.renderTransform = I.svg ? go : En ? mo : uo),
            (I.uncache = 0)),
          I
        )
      },
      co = function (t) {
        return (t = t.split(' '))[0] + ' ' + t[1]
      },
      uo = function (t, e) {
        ;(e.z = '0px'),
          (e.rotationY = e.rotationX = '0deg'),
          (e.force3D = 0),
          mo(t, e)
      },
      po = '0deg',
      fo = '0px',
      ho = ') ',
      mo = function (t, e) {
        var i,
          n,
          e = e || this,
          o = e.xPercent,
          s = e.yPercent,
          r = e.x,
          a = e.y,
          l = e.z,
          c = e.rotation,
          d = e.rotationY,
          u = e.rotationX,
          p = e.skewX,
          f = e.skewY,
          h = e.scaleX,
          m = e.scaleY,
          g = e.transformPerspective,
          v = e.force3D,
          y = e.target,
          e = e.zOrigin,
          w = '',
          t = ('auto' === v && t && 1 !== t) || !0 === v
        !e ||
          (u === po && d === po) ||
          ((v = parseFloat(d) * Yn),
          (n = Math.sin(v)),
          (i = Math.cos(v)),
          (v = parseFloat(u) * Yn),
          (r = wn(y, r, n * (n = Math.cos(v)) * -e)),
          (a = wn(y, a, -Math.sin(v) * -e)),
          (l = wn(y, l, i * n * -e + e))),
          g !== fo && (w += 'perspective(' + g + ho),
          (o || s) && (w += 'translate(' + o + '%, ' + s + '%) '),
          (!t && r === fo && a === fo && l === fo) ||
            (w +=
              l !== fo || t
                ? 'translate3d(' + r + ', ' + a + ', ' + l + ') '
                : 'translate(' + r + ', ' + a + ho),
          c !== po && (w += 'rotate(' + c + ho),
          d !== po && (w += 'rotateY(' + d + ho),
          u !== po && (w += 'rotateX(' + u + ho),
          (p === po && f === po) || (w += 'skew(' + p + ', ' + f + ho),
          (1 === h && 1 === m) || (w += 'scale(' + h + ', ' + m + ho),
          (y.style[X] = w || 'translate(0, 0)')
      },
      go = function (t, e) {
        var i,
          n,
          o,
          s,
          r,
          e = e || this,
          a = e.xPercent,
          l = e.yPercent,
          c = e.x,
          d = e.y,
          u = e.rotation,
          p = e.skewX,
          f = e.skewY,
          h = e.scaleX,
          m = e.scaleY,
          g = e.target,
          v = e.xOrigin,
          y = e.yOrigin,
          w = e.xOffset,
          _ = e.yOffset,
          e = e.forceCSS,
          b = parseFloat(c),
          T = parseFloat(d),
          u = parseFloat(u),
          p = parseFloat(p)
        ;(f = parseFloat(f)) && ((p += f = parseFloat(f)), (u += f)),
          u || p
            ? ((u *= Yn),
              (p *= Yn),
              (i = Math.cos(u) * h),
              (n = Math.sin(u) * h),
              (o = Math.sin(u - p) * -m),
              (s = Math.cos(u - p) * m),
              p &&
                ((f *= Yn),
                (r = Math.tan(p - f)),
                (o *= r = Math.sqrt(1 + r * r)),
                (s *= r),
                f) &&
                ((r = Math.tan(f)), (i *= r = Math.sqrt(1 + r * r)), (n *= r)),
              (i = D(i)),
              (n = D(n)),
              (o = D(o)),
              (s = D(s)))
            : ((i = h), (s = m), (n = o = 0)),
          ((b && !~(c + '').indexOf('px')) ||
            (T && !~(d + '').indexOf('px'))) &&
            ((b = pn(g, 'x', c, 'px')), (T = pn(g, 'y', d, 'px'))),
          (v || y || w || _) &&
            ((b = D(b + v - (v * i + y * o) + w)),
            (T = D(T + y - (v * n + y * s) + _))),
          (a || l) &&
            ((b = D(b + (a / 100) * (r = g.getBBox()).width)),
            (T = D(T + (l / 100) * r.height))),
          g.setAttribute(
            'transform',
            (r =
              'matrix(' +
              i +
              ',' +
              n +
              ',' +
              o +
              ',' +
              s +
              ',' +
              b +
              ',' +
              T +
              ')'),
          ),
          e && (g.style[X] = r)
      }
    f('padding,margin,Width,Radius', function (e, i) {
      var t = 'Right',
        n = 'Bottom',
        o = 'Left',
        a = (
          i < 3 ? ['Top', t, n, o] : ['Top' + o, 'Top' + t, n + t, n + o]
        ).map(function (t) {
          return i < 2 ? e + t : 'border' + t + e
        })
      so[1 < i ? 'border' + e : e] = function (e, t, i, n, o) {
        var s, r
        if (arguments.length < 4)
          return (
            (s = a.map(function (t) {
              return no(e, t, i)
            })),
            5 === (r = s.join(' ')).split(s[0]).length ? s[0] : r
          )
        ;(s = (n + '').split(' ')),
          (r = {}),
          a.forEach(function (t, e) {
            return (r[t] = s[e] = s[e] || s[((e - 1) / 2) | 0])
          }),
          e.init(t, r, o)
      }
    })
    var vo,
      yo = {
        name: 'css',
        register: sn,
        targetTest: function (t) {
          return t.style && t.nodeType
        },
        init: function (t, e, i, n, o) {
          var s,
            r,
            a,
            l,
            c,
            d,
            u,
            p,
            f,
            D,
            h,
            m,
            j,
            g,
            v,
            y,
            F,
            w,
            _,
            b,
            T,
            H = this._props,
            k = t.style,
            S = i.vars.startAt
          for (c in (kn || sn(),
          (this.styles = this.styles || nn(t)),
          (g = this.styles.props),
          (this.tween = i),
          e))
            if (
              'autoRound' !== c &&
              ((r = e[c]), !Q[c] || !oi(c, e, i, n, t, o))
            )
              if (
                ((p = typeof r),
                (l = so[c]),
                'function' === p && (p = typeof (r = r.call(i, n, t, o))),
                'string' === p && ~r.indexOf('random(') && (r = Ot(r)),
                l)
              )
                l(this, t, c, r, i) && (j = 1)
              else if ('--' === c.substr(0, 2))
                (s = (getComputedStyle(t).getPropertyValue(c) + '').trim()),
                  (r += ''),
                  (We.lastIndex = 0),
                  We.test(s) || ((d = B(s)), (u = B(r))),
                  u ? d !== u && (s = pn(t, c, s, u) + u) : d && (r += d),
                  this.add(k, 'setProperty', s, r, n, o, 0, 0, c),
                  H.push(c),
                  g.push(c, 0, k[c])
              else if ('undefined' !== p) {
                if (
                  ((S &&
                    c in S &&
                    (B(
                      (s =
                        R(
                          (s =
                            'function' == typeof S[c]
                              ? S[c].call(i, n, t, o)
                              : S[c]),
                        ) && ~s.indexOf('random(')
                          ? Ot(s)
                          : s) + '',
                    ) || (s += N.units[c] || B(no(t, c)) || ''),
                    '=' !== (s + '').charAt(1))) ||
                    (s = no(t, c)),
                  (l = parseFloat(s)),
                  (p =
                    'string' === p && '=' === r.charAt(1) && r.substr(0, 2)) &&
                    (r = r.substr(2)),
                  (a = parseFloat(r)),
                  (f =
                    (c =
                      c in Kn &&
                      ('autoAlpha' === c &&
                        (1 === l &&
                          'hidden' === no(t, 'visibility') &&
                          a &&
                          (l = 0),
                        g.push('visibility', 0, k.visibility),
                        un(
                          this,
                          k,
                          'visibility',
                          l ? 'inherit' : 'hidden',
                          a ? 'inherit' : 'hidden',
                          !a,
                        )),
                      'scale' !== c) &&
                      'transform' !== c &&
                      ~(c = Kn[c]).indexOf(',')
                        ? c.split(',')[0]
                        : c) in Qn))
                )
                  if (
                    (this.styles.save(c),
                    D ||
                      (((h = t._gsap).renderTransform && !e.parseTransform) ||
                        lo(t, e.parseTransform),
                      (m = !1 !== e.smoothOrigin && h.smooth),
                      ((D = this._pt =
                        new Y(
                          this._pt,
                          k,
                          X,
                          0,
                          1,
                          h.renderTransform,
                          h,
                          0,
                          -1,
                        )).dep = 1)),
                    'scale' === c)
                  )
                    (this._pt = new Y(
                      this._pt,
                      h,
                      'scaleY',
                      h.scaleY,
                      (p ? nt(h.scaleY, p + a) : a) - h.scaleY || 0,
                      Bi,
                    )),
                      (this._pt.u = 0),
                      H.push('scaleY', c),
                      (c += 'X')
                  else {
                    if ('transformOrigin' === c) {
                      g.push(G, 0, k[G]),
                        (T = b = _ = void 0),
                        (_ = (w = r).split(' ')),
                        (b = _[0]),
                        (T = _[1] || '50%'),
                        ('top' !== b &&
                          'bottom' !== b &&
                          'left' !== T &&
                          'right' !== T) ||
                          ((w = b), (b = T), (T = w)),
                        (_[0] = oo[b] || b),
                        (_[1] = oo[T] || T),
                        (r = _.join(' ')),
                        h.svg
                          ? yn(t, r, 0, m, 0, this)
                          : ((u = parseFloat(r.split(' ')[2]) || 0) !==
                              h.zOrigin && un(this, h, 'zOrigin', h.zOrigin, u),
                            un(this, k, c, co(s), co(r)))
                      continue
                    }
                    if ('svgOrigin' === c) {
                      yn(t, r, 1, m, 0, this)
                      continue
                    }
                    if (c in ao) {
                      ;(w = this),
                        (b = h),
                        (T = c),
                        (_ = l),
                        (v = p ? nt(l, p + r) : r),
                        (F = y = $ = L = void 0),
                        (L = 360),
                        ($ = R(v)),
                        (y =
                          parseFloat(v) * ($ && ~v.indexOf('rad') ? qn : 1) -
                          _),
                        (F = _ + y + 'deg'),
                        $ &&
                          ('short' === ($ = v.split('_')[1]) &&
                            (y %= L) != y % 180 &&
                            (y += y < 0 ? L : -L),
                          'cw' === $ && y < 0
                            ? (y = ((y + 36e9) % L) - ~~(y / L) * L)
                            : 'ccw' === $ &&
                              0 < y &&
                              (y = ((y - 36e9) % L) - ~~(y / L) * L)),
                        (w._pt = v = new Y(w._pt, b, T, _, y, Ni)),
                        (v.e = F),
                        (v.u = 'deg'),
                        w._props.push(T)
                      continue
                    }
                    if ('smoothOrigin' === c) {
                      un(this, h, 'smooth', h.smooth, r)
                      continue
                    }
                    if ('force3D' === c) {
                      h[c] = r
                      continue
                    }
                    if ('transform' === c) {
                      L = I = P = O = A = E = C = x = z = $ = M = void 0
                      var x,
                        C,
                        E,
                        O,
                        A,
                        P,
                        M = this,
                        $ = r,
                        z = t,
                        I = _n({}, z._gsap),
                        L = z.style
                      for (C in (I.svg
                        ? ((E = z.getAttribute('transform')),
                          z.setAttribute('transform', ''),
                          (L[X] = $),
                          (x = lo(z, 1)),
                          dn(z, X),
                          z.setAttribute('transform', E))
                        : ((E = getComputedStyle(z)[X]),
                          (L[X] = $),
                          (x = lo(z, 1)),
                          (L[X] = E)),
                      Qn))
                        (E = I[C]) !== (A = x[C]) &&
                          'perspective,force3D,transformOrigin,svgOrigin'.indexOf(
                            C,
                          ) < 0 &&
                          ((O =
                            B(E) !== (P = B(A))
                              ? pn(z, C, E, P)
                              : parseFloat(E)),
                          (A = parseFloat(A)),
                          (M._pt = new Y(M._pt, x, C, O, A - O, Bi)),
                          (M._pt.u = P || 0),
                          M._props.push(C))
                      _n(x, I)
                      continue
                    }
                  }
                else c in k || (c = to(c) || c)
                if (
                  f ||
                  ((a || 0 === a) && (l || 0 === l) && !Zn.test(r) && c in k)
                )
                  (a = a || 0),
                    (d = (s + '').substr((l + '').length)) !==
                      (u = B(r) || (c in N.units ? N.units[c] : d)) &&
                      (l = pn(t, c, s, u)),
                    (this._pt = new Y(
                      this._pt,
                      f ? h : k,
                      c,
                      l,
                      (p ? nt(l, p + a) : a) - l,
                      f || ('px' !== u && 'zIndex' !== c) || !1 === e.autoRound
                        ? Bi
                        : Wi,
                    )),
                    (this._pt.u = u || 0),
                    d !== u &&
                      '%' !== u &&
                      ((this._pt.b = s), (this._pt.r = Vi))
                else if (c in k) fn.call(this, t, c, s, p ? p + r : r)
                else if (c in t) this.add(t, c, s || t[c], p ? p + r : r, n, o)
                else if ('parseTransform' !== c) {
                  J(c, r)
                  continue
                }
                f || (c in k ? g.push(c, 0, k[c]) : g.push(c, 1, s || t[c])),
                  H.push(c)
              }
          j && xi(this)
        },
        render: function (t, e) {
          if (e.tween._time || !Cn())
            for (var i = e._pt; i; ) i.r(t, i.d), (i = i._next)
          else e.styles.revert()
        },
        get: no,
        aliases: Kn,
        getSetter: function (t, e, i) {
          var n = Kn[e]
          return (e = n && n.indexOf(',') < 0 ? n : e) in Qn &&
            e !== G &&
            (t._gsap.x || no(t, 'x'))
            ? i && xn === i
              ? 'scale' === e
                ? Gi
                : Xi
              : (xn = i || {}) && ('scale' === e ? Zi : Ki)
            : t.style && !s(t.style[e])
              ? Yi
              : ~e.indexOf('-')
                ? Ui
                : yi(t, e)
        },
        core: { _removeProperty: dn, _getMatrix: vn },
      },
      wo =
        ((m.utils.checkPrefix = to),
        (m.core.getStyleSaver = nn),
        (vo = f(
          'x,y,z,scale,scaleX,scaleY,xPercent,yPercent' +
            ',' +
            (wo = 'rotation,rotationX,rotationY,skewX,skewY') +
            ',transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective',
          function (t) {
            Qn[t] = 1
          },
        )),
        f(wo, function (t) {
          ;(N.units[t] = 'deg'), (ao[t] = 1)
        }),
        (Kn[vo[13]] = 'x,y,z,scale,scaleX,scaleY,xPercent,yPercent,' + wo),
        f(
          '0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY',
          function (t) {
            t = t.split(':')
            Kn[t[1]] = vo[t[0]]
          },
        ),
        f(
          'x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective',
          function (t) {
            N.units[t] = 'px'
          },
        ),
        m.registerPlugin(yo),
        m.registerPlugin(yo) || m),
      _o = wo.core.Tween
    ;(t.Back = Hn),
      (t.Bounce = Bn),
      (t.CSSPlugin = yo),
      (t.Circ = Wn),
      (t.Cubic = In),
      (t.Elastic = Fn),
      (t.Expo = Vn),
      (t.Linear = $n),
      (t.Power0 = e),
      (t.Power1 = On),
      (t.Power2 = An),
      (t.Power3 = Pn),
      (t.Power4 = Mn),
      (t.Quad = zn),
      (t.Quart = Ln),
      (t.Quint = Dn),
      (t.Sine = Nn),
      (t.SteppedEase = Rn),
      (t.Strong = jn),
      (t.TimelineLite = z),
      (t.TimelineMax = z),
      (t.TweenLite = q),
      (t.TweenMax = _o),
      (t.default = wo),
      (t.gsap = wo),
      'undefined' == typeof window || window !== t
        ? Object.defineProperty(t, '__esModule', { value: !0 })
        : delete t.default
  }),
  (n = this),
  (t = function () {
    'use strict'
    var f = '(prefers-reduced-motion: reduce)',
      H = 4,
      it = 5,
      i = {
        CREATED: 1,
        MOUNTED: 2,
        IDLE: 3,
        MOVING: H,
        SCROLLING: it,
        DRAGGING: 6,
        DESTROYED: 7,
      }
    function P(t) {
      t.length = 0
    }
    function o(t, e, i) {
      return Array.prototype.slice.call(t, e, i)
    }
    function I(t) {
      return t.bind.apply(t, [null].concat(o(arguments, 1)))
    }
    function nt() {}
    var m = setTimeout
    function h(t) {
      return requestAnimationFrame(t)
    }
    function n(t, e) {
      return typeof e === t
    }
    function ot(t) {
      return !r(t) && n('object', t)
    }
    var s = Array.isArray,
      T = I(n, 'function'),
      L = I(n, 'string'),
      st = I(n, 'undefined')
    function r(t) {
      return null === t
    }
    function v(t) {
      try {
        return t instanceof (t.ownerDocument.defaultView || window).HTMLElement
      } catch (t) {
        return !1
      }
    }
    function y(t) {
      return s(t) ? t : [t]
    }
    function g(t, e) {
      y(t).forEach(e)
    }
    function w(t, e) {
      return -1 < t.indexOf(e)
    }
    function k(t, e) {
      return t.push.apply(t, y(e)), t
    }
    function E(e, t, i) {
      e &&
        g(t, function (t) {
          t && e.classList[i ? 'add' : 'remove'](t)
        })
    }
    function M(t, e) {
      E(t, L(e) ? e.split(' ') : e, !0)
    }
    function x(t, e) {
      g(e, t.appendChild.bind(t))
    }
    function C(t, i) {
      g(t, function (t) {
        var e = (i || t).parentNode
        e && e.insertBefore(t, i)
      })
    }
    function rt(t, e) {
      return v(t) && (t.msMatchesSelector || t.matches).call(t, e)
    }
    function S(t, e) {
      return (
        (t = t ? o(t.children) : []),
        e
          ? t.filter(function (t) {
              return rt(t, e)
            })
          : t
      )
    }
    function at(t, e) {
      return e ? S(t, e)[0] : t.firstElementChild
    }
    var lt = Object.keys
    function _(e, i, t) {
      e &&
        (t ? lt(e).reverse() : lt(e)).forEach(function (t) {
          '__proto__' !== t && i(e[t], t)
        })
    }
    function ct(n) {
      return (
        o(arguments, 1).forEach(function (i) {
          _(i, function (t, e) {
            n[e] = i[e]
          })
        }),
        n
      )
    }
    function p(i) {
      return (
        o(arguments, 1).forEach(function (t) {
          _(t, function (t, e) {
            s(t)
              ? (i[e] = t.slice())
              : ot(t)
                ? (i[e] = p({}, ot(i[e]) ? i[e] : {}, t))
                : (i[e] = t)
          })
        }),
        i
      )
    }
    function dt(e, t) {
      g(t || lt(e), function (t) {
        delete e[t]
      })
    }
    function $(t, i) {
      g(t, function (e) {
        g(i, function (t) {
          e && e.removeAttribute(t)
        })
      })
    }
    function z(i, e, n) {
      ot(e)
        ? _(e, function (t, e) {
            z(i, e, t)
          })
        : g(i, function (t) {
            r(n) || '' === n ? $(t, e) : t.setAttribute(e, String(n))
          })
    }
    function D(t, e, i) {
      return (
        (t = document.createElement(t)),
        e && (L(e) ? M : z)(t, e),
        i && x(i, t),
        t
      )
    }
    function O(t, e, i) {
      if (st(i)) return getComputedStyle(t)[e]
      r(i) || (t.style[e] = '' + i)
    }
    function ut(t, e) {
      O(t, 'display', e)
    }
    function pt(t) {
      ;(t.setActive && t.setActive()) || t.focus({ preventScroll: !0 })
    }
    function A(t, e) {
      return t.getAttribute(e)
    }
    function ft(t, e) {
      return t && t.classList.contains(e)
    }
    function j(t) {
      return t.getBoundingClientRect()
    }
    function F(t) {
      g(t, function (t) {
        t && t.parentNode && t.parentNode.removeChild(t)
      })
    }
    function ht(t) {
      return at(new DOMParser().parseFromString(t, 'text/html').body)
    }
    function R(t, e) {
      t.preventDefault(),
        e && (t.stopPropagation(), t.stopImmediatePropagation())
    }
    function mt(t, e) {
      return t && t.querySelector(e)
    }
    function gt(t, e) {
      return e ? o(t.querySelectorAll(e)) : []
    }
    function B(t, e) {
      E(t, e, !1)
    }
    function vt(t) {
      return t.timeStamp
    }
    function N(t) {
      return L(t) ? t : t ? t + 'px' : ''
    }
    var b = 'splide',
      a = 'data-' + b
    function yt(t, e) {
      if (!t) throw new Error('[' + b + '] ' + (e || ''))
    }
    var V = Math.min,
      wt = Math.max,
      _t = Math.floor,
      bt = Math.ceil,
      W = Math.abs
    function Tt(t, e, i) {
      return W(t - e) < i
    }
    function kt(t, e, i, n) {
      var o = V(e, i),
        e = wt(e, i)
      return n ? o < t && t < e : o <= t && t <= e
    }
    function Q(t, e, i) {
      var n = V(e, i),
        e = wt(e, i)
      return V(wt(n, t), e)
    }
    function St(t) {
      return (0 < t) - (t < 0)
    }
    function xt(e, t) {
      return (
        g(t, function (t) {
          e = e.replace('%s', '' + t)
        }),
        e
      )
    }
    function Ct(t) {
      return t < 10 ? '0' + t : '' + t
    }
    var Et = {}
    function Ot() {
      var a = []
      function i(t, i, n) {
        g(t, function (e) {
          e &&
            g(i, function (t) {
              t.split(' ').forEach(function (t) {
                ;(t = t.split('.')), n(e, t[0], t[1])
              })
            })
        })
      }
      return {
        bind: function (t, e, s, r) {
          i(t, e, function (t, e, i) {
            var n = 'addEventListener' in t,
              o = n
                ? t.removeEventListener.bind(t, e, s, r)
                : t.removeListener.bind(t, s)
            n ? t.addEventListener(e, s, r) : t.addListener(s),
              a.push([t, e, i, s, o])
          })
        },
        unbind: function (t, e, o) {
          i(t, e, function (e, i, n) {
            a = a.filter(function (t) {
              return (
                !!(
                  t[0] !== e ||
                  t[1] !== i ||
                  t[2] !== n ||
                  (o && t[3] !== o)
                ) || (t[4](), !1)
              )
            })
          })
        },
        dispatch: function (t, e, i) {
          var n
          return (
            'function' == typeof CustomEvent
              ? (n = new CustomEvent(e, { bubbles: !0, detail: i }))
              : (n = document.createEvent('CustomEvent')).initCustomEvent(
                  e,
                  !0,
                  !1,
                  i,
                ),
            t.dispatchEvent(n),
            n
          )
        },
        destroy: function () {
          a.forEach(function (t) {
            t[4]()
          }),
            P(a)
        },
      }
    }
    var q = 'mounted',
      Y = 'move',
      At = 'moved',
      Pt = 'click',
      Mt = 'active',
      $t = 'inactive',
      zt = 'visible',
      It = 'hidden',
      U = 'refresh',
      X = 'updated',
      Lt = 'resize',
      Dt = 'resized',
      jt = 'scroll',
      G = 'scrolled',
      l = 'destroy',
      Ft = 'navigation:mounted',
      Ht = 'autoplay:play',
      Rt = 'autoplay:pause',
      Bt = 'lazyload:loaded',
      Nt = 'sk',
      Vt = 'sh'
    function Z(t) {
      var i = t ? t.event.bus : document.createDocumentFragment(),
        n = Ot()
      return (
        t && t.event.on(l, n.destroy),
        ct(n, {
          bus: i,
          on: function (t, e) {
            n.bind(i, y(t).join(' '), function (t) {
              e.apply(e, s(t.detail) ? t.detail : [])
            })
          },
          off: I(n.unbind, i),
          emit: function (t) {
            n.dispatch(i, t, o(arguments, 1))
          },
        })
      )
    }
    function Wt(e, t, i, n) {
      var o,
        s,
        r = Date.now,
        a = 0,
        l = !0,
        c = 0
      function d() {
        if (!l) {
          if (
            ((a = e ? V((r() - o) / e, 1) : 1),
            i && i(a),
            1 <= a && (t(), (o = r()), n) && ++c >= n)
          )
            return u()
          s = h(d)
        }
      }
      function u() {
        l = !0
      }
      function p() {
        s && cancelAnimationFrame(s), (l = !(s = a = 0))
      }
      return {
        start: function (t) {
          t || p(), (o = r() - (t ? a * e : 0)), (l = !1), (s = h(d))
        },
        rewind: function () {
          ;(o = r()), (a = 0), i && i(a)
        },
        pause: u,
        cancel: p,
        set: function (t) {
          e = t
        },
        isPaused: function () {
          return l
        },
      }
    }
    var t = 'Arrow',
      Qt = t + 'Left',
      qt = t + 'Right',
      c = t + 'Up',
      Yt = 'ttb',
      d = {
        width: ['height'],
        left: ['top', 'right'],
        right: ['bottom', 'left'],
        x: ['y'],
        X: ['Y'],
        Y: ['X'],
        ArrowLeft: [c, qt],
        ArrowRight: [(t = t + 'Down'), Qt],
      },
      K = 'role',
      J = 'tabindex',
      e = 'aria-',
      Ut = e + 'controls',
      Xt = e + 'current',
      Gt = e + 'selected',
      tt = e + 'label',
      Zt = e + 'labelledby',
      Kt = e + 'hidden',
      te = e + 'orientation',
      ee = e + 'roledescription',
      u = e + 'live',
      ie = e + 'busy',
      ne = e + 'atomic',
      oe = [K, J, 'disabled', Ut, Xt, tt, Zt, Kt, te, ee],
      se = b,
      re = (e = b + '__') + 'track',
      ae = e + 'list',
      le = e + 'slide',
      ce = le + '--clone',
      de = le + '__container',
      ue = e + 'arrows',
      pe = e + 'arrow',
      fe = pe + '--prev',
      he = pe + '--next',
      me = e + 'pagination',
      ge = me + '__page',
      ve = e + 'progress__bar',
      ye = e + 'toggle',
      we = e + 'sr',
      et = 'is-active',
      _e = 'is-prev',
      be = 'is-next',
      Te = 'is-visible',
      ke = 'is-loading',
      Se = 'is-focus-in',
      xe = 'is-overflow',
      Ce = [et, Te, _e, be, ke, Se, xe],
      Ee = 'touchstart mousedown',
      Oe = 'touchmove mousemove',
      Ae = 'touchend touchcancel mouseup click',
      Pe = 'slide',
      Me = 'loop',
      $e = 'fade'
    function ze(r, a, e, l) {
      var c,
        t = Z(r),
        i = t.on,
        d = t.emit,
        n = t.bind,
        u = r.Components,
        o = r.root,
        p = r.options,
        f = p.isNavigation,
        s = p.updateOnMove,
        h = p.i18n,
        m = p.pagination,
        g = p.slideFocus,
        v = u.Direction.resolve,
        y = A(l, 'style'),
        w = A(l, tt),
        _ = -1 < e,
        b = at(l, '.' + de)
      function T() {
        var t = r.splides
          .map(function (t) {
            return (t = t.splide.Components.Slides.getAt(a)) ? t.slide.id : ''
          })
          .join(' ')
        z(l, tt, xt(h.slideX, (_ ? e : a) + 1)),
          z(l, Ut, t),
          z(l, K, g ? 'button' : ''),
          g && $(l, ee)
      }
      function k() {
        c || S()
      }
      function S() {
        var t, e, i, n, o, s
        c ||
          ((t = r.index),
          (e = x()) !== ft(l, et) &&
            (E(l, et, e), z(l, Xt, (f && e) || ''), d(e ? Mt : $t, C)),
          (o =
            !(e = r.is($e)
              ? x()
              : ((i = j(u.Elements.track)),
                (n = j(l)),
                (o = v('left', !0)),
                (s = v('right', !0)),
                _t(i[o]) <= bt(n[o]) && _t(n[s]) <= bt(i[s]))) &&
            (!x() || _)),
          r.state.is([H, it]) || z(l, Kt, o || ''),
          z(gt(l, p.focusableNodes || ''), J, o ? -1 : ''),
          g && z(l, J, o ? -1 : 0),
          e !== ft(l, Te) && (E(l, Te, e), d(e ? zt : It, C)),
          e ||
            document.activeElement !== l ||
            ((o = u.Slides.getAt(r.index)) && pt(o.slide)),
          E(l, _e, a === t - 1),
          E(l, be, a === t + 1))
      }
      function x() {
        var t = r.index
        return t === a || (p.cloneStatus && t === e)
      }
      var C = {
        index: a,
        slideIndex: e,
        slide: l,
        container: b,
        isClone: _,
        mount: function () {
          _ ||
            ((l.id = o.id + '-slide' + Ct(a + 1)),
            z(l, K, m ? 'tabpanel' : 'group'),
            z(l, ee, h.slide),
            z(l, tt, w || xt(h.slideLabel, [a + 1, r.length]))),
            n(l, 'click', I(d, Pt, C)),
            n(l, 'keydown', I(d, Nt, C)),
            i([At, Vt, G], S),
            i(Ft, T),
            s && i(Y, k)
        },
        destroy: function () {
          ;(c = !0),
            t.destroy(),
            B(l, Ce),
            $(l, oe),
            z(l, 'style', y),
            z(l, tt, w || '')
        },
        update: S,
        style: function (t, e, i) {
          O((i && b) || l, t, e)
        },
        isWithin: function (t, e) {
          return (
            (t = W(t - a)),
            (t = _ || (!p.rewind && !r.is(Me)) ? t : V(t, r.length - t)) <= e
          )
        },
      }
      return C
    }
    var Ie = a + '-interval',
      Le = { passive: !1, capture: !0 },
      De = { Spacebar: ' ', Right: qt, Left: Qt, Up: c, Down: t }
    function je(t) {
      return (t = L(t) ? t : t.key), De[t] || t
    }
    var Fe = 'keydown',
      He = a + '-lazy',
      Re = He + '-srcset',
      Be = '[' + He + '], [' + Re + ']',
      Ne = [' ', 'Enter'],
      Ve = Object.freeze({
        __proto__: null,
        Media: function (n, t, o) {
          var s = n.state,
            e = o.breakpoints || {},
            r = o.reducedMotion || {},
            i = Ot(),
            a = []
          function l(t) {
            t && i.destroy()
          }
          function c(t, e) {
            ;(e = matchMedia(e)), i.bind(e, 'change', d), a.push([t, e])
          }
          function d() {
            var t = s.is(7),
              e = o.direction,
              i = a.reduce(function (t, e) {
                return p(t, e[1].matches ? e[0] : {})
              }, {})
            dt(o),
              u(i),
              o.destroy
                ? n.destroy('completely' === o.destroy)
                : t
                  ? (l(!0), n.mount())
                  : e !== o.direction && n.refresh()
          }
          function u(t, e, i) {
            p(o, t),
              e && p(Object.getPrototypeOf(o), t),
              (!i && s.is(1)) || n.emit(X, o)
          }
          return {
            setup: function () {
              var i = 'min' === o.mediaQuery
              lt(e)
                .sort(function (t, e) {
                  return i ? +t - +e : +e - +t
                })
                .forEach(function (t) {
                  c(e[t], '(' + (i ? 'min' : 'max') + '-width:' + t + 'px)')
                }),
                c(r, f),
                d()
            },
            destroy: l,
            reduce: function (t) {
              matchMedia(f).matches && (t ? p(o, r) : dt(o, lt(r)))
            },
            set: u,
          }
        },
        Direction: function (t, e, o) {
          return {
            resolve: function (t, e, i) {
              var n =
                'rtl' !== (i = i || o.direction) || e ? (i === Yt ? 0 : -1) : 1
              return (
                (d[t] && d[t][n]) ||
                t.replace(/width|left|right/i, function (t, e) {
                  return (
                    (t = d[t.toLowerCase()][n] || t),
                    0 < e ? t.charAt(0).toUpperCase() + t.slice(1) : t
                  )
                })
              )
            },
            orient: function (t) {
              return t * ('rtl' === o.direction ? 1 : -1)
            },
          }
        },
        Elements: function (t, e, i) {
          var n,
            o,
            s,
            r = Z(t),
            a = r.on,
            l = r.bind,
            c = t.root,
            d = i.i18n,
            u = {},
            p = [],
            f = [],
            h = []
          function m() {
            ;(n = y('.' + re)),
              (o = at(n, '.' + ae)),
              yt(n && o, 'A track/list element is missing.'),
              k(p, S(o, '.' + le + ':not(.' + ce + ')')),
              _(
                {
                  arrows: ue,
                  pagination: me,
                  prev: fe,
                  next: he,
                  bar: ve,
                  toggle: ye,
                },
                function (t, e) {
                  u[e] = y('.' + t)
                },
              ),
              ct(u, { root: c, track: n, list: o, slides: p })
            var t = c.id || '' + b + Ct((Et[b] = (Et[b] || 0) + 1)),
              e = i.role
            ;(c.id = t),
              (n.id = n.id || t + '-track'),
              (o.id = o.id || t + '-list'),
              !A(c, K) && 'SECTION' !== c.tagName && e && z(c, K, e),
              z(c, ee, d.carousel),
              z(o, K, 'presentation'),
              v()
          }
          function g(t) {
            var e = oe.concat('style')
            P(p), B(c, f), B(n, h), $([n, o], e), $(c, t ? e : ['style', ee])
          }
          function v() {
            B(c, f),
              B(n, h),
              (f = w(se)),
              (h = w(re)),
              M(c, f),
              M(n, h),
              z(c, tt, i.label),
              z(c, Zt, i.labelledby)
          }
          function y(t) {
            return (t = mt(c, t)) &&
              (function (t, e) {
                if (T(t.closest)) return t.closest(e)
                for (var i = t; i && 1 === i.nodeType && !rt(i, e); )
                  i = i.parentElement
                return i
              })(t, '.' + se) === c
              ? t
              : void 0
          }
          function w(t) {
            return [
              t + '--' + i.type,
              t + '--' + i.direction,
              i.drag && t + '--draggable',
              i.isNavigation && t + '--nav',
              t === se && et,
            ]
          }
          return ct(u, {
            setup: m,
            mount: function () {
              a(U, g),
                a(U, m),
                a(X, v),
                l(
                  document,
                  Ee + ' keydown',
                  function (t) {
                    s = 'keydown' === t.type
                  },
                  { capture: !0 },
                ),
                l(c, 'focusin', function () {
                  E(c, Se, !!s)
                })
            },
            destroy: g,
          })
        },
        Slides: function (n, o, s) {
          var t = Z(n),
            e = t.on,
            r = t.emit,
            a = t.bind,
            l = (t = o.Elements).slides,
            c = t.list,
            d = []
          function i() {
            l.forEach(function (t, e) {
              p(t, e, -1)
            })
          }
          function u() {
            h(function (t) {
              t.destroy()
            }),
              P(d)
          }
          function p(t, e, i) {
            ;(e = ze(n, e, i, t)).mount(),
              d.push(e),
              d.sort(function (t, e) {
                return t.index - e.index
              })
          }
          function f(t) {
            return t
              ? m(function (t) {
                  return !t.isClone
                })
              : d
          }
          function h(t, e) {
            f(e).forEach(t)
          }
          function m(e) {
            return d.filter(
              T(e)
                ? e
                : function (t) {
                    return L(e) ? rt(t.slide, e) : w(y(e), t.index)
                  },
            )
          }
          return {
            mount: function () {
              i(), e(U, u), e(U, i)
            },
            destroy: u,
            update: function () {
              h(function (t) {
                t.update()
              })
            },
            register: p,
            get: f,
            getIn: function (t) {
              var e = o.Controller,
                i = e.toIndex(t),
                n = e.hasFocus() ? 1 : s.perPage
              return m(function (t) {
                return kt(t.index, i, i + n - 1)
              })
            },
            getAt: function (t) {
              return m(t)[0]
            },
            add: function (t, o) {
              g(t, function (t) {
                var e, i, n
                v((t = L(t) ? ht(t) : t)) &&
                  ((e = l[o]) ? C(t, e) : x(c, t),
                  M(t, s.classes.slide),
                  (e = t),
                  (i = I(r, Lt)),
                  (e = gt(e, 'img')),
                  (n = e.length)
                    ? e.forEach(function (t) {
                        a(t, 'load error', function () {
                          --n || i()
                        })
                      })
                    : i())
              }),
                r(U)
            },
            remove: function (t) {
              F(
                m(t).map(function (t) {
                  return t.slide
                }),
              ),
                r(U)
            },
            forEach: h,
            filter: m,
            style: function (e, i, n) {
              h(function (t) {
                t.style(e, i, n)
              })
            },
            getLength: function (t) {
              return (t ? l : d).length
            },
            isEnough: function () {
              return d.length > s.perPage
            },
          }
        },
        Layout: function (e, t, i) {
          var n,
            o,
            s,
            r = (c = Z(e)).on,
            a = c.bind,
            l = c.emit,
            c = t.Slides,
            d = t.Direction.resolve,
            u = (t = t.Elements).root,
            p = t.track,
            f = t.list,
            h = c.getAt,
            m = c.style
          function g() {
            ;(n = i.direction === Yt),
              O(u, 'maxWidth', N(i.width)),
              O(p, d('paddingLeft'), y(!1)),
              O(p, d('paddingRight'), y(!0)),
              v(!0)
          }
          function v(t) {
            var e = j(u)
            ;(!t && o.width === e.width && o.height === e.height) ||
              (O(
                p,
                'height',
                ((t = ''),
                n &&
                  (yt((t = w()), 'height or heightRatio is missing.'),
                  (t = 'calc(' + t + ' - ' + y(!1) + ' - ' + y(!0) + ')')),
                t),
              ),
              m(d('marginRight'), N(i.gap)),
              m(
                'width',
                i.autoWidth ? null : N(i.fixedWidth) || (n ? '' : _()),
              ),
              m(
                'height',
                N(i.fixedHeight) || (n ? (i.autoHeight ? null : _()) : w()),
                !0,
              ),
              (o = e),
              l(Dt),
              s !== (s = C()) && (E(u, xe, s), l('overflow', s)))
          }
          function y(t) {
            var e = i.padding,
              t = d(t ? 'right' : 'left')
            return (e && N(e[t] || (ot(e) ? 0 : e))) || '0px'
          }
          function w() {
            return N(i.height || j(f).width * i.heightRatio)
          }
          function _() {
            var t = N(i.gap)
            return (
              'calc((100%' +
              (t && ' + ' + t) +
              ')/' +
              (i.perPage || 1) +
              (t && ' - ' + t) +
              ')'
            )
          }
          function b() {
            return j(f)[d('width')]
          }
          function T(t, e) {
            return (t = h(t || 0)) ? j(t.slide)[d('width')] + (e ? 0 : x()) : 0
          }
          function k(t, e) {
            var i
            return (t = h(t))
              ? ((t = j(t.slide)[d('right')]),
                (i = j(f)[d('left')]),
                W(t - i) + (e ? 0 : x()))
              : 0
          }
          function S(t) {
            return k(e.length - 1) - k(0) + T(0, t)
          }
          function x() {
            var t = h(0)
            return (t && parseFloat(O(t.slide, d('marginRight')))) || 0
          }
          function C() {
            return e.is($e) || S(!0) > b()
          }
          return {
            mount: function () {
              var t, e
              g(),
                a(
                  window,
                  'resize load',
                  ((t = I(l, Lt)),
                  (e = Wt(0, t, null, 1)),
                  function () {
                    e.isPaused() && e.start()
                  }),
                ),
                r([X, U], g),
                r(Lt, v)
            },
            resize: v,
            listSize: b,
            slideSize: T,
            sliderSize: S,
            totalSize: k,
            getPadding: function (t) {
              return (
                parseFloat(O(p, d('padding' + (t ? 'Right' : 'Left')))) || 0
              )
            },
            isOverflow: C,
          }
        },
        Clones: function (l, i, c) {
          var e,
            n = Z(l),
            t = n.on,
            d = i.Elements,
            u = i.Slides,
            o = i.Direction.resolve,
            p = []
          function s() {
            if ((t(U, f), t([X, Lt], h), (e = m()))) {
              var s = e,
                r = u.get().slice(),
                a = r.length
              if (a) {
                for (; r.length < s; ) k(r, r)
                k(r.slice(-s), r.slice(0, s)).forEach(function (t, e) {
                  var i,
                    n = e < s,
                    o =
                      ((i = t.slide),
                      (o = e),
                      M((i = i.cloneNode(!0)), c.classes.clone),
                      (i.id = l.root.id + '-clone' + Ct(o + 1)),
                      i)
                  n ? C(o, r[0].slide) : x(d.list, o),
                    k(p, o),
                    u.register(o, e - s + (n ? 0 : a), t.index)
                })
              }
              i.Layout.resize(!0)
            }
          }
          function f() {
            r(), s()
          }
          function r() {
            F(p), P(p), n.destroy()
          }
          function h() {
            var t = m()
            e !== t && (e < t || !t) && n.emit(U)
          }
          function m() {
            var t,
              e = c.clones
            return (
              l.is(Me)
                ? st(e) &&
                  (e =
                    ((t = c[o('fixedWidth')] && i.Layout.slideSize(0)) &&
                      bt(j(d.track)[o('width')] / t)) ||
                    (c[o('autoWidth')] && l.length) ||
                    2 * c.perPage)
                : (e = 0),
              e
            )
          }
          return { mount: s, destroy: r }
        },
        Move: function (s, a, n) {
          var r,
            t = Z(s),
            e = t.on,
            l = t.emit,
            c = s.state.set,
            o = (t = a.Layout).slideSize,
            i = t.getPadding,
            d = t.totalSize,
            u = t.listSize,
            p = t.sliderSize,
            f = (t = a.Direction).resolve,
            h = t.orient,
            m = (t = a.Elements).list,
            g = t.track
          function v() {
            a.Controller.isBusy() ||
              (a.Scroll.cancel(), y(s.index), a.Slides.update())
          }
          function y(t) {
            w(k(t, !0))
          }
          function w(t, e) {
            var i, n, o
            s.is($e) ||
              ((e = e
                ? t
                : ((i = t),
                  (i =
                    s.is(Me) &&
                    ((o = (n = T(i)) > a.Controller.getEnd()), n < 0 || o)
                      ? _(i, o)
                      : i))),
              O(m, 'transform', 'translate' + f('X') + '(' + e + 'px)'),
              t !== e && l(Vt))
          }
          function _(t, e) {
            var i = t - x(e),
              n = p()
            return t - h(n * (bt(W(i) / n) || 1)) * (e ? 1 : -1)
          }
          function b() {
            w(S(), !0), r.cancel()
          }
          function T(t) {
            for (
              var e = a.Slides.get(), i = 0, n = 1 / 0, o = 0;
              o < e.length;
              o++
            ) {
              var s = e[o].index,
                r = W(k(s, !0) - t)
              if (!(r <= n)) break
              ;(n = r), (i = s)
            }
            return i
          }
          function k(t, e) {
            var i = h(
              d(t - 1) -
                ('center' === (i = n.focus)
                  ? (u() - o(t, !0)) / 2
                  : +i * o(t) || 0),
            )
            return e
              ? ((t = i), n.trimSpace && s.is(Pe) ? Q(t, 0, h(p(!0) - u())) : t)
              : i
          }
          function S() {
            var t = f('left')
            return j(m)[t] - j(g)[t] + h(i(!1))
          }
          function x(t) {
            return k(t ? a.Controller.getEnd() : 0, !!n.trimSpace)
          }
          return {
            mount: function () {
              ;(r = a.Transition), e([q, Dt, X, U], v)
            },
            move: function (t, e, i, n) {
              var o, s
              t !== e &&
                ((o = i < t),
                (s = h(_(S(), o))),
                o ? 0 <= s : s <= m[f('scrollWidth')] - j(g)[f('width')]) &&
                (b(), w(_(S(), i < t), !0)),
                c(H),
                l(Y, e, i, t),
                r.start(e, function () {
                  c(3), l(At, e, i, t), n && n()
                })
            },
            jump: y,
            translate: w,
            shift: _,
            cancel: b,
            toIndex: T,
            toPosition: k,
            getPosition: S,
            getLimit: x,
            exceededLimit: function (t, e) {
              e = st(e) ? S() : e
              var i = !0 !== t && h(e) < h(x(!1)),
                t = !1 !== t && h(e) > h(x(!0))
              return i || t
            },
            reposition: v,
          }
        },
        Controller: function (o, s, r) {
          var a,
            l,
            c,
            d,
            t = Z(o),
            e = t.on,
            i = t.emit,
            u = s.Move,
            p = u.getPosition,
            n = u.getLimit,
            f = u.toPosition,
            h = (t = s.Slides).isEnough,
            m = t.getLength,
            g = r.omitEnd,
            v = o.is(Me),
            y = o.is(Pe),
            w = I(x, !1),
            _ = I(x, !0),
            b = r.start || 0,
            T = b
          function k() {
            ;(l = m(!0)), (c = r.perMove), (d = r.perPage), (a = O())
            var t = Q(b, 0, g ? a : l - 1)
            t !== b && ((b = t), u.reposition())
          }
          function S() {
            a !== O() && i('ei')
          }
          function x(t, e) {
            var i = c || ($() ? 1 : d)
            return -1 === (i = C(b + i * (t ? -1 : 1), b, !(c || $()))) &&
              y &&
              !Tt(p(), n(!t), 1)
              ? t
                ? 0
                : a
              : e
                ? i
                : E(i)
          }
          function C(t, e, i) {
            var n
            return (
              h() || $()
                ? ((n = (function (t) {
                    if (y && 'move' === r.trimSpace && t !== b)
                      for (
                        var e = p();
                        e === f(t, !0) && kt(t, 0, o.length - 1, !r.rewind);

                      )
                        t < b ? --t : ++t
                    return t
                  })(t)) !== t && ((e = t), (t = n), (i = !1)),
                  t < 0 || a < t
                    ? (t =
                        c || (!kt(0, t, e, !0) && !kt(a, e, t, !0))
                          ? v
                            ? i
                              ? t < 0
                                ? -(l % d || d)
                                : l
                              : t
                            : r.rewind
                              ? t < 0
                                ? a
                                : 0
                              : -1
                          : A(P(t)))
                    : i && t !== e && (t = A(P(e) + (t < e ? -1 : 1))))
                : (t = -1),
              t
            )
          }
          function E(t) {
            return v ? (t + l) % l || 0 : t
          }
          function O() {
            for (var t = l - ($() || (v && c) ? 1 : d); g && 0 < t--; )
              if (f(l - 1, !0) !== f(t, !0)) {
                t++
                break
              }
            return Q(t, 0, l - 1)
          }
          function A(t) {
            return Q($() ? t : d * t, 0, a)
          }
          function P(t) {
            return $() ? V(t, a) : _t((a <= t ? l - 1 : t) / d)
          }
          function M(t) {
            t !== b && ((T = b), (b = t))
          }
          function $() {
            return !st(r.focus) || r.isNavigation
          }
          function z() {
            return o.state.is([H, it]) && !!r.waitForTransition
          }
          return {
            mount: function () {
              k(), e([X, U, 'ei'], k), e(Dt, S)
            },
            go: function (t, e, i) {
              var n, o, s, r
              z() ||
                (-1 <
                  (s = E(
                    ((r = b),
                    L((n = t))
                      ? ((o = (s = n.match(/([+\-<>])(\d+)?/) || [])[1]),
                        (s = s[2]),
                        '+' === o || '-' === o
                          ? (r = C(b + +('' + o + (+s || 1)), b))
                          : '>' === o
                            ? (r = s ? A(+s) : w(!0))
                            : '<' === o && (r = _(!0)))
                      : (r = v ? n : Q(n, 0, a)),
                    (t = r)),
                  )) &&
                  (e || s !== b) &&
                  (M(s), u.move(t, s, T, i)))
            },
            scroll: function (t, e, i, n) {
              s.Scroll.scroll(t, e, i, function () {
                var t = E(u.toIndex(p()))
                M(g ? V(t, a) : t), n && n()
              })
            },
            getNext: w,
            getPrev: _,
            getAdjacent: x,
            getEnd: O,
            setIndex: M,
            getIndex: function (t) {
              return t ? T : b
            },
            toIndex: A,
            toPage: P,
            toDest: function (t) {
              return (t = u.toIndex(t)), y ? Q(t, 0, a) : t
            },
            hasFocus: $,
            isBusy: z,
          }
        },
        Arrows: function (o, t, e) {
          var i,
            n,
            s = Z(o),
            r = s.on,
            a = s.bind,
            l = s.emit,
            c = e.classes,
            d = e.i18n,
            u = t.Elements,
            p = t.Controller,
            f = u.arrows,
            h = u.track,
            m = f,
            g = u.prev,
            v = u.next,
            y = {}
          function w() {
            var t = e.arrows
            !t ||
              (g && v) ||
              ((m = f || D('div', c.arrows)),
              (g = k(!0)),
              (v = k(!1)),
              (i = !0),
              x(m, [g, v]),
              f) ||
              C(m, h),
              g &&
                v &&
                (ct(y, { prev: g, next: v }),
                ut(m, t ? '' : 'none'),
                M(m, (n = ue + '--' + e.direction)),
                t) &&
                (r([q, At, U, G, 'ei'], S),
                a(v, 'click', I(T, '>')),
                a(g, 'click', I(T, '<')),
                S(),
                z([g, v], Ut, h.id),
                l('arrows:mounted', g, v)),
              r(X, _)
          }
          function _() {
            b(), w()
          }
          function b() {
            s.destroy(),
              B(m, n),
              i ? (F(f ? [g, v] : m), (g = v = null)) : $([g, v], oe)
          }
          function T(t) {
            p.go(t, !0)
          }
          function k(t) {
            return ht(
              '<button class="' +
                c.arrow +
                ' ' +
                (t ? c.prev : c.next) +
                '" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40" focusable="false"><path d="' +
                (e.arrowPath ||
                  'm15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z') +
                '" />',
            )
          }
          function S() {
            var t, e, i, n
            g &&
              v &&
              ((n = o.index),
              (t = p.getPrev()),
              (e = p.getNext()),
              (i = -1 < t && n < t ? d.last : d.prev),
              (n = -1 < e && e < n ? d.first : d.next),
              (g.disabled = t < 0),
              (v.disabled = e < 0),
              z(g, tt, i),
              z(v, tt, n),
              l('arrows:updated', g, v, t, e))
          }
          return { arrows: y, mount: w, destroy: b, update: S }
        },
        Autoplay: function (t, e, i) {
          var n,
            o,
            s = Z(t),
            r = s.on,
            a = s.bind,
            l = s.emit,
            c = Wt(i.interval, t.go.bind(t, '>'), function (t) {
              var e = u.bar
              e && O(e, 'width', 100 * t + '%'), l('autoplay:playing', t)
            }),
            d = c.isPaused,
            u = e.Elements,
            p = (s = e.Elements).root,
            f = s.toggle,
            h = i.autoplay,
            m = 'pause' === h
          function g() {
            d() &&
              e.Slides.isEnough() &&
              (c.start(!i.resetProgress), (o = n = m = !1), w(), l(Ht))
          }
          function v(t) {
            ;(m = !!(t = void 0 === t || t)), w(), d() || (c.pause(), l(Rt))
          }
          function y() {
            m || (n || o ? v(!1) : g())
          }
          function w() {
            f && (E(f, et, !m), z(f, tt, i.i18n[m ? 'play' : 'pause']))
          }
          function _(t) {
            ;(t = e.Slides.getAt(t)),
              c.set((t && +A(t.slide, Ie)) || i.interval)
          }
          return {
            mount: function () {
              h &&
                (i.pauseOnHover &&
                  a(p, 'mouseenter mouseleave', function (t) {
                    ;(n = 'mouseenter' === t.type), y()
                  }),
                i.pauseOnFocus &&
                  a(p, 'focusin focusout', function (t) {
                    ;(o = 'focusin' === t.type), y()
                  }),
                f &&
                  a(f, 'click', function () {
                    m ? g() : v(!0)
                  }),
                r([Y, jt, U], c.rewind),
                r(Y, _),
                f && z(f, Ut, u.track.id),
                m || g(),
                w())
            },
            destroy: c.cancel,
            play: g,
            pause: v,
            isPaused: d,
          }
        },
        Cover: function (t, e, i) {
          var n = Z(t).on
          function o(i) {
            e.Slides.forEach(function (t) {
              var e = at(t.container || t.slide, 'img')
              e && e.src && s(i, e, t)
            })
          }
          function s(t, e, i) {
            i.style(
              'background',
              t ? 'center/cover no-repeat url("' + e.src + '")' : '',
              !0,
            ),
              ut(e, t ? 'none' : '')
          }
          return {
            mount: function () {
              i.cover && (n(Bt, I(s, !0)), n([q, X, U], I(o, !0)))
            },
            destroy: I(o, !1),
          }
        },
        Scroll: function (t, a, s) {
          var l,
            c,
            e = Z(t),
            i = e.on,
            d = e.emit,
            u = t.state.set,
            p = a.Move,
            f = p.getPosition,
            r = p.getLimit,
            h = p.exceededLimit,
            m = p.translate,
            g = t.is(Pe),
            v = 1
          function y(t, e, i, n, o) {
            var s,
              r = f(),
              i =
                (b(),
                !i ||
                  (g && h()) ||
                  ((i = a.Layout.sliderSize()),
                  (s = St(t) * i * _t(W(t) / i) || 0),
                  (t = p.toPosition(a.Controller.toDest(t % i)) + s)),
                Tt(r, t, 1))
            ;(v = 1),
              (e = i ? 0 : e || wt(W(t - r) / 1.5, 800)),
              (c = n),
              (l = Wt(e, w, I(_, r, t, o), 1)),
              u(it),
              d(jt),
              l.start()
          }
          function w() {
            u(3), c && c(), d(G)
          }
          function _(t, e, i, n) {
            var o = f(),
              n =
                (t +
                  (e - t) *
                    ((e = n),
                    (t = s.easingFunc) ? t(e) : 1 - Math.pow(1 - e, 4)) -
                  o) *
                v
            m(o + n),
              g &&
                !i &&
                h() &&
                ((v *= 0.6), W(n) < 10) &&
                y(r(h(!0)), 600, !1, c, !0)
          }
          function b() {
            l && l.cancel()
          }
          function n() {
            l && !l.isPaused() && (b(), w())
          }
          return {
            mount: function () {
              i(Y, b), i([X, U], n)
            },
            destroy: b,
            scroll: y,
            cancel: n,
          }
        },
        Drag: function (s, o, r) {
          var a,
            e,
            l,
            c,
            d,
            u,
            p,
            f,
            t = Z(s),
            i = t.on,
            h = t.emit,
            m = t.bind,
            g = t.unbind,
            v = s.state,
            y = o.Move,
            w = o.Scroll,
            _ = o.Controller,
            b = o.Elements.track,
            T = o.Media.reduce,
            n = (t = o.Direction).resolve,
            k = t.orient,
            S = y.getPosition,
            x = y.exceededLimit,
            C = !1
          function D() {
            var t = r.drag
            L(!t), (c = 'free' === t)
          }
          function j(t) {
            var e, i, n
            ;(u = !1),
              p ||
                ((e = I(t)),
                (i = t.target),
                (n = r.noDrag),
                rt(i, '.' + ge + ', .' + pe)) ||
                (n && rt(i, n)) ||
                (!e && t.button) ||
                (_.isBusy()
                  ? R(t, !0)
                  : ((f = e ? b : window),
                    (d = v.is([H, it])),
                    (l = null),
                    m(f, Oe, E, Le),
                    m(f, Ae, O, Le),
                    y.cancel(),
                    w.cancel(),
                    A(t)))
          }
          function E(t) {
            var e, i, n, o
            v.is(6) || (v.set(6), h('drag')),
              t.cancelable &&
                (d
                  ? (y.translate(a + P(t) / (C && s.is(Pe) ? 5 : 1)),
                    (o = 200 < M(t)),
                    (e = C !== (C = x())),
                    (o || e) && A(t),
                    (u = !0),
                    h('dragging'),
                    R(t))
                  : W(P((o = t))) > W(P(o, !0)) &&
                    ((n = ((i = ot((o = r.dragMinThreshold))) && o.mouse) || 0),
                    (i = (i ? o.touch : +o) || 10),
                    (d = W(P((e = t))) > (I(e) ? i : n)),
                    R(t)))
          }
          function O(t) {
            var e, i, n
            v.is(6) && (v.set(3), h('dragged')),
              d &&
                ((n = e =
                  (function (t) {
                    if (s.is(Me) || !C) {
                      var e = M(t)
                      if (e && e < 200) return P(t) / e
                    }
                    return 0
                  })(t)),
                (n =
                  S() +
                  St(n) *
                    V(
                      W(n) * (r.flickPower || 600),
                      c ? 1 / 0 : o.Layout.listSize() * (r.flickMaxPages || 1),
                    )),
                (i = r.rewind && r.rewindByDrag),
                T(!1),
                c
                  ? _.scroll(n, 0, r.snap)
                  : s.is($e)
                    ? _.go(k(St(e)) < 0 ? (i ? '<' : '-') : i ? '>' : '+')
                    : s.is(Pe) && C && i
                      ? _.go(x(!0) ? '>' : '<')
                      : _.go(_.toDest(n), !0),
                T(!0),
                R(t)),
              g(f, Oe, E),
              g(f, Ae, O),
              (d = !1)
          }
          function F(t) {
            !p && u && R(t, !0)
          }
          function A(t) {
            ;(l = e), (e = t), (a = S())
          }
          function P(t, e) {
            return z(t, e) - z($(t), e)
          }
          function M(t) {
            return vt(t) - vt($(t))
          }
          function $(t) {
            return (e === t && l) || e
          }
          function z(t, e) {
            return (I(t) ? t.changedTouches[0] : t)['page' + n(e ? 'Y' : 'X')]
          }
          function I(t) {
            return 'undefined' != typeof TouchEvent && t instanceof TouchEvent
          }
          function L(t) {
            p = t
          }
          return {
            mount: function () {
              m(b, Oe, nt, Le),
                m(b, Ae, nt, Le),
                m(b, Ee, j, Le),
                m(b, 'click', F, { capture: !0 }),
                m(b, 'dragstart', R),
                i([q, X], D)
            },
            disable: L,
            isDragging: function () {
              return d
            },
          }
        },
        Keyboard: function (e, t, i) {
          var n,
            o,
            s = Z(e),
            r = s.on,
            a = s.bind,
            l = s.unbind,
            c = e.root,
            d = t.Direction.resolve
          function u() {
            var t = i.keyboard
            t && ((n = 'global' === t ? window : c), a(n, Fe, h))
          }
          function p() {
            l(n, Fe)
          }
          function f() {
            var t = o
            ;(o = !0),
              m(function () {
                o = t
              })
          }
          function h(t) {
            o || ((t = je(t)) === d(Qt) ? e.go('<') : t === d(qt) && e.go('>'))
          }
          return {
            mount: function () {
              u(), r(X, p), r(X, u), r(Y, f)
            },
            destroy: p,
            disable: function (t) {
              o = t
            },
          }
        },
        LazyLoad: function (i, t, o) {
          var e = Z(i),
            n = e.on,
            s = e.off,
            r = e.bind,
            a = e.emit,
            l = 'sequential' === o.lazyLoad,
            c = [At, G],
            d = []
          function u() {
            P(d),
              t.Slides.forEach(function (n) {
                gt(n.slide, Be).forEach(function (t) {
                  var e = A(t, He),
                    i = A(t, Re)
                  ;(e === t.src && i === t.srcset) ||
                    ((e = o.classes.spinner),
                    (e = at((i = t.parentElement), '.' + e) || D('span', e, i)),
                    d.push([t, n, e]),
                    t.src) ||
                    ut(t, 'none')
                })
              }),
              (l ? m : (s(c), n(c, p), p))()
          }
          function p() {
            ;(d = d.filter(function (t) {
              var e = o.perPage * ((o.preloadPages || 1) + 1) - 1
              return !t[1].isWithin(i.index, e) || f(t)
            })).length || s(c)
          }
          function f(t) {
            var e = t[0]
            M(t[1].slide, ke),
              r(e, 'load error', I(h, t)),
              z(e, 'src', A(e, He)),
              z(e, 'srcset', A(e, Re)),
              $(e, He),
              $(e, Re)
          }
          function h(t, e) {
            var i = t[0],
              n = t[1]
            B(n.slide, ke),
              'error' !== e.type && (F(t[2]), ut(i, ''), a(Bt, i, n), a(Lt)),
              l && m()
          }
          function m() {
            d.length && f(d.shift())
          }
          return {
            mount: function () {
              o.lazyLoad && (u(), n(U, u))
            },
            destroy: I(P, d),
            check: p,
          }
        },
        Pagination: function (u, t, p) {
          var f,
            h,
            e = Z(u),
            m = e.on,
            g = e.emit,
            v = e.bind,
            y = t.Slides,
            w = t.Elements,
            _ = t.Controller,
            b = _.hasFocus,
            n = _.getIndex,
            r = _.go,
            a = t.Direction.resolve,
            T = w.pagination,
            k = []
          function S() {
            f && (F(T ? o(f.children) : f), B(f, h), P(k), (f = null)),
              e.destroy()
          }
          function x(t) {
            r('>' + t, !0)
          }
          function C(t, e) {
            var i = k.length,
              n = je(e),
              o = E(),
              s = -1
            n === a(qt, !1, o)
              ? (s = ++t % i)
              : n === a(Qt, !1, o)
                ? (s = (--t + i) % i)
                : 'Home' === n
                  ? (s = 0)
                  : 'End' === n && (s = i - 1),
              (o = k[s]) && (pt(o.button), r('>' + s), R(e, !0))
          }
          function E() {
            return p.paginationDirection || p.direction
          }
          function O(t) {
            return k[_.toPage(t)]
          }
          function A() {
            var t,
              e = O(n(!0)),
              i = O(n())
            e && (B((t = e.button), et), $(t, Gt), z(t, J, -1)),
              i && (M((t = i.button), et), z(t, Gt, !0), z(t, J, '')),
              g('pagination:updated', { list: f, items: k }, e, i)
          }
          return {
            items: k,
            mount: function t() {
              S(), m([X, U, 'ei'], t)
              var e = p.pagination
              if ((T && ut(T, e ? '' : 'none'), e)) {
                m([Y, jt, G], A)
                var e = u.length,
                  i = p.classes,
                  n = p.i18n,
                  o = p.perPage,
                  s = b() ? _.getEnd() + 1 : bt(e / o)
                M(
                  (f = T || D('ul', i.pagination, w.track.parentElement)),
                  (h = me + '--' + E()),
                ),
                  z(f, K, 'tablist'),
                  z(f, tt, n.select),
                  z(f, te, E() === Yt ? 'vertical' : '')
                for (var r = 0; r < s; r++) {
                  var a = D('li', null, f),
                    l = D('button', { class: i.page, type: 'button' }, a),
                    c = y.getIn(r).map(function (t) {
                      return t.slide.id
                    }),
                    d = !b() && 1 < o ? n.pageX : n.slideX
                  v(l, 'click', I(x, r)),
                    p.paginationKeyboard && v(l, 'keydown', I(C, r)),
                    z(a, K, 'presentation'),
                    z(l, K, 'tab'),
                    z(l, Ut, c.join(' ')),
                    z(l, tt, xt(d, r + 1)),
                    z(l, J, -1),
                    k.push({ li: a, button: l, page: r })
                }
                A(), g('pagination:mounted', { list: f, items: k }, O(u.index))
              }
            },
            destroy: S,
            getAt: O,
            update: A,
          }
        },
        Sync: function (i, t, e) {
          var n = e.isNavigation,
            o = e.slideFocus,
            s = []
          function r() {
            var t, e
            i.splides.forEach(function (t) {
              t.isParent || (l(i, t.splide), l(t.splide, i))
            }),
              n &&
                ((e = (t = Z(i)).on)(Pt, d),
                e(Nt, u),
                e([q, X], c),
                s.push(t),
                t.emit(Ft, i.splides))
          }
          function a() {
            s.forEach(function (t) {
              t.destroy()
            }),
              P(s)
          }
          function l(t, n) {
            ;(t = Z(t)).on(Y, function (t, e, i) {
              n.go(n.is(Me) ? i : t)
            }),
              s.push(t)
          }
          function c() {
            z(t.Elements.list, te, e.direction === Yt ? 'vertical' : '')
          }
          function d(t) {
            i.go(t.index)
          }
          function u(t, e) {
            w(Ne, je(e)) && (d(t), R(e))
          }
          return {
            setup: I(t.Media.set, { slideFocus: st(o) ? n : o }, !0),
            mount: r,
            destroy: a,
            remount: function () {
              a(), r()
            },
          }
        },
        Wheel: function (r, a, l) {
          var t = Z(r).bind,
            c = 0
          function e(t) {
            var e, i, n, o, s
            t.cancelable &&
              ((e = (s = t.deltaY) < 0),
              (i = vt(t)),
              (n = l.wheelMinThreshold || 0),
              (o = l.wheelSleep || 0),
              W(s) > n && o < i - c && (r.go(e ? '<' : '>'), (c = i)),
              (s = e),
              (l.releaseWheel &&
                !r.state.is(H) &&
                -1 === a.Controller.getAdjacent(s)) ||
                R(t))
          }
          return {
            mount: function () {
              l.wheel && t(a.Elements.track, 'wheel', e, Le)
            },
          }
        },
        Live: function (t, e, i) {
          var n = Z(t).on,
            o = e.Elements.track,
            s = i.live && !i.isNavigation,
            r = D('span', we),
            a = Wt(90, I(l, !1))
          function l(t) {
            z(o, ie, t), t ? (x(o, r), a.start()) : (F(r), a.cancel())
          }
          function c(t) {
            s && z(o, u, t ? 'off' : 'polite')
          }
          return {
            mount: function () {
              s &&
                (c(!e.Autoplay.isPaused()),
                z(o, ne, !0),
                (r.textContent = '…'),
                n(Ht, I(c, !0)),
                n(Rt, I(c, !1)),
                n([At, G], I(l, !0)))
            },
            disable: c,
            destroy: function () {
              $(o, [u, ne, ie]), F(r)
            },
          }
        },
      }),
      We = {
        type: 'slide',
        role: 'region',
        speed: 400,
        perPage: 1,
        cloneStatus: !0,
        arrows: !0,
        pagination: !0,
        paginationKeyboard: !0,
        interval: 5e3,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        resetProgress: !0,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        drag: !0,
        direction: 'ltr',
        trimSpace: !0,
        focusableNodes: 'a, button, textarea, input, select, iframe',
        live: !0,
        classes: {
          slide: le,
          clone: ce,
          arrows: ue,
          arrow: pe,
          prev: fe,
          next: he,
          pagination: me,
          page: ge,
          spinner: e + 'spinner',
        },
        i18n: {
          prev: 'Previous slide',
          next: 'Next slide',
          first: 'Go to first slide',
          last: 'Go to last slide',
          slideX: 'Go to slide %s',
          pageX: 'Go to page %s',
          play: 'Start autoplay',
          pause: 'Pause autoplay',
          carousel: 'carousel',
          slide: 'slide',
          select: 'Select a slide to show',
          slideLabel: '%s of %s',
        },
        reducedMotion: { speed: 0, rewindSpeed: 0, autoplay: 'pause' },
      }
    function Qe(t, e, i) {
      var n = e.Slides
      function o() {
        n.forEach(function (t) {
          t.style('transform', 'translateX(-' + 100 * t.index + '%)')
        })
      }
      return {
        mount: function () {
          Z(t).on([q, U], o)
        },
        start: function (t, e) {
          n.style('transition', 'opacity ' + i.speed + 'ms ' + i.easing), m(e)
        },
        cancel: nt,
      }
    }
    function qe(s, t, r) {
      var a,
        l = t.Move,
        c = t.Controller,
        d = t.Scroll,
        e = t.Elements.list,
        u = I(O, e, 'transition')
      function i() {
        u(''), d.cancel()
      }
      return {
        mount: function () {
          Z(s).bind(e, 'transitionend', function (t) {
            t.target === e && a && (i(), a())
          })
        },
        start: function (t, e) {
          var i = l.toPosition(t, !0),
            n = l.getPosition(),
            o = (function (t) {
              var e = r.rewindSpeed
              if (s.is(Pe) && e) {
                var i = c.getIndex(!0),
                  n = c.getEnd()
                if ((0 === i && n <= t) || (n <= i && 0 === t)) return e
              }
              return r.speed
            })(t)
          1 <= W(i - n) && 1 <= o
            ? r.useScroll
              ? d.scroll(i, o, !1, e)
              : (u('transform ' + o + 'ms ' + r.easing),
                l.translate(i, !0),
                (a = e))
            : (l.jump(t), e())
        },
        cancel: i,
      }
    }
    function Ye(t, e) {
      var i
      ;(this.event = Z()),
        (this.Components = {}),
        (this.state =
          ((i = 1),
          {
            set: function (t) {
              i = t
            },
            is: function (t) {
              return w(y(t), i)
            },
          })),
        (this.splides = []),
        (this.n = {}),
        (this.t = {}),
        yt((t = L(t) ? mt(document, t) : t), t + ' is invalid.'),
        (e = p(
          { label: A((this.root = t), tt) || '', labelledby: A(t, Zt) || '' },
          We,
          Ye.defaults,
          e || {},
        ))
      try {
        p(e, JSON.parse(A(t, a)))
      } catch (t) {
        yt(!1, 'Invalid JSON')
      }
      this.n = Object.create(p({}, e))
    }
    return (
      ((t = Ye.prototype).mount = function (t, e) {
        var i = this,
          n = this.state,
          o = this.Components
        return (
          yt(n.is([1, 7]), 'Already mounted!'),
          n.set(1),
          (this.i = o),
          (this.r = e || this.r || (this.is($e) ? Qe : qe)),
          (this.t = t || this.t),
          _(ct({}, Ve, this.t, { Transition: this.r }), function (t, e) {
            ;(t = t(i, o, i.n)), (o[e] = t).setup && t.setup()
          }),
          _(o, function (t) {
            t.mount && t.mount()
          }),
          this.emit(q),
          M(this.root, 'is-initialized'),
          n.set(3),
          this.emit('ready'),
          this
        )
      }),
      (t.sync = function (t) {
        return (
          this.splides.push({ splide: t }),
          t.splides.push({ splide: this, isParent: !0 }),
          this.state.is(3) &&
            (this.i.Sync.remount(), t.Components.Sync.remount()),
          this
        )
      }),
      (t.go = function (t) {
        return this.i.Controller.go(t), this
      }),
      (t.on = function (t, e) {
        return this.event.on(t, e), this
      }),
      (t.off = function (t) {
        return this.event.off(t), this
      }),
      (t.emit = function (t) {
        var e
        return (e = this.event).emit.apply(e, [t].concat(o(arguments, 1))), this
      }),
      (t.add = function (t, e) {
        return this.i.Slides.add(t, e), this
      }),
      (t.remove = function (t) {
        return this.i.Slides.remove(t), this
      }),
      (t.is = function (t) {
        return this.n.type === t
      }),
      (t.refresh = function () {
        return this.emit(U), this
      }),
      (t.destroy = function (e) {
        void 0 === e && (e = !0)
        var t = this.event,
          i = this.state
        return (
          i.is(1)
            ? Z(this).on('ready', this.destroy.bind(this, e))
            : (_(
                this.i,
                function (t) {
                  t.destroy && t.destroy(e)
                },
                !0,
              ),
              t.emit(l),
              t.destroy(),
              e && P(this.splides),
              i.set(7)),
          this
        )
      }),
      Jt(Ye, [
        {
          key: 'options',
          get: function () {
            return this.n
          },
          set: function (t) {
            this.i.Media.set(t, !0, !0)
          },
        },
        {
          key: 'length',
          get: function () {
            return this.i.Slides.getLength(!0)
          },
        },
        {
          key: 'index',
          get: function () {
            return this.i.Controller.getIndex()
          },
        },
      ]),
      ((c = Ye).defaults = {}),
      (c.STATES = i),
      c
    )
  }),
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define(t)
      : ((n =
          'undefined' != typeof globalThis ? globalThis : n || self).Splide =
          t()),
  (function (t) {
    'function' == typeof define && define.amd
      ? define(['jquery'], t)
      : 'object' == typeof exports
        ? t(require('jquery'))
        : t(window.jQuery || window.Zepto)
  })(function (c) {
    function t() {}
    function d(t, e) {
      h.ev.on('mfp' + t + k, e)
    }
    function u(t, e, i, n) {
      var o = document.createElement('div')
      return (
        (o.className = 'mfp-' + t),
        i && (o.innerHTML = i),
        n ? e && e.appendChild(o) : ((o = c(o)), e && o.appendTo(e)),
        o
      )
    }
    function p(t, e) {
      h.ev.triggerHandler('mfp' + t, e),
        h.st.callbacks &&
          ((t = t.charAt(0).toLowerCase() + t.slice(1)), h.st.callbacks[t]) &&
          h.st.callbacks[t].apply(h, c.isArray(e) ? e : [e])
    }
    function f(t) {
      return (
        (t === i && h.currTemplate.closeBtn) ||
          ((h.currTemplate.closeBtn = c(
            h.st.closeMarkup.replace('%title%', h.st.tClose),
          )),
          (i = t)),
        h.currTemplate.closeBtn
      )
    }
    function s() {
      c.magnificPopup.instance ||
        ((h = new t()).init(), (c.magnificPopup.instance = h))
    }
    function r() {
      y && (v.after(y.addClass(l)).detach(), (y = null))
    }
    function o() {
      w && c(document.body).removeClass(w)
    }
    function e() {
      o(), h.req && h.req.abort()
    }
    var h,
      n,
      m,
      a,
      g,
      i,
      l,
      v,
      y,
      w,
      _ = 'Close',
      D = 'BeforeClose',
      b = 'MarkupParse',
      T = 'Open',
      k = '.mfp',
      S = 'mfp-ready',
      j = 'mfp-removing',
      x = 'mfp-prevent-close',
      C = !!window.jQuery,
      E = c(window),
      O =
        ((c.magnificPopup = {
          instance: null,
          proto: (t.prototype = {
            constructor: t,
            init: function () {
              var t = navigator.appVersion
              ;(h.isLowIE = h.isIE8 =
                document.all && !document.addEventListener),
                (h.isAndroid = /android/gi.test(t)),
                (h.isIOS = /iphone|ipad|ipod/gi.test(t)),
                (h.supportsTransition = (function () {
                  var t = document.createElement('p').style,
                    e = ['ms', 'O', 'Moz', 'Webkit']
                  if (void 0 !== t.transition) return !0
                  for (; e.length; ) if (e.pop() + 'Transition' in t) return !0
                  return !1
                })()),
                (h.probablyMobile =
                  h.isAndroid ||
                  h.isIOS ||
                  /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
                    navigator.userAgent,
                  )),
                (m = c(document)),
                (h.popupsCache = {})
            },
            open: function (t) {
              if (!1 === t.isObj) {
                ;(h.items = t.items.toArray()), (h.index = 0)
                for (var e, i = t.items, n = 0; n < i.length; n++)
                  if ((e = (e = i[n]).parsed ? e.el[0] : e) === t.el[0]) {
                    h.index = n
                    break
                  }
              } else
                (h.items = c.isArray(t.items) ? t.items : [t.items]),
                  (h.index = t.index || 0)
              if (!h.isOpen) {
                ;(h.types = []),
                  (g = ''),
                  t.mainEl && t.mainEl.length
                    ? (h.ev = t.mainEl.eq(0))
                    : (h.ev = m),
                  t.key
                    ? (h.popupsCache[t.key] || (h.popupsCache[t.key] = {}),
                      (h.currTemplate = h.popupsCache[t.key]))
                    : (h.currTemplate = {}),
                  (h.st = c.extend(!0, {}, c.magnificPopup.defaults, t)),
                  (h.fixedContentPos =
                    'auto' === h.st.fixedContentPos
                      ? !h.probablyMobile
                      : h.st.fixedContentPos),
                  h.st.modal &&
                    ((h.st.closeOnContentClick = !1),
                    (h.st.closeOnBgClick = !1),
                    (h.st.showCloseBtn = !1),
                    (h.st.enableEscapeKey = !1)),
                  h.bgOverlay ||
                    ((h.bgOverlay = u('bg').on('click' + k, function () {
                      h.close()
                    })),
                    (h.wrap = u('wrap')
                      .attr('tabindex', -1)
                      .on('click' + k, function (t) {
                        h._checkIfClose(t.target) && h.close()
                      })),
                    (h.container = u('container', h.wrap))),
                  (h.contentContainer = u('content')),
                  h.st.preloader &&
                    (h.preloader = u('preloader', h.container, h.st.tLoading))
                var o = c.magnificPopup.modules
                for (n = 0; n < o.length; n++) {
                  var s = (s = o[n]).charAt(0).toUpperCase() + s.slice(1)
                  h['init' + s].call(h)
                }
                p('BeforeOpen'),
                  h.st.showCloseBtn &&
                    (h.st.closeBtnInside
                      ? (d(b, function (t, e, i, n) {
                          i.close_replaceWith = f(n.type)
                        }),
                        (g += ' mfp-close-btn-in'))
                      : h.wrap.append(f())),
                  h.st.alignTop && (g += ' mfp-align-top'),
                  h.fixedContentPos
                    ? h.wrap.css({
                        overflow: h.st.overflowY,
                        overflowX: 'hidden',
                        overflowY: h.st.overflowY,
                      })
                    : h.wrap.css({ top: E.scrollTop(), position: 'absolute' }),
                  (!1 !== h.st.fixedBgPos &&
                    ('auto' !== h.st.fixedBgPos || h.fixedContentPos)) ||
                    h.bgOverlay.css({
                      height: m.height(),
                      position: 'absolute',
                    }),
                  h.st.enableEscapeKey &&
                    m.on('keyup' + k, function (t) {
                      27 === t.keyCode && h.close()
                    }),
                  E.on('resize' + k, function () {
                    h.updateSize()
                  }),
                  h.st.closeOnContentClick || (g += ' mfp-auto-cursor'),
                  g && h.wrap.addClass(g)
                var r = (h.wH = E.height()),
                  a = {},
                  l =
                    (h.fixedContentPos &&
                      h._hasScrollBar(r) &&
                      (l = h._getScrollbarSize()) &&
                      (a.marginRight = l),
                    h.fixedContentPos &&
                      (h.isIE7
                        ? c('body, html').css('overflow', 'hidden')
                        : (a.overflow = 'hidden')),
                    h.st.mainClass)
                return (
                  h.isIE7 && (l += ' mfp-ie7'),
                  l && h._addClassToMFP(l),
                  h.updateItemHTML(),
                  p('BuildControls'),
                  c('html').css(a),
                  h.bgOverlay
                    .add(h.wrap)
                    .prependTo(h.st.prependTo || c(document.body)),
                  (h._lastFocusedEl = document.activeElement),
                  setTimeout(function () {
                    h.content
                      ? (h._addClassToMFP(S), h._setFocus())
                      : h.bgOverlay.addClass(S),
                      m.on('focusin' + k, h._onFocusIn)
                  }, 16),
                  (h.isOpen = !0),
                  h.updateSize(r),
                  p(T),
                  t
                )
              }
              h.updateItemHTML()
            },
            close: function () {
              h.isOpen &&
                (p(D),
                (h.isOpen = !1),
                h.st.removalDelay && !h.isLowIE && h.supportsTransition
                  ? (h._addClassToMFP(j),
                    setTimeout(function () {
                      h._close()
                    }, h.st.removalDelay))
                  : h._close())
            },
            _close: function () {
              p(_)
              var t = j + ' ' + S + ' '
              h.bgOverlay.detach(),
                h.wrap.detach(),
                h.container.empty(),
                h.st.mainClass && (t += h.st.mainClass + ' '),
                h._removeClassFromMFP(t),
                h.fixedContentPos &&
                  ((t = { marginRight: '' }),
                  h.isIE7
                    ? c('body, html').css('overflow', '')
                    : (t.overflow = ''),
                  c('html').css(t)),
                m.off('keyup.mfp focusin' + k),
                h.ev.off(k),
                h.wrap.attr('class', 'mfp-wrap').removeAttr('style'),
                h.bgOverlay.attr('class', 'mfp-bg'),
                h.container.attr('class', 'mfp-container'),
                !h.st.showCloseBtn ||
                  (h.st.closeBtnInside &&
                    !0 !== h.currTemplate[h.currItem.type]) ||
                  (h.currTemplate.closeBtn && h.currTemplate.closeBtn.detach()),
                h.st.autoFocusLast &&
                  h._lastFocusedEl &&
                  c(h._lastFocusedEl).focus(),
                (h.currItem = null),
                (h.content = null),
                (h.currTemplate = null),
                (h.prevHeight = 0),
                p('AfterClose')
            },
            updateSize: function (t) {
              var e
              h.isIOS
                ? ((e =
                    document.documentElement.clientWidth / window.innerWidth),
                  (e = window.innerHeight * e),
                  h.wrap.css('height', e),
                  (h.wH = e))
                : (h.wH = t || E.height()),
                h.fixedContentPos || h.wrap.css('height', h.wH),
                p('Resize')
            },
            updateItemHTML: function () {
              var t = h.items[h.index],
                e =
                  (h.contentContainer.detach(),
                  h.content && h.content.detach(),
                  (t = t.parsed ? t : h.parseEl(h.index)).type),
                i =
                  (p('BeforeChange', [h.currItem ? h.currItem.type : '', e]),
                  (h.currItem = t),
                  h.currTemplate[e] ||
                    ((i = !!h.st[e] && h.st[e].markup),
                    p('FirstMarkupParse', i),
                    (h.currTemplate[e] = !i || c(i))),
                  a &&
                    a !== t.type &&
                    h.container.removeClass('mfp-' + a + '-holder'),
                  h['get' + e.charAt(0).toUpperCase() + e.slice(1)](
                    t,
                    h.currTemplate[e],
                  ))
              h.appendContent(i, e),
                (t.preloaded = !0),
                p('Change', t),
                (a = t.type),
                h.container.prepend(h.contentContainer),
                p('AfterChange')
            },
            appendContent: function (t, e) {
              ;(h.content = t)
                ? h.st.showCloseBtn &&
                  h.st.closeBtnInside &&
                  !0 === h.currTemplate[e]
                  ? h.content.find('.mfp-close').length || h.content.append(f())
                  : (h.content = t)
                : (h.content = ''),
                p('BeforeAppend'),
                h.container.addClass('mfp-' + e + '-holder'),
                h.contentContainer.append(h.content)
            },
            parseEl: function (t) {
              var e,
                i = h.items[t]
              if (
                (i = i.tagName
                  ? { el: c(i) }
                  : ((e = i.type), { data: i, src: i.src })).el
              ) {
                for (var n = h.types, o = 0; o < n.length; o++)
                  if (i.el.hasClass('mfp-' + n[o])) {
                    e = n[o]
                    break
                  }
                ;(i.src = i.el.attr('data-mfp-src')),
                  i.src || (i.src = i.el.attr('href'))
              }
              return (
                (i.type = e || h.st.type || 'inline'),
                (i.index = t),
                (i.parsed = !0),
                (h.items[t] = i),
                p('ElementParse', i),
                h.items[t]
              )
            },
            addGroup: function (e, i) {
              function t(t) {
                ;(t.mfpEl = this), h._openClick(t, e, i)
              }
              var n = 'click.magnificPopup'
              ;((i = i || {}).mainEl = e),
                i.items
                  ? ((i.isObj = !0), e.off(n).on(n, t))
                  : ((i.isObj = !1),
                    i.delegate
                      ? e.off(n).on(n, i.delegate, t)
                      : (i.items = e).off(n).on(n, t))
            },
            _openClick: function (t, e, i) {
              var n = (void 0 !== i.midClick ? i : c.magnificPopup.defaults)
                .midClick
              if (
                n ||
                !(
                  2 === t.which ||
                  t.ctrlKey ||
                  t.metaKey ||
                  t.altKey ||
                  t.shiftKey
                )
              ) {
                n = (void 0 !== i.disableOn ? i : c.magnificPopup.defaults)
                  .disableOn
                if (n)
                  if (c.isFunction(n)) {
                    if (!n.call(h)) return !0
                  } else if (E.width() < n) return !0
                t.type && (t.preventDefault(), h.isOpen) && t.stopPropagation(),
                  (i.el = c(t.mfpEl)),
                  i.delegate && (i.items = e.find(i.delegate)),
                  h.open(i)
              }
            },
            updateStatus: function (t, e) {
              var i
              h.preloader &&
                (n !== t && h.container.removeClass('mfp-s-' + n),
                (i = {
                  status: t,
                  text: (e = e || 'loading' !== t ? e : h.st.tLoading),
                }),
                p('UpdateStatus', i),
                (t = i.status),
                h.preloader.html((e = i.text)),
                h.preloader.find('a').on('click', function (t) {
                  t.stopImmediatePropagation()
                }),
                h.container.addClass('mfp-s-' + t),
                (n = t))
            },
            _checkIfClose: function (t) {
              if (!c(t).hasClass(x)) {
                var e = h.st.closeOnContentClick,
                  i = h.st.closeOnBgClick
                if (e && i) return !0
                if (
                  !h.content ||
                  c(t).hasClass('mfp-close') ||
                  (h.preloader && t === h.preloader[0])
                )
                  return !0
                if (t === h.content[0] || c.contains(h.content[0], t)) {
                  if (e) return !0
                } else if (i && c.contains(document, t)) return !0
                return !1
              }
            },
            _addClassToMFP: function (t) {
              h.bgOverlay.addClass(t), h.wrap.addClass(t)
            },
            _removeClassFromMFP: function (t) {
              this.bgOverlay.removeClass(t), h.wrap.removeClass(t)
            },
            _hasScrollBar: function (t) {
              return (
                (h.isIE7 ? m.height() : document.body.scrollHeight) >
                (t || E.height())
              )
            },
            _setFocus: function () {
              ;(h.st.focus ? h.content.find(h.st.focus).eq(0) : h.wrap).focus()
            },
            _onFocusIn: function (t) {
              if (t.target !== h.wrap[0] && !c.contains(h.wrap[0], t.target))
                return h._setFocus(), !1
            },
            _parseMarkup: function (o, t, e) {
              var s
              e.data && (t = c.extend(e.data, t)),
                p(b, [o, t, e]),
                c.each(t, function (t, e) {
                  if (void 0 === e || !1 === e) return !0
                  var i, n
                  1 < (s = t.split('_')).length
                    ? 0 < (i = o.find(k + '-' + s[0])).length &&
                      ('replaceWith' === (n = s[1])
                        ? i[0] !== e[0] && i.replaceWith(e)
                        : 'img' === n
                          ? i.is('img')
                            ? i.attr('src', e)
                            : i.replaceWith(
                                c('<img>')
                                  .attr('src', e)
                                  .attr('class', i.attr('class')),
                              )
                          : i.attr(s[1], e))
                    : o.find(k + '-' + t).html(e)
                })
            },
            _getScrollbarSize: function () {
              var t
              return (
                void 0 === h.scrollbarSize &&
                  (((t = document.createElement('div')).style.cssText =
                    'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;'),
                  document.body.appendChild(t),
                  (h.scrollbarSize = t.offsetWidth - t.clientWidth),
                  document.body.removeChild(t)),
                h.scrollbarSize
              )
            },
          }),
          modules: [],
          open: function (t, e) {
            return (
              s(),
              ((t = t ? c.extend(!0, {}, t) : {}).isObj = !0),
              (t.index = e || 0),
              this.instance.open(t)
            )
          },
          close: function () {
            return c.magnificPopup.instance && c.magnificPopup.instance.close()
          },
          registerModule: function (t, e) {
            e.options && (c.magnificPopup.defaults[t] = e.options),
              c.extend(this.proto, e.proto),
              this.modules.push(t)
          },
          defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: '',
            preloader: !0,
            focus: '',
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: 'auto',
            fixedBgPos: 'auto',
            overflowY: 'auto',
            closeMarkup:
              '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: 'Close (Esc)',
            tLoading: 'Loading...',
            autoFocusLast: !0,
          },
        }),
        (c.fn.magnificPopup = function (t) {
          s()
          var e,
            i,
            n,
            o = c(this)
          return (
            'string' == typeof t
              ? 'open' === t
                ? ((e = C ? o.data('magnificPopup') : o[0].magnificPopup),
                  (i = parseInt(arguments[1], 10) || 0),
                  (n = e.items
                    ? e.items[i]
                    : ((n = o),
                      (n = e.delegate ? n.find(e.delegate) : n).eq(i))),
                  h._openClick({ mfpEl: n }, o, e))
                : h.isOpen &&
                  h[t].apply(h, Array.prototype.slice.call(arguments, 1))
              : ((t = c.extend(!0, {}, t)),
                C ? o.data('magnificPopup', t) : (o[0].magnificPopup = t),
                h.addGroup(o, t)),
            o
          )
        }),
        'inline'),
      A =
        (c.magnificPopup.registerModule(O, {
          options: {
            hiddenClass: 'hide',
            markup: '',
            tNotFound: 'Content not found',
          },
          proto: {
            initInline: function () {
              h.types.push(O),
                d(_ + '.' + O, function () {
                  r()
                })
            },
            getInline: function (t, e) {
              var i, n, o
              return (
                r(),
                t.src
                  ? ((i = h.st.inline),
                    (n = c(t.src)).length
                      ? ((o = n[0].parentNode) &&
                          o.tagName &&
                          (v ||
                            ((l = i.hiddenClass), (v = u(l)), (l = 'mfp-' + l)),
                          (y = n.after(v).detach().removeClass(l))),
                        h.updateStatus('ready'))
                      : (h.updateStatus('error', i.tNotFound),
                        (n = c('<div>'))),
                    (t.inlineElement = n))
                  : (h.updateStatus('ready'), h._parseMarkup(e, {}, t), e)
              )
            },
          },
        }),
        'ajax')
    c.magnificPopup.registerModule(A, {
      options: {
        settings: null,
        cursor: 'mfp-ajax-cur',
        tError: '<a href="%url%">The content</a> could not be loaded.',
      },
      proto: {
        initAjax: function () {
          h.types.push(A),
            (w = h.st.ajax.cursor),
            d(_ + '.' + A, e),
            d('BeforeChange.' + A, e)
        },
        getAjax: function (n) {
          w && c(document.body).addClass(w), h.updateStatus('loading')
          var t = c.extend(
            {
              url: n.src,
              success: function (t, e, i) {
                t = { data: t, xhr: i }
                p('ParseAjax', t),
                  h.appendContent(c(t.data), A),
                  (n.finished = !0),
                  o(),
                  h._setFocus(),
                  setTimeout(function () {
                    h.wrap.addClass(S)
                  }, 16),
                  h.updateStatus('ready'),
                  p('AjaxContentAdded')
              },
              error: function () {
                o(),
                  (n.finished = n.loadError = !0),
                  h.updateStatus(
                    'error',
                    h.st.ajax.tError.replace('%url%', n.src),
                  )
              },
            },
            h.st.ajax.settings,
          )
          return (h.req = c.ajax(t)), ''
        },
      },
    })
    var P
    c.magnificPopup.registerModule('image', {
      options: {
        markup:
          '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
        cursor: 'mfp-zoom-out-cur',
        titleSrc: 'title',
        verticalFit: !0,
        tError: '<a href="%url%">The image</a> could not be loaded.',
      },
      proto: {
        initImage: function () {
          var t = h.st.image,
            e = '.image'
          h.types.push('image'),
            d(T + e, function () {
              'image' === h.currItem.type &&
                t.cursor &&
                c(document.body).addClass(t.cursor)
            }),
            d(_ + e, function () {
              t.cursor && c(document.body).removeClass(t.cursor),
                E.off('resize' + k)
            }),
            d('Resize' + e, h.resizeImage),
            h.isLowIE && d('AfterChange', h.resizeImage)
        },
        resizeImage: function () {
          var t,
            e = h.currItem
          e &&
            e.img &&
            h.st.image.verticalFit &&
            ((t = 0),
            h.isLowIE &&
              (t =
                parseInt(e.img.css('padding-top'), 10) +
                parseInt(e.img.css('padding-bottom'), 10)),
            e.img.css('max-height', h.wH - t))
        },
        _onImageHasSize: function (t) {
          t.img &&
            ((t.hasSize = !0),
            P && clearInterval(P),
            (t.isCheckingImgSize = !1),
            p('ImageHasSize', t),
            t.imgHidden) &&
            (h.content && h.content.removeClass('mfp-loading'),
            (t.imgHidden = !1))
        },
        findImageSize: function (e) {
          function i(t) {
            P && clearInterval(P),
              (P = setInterval(function () {
                0 < o.naturalWidth
                  ? h._onImageHasSize(e)
                  : (200 < n && clearInterval(P),
                    3 === ++n ? i(10) : 40 === n ? i(50) : 100 === n && i(500))
              }, t))
          }
          var n = 0,
            o = e.img[0]
          i(1)
        },
        getImage: function (t, e) {
          function i() {
            t &&
              (t.img[0].complete
                ? (t.img.off('.mfploader'),
                  t === h.currItem &&
                    (h._onImageHasSize(t), h.updateStatus('ready')),
                  (t.hasSize = !0),
                  (t.loaded = !0),
                  p('ImageLoadComplete'))
                : ++s < 200
                  ? setTimeout(i, 100)
                  : n())
          }
          function n() {
            t &&
              (t.img.off('.mfploader'),
              t === h.currItem &&
                (h._onImageHasSize(t),
                h.updateStatus('error', r.tError.replace('%url%', t.src))),
              (t.hasSize = !0),
              (t.loaded = !0),
              (t.loadError = !0))
          }
          var o,
            s = 0,
            r = h.st.image,
            a = e.find('.mfp-img')
          return (
            a.length &&
              (((o = document.createElement('img')).className = 'mfp-img'),
              t.el &&
                t.el.find('img').length &&
                (o.alt = t.el.find('img').attr('alt')),
              (t.img = c(o).on('load.mfploader', i).on('error.mfploader', n)),
              (o.src = t.src),
              a.is('img') && (t.img = t.img.clone()),
              0 < (o = t.img[0]).naturalWidth
                ? (t.hasSize = !0)
                : o.width || (t.hasSize = !1)),
            h._parseMarkup(
              e,
              {
                title: (function (t) {
                  if (t.data && void 0 !== t.data.title) return t.data.title
                  var e = h.st.image.titleSrc
                  if (e) {
                    if (c.isFunction(e)) return e.call(h, t)
                    if (t.el) return t.el.attr(e) || ''
                  }
                  return ''
                })(t),
                img_replaceWith: t.img,
              },
              t,
            ),
            h.resizeImage(),
            t.hasSize
              ? (P && clearInterval(P),
                t.loadError
                  ? (e.addClass('mfp-loading'),
                    h.updateStatus('error', r.tError.replace('%url%', t.src)))
                  : (e.removeClass('mfp-loading'), h.updateStatus('ready')))
              : (h.updateStatus('loading'),
                (t.loading = !0),
                t.hasSize ||
                  ((t.imgHidden = !0),
                  e.addClass('mfp-loading'),
                  h.findImageSize(t))),
            e
          )
        },
      },
    })
    function M(t) {
      var e
      h.currTemplate[I] &&
        (e = h.currTemplate[I].find('iframe')).length &&
        (t || (e[0].src = '//about:blank'), h.isIE8) &&
        e.css('display', t ? 'block' : 'none')
    }
    function $(t) {
      var e = h.items.length
      return e - 1 < t ? t - e : t < 0 ? e + t : t
    }
    function F(t, e, i) {
      return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
    }
    c.magnificPopup.registerModule('zoom', {
      options: {
        enabled: !1,
        easing: 'ease-in-out',
        duration: 300,
        opener: function (t) {
          return t.is('img') ? t : t.find('img')
        },
      },
      proto: {
        initZoom: function () {
          var t,
            e,
            i,
            n,
            o,
            s,
            r = h.st.zoom,
            a = '.zoom'
          r.enabled &&
            h.supportsTransition &&
            ((e = r.duration),
            (i = function (t) {
              var t = t
                  .clone()
                  .removeAttr('style')
                  .removeAttr('class')
                  .addClass('mfp-animated-image'),
                e = 'all ' + r.duration / 1e3 + 's ' + r.easing,
                i = {
                  position: 'fixed',
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  '-webkit-backface-visibility': 'hidden',
                },
                n = 'transition'
              return (
                (i['-webkit-' + n] = i['-moz-' + n] = i['-o-' + n] = i[n] = e),
                t.css(i),
                t
              )
            }),
            (n = function () {
              h.content.css('visibility', 'visible')
            }),
            d('BuildControls' + a, function () {
              h._allowZoom() &&
                (clearTimeout(o),
                h.content.css('visibility', 'hidden'),
                (t = h._getItemToZoom())
                  ? ((s = i(t)).css(h._getOffset()),
                    h.wrap.append(s),
                    (o = setTimeout(function () {
                      s.css(h._getOffset(!0)),
                        (o = setTimeout(function () {
                          n(),
                            setTimeout(function () {
                              s.remove(),
                                (t = s = null),
                                p('ZoomAnimationEnded')
                            }, 16)
                        }, e))
                    }, 16)))
                  : n())
            }),
            d(D + a, function () {
              if (h._allowZoom()) {
                if ((clearTimeout(o), (h.st.removalDelay = e), !t)) {
                  if (!(t = h._getItemToZoom())) return
                  s = i(t)
                }
                s.css(h._getOffset(!0)),
                  h.wrap.append(s),
                  h.content.css('visibility', 'hidden'),
                  setTimeout(function () {
                    s.css(h._getOffset())
                  }, 16)
              }
            }),
            d(_ + a, function () {
              h._allowZoom() && (n(), s && s.remove(), (t = null))
            }))
        },
        _allowZoom: function () {
          return 'image' === h.currItem.type
        },
        _getItemToZoom: function () {
          return !!h.currItem.hasSize && h.currItem.img
        },
        _getOffset: function (t) {
          var t = t
              ? h.currItem.img
              : h.st.zoom.opener(h.currItem.el || h.currItem),
            e = t.offset(),
            i = parseInt(t.css('padding-top'), 10),
            n = parseInt(t.css('padding-bottom'), 10),
            t =
              ((e.top -= c(window).scrollTop() - i),
              {
                width: t.width(),
                height: (C ? t.innerHeight() : t[0].offsetHeight) - n - i,
              })
          return (
            (z =
              void 0 === z
                ? void 0 !== document.createElement('p').style.MozTransform
                : z)
              ? (t['-moz-transform'] = t.transform =
                  'translate(' + e.left + 'px,' + e.top + 'px)')
              : ((t.left = e.left), (t.top = e.top)),
            t
          )
        },
      },
    })
    var z,
      I = 'iframe',
      L =
        (c.magnificPopup.registerModule(I, {
          options: {
            markup:
              '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: 'iframe_src',
            patterns: {
              youtube: {
                index: 'youtube.com',
                id: 'v=',
                src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0&loop=1',
              },
              vimeo: {
                index: 'vimeo.com/',
                id: '/',
                src: '//player.vimeo.com/video/%id%?autoplay=1&rel=0&loop=1',
              },
              gmaps: { index: '//maps.google.', src: '%id%&output=embed' },
            },
          },
          proto: {
            initIframe: function () {
              h.types.push(I),
                d('BeforeChange', function (t, e, i) {
                  e !== i && (e === I ? M() : i === I && M(!0))
                }),
                d(_ + '.' + I, function () {
                  M()
                })
            },
            getIframe: function (t, e) {
              var i = t.src,
                n = h.st.iframe,
                o =
                  (c.each(n.patterns, function () {
                    if (-1 < i.indexOf(this.index))
                      return (
                        this.id &&
                          (i =
                            'string' == typeof this.id
                              ? i.substr(
                                  i.lastIndexOf(this.id) + this.id.length,
                                  i.length,
                                )
                              : this.id.call(this, i)),
                        (i = this.src.replace('%id%', i)),
                        !1
                      )
                  }),
                  {})
              return (
                n.srcAction && (o[n.srcAction] = i),
                h._parseMarkup(e, o, t),
                h.updateStatus('ready'),
                e
              )
            },
          },
        }),
        c.magnificPopup.registerModule('gallery', {
          options: {
            enabled: !1,
            arrowMarkup:
              '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: 'Previous (Left arrow key)',
            tNext: 'Next (Right arrow key)',
            tCounter: '%curr% of %total%',
          },
          proto: {
            initGallery: function () {
              var s = h.st.gallery,
                t = '.mfp-gallery'
              if (((h.direction = !0), !s || !s.enabled)) return !1
              ;(g += ' mfp-gallery'),
                d(T + t, function () {
                  s.navigateByImgClick &&
                    h.wrap.on('click' + t, '.mfp-img', function () {
                      if (1 < h.items.length) return h.next(), !1
                    }),
                    m.on('keydown' + t, function (t) {
                      37 === t.keyCode ? h.prev() : 39 === t.keyCode && h.next()
                    })
                }),
                d('UpdateStatus' + t, function (t, e) {
                  e.text &&
                    (e.text = F(e.text, h.currItem.index, h.items.length))
                }),
                d(b + t, function (t, e, i, n) {
                  var o = h.items.length
                  i.counter = 1 < o ? F(s.tCounter, n.index, o) : ''
                }),
                d('BuildControls' + t, function () {
                  var t, e
                  1 < h.items.length &&
                    s.arrows &&
                    !h.arrowLeft &&
                    ((e = s.arrowMarkup),
                    (t = h.arrowLeft =
                      c(
                        e
                          .replace(/%title%/gi, s.tPrev)
                          .replace(/%dir%/gi, 'left'),
                      ).addClass(x)),
                    (e = h.arrowRight =
                      c(
                        e
                          .replace(/%title%/gi, s.tNext)
                          .replace(/%dir%/gi, 'right'),
                      ).addClass(x)),
                    t.click(function () {
                      h.prev()
                    }),
                    e.click(function () {
                      h.next()
                    }),
                    h.container.append(t.add(e)))
                }),
                d('Change' + t, function () {
                  h._preloadTimeout && clearTimeout(h._preloadTimeout),
                    (h._preloadTimeout = setTimeout(function () {
                      h.preloadNearbyImages(), (h._preloadTimeout = null)
                    }, 16))
                }),
                d(_ + t, function () {
                  m.off(t),
                    h.wrap.off('click' + t),
                    (h.arrowRight = h.arrowLeft = null)
                })
            },
            next: function () {
              ;(h.direction = !0),
                (h.index = $(h.index + 1)),
                h.updateItemHTML()
            },
            prev: function () {
              ;(h.direction = !1),
                (h.index = $(h.index - 1)),
                h.updateItemHTML()
            },
            goTo: function (t) {
              ;(h.direction = t >= h.index), (h.index = t), h.updateItemHTML()
            },
            preloadNearbyImages: function () {
              for (
                var t = h.st.gallery.preload,
                  e = Math.min(t[0], h.items.length),
                  i = Math.min(t[1], h.items.length),
                  n = 1;
                n <= (h.direction ? i : e);
                n++
              )
                h._preloadItem(h.index + n)
              for (n = 1; n <= (h.direction ? e : i); n++)
                h._preloadItem(h.index - n)
            },
            _preloadItem: function (t) {
              var e
              ;(t = $(t)),
                h.items[t].preloaded ||
                  ((e = h.items[t]).parsed || (e = h.parseEl(t)),
                  p('LazyLoad', e),
                  'image' === e.type &&
                    (e.img = c('<img class="mfp-img" />')
                      .on('load.mfploader', function () {
                        e.hasSize = !0
                      })
                      .on('error.mfploader', function () {
                        ;(e.hasSize = !0),
                          (e.loadError = !0),
                          p('LazyLoadError', e)
                      })
                      .attr('src', e.src)),
                  (e.preloaded = !0))
            },
          },
        }),
        'retina')
    c.magnificPopup.registerModule(L, {
      options: {
        replaceSrc: function (t) {
          return t.src.replace(/\.\w+$/, function (t) {
            return '@2x' + t
          })
        },
        ratio: 1,
      },
      proto: {
        initRetina: function () {
          var i, n
          1 < window.devicePixelRatio &&
            ((i = h.st.retina), (n = i.ratio), 1 < (n = isNaN(n) ? n() : n)) &&
            (d('ImageHasSize.' + L, function (t, e) {
              e.img.css({
                'max-width': e.img[0].naturalWidth / n,
                width: '100%',
              })
            }),
            d('ElementParse.' + L, function (t, e) {
              e.src = i.replaceSrc(e, n)
            }))
        },
      },
    }),
      s()
  })
;('use strict')
!(function (t, e) {
  'function' == typeof define && define.amd
    ? define(e)
    : 'object' == typeof exports
      ? (module.exports = e())
      : (t.ResizeSensor = e())
})('undefined' != typeof window ? window : this, function () {
  var e, v, o, s, i
  return 'undefined' == typeof window
    ? null
    : ((e =
        'undefined' != typeof window && window.Math == Math
          ? window
          : 'undefined' != typeof self && self.Math == Math
            ? self
            : Function('return this')()),
      (v =
        e.requestAnimationFrame ||
        e.mozRequestAnimationFrame ||
        e.webkitRequestAnimationFrame ||
        function (t) {
          return e.setTimeout(t, 20)
        }),
      (o =
        e.cancelAnimationFrame ||
        e.mozCancelAnimationFrame ||
        e.webkitCancelAnimationFrame ||
        function (t) {
          e.clearTimeout(t)
        }),
      ((s = function (e, i) {
        var m = 0
        function g() {
          var i,
            n,
            o = []
          ;(this.add = function (t) {
            o.push(t)
          }),
            (this.call = function (t) {
              for (i = 0, n = o.length; i < n; i++) o[i].call(this, t)
            }),
            (this.remove = function (t) {
              var e = []
              for (i = 0, n = o.length; i < n; i++) o[i] !== t && e.push(o[i])
              o = e
            }),
            (this.length = function () {
              return o.length
            })
        }
        function n(i, t) {
          var n, o, s, e, r, a, l, c, d, u, p, f, h
          i &&
            (i.resizedAttached
              ? i.resizedAttached.add(t)
              : ((i.resizedAttached = new g()),
                i.resizedAttached.add(t),
                (i.resizeSensor = document.createElement('div')),
                (i.resizeSensor.dir = 'ltr'),
                (i.resizeSensor.className = 'resize-sensor'),
                (t = {
                  position: 'absolute',
                  left: '0px',
                  top: '0px',
                  transition: '0s',
                }),
                w(
                  i.resizeSensor,
                  (h = {
                    pointerEvents: 'none',
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    overflow: 'hidden',
                    zIndex: '-1',
                    visibility: 'hidden',
                    maxWidth: '100%',
                  }),
                ),
                ((n = document.createElement('div')).className =
                  'resize-sensor-expand'),
                w(n, h),
                w((o = document.createElement('div')), t),
                n.appendChild(o),
                ((s = document.createElement('div')).className =
                  'resize-sensor-shrink'),
                w(s, h),
                w((h = document.createElement('div')), t),
                w(h, { width: '200%', height: '200%' }),
                s.appendChild(h),
                i.resizeSensor.appendChild(n),
                i.resizeSensor.appendChild(s),
                i.appendChild(i.resizeSensor),
                'absolute' !==
                  (h = (t = window.getComputedStyle(i))
                    ? t.getPropertyValue('position')
                    : null) &&
                  'relative' !== h &&
                  'fixed' !== h &&
                  'sticky' !== h &&
                  (i.style.position = 'relative'),
                (e = !1),
                (r = 0),
                (a = y(i)),
                (d = !(c = l = 0)),
                (m = 0),
                (u = function () {
                  var t = i.offsetWidth,
                    e = i.offsetHeight
                  ;(o.style.width = t + 10 + 'px'),
                    (o.style.height = e + 10 + 'px'),
                    (n.scrollLeft = t + 10),
                    (n.scrollTop = e + 10),
                    (s.scrollLeft = t + 10),
                    (s.scrollTop = e + 10)
                }),
                (i.resizeSensor.resetSensor = p =
                  function () {
                    if (d) {
                      if (0 === i.offsetWidth && 0 === i.offsetHeight)
                        return void (m =
                          m ||
                          v(function () {
                            ;(m = 0), p()
                          }))
                      d = !1
                    }
                    u()
                  }),
                (f = function () {
                  ;(r = 0),
                    e &&
                      ((l = a.width), (c = a.height), i.resizedAttached) &&
                      i.resizedAttached.call(a)
                }),
                (t = function (t, e, i) {
                  t.attachEvent
                    ? t.attachEvent('on' + e, i)
                    : t.addEventListener(e, i)
                })(
                  n,
                  'scroll',
                  (h = function () {
                    ;(a = y(i)),
                      (e = a.width !== l || a.height !== c) && !r && (r = v(f)),
                      p()
                  }),
                ),
                t(s, 'scroll', h),
                (m = v(function () {
                  ;(m = 0), p()
                }))))
        }
        r(e, function (t) {
          n(t, i)
        }),
          (this.detach = function (t) {
            m && (o(m), (m = 0)), s.detach(e, t)
          }),
          (this.reset = function () {
            e.resizeSensor.resetSensor && e.resizeSensor.resetSensor()
          })
      }).reset = function (e) {
        r(e, function (t) {
          e.resizeSensor.resetSensor && t.resizeSensor.resetSensor()
        })
      }),
      (s.detach = function (t, e) {
        r(t, function (t) {
          !t ||
            (t.resizedAttached &&
              'function' == typeof e &&
              (t.resizedAttached.remove(e), t.resizedAttached.length())) ||
            (t.resizeSensor &&
              (t.contains(t.resizeSensor) && t.removeChild(t.resizeSensor),
              delete t.resizeSensor,
              delete t.resizedAttached))
        })
      }),
      'undefined' != typeof MutationObserver &&
        ((i = new MutationObserver(function (t) {
          for (var e in t)
            if (t.hasOwnProperty(e))
              for (var i = t[e].addedNodes, n = 0; n < i.length; n++)
                i[n].resizeSensor && s.reset(i[n])
        })),
        document.addEventListener('DOMContentLoaded', function (t) {
          i.observe(document.body, { childList: !0, subtree: !0 })
        })),
      s)
  function r(t, e) {
    var i = Object.prototype.toString.call(t),
      i =
        '[object Array]' === i ||
        '[object NodeList]' === i ||
        '[object HTMLCollection]' === i ||
        '[object Object]' === i ||
        ('undefined' != typeof jQuery && t instanceof jQuery) ||
        ('undefined' != typeof Elements && t instanceof Elements),
      n = 0,
      o = t.length
    if (i) for (; n < o; n++) e(t[n])
    else e(t)
  }
  function y(t) {
    var e
    return t.getBoundingClientRect
      ? ((e = t.getBoundingClientRect()),
        { width: Math.round(e.width), height: Math.round(e.height) })
      : { width: t.offsetWidth, height: t.offsetHeight }
  }
  function w(e, i) {
    Object.keys(i).forEach(function (t) {
      e.style[t] = i[t]
    })
  }
}),
  (function (t) {
    'function' == typeof define && define.amd
      ? define(['jquery'], t)
      : 'undefined' != typeof exports
        ? (module.exports = t(require('jquery')))
        : t(jQuery)
  })(function (c) {
    var n,
      s = window.Slick || {}
    ;(n = 0),
      ((s = function (t, e) {
        var i = this
        ;(i.defaults = {
          accessibility: !0,
          adaptiveHeight: !1,
          appendArrows: c(t),
          appendDots: c(t),
          arrows: !0,
          asNavFor: null,
          prevArrow:
            '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
          nextArrow:
            '<button class="slick-next" aria-label="Next" type="button">Next</button>',
          autoplay: !1,
          autoplaySpeed: 3e3,
          centerMode: !1,
          centerPadding: '50px',
          cssEase: 'ease',
          customPaging: function (t, e) {
            return c('<button type="button" />').text(e + 1)
          },
          dots: !1,
          dotsClass: 'slick-dots',
          draggable: !0,
          easing: 'linear',
          edgeFriction: 0.35,
          fade: !1,
          focusOnSelect: !1,
          focusOnChange: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: 'ondemand',
          mobileFirst: !1,
          pauseOnHover: !0,
          pauseOnFocus: !0,
          pauseOnDotsHover: !1,
          respondTo: 'window',
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: '',
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: !0,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          useTransform: !0,
          variableWidth: !1,
          vertical: !1,
          verticalSwiping: !1,
          waitForAnimate: !0,
          zIndex: 1e3,
        }),
          (i.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1,
          }),
          c.extend(i, i.initials),
          (i.activeBreakpoint = null),
          (i.animType = null),
          (i.animProp = null),
          (i.breakpoints = []),
          (i.breakpointSettings = []),
          (i.cssTransitions = !1),
          (i.focussed = !1),
          (i.interrupted = !1),
          (i.hidden = 'hidden'),
          (i.paused = !0),
          (i.positionProp = null),
          (i.respondTo = null),
          (i.rowCount = 1),
          (i.shouldClick = !0),
          (i.$slider = c(t)),
          (i.$slidesCache = null),
          (i.transformType = null),
          (i.transitionType = null),
          (i.visibilityChange = 'visibilitychange'),
          (i.windowWidth = 0),
          (i.windowTimer = null),
          (t = c(t).data('slick') || {}),
          (i.options = c.extend({}, i.defaults, e, t)),
          (i.currentSlide = i.options.initialSlide),
          (i.originalSettings = i.options),
          void 0 !== document.mozHidden
            ? ((i.hidden = 'mozHidden'),
              (i.visibilityChange = 'mozvisibilitychange'))
            : void 0 !== document.webkitHidden &&
              ((i.hidden = 'webkitHidden'),
              (i.visibilityChange = 'webkitvisibilitychange')),
          (i.autoPlay = c.proxy(i.autoPlay, i)),
          (i.autoPlayClear = c.proxy(i.autoPlayClear, i)),
          (i.autoPlayIterator = c.proxy(i.autoPlayIterator, i)),
          (i.changeSlide = c.proxy(i.changeSlide, i)),
          (i.clickHandler = c.proxy(i.clickHandler, i)),
          (i.selectHandler = c.proxy(i.selectHandler, i)),
          (i.setPosition = c.proxy(i.setPosition, i)),
          (i.swipeHandler = c.proxy(i.swipeHandler, i)),
          (i.dragHandler = c.proxy(i.dragHandler, i)),
          (i.keyHandler = c.proxy(i.keyHandler, i)),
          (i.instanceUid = n++),
          (i.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
          i.registerBreakpoints(),
          i.init(!0)
      }).prototype.activateADA = function () {
        this.$slideTrack
          .find('.slick-active')
          .attr({ 'aria-hidden': 'false' })
          .find('a, input, button, select')
          .attr({ tabindex: '0' })
      }),
      (s.prototype.addSlide = s.prototype.slickAdd =
        function (t, e, i) {
          var n = this
          if ('boolean' == typeof e) (i = e), (e = null)
          else if (e < 0 || e >= n.slideCount) return !1
          n.unload(),
            'number' == typeof e
              ? 0 === e && 0 === n.$slides.length
                ? c(t).appendTo(n.$slideTrack)
                : i
                  ? c(t).insertBefore(n.$slides.eq(e))
                  : c(t).insertAfter(n.$slides.eq(e))
              : !0 === i
                ? c(t).prependTo(n.$slideTrack)
                : c(t).appendTo(n.$slideTrack),
            (n.$slides = n.$slideTrack.children(this.options.slide)),
            n.$slideTrack.children(this.options.slide).detach(),
            n.$slideTrack.append(n.$slides),
            n.$slides.each(function (t, e) {
              c(e).attr('data-slick-index', t)
            }),
            (n.$slidesCache = n.$slides),
            n.reinit()
        }),
      (s.prototype.animateHeight = function () {
        var t,
          e = this
        1 === e.options.slidesToShow &&
          !0 === e.options.adaptiveHeight &&
          !1 === e.options.vertical &&
          ((t = e.$slides.eq(e.currentSlide).outerHeight(!0)),
          e.$list.animate({ height: t }, e.options.speed))
      }),
      (s.prototype.animateSlide = function (t, e) {
        var i = {},
          n = this
        n.animateHeight(),
          !0 === n.options.rtl && !1 === n.options.vertical && (t = -t),
          !1 === n.transformsEnabled
            ? !1 === n.options.vertical
              ? n.$slideTrack.animate(
                  { left: t },
                  n.options.speed,
                  n.options.easing,
                  e,
                )
              : n.$slideTrack.animate(
                  { top: t },
                  n.options.speed,
                  n.options.easing,
                  e,
                )
            : !1 === n.cssTransitions
              ? (!0 === n.options.rtl && (n.currentLeft = -n.currentLeft),
                c({ animStart: n.currentLeft }).animate(
                  { animStart: t },
                  {
                    duration: n.options.speed,
                    easing: n.options.easing,
                    step: function (t) {
                      ;(t = Math.ceil(t)),
                        !1 === n.options.vertical
                          ? (i[n.animType] = 'translate(' + t + 'px, 0px)')
                          : (i[n.animType] = 'translate(0px,' + t + 'px)'),
                        n.$slideTrack.css(i)
                    },
                    complete: function () {
                      e && e.call()
                    },
                  },
                ))
              : (n.applyTransition(),
                (t = Math.ceil(t)),
                !1 === n.options.vertical
                  ? (i[n.animType] = 'translate3d(' + t + 'px, 0px, 0px)')
                  : (i[n.animType] = 'translate3d(0px,' + t + 'px, 0px)'),
                n.$slideTrack.css(i),
                e &&
                  setTimeout(function () {
                    n.disableTransition(), e.call()
                  }, n.options.speed))
      }),
      (s.prototype.getNavTarget = function () {
        var t = this.options.asNavFor
        return (t = t && null !== t ? c(t).not(this.$slider) : t)
      }),
      (s.prototype.asNavFor = function (e) {
        var t = this.getNavTarget()
        null !== t &&
          'object' == typeof t &&
          t.each(function () {
            var t = c(this).slick('getSlick')
            t.unslicked || t.slideHandler(e, !0)
          })
      }),
      (s.prototype.applyTransition = function (t) {
        var e = this,
          i = {}
        !1 === e.options.fade
          ? (i[e.transitionType] =
              e.transformType +
              ' ' +
              e.options.speed +
              'ms ' +
              e.options.cssEase)
          : (i[e.transitionType] =
              'opacity ' + e.options.speed + 'ms ' + e.options.cssEase),
          (!1 === e.options.fade ? e.$slideTrack : e.$slides.eq(t)).css(i)
      }),
      (s.prototype.autoPlay = function () {
        var t = this
        t.autoPlayClear(),
          t.slideCount > t.options.slidesToShow &&
            (t.autoPlayTimer = setInterval(
              t.autoPlayIterator,
              t.options.autoplaySpeed,
            ))
      }),
      (s.prototype.autoPlayClear = function () {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer)
      }),
      (s.prototype.autoPlayIterator = function () {
        var t = this,
          e = t.currentSlide + t.options.slidesToScroll
        t.paused ||
          t.interrupted ||
          t.focussed ||
          (!1 === t.options.infinite &&
            (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1
              ? (t.direction = 0)
              : 0 === t.direction &&
                ((e = t.currentSlide - t.options.slidesToScroll),
                t.currentSlide - 1 == 0) &&
                (t.direction = 1)),
          t.slideHandler(e))
      }),
      (s.prototype.buildArrows = function () {
        var t = this
        !0 === t.options.arrows &&
          ((t.$prevArrow = c(t.options.prevArrow).addClass('slick-arrow')),
          (t.$nextArrow = c(t.options.nextArrow).addClass('slick-arrow')),
          t.slideCount > t.options.slidesToShow
            ? (t.$prevArrow
                .removeClass('slick-hidden')
                .removeAttr('aria-hidden tabindex'),
              t.$nextArrow
                .removeClass('slick-hidden')
                .removeAttr('aria-hidden tabindex'),
              t.htmlExpr.test(t.options.prevArrow) &&
                t.$prevArrow.prependTo(t.options.appendArrows),
              t.htmlExpr.test(t.options.nextArrow) &&
                t.$nextArrow.appendTo(t.options.appendArrows),
              !0 !== t.options.infinite &&
                t.$prevArrow
                  .addClass('slick-disabled')
                  .attr('aria-disabled', 'true'))
            : t.$prevArrow
                .add(t.$nextArrow)
                .addClass('slick-hidden')
                .attr({ 'aria-disabled': 'true', tabindex: '-1' }))
      }),
      (s.prototype.buildDots = function () {
        var t,
          e,
          i = this
        if (!0 === i.options.dots) {
          for (
            i.$slider.addClass('slick-dotted'),
              e = c('<ul />').addClass(i.options.dotsClass),
              t = 0;
            t <= i.getDotCount();
            t += 1
          )
            e.append(
              c('<li />').append(i.options.customPaging.call(this, i, t)),
            )
          ;(i.$dots = e.appendTo(i.options.appendDots)),
            i.$dots.find('li').first().addClass('slick-active')
        }
      }),
      (s.prototype.buildOut = function () {
        var t = this
        ;(t.$slides = t.$slider
          .children(t.options.slide + ':not(.slick-cloned)')
          .addClass('slick-slide')),
          (t.slideCount = t.$slides.length),
          t.$slides.each(function (t, e) {
            c(e)
              .attr('data-slick-index', t)
              .data('originalStyling', c(e).attr('style') || '')
          }),
          t.$slider.addClass('slick-slider'),
          (t.$slideTrack =
            0 === t.slideCount
              ? c('<div class="slick-track"/>').appendTo(t.$slider)
              : t.$slides.wrapAll('<div class="slick-track"/>').parent()),
          (t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent()),
          t.$slideTrack.css('opacity', 0),
          (!0 !== t.options.centerMode && !0 !== t.options.swipeToSlide) ||
            (t.options.slidesToScroll = 1),
          c('img[data-lazy]', t.$slider).not('[src]').addClass('slick-loading'),
          t.setupInfinite(),
          t.buildArrows(),
          t.buildDots(),
          t.updateDots(),
          t.setSlideClasses(
            'number' == typeof t.currentSlide ? t.currentSlide : 0,
          ),
          !0 === t.options.draggable && t.$list.addClass('draggable')
      }),
      (s.prototype.buildRows = function () {
        var t,
          e,
          i,
          n = this,
          o = document.createDocumentFragment(),
          s = n.$slider.children()
        if (1 < n.options.rows) {
          for (
            i = n.options.slidesPerRow * n.options.rows,
              e = Math.ceil(s.length / i),
              t = 0;
            t < e;
            t++
          ) {
            for (
              var r = document.createElement('div'), a = 0;
              a < n.options.rows;
              a++
            ) {
              for (
                var l = document.createElement('div'), c = 0;
                c < n.options.slidesPerRow;
                c++
              ) {
                var d = t * i + (a * n.options.slidesPerRow + c)
                s.get(d) && l.appendChild(s.get(d))
              }
              r.appendChild(l)
            }
            o.appendChild(r)
          }
          n.$slider.empty().append(o),
            n.$slider
              .children()
              .children()
              .children()
              .css({
                width: 100 / n.options.slidesPerRow + '%',
                display: 'inline-block',
              })
        }
      }),
      (s.prototype.checkResponsive = function (t, e) {
        var i,
          n,
          o,
          s = this,
          r = !1,
          a = s.$slider.width(),
          l = window.innerWidth || c(window).width()
        if (
          ('window' === s.respondTo
            ? (o = l)
            : 'slider' === s.respondTo
              ? (o = a)
              : 'min' === s.respondTo && (o = Math.min(l, a)),
          s.options.responsive &&
            s.options.responsive.length &&
            null !== s.options.responsive)
        ) {
          for (i in ((n = null), s.breakpoints))
            s.breakpoints.hasOwnProperty(i) &&
              (!1 === s.originalSettings.mobileFirst
                ? o < s.breakpoints[i] && (n = s.breakpoints[i])
                : o > s.breakpoints[i] && (n = s.breakpoints[i]))
          null !== n
            ? (null !== s.activeBreakpoint && n === s.activeBreakpoint && !e) ||
              ((s.activeBreakpoint = n),
              'unslick' === s.breakpointSettings[n]
                ? s.unslick(n)
                : ((s.options = c.extend(
                    {},
                    s.originalSettings,
                    s.breakpointSettings[n],
                  )),
                  !0 === t && (s.currentSlide = s.options.initialSlide),
                  s.refresh(t)),
              (r = n))
            : null !== s.activeBreakpoint &&
              ((s.activeBreakpoint = null),
              (s.options = s.originalSettings),
              !0 === t && (s.currentSlide = s.options.initialSlide),
              s.refresh(t),
              (r = n)),
            t || !1 === r || s.$slider.trigger('breakpoint', [s, r])
        }
      }),
      (s.prototype.changeSlide = function (t, e) {
        var i,
          n = this,
          o = c(t.currentTarget)
        switch (
          (o.is('a') && t.preventDefault(),
          o.is('li') || (o = o.closest('li')),
          (i =
            n.slideCount % n.options.slidesToScroll != 0
              ? 0
              : (n.slideCount - n.currentSlide) % n.options.slidesToScroll),
          t.data.message)
        ) {
          case 'previous':
            ;(s =
              0 == i ? n.options.slidesToScroll : n.options.slidesToShow - i),
              n.slideCount > n.options.slidesToShow &&
                n.slideHandler(n.currentSlide - s, !1, e)
            break
          case 'next':
            ;(s = 0 == i ? n.options.slidesToScroll : i),
              n.slideCount > n.options.slidesToShow &&
                n.slideHandler(n.currentSlide + s, !1, e)
            break
          case 'index':
            var s =
              0 === t.data.index
                ? 0
                : t.data.index || o.index() * n.options.slidesToScroll
            n.slideHandler(n.checkNavigable(s), !1, e),
              o.children().trigger('focus')
            break
          default:
            return
        }
      }),
      (s.prototype.checkNavigable = function (t) {
        var e = this.getNavigableIndexes(),
          i = 0
        if (t > e[e.length - 1]) t = e[e.length - 1]
        else
          for (var n in e) {
            if (t < e[n]) {
              t = i
              break
            }
            i = e[n]
          }
        return t
      }),
      (s.prototype.cleanUpEvents = function () {
        var t = this
        t.options.dots &&
          null !== t.$dots &&
          (c('li', t.$dots)
            .off('click.slick', t.changeSlide)
            .off('mouseenter.slick', c.proxy(t.interrupt, t, !0))
            .off('mouseleave.slick', c.proxy(t.interrupt, t, !1)),
          !0 === t.options.accessibility) &&
          t.$dots.off('keydown.slick', t.keyHandler),
          t.$slider.off('focus.slick blur.slick'),
          !0 === t.options.arrows &&
            t.slideCount > t.options.slidesToShow &&
            (t.$prevArrow && t.$prevArrow.off('click.slick', t.changeSlide),
            t.$nextArrow && t.$nextArrow.off('click.slick', t.changeSlide),
            !0 === t.options.accessibility) &&
            (t.$prevArrow && t.$prevArrow.off('keydown.slick', t.keyHandler),
            t.$nextArrow) &&
            t.$nextArrow.off('keydown.slick', t.keyHandler),
          t.$list.off('touchstart.slick mousedown.slick', t.swipeHandler),
          t.$list.off('touchmove.slick mousemove.slick', t.swipeHandler),
          t.$list.off('touchend.slick mouseup.slick', t.swipeHandler),
          t.$list.off('touchcancel.slick mouseleave.slick', t.swipeHandler),
          t.$list.off('click.slick', t.clickHandler),
          c(document).off(t.visibilityChange, t.visibility),
          t.cleanUpSlideEvents(),
          !0 === t.options.accessibility &&
            t.$list.off('keydown.slick', t.keyHandler),
          !0 === t.options.focusOnSelect &&
            c(t.$slideTrack).children().off('click.slick', t.selectHandler),
          c(window).off(
            'orientationchange.slick.slick-' + t.instanceUid,
            t.orientationChange,
          ),
          c(window).off('resize.slick.slick-' + t.instanceUid, t.resize),
          c('[draggable!=true]', t.$slideTrack).off(
            'dragstart',
            t.preventDefault,
          ),
          c(window).off('load.slick.slick-' + t.instanceUid, t.setPosition)
      }),
      (s.prototype.cleanUpSlideEvents = function () {
        this.$list.off('mouseenter.slick', c.proxy(this.interrupt, this, !0)),
          this.$list.off('mouseleave.slick', c.proxy(this.interrupt, this, !1))
      }),
      (s.prototype.cleanUpRows = function () {
        var t
        1 < this.options.rows &&
          ((t = this.$slides.children().children()).removeAttr('style'),
          this.$slider.empty().append(t))
      }),
      (s.prototype.clickHandler = function (t) {
        !1 === this.shouldClick &&
          (t.stopImmediatePropagation(),
          t.stopPropagation(),
          t.preventDefault())
      }),
      (s.prototype.destroy = function (t) {
        var e = this
        e.autoPlayClear(),
          (e.touchObject = {}),
          e.cleanUpEvents(),
          c('.slick-cloned', e.$slider).detach(),
          e.$dots && e.$dots.remove(),
          e.$prevArrow &&
            e.$prevArrow.length &&
            (e.$prevArrow
              .removeClass('slick-disabled slick-arrow slick-hidden')
              .removeAttr('aria-hidden aria-disabled tabindex')
              .css('display', ''),
            e.htmlExpr.test(e.options.prevArrow)) &&
            e.$prevArrow.remove(),
          e.$nextArrow &&
            e.$nextArrow.length &&
            (e.$nextArrow
              .removeClass('slick-disabled slick-arrow slick-hidden')
              .removeAttr('aria-hidden aria-disabled tabindex')
              .css('display', ''),
            e.htmlExpr.test(e.options.nextArrow)) &&
            e.$nextArrow.remove(),
          e.$slides &&
            (e.$slides
              .removeClass(
                'slick-slide slick-active slick-center slick-visible slick-current',
              )
              .removeAttr('aria-hidden')
              .removeAttr('data-slick-index')
              .each(function () {
                c(this).attr('style', c(this).data('originalStyling'))
              }),
            e.$slideTrack.children(this.options.slide).detach(),
            e.$slideTrack.detach(),
            e.$list.detach(),
            e.$slider.append(e.$slides)),
          e.cleanUpRows(),
          e.$slider.removeClass('slick-slider'),
          e.$slider.removeClass('slick-initialized'),
          e.$slider.removeClass('slick-dotted'),
          (e.unslicked = !0),
          t || e.$slider.trigger('destroy', [e])
      }),
      (s.prototype.disableTransition = function (t) {
        var e = {}
        ;(e[this.transitionType] = ''),
          (!1 === this.options.fade
            ? this.$slideTrack
            : this.$slides.eq(t)
          ).css(e)
      }),
      (s.prototype.fadeSlide = function (t, e) {
        var i = this
        !1 === i.cssTransitions
          ? (i.$slides.eq(t).css({ zIndex: i.options.zIndex }),
            i.$slides
              .eq(t)
              .animate({ opacity: 1 }, i.options.speed, i.options.easing, e))
          : (i.applyTransition(t),
            i.$slides.eq(t).css({ opacity: 1, zIndex: i.options.zIndex }),
            e &&
              setTimeout(function () {
                i.disableTransition(t), e.call()
              }, i.options.speed))
      }),
      (s.prototype.fadeSlideOut = function (t) {
        !1 === this.cssTransitions
          ? this.$slides
              .eq(t)
              .animate(
                { opacity: 0, zIndex: this.options.zIndex - 2 },
                this.options.speed,
                this.options.easing,
              )
          : (this.applyTransition(t),
            this.$slides
              .eq(t)
              .css({ opacity: 0, zIndex: this.options.zIndex - 2 }))
      }),
      (s.prototype.filterSlides = s.prototype.slickFilter =
        function (t) {
          null !== t &&
            ((this.$slidesCache = this.$slides),
            this.unload(),
            this.$slideTrack.children(this.options.slide).detach(),
            this.$slidesCache.filter(t).appendTo(this.$slideTrack),
            this.reinit())
        }),
      (s.prototype.focusHandler = function () {
        var i = this
        i.$slider
          .off('focus.slick blur.slick')
          .on('focus.slick blur.slick', '*', function (t) {
            t.stopImmediatePropagation()
            var e = c(this)
            setTimeout(function () {
              i.options.pauseOnFocus &&
                ((i.focussed = e.is(':focus')), i.autoPlay())
            }, 0)
          })
      }),
      (s.prototype.getCurrent = s.prototype.slickCurrentSlide =
        function () {
          return this.currentSlide
        }),
      (s.prototype.getDotCount = function () {
        var t = this,
          e = 0,
          i = 0,
          n = 0
        if (!0 === t.options.infinite)
          if (t.slideCount <= t.options.slidesToShow) ++n
          else
            for (; e < t.slideCount; )
              ++n,
                (e = i + t.options.slidesToScroll),
                (i +=
                  t.options.slidesToScroll <= t.options.slidesToShow
                    ? t.options.slidesToScroll
                    : t.options.slidesToShow)
        else if (!0 === t.options.centerMode) n = t.slideCount
        else if (t.options.asNavFor)
          for (; e < t.slideCount; )
            ++n,
              (e = i + t.options.slidesToScroll),
              (i +=
                t.options.slidesToScroll <= t.options.slidesToShow
                  ? t.options.slidesToScroll
                  : t.options.slidesToShow)
        else
          n =
            1 +
            Math.ceil(
              (t.slideCount - t.options.slidesToShow) /
                t.options.slidesToScroll,
            )
        return n - 1
      }),
      (s.prototype.getLeft = function (t) {
        var e,
          i,
          n = this,
          o = 0
        return (
          (n.slideOffset = 0),
          (e = n.$slides.first().outerHeight(!0)),
          !0 === n.options.infinite
            ? (n.slideCount > n.options.slidesToShow &&
                ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
                (i = -1),
                !0 === n.options.vertical &&
                  !0 === n.options.centerMode &&
                  (2 === n.options.slidesToShow
                    ? (i = -1.5)
                    : 1 === n.options.slidesToShow && (i = -2)),
                (o = e * n.options.slidesToShow * i)),
              n.slideCount % n.options.slidesToScroll != 0 &&
                t + n.options.slidesToScroll > n.slideCount &&
                n.slideCount > n.options.slidesToShow &&
                (o =
                  t > n.slideCount
                    ? ((n.slideOffset =
                        (n.options.slidesToShow - (t - n.slideCount)) *
                        n.slideWidth *
                        -1),
                      (n.options.slidesToShow - (t - n.slideCount)) * e * -1)
                    : ((n.slideOffset =
                        (n.slideCount % n.options.slidesToScroll) *
                        n.slideWidth *
                        -1),
                      (n.slideCount % n.options.slidesToScroll) * e * -1)))
            : t + n.options.slidesToShow > n.slideCount &&
              ((n.slideOffset =
                (t + n.options.slidesToShow - n.slideCount) * n.slideWidth),
              (o = (t + n.options.slidesToShow - n.slideCount) * e)),
          n.slideCount <= n.options.slidesToShow && (o = n.slideOffset = 0),
          !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
            ? (n.slideOffset =
                (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
                (n.slideWidth * n.slideCount) / 2)
            : !0 === n.options.centerMode && !0 === n.options.infinite
              ? (n.slideOffset +=
                  n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
                  n.slideWidth)
              : !0 === n.options.centerMode &&
                ((n.slideOffset = 0),
                (n.slideOffset +=
                  n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
          (i =
            !1 === n.options.vertical
              ? t * n.slideWidth * -1 + n.slideOffset
              : t * e * -1 + o),
          !0 === n.options.variableWidth &&
            ((e =
              n.slideCount <= n.options.slidesToShow ||
              !1 === n.options.infinite
                ? n.$slideTrack.children('.slick-slide').eq(t)
                : n.$slideTrack
                    .children('.slick-slide')
                    .eq(t + n.options.slidesToShow)),
            (i =
              !0 === n.options.rtl
                ? e[0]
                  ? -1 * (n.$slideTrack.width() - e[0].offsetLeft - e.width())
                  : 0
                : e[0]
                  ? -1 * e[0].offsetLeft
                  : 0),
            !0 === n.options.centerMode) &&
            ((e =
              n.slideCount <= n.options.slidesToShow ||
              !1 === n.options.infinite
                ? n.$slideTrack.children('.slick-slide').eq(t)
                : n.$slideTrack
                    .children('.slick-slide')
                    .eq(t + n.options.slidesToShow + 1)),
            (i =
              !0 === n.options.rtl
                ? e[0]
                  ? -1 * (n.$slideTrack.width() - e[0].offsetLeft - e.width())
                  : 0
                : e[0]
                  ? -1 * e[0].offsetLeft
                  : 0),
            (i += (n.$list.width() - e.outerWidth()) / 2)),
          i
        )
      }),
      (s.prototype.getOption = s.prototype.slickGetOption =
        function (t) {
          return this.options[t]
        }),
      (s.prototype.getNavigableIndexes = function () {
        for (
          var t = this,
            e = 0,
            i = 0,
            n = [],
            o =
              !1 === t.options.infinite
                ? t.slideCount
                : ((e = -1 * t.options.slidesToScroll),
                  (i = -1 * t.options.slidesToScroll),
                  2 * t.slideCount);
          e < o;

        )
          n.push(e),
            (e = i + t.options.slidesToScroll),
            (i +=
              t.options.slidesToScroll <= t.options.slidesToShow
                ? t.options.slidesToScroll
                : t.options.slidesToShow)
        return n
      }),
      (s.prototype.getSlick = function () {
        return this
      }),
      (s.prototype.getSlideCount = function () {
        var i,
          n = this,
          o =
            !0 === n.options.centerMode
              ? n.slideWidth * Math.floor(n.options.slidesToShow / 2)
              : 0
        return !0 === n.options.swipeToSlide
          ? (n.$slideTrack.find('.slick-slide').each(function (t, e) {
              if (e.offsetLeft - o + c(e).outerWidth() / 2 > -1 * n.swipeLeft)
                return (i = e), !1
            }),
            Math.abs(c(i).attr('data-slick-index') - n.currentSlide) || 1)
          : n.options.slidesToScroll
      }),
      (s.prototype.goTo = s.prototype.slickGoTo =
        function (t, e) {
          this.changeSlide(
            { data: { message: 'index', index: parseInt(t) } },
            e,
          )
        }),
      (s.prototype.init = function (t) {
        var e = this
        c(e.$slider).hasClass('slick-initialized') ||
          (c(e.$slider).addClass('slick-initialized'),
          e.buildRows(),
          e.buildOut(),
          e.setProps(),
          e.startLoad(),
          e.loadSlider(),
          e.initializeEvents(),
          e.updateArrows(),
          e.updateDots(),
          e.checkResponsive(!0),
          e.focusHandler()),
          t && e.$slider.trigger('init', [e]),
          !0 === e.options.accessibility && e.initADA(),
          e.options.autoplay && ((e.paused = !1), e.autoPlay())
      }),
      (s.prototype.initADA = function () {
        var i = this,
          n = Math.ceil(i.slideCount / i.options.slidesToShow),
          o = i.getNavigableIndexes().filter(function (t) {
            return 0 <= t && t < i.slideCount
          })
        i.$slides
          .add(i.$slideTrack.find('.slick-cloned'))
          .attr({ 'aria-hidden': 'true', tabindex: '-1' })
          .find('a, input, button, select')
          .attr({ tabindex: '-1' }),
          null !== i.$dots &&
            (i.$slides
              .not(i.$slideTrack.find('.slick-cloned'))
              .each(function (t) {
                var e = o.indexOf(t)
                c(this).attr({
                  role: 'tabpanel',
                  id: 'slick-slide' + i.instanceUid + t,
                  tabindex: -1,
                }),
                  -1 !== e &&
                    c(this).attr({
                      'aria-describedby':
                        'slick-slide-control' + i.instanceUid + e,
                    })
              }),
            i.$dots
              .attr('role', 'tablist')
              .find('li')
              .each(function (t) {
                var e = o[t]
                c(this).attr({ role: 'presentation' }),
                  c(this)
                    .find('button')
                    .first()
                    .attr({
                      role: 'tab',
                      id: 'slick-slide-control' + i.instanceUid + t,
                      'aria-controls': 'slick-slide' + i.instanceUid + e,
                      'aria-label': t + 1 + ' of ' + n,
                      'aria-selected': null,
                      tabindex: '-1',
                    })
              })
              .eq(i.currentSlide)
              .find('button')
              .attr({ 'aria-selected': 'true', tabindex: '0' })
              .end())
        for (var t = i.currentSlide, e = t + i.options.slidesToShow; t < e; t++)
          i.$slides.eq(t).attr('tabindex', 0)
        i.activateADA()
      }),
      (s.prototype.initArrowEvents = function () {
        var t = this
        !0 === t.options.arrows &&
          t.slideCount > t.options.slidesToShow &&
          (t.$prevArrow
            .off('click.slick')
            .on('click.slick', { message: 'previous' }, t.changeSlide),
          t.$nextArrow
            .off('click.slick')
            .on('click.slick', { message: 'next' }, t.changeSlide),
          !0 === t.options.accessibility) &&
          (t.$prevArrow.on('keydown.slick', t.keyHandler),
          t.$nextArrow.on('keydown.slick', t.keyHandler))
      }),
      (s.prototype.initDotEvents = function () {
        var t = this
        !0 === t.options.dots &&
          (c('li', t.$dots).on(
            'click.slick',
            { message: 'index' },
            t.changeSlide,
          ),
          !0 === t.options.accessibility) &&
          t.$dots.on('keydown.slick', t.keyHandler),
          !0 === t.options.dots &&
            !0 === t.options.pauseOnDotsHover &&
            c('li', t.$dots)
              .on('mouseenter.slick', c.proxy(t.interrupt, t, !0))
              .on('mouseleave.slick', c.proxy(t.interrupt, t, !1))
      }),
      (s.prototype.initSlideEvents = function () {
        this.options.pauseOnHover &&
          (this.$list.on('mouseenter.slick', c.proxy(this.interrupt, this, !0)),
          this.$list.on('mouseleave.slick', c.proxy(this.interrupt, this, !1)))
      }),
      (s.prototype.initializeEvents = function () {
        var t = this
        t.initArrowEvents(),
          t.initDotEvents(),
          t.initSlideEvents(),
          t.$list.on(
            'touchstart.slick mousedown.slick',
            { action: 'start' },
            t.swipeHandler,
          ),
          t.$list.on(
            'touchmove.slick mousemove.slick',
            { action: 'move' },
            t.swipeHandler,
          ),
          t.$list.on(
            'touchend.slick mouseup.slick',
            { action: 'end' },
            t.swipeHandler,
          ),
          t.$list.on(
            'touchcancel.slick mouseleave.slick',
            { action: 'end' },
            t.swipeHandler,
          ),
          t.$list.on('click.slick', t.clickHandler),
          c(document).on(t.visibilityChange, c.proxy(t.visibility, t)),
          !0 === t.options.accessibility &&
            t.$list.on('keydown.slick', t.keyHandler),
          !0 === t.options.focusOnSelect &&
            c(t.$slideTrack).children().on('click.slick', t.selectHandler),
          c(window).on(
            'orientationchange.slick.slick-' + t.instanceUid,
            c.proxy(t.orientationChange, t),
          ),
          c(window).on(
            'resize.slick.slick-' + t.instanceUid,
            c.proxy(t.resize, t),
          ),
          c('[draggable!=true]', t.$slideTrack).on(
            'dragstart',
            t.preventDefault,
          ),
          c(window).on('load.slick.slick-' + t.instanceUid, t.setPosition),
          c(t.setPosition)
      }),
      (s.prototype.initUI = function () {
        !0 === this.options.arrows &&
          this.slideCount > this.options.slidesToShow &&
          (this.$prevArrow.show(), this.$nextArrow.show()),
          !0 === this.options.dots &&
            this.slideCount > this.options.slidesToShow &&
            this.$dots.show()
      }),
      (s.prototype.keyHandler = function (t) {
        t.target.tagName.match('TEXTAREA|INPUT|SELECT') ||
          (37 === t.keyCode && !0 === this.options.accessibility
            ? this.changeSlide({
                data: {
                  message: !0 === this.options.rtl ? 'next' : 'previous',
                },
              })
            : 39 === t.keyCode &&
              !0 === this.options.accessibility &&
              this.changeSlide({
                data: {
                  message: !0 === this.options.rtl ? 'previous' : 'next',
                },
              }))
      }),
      (s.prototype.lazyLoad = function () {
        function t(t) {
          c('img[data-lazy]', t).each(function () {
            var t = c(this),
              e = c(this).attr('data-lazy'),
              i = c(this).attr('data-srcset'),
              n = c(this).attr('data-sizes') || s.$slider.attr('data-sizes'),
              o = document.createElement('img')
            ;(o.onload = function () {
              t.animate({ opacity: 0 }, 100, function () {
                i && (t.attr('srcset', i), n) && t.attr('sizes', n),
                  t.attr('src', e).animate({ opacity: 1 }, 200, function () {
                    t.removeAttr(
                      'data-lazy data-srcset data-sizes',
                    ).removeClass('slick-loading')
                  }),
                  s.$slider.trigger('lazyLoaded', [s, t, e])
              })
            }),
              (o.onerror = function () {
                t
                  .removeAttr('data-lazy')
                  .removeClass('slick-loading')
                  .addClass('slick-lazyload-error'),
                  s.$slider.trigger('lazyLoadError', [s, t, e])
              }),
              (o.src = e)
          })
        }
        var e,
          i,
          n,
          s = this
        if (
          (!0 === s.options.centerMode
            ? (n =
                !0 === s.options.infinite
                  ? (i = s.currentSlide + (s.options.slidesToShow / 2 + 1)) +
                    s.options.slidesToShow +
                    2
                  : ((i = Math.max(
                      0,
                      s.currentSlide - (s.options.slidesToShow / 2 + 1),
                    )),
                    s.options.slidesToShow / 2 + 1 + 2 + s.currentSlide))
            : ((i = s.options.infinite
                ? s.options.slidesToShow + s.currentSlide
                : s.currentSlide),
              (n = Math.ceil(i + s.options.slidesToShow)),
              !0 === s.options.fade &&
                (0 < i && i--, n <= s.slideCount) &&
                n++),
          (e = s.$slider.find('.slick-slide').slice(i, n)),
          'anticipated' === s.options.lazyLoad)
        )
          for (
            var o = i - 1, r = n, a = s.$slider.find('.slick-slide'), l = 0;
            l < s.options.slidesToScroll;
            l++
          )
            o < 0 && (o = s.slideCount - 1),
              (e = (e = e.add(a.eq(o))).add(a.eq(r))),
              o--,
              r++
        t(e),
          s.slideCount <= s.options.slidesToShow
            ? t(s.$slider.find('.slick-slide'))
            : s.currentSlide >= s.slideCount - s.options.slidesToShow
              ? t(
                  s.$slider
                    .find('.slick-cloned')
                    .slice(0, s.options.slidesToShow),
                )
              : 0 === s.currentSlide &&
                t(
                  s.$slider
                    .find('.slick-cloned')
                    .slice(-1 * s.options.slidesToShow),
                )
      }),
      (s.prototype.loadSlider = function () {
        this.setPosition(),
          this.$slideTrack.css({ opacity: 1 }),
          this.$slider.removeClass('slick-loading'),
          this.initUI(),
          'progressive' === this.options.lazyLoad && this.progressiveLazyLoad()
      }),
      (s.prototype.next = s.prototype.slickNext =
        function () {
          this.changeSlide({ data: { message: 'next' } })
        }),
      (s.prototype.orientationChange = function () {
        this.checkResponsive(), this.setPosition()
      }),
      (s.prototype.pause = s.prototype.slickPause =
        function () {
          this.autoPlayClear(), (this.paused = !0)
        }),
      (s.prototype.play = s.prototype.slickPlay =
        function () {
          this.autoPlay(),
            (this.options.autoplay = !0),
            (this.paused = !1),
            (this.focussed = !1),
            (this.interrupted = !1)
        }),
      (s.prototype.postSlide = function (t) {
        var e = this
        e.unslicked ||
          (e.$slider.trigger('afterChange', [e, t]),
          (e.animating = !1),
          e.slideCount > e.options.slidesToShow && e.setPosition(),
          (e.swipeLeft = null),
          e.options.autoplay && e.autoPlay(),
          !0 === e.options.accessibility &&
            (e.initADA(), e.options.focusOnChange) &&
            c(e.$slides.get(e.currentSlide)).attr('tabindex', 0).focus())
      }),
      (s.prototype.prev = s.prototype.slickPrev =
        function () {
          this.changeSlide({ data: { message: 'previous' } })
        }),
      (s.prototype.preventDefault = function (t) {
        t.preventDefault()
      }),
      (s.prototype.progressiveLazyLoad = function (t) {
        t = t || 1
        var e,
          i,
          n,
          o,
          s = this,
          r = c('img[data-lazy]', s.$slider)
        r.length
          ? ((e = r.first()),
            (i = e.attr('data-lazy')),
            (n = e.attr('data-srcset')),
            (o = e.attr('data-sizes') || s.$slider.attr('data-sizes')),
            ((r = document.createElement('img')).onload = function () {
              n && (e.attr('srcset', n), o) && e.attr('sizes', o),
                e
                  .attr('src', i)
                  .removeAttr('data-lazy data-srcset data-sizes')
                  .removeClass('slick-loading'),
                !0 === s.options.adaptiveHeight && s.setPosition(),
                s.$slider.trigger('lazyLoaded', [s, e, i]),
                s.progressiveLazyLoad()
            }),
            (r.onerror = function () {
              t < 3
                ? setTimeout(function () {
                    s.progressiveLazyLoad(t + 1)
                  }, 500)
                : (e
                    .removeAttr('data-lazy')
                    .removeClass('slick-loading')
                    .addClass('slick-lazyload-error'),
                  s.$slider.trigger('lazyLoadError', [s, e, i]),
                  s.progressiveLazyLoad())
            }),
            (r.src = i))
          : s.$slider.trigger('allImagesLoaded', [s])
      }),
      (s.prototype.refresh = function (t) {
        var e = this,
          i = e.slideCount - e.options.slidesToShow
        !e.options.infinite && e.currentSlide > i && (e.currentSlide = i),
          e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
          (i = e.currentSlide),
          e.destroy(!0),
          c.extend(e, e.initials, { currentSlide: i }),
          e.init(),
          t || e.changeSlide({ data: { message: 'index', index: i } }, !1)
      }),
      (s.prototype.registerBreakpoints = function () {
        var t,
          e,
          i,
          n = this,
          o = n.options.responsive || null
        if ('array' === c.type(o) && o.length) {
          for (t in ((n.respondTo = n.options.respondTo || 'window'), o))
            if (((i = n.breakpoints.length - 1), o.hasOwnProperty(t))) {
              for (e = o[t].breakpoint; 0 <= i; )
                n.breakpoints[i] &&
                  n.breakpoints[i] === e &&
                  n.breakpoints.splice(i, 1),
                  i--
              n.breakpoints.push(e), (n.breakpointSettings[e] = o[t].settings)
            }
          n.breakpoints.sort(function (t, e) {
            return n.options.mobileFirst ? t - e : e - t
          })
        }
      }),
      (s.prototype.reinit = function () {
        var t = this
        ;(t.$slides = t.$slideTrack
          .children(t.options.slide)
          .addClass('slick-slide')),
          (t.slideCount = t.$slides.length),
          t.currentSlide >= t.slideCount &&
            0 !== t.currentSlide &&
            (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
          t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
          t.registerBreakpoints(),
          t.setProps(),
          t.setupInfinite(),
          t.buildArrows(),
          t.updateArrows(),
          t.initArrowEvents(),
          t.buildDots(),
          t.updateDots(),
          t.initDotEvents(),
          t.cleanUpSlideEvents(),
          t.initSlideEvents(),
          t.checkResponsive(!1, !0),
          !0 === t.options.focusOnSelect &&
            c(t.$slideTrack).children().on('click.slick', t.selectHandler),
          t.setSlideClasses(
            'number' == typeof t.currentSlide ? t.currentSlide : 0,
          ),
          t.setPosition(),
          t.focusHandler(),
          (t.paused = !t.options.autoplay),
          t.autoPlay(),
          t.$slider.trigger('reInit', [t])
      }),
      (s.prototype.resize = function () {
        var t = this
        c(window).width() !== t.windowWidth &&
          (clearTimeout(t.windowDelay),
          (t.windowDelay = window.setTimeout(function () {
            ;(t.windowWidth = c(window).width()),
              t.checkResponsive(),
              t.unslicked || t.setPosition()
          }, 50)))
      }),
      (s.prototype.removeSlide = s.prototype.slickRemove =
        function (t, e, i) {
          var n = this
          if (
            ((t =
              'boolean' == typeof t
                ? !0 === (e = t)
                  ? 0
                  : n.slideCount - 1
                : !0 === e
                  ? --t
                  : t),
            n.slideCount < 1 || t < 0 || t > n.slideCount - 1)
          )
            return !1
          n.unload(),
            (!0 === i
              ? n.$slideTrack.children()
              : n.$slideTrack.children(this.options.slide).eq(t)
            ).remove(),
            (n.$slides = n.$slideTrack.children(this.options.slide)),
            n.$slideTrack.children(this.options.slide).detach(),
            n.$slideTrack.append(n.$slides),
            (n.$slidesCache = n.$slides),
            n.reinit()
        }),
      (s.prototype.setCSS = function (t) {
        var e,
          i,
          n = this,
          o = {}
        !0 === n.options.rtl && (t = -t),
          (e = 'left' == n.positionProp ? Math.ceil(t) + 'px' : '0px'),
          (i = 'top' == n.positionProp ? Math.ceil(t) + 'px' : '0px'),
          (o[n.positionProp] = t),
          !1 !== n.transformsEnabled &&
            (!(o = {}) === n.cssTransitions
              ? (o[n.animType] = 'translate(' + e + ', ' + i + ')')
              : (o[n.animType] = 'translate3d(' + e + ', ' + i + ', 0px)')),
          n.$slideTrack.css(o)
      }),
      (s.prototype.setDimensions = function () {
        var t = this,
          e =
            (!1 === t.options.vertical
              ? !0 === t.options.centerMode &&
                t.$list.css({ padding: '0px ' + t.options.centerPadding })
              : (t.$list.height(
                  t.$slides.first().outerHeight(!0) * t.options.slidesToShow,
                ),
                !0 === t.options.centerMode &&
                  t.$list.css({ padding: t.options.centerPadding + ' 0px' })),
            (t.listWidth = t.$list.width()),
            (t.listHeight = t.$list.height()),
            !1 === t.options.vertical && !1 === t.options.variableWidth
              ? ((t.slideWidth = Math.ceil(
                  t.listWidth / t.options.slidesToShow,
                )),
                t.$slideTrack.width(
                  Math.ceil(
                    t.slideWidth *
                      t.$slideTrack.children('.slick-slide').length,
                  ),
                ))
              : !0 === t.options.variableWidth
                ? t.$slideTrack.width(5e3 * t.slideCount)
                : ((t.slideWidth = Math.ceil(t.listWidth)),
                  t.$slideTrack.height(
                    Math.ceil(
                      t.$slides.first().outerHeight(!0) *
                        t.$slideTrack.children('.slick-slide').length,
                    ),
                  )),
            t.$slides.first().outerWidth(!0) - t.$slides.first().width())
        !1 === t.options.variableWidth &&
          t.$slideTrack.children('.slick-slide').width(t.slideWidth - e)
      }),
      (s.prototype.setFade = function () {
        var i,
          n = this
        n.$slides.each(function (t, e) {
          ;(i = n.slideWidth * t * -1),
            !0 === n.options.rtl
              ? c(e).css({
                  position: 'relative',
                  right: i,
                  top: 0,
                  zIndex: n.options.zIndex - 2,
                  opacity: 0,
                })
              : c(e).css({
                  position: 'relative',
                  left: i,
                  top: 0,
                  zIndex: n.options.zIndex - 2,
                  opacity: 0,
                })
        }),
          n.$slides
            .eq(n.currentSlide)
            .css({ zIndex: n.options.zIndex - 1, opacity: 1 })
      }),
      (s.prototype.setHeight = function () {
        var t
        1 === this.options.slidesToShow &&
          !0 === this.options.adaptiveHeight &&
          !1 === this.options.vertical &&
          ((t = this.$slides.eq(this.currentSlide).outerHeight(!0)),
          this.$list.css('height', t))
      }),
      (s.prototype.setOption = s.prototype.slickSetOption =
        function () {
          var t,
            e,
            i,
            n,
            o,
            s = this,
            r = !1
          if (
            ('object' === c.type(arguments[0])
              ? ((i = arguments[0]), (r = arguments[1]), (o = 'multiple'))
              : 'string' === c.type(arguments[0]) &&
                ((i = arguments[0]),
                (n = arguments[1]),
                (r = arguments[2]),
                'responsive' === arguments[0] &&
                'array' === c.type(arguments[1])
                  ? (o = 'responsive')
                  : void 0 !== arguments[1] && (o = 'single')),
            'single' === o)
          )
            s.options[i] = n
          else if ('multiple' === o)
            c.each(i, function (t, e) {
              s.options[t] = e
            })
          else if ('responsive' === o)
            for (e in n)
              if ('array' !== c.type(s.options.responsive))
                s.options.responsive = [n[e]]
              else {
                for (t = s.options.responsive.length - 1; 0 <= t; )
                  s.options.responsive[t].breakpoint === n[e].breakpoint &&
                    s.options.responsive.splice(t, 1),
                    t--
                s.options.responsive.push(n[e])
              }
          r && (s.unload(), s.reinit())
        }),
      (s.prototype.setPosition = function () {
        this.setDimensions(),
          this.setHeight(),
          !1 === this.options.fade
            ? this.setCSS(this.getLeft(this.currentSlide))
            : this.setFade(),
          this.$slider.trigger('setPosition', [this])
      }),
      (s.prototype.setProps = function () {
        var t = this,
          e = document.body.style
        ;(t.positionProp = !0 === t.options.vertical ? 'top' : 'left'),
          'top' === t.positionProp
            ? t.$slider.addClass('slick-vertical')
            : t.$slider.removeClass('slick-vertical'),
          (void 0 === e.WebkitTransition &&
            void 0 === e.MozTransition &&
            void 0 === e.msTransition) ||
            (!0 === t.options.useCSS && (t.cssTransitions = !0)),
          t.options.fade &&
            ('number' == typeof t.options.zIndex
              ? t.options.zIndex < 3 && (t.options.zIndex = 3)
              : (t.options.zIndex = t.defaults.zIndex)),
          void 0 !== e.OTransform &&
            ((t.animType = 'OTransform'),
            (t.transformType = '-o-transform'),
            (t.transitionType = 'OTransition'),
            void 0 === e.perspectiveProperty) &&
            void 0 === e.webkitPerspective &&
            (t.animType = !1),
          void 0 !== e.MozTransform &&
            ((t.animType = 'MozTransform'),
            (t.transformType = '-moz-transform'),
            (t.transitionType = 'MozTransition'),
            void 0 === e.perspectiveProperty) &&
            void 0 === e.MozPerspective &&
            (t.animType = !1),
          void 0 !== e.webkitTransform &&
            ((t.animType = 'webkitTransform'),
            (t.transformType = '-webkit-transform'),
            (t.transitionType = 'webkitTransition'),
            void 0 === e.perspectiveProperty) &&
            void 0 === e.webkitPerspective &&
            (t.animType = !1),
          void 0 !== e.msTransform &&
            ((t.animType = 'msTransform'),
            (t.transformType = '-ms-transform'),
            (t.transitionType = 'msTransition'),
            void 0 === e.msTransform) &&
            (t.animType = !1),
          void 0 !== e.transform &&
            !1 !== t.animType &&
            ((t.animType = 'transform'),
            (t.transformType = 'transform'),
            (t.transitionType = 'transition')),
          (t.transformsEnabled =
            t.options.useTransform && null !== t.animType && !1 !== t.animType)
      }),
      (s.prototype.setSlideClasses = function (t) {
        var e,
          i,
          n,
          o = this,
          s = o.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true')
        o.$slides.eq(t).addClass('slick-current'),
          !0 === o.options.centerMode
            ? ((i = o.options.slidesToShow % 2 == 0 ? 1 : 0),
              (n = Math.floor(o.options.slidesToShow / 2)),
              !0 === o.options.infinite &&
                ((n <= t && t <= o.slideCount - 1 - n
                  ? o.$slides.slice(t - n + i, t + n + 1)
                  : ((e = o.options.slidesToShow + t),
                    s.slice(e - n + 1 + i, e + n + 2))
                )
                  .addClass('slick-active')
                  .attr('aria-hidden', 'false'),
                0 === t
                  ? s
                      .eq(s.length - 1 - o.options.slidesToShow)
                      .addClass('slick-center')
                  : t === o.slideCount - 1 &&
                    s.eq(o.options.slidesToShow).addClass('slick-center')),
              o.$slides.eq(t).addClass('slick-center'))
            : (0 <= t && t <= o.slideCount - o.options.slidesToShow
                ? o.$slides.slice(t, t + o.options.slidesToShow)
                : s.length <= o.options.slidesToShow
                  ? s
                  : ((i = o.slideCount % o.options.slidesToShow),
                    (e =
                      !0 === o.options.infinite
                        ? o.options.slidesToShow + t
                        : t),
                    o.options.slidesToShow == o.options.slidesToScroll &&
                    o.slideCount - t < o.options.slidesToShow
                      ? s.slice(e - (o.options.slidesToShow - i), e + i)
                      : s.slice(e, e + o.options.slidesToShow))
              )
                .addClass('slick-active')
                .attr('aria-hidden', 'false'),
          ('ondemand' !== o.options.lazyLoad &&
            'anticipated' !== o.options.lazyLoad) ||
            o.lazyLoad()
      }),
      (s.prototype.setupInfinite = function () {
        var t,
          e,
          i,
          n = this
        if (
          (!0 === n.options.fade && (n.options.centerMode = !1),
          !0 === n.options.infinite &&
            !1 === n.options.fade &&
            ((e = null), n.slideCount > n.options.slidesToShow))
        ) {
          for (
            i =
              !0 === n.options.centerMode
                ? n.options.slidesToShow + 1
                : n.options.slidesToShow,
              t = n.slideCount;
            t > n.slideCount - i;
            --t
          )
            c(n.$slides[(e = t - 1)])
              .clone(!0)
              .attr('id', '')
              .attr('data-slick-index', e - n.slideCount)
              .prependTo(n.$slideTrack)
              .addClass('slick-cloned')
          for (t = 0; t < i + n.slideCount; t += 1)
            (e = t),
              c(n.$slides[e])
                .clone(!0)
                .attr('id', '')
                .attr('data-slick-index', e + n.slideCount)
                .appendTo(n.$slideTrack)
                .addClass('slick-cloned')
          n.$slideTrack
            .find('.slick-cloned')
            .find('[id]')
            .each(function () {
              c(this).attr('id', '')
            })
        }
      }),
      (s.prototype.interrupt = function (t) {
        t || this.autoPlay(), (this.interrupted = t)
      }),
      (s.prototype.selectHandler = function (t) {
        ;(t = c(t.target).is('.slick-slide')
          ? c(t.target)
          : c(t.target).parents('.slick-slide')),
          (t = (t = parseInt(t.attr('data-slick-index'))) || 0)
        this.slideCount <= this.options.slidesToShow
          ? this.slideHandler(t, !1, !0)
          : this.slideHandler(t)
      }),
      (s.prototype.slideHandler = function (t, e, i) {
        var n,
          o,
          s,
          r = this
        ;(e = e || !1),
          (!0 === r.animating && !0 === r.options.waitForAnimate) ||
            (!0 === r.options.fade && r.currentSlide === t) ||
            (!1 === e && r.asNavFor(t),
            (n = t),
            (e = r.getLeft(n)),
            (s = r.getLeft(r.currentSlide)),
            (r.currentLeft = null === r.swipeLeft ? s : r.swipeLeft),
            (!1 === r.options.infinite &&
              !1 === r.options.centerMode &&
              (t < 0 || t > r.getDotCount() * r.options.slidesToScroll)) ||
            (!1 === r.options.infinite &&
              !0 === r.options.centerMode &&
              (t < 0 || t > r.slideCount - r.options.slidesToScroll))
              ? !1 === r.options.fade &&
                ((n = r.currentSlide),
                !0 !== i
                  ? r.animateSlide(s, function () {
                      r.postSlide(n)
                    })
                  : r.postSlide(n))
              : (r.options.autoplay && clearInterval(r.autoPlayTimer),
                (o =
                  n < 0
                    ? r.slideCount % r.options.slidesToScroll != 0
                      ? r.slideCount - (r.slideCount % r.options.slidesToScroll)
                      : r.slideCount + n
                    : n >= r.slideCount
                      ? r.slideCount % r.options.slidesToScroll != 0
                        ? 0
                        : n - r.slideCount
                      : n),
                (r.animating = !0),
                r.$slider.trigger('beforeChange', [r, r.currentSlide, o]),
                (t = r.currentSlide),
                (r.currentSlide = o),
                r.setSlideClasses(r.currentSlide),
                r.options.asNavFor &&
                  (s = (s = r.getNavTarget()).slick('getSlick')).slideCount <=
                    s.options.slidesToShow &&
                  s.setSlideClasses(r.currentSlide),
                r.updateDots(),
                r.updateArrows(),
                !0 === r.options.fade
                  ? (!0 !== i
                      ? (r.fadeSlideOut(t),
                        r.fadeSlide(o, function () {
                          r.postSlide(o)
                        }))
                      : r.postSlide(o),
                    r.animateHeight())
                  : !0 !== i
                    ? r.animateSlide(e, function () {
                        r.postSlide(o)
                      })
                    : r.postSlide(o)))
      }),
      (s.prototype.startLoad = function () {
        var t = this
        !0 === t.options.arrows &&
          t.slideCount > t.options.slidesToShow &&
          (t.$prevArrow.hide(), t.$nextArrow.hide()),
          !0 === t.options.dots &&
            t.slideCount > t.options.slidesToShow &&
            t.$dots.hide(),
          t.$slider.addClass('slick-loading')
      }),
      (s.prototype.swipeDirection = function () {
        var t = this.touchObject.startX - this.touchObject.curX,
          e = this.touchObject.startY - this.touchObject.curY,
          e = Math.atan2(e, t)
        return ((t =
          (t = Math.round((180 * e) / Math.PI)) < 0 ? 360 - Math.abs(t) : t) <=
          45 &&
          0 <= t) ||
          (t <= 360 && 315 <= t)
          ? !1 === this.options.rtl
            ? 'left'
            : 'right'
          : 135 <= t && t <= 225
            ? !1 === this.options.rtl
              ? 'right'
              : 'left'
            : !0 === this.options.verticalSwiping
              ? 35 <= t && t <= 135
                ? 'down'
                : 'up'
              : 'vertical'
      }),
      (s.prototype.swipeEnd = function (t) {
        var e,
          i,
          n = this
        if (((n.dragging = !1), (n.swiping = !1), n.scrolling))
          return (n.scrolling = !1)
        if (
          ((n.interrupted = !1),
          (n.shouldClick = !(10 < n.touchObject.swipeLength)),
          void 0 === n.touchObject.curX)
        )
          return !1
        if (
          (!0 === n.touchObject.edgeHit &&
            n.$slider.trigger('edge', [n, n.swipeDirection()]),
          n.touchObject.swipeLength >= n.touchObject.minSwipe)
        ) {
          switch ((i = n.swipeDirection())) {
            case 'left':
            case 'down':
              ;(e = n.options.swipeToSlide
                ? n.checkNavigable(n.currentSlide + n.getSlideCount())
                : n.currentSlide + n.getSlideCount()),
                (n.currentDirection = 0)
              break
            case 'right':
            case 'up':
              ;(e = n.options.swipeToSlide
                ? n.checkNavigable(n.currentSlide - n.getSlideCount())
                : n.currentSlide - n.getSlideCount()),
                (n.currentDirection = 1)
          }
          'vertical' != i &&
            (n.slideHandler(e),
            (n.touchObject = {}),
            n.$slider.trigger('swipe', [n, i]))
        } else
          n.touchObject.startX !== n.touchObject.curX &&
            (n.slideHandler(n.currentSlide), (n.touchObject = {}))
      }),
      (s.prototype.swipeHandler = function (t) {
        var e = this
        if (
          !(
            !1 === e.options.swipe ||
            ('ontouchend' in document && !1 === e.options.swipe) ||
            (!1 === e.options.draggable && -1 !== t.type.indexOf('mouse'))
          )
        )
          switch (
            ((e.touchObject.fingerCount =
              t.originalEvent && void 0 !== t.originalEvent.touches
                ? t.originalEvent.touches.length
                : 1),
            (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
            !0 === e.options.verticalSwiping &&
              (e.touchObject.minSwipe =
                e.listHeight / e.options.touchThreshold),
            t.data.action)
          ) {
            case 'start':
              e.swipeStart(t)
              break
            case 'move':
              e.swipeMove(t)
              break
            case 'end':
              e.swipeEnd(t)
          }
      }),
      (s.prototype.swipeMove = function (t) {
        var e,
          i,
          n = this,
          o = void 0 !== t.originalEvent ? t.originalEvent.touches : null
        return (
          !(!n.dragging || n.scrolling || (o && 1 !== o.length)) &&
          ((e = n.getLeft(n.currentSlide)),
          (n.touchObject.curX = void 0 !== o ? o[0].pageX : t.clientX),
          (n.touchObject.curY = void 0 !== o ? o[0].pageY : t.clientY),
          (n.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(n.touchObject.curX - n.touchObject.startX, 2)),
          )),
          (o = Math.round(
            Math.sqrt(Math.pow(n.touchObject.curY - n.touchObject.startY, 2)),
          )),
          !n.options.verticalSwiping && !n.swiping && 4 < o
            ? !(n.scrolling = !0)
            : (!0 === n.options.verticalSwiping &&
                (n.touchObject.swipeLength = o),
              (o = n.swipeDirection()),
              void 0 !== t.originalEvent &&
                4 < n.touchObject.swipeLength &&
                ((n.swiping = !0), t.preventDefault()),
              (t =
                (!1 === n.options.rtl ? 1 : -1) *
                (n.touchObject.curX > n.touchObject.startX ? 1 : -1)),
              !0 === n.options.verticalSwiping &&
                (t = n.touchObject.curY > n.touchObject.startY ? 1 : -1),
              (i = n.touchObject.swipeLength),
              (n.touchObject.edgeHit = !1) === n.options.infinite &&
                ((0 === n.currentSlide && 'right' === o) ||
                  (n.currentSlide >= n.getDotCount() && 'left' === o)) &&
                ((i = n.touchObject.swipeLength * n.options.edgeFriction),
                (n.touchObject.edgeHit = !0)),
              !1 === n.options.vertical
                ? (n.swipeLeft = e + i * t)
                : (n.swipeLeft = e + i * (n.$list.height() / n.listWidth) * t),
              !0 === n.options.verticalSwiping && (n.swipeLeft = e + i * t),
              !0 !== n.options.fade &&
                !1 !== n.options.touchMove &&
                (!0 === n.animating
                  ? ((n.swipeLeft = null), !1)
                  : void n.setCSS(n.swipeLeft))))
        )
      }),
      (s.prototype.swipeStart = function (t) {
        var e,
          i = this
        if (
          ((i.interrupted = !0),
          1 !== i.touchObject.fingerCount ||
            i.slideCount <= i.options.slidesToShow)
        )
          return !(i.touchObject = {})
        void 0 !== t.originalEvent &&
          void 0 !== t.originalEvent.touches &&
          (e = t.originalEvent.touches[0]),
          (i.touchObject.startX = i.touchObject.curX =
            void 0 !== e ? e.pageX : t.clientX),
          (i.touchObject.startY = i.touchObject.curY =
            void 0 !== e ? e.pageY : t.clientY),
          (i.dragging = !0)
      }),
      (s.prototype.unfilterSlides = s.prototype.slickUnfilter =
        function () {
          null !== this.$slidesCache &&
            (this.unload(),
            this.$slideTrack.children(this.options.slide).detach(),
            this.$slidesCache.appendTo(this.$slideTrack),
            this.reinit())
        }),
      (s.prototype.unload = function () {
        var t = this
        c('.slick-cloned', t.$slider).remove(),
          t.$dots && t.$dots.remove(),
          t.$prevArrow &&
            t.htmlExpr.test(t.options.prevArrow) &&
            t.$prevArrow.remove(),
          t.$nextArrow &&
            t.htmlExpr.test(t.options.nextArrow) &&
            t.$nextArrow.remove(),
          t.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '')
      }),
      (s.prototype.unslick = function (t) {
        this.$slider.trigger('unslick', [this, t]), this.destroy()
      }),
      (s.prototype.updateArrows = function () {
        var t = this
        Math.floor(t.options.slidesToShow / 2),
          !0 === t.options.arrows &&
            t.slideCount > t.options.slidesToShow &&
            !t.options.infinite &&
            (t.$prevArrow
              .removeClass('slick-disabled')
              .attr('aria-disabled', 'false'),
            t.$nextArrow
              .removeClass('slick-disabled')
              .attr('aria-disabled', 'false'),
            0 === t.currentSlide
              ? (t.$prevArrow
                  .addClass('slick-disabled')
                  .attr('aria-disabled', 'true'),
                t.$nextArrow
                  .removeClass('slick-disabled')
                  .attr('aria-disabled', 'false'))
              : ((t.currentSlide >= t.slideCount - t.options.slidesToShow &&
                  !1 === t.options.centerMode) ||
                  (t.currentSlide >= t.slideCount - 1 &&
                    !0 === t.options.centerMode)) &&
                (t.$nextArrow
                  .addClass('slick-disabled')
                  .attr('aria-disabled', 'true'),
                t.$prevArrow
                  .removeClass('slick-disabled')
                  .attr('aria-disabled', 'false')))
      }),
      (s.prototype.updateDots = function () {
        null !== this.$dots &&
          (this.$dots.find('li').removeClass('slick-active').end(),
          this.$dots
            .find('li')
            .eq(Math.floor(this.currentSlide / this.options.slidesToScroll))
            .addClass('slick-active'))
      }),
      (s.prototype.visibility = function () {
        this.options.autoplay &&
          (document[this.hidden]
            ? (this.interrupted = !0)
            : (this.interrupted = !1))
      }),
      (c.fn.slick = function () {
        for (
          var t,
            e = arguments[0],
            i = Array.prototype.slice.call(arguments, 1),
            n = this.length,
            o = 0;
          o < n;
          o++
        )
          if (
            ('object' == typeof e || void 0 === e
              ? (this[o].slick = new s(this[o], e))
              : (t = this[o].slick[e].apply(this[o].slick, i)),
            void 0 !== t)
          )
            return t
        return this
      })
  }),
  (function (t) {
    'function' == typeof define && define.amd ? define(t) : t()
  })(function () {
    function e(t, e, i) {
      return Array.prototype.slice.call(t, e, i)
    }
    function o(t) {
      return t.bind.apply(t, [null].concat(e(arguments, 1)))
    }
    function f(t) {
      requestAnimationFrame(t)
    }
    function t(t, e) {
      return typeof e === t
    }
    var s = Array.isArray
    function r(t) {
      return s(t) ? t : [t]
    }
    function l(t, e) {
      r(t).forEach(e)
    }
    o(t, 'function'), o(t, 'string'), o(t, 'undefined')
    var c = Object.keys
    function a(a) {
      return (
        e(arguments, 1).forEach(function (i) {
          var t = i,
            e = function (t, e) {
              a[e] = i[e]
            },
            n = void 0
          if (t)
            for (
              var o = c(t), o = n ? o.reverse() : o, s = 0;
              s < o.length;
              s++
            ) {
              var r = o[s]
              if ('__proto__' !== r && !1 === e(t[r], r)) break
            }
        }),
        a
      )
    }
    var h = Math.min
    function d() {
      var a = []
      function i(t, i, n) {
        l(t, function (e) {
          e &&
            l(i, function (t) {
              t.split(' ').forEach(function (t) {
                t = t.split('.')
                n(e, t[0], t[1])
              })
            })
        })
      }
      return {
        bind: function (t, e, s, r) {
          i(t, e, function (t, e, i) {
            var n = 'addEventListener' in t,
              o = n
                ? t.removeEventListener.bind(t, e, s, r)
                : t.removeListener.bind(t, s)
            n ? t.addEventListener(e, s, r) : t.addListener(s),
              a.push([t, e, i, s, o])
          })
        },
        unbind: function (t, e, o) {
          i(t, e, function (e, i, n) {
            a = a.filter(function (t) {
              return (
                !!(
                  t[0] !== e ||
                  t[1] !== i ||
                  t[2] !== n ||
                  (o && t[3] !== o)
                ) || (t[4](), !1)
              )
            })
          })
        },
        dispatch: function (t, e, i) {
          var n
          return (
            'function' == typeof CustomEvent
              ? (n = new CustomEvent(e, { bubbles: !0, detail: i }))
              : (n = document.createEvent('CustomEvent')).initCustomEvent(
                  e,
                  !0,
                  !1,
                  i,
                ),
            t.dispatchEvent(n),
            n
          )
        },
        destroy: function () {
          a.forEach(function (t) {
            t[4]()
          }),
            (a.length = 0)
        },
      }
    }
    var u = 'destroy'
    function F(t) {
      var i = t ? t.event.bus : document.createDocumentFragment(),
        n = d()
      return (
        t && t.event.on(u, n.destroy),
        a(n, {
          bus: i,
          on: function (t, e) {
            n.bind(i, r(t).join(' '), function (t) {
              e.apply(e, s(t.detail) ? t.detail : [])
            })
          },
          off: o(n.unbind, i),
          emit: function (t) {
            n.dispatch(i, t, e(arguments, 1))
          },
        })
      )
    }
    function H(e, t, i, n) {
      var o,
        s,
        r = Date.now,
        a = 0,
        l = !0,
        c = 0
      function d() {
        if (!l) {
          if (
            ((a = e ? h((r() - o) / e, 1) : 1),
            i && i(a),
            1 <= a && (t(), (o = r()), n) && ++c >= n)
          )
            return u()
          f(d)
        }
      }
      function u() {
        l = !0
      }
      function p() {
        s && cancelAnimationFrame(s), (l = !(s = a = 0))
      }
      return {
        start: function (t) {
          t || p(), (o = r() - (t ? a * e : 0)), (l = !1), f(d)
        },
        rewind: function () {
          ;(o = r()), (a = 0), i && i(a)
        },
        pause: u,
        cancel: p,
        set: function (t) {
          e = t
        },
        isPaused: function () {
          return l
        },
      }
    }
    function i(t, e, i) {
      return Array.prototype.slice.call(t, e, i)
    }
    function n(t) {
      return t.bind.apply(t, [null].concat(i(arguments, 1)))
    }
    function p(t, e) {
      return typeof e === t
    }
    function R(t) {
      return !g(t) && p('object', t)
    }
    var m = Array.isArray,
      B = (n(p, 'function'), n(p, 'string'), n(p, 'undefined'))
    function g(t) {
      return null === t
    }
    function N(t, e) {
      ;(m((t = t)) ? t : [t]).forEach(e)
    }
    var v = Object.keys
    function y(t, e, i) {
      if (t)
        for (var n = v(t), n = i ? n.reverse() : n, o = 0; o < n.length; o++) {
          var s = n[o]
          if ('__proto__' !== s && !1 === e(t[s], s)) break
        }
    }
    function V(n) {
      return (
        i(arguments, 1).forEach(function (i) {
          y(i, function (t, e) {
            n[e] = i[e]
          })
        }),
        n
      )
    }
    function W(i, e, n) {
      R(e)
        ? y(e, function (t, e) {
            W(i, e, t)
          })
        : N(i, function (t) {
            var i
            g(n) || '' === n
              ? ((i = e),
                N(t, function (e) {
                  N(i, function (t) {
                    e && e.removeAttribute(t)
                  })
                }))
              : t.setAttribute(e, String(n))
          })
    }
    var Q = Math.min,
      q = Math.max
    Math.floor, Math.ceil, Math.abs
    var Y = { speed: 1, autoStart: !0, pauseOnHover: !0, pauseOnFocus: !0 },
      U = {
        startScroll: 'Start auto scroll',
        pauseScroll: 'Pause auto scroll',
      }
    typeof window < 'u' &&
      ((window.splide = window.splide || {}),
      (window.splide.Extensions = window.splide.Extensions || {}),
      (window.splide.Extensions.AutoScroll = function (n, o, s) {
        var e,
          r,
          i,
          a,
          t,
          l,
          c,
          d,
          u,
          p = F(n),
          f = p.on,
          h = p.off,
          m = p.bind,
          g = p.unbind,
          v = (p = o.Move).translate,
          y = p.getPosition,
          w = p.toIndex,
          _ = p.getLimit,
          b = (p = o.Controller).setIndex,
          T = p.getIndex,
          k = o.Direction.orient,
          S = o.Elements.toggle,
          x = o.Live,
          C = n.root,
          E =
            ((c = o.Arrows.update),
            (d = 500),
            function () {
              u ||
                (u = H(
                  d || 0,
                  function () {
                    c(), (u = null)
                  },
                  null,
                  1,
                )).start()
            }),
          O = {}
        function A() {
          n.is('fade') ||
            e ||
            !1 === s.autoScroll ||
            ((e = H(0, j)),
            O.pauseOnHover &&
              m(C, 'mouseenter mouseleave', function (t) {
                ;(i = 'mouseenter' === t.type), z()
              }),
            O.pauseOnFocus &&
              m(C, 'focusin focusout', function (t) {
                ;(a = 'focusin' === t.type), z()
              }),
            O.useToggleButton &&
              m(S, 'click', function () {
                ;(r ? M : $)()
              }),
            f('updated', D),
            f(['move', 'drag', 'scroll'], function () {
              $(!(t = !0))
            }),
            f(['moved', 'dragged', 'scrolled'], function () {
              ;(t = !1), z()
            }),
            O.autoStart &&
              ('complete' === document.readyState ? M() : m(window, 'load', M)))
        }
        function P() {
          e &&
            (e.cancel(),
            (e = null),
            (l = void 0),
            h(['move', 'drag', 'scroll', 'moved', 'scrolled']),
            g(C, 'mouseenter mouseleave focusin focusout'),
            g(S, 'click'))
        }
        function D() {
          var t = s.autoScroll
          ;(!1 !== t ? ((O = V({}, O, R(t) ? t : {})), A) : P)(),
            e && !B(l) && v(l)
        }
        function M() {
          L() && (e.start(!0), x.disable(!0), (a = i = r = !1), I())
        }
        function $(t) {
          void 0 === t && (t = !0),
            r || ((r = t), I(), L()) || (e.pause(), x.disable(!1))
        }
        function z() {
          r || (i || a || t ? $(!1) : M())
        }
        function j() {
          var t,
            e,
            i = y()
          ;(t = i),
            (e = O.speed || 1),
            (t += k(e)),
            (t = n.is('slide')
              ? (function (t, e, i) {
                  var n = Q(e, i),
                    e = q(e, i)
                  return Q(q(n, t), e)
                })(t, _(!1), _(!0))
              : t)
          i !== t
            ? (v(t),
              (e = l = y()),
              (i = n.length),
              (e = (w(e) + i) % i) !== T() &&
                (b(e),
                o.Slides.update(),
                o.Pagination.update(),
                'nearby' === s.lazyLoad) &&
                o.LazyLoad.check())
            : ($(!1),
              O.rewind && n.go(0 < O.speed ? 0 : o.Controller.getEnd())),
            E()
        }
        function I() {
          var t, e, i, n
          S &&
            ((t = r ? 'startScroll' : 'pauseScroll'),
            (i = 'is-active'),
            (n = !r),
            (e = S) &&
              N(i, function (t) {
                t && e.classList[n ? 'add' : 'remove'](t)
              }),
            W(S, 'aria-label', s.i18n[t] || U[t]))
        }
        function L() {
          return !e || e.isPaused()
        }
        return {
          setup: function () {
            var t = s.autoScroll
            O = V({}, Y, R(t) ? t : {})
          },
          mount: A,
          destroy: P,
          play: M,
          pause: $,
          isPaused: L,
        }
      }))
  }),
  (function (t, e) {
    'object' == typeof exports && 'undefined' != typeof module
      ? (module.exports = e())
      : 'function' == typeof define && define.amd
        ? define(e)
        : (t.StickySidebar = e())
  })(this, function () {
    function t(t) {
      return t &&
        t.__esModule &&
        Object.prototype.hasOwnProperty.call(t, 'default')
        ? t.default
        : t
    }
    function e(t, e) {
      return t((e = { exports: {} }), e.exports), e.exports
    }
    var i = e(function (t, e) {
        ;(function (t) {
          function n(t, e) {
            for (var i = 0; i < e.length; i++) {
              var n = e[i]
              ;(n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n)
            }
          }
          Object.defineProperty(t, '__esModule', { value: !0 })
          ;(s = {
            topSpacing: 0,
            bottomSpacing: 0,
            containerSelector: !(a = '.stickySidebar'),
            innerWrapperSelector: '.inner-wrapper-sticky',
            stickyClass: 'is-affixed',
            resizeSensor: !0,
            minWidth: !1,
          }),
            (function (t, e, i) {
              e && n(t.prototype, e), i && n(t, i)
            })(
              l,
              [
                {
                  key: 'initialize',
                  value: function () {
                    var i = this
                    if (
                      (this._setSupportFeatures(),
                      this.options.innerWrapperSelector &&
                        ((this.sidebarInner = this.sidebar.querySelector(
                          this.options.innerWrapperSelector,
                        )),
                        null === this.sidebarInner) &&
                        (this.sidebarInner = !1),
                      !this.sidebarInner)
                    ) {
                      var t = document.createElement('div')
                      for (
                        t.setAttribute('class', 'inner-wrapper-sticky'),
                          this.sidebar.appendChild(t);
                        this.sidebar.firstChild != t;

                      )
                        t.appendChild(this.sidebar.firstChild)
                      this.sidebarInner = this.sidebar.querySelector(
                        '.inner-wrapper-sticky',
                      )
                    }
                    if (this.options.containerSelector) {
                      var e = document.querySelectorAll(
                        this.options.containerSelector,
                      )
                      if (
                        ((e = Array.prototype.slice.call(e)).forEach(
                          function (t, e) {
                            t.contains(i.sidebar) && (i.container = t)
                          },
                        ),
                        !e.length)
                      )
                        throw new Error(
                          'The container does not contains on the sidebar.',
                        )
                    }
                    'function' != typeof this.options.topSpacing &&
                      (this.options.topSpacing =
                        parseInt(this.options.topSpacing) || 0),
                      'function' != typeof this.options.bottomSpacing &&
                        (this.options.bottomSpacing =
                          parseInt(this.options.bottomSpacing) || 0),
                      this._widthBreakpoint(),
                      this.calcDimensions(),
                      this.stickyPosition(),
                      this.bindEvents(),
                      (this._initialized = !0)
                  },
                },
                {
                  key: 'bindEvents',
                  value: function () {
                    window.addEventListener('resize', this, {
                      passive: !0,
                      capture: !1,
                    }),
                      window.addEventListener('scroll', this, {
                        passive: !0,
                        capture: !1,
                      }),
                      this.sidebar.addEventListener('update' + a, this),
                      this.options.resizeSensor &&
                        'undefined' != typeof ResizeSensor &&
                        (new ResizeSensor(this.sidebarInner, this.handleEvent),
                        new ResizeSensor(this.container, this.handleEvent))
                  },
                },
                {
                  key: 'handleEvent',
                  value: function (t) {
                    this.updateSticky(t)
                  },
                },
                {
                  key: 'calcDimensions',
                  value: function () {
                    var t
                    this._breakpoint ||
                      (((t = this.dimensions).containerTop = l.offsetRelative(
                        this.container,
                      ).top),
                      (t.containerHeight = this.container.clientHeight),
                      (t.containerBottom = t.containerTop + t.containerHeight),
                      (t.sidebarHeight = this.sidebarInner.offsetHeight),
                      (t.sidebarWidth = this.sidebarInner.offsetWidth),
                      (t.viewportHeight = window.innerHeight),
                      (t.maxTranslateY = t.containerHeight - t.sidebarHeight),
                      this._calcDimensionsWithScroll())
                  },
                },
                {
                  key: '_calcDimensionsWithScroll',
                  value: function () {
                    var t = this.dimensions
                    ;(t.sidebarLeft = l.offsetRelative(this.sidebar).left),
                      (t.viewportTop =
                        document.documentElement.scrollTop ||
                        document.body.scrollTop),
                      (t.viewportBottom = t.viewportTop + t.viewportHeight),
                      (t.viewportLeft =
                        document.documentElement.scrollLeft ||
                        document.body.scrollLeft),
                      (t.topSpacing = this.options.topSpacing),
                      (t.bottomSpacing = this.options.bottomSpacing),
                      'function' == typeof t.topSpacing &&
                        (t.topSpacing =
                          parseInt(t.topSpacing(this.sidebar)) || 0),
                      'function' == typeof t.bottomSpacing &&
                        (t.bottomSpacing =
                          parseInt(t.bottomSpacing(this.sidebar)) || 0),
                      'VIEWPORT-TOP' === this.affixedType
                        ? t.topSpacing < t.lastTopSpacing &&
                          ((t.translateY += t.lastTopSpacing - t.topSpacing),
                          (this._reStyle = !0))
                        : 'VIEWPORT-BOTTOM' === this.affixedType &&
                          t.bottomSpacing < t.lastBottomSpacing &&
                          ((t.translateY +=
                            t.lastBottomSpacing - t.bottomSpacing),
                          (this._reStyle = !0)),
                      (t.lastTopSpacing = t.topSpacing),
                      (t.lastBottomSpacing = t.bottomSpacing)
                  },
                },
                {
                  key: 'isSidebarFitsViewport',
                  value: function () {
                    var t = this.dimensions,
                      t =
                        'down' === this.scrollDirection
                          ? t.lastBottomSpacing
                          : t.lastTopSpacing
                    return (
                      this.dimensions.sidebarHeight + t <
                      this.dimensions.viewportHeight
                    )
                  },
                },
                {
                  key: 'observeScrollDir',
                  value: function () {
                    var t,
                      e = this.dimensions
                    e.lastViewportTop !== e.viewportTop &&
                      ((t = 'down' === this.direction ? Math.min : Math.max),
                      e.viewportTop === t(e.viewportTop, e.lastViewportTop)) &&
                      (this.direction =
                        'down' === this.direction ? 'up' : 'down')
                  },
                },
                {
                  key: 'getAffixType',
                  value: function () {
                    this._calcDimensionsWithScroll()
                    var t = this.dimensions,
                      e = t.viewportTop + t.topSpacing,
                      i = this.affixedType,
                      i =
                        e <= t.containerTop ||
                        t.containerHeight <= t.sidebarHeight
                          ? ((t.translateY = 0), 'STATIC')
                          : 'up' === this.direction
                            ? this._getAffixTypeScrollingUp()
                            : this._getAffixTypeScrollingDown()
                    return (
                      (t.translateY = Math.max(0, t.translateY)),
                      (t.translateY = Math.min(
                        t.containerHeight,
                        t.translateY,
                      )),
                      (t.translateY = Math.round(t.translateY)),
                      (t.lastViewportTop = t.viewportTop),
                      i
                    )
                  },
                },
                {
                  key: '_getAffixTypeScrollingDown',
                  value: function () {
                    var t = this.dimensions,
                      e = t.sidebarHeight + t.containerTop,
                      i = t.viewportTop + t.topSpacing,
                      n = t.viewportBottom - t.bottomSpacing,
                      o = this.affixedType
                    return (
                      this.isSidebarFitsViewport()
                        ? t.sidebarHeight + i >= t.containerBottom
                          ? ((t.translateY = t.containerBottom - e),
                            (o = 'CONTAINER-BOTTOM'))
                          : i >= t.containerTop &&
                            ((t.translateY = i - t.containerTop),
                            (o = 'VIEWPORT-TOP'))
                        : t.containerBottom <= n
                          ? ((t.translateY = t.containerBottom - e),
                            (o = 'CONTAINER-BOTTOM'))
                          : e + t.translateY <= n
                            ? ((t.translateY = n - e), (o = 'VIEWPORT-BOTTOM'))
                            : t.containerTop + t.translateY <= i &&
                              0 !== t.translateY &&
                              t.maxTranslateY !== t.translateY &&
                              (o = 'VIEWPORT-UNBOTTOM'),
                      o
                    )
                  },
                },
                {
                  key: '_getAffixTypeScrollingUp',
                  value: function () {
                    var t = this.dimensions,
                      e = t.sidebarHeight + t.containerTop,
                      i = t.viewportTop + t.topSpacing,
                      n = t.viewportBottom - t.bottomSpacing,
                      o = this.affixedType
                    return (
                      i <= t.translateY + t.containerTop
                        ? ((t.translateY = i - t.containerTop),
                          (o = 'VIEWPORT-TOP'))
                        : t.containerBottom <= n
                          ? ((t.translateY = t.containerBottom - e),
                            (o = 'CONTAINER-BOTTOM'))
                          : this.isSidebarFitsViewport() ||
                            (t.containerTop <= i &&
                              0 !== t.translateY &&
                              t.maxTranslateY !== t.translateY &&
                              (o = 'VIEWPORT-UNBOTTOM')),
                      o
                    )
                  },
                },
                {
                  key: '_getStyle',
                  value: function (t) {
                    if (void 0 !== t) {
                      var e = { inner: {}, outer: {} },
                        i = this.dimensions
                      switch (t) {
                        case 'VIEWPORT-TOP':
                          e.inner = {
                            position: 'fixed',
                            top: i.topSpacing,
                            left: i.sidebarLeft - i.viewportLeft,
                            width: i.sidebarWidth,
                          }
                          break
                        case 'VIEWPORT-BOTTOM':
                          e.inner = {
                            position: 'fixed',
                            top: 'auto',
                            left: i.sidebarLeft,
                            bottom: i.bottomSpacing,
                            width: i.sidebarWidth,
                          }
                          break
                        case 'CONTAINER-BOTTOM':
                        case 'VIEWPORT-UNBOTTOM':
                          var n = this._getTranslate(0, i.translateY + 'px')
                          e.inner = n
                            ? { transform: n }
                            : {
                                position: 'absolute',
                                top: i.translateY,
                                width: i.sidebarWidth,
                              }
                      }
                      switch (t) {
                        case 'VIEWPORT-TOP':
                        case 'VIEWPORT-BOTTOM':
                        case 'VIEWPORT-UNBOTTOM':
                        case 'CONTAINER-BOTTOM':
                          e.outer = {
                            height: i.sidebarHeight,
                            position: 'relative',
                          }
                      }
                      return (
                        (e.outer = l.extend(
                          { height: '', position: '' },
                          e.outer,
                        )),
                        (e.inner = l.extend(
                          {
                            position: 'relative',
                            top: '',
                            left: '',
                            bottom: '',
                            width: '',
                            transform: '',
                          },
                          e.inner,
                        )),
                        e
                      )
                    }
                  },
                },
                {
                  key: 'stickyPosition',
                  value: function (t) {
                    if (!this._breakpoint) {
                      t = this._reStyle || t || !1
                      this.options.topSpacing, this.options.bottomSpacing
                      var e = this.getAffixType(),
                        i = this._getStyle(e)
                      if ((this.affixedType != e || t) && e) {
                        var n,
                          o,
                          t =
                            'affix.' +
                            e.toLowerCase().replace('viewport-', '') +
                            a
                        for (n in (l.eventTrigger(this.sidebar, t),
                        'STATIC' === e
                          ? l.removeClass(
                              this.sidebar,
                              this.options.stickyClass,
                            )
                          : l.addClass(this.sidebar, this.options.stickyClass),
                        i.outer)) {
                          var s = 'number' == typeof i.outer[n] ? 'px' : ''
                          this.sidebar.style[n] = i.outer[n] + s
                        }
                        for (o in i.inner) {
                          var r = 'number' == typeof i.inner[o] ? 'px' : ''
                          this.sidebarInner.style[o] = i.inner[o] + r
                        }
                        t =
                          'affixed.' +
                          e.toLowerCase().replace('viewport-', '') +
                          a
                        l.eventTrigger(this.sidebar, t)
                      } else
                        this._initialized &&
                          (this.sidebarInner.style.left = i.inner.left)
                      this.affixedType = e
                    }
                  },
                },
                {
                  key: '_widthBreakpoint',
                  value: function () {
                    window.innerWidth <= this.options.minWidth
                      ? ((this._breakpoint = !0),
                        (this.affixedType = 'STATIC'),
                        this.sidebar.removeAttribute('style'),
                        l.removeClass(this.sidebar, this.options.stickyClass),
                        this.sidebarInner.removeAttribute('style'))
                      : (this._breakpoint = !1)
                  },
                },
                {
                  key: 'updateSticky',
                  value: function () {
                    var t,
                      e = this,
                      i =
                        0 < arguments.length && void 0 !== arguments[0]
                          ? arguments[0]
                          : {}
                    this._running ||
                      ((this._running = !0),
                      (t = i.type),
                      requestAnimationFrame(function () {
                        'scroll' === t
                          ? (e._calcDimensionsWithScroll(),
                            e.observeScrollDir(),
                            e.stickyPosition())
                          : (e._widthBreakpoint(),
                            e.calcDimensions(),
                            e.stickyPosition(!0)),
                          (e._running = !1)
                      }))
                  },
                },
                {
                  key: '_setSupportFeatures',
                  value: function () {
                    var t = this.support
                    ;(t.transform = l.supportTransform()),
                      (t.transform3d = l.supportTransform(!0))
                  },
                },
                {
                  key: '_getTranslate',
                  value: function () {
                    var t =
                        0 < arguments.length && void 0 !== arguments[0]
                          ? arguments[0]
                          : 0,
                      e =
                        1 < arguments.length && void 0 !== arguments[1]
                          ? arguments[1]
                          : 0
                    return this.support.transform3d
                      ? 'translate3d(' +
                          t +
                          ', ' +
                          e +
                          ', ' +
                          (2 < arguments.length && void 0 !== arguments[2]
                            ? arguments[2]
                            : 0) +
                          ')'
                      : !!this.support.translate &&
                          'translate(' + t + ', ' + e + ')'
                  },
                },
                {
                  key: 'destroy',
                  value: function () {
                    window.removeEventListener('resize', this, { capture: !1 }),
                      window.removeEventListener('scroll', this, {
                        capture: !1,
                      }),
                      this.sidebar.classList.remove(this.options.stickyClass),
                      (this.sidebar.style.minHeight = ''),
                      this.sidebar.removeEventListener('update' + a, this)
                    var t,
                      e,
                      i = { inner: {}, outer: {} }
                    for (t in ((i.inner = {
                      position: '',
                      top: '',
                      left: '',
                      bottom: '',
                      width: '',
                      transform: '',
                    }),
                    (i.outer = { height: '', position: '' }),
                    i.outer))
                      this.sidebar.style[t] = i.outer[t]
                    for (e in i.inner) this.sidebarInner.style[e] = i.inner[e]
                    this.options.resizeSensor &&
                      'undefined' != typeof ResizeSensor &&
                      (ResizeSensor.detach(this.sidebarInner, this.handleEvent),
                      ResizeSensor.detach(this.container, this.handleEvent))
                  },
                },
              ],
              [
                {
                  key: 'supportTransform',
                  value: function (t) {
                    var i = !1,
                      t = t ? 'perspective' : 'transform',
                      e = t.charAt(0).toUpperCase() + t.slice(1),
                      n = document.createElement('support').style
                    return (
                      (t + ' ' + ['Webkit', 'Moz', 'O', 'ms'].join(e + ' ') + e)
                        .split(' ')
                        .forEach(function (t, e) {
                          if (void 0 !== n[t]) return (i = t), !1
                        }),
                      i
                    )
                  },
                },
                {
                  key: 'eventTrigger',
                  value: function (t, e, i) {
                    try {
                      var n = new CustomEvent(e, { detail: i })
                    } catch (t) {
                      ;(n =
                        document.createEvent('CustomEvent')).initCustomEvent(
                        e,
                        !0,
                        !0,
                        i,
                      )
                    }
                    t.dispatchEvent(n)
                  },
                },
                {
                  key: 'extend',
                  value: function (t, e) {
                    var i,
                      n = {}
                    for (i in t) void 0 !== e[i] ? (n[i] = e[i]) : (n[i] = t[i])
                    return n
                  },
                },
                {
                  key: 'offsetRelative',
                  value: function (t) {
                    var e = { left: 0, top: 0 }
                    do {
                      var i = t.offsetTop,
                        n = t.offsetLeft
                    } while (
                      (isNaN(i) || (e.top += i),
                      isNaN(n) || (e.left += n),
                      (t =
                        'BODY' === t.tagName
                          ? t.parentElement
                          : t.offsetParent))
                    )
                    return e
                  },
                },
                {
                  key: 'addClass',
                  value: function (t, e) {
                    l.hasClass(t, e) ||
                      (t.classList
                        ? t.classList.add(e)
                        : (t.className += ' ' + e))
                  },
                },
                {
                  key: 'removeClass',
                  value: function (t, e) {
                    l.hasClass(t, e) &&
                      (t.classList
                        ? t.classList.remove(e)
                        : (t.className = t.className.replace(
                            new RegExp(
                              '(^|\\b)' + e.split(' ').join('|') + '(\\b|$)',
                              'gi',
                            ),
                            ' ',
                          )))
                  },
                },
                {
                  key: 'hasClass',
                  value: function (t, e) {
                    return t.classList
                      ? t.classList.contains(e)
                      : new RegExp('(^| )' + e + '( |$)', 'gi').test(
                          t.className,
                        )
                  },
                },
                {
                  key: 'defaults',
                  get: function () {
                    return s
                  },
                },
              ],
            )
          var a,
            s,
            e = l
          function l(t) {
            var e = this,
              i =
                1 < arguments.length && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              n = this,
              o = l
            if (!(n instanceof o))
              throw new TypeError('Cannot call a class as a function')
            if (
              ((this.options = l.extend(s, i)),
              (this.sidebar =
                'string' == typeof t ? document.querySelector(t) : t),
              void 0 === this.sidebar)
            )
              throw new Error('There is no specific sidebar element.')
            ;(this.sidebarInner = !1),
              (this.container = this.sidebar.parentElement),
              (this.affixedType = 'STATIC'),
              (this.direction = 'down'),
              (this.support = { transform: !1, transform3d: !1 }),
              (this._initialized = !1),
              (this._reStyle = !1),
              (this._breakpoint = !1),
              (this.dimensions = {
                translateY: 0,
                maxTranslateY: 0,
                topSpacing: 0,
                lastTopSpacing: 0,
                bottomSpacing: 0,
                lastBottomSpacing: 0,
                sidebarHeight: 0,
                sidebarWidth: 0,
                containerTop: 0,
                containerHeight: 0,
                viewportHeight: 0,
                viewportTop: 0,
                lastViewportTop: 0,
              }),
              ['handleEvent'].forEach(function (t) {
                e[t] = e[t].bind(e)
              }),
              this.initialize()
          }
          ;(t.default = e), (window.StickySidebar = e)
        })(e)
      }),
      n =
        (t(i),
        e(function (t, e) {
          ;(function (t) {
            var n,
              o,
              e,
              s = (t = t) && t.__esModule ? t : { default: t }
            'undefined' != typeof window &&
              ((o = 'stickySidebar'),
              (n = window.$ || window.jQuery || window.Zepto)) &&
              ((n.fn.stickySidebar = function (i) {
                return this.each(function () {
                  var t = n(this),
                    e = n(this).data(o)
                  if (
                    (e ||
                      ((e = new s.default(this, 'object' == typeof i && i)),
                      t.data(o, e)),
                    'string' == typeof i)
                  ) {
                    if (
                      void 0 === e[i] &&
                      -1 === ['destroy', 'updateSticky'].indexOf(i)
                    )
                      throw new Error('No method named "' + i + '"')
                    e[i]()
                  }
                })
              }),
              (n.fn.stickySidebar.Constructor = s.default),
              (e = n.fn.stickySidebar),
              (n.fn.stickySidebar.noConflict = function () {
                return (n.fn.stickySidebar = e), this
              }))
          })(i)
        }))
    return t(n)
  }),
  jQuery(function (r) {
    r('.opt-btns .opt-btn:first').addClass('selected'),
      r('.ai-feature-image:first').addClass('active-slide'),
      r(document).ready(function () {
        window.scrollTo(0, 0), s(), t(), n(), a()
      })
    var i = 0
    function t() {
      r('#screen2 .opt-btns .opt-btn').on('click', function (t) {
        u(this, r('#screen2 .opt-btns .opt-btn').index(this))
      }),
        r('#screen2 .opt-btns .opt-btn').on('keydown', function (t) {
          d(t)
        }),
        (window.onresize = function () {
          n(), s()
        })
    }
    function n() {
      var t = 'auto'
      r(document).width() < 1200
        ? (r('#screen2').addClass('scrolled'), p(!1, 0))
        : (r('#screen2').hasClass('scrolled')
            ? 100 < window.scrollY
              ? p(!1, 1e3)
              : (r('#screen2').removeClass('scrolled'), p(!0, 0))
            : 100 < window.scrollY
              ? (r('#screen2').addClass('scrolled'), m(), p(!1, 1e3))
              : p(!0, 0),
          (t = r('#screen6 .arrow-wrapper').outerWidth())),
        r('#screen6 .arrow-flag').width(t)
    }
    var o = {}
    function s() {
      ;(o.group = document.querySelector('#screen2 .opt-btns')),
        (o.nodes = document.querySelectorAll('#screen2 .opt-btns .opt-btn')),
        (o.total = o.nodes.length),
        (o.ease = Power1.easeInOut),
        (o.boxes = [])
      for (var t = 0; t < o.total; t++) {
        var e = o.nodes[t]
        gsap.set(e, { x: 0 }),
          (o.boxes[t] = { x: e.offsetLeft, y: e.offsetTop, node: e })
      }
      r(document).off('scroll', f),
        1200 <= r(document).width()
          ? r(document).on('scroll', f)
          : (p(!1, 0), r('#screen2').addClass('scrolled'))
    }
    function a() {
      r('#screen4 .industry-card').on('click', function (t) {
        y(t.currentTarget)
      }),
        r('#screen4 .details-slide .zm-icon-close').on('click', function (t) {
          w()
        }),
        r('#screen4 .details-slide .zm-icon-close').on('keydown', function (t) {
          13 === t.keyCode &&
            (w(), r('#screen4 .industry-card').eq(e.activeIndex).focus())
        }),
        r('#screen4 .industry-card').on('keydown', function (t) {
          v(t)
        }),
        r('#screen1 .screen1-container a').on('focus', function () {
          h.autoplay.stop()
        }),
        r('#screen1 .screen1-container a').on('blur', function () {
          h.autoplay.start()
        }),
        r('.blog-slide img').on('error', function (t) {
          r(t.currentTarget).addClass('error')
        })
    }
    function l() {
      r('#screen2').addClass('scrolled')
      var t = document.getElementById('screen2').offsetTop
      window.scrollTo({ top: t - 64, behavior: 'smooth' })
    }
    function c(t, e) {
      r('#screen2 .opt-btns .opt-btn')
        .removeClass('selected')
        .attr('tabindex', '-1')
        .attr('aria-selected', 'false'),
        r('#screen2 .slide-blue-bg').hide(),
        r(e)
          .addClass('selected')
          .attr('tabindex', '0')
          .attr('aria-selected', 'true'),
        console.log('v', i),
        i !== t && r('#screen2 .ai-feature-image').removeClass('active-slide'),
        r(`#screen2 .ai-feature-image[data-image=${(i = t)}]`).addClass(
          'active-slide',
        )
    }
    function d(t) {
      g(t, r('#screen2 .opt-btns .opt-btn'), u)
    }
    function u(t, e) {
      r('#screen2').hasClass('scrolled') ? i !== e && c(e, t) : (l(), c(e, t))
    }
    function p(e, t) {
      setTimeout(function () {
        var t = r('#screen2 .slide-blue-bg')
        e ? t.show() : t.fadeOut()
      }, t)
    }
    function f() {
      0 === window.scrollY &&
        r('#screen2').hasClass('scrolled') &&
        ((hasExpandSection2 = !1),
        r('#screen2').removeClass('scrolled'),
        m(),
        p(!0, 1e3)),
        120 < window.scrollY &&
          !r('#screen2').hasClass('scrolled') &&
          (r('#screen2').addClass('scrolled'), m(), p(!1, 1e3))
    }
    function m() {
      for (var t = 0; t < o.total; t++) {
        var e = o.boxes[t],
          i = e.x,
          n = e.y
        ;(e.x = e.node.offsetLeft),
          (e.y = e.node.offsetTop),
          (i === e.x && n === e.y) ||
            ((i = i - e.x),
            (n = n - e.y),
            gsap.fromTo(
              e.node,
              { x: i, y: n },
              { duration: 1, x: 0, y: 0, ease: o.ease },
            ))
      }
    }
    function g(t, e, i) {
      var n = !1,
        o = e.length,
        s = e.index(t.currentTarget)
      switch (t.keyCode) {
        case 37:
        case 38:
          ;(s = (s - 1 + o) % o), (n = !0)
          break
        case 39:
        case 40:
          ;(s = (s + 1 + o) % o), (n = !0)
          break
        case 36:
          n = !(s = 0)
          break
        case 35:
          ;(s = o - 1), (n = !0)
          break
        case 32:
        case 13:
          i(e.eq(s), s)
      }
      n &&
        (t.stopPropagation(), t.preventDefault(), (t = e.eq(s)), r(t).focus())
    }
    function v(t) {
      g(t, r('#screen4 .industry-card'), y)
    }
    function y(t) {
      r(t).hasClass('active') ? w() : _(t)
    }
    function w() {
      r('#screen4 .industry-card').removeClass('active').attr('tabindex', '0'),
        r('#screen4').removeClass('show-pro-card'),
        r('#screen4 .production-container').fadeOut(),
        r('#screen4 .desc-container').fadeIn()
    }
    function _(t) {
      r('#screen4 .industry-card').removeClass('active').attr('tabindex', '-1'),
        r(t).addClass('active'),
        r(t).attr('tabindex', '0'),
        r('#screen4').addClass('show-pro-card'),
        r('#screen4 .desc-container').fadeOut()
      t = r(t).attr('index')
      e.slideTo(Number(t), 500, !1),
        r('#screen4 .production-container').fadeIn(400, function () {})
    }
  }),
  jQuery(document).ready(function () {
    jQuery('.ai-feature-section').each(function (t) {
      var n = jQuery(this),
        e = n.find('.ai-image-slider'),
        i = n.find('.ai-tab-slider')
      e.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: !1,
        arrows: !1,
        asNavFor: i,
      }),
        i.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          asNavFor: e,
          dots: !1,
          arrows: !1,
          focusOnSelect: !0,
          fade: !0,
          cssEase: 'linear',
          speed: 100,
        }),
        n.find('ul.ai-tab-links li:first-child').addClass('ai-tab-active'),
        n.find('ul.ai-tab-links li a[data-slide]').on('click', function (t) {
          t.preventDefault(),
            jQuery('ul.ai-tab-links').removeClass('ai-links'),
            jQuery(this).parent('li').siblings().removeClass('ai-tab-active'),
            jQuery(this).parent().siblings('li').removeClass('ai-tab-open'),
            jQuery(this).parent().addClass('ai-tab-open')
          t = jQuery(this).data('slide')
          i.slick('slickGoTo', t - 1)
        }),
        e.on('afterChange', function (t, e, i) {
          i = n
            .find('ul.ai-tab-links li a[data-slide="' + (i + 1) + '"]')
            .parent()
          i.siblings().removeClass('ai-tab-open ai-tab-active no-delay'),
            i.addClass('ai-tab-active no-delay')
        })
    })
  })
var DrawSVGPlugin = DrawSVGPlugin || window.DrawSVGPlugin,
  CountUp = CountUp || window.CountUp
function getRandomInt(t, e) {
  return Math.random() * (e - t) + t
}
gsap.registerPlugin(DrawSVGPlugin)
const $quoteicon = jQuery('.quote-icon'),
  Splider =
    ($quoteicon.each(function () {
      var t = jQuery(this),
        e = t.find('svg path'),
        i = gsap.timeline({ paused: !0 })
      i.fromTo(
        e[0],
        { opacity: '0' },
        { opacity: '1', duration: 2, ease: 'power1.out' },
        'start',
      ),
        i.fromTo(
          e[2],
          { scale: '0', opacity: '0' },
          { scale: '1', opacity: '1', duration: 0.75, ease: 'power1.out' },
          'start',
        ),
        i.fromTo(
          e[3],
          { scale: '0', opacity: '0' },
          { scale: '1', opacity: '1', duration: 0.75, ease: 'power1.out' },
          'start',
        ),
        (t[0].tl = i)
    }),
    jQuery(document).ready(function () {
      jQuery('.client-slider-up .slick-slide').removeAttr('aria-hidden'),
        jQuery('.client-slider-down .slick-slide').removeAttr('aria-hidden')
      var t = jQuery('.client-slider-up'),
        e =
          (0 < t.length &&
            (t.children('.client-logo-slide').slice(0, 4).clone().appendTo(t),
            t.slick({
              arrows: !1,
              dots: !1,
              vertical: !0,
              slidesToShow: 2,
              slidesToScroll: 1,
              verticalSwiping: !0,
              infinite: !0,
              cssEase: 'linear',
              autoplay: !0,
              autoplaySpeed: 0,
              speed: 2e3,
              pauseOnHover: !1,
              pauseOnFocus: !1,
              focusOnSelect: !0,
              accessibility: !0,
              responsive: [
                {
                  breakpoint: 767,
                  settings: {
                    vertical: !1,
                    verticalSwiping: !1,
                    variableWidth: !0,
                  },
                },
              ],
            })),
          jQuery('.client-slider-down'))
      0 < e.length &&
        (e.children('.client-logo-slide').slice(0, 4).clone().appendTo(e),
        e.slick({
          arrows: !1,
          dots: !1,
          vertical: !0,
          slidesToShow: 2,
          slidesToScroll: 1,
          verticalSwiping: !0,
          infinite: !0,
          cssEase: 'linear',
          autoplay: !0,
          autoplaySpeed: 0,
          speed: 2e3,
          pauseOnHover: !1,
          pauseOnFocus: !1,
          focusOnSelect: !1,
          accessibility: !0,
          responsive: [
            {
              breakpoint: 767,
              settings: {
                vertical: !1,
                verticalSwiping: !1,
                variableWidth: !0,
              },
            },
          ],
        })),
        t.on(
          'beforeChange, afterChange, init, setPosition',
          function (t, e, i) {
            setTimeout(function () {
              jQuery('.client-slider-up .slick-slide').removeAttr('aria-hidden')
            }, 100)
          },
        ),
        e.on(
          'beforeChange, afterChange, init, setPosition',
          function (t, e, i) {
            setTimeout(function () {
              jQuery('.client-slider-down .slick-slide').removeAttr(
                'aria-hidden',
              )
            }, 100)
          },
        )
    }),
    jQuery(function () {
      jQuery('.industry-slider').each(function () {
        var t = jQuery(this),
          e = t.children('.industry-slide').length
        const n = t.closest('.who-for-page').find('.industry-count')
        jQuery(window).width() < 1023
          ? t.hasClass('slick-initialized') ||
            (t.on('init reInit afterChange', function (t, e, i) {
              i = (i || 0) + 1
              n.text(i + '/' + e.slideCount)
            }),
            t.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: !0,
              prevArrow:
                '<div class="slick-arrow slick-prev flex flex-center"><span class="slick-arrows slick-prev-arrow"></span></div>',
              nextArrow:
                '<div class="slick-arrow slick-next flex flex-center"><span class="slick-arrows slick-next-arrow"></span></div>',
              dots: !1,
              speed: 1500,
              infinite: !1,
              autoplay: !1,
              variableWidth: !0,
            }))
          : 5 <= e &&
            !t.hasClass('slick-initialized') &&
            (t.on('init reInit afterChange', function (t, e, i) {
              i = (i || 0) + 1
              n.text(i + '/' + e.slideCount)
            }),
            t.slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: !0,
              prevArrow:
                '<div class="slick-arrow slick-prev flex flex-center"><span class="slick-arrows slick-prev-arrow"></span></div>',
              nextArrow:
                '<div class="slick-arrow slick-next flex flex-center"><span class="slick-arrows slick-next-arrow"></span></div>',
              dots: !1,
              speed: 1500,
              infinite: !1,
              autoplay: !1,
              variableWidth: !0,
            }))
      })
    }),
    jQuery('.asset-scroll-slider'))
let removeInvalidAriaAttributes = function () {
  document.querySelectorAll('.splide__slide').forEach(function (t) {
    t.removeAttribute('aria-roledescription'),
      t.removeAttribute('role'),
      t.setAttribute('role', 'listitem')
  })
  var t = document.querySelector('.splide__list')
  t && t.setAttribute('role', 'list')
}
function desktopMenu() {
  window.matchMedia('(min-width: 936px)').matches &&
    (jQuery('.humburger-btn').removeClass('open'),
    jQuery('.header_right').removeAttr('style'),
    jQuery('.h_mobile_overlay').removeClass('open'))
}
jQuery(document).ready(function () {
  1300 <= jQuery(window).width()
    ? 0 < Splider.length &&
      (Splider.find('.splide__slide').length < 4
        ? new Splide(Splider[0], { destroy: !0 }).mount(
            window.splide.Extensions,
          )
        : (new Splide(Splider[0], {
            type: 'loop',
            drag: 'free',
            focus: 'left',
            perPage: 1,
            fixedWidth: '256px',
            autoScroll: { speed: 1 },
            arrows: !1,
            pagination: !1,
          }).mount(window.splide.Extensions),
          new MutationObserver(removeInvalidAriaAttributes).observe(
            Splider[0],
            { childList: !0, subtree: !0 },
          ),
          removeInvalidAriaAttributes()))
    : 0 < Splider.length &&
      (new Splide(Splider[0], {
        type: 'loop',
        drag: 'free',
        focus: 'left',
        perPage: 6,
        fixedWidth: '256px',
        autoScroll: { speed: 1 },
        arrows: !1,
        pagination: !1,
      }).mount(window.splide.Extensions),
      new MutationObserver(removeInvalidAriaAttributes).observe(Splider[0], {
        childList: !0,
        subtree: !0,
      }),
      removeInvalidAriaAttributes())
}),
  jQuery(document).ready(function (e) {
    var t = e('.get-resource-main'),
      i = e('.cta-resource-close')
    t.on('click', function (t) {
      t.preventDefault(),
        e('html').toggleClass('cta-scroll-hide'),
        e('.cta-resource-bg').toggleClass('open')
    }),
      i.on('click', function (t) {
        t.preventDefault(),
          e('html').removeClass('cta-scroll-hide'),
          e('.cta-resource-bg').removeClass('open')
      })
  }),
  jQuery(document).ready(function (t) {
    var e, i
    t('.popup-youtube').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-video',
      removalDelay: 160,
      preloader: !1,
      fixedContentPos: !0,
      iframe: {
        patterns: {
          youtube: {
            index: 'youtube.com/',
            id: 'v=',
            src:
              ((e =
                /Chrome/.test(navigator.userAgent) &&
                /Google Inc/.test(navigator.vendor)),
              (i = 'https://www.youtube.com/embed/%id%?autoplay=1&rel=0'),
              e ? i + '&mute=1' : i),
          },
        },
      },
    }),
      t('.popup-video').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-video',
        removalDelay: 160,
        preloader: !1,
        fixedContentPos: !0,
      }),
      t('.popup-modal').magnificPopup({
        type: 'inline',
        fixedContentPos: !0,
        fixedBgPos: !0,
        overflowY: 'auto',
        preloader: !1,
        removalDelay: 160,
        mainClass: 'my-mfp-slide-top',
      })
  }),
  jQuery(document).ready(function () {
    window.matchMedia('(max-width: 935px)').matches &&
      (jQuery('.humburger-btn').on('click', function (t) {
        t.preventDefault(),
          jQuery(this).toggleClass('open'),
          jQuery('.h_mobile_overlay').toggleClass('open'),
          jQuery('.header_right').fadeToggle(600)
      }),
      jQuery('ul.main_menu > li.menu-item-has-children > a').on(
        'click',
        function (t) {
          t.preventDefault(),
            jQuery(this)
              .parent('li')
              .closest('ul.main_menu')
              .siblings('.header_btns')
              .toggleClass('off'),
            jQuery(this)
              .parent('li')
              .siblings()
              .toggleClass('sib')
              .slideToggle(),
            jQuery(this)
              .parent('li')
              .siblings()
              .children('a')
              .removeClass('active'),
            jQuery(this).toggleClass('active'),
            jQuery(this).parent().siblings('li').find('ul').slideUp(600),
            jQuery(this).siblings('ul').fadeToggle(600),
            jQuery(
              'ul.main_menu > li.nav-product > ul > li > ul > li:first-child > ul',
            ).fadeIn(600),
            jQuery('ul.main_menu > li.nav-product > ul > li > ul > li > ul')
              .not(':first')
              .fadeOut(100),
            jQuery(
              'ul.main_menu > li.nav-solutions > ul > li:first-child > ul',
            ).fadeIn(600),
            jQuery('ul.main_menu > li.nav-solutions > ul > li > ul')
              .not(':first')
              .fadeOut(100)
        },
      ),
      jQuery('ul.main_menu > li > ul > li.menu-item-has-children > a').on(
        'click',
        function (t) {
          t.preventDefault(),
            jQuery(this)
              .parent('li')
              .siblings()
              .children('a')
              .removeClass('active'),
            jQuery(this).toggleClass('active'),
            jQuery('ul.main_menu > li > ul > li.menu-item-has-children > ul')
              .not(jQuery(this).siblings('ul'))
              .slideUp(600),
            jQuery(this).siblings('ul').slideToggle(600)
        },
      ),
      jQuery(
        'ul.main_menu > li > ul > li > ul > li.menu-item-has-children > a',
      ).on('click', function (t) {
        t.preventDefault(),
          jQuery(this)
            .parent('li')
            .siblings()
            .children('a')
            .removeClass('active'),
          jQuery(this).toggleClass('active'),
          jQuery(
            'ul.main_menu > li > ul > li > ul > li.menu-item-has-children > ul',
          )
            .not(jQuery(this).siblings('ul'))
            .slideUp(600),
          jQuery(this).siblings('ul').slideToggle(600)
      }))
  }),
  jQuery(document).on('ready', function () {}),
  jQuery(window).on('resize', function () {})
const observer = new MutationObserver(function (t) {
  for (var e of t) 'childList' === e.type && desktopMenu()
})
function stickyResize() {
  var t
  window.matchMedia('(min-width: 1024px)').matches
    ? jQuery('.aside-sticky').stickySidebar({
        topSpacing: 96,
        bottomSpacing: 0,
        resizeSensor: !0,
        containerSelector: !1,
        innerWrapperSelector: '.sticky-sidebar-inner',
      })
    : (t = jQuery('.aside-sticky').data('stickySidebar')) && t.destroy()
}
observer.observe(document.body, { childList: !0, subtree: !0 }),
  jQuery(document).ready(function (e) {
    e('.accordion-header').on('click', function (t) {
      t.preventDefault(),
        e(this).parent().toggleClass('active'),
        e(this).parent().siblings().removeClass('active'),
        e(this)
          .parent()
          .siblings()
          .find('.accordion-header')
          .removeClass('open'),
        e(this).toggleClass('open'),
        e(this).siblings('.accordion-content').slideToggle(500),
        e(this).parent().siblings().find('.accordion-content').slideUp(500)
    }),
      e('.faqs-category-btn').on('click', function (t) {
        t.preventDefault(),
          e(this).toggleClass('active'),
          e('ul.faqs-links').slideToggle(900)
      })
    const i = e('.faqs-category-btn span')
    window.matchMedia('(max-width: 767px)').matches &&
      e('ul.faqs-links li a').on('click', function (t) {
        t.preventDefault()
        t = e(this).text()
        i.html(t),
          e('.faqs-category-btn').removeClass('active'),
          e('ul.faqs-links').slideUp(900)
      })
  }),
  document.addEventListener('DOMContentLoaded', function () {
    const i = document.querySelector('.pricing-toggle-form'),
      n = document.querySelector('.pricing-switch input')
    document.querySelectorAll('.pricing-data').forEach(function (t) {
      let e = t.getAttribute('data-value')
      n.addEventListener('click', function () {
        n.checked
          ? (i.classList.remove('pricing-active'),
            'yearly' === e
              ? (t.style.display = 'block')
              : (t.style.display = 'none'))
          : (i.classList.add('pricing-active'),
            'monthly' === e
              ? (t.style.display = 'block')
              : (t.style.display = 'none'))
      })
    })
    const o = document.querySelector('.marketing-plan-switch input')
    document.querySelectorAll('.marketing-plan-data').forEach(function (t) {
      let e = t.getAttribute('data-value')
      o.addEventListener('click', function () {
        o.checked
          ? 'yearly' === e
            ? (t.style.display = 'block')
            : (t.style.display = 'none')
          : 'monthly' === e
            ? (t.style.display = 'block')
            : (t.style.display = 'none')
      })
    })
  }),
  jQuery(document).ready(function () {
    jQuery('.prod-overview-section').each(function (t) {
      const e = jQuery(this)
      jQuery('.prod-overview-bg:first-child').addClass('active'),
        jQuery('.prod-overview-bg:first-child .prod-art-head').addClass('open'),
        jQuery('.prod-overview-bg:first-child .prod-art-content').slideDown(
          500,
        ),
        jQuery('.prod-image-list:first-child').addClass('active-slide'),
        e.find('.prod-art-head').on('click', function (t) {
          t.preventDefault(),
            jQuery(this).parent().toggleClass('active'),
            jQuery(this).parent().siblings().removeClass('active'),
            jQuery(this)
              .parent()
              .siblings()
              .find('.prod-art-head')
              .removeClass('open'),
            jQuery(this).toggleClass('open'),
            jQuery(this).siblings('.prod-art-content').slideToggle(500),
            jQuery(this)
              .parent()
              .siblings()
              .find('.prod-art-content')
              .slideUp(500)
          t = jQuery(this).data('name')
          e.find('.prod-image-list').removeClass('active-slide'),
            e
              .find('.prod-image-list[data-image="' + t + '"]')
              .addClass('active-slide')
        })
    }),
      jQuery('.prod-overview-section').each(function (t) {
        var e = jQuery(this),
          i = e.find('.prod-image-slider'),
          n = e.find('.prod-content-slider')
        i.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: !1,
          arrows: !1,
          asNavFor: n,
        }),
          n.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: i,
            dots: !1,
            arrows: !1,
            focusOnSelect: !0,
            fade: !0,
            cssEase: 'linear',
          }),
          e
            .find('ul.prod-tab-links li a[data-slide]')
            .on('click', function (t) {
              t.preventDefault(),
                jQuery(this)
                  .parent('li')
                  .siblings()
                  .removeClass('prod-tab-active'),
                jQuery(this).parent('li').addClass('prod-tab-active')
              t = jQuery(this).data('slide')
              n.slick('slickGoTo', t - 1)
            })
      })
  }),
  jQuery(document).ready(function () {
    jQuery('.res-dropdown').on('click', function (t) {
      t.preventDefault(),
        jQuery(this)
          .parent()
          .siblings('.res-dropdown-pos')
          .find('.res-tags-list')
          .addClass('open'),
        jQuery(this).siblings('.res-tags-list').toggleClass('open')
    }),
      window.matchMedia('(min-width: 768px)').matches &&
        jQuery('button.res-srch-icon').on('click', function (t) {
          t.preventDefault(),
            jQuery('.res-dropdown-main').toggleClass('fade'),
            jQuery('.res-srch-form').toggleClass('open')
        })
  }),
  document.addEventListener('DOMContentLoaded', function () {
    var t,
      e = document.querySelectorAll('ul.linear-links li a')
    let i = document.querySelector('.site-header').offsetHeight
    setTimeout(function () {
      var t = window.location.hash.substring(1)
      t &&
        (t = document.getElementById(t)) &&
        ((t = t.offsetTop - i), window.scrollTo({ top: t, behavior: 'smooth' }))
    }, 100)
    for (t of e)
      t.addEventListener('click', function (t) {
        t.preventDefault()
        var t = this.getAttribute('href').substring(1),
          t = document.getElementById('' + t)
        t &&
          ((t = t.offsetTop - i),
          window.scrollTo({ top: t, behavior: 'smooth' }))
      })
  }),
  jQuery(document).ready(function () {
    stickyResize()
  }),
  jQuery(window).on('load', function () {
    stickyResize()
  }),
  jQuery(window).on('resize', function () {
    stickyResize()
  })
var $ = jQuery.noConflict()
$(document).ready(function () {
  $('ul.who-for-tabs li:first a').addClass('active')
  const e = $('ul.who-for-tabs li a')
  if (
    (e.on('click', function (t) {
      t.preventDefault(),
        e.not(this).removeClass('active'),
        $(this).addClass('active')
      t = $(this).attr('data-name')
      $('.who-for-page').hide(),
        $('.who-for-page[data-value = ' + t + ' ]').fadeIn()
    }),
    $(window).width() < 768)
  ) {
    const i = $('.for-tabs-btn > span')
    $('.for-tabs-btn').on('click', function (t) {
      t.preventDefault(),
        $(this).toggleClass('open'),
        $('ul.who-for-tabs').slideToggle()
    }),
      e.on('click', function (t) {
        t.preventDefault()
        t = $(this).text()
        i.html(t),
          $('.for-tabs-btn').removeClass('open'),
          $(this).parent('li').closest('ul.who-for-tabs').slideUp()
      })
  }
})
