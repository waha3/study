// 散列表

// 直接寻址 （关键字的全域U比较小时）

// 位向量（由0和1组成的集合）
// n长度的位向量表示{an-1 ... a0}
function bitmap_search(V, k) {
  if (V[V.size - k]) {
    return V[V.size - k];
  }
  return null;
}

function bitmap_insert(V, x) {
  V[V.size - x] = 1;
}

function bitmap_delete() {
  V[V.size - x] = 0;
}

// 散列表 （全域U很大）
// 散列函数
/**
 * 1.除法散列法 h(k) = k mod m（slot size）
 * 选择一个素数
 * 2.乘法散列法 h(k) = floor(m(kA mod 1))  kA mod 1 就是取乘积的小数部分
 * A约等于(sqrt(5) - 1) / 2
 * 3.全域散列法
 */
// 设计一个全局散列函数
// 选择一个足够大的素数p 使得每个可能的关键字k落在 0 -> p - 1范围内
// Zp = {0, 1...., p-1} Zp* = {1,2,...,p-1} 假定了全域的大小大于散列表的槽数=> p > m
// 现在对于 a => Zp* b => Zp 定义散列函数 hab 利用线性变换 再进行模p和模m规约 => hab(k) = ((ak + b) mod p) mod m
// 解决key冲突
// 1. 链接法 （冲突的key放到同一个链表里）
// 2. 开放寻址法 (当一个生成的key在散列表中已经存在时， 这时候可以在用再新的散列函数再生成一个key继续进行插入，依次循环，知道找到一个合适的位置 ps. 前提是装载因子小于1)
