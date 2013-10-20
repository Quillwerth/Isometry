//Isometry -- Graph Theory Project
//    input.js >> if it's user input, it goes in here.
var dragStartX;
var dragStartY;
var draggedVert=null;

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

(function(){

	var InputService = (function() {
		//dragBegin: OnClick, stores the XY coordinates of the mouse.

		var ctrlDown = false;

		var currentKey = -1;

		function mouseDownOnVertex(svg, vert){
			if(ctrlDown){
				if(d3.select(vert).classed("selectedVertex")){
					//vertex is already selected, deselect
					deselectVertex(svg, vert);
				}
				else{
					selectVertex(svg, vert);
				}
			}else{
				dragBegin(svg, vert);
			}
		}

		function mouseClickOnVertex(svg, vert){
			if(ctrlDown){
				if(d3.select(vert).classed("selectedVertex")){
					//vertex is already selected, deselect
					deselectVertex(svg, vert);
				}
				else{
					selectVertex(svg, vert);
				}
			}
		}

		function keyDown(e){
			// console.log("d3 keydown: "+e.keyCode);
			if(e.keyCode === 17){
				ctrlDown = true;
				// console.log("ctrlDown is true");
			}
			if(currentKey === -1){
				currentKey = e.keyCode;
			}
		}

		function keyUp(e){
			// console.log("d3 keyup: "+e.keyCode);
			if(e.keyCode === 17){
				ctrlDown = false;
				// console.log("ctrlDown is false");
			}
			currentKey = -1;
		}

		//Return true on "redraw necessary"
		function mouseUpOnSVG(svg, vert){
			return dragVertex(svg);
		}


		////// DRAG FUNCTIONS
		function dragBegin(svg, vert){
			var pos = d3.mouse(svg);
			dragStartX = pos[0];
			dragStartY = pos[1];
			draggedVert = vert;
			console.log(draggedVert);
		}

		function dragVertex(svg){
			//Calculate the displacement from where the vertex would be if there were no translate()
			//You're replacing the translate anyway, so don't worry about it.
			if (draggedVert===null){return false;}
			var vertName = d3.select(draggedVert).attr("id").substring(1);//Assumes id is form v[ACTUAL NAME]

			var pos = d3.mouse(svg);
			var curPos = new Array();
			curPos[0] = d3.select(draggedVert).select("circle").attr("cx");
			curPos[1] = d3.select(draggedVert).select("circle").attr("cy");
			var newPos = new Array();
			newPos.push(pos[0]-curPos[0]);
			newPos.push(pos[1]-curPos[1]);
			d3.select(draggedVert).attr("transform", "translate("+parseInt(newPos[0])+","+parseInt(newPos[1])+")");
			//Let all the relevant edges know the vertex has shifted
			console.log("size of edge array for vertex: "+d3.selectAll(".e"+vertName).length);
			console.log(d3.selectAll(".e"+vertName));
			d3.selectAll(".e"+vertName).each(function(d){d.vertexShift();});
			draggedVert = null;
			return true;
		}
		////// END DRAG FUNCTIONS

		////// SELECT VERTEX FUNCTIONS
		function selectVertex(svg, vert){
			d3.select(vert).classed("selectedVertex", true);
			d3.select(vert).classed("selectedVertex", true);
		}
		function deselectVertex(svg, vert){
			d3.select(vert).classed("selectedVertex", false);
		}




		//PUBLIC

		return{
			mouseDownOnVertex : mouseDownOnVertex,
			mouseUpOnSVG : mouseUpOnSVG,
			mouseClickOnVertex : mouseClickOnVertex,
			keyUp : keyUp,
			keyDown : keyDown
		};

	})();

	window.InputService = InputService;
	console.log("InputService initialized.");
})();




// function calculateCurrentTranslation(){
// 	var transLine = d3.select("#v"+vertName).attr("transform");
// 	var translateRegExp = /translate\(-?\d+,-?\d+\)/ig;
// 	var translation = [0, 0];
// 	if(translateRegExp.test(transLine)){
// 		//console.log("translation detected!");
// 		var transStatement = transLine.match(translateRegExp);
// 		//console.log(transStatement);
// 		var numbersRegExp = /-?\d+/g;
// 		var numbers = transStatement[0].match(numbersRegExp);
// 		translation[0] = numbers[0];
// 		translation[1] = numbers[1];
// 	}
// 	return translation;
// }