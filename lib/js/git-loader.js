(function () {
    var loader = function () {
    };
    loader.prototype.content = "PGRpdiBjbGFzcz0ibG9hZGVyIj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0ic2stZm9sZGluZy1jdWJlIj4KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InNrLWN1YmUxIHNrLWN1YmUiPjwvZGl2PgogICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ic2stY3ViZTIgc2stY3ViZSI+PC9kaXY+CiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSJzay1jdWJlNCBzay1jdWJlIj48L2Rpdj4KICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9InNrLWN1YmUzIHNrLWN1YmUiPjwvZGl2PgogICAgICAgICAgICA8L2Rpdj4KICA8cD57e01lc3NhZ2V9fTwvcD4KICAgICAgICA8L2Rpdj4=";
    loader.prototype.getContent = function () {
        var toUpper = function (str) {
            str = str || "";
            return str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
        return atob(this.content).replace("{{Message}}", toUpper(arguments[0]));
    };
    loader.prototype.show = function () {

        this.Overlay = new Overlay("show", this.getContent(arguments[0]), {
            background: "#343436",
            close: false,
            target: "loader"
        });
    };
    loader.prototype.hide = function () {
        this.Overlay.method("hide");
    };
    window.Loader = new loader();
}.call(window));

Pace.on("start", function () {
    window.Loader.show(this.options.message || "Please Wait!");
});
Pace.on("done", function () {
    window.Loader.hide();
});