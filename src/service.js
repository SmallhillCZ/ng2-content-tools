"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ContentToolsService = (function () {
    function ContentToolsService() {
        // all regions
        this.regions = [];
        // get the editor
        this.editor = ContentTools.EditorApp.get();
    }
    // translation of editor.init()
    ContentToolsService.prototype.init = function (options) {
        var _this = this;
        this.editor.init(options);
        this.query = options[0];
        this.editor.addEventListener('start', function (e) { return _this.fireRegionEvent(e); });
        this.editor.addEventListener('stop', function (e) { return _this.fireRegionEvent(e); });
        this.editor.addEventListener('saved', function (e) { return _this.fireRegionEvent(e); });
    };
    ContentToolsService.prototype.fireRegionEvent = function (e) {
        var _this = this;
        this.regions.forEach(function (region) {
            if (region.el.matches(_this.activeQuery) && region[e._name])
                region[e._name](e);
        });
    };
    ContentToolsService.prototype.start = function (query) {
        // if there is query, use it, otherwise use default
        if (query)
            this.activeQuery = query;
        this.editor.syncRegions(this.activeQuery);
        // launch editor
        this.editor.start();
        // if IgnitionUI present, propagate change of status there
        if (this.editor.ignition())
            this.editor.ignition().state("editing");
    };
    ContentToolsService.prototype.stop = function (save) {
        // stop editing, hide editor
        this.editor.stop(save);
        this.activeQuery = this.query;
        // set all regions, in case single region was specified in startEdit
        this.editor.syncRegions(this.activeQuery);
        // if IgnitionUI present, propagate change of status there
        if (this.editor.ignition())
            this.editor.ignition().state("ready");
    };
    // adds region to list
    ContentToolsService.prototype.addRegion = function (region) {
        this.regions.push(region);
    };
    // removes region to list
    ContentToolsService.prototype.removeRegion = function (el) {
        // remove from regions array
        this.regions = this.regions.filter(function (region) { return region.el !== el; });
    };
    // refresh regions
    ContentToolsService.prototype.refresh = function () {
        this.editor.syncRegions();
    };
    ContentToolsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ContentToolsService);
    return ContentToolsService;
}());
exports.ContentToolsService = ContentToolsService;
//# sourceMappingURL=service.js.map