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
        // regions for editing - if edit is launched by startEdit without id or by IgnitionUI, then this is used
        this.regions = [];
        this.editedRegions = [];
        // CT directives get automatic ID if no ID present
        this.idCounter = 0;
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
        var o = Object.assign({}, this.defaultOptions, options ? options : {});
        this.editor.init(o.query, o.idField, o.fixture, o.ignition);
    };
    ContentToolsService.prototype.startEdit = function (id) {
        // if there is ID, either edit just that region, or add it to the edited ones if already editing
        if (id) {
            if (this.editor.getState() === ContentTools.EditorApp.EDITING)
                if (this.regions.indexOf(id) < 0)
                    this.regions.push(id);
                else
                    this.editedRegions = [id];
        }
        // set and refresh regions
        this.setRegions(this.editedRegions);
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
        this.editedRegions = this.regions;
        // if IgnitionUI present, propagate change of status there
        if (this.editor.ignition())
            this.editor.ignition().state("ready");
    };
    // adds region to editable regions
    ContentToolsService.prototype.addRegion = function (id) {
        // prevent duplicates
        if (this.regions.indexOf(id) < 0)
            this.regions.push(id);
        // dont set in case of editing, it will be set when stopEdit is called
        if (this.editor.getState() !== ContentTools.EditorApp.EDITING)
            this.setRegions(this.regions);
    };
    // removes region to editable regions
    ContentToolsService.prototype.removeRegion = function (id) {
        // remove from regions array
        this.regions.splice(this.regions.indexOf(id), 1);
        // dont set in case of editing, it will be set when stopEdit is called
        if (this.editor.getState() !== ContentTools.EditorApp.EDITING)
            this.setRegions(this.regions);
    };
    // set regions by ID - converts array of IDs into css query #ID1,#ID2,..
    ContentToolsService.prototype.setRegions = function (regions) {
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