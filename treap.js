function treap_node(key, priority, left, right) {
  this.key = key;
  this.priority = priority;
  this.left = left;
  this.right = right;
}

function treap() {
  this.root = null;

  this.rotate_left = function(node) {
      var temp = node.right;
      node.right = temp.left;
      temp.left = node;
  }

  this.rotate_right = function(node) {}
}

treap.prototype.insert = function (key, priority) {
    var node = new treap_node(key, priority);
    if (!this.root) {
        this.root = node;
    } else if (key < this.root.key ) {
      this.insert(this.root.left, )
    }
};

treap.prototype.delete = function () {};

treap.prototype.batchDelete = function () {};

treap.prototype.find = function () {};
