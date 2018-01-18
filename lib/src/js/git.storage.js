/*!
 * gh-storage 1.0 (https://github.com/xc0d3rz/gh-blog/_includes/src/js/git.storage.js)
 * Copyright 2016-2017 xc0d3rz(x.c0d3rz000@gmail.com)
 * Licensed under the MIT license
 */
Injector("Storage", [], function () {

    var caller = function () {
    };
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
    };
    caller.prototype.settings = {
        storage: localStorage
    };
    /**
     *
     * @param object
     * @returns {boolean}
     */
    caller.prototype.isObject = function (object) {
        try {
            JSON.parse(object);
            return true;
        } catch (e) {
            return false;
        }
    };
    /**
     *
     * @param key
     * @param callback
     * @returns {*}
     */
    caller.prototype.get = function (key, callback) {
        var get = this.settings.storage.getItem(key);
        var getItem = (this.isObject(get)) ? JSON.parse(get) : get;
        if (typeof callback == "function") {
            callback(getItem);
        }
        return getItem;
    };
    /**
     *
     * @param key
     * @param value
     */
    caller.prototype.set = function (key, value) {
        var value = (typeof value == "object") ? JSON.stringify(value) : value;
        var storage = this.settings.storage;
        storage.setItem(key, value);
    };
    /**
     *
     * @param key
     */
    caller.prototype.unset = function (key) {
        var storage = this.settings.storage;
        storage.removeItem(key);
    };
    /**
     *
     * @param key
     * @param value
     */
    caller.prototype.update = function (key, value) {
        var storage = this.settings.storage;
        var getItem = this.get(key);
        if (Array.isArray(getItem)) {
            var array = getItem;
            array.push(value)
            this.set(key, array);
        } else if (typeof getItem == "object") {
            this.set(key, deepExtend(getItem, value));
        } else {
            this.set(key, value);
        }
    };

    caller.prototype.clear = function () {
        var storage = this.settings.storage;
        storage.clear();
    };
    return new caller();
});
