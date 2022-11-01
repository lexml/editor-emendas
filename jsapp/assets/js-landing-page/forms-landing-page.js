/*
 * Start Bootstrap - SB Forms v0.4.1 (startbootstrap.com)
 * Copyright 2013-2021 Start Bootstrap LLC
 */
(() => {
    "use strict";
    var t = function (t, e, n, i) {
        return new (n || (n = Promise))(function (s, a) {
            function r(t) {
                try {
                    d(i.next(t));
                } catch (t) {
                    a(t);
                }
            }
            function o(t) {
                try {
                    d(i.throw(t));
                } catch (t) {
                    a(t);
                }
            }
            function d(t) {
                var e;
                t.done
                    ? s(t.value)
                    : ((e = t.value),
                      e instanceof n
                          ? e
                          : new n(function (t) {
                                t(e);
                            })).then(r, o);
            }
            d((i = i.apply(t, e || [])).next());
        });
    };
    const e = (t, e = document.body) => {
            const n = [].slice.call(e.querySelectorAll(t));
            if (0 === n.length) throw new Error(`GET_ELEMENTS: ${e.id} -> ${t}`);
            return n;
        },
        n = (t, e = document.body) => {
            const n = e.querySelector(t);
            if (!n) throw new Error(`GET_ELEMENT: ${e.id} -> ${t}`);
            return n;
        };
    var i;
    !(function (t) {
        (t.required = "required"), (t.email = "email"), (t.length = "length"), (t.checked = "checked");
    })(i || (i = {}));
    class s {
        constructor(t, e, n) {
            (this.input = t),
                (this.validations = e),
                (this.onChange = n),
                (this.isPure = !0),
                (this.inputBlurHandler = () => this.inputBlur()),
                (this.inputInputHandler = () => this.inputInput()),
                (this.inputClickHandler = () => this.inputClick()),
                t.addEventListener("blur", this.inputBlurHandler),
                t.addEventListener("input", this.inputInputHandler),
                t.addEventListener("click", this.inputClickHandler);
        }
        inputBlur() {
            (this.isPure = !1), this._handleInputAction();
        }
        inputInput() {
            this._handleInputAction();
        }
        inputClick() {
            this._handleInputAction();
        }
        initValidation() {
            this._handleInputAction();
        }
        _handleInputAction() {
            let t = !0;
            if (
                (this.validations.forEach(e => {
                    t = t && r(this.input, e);
                }),
                a(this.input))
            ) {
                const n = this.input.parentElement.parentElement,
                    i = e("input", n);
                if (t) {
                    if ((i.forEach(t => (t.dataset.sbCanSubmit = "yes")), this.isPure)) return this.onChange(), void (this.isPure = !1);
                    n.firstElementChild.classList.remove("is-invalid");
                } else {
                    if ((i.forEach(t => (t.dataset.sbCanSubmit = "no")), this.isPure)) return this.onChange(), void (this.isPure = !1);
                    n.firstElementChild.classList.add("is-invalid");
                }
            } else if (t) {
                if (((this.input.dataset.sbCanSubmit = "yes"), this.isPure)) return void this.onChange();
                this.input.classList.remove("is-invalid");
            } else {
                if (((this.input.dataset.sbCanSubmit = "no"), this.isPure)) return void this.onChange();
                this.input.classList.add("is-invalid");
            }
            this.onChange();
        }
        reset() {
            if (((this.isPure = !0), a(this.input))) {
                const t = this.input.parentElement.parentElement,
                    n = e("input", t);
                t.firstElementChild.classList.remove("is-invalid"),
                    n.forEach(t => {
                        (t.dataset.sbCanSubmit = "no"), (t.checked = !1);
                    });
            } else (this.input.value = ""), this.input.classList.remove("is-invalid"), (this.input.dataset.sbCanSubmit = "no");
        }
        tearDown() {
            this.reset(),
                this.input.removeEventListener("blur", this.inputBlurHandler),
                this.input.removeEventListener("input", this.inputInputHandler),
                this.input.removeEventListener("click", this.inputClickHandler);
        }
    }
    const a = t => !!["checkbox", "radio"].find(e => e === t.type),
        r = (t, i) => {
            let s,
                r,
                c = !0;
            if ((a(t) && (r = t.parentElement.parentElement), "object" == typeof i)) {
                if (((c = i.validate()), (s = n(`[data-sb-feedback="${t.id}:${i.name}"]`)), !s)) throw new Error(`VALIDATION_NOT_SETUP_FOR: ${t.id}:${i.name}`);
            } else {
                switch (i) {
                    case "required":
                        a(t) ? (c = e("input", r).reduce((t, e) => t || e.checked, !1)) : t.value || (c = !1);
                        break;
                    case "email":
                        c = o(t.value);
                        break;
                    case "length":
                        c = d(t.value);
                        break;
                    case "checked":
                        c = t.checked;
                }
                if (a(t))
                    try {
                        s = n(`[data-sb-feedback="${t.name}:${i}"]`);
                    } catch (e) {
                        throw new Error(`VALIDATION_NOT_SETUP_FOR: ${t.name}:${i}`);
                    }
                else
                    try {
                        s = n(`[data-sb-feedback="${t.id}:${i}"]`);
                    } catch (e) {
                        throw new Error(`VALIDATION_NOT_SETUP_FOR: ${t.id}:${i}`);
                    }
            }
            return c ? s.classList.add("d-none") : s.classList.remove("d-none"), c;
        },
        o = t => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(t).toLowerCase()),
        d = t => t.length > 8;
    (t => {
        const e = document.createElement("style");
        (e.textContent = ".d-none {\n    display: none;\n}\n.invalid-feedback {\n    display: none;\n}\n.btn.disabled {\n    pointer-events: none;\n    opacity: 0.65;\n}"), document.head.append(e);
    })(),
        window.addEventListener("DOMContentLoaded", () => {
            e("form[data-sb-form-api-token]").forEach(t => l(t));
        });
    const c = { initializeForm: (t, e) => l(t, e) };
    window.sbForms = c;
    const l = (r, o) => {
            let d = !0;
            const c = [],
                l = () => {
                    w();
                },
                m = n("#submitButton", r),
                f = n("#submitSuccessMessage", r),
                v = n("#submitErrorMessage", r),
                b = r.dataset.sbFormApiToken;
            "API_TOKEN" === b && ((d = !1));
            const E = o || e("input, textarea, select", r);
            E.forEach(t => {
                const e = t.dataset.sbValidations;
                e
                    ? ((t.dataset.sbCanSubmit = "no"),
                      c.push(
                          new s(
                              t,
                              (t => {
                                  const e = t.split(",").map(t => t.trim());
                                  return (
                                      e.forEach(t => {
                                          if (!(t in i)) throw new Error(`UNRECOGNIZED_VALIDATION_KEY: ${t}`);
                                      }),
                                      e
                                  );
                              })(e),
                              l
                          )
                      ))
                    : (t.dataset.sbCanSubmit = "yes");
            });
            const y = e => {
                    return (
                        (n = void 0),
                        (i = void 0),
                        (a = function* () {
                            e.preventDefault(), m.classList.add("d-none");
                            try {
                                console.log(u(E)),
                                    d
                                        ? yield ((n = { token: b, submissionObject: u(E) }),
                                          t(void 0, void 0, void 0, function* () {
                                              const e = yield ((e, n) =>
                                                  t(void 0, void 0, void 0, function* () {
                                                      const t = JSON.stringify(n),
                                                          i = new Headers({ "Content-Type": "application/json" }),
                                                          s = yield fetch(`https://api.startbootstrap.com${e}`, {
                                                              method: "POST",
                                                              mode: "cors",
                                                              cache: "no-cache",
                                                              credentials: "same-origin",
                                                              headers: i,
                                                              redirect: "follow",
                                                              referrerPolicy: "no-referrer",
                                                              body: t,
                                                          });
                                                      if (!(s.status >= 200 && s.status < 300)) throw new Error(`FETCH_RETURNED_STATUS: ${s.status}`);
                                                      return s;
                                                  }))("/api/latest/solution/forms", n);
                                              return yield e.json();
                                          }))
                                        : console.log(h, p),
                                    f.classList.remove("d-none"),
                                    E.forEach(t => {
                                        t.setAttribute("disabled", "");
                                    });
                            } catch (t) {
                                console.error(t), v.classList.remove("d-none");
                            }
                            var n;
                        }),
                        new ((s = void 0) || (s = Promise))(function (t, e) {
                            function r(t) {
                                try {
                                    d(a.next(t));
                                } catch (t) {
                                    e(t);
                                }
                            }
                            function o(t) {
                                try {
                                    d(a.throw(t));
                                } catch (t) {
                                    e(t);
                                }
                            }
                            function d(e) {
                                var n;
                                e.done
                                    ? t(e.value)
                                    : ((n = e.value),
                                      n instanceof s
                                          ? n
                                          : new s(function (t) {
                                                t(n);
                                            })).then(r, o);
                            }
                            d((a = a.apply(n, i || [])).next());
                        })
                    );
                    var n, i, s, a;
                },
                L = t => y(t);
            m.addEventListener("click", L);
            const w = () => {
                E.reduce((t, n) => {
                    if (a(n)) {
                        const i = n.parentElement.parentElement,
                            s = e("input", i);
                        return t && s.reduce((t, e) => t || "yes" === e.dataset.sbCanSubmit, !1);
                    }
                    return "yes" === n.dataset.sbCanSubmit ? t && !0 : t && !1;
                }, !0)
                    ? m.classList.remove("disabled")
                    : m.classList.add("disabled");
            };
            return (
                c.forEach(t => t.initValidation()),
                w(),
                {
                    tearDown: () => {
                        m.removeEventListener("click", L),
                            f.classList.add("d-none"),
                            v.classList.add("d-none"),
                            m.classList.remove("d-none"),
                            m.classList.add("disabled"),
                            E.forEach(t => {
                                t.removeAttribute("disabled");
                            }),
                            c.forEach(t => t.tearDown());
                    },
                }
            );
        },
        u = t => {
            const e = {};
            return (
                t.forEach(t => {
                    if ("checkbox" === t.type || "radio" === t.type) return e[t.name] || (e[t.name] = {}), void (e[t.name][t.id] = t.disabled ? "DISABLED" : t.checked.toString());
                    e[t.id] = t.value;
                }),
                e
            );
        },
        h = "",
        p = "";
})();
