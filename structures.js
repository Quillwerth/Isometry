//Isometry -- Graph Theory Project
//    structures.js >> contains all custom data structures

	/*
		Graph Notation and Documentation:
		The graph will be given in the ADJACENCY LIST format.
		Format: an ARRAY of Vertex OBJECTS which contain the following characteristics:
			name -- STRING, the name of the vertex.
			edges -- an ARRAY of Edge OBJECTS, each of which contains:
				to -- the Vertex NAME that this edge leads to,
				weight -- DOUBLE, the weight of this edge.
	*/
	function Vertex(n){
		this.name = n;
		this.edges = new Array();
	}
	function Edge(f, t, w){
		this.from = f;
		this.to = t;
		this.weight = w;
	}
	var graph = [];