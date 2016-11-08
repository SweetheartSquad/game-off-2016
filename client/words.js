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


processWeights(words.files.suits);
processWeights(words.files.points);