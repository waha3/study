package main

import (
	"fmt"
	"oop/interface"
	"sort"
)

// ! 面向对象
// 方法声明
// 接收者不适用this，self
// go中非结构体类型也可以绑定（除了指针类型和接口类型）

func main() {
	// p := geometry.Point{X: 1, Y: 2}
	// q := geometry.Point{X: 4, Y: 6}
	// fmt.Println(geometry.Distance(p, q))
	// fmt.Println(p.Distance(q))

	// perim := geometry.Path{
	// 	{X: 1, Y: 1},
	// 	{X: 5, Y: 1},
	// 	{X: 5, Y: 4},
	// 	{X: 1, Y: 1},
	// }
	// fmt.Println(perim.Distance())

	// r := &geometry.Point{X: 1, Y: 2}
	// r.ScaleBy(2)
	// fmt.Println(*r)

	// p := geometry.Point{X: 1, Y: 2}
	// pptr := &p
	// pptr.ScaleBy(2)

	// fmt.Println(p)

	// pp := geometry.Point{X: 1, Y: 2}
	// (&pp).ScaleBy(2)
	// fmt.Println(pp)

	// pptr.Distance(pp)

	// =====

	// red := color.RGBA{255, 0, 0, 255}
	// blue := color.RGBA{0, 0, 255, 255}
	// p := geometry.ColoredPoint{Point: geometry.Point{X: 1, Y: 1}, Color: red}
	// q := geometry.ColoredPoint{Point: geometry.Point{X: 5, Y: 4}, Color: blue}
	// p.ScaleBy(2)
	// q.ScaleBy(2)
	// fmt.Println(p.Distance(q.Point))

	// var x, y intset.Inset
	// x.Add(1)
	// x.Add(144)
	// x.Add(9)
	// fmt.Println(x)

	// y.Add(9)
	// y.Add(42)
	// fmt.Println(y.String())

	unsortArr := []int{3, 14, 2, 1}
	sort.Sort(_interface.StringSlice(unsortArr))
	fmt.Println(unsortArr)
}
