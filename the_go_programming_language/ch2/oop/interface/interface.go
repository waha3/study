package _interface

import (
	"flag"
	"fmt"
	"time"
)

// ! 接口
// 是隐式的实现的，具体的类型无需申明他实现了那些接口，只要提供接口所必须要的方法

// ! 接口类型

func parse() {
	var period = flag.Duration("period", 1*time.Second, "sleep period")

	flag.Parse()
	fmt.Printf("Sleeping for %v...", *period)
	time.Sleep(*period)
	fmt.Println()
}

type StringSlice []int

func (p StringSlice) Len() int {
	return len(p)
}

func (p StringSlice) Less(i, j int) bool {
	return p[i] < p[j]
}

func (p StringSlice) Swap(i, j int) {
	p[i], p[j] = p[j], p[i]
}
