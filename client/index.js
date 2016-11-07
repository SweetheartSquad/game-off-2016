var DPI=150;
var size={
	x:8.5*DPI,
	y:11*DPI
};


images={
	loading:0,
	loaded:0,
	onImageLoaded: function(){
		if(++this.loaded == this.loading){
			main();
		}
	}
};
function init(){
	// polyfill for resetTransform (not supported in IE)
	CanvasRenderingContext2D.prototype.resetTransform=CanvasRenderingContext2D.resetTransform || function(){
		this.setTransform(1, 0, 0, 1, 0, 0);
	}


	canvas = document.getElementById("canvas");
	previewImg = document.getElementById("img-preview");
	previewPdf = document.getElementById("pdf-preview");

	load=[
		["icon","assets/icon.png"],
		["character","assets/img/character.png"],
		["file","assets/img/file.png"],
		["ability","assets/img/ability.png"],
		["board","assets/img/board.png"]
	];
	
	images.loading = load.length;
	for(var i = 0; i < load.length; ++i){
		var toLoad=load[i];
		var resource={
			img:new Image()
		};
		images[toLoad[0]] = resource;
		resource.img.setAttribute('crossOrigin', 'anonymous');
		resource.img.addEventListener("load", images.onImageLoaded.bind(images), false);

		resource.img.src=toLoad[1];
	}
}

function drawGame(){
	canvas.width=size.x;
	canvas.height=size.y;

	var ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false; // nearest-neighbour vs. linear interpolation

	// characters
	var t=ctx.currentTransform;
	for(var i = 0; i < 4; ++i){
		ctx.drawImage(images.character.img, 0, 0, size.x/4, size.y/4);
		ctx.translate(size.x/4,0);
	}
	ctx.resetTransform();
	
	// files
	ctx.translate(0,size.y/4);
	for(var y = 0; y < 2; ++y){
		for(var x = 0; x < 10; ++x){
			ctx.drawImage(images.file.img, 0, 0, size.x/10, size.y/8);
			ctx.translate(size.x/10,0);
		}
		ctx.translate(-size.x,size.y/8);
	}
	ctx.resetTransform();
	
	// abilities
	ctx.translate(size.x,size.y/2);
	ctx.rotate(Math.PI/2);
	for(var y = 0; y < 12; ++y){
		for(var x = 0; x < 4; ++x){
			if(x <= 0 || y >= 6){
				ctx.drawImage(images.ability.img, 0, 0, size.y/8, size.x/12);
			}
			ctx.translate(size.y/8,0);
		}
		ctx.translate(-size.y/2,size.x/12);
	}
	ctx.resetTransform();

	// board
	ctx.translate(size.x/2,size.y/8*5);
	ctx.drawImage(images.board.img, 0, 0, size.x/2, size.y/8*3);
	ctx.resetTransform();
}

function main(){
	drawGame();
	makePdf();
}


function makePdf(){

	// convert canvas to image
	var dataURL = canvas.toDataURL('image/png');

	// update IMG preview in web page
	previewImg.setAttribute("src", dataURL);


	// copy image to PDF
	var doc = new jsPDF('portrait','in','letter');
	doc.addImage(dataURL, "PNG", 0, 0, 8.5, 11);
	
	// update PDF preview in web page
	var blobUri = doc.output('bloburi');
	previewPdf.setAttribute("src", blobUri);
	
	// download PDF
	//doc.save('test.pdf');
}




init();