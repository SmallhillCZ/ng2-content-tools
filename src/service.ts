import { Injectable } from '@angular/core';

declare var ContentTools:any;

@Injectable()
export class ContentToolsService {
	
	editor: any;

	defaultQuery: any;

	callback:(Event) => void;
	
	constructor(){
		// get the editor
		this.editor = ContentTools.EditorApp.get();
	}

	// translation of editor.init()
	init(query,id,fixture,ignition){
		this.editor.init(query,id,fixture,ignition);
		
		// save the default query for later restoring
		this.defaultQuery = query;
		
		this.editor.addEventListener("saved",e => {
			console.log(e);
			if(this.callback) this.callback(e);
		});
	}

	start(query?,cb?){

		// if there is query, use it, otherwise use default			 
		this.editor.syncRegions(query ? query : this.defaultQuery);

		// if user wants to attach a callback for this edit session
		if(cb) this.callback = cb;
						
		// launch editor
		this.editor.start();	
						
		// if IgnitionUI present, propagate change of status there
		if(this.editor.ignition()) this.editor.ignition().state("editing");
	}

	stop(save?){
						
		// stop editing, hide editor
		this.editor.stop(save);
			 
		// remove callback
		this.callback = null;
			 
		// set default query
		this.editor.syncRegions(this.defaultQuery);
						
		// if IgnitionUI present, propagate change of status there
		if(this.editor.ignition()) this.editor.ignition().state("ready");
	}
					 
	// refresh regions
	refresh(){
		this.editor.syncRegions();
	}
	
}