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
var service_1 = require('./src/service');
exports.ContentToolsService = service_1.ContentToolsService;
var directive_1 = require('./src/directive');
exports.ContentToolsDirective = directive_1.ContentToolsDirective;
var ContentToolsModule = (function () {
    function ContentToolsModule() {
    }
    ContentToolsModule.forRoot = function () {
        return { ngModule: ContentToolsModule, providers: [service_1.ContentToolsService] };
    };
    ContentToolsModule = __decorate([
        core_1.NgModule({
            declarations: [directive_1.ContentToolsDirective],
            exports: [directive_1.ContentToolsDirective]
        }), 
        __metadata('design:paramtypes', [])
    ], ContentToolsModule);
    return ContentToolsModule;
}());
exports.ContentToolsModule = ContentToolsModule;
//# sourceMappingURL=index.js.map