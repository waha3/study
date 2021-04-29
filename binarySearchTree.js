/**
 * 1. 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
 * 2. 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值；
 * 3. 它的左、右子树也分别为二叉查找树
 */

function BinarySearchTreeNode(val) {
  this.val = val;
  this.parent = null;
  this.left = null;
  this.right = null;
}

function BinarySearchTree() {
  this.root = null;
}

BinarySearchTree.prototype.insert = function (val) {
  var node = new BinarySearchTreeNode(val);
  if (!this.root) {
    this.root = node;
    return this;
  }

  var parentNode = this.root;

  while (true) {
    if (parentNode.val > val) {
      // 左子节点不存在 直接插入
      // 存在的话就沿着左子节点往下走
      if (!parentNode.left) {
        parentNode.left = node;
        break;
      } else {
        parentNode = parentNode.left;
      }
    } else {
      // 右子节点不存在 直接插入
      // 存在的话就沿着右子节点往下走
      if (!parentNode.right) {
        parentNode.right = node;
        break;
      } else {
        parentNode = parentNode.right;
      }
    }
  }
  node.parent = parentNode;
  return this;
};

BinarySearchTree.prototype.batchInsert = function (vals) {
  for (let val of vals) {
    this.insert(val);
  }
};

BinarySearchTree.prototype.getMax = function (node) {
  var cur = node;

  while (cur.right) {
    cur = cur.right;
  }

  return cur.val;
};

BinarySearchTree.prototype.getMin = function (node) {
  var cur = node;

  while (cur.left) {
    cur = cur.left;
  }

  return cur.val;
};

BinarySearchTree.prototype.search = function (val) {
  if (!this.root) {
    return null;
  }

  var cur = this.root;

  while (cur) {
    if (cur.val === val) {
      return cur;
    } else {
      if (cur.val > val) {
        cur = cur.left;
      } else {
        cur = cur.right;
      }
    }
  }
  return cur;
};

BinarySearchTree.prototype.remove = function (val) {
  var currentNode = this.search(val);
  var currentNodeParent = currentNode.parent;

  if (!currentNode) {
    return null;
  }

  // 叶节点
  if (!currentNode.left && !currentNode.right) {
    if (currentNode.parent.left === currentNode) {
      currentNode.parent.left = null;
    }

    if (currentNode.parent.right === currentNode) {
      currentNode.parent.right = null;
    }
  } else if (!currentNode.right) {
    currentNode.left.parent = currentNodeParent;
  } else if (!currentNode.left) {
    currentNode.right.parent = currentNodeParent;
  } else {
    // 获取左节点的最大值
    this.getMin(
      node.left
    )
    this.remove(currentNode.val)
    this.
  }
};

var bst = new BinarySearchTree();
bst.batchInsert([8, 3, 6, 1, 10, 14, 13, 4, 7]);
bst.search(10);
bst.search(7);
