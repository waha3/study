export {};
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
 * 内部节点往左路径是0 往右路径是1
 */

interface huffman_tree_node {
  left: huffman_tree_node;
  right: huffman_tree_node;
  freq: number;
  key: string;
}

interface prority_queue {
  arr: huffman_tree_node[];
}

function left(k: number): number {
  return k << 1;
}

function right(k: number): number {
  return (k << 1) + 1;
}

function parent(k: number): number {
  return k >> 1;
}

function exchange(A: huffman_tree_node[], i: number, j: number) {
  i = i - 1;
  j = j - 1;
  let temp: huffman_tree_node = A[i];
  A[i] = A[j];
  A[j] = temp;
}

function build_min_heap(A: huffman_tree_node[]) {
  let n: number = A.length;
  let start = n >> 1;

  for (let i = start; i >= 1; i--) {
    min_heapify(A, i);
  }
}

function min_heapify(A: huffman_tree_node[], p: number) {
  while (true) {
    let l = left(p);
    let r = right(p);

    let smaller = null;

    if (l <= A.length && A[l - 1].freq < A[p - 1].freq) {
      smaller = l;
    } else {
      smaller = p;
    }

    if (r <= A.length && A[r - 1].freq < A[smaller - 1].freq) {
      smaller = r;
    }

    if (smaller !== p) {
      exchange(A, p, smaller);
      p = smaller;
    } else {
      break;
    }
  }
}

function heap_increase_key(A: huffman_tree_node[], i: number) {
  while (true) {
    let p = parent(i);

    if (p > 0 && A[i - 1].freq < A[p - 1].freq) {
      exchange(A, p, i);
      i = p;
    } else {
      break;
    }
  }
}

function min_heap_insert(A: huffman_tree_node[], z: huffman_tree_node) {
  A.length = A.length + 1;
  A[A.length - 1] = z;
  heap_increase_key(A, A.length);
}

function extract_min(A: huffman_tree_node[]): huffman_tree_node {
  let min = A[0];
  A[0] = A[A.length - 1];
  A.length = A.length - 1;
  min_heapify(A, 1);
  return min;
}

class huffman_tree_node implements huffman_tree_node {  
  constructor(key?: string, freq?: number) {
    this.left = null;
    this.right = null;
    this.key = key;
    this.freq = freq;
  }
}

function huffman_tree(C: huffman_tree_node[]): huffman_tree_node {
  const n: number = C.length;
  build_min_heap(C);

  for (let i = 1; i <= n - 1; i++) {
    let node: huffman_tree_node = new huffman_tree_node();
    let x = extract_min(C);
    let y = extract_min(C);
    // 堆中的节点每次迭代都会少1
    // 每次合并最小的两个节点（包含叶节点）
    node.left = x;
    node.right = y;
    node.freq = x.freq + y.freq;

    min_heap_insert(C, node);
  }
  // 最后只会剩下节点key最大的一个节点
  return extract_min(C);
}

const C: huffman_tree_node[] = [
  new huffman_tree_node("a", 45),
  new huffman_tree_node("b", 13),
  new huffman_tree_node("c", 12),
  new huffman_tree_node("d", 16),
  new huffman_tree_node("e", 9),
  new huffman_tree_node("f", 5),
];

const tree = huffman_tree(C);

function generator_huffman_code_recursive(
  root: huffman_tree_node,
  prefix_code: string,
  map: Map<string, string>
): Map<string, string> {
  if (root) {
    if (root.left === null && root.right === null) {
      return map.set(root.key, prefix_code);
    }
    generator_huffman_code_recursive(root.left, prefix_code + "0", map);
    generator_huffman_code_recursive(root.right, prefix_code + "1", map);
  }
  return map;
}

// TODO huffman code iteration
function generator_huffman_code(tree: huffman_tree_node): Map<string, string> {
  let stack: huffman_tree_node[] = [];
  let current = tree;
  let map = new Map<string, string>();
  let paths: string[] = [];
  // 根节点是空
  paths.push("");

  while (stack.length || current) {
    if (current) {
      let path = paths.pop();

      console.log(path);
      if (current.left === null && current.right === null) {
        map[current.key] = path;
      }

      if (current.left !== null) {
        path = path + "0";
        paths.push(path);
      }

      if (current.right !== null) {
        path = path + "1";
        paths.push(path);
      }

      stack.push(current);
      current = current.left;
    } else {
      current = stack.pop();
      current = current.right;
    }
  }
  return map;
}

let map = generator_huffman_code_recursive(tree, "", new Map<string, string>());
console.log(map);
