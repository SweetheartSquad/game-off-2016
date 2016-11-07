var size={
	x:612,
	y:792
};


var canvas = document.getElementById("canvas");
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

makePdf();




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