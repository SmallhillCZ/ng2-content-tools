import { Directive, ElementRef, ValueProvider, Input, Output, EventEmitter, forwardRef  } from '@angular/core';
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
	
	@Output()
	start = new EventEmitter();
	
	@Output()
	stop = new EventEmitter();
	
	@Output()
	save = new EventEmitter();
	 
	@Output()
	saved = new EventEmitter();

	_disabled:boolean = false;
	_toBeSaved:boolean = false;
	 
	id:number;

	onChange = (_) => {};
  onTouched = () => {};
	 
	constructor(private el: ElementRef, private ctService:ContentToolsService ) {

		this.el.nativeElement.addEventListener("keyup",() => {
			this.onTouched();
			this._toBeSaved = true;
		});
		this.el.nativeElement.addEventListener("click",() => this.onTouched());
		
		this.id = this.ctService.addRegion({
			el: this.el.nativeElement,
			start: e => this.start.emit(e),
			stop: e => this.stop.emit(e),
			save: e => this._toBeSaved && this.save.emit(e),
			saved: e => this._toBeSaved && this.saved.emit(e)
		});
		
	}
	 
	ngOnChange(){
		this.ctService.refresh();
	}
	
	ngOnDestroy(){
		this.ctService.removeRegion(this.id);
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