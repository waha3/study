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
  var node = new DoubleLinkListNode(key, gettedNode);

  this.list.deleteHead();
  this.list.append(node);
  return gettedNode.val;
};

LRUCache.prototype.put = function (key, value) {
  var node = new DoubleLinkListNode(key, value);

  if (this.size < this.capacity) {
    this.map[key] = node;
    // 更新到链表上
    this.list.append(node);
    this.size = this.size + 1;
  } else {
    if (key in this.map) {
      let _node = this.map[key];
      // 删除当前节点
      let _prevNode = _node.prev;
      let _nextNode = _node.next;

      if (!_prevNode) {
        this.list.head = _nextNode;
      } else if (!_nextNode) {
        this.list.tail = _prevNode;
      } else {
        _prevNode.next = _nextNode;
      }

      this.map[key] = node;
      this.list.append(node);

      return null;
    }

    var deletedMostOldNode = this.list.deleteHead();
    var _key = deletedMostOldNode.key;
    delete this.map[_key];

    this.map[key] = node;
    this.list.append(node);
  }
};

var cache = new LRUCache(2);
