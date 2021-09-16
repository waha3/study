package main

import (
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"sort"
	"strings"
	"time"
)

// 复合数据类型

// * 数组
// ! 数组是具有固定长度且拥有0个或者多个相同的数据类型元素序列
// ! 每个元素通过索引访问
// ! 默认情况新数组初始值是0
// ! 字面量表示
// ! 省略号的作用: 数组的长度有初始化时元素的数量决定
// ! 数组的长度必须是常量
// ! 调用函数的时候，每个传入值都会创建一个副本，然后赋值给对应的函数变量 （和其他语言不太一样golang中作为的是值来传递）

// * slice
// ! slice是一个拥有相同类型的可变长序列 []T
// ! 有三个属性：指针 长度 容量 指针指向数组的第一个可访问元素 长度是元素个数 容量的大小是slice的起始元素到底层数组的最后一个元素间元素的个数 cap返回容量 len返回长度
// ! 一个底层数组可以对应多个slice 可以重叠
// ! 初始化数组和slice的区别是slice没有指定固定长度
// ! slice 无法直接比较
// ! make函数可以创建固定类型长度容量的slice
// make([]T, len) make([]T, len, cap) make([]T, cap)[:len]

// * append
// ! append用来将元素追加到slice后面

// * map (散列表)
// ! 拥有键值对元素的无序集合，键值对都分别具有相同的类型
// ! delete 可以删除一个元素
// ! map元素不是一个变量不能获取对应指针地址
// ! 迭代顺序不是固定
// ! 设置元素之前必须先初始化（查找删除或者map元素个数可以在map为nil上进行）
// ! 不可比较

// * 结构体
// ! 结构体是将零个或者多个任意类型命名变量组合在一起的聚合类型，每个变量叫做结构体成员
// ! 不能循环定义但是可以定义S的指针类型
// ! 结构体中的成员变量的顺序对于结构体的同一性是很重要的
// ! 成员变量首字母是大写，变量是可以导出去的
// ! 可以匿名

func main() {
	// array_test()
	// hashCompare()
	// zero1(ptr)
	// zero2(&ptr)
	// test_slice()
	// a := [...]int{0, 1, 2, 3, 4, 5}
	// fmt.Println(reverse(a[:]))
	// test_append()
	// aa := [2]int{}
	// bb := aa[:]
	// bb = appendInt(bb, 1)
	// bb = appendInt(bb, 2)
	// bb = appendInt(bb, 3)
	// fmt.Println(bb)
	// cc := appendIntBatch(bb, 1, 2, 3)
	// fmt.Println(cc)
	// test_noempty()
	// test_rotate()
	// test_trim()
	// test_map()
	// test_graph()
	// test_struct()
	test_treesort()
}

func array_test() {
	var a [3]int
	fmt.Println(a[0])
	fmt.Println(a[len(a)-1])
	for i, v := range a {
		fmt.Printf("index%d\tvalue%d\n", i, v)
	}
	var b [3]int = [3]int{'a', 'b', 'c'}
	fmt.Println(b)

	q := [...]int{1, 2, 3}
	fmt.Printf("%T\n", q)

	type Currency int
	const (
		USD Currency = iota
		EUR
		GBP
		RMB
	)

	// * 索引可以按照任意顺序出现，并且可以省略
	symbol := [...]string{USD: "$", EUR: "€", GBP: "£", RMB: "¥"}
	fmt.Println(RMB, symbol[3])
	r := [...]int{99: -1}
	for i, v := range r {
		fmt.Println(i, v)
	}

	// * 数组类型相等（数组元素类型和长度相等）是可以比较的
	aa := [2]int{1, 2}
	bb := [...]int{1, 2}
	cc := [2]int{1, 3}
	fmt.Println("array equal")
	fmt.Println(aa == bb, aa == cc, bb == cc)
	// ! [3]int{} [2]int{} 比较会编译报错
	// dd := [3]int{1, 2}
	// fmt.Println(aa == dd)
}

func hashCompare() {
	c1 := sha256.Sum256([]byte("x"))
	c2 := sha256.Sum256([]byte("X"))
	data := []byte("hello world")
	c3 := base64.StdEncoding.EncodeToString(data)

	fmt.Printf("%x\n%x\n%t\n%T\n", c1, c2, c1 == c2, c1)
	fmt.Println(c3)
}

// ! 显式的传递传递指针（go数组用的是值传递）
var ptr [3]int = [3]int{1, 2, 3}

func zero1(p [3]int) {
	p[0] = 2
	fmt.Println(ptr, p)
}
func zero2(p *[3]int) {
	p[0] = len(p)
	fmt.Println(p, ptr)
}

func test_slice() {
	alphabet := [...]string{1: "a", 2: "b", 3: "c", 4: "d", 5: "f"}
	q := alphabet[2:4]
	m := alphabet[:3]
	fmt.Println(q, m)

	// ! 引用对象超过了capacity会宕机
	// fmt.Println(m[:20])
	// ! 引用超过了m的len会扩展slice
	n := m[:4]
	fmt.Println(n)

	var s []int
	s = nil        // len(s) == 0 s == nil
	s = []int(nil) // len(s) == 0 s == nil
	s = []int{}    // len(s) == 0 s != nil
	fmt.Println(s)
}

func reverse(s []int) []int {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[j], s[i] = s[i], s[j]
	}
	return s
}

func test_append() {
	var runes []rune
	for _, r := range "hello,世界" {
		runes = append(runes, r)
	}
	var runes2 = []rune("hello,世界")
	fmt.Printf("%q\n", runes)
	fmt.Printf("%q\n", runes2)
}

// ! 无法保证append之后的原始数组是否已经改变所以每次调用都要重新赋值
func appendInt(x []int, y int) []int {
	var z []int
	zlen := len(x) + 1
	if zlen <= cap(x) {
		z = x[:zlen]
	} else {
		// 容量不够扩容数组
		zcap := zlen
		if zcap < 2*len(x) {
			zcap = 2 * len(x)
		}
		z = make([]int, zlen, zcap)
		// ! 为相同类型的slice复制元素
		copy(z, x)
	}
	z[len(x)] = y
	return z
}

func appendIntBatch(x []int, y ...int) []int {
	var z []int
	zlen := len(x) + len(y)

	if zlen <= cap(x) {
		z = x[:zlen]
	} else {
		// 容量不够扩容数组
		zcap := zlen
		if zcap < 2*len(x) {
			zcap = 2 * len(x)
		}
		z = make([]int, zlen, zcap)
		// ! 为相同类型的slice复制元素
		copy(z, x)
	}
	copy(z[len(x):], y)
	return z
}

func test_noempty() {
	var str string = "abcd ef gh"
	r := noempty(strings.Split(str, ""))
	fmt.Printf("%q", r)
}

func noempty(strings []string) []string {
	i := 0
	for _, s := range strings {
		if s != " " {
			// ? 重用了底层数组
			strings[i] = s
			i++
		}
	}
	return strings[:i]
}

func rotate(a []int) []int {
	for i, j := 0, len(a)-1; i <= j; i, j = i+1, j-1 {
		a[i], a[j] = a[j], a[i]
	}
	return a
}

func test_rotate() {
	a := [...]int{1, 2, 3, 4, 5}
	fmt.Println(rotate(a[:]))
}

func remove(slice []string, i int) []string {
	copy(slice[i:], slice[i+1:])
	return slice[:len(slice)-1]
}

func trim_repeat(s []string) []string {
	var k []string
	for i := 0; i < len(s); i++ {
		if len(k) == 0 || k[len(k)-1] != s[i] {
			k = append(k, s[i])
		}
	}
	return k
}

func test_trim() {
	var s = "aaaaaabcc"
	ss := strings.Split(s, "")
	ss = trim_repeat(ss)

	fmt.Println(ss)
}

func test_map() {
	ages := map[string]int{
		"alice": 31,
		"adam":  34,
	}

	ages2 := make(map[string]int)
	ages2["alice"] = 31
	ages2["adam"] = 34

	fmt.Printf("%v\t%v", ages, ages2)

	delete(ages, "alice")
	fmt.Println(ages)

	for k, v := range ages2 {
		fmt.Println(k, v)
	}

	// 显式的排序
	var names []string
	for name := range ages2 {
		names = append(names, name)
	}

	sort.Strings(names)
	for _, name := range names {
		fmt.Printf("%s\t%d\n", name, ages[name])
	}

	age, ok := ages2["haha"]
	if !ok {
		fmt.Printf("%s不在ages中\n", "haha")
	}
	fmt.Println(age)

	fmt.Println(map_equal(ages, ages2))
}

func map_equal(x, y map[string]int) bool {
	if len(x) != len(y) {
		return false
	} else {
		for k, xv := range x {
			if yv, ok := y[k]; !ok || yv != xv {
				return false
			}
		}
	}
	return true
}

func test_graph() {
	var graph = make(map[string]map[string]bool)
	addEdge(graph, "a", "b")
	addEdge(graph, "a", "c")
	addEdge(graph, "b", "c")
	fmt.Printf("%v", graph)
}

func addEdge(graph map[string]map[string]bool, from, to string) {
	edges := graph[from]
	if edges == nil {
		edges = make(map[string]bool)
		graph[from] = edges
	}
	edges[to] = true
}

func hasEdge(graph map[string]map[string]bool, from, to string) bool {
	return graph[from][to]
}

// 结构体
func test_struct() {
	type Employee struct {
		ID                int
		Name, Address     string
		DoB               time.Time
		Position          string
		Salary, ManagerID int
		sibling           *Employee
		children          []Employee
	}
	var dilbert Employee
	dilbert.Name = "waha"
	dilbert.Salary = 1000
	position := &dilbert.Position
	*position = "senior" + *position
	fmt.Println(dilbert)
	fmt.Printf("dilbert %v\n", dilbert.Salary)

	var employeeOfTheMonth *Employee = &dilbert
	employeeOfTheMonth.Position += "team player"
}

type tree struct {
	value       int
	left, right *tree
}

func test_treesort() {
	arr := []int{3, 2, 1, 5, 4, 0}
	arr = Sort(arr)
	fmt.Println(arr)
}

func Sort(values []int) []int {
	var root *tree
	for _, v := range values {
		root = add(root, v)
	}
	values = appendValues(values[:0], root)
	return values
}

func appendValues(values []int, t *tree) []int {
	if t != nil {
		values = appendValues(values, t.left)
		values = append(values, t.value)
		values = appendValues(values, t.right)
	}
	return values
}

func add(t *tree, value int) *tree {
	if t == nil {
		t = new(tree)
		t.value = value
		return t
	}
	if value < t.value {
		t.left = add(t.left, value)
	} else {
		t.right = add(t.right, value)
	}
	return t
}
