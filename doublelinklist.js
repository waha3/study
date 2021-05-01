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
  
  let list = new DoubleLinkList();
  
  var a1 = new DoubleLinkListNode(1, 1);
  var a2 = new DoubleLinkListNode(2, 2);
  var a3 = new DoubleLinkListNode(3, 3);
  var a4 = new DoubleLinkListNode(4, 4);