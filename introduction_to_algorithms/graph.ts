/**
 * 图
 * 对于G=(V,E) 有两种的标准表示1.一种邻接链表表示，2.一种链接矩阵表示
 * 邻接链表表示在表示稀疏图（|E| << |V| ** 2 ）比较紧凑，
 * 稠密图比较适合邻接矩阵表示
 * 有向图：中所有邻接链表的长度之和|E|，
 * 无向图：中所有邻接链表的长度之和2|E|，无向图中不允许出现自环（两个顶点相同的边）
 * 度：关联顶点边的数目，出度：离开顶点边的数目，入度：进入顶点边的数目
 * 有向图中顶点的度：（出度+入度）
 * 邻接矩阵：我们通常将节点得编号编为1，2，3...,|V|
 * 简单路径：有向图中路径中所有顶点读不相同
 * 子路径：路径中构成的连续子序列
 * 环：有向图路径<v0,v1,...,vk>中有v0 = vk则该路径构成环
 * 不含自环的有向图是简单的
 * 连通：如果无向图中每个顶点到所有其他顶点都是可达的则该图是连通的
 * 连通分量：无向图中某个子集等连通的概念（无向图中只有一个连通分量则该图连通）
 * 强连通：如果有向图中的任意两个顶点互相可达
 * 子图：如果V'∈ V且E'∈ E，则G'(V',E')是G(V,E)的子图
 * 完全图：每对顶点度邻接的无向图
 * 无向无环图是一个深林，连通他的是一颗自由书
 * 多重图：顶点之间可以存在多条边，并允许自环，
 * 超图：每条超边连接的不是两个顶点而是任意顶点的子集
 * 自由树：1.任意两个顶点有唯一的简单路径构成，2.是连通的，但是任意删除得到的图都不连通，3.是连通的,|V| =  |E| + 1 。4.无环的 5。任意一条表，构成的图包含一个环
 */

// 广度优先搜索
// 所有的节点一开始均被涂上白色，算法演进中，节点可能会变成灰色或者黑色，第一次被发现的节点
// 颜色会发生变化，灰色和黑色的节点都是已经被发现的结点，所有黑色节点得邻接节点都已经被发现了
// 灰色节点得邻接节点可能存在未被发现的白色节点，灰色节点代表的就是已知和未知的边界
// 颜色可有可无（标记作用）

export {};

enum Color {
  "white",
  "gray",
  "black",
}

interface Stack<T> {
  readonly length: number;
  pop(): T | undefined;
  push(item: T): number;
  [Symbol.iterator](): Iterator<T>;
}

interface Dictionary<T> {
  [key: string | number]: T;
}

interface Graph {
  vertex: Dictionary<Graph_Node>;
  edge: number;
  adjacency: Dictionary<LinkedList>; // 连接链表
}

class Graph_Node {
  color: Color;
  distance: number; // 源节点s到该节点的距离
  predecessor: Graph_Node;
  key: number | string;
  next: Graph_Node;
  found: number; // 深度优先搜索节点被发现
  finish: number; // 深度优先搜索节点完成处理

  constructor(key: number | string) {
    this.key = key;
    this.color = null;
    this.next = null;
    this.predecessor = null;
    this.distance = null;
  }
}

class Queue {
  t: Graph_Node[];

  constructor() {
    this.t = new Array();
  }

  get size() {
    return this.t.length;
  }

  enqueue(s: Graph_Node) {
    this.t.unshift(s);
  }

  dequeue() {
    return this.t.pop();
  }
}

class LinkedListNode {
  next: LinkedListNode;
  value: Graph_Node;
  constructor() {
    this.next = null;
    this.value = null;
  }
}

class LinkedList {
  head: LinkedListNode;
  tail: LinkedListNode;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  insert(x: LinkedListNode) {
    if (this.head === null) {
      this.head = x;
      this.tail = x;
    } else {
      this.tail.next = x;
      this.tail = this.tail.next;
    }
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}

class Graph implements Graph {
  vertex: Dictionary<Graph_Node>;
  edge: number;
  adjacency: Dictionary<LinkedList>;

  constructor() {
    this.edge = 0;
    this.vertex = {};
    this.adjacency = {};
  }

  addEdge(u: number | string, v: number | string) {
    if (!this.adjacency[u]) {
      this.adjacency[u] = new LinkedList();
    }

    if (!this.adjacency[v]) {
      this.adjacency[v] = new LinkedList();
    }

    let u_node: LinkedListNode;
    let v_node: LinkedListNode;

    // if (this.vertex[u]) {
    //   u_node = this.vertex[u];
    // } else {
    //   u_node = new Graph_Node(u);
    // }

    // if (this.vertex[v]) {
    //   v_node = this.vertex[v];
    // } else {
    //   v_node = new Graph_Node(v);
    // }

    this.vertex[u] = u_node;
    this.vertex[v] = v_node;
    this.adjacency[u].insert(v_node);
    this.adjacency[v].insert(u_node);
    this.edge = this.edge + 1;
  }
}

/**
 * 广度优先搜索
 * 沿着广度方向搜索，及发现了离源节点s为k的所有节点才会继续搜索k+1的节点
 */
function BFS(G: Graph, s: Graph_Node) {
  for (let key in G.vertex) {
    let u = G.vertex[key];
    u.color = Color.white;
    u.distance = Infinity;
    u.predecessor = null;
  }

  s.color = Color.gray;
  s.distance = 0;
  s.predecessor = null;

  let Q = new Queue();
  Q.enqueue(s);

  while (Q.size > 0) {
    let u = Q.dequeue();
    for (let v of G.adjacency[u.key]) {
      if (v.color === Color.white) {
        v.color = Color.gray;
        v.distance = u.distance + 1;
        v.predecessor = u;
        Q.enqueue(v);
      }
    }
    u.color = Color.black;
  }
}

function bfs_with_key(G: Graph, key: string | number) {
  let s = G.vertex[key];
  BFS(G, s);
}

// 最短路径
// 广度优先搜索树
// bfs在搜索的过程中将创造一个广度优先搜索树，改颗树对应的是predecessor节点
function print_path(G: Graph, s: Graph_Node, v: Graph_Node) {
  if (v === s) {
    console.log(s.key);
  } else if (v.predecessor === null) {
    console.log("no path from s to v");
  } else {
    print_path(G, s, v.predecessor);
    console.log(v.key);
  }
}

/**
 * 深度优先搜索
 * 对最近才发现的节点v的出发边进行搜索，直到该节点的所有出发边都被发现为止
 * 然后再回溯到v的前驱节点，持续到源节点s可以到达的所有节点都被发现为止
 * 深度优先搜索会形成多个搜索树
 * 括号化结构(found和finish)
 * 树边: 节点u，v被首先发现（u，v）就是树边
 * 后向边: 后向边将（u，v）连接到深度优先搜索树种的一个祖先节点，有向图中的自循环也是后向边
 * 前向边：将节点u链接到其后代v的一条边
 * 横向边：指其他所有的边，只要其中一个节点不是另一个节点得祖先节点，也可以链接不同深度优先树中的两个节点
 */

let time = 0;
function DFS(G: Graph) {
  // 初始化节点
  for (let key in G.vertex) {
    let u = G.vertex[key];
    u.color = Color.white;
    u.predecessor = null;
  }

  for (let key in G.vertex) {
    let u = G.vertex[key];
    if (u.color === Color.white) {
      DFS_VISIT(G, u);
    }
  }
}

function DFS_VISIT(G: Graph, u: Graph_Node) {
  time = time + 1;
  u.found = time;
  u.color = Color.gray;

  for (let i of G.adjacency[u.key]) {
    if (i.color === Color.white) {
      i.predecessor = u;
      DFS_VISIT(G, i);
    }
  }
  u.color = Color.black;
  time = time + 1;
  u.finish = time;
}

/**
 * 拓扑排序（无环图）O(V+E)
 * 是G中一种线性次序，图中所有的有向边都是从左指向右
 * 方法：call dfs to compute fininshing time v.f for each vertex v, as each vertex is fininsed insert into a linked list
 */

// let G = new Graph();
// G.addEdge("r", "v");
// G.addEdge("r", "s");
// G.addEdge("s", "w      ");
// G.addEdge("w", "t");
// G.addEdge("w", "x");
// bfs_with_key(G, "s");
// print_path(G, G.vertex["s"], G.vertex["x"]);
// DFS(G);

/**
 * 强连通分量: 有向图G=(V,E); 强连通分量是最大点集合C是V的子集，C中任意个节点对都市可以互相到达的
 * 寻找强连通分量需要用到图G的转置G=(V,E) Gt=(V, Et) => Et = {(u,v) => (v,u) ∈ E}
 */

// Kosaraju 算法
function strongly_connected_components(G: Graph) {
  let S: stack<graph_node> = [];
  for (let key in G.vertex) {
    let u = G.vertex[key];
    u.color = Color.white;
    u.predecessor = null;
  }

  for (let key in G.vertex) {
    for (let node of G.adjacency[key]) {
      scc_dfs(G, node, S);
    }
  }

  console.log(S);
  // DFS(G);
  let Gt = transpose(G);
  // DFS(Gt);
}

function scc_dfs(G: Graph, x: Graph_Node, s: Stack<Graph_Node>) {
  x.color = Color.gray;
  for (let i of G.adjacency[x.key]) {
    if (i.color === Color.white) {
      scc_dfs(G, i, s);
    }
  }
  s.push(x);
  x.color = Color.black;
}

function scc_dfst(G: Graph) {}

function reverse_list(head: Graph_Node): Graph_Node {
  let current = head;
  let prev = null;

  while (current) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

function transpose(G: Graph) {
  for (let key in G.adjacency) {
    G.adjacency[key].head = reverse_list(G.adjacency[key].head);
  }
  return G;
}

let G = new Graph();
// G.addEdge(1, 2);
// G.addEdge(2, 3);
// G.addEdge(3, 1);
// G.addEdge(1, 4);
// G.addEdge(4, 5);
// G.addEdge(5, 6);
// G.addEdge(5, 7);
// G.addEdge(7, 6);
// G.addEdge(6, 4);
// G.addEdge(5, 8);
// G.addEdge(8, 9);
// G.addEdge(9, 8);
// strongly_connected_components(G);

// tranj
