import { Injectable } from '@angular/core';

import { ImageUploader } from "./imageuploader";

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
		
		ContentTools.IMAGE_UPLOADER = (dialog) => new ImageUploader(dialog);
		
		// save the default query for later restoring
		this.defaultQuery = query;
		
		// call callback when saved
		this.editor.addEventListener("saved",e => {
			
			// if no callback is set,return
			if(!this.callback) return;
			
			// save callback function because it is cleared by stop()
			var callback = this.callback;
			
			//call the callback function. setTimeout is because directives need to first save their data
			setTimeout(() => callback(e),100)
		});
	}

	start(query?,cb?){

		// if there is query, use it, otherwise use default			 
		this.editor.syncRegions(query ? query : this.defaultQuery);

		// if user wants to attach a callback for this edit session
		this.callback = cb;
						
		// launch editor
		this.editor.start();	
						
		// if IgnitionUI present, propagate change of status there
		if(this.editor.ignition()) this.editor.ignition().state("editing");
	}
	
	save(passive){
		return this.editor.save(passive);
	}

	stop(save?){
						
		if(this.editor.getState() !== "editing") return;
			 
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