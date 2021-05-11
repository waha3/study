function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

var addTwoNumbers = function (l1, l2) {
  var arr1 = [l1.val];
  var arr2 = [l2.val];

  while (l1.next) {
    l1 = l1.next;
    arr1.push(l1.val);
  }

  while (l2.next) {
    l2 = l2.next;
    arr2.push(l2.val);
  }

  arr1 = arr1.reverse();
  arr2 = arr2.reverse();

  var temp;

  if (arr1.length < arr2.length) {
    temp = arr1;
    arr1 = arr2;
    arr2 = temp;
  }

  var stack = [];
  var head = null;
  var tail = null;

  for (let i = arr1.length - 1; i >= 0; i--) {
    let node;
    let sum = arr1[i] + (arr2[i] || 0) + (stack.pop() || 0);

    if (sum > 9) {
      stack.push(1);
      node = new ListNode(sum - 10);
    } else {
      node = new ListNode(sum);
    }

    if (!head) {
      head = node;
      tail = node;
    } else {
      tail.next = node;
      tail = node;
    }
  }

  if (stack.length) {
    let node = new ListNode(stack.pop());
    tail.next = node;
    tail = node;
  }

  console.log(head);

  return head;
};

var l1 = {
  val: 2,
  next: {
    val: 4,
    next: {
      val: 3,
      next: null,
    },
  },
};

var l2 = {
  val: 5,
  next: {
    val: 6,
    next: {
      val: 4,
      next: null,
    },
  },
};

// addTwoNumbers(l1, l2);

//

var clumsy = function (n) {
  //
  var stack1 = [];
  // 运算符
  var stack2 = [];

  for (let i = n; i > 0; i--) {
    if (i % 4 === 1) {
      stack1;
    }
  }
};

// https://leetcode-cn.com/problems/linked-list-cycle/
// 快慢指针

var hasCycle = function (head) {
  if (!head) {
    return false;
  }

  let fastPointer = head;
  let lowPointer = head;

  while (fastPointer.next) {
    fastPointer = fastPointer.next.next;
    lowPointer = lowPointer.next;

    if (fastPointer === lowPointer) {
      return true;
    }
  }
  return false;
};

// 约瑟夫环的问题
// leetcode超时了
// 数学解法 暂时不会证明
var lastRemaining = function (n, m) {
  var Node = function (val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  };

  var head;
  var tail;
  var size = n;

  for (let i = 0; i < n; i++) {
    var node = new Node(i);
    if (i === 0) {
      head = node;
      tail = node;
      continue;
    }

    tail.next = node;
    node.prev = tail;
    tail = node;

    if (i + 1 === n) {
      tail.next = head;
      head.prev = tail;
    }
  }

  var cur = head;
  var count = 1;
  while (size > 1) {
    if (count % m === 0) {
      console.log(cur.val);
      var prev = cur.prev;
      prev.next = cur.next;
      size = size - 1;
      count = 1;
      cur = prev.next;
    } else {
      cur = cur.next;
      count = count + 1;
    }
  }
  return cur.val;
};

// lastRemaining(10, 17);

function WeightedQuickUnion(martix) {
  this.ids = [];
  this.axis = [];
  this.weights = [];
  this.row = martix.length;
  this.colunm = martix[0].length;
  this.parts = 0;
  this.martixClone = martix.slice();

  for (let i = 0; i < this.colunm; i++) {
    for (let j = 0; j < this.row; j++) {
      if (martix[j][i] === "O") {
        this.ids[this.parts] = this.parts;
        this.axis[this.parts] = {
          x: i,
          y: j,
        };

        if (i === 0 || j === 0 || i === this.colunm - 1 || j === this.row - 1) {
          this.weights[this.parts] = this.row * this.colunm + 1;
        } else {
          this.weights[this.parts] = 1;
        }
        this.parts = this.parts + 1;
      }
    }
  }
}

WeightedQuickUnion.prototype.connected = function (p, q) {
  return this.find(p) === this.find(q);
};

WeightedQuickUnion.prototype.find = function (p) {
  while (this.ids[p] !== p) {
    p = this.ids[p];
  }
  return p;
};

WeightedQuickUnion.prototype.union = function (p, q) {
  var pRoot = this.find(p);
  var qRoot = this.find(q);

  if (pRoot === qRoot) {
    return;
  }

  if (this.weights[pRoot] >= this.weights[qRoot]) {
    this.ids[qRoot] = pRoot;
    this.weights[pRoot] = this.weights[pRoot] + this.weights[qRoot];
  } else {
    this.ids[pRoot] = qRoot;
    this.weights[qRoot] = this.weights[qRoot] + this.weights[pRoot];
  }
  this.parts = this.parts - 1;
};

WeightedQuickUnion.prototype.isEdgeAndVertix = function (index) {
  if (
    this.axis[index].x === 0 ||
    this.axis[index].x === this.colunm - 1 ||
    this.axis[index].y === 0 ||
    this.axis[index].y === this.row - 1
  ) {
    return true;
  }
  return false;
};

WeightedQuickUnion.prototype.canConnected = function (i, j) {
  if (
    (this.axis[i].x + 1 === this.axis[j].x &&
      this.axis[i].y === this.axis[j].y) ||
    (this.axis[i].y + 1 === this.axis[j].y && this.axis[i].x === this.axis[j].x)
  ) {
    return true;
  }
  return false;
};

WeightedQuickUnion.prototype.fillX = function (index) {
  for (let i = 0; i < this.ids.length; i++) {
    if (!this.isEdgeAndVertix(this.ids[i])) {
      for (let j = 0; j < this.ids.length; j++) {
        if (this.ids[i] === this.ids[j]) {
          this.martixClone[this.axis[j].y][this.axis[j].x] = "X";
        }
      }
    }
  }
};

WeightedQuickUnion.prototype.run = function () {
  var i = 0;
  while (i < this.ids.length) {
    for (let j = 0; j < this.ids.length; j++) {
      if (!this.connected(this.ids[i], this.ids[j])) {
        if (this.canConnected(i, j)) {
          this.union(this.ids[i], this.ids[j]);
        }
      }
    }
    i++;
  }
};

/**
 * [
  ["X", "O", "X", "O", "X", "O"],
  ["O", "X", "O", "X", "O", "X"],
  ["X", "O", "X", "O", "X", "O"],
  ["O", "X", "O", "X", "O", "X"],
]

[
  ["X", "X", "X", "X"],
  ["X", "O", "O", "X"],
  ["X", "X", "O", "X"],
  ["X", "O", "X", "X"],
]

[["O","O","O"],["O","O","O"],["O","O","O"]]

[["X","X","X"],["X","O","X"],["X","X","X"]]

[["O","X","X","O","X"],["X","O","O","X","O"],["X","O","X","O","X"],["O","X","O","O","O"],["X","X","O","X","O"]]
 */

var ins = new WeightedQuickUnion([
  ["X", "X", "O", "O", "X", "O", "X", "O", "X"],
  ["O", "O", "O", "X", "O", "O", "O", "O", "O"],
  ["O", "O", "O", "X", "O", "O", "O", "O", "O"],
  ["O", "O", "O", "O", "O", "X", "X", "O", "O"],
]);
ins.run();
ins.fillX();
console.log(ins);
