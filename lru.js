/**
 * 最近最少使用缓存
 */

 function DoubleLinkListNode(key = null, val = null, prev = null, next = null) {
  this.key = key;
  this.val = val;
  this.prev = prev;
  this.next = next;
}

function DoubleLinkList() {
  this.head = null;
  this.tail = null;
}

DoubleLinkList.prototype.append = function (node) {
  if (!this.head) {
    this.head = node;
    this.tail = node;
    return this;
  }

  this.tail.next = node;
  node.prev = this.tail;
  this.tail = node;
  return this;
};

DoubleLinkList.prototype.deleteHead = function () {
  if (!this.head) {
    return null;
  }

  let deleted = this.head;
  if (this.head.next) {
    this.head = this.head.next;
    this.head.prev = null;
  } else {
    this.head = null;
    this.tail = null;
  }

  return deleted;
};

DoubleLinkList.prototype.deleteTail = function () {
  if (!this.tail) {
    return null;
  }

  let deleted = this.tail;

  this.tail = this.tail.prev;
  this.tail.next = null;
  return deleted;
};

DoubleLinkList.prototype.remove = function (node) {
  if (node === this.head) {
    this.deleteHead();
  } else if (node === this.tail) {
    this.deleteTail();
  } else {
    let prevNode = node.prev;
    let nextNode = node.next;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  }
  return this;
};

var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.map = Object.create(null);
  this.size = 0;
  this.list = new DoubleLinkList();
};

LRUCache.prototype.get = function (key) {
  if (!this.map[key]) {
    return -1;
  }

  var gettedNode = this.map[key];
  this.list.remove(gettedNode);
  this.list.append(gettedNode);
  return gettedNode.val;
};

LRUCache.prototype.put = function (key, value) {
  var node = new DoubleLinkListNode(key, value);

  if (key in this.map) {
    let currentNode = this.map[key];

    this.list.remove(currentNode);
    this.list.append(node);
    this.map[key] = node;

    return null;
  }

  if (this.size < this.capacity) {
    this.map[key] = node;
    // 更新到链表上
    this.list.append(node);
    this.size = this.size + 1;
  } else {
    var deletedMostOldNode = this.list.deleteHead();
    var _key = deletedMostOldNode.key;
    delete this.map[_key];

    this.map[key] = node;
    this.list.append(node);
  }
};