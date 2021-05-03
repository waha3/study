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

lastRemaining(10, 17);
