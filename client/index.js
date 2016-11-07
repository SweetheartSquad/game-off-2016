var size={
	x:612,
	y:792
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
	canvas = document.getElementById("canvas");

	load=[
		["icon","assets/icon.png"],
		["test","assets/img/test.png"]
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

	// draw cloud
	ctx.beginPath();
	ctx.moveTo(170, 80);
	ctx.rect(0,0,100,50);
	ctx.closePath();
	ctx.lineWidth = 5;
	ctx.fillStyle = '#FF0000';
	ctx.fill();
	ctx.strokeStyle = '#0000FF';
	ctx.stroke();

	ctx.drawImage(images.icon.img, 50,50);
	ctx.drawImage(images.test.img, 150,50);
}

function main(){
	drawGame();
	makePdf();
}


function makePdf(){

	// convert canvas to image
	var dataURL = canvas.toDataURL('image/png');

	// update IMG preview in web page
	document.getElementById("img-preview").setAttribute("src", dataURL);


	// copy image to PDF
	var doc = new jsPDF({
		orientation: 'landscape',
		unit: 'px',
		format: [size.x, size.y]
	});
	doc.addImage(dataURL, "PNG", 0, 0);
	doc.setDisplayMode("fullpage", "twoleft", "UseThumbs");
	doc.addPage();
	
	// update PDF preview in web page
	var blobUri = doc.output('bloburi');
	document.getElementById("pdf-preview").setAttribute("src", blobUri);
	
	// download PDF
	doc.save('test.pdf');
}




init();