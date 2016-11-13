words={
	files:{
		suits:[
			"{Ufiles.affiliates}\n{Ufiles.filetypes}"
		],


		filetypes:[
			[1, "file"],
			[1, "image"],
			[1, "video"],
			[1, "briefing"],
			[1, "document"],
			[1, "plan"],
			[1, "order"],
			[1, "email"]
		],
		affiliates:[
			[1, "corporate"],
			[1, "weapon"],
			[1, "internal"],
			[1, "payroll"],
			[1, "budget"],
			[1, "black ops."],
			[1, "private"],
			[1, "surveillance"],
			[1, "project"],
			[1, "encrypted"],
			[1, "personnel"],
			[1, "top-secret"],
			[1, "restricted"],
			[1, "classified"],
			[1, "meteorology"]
		],

		points:[
			[1,"0"],
			[3,"1"],
			[3,"2"],
			[2,"3"]
		]
	},

	abilities:{
		description:[
			[3, "{abilities.group} draw 1 file"],
			[1, "{abilities.group} draw {abilities.amountMid} files"],
			[10, "move {abilities.group} up to {abilities.amountLarge} spaces"],
			[3, "{abilities.group} discard 1 file"],
			[1, "{abilities.group} discard {abilities.amountMid} files"],
			[1, "{abilities.group} discard highest file"],
			[1, "{abilities.group} discard lowest file"],
			[1, "everyone discard {abilities.amountMid} {suits}s"],
			[3, "steal 1 file from target player"],
			[1, "steal {abilities.amountSmall} files from target player"],
			[1, "destroy {abilities.amountSmall} of target player's files"]
		],
		group:[
			[5, "target player"],
			[1, "2 target players"],
			[1, "3 target players"],
			[1, "everyone"],
			[1, "player(s) with the most files"],
			[1, "player(s) with the least files"],
			[1, "player(s) with the most {suits}s"],
			[1, "player(s) with the least {suits}s"],
			[1, "everyone with {suits}s"],
			[1, "everyone without {suits}s"],
			[1, "everyone on the node"],
			[1, "everyone not on the node"]
		],


		amountSmall:[
			[3, "1"],
			[2, "2"],
			[1, "3"]
		],
		amountMid:[
			[2, "2"],
			[1, "3"]
		],
		amountLarge:[
			[2, "2"],
			[3, "3"],
			[1, "4"]
		]
	},

	implants:{
		names:[
			[1, "{Uimplants.prefix}{Uimplants.suffix}"]
		],
		prefix: [
			[1, "utility "],
			[1, "techno-"],
			[1, "neo-"],
			[1, "voice-activated "],
			[1, "overclocked "],
			[1, "high-energy "],
			[1, "radioactive "],
			[1, "killer "],
			[1, "secret "],
			[1, "illegal "],
			[1, "weapons-grade "],
			[1, "neutron "],
			[1, "supercharged "],
			[1, "heavy "],
			[1, "light "],
			[1, "midrange "]
		],
		suffix: [
			[1, "neo-keyboard"],
			[1, "superphone"],
			[1, "datalyzer"],
			[1, "compubucket"],
			[1, "datachip"],
			[1, "chipdata"],
			[1, "chipchip"],
			[1, "neuromouse"],
			[1, "neuronib"],
			[1, "doodad"],
			[1, "thingamabob"],
			[1, "module"],
			[1, "bot"],
			[1, "script"]
		],
		description:[
			[1, ["{suits}s are worth double", 4]],
			[1, ["{suits}s are worth +1", 3]],
			[1, ["{suits}s are worth +2", 4]],
			[1, ["unused abilities are worth +1", 1]],
			[1, ["unused abilities are worth +2", 2]],
			[1, ["+1 if you have at least 1 {suits}", 1]],
			[1, ["+2 if you have at least 1 {suits}", 2]],
			[1, ["+3 if you have at least 1 {suits}", 3]],
			[1, ["+1 if you don't have any {suits}s", 1]],
			[1, ["+2 if you don't have any {suits}s", 2]],
			[1, ["+3 if you don't have any {suits}s", 3]]
		]
	},

	characters:{
		base:[
			[1, "{characters.prefix}{characters.suffix}"],
			[1, "{characters.suffix}Of{characters.prefix}"],
			[1, "{characters.prefix}{characters.prefix}{characters.suffix}"],
			[1, "{characters.suffix}{characters.suffix}"],
			[1, "{characters.prefix}{characters.prefix}"],
			[1, "{characters.prefix}{characters.suffix}{characters.suffix}"]

		],
		prefix: [
			[1, "Ego"],
			[1, "Katana"],
			[1, "Sword"],
			[1, "Video"],
			[1, "Game"],
			[1, "Life"],
			[1, "Death"],
			[1, "Skull"],
			[1, "Shadow"],
			[1, "Tech"],
			[1, "Net"],
			[1, "Mega"],
			[1, "Neo"],
			[1, "Matrix"],
			[1, "Download"],
			[1, "Torrent"],
			[1, "Code"],
			[1, "Masked"],
			[1, "Unknown"],
			[1, "Secret"],
			[1, "Anon"]
		],
		suffix: [
			[1, "Hacker"],
			[1, "Killer"],
			[1, "Destroyer"],
			[1, "Wrangler"],
			[1, "Splicer"],
			[1, "Autocrat"],
			[1, "Baron"],
			[1, "King"],
			[1, "Queen"],
			[1, "Burglar"],
			[1, "Hero"],
			[1, "Rogue"],
			[1, "Soldier"],
			[1, "Warrior"],
			[1, "Mage"],
			[1, "Whiz"],
			[1, "Agent"],
			[1, "Man"],
			[1, "Woman"],
			[1, "Being"],
			[1, "Cyborg"],
			[1, "God"],
			[1, "Saint"]
		]

	}
};

function processWeights(a){
	var original=a.slice();
	a.splice(0,a.length);
	for(var i = 0; i < original.length; ++i){
		while(original[i][0]-- > 0){
			a.push(original[i][1]);
		}
	}
};

// probably a better way to do this but oh well
processWeights(words.files.filetypes);
processWeights(words.files.affiliates);
processWeights(words.files.points);

processWeights(words.implants.names);
processWeights(words.implants.prefix);
processWeights(words.implants.suffix);
processWeights(words.implants.description);

processWeights(words.abilities.description);
processWeights(words.abilities.amountSmall);
processWeights(words.abilities.amountMid);
processWeights(words.abilities.amountLarge);
processWeights(words.abilities.group);

processWeights(words.characters.base);
processWeights(words.characters.prefix);
processWeights(words.characters.suffix);