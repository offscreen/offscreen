! function(e) {
    e.fn.ajaxGetContent = function(t) {
        if (t = e.extend({
                requestParameter: "ajax_get_standard_content",
                baseUrl: "",
                useCache: !0,
                forceBookmarkLinking: !1,
                params: {},
                excludeAttr: {
                    rel: "lightbox",
                    rel: "nofollow"
                },
                onHrefCheck: function(e) {
                    return e.length > 0 && ("/" == e.substr(e.length - 1, 1) || ".html" == e.substr(e.length - 5, 5) || ".php" == e.substr(e.length - 4, 4))
                },
                onElementCheck: function(e) {
                    return !e.hasClass("no-ajax-load") && "nofollow" != e.attr("rel")
                },
                formsGet: {
                    'form[method="get"]': function() {
                        return !0
                    }
                },
                formsPost: null,
                onSend: function() {},
                onReceive: function() {}
            }, t), !e("body").data("ajaxGetContent")) {
            var n = navigator.userAgent.toLowerCase().indexOf("android") > -1;
            e.fn.ajaxGetContent.usePushState = !(t.forceBookmarkLinking || !history.pushState || n)
        }
        e("body").data("ajaxGetContent") || (e.fn.ajaxGetContent.cache = []), e.fn.ajaxGetContent.lastClickedElement = null, e.fn.ajaxGetContent.lastClickedUrl = null, e.fn.ajaxGetContent.ajaxHandler = null;
        var a = !0,
            r = function(n, a) {
                if ("boolean" == typeof n) {
                    if (e.fn.ajaxGetContent.ajaxHandler && (e.fn.ajaxGetContent.ajaxHandler.abort(), e.fn.ajaxGetContent.ajaxHandler = null), e.fn.ajaxGetContent.lastClickedUrl = a, e.fn.ajaxGetContent.lastUrl = e.fn.ajaxGetContent.getCurrentUrl(), e.fn.ajaxGetContent.lastFullUrl = e.fn.ajaxGetContent.getCurrentUrl(!0), t.useCache && a in e.fn.ajaxGetContent.cache) return t.onSend(a), void r(e.fn.ajaxGetContent.cache[a], "success");
                    var i = [],
                        o = "",
                        s = a;
                    a.indexOf("?") < 0 || (o = a.substr(a.indexOf("?") + 1), s = a.substr(0, a.indexOf("?")));
                    var c = e.deparam(o);
                    e.each(c, function(e, t) {
                        i.push({
                            name: e,
                            value: t
                        })
                    });
                    var l = e.fn.ajaxGetContent.lastClickedElement,
                        u = l && l.data("options") ? l.data("options") : t;
                    e.each(u.params, function(t, n) {
                        l.is(t) && e.each(n, function(e, t) {
                            i.push({
                                name: e,
                                value: t
                            })
                        })
                    }), t.onSend(a), i.push({
                        name: t.requestParameter,
                        value: "on"
                    }), e.fn.ajaxGetContent.ajaxHandler = e.ajax({
                        url: s,
                        data: i,
                        type: "GET",
                        success: r,
                        error: r,
                        context: this
                    })
                } else e.fn.ajaxGetContent.ajaxHandler = null, "success" == a && t.useCache && e.fn.ajaxGetContent.lastClickedUrl && (e.fn.ajaxGetContent.cache[e.fn.ajaxGetContent.lastClickedUrl] = n), t.onReceive(n, a)
            };
        e.fn.ajaxGetContent.load = function(t) {
            e.fn.ajaxGetContent.usePushState ? (null == t && (t = location.href), history.pushState({}, "", t), e(window).trigger("popstate")) : (null == t && (t = e.param.fragment()), e.param.fragment() != t ? jQuery.bbq.pushState(t, 2) : r(!0, t))
        }, e.fn.ajaxGetContent.scrollTo = function(t, n) {
            var a = e("html").scrollTop();
            a || (a = e("body").scrollTop()), (n || a > e(t).offset().top) && e("html,body").animate({
                scrollTop: e(t).offset().top
            }, 500)
        }, e.fn.ajaxGetContent.getCurrentUrl = function(t, n) {
            var a = "";
            if (e.fn.ajaxGetContent.usePushState) {
                if (a = new String(location.href), !t) {
                    var r = a.indexOf("//");
                    r = 0 > r ? 0 : r + 2, a = a.substr(a.indexOf("/", r)), 0 == a.length && (a = "/")
                }
            } else a = e.param.fragment();
            return n || (a = -1 == a.indexOf("#") ? a : a.substr(0, a.indexOf("#"))), a
        }, e.fn.ajaxGetContent.clearCache = function() {
            e.fn.ajaxGetContent.cache = []
        };
        var i = function() {
            e(window).bind(e.fn.ajaxGetContent.usePushState ? "popstate" : "hashchange", function() {
                var n = null,
                    i = !1;
                e.fn.ajaxGetContent.usePushState ? (n = e.fn.ajaxGetContent.getCurrentUrl(!0, !0), e.fn.ajaxGetContent.lastFullUrl && n.indexOf("#") >= 0 && (i = e.fn.ajaxGetContent.getCurrentUrl(!0) == e.fn.ajaxGetContent.lastFullUrl)) : (n = e.fn.ajaxGetContent.getCurrentUrl(), n.indexOf("?") < 0 || (n = n.substr(0, n.indexOf("?"))), i = !("" == n || t.onHrefCheck(n))), i || (!e.fn.ajaxGetContent.usePushState || a) && r(!0, n)
            }), e("body").data("ajaxGetContent", !0)
        };
        return e("body").data("ajaxGetContent") || i(), e(window).load(function() {
            a = !1, setTimeout(function() {
                a = !0, e.fn.ajaxGetContent.usePushState || "" == e.param.fragment() || e(window).trigger("hashchange"), e.fn.ajaxGetContent.lastUrl || (e.fn.ajaxGetContent.lastUrl = e.fn.ajaxGetContent.getCurrentUrl(), e.fn.ajaxGetContent.lastFullUrl = e.fn.ajaxGetContent.getCurrentUrl(!0))
            }, 1)
        }), null != t.formsGet && e.each(t.formsGet, function(t, n) {
            e(t).each(function(t, a) {
                if (a = e(a), a.data("ajaxGetContent")) return !0;
                var r = function(t, n, a) {
                        return function() {
                            return n && !n.call(t) ? !1 : a && !a.call(t) ? !1 : (e.fn.ajaxGetContent.load(e(t).attr("action") + "?" + e(t).serialize()), !1)
                        }
                    },
                    i = a.get(0).onsubmit;
                a.submit(r(this, i, n)), a.data("ajaxGetContent", !0)
            })
        }), null != t.formsPost && e.each(t.formsPost, function(t, n) {
            e(t).each(function(t, a) {
                if (a = e(a), a.data("ajaxGetContent")) return !0;
                var r = function(t, n, a) {
                        return function() {
                            var r = e(t);
                            if (n && !n.call(t)) return !1;
                            if (a.onSend && !a.onSend.call(t)) return !1;
                            var i = a.onReceive ? a.onReceive : function() {};
                            return e.ajax({
                                url: r.attr("action"),
                                data: r.serializeArray(),
                                type: "POST",
                                success: i,
                                error: i,
                                context: t
                            }), !1
                        }
                    },
                    i = a.get(0).onsubmit;
                a.submit(r(a.get(0), i, n)), a.data("ajaxGetContent", !0)
            })
        }), this.each(function(n, a) {
            var r = e(a),
                i = r.data("ajaxGetContent"),
                o = r.attr("href");
            if (!o) return !0;
            var s = new String,
                c = "http:" != location.href.substr(0, 5),
                l = new String((c ? "https://" : "http://") + window.location.hostname);
            0 == o.indexOf(l) && (o = o.substr(l.length)), o.indexOf("?") < 0 || (s = o.substr(o.indexOf("?")), o = o.substr(0, o.indexOf("?")));
            var u = r.attr("target"),
                d = o.indexOf("#") >= 0 || void 0 !== u && u !== !1,
                f = t.onHrefCheck(o, s),
                p = t.onElementCheck(r),
                m = !1;
            e.each(t.excludeAttr, function(e, t) {
                return r.attr(e) && 0 == r.attr(e).indexOf(t) ? void(m = !0) : void 0
            });
            var h = null != r.get(0).onclick;
            i || d || !f || !p || m || h || (r.data("ajaxGetContent", !0), r.click(function(n) {
                var a = e(this);
                if (n && n.which && 1 != n.which) return !0;
                if (e.fn.ajaxGetContent.lastUrl == o + s) {
                    var r = a.data("ajaxGetContent_clickCount");
                    if (r = r ? parseInt(r) + 1 : 1, a.data("ajaxGetContent_clickCount", r), r % 2 == 1) return !1
                }
                var i = new String(window.location.href);
                if (i.indexOf("#") < 0 || (i = i.substr(0, i.indexOf("#"))), !e.fn.ajaxGetContent.usePushState) {
                    var c = t.baseUrl;
                    if ("" != c && i != c) return location.href = c + "#" + o + s, !1
                }
                return a.data("options", t), e.fn.ajaxGetContent.lastClickedElement = a, e.fn.ajaxGetContent.load(o + s), !1
            }))
        })
    }
}(jQuery),
function(e, t) {
    "$:nomunge";

    function n(e) {
        return "string" == typeof e
    }

    function a(e) {
        var t = b.call(arguments, 1);
        return function() {
            return e.apply(this, t.concat(b.call(arguments)))
        }
    }

    function r(e) {
        return e.replace(/^[^#]*#?(.*)$/, "$1")
    }

    function i(e) {
        return e.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
    }

    function o(a, r, i, o, s) {
        var c, u, f, p, m;
        return o !== l ? (f = i.match(a ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/), m = f[3] || "", 2 === s && n(o) ? u = o.replace(a ? T : N, "") : (p = d(f[2]), o = n(o) ? d[a ? C : w](o) : o, u = 2 === s ? o : 1 === s ? e.extend({}, o, p) : e.extend({}, p, o), u = k(u), a && (u = u.replace(g, v))), c = f[1] + (a ? "#" : u || !f[1] ? "?" : "") + u + m) : c = r(i !== l ? i : t[j][B]), c
    }

    function s(e, t, a) {
        return t === l || "boolean" == typeof t ? (a = t, t = k[e ? C : w]()) : t = n(t) ? t.replace(e ? T : N, "") : t, d(t, a)
    }

    function c(t, a, r, i) {
        return n(r) || "object" == typeof r || (i = r, r = a, a = l), this.each(function() {
            var n = e(this),
                o = a || h()[(this.nodeName || "").toLowerCase()] || "",
                s = o && n.attr(o) || "";
            n.attr(o, k[t](s, r, i))
        })
    }
    var l, u, d, f, p, m, h, g, b = Array.prototype.slice,
        v = decodeURIComponent,
        k = e.param,
        x = e.bbq = e.bbq || {},
        y = e.event.special,
        _ = "hashchange",
        w = "querystring",
        C = "fragment",
        M = "elemUrlAttr",
        j = "location",
        B = "href",
        A = "src",
        N = /^.*\?|#.*$/g,
        T = /^.*\#/,
        E = {};
    k[w] = a(o, 0, i), k[C] = u = a(o, 1, r), u.noEscape = function(t) {
        t = t || "";
        var n = e.map(t.split(""), encodeURIComponent);
        g = RegExp(n.join("|"), "g")
    }, u.noEscape(",/"), e.deparam = d = function(t, n) {
        var a = {},
            r = {
                "true": !0,
                "false": !1,
                "null": null
            };
        return e.each(t.replace(/\+/g, " ").split("&"), function(t, i) {
            var o, s = i.split("="),
                c = v(s[0]),
                u = a,
                d = 0,
                f = c.split("]["),
                p = f.length - 1;
            if (/\[/.test(f[0]) && /\]$/.test(f[p]) ? (f[p] = f[p].replace(/\]$/, ""), f = f.shift().split("[").concat(f), p = f.length - 1) : p = 0, 2 === s.length)
                if (o = v(s[1]), n && (o = o && !isNaN(o) ? +o : "undefined" === o ? l : r[o] !== l ? r[o] : o), p)
                    for (; p >= d; d++) c = "" === f[d] ? u.length : f[d], u = u[c] = p > d ? u[c] || (f[d + 1] && isNaN(f[d + 1]) ? {} : []) : o;
                else e.isArray(a[c]) ? a[c].push(o) : a[c] = a[c] !== l ? [a[c], o] : o;
            else c && (a[c] = n ? l : "")
        }), a
    }, d[w] = a(s, 0), d[C] = f = a(s, 1), e[M] || (e[M] = function(t) {
        return e.extend(E, t)
    })({
        a: B,
        base: B,
        iframe: A,
        img: A,
        input: A,
        form: "action",
        link: B,
        script: A
    }), h = e[M], e.fn[w] = a(c, w), e.fn[C] = a(c, C), x.pushState = p = function(e, a) {
        n(e) && /^#/.test(e) && a === l && (a = 2);
        var r = e !== l,
            i = u(t[j][B], r ? e : {}, r ? a : 2);
        t[j][B] = i + (/#/.test(i) ? "" : "#")
    }, x.getState = m = function(e, t) {
        return e === l || "boolean" == typeof e ? f(e) : f(t)[e]
    }, x.removeState = function(t) {
        var n = {};
        t !== l && (n = m(), e.each(e.isArray(t) ? t : arguments, function(e, t) {
            delete n[t]
        })), p(n, 2)
    }, y[_] = e.extend(y[_], {
        add: function(t) {
            function n(e) {
                var t = e[C] = u();
                e.getState = function(e, n) {
                    return e === l || "boolean" == typeof e ? d(t, e) : d(t, n)[e]
                }, a.apply(this, arguments)
            }
            var a;
            return e.isFunction(t) ? (a = t, n) : (a = t.handler, void(t.handler = n))
        }
    })
}(jQuery, this),
function(e, t) {
    "$:nomunge";

    function n(e) {
        return e = e || t[i][s], e.replace(/^[^#]*#?(.*)$/, "$1")
    }
    var a, r = e.event.special,
        i = "location",
        o = "hashchange",
        s = "href",
        c = (document.documentMode, -1 != navigator.appVersion.indexOf("MSIE") && parseFloat(navigator.appVersion.split("MSIE")[1]) < 8),
        l = "on" + o in t && !c;
    e[o + "Delay"] = 100, r[o] = e.extend(r[o], {
        setup: function() {
            return l ? !1 : void e(a.start)
        },
        teardown: function() {
            return l ? !1 : void e(a.stop)
        }
    }), a = function() {
        function a() {
            u = d = function(e) {
                return e
            }, c && (l = e('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow, d = function() {
                return n(l.document[i][s])
            }, (u = function(e, t) {
                if (e !== t) {
                    var n = l.document;
                    n.open().close(), n[i].hash = "#" + e
                }
            })(n()))
        }
        var r, l, u, d, f = {};
        return f.start = function() {
            if (!r) {
                var c = n();
                u || a(),
                    function l() {
                        var a = n(),
                            f = d(c);
                        a !== c ? (u(c = a, f), e(t).trigger(o)) : f !== c && (t[i][s] = t[i][s].replace(/#.*/, "") + "#" + f), r = setTimeout(l, e[o + "Delay"])
                    }()
            }
        }, f.stop = function() {
            l || (r && clearTimeout(r), r = 0)
        }, f
    }()
}(jQuery, this), ! function(e, t) {
    function n(e) {
        return t.getElementById(e)
    }

    function a() {
        function e(e) {
            var t = n(e),
                a = t.getAttribute("placeholder");
            t.value = "" !== t.value ? t.value : a, t.removeAttribute("placeholder"), t.onfocus = function() {
                (this.value == a || "Bidang ini wajib diisi." == this.value) && (this.value = ""), this.style.color = ""
            }, t.onblur = function() {
                "" === this.value && (this.value = a)
            }
        }

        function t(e) {
            ("" == n(e).value || i.test(n(e).value)) && (n(e).value = "Bidang ini wajib diisi.", n(e).style.color = "#ED5555")
        }

        function a() {
            t("e_1931067260"), t("e_2042546207"), t("e_342698268"), t("e_1155801803")
        }
        var r = n("dte_form-contact"),
            i = /(\(wajib\)|Bidang ini wajib diisi\.)\s*$|^\s*$/i;
        e("e_1931067260"), e("e_2042546207"), e("e_342698268"), e("e_377654205"), e("e_1155801803"), r.onsubmit = function() {
            return "" === n("e_1931067260").value || "" === n("e_2042546207").value || "" === n("e_342698268").value || "" === n("e_1155801803").value || i.test(n("e_1931067260").value) || i.test(n("e_2042546207").value) || i.test(n("e_342698268").value) || i.test(n("e_1155801803").value) ? (a(), !1) : !0
        }
    }
    e.C1 = function(t) {
        var r = {
            mode: 1,
            container: null,
            format: {
                subject: "",
                name: "",
                email: "",
                url: "http://",
                message: ""
            }
        };
        for (var i in r) void 0 === t[i] && (t[i] = r[i]);
        for (var o in r.format) void 0 === t.format[o] && (t.format[o] = r.format[o]);
        var s = '<input type="text" name="entry',
            c = '<form class="dte_form-contact" action="https://docs.google.com/forms/d/1T1UjycW4TtktfTxC7kUzUFzcVmAsudYzap76suO5oK4/formResponse" method="post" id="dte_form-contact" target="_blank"><div class="pull-left">' + s + '.1931067260" value="' + t.format.subject + '" class="ss-q-short" id="e_1931067260" title="Perihal" placeholder="Perihal (wajib)">' + s + '.2042546207" value="' + t.format.name + '" class="ss-q-short" id="e_2042546207" title="name" placeholder="Nama (wajib)">' + s + '.342698268" value="' + t.format.email + '" class="ss-q-short" id="e_342698268" title="Email" placeholder="Email (wajib)">' + s + '.377654205" value="' + t.format.url + '" class="ss-q-short" id="e_377654205" title="Alamat Situs" placeholder="Alamat Situs"></div><div class="pull-left"><textarea name="entry.1155801803" class="ss-q-long" id="e_1155801803" title="Pesan" placeholder="Pesan (wajib)"></textarea><input type="hidden" name="draftResponse" value="[]"><input type="hidden" name="pageHistory" value="0"><button type="submit" name="submit" id="ss-submit" class="hidden">Kirim</button></div></form>';
        t.container.innerHTML = c, e.setTimeout(function() {
            var e = n("dte_form-contact")["entry.1155801803"];
            e.value = t.format.message, e.scrollTop = e.scrollHeight - e.clientHeight
        }, 2), a()
    }
}(window, document),
function(e, t) {
    e.A0 = function(n) {
        var a, r;
        e.getSelection ? (a = e.getSelection(), r = t.createRange(), r.selectNodeContents(n), a.removeAllRanges(), a.addRange(r)) : t.selection && (a = t.selection.createRange().text, r = t.body.createTextRange(), r.moveToElementText(n), r.select())
    }, e.H0 = function() {
        for (var n, a = t.getElementsByTagName("pre"), r = a.length, i = 0; r > i; ++i) {
            if (n = '<span class="line-number hidden-print">', a[i].id = a[i].id ? a[i].id : "code-block:" + (i + 1), /(^| )source( |$)/.test(a[i].className)) {
                for (var o = a[i].getElementsByTagName("code")[0], s = 0, c = o.innerHTML.split(/\n/).length; c > s; ++s) n += '<span id="code:' + (i + 1) + "." + (s + 1) + '"><a href="#code:' + (i + 1) + "." + (s + 1) + '">' + (s + 1) + "</a><em>code:" + (i + 1) + "." + (s + 1) + "</em></span>";
                a[i].innerHTML = n += "</span>" + a[i].innerHTML + '<span class="cl"></span>'
            }
            if (e.location.hash && /#?code\:\d+\.\d+$/.test(e.location.hash)) {
                var l = e.location.hash;
                e.location.hash = l
            }
        }
    }
}(window, document),
function(e, t) {
    e.M0 = {
        set: function(e, n, a) {
            var r, i;
            a ? (r = new Date, r.setTime(r.getTime() + 24 * a * 60 * 60 * 1e3), i = "; expires=" + r.toGMTString()) : i = "", t.cookie = e + "=" + n + i + "; path=/"
        },
        get: function(e) {
            for (var n, a = e + "=", r = t.cookie.split(";"), i = 0; i < r.length; i++) {
                for (n = r[i];
                    " " == n.charAt(0);) n = n.substring(1, n.length);
                if (0 == n.indexOf(a)) return n.substring(a.length, n.length)
            }
            return null
        },
        del: function(e) {
            this.set(e, "", -1)
        }
    }
}(window, document), ! function(e) {
    e.C0 = function(e) {
        function t(e, t, a, r) {
            return e[n](t, '<img class="emo" src="https://dte-project.github.io/a/e/' + a + '.gif" alt="' + r + '">')
        }
        var n = "replace",
            a = [],
            r = "",
            i = [
                [/(😇|\b0:\-?\))/g, "halo", "0:)"],
                [/(😊|\B:\-?\))/g, "blush", ":)"],
                [/(😉|\B;\-?\))/g, "wink", ";)"],
                [/(😃|\B:\-?D)/g, "smiley", ":D"],
                [/(😂|\B=\-?D)/g, "joy", "=D"],
                [/(😆|(\B\^:|\b[xX])\-?D\b)/g, "laugh", "xD"],
                [/(😊|\B\^\_?\^)/g, "relax", "^_^"],
                [/(🤨|\b7:\-?\()/g, "confuse", "7:("],
                [/(☹️|\B:\-?\()/g, "frown", ":("],
                [/(😩|\B=\-?\()/g, "weary", "=("],
                [/(🤔|\B:\-?[\/\\])/g, "think", ":\\"],
                [/(😵|\B@@,)/g, "dizzy", "@@,"],
                [/(😌|[:*](ya)+[:*])/gi, "relieve", "*yaya*"],
                [/(😕|\B:\-?s)/gi, "sullen", ":S"],
                [/(😭|\B:('|\&\#39\;)\-?\()/g, "cry", ":&#39;("],
                [/(😫|[:*]wa{2,}[:*])/gi, "tire", "*wawa*"],
                [/(😢|\bT\_T)/gi, "tear", "T_T"],
                [/(😎|\b[B8]\-?\))/g, "cool", "B)"],
                [/(🚬|\B:\-?Q)/g, "smoke", ":Q"],
                [/(😜|\B\*\*p)/gi, "crazy", "**p"],
                [/(🏀|\B[:=]\-?[\(p]\*)/gi, "basket", "=p*"],
                [/(⚽|\B\*=\-?p)/gi, "soccer", "*=p"],
                [/([😛😜]|\B[:;]\-?p)/gi, "tongue", ";p"],
                [/([😪😴💤]|\B:\-?Oz+)/gi, "sleep", ":Ozzz"],
                [/(🤯|\bx\-?@)/gi, "explode", "x@"],
                [/(([😠💢]\s*)+|\bx\-?&(amp;)?)/gi, "argh", "x&amp;amp;"],
                [/([😠💢]|\b7:\-?O)/gi, "angry", "7:O"],
                [/(😀|\B\\o\/)/gi, "yay", "\\o/"],
                [/(🤟|\B\\m\/)/gi, "metal", "\\m/"],
                [/(😍|\B(&lt;3|:\-?\*))/g, "love", ":*"],
                [/(👼|\B\^o\^)/gi, "angel", "^o^"],
                [/(🤮|\B:\-?a)/gi, "vomit", ":a"],
                [/(🤬|[:*]fu?ck[:*])/gi, "asdf", "*fuck*"],
                [/([😧🗣]|\bx\-?V)/gi, "shout", "xV"],
                [/((👍\s*)+|\B;\-?b?d)/g, "thumbs", ";bd"],
                [/(👍|\B\(y\)|\B:\-?b?d)/g, "thumb", ":bd"],
                [/(😒|\B\-[_,]\-\B|\B\~x\-?\(+)/gi, "unamuse", "~x("],
                [/(🙋|[:*]bye[:*])/gi, "bye", "*bye*"],
                [/(🤓|\B:\-?W)/gi, "nerd", ":W"],
                [/(👻|\(\-\.\-,\))/g, "ghost", "(-.-,)"],
                [/(🍻|[:*]cendol[:*])/gi, "cendol", "*cendol*"],
                [/((🎉\s*)+|🎊|\B(<|&lt;)=\-?\))/g, "party-2", "&amp;lt;=)"],
                [/(🎉|\B(<|&lt;):\-?\))/g, "party", "&amp;lt;:)"],
                [/(🤣|[:*](roll(ed)?|guling)[:*])/gi, "roll", "*guling*"],
                [/(😬|[:*]bang[:*])/gi, "bang", "*bang*"],
                [/([📞☎]|\B''J)/gi, "call", "&#39;&#39;J"],
                [/(🛢|[:*](drum(m?er)?)[:*])/gi, "drum", "*drum*"],
                [/([🎸💀☠]|[:*](rock|guitar(ist)?|gitar(is)?)[:*])/gi, "guitar", "*rock*"],
                [/(🎙|[:*](vocal(ist)?|vokal(is)?)[:*])/gi, "sing", "*sing*"],
                [/🌟/g, "king", "🌟"]
            ];
        e[n](/([^<>]*?)(<i rel="(?:pre|code)">[\s\S]*?<\/i>|<code(?:\s[^<>]*?)?>[\s\S]*?<\/code>|<\/?[-:\w]+(?:\s[^<>]*?)?>|$)/g, function(e, t, n) {
            t && a.push(t), n && a.push(n)
        });
        for (var o = 0, s = a.length; s > o; ++o) {
            var c = a[o];
            if (c && "<" === c[0] && ">" === c.slice(-1)) r += c;
            else {
                for (var l, u = 0, d = i.length; d > u; ++u) l = i[u], c = t(c, l[0], l[1], l[2]);
                r += c
            }
        }
        return r = r[n](/^(<br *\/?>|&nbsp;)+/i, "")[n](/\@<a( +| +class="allow")href="#c\d+"( +rel="nofollow")?>.*?<\/a>:? */g, "")[n](/\[note\](.*?)\[\/note\]/gi, "<div class='note'>$1</div>")[n](/\[(youtube|iframe)\](.*?)\[\/(youtube|iframe)\]/gi, "<div class='fluid-media loader'><iframe class='video' data-src='$2' frameborder='0'></iframe></div>")[n](/\[(link|url)\](.*?)\[\/(link|url)\]/gi, "<a class='allow' href='$2' rel='nofollow'>$1</a>")[n](/\[url\=['"]?([^'"]*?)['"]?\](.*?)\[\/url\]/gi, "<a class='allow' href='$1' rel='nofollow'>$2</a>")[n](/\[img\](.*?)\[\/img\]/gi, "<img class='center img-loader' data-src='$1' alt='Loading&hellip;'>")
    }
}(window, document), ! function(e, t) {
    var n, a, r, i, o, s, c, l, u, d, o, f, p, m, h, g, b = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIAQMAAABvIyEEAAAABGdBTUEAALGPC/xhBQAAAAZQTFRFOjo6JycnNkxyjQAAADZJREFUKM9j+A8DDFRnNTCAACP9WewPGNgfkMmiwN7GH0CGfCPdWZT5V/7/DwZyWeSHFa1SHQDDGF2E0US40gAAAABJRU5ErkJggg==",
        v = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
        k = "Memuat…";
    e.F1 = function(e) {
        if (n = t.getElementById("dte_search-result-container"), g = t.getElementById("dte_form-search").getAttribute("data-q"), "entry" in e.feed) {
            if (a = e.feed.entry, s = "<h4>Hasil penelusuran untuk kata kunci &ldquo;" + g + '&rdquo;</h4><ul class="list-media">', !n) return;
            for (var c = 0, l = a.length; l > c; c++) {
                i = "summary" in a[c] ? a[c].summary.$t.replace(/<br *\/?>/g, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "").substring(0, 170) + "&hellip;" : "Tidak ada teks.", o = "media$thumbnail" in a[c] ? a[c].media$thumbnail.url.replace(/\/s\d+(\-c)?/, "/s40-c") : b;
                for (var u = 0, d = a[c].link.length; d > u; u++) r = "alternate" == a[c].link[u].rel ? a[c].link[u].href : "/404";
                s += '<li><img class="list-media-thumbnail" alt="' + k + '" width="40" height="40" src="' + o + '"><strong class="list-media-title"><a href="' + r + '">' + a[c].title.$t + '</a></strong><span class="list-media-content">' + i + "</span></li>"
            }
            n.innerHTML = s + '</ul><p class="text-center"><a href="#previous-results" class="button small previous-results">Sebelumnya</a> <a href="#next-results" class="button small next-results">Berikutnya</a></p>'
        } else n.innerHTML = "<h4>Penelusuran posting dengan kata kunci &#8220;" + g + "&#8221; tidak ditemukan.</h4>";
        jQuery("#dte_search-result .list-media").hl(g), A()
    }, e.F2 = function(e) {
        if (a = e.feed.entry, s = '<h2>Terakhir Diperbaharui</h2><div class="widget-content"><ul class="list-media">', n = t.getElementById("dte_latest-updated")) {
            for (var c = 0, u = a.length; u > c; c++) {
                l = a[c].published.$t.substring(0, 10).split("-"), i = "summary" in a[c] ? a[c].summary.$t.replace(/<br *\/?>/g, " ").replace(/<.*?>/g, "").replace(/[<>]/g, "").substring(0, 70) + "&hellip;" : "Tidak ada teks.", o = "media$thumbnail" in a[c] ? a[c].media$thumbnail.url.replace(/\/s\d+(\-c)?/, "/s40-c") : b;
                for (var d = 0, f = a[c].link.length; f > d; d++)
                    if ("alternate" == a[c].link[d].rel) {
                        r = a[c].link[d].href;
                        break
                    } s += '<li><img class="list-media-thumbnail" alt="' + k + '" width="40" height="40" src="' + o + '"><strong class="list-media-title"><a href="' + r + '">' + a[c].title.$t + '</a></strong><span class="list-media-content sr">' + i + '</span><span class="list-media-meta"><time datetime="' + l.join("-") + '">' + (l[2] + " " + v[parseInt(l[1], 10) - 1] + " " + l[0]) + "</time></span></li>"
            }
            n.innerHTML = s + "</ul></div>", A()
        }
    }, e.F3 = function(e) {
        if (a = e.feed.entry, s = '<h2>Potongan Kode</h2><div class="widget-content"><ul>', n = t.getElementById("dte_latest-snippet")) {
            for (var i = 0, o = a.length; o > i; i++) {
                f = a[i].title.$t;
                for (var c = 0, l = a[i].link.length; l > c; c++)
                    if ("alternate" == a[i].link[c].rel) {
                        r = a[i].link[c].href;
                        break
                    } s += '<li><a href="' + r + '" title="' + f + '">' + f + "</a></li>"
            }
            n.innerHTML = s + '<li><a title="Selengkapnya&hellip;" href="/search/label/Potongan?max-results=20"><i data-icon="&#xe059;"></i><span class="sr">+</span></a></li></ul></div>', A()
        }
    }, e.F4 = function(e) {
        if (c = e.feed.entry, s = '<a href="#close" class="close" title="Tutup" onclick="document.getElementById(&#39;dte_latest-comments&#39;).removeAttribute(&#39;style&#39;);return false;"><span class="sr">Tutup</span></a><ul class="list-media recent-comments _cmt">', n = t.getElementById("dte_latest-comments")) {
            for (var a = 0, g = c.length; g > a; a++) {
                i = "content" in c[a] ? C0(c[a].content.$t) : "Tidak ada komentar.", u = c[a].author[0].name ? c[a].author[0].name.$t : "Anonim", d = c[a].author[0].uri ? c[a].author[0].uri.$t : "#", o = c[a].author[0].gd$image.src.replace(/\/s\d+(\-c)?/, "/s40-c"), l = c[a].published.$t.substring(0, 16).split("-"), p = c[a].id.$t.replace(/^.*?blog\-(\d+).*?post\-(\d+)/, "//www.blogger.com/delete-comment.g?blogID=$1&postID=$2"), m = c[a]["thr$in-reply-to"].source.split("default/")[1], h = c[a].id.$t.replace(/^.*?blog\-(\d+).*?post\-(\d+)/, "//www.blogger.com/comment-iframe.g?blogID=$1&postID=" + m + "&parentID=$2");
                for (var b = 0, x = c[a].link.length; x > b; b++)
                    if ("alternate" == c[a].link[b].rel) {
                        r = c[a].link[b].href;
                        break
                    } f = r.substring(r.lastIndexOf("/") + 1, r.lastIndexOf(".html")).replace(/-/g, " "), s += '<li><img class="list-media-thumbnail" alt="' + k + '" width="40" height="40" src="' + o + '"><strong class="list-media-title"><a href="' + d + '" title="URL Profil">' + u + '</a> pada <a href="' + r + '" target="_blank" title="URL Permalink Komentar">' + f.split("")[0].toUpperCase() + f.slice(1) + '&hellip;</a></strong><span class="list-media-content">' + i + '</span><span class="list-media-meta text-right"><time datetime="' + l.join("-") + '"><b>' + (l[2].split("T")[1] + "</b> &ndash; " + l[2].split("T")[0] + " " + v[parseInt(l[1], 10) - 1] + " " + l[0]) + '</time> &middot; <a href="' + h + '" onclick="window.open(this.href,&#39;_cf&#39;,&#39;scrollbars=1,width=470,height=250,left=355,top=135&#39;);return false;" title="Balas komentar ini&hellip;">Balas</a> <a href="' + p + '" title="Hapus komentar ini&hellip;" target="_blank">Hapus</a></span></li>'
            }
            n.innerHTML = s + "</ul>", A()
        }
    }, e.F5 = function(t) {
        e._z = parseInt(/blog-\d+/.exec(t.feed.id.$t)[0].slice(5), 10)
    }, e.F6 = function(e) {
        var n = 0,
            a = t.getElementById("dte_comments-block"),
            r = e.feed,
            i = r.author[0].name ? r.author[0].name.$t : "Anonim",
            o = r.author[0].gd$image.src.replace(/\/s\d+(\-c)?\//, "/s50-c/");
        if (!r.entry || 0 === r.entry.length) return void(a.innerHTML = "<p>Belum ada komentar.</p>");
        var s = r.entry,
            c = /\:blog-?(\d+)\./.exec(r.id.$t) ? /\:blog-?(\d+)\./.exec(r.id.$t)[1] : !1,
            l = "";
        a.innerHTML = "";
        for (var u = 0, d = s.length; d > u; ++u) {
            var f = s[u],
                p = f.id.$t.split("-").pop(),
                m = f.author[0].name ? f.author[0].name.$t : "Anonim",
                h = f.author[0].uri ? f.author[0].uri.$t : !1,
                g = f.gd$extendedProperty[1].value,
                b = "content" in f ? f.content.$t : f.summary.$t,
                v = f.author[0].gd$image.src.replace(/\/s\d+(\-c)?\//, "/s50-c/"),
                k = !1,
                x = "#",
                y = m === i || v === o;
            b = C0(b);
            for (var _ = 0, w = f.link.length; w > _; ++_) {
                if ("related" == f.link[_].rel) {
                    var C = f.link[_].href.split("/").pop();
                    k = p !== C ? C : !1
                }
                "alternate" == f.link[_].rel && (x = f.link[_].href)
            }
            if (-1 != b.search(/@<a +href="#c/i)) {
                var M = /@<a +href="#c(\d+)"( +| +rel="nofollow")?>(.*?)<\/a>/i.exec(b);
                k = M && M[1] ? M[1] : !1
            }
            var j = t.createElement("div");
            j.className = "dte_comment-outer", j.id = "dte_comment-" + p, l = '<section class="dte_comment' + (y ? " admin " : " ") + "c" + p + ' cl cf _cmt" itemscope="itemscope" itemtype="http://schema.org/Comment">', l += '<div class="dte_comment-avatar pull-left">', l += '<div class="avatar-image-container vcard" data-src="' + (y ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAQlBMVEXmGyLlGyLsGyPzHCUDAADtGyPpGyPxHCTwGyTsHCTwHCTnGyPvHCTyHCTvGyToGyMLCwvrHCPuHCTtHCQyY7QAAAD1jjsFAAAA/UlEQVR42uWW6w6CMAxGuW7iCoMP9/6v6moUGpgUNTESz5+xbieQUjqyy8t8V+mDSn8EpY/kzaDQ5LzvroRIQ1CgJkSEMmBUwHA0BVi4ABSlO506afB8U0HH1w7TLRzPO6iKnxX/ufL5g93wkVHAcz3JkAq2kyy3r7S0co6kFI4nFdQ82rVhOV4jpYDHdq20HMd/KCUtXyWVk5JKchUKsywYU8RwOslx2XmTKksTF54VDJFNFb8lglL8hh4KmZ3fS1G2d8pCVbg9WB8E3m62CwYj+Wo2Kk8j1NZHLggc7eiWyKSSQVcYTOztyRAslTeOpDcOvl8/xF9Ufvbn6gqFZLqLl/MzHAAAAABJRU5ErkJggg==" : v.indexOf("://") > -1 ? v : "//" + v) + '"></div>', l += '<a class="button small button-reply" data-reply-to="' + p + '" href="javascript:;">Balas</a><a class="button small button-delete" href="//www.blogger.com/delete-comment.g?blogID=' + c + "&postID=" + p + '">Hapus</a>', l += "</div>", l += '<div class="dte_comment-post">', l += '<div class="dte_comment-header cf"><strong class="dte_comment-author" itemprop="creator author"><i data-icon="&#xe013;"></i> ' + (h ? '<a class="url" href="' + h + '" rel="nofollow" target="_blank">' + m + "</a>" : "<span>" + m + "</span>") + "</strong></div>", l += '<div itemprop="text" class="' + (y ? "admin" : "visitor") + '-comment dte_comment-body">' + b + "</div>", l += '<p class="dte_comment-footer cf"><span itemprop="dateCreated">' + g + '</span> <a class="comment-permalink" data-icon="&#xe0f4;" href="' + x + '" rel="nofollow" title="Permalink"></a></p>', l += "</div>", l += "</section>", j.innerHTML = l, k !== !1 && t.getElementById("dte_comment-" + k) ? (t.getElementById("dte_comment-" + k).appendChild(j), n++) : (a.appendChild(j), n = 0)
        }
    }
}(window, document), ! function(e) {
    e.easing.jswing = e.easing.swing, e.extend(e.easing, {
        def: "easeOutQuad",
        swing: function(t, n, a, r, i) {
            return e.easing[e.easing.def](t, n, a, r, i)
        },
        easeInQuad: function(e, t, n, a, r) {
            return a * (t /= r) * t + n
        },
        easeOutQuad: function(e, t, n, a, r) {
            return -a * (t /= r) * (t - 2) + n
        },
        easeInOutQuad: function(e, t, n, a, r) {
            return (t /= r / 2) < 1 ? a / 2 * t * t + n : -a / 2 * (--t * (t - 2) - 1) + n
        },
        easeInCubic: function(e, t, n, a, r) {
            return a * (t /= r) * t * t + n
        },
        easeOutCubic: function(e, t, n, a, r) {
            return a * ((t = t / r - 1) * t * t + 1) + n
        },
        easeInOutCubic: function(e, t, n, a, r) {
            return (t /= r / 2) < 1 ? a / 2 * t * t * t + n : a / 2 * ((t -= 2) * t * t + 2) + n
        },
        easeInQuart: function(e, t, n, a, r) {
            return a * (t /= r) * t * t * t + n
        },
        easeOutQuart: function(e, t, n, a, r) {
            return -a * ((t = t / r - 1) * t * t * t - 1) + n
        },
        easeInOutQuart: function(e, t, n, a, r) {
            return (t /= r / 2) < 1 ? a / 2 * t * t * t * t + n : -a / 2 * ((t -= 2) * t * t * t - 2) + n
        },
        easeInQuint: function(e, t, n, a, r) {
            return a * (t /= r) * t * t * t * t + n
        },
        easeOutQuint: function(e, t, n, a, r) {
            return a * ((t = t / r - 1) * t * t * t * t + 1) + n
        },
        easeInOutQuint: function(e, t, n, a, r) {
            return (t /= r / 2) < 1 ? a / 2 * t * t * t * t * t + n : a / 2 * ((t -= 2) * t * t * t * t + 2) + n
        },
        easeInSine: function(e, t, n, a, r) {
            return -a * Math.cos(t / r * (Math.PI / 2)) + a + n
        },
        easeOutSine: function(e, t, n, a, r) {
            return a * Math.sin(t / r * (Math.PI / 2)) + n
        },
        easeInOutSine: function(e, t, n, a, r) {
            return -a / 2 * (Math.cos(Math.PI * t / r) - 1) + n
        },
        easeInExpo: function(e, t, n, a, r) {
            return 0 == t ? n : a * Math.pow(2, 10 * (t / r - 1)) + n
        },
        easeOutExpo: function(e, t, n, a, r) {
            return t == r ? n + a : a * (-Math.pow(2, -10 * t / r) + 1) + n
        },
        easeInOutExpo: function(e, t, n, a, r) {
            return 0 == t ? n : t == r ? n + a : (t /= r / 2) < 1 ? a / 2 * Math.pow(2, 10 * (t - 1)) + n : a / 2 * (-Math.pow(2, -10 * --t) + 2) + n
        },
        easeInCirc: function(e, t, n, a, r) {
            return -a * (Math.sqrt(1 - (t /= r) * t) - 1) + n
        },
        easeOutCirc: function(e, t, n, a, r) {
            return a * Math.sqrt(1 - (t = t / r - 1) * t) + n
        },
        easeInOutCirc: function(e, t, n, a, r) {
            return (t /= r / 2) < 1 ? -a / 2 * (Math.sqrt(1 - t * t) - 1) + n : a / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
        },
        easeInElastic: function(e, t, n, a, r) {
            var i = 1.70158,
                o = 0,
                s = a;
            if (0 == t) return n;
            if (1 == (t /= r)) return n + a;
            if (o || (o = .3 * r), s < Math.abs(a)) {
                s = a;
                var i = o / 4
            } else var i = o / (2 * Math.PI) * Math.asin(a / s);
            return -(s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * r - i) * Math.PI / o)) + n
        },
        easeOutElastic: function(e, t, n, a, r) {
            var i = 1.70158,
                o = 0,
                s = a;
            if (0 == t) return n;
            if (1 == (t /= r)) return n + a;
            if (o || (o = .3 * r), s < Math.abs(a)) {
                s = a;
                var i = o / 4
            } else var i = o / (2 * Math.PI) * Math.asin(a / s);
            return s * Math.pow(2, -10 * t) * Math.sin(2 * (t * r - i) * Math.PI / o) + a + n
        },
        easeInOutElastic: function(e, t, n, a, r) {
            var i = 1.70158,
                o = 0,
                s = a;
            if (0 == t) return n;
            if (2 == (t /= r / 2)) return n + a;
            if (o || (o = .3 * r * 1.5), s < Math.abs(a)) {
                s = a;
                var i = o / 4
            } else var i = o / (2 * Math.PI) * Math.asin(a / s);
            return 1 > t ? -.5 * s * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * r - i) * Math.PI / o) + n : s * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t * r - i) * Math.PI / o) * .5 + a + n
        },
        easeInBack: function(e, t, n, a, r, i) {
            return void 0 == i && (i = 1.70158), a * (t /= r) * t * ((i + 1) * t - i) + n
        },
        easeOutBack: function(e, t, n, a, r, i) {
            return void 0 == i && (i = 1.70158), a * ((t = t / r - 1) * t * ((i + 1) * t + i) + 1) + n
        },
        easeInOutBack: function(e, t, n, a, r, i) {
            return void 0 == i && (i = 1.70158), (t /= r / 2) < 1 ? a / 2 * t * t * (((i *= 1.525) + 1) * t - i) + n : a / 2 * ((t -= 2) * t * (((i *= 1.525) + 1) * t + i) + 2) + n
        },
        easeInBounce: function(t, n, a, r, i) {
            return r - e.easing.easeOutBounce(t, i - n, 0, r, i) + a
        },
        easeOutBounce: function(e, t, n, a, r) {
            return (t /= r) < 1 / 2.75 ? 7.5625 * a * t * t + n : 2 / 2.75 > t ? a * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : 2.5 / 2.75 > t ? a * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : a * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
        },
        easeInOutBounce: function(t, n, a, r, i) {
            return i / 2 > n ? .5 * e.easing.easeInBounce(t, 2 * n, 0, r, i) + a : .5 * e.easing.easeOutBounce(t, 2 * n - i, 0, r, i) + .5 * r + a
        }
    })
}(jQuery), ! function(e) {
    function t(t, a, i, o) {
        if (e.support.matrixFilter) return r(t, a);
        var s = n(t),
            c = /[X|Y]/.exec(i);
        c = null === c ? "" : c[0] ? c[0] : c, i = /.*[^XY]/.exec(i)[0], o = void 0 === o ? "" : o;
        var l, u = "",
            d = !1;
        if (null !== s)
            for (var f in s)
                if (l = s[f], i === f) "matrix" !== i ? (u += i + "(", u += "X" === c || "" === c ? a + o : "" !== l[0] ? l[0] : e.cssHooks[i + "X"].get(t) + o, u += "Y" === c ? ", " + a + o : "" !== l[1] ? ", " + l[1] : i + "Y" in e.cssHooks ? ", " + e.cssHooks[i + "Y"].get(t) + o : "", u += ") ") : u += a + " ", d = !0;
                else {
                    u += f + "(";
                    for (var p = 0; p < l.length && (u += l[p], p < l.length - 1 && "" !== l[p + 1]); p++) u += ", ";
                    u += ") "
                } d || (u += i + c + "(" + a + o + ") "), t.style[e.cssProps.transform] = u
    }

    function n(t) {
        var n, a, r, i;
        return e(t.style[e.cssProps.transform].replace(/(?:\,\s|\)|\()/g, "|").split(" ")).each(function(e, t) {
            "" !== t && (void 0 === n && (n = {}), a = t.split("|"), r = a.shift(), i = /.*[^XY]/.exec(r)[0], n[i] || (n[i] = ["", "", "", "", "", ""]), /Y/.test(r) || (n[i][0] = a[0]), /X/.test(r) || (n[i][1] = a[1]), 6 == a.length && (n[i][2] = a[2], n[i][3] = a[3], n[i][4] = a[4], n[i][5] = a[5]))
        }), void 0 !== n ? n : null
    }

    function a(e) {
        return "number" == typeof e ? parseFloat(e) : -1 != e.indexOf("deg") ? parseInt(e, 10) * (2 * Math.PI / 360) : -1 != e.indexOf("grad") ? parseInt(e, 10) * (Math.PI / 200) : void 0
    }

    function r(t, n) {
        var r, i, o = "matrixFilter" === e.cssProps.transformOrigin ? !0 : !1;
        if (r = [e.cssHooks.scaleX.get(t), a(e.cssHooks.skewY.get(t)), a(e.cssHooks.skewX.get(t)), e.cssHooks.scaleY.get(t), e.cssHooks.translateX.get(t), e.cssHooks.translateY.get(t)], o) {
            t.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=1,M12=0,M21=0,M22=1,SizingMethod='auto expand')";
            var s = e.cssHooks.transformOriginX.get(t),
                c = e.cssHooks.transformOriginY.get(t);
            s = s.indexOf("%") > 0 ? /[\d]*/.exec(s) / 100 : s, c = c.indexOf("%") > 0 ? /[\d]*/.exec(c) / 100 : c;
            var l = t.offsetWidth,
                u = t.offsetHeight
        }
        if (n = "array" != typeof n || 6 !== n.length ? r : [r[0] * n[0] + r[1] * n[2], r[0] * n[1] + r[1] * n[3], r[2] * n[0] + r[3] * n[2], r[2] * n[1] + r[3] * n[3], n[4], n[5]], i = e.data(t, "rotate")) {
            i = a(i);
            var d = Math.cos(i),
                f = Math.sin(i);
            i = [d, -f, f, d], n = [n[0] * i[0] + n[1] * i[2], n[0] * i[1] + n[1] * i[3], n[2] * i[0] + n[3] * i[2], n[2] * i[1] + n[3] * i[3], n[4], n[5]]
        }
        if (t.style.filter = "progid:DXImageTransform.Microsoft.Matrix(" + ("M11=" + n[0] + ", ") + ("M12=" + n[1] + ", ") + ("M21=" + n[2] + ", ") + ("M22=" + n[3] + ", ") + "SizingMethod='auto expand')", o) {
            var p = t.offsetWidth,
                m = t.offsetHeight;
            t.style.position = "relative", t.style.left = s * (l - p) + (parseInt(n[4]) || 0), t.style.top = c * (u - m) + (parseInt(n[5]) || 0)
        }
    }
    var i = document.createElement("div"),
        o = i.style;
    if (e.cssProps.transform = "" === o.MozTransform ? "MozTransform" : "" === o.msTransform ? "msTransform" : "" === o.WebkitTransform ? "WebkitTransform" : "" === o.OTransform ? "OTransform" : "" === o.Transform ? "Transform" : !1, e.cssProps.transformOrigin = "" === o.MozTransformOrigin ? "MozTransformOrigin" : "" === o.msTransformOrigin ? "msTransformOrigin" : "" === o.WebkitTransformOrigin ? "WebkitTransformOrigin" : "" === o.OTransformOrigin ? "OTransformOrigin" : "" === o.TransformOrigin ? "TransformOrigin" : !1, e.support.transform = e.cssProps.transform !== !1 || "" === o.filter ? !0 : !1, e.support.transformOrigin = e.cssProps.transformOrigin !== !1 ? !0 : !1, e.support.matrixFilter = "" === o.filter && e.cssProps.transform === !1 ? !0 : !1, i = null, e.support.transform !== !1) {
        e.cssNumber.skew = e.cssNumber.skewX = e.cssNumber.skewY = e.cssNumber.scale = e.cssNumber.scaleX = e.cssNumber.scaleY = e.cssNumber.rotate = e.cssNumber.matrix = !0, e.cssNumber.transformOrigin = e.cssNumber.transformOriginX = e.cssNumber.transformOriginY = !0, e.support.matrixFilter && (e.cssNumber.transformOrigin = e.cssNumber.transformOriginX = e.cssNumber.transformOriginY = !0, e.cssProps.transformOrigin = "matrixFilter"), e.cssHooks.transform = {
            set: function(t, n) {
                e.support.matrixFilter ? t.style.filter = n : t.style[e.cssProps.transform] = n + "%"
            },
            get: function(t) {
                return e.support.matrixFilter ? t.style.filter : t.style[e.cssProps.transform]
            }
        }, e.cssHooks.transformOrigin = {
            set: function(t, n, a) {
                e.support.matrixFilter ? (n = n.split(","), e.cssHooks.transformOriginX.set(t, n[0]), n.length > 1 && e.cssHooks.transformOriginY.set(t, n[1])) : (n = "string" == typeof n ? n : n + (a || "%"), t.style[e.cssProps.transformOrigin] = n)
            },
            get: function(t) {
                if (e.support.matrixFilter) {
                    var n = e.data(t, "transformOriginX"),
                        a = e.data(t, "transformOriginY");
                    return n && a && n === a ? n : "50%"
                }
                return t.style[e.cssProps.transformOrigin]
            }
        }, e.fx.step.transformOrigin = function(t) {
            e.cssHooks.transformOrigin.set(t.elem, t.now, t.unit)
        }, e.cssHooks.transformOriginX = {
            set: function(t, n, a) {
                e.support.matrixFilter ? (e.data(t, "transformOriginX", a ? n + a : n), r(t)) : (n = "string" == typeof n ? n : n + (a || "%"), t.style[e.cssProps.transformOrigin + "X"] = n)
            },
            get: function(t) {
                if (e.support.matrixFilter) {
                    var n = e.data(t, "transformOriginX");
                    switch (n) {
                        case "left":
                            return "0%";
                        case "center":
                            return "50%";
                        case "right":
                            return "100%"
                    }
                    return n ? n : "50%"
                }
                return t.style[e.cssProps.transformOrigin + "X"]
            }
        }, e.fx.step.transformOriginX = function(t) {
            e.cssHooks.transformOriginX.set(t.elem, t.now, t.unit)
        }, e.cssHooks.transformOriginY = {
            set: function(t, n, a) {
                e.support.matrixFilter ? (e.data(t, "transformOriginY", a ? n + a : n), r(t)) : (n = "string" == typeof n ? n : n + (a || "%"), t.style[e.cssProps.transformOrigin + "Y"] = n)
            },
            get: function(t) {
                if (e.support.matrixFilter) {
                    var n = e.data(t, "transformOriginY");
                    switch (n) {
                        case "top":
                            return "0%";
                        case "center":
                            return "50%";
                        case "bottom":
                            return "100%"
                    }
                    return n ? n : "50%"
                }
                return t.style[e.cssProps.transformOrigin + "Y"]
            }
        }, e.fx.step.transformOriginY = function(t) {
            e.cssHooks.transformOriginY.set(t.elem, t.now, t.unit)
        };
        var s = function(e) {
                return e
            },
            c = [
                ["X", "Y"], "X", "Y"
            ],
            l = [
                ["A", "B", "C", "D", "X", "Y"], "A", "B", "C", "D", "X", "Y"
            ],
            u = [{
                prop: "rotate",
                matrix: [function(e) {
                    return Math.cos(e)
                }, function(e) {
                    return -Math.sin(e)
                }, function(e) {
                    return Math.sin(e)
                }, function(e) {
                    return Math.cos(e)
                }],
                unit: "rad",
                subProps: [""],
                fnc: a
            }, {
                prop: "scale",
                matrix: [
                    [s, 0, 0, s],
                    [s, 0, 0, 1],
                    [1, 0, 0, s]
                ],
                unit: "",
                subProps: c,
                fnc: parseFloat,
                _default: 1
            }, {
                prop: "skew",
                matrix: [
                    [1, s, s, 1],
                    [1, s, 0, 1],
                    [1, 0, s, 1]
                ],
                unit: "rad",
                subProps: c,
                fnc: a
            }, {
                prop: "translate",
                matrix: [
                    [1, 0, 0, 1, s, s],
                    [1, 0, 0, 1, s, 0],
                    [1, 0, 0, 1, 0, s]
                ],
                standardUnit: "px",
                subProps: c,
                fnc: parseFloat
            }, {
                prop: "matrix",
                matrix: [
                    [s, s, s, s, s, s],
                    [s, 0, 0, 1, 0, 0],
                    [1, s, 0, 1, 0, 0],
                    [1, 0, s, 1, 0, 0],
                    [1, 0, 0, s, 0, 0],
                    [1, 0, 0, 1, 0, s]
                ],
                subProps: l,
                fnc: parseFloat
            }];
        e.each(u, function(n, a) {
            e.each(a.subProps, function(n, r) {
                var i, o = a;
                if (e.isArray(r)) {
                    i = o.prop;
                    var s = r;
                    e.cssHooks[i] = {
                        set: function(t, n, a) {
                            e.each(s, function(r, o) {
                                e.cssHooks[i + o].set(t, n, a)
                            })
                        },
                        get: function(t) {
                            var n = [];
                            return e.each(s, function(a, r) {
                                n.push(e.cssHooks[i + r].get(t, n))
                            }), n[0] || n[1]
                        }
                    }
                } else i = o.prop + r, e.cssHooks[i] = {
                    set: function(n, a, r) {
                        e.data(n, i, r ? a + r : a), t(n, o.fnc(r ? a + r : a), i, o.unit || r || o.standardUnit)
                    },
                    get: function(t) {
                        var n = e.data(t, i);
                        return n && void 0 !== n ? n : o._default || 0
                    }
                };
                e.fx.step[i] = function(t) {
                    t.unit = "px" === t.unit && e.cssNumber[i] ? o.standardUnit : t.unit, e.cssNumber[i] ? "" : t.unit, e.cssHooks[i].set(t.elem, t.now, t.unit)
                }
            })
        }), e.rotate = {
            radToDeg: function(e) {
                return 180 * e / Math.PI
            }
        }
    }
}(jQuery), ! function($) {
    $.fn.hl = function(e) {
        function t(e, n) {
            var a = 0;
            if (3 == e.nodeType) {
                var r = e.data.toUpperCase().indexOf(n);
                if (r >= 0) {
                    a = document.createElement("mark"), a.className = "mark", r = e.splitText(r), r.splitText(n.length);
                    var i = r.cloneNode(!0);
                    a.appendChild(i), r.parentNode.replaceChild(a, r), a = 1
                }
            } else if (1 == e.nodeType && e.childNodes && !/(script|style)/i.test(e.tagName))
                for (r = 0; r < e.childNodes.length; ++r) r += t(e.childNodes[r], n);
            return a
        }
        return this.length && e && e.length ? this.each(function() {
            t(this, e.toUpperCase())
        }) : this
    }, $.fn.rhl = function() {
        return this.find("mark.mark").each(function() {
            with(this.parentNode.firstChild.nodeName, this.parentNode) replaceChild(this.firstChild, this), normalize()
        }).end()
    }
}(jQuery), ! function(e) {
    function t(t, n) {
        function a() {
            return u.update(), i(), u
        }

        function r() {
            var e = k.toLowerCase();
            g.obj.css(v, x / m.ratio), p.obj.css(v, -x), _.start = g.obj.offset()[v], m.obj.css(e, h[n.axis]), h.obj.css(e, h[n.axis]), g.obj.css(e, g[n.axis])
        }

        function i() {
            f.obj[0].ontouchstart = function(e) {
                1 === e.touches.length && (o(e.touches[0]), e.stopPropagation())
            }, g.obj.on("mousedown", o), h.obj.on("mouseup", c), n.scroll && window.addEventListener ? (d[0].addEventListener("DOMMouseScroll", s, !1), d[0].addEventListener("mousewheel", s, !1), d[0].addEventListener("MozMousePixelScroll", function(e) {
                e.preventDefault()
            }, !1)) : n.scroll && (d[0].onmousewheel = s)
        }

        function o(t) {
            var n = parseInt(g.obj.css(v), 10);
            return _.start = b ? t.pageX : t.pageY, y.start = "auto" == n ? 0 : n, document.ontouchmove = function(e) {
                e.preventDefault(), c(e.touches[0])
            }, document.ontouchend = l, e(document).on("mousemove", c), e(document).on("mouseup", l), g.obj.addClass("hold").on("mouseup", l), !1
        }

        function s(t) {
            if (p.ratio < 1) {
                var a = t || window.event,
                    r = a.wheelDelta ? a.wheelDelta / 120 : -a.detail / 3;
                x -= r * n.wheel, x = Math.min(p[n.axis] - f[n.axis], Math.max(0, x)), g.obj.css(v, x / m.ratio), p.obj.css(v, -x), (n.lockscroll || x !== p[n.axis] - f[n.axis] && 0 !== x) && (a = e.event.fix(a), a.preventDefault())
            }
        }

        function c(e) {
            p.ratio < 1 && (y.now = n.invertscroll && w ? Math.min(h[n.axis] - g[n.axis], Math.max(0, y.start + (_.start - (b ? e.pageX : e.pageY)))) : Math.min(h[n.axis] - g[n.axis], Math.max(0, y.start + ((b ? e.pageX : e.pageY) - _.start))), x = y.now * m.ratio, p.obj.css(v, -x), g.obj.css(v, y.now))
        }

        function l() {
            e(document).off("mousemove", c), e(document).off("mouseup", l), g.obj.removeClass("hold").off("mouseup", l), document.ontouchmove = document.ontouchend = null
        }
        var u = this,
            d = t,
            f = {
                obj: e(".scroll-inner", t)
            },
            p = {
                obj: e(".scroll-content", t)
            },
            m = {
                obj: e(".scroll-bar", t)
            },
            h = {
                obj: e(".track", m.obj)
            },
            g = {
                obj: e(".thumb", m.obj)
            },
            b = "x" === n.axis,
            v = b ? "left" : "top",
            k = b ? "Width" : "Height",
            x = 0,
            y = {
                start: 0,
                now: 0
            },
            _ = {},
            w = "ontouchstart" in document.documentElement;
        return this.keystep = function(e) {
            p.ratio < 1 && (x -= e, x = Math.min(p[n.axis] - f[n.axis], Math.max(0, x)), g.obj.css(v, x / m.ratio), p.obj.css(v, -x))
        }, this.update = function(e) {
            f[n.axis] = f.obj[0]["offset" + k], p[n.axis] = p.obj[0]["scroll" + k], p.ratio = f[n.axis] / p[n.axis], m.obj.toggleClass("disable", p.ratio >= 1), h[n.axis] = "auto" === n.size ? f[n.axis] : n.size, g[n.axis] = Math.min(h[n.axis], Math.max(0, "auto" === n.sizethumb ? h[n.axis] * p.ratio : n.sizethumb)), m.ratio = "auto" === n.sizethumb ? p[n.axis] / h[n.axis] : (p[n.axis] - f[n.axis]) / (h[n.axis] - g[n.axis]), x = "relative" !== e || p.ratio > 1 ? 0 : Math.min(p[n.axis] - f[n.axis], Math.max(0, x)), x = "bottom" !== e || p.ratio > 1 ? isNaN(parseInt(e, 10)) ? x : parseInt(e, 10) : p[n.axis] - f[n.axis], r()
        }, a()
    }
    e.fn.ts = function(n) {
        var a = e.extend({}, {
                axis: "y",
                wheel: 0,
                scroll: !0,
                lockscroll: !0,
                size: "auto",
                sizethumb: "auto",
                invertscroll: !0,
                keyboard: !0,
                step: 10,
                i: "<span></span>"
            }, n),
            r = this;
        return r.each(function() {
            e(this).find(".scroll-inner").length || e(this).addClass("js").attr("tabindex", 0).css("overflow", "hidden").wrapInner('<div class="scroll-inner" style="overflow:hidden;"><div class="scroll-content"></div></div>').append('<span class="scroll-bar disable"><span class="track"><span class="thumb">' + a.i + "</span></span></span>").data("tsb", new t(e(this), a))
        }).on("focus", function() {
            a.keyboard && e(this).on("keydown", function(t) {
                return t.key && /^arrow(up|left)$/i.test(t.key) || 38 == t.keyCode || 37 == t.keyCode ? (e(this).ts_ks(a.step), !1) : t.key && t.key == /^arrow(down|right)$/i.test(t.key) || 40 == t.keyCode || 39 == t.keyCode ? (e(this).ts_ks(-a.step), !1) : void 0
            })
        }), e(window).on("resize", function() {
            r.ts_u("relative")
        }), r
    }, e.fn.ts_u = function(t) {
        var n = e(this).data("tsb");
        return n && n.update(t)
    }, e.fn.ts_ks = function(t) {
        var n = e(this).data("tsb");
        return n && n.keystep(t)
    }
}(jQuery), ! function(e) {
    "undefined" != typeof exports ? e(exports) : (window.hljs = e({}), "function" == typeof define && define.amd && define([], function() {
        return window.hljs
    }))
}(function(e) {
    function t(e) {
        return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
    }

    function n(e) {
        return e.nodeName.toLowerCase()
    }

    function a(e, t) {
        var n = e && e.exec(t);
        return n && 0 == n.index
    }

    function r(e) {
        var t = (e.className + " " + (e.parentNode ? e.parentNode.className : "")).split(/\s+/);
        return t = t.map(function(e) {
            return e.replace(/^lang(uage)?-/, "")
        }), t.filter(function(e) {
            return k(e) || /no(-?)highlight/.test(e)
        })[0]
    }

    function i(e, t) {
        var n = {};
        for (var a in e) n[a] = e[a];
        if (t)
            for (var a in t) n[a] = t[a];
        return n
    }

    function o(e) {
        var t = [];
        return function a(e, r) {
            for (var i = e.firstChild; i; i = i.nextSibling) 3 == i.nodeType ? r += i.nodeValue.length : 1 == i.nodeType && (t.push({
                event: "start",
                offset: r,
                node: i
            }), r = a(i, r), n(i).match(/br|hr|img|input/) || t.push({
                event: "stop",
                offset: r,
                node: i
            }));
            return r
        }(e, 0), t
    }

    function s(e, a, r) {
        function i() {
            return e.length && a.length ? e[0].offset != a[0].offset ? e[0].offset < a[0].offset ? e : a : "start" == a[0].event ? e : a : e.length ? e : a
        }

        function o(e) {
            function a(e) {
                return " " + e.nodeName + '="' + t(e.value) + '"'
            }
            u += "<" + n(e) + Array.prototype.map.call(e.attributes, a).join("") + ">"
        }

        function s(e) {
            u += "</" + n(e) + ">"
        }

        function c(e) {
            ("start" == e.event ? o : s)(e.node)
        }
        for (var l = 0, u = "", d = []; e.length || a.length;) {
            var f = i();
            if (u += t(r.substr(l, f[0].offset - l)), l = f[0].offset, f == e) {
                d.reverse().forEach(s);
                do c(f.splice(0, 1)[0]), f = i(); while (f == e && f.length && f[0].offset == l);
                d.reverse().forEach(o)
            } else "start" == f[0].event ? d.push(f[0].node) : d.pop(), c(f.splice(0, 1)[0])
        }
        return u + t(r.substr(l))
    }

    function c(e) {
        function t(e) {
            return e && e.source || e
        }

        function n(n, a) {
            return RegExp(t(n), "m" + (e.cI ? "i" : "") + (a ? "g" : ""))
        }

        function a(r, o) {
            if (!r.compiled) {
                if (r.compiled = !0, r.k = r.k || r.bK, r.k) {
                    var s = {},
                        c = function(t, n) {
                            e.cI && (n = n.toLowerCase()), n.split(" ").forEach(function(e) {
                                var n = e.split("|");
                                s[n[0]] = [t, n[1] ? +n[1] : 1]
                            })
                        };
                    "string" == typeof r.k ? c("keyword", r.k) : Object.keys(r.k).forEach(function(e) {
                        c(e, r.k[e])
                    }), r.k = s
                }
                r.lR = n(r.l || /\b[A-Za-z0-9_]+\b/, !0), o && (r.bK && (r.b = "\\b(" + r.bK.split(" ").join("|") + ")\\b"), r.b || (r.b = /\B|\b/), r.bR = n(r.b), r.e || r.eW || (r.e = /\B|\b/), r.e && (r.eR = n(r.e)), r.tE = t(r.e) || "", r.eW && o.tE && (r.tE += (r.e ? "|" : "") + o.tE)), r.i && (r.iR = n(r.i)), void 0 === r.r && (r.r = 1), r.c || (r.c = []);
                var l = [];
                r.c.forEach(function(e) {
                    e.v ? e.v.forEach(function(t) {
                        l.push(i(e, t))
                    }) : l.push("self" == e ? r : e)
                }), r.c = l, r.c.forEach(function(e) {
                    a(e, r)
                }), r.starts && a(r.starts, o);
                var u = r.c.map(function(e) {
                    return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b
                }).concat([r.tE, r.i]).map(t).filter(Boolean);
                r.t = u.length ? n(u.join("|"), !0) : {
                    exec: function() {
                        return null
                    }
                }
            }
        }
        a(e)
    }

    function l(e, n, r, i) {
        function o(e, t) {
            for (var n = 0; n < t.c.length; n++)
                if (a(t.c[n].bR, e)) return t.c[n]
        }

        function s(e, t) {
            return a(e.eR, t) ? e : e.eW ? s(e.parent, t) : void 0
        }

        function d(e, t) {
            return !r && a(t.iR, e)
        }

        function f(e, t) {
            var n = _.cI ? t[0].toLowerCase() : t[0];
            return e.k.hasOwnProperty(n) && e.k[n]
        }

        function p(e, t, n, a) {
            var r = a ? "" : x.classPrefix,
                i = '<span class="' + r,
                o = n ? "" : "</span>";
            return i += e + '">', i + t + o
        }

        function m() {
            if (!w.k) return t(B);
            var e = "",
                n = 0;
            w.lR.lastIndex = 0;
            for (var a = w.lR.exec(B); a;) {
                e += t(B.substr(n, a.index - n));
                var r = f(w, a);
                r ? (A += r[1], e += p(r[0], t(a[0]))) : e += t(a[0]), n = w.lR.lastIndex, a = w.lR.exec(B)
            }
            return e + t(B.substr(n))
        }

        function h() {
            if (w.sL && !y[w.sL]) return t(B);
            var e = w.sL ? l(w.sL, B, !0, C[w.sL]) : u(B);
            return w.r > 0 && (A += e.r), "continuous" == w.subLanguageMode && (C[w.sL] = e.top), p(e.language, e.value, !1, !0)
        }

        function g() {
            return void 0 !== w.sL ? h() : m()
        }

        function b(e, n) {
            var a = e.cN ? p(e.cN, "", !0) : "";
            e.rB ? (M += a, B = "") : e.eB ? (M += t(n) + a, B = "") : (M += a, B = n), w = Object.create(e, {
                parent: {
                    value: w
                }
            })
        }

        function v(e, n) {
            if (B += e, void 0 === n) return M += g(), 0;
            var a = o(n, w);
            if (a) return M += g(), b(a, n), a.rB ? 0 : n.length;
            var r = s(w, n);
            if (r) {
                var i = w;
                i.rE || i.eE || (B += n), M += g();
                do w.cN && (M += "</span>"), A += w.r, w = w.parent; while (w != r.parent);
                return i.eE && (M += t(n)), B = "", r.starts && b(r.starts, ""), i.rE ? 0 : n.length
            }
            if (d(n, w)) throw Error('Illegal lexeme "' + n + '" for mode "' + (w.cN || "<unnamed>") + '"');
            return B += n, n.length || 1
        }
        var _ = k(e);
        if (!_) throw Error('Unknown language: "' + e + '"');
        c(_);
        for (var w = i || _, C = {}, M = "", j = w; j != _; j = j.parent) j.cN && (M = p(j.cN, "", !0) + M);
        var B = "",
            A = 0;
        try {
            for (var N, T, E = 0; w.t.lastIndex = E, N = w.t.exec(n);) T = v(n.substr(E, N.index - E), N[0]), E = N.index + T;
            v(n.substr(E));
            for (var j = w; j.parent; j = j.parent) j.cN && (M += "</span>");
            return {
                r: A,
                value: M,
                language: e,
                top: w
            }
        } catch (I) {
            if (-1 != I.message.indexOf("Illegal")) return {
                r: 0,
                value: t(n)
            };
            throw I
        }
    }

    function u(e, n) {
        n = n || x.languages || Object.keys(y);
        var a = {
                r: 0,
                value: t(e)
            },
            r = a;
        return n.forEach(function(t) {
            if (k(t)) {
                var n = l(t, e, !1);
                n.language = t, n.r > r.r && (r = n), n.r > a.r && (r = a, a = n)
            }
        }), r.language && (a.second_best = r), a
    }

    function d(e) {
        return x.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, t) {
            return t.replace(/\t/g, x.tabReplace)
        })), x.useBR && (e = e.replace(/\n/g, "<br>")), e
    }

    function f(e, t, n) {
        var a = t ? _[t] : n,
            r = [e.trim()];
        return e.match(/(\s|^)hljs(\s|$)/) || r.push("hljs"), a && r.push(a), r.join(" ").trim()
    }

    function p(e) {
        var t = r(e);
        if (!/no(-?)highlight/.test(t)) {
            var n;
            x.useBR ? (n = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), n.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : n = e;
            var a = n.textContent,
                i = t ? l(t, a, !0) : u(a),
                c = o(n);
            if (c.length) {
                var p = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                p.innerHTML = i.value, i.value = s(c, o(p), a)
            }
            i.value = d(i.value), e.innerHTML = i.value, e.className = f(e.className, t, i.language), e.result = {
                language: i.language,
                re: i.r
            }, i.second_best && (e.second_best = {
                language: i.second_best.language,
                re: i.second_best.r
            })
        }
    }

    function m(e) {
        x = i(x, e)
    }

    function h() {
        if (!h.called) {
            h.called = !0;
            var e = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(e, p)
        }
    }

    function g() {
        addEventListener("DOMContentLoaded", h, !1), addEventListener("load", h, !1)
    }

    function b(t, n) {
        var a = y[t] = n(e);
        a.aliases && a.aliases.forEach(function(e) {
            _[e] = t
        })
    }

    function v() {
        return Object.keys(y)
    }

    function k(e) {
        return y[e] || y[_[e]]
    }
    var x = {
            classPrefix: "hljs-",
            tabReplace: null,
            useBR: !1,
            languages: void 0
        },
        y = {},
        _ = {};
    return e.highlight = l, e.highlightAuto = u, e.fixMarkup = d, e.highlightBlock = p, e.configure = m, e.initHighlighting = h, e.initHighlightingOnLoad = g, e.registerLanguage = b, e.listLanguages = v, e.getLanguage = k, e.inherit = i, e.IR = "[a-zA-Z][a-zA-Z0-9_]*", e.UIR = "[a-zA-Z_][a-zA-Z0-9_]*", e.NR = "\\b\\d+(\\.\\d+)?", e.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", e.BNR = "\\b(0b[01]+)", e.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", e.BE = {
        b: "\\\\[\\s\\S]",
        r: 0
    }, e.ASM = {
        cN: "string",
        b: "'",
        e: "'",
        i: "\\n",
        c: [e.BE]
    }, e.QSM = {
        cN: "string",
        b: '"',
        e: '"',
        i: "\\n",
        c: [e.BE]
    }, e.PWM = {
        b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/
    }, e.CLCM = {
        cN: "comment",
        b: "//",
        e: "$",
        c: [e.PWM]
    }, e.CBCM = {
        cN: "comment",
        b: "/\\*",
        e: "\\*/",
        c: [e.PWM]
    }, e.HCM = {
        cN: "comment",
        b: "#",
        e: "$",
        c: [e.PWM]
    }, e.NM = {
        cN: "number",
        b: e.NR,
        r: 0
    }, e.CNM = {
        cN: "number",
        b: e.CNR,
        r: 0
    }, e.BNM = {
        cN: "number",
        b: e.BNR,
        r: 0
    }, e.CSSNM = {
        cN: "number",
        b: e.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        r: 0
    }, e.RM = {
        cN: "regexp",
        b: /\//,
        e: /\/[gimuy]*/,
        i: /\n/,
        c: [e.BE, {
            b: /\[/,
            e: /\]/,
            r: 0,
            c: [e.BE]
        }]
    }, e.TM = {
        cN: "title",
        b: e.IR,
        r: 0
    }, e.UTM = {
        cN: "title",
        b: e.UIR,
        r: 0
    }, e
}), hljs.registerLanguage("xml", function() {
        var e = "[A-Za-z0-9\\._:-]+",
            t = {
                b: /<\?(php)?(?!\w)/,
                e: /\?>/,
                sL: "php",
                subLanguageMode: "continuous"
            },
            n = {
                eW: !0,
                i: /</,
                r: 0,
                c: [t, {
                    cN: "attribute",
                    b: e,
                    r: 0
                }, {
                    b: "=",
                    r: 0,
                    c: [{
                        cN: "value",
                        c: [t],
                        v: [{
                            b: /"/,
                            e: /"/
                        }, {
                            b: /'/,
                            e: /'/
                        }, {
                            b: /[^\s\/>]+/
                        }]
                    }]
                }]
            };
        return {
            aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
            cI: !0,
            c: [{
                cN: "doctype",
                b: "<!DOCTYPE",
                e: ">",
                r: 10,
                c: [{
                    b: "\\[",
                    e: "\\]"
                }]
            }, {
                cN: "comment",
                b: "<!--",
                e: "-->",
                r: 10
            }, {
                cN: "cdata",
                b: "<\\!\\[CDATA\\[",
                e: "\\]\\]>",
                r: 10
            }, {
                cN: "tag",
                b: "<style(?=\\s|>|$)",
                e: ">",
                k: {
                    title: "style"
                },
                c: [n],
                starts: {
                    e: "</style>",
                    rE: !0,
                    sL: "css"
                }
            }, {
                cN: "tag",
                b: "<script(?=\\s|>|$)",
                e: ">",
                k: {
                    title: "script"
                },
                c: [n],
                starts: {
                    e: "<\/script>",
                    rE: !0,
                    sL: "javascript"
                }
            }, t, {
                cN: "pi",
                b: /<\?\w+/,
                e: /\?>/,
                r: 10
            }, {
                cN: "tag",
                b: "</?",
                e: "/?>",
                c: [{
                    cN: "title",
                    b: /[^ \/><\n\t]+/,
                    r: 0
                }, n]
            }]
        }
    }), hljs.registerLanguage("sql", function(e) {
        var t = {
            cN: "comment",
            b: "--",
            e: "$"
        };
        return {
            cI: !0,
            i: /[<>]/,
            c: [{
                cN: "operator",
                bK: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate savepoint release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup",
                e: /;/,
                eW: !0,
                k: {
                    keyword: "abs absolute acos action add adddate addtime aes_decrypt aes_encrypt after aggregate all allocate alter analyze and any are as asc ascii asin assertion at atan atan2 atn2 authorization authors avg backup before begin benchmark between bin binlog bit_and bit_count bit_length bit_or bit_xor both by cache call cascade cascaded case cast catalog ceil ceiling chain change changed char_length character_length charindex charset check checksum checksum_agg choose close coalesce coercibility collate collation collationproperty column columns columns_updated commit compress concat concat_ws concurrent connect connection connection_id consistent constraint constraints continue contributors conv convert convert_tz corresponding cos cot count count_big crc32 create cross cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime data database databases datalength date_add date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts datetimeoffsetfromparts day dayname dayofmonth dayofweek dayofyear deallocate declare decode default deferrable deferred degrees delayed delete des_decrypt des_encrypt des_key_file desc describe descriptor diagnostics difference disconnect distinct distinctrow div do domain double drop dumpfile each else elt enclosed encode encrypt end end-exec engine engines eomonth errors escape escaped event eventdata events except exception exec execute exists exp explain export_set extended external extract fast fetch field fields find_in_set first first_value floor flush for force foreign format found found_rows from from_base64 from_days from_unixtime full function get get_format get_lock getdate getutcdate global go goto grant grants greatest group group_concat grouping grouping_id gtid_subset gtid_subtract handler having help hex high_priority hosts hour ident_current ident_incr ident_seed identified identity if ifnull ignore iif ilike immediate in index indicator inet6_aton inet6_ntoa inet_aton inet_ntoa infile initially inner innodb input insert install instr intersect into is is_free_lock is_ipv4 is_ipv4_compat is_ipv4_mapped is_not is_not_null is_used_lock isdate isnull isolation join key kill language last last_day last_insert_id last_value lcase lead leading least leaves left len lenght level like limit lines ln load load_file local localtime localtimestamp locate lock log log10 log2 logfile logs low_priority lower lpad ltrim make_set makedate maketime master master_pos_wait match matched max md5 medium merge microsecond mid min minute mod mode module month monthname mutex name_const names national natural nchar next no no_write_to_binlog not now nullif nvarchar oct octet_length of old_password on only open optimize option optionally or ord order outer outfile output pad parse partial partition password patindex percent_rank percentile_cont percentile_disc period_add period_diff pi plugin position pow power pragma precision prepare preserve primary prior privileges procedure procedure_analyze processlist profile profiles public publishingservername purge quarter query quick quote quotename radians rand read references regexp relative relaylog release release_lock rename repair repeat replace replicate reset restore restrict return returns reverse revoke right rlike rollback rollup round row row_count rows rpad rtrim savepoint schema scroll sec_to_time second section select serializable server session session_user set sha sha1 sha2 share show sign sin size slave sleep smalldatetimefromparts snapshot some soname soundex sounds_like space sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sql_variant_property sqlstate sqrt square start starting status std stddev stddev_pop stddev_samp stdev stdevp stop str str_to_date straight_join strcmp string stuff subdate substr substring subtime subtring_index sum switchoffset sysdate sysdatetime sysdatetimeoffset system_user sysutcdatetime table tables tablespace tan temporary terminated tertiary_weights then time time_format time_to_sec timediff timefromparts timestamp timestampadd timestampdiff timezone_hour timezone_minute to to_base64 to_days to_seconds todatetimeoffset trailing transaction translation trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse ucase uncompress uncompressed_length unhex unicode uninstall union unique unix_timestamp unknown unlock update upgrade upped upper usage use user user_resources using utc_date utc_time utc_timestamp uuid uuid_short validate_password_strength value values var var_pop var_samp variables variance varp version view warnings week weekday weekofyear weight_string when whenever where with work write xml xor year yearweek zon",
                    literal: "true false null",
                    built_in: "array bigint binary bit blob boolean char character date dec decimal float int integer interval number numeric real serial smallint varchar varying int8 serial8 text"
                },
                c: [{
                    cN: "string",
                    b: "'",
                    e: "'",
                    c: [e.BE, {
                        b: "''"
                    }]
                }, {
                    cN: "string",
                    b: '"',
                    e: '"',
                    c: [e.BE, {
                        b: '""'
                    }]
                }, {
                    cN: "string",
                    b: "`",
                    e: "`",
                    c: [e.BE]
                }, e.CNM, e.CBCM, t]
            }, e.CBCM, t]
        }
    }), hljs.registerLanguage("css", function(e) {
        var t = "[a-zA-Z-][a-zA-Z0-9_-]*",
            n = {
                cN: "function",
                b: t + "\\(",
                rB: !0,
                eE: !0,
                e: "\\("
            };
        return {
            cI: !0,
            i: "[=/|']",
            c: [e.CBCM, {
                cN: "id",
                b: "\\#[A-Za-z0-9_-]+"
            }, {
                cN: "class",
                b: "\\.[A-Za-z0-9_-]+",
                r: 0
            }, {
                cN: "attr_selector",
                b: "\\[",
                e: "\\]",
                i: "$"
            }, {
                cN: "pseudo",
                b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
            }, {
                cN: "at_rule",
                b: "@(font-face|page)",
                l: "[a-z-]+",
                k: "font-face page"
            }, {
                cN: "at_rule",
                b: "@",
                e: "[{;]",
                c: [{
                    cN: "keyword",
                    b: /\S+/
                }, {
                    b: /\s/,
                    eW: !0,
                    eE: !0,
                    r: 0,
                    c: [n, e.ASM, e.QSM, e.CSSNM]
                }]
            }, {
                cN: "tag",
                b: t,
                r: 0
            }, {
                cN: "rules",
                b: "{",
                e: "}",
                i: "[^\\s]",
                r: 0,
                c: [e.CBCM, {
                    cN: "rule",
                    b: "[^\\s]",
                    rB: !0,
                    e: ";",
                    eW: !0,
                    c: [{
                        cN: "attribute",
                        b: "[A-Z\\_\\.\\-]+",
                        e: ":",
                        eE: !0,
                        i: "[^\\s]",
                        starts: {
                            cN: "value",
                            eW: !0,
                            eE: !0,
                            c: [n, e.CSSNM, e.QSM, e.ASM, e.CBCM, {
                                cN: "hexcolor",
                                b: "#[0-9A-Fa-f]+"
                            }, {
                                cN: "important",
                                b: "!important"
                            }]
                        }
                    }]
                }]
            }]
        }
    }), hljs.registerLanguage("apache", function(e) {
        var t = {
            cN: "number",
            b: "[\\$%]\\d+"
        };
        return {
            aliases: ["apacheconf"],
            cI: !0,
            c: [e.HCM, {
                cN: "tag",
                b: "</?",
                e: ">"
            }, {
                cN: "keyword",
                b: /\w+/,
                r: 0,
                k: {
                    common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
                },
                starts: {
                    e: /$/,
                    r: 0,
                    k: {
                        literal: "on off all"
                    },
                    c: [{
                        cN: "sqbracket",
                        b: "\\s\\[",
                        e: "\\]$"
                    }, {
                        cN: "cbracket",
                        b: "[\\$%]\\{",
                        e: "\\}",
                        c: ["self", t]
                    }, t, e.QSM]
                }
            }],
            i: /\S/
        }
    }), hljs.registerLanguage("php", function(e) {
        var t = {
                cN: "variable",
                b: "\\$+[a-zA-Z_][a-zA-Z0-9_]*"
            },
            n = {
                cN: "preprocessor",
                b: /<\?(php)?|\?>/
            },
            a = {
                cN: "string",
                c: [e.BE, n],
                v: [{
                    b: 'b"',
                    e: '"'
                }, {
                    b: "b'",
                    e: "'"
                }, e.inherit(e.ASM, {
                    i: null
                }), e.inherit(e.QSM, {
                    i: null
                })]
            },
            r = {
                v: [e.BNM, e.CNM]
            };
        return {
            aliases: ["php3", "php4", "php5", "php6"],
            cI: !0,
            k: "and include_once list abstract global private echo interface as static endswitch array null if endwhile or const for endforeach self var while isset public protected exit foreach throw elseif include __FILE__ empty require_once do xor return parent clone use __CLASS__ __LINE__ else break print eval new catch __METHOD__ case exception default die require __FUNCTION__ enddeclare final try switch continue endfor endif declare unset true false trait goto instanceof insteadof __DIR__ __NAMESPACE__ yield finally",
            c: [e.CLCM, e.HCM, {
                cN: "comment",
                b: "/\\*",
                e: "\\*/",
                c: [{
                    cN: "phpdoc",
                    b: "\\s@[A-Za-z]+"
                }, n]
            }, {
                cN: "comment",
                b: "__halt_compiler.+?;",
                eW: !0,
                k: "__halt_compiler",
                l: e.UIR
            }, {
                cN: "string",
                b: "<<<['\"]?\\w+['\"]?$",
                e: "^\\w+;",
                c: [e.BE]
            }, n, t, {
                b: /->+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
            }, {
                cN: "function",
                bK: "function",
                e: /[;{]/,
                eE: !0,
                i: "\\$|\\[|%",
                c: [e.UTM, {
                    cN: "params",
                    b: "\\(",
                    e: "\\)",
                    c: ["self", t, e.CBCM, a, r]
                }]
            }, {
                cN: "class",
                bK: "class interface",
                e: "{",
                eE: !0,
                i: /[:\(\$"]/,
                c: [{
                    bK: "extends implements"
                }, e.UTM]
            }, {
                bK: "namespace",
                e: ";",
                i: /[\.']/,
                c: [e.UTM]
            }, {
                bK: "use",
                e: ";",
                c: [e.UTM]
            }, {
                b: "=>"
            }, a, r]
        }
    }), hljs.registerLanguage("ini", function(e) {
        return {
            cI: !0,
            i: /\S/,
            c: [{
                cN: "comment",
                b: ";",
                e: "$"
            }, {
                cN: "title",
                b: "^\\[",
                e: "\\]"
            }, {
                cN: "setting",
                b: "^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",
                e: "$",
                c: [{
                    cN: "value",
                    eW: !0,
                    k: "on off true false yes no",
                    c: [e.QSM, e.NM],
                    r: 0
                }]
            }]
        }
    }), hljs.registerLanguage("javascript", function(e) {
        return {
            aliases: ["js"],
            k: {
                keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
                literal: "true false null undefined NaN Infinity",
                built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document"
            },
            c: [{
                cN: "pi",
                r: 10,
                v: [{
                    b: /^\s*('|")use strict('|")/
                }, {
                    b: /^\s*('|")use asm('|")/
                }]
            }, e.ASM, e.QSM, e.CLCM, e.CBCM, e.CNM, {
                b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
                k: "return throw case",
                c: [e.CLCM, e.CBCM, e.RM, {
                    b: /</,
                    e: />;/,
                    r: 0,
                    sL: "xml"
                }],
                r: 0
            }, {
                cN: "function",
                bK: "function",
                e: /\{/,
                eE: !0,
                c: [e.inherit(e.TM, {
                    b: /[A-Za-z$_][0-9A-Za-z$_]*/
                }), {
                    cN: "params",
                    b: /\(/,
                    e: /\)/,
                    c: [e.CLCM, e.CBCM],
                    i: /["'\(]/
                }],
                i: /\[|%/
            }, {
                b: /\$[(.]/
            }, {
                b: "\\." + e.IR,
                r: 0
            }]
        }
    }), hljs.registerLanguage("json", function(e) {
        var t = {
                literal: "true false null"
            },
            n = [e.QSM, e.CNM],
            a = {
                cN: "value",
                e: ",",
                eW: !0,
                eE: !0,
                c: n,
                k: t
            },
            r = {
                b: "{",
                e: "}",
                c: [{
                    cN: "attribute",
                    b: '\\s*"',
                    e: '"\\s*:\\s*',
                    eB: !0,
                    eE: !0,
                    c: [e.BE],
                    i: "\\n",
                    starts: a
                }],
                i: "\\S"
            },
            i = {
                b: "\\[",
                e: "\\]",
                c: [e.inherit(a, {
                    cN: null
                })],
                i: "\\S"
            };
        return n.splice(n.length, 0, r, i), {
            c: n,
            k: t,
            i: "\\S"
        }
    }), hljs.registerLanguage("markdown", function() {
        return {
            aliases: ["md", "mkdown", "mkd"],
            c: [{
                cN: "header",
                v: [{
                    b: "^#{1,6}",
                    e: "$"
                }, {
                    b: "^.+?\\n[=-]{2,}$"
                }]
            }, {
                b: "<",
                e: ">",
                sL: "xml",
                r: 0
            }, {
                cN: "bullet",
                b: "^([*+-]|(\\d+\\.))\\s+"
            }, {
                cN: "strong",
                b: "[*_]{2}.+?[*_]{2}"
            }, {
                cN: "emphasis",
                v: [{
                    b: "\\*.+?\\*"
                }, {
                    b: "_.+?_",
                    r: 0
                }]
            }, {
                cN: "blockquote",
                b: "^>\\s+",
                e: "$"
            }, {
                cN: "code",
                v: [{
                    b: "`.+?`"
                }, {
                    b: "^( {4}|    )",
                    e: "$",
                    r: 0
                }]
            }, {
                cN: "horizontal_rule",
                b: "^[-\\*]{3,}",
                e: "$"
            }, {
                b: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
                rB: !0,
                c: [{
                    cN: "link_label",
                    b: "\\[",
                    e: "\\]",
                    eB: !0,
                    rE: !0,
                    r: 0
                }, {
                    cN: "link_url",
                    b: "\\]\\(",
                    e: "\\)",
                    eB: !0,
                    eE: !0
                }, {
                    cN: "link_reference",
                    b: "\\]\\[",
                    e: "\\]",
                    eB: !0,
                    eE: !0
                }],
                r: 10
            }, {
                b: "^\\[.+\\]:",
                rB: !0,
                c: [{
                    cN: "link_reference",
                    b: "\\[",
                    e: "\\]:",
                    eB: !0,
                    eE: !0,
                    starts: {
                        cN: "link_url",
                        e: "$"
                    }
                }]
            }]
        }
    }), hljs.registerLanguage("http", function() {
        return {
            i: "\\S",
            c: [{
                cN: "status",
                b: "^HTTP/[0-9\\.]+",
                e: "$",
                c: [{
                    cN: "number",
                    b: "\\b\\d{3}\\b"
                }]
            }, {
                cN: "request",
                b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
                rB: !0,
                e: "$",
                c: [{
                    cN: "string",
                    b: " ",
                    e: " ",
                    eB: !0,
                    eE: !0
                }]
            }, {
                cN: "attribute",
                b: "^\\w",
                e: ": ",
                eE: !0,
                i: "\\n|\\s|=",
                starts: {
                    cN: "string",
                    e: "$"
                }
            }, {
                b: "\\n\\n",
                starts: {
                    sL: "",
                    eW: !0
                }
            }]
        }
    }), hljs.registerLanguage("nginx", function(e) {
        var t = {
                cN: "variable",
                v: [{
                    b: /\$\d+/
                }, {
                    b: /\$\{/,
                    e: /}/
                }, {
                    b: "[\\$\\@]" + e.UIR
                }]
            },
            n = {
                eW: !0,
                l: "[a-z/_]+",
                k: {
                    built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
                },
                r: 0,
                i: "=>",
                c: [e.HCM, {
                    cN: "string",
                    c: [e.BE, t],
                    v: [{
                        b: /"/,
                        e: /"/
                    }, {
                        b: /'/,
                        e: /'/
                    }]
                }, {
                    cN: "url",
                    b: "([a-z]+):/",
                    e: "\\s",
                    eW: !0,
                    eE: !0,
                    c: [t]
                }, {
                    cN: "regexp",
                    c: [e.BE, t],
                    v: [{
                        b: "\\s\\^",
                        e: "\\s|{|;",
                        rE: !0
                    }, {
                        b: "~\\*?\\s+",
                        e: "\\s|{|;",
                        rE: !0
                    }, {
                        b: "\\*(\\.[a-z\\-]+)+"
                    }, {
                        b: "([a-z\\-]+\\.)+\\*"
                    }]
                }, {
                    cN: "number",
                    b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
                }, {
                    cN: "number",
                    b: "\\b\\d+[kKmMgGdshdwy]*\\b",
                    r: 0
                }, t]
            };
        return {
            aliases: ["nginxconf"],
            c: [e.HCM, {
                b: e.UIR + "\\s",
                e: ";|{",
                rB: !0,
                c: [{
                    cN: "title",
                    b: e.UIR,
                    starts: n
                }],
                r: 0
            }],
            i: "[^\\s\\}]"
        }
    }), hljs.configure({
        classPrefix: "_",
        tabReplace: "    "
    }),
    function(e) {
        function t() {
            var e = jQuery,
                n = document,
                a = window.location.hostname,
                r = "#dte_wrap-outer-scrollable",
                i = e(r);
            e("a:not(.ajax-try):not([target=_blank]):not([rel=nofollow])").B("ajax-try").ajaxGetContent({
                onSend: function() {
                    n.title = "Memuat…"
                },
                formsGet: {
                    ".dte_form-search": function() {
                        return !1
                    }
                },
                onHrefCheck: function() {
                    return !0
                },
                onElementCheck: function(e) {
                    var t = e.p("href");
                    return t = "" === t || RegExp("^(((https?:)?\\/\\/" + a.replace(/\./g, "\\.") + ")|(\\/(?!\\/))|[.?#]|javascript:)").test(t), t && e.B("ajax"), t
                },
                onReceive: function(a, o) {
                    e("#dte_link-top").L("style"), a = e(e.parseHTML("<div>" + a + "</div>", n, !1)), "success" == o && (n.title = a.M("title").k(), e("html").C("feed item sidebar-is-visible").B(/\.html$|^\/?(p|\d{4}\/\d{2})\//.test(e.fn.ajaxGetContent.getCurrentUrl()) ? "item" : "feed"), i.k(a.M(r).k()), i.get(0).scrollTop = 0, t(), I(1))
                }
            })
        }
        e.A = t, e.I = function(e) {
            function t(e) {
                return parseInt(e, 10)
            }

            function n(e, t, n, a) {
                var r;
                "js" == e ? (r = T.createElement("script"), r.id = n, r.src = t) : "css" == e && (r = T.createElement("link"), r = "stylesheet", r.id = n, r.href = t), r.onload = function() {
                    "function" == typeof a && a(), a = null
                }, r.onreadystatechange = function() {
                    (4 == s.readyState || "complete" == s.readyState) && ("function" == typeof a && a(), a = null)
                }, Bt[J](r)
            }

            function a(e, t, n) {
                A(e).X(function() {
                    return t + this[st] + n
                })
            }

            function r() {
                a("[rel=quote]", "<blockquote>", "</blockquote>", 1), a("[rel=code]", "<code>", "</code>"), a("[rel=note]", '<div class="note">', "</div>", 1), a("[rel=h3]", "<h3>", "</h3>", 1), a("[rel=h4]", "<h4>", "</h4>", 1), a("[rel=h5]", "<h5>", "</h5>", 1), a("[rel=h6]", "<h6>", "</h6>", 1), a("[rel=image]", '<img class="img-loader" data-src="', '">')
            }

            function i(e) {
                e.M("[rel=pre],[rel=code]").i(function() {
                    var e = "Sibling",
                        t = "previous" + e,
                        n = "next" + e;
                    return A(this).is("[rel=pre]") || !this[t] && !this[n] || A(this[t]).is("br") && (!this[n] || A(this[n]).is("br"))
                }).X(function() {
                    return '<pre><code ondblclick="A0(this);">' + hljs.highlightAuto(this[st][D](/<br *\/?>/gi, "\n")[D](/&amp;/g, "&")[D](/&lt;/g, "<")[D](/&gt;/g, ">")).value + "</code></pre>"
                })
            }

            function o() {
                A(".img-loader[data-src]").p("src", function() {
                    return A(this).q("src")[D](/\/s\d+(\-c)?\//i, "/s200/")
                }).o("click", function() {
                    N.open(A(this).q("src"))
                }).L("data-src").p("title", "Tampilkan ukuran penuh!")
            }

            function c(e) {
                Gt.C("off error").B("on").M(".tooltip").k(e).stop(!0, !0).F(600)
            }

            function l() {
                var e = "";
                return N.getSelection ? e = N.getSelection() : T.getSelection ? e = T.getSelection() : T.selection && (e = T.selection.createRange().text), e
            }

            function u(e, t) {
                "function" == typeof N.C1 ? (N.C1(e), d(Ut.M("textarea")[0]), "function" == typeof t && t()) : n("js", xt[1] + "attitude/contact.v2.js", "dte_contact-js", function() {
                    N.C1(e), d(Ut.M("textarea")[0]), "function" == typeof t && t()
                })
            }

            function d(e) {
                if (e.focus(), "number" == typeof e.selectionStart) e.selectionStart = e.selectionEnd = e.value.length;
                else if (void 0 !== e.createTextRange) {
                    e.focus();
                    var t = e.createTextRange();
                    t.collapse(!1), t.select()
                }
            }

            function f(e, t) {
                Nn = !0, Gt.C("off error").B("work on").n("top", Nt[X]() > 200 ? Nt[X]() - $n.a : $n.a), In = N[H](function() {
                    N[H](function() {
                        Gt.A({
                            top: e
                        }, {
                            duration: 3e3,
                            easing: Z,
                            step: function(e) {
                                Ht.n("background-position", "50% -" + e + "px")
                            },
                            complete: function() {
                                Nn = !1, "function" == typeof t && t()
                            }
                        })
                    }, 1e3)
                }, 200)
            }

            function p() {
                Gt.stop().L("style").C("work on error").B("off").M("*").stop(!0, !0).L("style"), Ut.C("solid").B("destroyed"), Nn = !1
            }

            function m(e, t) {
                if (Lt.M("h4").k("Pesan"), Rt.M(".dte_wrap-inner").k(""), qt.M(".button-group").k(""), !Ut.is(":visible") && !Gt.E("work") && Nn !== !0) {
                    if (Tn) return c("Ruangan ini terlalu sempit. Saya tidak bisa bekerja dengan baik di ruangan yang terlalu sempit. Mohon buka halaman ini pada perangkat yang lebih lebar dan luas&hellip;"), void Gt.B("error");
                    Nn = !0, Lt.M("h4").k(e.q("title")), Rt.M(".dte_wrap-inner").k(e.q("content")), qt.M(".button-group").k(e.q("action")), Gt.E("on") || on.E("on") || Gt.n("top", Nt[X]() > 200 ? Nt[X]() - $n.a : $n.a), Gt.C("off error").B("on").A({
                        top: Nt[X]() + 250
                    }, {
                        duration: 2e3,
                        easing: Z,
                        step: function(e) {
                            Ht.n("background-position", "50% -" + e + "px")
                        },
                        complete: function() {
                            Gt.M(".dte_ass-a").A({
                                width: 20
                            }, 1e3, function() {
                                A(this).M(".dte_ass-b").F(400, function() {
                                    A(this).A({
                                        height: 50,
                                        top: -25
                                    }, 700, function() {
                                        Qt.eq(0).U().A({
                                            height: 106
                                        }, 400), Qt.eq(1).U().A({
                                            height: 106
                                        }, 400, function() {
                                            Qt.eq(2).U().A({
                                                width: 10
                                            }, 400), Qt.eq(3).U().A({
                                                width: 8
                                            }, 1e3, function() {
                                                Ut.U(), Dt.F(400, function() {
                                                    Lt.A({
                                                        width: "100%"
                                                    }, 700, Z), Rt.A({
                                                        width: "100%"
                                                    }, 1500, Z), qt.A({
                                                        width: "100%"
                                                    }, 1e3, Z), Dt.Y().A({
                                                        top: -112,
                                                        left: 589,
                                                        rotate: "720deg"
                                                    }, 1400, function() {
                                                        var e = Lt[z]() + Rt[z]() + qt[z]();
                                                        Qt.eq(0).A({
                                                            height: "-=35px"
                                                        }, 1600, tt), Qt.eq(1).A({
                                                            height: "-=35px"
                                                        }, 1600, tt), Qt.eq(2).A({
                                                            top: "+=35px"
                                                        }, 1600, tt), Qt.eq(4).A({
                                                            top: "-=35px"
                                                        }, 1600, tt), Dt.A({
                                                            top: "+=35px"
                                                        }, 1600, tt), Ut.A({
                                                            height: e,
                                                            marginTop: -(e / 2 - 24)
                                                        }, 1600, tt, function() {
                                                            A(this).C("destroyed").B("solid").M(".dte_wrap-inner").F(400), Nn = !1, "function" == typeof t && t()
                                                        })
                                                    })
                                                })
                                            }), Qt.eq(4).U().A({
                                                width: 10
                                            }, 600)
                                        })
                                    })
                                })
                            })
                        }
                    })
                }
            }

            function h(e, t) {
                Ut.is(":hidden") || Gt.E("off") || Nn === !0 || (Nn = !0, Qt.eq(0).A({
                    height: "+=35px"
                }, 1600, tt), Qt.eq(1).A({
                    height: "+=35px"
                }, 1600, tt), Qt.eq(2).A({
                    top: "-=35px"
                }, 1600, tt), Qt.eq(4).A({
                    top: "+=35px"
                }, 1600, tt), Dt.A({
                    top: "-=35px"
                }, 1600, tt), Ut.C("solid").B("destroyed").A({
                    height: "+=70px",
                    marginTop: "-=35px"
                }, 1600, tt, function() {
                    Dt.Y().A({
                        top: "50%",
                        left: -7,
                        rotate: "-720deg"
                    }, 600, Z, function() {
                        Rt.A({
                            width: 0
                        }, 1e3, Z), qt.A({
                            width: 0
                        }, 800, Z)
                    }), Lt.A({
                        width: 0
                    }, 1600, Z, function() {
                        Qt.eq(2).A({
                            width: 0
                        }, 600, Z, function() {
                            A(this).V()
                        }), Qt.eq(3).A({
                            width: 0
                        }, 700, Z, function() {
                            A(this).V()
                        }), Qt.eq(4).A({
                            width: 0
                        }, 600, Z, function() {
                            A(this).V(), Ut.V(), Qt.eq(0).A({
                                height: 0
                            }, 600, et), Qt.eq(1).A({
                                height: 0
                            }, 600, Z, function() {
                                Dt.G(600, function() {
                                    Gt.M(".dte_ass-b").Y().A({
                                        rotate: "90deg"
                                    }, 600, Z, function() {
                                        A(this).A({
                                            left: -30
                                        }, 400, function() {
                                            Nt[X]() > 100 ? Gt.C("work on error").A({
                                                top: Nt[X]() - $n.a
                                            }, {
                                                duration: 1e3,
                                                easing: Z,
                                                step: function(e) {
                                                    Ht.n("background-position", "50% -" + e + "px")
                                                },
                                                complete: function() {
                                                    p(), "function" == typeof t && t(), It.is(":hidden") && k()
                                                }
                                            }) : Gt.C("work on error").A({
                                                top: $n.a
                                            }, {
                                                duration: 2e3,
                                                easing: Z,
                                                step: function(e) {
                                                    Ht.n("background-position", "50% -" + e + "px")
                                                },
                                                complete: function() {
                                                    Gt.M(".dte_ass-b").A({
                                                        left: 0,
                                                        opacity: 0
                                                    }, 400, Z, function() {
                                                        Gt.M(".dte_ass-a").A({
                                                            width: 0
                                                        }, 400, function() {
                                                            N[H](p, 1e3), It.is(":hidden") && k()
                                                        })
                                                    }), "function" == typeof t && t()
                                                }
                                            })
                                        })
                                    }), Gt.M(".tooltip").Y().A({
                                        scaleY: -1,
                                        marginRight: 50
                                    }, 1600, function() {
                                        A(this).G(1e3)
                                    })
                                })
                            })
                        })
                    })
                }))
            }

            function g() {
                return Tt.n({
                    "text-align": "justify",
                    "float": "right",
                    overflow: "visible",
                    padding: 0,
                    margin: 0
                })[ht](I("=jnh!bmu>#fssps#!tuzmf>#xjeui;bvup<ifjhiu;bvup<nby.xjeui;211&<nby.ifjhiu;211&<njo.xjeui;1<njo.ifjhiu;1<cbdlhspvoe;1!1<cpsefs;1<pvumjof;1<cpsefs.sbejvt;1<cpy.tibepx;opof<pqbdjuz;2<ejtqmbz;cmpdl<wjtjcjmjuz;wjtjcmf#!tsd>#ebub;jnbhf0qoh<cbtf75-jWCPSx1LHhpBBBBOTViFVhBBBIhBBBCZDBZBBBB,zEQlBBBBBYOTS1JBst5d7RBBBB[jT1eFBQ9B0xE0pM3olxBBBBmxTGm{BBBPyBBBEtRCmTtPHxBBBBe1TV2GC:xJFBhnCv4wIRNBBBGVTVSCWIkb8e3yddJxGJCiL9dL3dbfjp[T[Sp3dvmuNtTkOpVVUuIKnP:sY[k{g1,hnPBVFePSq[TP0RJIj5iVPw8mFq3cxBJkNBJkNBM{rtv3cV48{IWej9e{{rmmo0t{gbwVdQ2NtDVbhSHZRS,zThgofe6:RHs:RJZKSnBF6n0wxe6{UUBDJ{BDJ{BD3zbe{oY7MS70e88gQQs9KuhTkdBJkNBJkNC92k85Qwi82bQQc5Ju1RjNxBjNxBkNvgcCu9s:2ogY,w0SKuhTkdBJkNBJkNDdby:d3zgX:tn:g5es:QmOtDVbhSFZhSFZheowh6:0swCWz8JVg3pq6,xrn3BFSnBFGijCF[jkTM3gI:{70G0QUTrs4X93x[[pCF[hCF[hCHbo,0fjJ7Mq,dHZZBRXHJFSHJFSnI0V0Y6x9xv1Uz7r0[4CCGvjFSjCFSjCF[jeC:CPPYGV6Xc9BBBBBFmGUlTvRnDD#?", 1))
            }

            function b(e) {
                wn.A({
                    bottom: -20
                }, 200, function() {
                    A(this).V(), "function" == typeof e && e()
                })
            }

            function v(e) {
                Nt.h("resize"), wn.U().A({
                    bottom: 0
                }, 200, function() {
                    A(this).n("bottom", ""), "function" == typeof e && e()
                })
            }

            function k() {
                return It.is(":visible") && $n.f === !1 ? ($n.k = "298" + $n.j + "1028" + xt[0] + "1900", void((Un.length < 1 || Un.length > 1) && g())) : (yn.C("hold").M(".dte_wrap-inner").G(400, function() {
                    yn.A({
                        width: 0,
                        right: "+=6px"
                    }, 600, at, function() {
                        A(this).L("style"), Gt.M(".dte_ass-b").A({
                            height: 4,
                            marginTop: 0
                        }, 1600, it, function() {
                            b(), A(this).V().Q(".dte_ass-a").A({
                                width: 0
                            }, 1e3, it, function() {
                                Wt.F(1e3, it, function() {
                                    A(this).L("style"), Vt.A({
                                        marginTop: "+=50px"
                                    }, 1e3), tn.A({
                                        top: "+=100px"
                                    }, 1600, function() {
                                        A(this).A({
                                            marginRight: "-=30px"
                                        }, 1e3), Nt[X]() > 0 && Nt.A({
                                            scrollTop: 0
                                        }, 1e3), en.A({
                                            paddingTop: "-=100px"
                                        }, 400, function() {
                                            A(this).L("style"), Gt.A({
                                                top: $n.a
                                            }, 600, Z, function() {
                                                p(), Vt.L("style"), tn.L("style"), Et.add(wn).A({
                                                    left: j() ? 0 : "+=310px"
                                                }, 2e3, at, function() {
                                                    A(this).n("left", "")
                                                }), It.f().A({
                                                    marginTop: 0
                                                }, 1e3, Z, function() {
                                                    A(this).L("style"), It[j() ? "F" : "I"](1e3, j() ? null : nt, function() {
                                                        kn.C("active"), v()
                                                    }), Kt.I(1e3, nt)
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    }).M(".close").T()
                }), !1)
            }

            function x() {
                cn.M(".avatar-image-container[data-src]").k(function() {
                    return '<img width="50" height="50" src="' + A(this).q("src") + '" alt="">'
                }).L("data-src");
                for (var e = $n.e.length, n = 0; e > n; ++n) e - 1 > n && ($n.h += Ln[t(Hn[Q](t($n.e[n]), t($n.e[n + 1])))]);
                $n.g = $n.h[D](/(l[ah]\d+\.googleusercontent\.com|bp\d+\.blogspot\.com)/, "$1t")[D](/(d[ue]|re)/g, "$1.")
            }

            function y(e, t) {
                n("js", bt + "//" + gt + "/feeds/comments/default?alt=json&orderby=published&max-results=" + e + "&callback=F4&t=" + Date.now(), "F4", function() {
                    mn.U().ts(), i(mn), r(mn), o(), mn.M("li:lt(" + t + ")").B("selected"), _(), Mn.M("." + dt).T(), mn.ts_u()
                })
            }

            function _() {
                return A("code").i(function() {
                    return !A(this).P().is("pre") && (!this.title || this.title && "Apa ini?" != this.title)
                }).o("click", function() {
                    N.open("//www.google.co.id/cse?cx=partner-pub-4884309229437815:4734643671&ie=UTF-8&q=" + N[G](this[st][D](/&lt;/g, "<")[D](/&gt;/g, ">")[D](/<br *\/?>/gi, "\n")) + "&sa=Telusuri")
                }).p("title", "Apa ini?")
            }

            function w() {
                N[H](function() {
                    if (vt && /c\d+$/.test(vt)) {
                        var e = cn.M("." + vt[D]("#", "")).first(),
                            t = e.length ? e[W]().top - 10 : cn[W]().top;
                        b(function() {
                            Nt.A({
                                scrollTop: Nt[X]() + t
                            }, 1e4, Z, function() {
                                e.B("selected").R().C("selected"), v()
                            })
                        })
                    }
                    cn.M("a[href^='#c']").B("local-permalink")
                }, 1e3)
            }

            function C(e, a) {
                var s = jn.length ? t(jn[0][st]) : 0;
                jn.length && s > 0 ? n("js", bt + "//" + gt + "/feeds/" + Jt.p("id").split("-").pop() + "/comments/default?alt=json&reverse=false&orderby=published&start-index=" + e + "&max-results=" + a + "&callback=F6", "F6", function() {
                    return x(), i(ln), r(ln), cn.M(".dte_comment-body").each(function() {
                        var e = A(this),
                            t = e.M("a").i(":not(.allow)"),
                            n = e.k(),
                            a = /(^| |>|\/|\(|"|'|&quot;|&#39;|\[)(OOT|OTT|keluar topik|out of topic|off topic|diluar topik|di luar topik|tidak sesuai dengan pembahasan|tidak sesuai topik|tidak sesuai dengan topik|menyimpang dari topik|minta template|blackberry|nokia|acer|samsung|togel|ready stock|menawarkan produk|produk yang ditawarkan|produk yang kami tawarkan|promo|numpang promo)(\]|nya|"|'|&quot;|&#39;|\,|\.|\!|\?|\:|\;|\)|\/|<| |$)/gi;
                        t.length > 0 && e.is(".visitor-comment") && (e.S("<del></del>").Q(".dte_comment").B("spam"), vt && A("." + vt[D](/\#?c(\d+)/, "c$1")).E("spam") && f(e.Q(".dte_comment")[W]().top - 10, function() {
                            c("Tautan Anda terpaksa Saya blokir untuk alasan kenyamanan pembaca lain. Web ini digunakan untuk kalangan umum, mungkin akan lebih baik jika Anda tidak menyertakan tautan-tautan di area komentar untuk mencegah prasangka buruk dari pembaca yang lain terhadap Anda.<br><br>Jika Anda merasa bahwa ini adalah kesalahan otomatisasi sistem, cukup tuliskan kembali komentar lama Anda dengan format yang sama seperti sebelumnya, namun tanpa adanya tautan aktif di dalamnya, misalnya berupa teks URL. Terima kasih.")
                        })), a.test(n) && e.is(".visitor-comment") && (A(this).k("<del>" + n[D](a, "$1</del><mark><a class='allow' href='/2013/01/bagaimana-cara-bertanya-yang-baik-di.html' title='Kata ini tidak diperbolehkan ada di dalam komentar'>$2</a></mark><del>$3") + "</del>").Q(".dte_comment").B("spam").o("click", function() {
                            A(this).C("spam")
                        }), vt && A("." + vt[D](/\#?c(\d+)/, "c$1")).E("spam") && f(e.Q(".dte_comment")[W]().top - 10, function() {
                            c("Kata-kata yang ditandai sudah tidak diperbolehkan lagi ada di dalam komentar.")
                        }))
                    }), cn.M(".button-reply").L("onclick href").o("click", function() {
                        var e, t = A(this).q("replyTo"),
                            n = A(this).Q(".dte_comment");
                        return fn[0].src = Sn[0] + "&parentID=" + t + "#" + Sn[1], n[0][K](un[0], null), e = Nt[X]() + un[W]().top, b(function() {
                            Nt.A({
                                scrollTop: e - 10
                            }, 600, Z)
                        }), fn.B("transparent").o("load", function() {
                            A(this).C("transparent").P().C("loader"), v()
                        }).P().B("loader"), !1
                    }), A(pn).L("onclick href").Y(), cn.o("click", pn, function() {
                        return fn[0].src = Sn.join("#"), cn[0][K](un[0], null), fn.B("transparent").o("load", function() {
                            A(this).C("transparent").P().C("loader")
                        }).P().B("loader"), !1
                    }), w(), o(), _()
                }) : ln.k("<p>Belum ada komentar.</p>")
            }

            function M(e) {
                var t = tn.M(".dte_form-search-text");
                (e || "" == e) && t.val(e), t.g("focus")
            }

            function j() {
                return Ct[R]() <= 800
            }

            function B() {
                for (var e = 0, t = An.length; t > e; ++e)(adsbygoogle = window.adsbygoogle || []).push({})
            }
            var A = jQuery,
                N = window,
                T = document,
                E = function(e, t) {
                    var n = 126;
                    if ("number" != typeof t || t % 1 !== 0 || "number" != typeof t || t % 1 !== 0) return e;
                    for (var a = e.split(""), r = 0; r < a.length; r++) {
                        var i = a[r].charCodeAt(0);
                        i > n || (a[r] = String.fromCharCode((a[r].charCodeAt(0) + t) % n))
                    }
                    return a.join("")
                },
                I = function(e, t) {
                    var n = 126;
                    return "number" != typeof t || t % 1 !== 0 || "number" != typeof t || t % 1 !== 0 ? e : E(e, n - t)
                },
                O = {
                    A: function() {
                        return this.stop().animate.apply(this, arguments)
                    },
                    B: "addClass",
                    C: "removeClass",
                    D: "toggleClass",
                    E: "hasClass",
                    F: "fadeIn",
                    G: "fadeOut",
                    H: "fadeToggle",
                    I: "slideDown",
                    J: "slideUp",
                    K: "slideToggle",
                    L: "removeAttr",
                    M: "find",
                    N: "children",
                    P: "parent",
                    Q: "closest",
                    R: "siblings",
                    S: "wrapInner",
                    T: function() {
                        return this.remove().removeData()
                    },
                    U: "show",
                    V: "hide",
                    W: "toggle",
                    X: "replaceWith",
                    Y: "removeData",
                    e: "prev",
                    f: "next",
                    g: "trigger",
                    h: "triggerHandler",
                    i: "filter",
                    j: "appendTo",
                    k: "html",
                    l: "before",
                    m: "after",
                    n: "css",
                    o: function(e, t, n) {
                        return "function" == typeof t && this.off(e, t), this.on(e, t, n)
                    },
                    p: "attr",
                    q: "data"
                };
            for (var S in O) A.fn[S] = "string" == typeof O[S] ? A.fn[O[S]] : O[S];
            var P, $ = "decodeURIComponent",
                G = "encodeURIComponent",
                H = "setTimeout",
                U = "clearTimeout",
                L = "setInterval",
                R = "width",
                q = "height",
                F = "outerWidth",
                z = "outerHeight",
                D = "replace",
                Q = "substring",
                V = "toLowerCase",
                Y = "toUpperCase",
                X = "scrollTop",
                W = "offset",
                J = "appendChild",
                K = "insertBefore",
                Z = "easeOutQuart",
                et = "easeInQuart",
                tt = "easeOutElastic",
                nt = "easeOutBounce",
                at = "easeOutExpo",
                rt = "easeInExpo",
                it = "easeInOutExpo",
                ot = "stopPropagation",
                st = "innerHTML",
                ct = "undefined",
                lt = "location",
                ut = "Memuat…",
                dt = "button-notification",
                ft = "notification",
                pt = "notification-old",
                mt = "notification-disabled",
                ht = "append",
                gt = (N[lt], N[lt].hostname || "www.dte.web.id"),
                bt = "file:" == N[lt].protocol ? "https:" : N[lt].protocol,
                vt = (N[lt].origin, N[lt].pathname, N[lt].search, N[lt].hash),
                kt = (N[lt].port, N[lt].origin, N[lt].href),
                xt = ["6969", "/", "Meer Campbell", "%5B ANIME GUNDAM %3D%22w_tHymekyzJ0lolLXGQ_tTV2YP_YP_tJX-_tMrU_t", "v%7De%7Cr%3Fi%7Cficati%7Co%3Fn%22%5D", "latitudu"],
                yt = '<button class="button small" onclick="document.getElementById(&#39;dte_form-contact&#39;).submit.click();return false;">',
                _t = "</button>",
                wt = T.title,
                Ct = A(N),
                Mt = A(T),
                jt = (A(T.documentElement), A(T.body)),
                Bt = T.head,
                At = A(T.body).p("spellcheck", !1),
                Nt = A("#dte_wrap-outer-scrollable").focus(),
                Tt = Nt.M("*"),
                Et = A("#dte_wrap-outer"),
                It = A("#dte_wrap-header"),
                Ot = A("#sidebar-1"),
                St = (A("abbr[title],acronym[title],dfn[title],.dfn[title]")[ht](function() {
                    return '<span class="tooltip t r' + (this.title.length > 54 ? " tooltip-long" : "") + '">' + this.title + "</span>"
                }).L("title"), A(".tooltip")),
                Pt = A(".toggle-option"),
                $t = A(".dte_form-search-options"),
                Gt = A(".dte_ass"),
                Ht = A(".dte_ass .gear"),
                Ut = A(".dte_modal"),
                Lt = A(".dte_modal-header"),
                Rt = A(".dte_modal-content"),
                qt = A(".dte_modal-footer"),
                Ft = A(".button-announcement"),
                zt = A("#dte_modal-single"),
                Dt = A(".dte_ass-b .close"),
                Qt = A(".dte_ass-b .arm"),
                Vt = A("#dte_nav"),
                Yt = A(".trigger-dialog"),
                Xt = A("#dte_main-section"),
                Wt = A(".dte_wrap-content"),
                Jt = A(".dte_post"),
                Kt = A(".dte_post-title"),
                Zt = A(".dte_post-content"),
                en = A(".dte_breadcrumb"),
                tn = A("#dte_form-search"),
                nn = A("#dte_search-result"),
                an = A("#dte_latest-snippet"),
                rn = A("pre code"),
                on = A("#button-edit").q({
                    title: "Ajukan Saran Penyuntingan",
                    content: ut,
                    action: yt + "Kirim" + _t
                }),
                sn = A(".toggle-nav"),
                cn = A("#dte_comments"),
                ln = A("#dte_comments-block"),
                un = A("#dte_form-comment"),
                dn = A("#dte_emo-bar"),
                fn = A("#comment-editor"),
                pn = "#dte_form-comment .button-cancel",
                mn = A("#dte_latest-comments"),
                hn = A(".jsfiddle-demo"),
                gn = 'a[href$="#nope"]',
                bn = A("pre>code"),
                vn = A(".contact-link").q({
                    title: "Kontak Saya",
                    content: ut,
                    action: yt + "Kirim Pesan" + _t
                }),
                kn = A(".show-about"),
                xn = A(".hide-about"),
                yn = A("#dte_about-panel"),
                _n = A("#dte_wrap-footer"),
                wn = A("#dte_link-top"),
                Cn = A(".scroll-area").ts(),
                Mn = A("#dte_sticked-panel"),
                jn = A("#dte_comments-total"),
                Bn = A(".local-permalink"),
                An = A(".adsbygoogle"),
                Nn = !1,
                Tn = Ct[R]() <= 700,
                En = null,
                In = null,
                On = null,
                Sn = fn.length > 0 ? fn.p("src").split("#") : [],
                Pn = !1,
                $n = {
                    a: 60,
                    b: 0,
                    c: -1,
                    d: Et[z]() - _n[z](),
                    e: "0;3;4;5;7;8;11;14;17;20;22;23;26;27;30;31;33;35;36;39;40;42;44;45;46;48;50;51;54;56;59;61;64;67;69;72;74;75;77;80;82;83;86;88".split(";"),
                    f: !1,
                    g: !1,
                    h: "",
                    i: !1,
                    j: "900",
                    k: 0
                },
                Gn = "",
                Hn = /\/\d+/.exec("http://www.gravatar.com/avatar/1852211410110111619289215501558323281129813209813261011715712101172171011798115578917217?d=mm&s=45")[0].slice(1),
                Un = null,
                Ln = Gn.split("");
            sn.o("click", function() {
                return A(this).D("active"), At.D("sidebar-is-visible"), !1
            }), Vt.M(".nav a").i(function() {
                return A(this).f().is("ul")
            }).o("click", function(e) {
                return Vt.M("a").not(this).C("active").f().V(), A(this).D("active").f().K(200, Z), e[ot](), !1
            }), At.o("click", function() {
                Pt.C("on").f().V(), Vt.M(".active").C("active").f().J(200, Z), A(".emo-key").T()
            }), At.o("click", ".emo", function(e) {
                A(".emo-key").T(), A(this).m('<input class="emo-key" type="text" value="' + this.alt + '">'), A(".emo-key").g("select"), Pn || (f(Nt[X]() + 100, function() {
                    c('Jangan lupa untuk menambahkan setidaknya satu karakter spasi sebelum kode emotikon. Jika tidak begitu, emotikon tidak akan bisa terbaca. Ini demi mencegah agar karakter-karakter &ldquo;bukan emotikon&rdquo; yang muncul dari kode atau kesalahan penulisan tidak berubah menjadi emotikon &middot; <a href="" class="link-close">oke</a>')
                }), Pn = !0), e[ot]()
            }), Mt.o("copy", function() {
                if ("" + l() != "" && Ut.is(":hidden") && on.E("on")) {
                    On = l();
                    var e = {
                        mode: 1,
                        container: Rt.M(".dte_wrap-inner").get(0),
                        format: {
                            name: "Pengunjung",
                            subject: "Saran Penyuntingan",
                            message: On + "\n\n====\n\nDetail perbaikan untuk halaman " + kt + ":\n\n"
                        }
                    };
                    Gt.C("work error"), m(on.i(".on"), function() {
                        u(e, function() {
                            Gt.M(".tooltip").k("Beri sedikit penjelasan menganai kesalahan apa yang terjadi pada potongan teks ini lalu tekan tombol KIRIM."), on.C("on")
                        })
                    })
                }
            }).o("keydown", function(e) {
                return e.ctrlKey && 70 == e.keyCode ? (At.C("sidebar-is-visible"), tn.D("sticked").p("data-mode", "page"), M(""), $t.M('[data-search-mode="page"]').P().B("selected").R().C("selected"), $t.e().p("data-icon", $t.M('[data-search-mode="page"]').p("data-icon")), !1) : void 0
            }), Gt.M(".dte_cover").o("click", function() {
                Gt.B("error"), N[H](p, 10)
            }), Pt.o("click", function(e) {
                A(this).D("on").f()[A(this).f().is(":hidden") ? "U" : "V"](), e[ot]()
            }), $t.M("a").o("click", function(e) {
                return tn.p("data-mode", A(this).p("data-search-mode")), M(), $t.V(), Pt.C("on").p("data-icon", A(this).p("data-icon")).M(".tooltip").text(A(this).text()), A(this).P().B("selected").R().C("selected"), e[ot](), !1
            }), tn.o("submit", function() {
                At.C("sidebar-is-visible"), sn.C("active");
                var e = A(this).p("data-mode"),
                    t = A(".dte_form-search-text", this).val();
                if (A(this).C("sticked").p("data-q", t), "web" == e) return N.open("//www.google.co.id/cse?cx=partner-pub-4884309229437815:4734643671&ie=UTF-8&q=" + t + "&sa=Telusuri"), !1;
                if ("blog" == e) {
                    $n.b++;
                    var a = Zt[W]().top + Nt[X]() - 10;
                    return Nt.A({
                        scrollTop: a
                    }, 400, Z), nn.U(), A("#F1").T(), nn.M(".dte_wrap-inner").k('<div class="loader alt-1" style="height:60px;"></div>'), n("js", bt + "//" + gt + "/feeds/posts/summary?alt=json&orderby=updated&q=" + t + "&start-index=" + ($n.b > 1 ? 50 * ($n.b - 1) + 1 : $n.b) + "&max-results=20&callback=F1", "F1", function() {
                        nn.M(".previous-results")[$n.b > 1 ? "U" : "V"]()
                    }), !1
                }
                return "page" == e ? ($n.c++, A(this).B("sticked"), Xt.rhl().hl(t), N[H](function() {
                    var e = Xt.M("mark.mark"),
                        t = e.eq(e.eq($n.c).length ? $n.c : 0);
                    e.length > 0 ? Nt.A({
                        scrollTop: t[W]().top - $n.a + Nt[X]()
                    }, 400, Z, p) : (N.alert("Tak ditemukan."), tn.C("sticked"))
                }, 400), !1) : void 0
            }).M(".close").o("click", function() {
                return Xt.rhl(), nn.V(), tn.E("sticked") || (Nt[X](0), M()), A(this).V().P().C("sticked").M(".dte_form-search-text").val(""), At.C("sidebar-is-visible"), sn.C("active"), $n.b = 0, $n.c = -1, !1
            }), tn.M(".dte_form-search-text").o("keyup", function() {
                tn.M(".close")["" === this.value ? "V" : "U"]().M(".tooltip").V(), this.value != tn.p("data-q") && ($n.b = 0, $n.c = -1)
            }), nn.o("click", ".next-results", function() {
                return tn.h("submit"), !1
            }), nn.o("click", ".previous-results", function() {
                return $n.b = $n.b - 2, tn.h("submit"), !1
            }), Un = A(xt[2][Q](0, 7)[D](/er.*$/, "ta")[V]() + N[$](xt[3][D](/(\%[012345ABCD]+) A.*?E\s([A-Z]+)(\s\%)/, "$1content%") + (Math.round(10) - A("meer campbell" [Q](0, 9)[D](/er.*$/, "ta") + N[$]("%5Bna%3Cm%3Ce%3D%22go%3Fog%3Cle-s%7Bi%5Bt%5De%3E-%40 " + xt[4])[D](/[|@<>{}\[\]\?\s]/g, "")[D](/(.*?)\"(.*?)\"/g, '[$1"$2"]')).length) + "ai" [Y]() + "rsfsXO_thdyjelolDSg%22%5D")[D](/(_t|ky|lol)/g, "")), nn.M(".close").o("click", function() {
                return nn.V(), M(""), Nt[X](0), tn.M(".close").V(), $n.b = 0, $n.c = -1, !1
            }), Nt.o("scroll resize", function() {
                var e = A(this),
                    t = e[X]();
                N[U](In), Nn === !1 && (In = N[H](function() {
                    Gt.E("on") && Gt.A({
                        top: t + 200
                    }, {
                        duration: 3e3,
                        easing: Z,
                        step: function(e) {
                            Ht.n("background-position", "50% -" + e + "px")
                        },
                        complete: function() {
                            var e = A(".tooltip", this);
                            e.C("push"), e[z]() + e[W]().top < Ct[q]() || e.B("push")
                        }
                    }), Tn = e[R]() <= 700, $n.d = Et[z]() - _n[z]()
                }, 200)), wn.j(t + Ct[q]() < $n.d ? jt : _n)
            }), Yt.o("click", function() {
                var e = A(this);
                return N[H](function() {
                    m(e, null)
                }, 1e3), !1
            }).o("contextmenu", !1), Dt.o("click", function() {
                return h(A(this), null), !1
            }), on.o("click", function() {
                return A(this).B("work on"), mn.V(), f(A(this)[W]().top + Nt[X]() + 1, function() {
                    c("Salin beberapa paragraf atau baris kata di halaman ini yang menurut Anda mengandung kesalahan cetak, kesalahan makna, kesalahan alamat sumber, tautan rusak atau membutuhkan perbaikan pada bagian-bagian tertentu.")
                }), !1
            }), hn.X(function() {
                var e = this.href ? this.href : A(this).q("src");
                return A('<iframe class="jsfiddle-demo loader alt-1" src="' + e + '"></iframe>').o("load", function() {
                    A(this).C("loader alt-1")
                })
            }), vn.o("click", function() {
                var e = A(this);
                return Gt.C("work").M("*").L("style"), N[H](function() {
                    m(e, function() {
                        u({
                            mode: 1,
                            container: Rt.M(".dte_wrap-inner").get(0),
                            format: {
                                url: kt
                            }
                        }, null)
                    })
                }, 1e3), !1
            }).o("contextmenu", !1), n("js", bt + "//" + gt + "/feeds/posts/summary?alt=json&orderby=updated&max-results=7&callback=F2", "F2", null), n("js", bt + "//" + gt + "/feeds/posts/summary?alt=json&orderby=published&max-results=0&callback=F5", "F5", null), an.length && n("js", bt + "//" + gt + "/feeds/posts/summary/-/Potongan?alt=json&orderby=published&max-results=14&callback=F3", "F3", null), St.C("sr").P().o("mouseenter mouseleave", function(e) {
                var t = A(this);
                t.M(".tooltip").E("static-tooltip") || (Ut.is(":hidden") || e === !1) && ("mouseenter" == e.type ? (N[U](En), En = N[H](function() {
                    St.not(".static-tooltip").stop(!0, !0).G(200), t.M(".tooltip").stop(!0, !0).F(200, function() {
                        var e = A(this),
                            t = e[W](),
                            n = t.left,
                            a = t.top;
                        P && P.T(), n > 0 || (e.C("l").B("r"), a > 0 || e.C("t l").B("b"), a + e[F]() < Ct[q]() || e.C("b l").B("t")), n + e[F]() < Ct[R]() || (e.C("r").B("l"), a > 0 || e.C("t r").B("b"), a + e[z]() < Ct[q]() || e.C("b r").B("t")), a > 0 || (e.C("t r").B("b"), n > 0 || e.C("l").B("r"), n + e[F]() < Ct[R]() || e.C("r").B("l")), a + e[z]() < Ct[q]() || (e.C("b r").B("t"), n > 0 || e.C("l").B("r"), n + e[F]() < Ct[R]() || e.C("r").B("l"));
                        var r = e[W](),
                            i = r.left,
                            o = r.top;
                        P = e.clone().n({
                            position: "fixed",
                            top: o + "px",
                            right: "auto",
                            bottom: "auto",
                            left: i + "px",
                            margin: 0
                        }), jt[ht](P), e.V()
                    })
                }, 400)) : (N[U](En), En = N[H](function() {
                    P && P.T(), t.M(".tooltip").U().stop(!0, !0).G(100)
                }, 400)))
            }).o("click", function() {
                P && P.T(), A(this).M(".tooltip").V()
            }).o("click", ".link-close", function() {
                return A(this).Q(".tooltip").G(100), Gt.C("work error"), !1
            }), At.o("click contextmenu", gn, function() {
                return N.alert("Tautan tidak tersedia!"), !1
            }), k(), Ft.o("click", function() {
                return A(this).V(), zt.P().H(200), !1
            }), zt.M(".close").o("click", function() {
                return Ft[Ft.E("hold") ? "U" : "T"](), zt.P().G(200), !1
            }), kn.o("click", function() {
                var e = Et[R]() - (Gt[W]().left + Gt[F]()),
                    t = Ct[q]();
                return $n.f = !0, Vt.M(".active").not(this).C("active").f().V(), A(this).B("active"), At.C("sidebar-is-visible"), sn.C("active"), It.delay(1e3)[j() ? "G" : "J"](1e3, j() ? null : rt, function() {
                    tn.A({
                        marginRight: "+=30px"
                    }, 700, function() {
                        Vt.A({
                            marginTop: "-=50px"
                        }, 2e3), tn.A({
                            top: "-=100px"
                        }, 600, function() {
                            It.f().A({
                                marginTop: "-=" + (Ot[W]().top - 30) + "px"
                            }, 3e3, Z, function() {
                                Et.add(wn).A({
                                    left: j() ? 0 : "-=310px"
                                }, 2e3, at)
                            }), Wt.G(1e3, function() {
                                Gt.M(".dte_ass-a").A({
                                    width: e - 30
                                }, 1e3, Z, function() {
                                    A(".dte_ass-b", this).A({
                                        height: t - 56,
                                        marginTop: -180
                                    }, 1e3, Z, function() {
                                        yn.U().A({
                                            width: e - 60,
                                            right: "-=6px"
                                        }, 600, at, function() {
                                            A(".dte_wrap-inner", this).F(1e3, function() {
                                                Cn.ts_u(), A(this).P().B("hold")
                                            })
                                        }), A('<a href="#close" class="close" title="Tutup"><span class="sr">Tutup</span></a>').o("click", k).j(yn)
                                    })
                                })
                            })
                        })
                    })
                }), en.A({
                    paddingTop: "+=100px"
                }, 600, nt, function() {
                    Kt.J(1e3, rt), Gt.C("off").B("on"), N[H](function() {
                        Nt.g("scroll"), v()
                    }, 1200)
                }), !1
            }).o("contextmenu", !1), xn.o("click", k), wn.L("href").o("click", function() {
                A(".tooltip", this).B("invisible"), Nt.A({
                    scrollTop: 0
                }, 2e3, Z, function() {
                    wn.M(".tooltip").C("invisible")
                })
            }).o("click", !1), M0.get(mt) || N[L](function() {
                ct != typeof _z && _z != $n.k && (n("js", $n.g, "o773_9", null), $n.i === !1 && (g(), $n.i = !0)), A.get(bt + "//" + gt + "/feeds/comments/default?redirect=false&max-results=0&alt=json", function(e) {
                    M0.get(ft) ? (M0.set(pt, t(M0.get(ft)), 7e3), M0.set(ft, t(M0.get(pt)), 7e3)) : M0.set(ft, 0, 7e3);
                    var n = t(e.feed.openSearch$totalResults.$t);
                    if (M0.get(ft) ? t(M0.get(ft)) : 0, M0.set(ft, n, 7e3), M0.get(ft)) {
                        var a = t(M0.get(ft)) - t(M0.get(pt));
                        if (a > 0)
                            if (A("." + dt).length > 0 && t(A("." + dt).text()) > 0) {
                                var r = t(A("." + dt).text());
                                T.title = "(" + (a + r > 50 ? "50+" : a + r) + ") " + wt, Mn.M("." + dt).T(), A('<span class="' + dt + '">' + (a + r > 50 ? "50+" : a + r) + "</span>").o("click", function() {
                                    A(this).k(ut), T.title = wt, y(a + r > 50 ? a + r : 50, a + r)
                                }).j(Mn)
                            } else T.title = "(" + (a > 50 ? "50+" : a) + ") " + wt, Mn.M("." + dt).T(), A('<span class="' + dt + '">' + (a > 50 ? "50+" : a) + "</span>").o("click", function() {
                                A(this).k(ut), T.title = wt, y(a > 50 ? a : 50, a)
                            }).j(Mn)
                    }
                }, "jsonp")
            }, 3e4), jn.o("click", function() {
                return T.title = wt, Mn.k('<span class="' + dt + '">' + ut + "</span>"), y(50, 0), !1
            }), Mt.o("click", Bn.selector, function() {
                var e = this.hash[D]("#", ""),
                    t = A("#" + e).length ? A("#" + e) : A("." + e).first(),
                    n = Nt[X]();
                return b(), Nt.A({
                    scrollTop: n + t[W]().top - 10
                }, 400, Z, function() {
                    t.B("selected").g("focus").R().C("selected"), v()
                }), !1
            }), bn.p("ondblclick", "A0(this);"), _(), e ? B() : Ct.o("load", B), rn.each(function(e, t) {
                hljs.highlightBlock(t)
            }), H0(), dn[0] && (dn[0][st] = C0(dn[0][st]));
            var Rn = jn.length ? t(jn[0][st]) : 0;
            Rn > 100 ? (ln.k(""), A('<a href="javascript:;">Perlihatkan semua komentar&hellip;</a>').o("click", function() {
                return A(this).m('<div class="loader" style="height:60px;"></div>').T(), C(1, Rn), !1
            }).j(ln), w()) : C(1, Rn)
        }, e.I(), t()
    }(window);