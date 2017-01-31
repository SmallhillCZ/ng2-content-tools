import { Injectable } from '@angular/core';

declare var ContentTools:any;

@Injectable()
export class ContentToolsService {
	
	editor: any;

	// regions for editing - if edit is launched by startEdit without id or by IgnitionUI, then this is used
	regions:string[] = [];

	editedRegions:string[] = [];

	// CT directives get automatic ID if no ID present
	idCounter:number = 0;

	// default options if not set by init()
	defaultOptions = {
		fixture: (el) => el.hasAttribute('data-fixture'),
		ignition: true
	};
	
	constructor(){
		// get the editor
		this.editor = ContentTools.EditorApp.get();
	}

	// translation of editor.init()
	init(options?){
		var o = Object.assign({},this.defaultOptions,options ? options : {});
		this.editor.init(o.query,o.idField,o.fixture,o.ignition);
	}

	startEdit(id?){
				
		// if there is ID, either edit just that region, or add it to the edited ones if already editing
		if(id){
			if(this.editor.getState() === ContentTools.EditorApp.EDITING) if(this.regions.indexOf(id) < 0) this.regions.push(id);
			else this.editedRegions = [id];
		}
			
		// set and refresh regions
		this.setRegions(this.editedRegions);
						
		// launch editor
		this.editor.start();	
						
		// if IgnitionUI present, propagate change of status there
		if(this.editor.ignition()) this.editor.ignition().state("editing");
	}

	stopEdit(save?){
						
		// stop editing, hide editor
		this.editor.stop(save);
						
		// set all regions, in case single region was specified in startEdit
		this.editedRegions = this.regions;
						
		// if IgnitionUI present, propagate change of status there
		if(this.editor.ignition()) this.editor.ignition().state("ready");
	}
	
	// adds region to editable regions
	addRegion(id){
		// prevent duplicates
		if(this.regions.indexOf(id) < 0) this.regions.push(id);
		// dont set in case of editing, it will be set when stopEdit is called
		if(this.editor.getState() !== ContentTools.EditorApp.EDITING) this.setRegions(this.regions);
	}
	
	// removes region to editable regions
	removeRegion(id){
		// remove from regions array
		this.regions.splice(this.regions.indexOf(id),1);
		// dont set in case of editing, it will be set when stopEdit is called
		if(this.editor.getState() !== ContentTools.EditorApp.EDITING) this.setRegions(this.regions);
	}
					 
	// set regions by ID - converts array of IDs into css query #ID1,#ID2,..
	setRegions(regions){
		this.editor.syncRegions(regions.map(item => "#" + item).join(","));
	}
					 
	// refresh regions
	refresh(){
		this.editor.syncRegions();
	}

	// generate unique id for regions with no ID
	generateId(){
		this.idCounter++;
		return "contentTools_" + this.idCounter;
	}
	
}