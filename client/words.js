words={
	files:{
		suits:[
			"{Ufiles.affiliates}\n{Ufiles.filetypes}"
		],


		filetypes:[
			[1, "files"],
			[1, "images"],
			[1, "video"],
			[1, "info"],
			[1, "documents"],
			[1, "plans"],
			[1, "intel"],
			[1, "orders"],
			[1, "emails"]
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
			[1, ["all {suits} worth double", 4]],
			[1, ["all {suits} worth +1", 3]],
			[1, ["all {suits} worth +2", 4]],
			[1, ["unused abilities are worth +1", 1]],
			[1, ["unused abilities are worth +2", 2]],
			[1, ["+1 if you have at least 1 {suits}", 1]],
			[1, ["+2 if you have at least 1 {suits}", 2]],
			[1, ["+3 if you have at least 1 {suits}", 3]],
			[1, ["+1 if you don't have any {suits}", 1]],
			[1, ["+2 if you don't have any {suits}", 2]],
			[1, ["+3 if you don't have any {suits}", 3]]
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

processWeights(words.characters.base);
processWeights(words.characters.prefix);
processWeights(words.characters.names);
processWeights(words.characters.suffix);