package main

import "os"

// 作用域
// 声明的作用域是指用到声明时所声明名字的源代码段
// 作用域是一个编译时属性
// 生命周期是一个运行时

// 语法块（block）
// 语法块内部的声明对外部不可见 => 推广到其他没有显示包含在大括号内的声明代码称为词法块
// 包含了全部源码词法块叫做全局块
// for if swicth以及switch和select语句中的每一个条件，都是在词法块里
// int len true等内置类型 函数 变量在全局块中
// 包级别的声明（函数体外）可以包中其他文件引用（需要先import）
// 包级别的声明顺序和他们的作用域没有关系

// 控制流标签 break continue goto的标签 作用域是外层函数

// 当编译器遇到一个名字的引用时 将从最内层的封闭词法块到全局块寻找声明 如果没有找报 undeclared name
// 如果内外层都有声明使内层的将覆盖外层声明

// func f() {}

// var g = "g"

func main() {
	// f := "f"
	// fmt.Println(f)
	// fmt.Println(g)
	// fmt.Println(h) // undefined h

	blockNest()
}

func blockNest() error {
	// x := "hello!"
	// for i := 0; i < len(x); i++ {
	// 	x := x[i]
	// 	if x != '!' {
	// 		x := x + 'A' - 'a'
	// 		fmt.Printf("%c", x)
	// 	}
	// }

	// if f, err := os.Open("./struct.go"); err != nil {
	// 	return err
	// }
	// f.Stat()   undefined f
	// f.Close()  undefined f

	if f, err := os.Open("./struct.go"); err != nil {
		return err
	} else {
		f.Stat()
		f.Close()
	}
	return nil
}



