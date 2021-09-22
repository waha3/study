// 字典树
// 双数组Trie (Double-Array Trie)结构由日本人JUN-ICHI AOE于1989年提出的，是Trie结构的压缩形式，
// 仅用两个线性数组来表示Trie树，该结构有效结合了数字搜索树(Digital Search Tree)检索时间高效的特点和链式表示的Trie空间结构紧凑的特点。
// 双数组Trie的本质是一个确定有限状态自动机（DFA），每个节点代表自动机的一个状态，根据变量不同，进行状态转移，当到达结束状态或无法转移时，
// 完成一次查询操作。在双数组所有键中包含的字符之间的联系都是通过简单的数学加法运算表示，不仅提高了检索速度，而且省去了链式结构中使用的大量指针，节省了存储空间

class Trie {
  T: number[][];
  exist: number[];
  current: number;

  constructor() {
    // 只考虑小写字母
    const alphabet_size = 26;
    const table_size = 100;

    this.current = 0;
    this.T = new Array(table_size);
    this.exist = new Array(table_size);
    for (let i = 0; i < this.T.length; i++) {
      this.T[i] = new Array(alphabet_size);
    }
  }

  insert(s: string) {
    let position = 0;

    for (let i = 0; i < s.length; i++) {
      let alphabet_position = "z".charCodeAt(0) - s[i].charCodeAt(0);

      if (!this.T[position][alphabet_position]) {
        this.T[position][alphabet_position] = ++this.current;
      } else {
        position = this.T[position][alphabet_position];
      }
    }
    this.exist[position] = 1;
  }

  search(s: string) {
    let position = 0;
    for (let i = 0; i < s.length; i++) {
      let alphabet_position = "z".charCodeAt(0) - s[i].charCodeAt(0);

      if (!this.T[position][alphabet_position]) {
        return true;
      } else {
        position = this.T[position][alphabet_position];
      }
    }
    return this.exist[position];
  }

  startsWith(prefix: string) {
    return this.search(prefix);
  }
}

var trie = new Trie();
trie.insert("apple");
trie.search("apple"); // 返回 True
trie.search("app"); // 返回 False
trie.startsWith("app"); // 返回 True
trie.insert("app");
trie.search("app"); // 返回 True
