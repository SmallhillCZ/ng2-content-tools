var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, ElementRef, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ContentToolsService } from './service';
// value accessor, for ngModel
var CUSTOM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ContentToolsDirective; }),
    multi: true
};
var ContentToolsDirective = (function () {
    function ContentToolsDirective(el, ctService) {
        var _this = this;
        this.el = el;
        this.ctService = ctService;
        this.autosave = 0;
        this.save = new EventEmitter();
        this._disabled = false;
        this.onChange = function (_) { };
        this.onTouched = function () { };
        if (!this.getRegionID)
            console.log("Region name is not set by parameter " + this.ctService.editor._namingProp);
        /* watch if element was touched */
        this.el.nativeElement.addEventListener("keyup", function () { return _this.onTouched() || _this.autoSave(); });
        this.el.nativeElement.addEventListener("click", function () { return _this.onTouched(); });
        /* watch if element was changed. content tools modifies elements while editing, therefore we make the change only after save event */
        this.ctService.editor.addEventListener("saved", function (e) {
            // get region data from event
            var changedData = e.detail().regions[_this.getRegionID()];
            // data is only populated if something changed
            if (changedData) {
                // send data through ngModel
                _this.onChange(changedData);
                // emit save event on element
                _this.save.emit(changedData);
            }
            // if there was running timeout on save, we can clear it
            if (_this.autosaveTimeout)
                clearTimeout(_this.autosaveTimeout);
        });
    }
    ContentToolsDirective.prototype.autoSave = function () {
        var _this = this;
        // if autoset is turned off, quit
        if (!this.autosave)
            return;
        // if there has been last change in less that timeout then cancel saving
        if (this.autosave)
            clearTimeout(this.autosaveTimeout);
        // set timeout to save
        this.autosaveTimeout = setTimeout(function () { return _this.ctService.editor.save(true); }, this.autosave);
    };
    ContentToolsDirective.prototype.getRegionID = function () {
        return this.el.nativeElement.getAttribute(this.ctService.editor._namingProp);
    };
    ContentToolsDirective.prototype.ngOnChange = function () {
        this.ctService.refresh();
    };
    ContentToolsDirective.prototype.ngOnDestroy = function () {
        this.ctService.stop(this.autosave ? true : false);
    };
    /* ngModel */
    ContentToolsDirective.prototype.writeValue = function (value) {
        if (!value)
            value = "";
        this.el.nativeElement.innerHTML = value;
        this.ctService.refresh();
    };
    ContentToolsDirective.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    ContentToolsDirective.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    ContentToolsDirective.prototype.setDisabledState = function (isDisabled) { this._disabled = isDisabled; };
    return ContentToolsDirective;
}());
__decorate([
    Input(),
    __metadata("design:type", Number)
], ContentToolsDirective.prototype, "autosave", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], ContentToolsDirective.prototype, "save", void 0);
ContentToolsDirective = __decorate([
    Directive({
        selector: '[content-tools]',
        providers: [CUSTOM_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [ElementRef, ContentToolsService])
], ContentToolsDirective);
export { ContentToolsDirective };
//# sourceMappingURL=directive.js.map