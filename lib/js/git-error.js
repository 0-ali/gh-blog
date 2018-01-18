(function () {
    var error = function () {
    };
    error.prototype.content = "PGRpdiBjbGFzcz0iZXJyb3IiPjxoMT5Pb3BzITwvaDE+PGJyPjxjb2RlPnttZXNzYWdlfTwvY29kZT48L2Rpdj4=";
    error.prototype.getContent = function () {
        return atob(this.content).replace("{message}", arguments[0] || "");
    };
    error.prototype.blurAll = function () {
        var a = $("*");
    };
    error.prototype.show = function () {
        $(".overlay[data-target='loader']").remove();
        this.Overlay = new Overlay("show", this.getContent(arguments[0]), {
            background: "rgba(242, 222, 222, 0.89)",
            close: false,
            target: "error"
        });
        $("body").addClass("blur");

    };
    window.gitError = new error();
}.call(window));
