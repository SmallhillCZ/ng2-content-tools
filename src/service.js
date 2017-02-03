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
        // get the editor
        this.editor = ContentTools.EditorApp.get();
    }
    // translation of editor.init()
    ContentToolsService.prototype.init = function (query, id, fixture, ignition) {
        var _this = this;
        this.editor.init(query, id, fixture, ignition);
        // save the default query for later restoring
        this.defaultQuery = query;
        this.editor.addEventListener("saved", function (e) {
            console.log(e);
            if (_this.callback)
                _this.callback(e);
        });
    };
    ContentToolsService.prototype.start = function (query, cb) {
        // if there is query, use it, otherwise use default			 
        this.editor.syncRegions(query ? query : this.defaultQuery);
        // if user wants to attach a callback for this edit session
        if (cb)
            this.callback = cb;
        // launch editor
        this.editor.start();
        // if IgnitionUI present, propagate change of status there
        if (this.editor.ignition())
            this.editor.ignition().state("editing");
    };
    ContentToolsService.prototype.stop = function (save) {
        // stop editing, hide editor
        this.editor.stop(save);
        // remove callback
        this.callback = null;
        // set default query
        this.editor.syncRegions(this.defaultQuery);
        // if IgnitionUI present, propagate change of status there
        if (this.editor.ignition())
            this.editor.ignition().state("ready");
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