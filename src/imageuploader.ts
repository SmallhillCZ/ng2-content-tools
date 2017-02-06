export class ImageUploader {

	dialog:any;

	reader:any;
	image:any;
	canvas:any;

	maxHeight = 320;
	maxWidth = 640;

	rotation = 0;
	crop = [0,0,1,1];

	constructor(dialog) {

		this.dialog = dialog;
		
		this.dialog.addEventListener('imageuploader.fileready', e => this.loadFile(e.detail().file));

    this.dialog.addEventListener('imageuploader.clear',e => this.dialog.clear());
		
		this.dialog.addEventListener('imageuploader.cancelupload',e => this.dialog.state('empty'));
		
		this.dialog.addEventListener('imageuploader.save',e => this.save());
		
		this.dialog.addEventListener('imageuploader.rotatecw',e => this.rotateImage(0.5 * Math.PI));
		this.dialog.addEventListener('imageuploader.rotateccw',e => this.rotateImage(-0.5 * Math.PI));
		
		this.dialog.addEventListener('imageuploader.mount',e => this.createCanvas());
		
		//	Create our FileReader and run the results through the render function.
		this.reader = new FileReader();
		
		this.reader.onprogress = (data) => {
			if (data.lengthComputable) {                                            
				this.dialog.progress((data.loaded / data.total) * 100);
			}
		}
		
		this.reader.onload = (e) => {
			this.createImage(e.target.result);
		}

	}

	loadFile(file){
		
		this.dialog.progress(0);
		this.dialog.state('uploading');

		this.reader.readAsDataURL(file);
		
	}

	createCanvas(){
		var canvas = this.canvas = this.dialog._domView.appendChild(document.createElement("canvas"));
		var ctx = canvas.getContext("2d");

		canvas.width = this.maxWidth;
		canvas.height = this.maxHeight;

		ctx.translate(canvas.width/2,canvas.height/2);

	}

	createImage(data){
		var image = this.image = new Image();
		var canvas = this.canvas;
		
		image.onload = () => {
			this.renderImage();
			this.dialog.state("populated");
		}
		
		console.log(canvas.getContext("2d"),{image:image});
		
		image.src = data;
	}
		

	renderImage(){
		
		var canvas = this.canvas;
		var ctx = canvas.getContext("2d");
		var image = this.image;
		
		var crop = this.crop;
		
		console.log(crop);
		
		var w,h,r,rotatedWidth,rotatedHeight;
		
		w = image.width * (crop[2] - crop[0]);
		h = image.height * (crop[3] - crop[1]);
		r = Math.sqrt(Math.pow(w/2,2) + Math.pow(h/2,2));
			
		rotatedWidth = Math.abs(r * Math.cos(this.rotation + Math.acos(w/2/r))) * 2;
		
		if(rotatedWidth > this.maxWidth) {
			w *= this.maxWidth / rotatedWidth;
			h *= this.maxWidth / rotatedWidth;
		}	
	
		r = Math.sqrt(Math.pow(w/2,2) + Math.pow(h/2,2));
		
		rotatedHeight = Math.abs(r * Math.sin(this.rotation + Math.asin(h/2/r))) * 2;
		
		if(rotatedHeight > this.maxHeight) {
			w *= this.maxHeight / rotatedHeight;
			h *= this.maxHeight / rotatedHeight;
		}
		
		r = Math.sqrt(Math.pow(w/2,2) + Math.pow(h/2,2));
		
		rotatedWidth = Math.abs(r * Math.cos(this.rotation + Math.acos(w/2/r))) * 2;
		rotatedHeight = Math.abs(r * Math.sin(this.rotation + Math.asin(h/2/r))) * 2;
		
		canvas.width = rotatedWidth;
		canvas.height = rotatedHeight;
		
		this.dialog.populate(null,[rotatedWidth,rotatedHeight]);
		
		ctx.save();
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		ctx.translate(canvas.width/2,canvas.height/2);
		
		ctx.rotate(this.rotation);
		
		ctx.translate(-canvas.width/2,-canvas.height/2);
		
		ctx.drawImage(image,image.width * crop[0],image.height * crop[1],image.width * (crop[2] - crop[0]),image.height * (crop[3] - crop[1]),0,0,canvas.width,canvas.height);
									
		ctx.restore();
	}

	rotateImage(radians){
		
		this.rotation += radians;
		
		this.renderImage();	

	}

	cropImage(){
		var crop = this.dialog.cropRegion();
		var canvas = this.canvas;
		var ctx = canvas.getContext("2d");
		var image = this.image;
		
		image.width *= (crop[2] - crop[0]);
		image.height *= (crop[3] - crop[1]);
		
		ctx.save();
		
		ctx.translate(canvas.width/2,canvas.height/2);
		
		ctx.clearRect(-canvas.width/2,-canvas.height/2, canvas.width, canvas.height);
		
		ctx.drawImage(image,image.width * crop[0],image.height * crop[1],image.width * (crop[2] - crop[0]),image.width * (crop[3] - crop[1]),-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
		
		ctx.restore();
	}

	save(){
		
		this.crop = this.dialog.cropRegion();
		
		this.renderImage();
		
		this.dialog.save(this.canvas.toDataURL("image/jpeg"), [this.canvas.width,this.canvas.height],{});
	}

}