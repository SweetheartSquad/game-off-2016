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
		base:[
			[1, ["program", "{abilities.positive}"]],
			[1, ["virus", "{abilities.negative}"]]
		],
		positive:[
			[1, "{abilities.group} draw {abilities.amountSmall} files"],
			[3, "move {abilities.group} up to {abilities.amountLarge} spaces"]
		],
		negative:[
			[1, "{abilities.group} discard {abilities.amountSmall} files"],
			[1, "{abilities.group} discard highest file"],
			[1, "{abilities.group} discard lowest file"],
			[2, "steal {abilities.amountSmall} files from target player"],
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
		amountLarge:[
			[2, "2"],
			[3, "3"],
			[1, "4"]
		]
	},

	implants:{
		names:[
			[1, "neo-keyboard"],
			[1, "superphone"],
			[1, "datalyzer"],
			[1, "compubucket"],
			[1, "datachip"],
			[1, "chipdata"],
			[1, "chipchip"],
			[1, "neuromouse"],
			[1, "neurotrackpad"],
			[1, "neuronib"],
			[1, "doodad"],
			[1, "thingamabob"],
			[1, "wifi module"],
			[1, "internet access"],
			[1, "watched the matrix"]
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
			[1, "{characters.prefix}{Ucharacters.names}{characters.suffix}"],
			[1, "{characters.prefix}{characters.prefix}{Ucharacters.names}{characters.suffix}"],
			[1, "{characters.prefix}{Ucharacters.names}{characters.suffix}{characters.suffix}"],
			[1, "{characters.prefix}{characters.suffix}"]
		],
		prefix:[
			[1, "hack"],
			[1, "hacks"],
			[1, "hacker"],
			[1, "neo"],
			[1, "tech"],
			[1, "techno"],
			[1, "uber"],
			[1, "mega"],
			[1, "leet"]
		],
		names:[
			[1, "person"],
			[1, "man"],
			[1, "woman"],
			[1, "smith"]
		],
		suffix:[
			[1, "hack"],
			[1, "hacks"],
			[1, "hacker"],
			[1, "neo"],
			[1, "tech"],
			[1, "techno"],
			[1, "uber"],
			[1, "mega"],
			[1, "leet"]
		],
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
processWeights(words.implants.description);

processWeights(words.abilities.base);
processWeights(words.abilities.positive);
processWeights(words.abilities.negative);
processWeights(words.abilities.amountSmall);
processWeights(words.abilities.amountLarge);
processWeights(words.abilities.group);

processWeights(words.characters.base);
processWeights(words.characters.prefix);
processWeights(words.characters.names);
processWeights(words.characters.suffix);