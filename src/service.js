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
        // all regions (directives)
        this.regions = [];
        // regions for editing - if edit is launched by startEdit without id or by IgnitionUI, then this is used
        this.editedRegions = [];
        // CT directives get automatic ID if no ID present
        this.idCounter = 0;
        this.eventListeners = {};
        // default options if not set by init()
        this.defaultOptions = {
            fixture: function (el) { return el.hasAttribute('data-fixture'); },
            ignition: true
        };
        // get the editor
        this.editor = ContentTools.EditorApp.get();
    }
    // translation of editor.init()
    ContentToolsService.prototype.init = function (options) {
        var _this = this;
        var o = Object.assign({}, this.defaultOptions, options ? options : {});
        this.editor.init("", "id", o.fixture, o.ignition);
        this.editor.addEventListener('start', function (e) { return _this.fireRegionEvent(e); });
        this.editor.addEventListener('stop', function (e) { return _this.fireRegionEvent(e); });
        this.editor.addEventListener('saved', function (e) { return _this.fireRegionEvent(e); });
    };
    ContentToolsService.prototype.addRegionEventListener = function (id, eventName, cb) {
        if (!this.eventListeners[id])
            this.eventListeners[id] = {};
        if (!this.eventListeners[id][eventName])
            this.eventListeners[id][eventName] = [];
        this.eventListeners[id][eventName].push(cb);
    };
    ContentToolsService.prototype.fireRegionEvent = function (e) {
        var _this = this;
        this.editedRegions.forEach(function (id) {
            if (_this.eventListeners[id] && _this.eventListeners[id][e._name])
                _this.eventListeners[id][e._name].forEach(function (cb) { return cb(e); });
        });
    };
    ContentToolsService.prototype.startEdit = function (id) {
        // if there is ID, either edit just that region, or add it to the edited ones if already editing
        if (id) {
            if (this.editor.getState() === "editing") {
                if (this.editedRegions.indexOf(id) < 0)
                    this.editedRegions.push(id);
                this.setEditedRegions(this.editedRegions);
            }
            else {
                this.setEditedRegions([id]);
            }
        }
        // launch editor
        this.editor.start();
        // if IgnitionUI present, propagate change of status there
        if (this.editor.ignition())
            this.editor.ignition().state("editing");
    };
    ContentToolsService.prototype.stopEdit = function (save) {
        // stop editing, hide editor
        this.editor.stop(save);
        // set all regions, in case single region was specified in startEdit
        this.setEditedRegions(this.regions);
        // if IgnitionUI present, propagate change of status there
        if (this.editor.ignition())
            this.editor.ignition().state("ready");
    };
    ContentToolsService.prototype.isRegionEdited = function (id) {
        return this.editedRegions.indexOf(id) >= 0;
    };
    // adds region to list
    ContentToolsService.prototype.addRegion = function (id) {
        // prevent duplicates
        if (this.regions.indexOf(id) < 0)
            this.regions.push(id);
        // dont set in case of editing, it will be set when stopEdit is called
        if (this.editor.getState() !== "editing") {
            if (this.editedRegions.indexOf(id) < 0)
                this.editedRegions.push(id);
            this.setEditedRegions(this.editedRegions);
        }
    };
    // removes region to list
    ContentToolsService.prototype.removeRegion = function (id) {
        // remove from regions array
        if (this.regions.indexOf(id))
            this.regions.splice(this.regions.indexOf(id), 1);
        // dont set in case of editing, it will be set when stopEdit is called
        if (this.editor.getState() !== "editing") {
            if (this.editedRegions.indexOf(id) < 0)
                this.editedRegions.splice(this.editedRegions.indexOf(id), 1);
            this.setEditedRegions(this.editedRegions);
        }
    };
    // set regions by ID - converts array of IDs into css query #ID1,#ID2,..
    ContentToolsService.prototype.setEditedRegions = function (regions) {
        this.editedRegions = regions;
        this.editor.syncRegions(regions.map(function (item) { return "#" + item; }).join(","));
    };
    // refresh regions
    ContentToolsService.prototype.refresh = function () {
        this.editor.syncRegions();
    };
    // generate unique id for regions with no ID
    ContentToolsService.prototype.generateId = function () {
        this.idCounter++;
        return "contentTools_" + this.idCounter;
    };
    ContentToolsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ContentToolsService);
    return ContentToolsService;
}());
exports.ContentToolsService = ContentToolsService;
//# sourceMappingURL=service.js.map