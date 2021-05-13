function huffmanTree(str) {
  this.wordRate = {};
  for (let i of str) {
    if (wordRate[i]) {
      wordRate[i] += 1;
    } else {
      wordRate[i] = 0;
    }
  }

  this.node = null;
}

huffmanTree.prototype.encode = function () {};

huffmanTree.prototype.decode = function () {};

huffmanTree.prototype.findTwoSmallest = function () {
  let smallestA;
  let smallestB;
  for (let i in this.wordRate) {
    if (!smallestA) {
      smallestA = this.wordRate[i];
    } else {
      smallestA = Math.max(smallestA, this.wordRate[i]);
      smallestB = 
    }

    
  }
};
