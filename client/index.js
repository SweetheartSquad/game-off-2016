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

	load=[
		["icon","assets/icon.png"],
		["character","assets/img/character.png"],
		["file","assets/img/file.png"],
		["ability","assets/img/ability.png"],
		["board","assets/img/board.png"]
	];

	num_portraits=30;
	words.portraits=[];
	for(var i = 1; i <= num_portraits; ++i){
		words.portraits.push(i);
		load.push(["portrait_"+i.toString(10),"assets/img/portrait_"+i.toString(10)+".png"]);
	}
	
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

	// draw character portrait
	var portrait_x=54;
	var portrait_y=105;
	var portrait_w=530;
	var portrait_h=307;

	var rh=character_h/828;
	var rw=character_w/640;

	var tw=(Math.random()*0.95+0.05)*DPI;
	var th=(Math.random()*0.95+0.05)*DPI;

	var corruptChance=Math.random()*0.25;
	var corrupt=function(){
		return (Math.random()-Math.random())*num_portraits;
	};
	var distort=function(){
		return Math.random()*10-Math.random()*10;
	};
	var breakup=function(){
		return Math.random()<0.25 ? Math.random()*10-Math.random()*10 : 0;
	};

	ctx.fillStyle="#000000";
	ctx.fillRect(portrait_x*rw,portrait_y*rh, portrait_w*rw, portrait_h*rh);
	for(var x=0; x < portrait_w+tw; x+=tw){
		for(var y=0; y < portrait_h+th; y+=th){
			var w=Math.max(tw/2, Math.min(tw, portrait_w-(x+tw)));
			var h=Math.max(th/2, Math.min(th, portrait_h-(y+th)));
			var portrait_corrupt=character.portrait;
			if(Math.random() < corruptChance){
				portrait_corrupt=Math.ceil(Math.min(Math.max(1, portrait_corrupt+corrupt()), num_portraits-4).toString(10));
			}

			var sx=Math.min(portrait_w, Math.max(0,x+distort()));
			var sy=Math.min(portrait_h, Math.max(0,y+distort()));
			var sw=Math.min(portrait_w, Math.max(1,w+distort()));
			var sh=Math.min(portrait_h, Math.max(1,h+distort()));
			var dx=Math.min(portrait_w, Math.max(0,rw*(portrait_x+x+breakup())));
			var dy=Math.min(portrait_h, Math.max(0,rh*(portrait_y+y+breakup())));
			var dw=Math.min(portrait_w, Math.max(1,rw*w));
			var dh=Math.min(portrait_h, Math.max(1,rh*h));
			ctx.drawImage(images["portrait_"+portrait_corrupt].img, sx, sy, sw, sh, dx, dy, dw, dh);
		}		
	}

	// draw character card frame
	ctx.drawImage(images.character.img, 0, 0, character_w, character_h);

	ctx.font = "bold "+DPI/10+"px BerkeliumIIHGR";
	ctx.textAlign="left";
	ctx.textBaseline="inherit";

	// name bg
	ctx.fillStyle="#000000";
	ctx.fillRect(portrait_x*rw,portrait_y*rh, Math.min(ctx.measureText(character.name).width+DPI/8, portrait_w*rw), DPI/6);

	// name
	ctx.fillStyle="#FFFFFF";
	ctx.fillText(character.name, DPI/4, character_h/6);


	// implants
	ctx.font = ""+DPI/10+"px BerkeliumIIHGR";
	ctx.fillStyle="#000000";
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

	ctx.font = DPI/10+"px BerkeliumIIHGR";

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

	ctx.fillText("$$PROGRAM", DPI/16, ability_h/2+(-lines.length/2+0.5)*DPI/11);
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
	ctx.fillText("SERVER", board_w/2, board_h/2);

	ctx.fillText("1", board_w*0.105, board_h*0.1075);
	ctx.fillText("2", board_w-board_w*0.105, board_h*0.1075);
	ctx.fillText("3", board_w*0.105, board_h-board_h*0.1075);
	ctx.fillText("4", board_w-board_w*0.105, board_h-board_h*0.1075);
}



function main(){
	try{
		generateGame();
		drawGame();

		setTimeout(function(){

			msgDiv.innerHTML="Generated, converting to PNG...";
			document.getElementById("btnRefresh").disabled=false;
			setTimeout(function(){
				makePng();
				document.getElementById("btnPng").disabled=false;
				msgDiv.innerHTML="Generated, converting to PDF...";
				setTimeout(function(){
					try{
						makePdf();
						document.getElementById("btnPdf").disabled=false;
						msgDiv.innerHTML="Done!";
					}catch(e){
						msgDiv.innerHTML="Sorry, PDF conversion failed! You'll have to use the PNG to play.";
					}
				},100);
			},100);
		},100);
	}catch(exception){
		msgDiv.innerHTML="Sorry, generation failed! You'll have to try with a different browser.";
		console.log(exception);	
	}
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
			portrait:getUniqueWord(words.portraits),
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
			character.implants.push(expand(getWord(words.implants.names)));
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

function printWindow(w){
	var done=function(){
		w.close();
	};

	w.document.close();
	w.focus();
	w.onafterprint=done;
	w.addEventListener("message",function(event){
		console.log(event.origin, window.location.href);
		console.log(event.source);
		console.log(window);
		console.log(event.data);
		if(window.location.href.indexOf(event.origin || event.originalEvent.origin) === 0
			&& event.source === window
			&& event.data == "print"){
			setTimeout(function(){
				try{
					w.print();
				}catch(exception){
					console.log("print popup not displayed; "+exception.toString());
				}
			},100);
		}
	});
	w.postMessage("print",window.location.href);
}

function printRules(){
	// snippet adapted from http://stackoverflow.com/a/2255438
	var mywindow = window.open('', '_blank', 'height=400,width=600');
    mywindow.document.write('<html><head><title>' + document.title  + ' - rules</title>');
    mywindow.document.write('<link rel="stylesheet" type="text/css" href="assets/style.css"/>');
    mywindow.document.write('</head><body>')
    mywindow.document.write(document.getElementById("description").innerHTML);
    mywindow.document.write(document.getElementById("rules").innerHTML);
    mywindow.document.write('</body></html>');

    printWindow(mywindow);
}

function printPng(){
	var mywindow=window.open('','_blank','width='+size.x+',height='+size.y);
    mywindow.document.write('<html><head><title>' + document.title  + ' - gameset</title>');
    mywindow.document.write('</head><body>')
	mywindow.document.write('<img src="'+dataURL+'"" width="'+size.x+'" height="'+size.y+'"/>');
    mywindow.document.write('</body></html>');
	printWindow(mywindow);
}
function printPdf(){
	try{
		var b=pdfDocument.output("blob");
		var w;
		if(window.navigator && window.navigator.msSaveOrOpenBlob){
			// IE/Edge deny access for printing from the window like Chrome/Firefox, so use their blob save instead
			w=window.navigator.msSaveOrOpenBlob(b);
		}else{
    		printWindow(window.open(URL.createObjectURL(b),"_blank"));
		}
	}catch(e){
		alert("Sorry! Something went wrong. jsPDF probably doesn't work with your browser, you'll have to print the PNG version if you want to play.\n\nError message:\n"+e.toString());
	}
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