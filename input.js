//Isometry -- Graph Theory Project
//    input.js >> if it's user input, it goes in here.


function parseGraphInput(text){
	//Graph input notation: <NAME>:(<TO>, W),...,(<TO>,W) <-- zero or more
	// NAME: Vertex Name, (<TO>,W): Edge, with TO is the destination, W is the weight of the edge
	var regex = /\w+:?(\(\w+,\d+\),?)*/g;
}