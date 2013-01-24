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
		this.fqn = function(){//fully qualified name -- allows you to see if the vertex has changed at all.
			var strBuild = new Array();
			strBuild.push(n);
			for(i=0; i<this.edges.length; i++){
				strBuild.push(this.edges[i].to);
				strBuild.push(this.edges[i].weight);				
			}
			return strBuild.join("");
		}
		this.resetCodes = function(){
			for(j = 0; j<this.edges.length; j++){
				console.log("on edge"+this.edges[j]);
				this.edges[j].code=0;
			}
		}
		//addEdge -- Syntactic sugar for pushing edges.
		this.addEdge = function(to, weight){
			this.edges.push(new Edge(this.name, to, weight));
		}
	}

	function Edge(f, t, w){
		this.from = f;
		this.to = t;
		this.weight = w;
		this.code = 0;//code: an algorithm-specific data code. Highly volatile.
	}
	var graph = [];

	function resetGraphCodes(){
		for(i = 0; i<graph.length; i++){
			console.log("on vertex:"+graph[i].name);
			graph[i].resetCodes();
		}
	}