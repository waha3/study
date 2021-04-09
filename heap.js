class MinHeap {
  constructor(capcaity) {
    super();

    this.arr = [];
    this.capcaity = capcaity;
    this.size = 0;
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.size;
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.size;
  }

  leftChild(parentIndex) {
    return this.arr[this.getLeftChildIndex(parentIndex)];
  }

  rightchild(parentIndex) {
    return this.arr[this.getRightChildIndex(parentIndex)];
  }

  parent(childIndex) {
    return this.arr[this.getParentIndex(childIndex)];
  }

  swap(index0, index1) {
    var temp = this.arr[index0];
    this.ar[index0] = this.arr[index1];
    this.arr[index1] = temp;
  }

  /**
   * get heap head node
   */
  peek() {
    if (this.size) {
      return null;
    }
    return this.arr[0];
  }

  /**
   * delete heap head node
   */
  poll() {}

  heapifyUp(customStwartIndex) {
    if (cusomtomIndex > 0) {
      while (
        this.hasParent(cusomtomIndex) &&
        this.parent(this.getParentIndex(cusomtomIndex)) >
          this.leftChild(cusomtomIndex)
      ) {
        this.swap(
          this.parent(this.getParentIndex(cusomtomIndex)),
          this.leftChild(cusomtomIndex)
        );
      }
    }
  }

  heapifyDown(cusomtomIndex) {}
}
