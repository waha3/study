package main

import (
	"fmt"
	"image"
	"image/color"
	"image/png"
	"log"
	"math"
	"math/cmplx"
	"net/http"
	"os"
)

func main() {
	// overflow()
	// bitset()
	// radix()
	// runeLiteral()
	// floatEx()
	// plural()
	// draw_mandelbrot()
	// draw_juliaSet()
	server()
}

// 数据类型分为四大类（基础类型，聚合类型，引用类型，接口类型）
// 基础类型 number string boolean
// 聚合类型 array struct
// 引用类型 pointer slice map function channel

// 整数
// init8 int16 int32 int64 uint8 unit16 unit32 uint64
// int和unit类型在特定的平台上大小与原生的有符号无符号整数相同，或者等于运行效率最高的值 可能是32或者64位
// rune类型int32的同义词用来指明一个unicode码点 byte是unit8的同义词
// uintptr无符号整数 大小不明确 但是可以完整存指针
// 有符号整数以补码显示保留最高位作为符号位 n位数字取值范围 -2 ** (n - 1) ~ 2 ** (n - 1) - 1
// 无符号范围 0 ~ 2 ** n - 1

// 补码 x = {x(w-1),...,x0} => -x(w-1) * 2 ** (w-1) + ∑(i=0 -> w-2) x(i) * 2 ** i

// 操作符优先级
/*
/   %    <<    >>    &   &^
+   -     |    ^
==  !=   <     <=    >   >=
&&
||
*/

// 取模余数的正负号与被除数一直
// 溢出时高位丢弃

func overflow() {
	var u uint8 = 255
	fmt.Println(u, u+1, u*u)
	var i int8 = 127
	fmt.Println(i, i+1, i*i)
}

// 位运算
// & and  | or   ^ xor &   ^ and not   << left move    >> right move
// xor 表示按位取反或者按位取补
// &^ 按位清空 z=x&^y 表示y某位是1 z对应位是0 否则就等于x的对应位置

func bitset() {
	var x uint8 = 1<<1 | 1<<5
	var y uint8 = 1<<1 | 1<<2
	fmt.Printf("%08b\n", x)
	fmt.Printf("%08b\n", y)
	fmt.Printf("%08b\n", x&y)
	fmt.Printf("%08b\n", x|y)
	fmt.Printf("%08b\n", x^y)
	fmt.Printf("%08b\n", x&^y)

	for i := uint(0); i < 8; i++ {
		if x&(1<<i) != 0 {
			fmt.Println(i)
		}
	}

	fmt.Printf("%08b\n", x<<1)
	fmt.Printf("%08b\n", x>>1)
}

// 浮点型转整型会舍弃掉小数部分
// 八进制0开头 十六进制0x 0X
func radix() {
	o := 0666
	fmt.Printf("%d %[1]o %#[1]o\n", o)
	x := int64(0xdeadbeef)
	// [1] 重复使用第一个操作数 #告知输出对应的前缀
	fmt.Printf("%d %[1]x %#[1]x %#[1]X\n", x)
}

// 文字符号 （rune literal）形式的字符写在单引号中
func runeLiteral() {
	ascii := 'a'
	unicode := '国'
	newline := '\n'
	fmt.Printf("%d %[1]c %[1]q\n", ascii)
	fmt.Printf("%d %[1]c %[1]q\n", unicode)
	fmt.Printf("%d %[1]q\n", newline)
}

// 浮点数 float32 float64 ie754标准
func floatEx() {
	for x := 0; x < 8; x++ {
		fmt.Printf("x=%d ex=%8.3f\n", x, math.Exp(float64(x)))
	}

	var z float64
	fmt.Println(z, -z, 1/z, z/z)

	var nan = math.NaN()
	fmt.Println(nan == nan, nan < nan, nan > nan)
}

// 复数
// complex64 complex128 两者分别由 float32 float64构成
// complex函数创建实部和虚部 real函数和imag函数分别提取实部和虚部
// 浮点数或者10进制数如果后面紧跟着i就变成了一个虚数

func plural() {
	var x complex128 = complex(1, 2)
	var y complex128 = complex(3, 4)
	fmt.Println(x * y)
	fmt.Println(real(x * y))
	fmt.Println(imag(x * y))
}

// 分形图
func draw_mandelbrot() {
	const (
		xmin, ymin, xmax, ymax = -2, -2, +2, +2
		width, height          = 1024, 1024
	)
	// NewRGBA returns a new RGBA image with the given bounds.
	img := image.NewRGBA(image.Rect(0, 0, width, height))
	for py := 0; py < height; py++ {
		y := float64(py)/height*(ymax-ymin) + ymin
		for px := 0; px < width; px++ {
			x := float64(px)/width*(xmax-xmin) + xmin
			z := complex(x, y)
			img.Set(px, py, mandelbrot(z))
		}
	}
	png.Encode(os.Stdout, img)
}

// fc(z) = z ** 2 + c
func mandelbrot(z complex128) color.Color {
	const iterations = 200
	const contrast = 15

	var v complex128
	for n := uint8(0); n < iterations; n++ {
		v = v*v + z
		if cmplx.Abs(v) > 2 {
			return color.Gray{255 - contrast*n}
		}
	}
	return color.Black
}

// 朱丽亚集 fc(z) = z ** 2 + c

func draw_juliaSet() {
	const (
		xmin, ymin, xmax, ymax = -2, -2, +2, +2
		width, height          = 256, 256
	)
	img := image.NewNRGBA(image.Rect(0, 0, width, height))
	for py := 0; py < height; py++ {
		// y := float64(py)/height*(ymax-ymin) + ymin
		for px := 0; py < width; px++ {
			// x := float64(px)/width*(xmax-xmin) + xmin
			// z := complex(x, y)
			img.Set(px, py, color.NRGBA{
				R: uint8((px + py) & 255),
				G: uint8((px + py) << 1 & 255),
				B: uint8((px + py) << 2 & 255),
				A: 255,
			})
		}
	}
	png.Encode(os.Stdout, img)
}

func juliaSet(z complex128) color.Color {
	const iterations = 200
	const contrast = 15
	var c complex128
	for i := uint8(0); i < iterations; i++ {
		c = z*z + c
		if cmplx.Abs(c) > 2 {
			return color.Gray{contrast * i % 255}
		}
	}
	return color.Black
}

func server() {
	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe("0.0.0.0:8000", nil))
}

// TODO
func handler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query()
	fmt.Println(query)
	// x, y, scale := int(query["x"]), int(query["y"]), int(query["scale"])
	// draw_mandelbrot2(w, x, y, scale)
}

func draw_mandelbrot2(w http.ResponseWriter, x, y, scale int) {
	// const (
	// 	xmin, ymin, xmax, ymax = -2, -2, +2, +2
	// )
	// width, height := x, y
	// // NewRGBA returns a new RGBA image with the given bounds.
	// img := image.NewRGBA(image.Rect(0, 0, width, height))
	// for py := 0; py < height; py++ {
	// 	y := float64(py)/height*(ymax-ymin) + ymin
	// 	for px := 0; px < width; px++ {
	// 		x := float64(px)/width*(xmax-xmin) + xmin
	// 		z := complex(x, y)
	// 		img.Set(px, py, mandelbrot(z))
	// 	}
	// }
	// png.Encode(w, img)
}


