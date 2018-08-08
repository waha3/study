// function LinkList() {
//   var Node = function(ele) {
//     this.ele = ele;
//     this.next = null; // 指针
//   };

//   var length = 0;
//   var head = null;

//   this.append = function(ele) {
//     var node = new Node(ele);
//     var current; // 指针

//     if (!head) {
//       head = node;
//     } else {
//       current = head;

//       while (current.next) {
//         current = current.next;
//       }

//       current.next = node;
//     }

//     length = length + 1; // 长度加1
//   };

//   this.insert = function(pos, ele) {
//     if (pos >= 0 && pos <= length) {
//       var node = new Node(ele);
//       var index = 0;
//       var current = head;
//       var previous;

//       if (pos === 0) {
//         node.next = head;
//       } else {
//         while (index <= pos) {
//           previous = current;
//         }
//       }
//     }
//   };
// }

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
}
