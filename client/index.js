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
	msgDiv=document.createElement("dd");
	msgDiv.style="font-family: BerkeliumIIHGR;";
	msgDiv.innerHTML="Generating...";
	document.getElementById("status").appendChild(msgDiv);

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

	character_w=size.x/4;
	character_h=size.y/4;

	file_w=size.x/10;
	file_h=size.y/8;

	ability_w=size.y/8;
	ability_h=size.x/12;

	board_w=size.x/2;
	board_h=size.y/8*3;

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
}

function draw_character(character){
	ctx.drawImage(images.character.img, 0, 0, character_w, character_h);

	ctx.textAlign="left";
	ctx.textBaseline="inherit";
	ctx.fillStyle = "#000000";
	
	ctx.font = "bold "+DPI/10+"px BerkeliumIIHGR";
	ctx.fillText(character.name, DPI/4, character_h/6);

	var a=[];
	for(var i = 0; i < character.implants.length; ++i){

		if(i%2==0){
			a.push(character.implants[i].toUpperCase());
		}else{
			var words=character.implants[i].split(" ");
			var w=0;
			var y=0;
			var line="";
			while(words.length > 0){
				w+=ctx.measureText(" "+words[0]).width;
				if(w > character_w-DPI/5*2){
					y+=1;
					w=ctx.measureText(words[0]).width;
					a.push(line);
					line="";
				}
				line+=words[0]+" ";
				words.splice(0,1);
			}
			if(line.length > 1){
				a.push(line);
			}
			a.push("");
		}
	}
	for(var i = 0; i < a.length; ++i){
		ctx.fillText(a[i], DPI/5, character_h/2+(i+1)*DPI/11);
	}
}

function draw_file(file){
	ctx.drawImage(images.file.img, 0, 0, file_w, file_h);

	ctx.textAlign="center";
	ctx.textBaseline="middle";
	ctx.fillStyle = "#000000";

	ctx.font = "bold "+DPI/2+"px BerkeliumIIHGR";
	ctx.fillText(file.points, file_w/2, file_h/2);

	ctx.font = "bold "+DPI/10+"px BerkeliumIIHGR";

	var a=words.suits[file.suit].split("\n");
	for(var i = 0; i < a.length; ++i){
		ctx.fillText(a[i], file_w/2, file_h/5*4+(i-a.length/2)*DPI/11);
	}
}

function draw_ability(ability){
	ctx.drawImage(images.ability.img, 0, 0, ability_w, ability_h);

	ctx.textAlign="left";
	ctx.textBaseline="middle";
	ctx.fillStyle = "#000000";

	ctx.font = "bold "+DPI/10+"px BerkeliumIIHGR";

	var words=ability.description.split(" ");
	var y=0;
	var lines=["//"];
	var w=ctx.measureText(lines[0]).width;
	while(words.length > 0){
		w+=ctx.measureText(" "+words[0]).width;
		if(w > ability_w-DPI/16){
			y+=1;
			w=ctx.measureText("//"+words[0]).width;
			lines[y]="//";
		}
		lines[y]+=words[0]+" ";
		words.splice(0,1);
	}

	ctx.fillText("$$ABILITY", DPI/16, ability_h/2+(-lines.length/2+0.5)*DPI/11);
	for(var i = 0; i < lines.length; ++i){
		ctx.fillText(lines[i], DPI/16, ability_h/2+(i-lines.length/2+1.5)*DPI/11);
	}
}

function draw_board(){
	ctx.drawImage(images.board.img, 0, 0, board_w, board_h);

	ctx.textAlign="center";
	ctx.textBaseline="middle";
	ctx.fillStyle = "#000000";

	ctx.font = "bold "+DPI/8+"px BerkeliumIIHGR";
	ctx.fillText("NODE V1.0", board_w/2, board_h/2);

	ctx.fillText("1", board_w*0.105, board_h*0.1075);
	ctx.fillText("2", board_w-board_w*0.105, board_h*0.1075);
	ctx.fillText("3", board_w*0.105, board_h-board_h*0.1075);
	ctx.fillText("4", board_w-board_w*0.105, board_h-board_h*0.1075);
}



function main(){
	generateGame();
	drawGame();
	msgDiv.innerHTML="Done!";
}


// procgen the varying elements of the game (TODO)
function generateGame(){
	// pick random suits
	words.suits=[];
	for(var i = 0; i < 3; ++i){
		words.suits.push(expand(getWord(words.files.suits)));
	}

	// generate characters
	characters=[];
	for(var i = 0; i < 4; ++i){
		var character={
			name:expand(getWord(words.characters.base)),
			implants:[]
		};

		// process character name
		if(Math.random() < 0.25){
			// leet
			var replaces=[
				["e","3"],
				["l","1"],
				["t","7"],
				["s","5"],
				["a","4"],
				["b","6"]
			];
			var n=Math.random()*replaces.length;
			while(--n >= 0){
				var r=getUniqueWord(replaces);
				character.name=character.name.replace(new RegExp(r[0],"gi"),r[1]);
			}
		}if(Math.random() < 0.25){
			// just make it a pain to read
			var s=character.name;
			character.name="";
			for(var j=0; j < s.length; ++j){
				character.name += (j%2==0) ? s[j].toUpperCase() : s[j].toLowerCase();
			}
		}if(Math.random() < 0.25){
			// not the first
			var separator=[".","-","_","~","\\","\/","|"," "];
			character.name += getWord(separator)+Math.floor(Math.random()*9999).toString(10);
		}if(Math.random() < 0.25){
			// gamertag
			var s="";
			do{
				s+=Math.random() < 0.5 ? "X" : "x";
			}while(Math.random() < Math.max(0,1/s.length-0.1));
			character.name=s+character.name+s.split("").reverse().join("");
		}
		while(character.name.length > 20){
			// remove characters at random while over the limit
			character.name=character.name.replace(character.name[Math.floor(Math.random()*character.name.length)],"");
		}

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
			description: expand(getWord(words.abilities.description))
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
	draw_board();
	ctx.resetTransform();
}

// canvas -> PDF process
function makePng(){
	// convert canvas to image
	dataURL = canvas.toDataURL('image/png');

	// update IMG preview in web page
	previewImg.setAttribute("src", dataURL);
}

function makePdf(){
	// copy image to PDF
	pdfDocument = new jsPDF('portrait','in','letter');
	pdfDocument.addImage(dataURL, "PNG", 0, 0, 8.5, 11);
}



function printRules(){
	// snippet adapted from http://stackoverflow.com/a/2255438
	var mywindow = window.open('', 'PRINT', 'height=400,width=600');
    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('<link rel="stylesheet" type="text/css" href="assets/style.css"/>');
    mywindow.document.write('</head><body>')
    mywindow.document.write(document.getElementById("rules").innerHTML);
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    setTimeout(function(){
	    mywindow.print();
	    mywindow.close();
    }, 100);
}

function printPng(){
	makePng();
	window.open(dataURL,'Image','width='+size.x+',height='+size.y+',resizable=1');
}
function printPdf(){
	makePng();
	makePdf();
    	window.open(URL.createObjectURL(pdfDocument.output("blob")));
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
	var r=new RegExp("\{(.*?)\}", "g");
	return str.replace(r, function(a,b){
		var unique=false;
		if(b.substr(0,1) == "U"){
			unique=true;
			b=b.substr(1);
		}
		var s=b.split(".");
		var w=words;
		while(s.length > 0){
			w=w[s.shift()];
		}
		return expand((unique ? getUniqueWord : getWord)(w)); // may need to be recursive
	});
}


window.onload=init;