(function() {
    function t(e, t) {
        return (new Date(t, e + 1, 0)).getDate()
    }

    function n(e, t, n) {
        return function(r, i, s) {
            var o = e(r),
                u = [];
            o < r && t(o);
            if (s > 1)
                while (o < i) {
                    var a = new Date(+o);
                    n(a) % s === 0 && u.push(a), t(o)
                } else
                    while (o < i) u.push(new Date(+o)), t(o);
            return u
        }
    }
    var e = window.nv || {};
    e.version = "1.1.15b", e.dev = !0, window.nv = e, e.tooltip = e.tooltip || {}, e.utils = e.utils || {}, e.models = e.models || {}, e.charts = {}, e.graphs = [], e.logs = {}, e.dispatch = d3.dispatch("render_start", "render_end"), e.dev && (e.dispatch.on("render_start", function(t) {
        e.logs.startTime = +(new Date)
    }), e.dispatch.on("render_end", function(t) {
        e.logs.endTime = +(new Date), e.logs.totalTime = e.logs.endTime - e.logs.startTime, e.log("total", e.logs.totalTime)
    })), e.log = function() {
        if (e.dev && console.log && console.log.apply) console.log.apply(console, arguments);
        else if (e.dev && typeof console.log == "function" && Function.prototype.bind) {
            var t = Function.prototype.bind.call(console.log, console);
            t.apply(console, arguments)
        }
        return arguments[arguments.length - 1]
    }, e.render = function(n) {
        n = n || 1, e.render.active = !0, e.dispatch.render_start(), setTimeout(function() {
            var t, r;
            for (var i = 0; i < n && (r = e.render.queue[i]); i++) t = r.generate(), typeof r.callback == typeof Function && r.callback(t), e.graphs.push(t);
            e.render.queue.splice(0, i), e.render.queue.length ? setTimeout(arguments.callee, 0) : (e.dispatch.render_end(), e.render.active = !1)
        }, 0)
    }, e.render.active = !1, e.render.queue = [], e.addGraph = function(t) {
        typeof arguments[0] == typeof Function && (t = {
            generate: arguments[0],
            callback: arguments[1]
        }), e.render.queue.push(t), e.render.active || e.render()
    }, e.identity = function(e) {
        return e
    }, e.strip = function(e) {
        return e.replace(/(\s|&)/g, "")
    }, d3.time.monthEnd = function(e) {
        return new Date(e.getFullYear(), e.getMonth(), 0)
    }, d3.time.monthEnds = n(d3.time.monthEnd, function(e) {
        e.setUTCDate(e.getUTCDate() + 1), e.setDate(t(e.getMonth() + 1, e.getFullYear()))
    }, function(e) {
        return e.getMonth()
    }), e.interactiveGuideline = function() {
        "use strict";

        function c(o) {
            o.each(function(o) {
                function g() {
                    var e = d3.mouse(this),
                        n = e[0],
                        r = e[1],
                        o = !0,
                        a = !1;
                    l && (n = d3.event.offsetX, r = d3.event.offsetY, d3.event.target.tagName !== "svg" && (o = !1), d3.event.target.className.baseVal.match("nv-legend") && (a = !0)), o && (n -= i.left, r -= i.top);
                    if (n < 0 || r < 0 || n > p || r > d || d3.event.relatedTarget && d3.event.relatedTarget.ownerSVGElement === undefined || a) {
                        if (l && d3.event.relatedTarget && d3.event.relatedTarget.ownerSVGElement === undefined && d3.event.relatedTarget.className.match(t.nvPointerEventsClass)) return;
                        u.elementMouseout({
                            mouseX: n,
                            mouseY: r
                        }), c.renderGuideLine(null);
                        return
                    }
                    var f = s.invert(n);
                    u.elementMousemove({
                        mouseX: n,
                        mouseY: r,
                        pointXValue: f
                    }), d3.event.type === "dblclick" && u.elementDblclick({
                        mouseX: n,
                        mouseY: r,
                        pointXValue: f
                    })
                }
                var h = d3.select(this),
                    p = n || 960,
                    d = r || 400,
                    v = h.selectAll("g.nv-wrap.nv-interactiveLineLayer").data([o]),
                    m = v.enter().append("g").attr("class", " nv-wrap nv-interactiveLineLayer");
                m.append("g").attr("class", "nv-interactiveGuideLine");
                if (!f) return;
                f.on("mousemove", g, !0).on("mouseout", g, !0).on("dblclick", g), c.renderGuideLine = function(t) {
                    if (!a) return;
                    var n = v.select(".nv-interactiveGuideLine").selectAll("line").data(t != null ? [e.utils.NaNtoZero(t)] : [], String);
                    n.enter().append("line").attr("class", "nv-guideline").attr("x1", function(e) {
                        return e
                    }).attr("x2", function(e) {
                        return e
                    }).attr("y1", d).attr("y2", 0), n.exit().remove()
                }
            })
        }
        var t = e.models.tooltip(),
            n = null,
            r = null,
            i = {
                left: 0,
                top: 0
            },
            s = d3.scale.linear(),
            o = d3.scale.linear(),
            u = d3.dispatch("elementMousemove", "elementMouseout", "elementDblclick"),
            a = !0,
            f = null,
            l = navigator.userAgent.indexOf("MSIE") !== -1;
        return c.dispatch = u, c.tooltip = t, c.margin = function(e) {
            return arguments.length ? (i.top = typeof e.top != "undefined" ? e.top : i.top, i.left = typeof e.left != "undefined" ? e.left : i.left, c) : i
        }, c.width = function(e) {
            return arguments.length ? (n = e, c) : n
        }, c.height = function(e) {
            return arguments.length ? (r = e, c) : r
        }, c.xScale = function(e) {
            return arguments.length ? (s = e, c) : s
        }, c.showGuideLine = function(e) {
            return arguments.length ? (a = e, c) : a
        }, c.svgContainer = function(e) {
            return arguments.length ? (f = e, c) : f
        }, c
    }, e.interactiveBisect = function(e, t, n) {
        "use strict";
        if (!e instanceof Array) return null;
        typeof n != "function" && (n = function(e, t) {
            return e.x
        });
        var r = d3.bisector(n).left,
            i = d3.max([0, r(e, t) - 1]),
            s = n(e[i], i);
        typeof s == "undefined" && (s = i);
        if (s === t) return i;
        var o = d3.min([i + 1, e.length - 1]),
            u = n(e[o], o);
        return typeof u == "undefined" && (u = o), Math.abs(u - t) >= Math.abs(s - t) ? i : o
    }, e.nearestValueIndex = function(e, t, n) {
        "use strict";
        var r = Infinity,
            i = null;
        return e.forEach(function(e, s) {
            var o = Math.abs(t - e);
            o <= r && o < n && (r = o, i = s)
        }), i
    },
    function() {
        "use strict";
        window.nv.tooltip = {}, window.nv.models.tooltip = function() {
            function y() {
                if (a) {
                    var e = d3.select(a);
                    e.node().tagName !== "svg" && (e = e.select("svg"));
                    var t = e.node() ? e.attr("viewBox") : null;
                    if (t) {
                        t = t.split(" ");
                        var n = parseInt(e.style("width")) / t[2];
                        l.left = l.left * n, l.top = l.top * n
                    }
                }
            }

            function b(e) {
                var t;
                a ? t = d3.select(a) : t = d3.select("body");
                var n = t.select(".nvtooltip");
                return n.node() === null && (n = t.append("div").attr("class", "nvtooltip " + (u ? u : "xy-tooltip")).attr("id", h)), n.node().innerHTML = e, n.style("top", 0).style("left", 0).style("opacity", 0), n.selectAll("div, table, td, tr").classed(p, !0), n.classed(p, !0), n.node()
            }

            function w() {
                if (!c) return;
                if (!g(n)) return;
                y();
                var t = l.left,
                    u = o != null ? o : l.top,
                    h = b(m(n));
                f = h;
                if (a) {
                    var p = a.getElementsByTagName("svg")[0],
                        d = p ? p.getBoundingClientRect() : a.getBoundingClientRect(),
                        v = {
                            left: 0,
                            top: 0
                        };
                    if (p) {
                        var E = p.getBoundingClientRect(),
                            S = a.getBoundingClientRect(),
                            x = E.top;
                        if (x < 0) {
                            var T = a.getBoundingClientRect();
                            x = Math.abs(x) > T.height ? 0 : x
                        }
                        v.top = Math.abs(x - S.top), v.left = Math.abs(E.left - S.left)
                    }
                    t += a.offsetLeft + v.left - 2 * a.scrollLeft, u += a.offsetTop + v.top - 2 * a.scrollTop
                }
                return s && s > 0 && (u = Math.floor(u / s) * s), e.tooltip.calcTooltipPosition([t, u], r, i, h), w
            }
            var t = null,
                n = null,
                r = "w",
                i = 50,
                s = 25,
                o = null,
                u = null,
                a = null,
                f = null,
                l = {
                    left: null,
                    top: null
                },
                c = !0,
                h = "nvtooltip-" + Math.floor(Math.random() * 1e5),
                p = "nv-pointer-events-none",
                d = function(e, t) {
                    return e
                },
                v = function(e) {
                    return e
                },
                m = function(e) {
                    if (t != null) return t;
                    if (e == null) return "";
                    var n = d3.select(document.createElement("table")),
                        r = n.selectAll("thead").data([e]).enter().append("thead");
                    r.append("tr").append("td").attr("colspan", 3).append("strong").classed("x-value", !0).html(v(e.value));
                    var i = n.selectAll("tbody").data([e]).enter().append("tbody"),
                        s = i.selectAll("tr").data(function(e) {
                            return e.series
                        }).enter().append("tr").classed("highlight", function(e) {
                            return e.highlight
                        });
                    s.append("td").classed("legend-color-guide", !0).append("div").style("background-color", function(e) {
                        return e.color
                    }), s.append("td").classed("key", !0).html(function(e) {
                        return e.key
                    }), s.append("td").classed("value", !0).html(function(e, t) {
                        return d(e.value, t)
                    }), s.selectAll("td").each(function(e) {
                        if (e.highlight) {
                            var t = d3.scale.linear().domain([0, 1]).range(["#fff", e.color]),
                                n = .6;
                            d3.select(this).style("border-bottom-color", t(n)).style("border-top-color", t(n))
                        }
                    });
                    var o = n.node().outerHTML;
                    return e.footer !== undefined && (o += "<div class='footer'>" + e.footer + "</div>"), o
                },
                g = function(e) {
                    return e && e.series && e.series.length > 0 ? !0 : !1
                };
            return w.nvPointerEventsClass = p, w.content = function(e) {
                return arguments.length ? (t = e, w) : t
            }, w.tooltipElem = function() {
                return f
            }, w.contentGenerator = function(e) {
                return arguments.length ? (typeof e == "function" && (m = e), w) : m
            }, w.data = function(e) {
                return arguments.length ? (n = e, w) : n
            }, w.gravity = function(e) {
                return arguments.length ? (r = e, w) : r
            }, w.distance = function(e) {
                return arguments.length ? (i = e, w) : i
            }, w.snapDistance = function(e) {
                return arguments.length ? (s = e, w) : s
            }, w.classes = function(e) {
                return arguments.length ? (u = e, w) : u
            }, w.chartContainer = function(e) {
                return arguments.length ? (a = e, w) : a
            }, w.position = function(e) {
                return arguments.length ? (l.left = typeof e.left != "undefined" ? e.left : l.left, l.top = typeof e.top != "undefined" ? e.top : l.top, w) : l
            }, w.fixedTop = function(e) {
                return arguments.length ? (o = e, w) : o
            }, w.enabled = function(e) {
                return arguments.length ? (c = e, w) : c
            }, w.valueFormatter = function(e) {
                return arguments.length ? (typeof e == "function" && (d = e), w) : d
            }, w.headerFormatter = function(e) {
                return arguments.length ? (typeof e == "function" && (v = e), w) : v
            }, w.id = function() {
                return h
            }, w
        }, e.tooltip.show = function(t, n, r, i, s, o) {
            var u = document.createElement("div");
            u.className = "nvtooltip " + (o ? o : "xy-tooltip");
            var a = s;
            if (!s || s.tagName.match(/g|svg/i)) a = document.getElementsByTagName("body")[0];
            u.style.left = 0, u.style.top = 0, u.style.opacity = 0, u.innerHTML = n, a.appendChild(u), s && (t[0] = t[0] - s.scrollLeft, t[1] = t[1] - s.scrollTop), e.tooltip.calcTooltipPosition(t, r, i, u)
        }, e.tooltip.findFirstNonSVGParent = function(e) {
            while (e.tagName.match(/^g|svg$/i) !== null) e = e.parentNode;
            return e
        }, e.tooltip.findTotalOffsetTop = function(e, t) {
            var n = t;
            do isNaN(e.offsetTop) || (n += e.offsetTop); while (e = e.offsetParent);
            return n
        }, e.tooltip.findTotalOffsetLeft = function(e, t) {
            var n = t;
            do isNaN(e.offsetLeft) || (n += e.offsetLeft); while (e = e.offsetParent);
            return n
        }, e.tooltip.calcTooltipPosition = function(t, n, r, i) {
            var s = parseInt(i.offsetHeight),
                o = parseInt(i.offsetWidth),
                u = e.utils.windowSize().width,
                a = e.utils.windowSize().height,
                f = window.pageYOffset,
                l = window.pageXOffset,
                c, h;
            a = window.innerWidth >= document.body.scrollWidth ? a : a - 16, u = window.innerHeight >= document.body.scrollHeight ? u : u - 16, n = n || "s", r = r || 20;
            var p = function(t) {
                    return e.tooltip.findTotalOffsetTop(t, h)
                },
                d = function(t) {
                    return e.tooltip.findTotalOffsetLeft(t, c)
                };
            switch (n) {
                case "e":
                    c = t[0] - o - r, h = t[1] - s / 2;
                    var v = d(i),
                        m = p(i);
                    v < l && (c = t[0] + r > l ? t[0] + r : l - v + c), m < f && (h = f - m + h), m + s > f + a && (h = f + a - m + h - s);
                    break;
                case "w":
                    c = t[0] + r, h = t[1] - s / 2;
                    var v = d(i),
                        m = p(i);
                    v + o > u && (c = t[0] - o - r), m < f && (h = f + 5), m + s > f + a && (h = f + a - m + h - s);
                    break;
                case "n":
                    c = t[0] - o / 2 - 5, h = t[1] + r;
                    var v = d(i),
                        m = p(i);
                    v < l && (c = l + 5), v + o > u && (c = c - o / 2 + 5), m + s > f + a && (h = f + a - m + h - s);
                    break;
                case "s":
                    c = t[0] - o / 2, h = t[1] - s - r;
                    var v = d(i),
                        m = p(i);
                    v < l && (c = l + 5), v + o > u && (c = c - o / 2 + 5), f > m && (h = f);
                    break;
                case "none":
                    c = t[0], h = t[1] - r;
                    var v = d(i),
                        m = p(i)
            }
            return i.style.left = c + "px", i.style.top = h + "px", i.style.opacity = 1, i.style.position = "absolute", i
        }, e.tooltip.cleanup = function() {
            var e = document.getElementsByClassName("nvtooltip"),
                t = [];
            while (e.length) t.push(e[0]), e[0].style.transitionDelay = "0 !important", e[0].style.opacity = 0, e[0].className = "nvtooltip-pending-removal";
            setTimeout(function() {
                while (t.length) {
                    var e = t.pop();
                    e.parentNode.removeChild(e)
                }
            }, 500)
        }
    }(), e.utils.windowSize = function() {
        var e = {
            width: 640,
            height: 480
        };
        return document.body && document.body.offsetWidth && (e.width = document.body.offsetWidth, e.height = document.body.offsetHeight), document.compatMode == "CSS1Compat" && document.documentElement && document.documentElement.offsetWidth && (e.width = document.documentElement.offsetWidth, e.height = document.documentElement.offsetHeight), window.innerWidth && window.innerHeight && (e.width = window.innerWidth, e.height = window.innerHeight), e
    }, e.utils.windowResize = function(e) {
        if (e === undefined) return;
        var t = window.onresize;
        window.onresize = function(n) {
            typeof t == "function" && t(n), e(n)
        }
    }, e.utils.getColor = function(t) {
        return arguments.length ? Object.prototype.toString.call(t) === "[object Array]" ? function(e, n) {
            return e.color || t[n % t.length]
        } : t : e.utils.defaultColor()
    }, e.utils.defaultColor = function() {
        var e = d3.scale.category20().range();
        return function(t, n) {
            return t.color || e[n % e.length]
        }
    }, e.utils.customTheme = function(e, t, n) {
        t = t || function(e) {
            return e.key
        }, n = n || d3.scale.category20().range();
        var r = n.length;
        return function(i, s) {
            var o = t(i);
            return r || (r = n.length), typeof e[o] != "undefined" ? typeof e[o] == "function" ? e[o]() : e[o] : n[--r]
        }
    }, e.utils.pjax = function(t, n) {
        function r(r) {
            d3.html(r, function(r) {
                var i = d3.select(n).node();
                i.parentNode.replaceChild(d3.select(r).select(n).node(), i), e.utils.pjax(t, n)
            })
        }
        d3.selectAll(t).on("click", function() {
            history.pushState(this.href, this.textContent, this.href), r(this.href), d3.event.preventDefault()
        }), d3.select(window).on("popstate", function() {
            d3.event.state && r(d3.event.state)
        })
    }, e.utils.calcApproxTextWidth = function(e) {
        if (typeof e.style == "function" && typeof e.text == "function") {
            var t = parseInt(e.style("font-size").replace("px", "")),
                n = e.text().length;
            return n * t * .5
        }
        return 0
    }, e.utils.NaNtoZero = function(e) {
        return typeof e != "number" || isNaN(e) || e === null || e === Infinity ? 0 : e
    }, e.utils.optionsFunc = function(e) {
        return e && d3.map(e).forEach(function(e, t) {
            typeof this[e] == "function" && this[e](t)
        }.bind(this)), this
    }, e.models.axis = function() {
        "use strict";

        function m(e) {
            return e.each(function(e) {
                var i = d3.select(this),
                    m = i.selectAll("g.nv-wrap.nv-axis").data([e]),
                    g = m.enter().append("g").attr("class", "nvd3 nv-wrap nv-axis"),
                    y = g.append("g"),
                    b = m.select("g");
                p !== null ? t.ticks(p) : (t.orient() == "top" || t.orient() == "bottom") && t.ticks(Math.abs(s.range()[1] - s.range()[0]) / 100), b.transition().call(t), v = v || t.scale();
                var w = t.tickFormat();
                w == null && (w = v.tickFormat());
                var E = b.selectAll("text.nv-axislabel").data([o || null]);
                E.exit().remove();
                switch (t.orient()) {
                    case "top":
                        E.enter().append("text").attr("class", "nv-axislabel");
                        var S = s.range().length == 2 ? s.range()[1] : s.range()[s.range().length - 1] + (s.range()[1] - s.range()[0]);
                        E.attr("text-anchor", "middle").attr("y", 0).attr("x", S / 2);
                        if (u) {
                            var x = m.selectAll("g.nv-axisMaxMin").data(s.domain());
                            x.enter().append("g").attr("class", "nv-axisMaxMin").append("text"), x.exit().remove(), x.attr("transform", function(e, t) {
                                return "translate(" + s(e) + ",0)"
                            }).select("text").attr("dy", "-0.5em").attr("y", -t.tickPadding()).attr("text-anchor", "middle").text(function(e, t) {
                                var n = w(e);
                                return ("" + n).match("NaN") ? "" : n
                            }), x.transition().attr("transform", function(e, t) {
                                return "translate(" + s.range()[t] + ",0)"
                            })
                        }
                        break;
                    case "bottom":
                        var T = 36,
                            N = 30,
                            C = b.selectAll("g").select("text");
                        if (f % 360) {
                            C.each(function(e, t) {
                                var n = this.getBBox().width;
                                n > N && (N = n)
                            });
                            var k = Math.abs(Math.sin(f * Math.PI / 180)),
                                T = (k ? k * N : N) + 30;
                            C.attr("transform", function(e, t, n) {
                                return "rotate(" + f + " 0,0)"
                            }).style("text-anchor", f % 360 > 0 ? "start" : "end")
                        }
                        E.enter().append("text").attr("class", "nv-axislabel");
                        var S = s.range().length == 2 ? s.range()[1] : s.range()[s.range().length - 1] + (s.range()[1] - s.range()[0]);
                        E.attr("text-anchor", "middle").attr("y", T).attr("x", S / 2);
                        if (u) {
                            var x = m.selectAll("g.nv-axisMaxMin").data([s.domain()[0], s.domain()[s.domain().length - 1]]);
                            x.enter().append("g").attr("class", "nv-axisMaxMin").append("text"), x.exit().remove(), x.attr("transform", function(e, t) {
                                return "translate(" + (s(e) + (h ? s.rangeBand() / 2 : 0)) + ",0)"
                            }).select("text").attr("dy", ".71em").attr("y", t.tickPadding()).attr("transform", function(e, t, n) {
                                return "rotate(" + f + " 0,0)"
                            }).style("text-anchor", f ? f % 360 > 0 ? "start" : "end" : "middle").text(function(e, t) {
                                var n = w(e);
                                return ("" + n).match("NaN") ? "" : n
                            }), x.transition().attr("transform", function(e, t) {
                                return "translate(" + (s(e) + (h ? s.rangeBand() / 2 : 0)) + ",0)"
                            })
                        }
                        c && C.attr("transform", function(e, t) {
                            return "translate(0," + (t % 2 == 0 ? "0" : "12") + ")"
                        });
                        break;
                    case "right":
                        E.enter().append("text").attr("class", "nv-axislabel"), E.style("text-anchor", l ? "middle" : "begin").attr("transform", l ? "rotate(90)" : "").attr("y", l ? -Math.max(n.right, r) + 12 : -10).attr("x", l ? s.range()[0] / 2 : t.tickPadding());
                        if (u) {
                            var x = m.selectAll("g.nv-axisMaxMin").data(s.domain());
                            x.enter().append("g").attr("class", "nv-axisMaxMin").append("text").style("opacity", 0), x.exit().remove(), x.attr("transform", function(e, t) {
                                return "translate(0," + s(e) + ")"
                            }).select("text").attr("dy", ".32em").attr("y", 0).attr("x", t.tickPadding()).style("text-anchor", "start").text(function(e, t) {
                                var n = w(e);
                                return ("" + n).match("NaN") ? "" : n
                            }), x.transition().attr("transform", function(e, t) {
                                return "translate(0," + s.range()[t] + ")"
                            }).select("text").style("opacity", 1)
                        }
                        break;
                    case "left":
                        E.enter().append("text").attr("class", "nv-axislabel"), E.style("text-anchor", l ? "middle" : "end").attr("transform", l ? "rotate(-90)" : "").attr("y", l ? -Math.max(n.left, r) + d : -10).attr("x", l ? -s.range()[0] / 2 : -t.tickPadding());
                        if (u) {
                            var x = m.selectAll("g.nv-axisMaxMin").data(s.domain());
                            x.enter().append("g").attr("class", "nv-axisMaxMin").append("text").style("opacity", 0), x.exit().remove(), x.attr("transform", function(e, t) {
                                return "translate(0," + v(e) + ")"
                            }).select("text").attr("dy", ".32em").attr("y", 0).attr("x", -t.tickPadding()).attr("text-anchor", "end").text(function(e, t) {
                                var n = w(e);
                                return ("" + n).match("NaN") ? "" : n
                            }), x.transition().attr("transform", function(e, t) {
                                return "translate(0," + s.range()[t] + ")"
                            }).select("text").style("opacity", 1)
                        }
                }
                E.text(function(e) {
                    return e
                }), u && (t.orient() === "left" || t.orient() === "right") && (b.selectAll("g").each(function(e, t) {
                    d3.select(this).select("text").attr("opacity", 1);
                    if (s(e) < s.range()[1] + 10 || s(e) > s.range()[0] - 10)(e > 1e-10 || e < -1e-10) && d3.select(this).attr("opacity", 0), d3.select(this).select("text").attr("opacity", 0)
                }), s.domain()[0] == s.domain()[1] && s.domain()[0] == 0 && m.selectAll("g.nv-axisMaxMin").style("opacity", function(e, t) {
                    return t ? 0 : 1
                }));
                if (u && (t.orient() === "top" || t.orient() === "bottom")) {
                    var L = [];
                    m.selectAll("g.nv-axisMaxMin").each(function(e, t) {
                        try {
                            t ? L.push(s(e) - this.getBBox().width - 4) : L.push(s(e) + this.getBBox().width + 4)
                        } catch (n) {
                            t ? L.push(s(e) - 4) : L.push(s(e) + 4)
                        }
                    }), b.selectAll("g").each(function(e, t) {
                        if (s(e) < L[0] || s(e) > L[1]) e > 1e-10 || e < -1e-10 ? d3.select(this).remove() : d3.select(this).select("text").remove()
                    })
                }
                a && b.selectAll(".tick").filter(function(e) {
                    return !parseFloat(Math.round(e.__data__ * 1e5) / 1e6) && e.__data__ !== undefined
                }).classed("zero", !0), v = s.copy()
            }), m
        }
        var t = d3.svg.axis(),
            n = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            r = 75,
            i = 60,
            s = d3.scale.linear(),
            o = null,
            u = !0,
            a = !0,
            f = 0,
            l = !0,
            c = !1,
            h = !1,
            p = null,
            d = 12;
        t.scale(s).orient("bottom").tickFormat(function(e) {
            return e
        });
        var v;
        return m.axis = t, d3.rebind(m, t, "orient", "tickValues", "tickSubdivide", "tickSize", "tickPadding", "tickFormat"), d3.rebind(m, s, "domain", "range", "rangeBand", "rangeBands"), m.options = e.utils.optionsFunc.bind(m), m.margin = function(e) {
            return arguments.length ? (n.top = typeof e.top != "undefined" ? e.top : n.top, n.right = typeof e.right != "undefined" ? e.right : n.right, n.bottom = typeof e.bottom != "undefined" ? e.bottom : n.bottom, n.left = typeof e.left != "undefined" ? e.left : n.left, m) : n
        }, m.width = function(e) {
            return arguments.length ? (r = e, m) : r
        }, m.ticks = function(e) {
            return arguments.length ? (p = e, m) : p
        }, m.height = function(e) {
            return arguments.length ? (i = e, m) : i
        }, m.axisLabel = function(e) {
            return arguments.length ? (o = e, m) : o
        }, m.showMaxMin = function(e) {
            return arguments.length ? (u = e, m) : u
        }, m.highlightZero = function(e) {
            return arguments.length ? (a = e, m) : a
        }, m.scale = function(e) {
            return arguments.length ? (s = e, t.scale(s), h = typeof s.rangeBands == "function", d3.rebind(m, s, "domain", "range", "rangeBand", "rangeBands"), m) : s
        }, m.rotateYLabel = function(e) {
            return arguments.length ? (l = e, m) : l
        }, m.rotateLabels = function(e) {
            return arguments.length ? (f = e, m) : f
        }, m.staggerLabels = function(e) {
            return arguments.length ? (c = e, m) : c
        }, m.axisLabelDistance = function(e) {
            return arguments.length ? (d = e, m) : d
        }, m
    }, e.models.bullet = function() {
        "use strict";

        function m(e) {
            return e.each(function(e, n) {
                var p = c - t.left - t.right,
                    m = h - t.top - t.bottom,
                    g = d3.select(this),
                    y = i.call(this, e, n).slice().sort(d3.descending),
                    b = s.call(this, e, n).slice().sort(d3.descending),
                    w = o.call(this, e, n).slice().sort(d3.descending),
                    E = u.call(this, e, n).slice(),
                    S = a.call(this, e, n).slice(),
                    x = f.call(this, e, n).slice(),
                    T = d3.scale.linear().domain(d3.extent(d3.merge([l, y]))).range(r ? [p, 0] : [0, p]),
                    N = this.__chart__ || d3.scale.linear().domain([0, Infinity]).range(T.range());
                this.__chart__ = T;
                var C = d3.min(y),
                    k = d3.max(y),
                    L = y[1],
                    A = g.selectAll("g.nv-wrap.nv-bullet").data([e]),
                    O = A.enter().append("g").attr("class", "nvd3 nv-wrap nv-bullet"),
                    M = O.append("g"),
                    _ = A.select("g");
                M.append("rect").attr("class", "nv-range nv-rangeMax"), M.append("rect").attr("class", "nv-range nv-rangeAvg"), M.append("rect").attr("class", "nv-range nv-rangeMin"), M.append("rect").attr("class", "nv-measure"), M.append("path").attr("class", "nv-markerTriangle"), A.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var D = function(e) {
                        return Math.abs(N(e) - N(0))
                    },
                    P = function(e) {
                        return Math.abs(T(e) - T(0))
                    },
                    H = function(e) {
                        return e < 0 ? N(e) : N(0)
                    },
                    B = function(e) {
                        return e < 0 ? T(e) : T(0)
                    };
                _.select("rect.nv-rangeMax").attr("height", m).attr("width", P(k > 0 ? k : C)).attr("x", B(k > 0 ? k : C)).datum(k > 0 ? k : C), _.select("rect.nv-rangeAvg").attr("height", m).attr("width", P(L)).attr("x", B(L)).datum(L), _.select("rect.nv-rangeMin").attr("height", m).attr("width", P(k)).attr("x", B(k)).attr("width", P(k > 0 ? C : k)).attr("x", B(k > 0 ? C : k)).datum(k > 0 ? C : k), _.select("rect.nv-measure").style("fill", d).attr("height", m / 3).attr("y", m / 3).attr("width", w < 0 ? T(0) - T(w[0]) : T(w[0]) - T(0)).attr("x", B(w)).on("mouseover", function() {
                    v.elementMouseover({
                        value: w[0],
                        label: x[0] || "Current",
                        pos: [T(w[0]), m / 2]
                    })
                }).on("mouseout", function() {
                    v.elementMouseout({
                        value: w[0],
                        label: x[0] || "Current"
                    })
                });
                var j = m / 6;
                b[0] ? _.selectAll("path.nv-markerTriangle").attr("transform", function(e) {
                    return "translate(" + T(b[0]) + "," + m / 2 + ")"
                }).attr("d", "M0," + j + "L" + j + "," + -j + " " + -j + "," + -j + "Z").on("mouseover", function() {
                    v.elementMouseover({
                        value: b[0],
                        label: S[0] || "Previous",
                        pos: [T(b[0]), m / 2]
                    })
                }).on("mouseout", function() {
                    v.elementMouseout({
                        value: b[0],
                        label: S[0] || "Previous"
                    })
                }) : _.selectAll("path.nv-markerTriangle").remove(), A.selectAll(".nv-range").on("mouseover", function(e, t) {
                    var n = E[t] || (t ? t == 1 ? "Mean" : "Minimum" : "Maximum");
                    v.elementMouseover({
                        value: e,
                        label: n,
                        pos: [T(e), m / 2]
                    })
                }).on("mouseout", function(e, t) {
                    var n = E[t] || (t ? t == 1 ? "Mean" : "Minimum" : "Maximum");
                    v.elementMouseout({
                        value: e,
                        label: n
                    })
                })
            }), m
        }
        var t = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            n = "left",
            r = !1,
            i = function(e) {
                return e.ranges
            },
            s = function(e) {
                return e.markers
            },
            o = function(e) {
                return e.measures
            },
            u = function(e) {
                return e.rangeLabels ? e.rangeLabels : []
            },
            a = function(e) {
                return e.markerLabels ? e.markerLabels : []
            },
            f = function(e) {
                return e.measureLabels ? e.measureLabels : []
            },
            l = [0],
            c = 380,
            h = 30,
            p = null,
            d = e.utils.getColor(["#1f77b4"]),
            v = d3.dispatch("elementMouseover", "elementMouseout");
        return m.dispatch = v, m.options = e.utils.optionsFunc.bind(m), m.orient = function(e) {
            return arguments.length ? (n = e, r = n == "right" || n == "bottom", m) : n
        }, m.ranges = function(e) {
            return arguments.length ? (i = e, m) : i
        }, m.markers = function(e) {
            return arguments.length ? (s = e, m) : s
        }, m.measures = function(e) {
            return arguments.length ? (o = e, m) : o
        }, m.forceX = function(e) {
            return arguments.length ? (l = e, m) : l
        }, m.width = function(e) {
            return arguments.length ? (c = e, m) : c
        }, m.height = function(e) {
            return arguments.length ? (h = e, m) : h
        }, m.margin = function(e) {
            return arguments.length ? (t.top = typeof e.top != "undefined" ? e.top : t.top, t.right = typeof e.right != "undefined" ? e.right : t.right, t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom, t.left = typeof e.left != "undefined" ? e.left : t.left, m) : t
        }, m.tickFormat = function(e) {
            return arguments.length ? (p = e, m) : p
        }, m.color = function(t) {
            return arguments.length ? (d = e.utils.getColor(t), m) : d
        }, m
    }, e.models.bulletChart = function() {
        "use strict";

        function m(e) {
            return e.each(function(n, h) {
                var g = d3.select(this),
                    y = (a || parseInt(g.style("width")) || 960) - i.left - i.right,
                    b = f - i.top - i.bottom,
                    w = this;
                m.update = function() {
                    m(e)
                }, m.container = this;
                if (!n || !s.call(this, n, h)) {
                    var E = g.selectAll(".nv-noData").data([p]);
                    return E.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"), E.attr("x", i.left + y / 2).attr("y", 18 + i.top + b / 2).text(function(e) {
                        return e
                    }), m
                }
                g.selectAll(".nv-noData").remove();
                var S = s.call(this, n, h).slice().sort(d3.descending),
                    x = o.call(this, n, h).slice().sort(d3.descending),
                    T = u.call(this, n, h).slice().sort(d3.descending),
                    N = g.selectAll("g.nv-wrap.nv-bulletChart").data([n]),
                    C = N.enter().append("g").attr("class", "nvd3 nv-wrap nv-bulletChart"),
                    k = C.append("g"),
                    L = N.select("g");
                k.append("g").attr("class", "nv-bulletWrap"), k.append("g").attr("class", "nv-titles"), N.attr("transform", "translate(" + i.left + "," + i.top + ")");
                var A = d3.scale.linear().domain([0, Math.max(S[0], x[0], T[0])]).range(r ? [y, 0] : [0, y]),
                    O = this.__chart__ || d3.scale.linear().domain([0, Infinity]).range(A.range());
                this.__chart__ = A;
                var M = function(e) {
                        return Math.abs(O(e) - O(0))
                    },
                    _ = function(e) {
                        return Math.abs(A(e) - A(0))
                    },
                    D = k.select(".nv-titles").append("g").attr("text-anchor", "end").attr("transform", "translate(-6," + (f - i.top - i.bottom) / 2 + ")");
                D.append("text").attr("class", "nv-title").text(function(e) {
                    return e.title
                }), D.append("text").attr("class", "nv-subtitle").attr("dy", "1em").text(function(e) {
                    return e.subtitle
                }), t.width(y).height(b);
                var P = L.select(".nv-bulletWrap");
                d3.transition(P).call(t);
                var H = l || A.tickFormat(y / 100),
                    B = L.selectAll("g.nv-tick").data(A.ticks(y / 50), function(e) {
                        return this.textContent || H(e)
                    }),
                    j = B.enter().append("g").attr("class", "nv-tick").attr("transform", function(e) {
                        return "translate(" + O(e) + ",0)"
                    }).style("opacity", 1e-6);
                j.append("line").attr("y1", b).attr("y2", b * 7 / 6), j.append("text").attr("text-anchor", "middle").attr("dy", "1em").attr("y", b * 7 / 6).text(H);
                var F = d3.transition(B).attr("transform", function(e) {
                    return "translate(" + A(e) + ",0)"
                }).style("opacity", 1);
                F.select("line").attr("y1", b).attr("y2", b * 7 / 6), F.select("text").attr("y", b * 7 / 6), d3.transition(B.exit()).attr("transform", function(e) {
                    return "translate(" + A(e) + ",0)"
                }).style("opacity", 1e-6).remove(), d.on("tooltipShow", function(e) {
                    e.key = n.title, c && v(e, w.parentNode)
                })
            }), d3.timer.flush(), m
        }
        var t = e.models.bullet(),
            n = "left",
            r = !1,
            i = {
                top: 5,
                right: 40,
                bottom: 20,
                left: 120
            },
            s = function(e) {
                return e.ranges
            },
            o = function(e) {
                return e.markers
            },
            u = function(e) {
                return e.measures
            },
            a = null,
            f = 55,
            l = null,
            c = !0,
            h = function(e, t, n, r, i) {
                return "<h3>" + t + "</h3>" + "<p>" + n + "</p>"
            },
            p = "No Data Available.",
            d = d3.dispatch("tooltipShow", "tooltipHide"),
            v = function(t, n) {
                var r = t.pos[0] + (n.offsetLeft || 0) + i.left,
                    s = t.pos[1] + (n.offsetTop || 0) + i.top,
                    o = h(t.key, t.label, t.value, t, m);
                e.tooltip.show([r, s], o, t.value < 0 ? "e" : "w", null, n)
            };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            d.tooltipShow(e)
        }), t.dispatch.on("elementMouseout.tooltip", function(e) {
            d.tooltipHide(e)
        }), d.on("tooltipHide", function() {
            c && e.tooltip.cleanup()
        }), m.dispatch = d, m.bullet = t, d3.rebind(m, t, "color"), m.options = e.utils.optionsFunc.bind(m), m.orient = function(e) {
            return arguments.length ? (n = e, r = n == "right" || n == "bottom", m) : n
        }, m.ranges = function(e) {
            return arguments.length ? (s = e, m) : s
        }, m.markers = function(e) {
            return arguments.length ? (o = e, m) : o
        }, m.measures = function(e) {
            return arguments.length ? (u = e, m) : u
        }, m.width = function(e) {
            return arguments.length ? (a = e, m) : a
        }, m.height = function(e) {
            return arguments.length ? (f = e, m) : f
        }, m.margin = function(e) {
            return arguments.length ? (i.top = typeof e.top != "undefined" ? e.top : i.top, i.right = typeof e.right != "undefined" ? e.right : i.right, i.bottom = typeof e.bottom != "undefined" ? e.bottom : i.bottom, i.left = typeof e.left != "undefined" ? e.left : i.left, m) : i
        }, m.tickFormat = function(e) {
            return arguments.length ? (l = e, m) : l
        }, m.tooltips = function(e) {
            return arguments.length ? (c = e, m) : c
        }, m.tooltipContent = function(e) {
            return arguments.length ? (h = e, m) : h
        }, m.noData = function(e) {
            return arguments.length ? (p = e, m) : p
        }, m
    }, e.models.cumulativeLineChart = function() {
        "use strict";

        function D(b) {
            return b.each(function(b) {
                function q(e, t) {
                    d3.select(D.container).style("cursor", "ew-resize")
                }

                function R(e, t) {
                    M.x = d3.event.x, M.i = Math.round(O.invert(M.x)), rt()
                }

                function U(e, t) {
                    d3.select(D.container).style("cursor", "auto"), x.index = M.i, k.stateChange(x)
                }

                function rt() {
                    nt.data([M]);
                    var e = D.transitionDuration();
                    D.transitionDuration(0), D.update(), D.transitionDuration(e)
                }
                var A = d3.select(this).classed("nv-chart-" + S, !0),
                    H = this,
                    B = (f || parseInt(A.style("width")) || 960) - u.left - u.right,
                    j = (l || parseInt(A.style("height")) || 400) - u.top - u.bottom;
                D.update = function() {
                    A.transition().duration(L).call(D)
                }, D.container = this, x.disabled = b.map(function(e) {
                    return !!e.disabled
                });
                if (!T) {
                    var F;
                    T = {};
                    for (F in x) x[F] instanceof Array ? T[F] = x[F].slice(0) : T[F] = x[F]
                }
                var I = d3.behavior.drag().on("dragstart", q).on("drag", R).on("dragend", U);
                if (!b || !b.length || !b.filter(function(e) {
                    return e.values.length
                }).length) {
                    var z = A.selectAll(".nv-noData").data([N]);
                    return z.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"), z.attr("x", u.left + B / 2).attr("y", u.top + j / 2).text(function(e) {
                        return e
                    }), D
                }
                A.selectAll(".nv-noData").remove(), w = t.xScale(), E = t.yScale();
                if (!y) {
                    var W = b.filter(function(e) {
                            return !e.disabled
                        }).map(function(e, n) {
                            var r = d3.extent(e.values, t.y());
                            return r[0] < -0.95 && (r[0] = -0.95), [(r[0] - r[1]) / (1 + r[1]), (r[1] - r[0]) / (1 + r[0])]
                        }),
                        X = [d3.min(W, function(e) {
                            return e[0]
                        }), d3.max(W, function(e) {
                            return e[1]
                        })];
                    t.yDomain(X)
                } else t.yDomain(null);
                O.domain([0, b[0].values.length - 1]).range([0, B]).clamp(!0);
                var b = P(M.i, b),
                    V = g ? "none" : "all",
                    $ = A.selectAll("g.nv-wrap.nv-cumulativeLine").data([b]),
                    J = $.enter().append("g").attr("class", "nvd3 nv-wrap nv-cumulativeLine").append("g"),
                    K = $.select("g");
                J.append("g").attr("class", "nv-interactive"), J.append("g").attr("class", "nv-x nv-axis").style("pointer-events", "none"), J.append("g").attr("class", "nv-y nv-axis"), J.append("g").attr("class", "nv-background"), J.append("g").attr("class", "nv-linesWrap").style("pointer-events", V), J.append("g").attr("class", "nv-avgLinesWrap").style("pointer-events", "none"), J.append("g").attr("class", "nv-legendWrap"), J.append("g").attr("class", "nv-controlsWrap"), c && (i.width(B), K.select(".nv-legendWrap").datum(b).call(i), u.top != i.height() && (u.top = i.height(), j = (l || parseInt(A.style("height")) || 400) - u.top - u.bottom), K.select(".nv-legendWrap").attr("transform", "translate(0," + -u.top + ")"));
                if (m) {
                    var Q = [{
                        key: "Re-scale y-axis",
                        disabled: !y
                    }];
                    s.width(140).color(["#444", "#444", "#444"]).rightAlign(!1).margin({
                        top: 5,
                        right: 0,
                        bottom: 5,
                        left: 20
                    }), K.select(".nv-controlsWrap").datum(Q).attr("transform", "translate(0," + -u.top + ")").call(s)
                }
                $.attr("transform", "translate(" + u.left + "," + u.top + ")"), d && K.select(".nv-y.nv-axis").attr("transform", "translate(" + B + ",0)");
                var G = b.filter(function(e) {
                    return e.tempDisabled
                });
                $.select(".tempDisabled").remove(), G.length && $.append("text").attr("class", "tempDisabled").attr("x", B / 2).attr("y", "-.71em").style("text-anchor", "end").text(G.map(function(e) {
                    return e.key
                }).join(", ") + " values cannot be calculated for this time period."), g && (o.width(B).height(j).margin({
                    left: u.left,
                    top: u.top
                }).svgContainer(A).xScale(w), $.select(".nv-interactive").call(o)), J.select(".nv-background").append("rect"), K.select(".nv-background rect").attr("width", B).attr("height", j), t.y(function(e) {
                    return e.display.y
                }).width(B).height(j).color(b.map(function(e, t) {
                    return e.color || a(e, t)
                }).filter(function(e, t) {
                    return !b[t].disabled && !b[t].tempDisabled
                }));
                var Y = K.select(".nv-linesWrap").datum(b.filter(function(e) {
                    return !e.disabled && !e.tempDisabled
                }));
                Y.call(t), b.forEach(function(e, t) {
                    e.seriesIndex = t
                });
                var Z = b.filter(function(e) {
                        return !e.disabled && !!C(e)
                    }),
                    et = K.select(".nv-avgLinesWrap").selectAll("line").data(Z, function(e) {
                        return e.key
                    }),
                    tt = function(e) {
                        var t = E(C(e));
                        return t < 0 ? 0 : t > j ? j : t
                    };
                et.enter().append("line").style("stroke-width", 2).style("stroke-dasharray", "10,10").style("stroke", function(e, n) {
                    return t.color()(e, e.seriesIndex)
                }).attr("x1", 0).attr("x2", B).attr("y1", tt).attr("y2", tt), et.style("stroke-opacity", function(e) {
                    var t = E(C(e));
                    return t < 0 || t > j ? 0 : 1
                }).attr("x1", 0).attr("x2", B).attr("y1", tt).attr("y2", tt), et.exit().remove();
                var nt = Y.selectAll(".nv-indexLine").data([M]);
                nt.enter().append("rect").attr("class", "nv-indexLine").attr("width", 3).attr("x", -2).attr("fill", "red").attr("fill-opacity", .5).style("pointer-events", "all").call(I), nt.attr("transform", function(e) {
                    return "translate(" + O(e.i) + ",0)"
                }).attr("height", j), h && (n.scale(w).ticks(Math.min(b[0].values.length, B / 70)).tickSize(-j, 0), K.select(".nv-x.nv-axis").attr("transform", "translate(0," + E.range()[0] + ")"), d3.transition(K.select(".nv-x.nv-axis")).call(n)), p && (r.scale(E).ticks(j / 36).tickSize(-B, 0), d3.transition(K.select(".nv-y.nv-axis")).call(r)), K.select(".nv-background rect").on("click", function() {
                    M.x = d3.mouse(this)[0], M.i = Math.round(O.invert(M.x)), x.index = M.i, k.stateChange(x), rt()
                }), t.dispatch.on("elementClick", function(e) {
                    M.i = e.pointIndex, M.x = O(M.i), x.index = M.i, k.stateChange(x), rt()
                }), s.dispatch.on("legendClick", function(e, t) {
                    e.disabled = !e.disabled, y = !e.disabled, x.rescaleY = y, k.stateChange(x), D.update()
                }), i.dispatch.on("stateChange", function(e) {
                    x.disabled = e.disabled, k.stateChange(x), D.update()
                }), o.dispatch.on("elementMousemove", function(i) {
                    t.clearHighlights();
                    var s, f, l, c = [];
                    b.filter(function(e, t) {
                        return e.seriesIndex = t, !e.disabled
                    }).forEach(function(n, r) {
                        f = e.interactiveBisect(n.values, i.pointXValue, D.x()), t.highlightPoint(r, f, !0);
                        var o = n.values[f];
                        if (typeof o == "undefined") return;
                        typeof s == "undefined" && (s = o), typeof l == "undefined" && (l = D.xScale()(D.x()(o, f))), c.push({
                            key: n.key,
                            value: D.y()(o, f),
                            color: a(n, n.seriesIndex)
                        })
                    });
                    if (c.length > 2) {
                        var h = D.yScale().invert(i.mouseY),
                            p = Math.abs(D.yScale().domain()[0] - D.yScale().domain()[1]),
                            d = .03 * p,
                            m = e.nearestValueIndex(c.map(function(e) {
                                return e.value
                            }), h, d);
                        m !== null && (c[m].highlight = !0)
                    }
                    var g = n.tickFormat()(D.x()(s, f), f);
                    o.tooltip.position({
                        left: l + u.left,
                        top: i.mouseY + u.top
                    }).chartContainer(H.parentNode).enabled(v).valueFormatter(function(e, t) {
                        return r.tickFormat()(e)
                    }).data({
                        value: g,
                        series: c
                    })(), o.renderGuideLine(l)
                }), o.dispatch.on("elementMouseout", function(e) {
                    k.tooltipHide(), t.clearHighlights()
                }), k.on("tooltipShow", function(e) {
                    v && _(e, H.parentNode)
                }), k.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && (b.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }), x.disabled = e.disabled), typeof e.index != "undefined" && (M.i = e.index, M.x = O(M.i), x.index = e.index, nt.data([M])), typeof e.rescaleY != "undefined" && (y = e.rescaleY), D.update()
                })
            }), D
        }

        function P(e, n) {
            return n.map(function(n, r) {
                if (!n.values) return n;
                var i = t.y()(n.values[e], e);
                return i < -0.95 && !A ? (n.tempDisabled = !0, n) : (n.tempDisabled = !1, n.values =
                    n.values.map(function(e, n) {
                        return e.display = {
                            y: (t.y()(e, n) - i) / (1 + i)
                        }, e
                    }), n)
            })
        }
        var t = e.models.line(),
            n = e.models.axis(),
            r = e.models.axis(),
            i = e.models.legend(),
            s = e.models.legend(),
            o = e.interactiveGuideline(),
            u = {
                top: 30,
                right: 30,
                bottom: 50,
                left: 60
            },
            a = e.utils.defaultColor(),
            f = null,
            l = null,
            c = !0,
            h = !0,
            p = !0,
            d = !1,
            v = !0,
            m = !0,
            g = !1,
            y = !0,
            b = function(e, t, n, r, i) {
                return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>"
            },
            w, E, S = t.id(),
            x = {
                index: 0,
                rescaleY: y
            },
            T = null,
            N = "No Data Available.",
            C = function(e) {
                return e.average
            },
            k = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"),
            L = 250,
            A = !1;
        n.orient("bottom").tickPadding(7), r.orient(d ? "right" : "left"), s.updateState(!1);
        var O = d3.scale.linear(),
            M = {
                i: 0,
                x: 0
            },
            _ = function(i, s) {
                var o = i.pos[0] + (s.offsetLeft || 0),
                    u = i.pos[1] + (s.offsetTop || 0),
                    a = n.tickFormat()(t.x()(i.point, i.pointIndex)),
                    f = r.tickFormat()(t.y()(i.point, i.pointIndex)),
                    l = b(i.series.key, a, f, i, D);
                e.tooltip.show([o, u], l, null, null, s)
            };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + u.left, e.pos[1] + u.top], k.tooltipShow(e)
        }), t.dispatch.on("elementMouseout.tooltip", function(e) {
            k.tooltipHide(e)
        }), k.on("tooltipHide", function() {
            v && e.tooltip.cleanup()
        }), D.dispatch = k, D.lines = t, D.legend = i, D.xAxis = n, D.yAxis = r, D.interactiveLayer = o, d3.rebind(D, t, "defined", "isArea", "x", "y", "xScale", "yScale", "size", "xDomain", "yDomain", "xRange", "yRange", "forceX", "forceY", "interactive", "clipEdge", "clipVoronoi", "useVoronoi", "id"), D.options = e.utils.optionsFunc.bind(D), D.margin = function(e) {
            return arguments.length ? (u.top = typeof e.top != "undefined" ? e.top : u.top, u.right = typeof e.right != "undefined" ? e.right : u.right, u.bottom = typeof e.bottom != "undefined" ? e.bottom : u.bottom, u.left = typeof e.left != "undefined" ? e.left : u.left, D) : u
        }, D.width = function(e) {
            return arguments.length ? (f = e, D) : f
        }, D.height = function(e) {
            return arguments.length ? (l = e, D) : l
        }, D.color = function(t) {
            return arguments.length ? (a = e.utils.getColor(t), i.color(a), D) : a
        }, D.rescaleY = function(e) {
            return arguments.length ? (y = e, D) : y
        }, D.showControls = function(e) {
            return arguments.length ? (m = e, D) : m
        }, D.useInteractiveGuideline = function(e) {
            return arguments.length ? (g = e, e === !0 && (D.interactive(!1), D.useVoronoi(!1)), D) : g
        }, D.showLegend = function(e) {
            return arguments.length ? (c = e, D) : c
        }, D.showXAxis = function(e) {
            return arguments.length ? (h = e, D) : h
        }, D.showYAxis = function(e) {
            return arguments.length ? (p = e, D) : p
        }, D.rightAlignYAxis = function(e) {
            return arguments.length ? (d = e, r.orient(e ? "right" : "left"), D) : d
        }, D.tooltips = function(e) {
            return arguments.length ? (v = e, D) : v
        }, D.tooltipContent = function(e) {
            return arguments.length ? (b = e, D) : b
        }, D.state = function(e) {
            return arguments.length ? (x = e, D) : x
        }, D.defaultState = function(e) {
            return arguments.length ? (T = e, D) : T
        }, D.noData = function(e) {
            return arguments.length ? (N = e, D) : N
        }, D.average = function(e) {
            return arguments.length ? (C = e, D) : C
        }, D.transitionDuration = function(e) {
            return arguments.length ? (L = e, D) : L
        }, D.noErrorCheck = function(e) {
            return arguments.length ? (A = e, D) : A
        }, D
    }, e.models.discreteBar = function() {
        "use strict";

        function E(e) {
            return e.each(function(e) {
                var i = n - t.left - t.right,
                    E = r - t.top - t.bottom,
                    S = d3.select(this);
                e.forEach(function(e, t) {
                    e.values.forEach(function(e) {
                        e.series = t
                    })
                });
                var T = p && d ? [] : e.map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: u(e, t),
                            y: a(e, t),
                            y0: e.y0
                        }
                    })
                });
                s.domain(p || d3.merge(T).map(function(e) {
                    return e.x
                })).rangeBands(v || [0, i], .1), o.domain(d || d3.extent(d3.merge(T).map(function(e) {
                    return e.y
                }).concat(f))), c ? o.range(m || [E - (o.domain()[0] < 0 ? 12 : 0), o.domain()[1] > 0 ? 12 : 0]) : o.range(m || [E, 0]), b = b || s, w = w || o.copy().range([o(0), o(0)]);
                var N = S.selectAll("g.nv-wrap.nv-discretebar").data([e]),
                    C = N.enter().append("g").attr("class", "nvd3 nv-wrap nv-discretebar"),
                    k = C.append("g"),
                    L = N.select("g");
                k.append("g").attr("class", "nv-groups"), N.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var A = N.select(".nv-groups").selectAll(".nv-group").data(function(e) {
                    return e
                }, function(e) {
                    return e.key
                });
                A.enter().append("g").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6), A.exit().transition().style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6).remove(), A.attr("class", function(e, t) {
                    return "nv-group nv-series-" + t
                }).classed("hover", function(e) {
                    return e.hover
                }), A.transition().style("stroke-opacity", 1).style("fill-opacity", .75);
                var O = A.selectAll("g.nv-bar").data(function(e) {
                    return e.values
                });
                O.exit().remove();
                var M = O.enter().append("g").attr("transform", function(e, t, n) {
                    return "translate(" + (s(u(e, t)) + s.rangeBand() * .05) + ", " + o(0) + ")"
                }).on("mouseover", function(t, n) {
                    d3.select(this).classed("hover", !0), g.elementMouseover({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [s(u(t, n)) + s.rangeBand() * (t.series + .5) / e.length, o(a(t, n))],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    })
                }).on("mouseout", function(t, n) {
                    d3.select(this).classed("hover", !1), g.elementMouseout({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    })
                }).on("click", function(t, n) {
                    g.elementClick({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [s(u(t, n)) + s.rangeBand() * (t.series + .5) / e.length, o(a(t, n))],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    }), d3.event.stopPropagation()
                }).on("dblclick", function(t, n) {
                    g.elementDblClick({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [s(u(t, n)) + s.rangeBand() * (t.series + .5) / e.length, o(a(t, n))],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    }), d3.event.stopPropagation()
                });
                M.append("rect").attr("height", 0).attr("width", s.rangeBand() * .9 / e.length), c ? (M.append("text").attr("text-anchor", "middle"), O.select("text").text(function(e, t) {
                    return h(a(e, t))
                }).transition().attr("x", s.rangeBand() * .9 / 2).attr("y", function(e, t) {
                    return a(e, t) < 0 ? o(a(e, t)) - o(0) + 12 : -4
                })) : O.selectAll("text").remove(), O.attr("class", function(e, t) {
                    return a(e, t) < 0 ? "nv-bar negative" : "nv-bar positive"
                }).style("fill", function(e, t) {
                    return e.color || l(e, t)
                }).style("stroke", function(e, t) {
                    return e.color || l(e, t)
                }).select("rect").attr("class", y).transition().attr("width", s.rangeBand() * .9 / e.length), O.transition().attr("transform", function(e, t) {
                    var n = s(u(e, t)) + s.rangeBand() * .05,
                        r = a(e, t) < 0 ? o(0) : o(0) - o(a(e, t)) < 1 ? o(0) - 1 : o(a(e, t));
                    return "translate(" + n + ", " + r + ")"
                }).select("rect").attr("height", function(e, t) {
                    return Math.max(Math.abs(o(a(e, t)) - o(d && d[0] || 0)) || 1)
                }), b = s.copy(), w = o.copy()
            }), E
        }
        var t = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            n = 960,
            r = 500,
            i = Math.floor(Math.random() * 1e4),
            s = d3.scale.ordinal(),
            o = d3.scale.linear(),
            u = function(e) {
                return e.x
            },
            a = function(e) {
                return e.y
            },
            f = [0],
            l = e.utils.defaultColor(),
            c = !1,
            h = d3.format(",.2f"),
            p, d, v, m, g = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout"),
            y = "discreteBar",
            b, w;
        return E.dispatch = g, E.options = e.utils.optionsFunc.bind(E), E.x = function(e) {
            return arguments.length ? (u = e, E) : u
        }, E.y = function(e) {
            return arguments.length ? (a = e, E) : a
        }, E.margin = function(e) {
            return arguments.length ? (t.top = typeof e.top != "undefined" ? e.top : t.top, t.right = typeof e.right != "undefined" ? e.right : t.right, t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom, t.left = typeof e.left != "undefined" ? e.left : t.left, E) : t
        }, E.width = function(e) {
            return arguments.length ? (n = e, E) : n
        }, E.height = function(e) {
            return arguments.length ? (r = e, E) : r
        }, E.xScale = function(e) {
            return arguments.length ? (s = e, E) : s
        }, E.yScale = function(e) {
            return arguments.length ? (o = e, E) : o
        }, E.xDomain = function(e) {
            return arguments.length ? (p = e, E) : p
        }, E.yDomain = function(e) {
            return arguments.length ? (d = e, E) : d
        }, E.xRange = function(e) {
            return arguments.length ? (v = e, E) : v
        }, E.yRange = function(e) {
            return arguments.length ? (m = e, E) : m
        }, E.forceY = function(e) {
            return arguments.length ? (f = e, E) : f
        }, E.color = function(t) {
            return arguments.length ? (l = e.utils.getColor(t), E) : l
        }, E.id = function(e) {
            return arguments.length ? (i = e, E) : i
        }, E.showValues = function(e) {
            return arguments.length ? (c = e, E) : c
        }, E.valueFormat = function(e) {
            return arguments.length ? (h = e, E) : h
        }, E.rectClass = function(e) {
            return arguments.length ? (y = e, E) : y
        }, E
    }, e.models.discreteBarChart = function() {
        "use strict";

        function w(e) {
            return e.each(function(e) {
                var u = d3.select(this),
                    p = this,
                    E = (s || parseInt(u.style("width")) || 960) - i.left - i.right,
                    S = (o || parseInt(u.style("height")) || 400) - i.top - i.bottom;
                w.update = function() {
                    g.beforeUpdate(), u.transition().duration(y).call(w)
                }, w.container = this;
                if (!e || !e.length || !e.filter(function(e) {
                    return e.values.length
                }).length) {
                    var T = u.selectAll(".nv-noData").data([m]);
                    return T.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"), T.attr("x", i.left + E / 2).attr("y", i.top + S / 2).text(function(e) {
                        return e
                    }), w
                }
                u.selectAll(".nv-noData").remove(), d = t.xScale(), v = t.yScale().clamp(!0);
                var N = u.selectAll("g.nv-wrap.nv-discreteBarWithAxes").data([e]),
                    C = N.enter().append("g").attr("class", "nvd3 nv-wrap nv-discreteBarWithAxes").append("g"),
                    k = C.append("defs"),
                    L = N.select("g");
                C.append("g").attr("class", "nv-x nv-axis"), C.append("g").attr("class", "nv-y nv-axis").append("g").attr("class", "nv-zeroLine").append("line"), C.append("g").attr("class", "nv-barsWrap"), L.attr("transform", "translate(" + i.left + "," + i.top + ")"), l && L.select(".nv-y.nv-axis").attr("transform", "translate(" + E + ",0)"), t.width(E).height(S);
                var A = L.select(".nv-barsWrap").datum(e.filter(function(e) {
                    return !e.disabled
                }));
                A.transition().call(t), k.append("clipPath").attr("id", "nv-x-label-clip-" + t.id()).append("rect"), L.select("#nv-x-label-clip-" + t.id() + " rect").attr("width", d.rangeBand() * (c ? 2 : 1)).attr("height", 16).attr("x", -d.rangeBand() / (c ? 1 : 2));
                if (a) {
                    n.scale(d).ticks(E / 100).tickSize(-S, 0), L.select(".nv-x.nv-axis").attr("transform", "translate(0," + (v.range()[0] + (t.showValues() && v.domain()[0] < 0 ? 16 : 0)) + ")"), L.select(".nv-x.nv-axis").transition().call(n);
                    var O = L.select(".nv-x.nv-axis").selectAll("g");
                    c && O.selectAll("text").attr("transform", function(e, t, n) {
                        return "translate(0," + (n % 2 == 0 ? "5" : "17") + ")"
                    })
                }
                f && (r.scale(v).ticks(S / 36).tickSize(-E, 0), L.select(".nv-y.nv-axis").transition().call(r)), L.select(".nv-zeroLine line").attr("x1", 0).attr("x2", E).attr("y1", v(0)).attr("y2", v(0)), g.on("tooltipShow", function(e) {
                    h && b(e, p.parentNode)
                })
            }), w
        }
        var t = e.models.discreteBar(),
            n = e.models.axis(),
            r = e.models.axis(),
            i = {
                top: 15,
                right: 10,
                bottom: 50,
                left: 60
            },
            s = null,
            o = null,
            u = e.utils.getColor(),
            a = !0,
            f = !0,
            l = !1,
            c = !1,
            h = !0,
            p = function(e, t, n, r, i) {
                return "<h3>" + t + "</h3>" + "<p>" + n + "</p>"
            },
            d, v, m = "No Data Available.",
            g = d3.dispatch("tooltipShow", "tooltipHide", "beforeUpdate"),
            y = 250;
        n.orient("bottom").highlightZero(!1).showMaxMin(!1).tickFormat(function(e) {
            return e
        }), r.orient(l ? "right" : "left").tickFormat(d3.format(",.1f"));
        var b = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0),
                u = i.pos[1] + (s.offsetTop || 0),
                a = n.tickFormat()(t.x()(i.point, i.pointIndex)),
                f = r.tickFormat()(t.y()(i.point, i.pointIndex)),
                l = p(i.series.key, a, f, i, w);
            e.tooltip.show([o, u], l, i.value < 0 ? "n" : "s", null, s)
        };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + i.left, e.pos[1] + i.top], g.tooltipShow(e)
        }), t.dispatch.on("elementMouseout.tooltip", function(e) {
            g.tooltipHide(e)
        }), g.on("tooltipHide", function() {
            h && e.tooltip.cleanup()
        }), w.dispatch = g, w.discretebar = t, w.xAxis = n, w.yAxis = r, d3.rebind(w, t, "x", "y", "xDomain", "yDomain", "xRange", "yRange", "forceX", "forceY", "id", "showValues", "valueFormat"), w.options = e.utils.optionsFunc.bind(w), w.margin = function(e) {
            return arguments.length ? (i.top = typeof e.top != "undefined" ? e.top : i.top, i.right = typeof e.right != "undefined" ? e.right : i.right, i.bottom = typeof e.bottom != "undefined" ? e.bottom : i.bottom, i.left = typeof e.left != "undefined" ? e.left : i.left, w) : i
        }, w.width = function(e) {
            return arguments.length ? (s = e, w) : s
        }, w.height = function(e) {
            return arguments.length ? (o = e, w) : o
        }, w.color = function(n) {
            return arguments.length ? (u = e.utils.getColor(n), t.color(u), w) : u
        }, w.showXAxis = function(e) {
            return arguments.length ? (a = e, w) : a
        }, w.showYAxis = function(e) {
            return arguments.length ? (f = e, w) : f
        }, w.rightAlignYAxis = function(e) {
            return arguments.length ? (l = e, r.orient(e ? "right" : "left"), w) : l
        }, w.staggerLabels = function(e) {
            return arguments.length ? (c = e, w) : c
        }, w.tooltips = function(e) {
            return arguments.length ? (h = e, w) : h
        }, w.tooltipContent = function(e) {
            return arguments.length ? (p = e, w) : p
        }, w.noData = function(e) {
            return arguments.length ? (m = e, w) : m
        }, w.transitionDuration = function(e) {
            return arguments.length ? (y = e, w) : y
        }, w
    }, e.models.distribution = function() {
        "use strict";

        function l(e) {
            return e.each(function(e) {
                var a = n - (i === "x" ? t.left + t.right : t.top + t.bottom),
                    l = i == "x" ? "y" : "x",
                    c = d3.select(this);
                f = f || u;
                var h = c.selectAll("g.nv-distribution").data([e]),
                    p = h.enter().append("g").attr("class", "nvd3 nv-distribution"),
                    d = p.append("g"),
                    v = h.select("g");
                h.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var m = v.selectAll("g.nv-dist").data(function(e) {
                    return e
                }, function(e) {
                    return e.key
                });
                m.enter().append("g"), m.attr("class", function(e, t) {
                    return "nv-dist nv-series-" + t
                }).style("stroke", function(e, t) {
                    return o(e, t)
                });
                var g = m.selectAll("line.nv-dist" + i).data(function(e) {
                    return e.values
                });
                g.enter().append("line").attr(i + "1", function(e, t) {
                    return f(s(e, t))
                }).attr(i + "2", function(e, t) {
                    return f(s(e, t))
                }), m.exit().selectAll("line.nv-dist" + i).transition().attr(i + "1", function(e, t) {
                    return u(s(e, t))
                }).attr(i + "2", function(e, t) {
                    return u(s(e, t))
                }).style("stroke-opacity", 0).remove(), g.attr("class", function(e, t) {
                    return "nv-dist" + i + " nv-dist" + i + "-" + t
                }).attr(l + "1", 0).attr(l + "2", r), g.transition().attr(i + "1", function(e, t) {
                    return u(s(e, t))
                }).attr(i + "2", function(e, t) {
                    return u(s(e, t))
                }), f = u.copy()
            }), l
        }
        var t = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            n = 400,
            r = 8,
            i = "x",
            s = function(e) {
                return e[i]
            },
            o = e.utils.defaultColor(),
            u = d3.scale.linear(),
            a, f;
        return l.options = e.utils.optionsFunc.bind(l), l.margin = function(e) {
            return arguments.length ? (t.top = typeof e.top != "undefined" ? e.top : t.top, t.right = typeof e.right != "undefined" ? e.right : t.right, t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom, t.left = typeof e.left != "undefined" ? e.left : t.left, l) : t
        }, l.width = function(e) {
            return arguments.length ? (n = e, l) : n
        }, l.axis = function(e) {
            return arguments.length ? (i = e, l) : i
        }, l.size = function(e) {
            return arguments.length ? (r = e, l) : r
        }, l.getData = function(e) {
            return arguments.length ? (s = d3.functor(e), l) : s
        }, l.scale = function(e) {
            return arguments.length ? (u = e, l) : u
        }, l.color = function(t) {
            return arguments.length ? (o = e.utils.getColor(t), l) : o
        }, l
    }, e.models.historicalBar = function() {
        "use strict";

        function w(E) {
            return E.each(function(w) {
                var E = n - t.left - t.right,
                    S = r - t.top - t.bottom,
                    T = d3.select(this);
                s.domain(d || d3.extent(w[0].values.map(u).concat(f))), c ? s.range(m || [E * .5 / w[0].values.length, E * (w[0].values.length - .5) / w[0].values.length]) : s.range(m || [0, E]), o.domain(v || d3.extent(w[0].values.map(a).concat(l))).range(g || [S, 0]), s.domain()[0] === s.domain()[1] && (s.domain()[0] ? s.domain([s.domain()[0] - s.domain()[0] * .01, s.domain()[1] + s.domain()[1] * .01]) : s.domain([-1, 1])), o.domain()[0] === o.domain()[1] && (o.domain()[0] ? o.domain([o.domain()[0] + o.domain()[0] * .01, o.domain()[1] - o.domain()[1] * .01]) : o.domain([-1, 1]));
                var N = T.selectAll("g.nv-wrap.nv-historicalBar-" + i).data([w[0].values]),
                    C = N.enter().append("g").attr("class", "nvd3 nv-wrap nv-historicalBar-" + i),
                    k = C.append("defs"),
                    L = C.append("g"),
                    A = N.select("g");
                L.append("g").attr("class", "nv-bars"), N.attr("transform", "translate(" + t.left + "," + t.top + ")"), T.on("click", function(e, t) {
                    y.chartClick({
                        data: e,
                        index: t,
                        pos: d3.event,
                        id: i
                    })
                }), k.append("clipPath").attr("id", "nv-chart-clip-path-" + i).append("rect"), N.select("#nv-chart-clip-path-" + i + " rect").attr("width", E).attr("height", S), A.attr("clip-path", h ? "url(#nv-chart-clip-path-" + i + ")" : "");
                var O = N.select(".nv-bars").selectAll(".nv-bar").data(function(e) {
                    return e
                }, function(e, t) {
                    return u(e, t)
                });
                O.exit().remove();
                var M = O.enter().append("rect").attr("x", 0).attr("y", function(t, n) {
                    return e.utils.NaNtoZero(o(Math.max(0, a(t, n))))
                }).attr("height", function(t, n) {
                    return e.utils.NaNtoZero(Math.abs(o(a(t, n)) - o(0)))
                }).attr("transform", function(e, t) {
                    return "translate(" + (s(u(e, t)) - E / w[0].values.length * .45) + ",0)"
                }).on("mouseover", function(e, t) {
                    if (!b) return;
                    d3.select(this).classed("hover", !0), y.elementMouseover({
                        point: e,
                        series: w[0],
                        pos: [s(u(e, t)), o(a(e, t))],
                        pointIndex: t,
                        seriesIndex: 0,
                        e: d3.event
                    })
                }).on("mouseout", function(e, t) {
                    if (!b) return;
                    d3.select(this).classed("hover", !1), y.elementMouseout({
                        point: e,
                        series: w[0],
                        pointIndex: t,
                        seriesIndex: 0,
                        e: d3.event
                    })
                }).on("click", function(e, t) {
                    if (!b) return;
                    y.elementClick({
                        value: a(e, t),
                        data: e,
                        index: t,
                        pos: [s(u(e, t)), o(a(e, t))],
                        e: d3.event,
                        id: i
                    }), d3.event.stopPropagation()
                }).on("dblclick", function(e, t) {
                    if (!b) return;
                    y.elementDblClick({
                        value: a(e, t),
                        data: e,
                        index: t,
                        pos: [s(u(e, t)), o(a(e, t))],
                        e: d3.event,
                        id: i
                    }), d3.event.stopPropagation()
                });
                O.attr("fill", function(e, t) {
                    return p(e, t)
                }).attr("class", function(e, t, n) {
                    return (a(e, t) < 0 ? "nv-bar negative" : "nv-bar positive") + " nv-bar-" + n + "-" + t
                }).transition().attr("transform", function(e, t) {
                    return "translate(" + (s(u(e, t)) - E / w[0].values.length * .45) + ",0)"
                }).attr("width", E / w[0].values.length * .9), O.transition().attr("y", function(t, n) {
                    var r = a(t, n) < 0 ? o(0) : o(0) - o(a(t, n)) < 1 ? o(0) - 1 : o(a(t, n));
                    return e.utils.NaNtoZero(r)
                }).attr("height", function(t, n) {
                    return e.utils.NaNtoZero(Math.max(Math.abs(o(a(t, n)) - o(0)), 1))
                })
            }), w
        }
        var t = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            n = 960,
            r = 500,
            i = Math.floor(Math.random() * 1e4),
            s = d3.scale.linear(),
            o = d3.scale.linear(),
            u = function(e) {
                return e.x
            },
            a = function(e) {
                return e.y
            },
            f = [],
            l = [0],
            c = !1,
            h = !0,
            p = e.utils.defaultColor(),
            d, v, m, g, y = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout"),
            b = !0;
        return w.highlightPoint = function(e, t) {
            d3.select(".nv-historicalBar-" + i).select(".nv-bars .nv-bar-0-" + e).classed("hover", t)
        }, w.clearHighlights = function() {
            d3.select(".nv-historicalBar-" + i).select(".nv-bars .nv-bar.hover").classed("hover", !1)
        }, w.dispatch = y, w.options = e.utils.optionsFunc.bind(w), w.x = function(e) {
            return arguments.length ? (u = e, w) : u
        }, w.y = function(e) {
            return arguments.length ? (a = e, w) : a
        }, w.margin = function(e) {
            return arguments.length ? (t.top = typeof e.top != "undefined" ? e.top : t.top, t.right = typeof e.right != "undefined" ? e.right : t.right, t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom, t.left = typeof e.left != "undefined" ? e.left : t.left, w) : t
        }, w.width = function(e) {
            return arguments.length ? (n = e, w) : n
        }, w.height = function(e) {
            return arguments.length ? (r = e, w) : r
        }, w.xScale = function(e) {
            return arguments.length ? (s = e, w) : s
        }, w.yScale = function(e) {
            return arguments.length ? (o = e, w) : o
        }, w.xDomain = function(e) {
            return arguments.length ? (d = e, w) : d
        }, w.yDomain = function(e) {
            return arguments.length ? (v = e, w) : v
        }, w.xRange = function(e) {
            return arguments.length ? (m = e, w) : m
        }, w.yRange = function(e) {
            return arguments.length ? (g = e, w) : g
        }, w.forceX = function(e) {
            return arguments.length ? (f = e, w) : f
        }, w.forceY = function(e) {
            return arguments.length ? (l = e, w) : l
        }, w.padData = function(e) {
            return arguments.length ? (c = e, w) : c
        }, w.clipEdge = function(e) {
            return arguments.length ? (h = e, w) : h
        }, w.color = function(t) {
            return arguments.length ? (p = e.utils.getColor(t), w) : p
        }, w.id = function(e) {
            return arguments.length ? (i = e, w) : i
        }, w.interactive = function(e) {
            return arguments.length ? (b = !1, w) : b
        }, w
    }, e.models.historicalBarChart = function() {
        "use strict";

        function x(e) {
            return e.each(function(d) {
                var T = d3.select(this),
                    N = this,
                    C = (u || parseInt(T.style("width")) || 960) - s.left - s.right,
                    k = (a || parseInt(T.style("height")) || 400) - s.top - s.bottom;
                x.update = function() {
                    T.transition().duration(E).call(x)
                }, x.container = this, g.disabled = d.map(function(e) {
                    return !!e.disabled
                });
                if (!y) {
                    var L;
                    y = {};
                    for (L in g) g[L] instanceof Array ? y[L] = g[L].slice(0) : y[L] = g[L]
                }
                if (!d || !d.length || !d.filter(function(e) {
                    return e.values.length
                }).length) {
                    var A = T.selectAll(".nv-noData").data([b]);
                    return A.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"), A.attr("x", s.left + C / 2).attr("y", s.top + k / 2).text(function(e) {
                        return e
                    }), x
                }
                T.selectAll(".nv-noData").remove(), v = t.xScale(), m = t.yScale();
                var O = T.selectAll("g.nv-wrap.nv-historicalBarChart").data([d]),
                    M = O.enter().append("g").attr("class", "nvd3 nv-wrap nv-historicalBarChart").append("g"),
                    _ = O.select("g");
                M.append("g").attr("class", "nv-x nv-axis"), M.append("g").attr("class", "nv-y nv-axis"), M.append("g").attr("class", "nv-barsWrap"), M.append("g").attr("class", "nv-legendWrap"), f && (i.width(C), _.select(".nv-legendWrap").datum(d).call(i), s.top != i.height() && (s.top = i.height(), k = (a || parseInt(T.style("height")) || 400) - s.top - s.bottom), O.select(".nv-legendWrap").attr("transform", "translate(0," + -s.top + ")")), O.attr("transform", "translate(" + s.left + "," + s.top + ")"), h && _.select(".nv-y.nv-axis").attr("transform", "translate(" + C + ",0)"), t.width(C).height(k).color(d.map(function(e, t) {
                    return e.color || o(e, t)
                }).filter(function(e, t) {
                    return !d[t].disabled
                }));
                var D = _.select(".nv-barsWrap").datum(d.filter(function(e) {
                    return !e.disabled
                }));
                D.transition().call(t), l && (n.scale(v).tickSize(-k, 0), _.select(".nv-x.nv-axis").attr("transform", "translate(0," + m.range()[0] + ")"), _.select(".nv-x.nv-axis").transition().call(n)), c && (r.scale(m).ticks(k / 36).tickSize(-C, 0), _.select(".nv-y.nv-axis").transition().call(r)), i.dispatch.on("legendClick", function(t, n) {
                    t.disabled = !t.disabled, d.filter(function(e) {
                        return !e.disabled
                    }).length || d.map(function(e) {
                        return e.disabled = !1, O.selectAll(".nv-series").classed("disabled", !1), e
                    }), g.disabled = d.map(function(e) {
                        return !!e.disabled
                    }), w.stateChange(g), e.transition().call(x)
                }), i.dispatch.on("legendDblclick", function(e) {
                    d.forEach(function(e) {
                        e.disabled = !0
                    }), e.disabled = !1, g.disabled = d.map(function(e) {
                        return !!e.disabled
                    }), w.stateChange(g), x.update()
                }), w.on("tooltipShow", function(e) {
                    p && S(e, N.parentNode)
                }), w.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && (d.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }), g.disabled = e.disabled), x.update()
                })
            }), x
        }
        var t = e.models.historicalBar(),
            n = e.models.axis(),
            r = e.models.axis(),
            i = e.models.legend(),
            s = {
                top: 30,
                right: 90,
                bottom: 50,
                left: 90
            },
            o = e.utils.defaultColor(),
            u = null,
            a = null,
            f = !1,
            l = !0,
            c = !0,
            h = !1,
            p = !0,
            d = function(e, t, n, r, i) {
                return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>"
            },
            v, m, g = {},
            y = null,
            b = "No Data Available.",
            w = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"),
            E = 250;
        n.orient("bottom").tickPadding(7), r.orient(h ? "right" : "left");
        var S = function(i, s) {
            if (s) {
                var o = d3.select(s).select("svg"),
                    u = o.node() ? o.attr("viewBox") : null;
                if (u) {
                    u = u.split(" ");
                    var a = parseInt(o.style("width")) / u[2];
                    i.pos[0] = i.pos[0] * a, i.pos[1] = i.pos[1] * a
                }
            }
            var f = i.pos[0] + (s.offsetLeft || 0),
                l = i.pos[1] + (s.offsetTop || 0),
                c = n.tickFormat()(t.x()(i.point, i.pointIndex)),
                h = r.tickFormat()(t.y()(i.point, i.pointIndex)),
                p = d(i.series.key, c, h, i, x);
            e.tooltip.show([f, l], p, null, null, s)
        };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + s.left, e.pos[1] + s.top], w.tooltipShow(e)
        }), t.dispatch.on("elementMouseout.tooltip", function(e) {
            w.tooltipHide(e)
        }), w.on("tooltipHide", function() {
            p && e.tooltip.cleanup()
        }), x.dispatch = w, x.bars = t, x.legend = i, x.xAxis = n, x.yAxis = r, d3.rebind(x, t, "defined", "isArea", "x", "y", "size", "xScale", "yScale", "xDomain", "yDomain", "xRange", "yRange", "forceX", "forceY", "interactive", "clipEdge", "clipVoronoi", "id", "interpolate", "highlightPoint", "clearHighlights", "interactive"), x.options = e.utils.optionsFunc.bind(x), x.margin = function(e) {
            return arguments.length ? (s.top = typeof e.top != "undefined" ? e.top : s.top, s.right = typeof e.right != "undefined" ? e.right : s.right, s.bottom = typeof e.bottom != "undefined" ? e.bottom : s.bottom, s.left = typeof e.left != "undefined" ? e.left : s.left, x) : s
        }, x.width = function(e) {
            return arguments.length ? (u = e, x) : u
        }, x.height = function(e) {
            return arguments.length ? (a = e, x) : a
        }, x.color = function(t) {
            return arguments.length ? (o = e.utils.getColor(t), i.color(o), x) : o
        }, x.showLegend = function(e) {
            return arguments.length ? (f = e, x) : f
        }, x.showXAxis = function(e) {
            return arguments.length ? (l = e, x) : l
        }, x.showYAxis = function(e) {
            return arguments.length ? (c = e, x) : c
        }, x.rightAlignYAxis = function(e) {
            return arguments.length ? (h = e, r.orient(e ? "right" : "left"), x) : h
        }, x.tooltips = function(e) {
            return arguments.length ? (p = e, x) : p
        }, x.tooltipContent = function(e) {
            return arguments.length ? (d = e, x) : d
        }, x.state = function(e) {
            return arguments.length ? (g = e, x) : g
        }, x.defaultState = function(e) {
            return arguments.length ? (y = e, x) : y
        }, x.noData = function(e) {
            return arguments.length ? (b = e, x) : b
        }, x.transitionDuration = function(e) {
            return arguments.length ? (E = e, x) : E
        }, x
    }, e.models.indentedTree = function() {
        "use strict";

        function g(e) {
            return e.each(function(e) {
                function k(e, t, n) {
                    d3.event.stopPropagation();
                    if (d3.event.shiftKey && !n) return d3.event.shiftKey = !1, e.values && e.values.forEach(function(e) {
                        (e.values || e._values) && k(e, 0, !0)
                    }), !0;
                    if (!O(e)) return !0;
                    e.values ? (e._values = e.values, e.values = null) : (e.values = e._values, e._values = null), g.update()
                }

                function L(e) {
                    return e._values && e._values.length ? h : e.values && e.values.length ? p : ""
                }

                function A(e) {
                    return e._values && e._values.length
                }

                function O(e) {
                    var t = e.values || e._values;
                    return t && t.length
                }
                var t = 1,
                    n = d3.select(this),
                    i = d3.layout.tree().children(function(e) {
                        return e.values
                    }).size([r, f]);
                g.update = function() {
                    n.transition().duration(600).call(g)
                }, e[0] || (e[0] = {
                    key: a
                });
                var s = i.nodes(e[0]),
                    y = d3.select(this).selectAll("div").data([
                        [s]
                    ]),
                    b = y.enter().append("div").attr("class", "nvd3 nv-wrap nv-indentedtree"),
                    w = b.append("table"),
                    E = y.select("table").attr("width", "100%").attr("class", c);
                if (o) {
                    var S = w.append("thead"),
                        x = S.append("tr");
                    l.forEach(function(e) {
                        x.append("th").attr("width", e.width ? e.width : "10%").style("text-align", e.type == "numeric" ? "right" : "left").append("span").text(e.label)
                    })
                }
                var T = E.selectAll("tbody").data(function(e) {
                    return e
                });
                T.enter().append("tbody"), t = d3.max(s, function(e) {
                    return e.depth
                }), i.size([r, t * f]);
                var N = T.selectAll("tr").data(function(e) {
                    return e.filter(function(e) {
                        return u && !e.children ? u(e) : !0
                    })
                }, function(e, t) {
                    return e.id || e.id || ++m
                });
                N.exit().remove(), N.select("img.nv-treeicon").attr("src", L).classed("folded", A);
                var C = N.enter().append("tr");
                l.forEach(function(e, t) {
                    var n = C.append("td").style("padding-left", function(e) {
                        return (t ? 0 : e.depth * f + 12 + (L(e) ? 0 : 16)) + "px"
                    }, "important").style("text-align", e.type == "numeric" ? "right" : "left");
                    t == 0 && n.append("img").classed("nv-treeicon", !0).classed("nv-folded", A).attr("src", L).style("width", "14px").style("height", "14px").style("padding", "0 1px").style("display", function(e) {
                        return L(e) ? "inline-block" : "none"
                    }).on("click", k), n.each(function(n) {
                        !t && v(n) ? d3.select(this).append("a").attr("href", v).attr("class", d3.functor(e.classes)).append("span") : d3.select(this).append("span"), d3.select(this).select("span").attr("class", d3.functor(e.classes)).text(function(t) {
                            return e.format ? e.format(t) : t[e.key] || "-"
                        })
                    }), e.showCount && (n.append("span").attr("class", "nv-childrenCount"), N.selectAll("span.nv-childrenCount").text(function(e) {
                        return e.values && e.values.length || e._values && e._values.length ? "(" + (e.values && e.values.filter(function(e) {
                            return u ? u(e) : !0
                        }).length || e._values && e._values.filter(function(e) {
                            return u ? u(e) : !0
                        }).length || 0) + ")" : ""
                    }))
                }), N.order().on("click", function(e) {
                    d.elementClick({
                        row: this,
                        data: e,
                        pos: [e.x, e.y]
                    })
                }).on("dblclick", function(e) {
                    d.elementDblclick({
                        row: this,
                        data: e,
                        pos: [e.x, e.y]
                    })
                }).on("mouseover", function(e) {
                    d.elementMouseover({
                        row: this,
                        data: e,
                        pos: [e.x, e.y]
                    })
                }).on("mouseout", function(e) {
                    d.elementMouseout({
                        row: this,
                        data: e,
                        pos: [e.x, e.y]
                    })
                })
            }), g
        }
        var t = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            n = 960,
            r = 500,
            i = e.utils.defaultColor(),
            s = Math.floor(Math.random() * 1e4),
            o = !0,
            u = !1,
            a = "No Data Available.",
            f = 20,
            l = [{
                key: "key",
                label: "Name",
                type: "text"
            }],
            c = null,
            h = "images/grey-plus.png",
            p = "images/grey-minus.png",
            d = d3.dispatch("elementClick", "elementDblclick", "elementMouseover", "elementMouseout"),
            v = function(e) {
                return e.url
            },
            m = 0;
        return g.options = e.utils.optionsFunc.bind(g), g.margin = function(e) {
            return arguments.length ? (t.top = typeof e.top != "undefined" ? e.top : t.top, t.right = typeof e.right != "undefined" ? e.right : t.right, t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom, t.left = typeof e.left != "undefined" ? e.left : t.left, g) : t
        }, g.width = function(e) {
            return arguments.length ? (n = e, g) : n
        }, g.height = function(e) {
            return arguments.length ? (r = e, g) : r
        }, g.color = function(t) {
            return arguments.length ? (i = e.utils.getColor(t), scatter.color(i), g) : i
        }, g.id = function(e) {
            return arguments.length ? (s = e, g) : s
        }, g.header = function(e) {
            return arguments.length ? (o = e, g) : o
        }, g.noData = function(e) {
            return arguments.length ? (a = e, g) : a
        }, g.filterZero = function(e) {
            return arguments.length ? (u = e, g) : u
        }, g.columns = function(e) {
            return arguments.length ? (l = e, g) : l
        }, g.tableClass = function(e) {
            return arguments.length ? (c = e, g) : c
        }, g.iconOpen = function(e) {
            return arguments.length ? (h = e, g) : h
        }, g.iconClose = function(e) {
            return arguments.length ? (p = e, g) : p
        }, g.getUrl = function(e) {
            return arguments.length ? (v = e, g) : v
        }, g
    }, e.models.legend = function() {
        "use strict";

        function c(h) {
            return h.each(function(c) {
                var h = n - t.left - t.right,
                    p = d3.select(this),
                    d = p.selectAll("g.nv-legend").data([c]),
                    v = d.enter().append("g").attr("class", "nvd3 nv-legend").append("g"),
                    m = d.select("g");
                d.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var g = m.selectAll(".nv-series").data(function(e) {
                        return e
                    }),
                    y = g.enter().append("g").attr("class", "nv-series").on("mouseover", function(e, t) {
                        l.legendMouseover(e, t)
                    }).on("mouseout", function(e, t) {
                        l.legendMouseout(e, t)
                    }).on("click", function(e, t) {
                        l.legendClick(e, t), a && (f ? (c.forEach(function(e) {
                            e.disabled = !0
                        }), e.disabled = !1) : (e.disabled = !e.disabled, c.every(function(e) {
                            return e.disabled
                        }) && c.forEach(function(e) {
                            e.disabled = !1
                        })), l.stateChange({
                            disabled: c.map(function(e) {
                                return !!e.disabled
                            })
                        }))
                    }).on("dblclick", function(e, t) {
                        l.legendDblclick(e, t), a && (c.forEach(function(e) {
                            e.disabled = !0
                        }), e.disabled = !1, l.stateChange({
                            disabled: c.map(function(e) {
                                return !!e.disabled
                            })
                        }))
                    });
                y.append("circle").style("stroke-width", 2).attr("class", "nv-legend-symbol").attr("r", 5), y.append("text").attr("text-anchor", "start").attr("class", "nv-legend-text").attr("dy", ".32em").attr("dx", "8"), g.classed("disabled", function(e) {
                    return e.disabled
                }), g.exit().remove(), g.select("circle").style("fill", function(e, t) {
                    return e.color || s(e, t)
                }).style("stroke", function(e, t) {
                    return e.color || s(e, t)
                }), g.select("text").text(i);
                if (o) {
                    var b = [];
                    g.each(function(t, n) {
                        var r = d3.select(this).select("text"),
                            i;
                        try {
                            i = r.getComputedTextLength();
                            if (i <= 0) throw Error()
                        } catch (s) {
                            i = e.utils.calcApproxTextWidth(r)
                        }
                        b.push(i + 28)
                    });
                    var w = 0,
                        E = 0,
                        S = [];
                    while (E < h && w < b.length) S[w] = b[w], E += b[w++];
                    w === 0 && (w = 1);
                    while (E > h && w > 1) {
                        S = [], w--;
                        for (var x = 0; x < b.length; x++) b[x] > (S[x % w] || 0) && (S[x % w] = b[x]);
                        E = S.reduce(function(e, t, n, r) {
                            return e + t
                        })
                    }
                    var T = [];
                    for (var N = 0, C = 0; N < w; N++) T[N] = C, C += S[N];
                    g.attr("transform", function(e, t) {
                        return "translate(" + T[t % w] + "," + (5 + Math.floor(t / w) * 20) + ")"
                    }), u ? m.attr("transform", "translate(" + (n - t.right - E) + "," + t.top + ")") : m.attr("transform", "translate(0," + t.top + ")"), r = t.top + t.bottom + Math.ceil(b.length / w) * 20
                } else {
                    var k = 5,
                        L = 5,
                        A = 0,
                        O;
                    g.attr("transform", function(e, r) {
                        var i = d3.select(this).select("text").node().getComputedTextLength() + 28;
                        return O = L, n < t.left + t.right + O + i && (L = O = 5, k += 20), L += i, L > A && (A = L), "translate(" + O + "," + k + ")"
                    }), m.attr("transform", "translate(" + (n - t.right - A) + "," + t.top + ")"), r = t.top + t.bottom + k + 15
                }
            }), c
        }
        var t = {
                top: 5,
                right: 0,
                bottom: 5,
                left: 0
            },
            n = 400,
            r = 20,
            i = function(e) {
                return e.key
            },
            s = e.utils.defaultColor(),
            o = !0,
            u = !0,
            a = !0,
            f = !1,
            l = d3.dispatch("legendClick", "legendDblclick", "legendMouseover", "legendMouseout", "stateChange");
        return c.dispatch = l, c.options = e.utils.optionsFunc.bind(c), c.margin = function(e) {
            return arguments.length ? (t.top = typeof e.top != "undefined" ? e.top : t.top, t.right = typeof e.right != "undefined" ? e.right : t.right, t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom, t.left = typeof e.left != "undefined" ? e.left : t.left, c) : t
        }, c.width = function(e) {
            return arguments.length ? (n = e, c) : n
        }, c.height = function(e) {
            return arguments.length ? (r = e, c) : r
        }, c.key = function(e) {
            return arguments.length ? (i = e, c) : i
        }, c.color = function(t) {
            return arguments.length ? (s = e.utils.getColor(t), c) : s
        }, c.align = function(e) {
            return arguments.length ? (o = e, c) : o
        }, c.rightAlign = function(e) {
            return arguments.length ? (u = e, c) : u
        }, c.updateState = function(e) {
            return arguments.length ? (a = e, c) : a
        }, c.radioButtonMode = function(e) {
            return arguments.length ? (f = e, c) : f
        }, c
    }, e.models.line = function() {
        "use strict";

        function m(g) {
            return g.each(function(m) {
                var g = r - n.left - n.right,
                    b = i - n.top - n.bottom,
                    w = d3.select(this);
                c = t.xScale(), h = t.yScale(), d = d || c, v = v || h;
                var E = w.selectAll("g.nv-wrap.nv-line").data([m]),
                    S = E.enter().append("g").attr("class", "nvd3 nv-wrap nv-line"),
                    T = S.append("defs"),
                    N = S.append("g"),
                    C = E.select("g");
                N.append("g").attr("class", "nv-groups"), N.append("g").attr("class", "nv-scatterWrap"), E.attr("transform", "translate(" + n.left + "," + n.top + ")"), t.width(g).height(b);
                var k = E.select(".nv-scatterWrap");
                k.transition().call(t), T.append("clipPath").attr("id", "nv-edge-clip-" + t.id()).append("rect"), E.select("#nv-edge-clip-" + t.id() + " rect").attr("width", g).attr("height", b), C.attr("clip-path", l ? "url(#nv-edge-clip-" + t.id() + ")" : ""), k.attr("clip-path", l ? "url(#nv-edge-clip-" + t.id() + ")" : "");
                var L = E.select(".nv-groups").selectAll(".nv-group").data(function(e) {
                    return e
                }, function(e) {
                    return e.key
                });
                L.enter().append("g").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6), L.exit().remove(), L.attr("class", function(e, t) {
                    return "nv-group nv-series-" + t
                }).classed("hover", function(e) {
                    return e.hover
                }).style("fill", function(e, t) {
                    return s(e, t)
                }).style("stroke", function(e, t) {
                    return s(e, t)
                }), L.transition().style("stroke-opacity", 1).style("fill-opacity", .5);
                var A = L.selectAll("path.nv-area").data(function(e) {
                    return f(e) ? [e] : []
                });
                A.enter().append("path").attr("class", "nv-area").attr("d", function(t) {
                    return d3.svg.area().interpolate(p).defined(a).x(function(t, n) {
                        return e.
                        utils.NaNtoZero(d(o(t, n)))
                    }).y0(function(t, n) {
                        return e.utils.NaNtoZero(v(u(t, n)))
                    }).y1(function(e, t) {
                        return v(h.domain()[0] <= 0 ? h.domain()[1] >= 0 ? 0 : h.domain()[1] : h.domain()[0])
                    }).apply(this, [t.values])
                }), L.exit().selectAll("path.nv-area").remove(), A.transition().attr("d", function(t) {
                    return d3.svg.area().interpolate(p).defined(a).x(function(t, n) {
                        return e.utils.NaNtoZero(c(o(t, n)))
                    }).y0(function(t, n) {
                        return e.utils.NaNtoZero(h(u(t, n)))
                    }).y1(function(e, t) {
                        return h(h.domain()[0] <= 0 ? h.domain()[1] >= 0 ? 0 : h.domain()[1] : h.domain()[0])
                    }).apply(this, [t.values])
                });
                var O = L.selectAll("path.nv-line").data(function(e) {
                    return [e.values]
                });
                O.enter().append("path").attr("class", "nv-line").attr("d", d3.svg.line().interpolate(p).defined(a).x(function(t, n) {
                    return e.utils.NaNtoZero(d(o(t, n)))
                }).y(function(t, n) {
                    return e.utils.NaNtoZero(v(u(t, n)))
                })), O.transition().attr("d", d3.svg.line().interpolate(p).defined(a).x(function(t, n) {
                    return e.utils.NaNtoZero(c(o(t, n)))
                }).y(function(t, n) {
                    return e.utils.NaNtoZero(h(u(t, n)))
                })), d = c.copy(), v = h.copy()
            }), m
        }
        var t = e.models.scatter(),
            n = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            r = 960,
            i = 500,
            s = e.utils.defaultColor(),
            o = function(e) {
                return e.x
            },
            u = function(e) {
                return e.y
            },
            a = function(e, t) {
                return !isNaN(u(e, t)) && u(e, t) !== null
            },
            f = function(e) {
                return e.area
            },
            l = !1,
            c, h, p = "linear";
        t.size(16).sizeDomain([16, 256]);
        var d, v;
        return m.dispatch = t.dispatch, m.scatter = t, d3.rebind(m, t, "id", "interactive", "size", "xScale", "yScale", "zScale", "xDomain", "yDomain", "xRange", "yRange", "sizeDomain", "forceX", "forceY", "forceSize", "clipVoronoi", "useVoronoi", "clipRadius", "padData", "highlightPoint", "clearHighlights"), m.options = e.utils.optionsFunc.bind(m), m.margin = function(e) {
            return arguments.length ? (n.top = typeof e.top != "undefined" ? e.top : n.top, n.right = typeof e.right != "undefined" ? e.right : n.right, n.bottom = typeof e.bottom != "undefined" ? e.bottom : n.bottom, n.left = typeof e.left != "undefined" ? e.left : n.left, m) : n
        }, m.width = function(e) {
            return arguments.length ? (r = e, m) : r
        }, m.height = function(e) {
            return arguments.length ? (i = e, m) : i
        }, m.x = function(e) {
            return arguments.length ? (o = e, t.x(e), m) : o
        }, m.y = function(e) {
            return arguments.length ? (u = e, t.y(e), m) : u
        }, m.clipEdge = function(e) {
            return arguments.length ? (l = e, m) : l
        }, m.color = function(n) {
            return arguments.length ? (s = e.utils.getColor(n), t.color(s), m) : s
        }, m.interpolate = function(e) {
            return arguments.length ? (p = e, m) : p
        }, m.defined = function(e) {
            return arguments.length ? (a = e, m) : a
        }, m.isArea = function(e) {
            return arguments.length ? (f = d3.functor(e), m) : f
        }, m
    }, e.models.lineChart = function() {
        "use strict";

        function N(m) {
            return m.each(function(m) {
                var C = d3.select(this),
                    k = this,
                    L = (a || parseInt(C.style("width")) || 960) - o.left - o.right,
                    A = (f || parseInt(C.style("height")) || 400) - o.top - o.bottom;
                N.update = function() {
                    C.transition().duration(x).call(N)
                }, N.container = this, b.disabled = m.map(function(e) {
                    return !!e.disabled
                });
                if (!w) {
                    var O;
                    w = {};
                    for (O in b) b[O] instanceof Array ? w[O] = b[O].slice(0) : w[O] = b[O]
                }
                if (!m || !m.length || !m.filter(function(e) {
                    return e.values.length
                }).length) {
                    var M = C.selectAll(".nv-noData").data([E]);
                    return M.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"), M.attr("x", o.left + L / 2).attr("y", o.top + A / 2).text(function(e) {
                        return e
                    }), N
                }
                C.selectAll(".nv-noData").remove(), g = t.xScale(), y = t.yScale();
                var _ = C.selectAll("g.nv-wrap.nv-lineChart").data([m]),
                    D = _.enter().append("g").attr("class", "nvd3 nv-wrap nv-lineChart").append("g"),
                    P = _.select("g");
                D.append("rect").style("opacity", 0), D.append("g").attr("class", "nv-x nv-axis"), D.append("g").attr("class", "nv-y nv-axis"), D.append("g").attr("class", "nv-linesWrap"), D.append("g").attr("class", "nv-legendWrap"), D.append("g").attr("class", "nv-interactive"), P.select("rect").attr("width", L).attr("height", A > 0 ? A : 0), l && (i.width(L), P.select(".nv-legendWrap").datum(m).call(i), o.top != i.height() && (o.top = i.height(), A = (f || parseInt(C.style("height")) || 400) - o.top - o.bottom), _.select(".nv-legendWrap").attr("transform", "translate(0," + -o.top + ")")), _.attr("transform", "translate(" + o.left + "," + o.top + ")"), p && P.select(".nv-y.nv-axis").attr("transform", "translate(" + L + ",0)"), d && (s.width(L).height(A).margin({
                    left: o.left,
                    top: o.top
                }).svgContainer(C).xScale(g), _.select(".nv-interactive").call(s)), t.width(L).height(A).color(m.map(function(e, t) {
                    return e.color || u(e, t)
                }).filter(function(e, t) {
                    return !m[t].disabled
                }));
                var H = P.select(".nv-linesWrap").datum(m.filter(function(e) {
                    return !e.disabled
                }));
                H.transition().call(t), c && (n.scale(g).ticks(L / 100).tickSize(-A, 0), P.select(".nv-x.nv-axis").attr("transform", "translate(0," + y.range()[0] + ")"), P.select(".nv-x.nv-axis").transition().call(n)), h && (r.scale(y).ticks(A / 36).tickSize(-L, 0), P.select(".nv-y.nv-axis").transition().call(r)), i.dispatch.on("stateChange", function(e) {
                    b = e, S.stateChange(b), N.update()
                }), s.dispatch.on("elementMousemove", function(i) {
                    t.clearHighlights();
                    var a, f, l, c = [];
                    m.filter(function(e, t) {
                        return e.seriesIndex = t, !e.disabled
                    }).forEach(function(n, r) {
                        f = e.interactiveBisect(n.values, i.pointXValue, N.x()), t.highlightPoint(r, f, !0);
                        var s = n.values[f];
                        if (typeof s == "undefined") return;
                        typeof a == "undefined" && (a = s), typeof l == "undefined" && (l = N.xScale()(N.x()(s, f))), c.push({
                            key: n.key,
                            value: N.y()(s, f),
                            color: u(n, n.seriesIndex)
                        })
                    });
                    if (c.length > 2) {
                        var h = N.yScale().invert(i.mouseY),
                            p = Math.abs(N.yScale().domain()[0] - N.yScale().domain()[1]),
                            d = .03 * p,
                            g = e.nearestValueIndex(c.map(function(e) {
                                return e.value
                            }), h, d);
                        g !== null && (c[g].highlight = !0)
                    }
                    var y = n.tickFormat()(N.x()(a, f));
                    s.tooltip.position({
                        left: l + o.left,
                        top: i.mouseY + o.top
                    }).chartContainer(k.parentNode).enabled(v).valueFormatter(function(e, t) {
                        return r.tickFormat()(e)
                    }).data({
                        value: y,
                        series: c
                    })(), s.renderGuideLine(l)
                }), s.dispatch.on("elementMouseout", function(e) {
                    S.tooltipHide(), t.clearHighlights()
                }), S.on("tooltipShow", function(e) {
                    v && T(e, k.parentNode)
                }), S.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && m.length === e.disabled.length && (m.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }), b.disabled = e.disabled), N.update()
                })
            }), N
        }
        var t = e.models.line(),
            n = e.models.axis(),
            r = e.models.axis(),
            i = e.models.legend(),
            s = e.interactiveGuideline(),
            o = {
                top: 30,
                right: 20,
                bottom: 50,
                left: 60
            },
            u = e.utils.defaultColor(),
            a = null,
            f = null,
            l = !0,
            c = !0,
            h = !0,
            p = !1,
            d = !1,
            v = !0,
            m = function(e, t, n, r, i) {
                return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>"
            },
            g, y, b = {},
            w = null,
            E = "No Data Available.",
            S = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"),
            x = 250;
        n.orient("bottom").tickPadding(7), r.orient(p ? "right" : "left");
        var T = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0),
                u = i.pos[1] + (s.offsetTop || 0),
                a = n.tickFormat()(t.x()(i.point, i.pointIndex)),
                f = r.tickFormat()(t.y()(i.point, i.pointIndex)),
                l = m(i.series.key, a, f, i, N);
            e.tooltip.show([o, u], l, null, null, s)
        };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + o.left, e.pos[1] + o.top], S.tooltipShow(e)
        }), t.dispatch.on("elementMouseout.tooltip", function(e) {
            S.tooltipHide(e)
        }), S.on("tooltipHide", function() {
            v && e.tooltip.cleanup()
        }), N.dispatch = S, N.lines = t, N.legend = i, N.xAxis = n, N.yAxis = r, N.interactiveLayer = s, d3.rebind(N, t, "defined", "isArea", "x", "y", "size", "xScale", "yScale", "xDomain", "yDomain", "xRange", "yRange", "forceX", "forceY", "interactive", "clipEdge", "clipVoronoi", "useVoronoi", "id", "interpolate"), N.options = e.utils.optionsFunc.bind(N), N.margin = function(e) {
            return arguments.length ? (o.top = typeof e.top != "undefined" ? e.top : o.top, o.right = typeof e.right != "undefined" ? e.right : o.right, o.bottom = typeof e.bottom != "undefined" ? e.bottom : o.bottom, o.left = typeof e.left != "undefined" ? e.left : o.left, N) : o
        }, N.width = function(e) {
            return arguments.length ? (a = e, N) : a
        }, N.height = function(e) {
            return arguments.length ? (f = e, N) : f
        }, N.color = function(t) {
            return arguments.length ? (u = e.utils.getColor(t), i.color(u), N) : u
        }, N.showLegend = function(e) {
            return arguments.length ? (l = e, N) : l
        }, N.showXAxis = function(e) {
            return arguments.length ? (c = e, N) : c
        }, N.showYAxis = function(e) {
            return arguments.length ? (h = e, N) : h
        }, N.rightAlignYAxis = function(e) {
            return arguments.length ? (p = e, r.orient(e ? "right" : "left"), N) : p
        }, N.useInteractiveGuideline = function(e) {
            return arguments.length ? (d = e, e === !0 && (N.interactive(!1), N.useVoronoi(!1)), N) : d
        }, N.tooltips = function(e) {
            return arguments.length ? (v = e, N) : v
        }, N.tooltipContent = function(e) {
            return arguments.length ? (m = e, N) : m
        }, N.state = function(e) {
            return arguments.length ? (b = e, N) : b
        }, N.defaultState = function(e) {
            return arguments.length ? (w = e, N) : w
        }, N.noData = function(e) {
            return arguments.length ? (E = e, N) : E
        }, N.transitionDuration = function(e) {
            return arguments.length ? (x = e, N) : x
        }, N
    }, e.models.linePlusBarChart = function() {
        "use strict";

        function T(e) {
            return e.each(function(e) {
                var l = d3.select(this),
                    c = this,
                    v = (a || parseInt(l.style("width")) || 960) - u.left - u.right,
                    N = (f || parseInt(l.style("height")) || 400) - u.top - u.bottom;
                T.update = function() {
                    l.transition().call(T)
                }, b.disabled = e.map(function(e) {
                    return !!e.disabled
                });
                if (!w) {
                    var C;
                    w = {};
                    for (C in b) b[C] instanceof Array ? w[C] = b[C].slice(0) : w[C] = b[C]
                }
                if (!e || !e.length || !e.filter(function(e) {
                    return e.values.length
                }).length) {
                    var k = l.selectAll(".nv-noData").data([E]);
                    return k.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"), k.attr("x", u.left + v / 2).attr("y", u.top + N / 2).text(function(e) {
                        return e
                    }), T
                }
                l.selectAll(".nv-noData").remove();
                var L = e.filter(function(e) {
                        return !e.disabled && e.bar
                    }),
                    A = e.filter(function(e) {
                        return !e.bar
                    });
                m = A.filter(function(e) {
                    return !e.disabled
                }).length && A.filter(function(e) {
                    return !e.disabled
                })[0].values.length ? t.xScale() : n.xScale(), g = n.yScale(), y = t.yScale();
                var O = d3.select(this).selectAll("g.nv-wrap.nv-linePlusBar").data([e]),
                    M = O.enter().append("g").attr("class", "nvd3 nv-wrap nv-linePlusBar").append("g"),
                    _ = O.select("g");
                M.append("g").attr("class", "nv-x nv-axis"), M.append("g").attr("class", "nv-y1 nv-axis"), M.append("g").attr("class", "nv-y2 nv-axis"), M.append("g").attr("class", "nv-barsWrap"), M.append("g").attr("class", "nv-linesWrap"), M.append("g").attr("class", "nv-legendWrap"), p && (o.width(v / 2), _.select(".nv-legendWrap").datum(e.map(function(e) {
                    return e.originalKey = e.originalKey === undefined ? e.key : e.originalKey, e.key = e.originalKey + (e.bar ? " (left axis)" : " (right axis)"), e
                })).call(o), u.top != o.height() && (u.top = o.height(), N = (f || parseInt(l.style("height")) || 400) - u.top - u.bottom), _.select(".nv-legendWrap").attr("transform", "translate(" + v / 2 + "," + -u.top + ")")), O.attr("transform", "translate(" + u.left + "," + u.top + ")"), t.width(v).height(N).color(e.map(function(e, t) {
                    return e.color || h(e, t)
                }).filter(function(t, n) {
                    return !e[n].disabled && !e[n].bar
                })), n.width(v).height(N).color(e.map(function(e, t) {
                    return e.color || h(e, t)
                }).filter(function(t, n) {
                    return !e[n].disabled && e[n].bar
                }));
                var D = _.select(".nv-barsWrap").datum(L.length ? L : [{
                        values: []
                    }]),
                    P = _.select(".nv-linesWrap").datum(A[0] && !A[0].disabled ? A : [{
                        values: []
                    }]);
                d3.transition(D).call(n), d3.transition(P).call(t), r.scale(m).ticks(v / 100).tickSize(-N, 0), _.select(".nv-x.nv-axis").attr("transform", "translate(0," + g.range()[0] + ")"), d3.transition(_.select(".nv-x.nv-axis")).call(r), i.scale(g).ticks(N / 36).tickSize(-v, 0), d3.transition(_.select(".nv-y1.nv-axis")).style("opacity", L.length ? 1 : 0).call(i), s.scale(y).ticks(N / 36).tickSize(L.length ? 0 : -v, 0), _.select(".nv-y2.nv-axis").style("opacity", A.length ? 1 : 0).attr("transform", "translate(" + v + ",0)"), d3.transition(_.select(".nv-y2.nv-axis")).call(s), o.dispatch.on("stateChange", function(e) {
                    b = e, S.stateChange(b), T.update()
                }), S.on("tooltipShow", function(e) {
                    d && x(e, c.parentNode)
                }), S.on("changeState", function(t) {
                    typeof t.disabled != "undefined" && (e.forEach(function(e, n) {
                        e.disabled = t.disabled[n]
                    }), b.disabled = t.disabled), T.update()
                })
            }), T
        }
        var t = e.models.line(),
            n = e.models.historicalBar(),
            r = e.models.axis(),
            i = e.models.axis(),
            s = e.models.axis(),
            o = e.models.legend(),
            u = {
                top: 30,
                right: 60,
                bottom: 50,
                left: 60
            },
            a = null,
            f = null,
            l = function(e) {
                return e.x
            },
            c = function(e) {
                return e.y
            },
            h = e.utils.defaultColor(),
            p = !0,
            d = !0,
            v = function(e, t, n, r, i) {
                return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>"
            },
            m, g, y, b = {},
            w = null,
            E = "No Data Available.",
            S = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState");
        n.padData(!0), t.clipEdge(!1).padData(!0), r.orient("bottom").tickPadding(7).highlightZero(!1), i.orient("left"), s.orient("right");
        var x = function(n, o) {
            var u = n.pos[0] + (o.offsetLeft || 0),
                a = n.pos[1] + (o.offsetTop || 0),
                f = r.tickFormat()(t.x()(n.point, n.pointIndex)),
                l = (n.series.bar ? i : s).tickFormat()(t.y()(n.point, n.pointIndex)),
                c = v(n.series.key, f, l, n, T);
            e.tooltip.show([u, a], c, n.value < 0 ? "n" : "s", null, o)
        };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + u.left, e.pos[1] + u.top], S.tooltipShow(e)
        }), t.dispatch.on("elementMouseout.tooltip", function(e) {
            S.tooltipHide(e)
        }), n.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + u.left, e.pos[1] + u.top], S.tooltipShow(e)
        }), n.dispatch.on("elementMouseout.tooltip", function(e) {
            S.tooltipHide(e)
        }), S.on("tooltipHide", function() {
            d && e.tooltip.cleanup()
        }), T.dispatch = S, T.legend = o, T.lines = t, T.bars = n, T.xAxis = r, T.y1Axis = i, T.y2Axis = s, d3.rebind(T, t, "defined", "size", "clipVoronoi", "interpolate"), T.options = e.utils.optionsFunc.bind(T), T.x = function(e) {
            return arguments.length ? (l = e, t.x(e), n.x(e), T) : l
        }, T.y = function(e) {
            return arguments.length ? (c = e, t.y(e), n.y(e), T) : c
        }, T.margin = function(e) {
            return arguments.length ? (u.top = typeof e.top != "undefined" ? e.top : u.top, u.right = typeof e.right != "undefined" ? e.right : u.right, u.bottom = typeof e.bottom != "undefined" ? e.bottom : u.bottom, u.left = typeof e.left != "undefined" ? e.left : u.left, T) : u
        }, T.width = function(e) {
            return arguments.length ? (a = e, T) : a
        }, T.height = function(e) {
            return arguments.length ? (f = e, T) : f
        }, T.color = function(t) {
            return arguments.length ? (h = e.utils.getColor(t), o.color(h), T) : h
        }, T.showLegend = function(e) {
            return arguments.length ? (p = e, T) : p
        }, T.tooltips = function(e) {
            return arguments.length ? (d = e, T) : d
        }, T.tooltipContent = function(e) {
            return arguments.length ? (v = e, T) : v
        }, T.state = function(e) {
            return arguments.length ? (b = e, T) : b
        }, T.defaultState = function(e) {
            return arguments.length ? (w = e, T) : w
        }, T.noData = function(e) {
            return arguments.length ? (E = e, T) : E
        }, T
    }, e.models.lineWithFocusChart = function() {
        "use strict";

        function k(e) {
            return e.each(function(e) {
                function U(e) {
                    var t = +(e == "e"),
                        n = t ? 1 : -1,
                        r = M / 3;
                    return "M" + .5 * n + "," + r + "A6,6 0 0 " + t + " " + 6.5 * n + "," + (r + 6) + "V" + (2 * r - 6) + "A6,6 0 0 " + t + " " + .5 * n + "," + 2 * r + "Z" + "M" + 2.5 * n + "," + (r + 8) + "V" + (2 * r - 8) + "M" + 4.5 * n + "," + (r + 8) + "V" + (2 * r - 8)
                }

                function z() {
                    a.empty() || a.extent(w), I.data([a.empty() ? g.domain() : w]).each(function(e, t) {
                        var n = g(e[0]) - v.range()[0],
                            r = v.range()[1] - g(e[1]);
                        d3.select(this).select(".left").attr("width", n < 0 ? 0 : n), d3.select(this).select(".right").attr("x", g(e[1])).attr("width", r < 0 ? 0 : r)
                    })
                }

                function W() {
                    w = a.empty() ? null : a.extent();
                    var n = a.empty() ? g.domain() : a.extent();
                    if (Math.abs(n[0] - n[1]) <= 1) return;
                    T.brush({
                        extent: n,
                        brush: a
                    }), z();
                    var s = H.select(".nv-focus .nv-linesWrap").datum(e.filter(function(e) {
                        return !e.disabled
                    }).map(function(e, r) {
                        return {
                            key: e.key,
                            values: e.values.filter(function(e, r) {
                                return t.x()(e, r) >= n[0] && t.x()(e, r) <= n[1]
                            })
                        }
                    }));
                    s.transition().duration(N).call(t), H.select(".nv-focus .nv-x.nv-axis").transition().duration(N).call(r), H.select(".nv-focus .nv-y.nv-axis").transition().duration(N).call(i)
                }
                var S = d3.select(this),
                    L = this,
                    A = (h || parseInt(S.style("width")) || 960) - f.left - f.right,
                    O = (p || parseInt(S.style("height")) || 400) - f.top - f.bottom - d,
                    M = d - l.top - l.bottom;
                k.update = function() {
                    S.transition().duration(N).call(k)
                }, k.container = this;
                if (!e || !e.length || !e.filter(function(e) {
                    return e.values.length
                }).length) {
                    var _ = S.selectAll(".nv-noData").data([x]);
                    return _.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"), _.attr("x", f.left + A / 2).attr("y", f.top + O / 2).text(function(e) {
                        return e
                    }), k
                }
                S.selectAll(".nv-noData").remove(), v = t.xScale(), m = t.yScale(), g = n.xScale(), y = n.yScale();
                var D = S.selectAll("g.nv-wrap.nv-lineWithFocusChart").data([e]),
                    P = D.enter().append("g").attr("class", "nvd3 nv-wrap nv-lineWithFocusChart").append("g"),
                    H = D.select("g");
                P.append("g").attr("class", "nv-legendWrap");
                var B = P.append("g").attr("class", "nv-focus");
                B.append("g").attr("class", "nv-x nv-axis"), B.append("g").attr("class", "nv-y nv-axis"), B.append("g").attr("class", "nv-linesWrap");
                var j = P.append("g").attr("class", "nv-context");
                j.append("g").attr("class", "nv-x nv-axis"), j.append("g").attr("class", "nv-y nv-axis"), j.append("g").attr("class", "nv-linesWrap"), j.append("g").attr("class", "nv-brushBackground"), j.append("g").attr("class", "nv-x nv-brush"), b && (u.width(A), H.select(".nv-legendWrap").datum(e).call(u), f.top != u.height() && (f.top = u.height(), O = (p || parseInt(S.style("height")) || 400) - f.top - f.bottom - d), H.select(".nv-legendWrap").attr("transform", "translate(0," + -f.top + ")")), D.attr("transform", "translate(" + f.left + "," + f.top + ")"), t.width(A).height(O).color(e.map(function(e, t) {
                    return e.color || c(e, t)
                }).filter(function(t, n) {
                    return !e[n].disabled
                })), n.defined(t.defined()).width(A).height(M).color(e.map(function(e, t) {
                    return e.color || c(e, t)
                }).filter(function(t, n) {
                    return !e[n].disabled
                })), H.select(".nv-context").attr("transform", "translate(0," + (O + f.bottom + l.top) + ")");
                var F = H.select(".nv-context .nv-linesWrap").datum(e.filter(function(e) {
                    return !e.disabled
                }));
                d3.transition(F).call(n), r.scale(v).ticks(A / 100).tickSize(-O, 0), i.scale(m).ticks(O / 36).tickSize(-A, 0), H.select(".nv-focus .nv-x.nv-axis").attr("transform", "translate(0," + O + ")"), a.x(g).on("brush", function() {
                    var e = k.transitionDuration();
                    k.transitionDuration(0), W(), k.transitionDuration(e)
                }), w && a.extent(w);
                var I = H.select(".nv-brushBackground").selectAll("g").data([w || a.extent()]),
                    q = I.enter().append("g");
                q.append("rect").attr("class", "left").attr("x", 0).attr("y", 0).attr("height", M), q.append("rect").attr("class", "right").attr("x", 0).attr("y", 0).attr("height", M);
                var R = H.select(".nv-x.nv-brush").call(a);
                R.selectAll("rect").attr("height", M), R.selectAll(".resize").append("path").attr("d", U), W(), s.scale(g).ticks(A / 100).tickSize(-M, 0), H.select(".nv-context .nv-x.nv-axis").attr("transform", "translate(0," + y.range()[0] + ")"), d3.transition(H.select(".nv-context .nv-x.nv-axis")).call(s), o.scale(y).ticks(M / 36).tickSize(-A, 0), d3.transition(H.select(".nv-context .nv-y.nv-axis")).call(o), H.select(".nv-context .nv-x.nv-axis").attr("transform", "translate(0," + y.range()[0] + ")"), u.dispatch.on("stateChange", function(e) {
                    k.update()
                }), T.on("tooltipShow", function(e) {
                    E && C(e, L.parentNode)
                })
            }), k
        }
        var t = e.models.line(),
            n = e.models.line(),
            r = e.models.axis(),
            i = e.models.axis(),
            s = e.models.axis(),
            o = e.models.axis(),
            u = e.models.legend(),
            a = d3.svg.brush(),
            f = {
                top: 30,
                right: 30,
                bottom: 30,
                left: 60
            },
            l = {
                top: 0,
                right: 30,
                bottom: 20,
                left: 60
            },
            c = e.utils.defaultColor(),
            h = null,
            p = null,
            d = 100,
            v, m, g, y, b = !0,
            w = null,
            E = !0,
            S = function(e, t, n, r, i) {
                return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>"
            },
            x = "No Data Available.",
            T = d3.dispatch("tooltipShow", "tooltipHide", "brush"),
            N = 250;
        t.clipEdge(!0), n.interactive(!1), r.orient("bottom").tickPadding(5), i.orient("left"), s.orient("bottom").tickPadding(5), o.orient("left");
        var C = function(n, s) {
            var o = n.pos[0] + (s.offsetLeft || 0),
                u = n.pos[1] + (s.offsetTop || 0),
                a = r.tickFormat()(t.x()(n.point, n.pointIndex)),
                f = i.tickFormat()(t.y()(n.point, n.pointIndex)),
                l = S(n.series.key, a, f, n, k);
            e.tooltip.show([o, u], l, null, null, s)
        };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + f.left, e.pos[1] + f.top], T.tooltipShow(e)
        }), t.dispatch.on("elementMouseout.tooltip", function(e) {
            T.tooltipHide(e)
        }), T.on("tooltipHide", function() {
            E && e.tooltip.cleanup()
        }), k.dispatch = T, k.legend = u, k.lines = t, k.lines2 = n, k.xAxis = r, k.yAxis = i, k.x2Axis = s, k.y2Axis = o, d3.rebind(k, t, "defined", "isArea", "size", "xDomain", "yDomain", "xRange", "yRange", "forceX", "forceY", "interactive", "clipEdge", "clipVoronoi", "id"), k.options = e.utils.optionsFunc.bind(k), k.x = function(e) {
            return arguments.length ? (t.x(e), n.x(e), k) : t.x
        }, k.y = function(e) {
            return arguments.length ? (t.y(e), n.y(e), k) : t.y
        }, k.margin = function(e) {
            return arguments.length ? (f.top = typeof e.top != "undefined" ? e.top : f.top, f.right = typeof e.right != "undefined" ? e.right : f.right, f.bottom = typeof e.bottom != "undefined" ? e.bottom : f.bottom, f.left = typeof e.left != "undefined" ? e.left : f.left, k) : f
        }, k.margin2 = function(e) {
            return arguments.length ? (l = e, k) : l
        }, k.width = function(e) {
            return arguments.length ? (h = e, k) : h
        }, k.height = function(e) {
            return arguments.length ? (p = e, k) : p
        }, k.height2 = function(e) {
            return arguments.length ? (d = e, k) : d
        }, k.color = function(t) {
            return arguments.length ? (c = e.utils.getColor(t), u.color(c), k) : c
        }, k.showLegend = function(e) {
            return arguments.length ? (b = e, k) : b
        }, k.tooltips = function(e) {
            return arguments.length ? (E = e, k) : E
        }, k.tooltipContent = function(e) {
            return arguments.length ? (S = e, k) : S
        }, k.interpolate = function(e) {
            return arguments.length ? (t.interpolate(e), n.interpolate(e), k) : t.interpolate()
        }, k.noData = function(e) {
            return arguments.length ? (x = e, k) : x
        }, k.xTickFormat = function(e) {
            return arguments.length ? (r.tickFormat(e), s.tickFormat(e), k) : r.tickFormat()
        }, k.yTickFormat = function(e) {
            return arguments.length ? (i.tickFormat(e), o.tickFormat(e), k) : i.tickFormat()
        }, k.brushExtent = function(e) {
            return arguments.length ? (w = e, k) : w
        }, k.transitionDuration = function(e) {
            return arguments.length ? (N = e, k) : N
        }, k
    }, e.models.linePlusBarWithFocusChart = function() {
        "use strict";

        function B(e) {
            return e.each(function(e) {
                function nt(e) {
                    var t = +(e == "e"),
                        n = t ? 1 : -1,
                        r = q / 3;
                    return "M" + .5 * n + "," + r + "A6,6 0 0 " + t + " " + 6.5 * n + "," + (r + 6) + "V" + (2 * r - 6) + "A6,6 0 0 " + t + " " + .5 * n + "," + 2 * r + "Z" + "M" + 2.5 * n + "," + (r + 8) + "V" + (2 * r - 8) + "M" + 4.5 * n + "," + (r + 8) + "V" + (2 * r - 8)
                }

                function rt() {
                    h.empty() || h.extent(x), Z.data([h.empty() ? k.domain() : x]).each(function(e, t) {
                        var n = k(e[0]) - k.range()[0],
                            r = k.range()[1] - k(e[1]);
                        d3.select(this).select(".left").attr("width", n < 0 ? 0 : n), d3.select(this).select(".right").attr("x", k(e[1])).attr("width", r < 0 ? 0 : r)
                    })
                }

                function it() {
                    x = h.empty() ? null : h.extent(), S = h.empty() ? k.domain() : h.extent(), D.brush({
                        extent: S,
                        brush: h
                    }), rt(), r.width(F).height(I).color(e.map(function(e, t) {
                        return e.color || w(e, t)
                    }).filter(function(t, n) {
                        return !e[n].disabled && e[n].bar
                    })), t.width(F).height(I).color(e.map(function(e, t) {
                        return e.color || w(e, t)
                    }).filter(function(t, n) {
                        return !e[n].disabled && !e[n].bar
                    }));
                    var n = J.select(".nv-focus .nv-barsWrap").datum(U.length ? U.map(function(e, t) {
                            return {
                                key: e.key,
                                values: e.values.filter(function(e, t) {
                                    return r.x()(e, t) >= S[0] && r.x()(e, t) <= S[1]
                                })
                            }
                        }) : [{
                            values: []
                        }]),
                        i = J.select(".nv-focus .nv-linesWrap").datum(z[0].disabled ? [{
                            values: []
                        }] : z.map(function(e, n) {
                            return {
                                key: e.key,
                                values: e.values.filter(function(e, n) {
                                    return t.x()(e, n) >= S[0] && t.x()(e, n) <= S[1]
                                })
                            }
                        }));
                    U.length ? C = r.xScale() : C = t.xScale(), s.scale(C).ticks(F / 100).tickSize(-I, 0), s.domain([Math.ceil(S[0]), Math.floor(S[1])]), J.select(".nv-x.nv-axis").transition().duration(P).call(s), n.transition().duration(P).call(r), i.transition().duration(P).call(t), J.select(".nv-focus .nv-x.nv-axis").attr("transform", "translate(0," + L.range()[0] + ")"), u.scale(L).ticks(I / 36).tickSize(-F, 0), J.select(".nv-focus .nv-y1.nv-axis").style("opacity", U.length ? 1 : 0), a.scale(A).ticks(I / 36).tickSize(U.length ? 0 : -F, 0), J.select(".nv-focus .nv-y2.nv-axis").style("opacity", z.length ? 1 : 0).attr("transform", "translate(" + C.range()[1] + ",0)"), J.select(".nv-focus .nv-y1.nv-axis").transition().duration(P).call(u), J.select(".nv-focus .nv-y2.nv-axis").transition().duration(P).call(a)
                }
                var N = d3.select(this),
                    j = this,
                    F = (v || parseInt(N.style("width")) || 960) - p.left - p.right,
                    I = (m || parseInt(N.style("height")) || 400) - p.top - p.bottom - g,
                    q = g - d.top - d.bottom;
                B.update = function() {
                    N.transition().duration(P).call(B)
                }, B.container = this;
                if (!e || !e.length || !e.filter(function(e) {
                    return e.values.length
                }).length) {
                    var R = N.selectAll(".nv-noData").data([_]);
                    return R.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"), R.attr("x", p.left + F / 2).attr("y", p.top + I / 2).text(function(e) {
                        return e
                    }), B
                }
                N.selectAll(".nv-noData").remove();
                var U = e.filter(function(e) {
                        return !e.disabled && e.bar
                    }),
                    z = e.filter(function(e) {
                        return !e.bar
                    });
                C = r.xScale(), k = o.scale(), L = r.yScale(), A = t.yScale(), O = i.yScale(), M = n.yScale();
                var W = e.filter(function(e) {
                        return !e.disabled && e.bar
                    }).map(function(e) {
                        return e.values.map(function(e, t) {
                            return {
                                x: y(e, t),
                                y: b(e, t)
                            }
                        })
                    }),
                    X = e.filter(function(e) {
                        return !e.disabled && !e.bar
                    }).map(function(e) {
                        return e.values.map(function(e, t) {
                            return {
                                x: y(e, t),
                                y: b(e, t)
                            }
                        })
                    });
                C.range([0, F]), k.domain(d3.extent(d3.merge(W.concat(X)), function(e) {
                    return e.x
                })).range([0, F]);
                var V = N.selectAll("g.nv-wrap.nv-linePlusBar").data([e]),
                    $ = V.enter().append("g").attr("class", "nvd3 nv-wrap nv-linePlusBar").append("g"),
                    J = V.select("g");
                $.append("g").attr("class", "nv-legendWrap");
                var K = $.append("g").attr("class", "nv-focus");
                K.append("g").attr("class", "nv-x nv-axis"), K.append("g").attr("class", "nv-y1 nv-axis"), K.append("g").attr("class", "nv-y2 nv-axis"), K.append("g").attr("class", "nv-barsWrap"), K.append("g").attr("class", "nv-linesWrap");
                var Q = $.append("g").attr("class", "nv-context");
                Q.append("g").attr("class", "nv-x nv-axis"), Q.append("g").attr("class", "nv-y1 nv-axis"), Q.append("g").attr("class", "nv-y2 nv-axis"), Q.append("g").attr("class", "nv-barsWrap"), Q.append("g").attr("class", "nv-linesWrap"), Q.append("g").attr("class", "nv-brushBackground"), Q.append("g").attr("class", "nv-x nv-brush"), E && (c.width(F / 2), J.select(".nv-legendWrap").datum(e.map(function(e) {
                    return e.originalKey = e.originalKey === undefined ? e.key : e.originalKey, e.key = e.originalKey + (e.bar ? " (left axis)" : " (right axis)"), e
                })).call(c), p.top != c.height() && (p.top = c.height(), I = (m || parseInt(N.style("height")) || 400) - p.top - p.bottom - g), J.select(".nv-legendWrap").attr("transform", "translate(" + F / 2 + "," + -p.top + ")")), V.attr("transform", "translate(" + p.left + "," + p.top + ")"), i.width(F).height(q).color(e.map(function(e, t) {
                    return e.color || w(e, t)
                }).filter(function(t, n) {
                    return !e[n].disabled && e[n].bar
                })), n.width(F).height(q).color(e.map(function(e, t) {
                    return e.color || w(e, t)
                }).filter(function(t, n) {
                    return !e[n].disabled && !e[n].bar
                }));
                var G = J.select(".nv-context .nv-barsWrap").datum(U.length ? U : [{
                        values: []
                    }]),
                    Y = J.select(".nv-context .nv-linesWrap").datum(z[0].disabled ? [{
                        values: []
                    }] : z);
                J.select(".nv-context").attr("transform", "translate(0," + (I + p.bottom + d.top) + ")"), G.transition().call(i), Y.transition().call(n), h.x(k).on("brush", it), x && h.extent(x);
                var Z = J.select(".nv-brushBackground").selectAll("g").data([x || h.extent()]),
                    et = Z.enter().append("g");
                et.append("rect").attr("class", "left").attr("x", 0).attr("y", 0).attr("height", q), et.append("rect").attr("class", "right").attr("x", 0).attr("y", 0).attr("height", q);
                var tt = J.select(".nv-x.nv-brush").call(h);
                tt.selectAll("rect").attr("height", q), tt.selectAll(".resize").append("path").attr("d", nt), o.ticks(F / 100).tickSize(-q, 0), J.select(".nv-context .nv-x.nv-axis").attr("transform", "translate(0," + O.range()[0] + ")"), J.select(".nv-context .nv-x.nv-axis").transition().call(o), f.scale(O).ticks(q / 36).tickSize(-F, 0), J.select(".nv-context .nv-y1.nv-axis").style("opacity", U.length ? 1 : 0).attr("transform", "translate(0," + k.range()[0] + ")"), J.select(".nv-context .nv-y1.nv-axis").transition().call(f), l.scale(M).ticks(q / 36).tickSize(U.length ? 0 : -F, 0), J.select(".nv-context .nv-y2.nv-axis").style("opacity", z.length ? 1 : 0).attr("transform", "translate(" + k.range()[1] + ",0)"), J.select(".nv-context .nv-y2.nv-axis").transition().call(l), c.dispatch.on("stateChange", function(e) {
                    B.update()
                }), D.on("tooltipShow", function(e) {
                    T && H(e, j.parentNode)
                }), it()
            }), B
        }
        var t = e.models.line(),
            n = e.models.line(),
            r = e.models.historicalBar(),
            i = e.models.historicalBar(),
            s = e.models.axis(),
            o = e.models.axis(),
            u = e.models.axis(),
            a = e.models.axis(),
            f = e.models.axis(),
            l = e.models.axis(),
            c = e.models.legend(),
            h = d3.svg.brush(),
            p = {
                top: 30,
                right: 30,
                bottom: 30,
                left: 60
            },
            d = {
                top: 0,
                right: 30,
                bottom: 20,
                left: 60
            },
            v = null,
            m = null,
            g = 100,
            y = function(e) {
                return e.x
            },
            b = function(e) {
                return e.y
            },
            w = e.utils.defaultColor(),
            E = !0,
            S, x = null,
            T = !0,
            N = function(e, t, n, r, i) {
                return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>"
            },
            C, k, L, A, O, M, _ = "No Data Available.",
            D = d3.dispatch("tooltipShow", "tooltipHide", "brush"),
            P = 0;
        t.clipEdge(!0), n.interactive(!1), s.orient("bottom").tickPadding(5), u.orient("left"), a.orient("right"), o.orient("bottom").tickPadding(5), f.orient("left"), l.orient("right");
        var H = function(n, r) {
            S && (n.pointIndex += Math.ceil(S[0]));
            var i = n.pos[0] + (r.offsetLeft || 0),
                o = n.pos[1] + (r.offsetTop || 0),
                f = s.tickFormat()(t.x()(n.point, n.pointIndex)),
                l = (n.series.bar ? u : a).tickFormat()(t.y()(n.point, n.pointIndex)),
                c = N(n.series.key, f, l, n, B);
            e.tooltip.show([i, o], c, n.value < 0 ? "n" : "s", null, r)
        };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + p.left, e.pos[1] + p.top], D.tooltipShow(e)
        }), t.dispatch.on("elementMouseout.tooltip", function(e) {
            D.tooltipHide(e)
        }), r.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + p.left, e.pos[1] + p.top], D.tooltipShow(e)
        }), r.dispatch.on("elementMouseout.tooltip", function(e) {
            D.tooltipHide(e)
        }), D.on("tooltipHide", function() {
            T && e.tooltip.cleanup()
        }), B.dispatch = D, B.legend = c, B.lines = t, B.lines2 = n, B.bars = r, B.bars2 = i, B.xAxis = s, B.x2Axis = o, B.y1Axis = u, B.y2Axis = a, B.y3Axis = f, B.y4Axis = l, d3.rebind(B, t, "defined", "size", "clipVoronoi", "interpolate"), B.options = e.utils.optionsFunc.bind(B), B.x = function(e) {
            return arguments.length ? (y = e, t.x(e), r.x(e), B) : y
        }, B.y = function(e) {
            return arguments.length ? (b = e, t.y(e), r.y(e), B) : b
        }, B.margin = function(e) {
            return arguments.length ? (p.top = typeof e.top != "undefined" ? e.top : p.top, p.right = typeof e.right != "undefined" ? e.right : p.right, p.bottom = typeof e.bottom != "undefined" ? e.bottom : p.bottom, p.left = typeof e.left != "undefined" ? e.left : p.left, B) : p
        }, B.width = function(e) {
            return arguments.length ? (v = e, B) : v
        }, B.height = function(e) {
            return arguments.length ? (m = e, B) : m
        }, B.color = function(t) {
            return arguments.length ? (w = e.utils.getColor(t), c.color(w), B) : w
        }, B.showLegend = function(e) {
            return arguments.length ? (E = e, B) : E
        }, B.tooltips = function(e) {
            return arguments.length ? (T = e, B) : T
        }, B.tooltipContent = function(e) {
            return arguments.length ? (N = e, B) : N
        }, B.noData = function(e) {
            return arguments.length ? (_ = e, B) : _
        }, B.brushExtent = function(e) {
            return arguments.length ? (x = e, B) : x
        }, B
    }, e.models.multiBar = function() {
        "use strict";

        function C(e) {
            return e.each(function(e) {
                var C = n - t.left - t.right,
                    k = r - t.top - t.bottom,
                    L = d3.select(this);
                d && e.length && (d = [{
                    values: e[0].values.map(function(e) {
                        return {
                            x: e.x,
                            y: 0,
                            series: e.series,
                            size: .01
                        }
                    })
                }]), c && (e = d3.layout.stack().offset(h).values(function(e) {
                    return e.values
                }).y(a)(!e.length && d ? d : e)), e.forEach(function(e, t) {
                    e.values.forEach(function(e) {
                        e.series = t
                    })
                }), c && e[0].values.map(function(t, n) {
                    var r = 0,
                        i = 0;
                    e.map(function(e) {
                        var t = e.values[n];
                        t.size = Math.abs(t.y), t.y < 0 ? (t.y1 = i, i -= t.size) : (t.y1 = t.size + r, r += t.size)
                    })
                });
                var A = y && b ? [] : e.map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: u(e, t),
                            y: a(e, t),
                            y0: e.y0,
                            y1: e.y1
                        }
                    })
                });
                i.domain(y || d3.merge(A).map(function(e) {
                    return e.x
                })).rangeBands(w || [0, C], S), s.domain(b || d3.extent(d3.merge(A).map(function(e) {
                    return c ? e.y > 0 ? e.y1 : e.y1 + e.y : e.y
                }).concat(f))).range(E || [k, 0]), i.domain()[0] === i.domain()[1] && (i.domain()[0] ? i.domain([i.domain()[0] - i.domain()[0] * .01, i.domain()[1] + i.domain()[1] * .01]) : i.domain([-1, 1])), s.domain()[0] === s.domain()[1] && (s.domain()[0] ? s.domain([s.domain()[0] + s.domain()[0] * .01, s.domain()[1] - s.domain()[1] * .01]) : s.domain([-1, 1])), T = T || i, N = N || s;
                var O = L.selectAll("g.nv-wrap.nv-multibar").data([e]),
                    M = O.enter().append("g").attr("class", "nvd3 nv-wrap nv-multibar"),
                    _ = M.append("defs"),
                    D = M.append("g"),
                    P = O.select("g");
                D.append("g").attr("class", "nv-groups"), O.attr("transform", "translate(" + t.left + "," + t.top + ")"), _.append("clipPath").attr("id", "nv-edge-clip-" + o).append("rect"), O.select("#nv-edge-clip-" + o + " rect").attr("width", C).attr("height", k), P.attr("clip-path", l ? "url(#nv-edge-clip-" + o + ")" : "");
                var H = O.select(".nv-groups").selectAll(".nv-group").data(function(e) {
                    return e
                }, function(e, t) {
                    return t
                });
                H.enter().append("g").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6), H.exit().transition().selectAll("rect.nv-bar").delay(function(t, n) {
                    return n * g / e[0].values.length
                }).attr("y", function(e) {
                    return c ? N(e.y0) : N(0)
                }).attr("height", 0).remove(), H.attr("class", function(e, t) {
                    return "nv-group nv-series-" + t
                }).classed("hover", function(e) {
                    return e.hover
                }).style("fill", function(e, t) {
                    return p(e, t)
                }).style("stroke", function(e, t) {
                    return p(e, t)
                }), H.transition().style("stroke-opacity", 1).style("fill-opacity", .75);
                var B = H.selectAll("rect.nv-bar").data(function(t) {
                    return d && !e.length ? d.values : t.values
                });
                B.exit().remove();
                var j = B.enter().append("rect").attr("class", function(e, t) {
                    return a(e, t) < 0 ? "nv-bar negative" : "nv-bar positive"
                }).attr("x", function(t, n, r) {
                    return c ? 0 : r * i.rangeBand() / e.length
                }).attr("y", function(e) {
                    return N(c ? e.y0 : 0)
                }).attr("height", 0).attr("width", i.rangeBand() / (c ? 1 : e.length)).attr("transform", function(e, t) {
                    return "translate(" + i(u(e, t)) + ",0)"
                });
                B.style("fill", function(e, t, n) {
                    return p(e, n, t)
                }).style("stroke", function(e, t, n) {
                    return p(e, n, t)
                }).on("mouseover", function(t, n) {
                    d3.select(this).classed("hover", !0), x.elementMouseover({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [i(u(t, n)) + i.rangeBand() * (c ? e.length / 2 : t.series + .5) / e.length, s(a(t, n) + (c ? t.y0 : 0))],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    })
                }).on("mouseout", function(t, n) {
                    d3.select(this).classed("hover", !1), x.elementMouseout({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    })
                }).on("click", function(t, n) {
                    x.elementClick({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [i(u(t, n)) + i.rangeBand() * (c ? e.length / 2 : t.series + .5) / e.length, s(a(t, n) + (c ? t.y0 : 0))],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    }), d3.event.stopPropagation()
                }).on("dblclick", function(t, n) {
                    x.elementDblClick({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [i(u(t, n)) + i.rangeBand() * (c ? e.length / 2 : t.series + .5) / e.length, s(a(t, n) + (c ? t.y0 : 0))],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    }), d3.event.stopPropagation()
                }), B.attr("class", function(e, t) {
                    return a(e, t) < 0 ? "nv-bar negative" : "nv-bar positive"
                }).transition().attr("transform", function(e, t) {
                    return "translate(" + i(u(e, t)) + ",0)"
                }), v && (m || (m = e.map(function() {
                    return !0
                })), B.style("fill", function(e, t, n) {
                    return d3.rgb(v(e, t)).darker(m.map(function(e, t) {
                        return t
                    }).filter(function(e, t) {
                        return !m[t]
                    })[n]).toString()
                }).style("stroke", function(e, t, n) {
                    return d3.rgb(v(e, t)).darker(m.map(function(e, t) {
                        return t
                    }).filter(function(e, t) {
                        return !m[t]
                    })[n]).toString()
                })), c ? B.transition().delay(function(t, n) {
                    return n * g / e[0].values.length
                }).attr("y", function(e, t) {
                    return s(c ? e.y1 : 0)
                }).attr("height", function(e, t) {
                    return Math.max(Math.abs(s(e.y + (c ? e.y0 : 0)) - s(c ? e.y0 : 0)), 1)
                }).attr("x", function(t, n) {
                    return c ? 0 : t.series * i.rangeBand() / e.length
                }).attr("width", i.rangeBand() / (c ? 1 : e.length)) : B.transition().delay(function(t, n) {
                    return n * g / e[0].values.length
                }).attr("x", function(t, n) {
                    return t.series * i.rangeBand() / e.length
                }).attr("width", i.rangeBand() / e.length).attr("y", function(e, t) {
                    return a(e, t) < 0 ? s(0) : s(0) - s(a(e, t)) < 1 ? s(0) - 1 : s(a(e, t)) || 0
                }).attr("height", function(e, t) {
                    return Math.max(Math.abs(s(a(e, t)) - s(0)), 1) || 0
                }), T = i.copy(), N = s.copy()
            }), C
        }
        var t = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            n = 960,
            r = 500,
            i = d3.scale.ordinal(),
            s = d3.scale.linear(),
            o = Math.floor(Math.random() * 1e4),
            u = function(e) {
                return e.x
            },
            a = function(e) {
                return e.y
            },
            f = [0],
            l = !0,
            c = !1,
            h = "zero",
            p = e.utils.defaultColor(),
            d = !1,
            v = null,
            m, g = 1200,
            y, b, w, E, S = .1,
            x = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout"),
            T, N;
        return C.dispatch = x, C.options = e.utils.optionsFunc.bind(C), C.x = function(e) {
            return arguments.length ? (u = e, C) : u
        }, C.y = function(e) {
            return arguments.length ? (a = e, C) : a
        }, C.margin = function(e) {
            return arguments.length ? (t.top = typeof e.top != "undefined" ? e.top : t.top, t.right = typeof e.right != "undefined" ? e.right : t.right, t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom, t.left = typeof e.left != "undefined" ? e.left : t.left, C) : t
        }, C.width = function(e) {
            return arguments.length ? (n = e, C) : n
        }, C.height = function(e) {
            return arguments.length ? (r = e, C) : r
        }, C.xScale = function(e) {
            return arguments.length ? (i = e, C) : i
        }, C.yScale = function(e) {
            return arguments.length ? (s = e, C) : s
        }, C.xDomain = function(e) {
            return arguments.length ? (y = e, C) : y
        }, C.yDomain = function(e) {
            return arguments.length ? (b = e, C) : b
        }, C.xRange = function(e) {
            return arguments.length ? (w = e, C) : w
        }, C.yRange = function(e) {
            return arguments.length ? (E = e, C) : E
        }, C.forceY = function(e) {
            return arguments.length ? (f = e, C) : f
        }, C.stacked = function(e) {
            return arguments.length ? (c = e, C) : c
        }, C.stackOffset = function(e) {
            return arguments.length ? (h = e, C) : h
        }, C.clipEdge = function(e) {
            return arguments.length ? (l = e, C) : l
        }, C.color = function(t) {
            return arguments.length ? (p = e.utils.getColor(t), C) : p
        }, C.barColor = function(t) {
            return arguments.length ? (v = e.utils.getColor(t), C) : v
        }, C.disabled = function(e) {
            return arguments.length ? (m = e, C) : m
        }, C.id = function(e) {
            return arguments.length ? (o = e, C) : o
        }, C.hideable = function(e) {
            return arguments.length ? (d = e, C) : d
        }, C.delay = function(e) {
            return arguments.length ? (g = e, C) : g
        }, C.groupSpacing = function(e) {
            return arguments.length ? (S = e, C) : S
        }, C
    }, e.models.multiBarChart = function() {
        "use strict";

        function A(e) {
            return e.each(function(e) {
                var b = d3.select(this),
                    O = this,
                    M = (u || parseInt(b.style("width")) || 960) - o.left - o.right,
                    _ = (a || parseInt(b.style("height")) || 400) - o.top - o.bottom;
                A.update = function() {
                    b.transition().duration(k).call(A)
                }, A.container = this, S.disabled = e.map(function(e) {
                    return !!e.disabled
                });
                if (!x) {
                    var D;
                    x = {};
                    for (D in S) S[D] instanceof Array ? x[D] = S[D].slice(0) : x[D] = S[D]
                }
                if (!e || !e.length || !e.filter(function(e) {
                    return e.values.length
                }).length) {
                    var P = b.selectAll(".nv-noData").data([T]);
                    return P.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"), P.attr("x", o.left + M / 2).attr("y", o.top + _ / 2).text(function(e) {
                        return e
                    }), A
                }
                b.selectAll(".nv-noData").remove(), w = t.xScale(), E = t.yScale();
                var H = b.selectAll("g.nv-wrap.nv-multiBarWithLegend").data([e]),
                    B = H.enter().append("g").attr("class", "nvd3 nv-wrap nv-multiBarWithLegend").append("g"),
                    j = H.select("g");
                B.append("g").attr("class", "nv-x nv-axis"), B.append("g").attr("class", "nv-y nv-axis"), B.append("g").attr("class", "nv-barsWrap"), B.append("g").attr("class", "nv-legendWrap"), B.append("g").attr("class", "nv-controlsWrap"), c && (i.width(M - C()), t.barColor() && e.forEach(function(e, t) {
                    e.color = d3.rgb("#ccc").darker(t * 1.5).toString()
                }), j.select(".nv-legendWrap").datum(e).call(i), o.top != i.height() && (o.top = i.height(), _ = (a || parseInt(b.style("height")) || 400) - o.top - o.bottom), j.select(".nv-legendWrap").attr("transform", "translate(" + C() + "," + -o.top + ")"));
                if (l) {
                    var F = [{
                        key: "Grouped",
                        disabled: t.stacked()
                    }, {
                        key: "Stacked",
                        disabled: !t.stacked()
                    }];
                    s.width(C()).color(["#444", "#444", "#444"]), j.select(".nv-controlsWrap").datum(F).attr("transform", "translate(0," + -o.top + ")").call(s)
                }
                H.attr("transform", "translate(" + o.left + "," + o.top + ")"), d && j.select(".nv-y.nv-axis").attr("transform", "translate(" + M + ",0)"), t.disabled(e.map(function(e) {
                    return e.disabled
                })).width(M).height(_).color(e.map(function(e, t) {
                    return e.color || f(e, t)
                }).filter(function(t, n) {
                    return !e[n].disabled
                }));
                var I = j.select(".nv-barsWrap").datum(e.filter(function(e) {
                    return !e.disabled
                }));
                I.transition().call(t);
                if (h) {
                    n.scale(w).ticks(M / 100).tickSize(-_, 0), j.select(".nv-x.nv-axis").attr("transform", "translate(0," + E.range()[0] + ")"), j.select(".nv-x.nv-axis").transition().call(n);
                    var q = j.select(".nv-x.nv-axis > g").selectAll("g");
                    q.selectAll("line, text").style("opacity", 1);
                    if (m) {
                        var R = function(e, t) {
                                return "translate(" + e + "," + t + ")"
                            },
                            U = 5,
                            z = 17;
                        q.selectAll("text").attr("transform", function(e, t, n) {
                            return R(0, n % 2 == 0 ? U : z)
                        });
                        var W = d3.selectAll(".nv-x.nv-axis .nv-wrap g g text")[0].length;
                        j.selectAll(".nv-x.nv-axis .nv-axisMaxMin text").attr("transform", function(e, t) {
                            return R(0, t === 0 || W % 2 !== 0 ? z : U)
                        })
                    }
                    v && q.filter(function(t, n) {
                        return n % Math.ceil(e[0].values.length / (M / 100)) !== 0
                    }).selectAll("text, line").style("opacity", 0), g && q.selectAll(".tick text").attr("transform", "rotate(" + g + " 0,0)").style("text-anchor", g > 0 ? "start" : "end"), j.select(".nv-x.nv-axis").selectAll("g.nv-axisMaxMin text").style("opacity", 1)
                }
                p && (r.scale(E).ticks(_ / 36).tickSize(-M, 0), j.select(".nv-y.nv-axis").transition().call(r)), i.dispatch.on("stateChange", function(e) {
                    S = e, N.stateChange(S), A.update()
                }), s.dispatch.on("legendClick", function(e, n) {
                    if (!e.disabled) return;
                    F = F.map(function(e) {
                        return e.disabled = !0, e
                    }), e.disabled = !1;
                    switch (e.key) {
                        case "Grouped":
                            t.stacked(!1);
                            break;
                        case "Stacked":
                            t.stacked(!0)
                    }
                    S.stacked = t.stacked(), N.stateChange(S), A.update()
                }), N.on("tooltipShow", function(e) {
                    y && L(e, O.parentNode)
                }), N.on("changeState", function(n) {
                    typeof n.disabled != "undefined" && (e.forEach(function(e, t) {
                        e.disabled = n.disabled[t]
                    }), S.disabled = n.disabled), typeof n.stacked != "undefined" && (t.stacked(n.stacked), S.stacked = n.stacked), A.update()
                })
            }), A
        }
        var t = e.models.multiBar(),
            n = e.models.axis(),
            r = e.models.axis(),
            i = e.models.legend(),
            s = e.models.legend(),
            o = {
                top: 30,
                right: 20,
                bottom: 50,
                left: 60
            },
            u = null,
            a = null,
            f = e.utils.defaultColor(),
            l = !0,
            c = !0,
            h = !0,
            p = !0,
            d = !1,
            v = !0,
            m = !1,
            g = 0,
            y = !0,
            b = function(e, t, n, r, i) {
                return "<h3>" + e + "</h3>" + "<p>" + n + " on " + t + "</p>"
            },
            w, E, S = {
                stacked: !1
            },
            x = null,
            T = "No Data Available.",
            N = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"),
            C = function() {
                return l ? 180 : 0
            },
            k = 250;
        t.stacked(!1), n.orient("bottom").tickPadding(7).highlightZero(!0).showMaxMin(!1).tickFormat(function(e) {
            return e
        }), r.orient(d ? "right" : "left").tickFormat(d3.format(",.1f")), s.updateState(!1);
        var L = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0),
                u = i.pos[1] + (s.offsetTop || 0),
                a = n.tickFormat()(t.x()(i.point, i.pointIndex)),
                f = r.tickFormat()(t.y()(i.point, i.pointIndex)),
                l = b(i.series.key, a, f, i, A);
            e.tooltip.show([o, u], l, i.value < 0 ? "n" : "s", null, s)
        };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + o.left, e.pos[1] + o.top], N.tooltipShow(e)
        }), t.dispatch.on("elementMouseout.tooltip", function(e) {
            N.tooltipHide(e)
        }), N.on("tooltipHide", function() {
            y && e.tooltip.cleanup()
        }), A.dispatch = N, A.multibar = t, A.legend = i, A.xAxis = n, A.yAxis = r, d3.rebind(A, t, "x", "y", "xDomain", "yDomain", "xRange", "yRange", "forceX", "forceY", "clipEdge", "id", "stacked", "stackOffset", "delay", "barColor", "groupSpacing"), A.options = e.utils.optionsFunc.bind(A), A.margin = function(e) {
            return arguments.length ? (o.top = typeof e.top != "undefined" ? e.top : o.top, o.right = typeof e.right != "undefined" ? e.right : o.right, o.bottom = typeof e.bottom != "undefined" ? e.bottom : o.bottom, o.left = typeof e.left != "undefined" ? e.left : o.left, A) : o
        }, A.width = function(e) {
            return arguments.length ? (u = e, A) : u
        }, A.height = function(e) {
            return arguments.length ? (a = e, A) : a
        }, A.color = function(t) {
            return arguments.length ? (f = e.utils.getColor(t), i.color(f), A) : f
        }, A.showControls = function(e) {
            return arguments.length ? (l = e, A) : l
        }, A.showLegend = function(e) {
            return arguments.length ? (c = e, A) : c
        }, A.showXAxis = function(e) {
            return arguments.length ? (h = e, A) : h
        }, A.showYAxis = function(e) {
            return arguments.length ? (p = e, A) : p
        }, A.rightAlignYAxis = function(e) {
            return arguments.length ? (d = e, r.orient(e ? "right" : "left"), A) : d
        }, A.reduceXTicks = function(e) {
            return arguments.length ? (v = e, A) : v
        }, A.rotateLabels = function(e) {
            return arguments.length ? (g = e, A) : g
        }, A.staggerLabels = function(e) {
            return arguments.length ? (m = e, A) : m
        }, A.tooltip = function(e) {
            return arguments.length ? (b = e, A) : b
        }, A.tooltips = function(e) {
            return arguments.length ? (y = e, A) : y
        }, A.tooltipContent = function(e) {
            return arguments.length ? (b = e, A) : b
        }, A.state = function(e) {
            return arguments.length ? (S = e, A) : S
        }, A.defaultState = function(e) {
            return arguments.length ? (x = e, A) : x
        }, A.noData = function(e) {
            return arguments.length ? (T = e, A) : T
        }, A.transitionDuration = function(e) {
            return arguments.length ? (k = e, A) : k
        }, A
    }, e.models.multiBarHorizontal = function() {
        "use strict";

        function C(e) {
            return e.each(function(e) {
                var i = n - t.left - t.right,
                    y = r - t.top - t.bottom,
                    C = d3.select(this);
                p && (e = d3.layout.stack().offset("zero").values(function(e) {
                    return e.values
                }).y(a)(e)), e.forEach(function(e, t) {
                    e.values.forEach(function(e) {
                        e.series = t
                    })
                }), p && e[0].values.map(function(t, n) {
                    var r = 0,
                        i = 0;
                    e.map(function(e) {
                        var t = e.values[n];
                        t.size = Math.abs(t.y), t.y < 0 ? (t.y1 = i - t.size, i -= t.size) : (t.y1 = r, r += t.size)
                    })
                });
                var k = b && w ? [] : e.map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: u(e, t),
                            y: a(e, t),
                            y0: e.y0,
                            y1: e.y1
                        }
                    })
                });
                s.domain(b || d3.merge(k).map(function(e) {
                    return e.x
                })).rangeBands(E || [0, y], .1), o.domain(w || d3.extent(d3.merge(k).map(function(e) {
                    return p ? e.y > 0 ? e.y1 + e.y : e.y1 : e.y
                }).concat(f))), d && !p ? o.range(S || [o.domain()[0] < 0 ? m : 0, i - (o.domain()[1] > 0 ? m : 0)]) : o.range(S || [0, i]), T = T || s, N = N || d3.scale.linear().domain(o.domain()).range([o(0), o(0)]);
                var L = d3.select(this).selectAll("g.nv-wrap.nv-multibarHorizontal").data([e]),
                    A = L.enter().append("g").attr("class", "nvd3 nv-wrap nv-multibarHorizontal"),
                    O = A.append("defs"),
                    M = A.append("g"),
                    _ = L.select("g");
                M.append("g").attr("class", "nv-groups"), L.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var D = L.select(".nv-groups").selectAll(".nv-group").data(function(e) {
                    return e
                }, function(e, t) {
                    return t
                });
                D.enter().append("g").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6), D.exit().transition().style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6).remove(), D.attr("class", function(e, t) {
                    return "nv-group nv-series-" + t
                }).classed("hover", function(e) {
                    return e.hover
                }).style("fill", function(e, t) {
                    return l(e, t)
                }).style("stroke", function(e, t) {
                    return l(e, t)
                }), D.transition().style("stroke-opacity", 1).style("fill-opacity", .75);
                var P = D.selectAll("g.nv-bar").data(function(e) {
                    return e.values
                });
                P.exit().remove();
                var H = P.enter().append("g").attr("transform", function(t, n, r) {
                    return "translate(" + N(p ? t.y0 : 0) + "," + (p ? 0 : r * s.rangeBand() / e.length + s(u(t, n))) + ")"
                });
                H.append("rect").attr("width", 0).attr("height", s.rangeBand() / (p ? 1 : e.length)), P.on("mouseover", function(t, n) {
                    d3.select(this).classed("hover", !0), x.elementMouseover({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [o(a(t, n) + (p ? t.y0 : 0)), s(u(t, n)) + s.rangeBand() * (p ? e.length / 2 : t.series + .5) / e.length],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    })
                }).on("mouseout", function(t, n) {
                    d3.select(this).classed("hover", !1), x.elementMouseout({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    })
                }).on("click", function(t, n) {
                    x.elementClick({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [s(u(t, n)) + s.rangeBand() * (p ? e.length / 2 : t.series + .5) / e.length, o(a(t, n) + (p ? t.y0 : 0))],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    }), d3.event.stopPropagation()
                }).on("dblclick", function(t, n) {
                    x.elementDblClick({
                        value: a(t, n),
                        point: t,
                        series: e[t.series],
                        pos: [s(u(t, n)) + s.rangeBand() * (p ? e.length / 2 : t.series + .5) / e.length, o(a(t, n) + (p ? t.y0 : 0))],
                        pointIndex: n,
                        seriesIndex: t.series,
                        e: d3.event
                    }), d3.event.stopPropagation()
                }), H.append("text"), d && !p ? (P.select("text").attr("text-anchor", function(e, t) {
                    return a(e, t) < 0 ? "end" : "start"
                }).attr("y", s.rangeBand() / (e.length * 2)).attr("dy", ".32em").text(function(e, t) {
                    return g(a(e, t))
                }), P.transition().select("text").attr("x", function(e, t) {
                    return a(e, t) < 0 ? -4 : o(a(e, t)) - o(0) + 4
                })) : P.selectAll("text").text(""), v && !p ? (H.append("text").classed("nv-bar-label", !0), P.select("text.nv-bar-label").attr("text-anchor", function(e, t) {
                    return a(e, t) < 0 ? "start" : "end"
                }).attr("y", s.rangeBand() / (e.length * 2)).attr("dy", ".32em").text(function(e, t) {
                    return u(e, t)
                }), P.transition().select("text.nv-bar-label").attr("x", function(e, t) {
                    return a(e, t) < 0 ? o(0) - o(a(e, t)) + 4 : -4
                })) : P.selectAll("text.nv-bar-label").text(""), P.attr("class", function(e, t) {
                    return a(e, t) < 0 ? "nv-bar negative" : "nv-bar positive"
                }), c && (h || (h = e.map(function() {
                    return !0
                })), P.style("fill", function(e, t, n) {
                    return d3.rgb(c(e, t)).darker(h.map(function(e, t) {
                        return t
                    }).filter(function(e, t) {
                        return !h[t]
                    })[n]).toString()
                }).style("stroke", function(e, t, n) {
                    return d3.rgb(c(e, t)).darker(h.map(function(e, t) {
                        return t
                    }).filter(function(e, t) {
                        return !h[t]
                    })[n]).toString()
                })), p ? P.transition().attr("transform", function(e, t) {
                    return "translate(" + o(e.y1) + "," + s(u(e, t)) + ")"
                }).select("rect").attr("width", function(e, t) {
                    return Math.abs(o(a(e, t) + e.y0) - o(e.y0))
                }).attr("height", s.rangeBand()) : P.transition().attr("transform", function(t, n) {
                    return "translate(" + (a(t, n) < 0 ? o(a(t, n)) : o(0)) + "," + (t.series * s.rangeBand() / e.length + s(u(t, n))) + ")"
                }).select("rect").attr("height", s.rangeBand() / e.length).attr("width", function(e, t) {
                    return Math.max(Math.abs(o(a(e, t)) - o(0)), 1)
                }), T = s.copy(), N = o.copy()
            }), C
        }
        var t = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            n = 960,
            r = 500,
            i = Math.floor(Math.random() * 1e4),
            s = d3.scale.ordinal(),
            o = d3.scale.linear(),
            u = function(e) {
                return e.x
            },
            a = function(e) {
                return e.y
            },
            f = [0],
            l = e.utils.defaultColor(),
            c = null,
            h, p = !1,
            d = !1,
            v = !1,
            m = 60,
            g = d3.format(",.2f"),
            y = 1200,
            b, w, E, S, x = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout"),
            T, N;
        return C.dispatch = x, C.options = e.utils.optionsFunc.bind(C), C.x = function(e) {
            return arguments.length ? (u = e, C) : u
        }, C.y = function(e) {
            return arguments.length ? (a = e, C) : a
        }, C.margin = function(e) {
            return arguments.length ? (t.top = typeof e.top != "undefined" ? e.top : t.top, t.right = typeof e.right != "undefined" ? e.right : t.right, t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom, t.left = typeof e.left != "undefined" ? e.left : t.left, C) : t
        }, C.width = function(e) {
            return arguments.length ? (n = e, C) : n
        }, C.height = function(e) {
            return arguments.length ? (r = e, C) : r
        }, C.xScale = function(e) {
            return arguments.length ? (s = e, C) : s
        }, C.yScale = function(e) {
            return arguments.length ? (o = e, C) : o
        }, C.xDomain = function(e) {
            return arguments.length ? (b = e, C) : b
        }, C.yDomain = function(e) {
            return arguments.length ? (w = e, C) : w
        }, C.xRange = function(e) {
            return arguments.length ? (E = e, C) : E
        }, C.yRange = function(e) {
            return arguments.length ? (S = e, C) : S
        }, C.forceY = function(e) {
            return arguments.length ? (f = e, C) : f
        }, C.stacked = function(e) {
            return arguments.length ? (p = e, C) : p
        }, C.color = function(t) {
            return arguments.length ? (l = e.utils.getColor(t), C) : l
        }, C.barColor = function(t) {
            return arguments.length ? (c = e.utils.getColor(t), C) : c
        }, C.disabled = function(e) {
            return arguments.length ? (h = e, C) : h
        }, C.id = function(e) {
            return arguments.length ? (i = e, C) : i
        }, C.delay = function(e) {
            return arguments.length ? (y = e, C) : y
        }, C.showValues = function(e) {
            return arguments.length ? (d = e, C) : d
        }, C.showBarLabels = function(e) {
            return arguments.length ? (v = e, C) : v
        }, C.valueFormat = function(e) {
            return arguments.length ? (g = e, C) : g
        }, C.valuePadding = function(e) {
            return arguments.length ? (m = e, C) : m
        }, C
    }, e.models.multiBarHorizontalChart = function() {
        "use strict";

        function C(e) {
            return e.each(function(e) {
                var d = d3.select(this),
                    m = this,
                    k = (u || parseInt(d.style("width")) || 960) - o.left - o.right,
                    L = (a || parseInt(d.style("height")) || 400) - o.top - o.bottom;
                C.update = function() {
                    d.transition().duration(T).call(C)
                }, C.container = this, b.disabled = e.map(function(e) {
                    return !!e.disabled
                });
                if (!w) {
                    var A;
                    w = {};
                    for (A in b) b[A] instanceof Array ? w[A] = b[A].slice(0) : w[A] = b[A]
                }
                if (!e || !e.length || !e.filter(function(e) {
                    return e.values.length
                }).length) {
                    var O = d.selectAll(".nv-noData").data([E]);
                    return O.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"), O.attr("x", o.left + k / 2).attr("y", o.top + L / 2).text(function(e) {
                        return e
                    }), C
                }
                d.selectAll(".nv-noData").remove(), g = t.xScale(), y = t.yScale();
                var M = d.selectAll("g.nv-wrap.nv-multiBarHorizontalChart").data([e]),
                    _ = M.enter().append("g").attr("class", "nvd3 nv-wrap nv-multiBarHorizontalChart").append("g"),
                    D = M.select("g");
                _.append("g").attr("class", "nv-x nv-axis"), _.append("g").attr("class", "nv-y nv-axis").append("g").attr("class", "nv-zeroLine").append("line"), _.append("g").attr("class", "nv-barsWrap"), _.append("g").attr("class", "nv-legendWrap"), _.append("g").attr("class", "nv-controlsWrap"), c && (i.width(k - x()), t.barColor() && e.forEach(function(e, t) {
                    e.color = d3.rgb("#ccc").darker(t * 1.5).toString()
                }), D.select(".nv-legendWrap").datum(e).call(i), o.top != i.height() && (o.top = i.height(), L = (a || parseInt(d.style("height")) || 400) - o.top - o.bottom), D.select(".nv-legendWrap").attr("transform", "translate(" + x() + "," + -o.top + ")"));
                if (l) {
                    var P = [{
                        key: "Grouped",
                        disabled: t.stacked()
                    }, {
                        key: "Stacked",
                        disabled: !t.stacked()
                    }];
                    s.width(x()).color(["#444", "#444", "#444"]), D.select(".nv-controlsWrap").datum(P).attr("transform", "translate(0," + -o.top + ")").call(s)
                }
                M.attr("transform", "translate(" + o.left + "," + o.top + ")"), t.disabled(e.map(function(e) {
                    return e.disabled
                })).width(k).height(L).color(e.map(function(e, t) {
                    return e.color || f(e, t)
                }).filter(function(t, n) {
                    return !e[n].disabled
                }));
                var H = D.select(".nv-barsWrap").datum(e.filter(function(e) {
                    return !e.disabled
                }));
                H.transition().call(t);
                if (h) {
                    n.scale(g).ticks(L / 24).tickSize(-k, 0), D.select(".nv-x.nv-axis").transition().call(n);
                    var B = D.select(".nv-x.nv-axis").selectAll("g");
                    B.selectAll("line, text")
                }
                p && (r.scale(y).ticks(k / 100).tickSize(-L, 0), D.select(".nv-y.nv-axis").attr("transform", "translate(0," + L + ")"), D.select(".nv-y.nv-axis").transition().call(r)), D.select(".nv-zeroLine line").attr("x1", y(0)).attr("x2", y(0)).attr("y1", 0).attr("y2", -L), i.dispatch.on("stateChange", function(e) {
                    b = e, S.stateChange(b), C.update()
                }), s.dispatch.on("legendClick", function(e, n) {
                    if (!e.disabled) return;
                    P = P.map(function(e) {
                        return e.disabled = !0, e
                    }), e.disabled = !1;
                    switch (e.key) {
                        case "Grouped":
                            t.stacked(!1);
                            break;
                        case "Stacked":
                            t.stacked(!0)
                    }
                    b.stacked = t.stacked(), S.stateChange(b), C.update()
                }), S.on("tooltipShow", function(e) {
                    v && N(e, m.parentNode)
                }), S.on("changeState", function(n) {
                    typeof n.disabled != "undefined" && (e.forEach(function(e, t) {
                        e.disabled = n.disabled[t]
                    }), b.disabled = n.disabled), typeof n.stacked != "undefined" && (t.stacked(n.stacked), b.stacked = n.stacked), C.update()
                })
            }), C
        }
        var t = e.models.multiBarHorizontal(),
            n = e.models.axis(),
            r = e.models.axis(),
            i = e.models.legend().height(30),
            s = e.models.legend().height(30),
            o = {
                top: 30,
                right: 20,
                bottom: 50,
                left: 60
            },
            u = null,
            a = null,
            f = e.utils.defaultColor(),
            l = !0,
            c = !0,
            h = !0,
            p = !0,
            d = !1,
            v = !0,
            m = function(e, t, n, r, i) {
                return "<h3>" + e + " - " + t + "</h3>" + "<p>" + n + "</p>"
            },
            g, y, b = {
                stacked: d
            },
            w = null,
            E = "No Data Available.",
            S = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"),
            x = function() {
                return l ? 180 : 0
            },
            T = 250;
        t.stacked(d), n.orient("left").tickPadding(5).highlightZero(!1).showMaxMin(!1).tickFormat(function(e) {
            return e
        }), r.orient("bottom").tickFormat(d3.format(",.1f")), s.updateState(!1);
        var N = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0),
                u = i.pos[1] + (s.offsetTop || 0),
                a = n.tickFormat()(t.x()(i.point, i.pointIndex)),
                f = r.tickFormat()(t.y()(i.point, i.pointIndex)),
                l = m(i.series.key, a, f, i, C);
            e.tooltip.show([o, u], l, i.value < 0 ? "e" : "w", null, s)
        };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + o.left, e.pos[1] + o.top], S.tooltipShow(e)
        }), t.dispatch.on("elementMouseout.tooltip", function(e) {
            S.tooltipHide(e)
        }), S.on("tooltipHide", function() {
            v && e.tooltip.cleanup()
        }), C.dispatch = S, C.multibar = t, C.legend = i, C.xAxis = n, C.yAxis = r, d3.rebind(C, t, "x", "y", "xDomain", "yDomain", "xRange", "yRange", "forceX", "forceY", "clipEdge", "id", "delay", "showValues", "showBarLabels", "valueFormat", "stacked", "barColor"), C.options = e.utils.optionsFunc.bind(C), C.margin = function(e) {
            return arguments.length ? (o.top = typeof e.top != "undefined" ? e.top : o.top, o.right = typeof e.right != "undefined" ? e.right : o.right, o.bottom = typeof e.bottom != "undefined" ? e.bottom : o.bottom, o.left = typeof e.left != "undefined" ? e.left : o.left, C) : o
        }, C.width = function(e) {
            return arguments.length ? (u = e, C) : u
        }, C.height = function(e) {
            return arguments.length ? (a = e, C) : a
        }, C.color = function(t) {
            return arguments.length ? (f = e.utils.getColor(t), i.color(f), C) : f
        }, C.showControls = function(e) {
            return arguments.length ? (l = e, C) : l
        }, C.showLegend = function(e) {
            return arguments.length ? (c = e, C) : c
        }, C.showXAxis = function(e) {
            return arguments.length ? (h = e, C) : h
        }, C.showYAxis = function(e) {
            return arguments.length ? (p = e, C) : p
        }, C.tooltip = function(e) {
            return arguments.length ? (m = e, C) : m
        }, C.tooltips = function(e) {
            return arguments.length ? (v = e, C) : v
        }, C.tooltipContent = function(e) {
            return arguments.length ? (m = e, C) : m
        }, C.state = function(e) {
            return arguments.length ? (b = e, C) : b
        }, C.defaultState = function(e) {
            return arguments.length ? (w = e, C) : w
        }, C.noData = function(e) {
            return arguments.length ? (E = e, C) : E
        }, C.transitionDuration = function(e) {
            return arguments.length ? (T = e, C) : T
        }, C
    }, e.models.multiChart = function() {
        "use strict";

        function C(e) {
            return e.each(function(e) {
                var u = d3.select(this),
                    f = this;
                C.update = function() {
                    u.transition().call(C)
                }, C.container = this;
                var k = (r || parseInt(u.style("width")) || 960) - t.left - t.right,
                    L = (i || parseInt(u.style("height")) || 400) - t.top - t.bottom,
                    A = e.filter(function(e) {
                        return !e.disabled && e.type == "line" && e.yAxis == 1
                    }),
                    O = e.filter(function(e) {
                        return !e.disabled && e.type == "line" && e.yAxis == 2
                    }),
                    M = e.filter(function(e) {
                        return !e.disabled && e.type == "bar" && e.yAxis == 1
                    }),
                    _ = e.filter(function(e) {
                        return !e.disabled && e.type == "bar" && e.yAxis == 2
                    }),
                    D = e.filter(function(e) {
                        return !e.disabled && e.type == "area" && e.yAxis == 1
                    }),
                    P = e.filter(function(e) {
                        return !e.disabled && e.type == "area" && e.yAxis == 2
                    }),
                    H = e.filter(function(e) {
                        return !e.disabled && e.yAxis == 1
                    }).map(function(e) {
                        return e.values.map(function(e, t) {
                            return {
                                x: e.x,
                                y: e.y
                            }
                        })
                    }),
                    B = e.filter(function(e) {
                        return !e.disabled && e.yAxis == 2
                    }).map(function(e) {
                        return e.values.map(function(e, t) {
                            return {
                                x: e.x,
                                y: e.y
                            }
                        })
                    });
                a.domain(d3.extent(d3.merge(H.concat(B)), function(e) {
                    return e.x
                })).range([0, k]);
                var j = u.selectAll("g.wrap.multiChart").data([e]),
                    F = j.enter().append("g").attr("class", "wrap nvd3 multiChart").append("g");
                F.append("g").attr("class", "x axis"), F.append("g").attr("class", "y1 axis"), F.append("g").attr("class", "y2 axis"), F.append("g").attr("class", "lines1Wrap"), F.append("g").attr("class", "lines2Wrap"), F.append("g").attr("class", "bars1Wrap"), F.append("g").attr("class", "bars2Wrap"), F.append("g").attr("class", "stack1Wrap"), F.append("g").attr("class", "stack2Wrap"), F.append("g").attr("class", "legendWrap");
                var I = j.select("g");
                s && (x.width(k / 2), I.select(".legendWrap").datum(e.map(function(e) {
                    return e.originalKey = e.originalKey === undefined ? e.key : e.originalKey, e.key = e.originalKey + (e.yAxis == 1 ? "" : " (right axis)"), e
                })).call(x), t.top != x.height() && (t.top = x.height(), L = (i || parseInt(u.style("height")) || 400) - t.top - t.bottom), I.select(".legendWrap").attr("transform", "translate(" + k / 2 + "," + -t.top + ")")), d.width(k).height(L).interpolate("monotone").color(e.map(function(e, t) {
                    return e.color || n[t % n.length]
                }).filter(function(t, n) {
                    return !e[n].disabled && e[n].yAxis == 1 && e[n].type == "line"
                })), v.width(k).height(L).interpolate("monotone").color(e.map(function(e, t) {
                    return e.color || n[t % n.length]
                }).filter(function(t, n) {
                    return !e[n].disabled && e[n].yAxis == 2 && e[n].type == "line"
                })), m.width(k).height(L).color(e.map(function(e, t) {
                    return e.color || n[t % n.length]
                }).filter(function(t, n) {
                    return !e[n].disabled && e[n].yAxis == 1 && e[n].type == "bar"
                })), g.width(k).height(L).color(e.map(function(e, t) {
                    return e.color || n[t % n.length]
                }).filter(function(t, n) {
                    return !e[n].disabled && e[n].yAxis == 2 && e[n].type == "bar"
                })), y.width(k).height(L).color(e.map(function(e, t) {
                    return e.color || n[t % n.length]
                }).filter(function(t, n) {
                    return !e[n].disabled && e[n].yAxis == 1 && e[n].type == "area"
                })), b.width(k).height(L).color(e.map(function(e, t) {
                    return e.color || n[t % n.length]
                }).filter(function(t, n) {
                    return !e[n].disabled && e[n].yAxis == 2 && e[n].type == "area"
                })), I.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var q = I.select(".lines1Wrap").datum(A),
                    R = I.select(".bars1Wrap").datum(M),
                    U = I.select(".stack1Wrap").datum(D),
                    z = I.select(".lines2Wrap").datum(O),
                    W = I.select(".bars2Wrap").datum(_),
                    X = I.select(".stack2Wrap").datum(P),
                    V = D.length ? D.map(function(e) {
                        return e.values
                    }).reduce(function(e, t) {
                        return e.map(function(e, n) {
                            return {
                                x: e.x,
                                y: e.y + t[n].y
                            }
                        })
                    }).concat([{
                        x: 0,
                        y: 0
                    }]) : [],
                    $ = P.length ? P.map(function(e) {
                        return e.values
                    }).reduce(function(e, t) {
                        return e.map(function(e, n) {
                            return {
                                x: e.x,
                                y: e.y + t[n].y
                            }
                        })
                    }).concat([{
                        x: 0,
                        y: 0
                    }]) : [];
                h.domain(l || d3.extent(d3.merge(H).concat(V), function(e) {
                    return e.y
                })).range([0, L]), p.domain(c || d3.extent(d3.merge(B).concat($), function(e) {
                    return e.y
                })).range([0, L]), d.yDomain(h.domain()), m.yDomain(h.domain()), y.yDomain(h.domain()), v.yDomain(p.domain()), g.yDomain(p.domain()), b.yDomain(p.domain()), D.length && d3.transition(U).call(y), P.length && d3.transition(X).call(b), M.length && d3.transition(R).call(m), _.length && d3.transition(W).call(g), A.length && d3.transition(q).call(d), O.length && d3.transition(z).call(v), w.ticks(k / 100).tickSize(-L, 0), I.select(".x.axis").attr("transform", "translate(0," + L + ")"), d3.transition(I.select(".x.axis")).call(w), E.ticks(L / 36).tickSize(-k, 0), d3.transition(I.select(".y1.axis")).call(E), S.ticks(L / 36).tickSize(-k, 0), d3.transition(I.select(".y2.axis")).call(S), I.select(".y2.axis").style("opacity", B.length ? 1 : 0).attr("transform", "translate(" + a.range()[1] + ",0)"), x.dispatch.on("stateChange", function(e) {
                    C.update()
                }), T.on("tooltipShow", function(e) {
                    o && N(e, f.parentNode)
                })
            }), C
        }
        var t = {
                top: 30,
                right: 20,
                bottom: 50,
                left: 60
            },
            n = d3.scale.category20().range(),
            r = null,
            i = null,
            s = !0,
            o = !0,
            u = function(e, t, n, r, i) {
                return "<h3>" + e + "</h3>" + "<p>" + n + " at " + t + "</p>"
            },
            a, f, l, c, a = d3.scale.linear(),
            h = d3.scale.linear(),
            p = d3.scale.linear(),
            d = e.models.line().yScale(h),
            v = e.models.line().yScale(p),
            m = e.models.multiBar().stacked(!1).yScale(h),
            g = e.models.multiBar().stacked(!1).yScale(p),
            y = e.models.stackedArea().yScale(h),
            b = e.models.stackedArea().yScale(p),
            w = e.models.axis().scale(a).orient("bottom").tickPadding(5),
            E = e.models.axis().scale(h).orient("left"),
            S = e.models.axis().scale(p).orient("right"),
            x = e.models.legend().height(30),
            T = d3.dispatch("tooltipShow", "tooltipHide"),
            N = function(t, n) {
                var r = t.pos[0] + (n.offsetLeft || 0),
                    i = t.pos[1] + (n.offsetTop || 0),
                    s = w.tickFormat()(d.x()(t.point, t.pointIndex)),
                    o = (t.series.yAxis == 2 ? S : E).tickFormat()(d.y()(t.point, t.pointIndex)),
                    a = u(t.series.key, s, o, t, C);
                e.tooltip.show([r, i], a, undefined, undefined, n.offsetParent)
            };
        return d.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top], T.tooltipShow(e)
        }), d.dispatch.on("elementMouseout.tooltip", function(e) {
            T.tooltipHide(e)
        }), v.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top], T.tooltipShow(e)
        }), v.dispatch.on("elementMouseout.tooltip", function(e) {
            T.tooltipHide(e)
        }), m.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top], T.tooltipShow(e)
        }), m.dispatch.on("elementMouseout.tooltip", function(e) {
            T.tooltipHide(e)
        }), g.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top], T.tooltipShow(e)
        }), g.dispatch.on("elementMouseout.tooltip", function(e) {
            T.tooltipHide(e)
        }), y.dispatch.on("tooltipShow", function(e) {
            if (!Math.round(y.y()(e.point) * 100)) return setTimeout(function() {
                d3.selectAll(".point.hover").classed("hover", !1)
            }, 0), !1;
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top], T.tooltipShow(e)
        }), y.dispatch.on("tooltipHide", function(e) {
            T.tooltipHide(e)
        }), b.dispatch.on("tooltipShow", function(e) {
            if (!Math.round(b.y()(e.point) * 100)) return setTimeout(function() {
                d3.selectAll(".point.hover").classed("hover", !1)
            }, 0), !1;
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top], T.tooltipShow(e)
        }), b.dispatch.on("tooltipHide", function(e) {
            T.tooltipHide(e)
        }), d.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top], T.tooltipShow(e)
        }), d.dispatch.on("elementMouseout.tooltip", function(e) {
            T.tooltipHide(e)
        }), v.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top], T.tooltipShow(e)
        }), v.dispatch.on("elementMouseout.tooltip", function(e) {
            T.tooltipHide(e)
        }), T.on("tooltipHide", function() {
            o && e.tooltip.cleanup()
        }), C.dispatch = T, C.lines1 = d, C.lines2 = v, C.bars1 = m, C.bars2 = g, C.stack1 = y, C.stack2 = b, C.xAxis = w, C.yAxis1 = E, C.yAxis2 = S, C.options = e.utils.optionsFunc.bind(C), C.x = function(e) {
            return arguments.length ? (getX = e, d.x(e), m.x(e), C) : getX
        }, C.y = function(e) {
            return arguments.length ? (getY = e, d.y(e), m.y(e), C) : getY
        }, C.yDomain1 = function(e) {
            return arguments.length ? (l = e, C) : l
        }, C.yDomain2 = function(e) {
            return arguments.length ? (c = e, C) : c
        }, C.margin = function(e) {
            return arguments.length ? (t = e, C) : t
        }, C.width = function(e) {
            return arguments.length ? (r = e, C) : r
        }, C.height = function(e) {
            return arguments.length ? (i = e, C) : i
        }, C.color = function(e) {
            return arguments.length ? (n = e, x.color(e), C) : n
        }, C.showLegend = function(e) {
            return arguments.length ? (s = e, C) : s
        }, C.tooltips = function(e) {
            return arguments.length ? (o = e, C) : o
        }, C.tooltipContent = function(e) {
            return arguments.length ? (u = e, C) : u
        }, C
    }, e.models.ohlcBar = function() {
        "use strict";

        function x(e) {
            return e.each(function(e) {
                var g = n - t.left - t.right,
                    x = r - t.top - t.bottom,
                    T = d3.select(this);
                s.domain(y || d3.extent(e[0].values.map(u).concat(p))), v ? s.range(w || [g * .5 / e[0].values.length, g * (e[0].values.length - .5) / e[0].values.length]) : s.range(w || [0, g]), o.domain(b || [d3.min(e[0].values.map(h).concat(d)), d3.max(e[0].values.map(c).concat(d))]).range(E || [x, 0]), s.domain()[0] === s.domain()[1] && (s.domain()[0] ? s.domain([s.domain()[0] - s.domain()[0] * .01, s.domain()[1] + s.domain()[1] * .01]) : s.domain([-1, 1])), o.domain()[0] === o.domain()[1] && (o.domain()[0] ? o.domain([o.domain()[0] + o.domain()[0] * .01, o.domain()[1] - o.domain()[1] * .01]) : o.domain([-1, 1]));
                var N = d3.select(this).selectAll("g.nv-wrap.nv-ohlcBar").data([e[0].values]),
                    C = N.enter().append("g").attr("class", "nvd3 nv-wrap nv-ohlcBar"),
                    k = C.append("defs"),
                    L = C.append("g"),
                    A = N.select("g");
                L.append("g").attr("class", "nv-ticks"), N.attr("transform", "translate(" + t.left + "," + t.top + ")"), T.on("click", function(e, t) {
                    S.chartClick({
                        data: e,
                        index: t,
                        pos: d3.event,
                        id: i
                    })
                }), k.append("clipPath").attr("id", "nv-chart-clip-path-" + i).append("rect"), N.select("#nv-chart-clip-path-" + i + " rect").attr("width", g).attr("height", x), A.attr("clip-path", m ? "url(#nv-chart-clip-path-" + i + ")" : "");
                var O = N.select(".nv-ticks").selectAll(".nv-tick").data(function(e) {
                    return e
                });
                O.exit().remove();
                var M = O.enter().append("path").attr("class", function(e, t, n) {
                    return (f(e, t) > l(e, t) ? "nv-tick negative" : "nv-tick positive") + " nv-tick-" + n + "-" + t
                }).attr("d", function(t, n) {
                    var r = g / e[0].values.length * .9;
                    return "m0,0l0," + (o(f(t, n)) - o(c(t, n))) + "l" + -r / 2 + ",0l" + r / 2 + ",0l0," + (o(h(t, n)) - o(f(t, n))) + "l0," + (o(l(t, n)) - o(h(t, n))) + "l" + r / 2 + ",0l" + -r / 2 + ",0z"
                }).attr("transform", function(e, t) {
                    return "translate(" + s(u(e, t)) + "," + o(c(e, t)) + ")"
                }).on("mouseover", function(t, n) {
                    d3.select(this).classed("hover", !0), S.elementMouseover({
                        point: t,
                        series: e[0],
                        pos: [s(u(t, n)), o(a(t, n))],
                        pointIndex: n,
                        seriesIndex: 0,
                        e: d3.event
                    })
                }).on("mouseout", function(t, n) {
                    d3.select(this).classed("hover", !1), S.elementMouseout({
                        point: t,
                        series: e[0],
                        pointIndex: n,
                        seriesIndex: 0,
                        e: d3.event
                    })
                }).on("click", function(e, t) {
                    S.elementClick({
                        value: a(e, t),
                        data: e,
                        index: t,
                        pos: [s(u(e, t)), o(a(e, t))],
                        e: d3.event,
                        id: i
                    }), d3.event.stopPropagation()
                }).on("dblclick", function(e, t) {
                    S.elementDblClick({
                        value: a(e, t),
                        data: e,
                        index: t,
                        pos: [s(u(e, t)), o(a(e, t))],
                        e: d3.event,
                        id: i
                    }), d3.event.stopPropagation()
                });
                O.attr("class", function(e, t, n) {
                    return (f(e, t) > l(e, t) ? "nv-tick negative" : "nv-tick positive") + " nv-tick-" + n + "-" + t
                }), d3.transition(O).attr("transform", function(e, t) {
                    return "translate(" + s(u(e, t)) + "," + o(c(e, t)) + ")"
                }).attr("d", function(t, n) {
                    var r = g / e[0].values.length * .9;
                    return "m0,0l0," + (o(f(t, n)) - o(c(t, n))) + "l" + -r / 2 + ",0l" + r / 2 + ",0l0," + (o(h(t, n)) - o(f(t, n))) + "l0," + (o(l(t, n)) - o(h(t, n))) + "l" + r / 2 + ",0l" + -r / 2 + ",0z"
                })
            }), x
        }
        var t = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            n = 960,
            r = 500,
            i = Math.floor(Math.random() * 1e4),
            s = d3.scale.linear(),
            o = d3.scale.linear(),
            u = function(e) {
                return e.x
            },
            a = function(e) {
                return e.y
            },
            f = function(e) {
                return e.open
            },
            l = function(e) {
                return e.close
            },
            c = function(e) {
                return e.high
            },
            h = function(e) {
                return e.low
            },
            p = [],
            d = [],
            v = !1,
            m = !0,
            g = e.utils.defaultColor(),
            y, b, w, E, S = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout");
        return x.dispatch = S, x.options = e.utils.optionsFunc.bind(x), x.x = function(e) {
            return arguments.length ? (u = e, x) : u
        }, x.y = function(e) {
            return arguments.length ? (a = e, x) : a
        }, x.open = function(e) {
            return arguments.length ? (f = e, x) : f
        }, x.close = function(e) {
            return arguments.length ? (l = e, x) : l
        }, x.high = function(e) {
            return arguments.length ? (c = e, x) : c
        }, x.low = function(e) {
            return arguments.length ? (h = e, x) : h
        }, x.margin = function(e) {
            return arguments.length ? (t.top = typeof e.top != "undefined" ? e.top : t.top, t.right = typeof e.right != "undefined" ? e.right : t.right, t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom, t.left = typeof e.left != "undefined" ? e.left : t.left, x) : t
        }, x.width = function(e) {
            return arguments.length ? (n = e, x) : n
        }, x.height = function(e) {
            return arguments.length ? (r = e, x) : r
        }, x.xScale = function(e) {
            return arguments.length ? (s = e, x) : s
        }, x.yScale = function(e) {
            return arguments.length ? (o = e, x) : o
        }, x.xDomain = function(e) {
            return arguments.length ? (y = e, x) : y
        }, x.yDomain = function(e) {
            return arguments.length ? (b = e, x) : b
        }, x.xRange = function(e) {
            return arguments.length ? (w = e, x) : w
        }, x.yRange = function(e) {
            return arguments.length ? (E = e, x) : E
        }, x.forceX = function(e) {
            return arguments.length ? (p = e, x) : p
        }, x.forceY = function(e) {
            return arguments.length ? (d = e, x) : d
        }, x.padData = function(e) {
            return arguments.length ? (v = e, x) : v
        }, x.clipEdge = function(e) {
            return arguments.length ? (m = e, x) : m
        }, x.color = function(t) {
            return arguments.length ? (g = e.utils.getColor(t), x) : g
        }, x.id = function(e) {
            return arguments.length ? (i = e, x) : i
        }, x
    }, e.models.pie = function() {
        "use strict";

        function S(e) {
            return e.each(function(e) {
                function q(e) {
                    var t = (e.startAngle + e.endAngle) * 90 / Math.PI - 90;
                    return t > 90 ? t - 180 : t
                }

                function R(e) {
                    e.endAngle = isNaN(e.endAngle) ? 0 : e.endAngle, e.startAngle = isNaN(e.startAngle) ? 0 : e.startAngle, m || (e.innerRadius = 0);
                    var t = d3.interpolate(this._current, e);
                    return this._current = t(0),
                        function(e) {
                            return A(t(e))
                        }
                }

                function U(e) {
                    e.innerRadius = 0;
                    var t = d3.interpolate({
                        startAngle: 0,
                        endAngle: 0
                    }, e);
                    return function(e) {
                        return A(t(e))
                    }
                }
                var o = n - t.left - t.right,
                    f = r - t.top - t.bottom,
                    S = Math.min(o, f) / 2,
                    x = S - S / 5,
                    T = d3.select(this),
                    N = T.selectAll(".nv-wrap.nv-pie").data(e),
                    C = N.enter().append("g").attr("class", "nvd3 nv-wrap nv-pie nv-chart-" + u),
                    k = C.append("g"),
                    L = N.select("g");
                k.append("g").attr("class", "nv-pie"), k.append("g").attr("class", "nv-pieLabels"), N.attr("transform", "translate(" + t.left + "," + t.top + ")"), L.select(".nv-pie").attr("transform", "translate(" + o / 2 + "," + f / 2 + ")"), L.select(".nv-pieLabels").attr("transform", "translate(" + o / 2 + "," + f / 2 + ")"), T.on("click", function(e, t) {
                    E.chartClick({
                        data: e,
                        index: t,
                        pos: d3.event,
                        id: u
                    })
                });
                var A = d3.svg.arc().outerRadius(x);
                y && A.startAngle(y), b && A.endAngle(b), m && A.innerRadius(S * w);
                var O = d3.layout.pie().sort(null).value(function(e) {
                        return e.disabled ? 0 : s(e)
                    }),
                    M = N.select(".nv-pie").selectAll(".nv-slice").data(O),
                    _ = N.select(".nv-pieLabels").selectAll(".nv-label").data(O);
                M.exit().remove(), _.exit().remove();
                var D = M.enter().append("g").attr("class", "nv-slice").on("mouseover", function(e, t) {
                    d3.select(this).classed("hover", !0), E.elementMouseover({
                        label: i(e.data),
                        value: s(e.data),
                        point: e.data,
                        pointIndex: t,
                        pos: [d3.event.pageX, d3.event.pageY],
                        id: u
                    })
                }).on("mouseout", function(e, t) {
                    d3.select(this).classed("hover", !1), E.elementMouseout({
                        label: i(e.data),
                        value: s(e.data),
                        point: e.data,
                        index: t,
                        id: u
                    })
                }).on("click", function(e, t) {
                    E.elementClick({
                        label: i(e.data),
                        value: s(e.data),
                        point: e.data,
                        index: t,
                        pos: d3.event,
                        id: u
                    }), d3.event.stopPropagation()
                }).on("dblclick", function(e, t) {
                    E.elementDblClick({
                        label: i(e.data),
                        value: s(e.data),
                        point: e.data,
                        index: t,
                        pos: d3.event,
                        id: u
                    }), d3.event.stopPropagation()
                });
                M.attr("fill", function(e, t) {
                    return a(e, t)
                }).attr("stroke", function(e, t) {
                    return a(e, t)
                });
                var P = D.append("path").each(function(e) {
                    this._current = e
                });
                M.select("path").transition().attr("d", A).attrTween("d", R);
                if (l) {
                    var H = d3.svg.arc().innerRadius(0);
                    c && (H = A), h && (H = d3.svg.arc().outerRadius(A.outerRadius())), _.enter().append("g").classed("nv-label", !0).each(function(e, t) {
                        var n = d3.select(this);
                        n.attr("transform", function(e) {
                            if (g) {
                                e.outerRadius = x + 10, e.innerRadius = x + 15;
                                var t = (e.startAngle + e.endAngle) / 2 * (180 / Math.PI);
                                return (e.startAngle + e.endAngle) / 2 < Math.PI ? t -= 90 : t += 90, "translate(" + H.centroid(e) + ") rotate(" + t + ")"
                            }
                            return e.outerRadius = S + 10, e.innerRadius = S + 15, "translate(" + H.centroid(e) + ")"
                        }), n.append("rect").style("stroke", "#fff").style("fill", "#fff").attr("rx", 3).attr("ry", 3), n.append("text").style("text-anchor", g ? (e.startAngle + e.endAngle) / 2 < Math.PI ? "start" : "end" : "middle").style("fill", "#000")
                    });
                    var B = {},
                        j = 14,
                        F = 140,
                        I = function(e) {
                            return Math.floor(e[0] / F) * F + "," + Math.floor(e[1] / j) * j
                        };
                    _.transition().attr("transform", function(e) {
                        if (g) {
                            e.outerRadius = x + 10, e.innerRadius = x + 15;
                            var t = (e.startAngle + e.endAngle) / 2 * (180 / Math.PI);
                            return (e.startAngle + e.endAngle) / 2 < Math.PI ? t -= 90 : t += 90, "translate(" + H.centroid(e) + ") rotate(" + t + ")"
                        }
                        e.outerRadius = S + 10, e.innerRadius = S + 15;
                        var n = H.centroid(e),
                            r = I(n);
                        return B[r] && (n[1] -= j), B[I(n)] = !0, "translate(" + n + ")"
                    }), _.select(".nv-label text").style("text-anchor", g ? (d.startAngle + d.endAngle) / 2 < Math.PI ? "start" : "end" : "middle").text(function(e, t) {
                        var n = (e.endAngle - e.startAngle) / (2 * Math.PI),
                            r = {
                                key: i(e.data),
                                value: s(e.data),
                                percent: d3.format("%")(n)
                            };
                        return e.value && n > v ? r[p] : ""
                    })
                }
            }), S
        }
        var t = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            n = 500,
            r = 500,
            i = function(e) {
                return e.x
            },
            s = function(e) {
                return e.y
            },
            o = function(e) {
                return e.description
            },
            u = Math.floor(Math.random() * 1e4),
            a = e.utils.defaultColor(),
            f = d3.format(",.2f"),
            l = !0,
            c = !0,
            h = !1,
            p = "key",
            v = .02,
            m = !1,
            g = !1,
            y = !1,
            b = !1,
            w = .5,
            E = d3.dispatch("chartClick", "elementClick", "elementDblClick", "elementMouseover", "elementMouseout");
        return S.dispatch = E, S.options = e.utils.optionsFunc.bind(S), S.margin = function(e) {
            return arguments.length ? (t.top = typeof e.top != "undefined" ? e.top : t.top, t.right = typeof e.right != "undefined" ? e.right : t.right, t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom, t.left = typeof e.left != "undefined" ? e.left : t.left, S) : t
        }, S.width = function(e) {
            return arguments.length ? (n = e, S) : n
        }, S.height = function(e) {
            return arguments.length ? (r = e, S) : r
        }, S.values = function(t) {
            return e.log("pie.values() is no longer supported."), S
        }, S.x = function(e) {
            return arguments.length ? (i = e, S) : i
        }, S.y = function(e) {
            return arguments.length ? (s = d3.functor(e), S) : s
        }, S.description = function(e) {
            return arguments.length ? (o = e, S) : o
        }, S.showLabels = function(e) {
            return arguments.length ? (l = e, S) : l
        }, S.labelSunbeamLayout = function(e) {
            return arguments.length ? (g = e, S) : g
        }, S.donutLabelsOutside = function(e) {
            return arguments.length ? (h = e, S) : h
        }, S.pieLabelsOutside = function(e) {
            return arguments.length ? (c = e, S) : c
        }, S.labelType = function(e) {
            return arguments.length ? (p = e, p = p || "key", S) : p
        }, S.donut = function(e) {
            return arguments.length ? (m = e, S) : m
        }, S.donutRatio = function(e) {
            return arguments.length ? (w = e, S) : w
        }, S.startAngle = function(e) {
            return arguments.length ? (y = e, S) : y
        }, S.endAngle = function(e) {
            return arguments.length ? (b = e, S) : b
        }, S.id = function(e) {
            return arguments.length ? (u = e, S) : u
        }, S.color = function(t) {
            return arguments.length ? (a = e.utils.getColor(t), S) : a
        }, S.valueFormat = function(e) {
            return arguments.length ? (f = e, S) : f
        }, S.labelThreshold = function(e) {
            return arguments.length ? (v = e, S) : v
        }, S
    }, e.models.pieChart = function() {
        "use strict";

        function v(e) {
            return e.each(function(e) {
                var u = d3.select(this),
                    a = this,
                    f = (i || parseInt(u.style("width")) || 960) - r.left - r.right,
                    d = (s || parseInt(u.style("height")) || 400) - r.top - r.bottom;
                v.update = function() {
                    u.transition().call(v)
                }, v.container = this, l.disabled = e.map(function(e) {
                    return !!e.disabled
                });
                if (!c) {
                    var m;
                    c = {};
                    for (m in l) l[m] instanceof Array ? c[m] = l[m].slice(0) : c[m] = l[m]
                }
                if (!e || !e.length) {
                    var g = u.selectAll(".nv-noData").data([h]);
                    return g.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"), g.attr("x", r.left + f / 2).attr("y", r.top + d / 2).text(function(e) {
                        return e
                    }), v
                }
                u.selectAll(".nv-noData").remove();
                var y = u.selectAll("g.nv-wrap.nv-pieChart").data([e]),
                    b = y.enter().append("g").attr("class", "nvd3 nv-wrap nv-pieChart").append("g"),
                    w = y.select("g");
                b.append("g").attr("class", "nv-pieWrap"), b.append("g").attr("class", "nv-legendWrap"), o && (n.width(f).key(t.x()), y.select(".nv-legendWrap").datum(e).call(n), r.top != n.height() && (r.top = n.height(), d = (s || parseInt(u.style("height")) || 400) - r.top - r.bottom), y.select(".nv-legendWrap").attr("transform", "translate(0," + -r.top + ")")), y.attr("transform", "translate(" + r.left + "," + r.top + ")"), t.width(f).height(d);
                var E = w.select(".nv-pieWrap").datum([e]);
                d3.transition(E).call(t), n.dispatch.on("stateChange", function(e) {
                    l = e, p.stateChange(l), v.update()
                }), t.dispatch.on("elementMouseout.tooltip", function(e) {
                    p.tooltipHide(e)
                }), p.on("changeState", function(t) {
                    typeof t.disabled != "undefined" && (e.forEach(function(e, n) {
                        e.disabled = t.disabled[n]
                    }), l.disabled = t.disabled), v.update()
                })
            }), v
        }
        var t = e.models.pie(),
            n = e.models.legend(),
            r = {
                top: 30,
                right: 20,
                bottom: 20,
                left: 20
            },
            i = null,
            s = null,
            o = !0,
            u = e.utils.defaultColor(),
            a = !0,
            f = function(e, t, n, r) {
                return "<h3>" + e + "</h3>" + "<p>" + t + "</p>"
            },
            l = {},
            c = null,
            h = "No Data Available.",
            p = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"),
            d = function(n, r) {
                var i = t.description()(n.point) || t.x()(n.point),
                    s = n.pos[0] + (r && r.offsetLeft || 0),
                    o = n.pos[1] + (r && r.offsetTop || 0),
                    u = t.valueFormat()(t.y()(n.point)),
                    a = f(i, u, n, v);
                e.tooltip.show([s, o], a, n.value < 0 ? "n" : "s", null, r)
            };
        return t.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + r.left, e.pos[1] + r.top], p.tooltipShow(e)
        }), p.on("tooltipShow", function(e) {
            a && d(e)
        }), p.on("tooltipHide", function() {
            a && e.tooltip.cleanup()
        }), v.legend = n, v.dispatch = p, v.pie = t, d3.rebind(v, t, "valueFormat", "values", "x", "y", "description", "id", "showLabels", "donutLabelsOutside", "pieLabelsOutside", "labelType", "donut", "donutRatio", "labelThreshold"), v.options = e.utils.optionsFunc.bind(v), v.margin = function(e) {
            return arguments.length ? (r.top = typeof e.top != "undefined" ? e.top : r.top, r.right = typeof e.right != "undefined" ? e.right : r.right, r.bottom = typeof e.bottom != "undefined" ? e.bottom : r.bottom, r.left = typeof e.left != "undefined" ? e.left : r.left, v) : r
        }, v.width = function(e) {
            return arguments.length ? (i = e, v) : i
        }, v.height = function(e) {
            return arguments.length ? (s = e, v) : s
        }, v.color = function(r) {
            return arguments.length ? (u = e.utils.getColor(r), n.color(u), t.color(u), v) : u
        }, v.showLegend = function(e) {
            return arguments.length ? (o = e, v) : o
        }, v.tooltips = function(e) {
            return arguments.length ? (a = e, v) : a
        }, v.tooltipContent = function(e) {
            return arguments.length ? (f = e, v) : f
        }, v.state = function(e) {
            return arguments.length ? (l = e, v) : l
        }, v.defaultState = function(e) {
            return arguments.length ? (c = e, v) : c
        }, v.noData = function(e) {
            return arguments.length ? (h = e, v) : h
        }, v
    }, e.models.scatter = function() {
        "use strict";

        function I(q) {
            return q.each(function(I) {
                function Q() {
                    if (!g) return !1;
                    var e, i = d3.merge(I.map(function(e, t) {
                        return e.values.map(function(e, n) {
                            var r = f(e, n),
                                i = l(e, n);
                            return [o(r) + Math.random() * 1e-7, u(i) + Math.random() * 1e-7, t, n, e]
                        }).filter(function(e, t) {
                            return b(e[4], t)
                        })
                    }));
                    if (D === !0) {
                        if (x) {
                            var a = X.select("defs").selectAll(".nv-point-clips").data([s]).enter();
                            a.append("clipPath").attr("class", "nv-point-clips").attr("id", "nv-points-clip-" + s);
                            var c = X.select("#nv-points-clip-" + s).selectAll("circle").data(i);
                            c.enter().append("circle").attr("r", T), c.exit().remove(), c.attr("cx", function(e) {
                                return e[0]
                            }).attr("cy", function(e) {
                                return e[1]
                            }), X.select(".nv-point-paths").attr("clip-path", "url(#nv-points-clip-" + s + ")")
                        }
                        i.length && (i.push([o.range()[0] - 20, u.range()[0] - 20, null, null]), i.push([o.range()[1] + 20, u.range()[1] + 20, null, null]), i.push([o.range()[0] - 20, u.range()[0] + 20, null, null]), i.push([o.range()[1] + 20, u.range()[1] - 20, null, null]));
                        var h = d3.geom.polygon([
                                [-10, -10],
                                [-10, r + 10],
                                [n + 10, r + 10],
                                [n + 10, -10]
                            ]),
                            p = d3.geom.voronoi(i).map(function(e, t) {
                                return {
                                    data: h.clip(e),
                                    series: i[t][2],
                                    point: i[t][3]
                                }
                            }),
                            d = X.select(".nv-point-paths").selectAll("path").data(p);
                        d.enter().append("path").attr("class", function(e, t) {
                            return "nv-path-" + t
                        }), d.exit().remove(), d.attr("d", function(e) {
                            return e.data.length === 0 ? "M 0 0" : "M" + e.data.join("L") + "Z"
                        });
                        var v = function(e, n) {
                            if (F) return 0;
                            var r = I[e.series];
                            if (typeof r == "undefined") return;
                            var i = r.values[e.point];
                            n({
                                point: i,
                                series: r,
                                pos: [o(f(i, e.point)) + t.left, u(l(i, e.point)) + t.top],
                                seriesIndex: e.series,
                                pointIndex: e.point
                            })
                        };
                        d.on("click", function(e) {
                            v(e, _.elementClick)
                        }).on("mouseover", function(e) {
                            v(e, _.elementMouseover)
                        }).on("mouseout", function(e, t) {
                            v(e, _.elementMouseout)
                        })
                    } else X.select(".nv-groups").selectAll(".nv-group").selectAll(".nv-point").on("click", function(e, n) {
                        if (F || !I[e.series]) return 0;
                        var r = I[e.series],
                            i = r.values[n];
                        _.elementClick({
                            point: i,
                            series: r,
                            pos: [o(f(i, n)) + t.left, u(l(i, n)) + t.top],
                            seriesIndex: e.series,
                            pointIndex: n
                        })
                    }).on("mouseover", function(e, n) {
                        if (F || !I[e.series]) return 0;
                        var r = I[e.series],
                            i = r.values[n];
                        _.elementMouseover({
                            point: i,
                            series: r,
                            pos: [o(f(i, n)) + t.left, u(l(i, n)) + t.top],
                            seriesIndex: e.series,
                            pointIndex: n
                        })
                    }).on("mouseout", function(e, t) {
                        if (F || !I[e.series]) return 0;
                        var n = I[e.series],
                            r = n.values[t];
                        _.elementMouseout({
                            point: r,
                            series: n,
                            seriesIndex: e.series,
                            pointIndex: t
                        })
                    });
                    F = !1
                }
                var q = n - t.left - t.right,
                    R = r - t.top - t.bottom,
                    U = d3.select(this);
                I.forEach(function(e, t) {
                    e.values.forEach(function(e) {
                        e.series = t
                    })
                });
                var W = N && C && A ? [] : d3.merge(I.map(function(e) {
                    return e.values.map(function(e, t) {
                        return {
                            x: f(e, t),
                            y: l(e, t),
                            size: c(e, t)
                        }
                    })
                }));
                o.domain(N || d3.extent(W.map(function(e) {
                    return e.x
                }).concat(d))), w && I[0] ? o.range(k || [(q * E + q) / (2 * I[0].values.length), q - q * (1 + E) / (2 * I[0].values.length)]) : o.range(k || [0, q]), u.domain(C || d3.extent(W.map(function(e) {
                    return e.y
                }).concat(v))).range(L || [R, 0]), a.domain(A || d3.extent(W.map(function(e) {
                    return e.size
                }).concat(m))).range(O || [16, 256]);
                if (o.domain()[0] === o.domain()[1] || u.domain()[0] === u.domain()[1]) M = !0;
                o.domain()[0] === o.domain()[1] && (o.domain()[0] ? o.domain([o.domain()[0] - o.domain()[0] * .01, o.domain()[1] + o.domain()[1] * .01]) : o.domain([-1, 1])), u.domain()[0] === u.domain()[1] && (u.domain()[0] ? u.domain([u.domain()[0] - u.domain()[0] * .01, u.domain()[1] + u.domain()[1] * .01]) : u.domain([-1, 1])), isNaN(o.domain()[0]) && o.domain([-1, 1]), isNaN(u.domain()[0]) && u.domain([-1, 1]), P = P || o, H = H || u, B = B || a;
                var X = U.selectAll("g.nv-wrap.nv-scatter").data([I]),
                    V = X.enter().append("g").attr("class", "nvd3 nv-wrap nv-scatter nv-chart-" + s + (M ? " nv-single-point" : "")),
                    $ = V.append("defs"),
                    J = V.append("g"),
                    K = X.select("g");
                J.append("g").attr("class", "nv-groups"), J.append("g").attr("class", "nv-point-paths"), X.attr("transform", "translate(" + t.left + "," + t.top + ")"), $.append("clipPath").attr("id", "nv-edge-clip-" + s).append("rect"), X.select("#nv-edge-clip-" + s + " rect").attr("width", q).attr("height", R > 0 ? R : 0), K.attr("clip-path", S ? "url(#nv-edge-clip-" + s + ")" : ""), F = !0;
                var G = X.select(".nv-groups").selectAll(".nv-group").data(function(e) {
                    return e
                }, function(e) {
                    return e.key
                });
                G.enter().append("g").style("stroke-opacity", 1e-6).style("fill-opacity", 1e-6), G.exit().remove(), G.attr("class", function(e, t) {
                    return "nv-group nv-series-" + t
                }).classed("hover", function(e) {
                    return e.hover
                }), G.transition().style("fill", function(e, t) {
                    return i(e, t)
                }).style("stroke", function(e, t) {
                    return i(e, t)
                }).style("stroke-opacity", 1).style("fill-opacity", .5);
                if (p) {
                    var Y = G.selectAll("circle.nv-point").data(function(e) {
                        return e.values
                    }, y);
                    Y.enter().append("circle").style("fill", function(e, t) {
                        return e.color
                    }).style("stroke", function(e, t) {
                        return e.color
                    }).attr("cx", function(t, n) {
                        return e.utils.NaNtoZero(P(f(t, n)))
                    }).attr("cy", function(t, n) {
                        return e.utils.NaNtoZero(H(l(t, n)))
                    }).attr("r", function(e, t) {
                        return Math.sqrt(a(c(e, t)) / Math.PI)
                    }), Y.exit().remove(), G.exit().selectAll("path.nv-point").transition().attr("cx", function(t, n) {
                        return e.utils.NaNtoZero(o(f(t, n)))
                    }).attr("cy", function(t, n) {
                        return e.utils.NaNtoZero(u(l(t, n)))
                    }).remove(), Y.each(function(e, t) {
                        d3.select(this).classed("nv-point", !0).classed("nv-point-" + t, !0).classed("hover", !1)
                    }), Y.transition().attr("cx", function(t, n) {
                        return e.utils.NaNtoZero(o(f(t, n)))
                    }).attr("cy", function(t, n) {
                        return e.utils.NaNtoZero(u(l(t, n)))
                    }).attr("r", function(e, t) {
                        return Math.sqrt(a(c(e, t)) / Math.PI)
                    })
                } else {
                    var Y = G.selectAll("path.nv-point").data(function(e) {
                        return e.values
                    });
                    Y.enter().append("path").style("fill", function(e, t) {
                        return e.color
                    }).style("stroke", function(e, t) {
                        return e.color
                    }).attr("transform", function(e, t) {
                        return "translate(" + P(f(e, t)) + "," + H(l(e, t)) + ")"
                    }).attr("d", d3.svg.symbol().type(h).size(function(e, t) {
                        return a(c(e, t))
                    })), Y.exit().remove(), G.exit().selectAll("path.nv-point").transition().attr("transform", function(e, t) {
                        return "translate(" + o(f(e, t)) + "," + u(l(e, t)) + ")"
                    }).remove(), Y.each(function(e, t) {
                        d3.select(this).classed("nv-point", !0).classed("nv-point-" + t, !0).classed("hover", !1)
                    }), Y.transition().attr("transform", function(e, t) {
                        return "translate(" + o(f(e, t)) + "," + u(l(e, t)) + ")"
                    }).attr("d", d3.svg.symbol().type(h).size(function(e, t) {
                        return a(c(e, t))
                    }))
                }
                clearTimeout(j), j = setTimeout(Q, 300), P = o.copy(), H = u.copy(), B = a.copy()
            }), I
        }
        var t = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            n = 960,
            r = 500,
            i = e.utils.defaultColor(),
            s = Math.floor(Math.random() * 1e5),
            o = d3.scale.linear(),
            u = d3.scale.linear(),
            a = d3.scale.linear(),
            f = function(e) {
                return e.x
            },
            l = function(e) {
                return e.y
            },
            c = function(e) {
                return e.size || 1
            },
            h = function(e) {
                return e.shape || "circle"
            },
            p = !0,
            d = [],
            v = [],
            m = [],
            g = !0,
            y = null,
            b = function(e) {
                return !e.notActive
            },
            w = !1,
            E = .1,
            S = !1,
            x = !0,
            T = function() {
                return 25
            },
            N = null,
            C = null,
            k = null,
            L = null,
            A = null,
            O = null,
            M = !1,
            _ = d3.dispatch("elementClick", "elementMouseover", "elementMouseout"),
            D = !0,
            P, H, B, j, F = !1;
        return I.clearHighlights = function() {
            d3.selectAll(".nv-chart-" + s + " .nv-point.hover").classed("hover", !1)
        }, I.highlightPoint = function(e, t, n) {
            d3.select(".nv-chart-" + s + " .nv-series-" + e + " .nv-point-" + t).classed("hover", n)
        }, _.on("elementMouseover.point", function(e) {
            g && I.highlightPoint(e.seriesIndex, e.pointIndex, !0)
        }), _.on("elementMouseout.point", function(e) {
            g && I.highlightPoint(e.seriesIndex, e.pointIndex, !1)
        }), I.dispatch = _, I.options = e.utils.optionsFunc.bind(I), I.x = function(e) {
            return arguments.length ? (f = d3.functor(e), I) : f
        }, I.y = function(e) {
            return arguments.length ? (l = d3.functor(e), I) : l
        }, I.size = function(e) {
            return arguments.length ? (c = d3.functor(e), I) : c
        }, I.margin = function(e) {
            return arguments.length ? (t.top = typeof e.top != "undefined" ? e.top : t.top, t.right = typeof e.right != "undefined" ? e.right : t.right, t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom, t.left = typeof e.left != "undefined" ? e.left : t.left, I) : t
        }, I.width = function(e) {
            return arguments.length ? (n = e, I) : n
        }, I.height = function(e) {
            return arguments.length ? (r = e, I) : r
        }, I.xScale = function(e) {
            return arguments.length ? (o = e, I) : o
        }, I.yScale = function(e) {
            return arguments.length ? (u = e, I) : u
        }, I.zScale = function(e) {
            return arguments.length ? (a = e, I) : a
        }, I.xDomain = function(e) {
            return arguments.length ? (N = e, I) : N
        }, I.yDomain = function(e) {
            return arguments.length ? (C = e, I) : C
        }, I.sizeDomain = function(e) {
            return arguments.length ? (A = e, I) : A
        }, I.xRange = function(e) {
            return arguments.length ? (k = e, I) : k
        }, I.yRange = function(e) {
            return arguments.length ? (L = e, I) : L
        }, I.sizeRange = function(e) {
            return arguments.length ? (O = e, I) : O
        }, I.forceX = function(e) {
            return arguments.length ? (d = e, I) : d
        }, I.forceY = function(e) {
            return arguments.length ? (v = e, I) : v
        }, I.forceSize = function(e) {
            return arguments.length ? (m = e, I) : m
        }, I.interactive = function(e) {
            return arguments.length ? (g = e, I) : g
        }, I.pointKey = function(e) {
            return arguments.length ? (y = e, I) : y
        }, I.pointActive = function(e) {
            return arguments.length ? (b = e, I) : b
        }, I.padData = function(e) {
            return arguments.length ? (w = e, I) : w
        }, I.padDataOuter = function(e) {
            return arguments.length ? (E = e, I) : E
        }, I.clipEdge = function(e) {
            return arguments.length ? (S = e, I) : S
        }, I.clipVoronoi = function(e) {
            return arguments.length ? (x = e, I) : x
        }, I.useVoronoi = function(e) {
            return arguments.length ? (D = e, D === !1 && (x = !1), I) : D
        }, I.clipRadius = function(e) {
            return arguments.length ? (T = e, I) : T
        }, I.color = function(t) {
            return arguments.length ? (i = e.utils.getColor(t), I) : i
        }, I.shape = function(e) {
            return arguments.length ? (h = e, I) : h
        }, I.onlyCircles = function(e) {
            return arguments.length ? (p = e, I) : p
        }, I.id = function(e) {
            return arguments.length ? (s = e, I) : s
        }, I.singlePoint = function(e) {
            return arguments.length ? (M = e, I) : M
        }, I
    }, e.models.scatterChart = function() {
        "use strict";

        function F(e) {
            return e.each(function(e) {
                function K() {
                    if (T) return X.select(".nv-point-paths").style("pointer-events", "all"), !1;
                    X.select(".nv-point-paths").style("pointer-events", "none");
                    var i = d3.mouse(this);
                    h.distortion(x).focus(i[0]), p.distortion(x).focus(i[1]), X.select(".nv-scatterWrap").call(t), b && X.select(".nv-x.nv-axis").call(n), w && X.select(".nv-y.nv-axis").call(r), X.select(".nv-distributionX").datum(e.filter(function(e) {
                        return !e.disabled
                    })).call(o), X.select(".nv-distributionY").datum(e.filter(function(e) {
                        return !e.disabled
                    })).call(u)
                }
                var C = d3.select(this),
                    k = this,
                    L = (f || parseInt(C.style("width")) || 960) - a.left - a.right,
                    I = (l || parseInt(C.style("height")) || 400) - a.top - a.bottom;
                F.update = function() {
                    C.transition().duration(D).call(F)
                }, F.container = this, A.disabled = e.map(function(e) {
                    return !!e.disabled
                });
                if (!O) {
                    var q;
                    O = {};
                    for (q in A) A[q] instanceof Array ? O[q] = A[q].slice(0) : O[q] = A[q]
                }
                if (!e || !e.length || !e.filter(function(e) {
                    return e.values.length
                }).length) {
                    var R = C.selectAll(".nv-noData").data([_]);
                    return R.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"), R.attr("x", a.left + L / 2).attr("y", a.top + I / 2).text(function(e) {
                        return e
                    }), F
                }
                C.selectAll(".nv-noData").remove(), P = P || h, H = H || p;
                var U = C.selectAll("g.nv-wrap.nv-scatterChart").data([e]),
                    z = U.enter().append("g").attr("class", "nvd3 nv-wrap nv-scatterChart nv-chart-" + t.id()),
                    W = z.append("g"),
                    X = U.select("g");
                W.append("rect").attr("class", "nvd3 nv-background"), W.append("g").attr("class", "nv-x nv-axis"), W.append("g").attr("class", "nv-y nv-axis"), W.append("g").attr("class", "nv-scatterWrap"), W.append("g").attr("class", "nv-distWrap"), W.append("g").attr("class", "nv-legendWrap"), W.append("g").attr("class", "nv-controlsWrap");
                if (y) {
                    var V = S ? L / 2 : L;
                    i.width(V), U.select(".nv-legendWrap").datum(e).call(i), a.top != i.height() && (a.top = i.height(), I = (l || parseInt(C.style("height")) || 400) - a.top - a.bottom), U.select(".nv-legendWrap").attr("transform", "translate(" + (L - V) + "," + -a.top + ")")
                }
                S && (s.width(180).color(["#444"]), X.select(".nv-controlsWrap").datum(j).attr("transform", "translate(0," + -a.top + ")").call(s)), U.attr("transform", "translate(" + a.left + "," + a.top + ")"), E && X.select(".nv-y.nv-axis").attr("transform", "translate(" + L + ",0)"), t.width(L).height(I).color(e.map(function(e, t) {
                    return e.color || c(e, t)
                }).filter(function(t, n) {
                    return !e[n].disabled
                })), d !== 0 && t.xDomain(null), v !== 0 && t.yDomain(null), U.select(".nv-scatterWrap").datum(e.filter(function(e) {
                    return !e.disabled
                })).call(t);
                if (d !== 0) {
                    var $ = h.domain()[1] - h.domain()[0];
                    t.xDomain([h.domain()[0] - d * $, h.domain()[1] + d * $])
                }
                if (v !== 0) {
                    var J = p.domain()[1] - p.domain()[0];
                    t.yDomain([p.domain()[0] - v * J, p.domain()[1] + v * J])
                }(v !== 0 || d !== 0) && U.select(".nv-scatterWrap").datum(e.filter(function(e) {
                    return !e.disabled
                })).call(t), b && (n.scale(h).ticks(n.ticks() && n.ticks().length ? n.ticks() : L / 100).tickSize(-I, 0), X.select(".nv-x.nv-axis").attr("transform", "translate(0," + p.range()[0] + ")").call(n)), w && (r.scale(p).ticks(r.ticks() && r.ticks().length ? r.ticks() : I / 36).tickSize(-L, 0), X.select(".nv-y.nv-axis").call(r)), m && (o.getData(t.x()).scale(h).width(L).color(e.map(function(e, t) {
                    return e.color || c(e, t)
                }).filter(function(t, n) {
                    return !e[n].disabled
                })), W.select(".nv-distWrap").append("g").attr("class", "nv-distributionX"), X.select(".nv-distributionX").attr("transform", "translate(0," + p.range()[0] + ")").datum(e.filter(function(e) {
                    return !e.disabled
                })).call(o)), g && (u.getData(t.y()).scale(p).width(I).color(e.map(function(e, t) {
                    return e.color || c(e, t)
                }).filter(function(t, n) {
                    return !e[n].disabled
                })), W.select(".nv-distWrap").append("g").attr("class", "nv-distributionY"), X.select(".nv-distributionY").attr("transform", "translate(" + (E ? L : -u.size()) + ",0)").datum(e.filter(function(e) {
                    return !e.disabled
                })).call(u)), d3.fisheye && (X.select(".nv-background").attr("width", L).attr("height", I), X.select(".nv-background").on("mousemove", K), X.select(".nv-background").on("click", function() {
                    T = !T
                }), t.dispatch.on("elementClick.freezeFisheye", function() {
                    T = !T
                })), s.dispatch.on("legendClick", function(e, i) {
                    e.disabled = !e.disabled, x = e.disabled ? 0 : 2.5, X.select(".nv-background").style("pointer-events", e.disabled ? "none" : "all"), X.select(".nv-point-paths").style("pointer-events", e.disabled ? "all" : "none"), e.disabled ? (h.distortion(x).focus(0), p.distortion(x).focus(0), X.select(".nv-scatterWrap").call(t), X.select(".nv-x.nv-axis").call(n), X.select(".nv-y.nv-axis").call(r)) : T = !1, F.update()
                }), i.dispatch.on("stateChange", function(e) {
                    A.disabled = e.disabled, M.stateChange(A), F.update()
                }), t.dispatch.on("elementMouseover.tooltip", function(e) {
                    d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-distx-" + e.pointIndex).attr("y1", function(t, n) {
                        return e.pos[1] - I
                    }), d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-disty-" + e.pointIndex).attr("x2", e.pos[0] + o.size()), e.pos = [e.pos[0] + a.left, e.pos[1] + a.top], M.tooltipShow(e)
                }), M.on("tooltipShow", function(e) {
                    N && B(e, k.parentNode)
                }), M.on("changeState", function(t) {
                    typeof t.disabled != "undefined" && (e.forEach(function(e, n) {
                        e.disabled = t.disabled[n]
                    }), A.disabled = t.disabled), F.update()
                }), P = h.copy(), H = p.copy()
            }), F
        }
        var t = e.models.scatter(),
            n = e.models.axis(),
            r = e.models.axis(),
            i = e.models.legend(),
            s = e.models.legend(),
            o = e.models.distribution(),
            u = e.models.distribution(),
            a = {
                top: 30,
                right: 20,
                bottom: 50,
                left: 75
            },
            f = null,
            l = null,
            c = e.utils.defaultColor(),
            h = d3.fisheye ? d3.fisheye.scale(d3.scale.linear).distortion(0) : t.xScale(),
            p = d3.fisheye ? d3.fisheye.scale(d3.scale.linear).distortion(0) : t.yScale(),
            d = 0,
            v = 0,
            m = !1,
            g = !1,
            y = !0,
            b = !0,
            w = !0,
            E = !1,
            S = !!d3.fisheye,
            x = 0,
            T = !1,
            N = !0,
            C = function(e, t, n) {
                return "<strong>" + t + "</strong>"
            },
            k = function(e, t, n) {
                return "<strong>" + n + "</strong>"
            },
            L = null,
            A = {},
            O = null,
            M = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"),
            _ = "No Data Available.",
            D = 250;
        t.xScale(h).yScale(p), n.orient("bottom").tickPadding(10), r.orient(E ? "right" : "left").tickPadding(10), o.axis("x"), u.axis("y"), s.updateState(!1);
        var P, H, B = function(i, s) {
                var o = i.pos[0] + (s.offsetLeft || 0),
                    u = i.pos[1] + (s.offsetTop || 0),
                    f = i.pos[0] + (s.offsetLeft || 0),
                    l = p.range()[0] + a.top + (s.offsetTop || 0),
                    c = h.range()[0] + a.left + (s.offsetLeft || 0),
                    d = i.pos[1] + (s.offsetTop || 0),
                    v = n.tickFormat()(t.x()(i.point, i.pointIndex)),
                    m = r.tickFormat()(t.y()(i.point, i.pointIndex));
                C != null && e.tooltip.show([f, l], C(i.series.key, v, m, i, F), "n", 1, s, "x-nvtooltip"), k != null && e.tooltip.show([c, d], k(i.series.key, v, m, i, F), "e", 1, s, "y-nvtooltip"), L != null && e.tooltip.show([o, u], L(i.series.key, v, m, i, F), i.value < 0 ? "n" : "s", null, s)
            },
            j = [{
                key: "Magnify",
                disabled: !0
            }];
        return t.dispatch.on("elementMouseout.tooltip", function(e) {
            M.tooltipHide(e), d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-distx-" + e.pointIndex).attr("y1", 0), d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-disty-" + e.pointIndex).attr("x2", u.size())
        }), M.on("tooltipHide", function() {
            N && e.tooltip.cleanup()
        }), F.dispatch = M, F.scatter = t, F.legend = i, F.controls = s, F.xAxis = n, F.yAxis = r, F.distX = o, F.distY = u, d3.rebind(F, t, "id", "interactive", "pointActive", "x", "y", "shape", "size", "xScale", "yScale", "zScale", "xDomain", "yDomain", "xRange", "yRange", "sizeDomain", "sizeRange", "forceX", "forceY", "forceSize", "clipVoronoi", "clipRadius", "useVoronoi"), F.options = e.utils.optionsFunc.bind(F), F.margin = function(e) {
            return arguments.length ? (a.top = typeof e.top != "undefined" ? e.top : a.top, a.right = typeof e.right != "undefined" ? e.right : a.right, a.bottom = typeof e.bottom != "undefined" ? e.bottom : a.bottom, a.left = typeof e.left != "undefined" ? e.left : a.left, F) : a
        }, F.width = function(e) {
            return arguments.length ? (f = e, F) : f
        }, F.height = function(e) {
            return arguments.length ? (l = e, F) : l
        }, F.color = function(t) {
            return arguments.length ? (c = e.utils.getColor(t), i.color(c), o.color(c), u.color(c), F) : c
        }, F.showDistX = function(e) {
            return arguments.length ? (m = e, F) : m
        }, F.showDistY = function(e) {
            return arguments.length ? (g = e, F) : g
        }, F.showControls = function(e) {
            return arguments.length ? (S = e, F) : S
        }, F.showLegend = function(e) {
            return arguments.length ? (y = e, F) : y
        }, F.showXAxis = function(e) {
            return arguments.length ? (b = e, F) : b
        }, F.showYAxis = function(e) {
            return arguments.length ? (w = e, F) : w
        }, F.rightAlignYAxis = function(e) {
            return arguments.length ? (E = e, r.orient(e ? "right" : "left"), F) : E
        }, F.fisheye = function(e) {
            return arguments.length ? (x = e, F) : x
        }, F.xPadding = function(e) {
            return arguments.length ? (d = e, F) : d
        }, F.yPadding = function(e) {
            return arguments.length ? (v = e, F) : v
        }, F.tooltips = function(e) {
            return arguments.length ? (N = e, F) : N
        }, F.tooltipContent = function(e) {
            return arguments.length ? (L = e, F) : L
        }, F.tooltipXContent = function(e) {
            return arguments.length ? (C = e, F) : C
        }, F.tooltipYContent = function(e) {
            return arguments.length ? (k = e, F) : k
        }, F.state = function(e) {
            return arguments.length ? (A = e, F) : A
        }, F.defaultState = function(e) {
            return arguments.length ? (O = e, F) : O
        }, F.noData = function(e) {
            return arguments.length ? (_ = e, F) : _
        }, F.transitionDuration = function(e) {
            return arguments.length ? (D = e, F) : D
        }, F
    }, e.models.scatterPlusLineChart = function() {
        "use strict";

        function B(e) {
            return e.each(function(e) {
                function $() {
                    if (S) return z.select(".nv-point-paths").style("pointer-events", "all"), !1;
                    z.select(".nv-point-paths").style("pointer-events", "none");
                    var i = d3.mouse(this);
                    h.distortion(E).focus(i[0]), p.distortion(E).focus(i[1]), z.select(".nv-scatterWrap").datum(e.filter(function(e) {
                        return !e.disabled
                    })).call(t), g && z.select(".nv-x.nv-axis").call(n), y && z.select(".nv-y.nv-axis").call(r), z.select(".nv-distributionX").datum(e.filter(function(e) {
                        return !e.disabled
                    })).call(o), z.select(".nv-distributionY").datum(e.filter(function(e) {
                        return !e.disabled
                    })).call(u)
                }
                var T = d3.select(this),
                    N = this,
                    C = (f || parseInt(T.style("width")) || 960) - a.left - a.right,
                    j = (l || parseInt(T.style("height")) || 400) - a.top - a.bottom;
                B.update = function() {
                    T.transition().duration(M).call(B)
                }, B.container = this, k.disabled = e.map(function(e) {
                    return !!e.disabled
                });
                if (!L) {
                    var F;
                    L = {};
                    for (F in k) k[F] instanceof Array ? L[F] = k[F].slice(0) : L[F] = k[F]
                }
                if (!e || !e.length || !e.filter(function(e) {
                    return e.values.length
                }).length) {
                    var I = T.selectAll(".nv-noData").data([O]);
                    return I.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"), I.attr("x", a.left + C / 2).attr("y", a.top + j / 2).text(function(e) {
                        return e
                    }), B
                }
                T.selectAll(".nv-noData").remove(), h = t.xScale(), p = t.yScale(), _ = _ || h, D = D || p;
                var q = T.selectAll("g.nv-wrap.nv-scatterChart").data([e]),
                    R = q.enter().append("g").attr("class", "nvd3 nv-wrap nv-scatterChart nv-chart-" + t.id()),
                    U = R.append("g"),
                    z = q.select("g");
                U.append("rect").attr("class", "nvd3 nv-background").style("pointer-events", "none"), U.append("g").attr("class", "nv-x nv-axis"), U.append("g").attr("class", "nv-y nv-axis"), U.append("g").attr("class", "nv-scatterWrap"), U.append("g").attr("class", "nv-regressionLinesWrap"), U.append("g").attr("class", "nv-distWrap"), U.append("g").attr("class", "nv-legendWrap"), U.append("g").attr("class", "nv-controlsWrap"), q.attr("transform", "translate(" + a.left + "," + a.top + ")"), b && z.select(".nv-y.nv-axis").attr("transform", "translate(" + C + ",0)"), m && (i.width(C / 2), q.select(".nv-legendWrap").datum(e).call(i), a.top != i.height() && (a.top = i.height(), j = (l || parseInt(T.style("height")) || 400) - a.top - a.bottom), q.select(".nv-legendWrap").attr("transform", "translate(" + C / 2 + "," + -a.top + ")")), w && (s.width(180).color(["#444"]), z.select(".nv-controlsWrap").datum(H).attr("transform", "translate(0," + -a.top + ")").call(s)), t.width(C).height(j).color(e.map(function(e, t) {
                    return e.color || c(e, t)
                }).filter(function(t, n) {
                    return !e[n].disabled
                })), q.select(".nv-scatterWrap").datum(e.filter(function(e) {
                    return !e.disabled
                })).call(t), q.select(".nv-regressionLinesWrap").attr("clip-path", "url(#nv-edge-clip-" + t.id() + ")");
                var W = q.select(".nv-regressionLinesWrap").selectAll(".nv-regLines").data(function(e) {
                    return e
                });
                W.enter().append("g").attr("class", "nv-regLines");
                var X = W.selectAll(".nv-regLine").data(function(e) {
                        return [e]
                    }),
                    V = X.enter().append("line").attr("class", "nv-regLine").style("stroke-opacity", 0);
                X.transition().attr("x1", h.range()[0]).attr("x2", h.range()[1]).attr("y1", function(e, t) {
                    return p(h.domain()[0] * e.slope + e.intercept)
                }).attr("y2", function(e, t) {
                    return p(h.domain()[1] * e.slope + e.intercept)
                }).style("stroke", function(e, t, n) {
                    return c(e, n)
                }).style("stroke-opacity", function(e, t) {
                    return e.disabled || typeof e.slope == "undefined" || typeof e.intercept == "undefined" ? 0 : 1
                }), g && (n.scale(h).ticks(n.ticks() ? n.ticks() : C / 100).tickSize(-j, 0), z.select(".nv-x.nv-axis").attr("transform", "translate(0," + p.range()[0] + ")").call(n)), y && (r.scale(p).ticks(r.ticks() ? r.ticks() : j / 36).tickSize(-C, 0), z.select(".nv-y.nv-axis").call(r)), d && (o.getData(t.x()).scale(h).width(C).color(e.map(function(e, t) {
                    return e.color || c(e, t)
                }).filter(function(t, n) {
                    return !e[n].disabled
                })), U.select(".nv-distWrap").append("g").attr("class", "nv-distributionX"), z.select(".nv-distributionX").attr("transform", "translate(0," + p.range()[0] + ")").datum(e.filter(function(e) {
                    return !e.disabled
                })).call(o)), v && (u.getData(t.y()).scale(p).width(
                    j).color(e.map(function(e, t) {
                    return e.color || c(e, t)
                }).filter(function(t, n) {
                    return !e[n].disabled
                })), U.select(".nv-distWrap").append("g").attr("class", "nv-distributionY"), z.select(".nv-distributionY").attr("transform", "translate(" + (b ? C : -u.size()) + ",0)").datum(e.filter(function(e) {
                    return !e.disabled
                })).call(u)), d3.fisheye && (z.select(".nv-background").attr("width", C).attr("height", j), z.select(".nv-background").on("mousemove", $), z.select(".nv-background").on("click", function() {
                    S = !S
                }), t.dispatch.on("elementClick.freezeFisheye", function() {
                    S = !S
                })), s.dispatch.on("legendClick", function(e, i) {
                    e.disabled = !e.disabled, E = e.disabled ? 0 : 2.5, z.select(".nv-background").style("pointer-events", e.disabled ? "none" : "all"), z.select(".nv-point-paths").style("pointer-events", e.disabled ? "all" : "none"), e.disabled ? (h.distortion(E).focus(0), p.distortion(E).focus(0), z.select(".nv-scatterWrap").call(t), z.select(".nv-x.nv-axis").call(n), z.select(".nv-y.nv-axis").call(r)) : S = !1, B.update()
                }), i.dispatch.on("stateChange", function(e) {
                    k = e, A.stateChange(k), B.update()
                }), t.dispatch.on("elementMouseover.tooltip", function(e) {
                    d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-distx-" + e.pointIndex).attr("y1", e.pos[1] - j), d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-disty-" + e.pointIndex).attr("x2", e.pos[0] + o.size()), e.pos = [e.pos[0] + a.left, e.pos[1] + a.top], A.tooltipShow(e)
                }), A.on("tooltipShow", function(e) {
                    x && P(e, N.parentNode)
                }), A.on("changeState", function(t) {
                    typeof t.disabled != "undefined" && (e.forEach(function(e, n) {
                        e.disabled = t.disabled[n]
                    }), k.disabled = t.disabled), B.update()
                }), _ = h.copy(), D = p.copy()
            }), B
        }
        var t = e.models.scatter(),
            n = e.models.axis(),
            r = e.models.axis(),
            i = e.models.legend(),
            s = e.models.legend(),
            o = e.models.distribution(),
            u = e.models.distribution(),
            a = {
                top: 30,
                right: 20,
                bottom: 50,
                left: 75
            },
            f = null,
            l = null,
            c = e.utils.defaultColor(),
            h = d3.fisheye ? d3.fisheye.scale(d3.scale.linear).distortion(0) : t.xScale(),
            p = d3.fisheye ? d3.fisheye.scale(d3.scale.linear).distortion(0) : t.yScale(),
            d = !1,
            v = !1,
            m = !0,
            g = !0,
            y = !0,
            b = !1,
            w = !!d3.fisheye,
            E = 0,
            S = !1,
            x = !0,
            T = function(e, t, n) {
                return "<strong>" + t + "</strong>"
            },
            N = function(e, t, n) {
                return "<strong>" + n + "</strong>"
            },
            C = function(e, t, n, r) {
                return "<h3>" + e + "</h3>" + "<p>" + r + "</p>"
            },
            k = {},
            L = null,
            A = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"),
            O = "No Data Available.",
            M = 250;
        t.xScale(h).yScale(p), n.orient("bottom").tickPadding(10), r.orient(b ? "right" : "left").tickPadding(10), o.axis("x"), u.axis("y"), s.updateState(!1);
        var _, D, P = function(i, s) {
                var o = i.pos[0] + (s.offsetLeft || 0),
                    u = i.pos[1] + (s.offsetTop || 0),
                    f = i.pos[0] + (s.offsetLeft || 0),
                    l = p.range()[0] + a.top + (s.offsetTop || 0),
                    c = h.range()[0] + a.left + (s.offsetLeft || 0),
                    d = i.pos[1] + (s.offsetTop || 0),
                    v = n.tickFormat()(t.x()(i.point, i.pointIndex)),
                    m = r.tickFormat()(t.y()(i.point, i.pointIndex));
                T != null && e.tooltip.show([f, l], T(i.series.key, v, m, i, B), "n", 1, s, "x-nvtooltip"), N != null && e.tooltip.show([c, d], N(i.series.key, v, m, i, B), "e", 1, s, "y-nvtooltip"), C != null && e.tooltip.show([o, u], C(i.series.key, v, m, i.point.tooltip, i, B), i.value < 0 ? "n" : "s", null, s)
            },
            H = [{
                key: "Magnify",
                disabled: !0
            }];
        return t.dispatch.on("elementMouseout.tooltip", function(e) {
            A.tooltipHide(e), d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-distx-" + e.pointIndex).attr("y1", 0), d3.select(".nv-chart-" + t.id() + " .nv-series-" + e.seriesIndex + " .nv-disty-" + e.pointIndex).attr("x2", u.size())
        }), A.on("tooltipHide", function() {
            x && e.tooltip.cleanup()
        }), B.dispatch = A, B.scatter = t, B.legend = i, B.controls = s, B.xAxis = n, B.yAxis = r, B.distX = o, B.distY = u, d3.rebind(B, t, "id", "interactive", "pointActive", "x", "y", "shape", "size", "xScale", "yScale", "zScale", "xDomain", "yDomain", "xRange", "yRange", "sizeDomain", "sizeRange", "forceX", "forceY", "forceSize", "clipVoronoi", "clipRadius", "useVoronoi"), B.options = e.utils.optionsFunc.bind(B), B.margin = function(e) {
            return arguments.length ? (a.top = typeof e.top != "undefined" ? e.top : a.top, a.right = typeof e.right != "undefined" ? e.right : a.right, a.bottom = typeof e.bottom != "undefined" ? e.bottom : a.bottom, a.left = typeof e.left != "undefined" ? e.left : a.left, B) : a
        }, B.width = function(e) {
            return arguments.length ? (f = e, B) : f
        }, B.height = function(e) {
            return arguments.length ? (l = e, B) : l
        }, B.color = function(t) {
            return arguments.length ? (c = e.utils.getColor(t), i.color(c), o.color(c), u.color(c), B) : c
        }, B.showDistX = function(e) {
            return arguments.length ? (d = e, B) : d
        }, B.showDistY = function(e) {
            return arguments.length ? (v = e, B) : v
        }, B.showControls = function(e) {
            return arguments.length ? (w = e, B) : w
        }, B.showLegend = function(e) {
            return arguments.length ? (m = e, B) : m
        }, B.showXAxis = function(e) {
            return arguments.length ? (g = e, B) : g
        }, B.showYAxis = function(e) {
            return arguments.length ? (y = e, B) : y
        }, B.rightAlignYAxis = function(e) {
            return arguments.length ? (b = e, r.orient(e ? "right" : "left"), B) : b
        }, B.fisheye = function(e) {
            return arguments.length ? (E = e, B) : E
        }, B.tooltips = function(e) {
            return arguments.length ? (x = e, B) : x
        }, B.tooltipContent = function(e) {
            return arguments.length ? (C = e, B) : C
        }, B.tooltipXContent = function(e) {
            return arguments.length ? (T = e, B) : T
        }, B.tooltipYContent = function(e) {
            return arguments.length ? (N = e, B) : N
        }, B.state = function(e) {
            return arguments.length ? (k = e, B) : k
        }, B.defaultState = function(e) {
            return arguments.length ? (L = e, B) : L
        }, B.noData = function(e) {
            return arguments.length ? (O = e, B) : O
        }, B.transitionDuration = function(e) {
            return arguments.length ? (M = e, B) : M
        }, B
    }, e.models.sparkline = function() {
        "use strict";

        function d(e) {
            return e.each(function(e) {
                var i = n - t.left - t.right,
                    d = r - t.top - t.bottom,
                    v = d3.select(this);
                s.domain(l || d3.extent(e, u)).range(h || [0, i]), o.domain(c || d3.extent(e, a)).range(p || [d, 0]);
                var m = v.selectAll("g.nv-wrap.nv-sparkline").data([e]),
                    g = m.enter().append("g").attr("class", "nvd3 nv-wrap nv-sparkline"),
                    b = g.append("g"),
                    w = m.select("g");
                m.attr("transform", "translate(" + t.left + "," + t.top + ")");
                var E = m.selectAll("path").data(function(e) {
                    return [e]
                });
                E.enter().append("path"), E.exit().remove(), E.style("stroke", function(e, t) {
                    return e.color || f(e, t)
                }).attr("d", d3.svg.line().x(function(e, t) {
                    return s(u(e, t))
                }).y(function(e, t) {
                    return o(a(e, t))
                }));
                var S = m.selectAll("circle.nv-point").data(function(e) {
                    function n(t) {
                        if (t != -1) {
                            var n = e[t];
                            return n.pointIndex = t, n
                        }
                        return null
                    }
                    var t = e.map(function(e, t) {
                            return a(e, t)
                        }),
                        r = n(t.lastIndexOf(o.domain()[1])),
                        i = n(t.indexOf(o.domain()[0])),
                        s = n(t.length - 1);
                    return [i, r, s].filter(function(e) {
                        return e != null
                    })
                });
                S.enter().append("circle"), S.exit().remove(), S.attr("cx", function(e, t) {
                    return s(u(e, e.pointIndex))
                }).attr("cy", function(e, t) {
                    return o(a(e, e.pointIndex))
                }).attr("r", 2).attr("class", function(e, t) {
                    return u(e, e.pointIndex) == s.domain()[1] ? "nv-point nv-currentValue" : a(e, e.pointIndex) == o.domain()[0] ? "nv-point nv-minValue" : "nv-point nv-maxValue"
                })
            }), d
        }
        var t = {
                top: 2,
                right: 0,
                bottom: 2,
                left: 0
            },
            n = 400,
            r = 32,
            i = !0,
            s = d3.scale.linear(),
            o = d3.scale.linear(),
            u = function(e) {
                return e.x
            },
            a = function(e) {
                return e.y
            },
            f = e.utils.getColor(["#000"]),
            l, c, h, p;
        return d.options = e.utils.optionsFunc.bind(d), d.margin = function(e) {
            return arguments.length ? (t.top = typeof e.top != "undefined" ? e.top : t.top, t.right = typeof e.right != "undefined" ? e.right : t.right, t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom, t.left = typeof e.left != "undefined" ? e.left : t.left, d) : t
        }, d.width = function(e) {
            return arguments.length ? (n = e, d) : n
        }, d.height = function(e) {
            return arguments.length ? (r = e, d) : r
        }, d.x = function(e) {
            return arguments.length ? (u = d3.functor(e), d) : u
        }, d.y = function(e) {
            return arguments.length ? (a = d3.functor(e), d) : a
        }, d.xScale = function(e) {
            return arguments.length ? (s = e, d) : s
        }, d.yScale = function(e) {
            return arguments.length ? (o = e, d) : o
        }, d.xDomain = function(e) {
            return arguments.length ? (l = e, d) : l
        }, d.yDomain = function(e) {
            return arguments.length ? (c = e, d) : c
        }, d.xRange = function(e) {
            return arguments.length ? (h = e, d) : h
        }, d.yRange = function(e) {
            return arguments.length ? (p = e, d) : p
        }, d.animate = function(e) {
            return arguments.length ? (i = e, d) : i
        }, d.color = function(t) {
            return arguments.length ? (f = e.utils.getColor(t), d) : f
        }, d
    }, e.models.sparklinePlus = function() {
        "use strict";

        function v(e) {
            return e.each(function(c) {
                function O() {
                    if (a) return;
                    var e = C.selectAll(".nv-hoverValue").data(u),
                        r = e.enter().append("g").attr("class", "nv-hoverValue").style("stroke-opacity", 0).style("fill-opacity", 0);
                    e.exit().transition().duration(250).style("stroke-opacity", 0).style("fill-opacity", 0).remove(), e.attr("transform", function(e) {
                        return "translate(" + s(t.x()(c[e], e)) + ",0)"
                    }).transition().duration(250).style("stroke-opacity", 1).style("fill-opacity", 1);
                    if (!u.length) return;
                    r.append("line").attr("x1", 0).attr("y1", -n.top).attr("x2", 0).attr("y2", b), r.append("text").attr("class", "nv-xValue").attr("x", -6).attr("y", -n.top).attr("text-anchor", "end").attr("dy", ".9em"), C.select(".nv-hoverValue .nv-xValue").text(f(t.x()(c[u[0]], u[0]))), r.append("text").attr("class", "nv-yValue").attr("x", 6).attr("y", -n.top).attr("text-anchor", "start").attr("dy", ".9em"), C.select(".nv-hoverValue .nv-yValue").text(l(t.y()(c[u[0]], u[0])))
                }

                function M() {
                    function r(e, n) {
                        var r = Math.abs(t.x()(e[0], 0) - n),
                            i = 0;
                        for (var s = 0; s < e.length; s++) Math.abs(t.x()(e[s], s) - n) < r && (r = Math.abs(t.x()(e[s], s) - n), i = s);
                        return i
                    }
                    if (a) return;
                    var e = d3.mouse(this)[0] - n.left;
                    u = [r(c, Math.round(s.invert(e)))], O()
                }
                var m = d3.select(this),
                    g = (r || parseInt(m.style("width")) || 960) - n.left - n.right,
                    b = (i || parseInt(m.style("height")) || 400) - n.top - n.bottom;
                v.update = function() {
                    v(e)
                }, v.container = this;
                if (!c || !c.length) {
                    var w = m.selectAll(".nv-noData").data([d]);
                    return w.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"), w.attr("x", n.left + g / 2).attr("y", n.top + b / 2).text(function(e) {
                        return e
                    }), v
                }
                m.selectAll(".nv-noData").remove();
                var E = t.y()(c[c.length - 1], c.length - 1);
                s = t.xScale(), o = t.yScale();
                var S = m.selectAll("g.nv-wrap.nv-sparklineplus").data([c]),
                    T = S.enter().append("g").attr("class", "nvd3 nv-wrap nv-sparklineplus"),
                    N = T.append("g"),
                    C = S.select("g");
                N.append("g").attr("class", "nv-sparklineWrap"), N.append("g").attr("class", "nv-valueWrap"), N.append("g").attr("class", "nv-hoverArea"), S.attr("transform", "translate(" + n.left + "," + n.top + ")");
                var k = C.select(".nv-sparklineWrap");
                t.width(g).height(b), k.call(t);
                var L = C.select(".nv-valueWrap"),
                    A = L.selectAll(".nv-currentValue").data([E]);
                A.enter().append("text").attr("class", "nv-currentValue").attr("dx", p ? -8 : 8).attr("dy", ".9em").style("text-anchor", p ? "end" : "start"), A.attr("x", g + (p ? n.right : 0)).attr("y", h ? function(e) {
                    return o(e)
                } : 0).style("fill", t.color()(c[c.length - 1], c.length - 1)).text(l(E)), N.select(".nv-hoverArea").append("rect").on("mousemove", M).on("click", function() {
                    a = !a
                }).on("mouseout", function() {
                    u = [], O()
                }), C.select(".nv-hoverArea rect").attr("transform", function(e) {
                    return "translate(" + -n.left + "," + -n.top + ")"
                }).attr("width", g + n.left + n.right).attr("height", b + n.top)
            }), v
        }
        var t = e.models.sparkline(),
            n = {
                top: 15,
                right: 100,
                bottom: 10,
                left: 50
            },
            r = null,
            i = null,
            s, o, u = [],
            a = !1,
            f = d3.format(",r"),
            l = d3.format(",.2f"),
            c = !0,
            h = !0,
            p = !1,
            d = "No Data Available.";
        return v.sparkline = t, d3.rebind(v, t, "x", "y", "xScale", "yScale", "color"), v.options = e.utils.optionsFunc.bind(v), v.margin = function(e) {
            return arguments.length ? (n.top = typeof e.top != "undefined" ? e.top : n.top, n.right = typeof e.right != "undefined" ? e.right : n.right, n.bottom = typeof e.bottom != "undefined" ? e.bottom : n.bottom, n.left = typeof e.left != "undefined" ? e.left : n.left, v) : n
        }, v.width = function(e) {
            return arguments.length ? (r = e, v) : r
        }, v.height = function(e) {
            return arguments.length ? (i = e, v) : i
        }, v.xTickFormat = function(e) {
            return arguments.length ? (f = e, v) : f
        }, v.yTickFormat = function(e) {
            return arguments.length ? (l = e, v) : l
        }, v.showValue = function(e) {
            return arguments.length ? (c = e, v) : c
        }, v.alignValue = function(e) {
            return arguments.length ? (h = e, v) : h
        }, v.rightAlignValue = function(e) {
            return arguments.length ? (p = e, v) : p
        }, v.noData = function(e) {
            return arguments.length ? (d = e, v) : d
        }, v
    }, e.models.stackedArea = function() {
        "use strict";

        function g(e) {
            return e.each(function(e) {
                var a = n - t.left - t.right,
                    b = r - t.top - t.bottom,
                    w = d3.select(this);
                p = v.xScale(), d = v.yScale();
                var E = e;
                e.forEach(function(e, t) {
                    e.seriesIndex = t, e.values = e.values.map(function(e, n) {
                        return e.index = n, e.seriesIndex = t, e
                    })
                });
                var S = e.filter(function(e) {
                    return !e.disabled
                });
                e = d3.layout.stack().order(l).offset(f).values(function(e) {
                    return e.values
                }).x(o).y(u).out(function(e, t, n) {
                    var r = u(e) === 0 ? 0 : n;
                    e.display = {
                        y: r,
                        y0: t
                    }
                })(S);
                var T = w.selectAll("g.nv-wrap.nv-stackedarea").data([e]),
                    N = T.enter().append("g").attr("class", "nvd3 nv-wrap nv-stackedarea"),
                    C = N.append("defs"),
                    k = N.append("g"),
                    L = T.select("g");
                k.append("g").attr("class", "nv-areaWrap"), k.append("g").attr("class", "nv-scatterWrap"), T.attr("transform", "translate(" + t.left + "," + t.top + ")"), v.width(a).height(b).x(o).y(function(e) {
                    return e.display.y + e.display.y0
                }).forceY([0]).color(e.map(function(e, t) {
                    return e.color || i(e, e.seriesIndex)
                }));
                var A = L.select(".nv-scatterWrap").datum(e);
                A.call(v), C.append("clipPath").attr("id", "nv-edge-clip-" + s).append("rect"), T.select("#nv-edge-clip-" + s + " rect").attr("width", a).attr("height", b), L.attr("clip-path", h ? "url(#nv-edge-clip-" + s + ")" : "");
                var O = d3.svg.area().x(function(e, t) {
                        return p(o(e, t))
                    }).y0(function(e) {
                        return d(e.display.y0)
                    }).y1(function(e) {
                        return d(e.display.y + e.display.y0)
                    }).interpolate(c),
                    M = d3.svg.area().x(function(e, t) {
                        return p(o(e, t))
                    }).y0(function(e) {
                        return d(e.display.y0)
                    }).y1(function(e) {
                        return d(e.display.y0)
                    }),
                    _ = L.select(".nv-areaWrap").selectAll("path.nv-area").data(function(e) {
                        return e
                    });
                _.enter().append("path").attr("class", function(e, t) {
                    return "nv-area nv-area-" + t
                }).attr("d", function(e, t) {
                    return M(e.values, e.seriesIndex)
                }).on("mouseover", function(e, t) {
                    d3.select(this).classed("hover", !0), m.areaMouseover({
                        point: e,
                        series: e.key,
                        pos: [d3.event.pageX, d3.event.pageY],
                        seriesIndex: e.seriesIndex
                    })
                }).on("mouseout", function(e, t) {
                    d3.select(this).classed("hover", !1), m.areaMouseout({
                        point: e,
                        series: e.key,
                        pos: [d3.event.pageX, d3.event.pageY],
                        seriesIndex: e.seriesIndex
                    })
                }).on("click", function(e, t) {
                    d3.select(this).classed("hover", !1), m.areaClick({
                        point: e,
                        series: e.key,
                        pos: [d3.event.pageX, d3.event.pageY],
                        seriesIndex: e.seriesIndex
                    })
                }), _.exit().remove(), _.style("fill", function(e, t) {
                    return e.color || i(e, e.seriesIndex)
                }).style("stroke", function(e, t) {
                    return e.color || i(e, e.seriesIndex)
                }), _.transition().attr("d", function(e, t) {
                    return O(e.values, t)
                }), v.dispatch.on("elementMouseover.area", function(e) {
                    L.select(".nv-chart-" + s + " .nv-area-" + e.seriesIndex).classed("hover", !0)
                }), v.dispatch.on("elementMouseout.area", function(e) {
                    L.select(".nv-chart-" + s + " .nv-area-" + e.seriesIndex).classed("hover", !1)
                }), g.d3_stackedOffset_stackPercent = function(e) {
                    var t = e.length,
                        n = e[0].length,
                        r = 1 / t,
                        i, s, o, a = [];
                    for (s = 0; s < n; ++s) {
                        for (i = 0, o = 0; i < E.length; i++) o += u(E[i].values[s]);
                        if (o)
                            for (i = 0; i < t; i++) e[i][s][1] /= o;
                        else
                            for (i = 0; i < t; i++) e[i][s][1] = r
                    }
                    for (s = 0; s < n; ++s) a[s] = 0;
                    return a
                }
            }), g
        }
        var t = {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            n = 960,
            r = 500,
            i = e.utils.defaultColor(),
            s = Math.floor(Math.random() * 1e5),
            o = function(e) {
                return e.x
            },
            u = function(e) {
                return e.y
            },
            a = "stack",
            f = "zero",
            l = "default",
            c = "linear",
            h = !1,
            p, d, v = e.models.scatter(),
            m = d3.dispatch("tooltipShow", "tooltipHide", "areaClick", "areaMouseover", "areaMouseout");
        return v.size(2.2).sizeDomain([2.2, 2.2]), v.dispatch.on("elementClick.area", function(e) {
            m.areaClick(e)
        }), v.dispatch.on("elementMouseover.tooltip", function(e) {
            e.pos = [e.pos[0] + t.left, e.pos[1] + t.top], m.tooltipShow(e)
        }), v.dispatch.on("elementMouseout.tooltip", function(e) {
            m.tooltipHide(e)
        }), g.dispatch = m, g.scatter = v, d3.rebind(g, v, "interactive", "size", "xScale", "yScale", "zScale", "xDomain", "yDomain", "xRange", "yRange", "sizeDomain", "forceX", "forceY", "forceSize", "clipVoronoi", "useVoronoi", "clipRadius", "highlightPoint", "clearHighlights"), g.options = e.utils.optionsFunc.bind(g), g.x = function(e) {
            return arguments.length ? (o = d3.functor(e), g) : o
        }, g.y = function(e) {
            return arguments.length ? (u = d3.functor(e), g) : u
        }, g.margin = function(e) {
            return arguments.length ? (t.top = typeof e.top != "undefined" ? e.top : t.top, t.right = typeof e.right != "undefined" ? e.right : t.right, t.bottom = typeof e.bottom != "undefined" ? e.bottom : t.bottom, t.left = typeof e.left != "undefined" ? e.left : t.left, g) : t
        }, g.width = function(e) {
            return arguments.length ? (n = e, g) : n
        }, g.height = function(e) {
            return arguments.length ? (r = e, g) : r
        }, g.clipEdge = function(e) {
            return arguments.length ? (h = e, g) : h
        }, g.color = function(t) {
            return arguments.length ? (i = e.utils.getColor(t), g) : i
        }, g.offset = function(e) {
            return arguments.length ? (f = e, g) : f
        }, g.order = function(e) {
            return arguments.length ? (l = e, g) : l
        }, g.style = function(e) {
            if (!arguments.length) return a;
            a = e;
            switch (a) {
                case "stack":
                    g.offset("zero"), g.order("default");
                    break;
                case "stream":
                    g.offset("wiggle"), g.order("inside-out");
                    break;
                case "stream-center":
                    g.offset("silhouette"), g.order("inside-out");
                    break;
                case "expand":
                    g.offset("expand"), g.order("default");
                    break;
                case "stack_percent":
                    g.offset(g.d3_stackedOffset_stackPercent), g.order("default")
            }
            return g
        }, g.interpolate = function(e) {
            return arguments.length ? (c = e, g) : c
        }, g
    }, e.models.stackedAreaChart = function() {
        "use strict";

        function M(y) {
            return y.each(function(y) {
                var _ = d3.select(this),
                    D = this,
                    P = (a || parseInt(_.style("width")) || 960) - u.left - u.right,
                    H = (f || parseInt(_.style("height")) || 400) - u.top - u.bottom;
                M.update = function() {
                    _.transition().duration(A).call(M)
                }, M.container = this, S.disabled = y.map(function(e) {
                    return !!e.disabled
                });
                if (!x) {
                    var B;
                    x = {};
                    for (B in S) S[B] instanceof Array ? x[B] = S[B].slice(0) : x[B] = S[B]
                }
                if (!y || !y.length || !y.filter(function(e) {
                    return e.values.length
                }).length) {
                    var j = _.selectAll(".nv-noData").data([T]);
                    return j.enter().append("text").attr("class", "nvd3 nv-noData").attr("dy", "-.7em").style("text-anchor", "middle"), j.attr("x", u.left + P / 2).attr("y", u.top + H / 2).text(function(e) {
                        return e
                    }), M
                }
                _.selectAll(".nv-noData").remove(), b = t.xScale(), w = t.yScale();
                var F = _.selectAll("g.nv-wrap.nv-stackedAreaChart").data([y]),
                    I = F.enter().append("g").attr("class", "nvd3 nv-wrap nv-stackedAreaChart").append("g"),
                    q = F.select("g");
                I.append("rect").style("opacity", 0), I.append("g").attr("class", "nv-x nv-axis"), I.append("g").attr("class", "nv-y nv-axis"), I.append("g").attr("class", "nv-stackedWrap"), I.append("g").attr("class", "nv-legendWrap"), I.append("g").attr("class", "nv-controlsWrap"), I.append("g").attr("class", "nv-interactive"), q.select("rect").attr("width", P).attr("height", H);
                if (h) {
                    var R = c ? P - C : P;
                    i.width(R), q.select(".nv-legendWrap").datum(y).call(i), u.top != i.height() && (u.top = i.height(), H = (f || parseInt(_.style("height")) || 400) - u.top - u.bottom), q.select(".nv-legendWrap").attr("transform", "translate(" + (P - R) + "," + -u.top + ")")
                }
                if (c) {
                    var U = [{
                        key: L.stacked || "Stacked",
                        metaKey: "Stacked",
                        disabled: t.style() != "stack",
                        style: "stack"
                    }, {
                        key: L.stream || "Stream",
                        metaKey: "Stream",
                        disabled: t.style() != "stream",
                        style: "stream"
                    }, {
                        key: L.expanded || "Expanded",
                        metaKey: "Expanded",
                        disabled: t.style() != "expand",
                        style: "expand"
                    }, {
                        key: L.stack_percent || "Stack %",
                        metaKey: "Stack_Percent",
                        disabled: t.style() != "stack_percent",
                        style: "stack_percent"
                    }];
                    C = k.length / 3 * 260, U = U.filter(function(e) {
                        return k.indexOf(e.metaKey) !== -1
                    }), s.width(C).color(["#444", "#444", "#444"]), q.select(".nv-controlsWrap").datum(U).call(s), u.top != Math.max(s.height(), i.height()) && (u.top = Math.max(s.height(), i.height()), H = (f || parseInt(_.style("height")) || 400) - u.top - u.bottom), q.select(".nv-controlsWrap").attr("transform", "translate(0," + -u.top + ")")
                }
                F.attr("transform", "translate(" + u.left + "," + u.top + ")"), v && q.select(".nv-y.nv-axis").attr("transform", "translate(" + P + ",0)"), m && (o.width(P).height(H).margin({
                    left: u.left,
                    top: u.top
                }).svgContainer(_).xScale(b), F.select(".nv-interactive").call(o)), t.width(P).height(H);
                var z = q.select(".nv-stackedWrap").datum(y);
                z.transition().call(t), p && (n.scale(b).ticks(P / 100).tickSize(-H, 0), q.select(".nv-x.nv-axis").attr("transform", "translate(0," + H + ")"), q.select(".nv-x.nv-axis").transition().duration(0).call(n)), d && (r.scale(w).ticks(t.offset() == "wiggle" ? 0 : H / 36).tickSize(-P, 0).setTickFormat(t.style() == "expand" || t.style() == "stack_percent" ? d3.format("%") : E), q.select(".nv-y.nv-axis").transition().duration(0).call(r)), t.dispatch.on("areaClick.toggle", function(e) {
                    y.filter(function(e) {
                        return !e.disabled
                    }).length === 1 ? y.forEach(function(e) {
                        e.disabled = !1
                    }) : y.forEach(function(t, n) {
                        t.disabled = n != e.seriesIndex
                    }), S.disabled = y.map(function(e) {
                        return !!e.disabled
                    }), N.stateChange(S), M.update()
                }), i.dispatch.on("stateChange", function(e) {
                    S.disabled = e.disabled, N.stateChange(S), M.update()
                }), s.dispatch.on("legendClick", function(e, n) {
                    if (!e.disabled) return;
                    U = U.map(function(e) {
                        return e.disabled = !0, e
                    }), e.disabled = !1, t.style(e.style), S.style = t.style(), N.stateChange(S), M.update()
                }), o.dispatch.on("elementMousemove", function(i) {
                    t.clearHighlights();
                    var s, a, f, c = [];
                    y.filter(function(e, t) {
                        return e.seriesIndex = t, !e.disabled
                    }).forEach(function(n, r) {
                        a = e.interactiveBisect(n.values, i.pointXValue, M.x()), t.highlightPoint(r, a, !0);
                        var o = n.values[a];
                        if (typeof o == "undefined") return;
                        typeof s == "undefined" && (s = o), typeof f == "undefined" && (f = M.xScale()(M.x()(o, a)));
                        var u = t.style() == "expand" ? o.display.y : M.y()(o, a);
                        c.push({
                            key: n.key,
                            value: u,
                            color: l(n, n.seriesIndex),
                            stackedValue: o.display
                        })
                    }), c.reverse();
                    if (c.length > 2) {
                        var h = M.yScale().invert(i.mouseY),
                            p = Infinity,
                            d = null;
                        c.forEach(function(e, t) {
                            h = Math.abs(h);
                            var n = Math.abs(e.stackedValue.y0),
                                r = Math.abs(e.stackedValue.y);
                            if (h >= n && h <= r + n) {
                                d = t;
                                return
                            }
                        }), d != null && (c[d].highlight = !0)
                    }
                    var v = n.tickFormat()(M.x()(s, a)),
                        m = t.style() == "expand" ? function(e, t) {
                            return d3.format(".1%")(e)
                        } : function(e, t) {
                            return r.tickFormat()(e)
                        };
                    o.tooltip.position({
                        left: f + u.left,
                        top: i.mouseY + u.top
                    }).chartContainer(D.parentNode).enabled(g).valueFormatter(m).data({
                        value: v,
                        series: c
                    })(), o.renderGuideLine(f)
                }), o.dispatch.on("elementMouseout", function(e) {
                    N.tooltipHide(), t.clearHighlights()
                }), N.on("tooltipShow", function(e) {
                    g && O(e, D.parentNode)
                }), N.on("changeState", function(e) {
                    typeof e.disabled != "undefined" && y.length === e.disabled.length && (y.forEach(function(t, n) {
                        t.disabled = e.disabled[n]
                    }), S.disabled = e.disabled), typeof e.style != "undefined" && t.style(e.style), M.update()
                })
            }), M
        }
        var t = e.models.stackedArea(),
            n = e.models.axis(),
            r = e.models.axis(),
            i = e.models.legend(),
            s = e.models.legend(),
            o = e.interactiveGuideline(),
            u = {
                top: 30,
                right: 25,
                bottom: 50,
                left: 60
            },
            a = null,
            f = null,
            l = e.utils.defaultColor(),
            c = !0,
            h = !0,
            p = !0,
            d = !0,
            v = !1,
            m = !1,
            g = !0,
            y = function(e, t, n, r, i) {
                return "<h3>" + e + "</h3>" + "<p>" + n + " on " + t + "</p>"
            },
            b, w, E = d3.format(",.2f"),
            S = {
                style: t.style()
            },
            x = null,
            T = "No Data Available.",
            N = d3.dispatch("tooltipShow", "tooltipHide", "stateChange", "changeState"),
            C = 250,
            k = ["Stacked", "Stream", "Expanded"],
            L = {},
            A = 250;
        n.orient("bottom").tickPadding(7), r.orient(v ? "right" : "left"), s.updateState(!1);
        var O = function(i, s) {
            var o = i.pos[0] + (s.offsetLeft || 0),
                u = i.pos[1] + (s.offsetTop || 0),
                a = n.tickFormat()(t.x()(i.point, i.pointIndex)),
                f = r.tickFormat()(t.y()(i.point, i.pointIndex)),
                l = y(i.series.key, a, f, i, M);
            e.tooltip.show([o, u], l, i.value < 0 ? "n" : "s", null, s)
        };
        return t.dispatch.on("tooltipShow", function(e) {
            e.pos = [e.pos[0] + u.left, e.pos[1] + u.top], N.tooltipShow(e)
        }), t.dispatch.on("tooltipHide", function(e) {
            N.tooltipHide(e)
        }), N.on("tooltipHide", function() {
            g && e.tooltip.cleanup()
        }), M.dispatch = N, M.stacked = t, M.legend = i, M.controls = s, M.xAxis = n, M.yAxis = r, M.interactiveLayer = o, d3.rebind(M, t, "x", "y", "size", "xScale", "yScale", "xDomain", "yDomain", "xRange", "yRange", "sizeDomain", "interactive", "useVoronoi", "offset", "order", "style", "clipEdge", "forceX", "forceY", "forceSize", "interpolate"), M.options = e.utils.optionsFunc.bind(M), M.margin = function(e) {
            return arguments.length ? (u.top = typeof e.top != "undefined" ? e.top : u.top, u.right = typeof e.right != "undefined" ? e.right : u.right, u.bottom = typeof e.bottom != "undefined" ? e.bottom : u.bottom, u.left = typeof e.left != "undefined" ? e.left : u.left, M) : u
        }, M.width = function(e) {
            return arguments.length ? (a = e, M) : a
        }, M.height = function(e) {
            return arguments.length ? (f = e, M) : f
        }, M.color = function(n) {
            return arguments.length ? (l = e.utils.getColor(n), i.color(l), t.color(l), M) : l
        }, M.showControls = function(e) {
            return arguments.length ? (c = e, M) : c
        }, M.showLegend = function(e) {
            return arguments.length ? (h = e, M) : h
        }, M.showXAxis = function(e) {
            return arguments.length ? (p = e, M) : p
        }, M.showYAxis = function(e) {
            return arguments.length ? (d = e, M) : d
        }, M.rightAlignYAxis = function(e) {
            return arguments.length ? (v = e, r.orient(e ? "right" : "left"), M) : v
        }, M.useInteractiveGuideline = function(e) {
            return arguments.length ? (m = e, e === !0 && (M.interactive(!1), M.useVoronoi(!1)), M) : m
        }, M.tooltip = function(e) {
            return arguments.length ? (y = e, M) : y
        }, M.tooltips = function(e) {
            return arguments.length ? (g = e, M) : g
        }, M.tooltipContent = function(e) {
            return arguments.length ? (y = e, M) : y
        }, M.state = function(e) {
            return arguments.length ? (S = e, M) : S
        }, M.defaultState = function(e) {
            return arguments.length ? (x = e, M) : x
        }, M.noData = function(e) {
            return arguments.length ? (T = e, M) : T
        }, M.transitionDuration = function(e) {
            return arguments.length ? (A = e, M) : A
        }, M.controlsData = function(e) {
            return arguments.length ? (k = e, M) : k
        }, M.controlLabels = function(e) {
            return arguments.length ? typeof e != "object" ? L : (L = e, M) : L
        }, r.setTickFormat = r.tickFormat, r.tickFormat = function(e) {
            return arguments.length ? (E = e, r) : E
        }, M
    }
})();