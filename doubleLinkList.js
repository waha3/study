function DoubleLinkListNode(val = null, prev = null, next = null) {
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
