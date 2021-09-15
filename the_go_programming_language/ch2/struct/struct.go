package main

import (
	"flag"
	"fmt"
	"os"
	"strings"
)

// 程序结构

/*
	名称 25个关键字
	常量: true false iota nil
	类型: int int8 int16 int32 int64 unit unit8 unit16 unit32 unit64 unitptr
			  float32 float64 complex32 complex64
	      bool byte rune string error
	函数: make len cap new append copy close delete complex real imag panic recover\

	实体（？可能是变量的意思吧） 在函数内声明 只有在函数局部有效 在函数外面，他将对包内的所有源文件可见
	实体的第一个字母大小写决定了可见性是否可以跨包，大写开头，对外包可见可访问
*/

// 四种变量声明 var const type func

// go中声明的浮点数默认类型是float64
const boilingF = 2.0

func main() {
	// var f = boilingF
	// var c = fToC(f)
	// fmt.Printf("boiling point = %gF or %gC\n", f, c)
	// pointer()
	// pointer2()
	// pointer3()
	// echo()
	// new_feature()
	// fmt.Println(gcd(10, 4))
	// fmt.Println(fib(4))
	// var a Fahrenheit = CToF(10)
	// var b = Fahrenheit(a + 1)
	// fmt.Println(b)
	type_value_compare()
}

func fToC(f float64) float64 {
	return (f - 32) * 5 / 9
}

// 变量
// var 创造了一个具体类型的变量
// var name type = expression
// 表达式省略对应初始类型的零值 bool = false number = 0 string = ""
// 引用类型 slice 指针 map 通道 函数 默认值是nil
var i, j, k int
var b, f, s = true, 2.3, "four"
var file, err = os.Open("./struct.go")

// 短变量的申明
// 只能作为局部变量 不能在函数体外部申明
// 短变量的声明不需要声明所有左边的变量 如果一些变量在同一个语法块中 那么短声明行为等于赋值
// name := expression

// 指针
// 指针的值是一个变量的地址 使用指针可以间接读取更新变量的值
// 使用“&”操作符可以获取变量的地址，使用“*”操作符可以获取指针引用变量的值 但是指针不能进行算数运算（和c语言不一样）
// c语言中指针地址的偏移可以获取到其他变量的值
func pointer() {
	x := 1
	p := &x
	fmt.Println(p)
	fmt.Println(*p)
	*p = 2
	fmt.Println(x)

	var m, n int
	fmt.Println(&m == &m, &m == &n, &n == nil)
}

func ff() *int {
	v := 1
	return &v
}

func pointer2() {
	// var p = ff()
	fmt.Println(ff() == ff())
}

func pointer3() {
	v := 1
	a := incr(&v)
	fmt.Println(a)
}

func incr(p *int) int {
	*p++
	return *p
}

// echo 函数
func echo() {
	// 创建一个新的布尔标识变量。1.标识的名称 2.变量默认值 3.用户提供了非法的标识 非法参数或者-h
	var n = flag.Bool("n", false, "omit trailing newline")
	// 用三种参数来创建一个字符串变量
	var sep = flag.String("s", "😄", "separator")

	// 更新标识变量的默认值 parse遇到错误会exit(2)
	flag.Parse()
	fmt.Print(strings.Join(flag.Args(), *sep))
	if !*n {
		fmt.Println()
	}
}

// new 函数
// 创建变量 new(T) 使用new创建的变量和取其地址的普通局部变量一样

func useNew() {
	p := new(int)
	fmt.Println(*p)
	*p = 2
	fmt.Println(*p)
}

func newInt1() *int {
	return new(int)
}

func newInt2() *int {
	var dummy int
	return &dummy
}

// 1和2具有相同的行为
func new_feature() {
	p := new(int)
	q := new(int)

	m := new(struct{})
	n := new(struct{})

	fmt.Println(p == q)
	fmt.Println(m == n)
}

// new 不是一个关键字 是一个预声明的函数
// 函数内的new是不可用的
func delta(old, new int) int {
	return new - old
}

// 变量的生命周期
// 包级变量的生命周期是整个程序的执行时间， 局部变量有个动态的生命周期，每次执行创建一个新的实体
// 变量不可访问时， 存储空间会被回收，函数的参数和返回值也是局部变量，他们在其背包函数背调用时创建
// 垃圾回收的基本思路是，每个包级别的变量和局部变量可以作为源头，通过指针和其他方式来追踪，如果变量的路径不存在
// 变量变得不可访问

var global *int

func fn() {
	// x使用了堆空间 因为x执行完了 可以通过gloabl继续访问 x发生逃逸
	var x int
	x = 1
	global = &x
}

func g() {
	y := new(int)
	*y = 1
}

// 赋值
// x = 1
// *p = true
// person.name = "bob"
// count[x] = count[x] * scale

// 多重赋值
// x, y = y, x
// a[i], a[j] = a[j], a[i]
// 对于函数的返回值，左边的变量个数需要和函数返回值一样
// _, err = io.Copy(dst, src) 丢弃不需要的参数

// 计算最大公约数
func gcd(x, y int) int {
	for y != 0 {
		x, y = y, x%y
	}
	return x
}

func fib(n int) int {
	x, y := 0, 1
	for i := 1; i < n; i++ {
		x, y = y, x+y
	}
	return x
}

// 可赋值性
// 赋值语句是显示的赋值， 还有很多地方是隐式的赋值
// 1. 函数调用隐式的将参数的值赋给对应的变量
// 2. return 语句将结果赋给变量
// 3. 复合类型的字面量表达式

// 类型声明
// type定义一个新的命名类型 区分底层类型 type name underlying-type
type Celsius float64
type Fahrenheit float64

const (
	AbsoluteZeroC Celsius = -273.15
	FreezingC     Celsius = 0
	Boiling       Celsius = 100
)

func CToF(c Celsius) Fahrenheit {
	// 不能使用算术表达式进行比较合并
	// 类型转换
	return Fahrenheit(c*9/5 + 32)
}

func FToC(f Fahrenheit) Celsius {
	return Celsius((f - 32) * 5 / 9)
}

// 类型转换
// 数字之间类型转换， 字符串和一个slice类型之间转换是允许的
// 通过 == 和 < 之间的比较操作符 命名类型的值可以与其相同类型的底层的值进行比较
// 不同命名类型之间是不能比较的

func type_value_compare() {
	var c Celsius
	var f Fahrenheit
	fmt.Println(c == 0)
	fmt.Println(f >= 0)
	// 编译错误
	// fmt.Println(c == f)
	fmt.Println(c == Celsius(f))
}

func SayHello() {
	fmt.Println("hello!")
}
