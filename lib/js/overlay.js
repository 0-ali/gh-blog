(function () {
    var Overlay = function () {
        if (arguments.length >= 3) {
            this.set("options", arguments[2]);
            this.generateOverlay();
            this.set("content", arguments[1]);
            this.method(arguments[0]);
        } else if (arguments.length == 2) {
            this.generateOverlay();
            this.set("content", arguments[1]);
            this.method(arguments[0]);
        } else if (arguments.length == 1) {
            this.generateOverlay();
            this.method(arguments[0]);
        }
    };
    Overlay.prototype.options = {
        background: "rgba(0, 0, 0, 0.9)", /* Black w/opacity */
        effects: ["slide-down", "slide-right"],
        effect: "slide-right",
        css: {},
        content: "",
        close: true
    };
    Overlay.prototype.random = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };
    Overlay.prototype.generateOverlay = function () {
        var
            a = atob("PGRpdiBjbGFzcz0ib3ZlcmxheSIgZGF0YS10YXJnZXQ9Int0YXJnZXR9Ij48YSBocmVmPSJqYXZhc2NyaXB0OnZvaWQoMCkiIGNsYXNzPSJjbG9zZSIgZGF0YS10YXJnZXQ9Int0YXJnZXR9Ij4mdGltZXM7PC9hPjxkaXYgY2xhc3M9Im92ZXJsYXktY29udGVudCIgZGF0YS10YXJnZXQ9Int0YXJnZXR9Ij48L2Rpdj48L2Rpdj4="), b = this.options.target || "";
        this.options.target = b;
        if ($("[data-target='" + b + "']").length == 0 && b.length > 0) {
            $('body').after(a.replace(/{target}/g, this.options.target));
        }
        this.elements = [
            $(".overlay[data-target='" + this.options.target + "']"),
            $(".overlay-content[data-target='" + this.options.target + "']"),
            $(".close[data-target='" + this.options.target + "']")
        ];
        return this.elements;
    };
    Overlay.prototype.set = function (a, b) {
        switch (a) {
            case "background":
                this.options.background = $.extend(b, this.options.background);
                break;
            case "css":
                this.options.css = $.extend(b, this.options.css);
                break;
            case "content":
                this.options.content = b;
                if (b.length > 0) {
                    this.elements[1].html(this.options.content);
                }
                break;
            case "effect":
                this.options.effect = ($.inArray(b, this.options.effects) >= 0) ? b : "slide-right";
                break;
            case "options":
                this.options = $.extend(this.options, b);
                break;
        }
    };
    Overlay.prototype.get = function (a) {
        switch (a) {
            case "status":
                if (this.options.effect == "slide-right") {
                    var status = (this.elements[0].css("width") == "0px") ? false : true;
                } else {
                    var status = (this.elements[0].css("height") == "0px") ? false : true;
                }
                return status;
                break;
        }
    };
    Overlay.prototype.on = function (a, b) {
        switch (a) {
            case "close":
                if ($.isFunction(b)) {
                    this.elements[2].on("click", b);
                }
                break;
            case "show":
                if ($.isFunction(b)) {
                    (function () {
                        $.prototype.on.apply($(".overlay"), ["overlayShow", b]);
                    }.call(window));
                }
                break;
            case "hide":
                if ($.isFunction(b)) {
                    (function () {
                        $.prototype.on.apply($(".overlay"), ["overlayHide", b]);
                    }.call(window));
                }
                break;
        }
    };
    Overlay.prototype.applyEffect = function (a) {
        if (this.options.effect == "slide-right") {
            if (a == "show") {
                this.elements[0].css("width", "100%");
            } else {
                this.elements[0].css("width", "0%");
            }
        } else {
            if (a == "show") {
                this.elements[0].css("height", "100%");
            } else {
                this.elements[0].css("height", "0%");
            }
        }
    };
    Overlay.prototype.method = function (a) {
        switch (a) {
            case "show":
                if (this.get("status") == false) {
                    this.applyEffect("show");
                    this.elements[0].css("background-color", this.options.background);
                    this.elements[0].trigger("overlayShow");

                }
                break;
            case "hide":
                if (this.get("status") == true) {
                    this.applyEffect("hide");
                    this.elements[1].html("");
                    this.elements[0].trigger("overlayHide");
                }
                break;
        }

    };
    Overlay.prototype.close = function () {
        var Overlay = this;
        this.elements[2].on("click", function () {
            if (Overlay.options.close == true) {
                Overlay.method("hide");
            }
        });
    };
    window.Overlay = Overlay
}.call(window));