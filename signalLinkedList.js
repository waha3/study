function LinkListNode(value) {
  this.value = value;
  this.next = null;
}

function LinkList() {
  this.head = null;
  this.tail = null;

  this.prepend = function (value) {
    const node = new LinkListNode(value);

    node.next = this.head;
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    return this;
  };

  this.append = function (value) {
    const node = new LinkListNode(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;

      return this;
    }

    this.tail.next = node;
    this.tail = node;

    return this;
  };

  this.delete = function (value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    while (this.head && this.head.value === value) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      while (currentNode.next) {
        if (currentNode.next.value === value) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.tail.value === value) {
      this.tail = currentNode;
    }

    return deletedNode;
  };
<<<<<<< HEAD
=======

  this.find = function () {};
>>>>>>> 71dba63368659ba02d474f1283af27a8c99bbeb9
}
