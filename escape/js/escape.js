! function(t, e) {
    var n = "getElementsByTagName",
        a = "replace",
        i = e[n]("button"),
        o = e[n]("input"),
        s = e[n]("textarea");
    i[0].onclick = function() {
        if (0 === s[0].value.length) return alert("Don't daydream, let alone sleep!"), !1;
        1 === s[0].value.length && alert("Only one character?");
        var t = s[0].value;
        return t = o[0].checked ? t[a](/&/g, "&amp;") : t, t = o[1].checked ? t[a](/</g, "&lt;") : t, t = o[2].checked ? t[a](/>/g, "&gt;") : t, t = o[3].checked ? t[a](/"/g, "&quot;") : t, t = o[4].checked ? t[a](/'/g, "&apos;") : t, t = o[5].checked ? t[a](/(")/g, "'") : t, t = o[6].checked ? t[a](/(")/g, "&#8221;") : t, t = o[7].checked ? t[a](/(')/g, "&#8217;") : t, t = o[8].checked ? t[a](/&amp;/g, "&") : t, t = o[9].checked ? t[a](/&lt;/g, "<") : t, t = o[10].checked ? t[a](/&gt;/g, ">") : t, t = o[11].checked ? t[a](/&quot;/g, '"') : t, t = o[12].checked ? t[a](/&apos;/g, "'") : t, t = o[13].checked ? t[a](/(')/g, '"') : t, t = o[14].checked ? t[a](/(&#8221;)/g, '"') : t, t = o[15].checked ? t[a](/(&#8217;)/g, "'") : t, s[0].value = t, s[0].focus(), s[0].select(), this.disabled = !0, !1
    }, i[1].onclick = function() {
        if (confirm("Have you copied? Do you want to reset it?")) {
            return s[0].value = "", s[0].focus(), i[0].disabled = !1, !1
        } else {
            return s[0].value, s[0].focus(), s[0].select(), i[0].disabled = !1, !1
        }
    }, s[0].onpaste = function() {
        i[0].disabled = !1
    }, s[0].onkeydown = function() {
        i[0].disabled = !1
    }
}(window, document);