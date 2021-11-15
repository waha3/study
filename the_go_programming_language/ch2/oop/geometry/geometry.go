package geometry

import (
	"image/color"
	"math"
	"sync"
)

type Point struct {
	X, Y float64
}

func Distance(p, q Point) float64 {
	return math.Hypot(q.X-p.X, q.Y-p.Y)
}

// p是方法的接收者
func (p Point) Distance(q Point) float64 {
	return math.Hypot(q.X-p.X, q.Y-p.Y)
}

type Path []Point

// go中非结构体类型也可以绑定（除了指针类型和接口类型）
func (path Path) Distance() float64 {
	sum := 0.0
	for i := range path {
		if i > 0 {
			sum += path[i-1].Distance(path[i])
		}
	}
	return sum
}

// 指针接收者的方法
// 方法名是(p *Point).ScaleBy
func (p *Point) ScaleBy(factor float64) {
	p.X *= factor
	p.Y *= factor
}

// 指针类型不能用于接收类型
// type P *int
// func (p P) f() {}

// nil 是一个合法的接收者
type IntList struct {
	Value int
	Tail  *IntList
}

func (list *IntList) Sum() int {
	if list == nil {
		return 0
	}
	return list.Value + list.Tail.Sum()
}

// 结构体内嵌组成类型
type ColoredPoint struct {
	Point
	Color color.RGBA
}

func (p ColoredPoint) Distance(q Point) float64 {
	return p.Point.Distance(q)
}

func (p *ColoredPoint) ScaleBy(factor float64) {
	p.Point.ScaleBy(factor)
}

var (
	mu      sync.Mutex
	mapping = make(map[string]string)
)

func LookUp(key string) string {
	mu.Lock()
	v := mapping[key]
	mu.Unlock()
	return v
}

var cache = struct {
	sync.Mutex
	mapping map[string]string
}{
	mapping: make(map[string]string),
}

// ! 方法变量与表达式
