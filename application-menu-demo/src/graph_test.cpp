

#include <iostream>
#include <list>

using namespace std;

class Graph{

	int V;

	list <int> *adj;

	public:
		Graph(int V);
		void addEdge(int v,int w);
		void BFS(int source);
};


Graph :: Graph(int v){

	this->V = v;
	this->adj = new list<int>[v];
}

void Graph :: addEdge(int v,int w){

	adj[v].push_back(w);
}


void Graph :: BFS(int source){

	int visited[this->V];

	for(int i=0;i<this->V;i++){

		visited[i] = 0;
	}

	list <int> Queue;

	visited[source] = 1;

	Queue.push_back(source);

	while(!Queue.empty()){

		int s = Queue.front();

		printf("%d",s);

		Queue.pop_front();


		list <int> :: iterator j;

		for(j = adj[s].begin();j != adj[s].end();j++){

			if(visited[*j] == 0){

				visited[*j] = 1;
				Queue.push_back(*j);

			}
		}

	}

}


int main(){

	

	Graph g(4);
    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 2);
    g.addEdge(2, 0);
    g.addEdge(2, 3);
    g.addEdge(3, 3);
 
    cout << "Following is Breadth First Traversal "
         << "(starting from vertex 2)\n";

    g.BFS(2);
 
    return 0;
}