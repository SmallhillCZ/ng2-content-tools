import { NgModule, Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[data-editable]' })
export class ng2ContentTools {
	
    constructor(el: ElementRef) {
       var this.el = el;
			//el.nativeElement
    }
	
}