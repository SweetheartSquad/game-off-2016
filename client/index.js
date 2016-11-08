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

		resource.img.src = toLoad[1];
	}

	character_w=size.x/4;
	character_h=size.y/4;

	file_w=size.x/10;
	file_h=size.y/8;

	ability_w=size.y/8;
	ability_h=size.x/12;

	board_w=size.x/2;
	board_h=size.y/8*3;
}

function draw_character(character){
	ctx.drawImage(images.character.img, 0, 0, character_w, character_h);

	ctx.textAlign="left";
	ctx.textBaseline="inherit";
	ctx.fillStyle = "#000000";
	
	ctx.font = "bold "+DPI/4+"px Calibri";
	ctx.fillText(character.name, DPI/8, character_h/4);
	for(var i = 0; i < character.implants.length; ++i){
		ctx.fillText(character.implants[i], DPI/8, character_h/4*3+i*DPI/4);
	}
}

function draw_file(file){
	ctx.drawImage(images.file.img, 0, 0, file_w, file_h);

	ctx.textAlign="center";
	ctx.textBaseline="middle";
	ctx.fillStyle = "#000000";

	ctx.font = "bold "+DPI/2+"px Calibri";
	ctx.fillText(file.points, file_w/2, file_h/2);

	ctx.font = "bold "+DPI/8+"px Calibri";

	var a=suits[file.suit].split(" ");
	for(var i = 0; i < a.length; ++i){
		ctx.fillText(a[i], file_w/2, file_h/8*7+(i-a.length/2)*DPI/8);
	}
}

function draw_ability(ability){
	ctx.drawImage(images.ability.img, 0, 0, ability_w, ability_h);

	ctx.textAlign="left";
	ctx.textBaseline="middle";
	ctx.fillStyle = "#000000";

	ctx.font = "bold "+DPI/8+"px Calibri";

	var words=ability.description.split(" ");
	var w=0;
	var y=0;
	var lines=[""];
	while(words.length > 0){
		w+=ctx.measureText(" "+words[0]).width;
		if(w > ability_w/8*7){
			y+=1;
			w=ctx.measureText(" * "+words[0]).width;
			lines[y]=" * ";
		}
		lines[y]+=words[0]+" ";
		words.splice(0,1);
	}

	ctx.fillText("$ "+ability.category, DPI/8, ability_h/2+(-lines.length/2+0.5)*DPI/8);
	for(var i = 0; i < lines.length; ++i){
		ctx.fillText(lines[i], DPI/8, ability_h/2+(i-lines.length/2+1.5)*DPI/8);
	}
}



function main(){
	generateGame();
	drawGame();
	makePdf();
}


// procgen the varying elements of the game (TODO)
function generateGame(){
	// pick random suits
	suits=[];
	for(var i = 0; i < 3; ++i){
		suits.push(getUniqueWord(words.files.suits));
	}


	ability_categories=["virus","program"];

	// generate characters
	characters=[];
	for(var i = 0; i < 4; ++i){
		var character={
			name:"name",
			implants:[]
		};

		// implants
		// each character starts with a set "strength"
		// strength decreases as implants are added
		// better implants cost more strength
		// all strength must be used to keep characters balanced
		var strength=4;
		while(strength > 0){
			var implant=getWord(words.implants.description);

			// make sure the final implant isn't more powerful than allowed
			if(implant[1] > strength){
				continue;
			}
			// make sure the first implant is a good one (we don't want all 1-strength implants)
			if(strength==4 && implant[1]<=1){
				continue;
			}
			character.implants.push(getUniqueWord(words.implants.names));
			character.implants.push(expand(implant[0]));
			strength-=implant[1];
		}
		characters.push(character);
	}

	// generate files
	files=[];
	for(var i = 0; i < 20; ++i){
		var file={
			points:getWord(words.files.points),
			suit:Math.floor(Math.random()*3)
		};
		files.push(file);
	}

	// generate abilities
	abilities=[];
	for(var i = 0; i < 30; ++i){
		var ability={
			category: ability_categories[Math.round(Math.random())],
			description: "/* hacker(s) with most files: discard 3 files */"
		};
		abilities.push(ability);
	}
}

// draw the game elements to the canvas
function drawGame(){
	canvas.width=size.x;
	canvas.height=size.y;

	ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false; // nearest-neighbour vs. linear interpolation

	// characters
	var t=ctx.currentTransform;
	for(var i = 0; i < 4; ++i){
		draw_character(characters[i]);
		ctx.translate(character_w,0);
	}
	ctx.resetTransform();
	
	// files
	ctx.translate(0,character_h);
	var file=0;
	for(var y = 0; y < 2; ++y){
		for(var x = 0; x < 10; ++x){
			draw_file(files[file++]);
			ctx.translate(file_w,0);
		}
		ctx.translate(-size.x,file_h);
	}
	ctx.resetTransform();
	
	// abilities
	ctx.translate(size.x,size.y/2);
	ctx.rotate(Math.PI/2);
	var ability=0;
	for(var y = 0; y < 12; ++y){
		for(var x = 0; x < 4; ++x){
			if(x <= 0 || y >= 6){
				draw_ability(abilities[ability++]);
			}
			ctx.translate(ability_w,0);
		}
		ctx.translate(-size.y/2,ability_h);
	}
	ctx.resetTransform();

	// board
	ctx.translate(size.x/2,size.y/8*5);
	ctx.drawImage(images.board.img, 0, 0, board_w, board_h);
	ctx.resetTransform();
}

// canvas -> PDF process
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


// returns a random element in an array
function getWord(a){
	return a[Math.floor(Math.random()*a.length)];
}

// returns a random element in an array, and also removes that element and any copies of it from the array
function getUniqueWord(a){
	if(a.length <= 0){
		throw "No words remaining.";
	}
	var word=a[Math.floor(Math.random()*a.length)];
	for(var i = a.length; i >= 0; --i){
		if(a[i] == word){
			a.splice(i,1);
		}
	}
	return word;
}

function expand(str){
	return str.replace("{suits}",getWord(suits)); // this will probably need to be recursive regex instead of just a single replace on suits but fine for now
}


init();