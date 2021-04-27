// 二叉树的遍历

/**
 * 前序遍历
 * 递归版本
 * root -> left -> right
 * 边遍历边输出
 * 考察到一个节点后，即刻输出该节点的值，并继续遍历其左右子树
 */

var preorderTraversal = function (root) {
  var res = [];
  var walk = function (root) {
    if (root) {
      res.push(root.val);
      preorderTraversal(root.left);
      preorderTraversal(root.right);
    }
  };
  walk(root);
  return res;
};

// 非递归版本
var preorderTraversal = function (root) {
  var stack = [];
  var current = root;
  var res = [];

  while (current || stack.length) {
    if (current) {
      res.push(current.val);
      stack.push(current);
      current = current.left;
    } else {
      current = stack.pop();
      current = current.right;
    }
  }
  return res;
};

/**
 * 中序遍历
 * 递归版本
 * left -> middle -> right
 * 遍历完左子节点后再输出值 再遍历跟节点 在遍历右节点
 */

var inorderTraversal = function (root) {
  var res = [];
  var walk = function (root) {
    if (root) {
      walk(root.left);
      res.push(root.val);
      walk(root.right);
    }
  };
  return res;
};

// 非递归版本
var inorderTraversal = function (root) {
  var stack = [];
  var current = root;
  var res = [];

  while (current || stack.length) {
    if (current) {
      stack.push(current);
      current = current.left;
    } else {
      current = stack.pop();
      res.push(current.val);
      current = current.right;
    }
  }
  return res;
};
