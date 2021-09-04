/**
 * 跳跃表 (https://epaperpress.com/sortsearch/download/skiplist.pdf)
 * 比较适合并发环境下来进行zeng shan
 * 查询，删除，插入期望是O(logn)
 * 链表的默认是按key的递增排序
 */

interface skip_list_node {
  key: number,
  value: any,
  forward: [skip_list_node]
}

interface skip_list {
  head: skip_list_node,
  level: number,
  p: number,
  max_level: number
}

function skip_list_node(key: number, value?: any) {
  this.key = key;
  this.value = value;
  this.forward = [];
}

function skip_list(p: number = 0.5, max_level: number = 16) {
  this.head = new skip_list_node(Infinity, null);
  this.level = 1;
  this.p = p;
  this.max_level = max_level;
}

function random_level(L: skip_list): number {
  let v: number = 1;
  if (Math.random() > L.p && v < L.max_level) {
    v = v + 1;
  }
  return v;
}

function skip_list_insert(L: skip_list, z: skip_list_node) {
  let update = new Array(L.max_level);
  let x = L.head;

  for (let i = L.level; i >= 1; i++) {
    while (x.forward[i].key < z.key) {
      x = x.forward[i];
    }
    update[i] = x;
  }
  x = x.forward[0];
  if (x.key === z.key) {
    x.value = z.value;
  } else {
    let v = random_level(L);
  }
}

function skip_list_insert_with_key(L: skip_list, key: number) {
  let node = new skip_list_node(key, null);
  skip_list_insert(L, node);
}

function search(L: skip_list, key: number): skip_list_node {
  let x = L.head;
  for (let i = L.level; i >= 1; i++) {
    while (x.forward[i].key < key) {
      x = x.forward[i];
    }
  }
  x = x.forward[0];
  if (x.key === key) {
    return x;
  }
  return null
}

const L = new skip_list();
skip_list_insert_with_key(L, 1)
// skip_list_insert_with_key(L, 2);