//Isometry -- Graph Theory Project
//    input.js >> if it's user input, it goes in here.


function parseGraphInput(text){
	//Graph input notation: <NAME>:(<TO>, W),...,(<TO>,W) <-- zero or more
	// NAME: Vertex Name, (<TO>,W): Edge, with TO is the destination, W is the weight of the edge
	var regex = /\w+\s*:?\s*(\(\s*\w+\s*,\s*\d+\s*\)[,; ]*)*/g
	text = text.trim();
	var tokens = text.match(regex);//Individual adjacency list entries
	var parsedGraph = new Array();
	
	var nameRegex = /\w+(?=\s*:?)/;//Matches the name portion of adjacency list entries
	var edgeRegex = /\(\s*\w+\s*,\s*\d+\s*\)/g;//Matches all the edges
	var edgeNameRegex = /\w+(?=\s*,)/;//Matches the name of an edge
	var weightRegex = /\d+(?=\s*\))/;//Matches the weight of an edge
	for(i=0;i<tokens.length;i++){
		var adj = tokens[i];
		var name = adj.match(nameRegex)[0];
		var vert = new Vertex(name);//RESPECT THE ABSTRACTION BARRIER
		var adjEdges = adj.match(edgeRegex);
		if(adjEdges!==null){
			for(j=0;j<adjEdges.length;j++){
				var to = adjEdges[j].match(edgeNameRegex)[0];
				var we = adjEdges[j].match(weightRegex)[0];
				vert.edges.push(new Edge(name, to, we));		
			}
		}
		parsedGraph.push(vert);		
	}
	return parsedGraph;
}