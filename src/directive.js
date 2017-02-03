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
var forms_1 = require('@angular/forms');
var service_1 = require('./service');
// value accessor, for ngModel
var CUSTOM_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return ContentToolsDirective; }),
    multi: true
};
var ContentToolsDirective = (function () {
    function ContentToolsDirective(el, ctService) {
        var _this = this;
        this.el = el;
        this.ctService = ctService;
        this._disabled = false;
        this.onChange = function (_) { };
        this.onTouched = function () { };
        /* watch if element was touched */
        this.el.nativeElement.addEventListener("keyup", function () { return _this.onTouched(); });
        this.el.nativeElement.addEventListener("click", function () { return _this.onTouched(); });
        /* watch if element was changed. content tools modifies elements while editing, therefore we make the change only after save event */
        this.ctService.editor.addEventListener("save", function () { return _this.onChange(_this.el.nativeElement.innerHTML); });
    }
    ContentToolsDirective.prototype.ngOnChange = function () {
        this.ctService.refresh();
    };
    ContentToolsDirective.prototype.ngOnDestroy = function () {
        this.ctService.refresh();
    };
    /* ngModel */
    ContentToolsDirective.prototype.writeValue = function (value) {
        this.el.nativeElement.innerHTML = value;
        this.ctService.refresh();
    };
    ContentToolsDirective.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    ContentToolsDirective.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    ContentToolsDirective.prototype.setDisabledState = function (isDisabled) { this._disabled = isDisabled; };
    ContentToolsDirective = __decorate([
        core_1.Directive({
            selector: '[content-tools]',
            providers: [CUSTOM_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, service_1.ContentToolsService])
    ], ContentToolsDirective);
    return ContentToolsDirective;
}());
exports.ContentToolsDirective = ContentToolsDirective;
//# sourceMappingURL=directive.js.map