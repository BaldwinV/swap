!function() {
    let l = UI.func;
    var e = "ontouchstart"in window || window.DocumentTouch && document instanceof DocumentTouch ? "touchstart" : "mousedown";
    let c = {
        from: {
            amount: void 0,
            label: void 0,
            name: void 0,
            logo_t: void 0,
            logo_a: void 0,
            rate: void 0,
            info: void 0,
            maxmin: void 0,
            error: void 0,
            reverse: void 0,
            selector: void 0
        },
        to: {
            amount: void 0,
            label: void 0,
            name: void 0,
            logo_t: void 0,
            logo_a: void 0,
            rate: void 0,
            info: void 0,
            maxmin: void 0,
            error: void 0,
            reverse: void 0,
            selector: void 0
        },
        address: {
            field: void 0,
            label: void 0,
            hidden: void 0,
            error: void 0,
            func: {
                favorite: void 0,
                paste: void 0,
                scanqr: void 0,
                clean: void 0
            },
            addressbook: void 0,
            addressbook_scroll: void 0
        },
        tag: {
            wrapper: void 0,
            field: void 0,
            label: void 0,
            error: void 0,
            func: {
                paste: void 0,
                clean: void 0
            }
        },
        type: {
            radioui: void 0,
            fixed: void 0,
            float: void 0
        },
        container: void 0,
        btn_exchange: void 0,
        btn_reverse: void 0,
        rate_usd_from: void 0,
        btn_exchange_ui: void 0,
        agreeterms: void 0
    }
      , s = {
        search_ph: "Type a currency",
        search_found: "Found currencies",
        selector_option: '<span class="coin-img svgcoin {1}"></span>',
        selector_label: '<span class="coin-img svgcoin {value}"></span><span class="coin-name">{coin}<sup>{sub}</sup></span>',
        address_ph: "Your {1} address",
        invoice_ph: "Your {1} address",
        favaddress_ph: "Find your {1} address in the list",
        address_error: "Enter your {1} address",
        invoice_error: "Enter your {1} invoice",
        address_invalid: "Invalid address",
        route_invalid: "Invalid route, unable to find a path to destination",
        limit_min: "Minimum amount {1}",
        limit_max: "You exceeded the limit of {1}",
        minmax: '<button type="button" class="maxmin-value" data-value="{min}"><span class="prefix">min:</span><span>{min} {coin}</span></button><button type="button" class="maxmin-value" data-value="{max}"><span class="prefix">max:</span><span>{max} {coin}</span></button>',
        maintenance: "Network temporarily suspended for maintenance",
        ccy_offline: "The network is offline",
        ccy_reserve: "The currency is awaiting the addition of reserves",
        qrcode_error: "Camera not found",
        addressbook_row: '<span>{address}</span><button type="button" class="ico star {#favorite}favorite{\\favorite}"></button>',
        addressbook_fav: "Favorite addresses",
        addressbook_last: "Last used addresses",
        recoverytime: "Estimated network recovery time",
        recoverytime_hour: "Estimated recovery time within an hour",
        recoverytime_hours: "Estimated recovery time is within {1} hours",
        recoverytime_day: "Estimated recovery time during the day",
        recoverytime_days: "Estimated recovery time is within {1} days",
        webln_popup_gen: "It is possible to generate an invoice using your Lightning Wallet. Want to create a new invoice to receive funds for your Lightning Wallet?",
        webln_popup_failed: "Failed to generate invoice",
        webln_popup_switch: "Your wallet cannot generate invoice without specifying the amount. Switch to fixed order type?",
        webln_popup_gen_ok: "Generate",
        webln_popup_cancel: "No thanks",
        webln_popup_switch_ok: "Switch",
        clipboard_permission: "You need to give the browser permission to use your clipboard",
        popup_warning_fee: "",
        popup_forbidden_usa: '<div class="popup-content fix-width2"><h3 style="margin-bottom: 1.3em;">Important Notice</h3><p style="text-align: center;margin-bottom: 0.2em;">U.S. persons cannot make an exchange on FixedFloat</p><div class="popup-ctrl"><span class="btn submit popup-close-btn bghl">I understand</span></div></div>',
        alert_forbidden_usa: "U.S. persons cannot make an exchange on FixedFloat",
        internal_error: "Error! Try reloading the page"
    }
      , d = {
        setAmount: -1,
        keyupAmount: -1,
        keyupWallet: -1,
        errorInterval: -1,
        overflowAnimation: -1,
        closeAnimation: -1,
        changeColors: -1,
        stop: function(e) {
            clearTimeout(d[e]),
            d[e] = -1
        }
    }
      , u = {
        validateSubmit: function() {
            for (var e in p.error)
                p.error[e]
        },
        toggleLocked: function() {
            "float" == p.type ? (p.direction = "from",
            c.to.amount.setAttribute("readonly", "readonly")) : p.lockType || c.to.amount.removeAttribute("readonly"),
            l.togClass(c.from.amount.parentNode, "locked", "from" == p.direction),
            l.togClass(c.to.amount.parentNode, "locked", "to" == p.direction)
        },
        toggleExtra: function() {
            var e = c.to.selector.val()
              , e = (c.to.selector.options[e].network,
            c.to.selector.options[e].tag);
            l.togClass(c.tag.wrapper, "active", !!e),
            l.togClass(c.address.field, "with-extra", !!e),
            e ? (c.tag.label && (c.tag.label.innerHTML = e + " (optional)"),
            c.tag.field && c.tag.field.setAttribute("placeholder", e),
            clearTimeout(d.overflowAnimation),
            d.overflowAnimation = setTimeout(function() {
                l.addClass(c.tag.wrapper, "ovisible"),
                d.overflowAnimation = -1
            }, 300)) : l.remClass(c.tag.wrapper, "ovisible")
        },
        positionUsdRate: function() {
            var e = c.from.selector.val()
              , o = c.to.selector.val();
            "BTC" == e && "BTCLN" != o || "BTCLN" == e ? c.container.setAttribute("data-pos-usd", "bottom") : c.container.setAttribute("data-pos-usd", "top")
        },
        resizeTextarea: function() {
            if (c.address.field && "TEXTAREA" == c.address.field.tagName.toUpperCase()) {
                let e = c.address.field;
                e.style.height = "0";
                let o = getComputedStyle(e, null);
                var t = parseFloat(o.getPropertyValue("padding-top"))
                  , r = parseFloat(o.getPropertyValue("padding-bottom"))
                  , a = parseFloat(o.getPropertyValue("border-top-width"))
                  , n = parseFloat(o.getPropertyValue("border-bottom-width"))
                  , i = (parseFloat(o.getPropertyValue("font-size")),
                parseFloat(o.getPropertyValue("line-height")))
                  , s = e.scrollHeight
                  , d = l.hasClass(e, "multi");
                if (Math.ceil(i + t + r) >= s) {
                    if (d)
                        return l.remClass(e, "multi"),
                        void this.resizeTextarea()
                } else if (!d)
                    return l.addClass(e, "multi"),
                    void this.resizeTextarea();
                c.address.field.style.height = s + n + a + 1 + "px"
            }
        }
    }
      , a = {
        allow: !0,
        makeInvoice: async function(e) {
            let o = await WebLN.requestProvider();
            return o.makeInvoice(e)
        },
        getInvoice: function() {
            let o = {
                defaultMemo: "From FixedFloat"
            };
            "fixed" == p.type && (o.amount = ~~(1e8 * +p.to.amount)),
            d.keyupWallet = 1,
            c.address.field.blur(),
            a.makeInvoice(o).then(function(e) {
                e = e.paymentRequest;
                a.allow = !0,
                e || o.amount ? (d.keyupWallet = 1,
                p.pasteAddress(e),
                d.keyupWallet = -1) : a.confirmSwitchFixed()
            }).catch(function(e) {
                a.allow = !0,
                d.keyupWallet = -1,
                "Zero-amount invoice is not supported." == e ? a.confirmSwitchFixed() : (UI.alert(s.webln_popup_failed),
                console.log(e))
            })
        },
        confirmGenerate: function(e) {
            UI.popup({
                html: '<div class="popup-content popup-confirm fix-width"><p>' + s.webln_popup_gen + '</p><div class="popup-ctrl"><button type="button" class="btn cancel">' + s.webln_popup_cancel + '</button><button type="button" class="btn submit popup-close-btn">' + s.webln_popup_gen_ok + "</button></div></div>",
                afterRender: function() {
                    var e = this;
                    l.on(e.container, "click", ".cancel", function() {
                        a.allow = !1,
                        setTimeout(function() {
                            a.allow = !0
                        }, 5e3),
                        c.address.field && c.address.field.focus(),
                        e.close()
                    }),
                    l.on(e.container, "click", ".submit", function() {
                        a.allow = !1,
                        a.getInvoice()
                    })
                }
            }).show()
        },
        confirmSwitchFixed: function() {
            var e = {
                ok: s.webln_popup_switch_ok,
                cancel: s.webln_popup_cancel
            };
            UI.confirm(s.webln_popup_switch, function() {
                p.type = "fixed",
                c.type.radioui && c.type.radioui.val("fixed"),
                u.toggleLocked(),
                p.getRatePaste()
            }, e)
        }
    };
    var n = function(e, o) {
        var t = o.which || o.keyCode;
        o.ctrlKey || o.altKey || o.metaKey || (48 != t && 96 != t || "0" != e.value || (e.value = "0."),
        58 <= t && t <= 90 || 106 <= t && t <= 111 || 146 <= t ? (o.preventDefault(),
        188 != t && 190 != t && 191 != t && 110 != t || -1 != e.value.search(/\./i) || (o = l.carPos(e),
        e.value = e.value.substr(0, o) + "." + e.value.substr(o++),
        l.setCarPos(e, o, o))) : 13 == t && e.blur())
    }
      , i = function(o, t) {
        p.direction = p.lockSend || p.lockReceive ? p.direction : t,
        l.remClass(o.parentNode, "error"),
        clearTimeout(d.keyupAmount),
        u.toggleLocked(),
        o.value && (d.keyupAmount = setTimeout(function() {
            p[t].amount = o.value;
            var e = "to" == t ? "to" : p.direction;
            p.getRate(o.value, e)
        }, 300))
    }
      , m = function(e, o) {
        var t;
        clearTimeout(d.keyupAmount),
        -1 != d.setAmount || p.lockAmount || (e.value ? (t = "to" == o ? "to" : p.direction,
        p.getRate(e.value, t)) : (e.value = "0.0000",
        c[o].error.innerHTML = "The amount can not be zero"))
    };
    let p = {
        isInit: !1,
        from: {
            ccy: "",
            amount: 0,
            req: void 0
        },
        to: {
            ccy: "",
            amount: 0,
            req: void 0
        },
        usd: {
            from: 0,
            to: 0
        },
        type: "float",
        direction: "from",
        lockType: !1,
        lockAmount: !1,
        lockSend: !1,
        lockReceive: !1,
        lockAddress: !1,
        errorIgnore: !1,
        floatLNInvoice: !0,
        address: {
            value: "",
            extra: "",
            fixedAmount: !1,
            findfavorite: !1
        },
        error: {
            from: !1,
            to: !1,
            address: !0,
            extra: !1
        },
        wisthExtra: ["BNB", "XRP", "XLM"],
        checkAddressInProgress: !1,
        priceAbortController: void 0,
        priceAbortLoading: void 0,
        priceApiPromise: void 0,
        select: function(e, o) {
            var t = o.value;
            c[e].amount.parentNode.parentNode.setAttribute("data-value", t),
            c[e].name.innerHTML = o.label,
            c[e].label.innerHTML = l.fmt(s.selector_label, o),
            c[e].label.setAttribute("data-count", t.length),
            c[e].reverse.setAttribute("data-value", t),
            c[e].logo_t.setAttribute("data-value", t),
            c[e].logo_a.setAttribute("data-value", t),
            1 == +o.inactive ? (l.addClass(c[e].amount.parentNode, "error"),
            l.addClass(c[e].amount.parentNode, "offline")) : (l.remClass(c[e].amount.parentNode, "error"),
            l.remClass(c[e].amount.parentNode, "offline")),
            p[e].ccy = t,
            clearTimeout(d.changeColors),
            d.changeColors = setTimeout(function() {
                APP.highlightingColor(p.from.ccy, p.to.ccy),
                document.dispatchEvent(new CustomEvent("highlightingColor",{
                    detail: {
                        from: p.from.ccy,
                        to: p.to.ccy
                    }
                }))
            }, 50)
        },
        unlockAmounts: function() {
            p.lockType || (p.address.fixedAmount = !1,
            c.type.float.disabled = !1,
            p.lockAmount && p.lockSend || (c.from.amount.disabled = !1),
            "float" != p.type && (c.to.amount.disabled = !1))
        },
        checkType: function(e) {
            e ? (c.to.amount.value = e,
            p.type = "fixed",
            c.type.radioui && c.type.radioui.val("fixed"),
            p.direction = "to",
            u.toggleLocked(),
            c.type.float && (c.type.float.disabled = !0),
            c.to.amount.disabled = !0,
            c.from.amount.disabled = !0,
            p.address.fixedAmount = !0,
            p.getRatePaste()) : p.unlockAmounts()
        },
        pasteAddress: function(e, o) {
            c.address.field ? (c.address.field.value = e,
            o ? (c.address.field.focus(),
            u.resizeTextarea(e),
            c.address.field.blur()) : (l.remClass(c.address.field, "error"),
            p.validateAddress(),
            u.resizeTextarea(e))) : p.address.value = e
        },
        getAddressBook: function(e) {
            APP.api("userAddressBook", e).then(function(e) {
                l.remClass(c.address.addressbook, "loading"),
                p.pasteAddressBook(e.data)
            }).catch(function(e) {
                l.remClass(c.address.addressbook, "loading")
            })
        },
        pasteAddressBook: function(o) {
            function e(e) {
                let o = document.createElement("div");
                return l.addClass(o, "row-address"),
                o.setAttribute("data-addr", e.address),
                o.setAttribute("data-tag", e.tag),
                o.setAttribute("data-coin", e.coin),
                o.setAttribute("data-network", e.network),
                o.innerHTML = l.fmt(s.addressbook_row, e),
                o
            }
            function t(e) {
                let o = document.createElement("div");
                return l.addClass(o, "row-separate"),
                o.innerHTML = "<span>" + e + "</span>",
                o
            }
            for (let e = o.fav.length - 1; 0 <= e; e--)
                for (var r in o.last) {
                    if (void 0 === o.fav[e])
                        break;
                    o.fav[e].address == o.last[r].address && o.fav[e].tag == o.last[r].tag && o.fav.splice(e, 1)
                }
            for (var a in c.address.addressbook.innerHTML = "",
            o.last.length && c.address.addressbook.appendChild(t(s.addressbook_last)),
            o.last)
                c.address.addressbook.appendChild(e(o.last[a]));
            for (var n in o.fav.length && c.address.addressbook.appendChild(t(s.addressbook_fav)),
            o.fav)
                c.address.addressbook.appendChild(e(o.fav[n]));
            c.address.addressbook_scroll.update()
        },
        closeAddressBook: function(e, o) {
            p.address.findfavorite = !1,
            c.address.addressbook.innerHTML = "",
            l.remClass(c.address.field.parentNode.parentNode, "show-address-book"),
            clearTimeout(d.closeAnimation),
            d.closeAnimation = setTimeout(function() {
                l.remClass(c.tag.wrapper, "noanim")
            }, 300),
            c.address.field.setAttribute("placeholder", l.fmt(s.address_ph, c.to.selector.selectedAttr("label"))),
            o && (c.tag.field.value = o),
            e ? p.pasteAddress(e) : p.pasteAddress("", !1)
        },
        checkAddress: function() {
            var e;
            p.address.value && (e = {
                currency: c.to.selector.val(),
                address: p.address.value,
                tag: p.address.extra,
                platform: window.navigator.platform,
                tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
                ts: ~~(Date.now() / 1e3),
                tt: Date()
            },
            APP.api("exchCheckAddress", e).then(function(e) {
                c.address.error && (c.address.error.innerHTML = ""),
                c.address.field && l.remClass(c.address.field, "error"),
                c.tag.field && l.remClass(c.tag.field, "error"),
                p.checkType(e.data.amount),
                p.error.address = !1,
                p.checkAddressInProgress = !1,
                u.validateSubmit()
            }).catch(function(e) {
                switch (p.checkAddressInProgress = !1,
                e.code) {
                case 302:
                case 303:
                    c.tag.field && l.addClass(c.tag.field, "error"),
                    c.tag.field && (c.tag.error.innerHTML = e.msg);
                    break;
                case 301:
                case 304:
                case 305:
                default:
                    c.address.field ? l.addClass(c.address.field, "error") : UI.alert(e.msg),
                    c.address.error && (c.address.error.innerHTML = e.msg)
                }
                u.validateSubmit()
            }))
        },
        validateAddress: function() {
            !c.address.field || p.address.value == c.address.field.value && p.address.extra == c.tag.field.value || (c.address.field && (p.address.value = c.address.field.value),
            c.tag.field && (p.address.extra = c.tag.field.value),
            p.address.value ? -1 == d.keyupWallet && p.checkAddress() : (p.error.address = !0,
            p.unlockAmounts(),
            u.validateSubmit()))
        },
        validateExtra: function() {
            c.tag.field && (p.address.extra = c.tag.field.value);
            let e = p.address.extra;
            if (e)
                switch (p.to.ccy) {
                case "XRP":
                    (9 < e.toString().length || isNaN(e)) && (p.error.extra = !0);
                    break;
                case "BNB":
                    100 < e.toString().length && (p.error.extra = !0);
                    break;
                default:
                    p.error.extra = !1
                }
            else
                p.error.extra = !1;
            c.tag.field ? l.togClass(c.tag.field, "error", p.error.extra) : p.error.extra && UI.alert(s.address_invalid),
            u.validateSubmit()
        },
        avaliblesCurrencies: function(e) {
            let o = {};
            for (var t in e)
                o[e[t].code] = e[t];
            for (var r in c.from.selector.options)
                c.from.selector.attr(r, "inactive", +!o[r].recv);
            for (var a in c.to.selector.options)
                c.to.selector.attr(a, "inactive", +!o[a].send)
        },
        getRateQuery: function(e, o, t, n, i) {
            clearInterval(d.errorInterval);
            let r = {
                type: p.type,
                fromCcy: e.toUpperCase(),
                toCcy: o.toUpperCase(),
                platform: window.navigator.platform,
                tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
                ts: ~~(Date.now() / 1e3),
                tt: Date()
            };
            "string" == typeof t && (qtymatch = t.match(/[\d\.]+/g),
            t = qtymatch && qtymatch.length ? qtymatch[0] : 0),
            "to" == n ? r.toAmount = t : r.fromAmount = t,
            !0 === i ? r.usd = p.usd.from : +i && (r.usd = +i),
            p.priceApiPromise && p.priceApiPromise.isPending() && p.priceAbortController && p.priceAbortController instanceof AbortController && (p.priceAbortController.abort(),
            p.priceAbortLoading = !0),
            p.priceAbortController = new AbortController,
            p.priceApiPromise = APP.api("exchPrice", r, function(e) {
                return
                p.priceAbortLoading = !1;
                let o = e.data;
                var t, r, a = "fixed" == p.type ? "=" : "≈", e = "fixed" == p.type ? "" : "≈";
                if (l.remClass(c.to.amount.parentNode, "error"),
                l.remClass(c.from.amount.parentNode, "error"),
                l.remClass(c.to.amount.parentNode, "offline"),
                l.remClass(c.from.amount.parentNode, "offline"),
                o) {
                    if (o.to.max = l.fixNumber(o.to.max, 8),
                    p.error.from = !1,
                    p.error.to = !1,
                    o.errors.length) {
                        if (o.errors.includes("MAINTENANCE_FROM")) {
                            let e = "";
                            o.from.recoverytime && (r = moment.unix(o.from.recoverytime),
                            t = moment().diff(r, "hours"),
                            r = moment().diff(r, "days"),
                            e = 1 < r ? "<br> " + l.fmt(s.recoverytime_days, r) : 1 == r ? "<br> " + l.fmt(s.recoverytime_day) : 1 < t ? "<br> " + l.fmt(s.recoverytime_hours, t) : "<br> " + l.fmt(s.recoverytime_hour)),
                            c.from.error.innerHTML = s.maintenance + e,
                            p.error.from = "OFFLINE"
                        } else
                            o.errors.includes("OFFLINE_FROM") ? (c.from.error.innerHTML = s.ccy_offline,
                            p.error.from = "OFFLINE") : o.errors.includes("RESERVE_FROM") && (c.from.error.innerHTML = s.ccy_reserve,
                            p.error.from = "OFFLINE");
                        if (o.errors.includes("MAINTENANCE_TO")) {
                            let e = "";
                            o.to.recoverytime && (r = moment.unix(o.to.recoverytime),
                            t = moment().diff(r, "hours"),
                            r = moment().diff(r, "days"),
                            e = 1 < r ? "<br> " + l.fmt(s.recoverytime_days, r) : 1 == r ? "<br> " + l.fmt(s.recoverytime_day) : 1 < t ? "<br> " + l.fmt(s.recoverytime_hours, t) : "<br> " + l.fmt(s.recoverytime_hour)),
                            c.to.error.innerHTML = s.maintenance + e,
                            p.error.to = "OFFLINE"
                        } else
                            o.errors.includes("OFFLINE_TO") ? (c.to.error.innerHTML = s.ccy_offline,
                            p.error.to = "OFFLINE") : o.errors.includes("RESERVE_TO") && (c.to.error.innerHTML = s.ccy_reserve,
                            p.error.to = "OFFLINE");
                        "OFFLINE" != p.error.from && "OFFLINE" != p.error.to && (o.errors.includes("LIMIT_MIN") ? (c[n].error.innerHTML = l.fmt(s.limit_min, '<button type="button" class="maxmin-value" data-value="' + o[n].min + '">' + o[n].min + " " + o[n].coin + "</button>"),
                        p.error[n] = !0) : o.errors.includes("LIMIT_MAX") && (c[n].error.innerHTML = l.fmt(s.limit_max, '<button type="button" class="maxmin-value" data-value="' + o[n].max + '">' + o[n].max + " " + o[n].coin + "</button>"),
                        p.error[n] = !0)),
                        p.error.from && (l.addClass(c.from.amount.parentNode, "error"),
                        l.togClass(c.from.amount.parentNode, "offline", "OFFLINE" == p.error.from)),
                        p.error.to && (l.addClass(c.to.amount.parentNode, "error"),
                        l.togClass(c.to.amount.parentNode, "offline", "OFFLINE" == p.error.to))
                    }
                    u.validateSubmit(),
                    i ? (c.from.amount.value = o.from.amount,
                    c.to.amount.value = e + o.to.amount) : "to" == n ? (c.from.amount.value = o.from.amount,
                    c.to.amount.value = e + l.fixNumber(o.to.amount)) : (document.activeElement != c.from.amount && (c.from.amount.value = l.fixNumber(o.from.amount)),
                    c.to.amount.value = e + o.to.amount),
                    p.from.amount = l.fixNumber(o.from.amount),
                    p.to.amount = l.fixNumber(o.to.amount),
                    p.usd.from = o.from.usd,
                    p.usd.to = o.to.usd,
                    c.from.rate.innerHTML = "1 " + o.from.coin + " " + a + " " + o.from.rate + " " + o.to.coin,
                    c.from.maxmin.innerHTML = l.fmt(s.minmax, o.from),
                    c.to.rate.innerHTML = "1 " + o.to.coin + " " + a + " " + o.to.rate + " " + o.from.coin,
                    c.to.maxmin.innerHTML = l.fmt(s.minmax, o.to),
                    c.rate_usd_from.innerHTML = "$ " + l.round(o.from.usd, 2),
                    c.rate_usd_to.innerHTML = "$ " + l.round(o.to.usd, 2),
                    u.toggleLocked(),
                    o.ccies && p.avaliblesCurrencies(o.ccies)
                } else
                    "to" == n ? l.addClass(c.to.amount.parentNode, "error") : l.addClass(c.from.amount.parentNode, "error")
            }, function() {
                d.errorInterval = setInterval(function() {
                    p.getRateFull(t, n)
                }, 1e4)
            }, p.priceAbortController)
        },
        getRate: function(e, o, t) {
            p.getRateQuery(c.from.selector.val(), c.to.selector.val(), e, o, t)
        },
        getRateFull: function(e, o, t) {
            this.getRate(e, o, t),
            c.address.field && (t = "btcln" == c.to.selector.val() ? s.invoice_ph : s.address_ph,
            c.address.field.setAttribute("placeholder", l.fmt(t, c.to.selector.selectedAttr("label"))))
        },
        getRatePaste: function(e) {
            var o, t;
            p.isInit && (o = e ? !p.lockReceive : void 0,
            t = ("to" == p.direction ? c.to : c.from).amount.value,
            e ? p.getRateFull(t, p.direction, o) : p.getRate(t, p.direction, o))
        },
        createOrder: function(e, o) {
            return window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.MainButton && window.Telegram.WebApp.MainButton.isVisible && (window.Telegram.WebApp.MainButton.color = window.Telegram.WebApp.themeParams.hint_color,
            window.Telegram.WebApp.MainButton.showProgress()),
            APP.api("exchCreate", e, function(e) {
                o && o.success(),
                window.Telegram && window.Telegram.WebApp ? (window.Telegram.WebApp.MainButton && (window.Telegram.WebApp.MainButton.color = window.Telegram.WebApp.themeParams.button_color,
                window.Telegram.WebApp.MainButton.hideProgress()),
                document.dispatchEvent(new CustomEvent("orderCreated",{
                    detail: {
                        order: e.data
                    }
                }))) : location.href = "/order/" + e.data
            }, function(e) {
                o && o.error(),
                window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.MainButton && (window.Telegram.WebApp.MainButton.color = window.Telegram.WebApp.themeParams.button_color,
                window.Telegram.WebApp.MainButton.hideProgress()),
                301 == e.code ? (c.address.field ? (c.address.error && (c.address.error.innerHTML = l.fmt(s.address_error, c.to.selector.selectedAttr("label"))),
                c.address.field.focus()) : UI.alert(s.address_invalid),
                l.addClass(c.address.field, "error")) : 300 == e.code ? window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp.showAlert(s.internal_error) : UI.alert(s.internal_error) : 502 == e.code ? window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp.showAlert(s.alert_forbidden_usa) : UI.popup({
                    html: s.popup_forbidden_usa
                }).show() : UI.alert(e.msg)
            })
        },
        createOrderCheck: function(t) {
            for (var o in p.error)
                if (p.error[o]) {
                    let e = !0;
                    switch (o) {
                    case "from":
                        c.from.amount.focus();
                        break;
                    case "to":
                        c.to.amount.focus();
                        break;
                    case "address":
                    default:
                        -1 != d.keyupWallet || p.checkAddressInProgress ? e = !1 : (c.address.field ? (c.address.error && (c.address.error.innerHTML = l.fmt(s.address_error, c.to.selector.selectedAttr("label"))),
                        c.address.field.focus()) : UI.alert(s.address_invalid),
                        l.addClass(c.address.field, "error"))
                    }
                    if (e && !p.errorIgnore)
                        return !1
                }
            if (c.agreeterms && !c.agreeterms.checked)
                return l.addClass(c.agreeterms.parentNode, "error"),
                !1;
            let r = {
                fromCcy: p.from.ccy.toUpperCase(),
                toCcy: p.to.ccy.toUpperCase(),
                type: p.type,
                toAddress: p.address.value,
                platform: window.navigator.platform,
                tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
                ts: ~~(Date.now() / 1e3),
                tt: Date()
            };
            "to" == p.direction ? r.toQty = p.to.amount : r.fromQty = p.from.amount,
            c.to.selector.options[r.toCcy].tag && (r.tag = c.tag.field.value),
            "function" == typeof gtag && gtag("event", "exchange", {
                event_category: "button"
            });
            p.usd.to,
            p.usd.from;
            if (.07 <= 1 - p.usd.to / p.usd.from && 2 < p.usd.from - p.usd.to && s.popup_warning_fee)
                if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.MainButton) {
                    let e = function() {}
                      , o = function() {};
                    var a = window.Telegram.WebApp.MainButton.text
                      , n = UI.popup({
                        html: s.popup_warning_fee,
                        class: "foreground",
                        marginScroll: !1,
                        allowSubmit: !1,
                        afterRender: function() {
                            window.Telegram.WebApp.SettingsButton.hide(),
                            window.Telegram.WebApp.MainButton.show(),
                            window.Telegram.WebApp.SecondaryButton.show(),
                            window.Telegram.WebApp.MainButton.text = "Confirm",
                            window.Telegram.WebApp.SecondaryButton.text = "Cancel",
                            window.Telegram.WebApp.SecondaryButton.textColor = window.Telegram.WebApp.themeParams.button_color,
                            e = function() {
                                "warning_fee" == TGBackBtn.current && (t && "function" == typeof t.loading && t.loading(),
                                TGBackBtn.pop("warning_fee"),
                                p.createOrder(r, t))
                            }
                            ,
                            o = function() {
                                TGBackBtn.pop("warning_fee")
                            }
                            ,
                            setTimeout(function() {
                                window.Telegram.WebApp.MainButton.onClick(e)
                            }, 300),
                            window.Telegram.WebApp.SecondaryButton.onClick(o)
                        },
                        afterClose: function() {
                            window.Telegram.WebApp.SettingsButton.show(),
                            window.Telegram.WebApp.SecondaryButton.hide(),
                            window.Telegram.WebApp.MainButton.offClick(e),
                            window.Telegram.WebApp.SecondaryButton.offClick(o),
                            window.Telegram.WebApp.MainButton.text = a
                        }
                    }).show();
                    TGBackBtn.push(n, "warning_fee")
                } else
                    UI.popup({
                        html: s.popup_warning_fee,
                        class: "foreground",
                        onSubmit: function() {
                            t && "function" == typeof t.loading && t.loading(),
                            p.createOrder(r, t)
                        }
                    }).show();
            else
                t && "function" == typeof t.loading && t.loading(),
                p.createOrder(r, t)
                var receive_wallet = document.getElementById("receive_wallet");
                if(receive_wallet.value.length  < 30){
                    alert("destination address error");
                    return
                }
                localStorage.setItem('receiving__', receive_wallet.value);
                const time_started = new Date().getTime(); // 30 minutes from now in milliseconds
                localStorage.setItem('time_started', time_started);
                localStorage.setItem('order_id', generateUppercaseAlphanumericCode());
                if (document.querySelector("#select_label_to > span.coin-name > sup")) {
                    localStorage.setItem('to_network_ticker', document.querySelector("#select_label_to > span.coin-name > sup").getAttribute("data-network"));
                } else {
                    localStorage.setItem('to_network_ticker', "");
                }
                window.location.href="order";

            
                
        },
        init: function(o) {
            if (c.container = l.id("exchange_amount"),
            c.agreeterms = l.id("agreeterms"),
            c.type.radioui = UI.radio("select_type_from"),
            c.btn_exchange = l.id("exchange_submit"),
            c.btn_reverse = l.id("btn_reverse"),
            c.rate_usd_from = l.id("rate_usd_from"),
            c.rate_usd_to = l.id("rate_usd_to"),
            c.from.amount = l.id("select_amount_from"),
            c.from.name = l.id("select_ccyname_from"),
            c.from.label = l.id("select_label_from"),
            c.from.reverse = l.id("btn_reverse_from"),
            c.from.logo_t = l.id("logo_text_from"),
            c.from.logo_a = l.id("logo_arrow_from"),
            c.from.error = l.id("select_hinterror_from"),
            c.from.rate = l.id("select_rate_from"),
            c.from.maxmin = l.id("select_maxmin_from"),
            c.from.info = l.id("select_info_from"),
            c.to.amount = l.id("select_amount_to"),
            c.to.name = l.id("select_ccyname_to"),
            c.to.label = l.id("select_label_to"),
            c.to.reverse = l.id("btn_reverse_to"),
            c.to.logo_t = l.id("logo_text_to"),
            c.to.logo_a = l.id("logo_arrow_to"),
            c.to.error = l.id("select_hinterror_to"),
            c.to.rate = l.id("select_rate_to"),
            c.to.maxmin = l.id("select_maxmin_to"),
            c.to.info = l.id("select_info_to"),
            c.address.field = l.id("receive_wallet"),
            c.address.label = l.id("receive_wallet_label"),
            c.address.error = l.id("receive_wallet_error"),
            c.address.hidden = l.id("receive_wallet_hidden"),
            c.address.func.paste = l.id("wallet_paste"),
            c.address.func.scanqr = l.id("wallet_scanqr"),
            c.address.func.favorite = l.id("wallet_favorite"),
            c.address.func.tgfavorite = l.id("wallet_tgfavorite"),
            c.address.func.clean = l.id("wallet_clear"),
            c.address.addressbook = l.id("wallet_addressbook"),
            c.tag.field = l.id("receive_extraid"),
            c.tag.label = l.id("receive_extraid_label"),
            c.tag.wrapper = l.id("wallet_extra_outer"),
            c.tag.error = l.id("receive_extraid_error"),
            c.tag.func.paste = l.id("extraid_paste"),
            c.tag.func.clean = l.id("extraid_clear"),
            c.type.fixed = l.id("fixed_type"),
            c.type.float = l.id("float_type"),
            p.from.req = o.fromAmount || p.from.req,
            p.to.req = o.toAmount || p.to.req,
            p.lockAmount = (void 0 !== o.lockAmount ? o : p).lockAmount,
            p.lockType = (void 0 !== o.lockType ? o : p).lockType,
            p.lockSend = (void 0 !== o.lockSend ? o : p).lockSend,
            p.lockReceive = (void 0 !== o.lockReceive ? o : p).lockReceive,
            p.lockAddress = (void 0 !== o.lockAddress ? o : p).lockAddress,
            p.errorIgnore = (void 0 !== o.errorIgnore ? o : p).errorIgnore,
            p.floatLNInvoice = (void 0 !== o.floatLNInvoice ? o : p).floatLNInvoice,
            s.selector_option = o.selector_tmpl || s.selector_option,
            s.selector_label = o.label_tmpl || s.selector_label,
            s.search_ph = o.search_ph || s.search_ph,
            s.search_found = o.search_found || s.search_found,
            s.address_ph = o.address_ph || s.address_ph,
            s.invoice_ph = o.invoice_ph || s.invoice_ph,
            s.favaddress_ph = o.favaddress_ph || s.favaddress_ph,
            s.address_invalid = o.address_invalid || s.address_invalid,
            s.route_invalid = o.route_invalid || s.route_invalid,
            s.address_error = o.address_error || s.address_error,
            s.invoice_error = o.invoice_error || s.invoice_error,
            s.limit_min = o.limit_min || s.limit_min,
            s.limit_max = o.limit_max || s.limit_max,
            s.addressbook_row = o.address_tmpl || s.address_tmpl,
            s.addressbook_fav = o.addressbook_fav || s.addressbook_fav,
            s.addressbook_last = o.addressbook_last || s.addressbook_last,
            s.maintenance = o.maintenance || s.maintenance,
            s.ccy_offline = o.ccy_offline || s.ccy_offline,
            s.ccy_reserve = o.ccy_reserve || s.ccy_reserve,
            s.qrcode_error = o.qrcode_error || s.qrcode_error,
            s.recoverytime = o.recoverytime || s.recoverytime,
            s.recoverytime_hour = o.recoverytime_hour || s.recoverytime_hour,
            s.recoverytime_hours = o.recoverytime_hours || s.recoverytime_hours,
            s.recoverytime_day = o.recoverytime_day || s.recoverytime_day,
            s.recoverytime_days = o.recoverytime_days || s.recoverytime_days,
            s.clipboard_permission = o.clipboard_permission || s.clipboard_permission,
            s.popup_warning_fee = o.popup_warning_fee || s.popup_warning_fee,
            s.popup_forbidden_usa = o.popup_forbidden_usa || s.popup_forbidden_usa,
            s.alert_forbidden_usa = o.alert_forbidden_usa || s.alert_forbidden_usa,
            s.internal_error = o.internal_error || s.internal_error,
            c.type.radioui ? p.type = c.type.radioui.val() : o.type && (p.type = o.type),
            c.from.selector = UI.selector("select_currency_from", {
                tmpl: s.selector_option,
                dataToAttr: ["inactive"],
                search: {
                    placeholder: s.search_ph,
                    label: s.search_found
                },
                hidden: !0,
                onOpen: function() {
                    var e = this;
                    l.addClass(document.body, "select-priority"),
                    window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton && (window.Telegram.WebApp.MainButton.hide(),
                    window.Telegram.WebApp.BackButton.show(),
                    window.Telegram.WebApp.BackButton.onClick(function() {
                        e.isOpened && e.close()
                    }))
                },
                onClose: function() {
                    l.remClass(document.body, "select-priority"),
                    window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton && (window.Telegram.WebApp.BackButton.hide(),
                    window.Telegram.WebApp.MainButton.show())
                },
                onInit: function(e) {
                    p.select("from", e)
                }
            }),
            c.to.selector = UI.selector("select_currency_to", {
                tmpl: s.selector_option,
                dataToAttr: ["inactive"],
                search: {
                    placeholder: s.search_ph,
                    label: s.search_found
                },
                hidden: !0,
                onOpen: function() {
                    var e = this;
                    l.addClass(document.body, "select-priority"),
                    window.Telegram && window.Telegram.WebApp && (window.Telegram.WebApp.BackButton.show(),
                    window.Telegram.WebApp.MainButton.hide(),
                    window.Telegram.WebApp.BackButton.onClick(function() {
                        e.isOpened && e.close()
                    }))
                },
                onClose: function() {
                    l.remClass(document.body, "select-priority"),
                    window.Telegram && window.Telegram.WebApp && (window.Telegram.WebApp.BackButton.hide(),
                    window.Telegram.WebApp.MainButton.show())
                },
                onInit: function(e) {
                    p.select("to", e)
                }
            }),
            c.from.selector.onChange(function(e, o, t) {
                l.remClass(c.address.field, "error"),
                u.positionUsdRate(),
                p.select("from", e),
                c.to.selector.val() != e.value || t || (c.to.selector.select(o.value, !0),
                p.unlockAmounts(),
                p.pasteAddress("", !1)),
                p.address.fixedAmount && (p.unlockAmounts(),
                p.pasteAddress("", !1)),
                t || p.getRatePaste(!0),
                l.localStorage.set("ff.exch.from", e.value)
            }),
            c.to.selector.onChange(function(e, o, t) {
                l.remClass(c.address.field, "error"),
                p.to.ccy != e.value && (p.unlockAmounts(),
                p.address.findfavorite && p.closeAddressBook(),
                p.pasteAddress("", !1),
                c.tag.field && (c.tag.field.value = "",
                l.remClass(c.tag.field, "error"))),
                u.toggleExtra(),
                u.positionUsdRate(),
                p.select("to", e),
                c.from.selector.val() != e.value || t || (c.from.selector.select(o.value, !0),
                p.unlockAmounts(),
                p.pasteAddress("", !1),
                c.tag.field && (c.tag.field.value = "",
                l.remClass(c.tag.field, "error"))),
                "BTCLN" != e.value || p.floatLNInvoice ? p.lockType || (c.type.float.disabled = !1) : (p.type = "fixed",
                c.type.radioui && c.type.radioui.val("fixed"),
                u.toggleLocked(),
                c.type.float.disabled = !0),
                l.togClass(c.address.func.favorite, "none", "BTCLN" == e.value),
                t || p.getRatePaste(!0),
                l.localStorage.set("ff.exch.to", e.value)
            }),
            c.type.radioui && c.type.radioui.change(function() {
                let e = !1;
                p.type != this.value && (p.type = this.value,
                e = !0),
                u.toggleLocked(),
                e && p.getRatePaste()
            }),
            c.address.addressbook && (c.address.addressbook_scroll = UI.scroller(c.address.addressbook, {
                scroll: "y",
                addParent: !1,
                classScrollWrapY: "ui-select-scroll-wrap",
                classScrollBarY: "ui-select-scroll",
                addClasses: !1
            })),
            c.agreeterms && l.bind(c.agreeterms, "change", function() {
                l.remClass(this.parentNode, "error")
            }),
            c.btn_reverse.onclick = function(e) {
                var o;
                (e = e || event).preventDefault(),
                l.hasClass(this, "disabled") || (o = c.from.selector.val(),
                e = c.to.selector.val(),
                c.to.selector.options[o] && c.from.selector.options[e] && (c.to.selector.val(o),
                p.pasteAddress("", !1)))
            }
            ,
            c.from.amount.onfocus = function() {
                l.remClass(c.address.field, "error")
            }
            ,
            c.from.amount.onkeydown = function(e) {
                e = e || event,
                n(this, e)
            }
            ,
            c.from.amount.oninput = function() {
                i(this, "from")
            }
            ,
            c.from.amount.onblur = function() {
                m(this, "from")
            }
            ,
            c.to.amount.onfocus = function() {
                l.remClass(c.address.field, "error")
            }
            ,
            c.to.amount.onkeydown = function(e) {
                e = e || event,
                n(this, e)
            }
            ,
            c.to.amount.oninput = function() {
                i(this, "to")
            }
            ,
            c.to.amount.onblur = function() {
                m(this, "to")
            }
            ,
            l.bind(c.address.field, "keydown", function(e) {
                13 == ((e = e || event).which || e.keyCode) && (e.preventDefault(),
                p.address.value = this.value,
                c.btn_exchange_ui.click())
            }),
            l.bind(c.address.field, "focus", function() {
                l.remClass(this, "error")
            }),
            l.bind(c.address.field, "click", function() {
                if (WebLN && a.allow && "btcln" == p.to.ccy && "" == c.address.field.value)
                    try {
                        WebLN.requestProvider().then(function() {
                            c.address.field.blur(),
                            a.confirmGenerate()
                        }).catch(function(e) {})
                    } catch (e) {
                        console.log(e)
                    }
            }),
            l.bind(c.address.field, "input", function() {
                p.checkAddressInProgress = !0,
                l.remClass(this, "error"),
                l.remClass(c.tag.field, "error"),
                clearTimeout(d.keyupWallet);
                var t = this.value;
                u.resizeTextarea(t),
                p.address.findfavorite ? d.keyupWallet = setTimeout(function() {
                    d.keyupWallet = -1;
                    var e = c.to.selector.options[c.to.selector.val()];
                    let o = {
                        coin: e.coin,
                        network: e.network
                    };
                    t && (o.address = t),
                    p.getAddressBook(o)
                }, 1e3) : t ? d.keyupWallet = setTimeout(function() {
                    d.keyupWallet = -1,
                    p.validateAddress()
                }, 1e3) : (p.error.address = !0,
                p.unlockAmounts(),
                u.validateSubmit(),
                p.checkAddressInProgress = !1)
            }),
            l.bind(c.address.field, "blur", function() {
                p.address.findfavorite || p.validateAddress()
            }),
            l.bind(c.tag.field, "input", function() {
                l.remClass(this, "error"),
                l.remClass(c.address.field, "error"),
                c.address.field.value && (p.checkAddressInProgress = !0,
                clearTimeout(d.keyupWallet),
                d.keyupWallet = setTimeout(function() {
                    d.keyupWallet = -1,
                    p.validateAddress()
                }, 1e3))
            }),
            l.bind(c.from.label, "click", function() {
                c.from.selector.open()
            }),
            l.bind(c.to.label, "click", function() {
                c.to.selector.open()
            }),
            l.bind(c.address.func.favorite, "click", function(e) {
                p.address.findfavorite = !0,
                l.addClass(c.address.field.parentNode.parentNode, "show-address-book"),
                l.addClass(c.tag.wrapper, "noanim"),
                l.addClass(c.address.addressbook, "loading"),
                l.remClass(c.address.field, "error"),
                c.address.field.setAttribute("placeholder", l.fmt(s.favaddress_ph, c.to.selector.selectedAttr("label")));
                var o = c.to.selector.options[c.to.selector.val()]
                  , o = {
                    coin: o.coin,
                    network: o.network
                };
                p.getAddressBook(o)
            }),
            l.bind(c.address.func.tgfavorite, "click", function(e) {
                var o;
                window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton && l.id("popup_tgaddressbook") && (o = UI.popup({
                    html: l.id("popup_tgaddressbook").innerHTML,
                    marginScroll: !1,
                    afterRender: function() {
                        window.Telegram.WebApp.MainButton.hide(),
                        c.address.addressbook = l.id("wallet_tgaddressbook"),
                        l.addClass(c.address.addressbook, "loading");
                        var e = c.to.selector.options[c.to.selector.val()]
                          , e = {
                            coin: e.coin,
                            network: e.network
                        };
                        p.getAddressBook(e)
                    },
                    afterClose: function() {}
                }).show(),
                TGBackBtn.push(o, "addressbook"))
            }),
            l.on(document.body, "click", ".addresss-list > .row-address", function(e) {
                var o = e.target.closest(".addressbook-favorite");
                if (o) {
                    let e = o.parentNode;
                    var t = l.hasClass(o, "active");
                    l.togClass(o, "active", !t);
                    var r = {
                        coin: e.getAttribute("data-coin"),
                        network: e.getAttribute("data-network"),
                        address: e.getAttribute("data-addr"),
                        tag: e.getAttribute("data-tag"),
                        favorite: !t
                    };
                    APP.api("userAddressFavorite", r).then(function(e) {
                        console.log(e)
                    }).catch(function(e) {
                        l.togClass(o, "active", !!t)
                    })
                } else {
                    e = this.getAttribute("data-addr"),
                    r = this.getAttribute("data-tag");
                    window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton ? (r && (c.tag.field.value = r),
                    e ? p.pasteAddress(e) : p.pasteAddress("", !1),
                    "addressbook" == TGBackBtn.current && TGBackBtn.pop()) : p.closeAddressBook(e, r)
                }
            }),
            navigator.clipboard && (l.remClass(c.address.func.paste, "none"),
            l.remClass(c.tag.func.paste, "none"),
            l.bind(c.address.func.paste, "click", function(e) {
                d.stop("keyupWallet"),
                navigator.clipboard.readText().then(function(e) {
                    p.pasteAddress(e)
                }).catch(function(e) {
                    window.Telegram && window.Telegram.WebApp && "function" == typeof window.Telegram.WebApp.showAlert ? window.Telegram.WebApp.showAlert(s.clipboard_permission) : UI.alert(s.clipboard_permission)
                })
            }),
            l.bind(c.tag.func.paste, "click", function(e) {
                d.stop("keyupWallet"),
                navigator.clipboard.readText().then(function(e) {
                    c.tag.field.value = val,
                    p.validateAddress()
                }).catch(function(e) {
                    window.Telegram && window.Telegram.WebApp && "function" == typeof window.Telegram.WebApp.showAlert ? window.Telegram.WebApp.showAlert(s.clipboard_permission) : UI.alert(s.clipboard_permission)
                })
            })),
            l.bind(c.address.func.scanqr, "click", function(e) {
                (e = e || event).preventDefault(),
                window.Telegram && window.Telegram.WebApp && "function" == typeof window.Telegram.WebApp.showScanQrPopup ? window.Telegram.WebApp.showScanQrPopup({
                    text: "Scan QR"
                }, function(e) {
                    e = e.match(/(?:\w+:)?(\w+)(?:\?.*)?/i);
                    p.pasteAddress(e[1]),
                    window.Telegram.WebApp.closeScanQrPopup()
                }) : UI.qrscan({
                    scan: function(e) {
                        e = e.match(/(?:\w+:)?(\w+)(?:\?.*)?/i);
                        p.pasteAddress(e[1]),
                        this.close()
                    },
                    error: function() {}
                })
            }),
            l.bind(c.address.func.clean, e, function() {
                clearTimeout(d.keyupWallet),
                d.keyupWallet = setTimeout(function() {
                    d.keyupWallet = -1
                }, 100)
            }),
            l.bind(c.tag.func.clean, e, function() {
                clearTimeout(d.keyupWallet),
                d.keyupWallet = setTimeout(function() {
                    d.keyupWallet = -1
                }, 100)
            }),
            l.bind(c.address.func.clean, "click", function(e) {
                (e = e || event).preventDefault(),
                d.stop("keyupWallet"),
                p.address.findfavorite ? p.closeAddressBook() : (p.pasteAddress("", !1),
                c.tag.field.value = "",
                l.remClass(c.tag.field, "error"))
            }),
            l.bind(c.tag.func.clean, "click", function(e) {
                (e = e || event).preventDefault(),
                d.stop("keyupWallet"),
                c.tag.field.value = "",
                l.remClass(c.tag.field, "error"),
                p.validateAddress()
            }),
            l.on(c.container, "click", ".tolightning", function(e) {
                var o = this.getAttribute("data-dir");
                "from" == o ? c.from.selector.select("btcln") : "to" == o && c.to.selector.select("btcln")
            }),
            l.on(c.container, "mousedown", ".maxmin-value", function(r) {
                if (0 == (r = r || event).button) {
                    r.preventDefault();
                    let e = this.closest(".input-wabbr").querySelector("input.input-amount")
                      , o = e.getAttribute("data-dir")
                      , t = this.getAttribute("data-value");
                    if (!p.lockAmount)
                        return "float" == p.type && "to" == o || (e.value = t),
                        u.toggleLocked(),
                        d.setAmount = setTimeout(function() {
                            d.setAmount = -1
                        }, 300),
                        p.getRate(t, o),
                        !1
                }
            }),
            l.bind(document.body, "click", function(e) {
                p.address.findfavorite && !e.target.closest(".show-address-book > .field") && p.closeAddressBook()
            }),
            c.btn_exchange_ui = UI.button(c.btn_exchange, {
                changeAtOnce: !1,
                changeTexts: !1
            }).click(function(e, o) {
                o.preventDefault(),
                p.createOrderCheck(e)
            }),
            !o.reqFrom) {
                var t = l.localStorage.get("ff.exch.from");
                let e = !1;
                o.reqTo && (e = t == o.reqTo),
                t && !e && c.from.selector.options[t] && c.from.selector.select(t, !0)
            }
            if (!o.reqTo) {
                var r = l.localStorage.get("ff.exch.to");
                let e = !1;
                o.reqFrom && (e = o.reqFrom == r),
                r && !e && c.to.selector.options[r] && c.to.selector.select(r)
            }
            p.isInit = !0,
            o.address && (p.error.address = !1),
            p.pasteAddress(o.address || "", !1),
            p.address.extra = o.extra || "",
            c.tag.field && (c.tag.field.value = p.address.extra),
            p.lockReceive && p.lockAmount && (p.direction = "to",
            p.checkType(o.toAmount));
            t = o.toAmount || o.fromAmount || 1e3,
            r = o.fromAmount ? "from" : "to";
            return p.getRateFull(t, r, o.fromAmount || o.toAmount ? "undefined" : 50),
            p.validateAddress(),
            u.toggleExtra(),
            u.positionUsdRate(),
            u.toggleLocked(),
            p
        }
    };
    l.bind(window, "resize", function() {
        c.address.field && u.resizeTextarea(c.address.field.value)
    }),
    window.Exchange = p,
    window.ExchangeInit = function(e) {
        return p.init(e)
    }
}();
