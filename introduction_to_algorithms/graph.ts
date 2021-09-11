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

enum Color {
  "white",
  "gray",
  "black",
}

interface dictionary<T> {
  [key: string | number]: T;
}

interface graph {
  vertex: graph_node[];
  edge: number;
  adjacency: dictionary<LinkedList>; // 连接链表
}

class graph_node {
  color: Color;
  distance: number; // 源节点s到该节点的距离
  predecessor: graph_node;
  key: number | string;
  next: graph_node;
  constructor(key: number | string) {
    this.key = key;
  }
}

class Queue {
  t: graph_node[];

  get size() {
    return this.t.length;
  }

  enqueue(s: graph_node) {
    this.t.unshift(s);
  }

  dequeue() {
    return this.t.pop();
  }
}

class LinkedList {
  head: graph_node;
  tail: graph_node;

  insert(x: graph_node) {
    if (this.head === null) {
      this.head = x;
      this.tail = x;
    } else {
      this.tail = x;
      this.tail = this.tail.next;
    }
  }

  get current() {
    return this.head;
  }

  [Symbol.iterator]() {
    return {
      next() {
        let value = this.current.key;
        this.current = this.current.next;
        return {
          value,
          done: this.current === null,
        };
      },
    };
  }
}

class Graph implements graph {
  vertex: graph_node[];
  edge: number;
  adjacency: dictionary<LinkedList>;

  constructor() {
    this.edge = 0;
    this.vertex = new Array();
    this.adjacency = {};
  }

  addEdge(u: number | string, v: number | string) {
    if (!this.adjacency[u]) {
      this.adjacency[u] = new LinkedList();
    }

    if (!this.adjacency[v]) {
      this.adjacency[v] = new LinkedList();
    }

    this.vertex.push(new graph_node(u));
    this.vertex.push(new graph_node(v));
    this.adjacency[u].insert(new graph_node(v));
    this.adjacency[v].insert(new graph_node(u));
    this.edge = this.edge + 1;
  }
}

// 广度遍历
function bfs(G: graph, s: graph_node) {
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

let G = new Graph();
G.addEdge("r", "v");
G.addEdge("r", "s");
G.addEdge("s", "w");
G.addEdge("w", "t");
G.addEdge("w", "x");
console.log(G);
