/*!
 * gh-helpers (https://github.com/xc0d3rz/gh-blog/_includes/src/js/git.helpers.js)
 * Copyright 2016-2017 xc0d3rz(x.c0d3rz000@gmail.com)
 * Licensed under the MIT license
 */

/**
 * @inArray
 */
Injector("inArray", [], function () {
    return function (a, b) {
        if (b.indexOf(a) >= 0) {
            return true
        } else {
            return false;
        }
    };
});
/**
 * @Pathname
 */
Injector("Pather", ["Config", "inArray"], function ($a, $b, $c) {
    var caller = function (a) {
        var aa = {type: "unknown"};
        if (this.isPath(a)) {
            if (this.isPage(a)) {
                aa.type = "page";
                aa.payload = a.replace("/", "");
            } else if (this.isPost(a)) {
                aa.type = "post";
                aa.payload = this.Permalinks(a);
            }
        }
        return aa;
    };
    caller.prototype.list = [
        /\/(([A-z0-9\-\%]+\/)*[A-z0-9\-\%]+$)?/,
        /\/post\/((20)[0-9]{2})[ /](0[1-9]|1[012])[ /](0[1-9]|[12][0-9]|3[01])+\/([a-z-]*){3,39}/g
    ];
    /**
     *
     * @param a
     * @returns {boolean}
     */
    caller.prototype.isPath = function (a) {
        return this.list[0].test(a);
    };
    /**
     *
     * @param a
     * @returns {boolean}
     */
    caller.prototype.isPost = function (a) {
        return this.list[1].test(a);
    };
    caller.prototype.isPage = function (a) {
        return $b.inArray(a.replace("/", ""), $b.Config.site.pages);
    };
    /**
     *
     * @param a
     * @returns {Array}
     * @constructor
     */
    caller.prototype.Permalinks = function (a) {
        var b = [];
        a.replace(this.list[1], function () {
            b = [arguments[1], arguments[3], arguments[4], arguments[0].split("/")[arguments[0].split("/").length - 1]];
        });
        return b;
    };
    return function (a) {
        return new caller(a);
    };
});
