package main

// 命令行os.Args是个字符串slice s[m,n)
// os.Args 第一个参数是命令本身，其他是命令行输入的参数

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
)

func main() {
	// 隐式的初始化为空值 数字类型初始化为0 字符串为""
	// +号可以连接字符串
	// := 短变量声明, 根据初始化的值给予合适的类型
	// for initialization; condition; post {}
	// for中三部分都是可以省略的
	// var s, sep string
	// for i := 1; i < len(os.Args); i++ {
	// 	s = s + sep + os.Args[i] + "\n"
	// 	sep = ""
	// }

	// go 不准许存在无用的临时变量 解决方法是使用_(空标识符)
	// for _, arg := range os.Args[1:] {
	// 	s += sep + arg
	// 	sep = ""
	// }
	// fmt.Println(s)

	// string.Join() 书上说性能更好 应该是内存的开销更小
	// fmt.Println(strings.Join(os.Args[1:], "\n"))

	// 任何slice可以用[a, b,...,x]的方式输出
	// fmt.Println(os.Args[1:])

	// for index, arg := range os.Args[0:] {
	// 	fmt.Println(index, arg)
	// }

	// dup1()
	dup2()
	// read_and_write_file()
}

func dup1() {
	// 找出重复行
	// map的key是任何可以进行==比较的任意类型
	// map默认key的类型是string,值的类型是int
	// make可以新建map
	// map中key的迭代顺序是随机的 （应该是随机性的key 这样map在期望上可以到达常数）
	counts := make(map[string]int)

	// 高效处理的输入输出
	// scanner 以行或者单词为单位断开
	input := bufio.NewScanner(os.Stdin)
	// 读取下一行 并将结尾的换行符去掉 读取到新行的时候返回true，没有读到返回false
	// 相当于 whlie true (go 里面没有while)
	for input.Scan() {
		// input.Text() 获取读的内容
		counts[input.Text()]++
	}

	for line, n := range counts {
		if n > 1 {
			// 类c返回格式化的输出
			// verb
			// %d            十进制整数
			// %x，%o，%b     十六进制，八进制，二进制
			// %f，%g，%e     浮点数 double float， 科学计数
			// %t            布尔值
			// %c            字符（unicode码点）
			// %s            字符串
			// %q            带引号的字符串
			// %v            内置格式的任何值
			// %T            任何值的类型
			// %%            %本身
			fmt.Printf("%d\t%s\n", n, line)
		}
	}
}

// 书上的代码有点问题
func dup2() {
	// map是一个使用make的创建的数据结构应用
	counts := make(map[string]int)
	files := os.Args[1:]

	if len(files) == 0 {
		countLines(os.Stdin, counts)
	} else {
		for _, arg := range files {
			// Open 返回两个值 一个是打开文件的指针os.File, 另一个是内置的error类型
			f, err := os.Open(arg)
			if err != nil {
				fmt.Fprintf(os.Stderr, "dup2: %v\n", err)
				continue
			}
			countLines(f, counts)
			f.Close()
		}
	}

	for line, n := range counts {
		if n > 0 {
			fmt.Printf("%d\t%s\n", n, line)
		}
	}
}

// 函数的提升
func countLines(f *os.File, counts map[string]int) {
	fmt.Printf("f: %T", f)

	input := bufio.NewScanner(f)

	for input.Scan() {
		// 修改的引用
		counts[input.Text()]++
	}
}

// 流失读取
func dup3() {
	counts := make(map[string]int)
	for _, filename := range os.Args[1:] {
		// ReadFile函数返回一个可以转化成字符串的字节slice
		data, err := ioutil.ReadFile(filename)
		if err != nil {
			fmt.Fprintf(os.Stderr, "dup3: %v\n", err)
			continue
		}

		for _, line := range strings.Split(string(data), "\n") {
			counts[line]++
		}
	}

	for line, n := range counts {
		if n > 1 {
			fmt.Printf("%d\t%s\n", n, line)
		}
	}
}

func read_and_write_file() {
	f, err := os.Open("index.go")
	if err != nil {
		// Fprintln采用默认格式将其参数格式化并写入w。总是会在相邻参数的输出之间添加空格并在输出结束后添加换行符。返回写入的字节数和遇到的任何错误。
		fmt.Fprintf(os.Stderr, "error: %v", err)
	}

	input := bufio.NewScanner(f)
	for input.Scan() {
		fmt.Println(input.Text())
	}
}
