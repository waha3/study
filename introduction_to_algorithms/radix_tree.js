/**
 * 基数树就是一个tries树
 * 对于子串a = {a0a1a2...ap} b = {a0a1...aq} a按字典序排序小于b
 * 1. 存在一个整数j, i = 0, 1, 2,..., j - 1, ai = bi aj < bj
 * 2. p < q, i = 0, 1, 2,...,p, ai = bi
 */