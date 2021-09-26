/** @license


 SoundManager 2: JavaScript Sound for the Web
 ----------------------------------------------
 http://schillmania.com/projects/soundmanager2/

 Copyright (c) 2007, Scott Schiller. All rights reserved.
 Code provided under the BSD License:
 http://schillmania.com/projects/soundmanager2/license.txt

 V2.97a.20150601
*/
(function(h, g) {
    function K(sb, K) {
        function ha(b) {
            return c.preferFlash && H && !c.ignoreFlash && c.flash[b] !== g && c.flash[b]
        }

        function r(b) {
            return function(d) {
                var e = this._s;
                e && e._a ? d = b.call(this, d) : (e && e.id ? c._wD(e.id + ": Ignoring " + d.type) : c._wD("HTML5::Ignoring " + d.type), d = null);
                return d
            }
        }
        this.setupOptions = {
            url: sb || null,
            flashVersion: 8,
            debugMode: !0,
            debugFlash: !1,
            useConsole: !0,
            consoleOnly: !0,
            waitForWindowLoad: !1,
            bgColor: "#ffffff",
            useHighPerformance: !1,
            flashPollingInterval: null,
            html5PollingInterval: null,
            flashLoadTimeout: 1E3,
            wmode: null,
            allowScriptAccess: "always",
            useFlashBlock: !1,
            useHTML5Audio: !0,
            forceUseGlobalHTML5Audio: !1,
            ignoreMobileRestrictions: !1,
            html5Test: /^(probably|maybe)$/i,
            preferFlash: !1,
            noSWFCache: !1,
            idPrefix: "sound"
        };
        this.defaultOptions = {
            autoLoad: !1,
            autoPlay: !1,
            from: null,
            loops: 1,
            onid3: null,
            onload: null,
            whileloading: null,
            onplay: null,
            onpause: null,
            onresume: null,
            whileplaying: null,
            onposition: null,
            onstop: null,
            onfailure: null,
            onfinish: null,
            multiShot: !0,
            multiShotEvents: !1,
            position: null,
            pan: 0,
            stream: !0,
            to: null,
            type: null,
            usePolicyFile: !1,
            volume: 100
        };
        this.flash9Options = {
            isMovieStar: null,
            usePeakData: !1,
            useWaveformData: !1,
            useEQData: !1,
            onbufferchange: null,
            ondataerror: null
        };
        this.movieStarOptions = {
            bufferTime: 3,
            serverURL: null,
            onconnect: null,
            duration: null
        };
        this.audioFormats = {
            mp3: {
                type: ['audio/mpeg; codecs="mp3"', "audio/mpeg", "audio/mp3", "audio/MPA", "audio/mpa-robust"],
                required: !0
            },
            mp4: {
                related: ["aac", "m4a", "m4b"],
                type: ['audio/mp4; codecs="mp4a.40.2"', "audio/aac", "audio/x-m4a", "audio/MP4A-LATM", "audio/mpeg4-generic"],
                required: !1
            },
            ogg: {
                type: ["audio/ogg; codecs=vorbis"],
                required: !1
            },
            opus: {
                type: ["audio/ogg; codecs=opus", "audio/opus"],
                required: !1
            },
            wav: {
                type: ['audio/wav; codecs="1"', "audio/wav", "audio/wave", "audio/x-wav"],
                required: !1
            }
        };
        this.movieID = "sm2-container";
        this.id = K || "sm2movie";
        this.debugID = "soundmanager-debug";
        this.debugURLParam = /([#?&])debug=1/i;
        this.versionNumber = "V2.97a.20150601";
        this.altURL = this.movieURL = this.version = null;
        this.enabled = this.swfLoaded = !1;
        this.oMC = null;
        this.sounds = {};
        this.soundIDs = [];
        this.didFlashBlock =
            this.muted = !1;
        this.filePattern = null;
        this.filePatterns = {
            flash8: /\.mp3(\?.*)?$/i,
            flash9: /\.mp3(\?.*)?$/i
        };
        this.features = {
            buffering: !1,
            peakData: !1,
            waveformData: !1,
            eqData: !1,
            movieStar: !1
        };
        this.sandbox = {
            type: null,
            types: {
                remote: "remote (domain-based) rules",
                localWithFile: "local with file access (no internet access)",
                localWithNetwork: "local with network (internet access only, no local access)",
                localTrusted: "local, trusted (local+internet access)"
            },
            description: null,
            noRemote: null,
            noLocal: null
        };
        this.html5 = {
            usingFlash: null
        };
        this.flash = {};
        this.ignoreFlash = this.html5Only = !1;
        var W, c = this,
            Ya = null,
            l = null,
            F, v = navigator.userAgent,
            ia = h.location.href.toString(),
            m = document,
            ya, Za, za, n, I = [],
            Aa = !0,
            D, X = !1,
            Y = !1,
            q = !1,
            y = !1,
            ja = !1,
            p, tb = 0,
            Z, A, Ba, R, Ca, P, S, T, $a, Da, Ea, ka, z, la, Q, Fa, aa, ma, na, U, ab, Ga, bb = ["log", "info", "warn", "error"],
            cb, Ha, db, ba = null,
            Ia = null,
            t, Ja, V, eb, oa, pa, L, w, ca = !1,
            Ka = !1,
            fb, gb, hb, qa = 0,
            da = null,
            ra, M = [],
            ea, u = null,
            ib, sa, fa, N, ta, La, jb, x, kb = Array.prototype.slice,
            C = !1,
            Ma, H, Na, lb, J, mb, Oa, ua, nb = 0,
            Pa, Qa = v.match(/(ipad|iphone|ipod)/i),
            Ra = v.match(/android/i),
            O = v.match(/msie/i),
            ub = v.match(/webkit/i),
            va = v.match(/safari/i) && !v.match(/chrome/i),
            Sa = v.match(/opera/i),
            wa = v.match(/(mobile|pre\/|xoom)/i) || Qa || Ra,
            Ta = !ia.match(/usehtml5audio/i) && !ia.match(/sm2\-ignorebadua/i) && va && !v.match(/silk/i) && v.match(/OS X 10_6_([3-7])/i),
            Ua = h.console !== g && console.log !== g,
            Va = m.hasFocus !== g ? m.hasFocus() : null,
            xa = va && (m.hasFocus === g || !m.hasFocus()),
            ob = !xa,
            pb = /(mp3|mp4|mpa|m4a|m4b)/i,
            ga = m.location ? m.location.protocol.match(/http/i) : null,
            vb = ga ? "" : "http://",
            qb = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,
            rb = "mpeg4 aac flv mov mp4 m4v f4v m4a m4b mp4v 3gp 3g2".split(" "),
            wb = new RegExp("\\.(" + rb.join("|") + ")(\\?.*)?$", "i");
        this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
        this.useAltURL = !ga;
        var Wa;
        try {
            Wa = Audio !== g && (Sa && opera !== g && 10 > opera.version() ? new Audio(null) : new Audio).canPlayType !== g
        } catch (xb) {
            Wa = !1
        }
        this.hasHTML5 = Wa;
        this.setup = function(b) {
            var d = !c.url;
            b !== g && q && u && c.ok() && (b.flashVersion !== g ||
                b.url !== g || b.html5Test !== g) && L(t("setupLate"));
            Ba(b);
            if (!C)
                if (wa) {
                    if (!c.setupOptions.ignoreMobileRestrictions || c.setupOptions.forceUseGlobalHTML5Audio) M.push(z.globalHTML5), C = !0
                } else c.setupOptions.forceUseGlobalHTML5Audio && (M.push(z.globalHTML5), C = !0);
            if (!Pa && wa)
                if (c.setupOptions.ignoreMobileRestrictions) M.push(z.ignoreMobile);
                else if (c.setupOptions.useHTML5Audio && !c.setupOptions.preferFlash || c._wD(z.mobileUA), c.setupOptions.useHTML5Audio = !0, c.setupOptions.preferFlash = !1, Qa) c.ignoreFlash = !0;
            else if (Ra &&
                !v.match(/android\s2\.3/i) || !Ra) c._wD(z.globalHTML5), C = !0;
            b && (d && aa && b.url !== g && c.beginDelayedInit(), aa || b.url === g || "complete" !== m.readyState || setTimeout(Q, 1));
            Pa = !0;
            return c
        };
        this.supported = this.ok = function() {
            return u ? q && !y : c.useHTML5Audio && c.hasHTML5
        };
        this.getMovie = function(c) {
            return F(c) || m[c] || h[c]
        };
        this.createSound = function(b, d) {
            function e() {
                f = oa(f);
                c.sounds[f.id] = new W(f);
                c.soundIDs.push(f.id);
                return c.sounds[f.id]
            }
            var a, f;
            a = null;
            a = "soundManager.createSound(): " + t(q ? "notOK" : "notReady");
            if (!q ||
                !c.ok()) return L(a), !1;
            d !== g && (b = {
                id: b,
                url: d
            });
            f = A(b);
            f.url = ra(f.url);
            f.id === g && (f.id = c.setupOptions.idPrefix + nb++);
            f.id.toString().charAt(0).match(/^[0-9]$/) && c._wD("soundManager.createSound(): " + t("badID", f.id), 2);
            c._wD("soundManager.createSound(): " + f.id + (f.url ? " (" + f.url + ")" : ""), 1);
            if (w(f.id, !0)) return c._wD("soundManager.createSound(): " + f.id + " exists", 1), c.sounds[f.id];
            if (sa(f)) a = e(), c.html5Only || c._wD(f.id + ": Using HTML5"), a._setup_html5(f);
            else {
                if (c.html5Only) return c._wD(f.id + ": No HTML5 support for this sound, and no Flash. Exiting."),
                    e();
                if (c.html5.usingFlash && f.url && f.url.match(/data\:/i)) return c._wD(f.id + ": data: URIs not supported via Flash. Exiting."), e();
                8 < n && (null === f.isMovieStar && (f.isMovieStar = !!(f.serverURL || f.type && f.type.match(qb) || f.url && f.url.match(wb))), f.isMovieStar && (c._wD("soundManager.createSound(): using MovieStar handling"), 1 < f.loops && p("noNSLoop")));
                f = pa(f, "soundManager.createSound(): ");
                a = e();
                8 === n ? l._createSound(f.id, f.loops || 1, f.usePolicyFile) : (l._createSound(f.id, f.url, f.usePeakData, f.useWaveformData,
                    f.useEQData, f.isMovieStar, f.isMovieStar ? f.bufferTime : !1, f.loops || 1, f.serverURL, f.duration || null, f.autoPlay, !0, f.autoLoad, f.usePolicyFile), f.serverURL || (a.connected = !0, f.onconnect && f.onconnect.apply(a)));
                f.serverURL || !f.autoLoad && !f.autoPlay || a.load(f)
            }!f.serverURL && f.autoPlay && a.play();
            return a
        };
        this.destroySound = function(b, d) {
            if (!w(b)) return !1;
            var e = c.sounds[b],
                a;
            e.stop();
            e._iO = {};
            e.unload();
            for (a = 0; a < c.soundIDs.length; a++)
                if (c.soundIDs[a] === b) {
                    c.soundIDs.splice(a, 1);
                    break
                }
            d || e.destruct(!0);
            delete c.sounds[b];
            return !0
        };
        this.load = function(b, d) {
            return w(b) ? c.sounds[b].load(d) : !1
        };
        this.unload = function(b) {
            return w(b) ? c.sounds[b].unload() : !1
        };
        this.onposition = this.onPosition = function(b, d, e, a) {
            return w(b) ? c.sounds[b].onposition(d, e, a) : !1
        };
        this.clearOnPosition = function(b, d, e) {
            return w(b) ? c.sounds[b].clearOnPosition(d, e) : !1
        };
        this.start = this.play = function(b, d) {
            var e = null,
                a = d && !(d instanceof Object);
            if (!q || !c.ok()) return L("soundManager.play(): " + t(q ? "notOK" : "notReady")), !1;
            if (w(b, a)) a && (d = {
                url: d
            });
            else {
                if (!a) return !1;
                a && (d = {
                    url: d
                });
                d && d.url && (c._wD('soundManager.play(): Attempting to create "' + b + '"', 1), d.id = b, e = c.createSound(d).play())
            }
            null === e && (e = c.sounds[b].play(d));
            return e
        };
        this.setPosition = function(b, d) {
            return w(b) ? c.sounds[b].setPosition(d) : !1
        };
        this.stop = function(b) {
            if (!w(b)) return !1;
            c._wD("soundManager.stop(" + b + ")", 1);
            return c.sounds[b].stop()
        };
        this.stopAll = function() {
            var b;
            c._wD("soundManager.stopAll()", 1);
            for (b in c.sounds) c.sounds.hasOwnProperty(b) && c.sounds[b].stop()
        };
        this.pause = function(b) {
            return w(b) ?
                c.sounds[b].pause() : !1
        };
        this.pauseAll = function() {
            var b;
            for (b = c.soundIDs.length - 1; 0 <= b; b--) c.sounds[c.soundIDs[b]].pause()
        };
        this.resume = function(b) {
            return w(b) ? c.sounds[b].resume() : !1
        };
        this.resumeAll = function() {
            var b;
            for (b = c.soundIDs.length - 1; 0 <= b; b--) c.sounds[c.soundIDs[b]].resume()
        };
        this.togglePause = function(b) {
            return w(b) ? c.sounds[b].togglePause() : !1
        };
        this.setPan = function(b, d) {
            return w(b) ? c.sounds[b].setPan(d) : !1
        };
        this.setVolume = function(b, d) {
            var e, a;
            if (b === g || isNaN(b) || d !== g) return w(b) ? c.sounds[b].setVolume(d) :
                !1;
            e = 0;
            for (a = c.soundIDs.length; e < a; e++) c.sounds[c.soundIDs[e]].setVolume(b)
        };
        this.mute = function(b) {
            var d = 0;
            b instanceof String && (b = null);
            if (b) {
                if (!w(b)) return !1;
                c._wD('soundManager.mute(): Muting "' + b + '"');
                return c.sounds[b].mute()
            }
            c._wD("soundManager.mute(): Muting all sounds");
            for (d = c.soundIDs.length - 1; 0 <= d; d--) c.sounds[c.soundIDs[d]].mute();
            return c.muted = !0
        };
        this.muteAll = function() {
            c.mute()
        };
        this.unmute = function(b) {
            b instanceof String && (b = null);
            if (b) {
                if (!w(b)) return !1;
                c._wD('soundManager.unmute(): Unmuting "' +
                    b + '"');
                return c.sounds[b].unmute()
            }
            c._wD("soundManager.unmute(): Unmuting all sounds");
            for (b = c.soundIDs.length - 1; 0 <= b; b--) c.sounds[c.soundIDs[b]].unmute();
            c.muted = !1;
            return !0
        };
        this.unmuteAll = function() {
            c.unmute()
        };
        this.toggleMute = function(b) {
            return w(b) ? c.sounds[b].toggleMute() : !1
        };
        this.getMemoryUse = function() {
            var c = 0;
            l && 8 !== n && (c = parseInt(l._getMemoryUse(), 10));
            return c
        };
        this.disable = function(b) {
            var d;
            b === g && (b = !1);
            if (y) return !1;
            y = !0;
            p("shutdown", 1);
            for (d = c.soundIDs.length - 1; 0 <= d; d--) cb(c.sounds[c.soundIDs[d]]);
            Z(b);
            x.remove(h, "load", S);
            return !0
        };
        this.canPlayMIME = function(b) {
            var d;
            c.hasHTML5 && (d = fa({
                type: b
            }));
            !d && u && (d = b && c.ok() ? !!(8 < n && b.match(qb) || b.match(c.mimePattern)) : null);
            return d
        };
        this.canPlayURL = function(b) {
            var d;
            c.hasHTML5 && (d = fa({
                url: b
            }));
            !d && u && (d = b && c.ok() ? !!b.match(c.filePattern) : null);
            return d
        };
        this.canPlayLink = function(b) {
            return b.type !== g && b.type && c.canPlayMIME(b.type) ? !0 : c.canPlayURL(b.href)
        };
        this.getSoundById = function(b, d) {
            if (!b) return null;
            var e = c.sounds[b];
            e || d || c._wD('soundManager.getSoundById(): Sound "' +
                b + '" not found.', 2);
            return e
        };
        this.onready = function(b, d) {
            if ("function" === typeof b) q && c._wD(t("queue", "onready")), d || (d = h), Ca("onready", b, d), P();
            else throw t("needFunction", "onready");
            return !0
        };
        this.ontimeout = function(b, d) {
            if ("function" === typeof b) q && c._wD(t("queue", "ontimeout")), d || (d = h), Ca("ontimeout", b, d), P({
                type: "ontimeout"
            });
            else throw t("needFunction", "ontimeout");
            return !0
        };
        this._writeDebug = function(b, d) {
            var e, a;
            if (!c.setupOptions.debugMode) return !1;
            if (Ua && c.useConsole) {
                if (d && "object" === typeof d) console.log(b,
                    d);
                else if (bb[d] !== g) console[bb[d]](b);
                else console.log(b);
                if (c.consoleOnly) return !0
            }
            e = F("soundmanager-debug");
            if (!e) return !1;
            a = m.createElement("div");
            0 === ++tb % 2 && (a.className = "sm2-alt");
            d = d === g ? 0 : parseInt(d, 10);
            a.appendChild(m.createTextNode(b));
            d && (2 <= d && (a.style.fontWeight = "bold"), 3 === d && (a.style.color = "#ff3333"));
            e.insertBefore(a, e.firstChild);
            return !0
        }; - 1 !== ia.indexOf("sm2-debug=alert") && (this._writeDebug = function(c) {
            h.alert(c)
        });
        this._wD = this._writeDebug;
        this._debug = function() {
            var b, d;
            p("currentObj",
                1);
            b = 0;
            for (d = c.soundIDs.length; b < d; b++) c.sounds[c.soundIDs[b]]._debug()
        };
        this.reboot = function(b, d) {
            c.soundIDs.length && c._wD("Destroying " + c.soundIDs.length + " SMSound object" + (1 !== c.soundIDs.length ? "s" : "") + "...");
            var e, a, f;
            for (e = c.soundIDs.length - 1; 0 <= e; e--) c.sounds[c.soundIDs[e]].destruct();
            if (l) try {
                O && (Ia = l.innerHTML), ba = l.parentNode.removeChild(l)
            } catch (g) {
                p("badRemove", 2)
            }
            Ia = ba = u = l = null;
            c.enabled = aa = q = ca = Ka = X = Y = y = C = c.swfLoaded = !1;
            c.soundIDs = [];
            c.sounds = {};
            nb = 0;
            Pa = !1;
            if (b) I = [];
            else
                for (e in I)
                    if (I.hasOwnProperty(e))
                        for (a =
                            0, f = I[e].length; a < f; a++) I[e][a].fired = !1;
            d || c._wD("soundManager: Rebooting...");
            c.html5 = {
                usingFlash: null
            };
            c.flash = {};
            c.html5Only = !1;
            c.ignoreFlash = !1;
            h.setTimeout(function() {
                d || c.beginDelayedInit()
            }, 20);
            return c
        };
        this.reset = function() {
            p("reset");
            return c.reboot(!0, !0)
        };
        this.getMoviePercent = function() {
            return l && "PercentLoaded" in l ? l.PercentLoaded() : null
        };
        this.beginDelayedInit = function() {
            ja = !0;
            Q();
            setTimeout(function() {
                if (Ka) return !1;
                na();
                la();
                return Ka = !0
            }, 20);
            T()
        };
        this.destruct = function() {
            c._wD("soundManager.destruct()");
            c.disable(!0)
        };
        W = function(b) {
            var d, e, a = this,
                f, h, k, G, m, q, r = !1,
                E = [],
                v = 0,
                Xa, y, u = null,
                z;
            e = d = null;
            this.sID = this.id = b.id;
            this.url = b.url;
            this._iO = this.instanceOptions = this.options = A(b);
            this.pan = this.options.pan;
            this.volume = this.options.volume;
            this.isHTML5 = !1;
            this._a = null;
            z = this.url ? !1 : !0;
            this.id3 = {};
            this._debug = function() {
                c._wD(a.id + ": Merged options:", a.options)
            };
            this.load = function(b) {
                var d = null,
                    e;
                b !== g ? a._iO = A(b, a.options) : (b = a.options, a._iO = b, u && u !== a.url && (p("manURL"), a._iO.url = a.url, a.url = null));
                a._iO.url ||
                    (a._iO.url = a.url);
                a._iO.url = ra(a._iO.url);
                e = a.instanceOptions = a._iO;
                c._wD(a.id + ": load (" + e.url + ")");
                if (!e.url && !a.url) return c._wD(a.id + ": load(): url is unassigned. Exiting.", 2), a;
                a.isHTML5 || 8 !== n || a.url || e.autoPlay || c._wD(a.id + ": Flash 8 load() limitation: Wait for onload() before calling play().", 1);
                if (e.url === a.url && 0 !== a.readyState && 2 !== a.readyState) return p("onURL", 1), 3 === a.readyState && e.onload && ua(a, function() {
                    e.onload.apply(a, [!!a.duration])
                }), a;
                a.loaded = !1;
                a.readyState = 1;
                a.playState = 0;
                a.id3 = {};
                if (sa(e)) d = a._setup_html5(e), d._called_load ? c._wD(a.id + ": Ignoring request to load again") : (a._html5_canplay = !1, a.url !== e.url && (c._wD(p("manURL") + ": " + e.url), a._a.src = e.url, a.setPosition(0)), a._a.autobuffer = "auto", a._a.preload = "auto", a._a._called_load = !0);
                else {
                    if (c.html5Only) return c._wD(a.id + ": No flash support. Exiting."), a;
                    if (a._iO.url && a._iO.url.match(/data\:/i)) return c._wD(a.id + ": data: URIs not supported via Flash. Exiting."), a;
                    try {
                        a.isHTML5 = !1, a._iO = pa(oa(e)), a._iO.autoPlay && (a._iO.position ||
                            a._iO.from) && (c._wD(a.id + ": Disabling autoPlay because of non-zero offset case"), a._iO.autoPlay = !1), e = a._iO, 8 === n ? l._load(a.id, e.url, e.stream, e.autoPlay, e.usePolicyFile) : l._load(a.id, e.url, !!e.stream, !!e.autoPlay, e.loops || 1, !!e.autoLoad, e.usePolicyFile)
                    } catch (f) {
                        p("smError", 2), D("onload", !1), U({
                            type: "SMSOUND_LOAD_JS_EXCEPTION",
                            fatal: !0
                        })
                    }
                }
                a.url = e.url;
                return a
            };
            this.unload = function() {
                0 !== a.readyState && (c._wD(a.id + ": unload()"), a.isHTML5 ? (G(), a._a && (a._a.pause(), u = ta(a._a))) : 8 === n ? l._unload(a.id, "about:blank") :
                    l._unload(a.id), f());
                return a
            };
            this.destruct = function(b) {
                c._wD(a.id + ": Destruct");
                a.isHTML5 ? (G(), a._a && (a._a.pause(), ta(a._a), C || k(), a._a._s = null, a._a = null)) : (a._iO.onfailure = null, l._destroySound(a.id));
                b || c.destroySound(a.id, !0)
            };
            this.start = this.play = function(b, d) {
                var e, f, k, G, h, B = !0,
                    B = null;
                e = a.id + ": play(): ";
                d = d === g ? !0 : d;
                b || (b = {});
                a.url && (a._iO.url = a.url);
                a._iO = A(a._iO, a.options);
                a._iO = A(b, a._iO);
                a._iO.url = ra(a._iO.url);
                a.instanceOptions = a._iO;
                if (!a.isHTML5 && a._iO.serverURL && !a.connected) return a.getAutoPlay() ||
                    (c._wD(e + " Netstream not connected yet - setting autoPlay"), a.setAutoPlay(!0)), a;
                sa(a._iO) && (a._setup_html5(a._iO), m());
                1 !== a.playState || a.paused || ((f = a._iO.multiShot) ? c._wD(e + "Already playing (multi-shot)", 1) : (c._wD(e + "Already playing (one-shot)", 1), a.isHTML5 && a.setPosition(a._iO.position), B = a));
                if (null !== B) return B;
                b.url && b.url !== a.url && (a.readyState || a.isHTML5 || 8 !== n || !z ? a.load(a._iO) : z = !1);
                a.loaded ? c._wD(e.substr(0, e.lastIndexOf(":"))) : 0 === a.readyState ? (c._wD(e + "Attempting to load"), a.isHTML5 ||
                    c.html5Only ? a.isHTML5 ? a.load(a._iO) : (c._wD(e + "Unsupported type. Exiting."), B = a) : (a._iO.autoPlay = !0, a.load(a._iO)), a.instanceOptions = a._iO) : 2 === a.readyState ? (c._wD(e + "Could not load - exiting", 2), B = a) : c._wD(e + "Loading - attempting to play...");
                if (null !== B) return B;
                !a.isHTML5 && 9 === n && 0 < a.position && a.position === a.duration && (c._wD(e + "Sound at end, resetting to position: 0"), b.position = 0);
                if (a.paused && 0 <= a.position && (!a._iO.serverURL || 0 < a.position)) c._wD(e + "Resuming from paused state", 1), a.resume();
                else {
                    a._iO =
                        A(b, a._iO);
                    if ((!a.isHTML5 && null !== a._iO.position && 0 < a._iO.position || null !== a._iO.from && 0 < a._iO.from || null !== a._iO.to) && 0 === a.instanceCount && 0 === a.playState && !a._iO.serverURL) {
                        f = function() {
                            a._iO = A(b, a._iO);
                            a.play(a._iO)
                        };
                        a.isHTML5 && !a._html5_canplay ? (c._wD(e + "Beginning load for non-zero offset case"), a.load({
                            _oncanplay: f
                        }), B = !1) : a.isHTML5 || a.loaded || a.readyState && 2 === a.readyState || (c._wD(e + "Preloading for non-zero offset case"), a.load({
                            onload: f
                        }), B = !1);
                        if (null !== B) return B;
                        a._iO = y()
                    }(!a.instanceCount ||
                        a._iO.multiShotEvents || a.isHTML5 && a._iO.multiShot && !C || !a.isHTML5 && 8 < n && !a.getAutoPlay()) && a.instanceCount++;
                    a._iO.onposition && 0 === a.playState && q(a);
                    a.playState = 1;
                    a.paused = !1;
                    a.position = a._iO.position === g || isNaN(a._iO.position) ? 0 : a._iO.position;
                    a.isHTML5 || (a._iO = pa(oa(a._iO)));
                    a._iO.onplay && d && (a._iO.onplay.apply(a), r = !0);
                    a.setVolume(a._iO.volume, !0);
                    a.setPan(a._iO.pan, !0);
                    a.isHTML5 ? 2 > a.instanceCount ? (m(), e = a._setup_html5(), a.setPosition(a._iO.position), e.play()) : (c._wD(a.id + ": Cloning Audio() for instance #" +
                        a.instanceCount + "..."), k = new Audio(a._iO.url), G = function() {
                        x.remove(k, "ended", G);
                        a._onfinish(a);
                        ta(k);
                        k = null
                    }, h = function() {
                        x.remove(k, "canplay", h);
                        try {
                            k.currentTime = a._iO.position / 1E3
                        } catch (c) {
                            L(a.id + ": multiShot play() failed to apply position of " + a._iO.position / 1E3)
                        }
                        k.play()
                    }, x.add(k, "ended", G), a._iO.volume !== g && (k.volume = Math.max(0, Math.min(1, a._iO.volume / 100))), a.muted && (k.muted = !0), a._iO.position ? x.add(k, "canplay", h) : k.play()) : (B = l._start(a.id, a._iO.loops || 1, 9 === n ? a.position : a.position / 1E3,
                        a._iO.multiShot || !1), 9 !== n || B || (c._wD(e + "No sound hardware, or 32-sound ceiling hit", 2), a._iO.onplayerror && a._iO.onplayerror.apply(a)))
                }
                return a
            };
            this.stop = function(b) {
                var d = a._iO;
                1 === a.playState && (c._wD(a.id + ": stop()"), a._onbufferchange(0), a._resetOnPosition(0), a.paused = !1, a.isHTML5 || (a.playState = 0), Xa(), d.to && a.clearOnPosition(d.to), a.isHTML5 ? a._a && (b = a.position, a.setPosition(0), a.position = b, a._a.pause(), a.playState = 0, a._onTimer(), G()) : (l._stop(a.id, b), d.serverURL && a.unload()), a.instanceCount =
                    0, a._iO = {}, d.onstop && d.onstop.apply(a));
                return a
            };
            this.setAutoPlay = function(b) {
                c._wD(a.id + ": Autoplay turned " + (b ? "on" : "off"));
                a._iO.autoPlay = b;
                a.isHTML5 || (l._setAutoPlay(a.id, b), b && !a.instanceCount && 1 === a.readyState && (a.instanceCount++, c._wD(a.id + ": Incremented instance count to " + a.instanceCount)))
            };
            this.getAutoPlay = function() {
                return a._iO.autoPlay
            };
            this.setPosition = function(b) {
                b === g && (b = 0);
                var d = a.isHTML5 ? Math.max(b, 0) : Math.min(a.duration || a._iO.duration, Math.max(b, 0));
                a.position = d;
                b = a.position /
                    1E3;
                a._resetOnPosition(a.position);
                a._iO.position = d;
                if (!a.isHTML5) b = 9 === n ? a.position : b, a.readyState && 2 !== a.readyState && l._setPosition(a.id, b, a.paused || !a.playState, a._iO.multiShot);
                else if (a._a) {
                    if (a._html5_canplay) {
                        if (a._a.currentTime !== b) {
                            c._wD(a.id + ": setPosition(" + b + ")");
                            try {
                                a._a.currentTime = b, (0 === a.playState || a.paused) && a._a.pause()
                            } catch (e) {
                                c._wD(a.id + ": setPosition(" + b + ") failed: " + e.message, 2)
                            }
                        }
                    } else if (b) return c._wD(a.id + ": setPosition(" + b + "): Cannot seek yet, sound not ready", 2), a;
                    a.paused &&
                        a._onTimer(!0)
                }
                return a
            };
            this.pause = function(b) {
                if (a.paused || 0 === a.playState && 1 !== a.readyState) return a;
                c._wD(a.id + ": pause()");
                a.paused = !0;
                a.isHTML5 ? (a._setup_html5().pause(), G()) : (b || b === g) && l._pause(a.id, a._iO.multiShot);
                a._iO.onpause && a._iO.onpause.apply(a);
                return a
            };
            this.resume = function() {
                var b = a._iO;
                if (!a.paused) return a;
                c._wD(a.id + ": resume()");
                a.paused = !1;
                a.playState = 1;
                a.isHTML5 ? (a._setup_html5().play(), m()) : (b.isMovieStar && !b.serverURL && a.setPosition(a.position), l._pause(a.id, b.multiShot));
                !r && b.onplay ? (b.onplay.apply(a), r = !0) : b.onresume && b.onresume.apply(a);
                return a
            };
            this.togglePause = function() {
                c._wD(a.id + ": togglePause()");
                if (0 === a.playState) return a.play({
                    position: 9 !== n || a.isHTML5 ? a.position / 1E3 : a.position
                }), a;
                a.paused ? a.resume() : a.pause();
                return a
            };
            this.setPan = function(c, b) {
                c === g && (c = 0);
                b === g && (b = !1);
                a.isHTML5 || l._setPan(a.id, c);
                a._iO.pan = c;
                b || (a.pan = c, a.options.pan = c);
                return a
            };
            this.setVolume = function(b, d) {
                b === g && (b = 100);
                d === g && (d = !1);
                a.isHTML5 ? a._a && (c.muted && !a.muted && (a.muted = !0, a._a.muted = !0), a._a.volume = Math.max(0, Math.min(1, b / 100))) : l._setVolume(a.id, c.muted && !a.muted || a.muted ? 0 : b);
                a._iO.volume = b;
                d || (a.volume = b, a.options.volume = b);
                return a
            };
            this.mute = function() {
                a.muted = !0;
                a.isHTML5 ? a._a && (a._a.muted = !0) : l._setVolume(a.id, 0);
                return a
            };
            this.unmute = function() {
                a.muted = !1;
                var b = a._iO.volume !== g;
                a.isHTML5 ? a._a && (a._a.muted = !1) : l._setVolume(a.id, b ? a._iO.volume : a.options.volume);
                return a
            };
            this.toggleMute = function() {
                return a.muted ? a.unmute() : a.mute()
            };
            this.onposition = this.onPosition =
                function(b, c, d) {
                    E.push({
                        position: parseInt(b, 10),
                        method: c,
                        scope: d !== g ? d : a,
                        fired: !1
                    });
                    return a
                };
            this.clearOnPosition = function(a, b) {
                var c;
                a = parseInt(a, 10);
                if (isNaN(a)) return !1;
                for (c = 0; c < E.length; c++) a !== E[c].position || b && b !== E[c].method || (E[c].fired && v--, E.splice(c, 1))
            };
            this._processOnPosition = function() {
                var b, c;
                b = E.length;
                if (!b || !a.playState || v >= b) return !1;
                for (--b; 0 <= b; b--) c = E[b], !c.fired && a.position >= c.position && (c.fired = !0, v++, c.method.apply(c.scope, [c.position]));
                return !0
            };
            this._resetOnPosition =
                function(a) {
                    var b, c;
                    b = E.length;
                    if (!b) return !1;
                    for (--b; 0 <= b; b--) c = E[b], c.fired && a <= c.position && (c.fired = !1, v--);
                    return !0
                };
            y = function() {
                var b = a._iO,
                    d = b.from,
                    e = b.to,
                    f, g;
                g = function() {
                    c._wD(a.id + ': "To" time of ' + e + " reached.");
                    a.clearOnPosition(e, g);
                    a.stop()
                };
                f = function() {
                    c._wD(a.id + ': Playing "from" ' + d);
                    if (null !== e && !isNaN(e)) a.onPosition(e, g)
                };
                null === d || isNaN(d) || (b.position = d, b.multiShot = !1, f());
                return b
            };
            q = function() {
                var b, c = a._iO.onposition;
                if (c)
                    for (b in c)
                        if (c.hasOwnProperty(b)) a.onPosition(parseInt(b,
                            10), c[b])
            };
            Xa = function() {
                var b, c = a._iO.onposition;
                if (c)
                    for (b in c) c.hasOwnProperty(b) && a.clearOnPosition(parseInt(b, 10))
            };
            m = function() {
                a.isHTML5 && fb(a)
            };
            G = function() {
                a.isHTML5 && gb(a)
            };
            f = function(b) {
                b || (E = [], v = 0);
                r = !1;
                a._hasTimer = null;
                a._a = null;
                a._html5_canplay = !1;
                a.bytesLoaded = null;
                a.bytesTotal = null;
                a.duration = a._iO && a._iO.duration ? a._iO.duration : null;
                a.durationEstimate = null;
                a.buffered = [];
                a.eqData = [];
                a.eqData.left = [];
                a.eqData.right = [];
                a.failures = 0;
                a.isBuffering = !1;
                a.instanceOptions = {};
                a.instanceCount =
                    0;
                a.loaded = !1;
                a.metadata = {};
                a.readyState = 0;
                a.muted = !1;
                a.paused = !1;
                a.peakData = {
                    left: 0,
                    right: 0
                };
                a.waveformData = {
                    left: [],
                    right: []
                };
                a.playState = 0;
                a.position = null;
                a.id3 = {}
            };
            f();
            this._onTimer = function(b) {
                var c, f = !1,
                    g = {};
                if (a._hasTimer || b) return a._a && (b || (0 < a.playState || 1 === a.readyState) && !a.paused) && (c = a._get_html5_duration(), c !== d && (d = c, a.duration = c, f = !0), a.durationEstimate = a.duration, c = 1E3 * a._a.currentTime || 0, c !== e && (e = c, f = !0), (f || b) && a._whileplaying(c, g, g, g, g)), f
            };
            this._get_html5_duration = function() {
                var b =
                    a._iO;
                return (b = a._a && a._a.duration ? 1E3 * a._a.duration : b && b.duration ? b.duration : null) && !isNaN(b) && Infinity !== b ? b : null
            };
            this._apply_loop = function(a, b) {
                !a.loop && 1 < b && c._wD("Note: Native HTML5 looping is infinite.", 1);
                a.loop = 1 < b ? "loop" : ""
            };
            this._setup_html5 = function(b) {
                b = A(a._iO, b);
                var c = C ? Ya : a._a,
                    d = decodeURI(b.url),
                    e;
                C ? d === decodeURI(Ma) && (e = !0) : d === decodeURI(u) && (e = !0);
                if (c) {
                    if (c._s)
                        if (C) c._s && c._s.playState && !e && c._s.stop();
                        else if (!C && d === decodeURI(u)) return a._apply_loop(c, b.loops), c;
                    e || (u && f(!1),
                        c.src = b.url, Ma = u = a.url = b.url, c._called_load = !1)
                } else b.autoLoad || b.autoPlay ? (a._a = new Audio(b.url), a._a.load()) : a._a = Sa && 10 > opera.version() ? new Audio(null) : new Audio, c = a._a, c._called_load = !1, C && (Ya = c);
                a.isHTML5 = !0;
                a._a = c;
                c._s = a;
                h();
                a._apply_loop(c, b.loops);
                b.autoLoad || b.autoPlay ? a.load() : (c.autobuffer = !1, c.preload = "auto");
                return c
            };
            h = function() {
                if (a._a._added_events) return !1;
                var b;
                a._a._added_events = !0;
                for (b in J) J.hasOwnProperty(b) && a._a && a._a.addEventListener(b, J[b], !1);
                return !0
            };
            k = function() {
                var b;
                c._wD(a.id + ": Removing event listeners");
                a._a._added_events = !1;
                for (b in J) J.hasOwnProperty(b) && a._a && a._a.removeEventListener(b, J[b], !1)
            };
            this._onload = function(b) {
                var d = !!b || !a.isHTML5 && 8 === n && a.duration;
                b = a.id + ": ";
                c._wD(b + (d ? "onload()" : "Failed to load / invalid sound?" + (a.duration ? " -" : " Zero-length duration reported.") + " (" + a.url + ")"), d ? 1 : 2);
                d || a.isHTML5 || (!0 === c.sandbox.noRemote && c._wD(b + t("noNet"), 1), !0 === c.sandbox.noLocal && c._wD(b + t("noLocal"), 1));
                a.loaded = d;
                a.readyState = d ? 3 : 2;
                a._onbufferchange(0);
                a._iO.onload && ua(a, function() {
                    a._iO.onload.apply(a, [d])
                });
                return !0
            };
            this._onbufferchange = function(b) {
                if (0 === a.playState || b && a.isBuffering || !b && !a.isBuffering) return !1;
                a.isBuffering = 1 === b;
                a._iO.onbufferchange && (c._wD(a.id + ": Buffer state change: " + b), a._iO.onbufferchange.apply(a, [b]));
                return !0
            };
            this._onsuspend = function() {
                a._iO.onsuspend && (c._wD(a.id + ": Playback suspended"), a._iO.onsuspend.apply(a));
                return !0
            };
            this._onfailure = function(b, d, e) {
                a.failures++;
                c._wD(a.id + ": Failure (" + a.failures + "): " + b);
                if (a._iO.onfailure && 1 === a.failures) a._iO.onfailure(b, d, e);
                else c._wD(a.id + ": Ignoring failure")
            };
            this._onwarning = function(b, c, d) {
                if (a._iO.onwarning) a._iO.onwarning(b, c, d)
            };
            this._onfinish = function() {
                var b = a._iO.onfinish;
                a._onbufferchange(0);
                a._resetOnPosition(0);
                a.instanceCount && (a.instanceCount--, a.instanceCount || (Xa(), a.playState = 0, a.paused = !1, a.instanceCount = 0, a.instanceOptions = {}, a._iO = {}, G(), a.isHTML5 && (a.position = 0)), a.instanceCount && !a._iO.multiShotEvents || !b || (c._wD(a.id + ": onfinish()"), ua(a,
                    function() {
                        b.apply(a)
                    })))
            };
            this._whileloading = function(b, c, d, e) {
                var f = a._iO;
                a.bytesLoaded = b;
                a.bytesTotal = c;
                a.duration = Math.floor(d);
                a.bufferLength = e;
                a.durationEstimate = a.isHTML5 || f.isMovieStar ? a.duration : f.duration ? a.duration > f.duration ? a.duration : f.duration : parseInt(a.bytesTotal / a.bytesLoaded * a.duration, 10);
                a.isHTML5 || (a.buffered = [{
                    start: 0,
                    end: a.duration
                }]);
                (3 !== a.readyState || a.isHTML5) && f.whileloading && f.whileloading.apply(a)
            };
            this._whileplaying = function(b, c, d, e, f) {
                var k = a._iO;
                if (isNaN(b) || null ===
                    b) return !1;
                a.position = Math.max(0, b);
                a._processOnPosition();
                !a.isHTML5 && 8 < n && (k.usePeakData && c !== g && c && (a.peakData = {
                    left: c.leftPeak,
                    right: c.rightPeak
                }), k.useWaveformData && d !== g && d && (a.waveformData = {
                    left: d.split(","),
                    right: e.split(",")
                }), k.useEQData && f !== g && f && f.leftEQ && (b = f.leftEQ.split(","), a.eqData = b, a.eqData.left = b, f.rightEQ !== g && f.rightEQ && (a.eqData.right = f.rightEQ.split(","))));
                1 === a.playState && (a.isHTML5 || 8 !== n || a.position || !a.isBuffering || a._onbufferchange(0), k.whileplaying && k.whileplaying.apply(a));
                return !0
            };
            this._oncaptiondata = function(b) {
                c._wD(a.id + ": Caption data received.");
                a.captiondata = b;
                a._iO.oncaptiondata && a._iO.oncaptiondata.apply(a, [b])
            };
            this._onmetadata = function(b, d) {
                c._wD(a.id + ": Metadata received.");
                var e = {},
                    f, g;
                f = 0;
                for (g = b.length; f < g; f++) e[b[f]] = d[f];
                a.metadata = e;
                a._iO.onmetadata && a._iO.onmetadata.call(a, a.metadata)
            };
            this._onid3 = function(b, d) {
                c._wD(a.id + ": ID3 data received.");
                var e = [],
                    f, g;
                f = 0;
                for (g = b.length; f < g; f++) e[b[f]] = d[f];
                a.id3 = A(a.id3, e);
                a._iO.onid3 && a._iO.onid3.apply(a)
            };
            this._onconnect = function(b) {
                b = 1 === b;
                c._wD(a.id + ": " + (b ? "Connected." : "Failed to connect? - " + a.url), b ? 1 : 2);
                if (a.connected = b) a.failures = 0, w(a.id) && (a.getAutoPlay() ? a.play(g, a.getAutoPlay()) : a._iO.autoLoad && a.load()), a._iO.onconnect && a._iO.onconnect.apply(a, [b])
            };
            this._ondataerror = function(b) {
                0 < a.playState && (c._wD(a.id + ": Data error: " + b), a._iO.ondataerror && a._iO.ondataerror.apply(a))
            };
            this._debug()
        };
        ma = function() {
            return m.body || m.getElementsByTagName("div")[0]
        };
        F = function(b) {
            return m.getElementById(b)
        };
        A = function(b, d) {
            var e = b || {},
                a, f;
            a = d === g ? c.defaultOptions : d;
            for (f in a) a.hasOwnProperty(f) && e[f] === g && (e[f] = "object" !== typeof a[f] || null === a[f] ? a[f] : A(e[f], a[f]));
            return e
        };
        ua = function(b, c) {
            b.isHTML5 || 8 !== n ? c() : h.setTimeout(c, 0)
        };
        R = {
            onready: 1,
            ontimeout: 1,
            defaultOptions: 1,
            flash9Options: 1,
            movieStarOptions: 1
        };
        Ba = function(b, d) {
            var e, a = !0,
                f = d !== g,
                h = c.setupOptions;
            if (b === g) {
                a = [];
                for (e in h) h.hasOwnProperty(e) && a.push(e);
                for (e in R) R.hasOwnProperty(e) && ("object" === typeof c[e] ? a.push(e + ": {...}") : c[e] instanceof Function ? a.push(e + ": function() {...}") : a.push(e));
                c._wD(t("setup", a.join(", ")));
                return !1
            }
            for (e in b)
                if (b.hasOwnProperty(e))
                    if ("object" !== typeof b[e] || null === b[e] || b[e] instanceof Array || b[e] instanceof RegExp) f && R[d] !== g ? c[d][e] = b[e] : h[e] !== g ? (c.setupOptions[e] = b[e], c[e] = b[e]) : R[e] === g ? (L(t(c[e] === g ? "setupUndef" : "setupError", e), 2), a = !1) : c[e] instanceof Function ? c[e].apply(c, b[e] instanceof Array ? b[e] : [b[e]]) : c[e] = b[e];
                    else if (R[e] === g) L(t(c[e] === g ? "setupUndef" : "setupError", e), 2), a = !1;
            else return Ba(b[e],
                e);
            return a
        };
        x = function() {
            function b(a) {
                a = kb.call(a);
                var b = a.length;
                e ? (a[1] = "on" + a[1], 3 < b && a.pop()) : 3 === b && a.push(!1);
                return a
            }

            function c(b, d) {
                var g = b.shift(),
                    h = [a[d]];
                if (e) g[h](b[0], b[1]);
                else g[h].apply(g, b)
            }
            var e = h.attachEvent,
                a = {
                    add: e ? "attachEvent" : "addEventListener",
                    remove: e ? "detachEvent" : "removeEventListener"
                };
            return {
                add: function() {
                    c(b(arguments), "add")
                },
                remove: function() {
                    c(b(arguments), "remove")
                }
            }
        }();
        J = {
            abort: r(function() {
                c._wD(this._s.id + ": abort")
            }),
            canplay: r(function() {
                var b = this._s,
                    d;
                if (b._html5_canplay) return !0;
                b._html5_canplay = !0;
                c._wD(b.id + ": canplay");
                b._onbufferchange(0);
                d = b._iO.position === g || isNaN(b._iO.position) ? null : b._iO.position / 1E3;
                if (this.currentTime !== d) {
                    c._wD(b.id + ": canplay: Setting position to " + d);
                    try {
                        this.currentTime = d
                    } catch (e) {
                        c._wD(b.id + ": canplay: Setting position of " + d + " failed: " + e.message, 2)
                    }
                }
                b._iO._oncanplay && b._iO._oncanplay()
            }),
            canplaythrough: r(function() {
                var b = this._s;
                b.loaded || (b._onbufferchange(0), b._whileloading(b.bytesLoaded, b.bytesTotal, b._get_html5_duration()), b._onload(!0))
            }),
            durationchange: r(function() {
                var b = this._s,
                    d;
                d = b._get_html5_duration();
                isNaN(d) || d === b.duration || (c._wD(this._s.id + ": durationchange (" + d + ")" + (b.duration ? ", previously " + b.duration : "")), b.durationEstimate = b.duration = d)
            }),
            ended: r(function() {
                var b = this._s;
                c._wD(b.id + ": ended");
                b._onfinish()
            }),
            error: r(function() {
                c._wD(this._s.id + ": HTML5 error, code " + this.error.code);
                this._s._onload(!1)
            }),
            loadeddata: r(function() {
                var b = this._s;
                c._wD(b.id + ": loadeddata");
                b._loaded || va || (b.duration = b._get_html5_duration())
            }),
            loadedmetadata: r(function() {
                c._wD(this._s.id + ": loadedmetadata")
            }),
            loadstart: r(function() {
                c._wD(this._s.id + ": loadstart");
                this._s._onbufferchange(1)
            }),
            play: r(function() {
                this._s._onbufferchange(0)
            }),
            playing: r(function() {
                c._wD(this._s.id + ": playing " + String.fromCharCode(9835));
                this._s._onbufferchange(0)
            }),
            progress: r(function(b) {
                var d = this._s,
                    e, a, f;
                e = 0;
                var g = "progress" === b.type,
                    k = b.target.buffered,
                    h = b.loaded || 0,
                    m = b.total || 1;
                d.buffered = [];
                if (k && k.length) {
                    e = 0;
                    for (a = k.length; e < a; e++) d.buffered.push({
                        start: 1E3 *
                            k.start(e),
                        end: 1E3 * k.end(e)
                    });
                    e = 1E3 * (k.end(0) - k.start(0));
                    h = Math.min(1, e / (1E3 * b.target.duration));
                    if (g && 1 < k.length) {
                        f = [];
                        a = k.length;
                        for (e = 0; e < a; e++) f.push(1E3 * b.target.buffered.start(e) + "-" + 1E3 * b.target.buffered.end(e));
                        c._wD(this._s.id + ": progress, timeRanges: " + f.join(", "))
                    }
                    g && !isNaN(h) && c._wD(this._s.id + ": progress, " + Math.floor(100 * h) + "% loaded")
                }
                isNaN(h) || (d._whileloading(h, m, d._get_html5_duration()), h && m && h === m && J.canplaythrough.call(this, b))
            }),
            ratechange: r(function() {
                c._wD(this._s.id + ": ratechange")
            }),
            suspend: r(function(b) {
                var d = this._s;
                c._wD(this._s.id + ": suspend");
                J.progress.call(this, b);
                d._onsuspend()
            }),
            stalled: r(function() {
                c._wD(this._s.id + ": stalled")
            }),
            timeupdate: r(function() {
                this._s._onTimer()
            }),
            waiting: r(function() {
                var b = this._s;
                c._wD(this._s.id + ": waiting");
                b._onbufferchange(1)
            })
        };
        sa = function(b) {
            return b && (b.type || b.url || b.serverURL) ? b.serverURL || b.type && ha(b.type) ? !1 : b.type ? fa({
                type: b.type
            }) : fa({
                url: b.url
            }) || c.html5Only || b.url.match(/data\:/i) : !1
        };
        ta = function(b) {
            var d;
            b && (d = va ? "about:blank" :
                c.html5.canPlayType("audio/wav") ? "data:audio/wave;base64,/UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w==" : "about:blank", b.src = d, b._called_unload !== g && (b._called_load = !1));
            C && (Ma = null);
            return d
        };
        fa = function(b) {
            if (!c.useHTML5Audio || !c.hasHTML5) return !1;
            var d = b.url || null;
            b = b.type || null;
            var e = c.audioFormats,
                a;
            if (b && c.html5[b] !== g) return c.html5[b] && !ha(b);
            if (!N) {
                N = [];
                for (a in e) e.hasOwnProperty(a) && (N.push(a), e[a].related && (N = N.concat(e[a].related)));
                N = new RegExp("\\.(" + N.join("|") +
                    ")(\\?.*)?$", "i")
            }(a = d ? d.toLowerCase().match(N) : null) && a.length ? a = a[1] : b && (d = b.indexOf(";"), a = (-1 !== d ? b.substr(0, d) : b).substr(6));
            a && c.html5[a] !== g ? d = c.html5[a] && !ha(a) : (b = "audio/" + a, d = c.html5.canPlayType({
                type: b
            }), d = (c.html5[a] = d) && c.html5[b] && !ha(b));
            return d
        };
        jb = function() {
            function b(a) {
                var b, e = b = !1;
                if (!d || "function" !== typeof d.canPlayType) return b;
                if (a instanceof Array) {
                    k = 0;
                    for (b = a.length; k < b; k++)
                        if (c.html5[a[k]] || d.canPlayType(a[k]).match(c.html5Test)) e = !0, c.html5[a[k]] = !0, c.flash[a[k]] = !!a[k].match(pb);
                    b = e
                } else a = d && "function" === typeof d.canPlayType ? d.canPlayType(a) : !1, b = !(!a || !a.match(c.html5Test));
                return b
            }
            if (!c.useHTML5Audio || !c.hasHTML5) return u = c.html5.usingFlash = !0, !1;
            var d = Audio !== g ? Sa && 10 > opera.version() ? new Audio(null) : new Audio : null,
                e, a, f = {},
                h, k;
            h = c.audioFormats;
            for (e in h)
                if (h.hasOwnProperty(e) && (a = "audio/" + e, f[e] = b(h[e].type), f[a] = f[e], e.match(pb) ? (c.flash[e] = !0, c.flash[a] = !0) : (c.flash[e] = !1, c.flash[a] = !1), h[e] && h[e].related))
                    for (k = h[e].related.length - 1; 0 <= k; k--) f["audio/" + h[e].related[k]] =
                        f[e], c.html5[h[e].related[k]] = f[e], c.flash[h[e].related[k]] = f[e];
            f.canPlayType = d ? b : null;
            c.html5 = A(c.html5, f);
            c.html5.usingFlash = ib();
            u = c.html5.usingFlash;
            return !0
        };
        z = {
            notReady: "Unavailable - wait until onready() has fired.",
            notOK: "Audio support is not available.",
            domError: "soundManagerexception caught while appending SWF to DOM.",
            spcWmode: "Removing wmode, preventing known SWF loading issue(s)",
            swf404: "soundManager: Verify that %s is a valid path.",
            tryDebug: "Try soundManager.debugFlash = true for more security details (output goes to SWF.)",
            checkSWF: "See SWF output for more debug info.",
            localFail: "soundManager: Non-HTTP page (" + m.location.protocol + " URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/",
            waitFocus: "soundManager: Special case: Waiting for SWF to load with window focus...",
            waitForever: "soundManager: Waiting indefinitely for Flash (will recover if unblocked)...",
            waitSWF: "soundManager: Waiting for 100% SWF load...",
            needFunction: "soundManager: Function object expected for %s",
            badID: 'Sound ID "%s" should be a string, starting with a non-numeric character',
            currentObj: "soundManager: _debug(): Current sound objects",
            waitOnload: "soundManager: Waiting for window.onload()",
            docLoaded: "soundManager: Document already loaded",
            onload: "soundManager: initComplete(): calling soundManager.onload()",
            onloadOK: "soundManager.onload() complete",
            didInit: "soundManager: init(): Already called?",
            secNote: "Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html",
            badRemove: "soundManager: Failed to remove Flash node.",
            shutdown: "soundManager.disable(): Shutting down",
            queue: "soundManager: Queueing %s handler",
            smError: "SMSound.load(): Exception: JS-Flash communication failed, or JS error.",
            fbTimeout: "No flash response, applying .swf_timedout CSS...",
            fbLoaded: "Flash loaded",
            fbHandler: "soundManager: flashBlockHandler()",
            manURL: "SMSound.load(): Using manually-assigned URL",
            onURL: "soundManager.load(): current URL already assigned.",
            badFV: 'soundManager.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',
            as2loop: "Note: Setting stream:false so looping can work (flash 8 limitation)",
            noNSLoop: "Note: Looping not implemented for MovieStar formats",
            needfl9: "Note: Switching to flash 9, required for MP4 formats.",
            mfTimeout: "Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case",
            needFlash: "soundManager: Fatal error: Flash is needed to play some required formats, but is not available.",
            gotFocus: "soundManager: Got window focus.",
            policy: "Enabling usePolicyFile for data access",
            setup: "soundManager.setup(): allowed parameters: %s",
            setupError: 'soundManager.setup(): "%s" cannot be assigned with this method.',
            setupUndef: 'soundManager.setup(): Could not find option "%s"',
            setupLate: "soundManager.setup(): url, flashVersion and html5Test property changes will not take effect until reboot().",
            noURL: "soundManager: Flash URL required. Call soundManager.setup({url:...}) to get started.",
            sm2Loaded: "SoundManager 2: Ready. " + String.fromCharCode(10003),
            reset: "soundManager.reset(): Removing event callbacks",
            mobileUA: "Mobile UA detected, preferring HTML5 by default.",
            globalHTML5: "Using singleton HTML5 Audio() pattern for this device.",
            ignoreMobile: "Ignoring mobile restrictions for this device."
        };
        t = function() {
            var b, c, e, a;
            b = kb.call(arguments);
            c = b.shift();
            if ((a = z && z[c] ? z[c] : "") && b && b.length)
                for (c =
                    0, e = b.length; c < e; c++) a = a.replace("%s", b[c]);
            return a
        };
        oa = function(b) {
            8 === n && 1 < b.loops && b.stream && (p("as2loop"), b.stream = !1);
            return b
        };
        pa = function(b, d) {
            b && !b.usePolicyFile && (b.onid3 || b.usePeakData || b.useWaveformData || b.useEQData) && (c._wD((d || "") + t("policy")), b.usePolicyFile = !0);
            return b
        };
        L = function(b) {
            Ua && console.warn !== g ? console.warn(b) : c._wD(b)
        };
        ya = function() {
            return !1
        };
        cb = function(b) {
            for (var c in b) b.hasOwnProperty(c) && "function" === typeof b[c] && (b[c] = ya)
        };
        Ha = function(b) {
            b === g && (b = !1);
            (y || b) && c.disable(b)
        };
        db = function(b) {
            var d = null;
            if (b)
                if (b.match(/\.swf(\?.*)?$/i)) {
                    if (d = b.substr(b.toLowerCase().lastIndexOf(".swf?") + 4)) return b
                } else b.lastIndexOf("/") !== b.length - 1 && (b += "/");
            b = (b && -1 !== b.lastIndexOf("/") ? b.substr(0, b.lastIndexOf("/") + 1) : "./") + c.movieURL;
            c.noSWFCache && (b += "?ts=" + (new Date).getTime());
            return b
        };
        Ea = function() {
            n = parseInt(c.flashVersion, 10);
            8 !== n && 9 !== n && (c._wD(t("badFV", n, 8)), c.flashVersion = n = 8);
            var b = c.debugMode || c.debugFlash ? "_debug.swf" : ".swf";
            c.useHTML5Audio && !c.html5Only && c.audioFormats.mp4.required &&
                9 > n && (c._wD(t("needfl9")), c.flashVersion = n = 9);
            c.version = c.versionNumber + (c.html5Only ? " (HTML5-only mode)" : 9 === n ? " (AS3/Flash 9)" : " (AS2/Flash 8)");
            8 < n ? (c.defaultOptions = A(c.defaultOptions, c.flash9Options), c.features.buffering = !0, c.defaultOptions = A(c.defaultOptions, c.movieStarOptions), c.filePatterns.flash9 = new RegExp("\\.(mp3|" + rb.join("|") + ")(\\?.*)?$", "i"), c.features.movieStar = !0) : c.features.movieStar = !1;
            c.filePattern = c.filePatterns[8 !== n ? "flash9" : "flash8"];
            c.movieURL = (8 === n ? "soundmanager2.swf" :
                "soundmanager2_flash9.swf").replace(".swf", b);
            c.features.peakData = c.features.waveformData = c.features.eqData = 8 < n
        };
        ab = function(b, c) {
            if (!l) return !1;
            l._setPolling(b, c)
        };
        Ga = function() {
            c.debugURLParam.test(ia) && (c.setupOptions.debugMode = c.debugMode = !0);
            if (F(c.debugID)) return !1;
            var b, d, e, a;
            if (!(!c.debugMode || F(c.debugID) || Ua && c.useConsole && c.consoleOnly)) {
                b = m.createElement("div");
                b.id = c.debugID + "-toggle";
                d = {
                    position: "fixed",
                    bottom: "0px",
                    right: "0px",
                    width: "1.2em",
                    height: "1.2em",
                    lineHeight: "1.2em",
                    margin: "2px",
                    textAlign: "center",
                    border: "1px solid #999",
                    cursor: "pointer",
                    background: "#fff",
                    color: "#333",
                    zIndex: 10001
                };
                b.appendChild(m.createTextNode("-"));
                b.onclick = eb;
                b.title = "Toggle SM2 debug console";
                v.match(/msie 6/i) && (b.style.position = "absolute", b.style.cursor = "hand");
                for (a in d) d.hasOwnProperty(a) && (b.style[a] = d[a]);
                d = m.createElement("div");
                d.id = c.debugID;
                d.style.display = c.debugMode ? "block" : "none";
                if (c.debugMode && !F(b.id)) {
                    try {
                        e = ma(), e.appendChild(b)
                    } catch (f) {
                        throw Error(t("domError") + " \n" + f.toString());
                    }
                    e.appendChild(d)
                }
            }
        };
        w = this.getSoundById;
        p = function(b, d) {
            return b ? c._wD(t(b), d) : ""
        };
        eb = function() {
            var b = F(c.debugID),
                d = F(c.debugID + "-toggle");
            if (!b) return !1;
            Aa ? (d.innerHTML = "+", b.style.display = "none") : (d.innerHTML = "-", b.style.display = "block");
            Aa = !Aa
        };
        D = function(b, c, e) {
            if (h.sm2Debugger !== g) try {
                sm2Debugger.handleEvent(b, c, e)
            } catch (a) {
                return !1
            }
            return !0
        };
        V = function() {
            var b = [];
            c.debugMode && b.push("sm2_debug");
            c.debugFlash && b.push("flash_debug");
            c.useHighPerformance && b.push("high_performance");
            return b.join(" ")
        };
        Ja = function() {
            var b = t("fbHandler"),
                d = c.getMoviePercent(),
                e = {
                    type: "FLASHBLOCK"
                };
            if (c.html5Only) return !1;
            c.ok() ? (c.didFlashBlock && c._wD(b + ": Unblocked"), c.oMC && (c.oMC.className = [V(), "movieContainer", "swf_loaded" + (c.didFlashBlock ? " swf_unblocked" : "")].join(" "))) : (u && (c.oMC.className = V() + " movieContainer " + (null === d ? "swf_timedout" : "swf_error"), c._wD(b + ": " + t("fbTimeout") + (d ? " (" + t("fbLoaded") + ")" : ""))), c.didFlashBlock = !0, P({
                type: "ontimeout",
                ignoreInit: !0,
                error: e
            }), U(e))
        };
        Ca = function(b, c, e) {
            I[b] === g &&
                (I[b] = []);
            I[b].push({
                method: c,
                scope: e || null,
                fired: !1
            })
        };
        P = function(b) {
            b || (b = {
                type: c.ok() ? "onready" : "ontimeout"
            });
            if (!q && b && !b.ignoreInit || "ontimeout" === b.type && (c.ok() || y && !b.ignoreInit)) return !1;
            var d = {
                    success: b && b.ignoreInit ? c.ok() : !y
                },
                e = b && b.type ? I[b.type] || [] : [],
                a = [],
                f, d = [d],
                g = u && !c.ok();
            b.error && (d[0].error = b.error);
            b = 0;
            for (f = e.length; b < f; b++) !0 !== e[b].fired && a.push(e[b]);
            if (a.length)
                for (b = 0, f = a.length; b < f; b++) a[b].scope ? a[b].method.apply(a[b].scope, d) : a[b].method.apply(this, d), g || (a[b].fired = !0);
            return !0
        };
        S = function() {
            h.setTimeout(function() {
                c.useFlashBlock && Ja();
                P();
                "function" === typeof c.onload && (p("onload", 1), c.onload.apply(h), p("onloadOK", 1));
                c.waitForWindowLoad && x.add(h, "load", S)
            }, 1)
        };
        Na = function() {
            if (H !== g) return H;
            var b = !1,
                c = navigator,
                e = c.plugins,
                a, f = h.ActiveXObject;
            if (e && e.length)(c = c.mimeTypes) && c["application/x-shockwave-flash"] && c["application/x-shockwave-flash"].enabledPlugin && c["application/x-shockwave-flash"].enabledPlugin.description && (b = !0);
            else if (f !== g && !v.match(/MSAppHost/i)) {
                try {
                    a =
                        new f("ShockwaveFlash.ShockwaveFlash")
                } catch (m) {
                    a = null
                }
                b = !!a
            }
            return H = b
        };
        ib = function() {
            var b, d, e = c.audioFormats;
            Qa && v.match(/os (1|2|3_0|3_1)\s/i) ? (c.hasHTML5 = !1, c.html5Only = !0, c.oMC && (c.oMC.style.display = "none")) : c.useHTML5Audio && (c.html5 && c.html5.canPlayType || (c._wD("SoundManager: No HTML5 Audio() support detected."), c.hasHTML5 = !1), Ta && c._wD("soundManager: Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - " + (H ? "will use flash fallback for MP3/MP4, if available" :
                " would use flash fallback for MP3/MP4, but none detected."), 1));
            if (c.useHTML5Audio && c.hasHTML5)
                for (d in ea = !0, e) e.hasOwnProperty(d) && e[d].required && (c.html5.canPlayType(e[d].type) ? c.preferFlash && (c.flash[d] || c.flash[e[d].type]) && (b = !0) : (ea = !1, b = !0));
            c.ignoreFlash && (b = !1, ea = !0);
            c.html5Only = c.hasHTML5 && c.useHTML5Audio && !b;
            return !c.html5Only
        };
        ra = function(b) {
            var d, e, a = 0;
            if (b instanceof Array) {
                d = 0;
                for (e = b.length; d < e; d++)
                    if (b[d] instanceof Object) {
                        if (c.canPlayMIME(b[d].type)) {
                            a = d;
                            break
                        }
                    } else if (c.canPlayURL(b[d])) {
                    a =
                        d;
                    break
                }
                b[a].url && (b[a] = b[a].url);
                b = b[a]
            }
            return b
        };
        fb = function(b) {
            b._hasTimer || (b._hasTimer = !0, !wa && c.html5PollingInterval && (null === da && 0 === qa && (da = setInterval(hb, c.html5PollingInterval)), qa++))
        };
        gb = function(b) {
            b._hasTimer && (b._hasTimer = !1, !wa && c.html5PollingInterval && qa--)
        };
        hb = function() {
            var b;
            if (null !== da && !qa) return clearInterval(da), da = null, !1;
            for (b = c.soundIDs.length - 1; 0 <= b; b--) c.sounds[c.soundIDs[b]].isHTML5 && c.sounds[c.soundIDs[b]]._hasTimer && c.sounds[c.soundIDs[b]]._onTimer()
        };
        U = function(b) {
            b =
                b !== g ? b : {};
            "function" === typeof c.onerror && c.onerror.apply(h, [{
                type: b.type !== g ? b.type : null
            }]);
            b.fatal !== g && b.fatal && c.disable()
        };
        lb = function() {
            if (!Ta || !Na()) return !1;
            var b = c.audioFormats,
                d, e;
            for (e in b)
                if (b.hasOwnProperty(e) && ("mp3" === e || "mp4" === e) && (c._wD("soundManager: Using flash fallback for " + e + " format"), c.html5[e] = !1, b[e] && b[e].related))
                    for (d = b[e].related.length - 1; 0 <= d; d--) c.html5[b[e].related[d]] = !1
        };
        this._setSandboxType = function(b) {
            var d = c.sandbox;
            d.type = b;
            d.description = d.types[d.types[b] !==
                g ? b : "unknown"];
            "localWithFile" === d.type ? (d.noRemote = !0, d.noLocal = !1, p("secNote", 2)) : "localWithNetwork" === d.type ? (d.noRemote = !1, d.noLocal = !0) : "localTrusted" === d.type && (d.noRemote = !1, d.noLocal = !1)
        };
        this._externalInterfaceOK = function(b) {
            if (c.swfLoaded) return !1;
            var d;
            D("swf", !0);
            D("flashtojs", !0);
            c.swfLoaded = !0;
            xa = !1;
            Ta && lb();
            if (!b || b.replace(/\+dev/i, "") !== c.versionNumber.replace(/\+dev/i, "")) return d = 'soundManager: Fatal: JavaScript file build "' + c.versionNumber + '" does not match Flash SWF build "' +
                b + '" at ' + c.url + ". Ensure both are up-to-date.", setTimeout(function() {
                    throw Error(d);
                }, 0), !1;
            setTimeout(za, O ? 100 : 1)
        };
        na = function(b, d) {
            function e() {
                var a = [],
                    b, d = [];
                b = "SoundManager " + c.version + (!c.html5Only && c.useHTML5Audio ? c.hasHTML5 ? " + HTML5 audio" : ", no HTML5 audio support" : "");
                c.html5Only ? c.html5PollingInterval && a.push("html5PollingInterval (" + c.html5PollingInterval + "ms)") : (c.preferFlash && a.push("preferFlash"), c.useHighPerformance && a.push("useHighPerformance"), c.flashPollingInterval && a.push("flashPollingInterval (" +
                    c.flashPollingInterval + "ms)"), c.html5PollingInterval && a.push("html5PollingInterval (" + c.html5PollingInterval + "ms)"), c.wmode && a.push("wmode (" + c.wmode + ")"), c.debugFlash && a.push("debugFlash"), c.useFlashBlock && a.push("flashBlock"));
                a.length && (d = d.concat([a.join(" + ")]));
                c._wD(b + (d.length ? " + " + d.join(", ") : ""), 1);
                mb()
            }

            function a(a, b) {
                return '<param name="' + a + '" value="' + b + '" />'
            }
            if (X && Y) return !1;
            if (c.html5Only) return Ea(), e(), c.oMC = F(c.movieID), za(), Y = X = !0, !1;
            var f = d || c.url,
                h = c.altURL || f,
                k = ma(),
                l = V(),
                n = null,
                n = m.getElementsByTagName("html")[0],
                p, r, q, n = n && n.dir && n.dir.match(/rtl/i);
            b = b === g ? c.id : b;
            Ea();
            c.url = db(ga ? f : h);
            d = c.url;
            c.wmode = !c.wmode && c.useHighPerformance ? "transparent" : c.wmode;
            null !== c.wmode && (v.match(/msie 8/i) || !O && !c.useHighPerformance) && navigator.platform.match(/win32|win64/i) && (M.push(z.spcWmode), c.wmode = null);
            k = {
                name: b,
                id: b,
                src: d,
                quality: "high",
                allowScriptAccess: c.allowScriptAccess,
                bgcolor: c.bgColor,
                pluginspage: vb + "www.macromedia.com/go/getflashplayer",
                title: "JS/Flash audio component (SoundManager 2)",
                type: "application/x-shockwave-flash",
                wmode: c.wmode,
                hasPriority: "true"
            };
            c.debugFlash && (k.FlashVars = "debug=1");
            c.wmode || delete k.wmode;
            if (O) f = m.createElement("div"), r = ['<object id="' + b + '" data="' + d + '" type="' + k.type + '" title="' + k.title + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">', a("movie", d), a("AllowScriptAccess", c.allowScriptAccess), a("quality", k.quality), c.wmode ? a("wmode", c.wmode) : "", a("bgcolor",
                c.bgColor), a("hasPriority", "true"), c.debugFlash ? a("FlashVars", k.FlashVars) : "", "</object>"].join("");
            else
                for (p in f = m.createElement("embed"), k) k.hasOwnProperty(p) && f.setAttribute(p, k[p]);
            Ga();
            l = V();
            if (k = ma())
                if (c.oMC = F(c.movieID) || m.createElement("div"), c.oMC.id) q = c.oMC.className, c.oMC.className = (q ? q + " " : "movieContainer") + (l ? " " + l : ""), c.oMC.appendChild(f), O && (p = c.oMC.appendChild(m.createElement("div")), p.className = "sm2-object-box", p.innerHTML = r), Y = !0;
                else {
                    c.oMC.id = c.movieID;
                    c.oMC.className = "movieContainer " +
                        l;
                    p = l = null;
                    c.useFlashBlock || (c.useHighPerformance ? l = {
                        position: "fixed",
                        width: "8px",
                        height: "8px",
                        bottom: "0px",
                        left: "0px",
                        overflow: "hidden"
                    } : (l = {
                        position: "absolute",
                        width: "6px",
                        height: "6px",
                        top: "-9999px",
                        left: "-9999px"
                    }, n && (l.left = Math.abs(parseInt(l.left, 10)) + "px")));
                    ub && (c.oMC.style.zIndex = 1E4);
                    if (!c.debugFlash)
                        for (q in l) l.hasOwnProperty(q) && (c.oMC.style[q] = l[q]);
                    try {
                        O || c.oMC.appendChild(f), k.appendChild(c.oMC), O && (p = c.oMC.appendChild(m.createElement("div")), p.className = "sm2-object-box", p.innerHTML =
                            r), Y = !0
                    } catch (u) {
                        throw Error(t("domError") + " \n" + u.toString());
                    }
                }
            X = !0;
            e();
            return !0
        };
        la = function() {
            if (c.html5Only) return na(), !1;
            if (l) return !1;
            if (!c.url) return p("noURL"), !1;
            l = c.getMovie(c.id);
            l || (ba ? (O ? c.oMC.innerHTML = Ia : c.oMC.appendChild(ba), ba = null, X = !0) : na(c.id, c.url), l = c.getMovie(c.id));
            "function" === typeof c.oninitmovie && setTimeout(c.oninitmovie, 1);
            Oa();
            return !0
        };
        T = function() {
            setTimeout($a, 1E3)
        };
        Da = function() {
            h.setTimeout(function() {
                L("soundManager: useFlashBlock is false, 100% HTML5 mode is possible. Rebooting with preferFlash: false...");
                c.setup({
                    preferFlash: !1
                }).reboot();
                c.didFlashBlock = !0;
                c.beginDelayedInit()
            }, 1)
        };
        $a = function() {
            var b, d = !1;
            if (!c.url || ca) return !1;
            ca = !0;
            x.remove(h, "load", T);
            if (H && xa && !Va) return p("waitFocus"), !1;
            q || (b = c.getMoviePercent(), 0 < b && 100 > b && (d = !0));
            setTimeout(function() {
                b = c.getMoviePercent();
                if (d) return ca = !1, c._wD(t("waitSWF")), h.setTimeout(T, 1), !1;
                q || (c._wD("soundManager: No Flash response within expected time. Likely causes: " + (0 === b ? "SWF load failed, " : "") + "Flash blocked or JS-Flash security error." + (c.debugFlash ?
                    " " + t("checkSWF") : ""), 2), !ga && b && (p("localFail", 2), c.debugFlash || p("tryDebug", 2)), 0 === b && c._wD(t("swf404", c.url), 1), D("flashtojs", !1, ": Timed out" + (ga ? " (Check flash security or flash blockers)" : " (No plugin/missing SWF?)")));
                !q && ob && (null === b ? c.useFlashBlock || 0 === c.flashLoadTimeout ? (c.useFlashBlock && Ja(), p("waitForever")) : !c.useFlashBlock && ea ? Da() : (p("waitForever"), P({
                        type: "ontimeout",
                        ignoreInit: !0,
                        error: {
                            type: "INIT_FLASHBLOCK"
                        }
                    })) : 0 === c.flashLoadTimeout ? p("waitForever") : !c.useFlashBlock && ea ? Da() :
                    Ha(!0))
            }, c.flashLoadTimeout)
        };
        ka = function() {
            if (Va || !xa) return x.remove(h, "focus", ka), !0;
            Va = ob = !0;
            p("gotFocus");
            ca = !1;
            T();
            x.remove(h, "focus", ka);
            return !0
        };
        Oa = function() {
            M.length && (c._wD("SoundManager 2: " + M.join(" "), 1), M = [])
        };
        mb = function() {
            Oa();
            var b, d = [];
            if (c.useHTML5Audio && c.hasHTML5) {
                for (b in c.audioFormats) c.audioFormats.hasOwnProperty(b) && d.push(b + " = " + c.html5[b] + (!c.html5[b] && u && c.flash[b] ? " (using flash)" : c.preferFlash && c.flash[b] && u ? " (preferring flash)" : c.html5[b] ? "" : " (" + (c.audioFormats[b].required ?
                    "required, " : "") + "and no flash support)"));
                c._wD("SoundManager 2 HTML5 support: " + d.join(", "), 1)
            }
        };
        Z = function(b) {
            if (q) return !1;
            if (c.html5Only) return p("sm2Loaded", 1), q = !0, S(), D("onload", !0), !0;
            var d = !0,
                e;
            c.useFlashBlock && c.flashLoadTimeout && !c.getMoviePercent() || (q = !0);
            e = {
                type: !H && u ? "NO_FLASH" : "INIT_TIMEOUT"
            };
            c._wD("SoundManager 2 " + (y ? "failed to load" : "loaded") + " (" + (y ? "Flash security/load error" : "OK") + ") " + String.fromCharCode(y ? 10006 : 10003), y ? 2 : 1);
            y || b ? (c.useFlashBlock && c.oMC && (c.oMC.className =
                V() + " " + (null === c.getMoviePercent() ? "swf_timedout" : "swf_error")), P({
                type: "ontimeout",
                error: e,
                ignoreInit: !0
            }), D("onload", !1), U(e), d = !1) : D("onload", !0);
            y || (c.waitForWindowLoad && !ja ? (p("waitOnload"), x.add(h, "load", S)) : (c.waitForWindowLoad && ja && p("docLoaded"), S()));
            return d
        };
        Za = function() {
            var b, d = c.setupOptions;
            for (b in d) d.hasOwnProperty(b) && (c[b] === g ? c[b] = d[b] : c[b] !== d[b] && (c.setupOptions[b] = c[b]))
        };
        za = function() {
            if (q) return p("didInit"), !1;
            if (c.html5Only) return q || (x.remove(h, "load", c.beginDelayedInit),
                c.enabled = !0, Z()), !0;
            la();
            try {
                l._externalInterfaceTest(!1), ab(!0, c.flashPollingInterval || (c.useHighPerformance ? 10 : 50)), c.debugMode || l._disableDebug(), c.enabled = !0, D("jstoflash", !0), c.html5Only || x.add(h, "unload", ya)
            } catch (b) {
                return c._wD("js/flash exception: " + b.toString()), D("jstoflash", !1), U({
                    type: "JS_TO_FLASH_EXCEPTION",
                    fatal: !0
                }), Ha(!0), Z(), !1
            }
            Z();
            x.remove(h, "load", c.beginDelayedInit);
            return !0
        };
        Q = function() {
            if (aa) return !1;
            aa = !0;
            Za();
            Ga();
            !H && c.hasHTML5 && (c._wD("SoundManager 2: No Flash detected" +
                (c.useHTML5Audio ? ". Trying HTML5-only mode." : ", enabling HTML5."), 1), c.setup({
                useHTML5Audio: !0,
                preferFlash: !1
            }));
            jb();
            !H && u && (M.push(z.needFlash), c.setup({
                flashLoadTimeout: 1
            }));
            m.removeEventListener && m.removeEventListener("DOMContentLoaded", Q, !1);
            la();
            return !0
        };
        La = function() {
            "complete" === m.readyState && (Q(), m.detachEvent("onreadystatechange", La));
            return !0
        };
        Fa = function() {
            ja = !0;
            Q();
            x.remove(h, "load", Fa)
        };
        Na();
        x.add(h, "focus", ka);
        x.add(h, "load", T);
        x.add(h, "load", Fa);
        m.addEventListener ? m.addEventListener("DOMContentLoaded",
            Q, !1) : m.attachEvent ? m.attachEvent("onreadystatechange", La) : (D("onload", !1), U({
            type: "NO_DOM2_EVENTS",
            fatal: !0
        }))
    }
    if (!h || !h.document) throw Error("SoundManager requires a browser with window and document objects.");
    var W = null;
    h.SM2_DEFER !== g && SM2_DEFER || (W = new K);
    "object" === typeof module && module && "object" === typeof module.exports ? (module.exports.SoundManager = K, module.exports.soundManager = W) : "function" === typeof define && define.amd && define(function() {
        return {
            constructor: K,
            getInstance: function(g) {
                !h.soundManager &&
                    g instanceof Function && (g = g(K), g instanceof K && (h.soundManager = g));
                return h.soundManager
            }
        }
    });
    h.SoundManager = K;
    h.soundManager = W
})(window);