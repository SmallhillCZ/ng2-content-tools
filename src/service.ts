import { Injectable } from '@angular/core';

declare var ContentTools:any;

@Injectable()
export class ContentToolsService {
	
	editor: any;

	// all regions
	regions:any[] = [];

	query: any;

	activeQuery: any;
	
	constructor(){
		// get the editor
		this.editor = ContentTools.EditorApp.get();
	}

	// translation of editor.init()
	init(options){
		this.editor.init(options);
			 
		this.query = options[0];

		this.editor.addEventListener('start',e => this.fireRegionEvent(e));
		this.editor.addEventListener('stop',e => this.fireRegionEvent(e));
		this.editor.addEventListener('saved',e => this.fireRegionEvent(e));
	}
																		
																		
	fireRegionEvent(e){
		this.regions.forEach(region => {
			if(region.el.matches(this.activeQuery) && region[e._name]) region[e._name](e);
		});
	}

	start(query?){

		// if there is query, use it, otherwise use default
		if(query)  this.activeQuery = query;
			 
		this.editor.syncRegions(this.activeQuery);
						
		// launch editor
		this.editor.start();	
						
		// if IgnitionUI present, propagate change of status there
		if(this.editor.ignition()) this.editor.ignition().state("editing");
	}

	stop(save?){
						
		// stop editing, hide editor
		this.editor.stop(save);
		
		this.activeQuery = this.query;
			 
		// set all regions, in case single region was specified in startEdit
		this.editor.syncRegions(this.activeQuery);
						
		// if IgnitionUI present, propagate change of status there
		if(this.editor.ignition()) this.editor.ignition().state("ready");
	}
	
	// adds region to list
	addRegion(region){
		this.regions.push(region);
	}
	
	// removes region to list
	removeRegion(el){
		// remove from regions array
		this.regions = this.regions.filter(region => region.el !== el);
	}
					 
	// refresh regions
	refresh(){
		this.editor.syncRegions();
	}
	
}