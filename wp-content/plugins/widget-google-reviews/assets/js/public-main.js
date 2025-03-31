/*
 hey, [be]Lazy.js - v1.8.2 - 2016.10.25
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function (b, e, g) {
    b instanceof String && (b = String(b));
    for (var k = b.length, p = 0; p < k; p++) {
        var q = b[p];
        if (e.call(g, q, p, b)) return {i: p, v: q}
    }
    return {i: -1, v: void 0}
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (b, e, g) {
    b != Array.prototype && b != Object.prototype && (b[e] = g.value)
};
$jscomp.getGlobal = function (b) {
    return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (b, e, g, k) {
    if (e) {
        g = $jscomp.global;
        b = b.split(".");
        for (k = 0; k < b.length - 1; k++) {
            var p = b[k];
            p in g || (g[p] = {});
            g = g[p]
        }
        b = b[b.length - 1];
        k = g[b];
        e = e(k);
        e != k && null != e && $jscomp.defineProperty(g, b, {configurable: !0, writable: !0, value: e})
    }
};
$jscomp.polyfill("Array.prototype.find", function (b) {
    return b ? b : function (b, g) {
        return $jscomp.findInternal(this, b, g).v
    }
}, "es6", "es3");
$jscomp.polyfill("Object.is", function (b) {
    return b ? b : function (b, g) {
        return b === g ? 0 !== b || 1 / b === 1 / g : b !== b && g !== g
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function (b) {
    return b ? b : function (b, g) {
        var e = this;
        e instanceof String && (e = String(e));
        var p = e.length;
        g = g || 0;
        for (0 > g && (g = Math.max(g + p, 0)); g < p; g++) {
            var q = e[g];
            if (q === b || Object.is(q, b)) return !0
        }
        return !1
    }
}, "es7", "es3");
$jscomp.checkStringArgs = function (b, e, g) {
    if (null == b) throw new TypeError("The 'this' value for String.prototype." + g + " must not be null or undefined");
    if (e instanceof RegExp) throw new TypeError("First argument to String.prototype." + g + " must not be a regular expression");
    return b + ""
};
$jscomp.polyfill("String.prototype.includes", function (b) {
    return b ? b : function (b, g) {
        return -1 !== $jscomp.checkStringArgs(this, b, "includes").indexOf(b, g || 0)
    }
}, "es6", "es3");
var WPacTime = WPacTime || {
    getTime: function (b, e, g) {
        return "chat" == g ? this.getChatTime(b, e || "en") : g ? this.getFormatTime(b, g, e || "en") : this.getDefaultTime(b, e || "en")
    }, getChatTime: function (b, e) {
        var g = ((new Date).getTime() - b) / 1E3 / 60 / 60, k = g / 24;
        return 24 > g ? this.getFormatTime(b, "HH:mm", e) : 365 > k ? this.getFormatTime(b, "dd.MM HH:mm", e) : this.getFormatTime(b, "yyyy.MM.dd HH:mm", e)
    }, getDefaultTime: function (b, e) {
        return this.getTimeAgo(b, e)
    }, getTimeAgo: function (b, e) {
        b = ((new Date).getTime() - b) / 1E3;
        var g = b / 60, k = g / 60, p = k / 24,
            q = p / 365;
        e = WPacTime.Messages[e] ? e : "en";
        return 45 > b ? WPacTime.Messages[e].second : 90 > b ? WPacTime.Messages[e].minute : 45 > g ? WPacTime.Messages[e].minutes(g) : 90 > g ? WPacTime.Messages[e].hour : 24 > k ? WPacTime.Messages[e].hours(k) : 48 > k ? WPacTime.Messages[e].day : 30 > p ? WPacTime.Messages[e].days(p) : 60 > p ? WPacTime.Messages[e].month : 365 > p ? WPacTime.Messages[e].months(p) : 2 > q ? WPacTime.Messages[e].year : WPacTime.Messages[e].years(q)
    }, getTime12: function (b, e) {
        b = new Date(b);
        return (b.getHours() % 12 ? b.getHours() % 12 : 12) + ":" + b.getMinutes() +
            (12 <= b.getHours() ? " PM" : " AM")
    }, getFormatTime: function (b, e, g) {
        var k = new Date(b), p = {
            SS: k.getMilliseconds(),
            ss: k.getSeconds(),
            mm: k.getMinutes(),
            HH: k.getHours(),
            hh: (k.getHours() % 12 ? k.getHours() % 12 : 12) + (12 <= k.getHours() ? "PM" : "AM"),
            dd: k.getDate(),
            MM: k.getMonth() + 1,
            yyyy: k.getFullYear(),
            yy: String(k.getFullYear()).toString().substr(2, 2),
            ago: this.getTimeAgo(b, g),
            12: this.getTime12(b, g)
        };
        return e.replace(/(SS|ss|mm|HH|hh|DD|dd|MM|yyyy|yy|ago|12)/g, function (b, e) {
            b = p[e];
            return 10 > b ? "0" + b : b
        })
    }, declineNum: function (b,
                             e, g, k) {
        return b + " " + this.declineMsg(b, e, g, k)
    }, declineMsg: function (b, e, g, k, p) {
        var q = b % 10;
        return 1 == q && (1 == b || 20 < b) ? e : 1 < q && 5 > q && (20 < b || 10 > b) ? g : b ? k : p
    }
};
WPacTime.Messages = {
    ru: {
        second: "\u0442\u043e\u043b\u044c\u043a\u043e \u0447\u0442\u043e",
        minute: "\u043c\u0438\u043d\u0443\u0442\u0443 \u043d\u0430\u0437\u0430\u0434",
        minutes: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u043c\u0438\u043d\u0443\u0442\u0430 \u043d\u0430\u0437\u0430\u0434", "\u043c\u0438\u043d\u0443\u0442\u044b \u043d\u0430\u0437\u0430\u0434", "\u043c\u0438\u043d\u0443\u0442 \u043d\u0430\u0437\u0430\u0434")
        },
        hour: "\u0447\u0430\u0441 \u043d\u0430\u0437\u0430\u0434",
        hours: function (b) {
            return WPacTime.declineNum(Math.round(b),
                "\u0447\u0430\u0441 \u043d\u0430\u0437\u0430\u0434", "\u0447\u0430\u0441\u0430 \u043d\u0430\u0437\u0430\u0434", "\u0447\u0430\u0441\u043e\u0432 \u043d\u0430\u0437\u0430\u0434")
        },
        day: "\u0434\u0435\u043d\u044c \u043d\u0430\u0437\u0430\u0434",
        days: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u0434\u0435\u043d\u044c \u043d\u0430\u0437\u0430\u0434", "\u0434\u043d\u044f \u043d\u0430\u0437\u0430\u0434", "\u0434\u043d\u0435\u0439 \u043d\u0430\u0437\u0430\u0434")
        },
        month: "\u043c\u0435\u0441\u044f\u0446 \u043d\u0430\u0437\u0430\u0434",
        months: function (b) {
            return WPacTime.declineNum(Math.round(b / 30), "\u043c\u0435\u0441\u044f\u0446 \u043d\u0430\u0437\u0430\u0434", "\u043c\u0435\u0441\u044f\u0446\u0430 \u043d\u0430\u0437\u0430\u0434", "\u043c\u0435\u0441\u044f\u0446\u0435\u0432 \u043d\u0430\u0437\u0430\u0434")
        },
        year: "\u0433\u043e\u0434 \u043d\u0430\u0437\u0430\u0434",
        years: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u0433\u043e\u0434 \u043d\u0430\u0437\u0430\u0434", "\u0433\u043e\u0434\u0430 \u043d\u0430\u0437\u0430\u0434",
                "\u043b\u0435\u0442 \u043d\u0430\u0437\u0430\u0434")
        }
    }, en: {
        second: "just now", minute: "1m ago", minutes: function (b) {
            return Math.round(b) + "m ago"
        }, hour: "1h ago", hours: function (b) {
            return Math.round(b) + "h ago"
        }, day: "a day ago", days: function (b) {
            return Math.round(b) + " days ago"
        }, month: "a month ago", months: function (b) {
            return Math.round(b / 30) + " months ago"
        }, year: "a year ago", years: function (b) {
            return Math.round(b) + " years ago"
        }
    }, uk: {
        second: "\u0442\u0456\u043b\u044c\u043a\u0438 \u0449\u043e",
        minute: "\u0445\u0432\u0438\u043b\u0438\u043d\u0443 \u0442\u043e\u043c\u0443",
        minutes: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u0445\u0432\u0438\u043b\u0438\u043d\u0443 \u0442\u043e\u043c\u0443", "\u0445\u0432\u0438\u043b\u0438\u043d\u0438 \u0442\u043e\u043c\u0443", "\u0445\u0432\u0438\u043b\u0438\u043d \u0442\u043e\u043c\u0443")
        },
        hour: "\u0433\u043e\u0434\u0438\u043d\u0443 \u0442\u043e\u043c\u0443",
        hours: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u0433\u043e\u0434\u0438\u043d\u0443 \u0442\u043e\u043c\u0443", "\u0433\u043e\u0434\u0438\u043d\u0438 \u0442\u043e\u043c\u0443",
                "\u0433\u043e\u0434\u0438\u043d \u0442\u043e\u043c\u0443")
        },
        day: "\u0434\u0435\u043d\u044c \u0442\u043e\u043c\u0443",
        days: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u0434\u0435\u043d\u044c \u0442\u043e\u043c\u0443", "\u0434\u043d\u0456 \u0442\u043e\u043c\u0443", "\u0434\u043d\u0456\u0432 \u0442\u043e\u043c\u0443")
        },
        month: "\u043c\u0456\u0441\u044f\u0446\u044c \u0442\u043e\u043c\u0443",
        months: function (b) {
            return WPacTime.declineNum(Math.round(b / 30), "\u043c\u0456\u0441\u044f\u0446\u044c \u0442\u043e\u043c\u0443",
                "\u043c\u0456\u0441\u044f\u0446\u0456 \u0442\u043e\u043c\u0443", "\u043c\u0456\u0441\u044f\u0446\u0456\u0432 \u0442\u043e\u043c\u0443")
        },
        year: "\u0440\u0456\u043a \u0442\u043e\u043c\u0443",
        years: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u0440\u0456\u043a \u0442\u043e\u043c\u0443", "\u0440\u043e\u043a\u0438 \u0442\u043e\u043c\u0443", "\u0440\u043e\u043a\u0456\u0432 \u0442\u043e\u043c\u0443")
        }
    }, ro: {
        second: "chiar acum", minute: "\u00een urm\u0103 minut", minutes: function (b) {
            return WPacTime.declineNum(Math.round(b),
                "o minuta in urma", "minute in urma", "de minute in urma")
        }, hour: "acum o ora", hours: function (b) {
            return WPacTime.declineNum(Math.round(b), "acum o ora", "ore in urma", "de ore in urma")
        }, day: "o zi in urma", days: function (b) {
            return WPacTime.declineNum(Math.round(b), "o zi in urma", "zile in urma", "de zile in urma")
        }, month: "o luna in urma", months: function (b) {
            return WPacTime.declineNum(Math.round(b / 30), "o luna in urma", "luni in urma", "de luni in urma")
        }, year: "un an in urma", years: function (b) {
            return WPacTime.declineNum(Math.round(b),
                "un an in urma", "ani in urma", "de ani in urma")
        }
    }, lv: {
        second: "Maz\u0101k par min\u016bti", minute: "Pirms min\u016btes", minutes: function (b) {
            return WPacTime.declineNum(Math.round(b), "pirms min\u016btes", "pirms min\u016bt\u0113m", "pirms min\u016bt\u0113m")
        }, hour: "pirms stundas", hours: function (b) {
            return WPacTime.declineNum(Math.round(b), "pirms stundas", "pirms stund\u0101m", "pirms stund\u0101m")
        }, day: "pirms dienas", days: function (b) {
            return WPacTime.declineNum(Math.round(b), "pirms dienas", "pirms dien\u0101m",
                "pirms dien\u0101m")
        }, month: "pirms m\u0113ne\u0161a", months: function (b) {
            return WPacTime.declineNum(Math.round(b / 30), "pirms m\u0113ne\u0161a", "pirms m\u0113ne\u0161iem", "pirms m\u0113ne\u0161iem")
        }, year: "pirms gada", years: function (b) {
            return WPacTime.declineNum(Math.round(b), "pirms gada", "pirms gadiem", "pirms gadiem")
        }
    }, lt: {
        second: "k\u0105 tik", minute: "prie\u0161 minut\u0119", minutes: function (b) {
            return WPacTime.declineNum(Math.round(b), "minut\u0117 prie\u0161", "minut\u0117s prie\u0161", "minu\u010di\u0173 prie\u0161")
        },
        hour: "prie\u0161 valand\u0105", hours: function (b) {
            return WPacTime.declineNum(Math.round(b), "valanda prie\u0161", "valandos prie\u0161", "valand\u0173 prie\u0161")
        }, day: "prie\u0161 dien\u0105", days: function (b) {
            return WPacTime.declineNum(Math.round(b), "diena prie\u0161", "dienos prie\u0161", "dien\u0173 prie\u0161")
        }, month: "prie\u0161 m\u0117nes\u012f", months: function (b) {
            return WPacTime.declineNum(Math.round(b / 30), "m\u0117nes\u012f prie\u0161", "m\u0117nesiai prie\u0161", "m\u0117nesi\u0173 prie\u0161")
        },
        year: "prie\u0161 metus", years: function (b) {
            return WPacTime.declineNum(Math.round(b), "metai prie\u0161", "metai prie\u0161", "met\u0173 prie\u0161")
        }
    }, kk: {
        second: "\u0431\u0456\u0440 \u043c\u0438\u043d\u0443\u0442\u0442\u0430\u043d \u0430\u0437 \u0443\u0430\u049b\u044b\u0442 \u0431\u04b1\u0440\u044b\u043d",
        minute: "\u0431\u0456\u0440 \u043c\u0438\u043d\u0443\u0442 \u0431\u04b1\u0440\u044b\u043d",
        minutes: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u043c\u0438\u043d\u0443\u0442 \u0431\u04b1\u0440\u044b\u043d",
                "\u043c\u0438\u043d\u0443\u0442 \u0431\u04b1\u0440\u044b\u043d", "\u043c\u0438\u043d\u0443\u0442 \u0431\u04b1\u0440\u044b\u043d")
        },
        hour: "\u0431\u0456\u0440 \u0441\u0430\u0493\u0430\u0442 \u0431\u04b1\u0440\u044b\u043d",
        hours: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u0441\u0430\u0493\u0430\u0442 \u0431\u04b1\u0440\u044b\u043d", "\u0441\u0430\u0493\u0430\u0442 \u0431\u04b1\u0440\u044b\u043d", "\u0441\u0430\u0493\u0430\u0442 \u0431\u04b1\u0440\u044b\u043d")
        },
        day: "\u0431\u0456\u0440 \u043a\u04af\u043d \u0431\u04b1\u0440\u044b\u043d",
        days: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u043a\u04af\u043d \u0431\u04b1\u0440\u044b\u043d", "\u043a\u04af\u043d \u0431\u04b1\u0440\u044b\u043d", "\u043a\u04af\u043d \u0431\u04b1\u0440\u044b\u043d")
        },
        month: "\u0431\u0456\u0440 \u0430\u0439 \u0431\u04b1\u0440\u044b\u043d",
        months: function (b) {
            return WPacTime.declineNum(Math.round(b / 30), "\u0430\u0439 \u0431\u04b1\u0440\u044b\u043d", "\u0430\u0439 \u0431\u04b1\u0440\u044b\u043d", "\u0430\u0439 \u0431\u04b1\u0440\u044b\u043d")
        },
        year: "\u0431\u0456\u0440 \u0436\u044b\u043b \u0431\u04b1\u0440\u044b\u043d",
        years: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u0436\u044b\u043b \u0431\u04b1\u0440\u044b\u043d", "\u0436\u044b\u043b \u0431\u04b1\u0440\u044b\u043d", "\u0436\u044b\u043b \u0431\u04b1\u0440\u044b\u043d")
        }
    }, ka: {
        second: "\u10ec\u10d0\u10db\u10d8\u10e1 \u10ec\u10d8\u10dc",
        minute: "\u10ec\u10e3\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc",
        minutes: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u10ec\u10e3\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10ec\u10e3\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc",
                "\u10ec\u10e3\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc")
        },
        hour: "\u10e1\u10d0\u10d0\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc",
        hours: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u10e1\u10d0\u10d0\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10e1\u10d0\u10d0\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10e1\u10d0\u10d0\u10d7\u10d8\u10e1 \u10ec\u10d8\u10dc")
        },
        day: "\u10d3\u10e6\u10d8\u10e1 \u10ec\u10d8\u10dc",
        days: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u10d3\u10e6\u10d8\u10e1 \u10ec\u10d8\u10dc",
                "\u10d3\u10e6\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10d3\u10e6\u10d8\u10e1 \u10ec\u10d8\u10dc")
        },
        month: "\u10d7\u10d5\u10d8\u10e1 \u10ec\u10d8\u10dc",
        months: function (b) {
            return WPacTime.declineNum(Math.round(b / 30), "\u10d7\u10d5\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10d7\u10d5\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10d7\u10d5\u10d8\u10e1 \u10ec\u10d8\u10dc")
        },
        year: "\u10ec\u10da\u10d8\u10e1 \u10ec\u10d8\u10dc",
        years: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u10ec\u10da\u10d8\u10e1 \u10ec\u10d8\u10dc",
                "\u10ec\u10da\u10d8\u10e1 \u10ec\u10d8\u10dc", "\u10ec\u10da\u10d8\u10e1 \u10ec\u10d8\u10dc")
        }
    }, hy: {
        second: "\u0574\u056b \u0584\u0576\u056b \u057e\u0561\u0575\u0580\u056f\u0575\u0561\u0576 \u0561\u057c\u0561\u057b",
        minute: "\u0574\u0565\u056f \u0580\u0578\u057a\u0565 \u0561\u057c\u0561\u057b",
        minutes: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u0580\u0578\u057a\u0565 \u0561\u057c\u0561\u057b", "\u0580\u0578\u057a\u0565 \u0561\u057c\u0561\u057b", "\u0580\u0578\u057a\u0565 \u0561\u057c\u0561\u057b")
        },
        hour: "\u0574\u0565\u056f \u056a\u0561\u0574 \u0561\u057c\u0561\u057b",
        hours: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u056a\u0561\u0574 \u0561\u057c\u0561\u057b", "\u056a\u0561\u0574 \u0561\u057c\u0561\u057b", "\u056a\u0561\u0574 \u0561\u057c\u0561\u057b")
        },
        day: "\u0574\u0565\u056f \u0585\u0580 \u0561\u057c\u0561\u057b",
        days: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u0585\u0580 \u0561\u057c\u0561\u057b", "\u0585\u0580 \u0561\u057c\u0561\u057b", "\u0585\u0580 \u0561\u057c\u0561\u057b")
        },
        month: "\u0574\u0565\u056f \u0561\u0574\u056b\u057d \u0561\u057c\u0561\u057b",
        months: function (b) {
            return WPacTime.declineNum(Math.round(b / 30), "\u0561\u0574\u056b\u057d \u0561\u057c\u0561\u057b", "\u0561\u0574\u056b\u057d \u0561\u057c\u0561\u057b", "\u0561\u0574\u056b\u057d \u0561\u057c\u0561\u057b")
        },
        year: "\u0574\u0565\u056f \u057f\u0561\u0580\u056b \u0561\u057c\u0561\u057b",
        years: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u057f\u0561\u0580\u056b \u0561\u057c\u0561\u057b", "\u057f\u0561\u0580\u056b \u0561\u057c\u0561\u057b",
                "\u057f\u0561\u0580\u056b \u0561\u057c\u0561\u057b")
        }
    }, fr: {
        second: "tout \u00e0 l'heure", minute: "environ une minute", minutes: function (b) {
            return Math.round(b) + " minutes"
        }, hour: "environ une heure", hours: function (b) {
            return "environ " + Math.round(b) + " heures"
        }, day: "un jour", days: function (b) {
            return Math.round(b) + " jours"
        }, month: "environ un mois", months: function (b) {
            return Math.round(b / 30) + " mois"
        }, year: "environ un an", years: function (b) {
            return Math.round(b) + " ans"
        }
    }, es: {
        second: "ahora", minute: "hace un minuto",
        minutes: function (b) {
            return "hace " + Math.round(b) + " minuts"
        }, hour: "hace una hora", hours: function (b) {
            return "hace " + Math.round(b) + " horas"
        }, day: "hace un dia", days: function (b) {
            return "hace " + Math.round(b) + " d\u00edas"
        }, month: "hace un mes", months: function (b) {
            return "hace " + Math.round(b / 30) + " meses"
        }, year: "hace a\u00f1os", years: function (b) {
            return "hace " + Math.round(b) + " a\u00f1os"
        }
    }, el: {
        second: "\u03bb\u03b9\u03b3\u03cc\u03c4\u03b5\u03c1\u03bf \u03b1\u03c0\u03cc \u03ad\u03bd\u03b1 \u03bb\u03b5\u03c0\u03c4\u03cc",
        minute: "\u03b3\u03cd\u03c1\u03c9 \u03c3\u03c4\u03bf \u03ad\u03bd\u03b1 \u03bb\u03b5\u03c0\u03c4\u03cc",
        minutes: function (b) {
            return Math.round(b) + " minutes"
        },
        hour: "\u03b3\u03cd\u03c1\u03c9 \u03c3\u03c4\u03b7\u03bd \u03bc\u03b9\u03b1 \u03ce\u03c1\u03b1",
        hours: function (b) {
            return "about " + Math.round(b) + " hours"
        },
        day: "\u03bc\u03b9\u03b1 \u03bc\u03ad\u03c1\u03b1",
        days: function (b) {
            return Math.round(b) + " days"
        },
        month: "\u03b3\u03cd\u03c1\u03c9 \u03c3\u03c4\u03bf\u03bd \u03ad\u03bd\u03b1 \u03bc\u03ae\u03bd\u03b1",
        months: function (b) {
            return Math.round(b / 30) + " months"
        },
        year: "\u03b3\u03cd\u03c1\u03c9 \u03c3\u03c4\u03bf\u03bd \u03ad\u03bd\u03b1 \u03c7\u03c1\u03cc\u03bd\u03bf",
        years: function (b) {
            return Math.round(b) + " years"
        }
    }, de: {
        second: "soeben", minute: "vor einer Minute", minutes: function (b) {
            return "vor " + Math.round(b) + " Minuten"
        }, hour: "vor einer Stunde", hours: function (b) {
            return "vor " + Math.round(b) + " Stunden"
        }, day: "vor einem Tag", days: function (b) {
            return "vor " + Math.round(b) + " Tagen"
        }, month: "vor einem Monat", months: function (b) {
            return "vor " +
                Math.round(b / 30) + " Monaten"
        }, year: "vor einem Jahr", years: function (b) {
            return "vor " + Math.round(b) + " Jahren"
        }
    }, be: {
        second: "\u043c\u0435\u043d\u0448 \u0437\u0430 \u0445\u0432\u0456\u043b\u0456\u043d\u0443 \u0442\u0430\u043c\u0443",
        minute: "\u0445\u0432\u0456\u043b\u0456\u043d\u0443 \u0442\u0430\u043c\u0443",
        minutes: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u0445\u0432\u0456\u043b\u0456\u043d\u0430 \u0442\u0430\u043c\u0443", "\u0445\u0432\u0456\u043b\u0456\u043d\u044b \u0442\u0430\u043c\u0443",
                "\u0445\u0432\u0456\u043b\u0456\u043d \u0442\u0430\u043c\u0443")
        },
        hour: "\u0433\u0430\u0434\u0437\u0456\u043d\u0443 \u0442\u0430\u043c\u0443",
        hours: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u0433\u0430\u0434\u0437\u0456\u043d\u0443 \u0442\u0430\u043c\u0443", "\u0433\u0430\u0434\u0437\u0456\u043d\u044b \u0442\u0430\u043c\u0443", "\u0433\u0430\u0434\u0437\u0456\u043d \u0442\u0430\u043c\u0443")
        },
        day: "\u0434\u0437\u0435\u043d\u044c \u0442\u0430\u043c\u0443",
        days: function (b) {
            return WPacTime.declineNum(Math.round(b),
                "\u0434\u0437\u0435\u043d\u044c \u0442\u0430\u043c\u0443", "\u0434\u043d\u0456 \u0442\u0430\u043c\u0443", "\u0434\u0437\u0451\u043d \u0442\u0430\u043c\u0443")
        },
        month: "\u043c\u0435\u0441\u044f\u0446 \u0442\u0430\u043c\u0443",
        months: function (b) {
            return WPacTime.declineNum(Math.round(b / 30), "\u043c\u0435\u0441\u044f\u0446 \u0442\u0430\u043c\u0443", "\u043c\u0435\u0441\u044f\u0446\u0430 \u0442\u0430\u043c\u0443", "\u043c\u0435\u0441\u044f\u0446\u0430\u045e \u0442\u0430\u043c\u0443")
        },
        year: "\u0433\u043e\u0434 \u0442\u0430\u043c\u0443",
        years: function (b) {
            return WPacTime.declineNum(Math.round(b), "\u0433\u043e\u0434 \u0442\u0430\u043c\u0443", "\u0433\u0430\u0434\u044b \u0442\u0430\u043c\u0443", "\u0433\u043e\u0434 \u0442\u0430\u043c\u0443")
        }
    }, it: {
        second: "proprio ora", minute: "un minuto fa", minutes: function (b) {
            return WPacTime.declineNum(Math.round(b), "un minuto fa", "minuti fa", "minuti fa")
        }, hour: "un'ora fa", hours: function (b) {
            return WPacTime.declineNum(Math.round(b), "un'ora fa", "ore fa", "ore fa")
        }, day: "un giorno fa", days: function (b) {
            return WPacTime.declineNum(Math.round(b),
                "un giorno fa", "giorni fa", "giorni fa")
        }, month: "un mese fa", months: function (b) {
            return WPacTime.declineNum(Math.round(b / 30), "un mese fa", "mesi fa", "mesi fa")
        }, year: "un anno fa", years: function (b) {
            return WPacTime.declineNum(Math.round(b), "un anno fa", "anni fa", "anni fa")
        }
    }, tr: {
        second: "az \u00f6nce", minute: "dakika \u00f6nce", minutes: function (b) {
            return Math.round(b) + " dakika \u00f6nce"
        }, hour: "saat \u00f6nce", hours: function (b) {
            return Math.round(b) + " saat \u00f6nce"
        }, day: "g\u00fcn \u00f6nce", days: function (b) {
            return Math.round(b) +
                " g\u00fcn \u00f6nce"
        }, month: "ay \u00f6nce", months: function (b) {
            return Math.round(b / 30) + " ay \u00f6nce"
        }, year: "y\u0131l \u00f6nce", years: function (b) {
            return Math.round(b) + " y\u0131l \u00f6nce"
        }
    }, nb: {
        second: "n\u00e5 nettopp", minute: "ett minutt siden", minutes: function (b) {
            return Math.round(b) + " minutter siden"
        }, hour: "en time siden", hours: function (b) {
            return Math.round(b) + " timer siden"
        }, day: "en dag siden", days: function (b) {
            return Math.round(b) + " dager siden"
        }, month: "en m\u00e5ned siden", months: function (b) {
            return Math.round(b /
                30) + " m\u00e5neder siden"
        }, year: "ett \u00e5r siden", years: function (b) {
            return Math.round(b) + " \u00e5r siden"
        }
    }, da: {
        second: "lige nu", minute: "et minut siden", minutes: function (b) {
            return Math.round(b) + " minutter siden"
        }, hour: "en time siden", hours: function (b) {
            return Math.round(b) + " timer siden"
        }, day: "en dag siden", days: function (b) {
            return Math.round(b) + " dage siden"
        }, month: "en m\u00e5ned siden", months: function (b) {
            return Math.round(b / 30) + " m\u00e5neder siden"
        }, year: "et \u00e5r siden", years: function (b) {
            return Math.round(b) +
                " \u00e5r siden"
        }
    }, nl: {
        second: "zojuist", minute: "minuten geleden", minutes: function (b) {
            return Math.round(b) + " minuten geleden"
        }, hour: "uur geleden", hours: function (b) {
            return Math.round(b) + " uur geleden"
        }, day: "1 dag geleden", days: function (b) {
            return Math.round(b) + " dagen geleden"
        }, month: "maand geleden", months: function (b) {
            return Math.round(b / 30) + " maanden geleden"
        }, year: "jaar geleden", years: function (b) {
            return Math.round(b) + " jaar geleden"
        }
    }, ca: {
        second: "ara mateix", minute: "fa un minut", minutes: function (b) {
            return "fa " +
                Math.round(b) + " minuts"
        }, hour: "fa una hora", hours: function (b) {
            return "fa " + Math.round(b) + " hores"
        }, day: "fa un dia", days: function (b) {
            return "fa " + Math.round(b) + " dies"
        }, month: "fa un mes", months: function (b) {
            return "fa " + Math.round(b / 30) + " mesos"
        }, year: "fa un any", years: function (b) {
            return "fa " + Math.round(b) + " anys"
        }
    }, sv: {
        second: "just nu", minute: "en minut sedan", minutes: function (b) {
            return Math.round(b) + " minuter sedan"
        }, hour: "en timme sedan", hours: function (b) {
            return Math.round(b) + " timmar sedan"
        }, day: "en dag sedan",
        days: function (b) {
            return Math.round(b) + " dagar sedan"
        }, month: "en m\u00e5nad sedan", months: function (b) {
            return Math.round(b / 30) + " m\u00e5nader sedan"
        }, year: "ett \u00e5r sedan", years: function (b) {
            return Math.round(b) + " \u00e5r sedan"
        }
    }, pl: {
        second: "w\u0142a\u015bnie teraz", minute: "minut\u0119 temu", minutes: function (b) {
            return Math.round(b) + " minut temu"
        }, hour: "godzin\u0119 temu", hours: function (b) {
            return Math.round(b) + " godzin temu"
        }, day: "wczoraj", days: function (b) {
            return Math.round(b) + " dni temu"
        }, month: "miesi\u0105c temu",
        months: function (b) {
            return Math.round(b / 30) + " miesi\u0119cy temu"
        }, year: "rok temu", years: function (b) {
            return Math.round(b) + " lat temu"
        }
    }, pt: {
        second: "agora", minute: "1 minuto atr\u00e1s", minutes: function (b) {
            return Math.round(b) + " minutos atr\u00e1s"
        }, hour: "1 hora atr\u00e1s", hours: function (b) {
            return Math.round(b) + " horas atr\u00e1s"
        }, day: "1 dia atr\u00e1s", days: function (b) {
            return Math.round(b) + " dias atr\u00e1s"
        }, month: "1 m\u00eas atr\u00e1s", months: function (b) {
            return Math.round(b / 30) + " meses atr\u00e1s"
        },
        year: "1 ano atr\u00e1s", years: function (b) {
            return Math.round(b) + " anos atr\u00e1s"
        }
    }, hu: {
        second: "\u00e9pp az im\u00e9nt", minute: "1 perccel ezel\u0151tt", minutes: function (b) {
            return Math.round(b) + " perccel ezel\u0151tt"
        }, hour: "\u00f3r\u00e1val ezel\u0151tt", hours: function (b) {
            return Math.round(b) + " \u00f3r\u00e1val ezel\u0151tt"
        }, day: "nappal ezel\u0151tt", days: function (b) {
            return Math.round(b) + " nappal ezel\u0151tt"
        }, month: "h\u00f3nappal ezel\u0151tt", months: function (b) {
            return Math.round(b / 30) + " h\u00f3nappal ezel\u0151tt"
        },
        year: "\u00e9vvel ezel\u0151tt", years: function (b) {
            return Math.round(b) + " \u00e9vvel ezel\u0151tt"
        }
    }, fi: {
        second: "juuri nyt", minute: "minuutti sitten", minutes: function (b) {
            return Math.round(b) + " minuuttia sitten"
        }, hour: "tunti sitten", hours: function (b) {
            return Math.round(b) + " tuntia sitten"
        }, day: "p\u00e4iv\u00e4 sitten", days: function (b) {
            return Math.round(b) + " p\u00e4iv\u00e4\u00e4 sitten"
        }, month: "kuukausi sitten", months: function (b) {
            return Math.round(b / 30) + " kuukautta sitten"
        }, year: "vuosi sitten", years: function (b) {
            return Math.round(b) +
                " vuotta sitten"
        }
    }, he: {
        second: "\u05d4\u05e8\u05d2\u05e2",
        minute: "\u05dc\u05e4\u05e0\u05d9 \u05d3\u05e7\u05d4",
        minutes: function (b) {
            return "\u05dc\u05e4\u05e0\u05d9 " + Math.round(b) + " \u05d3\u05e7\u05d5\u05ea"
        },
        hour: "\u05dc\u05e4\u05e0\u05d9 \u05e9\u05e2\u05d4",
        hours: function (b) {
            return "\u05dc\u05e4\u05e0\u05d9 " + Math.round(b) + " \u05e9\u05e2\u05d5\u05ea"
        },
        day: "\u05dc\u05e4\u05e0\u05d9 \u05d9\u05d5\u05dd",
        days: function (b) {
            return "\u05dc\u05e4\u05e0\u05d9 " + Math.round(b) + " \u05d9\u05de\u05d9\u05dd"
        },
        month: "\u05dc\u05e4\u05e0\u05d9 \u05d7\u05d5\u05d3\u05e9",
        months: function (b) {
            return 2 == Math.round(b / 30) ? "\u05dc\u05e4\u05e0\u05d9 \u05d7\u05d5\u05d3\u05e9\u05d9\u05d9\u05dd" : "\u05dc\u05e4\u05e0\u05d9 " + Math.round(b / 30) + " \u05d7\u05d5\u05d3\u05e9\u05d9\u05dd"
        },
        year: "\u05dc\u05e4\u05e0\u05d9 \u05e9\u05e0\u05d4",
        years: function (b) {
            return "\u05dc\u05e4\u05e0\u05d9 " + Math.round(b) + " \u05e9\u05e0\u05d9\u05dd"
        }
    }, bg: {
        second: "\u0432 \u043c\u043e\u043c\u0435\u043d\u0442\u0430",
        minute: "\u043f\u0440\u0435\u0434\u0438 1 \u043c\u0438\u043d\u0443\u0442\u0430",
        minutes: function (b) {
            return "\u043f\u0440\u0435\u0434\u0438 " +
                Math.round(b) + " \u043c\u0438\u043d\u0443\u0442\u0438"
        },
        hour: "\u043f\u0440\u0435\u0434\u0438 1 \u0447\u0430\u0441",
        hours: function (b) {
            return "\u043f\u0440\u0435\u0434\u0438 " + Math.round(b) + " \u0447\u0430\u0441\u0430"
        },
        day: "\u043f\u0440\u0435\u0434\u0438 1 \u0434\u0435\u043d",
        days: function (b) {
            return "\u043f\u0440\u0435\u0434\u0438 " + Math.round(b) + " \u0434\u043d\u0438"
        },
        month: "\u043f\u0440\u0435\u0434\u0438 1 \u043c\u0435\u0441\u0435\u0446",
        months: function (b) {
            return "\u043f\u0440\u0435\u0434\u0438 " + Math.round(b /
                30) + " \u043c\u0435\u0441\u0435\u0446\u0430"
        },
        year: "\u043f\u0440\u0435\u0434\u0438 1 \u0433\u043e\u0434\u0438\u043d\u0430",
        years: function (b) {
            return "\u043f\u0440\u0435\u0434\u0438 " + Math.round(b) + " \u0433\u043e\u0434\u0438\u043d\u0438"
        }
    }, sk: {
        second: "pr\u00e1ve teraz", minute: "pred min\u00fatov", minutes: function (b) {
            return "pred " + Math.round(b) + " min\u00fatami"
        }, hour: "pred hodinou", hours: function (b) {
            return "pred " + Math.round(b) + " hodinami"
        }, day: "v\u010dera", days: function (b) {
            return "pred " + Math.round(b) + " d\u0148ami"
        },
        month: "pred mesiacom", months: function (b) {
            return "pred " + Math.round(b / 30) + " mesiacmi"
        }, year: "pred rokom", years: function (b) {
            return "pred " + Math.round(b) + " rokmi"
        }
    }, lo: {
        second: "\u0ea7\u0eb1\u0ec8\u0e87\u0e81\u0eb5\u0ec9\u0e99\u0eb5\u0ec9",
        minute: "\u0edc\u0eb6\u0ec8\u0e87\u0e99\u0eb2\u0e97\u0eb5\u0e81\u0ec8\u0ead\u0e99",
        minutes: function (b) {
            return Math.round(b) + " \u0e99\u0eb2\u0e97\u0eb5\u0e81\u0ec8\u0ead\u0e99"
        },
        hour: "\u0edc\u0eb6\u0ec8\u0e87\u0e8a\u0ebb\u0ec8\u0ea7\u0ec2\u0ea1\u0e87\u0e81\u0ec8\u0ead\u0e99",
        hours: function (b) {
            return Math.round(b) + " \u0ebb\u0ec8\u0ea7\u0ec2\u0ea1\u0e87\u0e81\u0ec8\u0ead\u0e99"
        },
        day: "\u0edc\u0eb6\u0ec8\u0e87\u0ea1\u0eb7\u0ec9\u0e81\u0ec8\u0ead\u0e99",
        days: function (b) {
            return Math.round(b) + " \u0ea1\u0eb7\u0ec9\u0e81\u0ec8\u0ead\u0e99"
        },
        month: "\u0edc\u0eb6\u0ec8\u0e87\u0ec0\u0e94\u0eb7\u0ead\u0e99\u0e81\u0ec8\u0ead\u0e99",
        months: function (b) {
            return Math.round(b / 30) + " \u0ec0\u0e94\u0eb7\u0ead\u0e99\u0e81\u0ec8\u0ead\u0e99"
        },
        year: "\u0edc\u0eb6\u0ec8\u0e87\u0e9b\u0eb5\u0e81\u0ec8\u0ead\u0e99",
        years: function (b) {
            return Math.round(b) + " \u0e9b\u0eb5\u0e81\u0ec8\u0ead\u0e99"
        }
    }, sl: {
        second: "pravkar", minute: "pred eno minuto", minutes: function (b) {
            return "pred " + Math.round(b) + " minutami"
        }, hour: "pred eno uro", hours: function (b) {
            return "pred " + Math.round(b) + " urami"
        }, day: "pred enim dnem", days: function (b) {
            return "pred " + Math.round(b) + " dnevi"
        }, month: "pred enim mesecem", months: function (b) {
            return "pred " + Math.round(b / 30) + " meseci"
        }, year: "pred enim letom", years: function (b) {
            return "pred " + Math.round(b) + " leti"
        }
    },
    et: {
        second: "just n\u00fc\u00fcd", minute: "minut tagasi", minutes: function (b) {
            return Math.round(b) + " minutit tagasi"
        }, hour: "tund tagasi", hours: function (b) {
            return Math.round(b) + " tundi tagasi"
        }, day: "p\u00e4ev tagasi", days: function (b) {
            return Math.round(b) + " p\u00e4eva tagasi"
        }, month: "kuu aega tagasi", months: function (b) {
            return Math.round(b / 30) + " kuud tagasi"
        }, year: "aasta tagasi", years: function (b) {
            return Math.round(b) + " aastat tagasi"
        }
    }
};
(function (b, e) {
    "function" === typeof define && define.amd ? define(e) : "object" === typeof exports ? module.exports = e() : b.Blazy = e()
})(this, function () {
    function b(b) {
        var c = b._util;
        c.elements = f(b.options);
        c.count = c.elements.length;
        c.destroyed && (c.destroyed = !1, b.options.container && u(b.options.container, function (b) {
            n(b, "scroll", c.validateT)
        }), n(window, "resize", c.saveViewportOffsetT), n(window, "resize", c.validateT), n(window, "scroll", c.validateT));
        e(b)
    }

    function e(b) {
        for (var c = b._util, f = 0; f < c.count; f++) {
            var e = c.elements[f];
            var a = e;
            var l = b.options;
            var n = a.getBoundingClientRect();
            l.container && x && (a = a.closest(l.containerClass)) ? (a = a.getBoundingClientRect(), l = g(a, w) ? g(n, {
                top: a.top - l.offset,
                right: a.right + l.offset,
                bottom: a.bottom + l.offset,
                left: a.left - l.offset
            }) : !1) : l = g(n, w);
            if (l || m(e, b.options.successClass)) b.load(e), c.elements.splice(f, 1), c.count--, f--
        }
        0 === c.count && b.destroy()
    }

    function g(b, c) {
        return b.right >= c.left && b.bottom >= c.top && b.left <= c.right && b.top <= c.bottom
    }

    function k(b, f, e) {
        if (!m(b, e.successClass) && (f || e.loadInvisible ||
                0 < b.offsetWidth && 0 < b.offsetHeight)) if (f = b.getAttribute(y) || b.getAttribute(e.src)) {
            f = f.split(e.separator);
            var l = f[E && 1 < f.length ? 1 : 0], a = b.getAttribute(e.srcset), g = "img" === b.nodeName.toLowerCase(),
                k = (f = b.parentNode) && "picture" === f.nodeName.toLowerCase();
            if (g || void 0 === b.src) {
                var v = new Image, r = function () {
                    e.error && e.error(b, "invalid");
                    c(b, e.errorClass);
                    t(v, "error", r);
                    t(v, "load", G)
                }, G = function () {
                    g ? k || q(b, l, a) : b.style.backgroundImage = 'url("' + l + '")';
                    p(b, e);
                    t(v, "load", G);
                    t(v, "error", r)
                };
                k && (v = b, u(f.getElementsByTagName("source"),
                    function (a) {
                        var b = e.srcset, c = a.getAttribute(b);
                        c && (a.setAttribute("srcset", c), a.removeAttribute(b))
                    }));
                n(v, "error", r);
                n(v, "load", G);
                q(v, l, a)
            } else b.src = l, p(b, e)
        } else "video" === b.nodeName.toLowerCase() ? (u(b.getElementsByTagName("source"), function (a) {
            var b = e.src, c = a.getAttribute(b);
            c && (a.setAttribute("src", c), a.removeAttribute(b))
        }), b.load(), p(b, e)) : (e.error && e.error(b, "missing"), c(b, e.errorClass))
    }

    function p(b, f) {
        c(b, f.successClass);
        f.success && f.success(b);
        b.removeAttribute(f.src);
        b.removeAttribute(f.srcset);
        u(f.breakpoints, function (c) {
            b.removeAttribute(c.src)
        })
    }

    function q(b, c, f) {
        f && b.setAttribute("srcset", f);
        b.src = c
    }

    function m(b, c) {
        return -1 !== (" " + b.className + " ").indexOf(" " + c + " ")
    }

    function c(b, c) {
        m(b, c) || (b.className += " " + c)
    }

    function f(b) {
        var c = [];
        b = b.root.querySelectorAll(b.selector);
        for (var f = b.length; f--; c.unshift(b[f])) ;
        return c
    }

    function l(b) {
        w.bottom = (window.innerHeight || document.documentElement.clientHeight) + b;
        w.right = (window.innerWidth || document.documentElement.clientWidth) + b
    }

    function n(b, c,
               f) {
        b.attachEvent ? b.attachEvent && b.attachEvent("on" + c, f) : b.addEventListener(c, f, {
            capture: !1,
            passive: !0
        })
    }

    function t(b, c, f) {
        b.detachEvent ? b.detachEvent && b.detachEvent("on" + c, f) : b.removeEventListener(c, f, {
            capture: !1,
            passive: !0
        })
    }

    function u(b, c) {
        if (b && c) for (var f = b.length, e = 0; e < f && !1 !== c(b[e], e); e++) ;
    }

    function A(b, c, f) {
        var e = 0;
        return function () {
            var a = +new Date;
            a - e < c || (e = a, b.apply(f, arguments))
        }
    }

    var y, w, E, x;
    return function (c) {
        if (!document.querySelectorAll) {
            var f = document.createStyleSheet();
            document.querySelectorAll =
                function (a, b, c, e, g) {
                    g = document.all;
                    b = [];
                    a = a.replace(/\[for\b/gi, "[htmlFor").split(",");
                    for (c = a.length; c--;) {
                        f.addRule(a[c], "k:v");
                        for (e = g.length; e--;) g[e].currentStyle.k && b.push(g[e]);
                        f.removeRule(0)
                    }
                    return b
                }
        }
        var g = this, n = g._util = {};
        n.elements = [];
        n.destroyed = !0;
        g.options = c || {};
        g.options.error = g.options.error || !1;
        g.options.offset = g.options.offset || 100;
        g.options.root = g.options.root || document;
        g.options.success = g.options.success || !1;
        g.options.selector = g.options.selector || ".b-lazy";
        g.options.separator =
            g.options.separator || "|";
        g.options.containerClass = g.options.container;
        g.options.container = g.options.containerClass ? document.querySelectorAll(g.options.containerClass) : !1;
        g.options.errorClass = g.options.errorClass || "b-error";
        g.options.breakpoints = g.options.breakpoints || !1;
        g.options.loadInvisible = g.options.loadInvisible || !1;
        g.options.successClass = g.options.successClass || "b-loaded";
        g.options.validateDelay = g.options.validateDelay || 25;
        g.options.saveViewportOffsetDelay = g.options.saveViewportOffsetDelay ||
            50;
        g.options.srcset = g.options.srcset || "data-srcset";
        g.options.src = y = g.options.src || "data-src";
        x = Element.prototype.closest;
        E = 1 < window.devicePixelRatio;
        w = {};
        w.top = 0 - g.options.offset;
        w.left = 0 - g.options.offset;
        g.revalidate = function () {
            b(g)
        };
        g.load = function (a, b) {
            var c = this.options;
            void 0 === a.length ? k(a, b, c) : u(a, function (a) {
                k(a, b, c)
            })
        };
        g.destroy = function () {
            var a = this._util;
            this.options.container && u(this.options.container, function (b) {
                t(b, "scroll", a.validateT)
            });
            t(window, "scroll", a.validateT);
            t(window, "resize",
                a.validateT);
            t(window, "resize", a.saveViewportOffsetT);
            a.count = 0;
            a.elements.length = 0;
            a.destroyed = !0
        };
        n.validateT = A(function () {
            e(g)
        }, g.options.validateDelay, g);
        n.saveViewportOffsetT = A(function () {
            l(g.options.offset)
        }, g.options.saveViewportOffsetDelay, g);
        l(g.options.offset);
        u(g.options.breakpoints, function (a) {
            if (a.width >= window.screen.width) return y = a.src, !1
        });
        setTimeout(function () {
            b(g)
        })
    }
});
!function () {
    var b, e = function (k, m) {
        function c() {
            var d = a.params.autoplay, b = a.slides.eq(a.activeIndex);
            b.attr("data-rplgsw-autoplay") && (d = b.attr("data-rplgsw-autoplay") || a.params.autoplay);
            a.autoplayTimeoutId = setTimeout(function () {
                a.params.loop ? (a.fixLoop(), a._slideNext(), a.emit("onAutoplay", a)) : a.isEnd ? m.autoplayStopOnLast ? a.stopAutoplay() : (a._slideTo(0), a.emit("onAutoplay", a)) : (a._slideNext(), a.emit("onAutoplay", a))
            }, d)
        }

        function f(a, h) {
            a = b(a.target);
            if (!a.is(h)) if ("string" == typeof h) a = a.parents(h);
            else if (h.nodeType) {
                var d;
                return a.parents().each(function (a, b) {
                    b === h && (d = h)
                }), d ? h : void 0
            }
            if (0 !== a.length) return a[0]
        }

        function l(d, b) {
            b = b || {};
            var h = new (window.MutationObserver || window.WebkitMutationObserver)(function (d) {
                d.forEach(function (d) {
                    a.onResize(!0);
                    a.emit("onObserverUpdate", a, d)
                })
            });
            h.observe(d, {
                attributes: void 0 === b.attributes || b.attributes,
                childList: void 0 === b.childList || b.childList,
                characterData: void 0 === b.characterData || b.characterData
            });
            a.observers.push(h)
        }

        function n(d) {
            d.originalEvent &&
            (d = d.originalEvent);
            var b = d.keyCode || d.charCode;
            if (!a.params.allowSwipeToNext && (a.isHorizontal() && 39 === b || !a.isHorizontal() && 40 === b) || !a.params.allowSwipeToPrev && (a.isHorizontal() && 37 === b || !a.isHorizontal() && 38 === b)) return !1;
            if (!(d.shiftKey || d.altKey || d.ctrlKey || d.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === b || 39 === b || 38 === b || 40 === b) {
                    var c = !1;
                    if (0 < a.container.parents("." +
                            a.params.slideClass).length && 0 === a.container.parents("." + a.params.slideActiveClass).length) return;
                    var S = window.pageXOffset, f = window.pageYOffset, e = window.innerWidth, g = window.innerHeight,
                        l = a.container.offset();
                    a.rtl && (l.left -= a.container[0].scrollLeft);
                    l = [[l.left, l.top], [l.left + a.width, l.top], [l.left, l.top + a.height], [l.left + a.width, l.top + a.height]];
                    for (var n = 0; n < l.length; n++) {
                        var k = l[n];
                        k[0] >= S && k[0] <= S + e && k[1] >= f && k[1] <= f + g && (c = !0)
                    }
                    if (!c) return
                }
                a.isHorizontal() ? (37 !== b && 39 !== b || (d.preventDefault ? d.preventDefault() :
                    d.returnValue = !1), (39 === b && !a.rtl || 37 === b && a.rtl) && a.slideNext(), (37 === b && !a.rtl || 39 === b && a.rtl) && a.slidePrev()) : (38 !== b && 40 !== b || (d.preventDefault ? d.preventDefault() : d.returnValue = !1), 40 === b && a.slideNext(), 38 === b && a.slidePrev());
                a.emit("onKeyPress", a, b)
            }
        }

        function q(a) {
            var d = 0, b = 0, c = 0, f = 0;
            return "detail" in a && (b = a.detail), "wheelDelta" in a && (b = -a.wheelDelta / 120), "wheelDeltaY" in a && (b = -a.wheelDeltaY / 120), "wheelDeltaX" in a && (d = -a.wheelDeltaX / 120), "axis" in a && a.axis === a.HORIZONTAL_AXIS && (d = b, b = 0), c = 10 *
                d, f = 10 * b, "deltaY" in a && (f = a.deltaY), "deltaX" in a && (c = a.deltaX), (c || f) && a.deltaMode && (1 === a.deltaMode ? (c *= 40, f *= 40) : (c *= 800, f *= 800)), c && !d && (d = 1 > c ? -1 : 1), f && !b && (b = 1 > f ? -1 : 1), {
                spinX: d,
                spinY: b,
                pixelX: c,
                pixelY: f
            }
        }

        function p(d) {
            d.originalEvent && (d = d.originalEvent);
            var b = 0;
            b = a.rtl ? -1 : 1;
            var c = q(d);
            if (a.params.mousewheelForceToAxis) if (a.isHorizontal()) {
                if (!(Math.abs(c.pixelX) > Math.abs(c.pixelY))) return;
                b *= c.pixelX
            } else {
                if (!(Math.abs(c.pixelY) > Math.abs(c.pixelX))) return;
                b = c.pixelY
            } else b = Math.abs(c.pixelX) >
            Math.abs(c.pixelY) ? -c.pixelX * b : -c.pixelY;
            if (0 !== b) {
                if (a.params.mousewheelInvert && (b = -b), a.params.freeMode) {
                    b = a.getWrapperTranslate() + b * a.params.mousewheelSensitivity;
                    c = a.isBeginning;
                    var f = a.isEnd;
                    if (b >= a.minTranslate() && (b = a.minTranslate()), b <= a.maxTranslate() && (b = a.maxTranslate()), a.setWrapperTransition(0), a.setWrapperTranslate(b), a.updateProgress(), a.updateActiveIndex(), (!c && a.isBeginning || !f && a.isEnd) && a.updateClasses(), a.params.freeModeSticky ? (clearTimeout(a.mousewheel.timeout), a.mousewheel.timeout =
                            setTimeout(function () {
                                a.slideReset()
                            }, 300)) : a.params.lazyLoading && a.lazy && a.lazy.load(), a.emit("onScroll", a, d), a.params.autoplay && a.params.autoplayDisableOnInteraction && a.stopAutoplay(), 0 === b || b === a.maxTranslate()) return
                } else {
                    if (60 < (new window.Date).getTime() - a.mousewheel.lastScrollTime) if (0 > b) if (a.isEnd && !a.params.loop || a.animating) {
                        if (a.params.mousewheelReleaseOnEdges) return !0
                    } else a.slideNext(), a.emit("onScroll", a, d); else if (a.isBeginning && !a.params.loop || a.animating) {
                        if (a.params.mousewheelReleaseOnEdges) return !0
                    } else a.slidePrev(),
                        a.emit("onScroll", a, d);
                    a.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                return d.preventDefault ? d.preventDefault() : d.returnValue = !1, !1
            }
        }

        function A(d, h) {
            d = b(d);
            var c = a.rtl ? -1 : 1;
            var f = d.attr("data-rplgsw-parallax") || "0";
            var e = d.attr("data-rplgsw-parallax-x");
            var l = d.attr("data-rplgsw-parallax-y");
            e || l ? (e = e || "0", l = l || "0") : a.isHorizontal() ? (e = f, l = "0") : (l = f, e = "0");
            e = 0 <= e.indexOf("%") ? parseInt(e, 10) * h * c + "%" : e * h * c + "px";
            l = 0 <= l.indexOf("%") ? parseInt(l, 10) * h + "%" : l * h + "px";
            d.transform("translate3d(" + e +
                ", " + l + ",0px)")
        }

        function y(a) {
            return 0 !== a.indexOf("on") && (a = a[0] !== a[0].toUpperCase() ? "on" + a[0].toUpperCase() + a.substring(1) : "on" + a), a
        }

        if (!(this instanceof e)) return new e(k, m);
        var w = {
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            iOSEdgeSwipeDetection: !1,
            iOSEdgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            coverflow: {rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0},
            flip: {slideShadows: !0, limitRotation: !0},
            cube: {slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94},
            fade: {crossFade: !1},
            parallax: !1,
            zoom: !1,
            zoomMax: 3,
            zoomMin: 1,
            zoomToggle: !0,
            scrollbar: null,
            scrollbarHide: !0,
            scrollbarDraggable: !1,
            scrollbarSnapOnRelease: !1,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelReleaseOnEdges: !1,
            mousewheelInvert: !1,
            mousewheelForceToAxis: !1,
            mousewheelSensitivity: 1,
            mousewheelEventsTarged: "container",
            hashnav: !1,
            hashnavWatchState: !1,
            history: !1,
            replaceState: !1,
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            onlyExternal: !1,
            threshold: 0,
            touchMoveStopPropagation: !0,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            pagination: null,
            paginationElement: "span",
            paginationClickable: !1,
            paginationHide: !1,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: "bullets",
            resistance: !0,
            resistanceRatio: .85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            lazyLoading: !1,
            lazyLoadingInPrevNext: !1,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: void 0,
            controlInverse: !1,
            controlBy: "slide",
            normalizeSlideIndex: !0,
            allowSwipeToPrev: !0,
            allowSwipeToNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "rplgsw-no-swiping",
            passiveListeners: !0,
            containerModifierClass: "rplgsw-container-",
            slideClass: "rplgsw-slide",
            slideActiveClass: "rplgsw-slide-active",
            slideDuplicateActiveClass: "rplgsw-slide-duplicate-active",
            slideVisibleClass: "rplgsw-slide-visible",
            slideDuplicateClass: "rplgsw-slide-duplicate",
            slideNextClass: "rplgsw-slide-next",
            slideDuplicateNextClass: "rplgsw-slide-duplicate-next",
            slidePrevClass: "rplgsw-slide-prev",
            slideDuplicatePrevClass: "rplgsw-slide-duplicate-prev",
            wrapperClass: "rplgsw-wrapper",
            bulletClass: "rplgsw-pagination-bullet",
            bulletActiveClass: "rplgsw-pagination-bullet-active",
            buttonDisabledClass: "rplgsw-button-disabled",
            paginationCurrentClass: "rplgsw-pagination-current",
            paginationTotalClass: "rplgsw-pagination-total",
            paginationHiddenClass: "rplgsw-pagination-hidden",
            paginationProgressbarClass: "rplgsw-pagination-progressbar",
            paginationClickableClass: "rplgsw-pagination-clickable",
            paginationModifierClass: "rplgsw-pagination-",
            lazyLoadingClass: "rplgsw-lazy",
            lazyStatusLoadingClass: "rplgsw-lazy-loading",
            lazyStatusLoadedClass: "rplgsw-lazy-loaded",
            lazyPreloaderClass: "rplgsw-lazy-preloader",
            notificationClass: "rplgsw-notification",
            preloaderClass: "preloader",
            zoomContainerClass: "rplgsw-zoom-container",
            observer: !1,
            observeParents: !1,
            a11y: !1,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            runCallbacksOnInit: !0
        }, E = m && m.virtualTranslate;
        m = m || {};
        var x = {}, r;
        for (r in m) if ("object" != typeof m[r] || null === m[r] || m[r].nodeType || m[r] === window || m[r] === document || void 0 !== g && m[r] instanceof g || "undefined" != typeof jQuery && m[r] instanceof jQuery) x[r] = m[r]; else {
            x[r] = {};
            for (var G in m[r]) x[r][G] = m[r][G]
        }
        for (var v in w) if (void 0 ===
            m[v]) m[v] = w[v]; else if ("object" == typeof m[v]) for (var P in w[v]) void 0 === m[v][P] && (m[v][P] = w[v][P]);
        var a = this;
        if (a.params = m, a.originalParams = x, a.classNames = [], void 0 !== b && void 0 !== g && (b = g), (void 0 !== b || (b = void 0 === g ? window.Dom7 || window.Zepto || window.jQuery : g)) && (a.$ = b, a.currentBreakpoint = void 0, a.getActiveBreakpoint = function () {
                if (!a.params.breakpoints) return !1;
                var d, b = !1, c = [];
                for (d in a.params.breakpoints) a.params.breakpoints.hasOwnProperty(d) && c.push(d);
                c.sort(function (a, d) {
                    return parseInt(a, 10) >
                        parseInt(d, 10)
                });
                for (var f = 0; f < c.length; f++) (d = c[f]) >= window.innerWidth && !b && (b = d);
                return b || "max"
            }, a.setBreakpoint = function () {
                var d = a.getActiveBreakpoint();
                if (d && a.currentBreakpoint !== d) {
                    var b = d in a.params.breakpoints ? a.params.breakpoints[d] : a.originalParams,
                        c = a.params.loop && b.slidesPerView !== a.params.slidesPerView, f;
                    for (f in b) a.params[f] = b[f];
                    a.currentBreakpoint = d;
                    c && a.destroyLoop && a.reLoop(!0)
                }
            }, a.params.breakpoints && a.setBreakpoint(), a.container = b(k), 0 !== a.container.length)) {
            if (1 < a.container.length) {
                var R =
                    [];
                return a.container.each(function () {
                    R.push(new e(this, m))
                }), R
            }
            a.container[0].rplgsw = a;
            a.container.data("rplgsw", a);
            a.classNames.push(a.params.containerModifierClass + a.params.direction);
            a.params.freeMode && a.classNames.push(a.params.containerModifierClass + "free-mode");
            a.support.flexbox || (a.classNames.push(a.params.containerModifierClass + "no-flexbox"), a.params.slidesPerColumn = 1);
            a.params.autoHeight && a.classNames.push(a.params.containerModifierClass + "autoheight");
            (a.params.parallax || a.params.watchSlidesVisibility) &&
            (a.params.watchSlidesProgress = !0);
            a.params.touchReleaseOnEdges && (a.params.resistanceRatio = 0);
            0 <= ["cube", "coverflow", "flip"].indexOf(a.params.effect) && (a.support.transforms3d ? (a.params.watchSlidesProgress = !0, a.classNames.push(a.params.containerModifierClass + "3d")) : a.params.effect = "slide");
            "slide" !== a.params.effect && a.classNames.push(a.params.containerModifierClass + a.params.effect);
            "cube" === a.params.effect && (a.params.resistanceRatio = 0, a.params.slidesPerView = 1, a.params.slidesPerColumn = 1, a.params.slidesPerGroup =
                1, a.params.centeredSlides = !1, a.params.spaceBetween = 0, a.params.virtualTranslate = !0);
            "fade" !== a.params.effect && "flip" !== a.params.effect || (a.params.slidesPerView = 1, a.params.slidesPerColumn = 1, a.params.slidesPerGroup = 1, a.params.watchSlidesProgress = !0, a.params.spaceBetween = 0, void 0 === E && (a.params.virtualTranslate = !0));
            a.params.grabCursor && a.support.touch && (a.params.grabCursor = !1);
            a.wrapper = a.container.children("." + a.params.wrapperClass);
            a.params.pagination && (a.paginationContainer = b(a.params.pagination),
            a.params.uniqueNavElements && "string" == typeof a.params.pagination && 1 < a.paginationContainer.length && 1 === a.container.find(a.params.pagination).length && (a.paginationContainer = a.container.find(a.params.pagination)), "bullets" === a.params.paginationType && a.params.paginationClickable ? a.paginationContainer.addClass(a.params.paginationModifierClass + "clickable") : a.params.paginationClickable = !1, a.paginationContainer.addClass(a.params.paginationModifierClass + a.params.paginationType));
            (a.params.nextButton || a.params.prevButton) &&
            (a.params.nextButton && (a.nextButton = b(a.params.nextButton), a.params.uniqueNavElements && "string" == typeof a.params.nextButton && 1 < a.nextButton.length && 1 === a.container.find(a.params.nextButton).length && (a.nextButton = a.container.find(a.params.nextButton))), a.params.prevButton && (a.prevButton = b(a.params.prevButton), a.params.uniqueNavElements && "string" == typeof a.params.prevButton && 1 < a.prevButton.length && 1 === a.container.find(a.params.prevButton).length && (a.prevButton = a.container.find(a.params.prevButton))));
            a.isHorizontal = function () {
                return "horizontal" === a.params.direction
            };
            a.rtl = a.isHorizontal() && ("rtl" === a.container[0].dir.toLowerCase() || "rtl" === a.container.css("direction"));
            a.rtl && a.classNames.push(a.params.containerModifierClass + "rtl");
            a.rtl && (a.wrongRTL = "-webkit-box" === a.wrapper.css("display"));
            1 < a.params.slidesPerColumn && a.classNames.push(a.params.containerModifierClass + "multirow");
            a.device.android && a.classNames.push(a.params.containerModifierClass + "android");
            a.container.addClass(a.classNames.join(" "));
            a.translate = 0;
            a.progress = 0;
            a.velocity = 0;
            a.lockSwipeToNext = function () {
                a.params.allowSwipeToNext = !1;
                !1 === a.params.allowSwipeToPrev && a.params.grabCursor && a.unsetGrabCursor()
            };
            a.lockSwipeToPrev = function () {
                a.params.allowSwipeToPrev = !1;
                !1 === a.params.allowSwipeToNext && a.params.grabCursor && a.unsetGrabCursor()
            };
            a.lockSwipes = function () {
                a.params.allowSwipeToNext = a.params.allowSwipeToPrev = !1;
                a.params.grabCursor && a.unsetGrabCursor()
            };
            a.unlockSwipeToNext = function () {
                a.params.allowSwipeToNext = !0;
                !0 === a.params.allowSwipeToPrev &&
                a.params.grabCursor && a.setGrabCursor()
            };
            a.unlockSwipeToPrev = function () {
                a.params.allowSwipeToPrev = !0;
                !0 === a.params.allowSwipeToNext && a.params.grabCursor && a.setGrabCursor()
            };
            a.unlockSwipes = function () {
                a.params.allowSwipeToNext = a.params.allowSwipeToPrev = !0;
                a.params.grabCursor && a.setGrabCursor()
            };
            a.setGrabCursor = function (d) {
                a.container[0].style.cursor = "move";
                a.container[0].style.cursor = d ? "-webkit-grabbing" : "-webkit-grab";
                a.container[0].style.cursor = d ? "-moz-grabbin" : "-moz-grab";
                a.container[0].style.cursor =
                    d ? "grabbing" : "grab"
            };
            a.unsetGrabCursor = function () {
                a.container[0].style.cursor = ""
            };
            a.params.grabCursor && a.setGrabCursor();
            a.imagesToLoad = [];
            a.imagesLoaded = 0;
            a.loadImage = function (a, b, c, f, e, l) {
                function d() {
                    l && l()
                }

                var h;
                a.complete && e ? d() : b ? (h = new window.Image, h.onload = d, h.onerror = d, f && (h.sizes = f), c && (h.srcset = c), b && (h.src = b)) : d()
            };
            a.preloadImages = function () {
                function d() {
                    void 0 !== a && null !== a && a && (void 0 !== a.imagesLoaded && a.imagesLoaded++, a.imagesLoaded === a.imagesToLoad.length && (a.params.updateOnImagesReady &&
                    a.update(), a.emit("onImagesReady", a)))
                }

                a.imagesToLoad = a.container.find("img");
                for (var b = 0; b < a.imagesToLoad.length; b++) a.loadImage(a.imagesToLoad[b], a.imagesToLoad[b].currentSrc || a.imagesToLoad[b].getAttribute("src"), a.imagesToLoad[b].srcset || a.imagesToLoad[b].getAttribute("srcset"), a.imagesToLoad[b].sizes || a.imagesToLoad[b].getAttribute("sizes"), !0, d)
            };
            a.autoplayTimeoutId = void 0;
            a.autoplaying = !1;
            a.autoplayPaused = !1;
            a.startAutoplay = function () {
                return void 0 === a.autoplayTimeoutId && !!a.params.autoplay &&
                    !a.autoplaying && (a.autoplaying = !0, a.emit("onAutoplayStart", a), void c())
            };
            a.stopAutoplay = function (d) {
                a.autoplayTimeoutId && (a.autoplayTimeoutId && clearTimeout(a.autoplayTimeoutId), a.autoplaying = !1, a.autoplayTimeoutId = void 0, a.emit("onAutoplayStop", a))
            };
            a.pauseAutoplay = function (d) {
                a.autoplayPaused || (a.autoplayTimeoutId && clearTimeout(a.autoplayTimeoutId), a.autoplayPaused = !0, 0 === d ? (a.autoplayPaused = !1, c()) : a.wrapper.transitionEnd(function () {
                    a && (a.autoplayPaused = !1, a.autoplaying ? c() : a.stopAutoplay())
                }))
            };
            a.minTranslate = function () {
                return -a.snapGrid[0]
            };
            a.maxTranslate = function () {
                return -a.snapGrid[a.snapGrid.length - 1]
            };
            a.updateAutoHeight = function () {
                var d, b = [], c = 0;
                if ("auto" !== a.params.slidesPerView && 1 < a.params.slidesPerView) for (d = 0; d < Math.ceil(a.params.slidesPerView); d++) {
                    var f = a.activeIndex + d;
                    if (f > a.slides.length) break;
                    b.push(a.slides.eq(f)[0])
                } else b.push(a.slides.eq(a.activeIndex)[0]);
                for (d = 0; d < b.length; d++) void 0 !== b[d] && (f = b[d].offsetHeight, c = f > c ? f : c);
                c && a.wrapper.css("height", c + "px")
            };
            a.updateContainerSize =
                function () {
                    var b = void 0 !== a.params.width ? a.params.width : a.container[0].clientWidth;
                    var h = void 0 !== a.params.height ? a.params.height : a.container[0].clientHeight;
                    0 === b && a.isHorizontal() || 0 === h && !a.isHorizontal() || (b = b - parseInt(a.container.css("padding-left"), 10) - parseInt(a.container.css("padding-right"), 10), h = h - parseInt(a.container.css("padding-top"), 10) - parseInt(a.container.css("padding-bottom"), 10), a.width = b, a.height = h, a.size = a.isHorizontal() ? a.width : a.height)
                };
            a.updateSlidesSize = function () {
                a.slides =
                    a.wrapper.children("." + a.params.slideClass);
                a.snapGrid = [];
                a.slidesGrid = [];
                a.slidesSizesGrid = [];
                var b, h = a.params.spaceBetween, c = -a.params.slidesOffsetBefore, f = 0, e = 0;
                if (void 0 !== a.size) {
                    "string" == typeof h && 0 <= h.indexOf("%") && (h = parseFloat(h.replace("%", "")) / 100 * a.size);
                    a.virtualSize = -h;
                    a.rtl ? a.slides.css({marginLeft: "", marginTop: ""}) : a.slides.css({
                        marginRight: "",
                        marginBottom: ""
                    });
                    var l;
                    1 < a.params.slidesPerColumn && (l = Math.floor(a.slides.length / a.params.slidesPerColumn) === a.slides.length / a.params.slidesPerColumn ?
                        a.slides.length : Math.ceil(a.slides.length / a.params.slidesPerColumn) * a.params.slidesPerColumn, "auto" !== a.params.slidesPerView && "row" === a.params.slidesPerColumnFill && (l = Math.max(l, a.params.slidesPerView * a.params.slidesPerColumn)));
                    var g = a.params.slidesPerColumn, n = l / g,
                        k = n - (a.params.slidesPerColumn * n - a.slides.length);
                    for (b = 0; b < a.slides.length; b++) {
                        var m = 0;
                        var q = a.slides.eq(b);
                        if (1 < a.params.slidesPerColumn) {
                            var p, t, u;
                            "column" === a.params.slidesPerColumnFill ? (t = Math.floor(b / g), u = b - t * g, (t > k || t === k && u === g -
                                1) && ++u >= g && (u = 0, t++), p = t + u * l / g, q.css({
                                "-webkit-box-ordinal-group": p,
                                "-moz-box-ordinal-group": p,
                                "-ms-flex-order": p,
                                "-webkit-order": p,
                                order: p
                            })) : (u = Math.floor(b / n), t = b - u * n);
                            q.css("margin-" + (a.isHorizontal() ? "top" : "left"), 0 !== u && a.params.spaceBetween && a.params.spaceBetween + "px").attr("data-rplgsw-column", t).attr("data-rplgsw-row", u)
                        }
                        "none" !== q.css("display") && ("auto" === a.params.slidesPerView ? (m = a.isHorizontal() ? q.outerWidth(!0) : q.outerHeight(!0), a.params.roundLengths && (m = Math.floor(m))) : (m = (a.size -
                            (a.params.slidesPerView - 1) * h) / a.params.slidesPerView, a.params.roundLengths && (m = Math.floor(m)), a.isHorizontal() ? a.slides[b].style.width = m + "px" : a.slides[b].style.height = m + "px"), a.slides[b].rplgswSlideSize = m, a.slidesSizesGrid.push(m), a.params.centeredSlides ? (c = c + m / 2 + f / 2 + h, 0 === f && 0 !== b && (c = c - a.size / 2 - h), 0 === b && (c = c - a.size / 2 - h), .001 > Math.abs(c) && (c = 0), 0 == e % a.params.slidesPerGroup && a.snapGrid.push(c), a.slidesGrid.push(c)) : (0 == e % a.params.slidesPerGroup && a.snapGrid.push(c), a.slidesGrid.push(c), c = c + m + h), a.virtualSize +=
                            m + h, f = m, e++)
                    }
                    a.virtualSize = Math.max(a.virtualSize, a.size) + a.params.slidesOffsetAfter;
                    if (a.rtl && a.wrongRTL && ("slide" === a.params.effect || "coverflow" === a.params.effect) && a.wrapper.css({width: a.virtualSize + a.params.spaceBetween + "px"}), a.support.flexbox && !a.params.setWrapperSize || (a.isHorizontal() ? a.wrapper.css({width: a.virtualSize + a.params.spaceBetween + "px"}) : a.wrapper.css({height: a.virtualSize + a.params.spaceBetween + "px"})), 1 < a.params.slidesPerColumn && (a.virtualSize = (m + a.params.spaceBetween) * l, a.virtualSize =
                            Math.ceil(a.virtualSize / a.params.slidesPerColumn) - a.params.spaceBetween, a.isHorizontal() ? a.wrapper.css({width: a.virtualSize + a.params.spaceBetween + "px"}) : a.wrapper.css({height: a.virtualSize + a.params.spaceBetween + "px"}), a.params.centeredSlides)) {
                        c = [];
                        for (b = 0; b < a.snapGrid.length; b++) a.snapGrid[b] < a.virtualSize + a.snapGrid[0] && c.push(a.snapGrid[b]);
                        a.snapGrid = c
                    }
                    if (!a.params.centeredSlides) {
                        c = [];
                        for (b = 0; b < a.snapGrid.length; b++) a.snapGrid[b] <= a.virtualSize - a.size && c.push(a.snapGrid[b]);
                        a.snapGrid = c;
                        1 < Math.floor(a.virtualSize -
                            a.size) - Math.floor(a.snapGrid[a.snapGrid.length - 1]) && a.snapGrid.push(a.virtualSize - a.size)
                    }
                    0 === a.snapGrid.length && (a.snapGrid = [0]);
                    0 !== a.params.spaceBetween && (a.isHorizontal() ? a.rtl ? a.slides.css({marginLeft: h + "px"}) : a.slides.css({marginRight: h + "px"}) : a.slides.css({marginBottom: h + "px"}));
                    a.params.watchSlidesProgress && a.updateSlidesOffset()
                }
            };
            a.updateSlidesOffset = function () {
                for (var b = 0; b < a.slides.length; b++) a.slides[b].rplgswSlideOffset = a.isHorizontal() ? a.slides[b].offsetLeft : a.slides[b].offsetTop
            };
            a.currentSlidesPerView = function () {
                var b, h = 1;
                if (a.params.centeredSlides) {
                    var c, f = a.slides[a.activeIndex].rplgswSlideSize;
                    for (b = a.activeIndex + 1; b < a.slides.length; b++) a.slides[b] && !c && (f += a.slides[b].rplgswSlideSize, h++, f > a.size && (c = !0));
                    for (b = a.activeIndex - 1; 0 <= b; b--) a.slides[b] && !c && (f += a.slides[b].rplgswSlideSize, h++, f > a.size && (c = !0))
                } else for (b = a.activeIndex + 1; b < a.slides.length; b++) a.slidesGrid[b] - a.slidesGrid[a.activeIndex] < a.size && h++;
                return h
            };
            a.updateSlidesProgress = function (b) {
                if (void 0 === b &&
                    (b = a.translate || 0), 0 !== a.slides.length) {
                    void 0 === a.slides[0].rplgswSlideOffset && a.updateSlidesOffset();
                    var d = -b;
                    a.rtl && (d = b);
                    a.slides.removeClass(a.params.slideVisibleClass);
                    for (b = 0; b < a.slides.length; b++) {
                        var c = a.slides[b],
                            f = (d + (a.params.centeredSlides ? a.minTranslate() : 0) - c.rplgswSlideOffset) / (c.rplgswSlideSize + a.params.spaceBetween);
                        if (a.params.watchSlidesVisibility) {
                            var e = -(d - c.rplgswSlideOffset), l = e + a.slidesSizesGrid[b];
                            (0 <= e && e < a.size || 0 < l && l <= a.size || 0 >= e && l >= a.size) && a.slides.eq(b).addClass(a.params.slideVisibleClass)
                        }
                        c.progress =
                            a.rtl ? -f : f
                    }
                }
            };
            a.updateProgress = function (b) {
                void 0 === b && (b = a.translate || 0);
                var d = a.maxTranslate() - a.minTranslate(), c = a.isBeginning, f = a.isEnd;
                0 === d ? (a.progress = 0, a.isBeginning = a.isEnd = !0) : (a.progress = (b - a.minTranslate()) / d, a.isBeginning = 0 >= a.progress, a.isEnd = 1 <= a.progress);
                a.isBeginning && !c && a.emit("onReachBeginning", a);
                a.isEnd && !f && a.emit("onReachEnd", a);
                a.params.watchSlidesProgress && a.updateSlidesProgress(b);
                a.emit("onProgress", a, a.progress)
            };
            a.updateActiveIndex = function () {
                var b, h, c = a.rtl ? a.translate :
                    -a.translate;
                for (h = 0; h < a.slidesGrid.length; h++) void 0 !== a.slidesGrid[h + 1] ? c >= a.slidesGrid[h] && c < a.slidesGrid[h + 1] - (a.slidesGrid[h + 1] - a.slidesGrid[h]) / 2 ? b = h : c >= a.slidesGrid[h] && c < a.slidesGrid[h + 1] && (b = h + 1) : c >= a.slidesGrid[h] && (b = h);
                a.params.normalizeSlideIndex && (0 > b || void 0 === b) && (b = 0);
                h = Math.floor(b / a.params.slidesPerGroup);
                h >= a.snapGrid.length && (h = a.snapGrid.length - 1);
                b !== a.activeIndex && (a.snapIndex = h, a.previousIndex = a.activeIndex, a.activeIndex = b, a.updateClasses(), a.updateRealIndex())
            };
            a.updateRealIndex =
                function () {
                    a.realIndex = parseInt(a.slides.eq(a.activeIndex).attr("data-rplgsw-slide-index") || a.activeIndex, 10)
                };
            a.updateClasses = function () {
                a.slides.removeClass(a.params.slideActiveClass + " " + a.params.slideNextClass + " " + a.params.slidePrevClass + " " + a.params.slideDuplicateActiveClass + " " + a.params.slideDuplicateNextClass + " " + a.params.slideDuplicatePrevClass);
                var d = a.slides.eq(a.activeIndex);
                d.addClass(a.params.slideActiveClass);
                m.loop && (d.hasClass(a.params.slideDuplicateClass) ? a.wrapper.children("." + a.params.slideClass +
                    ":not(." + a.params.slideDuplicateClass + ')[data-rplgsw-slide-index="' + a.realIndex + '"]').addClass(a.params.slideDuplicateActiveClass) : a.wrapper.children("." + a.params.slideClass + "." + a.params.slideDuplicateClass + '[data-rplgsw-slide-index="' + a.realIndex + '"]').addClass(a.params.slideDuplicateActiveClass));
                var h = d.next("." + a.params.slideClass).addClass(a.params.slideNextClass);
                a.params.loop && 0 === h.length && (h = a.slides.eq(0), h.addClass(a.params.slideNextClass));
                d = d.prev("." + a.params.slideClass).addClass(a.params.slidePrevClass);
                if (a.params.loop && 0 === d.length && (d = a.slides.eq(-1), d.addClass(a.params.slidePrevClass)), m.loop && (h.hasClass(a.params.slideDuplicateClass) ? a.wrapper.children("." + a.params.slideClass + ":not(." + a.params.slideDuplicateClass + ')[data-rplgsw-slide-index="' + h.attr("data-rplgsw-slide-index") + '"]').addClass(a.params.slideDuplicateNextClass) : a.wrapper.children("." + a.params.slideClass + "." + a.params.slideDuplicateClass + '[data-rplgsw-slide-index="' + h.attr("data-rplgsw-slide-index") + '"]').addClass(a.params.slideDuplicateNextClass),
                        d.hasClass(a.params.slideDuplicateClass) ? a.wrapper.children("." + a.params.slideClass + ":not(." + a.params.slideDuplicateClass + ')[data-rplgsw-slide-index="' + d.attr("data-rplgsw-slide-index") + '"]').addClass(a.params.slideDuplicatePrevClass) : a.wrapper.children("." + a.params.slideClass + "." + a.params.slideDuplicateClass + '[data-rplgsw-slide-index="' + d.attr("data-rplgsw-slide-index") + '"]').addClass(a.params.slideDuplicatePrevClass)), a.paginationContainer && 0 < a.paginationContainer.length) {
                    var c;
                    h = a.params.loop ?
                        Math.ceil((a.slides.length - 2 * a.loopedSlides) / a.params.slidesPerGroup) : a.snapGrid.length;
                    if (a.params.loop ? (c = Math.ceil((a.activeIndex - a.loopedSlides) / a.params.slidesPerGroup), c > a.slides.length - 1 - 2 * a.loopedSlides && (c -= a.slides.length - 2 * a.loopedSlides), c > h - 1 && (c -= h), 0 > c && "bullets" !== a.params.paginationType && (c = h + c)) : c = void 0 !== a.snapIndex ? a.snapIndex : a.activeIndex || 0, "bullets" === a.params.paginationType && a.bullets && 0 < a.bullets.length && (a.bullets.removeClass(a.params.bulletActiveClass), 1 < a.paginationContainer.length ?
                            a.bullets.each(function () {
                                b(this).index() === c && b(this).addClass(a.params.bulletActiveClass)
                            }) : a.bullets.eq(c).addClass(a.params.bulletActiveClass)), "fraction" === a.params.paginationType && (a.paginationContainer.find("." + a.params.paginationCurrentClass).text(c + 1), a.paginationContainer.find("." + a.params.paginationTotalClass).text(h)), "progress" === a.params.paginationType) {
                        var f = d = (c + 1) / h, e = 1;
                        a.isHorizontal() || (e = d, f = 1);
                        a.paginationContainer.find("." + a.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" +
                            f + ") scaleY(" + e + ")").transition(a.params.speed)
                    }
                    "custom" === a.params.paginationType && a.params.paginationCustomRender && (a.paginationContainer.html(a.params.paginationCustomRender(a, c + 1, h)), a.emit("onPaginationRendered", a, a.paginationContainer[0]))
                }
                a.params.loop || (a.params.prevButton && a.prevButton && 0 < a.prevButton.length && (a.isBeginning ? (a.prevButton.addClass(a.params.buttonDisabledClass), a.params.a11y && a.a11y && a.a11y.disable(a.prevButton)) : (a.prevButton.removeClass(a.params.buttonDisabledClass), a.params.a11y &&
                a.a11y && a.a11y.enable(a.prevButton))), a.params.nextButton && a.nextButton && 0 < a.nextButton.length && (a.isEnd ? (a.nextButton.addClass(a.params.buttonDisabledClass), a.params.a11y && a.a11y && a.a11y.disable(a.nextButton)) : (a.nextButton.removeClass(a.params.buttonDisabledClass), a.params.a11y && a.a11y && a.a11y.enable(a.nextButton))))
            };
            a.updatePagination = function () {
                if (a.params.pagination && a.paginationContainer && 0 < a.paginationContainer.length) {
                    var b = "";
                    if ("bullets" === a.params.paginationType) {
                        for (var h = a.params.loop ?
                            Math.ceil((a.slides.length - 2 * a.loopedSlides) / a.params.slidesPerGroup) : a.snapGrid.length, c = 0; c < h; c++) b += a.params.paginationBulletRender ? a.params.paginationBulletRender(a, c, a.params.bulletClass) : "<" + a.params.paginationElement + ' class="' + a.params.bulletClass + '"></' + a.params.paginationElement + ">";
                        a.paginationContainer.html(b);
                        a.bullets = a.paginationContainer.find("." + a.params.bulletClass);
                        a.params.paginationClickable && a.params.a11y && a.a11y && a.a11y.initPagination()
                    }
                    "fraction" === a.params.paginationType &&
                    (b = a.params.paginationFractionRender ? a.params.paginationFractionRender(a, a.params.paginationCurrentClass, a.params.paginationTotalClass) : '<span class="' + a.params.paginationCurrentClass + '"></span> / <span class="' + a.params.paginationTotalClass + '"></span>', a.paginationContainer.html(b));
                    "progress" === a.params.paginationType && (b = a.params.paginationProgressRender ? a.params.paginationProgressRender(a, a.params.paginationProgressbarClass) : '<span class="' + a.params.paginationProgressbarClass + '"></span>', a.paginationContainer.html(b));
                    "custom" !== a.params.paginationType && a.emit("onPaginationRendered", a, a.paginationContainer[0])
                }
            };
            a.update = function (b) {
                function d() {
                    a.rtl;
                    a.translate;
                    c = Math.min(Math.max(a.translate, a.maxTranslate()), a.minTranslate());
                    a.setWrapperTranslate(c);
                    a.updateActiveIndex();
                    a.updateClasses()
                }

                if (a) {
                    a.updateContainerSize();
                    a.updateSlidesSize();
                    a.updateProgress();
                    a.updatePagination();
                    a.updateClasses();
                    a.params.scrollbar && a.scrollbar && a.scrollbar.set();
                    var c;
                    b ? (a.controller && a.controller.spline && (a.controller.spline =
                        void 0), a.params.freeMode ? (d(), a.params.autoHeight && a.updateAutoHeight()) : (("auto" === a.params.slidesPerView || 1 < a.params.slidesPerView) && a.isEnd && !a.params.centeredSlides ? a.slideTo(a.slides.length - 1, 0, !1, !0) : a.slideTo(a.activeIndex, 0, !1, !0)) || d()) : a.params.autoHeight && a.updateAutoHeight()
                }
            };
            a.onResize = function (b) {
                a.params.onBeforeResize && a.params.onBeforeResize(a);
                a.params.breakpoints && a.setBreakpoint();
                var d = a.params.allowSwipeToPrev, c = a.params.allowSwipeToNext;
                a.params.allowSwipeToPrev = a.params.allowSwipeToNext =
                    !0;
                a.updateContainerSize();
                a.updateSlidesSize();
                ("auto" === a.params.slidesPerView || a.params.freeMode || b) && a.updatePagination();
                a.params.scrollbar && a.scrollbar && a.scrollbar.set();
                a.controller && a.controller.spline && (a.controller.spline = void 0);
                b = !1;
                if (a.params.freeMode) {
                    var f = Math.min(Math.max(a.translate, a.maxTranslate()), a.minTranslate());
                    a.setWrapperTranslate(f);
                    a.updateActiveIndex();
                    a.updateClasses();
                    a.params.autoHeight && a.updateAutoHeight()
                } else a.updateClasses(), b = ("auto" === a.params.slidesPerView ||
                    1 < a.params.slidesPerView) && a.isEnd && !a.params.centeredSlides ? a.slideTo(a.slides.length - 1, 0, !1, !0) : a.slideTo(a.activeIndex, 0, !1, !0);
                a.params.lazyLoading && !b && a.lazy && a.lazy.load();
                a.params.allowSwipeToPrev = d;
                a.params.allowSwipeToNext = c;
                a.params.onAfterResize && a.params.onAfterResize(a)
            };
            a.touchEventsDesktop = {start: "mousedown", move: "mousemove", end: "mouseup"};
            window.navigator.pointerEnabled ? a.touchEventsDesktop = {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            } : window.navigator.msPointerEnabled &&
                (a.touchEventsDesktop = {start: "MSPointerDown", move: "MSPointerMove", end: "MSPointerUp"});
            a.touchEvents = {
                start: a.support.touch || !a.params.simulateTouch ? "touchstart" : a.touchEventsDesktop.start,
                move: a.support.touch || !a.params.simulateTouch ? "touchmove" : a.touchEventsDesktop.move,
                end: a.support.touch || !a.params.simulateTouch ? "touchend" : a.touchEventsDesktop.end
            };
            (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === a.params.touchEventsTarget ? a.container : a.wrapper).addClass("rplgsw-wp8-" +
                a.params.direction);
            a.initEvents = function (b) {
                var d = b ? "off" : "on";
                b = b ? "removeEventListener" : "addEventListener";
                var c = "container" === a.params.touchEventsTarget ? a.container[0] : a.wrapper[0],
                    f = a.support.touch ? c : document, e = !!a.params.nested;
                a.browser.ie ? (c[b](a.touchEvents.start, a.onTouchStart, !1), f[b](a.touchEvents.move, a.onTouchMove, e), f[b](a.touchEvents.end, a.onTouchEnd, !1)) : (a.support.touch && (f = !("touchstart" !== a.touchEvents.start || !a.support.passiveListener || !a.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }, c[b](a.touchEvents.start, a.onTouchStart, f), c[b](a.touchEvents.move, a.onTouchMove, e), c[b](a.touchEvents.end, a.onTouchEnd, f)), (m.simulateTouch && !a.device.ios && !a.device.android || m.simulateTouch && !a.support.touch && a.device.ios) && (c[b]("mousedown", a.onTouchStart, !1), document[b]("mousemove", a.onTouchMove, e), document[b]("mouseup", a.onTouchEnd, !1)));
                window[b]("resize", a.onResize);
                a.params.nextButton && a.nextButton && 0 < a.nextButton.length && (a.nextButton[d]("click", a.onClickNext), a.params.a11y &&
                a.a11y && a.nextButton[d]("keydown", a.a11y.onEnterKey));
                a.params.prevButton && a.prevButton && 0 < a.prevButton.length && (a.prevButton[d]("click", a.onClickPrev), a.params.a11y && a.a11y && a.prevButton[d]("keydown", a.a11y.onEnterKey));
                a.params.pagination && a.params.paginationClickable && (a.paginationContainer[d]("click", "." + a.params.bulletClass, a.onClickIndex), a.params.a11y && a.a11y && a.paginationContainer[d]("keydown", "." + a.params.bulletClass, a.a11y.onEnterKey));
                (a.params.preventClicks || a.params.preventClicksPropagation) &&
                c[b]("click", a.preventClicks, !0)
            };
            a.attachEvents = function () {
                a.initEvents()
            };
            a.detachEvents = function () {
                a.initEvents(!0)
            };
            a.allowClick = !0;
            a.preventClicks = function (b) {
                a.allowClick || (a.params.preventClicks && b.preventDefault(), a.params.preventClicksPropagation && a.animating && (b.stopPropagation(), b.stopImmediatePropagation()))
            };
            a.onClickNext = function (b) {
                b.preventDefault();
                a.isEnd && !a.params.loop || a.slideNext()
            };
            a.onClickPrev = function (b) {
                b.preventDefault();
                a.isBeginning && !a.params.loop || a.slidePrev()
            };
            a.onClickIndex =
                function (d) {
                    d.preventDefault();
                    d = b(this).index() * a.params.slidesPerGroup;
                    a.params.loop && (d += a.loopedSlides);
                    a.slideTo(d)
                };
            a.updateClickedSlide = function (d) {
                d = f(d, "." + a.params.slideClass);
                var h = !1;
                if (d) for (var c = 0; c < a.slides.length; c++) a.slides[c] === d && (h = !0);
                if (!d || !h) return a.clickedSlide = void 0, void(a.clickedIndex = void 0);
                if (a.clickedSlide = d, a.clickedIndex = b(d).index(), a.params.slideToClickedSlide && void 0 !== a.clickedIndex && a.clickedIndex !== a.activeIndex) {
                    var e = a.clickedIndex;
                    h = "auto" === a.params.slidesPerView ?
                        a.currentSlidesPerView() : a.params.slidesPerView;
                    a.params.loop ? a.animating || (d = parseInt(b(a.clickedSlide).attr("data-rplgsw-slide-index"), 10), a.params.centeredSlides ? e < a.loopedSlides - h / 2 || e > a.slides.length - a.loopedSlides + h / 2 ? (a.fixLoop(), e = a.wrapper.children("." + a.params.slideClass + '[data-rplgsw-slide-index="' + d + '"]:not(.' + a.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function () {
                        a.slideTo(e)
                    }, 0)) : a.slideTo(e) : e > a.slides.length - h ? (a.fixLoop(), e = a.wrapper.children("." + a.params.slideClass +
                        '[data-rplgsw-slide-index="' + d + '"]:not(.' + a.params.slideDuplicateClass + ")").eq(0).index(), setTimeout(function () {
                        a.slideTo(e)
                    }, 0)) : a.slideTo(e)) : a.slideTo(e)
                }
            };
            var C, D, J, K, H, z, B, L, I, M, Q = Date.now(), F = [];
            a.animating = !1;
            a.touches = {startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0};
            var N, O;
            a.onTouchStart = function (d) {
                if (d.originalEvent && (d = d.originalEvent), (N = "touchstart" === d.type) || !("which" in d) || 3 !== d.which) {
                    if (a.params.noSwiping && f(d, "." + a.params.noSwipingClass)) return void(a.allowClick = !0);
                    if (!a.params.swipeHandler ||
                        f(d, a.params.swipeHandler)) {
                        var h = a.touches.currentX = "touchstart" === d.type ? d.targetTouches[0].pageX : d.pageX,
                            c = a.touches.currentY = "touchstart" === d.type ? d.targetTouches[0].pageY : d.pageY;
                        if (!(a.device.ios && a.params.iOSEdgeSwipeDetection && h <= a.params.iOSEdgeSwipeThreshold)) {
                            if (C = !0, D = !1, J = !0, H = void 0, O = void 0, a.touches.startX = h, a.touches.startY = c, K = Date.now(), a.allowClick = !0, a.updateContainerSize(), a.swipeDirection = void 0, 0 < a.params.threshold && (L = !1), "touchstart" !== d.type) h = !0, b(d.target).is("input, select, textarea, button, video") &&
                            (h = !1), document.activeElement && b(document.activeElement).is("input, select, textarea, button, video") && document.activeElement.blur(), h && d.preventDefault();
                            a.emit("onTouchStart", a, d)
                        }
                    }
                }
            };
            a.onTouchMove = function (d) {
                if (d.originalEvent && (d = d.originalEvent), !N || "mousemove" !== d.type) {
                    if (d.preventedByNestedRplgsw) return a.touches.startX = "touchmove" === d.type ? d.targetTouches[0].pageX : d.pageX, void(a.touches.startY = "touchmove" === d.type ? d.targetTouches[0].pageY : d.pageY);
                    if (a.params.onlyExternal) return a.allowClick =
                        !1, void(C && (a.touches.startX = a.touches.currentX = "touchmove" === d.type ? d.targetTouches[0].pageX : d.pageX, a.touches.startY = a.touches.currentY = "touchmove" === d.type ? d.targetTouches[0].pageY : d.pageY, K = Date.now()));
                    if (N && a.params.touchReleaseOnEdges && !a.params.loop) if (a.isHorizontal()) {
                        if (a.touches.currentX < a.touches.startX && a.translate <= a.maxTranslate() || a.touches.currentX > a.touches.startX && a.translate >= a.minTranslate()) return
                    } else if (a.touches.currentY < a.touches.startY && a.translate <= a.maxTranslate() || a.touches.currentY >
                        a.touches.startY && a.translate >= a.minTranslate()) return;
                    if (N && document.activeElement && d.target === document.activeElement && b(d.target).is("input, select, textarea, button, video")) return D = !0, void(a.allowClick = !1);
                    if (J && a.emit("onTouchMove", a, d), !(d.targetTouches && 1 < d.targetTouches.length)) {
                        if (a.touches.currentX = "touchmove" === d.type ? d.targetTouches[0].pageX : d.pageX, a.touches.currentY = "touchmove" === d.type ? d.targetTouches[0].pageY : d.pageY, void 0 === H) {
                            var h;
                            a.isHorizontal() && a.touches.currentY === a.touches.startY ||
                            !a.isHorizontal() && a.touches.currentX === a.touches.startX ? H = !1 : (h = 180 * Math.atan2(Math.abs(a.touches.currentY - a.touches.startY), Math.abs(a.touches.currentX - a.touches.startX)) / Math.PI, H = a.isHorizontal() ? h > a.params.touchAngle : 90 - h > a.params.touchAngle)
                        }
                        if (H && a.emit("onTouchMoveOpposite", a, d), void 0 === O && (a.touches.currentX === a.touches.startX && a.touches.currentY === a.touches.startY || (O = !0)), C) {
                            if (H) return void(C = !1);
                            if (O) {
                                a.allowClick = !1;
                                a.emit("onSliderMove", a, d);
                                d.preventDefault();
                                a.params.touchMoveStopPropagation &&
                                !a.params.nested && d.stopPropagation();
                                D || (m.loop && a.fixLoop(), B = a.getWrapperTranslate(), a.setWrapperTransition(0), a.animating && a.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"), a.params.autoplay && a.autoplaying && (a.params.autoplayDisableOnInteraction ? a.stopAutoplay() : a.pauseAutoplay()), M = !1, !a.params.grabCursor || !0 !== a.params.allowSwipeToNext && !0 !== a.params.allowSwipeToPrev || a.setGrabCursor(!0));
                                D = !0;
                                h = a.touches.diff = a.isHorizontal() ? a.touches.currentX -
                                    a.touches.startX : a.touches.currentY - a.touches.startY;
                                h *= a.params.touchRatio;
                                a.rtl && (h = -h);
                                a.swipeDirection = 0 < h ? "prev" : "next";
                                z = h + B;
                                var c = !0;
                                if (0 < h && z > a.minTranslate() ? (c = !1, a.params.resistance && (z = a.minTranslate() - 1 + Math.pow(-a.minTranslate() + B + h, a.params.resistanceRatio))) : 0 > h && z < a.maxTranslate() && (c = !1, a.params.resistance && (z = a.maxTranslate() + 1 - Math.pow(a.maxTranslate() - B - h, a.params.resistanceRatio))), c && (d.preventedByNestedRplgsw = !0), !a.params.allowSwipeToNext && "next" === a.swipeDirection && z < B &&
                                    (z = B), !a.params.allowSwipeToPrev && "prev" === a.swipeDirection && z > B && (z = B), 0 < a.params.threshold) {
                                    if (!(Math.abs(h) > a.params.threshold || L)) return void(z = B);
                                    if (!L) return L = !0, a.touches.startX = a.touches.currentX, a.touches.startY = a.touches.currentY, z = B, void(a.touches.diff = a.isHorizontal() ? a.touches.currentX - a.touches.startX : a.touches.currentY - a.touches.startY)
                                }
                                a.params.followFinger && ((a.params.freeMode || a.params.watchSlidesProgress) && a.updateActiveIndex(), a.params.freeMode && (0 === F.length && F.push({
                                    position: a.touches[a.isHorizontal() ?
                                        "startX" : "startY"], time: K
                                }), F.push({
                                    position: a.touches[a.isHorizontal() ? "currentX" : "currentY"],
                                    time: (new window.Date).getTime()
                                })), a.updateProgress(z), a.setWrapperTranslate(z))
                            }
                        }
                    }
                }
            };
            a.onTouchEnd = function (d) {
                if (d.originalEvent && (d = d.originalEvent), J && a.emit("onTouchEnd", a, d), J = !1, C) {
                    a.params.grabCursor && D && C && (!0 === a.params.allowSwipeToNext || !0 === a.params.allowSwipeToPrev) && a.setGrabCursor(!1);
                    var h = Date.now(), c = h - K;
                    if (a.allowClick && (a.updateClickedSlide(d), a.emit("onTap", a, d), 300 > c && 300 < h - Q && (I &&
                        clearTimeout(I), I = setTimeout(function () {
                            a && (a.params.paginationHide && 0 < a.paginationContainer.length && !b(d.target).hasClass(a.params.bulletClass) && a.paginationContainer.toggleClass(a.params.paginationHiddenClass), a.emit("onClick", a, d))
                        }, 300)), 300 > c && 300 > h - Q && (I && clearTimeout(I), a.emit("onDoubleTap", a, d))), Q = Date.now(), setTimeout(function () {
                            a && (a.allowClick = !0)
                        }, 0), !C || !D || !a.swipeDirection || 0 === a.touches.diff || z === B) return void(C = D = !1);
                    C = D = !1;
                    if (h = a.params.followFinger ? a.rtl ? a.translate : -a.translate :
                            -z, a.params.freeMode) {
                        if (h < -a.minTranslate()) return void a.slideTo(a.activeIndex);
                        if (h > -a.maxTranslate()) return void(a.slides.length < a.snapGrid.length ? a.slideTo(a.snapGrid.length - 1) : a.slideTo(a.slides.length - 1));
                        if (a.params.freeModeMomentum) {
                            if (1 < F.length) {
                                h = F.pop();
                                var f = F.pop(), e = h.time - f.time;
                                a.velocity = (h.position - f.position) / e;
                                a.velocity /= 2;
                                Math.abs(a.velocity) < a.params.freeModeMinimumVelocity && (a.velocity = 0);
                                (150 < e || 300 < (new window.Date).getTime() - h.time) && (a.velocity = 0)
                            } else a.velocity = 0;
                            a.velocity *=
                                a.params.freeModeMomentumVelocityRatio;
                            F.length = 0;
                            h = 1E3 * a.params.freeModeMomentumRatio;
                            f = a.translate + a.velocity * h;
                            a.rtl && (f = -f);
                            var l;
                            e = !1;
                            var g = 20 * Math.abs(a.velocity) * a.params.freeModeMomentumBounceRatio;
                            if (f < a.maxTranslate()) a.params.freeModeMomentumBounce ? (f + a.maxTranslate() < -g && (f = a.maxTranslate() - g), l = a.maxTranslate(), e = !0, M = !0) : f = a.maxTranslate(); else if (f > a.minTranslate()) a.params.freeModeMomentumBounce ? (f - a.minTranslate() > g && (f = a.minTranslate() + g), l = a.minTranslate(), e = !0, M = !0) : f = a.minTranslate();
                            else if (a.params.freeModeSticky) {
                                for (g = g = 0; g < a.snapGrid.length; g += 1) if (a.snapGrid[g] > -f) {
                                    var n = g;
                                    break
                                }
                                f = Math.abs(a.snapGrid[n] - f) < Math.abs(a.snapGrid[n - 1] - f) || "next" === a.swipeDirection ? a.snapGrid[n] : a.snapGrid[n - 1];
                                a.rtl || (f = -f)
                            }
                            if (0 !== a.velocity) h = a.rtl ? Math.abs((-f - a.translate) / a.velocity) : Math.abs((f - a.translate) / a.velocity); else if (a.params.freeModeSticky) return void a.slideReset();
                            a.params.freeModeMomentumBounce && e ? (a.updateProgress(l), a.setWrapperTransition(h), a.setWrapperTranslate(f), a.onTransitionStart(),
                                a.animating = !0, a.wrapper.transitionEnd(function () {
                                a && M && (a.emit("onMomentumBounce", a), a.setWrapperTransition(a.params.speed), a.setWrapperTranslate(l), a.wrapper.transitionEnd(function () {
                                    a && a.onTransitionEnd()
                                }))
                            })) : a.velocity ? (a.updateProgress(f), a.setWrapperTransition(h), a.setWrapperTranslate(f), a.onTransitionStart(), a.animating || (a.animating = !0, a.wrapper.transitionEnd(function () {
                                a && a.onTransitionEnd()
                            }))) : a.updateProgress(f);
                            a.updateActiveIndex()
                        }
                        return void((!a.params.freeModeMomentum || c >= a.params.longSwipesMs) &&
                            (a.updateProgress(), a.updateActiveIndex()))
                    }
                    n = 0;
                    e = a.slidesSizesGrid[0];
                    for (f = 0; f < a.slidesGrid.length; f += a.params.slidesPerGroup) void 0 !== a.slidesGrid[f + a.params.slidesPerGroup] ? h >= a.slidesGrid[f] && h < a.slidesGrid[f + a.params.slidesPerGroup] && (n = f, e = a.slidesGrid[f + a.params.slidesPerGroup] - a.slidesGrid[f]) : h >= a.slidesGrid[f] && (n = f, e = a.slidesGrid[a.slidesGrid.length - 1] - a.slidesGrid[a.slidesGrid.length - 2]);
                    h = (h - a.slidesGrid[n]) / e;
                    if (c > a.params.longSwipesMs) {
                        if (!a.params.longSwipes) return void a.slideTo(a.activeIndex);
                        "next" === a.swipeDirection && (h >= a.params.longSwipesRatio ? a.slideTo(n + a.params.slidesPerGroup) : a.slideTo(n));
                        "prev" === a.swipeDirection && (h > 1 - a.params.longSwipesRatio ? a.slideTo(n + a.params.slidesPerGroup) : a.slideTo(n))
                    } else {
                        if (!a.params.shortSwipes) return void a.slideTo(a.activeIndex);
                        "next" === a.swipeDirection && a.slideTo(n + a.params.slidesPerGroup);
                        "prev" === a.swipeDirection && a.slideTo(n)
                    }
                }
            };
            a._slideTo = function (b, h) {
                return a.slideTo(b, h, !0, !0)
            };
            a.slideTo = function (b, h, c, f) {
                void 0 === c && (c = !0);
                void 0 === b &&
                (b = 0);
                0 > b && (b = 0);
                a.snapIndex = Math.floor(b / a.params.slidesPerGroup);
                a.snapIndex >= a.snapGrid.length && (a.snapIndex = a.snapGrid.length - 1);
                var d = -a.snapGrid[a.snapIndex];
                if (a.params.autoplay && a.autoplaying && (f || !a.params.autoplayDisableOnInteraction ? a.pauseAutoplay(h) : a.stopAutoplay()), a.updateProgress(d), a.params.normalizeSlideIndex) for (f = 0; f < a.slidesGrid.length; f++) -Math.floor(100 * d) >= Math.floor(100 * a.slidesGrid[f]) && (b = f);
                return !(!a.params.allowSwipeToNext && d < a.translate && d < a.minTranslate()) && !(!a.params.allowSwipeToPrev &&
                    d > a.translate && d > a.maxTranslate() && (a.activeIndex || 0) !== b) && (void 0 === h && (h = a.params.speed), a.previousIndex = a.activeIndex || 0, a.activeIndex = b, a.updateRealIndex(), a.rtl && -d === a.translate || !a.rtl && d === a.translate ? (a.params.autoHeight && a.updateAutoHeight(), a.updateClasses(), "slide" !== a.params.effect && a.setWrapperTranslate(d), !1) : (a.updateClasses(), a.onTransitionStart(c), 0 === h || a.browser.lteIE9 ? (a.setWrapperTranslate(d), a.setWrapperTransition(0), a.onTransitionEnd(c)) : (a.setWrapperTranslate(d), a.setWrapperTransition(h),
                a.animating || (a.animating = !0, a.wrapper.transitionEnd(function () {
                    a && a.onTransitionEnd(c)
                }))), !0))
            };
            a.onTransitionStart = function (b) {
                void 0 === b && (b = !0);
                a.params.autoHeight && a.updateAutoHeight();
                a.lazy && a.lazy.onTransitionStart();
                b && (a.emit("onTransitionStart", a), a.activeIndex !== a.previousIndex && (a.emit("onSlideChangeStart", a), a.activeIndex > a.previousIndex ? a.emit("onSlideNextStart", a) : a.emit("onSlidePrevStart", a)))
            };
            a.onTransitionEnd = function (b) {
                a.animating = !1;
                a.setWrapperTransition(0);
                void 0 === b && (b =
                    !0);
                a.lazy && a.lazy.onTransitionEnd();
                b && (a.emit("onTransitionEnd", a), a.activeIndex !== a.previousIndex && (a.emit("onSlideChangeEnd", a), a.activeIndex > a.previousIndex ? a.emit("onSlideNextEnd", a) : a.emit("onSlidePrevEnd", a)));
                a.params.history && a.history && a.history.setHistory(a.params.history, a.activeIndex);
                a.params.hashnav && a.hashnav && a.hashnav.setHash()
            };
            a.slideNext = function (b, h, c) {
                if (a.params.loop) {
                    if (a.animating) return !1;
                    a.fixLoop();
                    a.container[0].clientLeft
                }
                return a.slideTo(a.activeIndex + a.params.slidesPerGroup,
                    h, b, c)
            };
            a._slideNext = function (b) {
                return a.slideNext(!0, b, !0)
            };
            a.slidePrev = function (b, h, c) {
                if (a.params.loop) {
                    if (a.animating) return !1;
                    a.fixLoop();
                    a.container[0].clientLeft
                }
                return a.slideTo(a.activeIndex - 1, h, b, c)
            };
            a._slidePrev = function (b) {
                return a.slidePrev(!0, b, !0)
            };
            a.slideReset = function (b, h, c) {
                return a.slideTo(a.activeIndex, h, b)
            };
            a.disableTouchControl = function () {
                return a.params.onlyExternal = !0, !0
            };
            a.enableTouchControl = function () {
                return a.params.onlyExternal = !1, !0
            };
            a.setWrapperTransition = function (b,
                                               h) {
                a.wrapper.transition(b);
                "slide" !== a.params.effect && a.effects[a.params.effect] && a.effects[a.params.effect].setTransition(b);
                a.params.parallax && a.parallax && a.parallax.setTransition(b);
                a.params.scrollbar && a.scrollbar && a.scrollbar.setTransition(b);
                a.params.control && a.controller && a.controller.setTransition(b, h);
                a.emit("onSetTransition", a, b)
            };
            a.setWrapperTranslate = function (b, h, c) {
                var d = 0, f = 0;
                a.isHorizontal() ? d = a.rtl ? -b : b : f = b;
                a.params.roundLengths && (d = Math.floor(d), f = Math.floor(f));
                a.params.virtualTranslate ||
                (a.support.transforms3d ? a.wrapper.transform("translate3d(" + d + "px, " + f + "px, 0px)") : a.wrapper.transform("translate(" + d + "px, " + f + "px)"));
                a.translate = a.isHorizontal() ? d : f;
                d = a.maxTranslate() - a.minTranslate();
                (0 === d ? 0 : (b - a.minTranslate()) / d) !== a.progress && a.updateProgress(b);
                h && a.updateActiveIndex();
                "slide" !== a.params.effect && a.effects[a.params.effect] && a.effects[a.params.effect].setTranslate(a.translate);
                a.params.parallax && a.parallax && a.parallax.setTranslate(a.translate);
                a.params.scrollbar && a.scrollbar &&
                a.scrollbar.setTranslate(a.translate);
                a.params.control && a.controller && a.controller.setTranslate(a.translate, c);
                a.emit("onSetTranslate", a, a.translate)
            };
            a.getTranslate = function (b, h) {
                var d, c, f, e;
                return void 0 === h && (h = "x"), a.params.virtualTranslate ? a.rtl ? -a.translate : a.translate : (f = window.getComputedStyle(b, null), window.WebKitCSSMatrix ? (c = f.transform || f.webkitTransform, 6 < c.split(",").length && (c = c.split(", ").map(function (a) {
                    return a.replace(",", ".")
                }).join(", ")), e = new window.WebKitCSSMatrix("none" ===
                c ? "" : c)) : (e = f.MozTransform || f.OTransform || f.MsTransform || f.msTransform || f.transform || f.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), d = e.toString().split(",")), "x" === h && (c = window.WebKitCSSMatrix ? e.m41 : 16 === d.length ? parseFloat(d[12]) : parseFloat(d[4])), "y" === h && (c = window.WebKitCSSMatrix ? e.m42 : 16 === d.length ? parseFloat(d[13]) : parseFloat(d[5])), a.rtl && c && (c = -c), c || 0)
            };
            a.getWrapperTranslate = function (b) {
                return void 0 === b && (b = a.isHorizontal() ? "x" : "y"), a.getTranslate(a.wrapper[0],
                    b)
            };
            a.observers = [];
            a.initObservers = function () {
                if (a.params.observeParents) for (var b = a.container.parents(), h = 0; h < b.length; h++) l(b[h]);
                l(a.container[0], {childList: !1});
                l(a.wrapper[0], {attributes: !1})
            };
            a.disconnectObservers = function () {
                for (var b = 0; b < a.observers.length; b++) a.observers[b].disconnect();
                a.observers = []
            };
            a.createLoop = function () {
                a.wrapper.children("." + a.params.slideClass + "." + a.params.slideDuplicateClass).remove();
                var d = a.wrapper.children("." + a.params.slideClass);
                "auto" !== a.params.slidesPerView ||
                a.params.loopedSlides || (a.params.loopedSlides = d.length);
                a.loopedSlides = parseInt(a.params.loopedSlides || a.params.slidesPerView, 10);
                a.loopedSlides += a.params.loopAdditionalSlides;
                a.loopedSlides > d.length && (a.loopedSlides = d.length);
                var h, c = [], f = [];
                d.each(function (h, e) {
                    var l = b(this);
                    h < a.loopedSlides && f.push(e);
                    h < d.length && h >= d.length - a.loopedSlides && c.push(e);
                    l.attr("data-rplgsw-slide-index", h)
                });
                for (h = 0; h < f.length; h++) a.wrapper.append(b(f[h].cloneNode(!0)).addClass(a.params.slideDuplicateClass));
                for (h =
                         c.length - 1; 0 <= h; h--) a.wrapper.prepend(b(c[h].cloneNode(!0)).addClass(a.params.slideDuplicateClass))
            };
            a.destroyLoop = function () {
                a.wrapper.children("." + a.params.slideClass + "." + a.params.slideDuplicateClass).remove();
                a.slides.removeAttr("data-rplgsw-slide-index")
            };
            a.reLoop = function (b) {
                var d = a.activeIndex - a.loopedSlides;
                a.destroyLoop();
                a.createLoop();
                a.updateSlidesSize();
                b && a.slideTo(d + a.loopedSlides, 0, !1)
            };
            a.fixLoop = function () {
                var b;
                a.activeIndex < a.loopedSlides ? (b = a.slides.length - 3 * a.loopedSlides + a.activeIndex,
                    b += a.loopedSlides, a.slideTo(b, 0, !1, !0)) : ("auto" === a.params.slidesPerView && a.activeIndex >= 2 * a.loopedSlides || a.activeIndex > a.slides.length - 2 * a.params.slidesPerView) && (b = -a.slides.length + a.activeIndex + a.loopedSlides, b += a.loopedSlides, a.slideTo(b, 0, !1, !0))
            };
            a.appendSlide = function (b) {
                if (a.params.loop && a.destroyLoop(), "object" == typeof b && b.length) for (var d = 0; d < b.length; d++) b[d] && a.wrapper.append(b[d]); else a.wrapper.append(b);
                a.params.loop && a.createLoop();
                a.params.observer && a.support.observer || a.update(!0)
            };
            a.prependSlide = function (b) {
                a.params.loop && a.destroyLoop();
                var d = a.activeIndex + 1;
                if ("object" == typeof b && b.length) {
                    for (d = 0; d < b.length; d++) b[d] && a.wrapper.prepend(b[d]);
                    d = a.activeIndex + b.length
                } else a.wrapper.prepend(b);
                a.params.loop && a.createLoop();
                a.params.observer && a.support.observer || a.update(!0);
                a.slideTo(d, 0, !1)
            };
            a.removeSlide = function (b) {
                a.params.loop && (a.destroyLoop(), a.slides = a.wrapper.children("." + a.params.slideClass));
                var d = a.activeIndex;
                if ("object" == typeof b && b.length) for (var c = 0; c < b.length; c++) {
                    var f =
                        b[c];
                    a.slides[f] && a.slides.eq(f).remove();
                    f < d && d--
                } else f = b, a.slides[f] && a.slides.eq(f).remove(), f < d && d--;
                d = Math.max(d, 0);
                a.params.loop && a.createLoop();
                a.params.observer && a.support.observer || a.update(!0);
                a.params.loop ? a.slideTo(d + a.loopedSlides, 0, !1) : a.slideTo(d, 0, !1)
            };
            a.removeAllSlides = function () {
                for (var b = [], h = 0; h < a.slides.length; h++) b.push(h);
                a.removeSlide(b)
            };
            a.effects = {
                fade: {
                    setTranslate: function () {
                        for (var b = 0; b < a.slides.length; b++) {
                            var h = a.slides.eq(b), c = -h[0].rplgswSlideOffset;
                            a.params.virtualTranslate ||
                            (c -= a.translate);
                            var f = 0;
                            a.isHorizontal() || (f = c, c = 0);
                            h.css({opacity: a.params.fade.crossFade ? Math.max(1 - Math.abs(h[0].progress), 0) : 1 + Math.min(Math.max(h[0].progress, -1), 0)}).transform("translate3d(" + c + "px, " + f + "px, 0px)")
                        }
                    }, setTransition: function (b) {
                        if (a.slides.transition(b), a.params.virtualTranslate && 0 !== b) {
                            var d = !1;
                            a.slides.transitionEnd(function () {
                                if (!d && a) {
                                    d = !0;
                                    a.animating = !1;
                                    for (var b = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], h = 0; h < b.length; h++) a.wrapper.trigger(b[h])
                                }
                            })
                        }
                    }
                },
                flip: {
                    setTranslate: function () {
                        for (var d = 0; d < a.slides.length; d++) {
                            var h = a.slides.eq(d), c = h[0].progress;
                            a.params.flip.limitRotation && (c = Math.max(Math.min(h[0].progress, 1), -1));
                            var f = -180 * c, e = 0, l = -h[0].rplgswSlideOffset, g = 0;
                            if (a.isHorizontal() ? a.rtl && (f = -f) : (g = l, l = 0, e = -f, f = 0), h[0].style.zIndex = -Math.abs(Math.round(c)) + a.slides.length, a.params.flip.slideShadows) {
                                var n = a.isHorizontal() ? h.find(".rplgsw-slide-shadow-left") : h.find(".rplgsw-slide-shadow-top"),
                                    m = a.isHorizontal() ? h.find(".rplgsw-slide-shadow-right") :
                                        h.find(".rplgsw-slide-shadow-bottom");
                                0 === n.length && (n = b('<div class="rplgsw-slide-shadow-' + (a.isHorizontal() ? "left" : "top") + '"></div>'), h.append(n));
                                0 === m.length && (m = b('<div class="rplgsw-slide-shadow-' + (a.isHorizontal() ? "right" : "bottom") + '"></div>'), h.append(m));
                                n.length && (n[0].style.opacity = Math.max(-c, 0));
                                m.length && (m[0].style.opacity = Math.max(c, 0))
                            }
                            h.transform("translate3d(" + l + "px, " + g + "px, 0px) rotateX(" + e + "deg) rotateY(" + f + "deg)")
                        }
                    }, setTransition: function (d) {
                        if (a.slides.transition(d).find(".rplgsw-slide-shadow-top, .rplgsw-slide-shadow-right, .rplgsw-slide-shadow-bottom, .rplgsw-slide-shadow-left").transition(d),
                            a.params.virtualTranslate && 0 !== d) {
                            var h = !1;
                            a.slides.eq(a.activeIndex).transitionEnd(function () {
                                if (!h && a && b(this).hasClass(a.params.slideActiveClass)) {
                                    h = !0;
                                    a.animating = !1;
                                    for (var d = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], c = 0; c < d.length; c++) a.wrapper.trigger(d[c])
                                }
                            })
                        }
                    }
                }, cube: {
                    setTranslate: function () {
                        var d, h = 0;
                        a.params.cube.shadow && (a.isHorizontal() ? (d = a.wrapper.find(".rplgsw-cube-shadow"), 0 === d.length && (d = b('<div class="rplgsw-cube-shadow"></div>'),
                            a.wrapper.append(d)), d.css({height: a.width + "px"})) : (d = a.container.find(".rplgsw-cube-shadow"), 0 === d.length && (d = b('<div class="rplgsw-cube-shadow"></div>'), a.container.append(d))));
                        for (var c = 0; c < a.slides.length; c++) {
                            var f = a.slides.eq(c), e = 90 * c, l = Math.floor(e / 360);
                            a.rtl && (e = -e, l = Math.floor(-e / 360));
                            var g = Math.max(Math.min(f[0].progress, 1), -1), n = 0, m = 0, k = 0;
                            0 == c % 4 ? (n = 4 * -l * a.size, k = 0) : 0 == (c - 1) % 4 ? (n = 0, k = 4 * -l * a.size) : 0 == (c - 2) % 4 ? (n = a.size + 4 * l * a.size, k = a.size) : 0 == (c - 3) % 4 && (n = -a.size, k = 3 * a.size + 4 * a.size * l);
                            a.rtl && (n = -n);
                            a.isHorizontal() || (m = n, n = 0);
                            e = "rotateX(" + (a.isHorizontal() ? 0 : -e) + "deg) rotateY(" + (a.isHorizontal() ? e : 0) + "deg) translate3d(" + n + "px, " + m + "px, " + k + "px)";
                            if (1 >= g && -1 < g && (h = 90 * c + 90 * g, a.rtl && (h = 90 * -c - 90 * g)), f.transform(e), a.params.cube.slideShadows) e = a.isHorizontal() ? f.find(".rplgsw-slide-shadow-left") : f.find(".rplgsw-slide-shadow-top"), l = a.isHorizontal() ? f.find(".rplgsw-slide-shadow-right") : f.find(".rplgsw-slide-shadow-bottom"), 0 === e.length && (e = b('<div class="rplgsw-slide-shadow-' + (a.isHorizontal() ?
                                "left" : "top") + '"></div>'), f.append(e)), 0 === l.length && (l = b('<div class="rplgsw-slide-shadow-' + (a.isHorizontal() ? "right" : "bottom") + '"></div>'), f.append(l)), e.length && (e[0].style.opacity = Math.max(-g, 0)), l.length && (l[0].style.opacity = Math.max(g, 0))
                        }
                        if (a.wrapper.css({
                                "-webkit-transform-origin": "50% 50% -" + a.size / 2 + "px",
                                "-moz-transform-origin": "50% 50% -" + a.size / 2 + "px",
                                "-ms-transform-origin": "50% 50% -" + a.size / 2 + "px",
                                "transform-origin": "50% 50% -" + a.size / 2 + "px"
                            }), a.params.cube.shadow) a.isHorizontal() ? d.transform("translate3d(0px, " +
                            (a.width / 2 + a.params.cube.shadowOffset) + "px, " + -a.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + a.params.cube.shadowScale + ")") : (c = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90), c = a.params.cube.shadowScale / (1.5 - (Math.sin(2 * c * Math.PI / 360) / 2 + Math.cos(2 * c * Math.PI / 360) / 2)), d.transform("scale3d(" + a.params.cube.shadowScale + ", 1, " + c + ") translate3d(0px, " + (a.height / 2 + a.params.cube.shadowOffset) + "px, " + -a.height / 2 / c + "px) rotateX(-90deg)"));
                        a.wrapper.transform("translate3d(0px,0," + (a.isSafari || a.isUiWebView ?
                            -a.size / 2 : 0) + "px) rotateX(" + (a.isHorizontal() ? 0 : h) + "deg) rotateY(" + (a.isHorizontal() ? -h : 0) + "deg)")
                    }, setTransition: function (b) {
                        a.slides.transition(b).find(".rplgsw-slide-shadow-top, .rplgsw-slide-shadow-right, .rplgsw-slide-shadow-bottom, .rplgsw-slide-shadow-left").transition(b);
                        a.params.cube.shadow && !a.isHorizontal() && a.container.find(".rplgsw-cube-shadow").transition(b)
                    }
                }, coverflow: {
                    setTranslate: function () {
                        var d = a.translate;
                        d = a.isHorizontal() ? -d + a.width / 2 : -d + a.height / 2;
                        for (var h = a.isHorizontal() ?
                            a.params.coverflow.rotate : -a.params.coverflow.rotate, c = a.params.coverflow.depth, f = 0, e = a.slides.length; f < e; f++) {
                            var l = a.slides.eq(f), g = a.slidesSizesGrid[f];
                            g = (d - l[0].rplgswSlideOffset - g / 2) / g * a.params.coverflow.modifier;
                            var n = a.isHorizontal() ? h * g : 0, m = a.isHorizontal() ? 0 : h * g,
                                k = -c * Math.abs(g), q = a.isHorizontal() ? 0 : a.params.coverflow.stretch * g,
                                p = a.isHorizontal() ? a.params.coverflow.stretch * g : 0;
                            .001 > Math.abs(p) && (p = 0);
                            .001 > Math.abs(q) && (q = 0);
                            .001 > Math.abs(k) && (k = 0);
                            .001 > Math.abs(n) && (n = 0);
                            .001 > Math.abs(m) &&
                            (m = 0);
                            if (l.transform("translate3d(" + p + "px," + q + "px," + k + "px)  rotateX(" + m + "deg) rotateY(" + n + "deg)"), l[0].style.zIndex = 1 - Math.abs(Math.round(g)), a.params.coverflow.slideShadows) n = a.isHorizontal() ? l.find(".rplgsw-slide-shadow-left") : l.find(".rplgsw-slide-shadow-top"), m = a.isHorizontal() ? l.find(".rplgsw-slide-shadow-right") : l.find(".rplgsw-slide-shadow-bottom"), 0 === n.length && (n = b('<div class="rplgsw-slide-shadow-' + (a.isHorizontal() ? "left" : "top") + '"></div>'), l.append(n)), 0 === m.length && (m = b('<div class="rplgsw-slide-shadow-' +
                                (a.isHorizontal() ? "right" : "bottom") + '"></div>'), l.append(m)), n.length && (n[0].style.opacity = 0 < g ? g : 0), m.length && (m[0].style.opacity = 0 < -g ? -g : 0)
                        }
                        a.browser.ie && (a.wrapper[0].style.perspectiveOrigin = d + "px 50%")
                    }, setTransition: function (b) {
                        a.slides.transition(b).find(".rplgsw-slide-shadow-top, .rplgsw-slide-shadow-right, .rplgsw-slide-shadow-bottom, .rplgsw-slide-shadow-left").transition(b)
                    }
                }
            };
            a.lazy = {
                initialImageLoaded: !1, loadImageInSlide: function (d, h) {
                    if (void 0 !== d && (void 0 === h && (h = !0), 0 !== a.slides.length)) {
                        var c =
                            a.slides.eq(d);
                        d = c.find("." + a.params.lazyLoadingClass + ":not(." + a.params.lazyStatusLoadedClass + "):not(." + a.params.lazyStatusLoadingClass + ")");
                        !c.hasClass(a.params.lazyLoadingClass) || c.hasClass(a.params.lazyStatusLoadedClass) || c.hasClass(a.params.lazyStatusLoadingClass) || (d = d.add(c[0]));
                        0 !== d.length && d.each(function () {
                            var d = b(this);
                            d.addClass(a.params.lazyStatusLoadingClass);
                            var f = d.attr("data-background"), e = d.attr("data-src"), l = d.attr("data-srcset"),
                                g = d.attr("data-sizes");
                            a.loadImage(d[0], e || f, l, g,
                                !1, function () {
                                    if (void 0 !== a && null !== a && a) {
                                        if (f ? (d.css("background-image", 'url("' + f + '")'), d.removeAttr("data-background")) : (l && (d.attr("srcset", l), d.removeAttr("data-srcset")), g && (d.attr("sizes", g), d.removeAttr("data-sizes")), e && (d.attr("src", e), d.removeAttr("data-src"))), d.addClass(a.params.lazyStatusLoadedClass).removeClass(a.params.lazyStatusLoadingClass), c.find("." + a.params.lazyPreloaderClass + ", ." + a.params.preloaderClass).remove(), a.params.loop && h) {
                                            var b = c.attr("data-rplgsw-slide-index");
                                            c.hasClass(a.params.slideDuplicateClass) ?
                                                (b = a.wrapper.children('[data-rplgsw-slide-index="' + b + '"]:not(.' + a.params.slideDuplicateClass + ")"), a.lazy.loadImageInSlide(b.index(), !1)) : (b = a.wrapper.children("." + a.params.slideDuplicateClass + '[data-rplgsw-slide-index="' + b + '"]'), a.lazy.loadImageInSlide(b.index(), !1))
                                        }
                                        a.emit("onLazyImageReady", a, c[0], d[0])
                                    }
                                });
                            a.emit("onLazyImageLoad", a, c[0], d[0])
                        })
                    }
                }, load: function () {
                    var d, h = a.params.slidesPerView;
                    if ("auto" === h && (h = 0), a.lazy.initialImageLoaded || (a.lazy.initialImageLoaded = !0), a.params.watchSlidesVisibility) a.wrapper.children("." +
                        a.params.slideVisibleClass).each(function () {
                        a.lazy.loadImageInSlide(b(this).index())
                    }); else if (1 < h) for (d = a.activeIndex; d < a.activeIndex + h; d++) a.slides[d] && a.lazy.loadImageInSlide(d); else a.lazy.loadImageInSlide(a.activeIndex);
                    if (a.params.lazyLoadingInPrevNext) if (1 < h || a.params.lazyLoadingInPrevNextAmount && 1 < a.params.lazyLoadingInPrevNextAmount) {
                        d = a.params.lazyLoadingInPrevNextAmount;
                        var c = h, f = Math.min(a.activeIndex + c + Math.max(d, c), a.slides.length);
                        c = Math.max(a.activeIndex - Math.max(c, d), 0);
                        for (d = a.activeIndex +
                            h; d < f; d++) a.slides[d] && a.lazy.loadImageInSlide(d);
                        for (d = c; d < a.activeIndex; d++) a.slides[d] && a.lazy.loadImageInSlide(d)
                    } else h = a.wrapper.children("." + a.params.slideNextClass), 0 < h.length && a.lazy.loadImageInSlide(h.index()), h = a.wrapper.children("." + a.params.slidePrevClass), 0 < h.length && a.lazy.loadImageInSlide(h.index())
                }, onTransitionStart: function () {
                    a.params.lazyLoading && (a.params.lazyLoadingOnTransitionStart || !a.params.lazyLoadingOnTransitionStart && !a.lazy.initialImageLoaded) && a.lazy.load()
                }, onTransitionEnd: function () {
                    a.params.lazyLoading &&
                    !a.params.lazyLoadingOnTransitionStart && a.lazy.load()
                }
            };
            a.scrollbar = {
                isTouched: !1,
                setDragPosition: function (b) {
                    var d = a.scrollbar;
                    b = (a.isHorizontal() ? "touchstart" === b.type || "touchmove" === b.type ? b.targetTouches[0].pageX : b.pageX || b.clientX : "touchstart" === b.type || "touchmove" === b.type ? b.targetTouches[0].pageY : b.pageY || b.clientY) - d.track.offset()[a.isHorizontal() ? "left" : "top"] - d.dragSize / 2;
                    var c = -a.minTranslate() * d.moveDivider, f = -a.maxTranslate() * d.moveDivider;
                    b < c ? b = c : b > f && (b = f);
                    b = -b / d.moveDivider;
                    a.updateProgress(b);
                    a.setWrapperTranslate(b, !0)
                },
                dragStart: function (b) {
                    var d = a.scrollbar;
                    d.isTouched = !0;
                    b.preventDefault();
                    b.stopPropagation();
                    d.setDragPosition(b);
                    clearTimeout(d.dragTimeout);
                    d.track.transition(0);
                    a.params.scrollbarHide && d.track.css("opacity", 1);
                    a.wrapper.transition(100);
                    d.drag.transition(100);
                    a.emit("onScrollbarDragStart", a)
                },
                dragMove: function (b) {
                    var d = a.scrollbar;
                    d.isTouched && (b.preventDefault ? b.preventDefault() : b.returnValue = !1, d.setDragPosition(b), a.wrapper.transition(0), d.track.transition(0), d.drag.transition(0),
                        a.emit("onScrollbarDragMove", a))
                },
                dragEnd: function (b) {
                    var d = a.scrollbar;
                    d.isTouched && (d.isTouched = !1, a.params.scrollbarHide && (clearTimeout(d.dragTimeout), d.dragTimeout = setTimeout(function () {
                        d.track.css("opacity", 0);
                        d.track.transition(400)
                    }, 1E3)), a.emit("onScrollbarDragEnd", a), a.params.scrollbarSnapOnRelease && a.slideReset())
                },
                draggableEvents: !1 !== a.params.simulateTouch || a.support.touch ? a.touchEvents : a.touchEventsDesktop,
                enableDraggable: function () {
                    var d = a.scrollbar, c = a.support.touch ? d.track : document;
                    b(d.track).on(d.draggableEvents.start, d.dragStart);
                    b(c).on(d.draggableEvents.move, d.dragMove);
                    b(c).on(d.draggableEvents.end, d.dragEnd)
                },
                disableDraggable: function () {
                    var d = a.scrollbar, c = a.support.touch ? d.track : document;
                    b(d.track).off(d.draggableEvents.start, d.dragStart);
                    b(c).off(d.draggableEvents.move, d.dragMove);
                    b(c).off(d.draggableEvents.end, d.dragEnd)
                },
                set: function () {
                    if (a.params.scrollbar) {
                        var d = a.scrollbar;
                        d.track = b(a.params.scrollbar);
                        a.params.uniqueNavElements && "string" == typeof a.params.scrollbar &&
                        1 < d.track.length && 1 === a.container.find(a.params.scrollbar).length && (d.track = a.container.find(a.params.scrollbar));
                        d.drag = d.track.find(".rplgsw-scrollbar-drag");
                        0 === d.drag.length && (d.drag = b('<div class="rplgsw-scrollbar-drag"></div>'), d.track.append(d.drag));
                        d.drag[0].style.width = "";
                        d.drag[0].style.height = "";
                        d.trackSize = a.isHorizontal() ? d.track[0].offsetWidth : d.track[0].offsetHeight;
                        d.divider = a.size / a.virtualSize;
                        d.moveDivider = d.trackSize / a.size * d.divider;
                        d.dragSize = d.trackSize * d.divider;
                        a.isHorizontal() ?
                            d.drag[0].style.width = d.dragSize + "px" : d.drag[0].style.height = d.dragSize + "px";
                        1 <= d.divider ? d.track[0].style.display = "none" : d.track[0].style.display = "";
                        a.params.scrollbarHide && (d.track[0].style.opacity = 0)
                    }
                },
                setTranslate: function () {
                    if (a.params.scrollbar) {
                        var b = a.scrollbar, c = (a.translate, b.dragSize);
                        var f = (b.trackSize - b.dragSize) * a.progress;
                        a.rtl && a.isHorizontal() ? (f = -f, 0 < f ? (c = b.dragSize - f, f = 0) : -f + b.dragSize > b.trackSize && (c = b.trackSize + f)) : 0 > f ? (c = b.dragSize + f, f = 0) : f + b.dragSize > b.trackSize && (c = b.trackSize -
                            f);
                        a.isHorizontal() ? (a.support.transforms3d ? b.drag.transform("translate3d(" + f + "px, 0, 0)") : b.drag.transform("translateX(" + f + "px)"), b.drag[0].style.width = c + "px") : (a.support.transforms3d ? b.drag.transform("translate3d(0px, " + f + "px, 0)") : b.drag.transform("translateY(" + f + "px)"), b.drag[0].style.height = c + "px");
                        a.params.scrollbarHide && (clearTimeout(b.timeout), b.track[0].style.opacity = 1, b.timeout = setTimeout(function () {
                            b.track[0].style.opacity = 0;
                            b.track.transition(400)
                        }, 1E3))
                    }
                },
                setTransition: function (b) {
                    a.params.scrollbar &&
                    a.scrollbar.drag.transition(b)
                }
            };
            a.controller = {
                LinearSpline: function (a, b) {
                    var d = function () {
                        var a, b, d;
                        return function (c, h) {
                            b = -1;
                            for (a = c.length; 1 < a - b;) c[d = a + b >> 1] <= h ? b = d : a = d;
                            return a
                        }
                    }();
                    this.x = a;
                    this.y = b;
                    this.lastIndex = a.length - 1;
                    var c, h;
                    this.x.length;
                    this.interpolate = function (a) {
                        return a ? (h = d(this.x, a), c = h - 1, (a - this.x[c]) * (this.y[h] - this.y[c]) / (this.x[h] - this.x[c]) + this.y[c]) : 0
                    }
                }, getInterpolateFunction: function (b) {
                    a.controller.spline || (a.controller.spline = a.params.loop ? new a.controller.LinearSpline(a.slidesGrid,
                        b.slidesGrid) : new a.controller.LinearSpline(a.snapGrid, b.snapGrid))
                }, setTranslate: function (b, c) {
                    function d(d) {
                        b = d.rtl && "horizontal" === d.params.direction ? -a.translate : a.translate;
                        "slide" === a.params.controlBy && (a.controller.getInterpolateFunction(d), f = -a.controller.spline.interpolate(-b));
                        f && "container" !== a.params.controlBy || (h = (d.maxTranslate() - d.minTranslate()) / (a.maxTranslate() - a.minTranslate()), f = (b - a.minTranslate()) * h + d.minTranslate());
                        a.params.controlInverse && (f = d.maxTranslate() - f);
                        d.updateProgress(f);
                        d.setWrapperTranslate(f, !1, a);
                        d.updateActiveIndex()
                    }

                    var h, f, l = a.params.control;
                    if (Array.isArray(l)) for (var g = 0; g < l.length; g++) l[g] !== c && l[g] instanceof e && d(l[g]); else l instanceof e && c !== l && d(l)
                }, setTransition: function (b, c) {
                    function d(d) {
                        d.setWrapperTransition(b, a);
                        0 !== b && (d.onTransitionStart(), d.wrapper.transitionEnd(function () {
                            f && (d.params.loop && "slide" === a.params.controlBy && d.fixLoop(), d.onTransitionEnd())
                        }))
                    }

                    var h, f = a.params.control;
                    if (Array.isArray(f)) for (h = 0; h < f.length; h++) f[h] !== c && f[h] instanceof
                    e && d(f[h]); else f instanceof e && c !== f && d(f)
                }
            };
            a.hashnav = {
                onHashCange: function (b, c) {
                    b = document.location.hash.replace("#", "");
                    b !== a.slides.eq(a.activeIndex).attr("data-hash") && a.slideTo(a.wrapper.children("." + a.params.slideClass + '[data-hash="' + b + '"]').index())
                }, attachEvents: function (d) {
                    d = d ? "off" : "on";
                    b(window)[d]("hashchange", a.hashnav.onHashCange)
                }, setHash: function () {
                    if (a.hashnav.initialized && a.params.hashnav) if (a.params.replaceState && window.history && window.history.replaceState) window.history.replaceState(null,
                        null, "#" + a.slides.eq(a.activeIndex).attr("data-hash") || ""); else {
                        var b = a.slides.eq(a.activeIndex);
                        b = b.attr("data-hash") || b.attr("data-history");
                        document.location.hash = b || ""
                    }
                }, init: function () {
                    if (a.params.hashnav && !a.params.history) {
                        a.hashnav.initialized = !0;
                        var b = document.location.hash.replace("#", "");
                        if (b) for (var c = 0, f = a.slides.length; c < f; c++) {
                            var e = a.slides.eq(c);
                            (e.attr("data-hash") || e.attr("data-history")) !== b || e.hasClass(a.params.slideDuplicateClass) || (e = e.index(), a.slideTo(e, 0, a.params.runCallbacksOnInit,
                                !0))
                        }
                        a.params.hashnavWatchState && a.hashnav.attachEvents()
                    }
                }, destroy: function () {
                    a.params.hashnavWatchState && a.hashnav.attachEvents(!0)
                }
            };
            a.history = {
                init: function () {
                    if (a.params.history) {
                        if (!window.history || !window.history.pushState) return a.params.history = !1, void(a.params.hashnav = !0);
                        a.history.initialized = !0;
                        this.paths = this.getPathValues();
                        (this.paths.key || this.paths.value) && (this.scrollToSlide(0, this.paths.value, a.params.runCallbacksOnInit), a.params.replaceState || window.addEventListener("popstate",
                            this.setHistoryPopState))
                    }
                }, setHistoryPopState: function () {
                    a.history.paths = a.history.getPathValues();
                    a.history.scrollToSlide(a.params.speed, a.history.paths.value, !1)
                }, getPathValues: function () {
                    var a = window.location.pathname.slice(1).split("/"), b = a.length;
                    return {key: a[b - 2], value: a[b - 1]}
                }, setHistory: function (b, c) {
                    a.history.initialized && a.params.history && (c = a.slides.eq(c), c = this.slugify(c.attr("data-history")), window.location.pathname.includes(b) || (c = b + "/" + c), a.params.replaceState ? window.history.replaceState(null,
                        null, c) : window.history.pushState(null, null, c))
                }, slugify: function (a) {
                    return a.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
                }, scrollToSlide: function (b, c, f) {
                    if (c) for (var d = 0, h = a.slides.length; d < h; d++) {
                        var e = a.slides.eq(d);
                        this.slugify(e.attr("data-history")) !== c || e.hasClass(a.params.slideDuplicateClass) || (e = e.index(), a.slideTo(e, b, f))
                    } else a.slideTo(0, b, f)
                }
            };
            a.disableKeyboardControl = function () {
                a.params.keyboardControl = !1;
                b(document).off("keydown", n)
            };
            a.enableKeyboardControl = function () {
                a.params.keyboardControl = !0;
                b(document).on("keydown", n)
            };
            a.mousewheel = {event: !1, lastScrollTime: (new window.Date).getTime()};
            a.params.mousewheelControl && (a.mousewheel.event = -1 < navigator.userAgent.indexOf("firefox") ? "DOMMouseScroll" : function () {
                var a = "onwheel" in document;
                a || (a = document.createElement("div"), a.setAttribute("onwheel", "return;"), a = "function" == typeof a.onwheel);
                return !a && document.implementation && document.implementation.hasFeature &&
                !0 !== document.implementation.hasFeature("", "") && (a = document.implementation.hasFeature("Events.wheel", "3.0")), a
            }() ? "wheel" : "mousewheel");
            a.disableMousewheelControl = function () {
                if (!a.mousewheel.event) return !1;
                var d = a.container;
                return "container" !== a.params.mousewheelEventsTarged && (d = b(a.params.mousewheelEventsTarged)), d.off(a.mousewheel.event, p), a.params.mousewheelControl = !1, !0
            };
            a.enableMousewheelControl = function () {
                if (!a.mousewheel.event) return !1;
                var d = a.container;
                return "container" !== a.params.mousewheelEventsTarged &&
                (d = b(a.params.mousewheelEventsTarged)), d.on(a.mousewheel.event, p), a.params.mousewheelControl = !0, !0
            };
            a.parallax = {
                setTranslate: function () {
                    a.container.children("[data-rplgsw-parallax], [data-rplgsw-parallax-x], [data-rplgsw-parallax-y]").each(function () {
                        A(this, a.progress)
                    });
                    a.slides.each(function () {
                        var a = b(this);
                        a.find("[data-rplgsw-parallax], [data-rplgsw-parallax-x], [data-rplgsw-parallax-y]").each(function () {
                            A(this, Math.min(Math.max(a[0].progress, -1), 1))
                        })
                    })
                }, setTransition: function (d) {
                    void 0 === d &&
                    (d = a.params.speed);
                    a.container.find("[data-rplgsw-parallax], [data-rplgsw-parallax-x], [data-rplgsw-parallax-y]").each(function () {
                        var a = b(this), c = parseInt(a.attr("data-rplgsw-parallax-duration"), 10) || d;
                        0 === d && (c = 0);
                        a.transition(c)
                    })
                }
            };
            a.zoom = {
                scale: 1,
                currentScale: 1,
                isScaling: !1,
                gesture: {
                    slide: void 0,
                    slideWidth: void 0,
                    slideHeight: void 0,
                    image: void 0,
                    imageWrap: void 0,
                    zoomMax: a.params.zoomMax
                },
                image: {
                    isTouched: void 0,
                    isMoved: void 0,
                    currentX: void 0,
                    currentY: void 0,
                    minX: void 0,
                    minY: void 0,
                    maxX: void 0,
                    maxY: void 0,
                    width: void 0,
                    height: void 0,
                    startX: void 0,
                    startY: void 0,
                    touchesStart: {},
                    touchesCurrent: {}
                },
                velocity: {x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0},
                getDistanceBetweenTouches: function (a) {
                    return 2 > a.targetTouches.length ? 1 : Math.sqrt(Math.pow(a.targetTouches[1].pageX - a.targetTouches[0].pageX, 2) + Math.pow(a.targetTouches[1].pageY - a.targetTouches[0].pageY, 2))
                },
                onGestureStart: function (d) {
                    var c = a.zoom;
                    if (!a.support.gestures) {
                        if ("touchstart" !== d.type || "touchstart" ===
                            d.type && 2 > d.targetTouches.length) return;
                        c.gesture.scaleStart = c.getDistanceBetweenTouches(d)
                    }
                    if (!(c.gesture.slide && c.gesture.slide.length || (c.gesture.slide = b(this), 0 === c.gesture.slide.length && (c.gesture.slide = a.slides.eq(a.activeIndex)), c.gesture.image = c.gesture.slide.find("img, svg, canvas"), c.gesture.imageWrap = c.gesture.image.parent("." + a.params.zoomContainerClass), c.gesture.zoomMax = c.gesture.imageWrap.attr("data-rplgsw-zoom") || a.params.zoomMax, 0 !== c.gesture.imageWrap.length))) return void(c.gesture.image =
                        void 0);
                    c.gesture.image.transition(0);
                    c.isScaling = !0
                },
                onGestureChange: function (b) {
                    var c = a.zoom;
                    if (!a.support.gestures) {
                        if ("touchmove" !== b.type || "touchmove" === b.type && 2 > b.targetTouches.length) return;
                        c.gesture.scaleMove = c.getDistanceBetweenTouches(b)
                    }
                    c.gesture.image && 0 !== c.gesture.image.length && (a.support.gestures ? c.scale = b.scale * c.currentScale : c.scale = c.gesture.scaleMove / c.gesture.scaleStart * c.currentScale, c.scale > c.gesture.zoomMax && (c.scale = c.gesture.zoomMax - 1 + Math.pow(c.scale - c.gesture.zoomMax + 1,
                        .5)), c.scale < a.params.zoomMin && (c.scale = a.params.zoomMin + 1 - Math.pow(a.params.zoomMin - c.scale + 1, .5)), c.gesture.image.transform("translate3d(0,0,0) scale(" + c.scale + ")"))
                },
                onGestureEnd: function (b) {
                    var c = a.zoom;
                    !a.support.gestures && ("touchend" !== b.type || "touchend" === b.type && 2 > b.changedTouches.length) || c.gesture.image && 0 !== c.gesture.image.length && (c.scale = Math.max(Math.min(c.scale, c.gesture.zoomMax), a.params.zoomMin), c.gesture.image.transition(a.params.speed).transform("translate3d(0,0,0) scale(" + c.scale +
                        ")"), c.currentScale = c.scale, c.isScaling = !1, 1 === c.scale && (c.gesture.slide = void 0))
                },
                onTouchStart: function (a, b) {
                    var c = a.zoom;
                    c.gesture.image && 0 !== c.gesture.image.length && (c.image.isTouched || ("android" === a.device.os && b.preventDefault(), c.image.isTouched = !0, c.image.touchesStart.x = "touchstart" === b.type ? b.targetTouches[0].pageX : b.pageX, c.image.touchesStart.y = "touchstart" === b.type ? b.targetTouches[0].pageY : b.pageY))
                },
                onTouchMove: function (b) {
                    var c = a.zoom;
                    if (c.gesture.image && 0 !== c.gesture.image.length && (a.allowClick =
                            !1, c.image.isTouched && c.gesture.slide)) {
                        c.image.isMoved || (c.image.width = c.gesture.image[0].offsetWidth, c.image.height = c.gesture.image[0].offsetHeight, c.image.startX = a.getTranslate(c.gesture.imageWrap[0], "x") || 0, c.image.startY = a.getTranslate(c.gesture.imageWrap[0], "y") || 0, c.gesture.slideWidth = c.gesture.slide[0].offsetWidth, c.gesture.slideHeight = c.gesture.slide[0].offsetHeight, c.gesture.imageWrap.transition(0), a.rtl && (c.image.startX = -c.image.startX), a.rtl && (c.image.startY = -c.image.startY));
                        var d = c.image.width *
                            c.scale, f = c.image.height * c.scale;
                        if (!(d < c.gesture.slideWidth && f < c.gesture.slideHeight)) {
                            if (c.image.minX = Math.min(c.gesture.slideWidth / 2 - d / 2, 0), c.image.maxX = -c.image.minX, c.image.minY = Math.min(c.gesture.slideHeight / 2 - f / 2, 0), c.image.maxY = -c.image.minY, c.image.touchesCurrent.x = "touchmove" === b.type ? b.targetTouches[0].pageX : b.pageX, c.image.touchesCurrent.y = "touchmove" === b.type ? b.targetTouches[0].pageY : b.pageY, !c.image.isMoved && !c.isScaling) if (a.isHorizontal() && Math.floor(c.image.minX) === Math.floor(c.image.startX) &&
                                c.image.touchesCurrent.x < c.image.touchesStart.x || Math.floor(c.image.maxX) === Math.floor(c.image.startX) && c.image.touchesCurrent.x > c.image.touchesStart.x || !a.isHorizontal() && Math.floor(c.image.minY) === Math.floor(c.image.startY) && c.image.touchesCurrent.y < c.image.touchesStart.y || Math.floor(c.image.maxY) === Math.floor(c.image.startY) && c.image.touchesCurrent.y > c.image.touchesStart.y) return void(c.image.isTouched = !1);
                            b.preventDefault();
                            b.stopPropagation();
                            c.image.isMoved = !0;
                            c.image.currentX = c.image.touchesCurrent.x -
                                c.image.touchesStart.x + c.image.startX;
                            c.image.currentY = c.image.touchesCurrent.y - c.image.touchesStart.y + c.image.startY;
                            c.image.currentX < c.image.minX && (c.image.currentX = c.image.minX + 1 - Math.pow(c.image.minX - c.image.currentX + 1, .8));
                            c.image.currentX > c.image.maxX && (c.image.currentX = c.image.maxX - 1 + Math.pow(c.image.currentX - c.image.maxX + 1, .8));
                            c.image.currentY < c.image.minY && (c.image.currentY = c.image.minY + 1 - Math.pow(c.image.minY - c.image.currentY + 1, .8));
                            c.image.currentY > c.image.maxY && (c.image.currentY = c.image.maxY -
                                1 + Math.pow(c.image.currentY - c.image.maxY + 1, .8));
                            c.velocity.prevPositionX || (c.velocity.prevPositionX = c.image.touchesCurrent.x);
                            c.velocity.prevPositionY || (c.velocity.prevPositionY = c.image.touchesCurrent.y);
                            c.velocity.prevTime || (c.velocity.prevTime = Date.now());
                            c.velocity.x = (c.image.touchesCurrent.x - c.velocity.prevPositionX) / (Date.now() - c.velocity.prevTime) / 2;
                            c.velocity.y = (c.image.touchesCurrent.y - c.velocity.prevPositionY) / (Date.now() - c.velocity.prevTime) / 2;
                            2 > Math.abs(c.image.touchesCurrent.x - c.velocity.prevPositionX) &&
                            (c.velocity.x = 0);
                            2 > Math.abs(c.image.touchesCurrent.y - c.velocity.prevPositionY) && (c.velocity.y = 0);
                            c.velocity.prevPositionX = c.image.touchesCurrent.x;
                            c.velocity.prevPositionY = c.image.touchesCurrent.y;
                            c.velocity.prevTime = Date.now();
                            c.gesture.imageWrap.transform("translate3d(" + c.image.currentX + "px, " + c.image.currentY + "px,0)")
                        }
                    }
                },
                onTouchEnd: function (a, b) {
                    a = a.zoom;
                    if (a.gesture.image && 0 !== a.gesture.image.length) {
                        if (!a.image.isTouched || !a.image.isMoved) return a.image.isTouched = !1, void(a.image.isMoved = !1);
                        a.image.isTouched = !1;
                        a.image.isMoved = !1;
                        var c = 300, d = 300;
                        b = a.image.currentX + a.velocity.x * c;
                        var f = a.image.currentY + a.velocity.y * d;
                        0 !== a.velocity.x && (c = Math.abs((b - a.image.currentX) / a.velocity.x));
                        0 !== a.velocity.y && (d = Math.abs((f - a.image.currentY) / a.velocity.y));
                        c = Math.max(c, d);
                        a.image.currentX = b;
                        a.image.currentY = f;
                        b = a.image.height * a.scale;
                        a.image.minX = Math.min(a.gesture.slideWidth / 2 - a.image.width * a.scale / 2, 0);
                        a.image.maxX = -a.image.minX;
                        a.image.minY = Math.min(a.gesture.slideHeight / 2 - b / 2, 0);
                        a.image.maxY =
                            -a.image.minY;
                        a.image.currentX = Math.max(Math.min(a.image.currentX, a.image.maxX), a.image.minX);
                        a.image.currentY = Math.max(Math.min(a.image.currentY, a.image.maxY), a.image.minY);
                        a.gesture.imageWrap.transition(c).transform("translate3d(" + a.image.currentX + "px, " + a.image.currentY + "px,0)")
                    }
                },
                onTransitionEnd: function (a) {
                    var b = a.zoom;
                    b.gesture.slide && a.previousIndex !== a.activeIndex && (b.gesture.image.transform("translate3d(0,0,0) scale(1)"), b.gesture.imageWrap.transform("translate3d(0,0,0)"), b.gesture.slide =
                        b.gesture.image = b.gesture.imageWrap = void 0, b.scale = b.currentScale = 1)
                },
                toggleZoom: function (a, c) {
                    var d = a.zoom;
                    if (d.gesture.slide || (d.gesture.slide = a.clickedSlide ? b(a.clickedSlide) : a.slides.eq(a.activeIndex), d.gesture.image = d.gesture.slide.find("img, svg, canvas"), d.gesture.imageWrap = d.gesture.image.parent("." + a.params.zoomContainerClass)), d.gesture.image && 0 !== d.gesture.image.length) {
                        var f, e, h, l, g, n, m, k, q, p, t, u, v, w, r, A, y, x;
                        void 0 === d.image.touchesStart.x && c ? (f = "touchend" === c.type ? c.changedTouches[0].pageX :
                            c.pageX, e = "touchend" === c.type ? c.changedTouches[0].pageY : c.pageY) : (f = d.image.touchesStart.x, e = d.image.touchesStart.y);
                        d.scale && 1 !== d.scale ? (d.scale = d.currentScale = 1, d.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"), d.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"), d.gesture.slide = void 0) : (d.scale = d.currentScale = d.gesture.imageWrap.attr("data-rplgsw-zoom") || a.params.zoomMax, c ? (y = d.gesture.slide[0].offsetWidth, x = d.gesture.slide[0].offsetHeight, h = d.gesture.slide.offset().left,
                            l = d.gesture.slide.offset().top, g = h + y / 2 - f, n = l + x / 2 - e, q = d.gesture.image[0].offsetWidth, p = d.gesture.image[0].offsetHeight, t = q * d.scale, u = p * d.scale, v = Math.min(y / 2 - t / 2, 0), w = Math.min(x / 2 - u / 2, 0), r = -v, A = -w, m = g * d.scale, k = n * d.scale, m < v && (m = v), m > r && (m = r), k < w && (k = w), k > A && (k = A)) : (m = 0, k = 0), d.gesture.imageWrap.transition(300).transform("translate3d(" + m + "px, " + k + "px,0)"), d.gesture.image.transition(300).transform("translate3d(0,0,0) scale(" + d.scale + ")"))
                    }
                },
                attachEvents: function (c) {
                    var d = c ? "off" : "on";
                    a.params.zoom &&
                    (c = (a.slides, !("touchstart" !== a.touchEvents.start || !a.support.passiveListener || !a.params.passiveListeners) && {
                        passive: !0,
                        capture: !1
                    }), a.support.gestures ? (a.slides[d]("gesturestart", a.zoom.onGestureStart, c), a.slides[d]("gesturechange", a.zoom.onGestureChange, c), a.slides[d]("gestureend", a.zoom.onGestureEnd, c)) : "touchstart" === a.touchEvents.start && (a.slides[d](a.touchEvents.start, a.zoom.onGestureStart, c), a.slides[d](a.touchEvents.move, a.zoom.onGestureChange, c), a.slides[d](a.touchEvents.end, a.zoom.onGestureEnd,
                        c)), a[d]("touchStart", a.zoom.onTouchStart), a.slides.each(function (c, f) {
                        0 < b(f).find("." + a.params.zoomContainerClass).length && b(f)[d](a.touchEvents.move, a.zoom.onTouchMove)
                    }), a[d]("touchEnd", a.zoom.onTouchEnd), a[d]("transitionEnd", a.zoom.onTransitionEnd), a.params.zoomToggle && a.on("doubleTap", a.zoom.toggleZoom))
                },
                init: function () {
                    a.zoom.attachEvents()
                },
                destroy: function () {
                    a.zoom.attachEvents(!0)
                }
            };
            a._plugins = [];
            for (var T in a.plugins) (k = a.plugins[T](a, a.params[T])) && a._plugins.push(k);
            return a.callPlugins =
                function (b, c, f, e, l, g) {
                    for (var d = 0; d < a._plugins.length; d++) b in a._plugins[d] && a._plugins[d][b](c, f, e, l, g)
                }, a.emitterEventListeners = {}, a.emit = function (b, c, f, e, l, g) {
                a.params[b] && a.params[b](c, f, e, l, g);
                var d;
                if (a.emitterEventListeners[b]) for (d = 0; d < a.emitterEventListeners[b].length; d++) a.emitterEventListeners[b][d](c, f, e, l, g);
                a.callPlugins && a.callPlugins(b, c, f, e, l, g)
            }, a.on = function (b, c) {
                return b = y(b), a.emitterEventListeners[b] || (a.emitterEventListeners[b] = []), a.emitterEventListeners[b].push(c), a
            }, a.off =
                function (b, c) {
                    var d;
                    if (b = y(b), void 0 === c) return a.emitterEventListeners[b] = [], a;
                    if (a.emitterEventListeners[b] && 0 !== a.emitterEventListeners[b].length) {
                        for (d = 0; d < a.emitterEventListeners[b].length; d++) a.emitterEventListeners[b][d] === c && a.emitterEventListeners[b].splice(d, 1);
                        return a
                    }
                }, a.once = function (b, c) {
                b = y(b);
                var d = function (f, e, l, h, g) {
                    c(f, e, l, h, g);
                    a.off(b, d)
                };
                return a.on(b, d), a
            }, a.a11y = {
                makeFocusable: function (a) {
                    return a.attr("tabIndex", "0"), a
                },
                addRole: function (a, b) {
                    return a.attr("role", b), a
                },
                addLabel: function (a,
                                    b) {
                    return a.attr("aria-label", b), a
                },
                disable: function (a) {
                    return a.attr("aria-disabled", !0), a
                },
                enable: function (a) {
                    return a.attr("aria-disabled", !1), a
                },
                onEnterKey: function (c) {
                    13 === c.keyCode && (b(c.target).is(a.params.nextButton) ? (a.onClickNext(c), a.isEnd ? a.a11y.notify(a.params.lastSlideMessage) : a.a11y.notify(a.params.nextSlideMessage)) : b(c.target).is(a.params.prevButton) && (a.onClickPrev(c), a.isBeginning ? a.a11y.notify(a.params.firstSlideMessage) : a.a11y.notify(a.params.prevSlideMessage)), b(c.target).is("." +
                        a.params.bulletClass) && b(c.target)[0].click())
                },
                liveRegion: b('<span class="' + a.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function (b) {
                    var c = a.a11y.liveRegion;
                    0 !== c.length && (c.html(""), c.html(b))
                },
                init: function () {
                    a.params.nextButton && a.nextButton && 0 < a.nextButton.length && (a.a11y.makeFocusable(a.nextButton), a.a11y.addRole(a.nextButton, "button"), a.a11y.addLabel(a.nextButton, a.params.nextSlideMessage));
                    a.params.prevButton && a.prevButton && 0 < a.prevButton.length &&
                    (a.a11y.makeFocusable(a.prevButton), a.a11y.addRole(a.prevButton, "button"), a.a11y.addLabel(a.prevButton, a.params.prevSlideMessage));
                    b(a.container).append(a.a11y.liveRegion)
                },
                initPagination: function () {
                    a.params.pagination && a.params.paginationClickable && a.bullets && a.bullets.length && a.bullets.each(function () {
                        var c = b(this);
                        a.a11y.makeFocusable(c);
                        a.a11y.addRole(c, "button");
                        a.a11y.addLabel(c, a.params.paginationBulletMessage.replace(/{{index}}/, c.index() + 1))
                    })
                },
                destroy: function () {
                    a.a11y.liveRegion && 0 < a.a11y.liveRegion.length &&
                    a.a11y.liveRegion.remove()
                }
            }, a.init = function () {
                a.params.loop && a.createLoop();
                a.updateContainerSize();
                a.updateSlidesSize();
                a.updatePagination();
                a.params.scrollbar && a.scrollbar && (a.scrollbar.set(), a.params.scrollbarDraggable && a.scrollbar.enableDraggable());
                "slide" !== a.params.effect && a.effects[a.params.effect] && (a.params.loop || a.updateProgress(), a.effects[a.params.effect].setTranslate());
                a.params.loop ? a.slideTo(a.params.initialSlide + a.loopedSlides, 0, a.params.runCallbacksOnInit) : (a.slideTo(a.params.initialSlide,
                    0, a.params.runCallbacksOnInit), 0 === a.params.initialSlide && (a.parallax && a.params.parallax && a.parallax.setTranslate(), a.lazy && a.params.lazyLoading && (a.lazy.load(), a.lazy.initialImageLoaded = !0)));
                a.attachEvents();
                a.params.observer && a.support.observer && a.initObservers();
                a.params.preloadImages && !a.params.lazyLoading && a.preloadImages();
                a.params.zoom && a.zoom && a.zoom.init();
                a.params.autoplay && a.startAutoplay();
                a.params.keyboardControl && a.enableKeyboardControl && a.enableKeyboardControl();
                a.params.mousewheelControl &&
                a.enableMousewheelControl && a.enableMousewheelControl();
                a.params.hashnavReplaceState && (a.params.replaceState = a.params.hashnavReplaceState);
                a.params.history && a.history && a.history.init();
                a.params.hashnav && a.hashnav && a.hashnav.init();
                a.params.a11y && a.a11y && a.a11y.init();
                a.emit("onInit", a)
            }, a.cleanupStyles = function () {
                a.container.removeClass(a.classNames.join(" ")).removeAttr("style");
                a.wrapper.removeAttr("style");
                a.slides && a.slides.length && a.slides.removeClass([a.params.slideVisibleClass, a.params.slideActiveClass,
                    a.params.slideNextClass, a.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-rplgsw-column").removeAttr("data-rplgsw-row");
                a.paginationContainer && a.paginationContainer.length && a.paginationContainer.removeClass(a.params.paginationHiddenClass);
                a.bullets && a.bullets.length && a.bullets.removeClass(a.params.bulletActiveClass);
                a.params.prevButton && b(a.params.prevButton).removeClass(a.params.buttonDisabledClass);
                a.params.nextButton && b(a.params.nextButton).removeClass(a.params.buttonDisabledClass);
                a.params.scrollbar && a.scrollbar && (a.scrollbar.track && a.scrollbar.track.length && a.scrollbar.track.removeAttr("style"), a.scrollbar.drag && a.scrollbar.drag.length && a.scrollbar.drag.removeAttr("style"))
            }, a.destroy = function (b, c) {
                a.detachEvents();
                a.stopAutoplay();
                a.params.scrollbar && a.scrollbar && a.params.scrollbarDraggable && a.scrollbar.disableDraggable();
                a.params.loop && a.destroyLoop();
                c && a.cleanupStyles();
                a.disconnectObservers();
                a.params.zoom && a.zoom && a.zoom.destroy();
                a.params.keyboardControl && a.disableKeyboardControl &&
                a.disableKeyboardControl();
                a.params.mousewheelControl && a.disableMousewheelControl && a.disableMousewheelControl();
                a.params.a11y && a.a11y && a.a11y.destroy();
                a.params.history && !a.params.replaceState && window.removeEventListener("popstate", a.history.setHistoryPopState);
                a.params.hashnav && a.hashnav && a.hashnav.destroy();
                a.emit("onDestroy");
                !1 !== b && (a = null)
            }, a.init(), a
        }
    };
    e.prototype = {
        isSafari: function () {
            var b = window.navigator.userAgent.toLowerCase();
            return 0 <= b.indexOf("safari") && 0 > b.indexOf("chrome") && 0 > b.indexOf("android")
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray: function (b) {
            return "[object Array]" === Object.prototype.toString.apply(b)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && 1 < window.navigator.msMaxTouchPoints || window.navigator.pointerEnabled && 1 < window.navigator.maxTouchPoints,
            lteIE9: function () {
                var b = document.createElement("div");
                return b.innerHTML = "\x3c!--[if lte IE 9]><i></i><![endif]--\x3e",
                1 === b.getElementsByTagName("i").length
            }()
        },
        device: function () {
            var b = window.navigator.userAgent, e = b.match(/(Android);?[\s\/]+([\d.]+)?/),
                c = b.match(/(iPad).*OS\s([\d_]+)/), f = b.match(/(iPod)(.*OS\s([\d_]+))?/);
            b = !c && b.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            return {ios: c || b || f, android: e}
        }(),
        support: {
            touch: window.Modernizr && !0 === Modernizr.touch || !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch),
            transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d || function () {
                var b =
                    document.createElement("div").style;
                return "webkitPerspective" in b || "MozPerspective" in b || "OPerspective" in b || "MsPerspective" in b || "perspective" in b
            }(),
            flexbox: function () {
                for (var b = document.createElement("div").style, e = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), c = 0; c < e.length; c++) if (e[c] in b) return !0
            }(),
            observer: "MutationObserver" in window || "WebkitMutationObserver" in
            window,
            passiveListener: function () {
                var b = !1;
                try {
                    var e = Object.defineProperty({}, "passive", {
                        get: function () {
                            b = !0
                        }
                    });
                    window.addEventListener("testPassiveListener", null, e)
                } catch (c) {
                }
                return b
            }(),
            gestures: "ongesturestart" in window
        },
        plugins: {}
    };
    var g = function () {
        var b = function (b) {
            var c;
            for (c = 0; c < b.length; c++) this[c] = b[c];
            return this.length = b.length, this
        }, e = function (c, f) {
            var e = [];
            if (c && !f && c instanceof b) return c;
            if (c) if ("string" == typeof c) {
                var g = c.trim();
                if (0 <= g.indexOf("<") && 0 <= g.indexOf(">")) for (f = "div",
                                                                     0 === g.indexOf("<li") && (f = "ul"), 0 === g.indexOf("<tr") && (f = "tbody"), 0 !== g.indexOf("<td") && 0 !== g.indexOf("<th") || (f = "tr"), 0 === g.indexOf("<tbody") && (f = "table"), 0 === g.indexOf("<option") && (f = "select"), f = document.createElement(f), f.innerHTML = c, g = 0; g < f.childNodes.length; g++) e.push(f.childNodes[g]); else for (c = f || "#" !== c[0] || c.match(/[ .<>:~]/) ? (f || document).querySelectorAll(c) : [document.getElementById(c.split("#")[1])], g = 0; g < c.length; g++) c[g] && e.push(c[g])
            } else if (c.nodeType || c === window || c === document) e.push(c);
            else if (0 < c.length && c[0].nodeType) for (g = 0; g < c.length; g++) e.push(c[g]);
            return new b(e)
        };
        return b.prototype = {
            addClass: function (b) {
                if (void 0 === b) return this;
                b = b.split(" ");
                for (var c = 0; c < b.length; c++) for (var e = 0; e < this.length; e++) this[e].classList.add(b[c]);
                return this
            }, removeClass: function (b) {
                b = b.split(" ");
                for (var c = 0; c < b.length; c++) for (var e = 0; e < this.length; e++) this[e].classList.remove(b[c]);
                return this
            }, hasClass: function (b) {
                return !!this[0] && this[0].classList.contains(b)
            }, toggleClass: function (b) {
                b =
                    b.split(" ");
                for (var c = 0; c < b.length; c++) for (var e = 0; e < this.length; e++) this[e].classList.toggle(b[c]);
                return this
            }, attr: function (b, f) {
                if (1 === arguments.length && "string" == typeof b) return this[0] ? this[0].getAttribute(b) : void 0;
                for (var c = 0; c < this.length; c++) if (2 === arguments.length) this[c].setAttribute(b, f); else for (var e in b) this[c][e] = b[e], this[c].setAttribute(e, b[e]);
                return this
            }, removeAttr: function (b) {
                for (var c = 0; c < this.length; c++) this[c].removeAttribute(b);
                return this
            }, data: function (b, f) {
                if (void 0 !==
                    f) {
                    for (var c = 0; c < this.length; c++) {
                        var e = this[c];
                        e.dom7ElementDataStorage || (e.dom7ElementDataStorage = {});
                        e.dom7ElementDataStorage[b] = f
                    }
                    return this
                }
                if (this[0]) return (f = this[0].getAttribute("data-" + b)) ? f : this[0].dom7ElementDataStorage && b in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[b] : void 0
            }, transform: function (b) {
                for (var c = 0; c < this.length; c++) {
                    var e = this[c].style;
                    e.webkitTransform = e.MsTransform = e.msTransform = e.MozTransform = e.OTransform = e.transform = b
                }
                return this
            }, transition: function (b) {
                "string" !=
                typeof b && (b += "ms");
                for (var c = 0; c < this.length; c++) {
                    var e = this[c].style;
                    e.webkitTransitionDuration = e.MsTransitionDuration = e.msTransitionDuration = e.MozTransitionDuration = e.OTransitionDuration = e.transitionDuration = b
                }
                return this
            }, on: function (b, f, g, n) {
                function c(b) {
                    var c = b.target;
                    if (e(c).is(f)) g.call(c, b); else {
                        c = e(c).parents();
                        for (var l = 0; l < c.length; l++) e(c[l]).is(f) && g.call(c[l], b)
                    }
                }

                var l, k = b.split(" ");
                for (b = 0; b < this.length; b++) if ("function" == typeof f || !1 === f) for ("function" == typeof f && (g = f, n = g || !1),
                                                                                                   l = 0; l < k.length; l++) this[b].addEventListener(k[l], g, n); else for (l = 0; l < k.length; l++) this[b].dom7LiveListeners || (this[b].dom7LiveListeners = []), this[b].dom7LiveListeners.push({
                    listener: g,
                    liveListener: c
                }), this[b].addEventListener(k[l], c, n);
                return this
            }, off: function (b, f, e, g) {
                b = b.split(" ");
                for (var c = 0; c < b.length; c++) for (var l = 0; l < this.length; l++) if ("function" == typeof f || !1 === f) "function" == typeof f && (e = f, g = e || !1), this[l].removeEventListener(b[c], e, g); else if (this[l].dom7LiveListeners) for (var k = 0; k < this[l].dom7LiveListeners.length; k++) this[l].dom7LiveListeners[k].listener ===
                e && this[l].removeEventListener(b[c], this[l].dom7LiveListeners[k].liveListener, g);
                return this
            }, once: function (b, f, e, g) {
                function c(k) {
                    e(k);
                    l.off(b, f, c, g)
                }

                var l = this;
                "function" == typeof f && (f = !1, e = f, g = e);
                l.on(b, f, c, g)
            }, trigger: function (b, f) {
                for (var c = 0; c < this.length; c++) {
                    try {
                        var e = new window.CustomEvent(b, {detail: f, bubbles: !0, cancelable: !0})
                    } catch (t) {
                        e = document.createEvent("Event"), e.initEvent(b, !0, !0), e.detail = f
                    }
                    this[c].dispatchEvent(e)
                }
                return this
            }, transitionEnd: function (b) {
                function c(f) {
                    if (f.target ===
                        this) for (b.call(this, f), e = 0; e < g.length; e++) k.off(g[e], c)
                }

                var e,
                    g = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
                    k = this;
                if (b) for (e = 0; e < g.length; e++) k.on(g[e], c);
                return this
            }, width: function () {
                return this[0] === window ? window.innerWidth : 0 < this.length ? parseFloat(this.css("width")) : null
            }, outerWidth: function (b) {
                return 0 < this.length ? b ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
            }, height: function () {
                return this[0] ===
                window ? window.innerHeight : 0 < this.length ? parseFloat(this.css("height")) : null
            }, outerHeight: function (b) {
                return 0 < this.length ? b ? this[0].offsetHeight + parseFloat(this.css("margin-top")) + parseFloat(this.css("margin-bottom")) : this[0].offsetHeight : null
            }, offset: function () {
                if (0 < this.length) {
                    var b = this[0], f = b.getBoundingClientRect(), e = document.body;
                    return {
                        top: f.top + (window.pageYOffset || b.scrollTop) - (b.clientTop || e.clientTop || 0),
                        left: f.left + (window.pageXOffset || b.scrollLeft) - (b.clientLeft || e.clientLeft || 0)
                    }
                }
                return null
            },
            css: function (b, f) {
                var c;
                if (1 === arguments.length) {
                    if ("string" != typeof b) {
                        for (c = 0; c < this.length; c++) for (var e in b) this[c].style[e] = b[e];
                        return this
                    }
                    if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(b)
                }
                if (2 === arguments.length && "string" == typeof b) for (c = 0; c < this.length; c++) this[c].style[b] = f;
                return this
            }, each: function (b) {
                for (var c = 0; c < this.length; c++) b.call(this[c], c, this[c]);
                return this
            }, html: function (b) {
                if (void 0 === b) return this[0] ? this[0].innerHTML : void 0;
                for (var c = 0; c < this.length; c++) this[c].innerHTML =
                    b;
                return this
            }, text: function (b) {
                if (void 0 === b) return this[0] ? this[0].textContent.trim() : null;
                for (var c = 0; c < this.length; c++) this[c].textContent = b;
                return this
            }, is: function (c) {
                if (!this[0]) return !1;
                if ("string" == typeof c) {
                    var f = this[0];
                    if (f === document) return c === document;
                    if (f === window) return c === window;
                    if (f.matches) return f.matches(c);
                    if (f.webkitMatchesSelector) return f.webkitMatchesSelector(c);
                    if (f.mozMatchesSelector) return f.mozMatchesSelector(c);
                    if (f.msMatchesSelector) return f.msMatchesSelector(c);
                    c = e(c);
                    for (f = 0; f < c.length; f++) if (c[f] === this[0]) return !0;
                    return !1
                }
                if (c === document) return this[0] === document;
                if (c === window) return this[0] === window;
                if (c.nodeType || c instanceof b) for (c = c.nodeType ? [c] : c, f = 0; f < c.length; f++) if (c[f] === this[0]) return !0;
                return !1
            }, index: function () {
                if (this[0]) {
                    for (var b = this[0], e = 0; null !== (b = b.previousSibling);) 1 === b.nodeType && e++;
                    return e
                }
            }, eq: function (c) {
                if (void 0 === c) return this;
                var e, g = this.length;
                return c > g - 1 ? new b([]) : 0 > c ? (e = g + c, new b(0 > e ? [] : [this[e]])) : new b([this[c]])
            },
            append: function (c) {
                var e;
                for (e = 0; e < this.length; e++) if ("string" == typeof c) {
                    var g = document.createElement("div");
                    for (g.innerHTML = c; g.firstChild;) this[e].appendChild(g.firstChild)
                } else if (c instanceof b) for (g = 0; g < c.length; g++) this[e].appendChild(c[g]); else this[e].appendChild(c);
                return this
            }, prepend: function (c) {
                var e, g;
                for (e = 0; e < this.length; e++) if ("string" == typeof c) {
                    var k = document.createElement("div");
                    k.innerHTML = c;
                    for (g = k.childNodes.length - 1; 0 <= g; g--) this[e].insertBefore(k.childNodes[g], this[e].childNodes[0])
                } else if (c instanceof
                    b) for (g = 0; g < c.length; g++) this[e].insertBefore(c[g], this[e].childNodes[0]); else this[e].insertBefore(c, this[e].childNodes[0]);
                return this
            }, insertBefore: function (b) {
                b = e(b);
                for (var c = 0; c < this.length; c++) if (1 === b.length) b[0].parentNode.insertBefore(this[c], b[0]); else if (1 < b.length) for (var g = 0; g < b.length; g++) b[g].parentNode.insertBefore(this[c].cloneNode(!0), b[g])
            }, insertAfter: function (b) {
                b = e(b);
                for (var c = 0; c < this.length; c++) if (1 === b.length) b[0].parentNode.insertBefore(this[c], b[0].nextSibling); else if (1 <
                    b.length) for (var g = 0; g < b.length; g++) b[g].parentNode.insertBefore(this[c].cloneNode(!0), b[g].nextSibling)
            }, next: function (c) {
                return new b(0 < this.length ? c ? this[0].nextElementSibling && e(this[0].nextElementSibling).is(c) ? [this[0].nextElementSibling] : [] : this[0].nextElementSibling ? [this[0].nextElementSibling] : [] : [])
            }, nextAll: function (c) {
                var f = [], g = this[0];
                if (!g) return new b([]);
                for (; g.nextElementSibling;) g = g.nextElementSibling, c ? e(g).is(c) && f.push(g) : f.push(g);
                return new b(f)
            }, prev: function (c) {
                return new b(0 <
                this.length ? c ? this[0].previousElementSibling && e(this[0].previousElementSibling).is(c) ? [this[0].previousElementSibling] : [] : this[0].previousElementSibling ? [this[0].previousElementSibling] : [] : [])
            }, prevAll: function (c) {
                var f = [], g = this[0];
                if (!g) return new b([]);
                for (; g.previousElementSibling;) g = g.previousElementSibling, c ? e(g).is(c) && f.push(g) : f.push(g);
                return new b(f)
            }, parent: function (b) {
                for (var c = [], g = 0; g < this.length; g++) b ? e(this[g].parentNode).is(b) && c.push(this[g].parentNode) : c.push(this[g].parentNode);
                return e(e.unique(c))
            }, parents: function (b) {
                for (var c = [], g = 0; g < this.length; g++) for (var k = this[g].parentNode; k;) b ? e(k).is(b) && c.push(k) : c.push(k), k = k.parentNode;
                return e(e.unique(c))
            }, find: function (c) {
                for (var e = [], g = 0; g < this.length; g++) for (var k = this[g].querySelectorAll(c), m = 0; m < k.length; m++) e.push(k[m]);
                return new b(e)
            }, children: function (c) {
                for (var f = [], g = 0; g < this.length; g++) for (var k = this[g].childNodes, m = 0; m < k.length; m++) c ? 1 === k[m].nodeType && e(k[m]).is(c) && f.push(k[m]) : 1 === k[m].nodeType && f.push(k[m]);
                return new b(e.unique(f))
            }, remove: function () {
                for (var b = 0; b < this.length; b++) this[b].parentNode && this[b].parentNode.removeChild(this[b]);
                return this
            }, add: function () {
                var b, f;
                for (b = 0; b < arguments.length; b++) {
                    var g = e(arguments[b]);
                    for (f = 0; f < g.length; f++) this[this.length] = g[f], this.length++
                }
                return this
            }
        }, e.fn = b.prototype, e.unique = function (b) {
            for (var c = [], e = 0; e < b.length; e++) -1 === c.indexOf(b[e]) && c.push(b[e]);
            return c
        }, e
    }(), k = ["jQuery", "Zepto", "Dom7"], p = 0;
    for (; p < k.length; p++) window[k[p]] && function (b) {
        b.fn.rplgsw =
            function (g) {
                var c;
                return b(this).each(function () {
                    var b = new e(this, g);
                    c || (c = b)
                }), c
            }
    }(window[k[p]]);
    (k = void 0 === g ? window.Dom7 || window.Zepto || window.jQuery : g) && ("transitionEnd" in k.fn || (k.fn.transitionEnd = function (b) {
        function e(k) {
            if (k.target === this) for (b.call(this, k), c = 0; c < f.length; c++) g.off(f[c], e)
        }

        var c, f = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            g = this;
        if (b) for (c = 0; c < f.length; c++) g.on(f[c], e);
        return this
    }), "transform" in k.fn || (k.fn.transform = function (b) {
        for (var e =
            0; e < this.length; e++) {
            var c = this[e].style;
            c.webkitTransform = c.MsTransform = c.msTransform = c.MozTransform = c.OTransform = c.transform = b
        }
        return this
    }), "transition" in k.fn || (k.fn.transition = function (b) {
        "string" != typeof b && (b += "ms");
        for (var e = 0; e < this.length; e++) {
            var c = this[e].style;
            c.webkitTransitionDuration = c.MsTransitionDuration = c.msTransitionDuration = c.MozTransitionDuration = c.OTransitionDuration = c.transitionDuration = b
        }
        return this
    }), "outerWidth" in k.fn || (k.fn.outerWidth = function (b) {
        return 0 < this.length ?
            b ? this[0].offsetWidth + parseFloat(this.css("margin-right")) + parseFloat(this.css("margin-left")) : this[0].offsetWidth : null
    }));
    window.Rplgsw = e
}();
"undefined" != typeof module ? module.exports = window.Rplgsw : "function" == typeof define && define.amd && define([], function () {
    return window.Rplgsw
});

function rplg_svg() {
    return '<svg><defs><g id="star" width="17" height="17"><path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path></g><g id="star-half" width="17" height="17"><path d="M1250 957l257-250-356-52-66-10-30-60-159-322v963l59 31 318 168-60-355-12-66zm452-262l-363 354 86 500q5 33-6 51.5t-34 18.5q-17 0-40-12l-449-236-449 236q-23 12-40 12-23 0-34-18.5t-6-51.5l86-500-364-354q-32-32-23-59.5t54-34.5l502-73 225-455q20-41 49-41 28 0 49 41l225 455 502 73q45 7 54 34.5t-24 59.5z"></path></g><g id="star-o" width="17" height="17"><path d="M1201 1004l306-297-422-62-189-382-189 382-422 62 306 297-73 421 378-199 377 199zm527-357q0 22-26 48l-363 354 86 500q1 7 1 20 0 50-41 50-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="#ccc"></path></g><g id="logo-g" height="44" width="44" fill="none" fill-rule="evenodd"><path d="M482.56 261.36c0-16.73-1.5-32.83-4.29-48.27H256v91.29h127.01c-5.47 29.5-22.1 54.49-47.09 71.23v59.21h76.27c44.63-41.09 70.37-101.59 70.37-173.46z" fill="#4285f4"></path><path d="M256 492c63.72 0 117.14-21.13 156.19-57.18l-76.27-59.21c-21.13 14.16-48.17 22.53-79.92 22.53-61.47 0-113.49-41.51-132.05-97.3H45.1v61.15c38.83 77.13 118.64 130.01 210.9 130.01z" fill="#34a853"></path><path d="M123.95 300.84c-4.72-14.16-7.4-29.29-7.4-44.84s2.68-30.68 7.4-44.84V150.01H45.1C29.12 181.87 20 217.92 20 256c0 38.08 9.12 74.13 25.1 105.99l78.85-61.15z" fill="#fbbc05"></path><path d="M256 113.86c34.65 0 65.76 11.91 90.22 35.29l67.69-67.69C373.03 43.39 319.61 20 256 20c-92.25 0-172.07 52.89-210.9 130.01l78.85 61.15c18.56-55.78 70.59-97.3 132.05-97.3z" fill="#ea4335"></path><path d="M20 20h472v472H20V20z"></path></g><g id="logo-f" width="30" height="30" transform="translate(23,85) scale(0.05,-0.05)"><path fill="#fff" d="M959 1524v-264h-157q-86 0 -116 -36t-30 -108v-189h293l-39 -296h-254v-759h-306v759h-255v296h255v218q0 186 104 288.5t277 102.5q147 0 228 -12z"></path></g><g id="logo-y" x="0px" y="0px" width="44" height="44" style="enable-background:new 0 0 533.33 533.33;" xml:space="preserve"><path d="M317.119,340.347c-9.001,9.076-1.39,25.586-1.39,25.586l67.757,113.135c0,0,11.124,14.915,20.762,14.915   c9.683,0,19.246-7.952,19.246-7.952l53.567-76.567c0,0,5.395-9.658,5.52-18.12c0.193-12.034-17.947-15.33-17.947-15.33   l-126.816-40.726C337.815,335.292,325.39,331.994,317.119,340.347z M310.69,283.325c6.489,11.004,24.389,7.798,24.389,7.798   l126.532-36.982c0,0,17.242-7.014,19.704-16.363c2.415-9.352-2.845-20.637-2.845-20.637l-60.468-71.225   c0,0-5.24-9.006-16.113-9.912c-11.989-1.021-19.366,13.489-19.366,13.489l-71.494,112.505   C311.029,261.999,304.709,273.203,310.69,283.325z M250.91,239.461c14.9-3.668,17.265-25.314,17.265-25.314l-1.013-180.14   c0,0-2.247-22.222-12.232-28.246c-15.661-9.501-20.303-4.541-24.79-3.876l-105.05,39.033c0,0-10.288,3.404-15.646,11.988   c-7.651,12.163,7.775,29.972,7.775,29.972l109.189,148.831C226.407,231.708,237.184,242.852,250.91,239.461z M224.967,312.363   c0.376-13.894-16.682-22.239-16.682-22.239L95.37,233.079c0,0-16.732-6.899-24.855-2.091c-6.224,3.677-11.738,10.333-12.277,16.216   l-7.354,90.528c0,0-1.103,15.685,2.963,22.821c5.758,10.128,24.703,3.074,24.703,3.074L210.37,334.49   C215.491,331.048,224.471,330.739,224.967,312.363z M257.746,361.219c-11.315-5.811-24.856,6.224-24.856,6.224l-88.265,97.17   c0,0-11.012,14.858-8.212,23.982c2.639,8.552,7.007,12.802,13.187,15.797l88.642,27.982c0,0,10.747,2.231,18.884-0.127   c11.552-3.349,9.424-21.433,9.424-21.433l2.003-131.563C268.552,379.253,268.101,366.579,257.746,361.219z" fill="#D80027"/></g><g id="dots" fill="none" fill-rule="evenodd" width="12" height="12"><circle cx="6" cy="3" r="1" fill="#000"/><circle cx="6" cy="6" r="1" fill="#000"/><circle cx="6" cy="9" r="1" fill="#000"/></g></defs></svg>'
}

function simple_stars(b, e) {
    for (var g = "", k = 1; 6 > k; k++) {
        var p = b - k;
        g = 0 <= p ? g + ('<svg viewBox="0 0 1792 1792" width="17" height="17"><use xlink:href="#star" fill="' + e + '"/></svg>') : -1 < p && 0 > p ? -.75 > p ? g + '<svg viewBox="0 0 1792 1792" width="17" height="17"><use xlink:href="#star-o"/></svg>' : -.25 < p ? g + ('<svg viewBox="0 0 1792 1792" width="17" height="17"><use xlink:href="#star" fill="' + e + '"/></svg>') : g + ('<svg viewBox="0 0 1792 1792" width="17" height="17"><use xlink:href="#star-half" fill="' + e + '"/></svg>') : g + '<svg viewBox="0 0 1792 1792" width="17" height="17"><use xlink:href="#star-o"/></svg>'
    }
    return g
}

function yelp_stars(b) {
    b = Math.round(2 * b) / 2;
    return '<svg class="yrw-rating yrw-rating-' + 10 * b + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 865 145" width="865" height="145"><path class="yrw-stars-1f" d="M110.6 0h-76.9c-18.6 0-33.7 15.1-33.7 33.7v76.9c0 18.6 15.1 33.7 33.7 33.7h76.9c18.6 0 33.7-15.1 33.7-33.7v-76.9c0-18.6-15.1-33.7-33.7-33.7z"/><path class="yrw-stars-0h" d="M33.3,0.3C14.7,0.3-0.4,15.4-0.4,34V111c0,18.6,15.1,33.7,33.7,33.7h38.3V0.3H33.3z"/><path class="yrw-stars-2f" d="M290.6 0h-76.9c-18.6 0-33.7 15.1-33.7 33.7v76.9c0 18.6 15.1 33.7 33.7 33.7h76.9c18.6 0 33.7-15.1 33.7-33.7v-76.9c0-18.6-15.1-33.7-33.7-33.7z"/><path class="yrw-stars-1h" d="M214,0.3c-18.6,0-33.7,15.1-33.7,33.7v77c0,18.6,15.1,33.7,33.7,33.7h38.3V0.3H214z"/><path class="yrw-stars-3f" d="M470.4 0h-76.9c-18.6 0-33.7 15.1-33.7 33.7v76.9c0 18.6 15.1 33.7 33.7 33.7h76.9c18.6 0 33.7-15.1 33.7-33.7v-76.9c.1-18.6-15.1-33.7-33.7-33.7z"/><path class="yrw-stars-2h" d="M393.9,0.6c-18.6,0-33.7,15.1-33.7,33.7v77c0,18.6,15.1,33.7,33.7,33.7h38.3V0.6H393.9z"/><path class="yrw-stars-4f" d="M650.6 0h-76.9c-18.6 0-33.7 15.1-33.7 33.7v76.9c0 18.6 15.1 33.7 33.7 33.7h76.9c18.6 0 33.7-15.1 33.7-33.7v-76.9c0-18.6-15.1-33.7-33.7-33.7z"/><path class="yrw-stars-3h" d="M573.9 0c-18.6 0-33.7 15.1-33.7 33.7v77c0 18.6 15.1 33.7 33.7 33.7h38.3v-144.4h-38.3z"/><path class="yrw-stars-5f" d="M830.6 0h-76.9c-18.6 0-33.7 15.1-33.7 33.7v76.9c0 18.6 15.1 33.7 33.7 33.7h76.9c18.6 0 33.7-15.1 33.7-33.7v-76.9c0-18.6-15.1-33.7-33.7-33.7z"/><path class="yrw-stars-4h" d="M753.8 0c-18.6 0-33.7 15.1-33.7 33.7v77c0 18.6 15.1 33.7 33.7 33.7h38.3v-144.4h-38.3z"/><path class="yrw-stars" fill="#FFF" stroke="#FFF" stroke-width="2" stroke-linejoin="round" d="M72 19.3l13.6 35.4 37.9 2-29.5 23.9 9.8 36.6-31.8-20.6-31.8 20.6 9.8-36.6-29.5-23.9 37.9-2zm180.2 0l13.6 35.4 37.8 2-29.4 23.9 9.8 36.6-31.8-20.6-31.9 20.6 9.8-36.6-29.4-23.9 37.8-2zm179.8 0l13.6 35.4 37.9 2-29.5 23.9 9.8 36.6-31.8-20.6-31.8 20.6 9.8-36.6-29.5-23.9 37.9-2zm180.2 0l13.6 35.4 37.8 2-29.4 23.9 9.8 36.6-31.8-20.6-31.9 20.6 9.8-36.6-29.4-23.9 37.8-2zm180 0l13.6 35.4 37.8 2-29.4 23.9 9.8 36.6-31.8-20.6-31.9 20.6 9.8-36.6-29.4-23.9 37.8-2z"/></svg>'
}

function render_stars(b, e, g) {
    switch (e) {
        case "google":
            return simple_stars(b, "#e7711b");
        case "facebook":
            return simple_stars(b, "#3c5b9b");
        case "yelp":
            return yelp_stars(b)
    }
    return simple_stars(b, g)
}

function render_logo(b) {
    switch (b) {
        case "google":
            return '<svg viewBox="0 0 512 512" width="44" height="44"><use xlink:href="#logo-g"/></svg>';
        case "facebook":
            return '<svg viewBox="0 0 100 100" width="44" height="44"><use xlink:href="#logo-f"/></svg>';
        case "yelp":
            return '<svg viewBox="0 0 533.33 533.33" width="44" height="44"><use xlink:href="#logo-y"/></svg>'
    }
}

function render_rplg_logo(b) {
    return "summary" == b ? "" : '<span class="rplg-social-logo rplg-' + b + '-logo">' + render_logo(b) + "</span>"
}

function _rplg_init_svg(b) {
    var e = document.createElement("span");
    e.style.display = "none";
    e.innerHTML = rplg_svg();
    document.body.appendChild(e);
    var g = b.querySelectorAll(".rplg-stars");
    for (e = 0; e < g.length; e++) {
        var k = g[e].getAttribute("data-info").split(",");
        g[e].innerHTML = render_stars(k[0], k[1], k[2])
    }
    b = b.querySelectorAll(".rplg [data-badge]");
    for (e = 0; e < b.length; e++) b[e].innerHTML = render_rplg_logo(b[e].getAttribute("data-badge"))
}

function _rplg_badge_init(b) {
    var e = -1 < b.querySelector(".rplg-badge-cnt").className.indexOf("-fixed");
    e && document.body.appendChild(b);
    b = b.querySelectorAll(".rplg-badge2");
    for (var g = document.createElement("div"), k = 0; k < b.length; k++) {
        var p = b[k], q = p.getAttribute("data-provider"), m = "badge_float_" + q, c = sessionStorage.getItem(m),
            f = p.querySelector(".rplg-badge-logo"), l = p.querySelector(".rplg-badge2-btn"),
            n = p.querySelector(".rplg-badge2-close"), t = p.querySelector(".rplg-form");
        (function (b, c, f, k, l, m, p, n) {
            e && (b.style.display =
                "block");
            p && (f && JSON.parse(f).hide && (b.style.display = "none"), p.onclick = function () {
                b.style.display = "none";
                var e = JSON.parse(sessionStorage.getItem(c) || "{}");
                e.hide = !0;
                sessionStorage.setItem(c, JSON.stringify(e))
            });
            l && "summary" != k && (l.innerHTML = render_logo(k));
            n && (m.onclick = function () {
                rplg_load_imgs(n);
                n.style.display = "block"
            }, g.appendChild(n))
        })(p, m, c, q, f, l, n, t)
    }
    g.hasChildNodes() && (g.className = "rplg", document.body.appendChild(g))
}

function rplg_load_imgs(b) {
    b = b.querySelectorAll("img.rplg-blazy[data-src]");
    for (var e = 0; e < b.length; e++) b[e].setAttribute("src", b[e].getAttribute("data-src")), b[e].removeAttribute("data-src")
}

function rplg_next_reviews(b) {
    var e = this.parentNode;
    reviews = e.querySelectorAll(".rplg .rplg-hide");
    for (var g = 0; g < b && g < reviews.length; g++) reviews[g] && (reviews[g].className = reviews[g].className.replace("rplg-hide", ""));
    reviews = e.querySelectorAll(".rplg .rplg-hide");
    1 > reviews.length && e.removeChild(this);
    window.rplg_blazy && window.rplg_blazy.revalidate();
    return !1
}

function rplg_leave_review_window() {
    _rplg_popup(this.getAttribute("href"), 620, 500);
    return !1
}

function _rplg_lang() {
    var b = navigator;
    return (b.language || b.systemLanguage || b.userLanguage || "en").substr(0, 2).toLowerCase()
}

function _rplg_popup(b, e, g) {
    var k = document.documentElement;
    b = window.open(b, "", "scrollbars=yes, width=" + e + ", height=" + g + ", top=" + ((window.innerHeight ? window.innerHeight : k.clientHeight ? k.clientHeight : screen.height) / 2 - g / 2 + (void 0 != window.screenTop ? window.screenTop : window.screenY)) + ", left=" + ((window.innerWidth ? window.innerWidth : k.clientWidth ? k.clientWidth : screen.width) / 2 - e / 2 + (void 0 != window.screenLeft ? window.screenLeft : window.screenX)));
    window.focus && b.focus();
    return b
}

function _rplg_init_timeago(b) {
    b = b.querySelectorAll(".rplg [data-time]");
    for (var e = 0; e < b.length; e++) {
        var g = 1E3 * parseInt(b[e].getAttribute("data-time"));
        b[e].innerHTML = WPacTime.getTime(g, _rplg_lang(), "ago")
    }
}

function _rplg_init_blazy(b) {
    window.Blazy ? window.rplg_blazy = new Blazy({selector: "img.rplg-blazy"}) : 0 < b && setTimeout(function () {
        _rplg_init_blazy(b - 1)
    }, 200)
}

function _rplg_read_more(b) {
    b = b.querySelectorAll(".rplg-more-toggle");
    for (var e = 0; e < b.length; e++) (function (b) {
        b.onclick = function () {
            b.parentNode.removeChild(b.previousSibling.previousSibling);
            b.previousSibling.className = "";
            b.textContent = ""
        }
    })(b[e])
}

function _rplg_init_slider(b, e) {
    if (!window.Rplgsw) return setTimeout(function () {
        _rplg_init_slider(b, e)
    }, 200);
    var g = b.querySelector(".rplgsw-container"), k = {
        loop: !0,
        autoplay: parseInt(e.speed),
        effect: e.effect,
        slidesPerView: parseInt(e.count),
        spaceBetween: parseInt(e.space),
        autoHeight: !0,
        fade: {crossFade: !0},
        breakpoints: {},
        onInit: function (b) {
            setTimeout(function () {
                window.dispatchEvent(new Event("resize"))
            }, 500)
        },
        onTransitionEnd: function (b) {
            window.rplg_blazy && window.rplg_blazy.revalidate()
        }
    };
    e.pagin && (k.paginationClickable =
        !0, k.pagination = ".rplgsw-pagination");
    e.nextprev && (k.nextButton = b.querySelector(".rplg-slider-next"), k.prevButton = b.querySelector(".rplg-slider-prev"));
    k.breakpoints[e.mobileBreakpoint] = {slidesPerView: parseInt(e.mobileCount), spaceBetween: 10};
    k.breakpoints[e.tabletBreakpoint] = {slidesPerView: parseInt(e.tabletCount), spaceBetween: 20};
    k.breakpoints[e.desktopBreakpoint] = {slidesPerView: parseInt(e.desktopCount), spaceBetween: 30};
    return new Rplgsw(g, k)
}

function _rplg_init_flash(b, e) {
    var g = 0, k = !1, p = !1, q = [], m = b.querySelector(".rplg-flash-content"), c = m.querySelector(".rplg-flash-x"),
        f = m.querySelector(".rplg-flash-card"), l = m.querySelector(".rplg-flash-story"),
        n = 1E3 * (e.flash_start || 3), t = 1E3 * (e.flash_visible || 5), u = 1E3 * (e.flash_invisible || 5);
    document.body.appendChild(b);
    for (var A = b.querySelectorAll(".rplg-form-review"), y = 0; y < A.length; y++) {
        var w = A[y], E = w.querySelector(".rplg-stars").getAttribute("data-info").split(",");
        if (e.disable_review_time) var x = "";
        else x = w.querySelector(".rplg-review-time"), x = e.time_format ? x.innerText : x.getAttribute("data-time");
        q.push({
            avatar: e.hide_avatar ? "" : w.querySelector(".rplg-review-avatar").getAttribute("data-src"),
            author_name: e.hide_name ? "" : w.querySelector(".rplg-review-name").getAttribute("title"),
            time: x,
            rating: E[0],
            provider: E[1]
        })
    }
    var r = function (c) {
        k || p || (_rplg_flashnext(b, l, g, q, e), m.className = "rplg-flash-content rplg-flash-visible", g = g + 1 < q.length ? g + 1 : 0);
        p = !1;
        setTimeout(function () {
            var b;
            if (b = !k) b = m.parentElement.querySelector(":hover") !==
                m;
            b && !p && (m.className = "rplg-flash-content");
            setTimeout(r, u)
        }, t)
    };
    setTimeout(r, n);
    c.onclick = function () {
        m.className = "rplg-flash-content"
    };
    l.onclick = function () {
        k = !0;
        rplg_load_imgs(m);
        var b = f.querySelector(".rplg-row").getAttribute("data-idx"),
            e = f.querySelector('.rplg-form-review[data-idx="' + b + '"]');
        e.className = "rplg-form-review rplg-highlight";
        setTimeout(function () {
            e.scrollIntoView({behavior: "smooth", block: "center"})
        }, 300);
        f.className = "rplg-flash-card rplg-flash-expanded";
        m.className = "rplg-flash-content rplg-flash-visible";
        c.innerHTML = '<svg viewBox="0 0 86.001 86.001"><path style="fill:#030104" d="M5.907,21.004c-1.352-1.338-3.542-1.338-4.894,0c-1.35,1.336-1.352,3.506,0,4.844l39.54,39.15   c1.352,1.338,3.542,1.338,4.894,0l39.54-39.15c1.351-1.338,1.352-3.506,0-4.844c-1.352-1.338-3.542-1.338-4.894-0.002L43,56.707   L5.907,21.004z"></path></svg>';
        c.onclick = function () {
            e.className = "rplg-form-review";
            f.className = "rplg-flash-card";
            k = !1;
            p = !0;
            c.innerHTML = "\u00d7";
            c.onclick = function () {
                m.className = "rplg-flash-content"
            }
        }
    }
}

function _rplg_flashnext(b, e, g, k, p) {
    e.firstChild ? (b = k[g], e.querySelector(".rplg-row").setAttribute("data-idx", g), p.flash_user_photo ? e.querySelector(".rplg-flash-img").innerHTML = '<img src="' + b.avatar + '" class="rplg-review-avatar" alt="' + b.author_name + '" width="44" height="44">' : p.hide_avatar || (e.querySelector(".rplg-flash-photo").innerHTML = '<img src="' + b.avatar + '" class="rplg-review-avatar" alt="' + b.author_name + '" width="16" height="16">'), p.hide_name || (e.querySelector(".rplg-flash-name").innerHTML =
        b.author_name), e.querySelector(".rplg-flash-rating").innerHTML = parseInt(b.rating), e.querySelector(".rplg-flash-stars").innerHTML = _rplg_flashtext(b, p), p.disable_review_time || (e.querySelector(".rplg-flash-time").innerHTML = p.time_format ? b.time : WPacTime.getTimeAgo(1E3 * b.time, _rplg_lang(), "ago"))) : e.innerHTML = _rplg_flashstory(g, k, p)
}

function _rplg_flashstory(b, e, g) {
    e = e[b];
    return '<div class="rplg-row" data-idx="' + b + '">' + (g.flash_hide_logo && !g.flash_user_photo ? "" : '<div class="rplg-row-left"><div class="rplg-flash-img">' + (g.flash_user_photo ? '<img src="' + e.avatar + '" class="rplg-review-avatar" alt="' + e.author_name + '" width="44" height="44">' : '<span style="position:relative;display:inline-block;margin:0 6px 0 0;vertical-align: middle;"><svg viewBox="0 0 1792 1792" width="44" height="44"><path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" fill="#FFAF02"></path></svg><span style="position:absolute;bottom: 0px;right: 0px;width: 28px;height: 28px;background:#fff;border-radius:50%;border:4px solid #212121;"></span><svg width="28" height="28" viewBox="0 0 1792 1792" style="position:absolute;bottom: 0px;right: 0px;border-radius:50%;"><path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" fill="#8cc976"></path></svg></span>') +
        "</div></div>") + '<div class="rplg-row-right"><div class="rplg-flash-text">' + (g.flash_user_photo || g.hide_avatar ? "" : '<span class="rplg-flash-photo"><img src="' + e.avatar + '" class="rplg-review-avatar" alt="' + e.author_name + '" width="16" height="16"></span>') + (g.hide_name ? "" : '<span class="rplg-flash-name">' + e.author_name + "</span> ") + "<span> " + g.text.m1.replace("%s", '<span class="rplg-flash-rating">' + e.rating + "</span>") + '</span></div><div class="rplg-flash-stars">' + _rplg_flashtext(e, g) + '</div><div class="rplg-flash-footer">' +
        (g.disable_review_time ? "" : '<span class="rplg-flash-time">' + (g.time_format ? e.time : WPacTime.getTimeAgo(1E3 * e.time, _rplg_lang(), "ago")) + "</span>") + '<span class="rplg-flash-power"></span></div></div></div>'
}

function _rplg_flashtext(b, e) {
    return '<span class="rplg-flash-star" data-provider="' + b.provider + '">' + render_stars(b.rating, b.provider, "ffa318") + "</span> " + e.text.m2 + ' <span class="rplg-flash-logo" data-provider="' + b.provider + '">' + render_logo(b.provider) + "</span>"
}

function _rplg_get_parent(b, e) {
    e = e || "rplg";
    if (0 > b.className.split(" ").indexOf(e)) for (; (b = b.parentElement) && 0 > b.className.split(" ").indexOf(e);) ;
    return b
}

function rplg_init(b, e) {
    b = _rplg_get_parent(b);
    var g = b.querySelector("img[data-exec]");
    if ("true" == g.getAttribute("data-exec")) return b;
    _rplg_init_svg(b);
    _rplg_init_timeago(b);
    _rplg_read_more(b);
    e && e(b);
    _rplg_init_blazy(10);
    g.setAttribute("data-exec", "true");
    return b
}

function rplg_init_slider_theme(b, e) {
    rplg_init(b, function (b) {
        _rplg_init_slider(b, e)
    })
}

function rplg_init_grid_theme(b) {
    rplg_init(b)
}

function rplg_init_list_theme(b) {
    rplg_init(b)
}

function rplg_init_badge_theme(b) {
    rplg_init(b, function (b) {
        _rplg_badge_init(b)
    })
}

function rplg_init_temp_theme(b) {
    rplg_init(b)
}

function rplg_init_flash_theme(b, e) {
    rplg_init(b, function (b) {
        _rplg_init_flash(b, e)
    })
}

document.addEventListener("DOMContentLoaded", function () {
    for (var b = function (b) {
        eval(b)
    }, e = document.querySelectorAll('.rplg > img[data-exec="false"]'), g = 0; g < e.length; g++) (function (e) {
        if ("false" == e.getAttribute("data-exec")) {
            var g = e.getAttribute("onload");
            b.call(e, g);
            console.log("rplg exec")
        }
    })(e[g])
});