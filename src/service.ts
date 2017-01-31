import { Injectable } from '@angular/core';

declare var ContentTools:any;

@Injectable()
export class ContentToolsService {
	
	editor: any;

	// all regions (directives)
	regions:string[] = [];

	// regions for editing - if edit is launched by startEdit without id or by IgnitionUI, then this is used
	editedRegions:string[] = [];

	// CT directives get automatic ID if no ID present
	idCounter:number = 0;

	eventListeners = {};

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
		this.editor.init("","id",o.fixture,o.ignition);

		this.editor.addEventListener('start',e => this.fireRegionEvent(e));
		this.editor.addEventListener('stop',e => this.fireRegionEvent(e));
		this.editor.addEventListener('saved',e => this.fireRegionEvent(e));
	}
																		
	addRegionEventListener(id,eventName,cb){
		if(!this.eventListeners[id]) this.eventListeners[id] = {};
		if(!this.eventListeners[id][eventName]) this.eventListeners[id][eventName] = [];
		this.eventListeners[id][eventName].push(cb);
	}
																		
	fireRegionEvent(e){
		this.editedRegions.forEach(id => {
			if(this.eventListeners[id] && this.eventListeners[id][e._name]) this.eventListeners[id][e._name].forEach(cb => cb(e));
		});
	}

	startEdit(id?){

		// if there is ID, either edit just that region, or add it to the edited ones if already editing
		if(id){
			if(this.editor.getState() === "editing"){
						if(this.editedRegions.indexOf(id) < 0) this.editedRegions.push(id);
						this.setEditedRegions(this.editedRegions);
			}
			else{ this.setEditedRegions([id]); }
		}
						
		// launch editor
		this.editor.start();	
						
		// if IgnitionUI present, propagate change of status there
		if(this.editor.ignition()) this.editor.ignition().state("editing");
	}

	stopEdit(save?){
						
		// stop editing, hide editor
		this.editor.stop(save);
						
		// set all regions, in case single region was specified in startEdit
		this.setEditedRegions(this.regions);
						
		// if IgnitionUI present, propagate change of status there
		if(this.editor.ignition()) this.editor.ignition().state("ready");
	}
						
	isRegionEdited(id){
		return this.editedRegions.indexOf(id) >= 0;
	}
	
	// adds region to list
	addRegion(id){
		// prevent duplicates
		if(this.regions.indexOf(id) < 0) this.regions.push(id);
		// dont set in case of editing, it will be set when stopEdit is called
		if(this.editor.getState() !== "editing"){
			if(this.editedRegions.indexOf(id) < 0) this.editedRegions.push(id);
			this.setEditedRegions(this.editedRegions);
		}
	}
	
	// removes region to list
	removeRegion(id){
		// remove from regions array
		if(this.regions.indexOf(id)) this.regions.splice(this.regions.indexOf(id),1);
						
		// dont set in case of editing, it will be set when stopEdit is called
		if(this.editor.getState() !== "editing"){
			if(this.editedRegions.indexOf(id) < 0) this.editedRegions.splice(this.editedRegions.indexOf(id),1);
			this.setEditedRegions(this.editedRegions);
		}
	}
					 
	// set regions by ID - converts array of IDs into css query #ID1,#ID2,..
	setEditedRegions(regions){
		this.editedRegions = regions;
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