import { Directive, ElementRef, ValueProvider, forwardRef, Input, Output, EventEmitter } from '@angular/core';
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

	@Input()
	autosave:number = 0;
	 
	@Output()
	save = new EventEmitter();
	 
	autosaveTimeout;
	
	_disabled:boolean = false;

	onChange = (_) => {};
  onTouched = () => {};
	 
	constructor(private el: ElementRef, private ctService:ContentToolsService){
		
		if(!this.getRegionID) console.log("Region name is not set by parameter " + this.ctService.editor._namingProp);
		
		/* watch if element was touched */
		this.el.nativeElement.addEventListener("keyup",() => this.onTouched() || this.autoSave());
		this.el.nativeElement.addEventListener("click",() => this.onTouched());
		
		/* watch if element was changed. content tools modifies elements while editing, therefore we make the change only after save event */
		this.ctService.editor.addEventListener("saved",e => {
			
			// get region data from event
			var changedData = e.detail().regions[this.getRegionID()];
			
			// data is only populated if something changed
			if(changedData){
				// send data through ngModel
				this.onChange(changedData);
				// emit save event on element
				this.save.emit(changedData);
			}
			// if there was running timeout on save, we can clear it
			if(this.autosaveTimeout) clearTimeout(this.autosaveTimeout);
		});
	}
	 
	autoSave(){
		// if autoset is turned off, quit
		if(!this.autosave) return;
		
		// if there has been last change in less that timeout then cancel saving
		if(this.autosave) clearTimeout(this.autosaveTimeout);
		
		// set timeout to save
		this.autosaveTimeout = setTimeout(() => this.ctService.editor.save(true),this.autosave);
	}
	 
	getRegionID(){
	  return this.el.nativeElement.getAttribute(this.ctService.editor._namingProp);
	}
	 
	ngOnChange(){
		this.ctService.refresh();
	}
	
	ngOnDestroy(){
		this.ctService.stop(this.autosave ? true : false);
	}

	/* ngModel */
	writeValue(value: any): void {
		if(!value) value = "";
		this.el.nativeElement.innerHTML = value;
		this.ctService.refresh();
	}

	registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
	registerOnTouched(fn: () => void): void { this.onTouched = fn; }
	setDisabledState(isDisabled: boolean) : void { this._disabled = isDisabled;}
	
}