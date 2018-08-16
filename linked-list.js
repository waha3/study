function LinkListNode(value) {
  this.value = value;
  this.next = null;
}

function LinkList() {
  this.head = null;
  this.tail = null;

  this.prepend = function(value) {
    const node = new LinkListNode(value);
    
    node.next = this.head;
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    return this;
  };

  this.append = function(value) {
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

  this.delete = function(value) {
    if (!this.head) {
      return null;
    }

    
  }
}
