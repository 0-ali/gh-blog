/*!
 * gh-lazy (https://github.com/xc0d3rz/gh-blog/_includes/src/js/git.lazy.js)
 * Copyright 2016-2017 xc0d3rz(x.c0d3rz000@gmail.com)
 * Licensed under the MIT license
 */
Injector("Lazy", ["Config", "Storage"], function ($a, $b, $c) {
    var builder = function (template, name) {
        var a = "<!-- Lazy:" + (encodeURIComponent(name)) + " -->", b = "<!-- " + new Date().getTime() + " -->";
        return a + template + b;
    };
    var caller = (function (a, b, c, d) {
        var tempURL = (d || $b.Config.site.include.html) + a;
        return $.ajax({
            url: tempURL,
            dataType: "html",
            success: function (data) {
                var build = (typeof c == "undefined" || c == false) ? builder(data, a) : data
                b(build.trim(), Mustache.render, $b);
            },
            error: function () {
                var errorMessage = "Error while rendering lazy-Template:" + encodeURIComponent(a) + ", $.ajax returns: <br> <br>";
                errorMessage += JSON.stringify({
                    statusCode: arguments[0].status,
                    statusText: arguments[0].statusText,
                    templateUrl: tempURL
                });
                gitError.show(errorMessage);
            }
        })

    });
    return caller;
});
