/*!
 * gh-config (https://github.com/xc0d3rz/gh-blog/_includes/src/js/git.config.js)
 * Copyright 2016-2017 xc0d3rz(x.c0d3rz000@gmail.com)
 * Licensed under the MIT license
 */

Injector("Config", ["Storage"], function (a, b, c) {
        var deepExtend = function (out) {
            out = out || {};
            for (var i = 1; i < arguments.length; i++) {
                var obj = arguments[i];

                if (!obj)
                    continue;

                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object')
                            out[key] = deepExtend(out[key], obj[key]);
                        else
                            out[key] = obj[key];
                    }
                }
            }

            return out;
        }, caller = function (settings) {
            var a = Object.create({});
            if (typeof settings == "object") {
                Object.keys(settings).forEach(function (i) {
                    var data = settings[i];
                    if (settings.hasOwnProperty(i)) {
                        a.__defineGetter__(i, function () {
                            return data;
                        });
                        a.__defineSetter__(i, function (a) {
                            settings[i] = deepExtend(a, data);
                        });
                    }
                });
                a.require = function () {
                    return function (template, render) {
                        var builder = btoa(encodeURIComponent(template)).toUpperCase(),
                            tempURL = this.site.template.path + template;
                        $.ajax({
                            url: this.site.template.path + template,
                            success: function (data) {
                                var a = $("[data-builder='" + builder + "']");
                                a.html(render(data));
                            },
                            beforeSend: function () {
                                Pace.start();
                                Pace.options.message = "Rendering lazy-Template: " + encodeURIComponent(template);
                            },
                            error: function () {
                                var errorMessage = "Error while rendering lazy-Template:" + encodeURIComponent(template) + ", $.ajax returns: <br> <br>";
                                errorMessage += JSON.stringify({
                                    statusCode: arguments[0].status,
                                    statusText: arguments[0].statusText,
                                    templateUrl: tempURL
                                });
                                gitError.show(errorMessage);
                            }
                        });
                        return '<tpl data-builder="' + builder + '"></tpl>';
                    }
                };
                a.usePage = false;
                a.pageData = function () {
                    return function (pageData) {
                        pageData = pageData.trim().split(",");
                        a.page = {
                            title: pageData[0],
                            description: pageData[1],
                            intro: pageData[2]
                        };
                        a.usePage = true;
                    }
                };
                var toArray = function (a) {
                    var array = [];
                    for (var key in a) {
                        array.push(a[key]);
                    }
                    return array;
                };
                a.site.pages = toArray(a.site.pages);
            }
            return a;

        }, updater = function () {
            $.getJSON("config.json", function (data) {
                b.Storage.update("settings", data);
            });
        };
        setInterval(updater, 10000);
        var settings = {};
        if (b.Storage.get("settings") == null) {
            updater();
        } else {
            settings = b.Storage.get("settings");
        }
        return caller(settings);
    }
);
