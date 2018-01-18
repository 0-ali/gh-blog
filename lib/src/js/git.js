/*!
 * gh 1.0 (https://github.com/xc0d3rz/gh-blog/_includes/src/js/git.js)
 * Copyright 2016-2017 xc0d3rz(x.c0d3rz000@gmail.com)
 * Licensed under the MIT license
 */
(function () {
    /**
     *
     * @param a
     * @returns {*}
     */
    window.git = function (a) {
        if (window.git.prototype.hasOwnProperty(a)) {
            return window.git.prototype[a];
        } else {
            return false;
        }
    };
}.call(window));