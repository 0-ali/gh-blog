/*!
 * gh-router 1.0 (https://github.com/xc0d3rz/gh-blog/_includes/src/js/git.router.js)
 * Copyright 2016-2017 xc0d3rz(x.c0d3rz000@gmail.com)
 * Licensed under the MIT license
 */

Injector("Router", ["Storage", "Pather", "Lazy", "Page"], function ($a, $b) {
    /**
     *
     * @param a
     * @param b
     */
    var caller = function (redirect) {
        var a = $b.Pather(new URL(redirect).pathname);
        switch (a.type) {
            case "unknown":
                $b.Lazy("main.html", function (template, render, git) {
                    $("body [owner='main']").append(render(template, git.Config));
                });
                break;
            case "page":
                new $b.Page(a.payload);
                break;
            case "post":
                break;
        }
    };
    var Pather = $b.Pather(location.hash)
    if (Pather.type == "post") {
        $b.Storage.set("redirect", location.protocol + "//" + location.host + "/post/" + encodeURIComponent(Pather.target));
    }
    $b.Storage.get("redirect", function (redirect) {
        $b.Storage.unset("redirect");
        if (redirect && redirect != location.href) {
            history.replaceState(null, null, redirect);
            caller(redirect);
        } else {
            caller(location.href);
        }
    });
});
