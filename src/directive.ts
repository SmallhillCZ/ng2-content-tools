import {  Directive, ElementRef, ValueProvider, Input, Output, EventEmitter, forwardRef  } from '@angular/core';
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
	set editable(editable:boolean){
		if(editable) this.ctService.addRegion(this.id);
		else this.ctService.removeRegion(this.id);
		this._editable = editable;
	}
	 
	@Input()
	set editing(editing:boolean){
		if(editing) this.startEditing();
		else this.stopEditing(false);
		this._editing = editing;
	}
	
	@Output()
	start = new EventEmitter();
	
	@Output()
	stop = new EventEmitter();
	
	@Output()
	save = new EventEmitter();
	 
	_editable:boolean = true;
	_editing:boolean = false;
	_disabled:boolean = false;
	_toBeSaved:boolean = false;
	
	id:string;

	onChange = (_) => {};
  onTouched = () => {};
	 
	constructor(private el: ElementRef, private ctService:ContentToolsService ) {
		if(!el.nativeElement.id) el.nativeElement.id = this.ctService.generateId();
		this.id = el.nativeElement.id;
		
		this.el.nativeElement.addEventListener("keyup",() => {
			this.onTouched();
			if(this._editing) this._toBeSaved = true;
		});
		this.el.nativeElement.addEventListener("click",() => this.onTouched());
		
		this.el.nativeElement.addEventListener("keyup",e => {
			if(e.which == 27) return this.stopEditing(false);
			if(e.ctrlKey && e.keyCode == 13) return this.stopEditing(true);
		});
		
		this.ctService.addRegion(this.id);
		
		this.ctService.editor.addEventListener('start',() => {
			if(this._editable) {
				this.el.nativeElement.classList.add("editing");
				this._editing = true;
				this.start.emit();
			}
		});
			
		this.ctService.editor.addEventListener('stop',() => {
			if(this._editing) {
				this.el.nativeElement.classList.remove("editing");
				this._editing = false;
				this.stop.emit();
			}
		});
		
		this.ctService.editor.addEventListener('saved',() => {
			if(this._toBeSaved) {
				this.onChange(this.el.nativeElement.innerHTML);
				this.save.emit();
				this._toBeSaved = false;
			}
		});
	}
	
	startEditing(){
		if(this._editing || this._disabled) return;
		this.ctService.startEdit(this.id);
	}
	 
	stopEditing(save){
		if(!this._editing) return;
		this.ctService.stopEdit(save);
	}
	 
	ngOnChange(){
		this.ctService.refresh();
	}
	
	ngOnDestroy(){
			this.stopEditing(false);
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