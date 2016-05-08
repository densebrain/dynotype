"use strict";
var Promise = require('./Promise');
var Errors_1 = require("./Errors");
var Constants_1 = require("./Constants");
var Log = require('./log');
var log = Log.create(__filename);
var Repo = (function () {
    function Repo(modelClazz) {
        this.modelClazz = modelClazz;
        this.modelOpts = Reflect.getMetadata(Constants_1.TypeStoreModelKey, modelClazz.prototype);
    }
    Repo.prototype.makeFinder = function (finderKey) {
        var _this = this;
        var opts = Reflect.getMetadata(Constants_1.TypeStoreFinderKey, this.modelClazz, finderKey);
        var searchOpts = opts.searchOptions;
        if (!searchOpts) {
            log.debug('Generic finders are only created with a specified SearchProvider');
            return;
        }
        this.setFinder(finderKey, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return searchOpts.provider.search(_this.modelClazz, searchOpts, args).then(function (results) {
                // Once the provider returns the resulting data,
                // pass it to the mapper to get keys
                var keys = results.map(function (result) {
                    return searchOpts.resultKeyMapper(_this, searchOpts.resultType, result);
                });
                return Promise.map(keys, function (key) {
                    return _this.get(key);
                });
            });
        });
    };
    Repo.prototype.setFinder = function (finderKey, finderFn) {
        this[finderKey] = finderFn;
    };
    /**
     * Not implemented
     *
     * @param args
     * @returns {null}
     */
    Repo.prototype.key = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return Errors_1.NotImplemented('key');
    };
    /**
     * Get one or more models with keys
     *
     * @param key
     * @returns {null}
     */
    Repo.prototype.get = function (key) {
        return Errors_1.NotImplemented('get');
    };
    /**
     * Save model
     *
     * @param o
     * @returns {null}
     */
    Repo.prototype.save = function (o) {
        return Errors_1.NotImplemented('save');
    };
    /**
     * Remove a model
     *
     * @param key
     * @returns {null}
     */
    Repo.prototype.remove = function (key) {
        return Errors_1.NotImplemented('remove');
    };
    /**
     * Count models
     *
     * @returns {null}
     */
    Repo.prototype.count = function () {
        return Errors_1.NotImplemented('count');
    };
    return Repo;
}());
exports.Repo = Repo;

//# sourceMappingURL=Repo.js.map
