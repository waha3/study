package main

import (
	"crypto/sha256"
	"encoding/base64"
	"fmt"
)

// 复合数据类型

// * 数组
// ! 数组是具有固定长度且拥有0个或者多个相同的数据类型元素序列
// ! 每个元素通过索引访问
// ! 默认情况新数组初始值是0
// ! 字面量表示
// ! 省略号的作用: 数组的长度有初始化时元素的数量决定
// ! 数组的长度必须是常量

func main() {
	// array_test()
	hashCompare()
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
