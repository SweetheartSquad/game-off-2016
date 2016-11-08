words={
	files:{
		suits:[
			[1, "classified"],
			[1, "restricted"],
			[1, "top-secret"],
			[1, "personnel"],
			[1, "foreign intel"],
			[1, "project plans"],
			[1, "surveillance"],
			[1, "encrypted"],
			[1, "satellite imagery"],
			[1, "evidence"],
			[1, "private sector"],
			[1, "meteorology"],
			[1, "internal documents"],
			[1, "redacted info"],
			[1, "black ops."],
			[1, "budget"],
			[1, "payroll"],
			[1, "emails"],
			[1, "weapons orders"],
			[1, "corporate"]
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
processWeights(words.files.suits);
processWeights(words.files.points);

processWeights(words.implants.names);
processWeights(words.implants.description);