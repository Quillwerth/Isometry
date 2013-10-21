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
		this.code = -1;
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
				//console.log("on edge"+this.edges[j].returnKey());
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
		this.fromVert = (function(){
			for(var i = 0; i<graph.length; i++){
				if(f === graph[i].name){
					return graph[i];
				}
			}
		})();
		this.to = t;
		this.toVert = (function(){
			for(var i = 0; i<graph.length; i++){
				if(t === graph[i].name){
					return graph[i];
				}
			}
		})();
		this.weight = w;
		this.code = 0;//code: an algorithm-specific data code. Highly volatile.
		this.shift = 0;
		//vertexShift: Call this when a vertex is moved through user action. This way, it'll redraw the vertex.
		this.vertexShift = function(){
			this.shift = this.shift ^ 1;
		}
		this.returnKey = function(){
			return [this.shift,this.to,this.from, this.weight].join("::");
		}
	}
	var graph = [];

	function resetGraphCodes(){
		for(i = 0; i<graph.length; i++){
			//console.log("on vertex:"+graph[i].name);
			graph[i].resetCodes();
		}
	}

	function edgeFixer(){
		//i live in hell
		for(i = 0; i<graph.length; i++){
			var newEdges = new Array();
			for(j = 0; j<graph[i].edges.length; j++){
				graph[i].edges[j].fromVert = (function(){
					for(var k = 0; k<graph.length; k++){
						if(graph[i].edges.from === graph[k].name){
							return graph[k];
						}
					}
				})();
				graph[i].edges[j].toVert = (function(){
					for(var k = 0; k<graph.length; k++){
						if(graph[i].edges.to === graph[k].name){
							return graph[k];
						}
					}
				})();
			}
			// graph[i].edges = newEdges;
		}
		//Why? WHY?! Because I'm collecting technical debt. weeeeeeeeeeee
	}