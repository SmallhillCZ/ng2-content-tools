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
        this.start = new core_1.EventEmitter();
        this.stop = new core_1.EventEmitter();
        this.save = new core_1.EventEmitter();
        this.saved = new core_1.EventEmitter();
        this._disabled = false;
        this._toBeSaved = false;
        this.onChange = function (_) { };
        this.onTouched = function () { };
        this.el.nativeElement.addEventListener("keyup", function () {
            _this.onTouched();
            _this._toBeSaved = true;
        });
        this.el.nativeElement.addEventListener("click", function () { return _this.onTouched(); });
        this.ctService.addRegion({
            el: this.el.nativeElement,
            start: function (e) { return _this.start.emit(e); },
            stop: function (e) { return _this.stop.emit(e); },
            save: function (e) { return _this._toBeSaved && _this.save.emit(e); },
            saved: function (e) { return _this._toBeSaved && _this.saved.emit(e); }
        });
    }
    ContentToolsDirective.prototype.ngOnChange = function () {
        this.ctService.refresh();
    };
    ContentToolsDirective.prototype.ngOnDestroy = function () {
        this.ctService.removeRegion(this.el.nativeElement);
    };
    /* ngModel */
    ContentToolsDirective.prototype.writeValue = function (value) {
        this.el.nativeElement.innerHTML = value;
        this.ctService.refresh();
    };
    ContentToolsDirective.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    ContentToolsDirective.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    ContentToolsDirective.prototype.setDisabledState = function (isDisabled) { this._disabled = isDisabled; };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ContentToolsDirective.prototype, "start", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ContentToolsDirective.prototype, "stop", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ContentToolsDirective.prototype, "save", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ContentToolsDirective.prototype, "saved", void 0);
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