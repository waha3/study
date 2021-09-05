/**
 * 霍夫曼编码（一种贪心算法）
 *
 * 变长编码：赋予高频字符低位编码低频字符高位编码
 *
 *              a    b    c     d    e     f
 * 频率（千次）   45   13   12    16   9     5
 * 定长编码      000  001  010   011  100   101
 * 不定长编码     0   101   100  111  1101  1100
 *
 *
 * 前缀码：没有任何码字是其他码字的前缀 没有歧义 简化解码过程
 * 前缀码树是一颗满二叉树
 * 对于一个字母表C 前缀码书的叶节点的数量｜C｜, 内部节点数量|C| - 1
 */

interface huffman_tree_node {
  left: huffman_tree_node;
  right: huffman_tree_node;
  freq: number;
}

interface prority_queue {
  arr: huffman_tree_node[];
}

function left(k: number): number {
  return 2 * k + 1;
}

function right(k: number): number {
  return 2 * k + 2;
}

function build_min_heap(A: number[]) {
  let n: number = A.length;
  let start = (n >> 1) + 1;

  for (let i = start; i <= n; i++) {
    min_heapify(A, i);
  }
}

function heap_insert(A: number[], x: number, y: number) {}

function min_heapify(A: number[], p: number) {}

function extract_min(Q: prority_queue): huffman_tree_node {
  return Q.arr.shift();
}

// function prority_queue<T extends prority_queue>(A: T) {
//   build_max_heap(A);
// }

function huffman_tree_node() {
  this.left = null;
  this.right = null;
  this.freq = null;
}

function huffman(C: string[]) {
  const n: number = C.length;

  const Q = build_min_heap(C);

  for (let i = 1; i < n; i++) {
    let node: huffman_tree_node = new huffman_tree_node();
    let x = extract_min(Q);
    let y = extract_min(Q);
    node.left = x;
    node.right = y;
    node.freq = x.freq + y.freq;
    heap_insert(Q, node);
  }
}
