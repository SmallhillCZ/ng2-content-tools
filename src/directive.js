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
        this._editable = true;
        this._editing = false;
        this._disabled = false;
        this._toBeSaved = false;
        this.onChange = function (_) { };
        this.onTouched = function () { };
        if (!el.nativeElement.id)
            el.nativeElement.id = this.ctService.generateId();
        this.id = el.nativeElement.id;
        this.el.nativeElement.addEventListener("keyup", function () {
            _this.onTouched();
            if (_this._editing)
                _this._toBeSaved = true;
        });
        this.el.nativeElement.addEventListener("click", function () { return _this.onTouched(); });
        this.el.nativeElement.addEventListener("keyup", function (e) {
            if (e.which == 27)
                return _this.stopEditing(false);
            if (e.ctrlKey && e.keyCode == 13)
                return _this.stopEditing(true);
        });
        this.ctService.addRegion(this.id);
        this.ctService.editor.addEventListener('start', function () {
            if (_this._editable) {
                _this.el.nativeElement.classList.add("editing");
                _this._editing = true;
                _this.start.emit();
            }
        });
        this.ctService.editor.addEventListener('stop', function () {
            if (_this._editing) {
                _this.el.nativeElement.classList.remove("editing");
                _this._editing = false;
                _this.stop.emit();
            }
        });
        this.ctService.editor.addEventListener('saved', function () {
            if (_this._toBeSaved) {
                _this.onChange(_this.el.nativeElement.innerHTML);
                _this.save.emit(_this.el.nativeElement.innerHTML);
                _this._toBeSaved = false;
            }
        });
    }
    Object.defineProperty(ContentToolsDirective.prototype, "editable", {
        set: function (editable) {
            if (editable)
                this.ctService.addRegion(this.id);
            else
                this.ctService.removeRegion(this.id);
            this._editable = editable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentToolsDirective.prototype, "editing", {
        set: function (editing) {
            if (editing)
                this.startEditing();
            else
                this.stopEditing(false);
            this._editing = editing;
        },
        enumerable: true,
        configurable: true
    });
    ContentToolsDirective.prototype.startEditing = function () {
        if (this._editing || this._disabled)
            return;
        this.ctService.startEdit(this.id);
    };
    ContentToolsDirective.prototype.stopEditing = function (save) {
        if (!this._editing)
            return;
        this.ctService.stopEdit(save);
    };
    ContentToolsDirective.prototype.ngOnChange = function () {
        this.ctService.refresh();
    };
    ContentToolsDirective.prototype.ngOnDestroy = function () {
        this.stopEditing(false);
        this.ctService.removeRegion(this.id);
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
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], ContentToolsDirective.prototype, "editable", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean), 
        __metadata('design:paramtypes', [Boolean])
    ], ContentToolsDirective.prototype, "editing", null);
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