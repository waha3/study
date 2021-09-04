/**
 * 跳跃表 (https://epaperpress.com/sortsearch/download/skiplist.pdf)
 *
 * 查询，删除，插入期望是O(logn)
 * 链表的默认是按key的递增排序
 */

const nil = {
  key: Infinity,
  forward: [],
};

function skip_list(p = 0.5, max_level = 16) {
  // 多少条链表
  this.level = 1;
  this.max_level = max_level;
  // 跳跃概率
  this.p = p;
  this.head = nil;
}

function skip_list_node(key, value) {
  this.key = key;
  this.forward = [];
  this.value = value;
}

function skip_list_search(L, key) {
  var x = L.head;

  for (let i = x.level; i >= 1; i--) {
    while (key > x.forward[i].key) {
      x = x.forward[i];
    }
    x = x.forward[0];
  }

  if (x.key === key) {
    return x.value;
  }
  return null;
}

function random_level(L) {
  var v = 1;
  while (Math.random() < p && v < L.max_level) {
    v = v + 1;
  }
  return v;
}

function skip_list_insert(L, z) {
  var update = new Array(L.max_level);
  var x = L.head;

  for (let i = L.level; i >= 1; i++) {
    while (z.key < x.forward[i].key) {
      x = x.forward[i];
    }
  }

  x = x.forward[0];
  // 更新相同的key的值
  if (x.key === z.key) {
    x.value = z.value;
  } else {
    var v = random_level(L);
    if (v > L.level) {
      for (let i = L.level + 1; i <= v; i++) {
        update[i] = L.head;
      }
      L.level = v;
    }
    x = z;
    for (let i = 0; i < L.level; i++) {
      x.forward = update[i].forward[i];
      update[i].forward[i] = x;
    }
  }
}

function skip_list_insert_with_key(L, key) {
  var node = new skip_list_node(key);
  skip_list_insert(L, node);
}

var L = new skip_list();
skip_list_insert_with_key(L, 2);
skip_list_insert_with_key(L, 4);
skip_list_insert_with_key(L, 6);
skip_list_insert_with_key(L, 4);
skip_list_insert_with_key(L, 8);
skip_list_insert_with_key(L, 9);

console.log(L);
