package main

import (
	"fmt"
	"math"
)

// 常量
// 可以保证编译阶段就可以计算出表达式 不需要等到运行时 所有常量的本质独属于基本类型：布尔值 字符串 数字
// 常量声明了具名的值 为了防止被修改
// 常量的计算编译期间就可以被检测到
/*
	const pi = 3.14159
	const (
		e  = 2.718
		pi = 3.14
	)
*/

// len cap real imag complex unsafe.Sizeof返回值也是常量
// 常量声明可以同时指定类型和值

// 常量生成器iota 创建一系列相关值 iota从0开始取值逐项增加1相当于枚举
// iota局限性： 不存在指数运算符

// 无类型常量
// 算术精度高于原生机器精度，精度至少达256位
// 从属类型待定常量共有6种
// 1. 无类型布尔 2. 无类型整数 3. 无类型文字符号  4.无类型浮点数 5. 无类型复数 6.无类型文字符号
// 字面量的类型由语法决定 0,0.0,0i,'\u0000'表示全部相同的值但是类型相异分别是 无类型整数 无类型浮点数 无类型复数 无类型文字符号
// 只有常量才可以是无类型的，若将无类常量声明为变量会出现类型转换
// tips: 各类型的不对称性 无类型整数可以转成int 大小不确定, 但是无类型浮点数和无类型复数会被转成大小明确的float64和complex128
//  Go语言中只有大小明确的int类型 没有大小不确定的float类型和complex类型（应该和ie754规范有关系 浮点数的值需要明确知道阶码和尾数）

func main() {
	constDesc()
}

func constDesc() {
	// b会复用的值
	const (
		a = 1
		b
		c = 2
		d
	)
	fmt.Println(a, b, c, d)

	// 枚举
	type Weekday int
	const (
		Sunday Weekday = iota
		Monday
		Tuesday
		Wednesday
		Thursday
		Friday
		Saturday
	)
	fmt.Println(Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday)

	type Flags uint
	const (
		FlagUp Flags = 1 << iota // => 1 << 0 => 1
		FlagBroadcast
		FLagLoopback
	)
	fmt.Println(FlagUp, FlagBroadcast, FLagLoopback)

	const (
		_ = 1 << (10 * iota)
		KiB
		MiB
		GiB
		TiB
		PiB
		EiB
		ZiB
		YiB
	)
	fmt.Println(KiB, MiB, GiB)

	const (
		KB = 1024
		MB = 1024 * 1000
		GB = 1024 * 1000 * 1000
	)
	fmt.Println(KB, MB, GB)
	var pow float64 = math.Pow(2, 10)
	fmt.Println(pow)
	// ZiB YiB的值过大 但是可以运算
	fmt.Println(YiB / ZiB)

	// 从属某个类型进度会下降
	const Pii = math.Pi
	const Pi64 float64 = math.Pi

	var x float32 = float32(Pi64)
	var y float64 = Pi64
	var z complex128 = complex128(Pi64)
	fmt.Println(Pii, Pi64, x, y, z)

	var f float64 = 212
	fmt.Println((f - 32) * 5 / 9)     // (f-32) * 5 => float64
	fmt.Println(5 / 9 * (f - 32))     // 5 / 9  => uint type
	fmt.Println(5.0 / 9.0 * (f - 32)) // 5.0/9.0 => 无类型浮点数

	const (
		deadbeef = 0xdeadbeef        // 无类型整数
		aa       = uint32(deadbeef)  // 无符号32
		bb       = float64(deadbeef) // float32
	)

	fmt.Println("类型转换")
	fmt.Println(deadbeef, aa, bb)
}
