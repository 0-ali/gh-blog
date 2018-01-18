/*!
 * git.page 1.0 (https://github.com/xc0d3rz/gh-blog/_includes/src/js/injector.js)
 * Copyright 2016-2017 xc0d3rz(x.c0d3rz000@gmail.com)
 * Licensed under the MIT license
 */
Injector("Page", ["Lazy", "Config"], function ($a, $b, $c) {
    var caller = function (a) {
        var page = this;
        Lazy(a + ".html", function (template, render, git) {
            $("body [owner='main']").html(render(template, git.Config));
            document.title += " " + settings.title + " " + git.Config.page.title
            page.render();
        }, false, settings.url);
    }, Lazy = $b.Lazy, settings = $b.Config.pages;
    caller.prototype.render = function () {
        Lazy("header.html", function (template, render, git) {
            $("body [owner='header']").html(render(template, git.Config));
        });
    };
    return caller;
});