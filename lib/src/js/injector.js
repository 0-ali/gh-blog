/*!
 * gh-Injector (https://github.com/xc0d3rz/gh-blog/_includes/src/js/injector.js)
 * Copyright 2016-2017 xc0d3rz(x.c0d3rz000@gmail.com)
 * Licensed under the MIT license
 */
(function () {

    /**
     * @param string a(Module name)
     * @param array b(Module Injector)
     * @param function c(Module body)
     */
    Injector = function (a, b, c, d) {
        var throws = (typeof  d == "boolean") ? b : true;
        if (typeof a == "string" && Array.isArray(b) && typeof c == "function") {
            var Injector = this.Injector;
            var Module = function (modules, throws) {
                var $array = [];
                if (Array.isArray(modules)) {
                    modules.forEach(function (module) {
                        if (window.git(module) != false) {
                            $array.push(module);
                        } else {
                            if (throws == true) {
                                throw new Error("Can't resolve " + module + " in " + a);
                            }
                        }
                    });
                    return $array;
                }
            };
            var modules = Module(b, true);
            if (modules.length == b.length) {
                var req = {};
                modules.forEach(function (module) {
                    req[module] = window.git(module);
                });
                git.prototype[a] = c(arguments, req, window.git);
            }

        }
    };
    window.Injector = Injector;
}.call(window));