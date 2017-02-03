import { Directive, ElementRef, ValueProvider, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ContentToolsService } from './service';

// value accessor, for ngModel
const CUSTOM_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => ContentToolsDirective),
	multi: true
};

@Directive({
	selector: '[content-tools]',
	providers: [CUSTOM_VALUE_ACCESSOR]
})
export class ContentToolsDirective implements ControlValueAccessor {	

	_disabled:boolean = false;
	 
	id:number;

	onChange = (_) => {};
  onTouched = () => {};
	 
	constructor(private el: ElementRef, private ctService:ContentToolsService){
		
		/* watch if element was touched */
		this.el.nativeElement.addEventListener("keyup",() => this.onTouched());
		this.el.nativeElement.addEventListener("click",() => this.onTouched());
		
		/* watch if element was changed. content tools modifies elements while editing, therefore we make the change only after save event */
		this.ctService.editor.addEventListener("save",() => this.onChange(this.el.nativeElement.innerHTML));
	}
	 
	ngOnChange(){
		this.ctService.refresh();
	}
	
	ngOnDestroy(){
		this.ctService.refresh();
	}

	/* ngModel */
	writeValue(value: any): void {
		this.el.nativeElement.innerHTML = value;
		this.ctService.refresh();
	}

	registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
	registerOnTouched(fn: () => void): void { this.onTouched = fn; }
	setDisabledState(isDisabled: boolean) : void { this._disabled = isDisabled;}
	
}