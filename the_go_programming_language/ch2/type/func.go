package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"
)

// ! 函数
// func name(parameter-list) (result-list) {
// 	body
// }
// 函数的类型叫做函数签名，当两个函数拥有相同的形参列表和返回列表时，这两个函数的签名或者类型相同
// 没有默认参数值
// 形参变量是函数的局部变量
// 参是按值传递，所以函数接受的是调用者提供的副本 如果是引用类型可能会修改原始参数

// ! 递归
// 函数可以递归调用
// golang使用了可变长度的栈，最多可达到1gb

// ! 多返回值
// 裸返回：一个函数如果有命名的返回值，可以省略操作数（还是少用吧）

// ! 错误
// error 是内置的接口类型
// 空值意味着成功，非空值意味着失败, 非空错误类型有个错误的字符串，可以通过的fmt.Printf("%s", err) 直接输出
// go语言是用普通纸而非异常来报告错误（语言中有异常机制，但是只是处理代码的bug，不能作为程序的错误）

// ! 错误处理的策略
// 1 传递错误 return err
// 2 构造新的错误信息 fmt.Error  fmt.Error使用fmt.Sprintf函数格式化一条错误信息并返回一个新的错误错误值
// 错误信息可以不断的叠加上下文信息
// 3 重试一定次数后再
// 自定义log包前缀 log.SetPrefix("wait ") log.SetFlags(0)
// 4 记录日志程序继续执行
// 5 文件结束符标志 EOF

// ! 函数变量
// 函数类型的零值是nil
// 函数本身不可以比较

// ! 匿名函数
// 命名函数只能在包级别的作用于进行声明，但是我们可以使用函数字面量在任何表达式内指定函数变量
// 可以作为闭包
// 匿名函数递归时需要先給其赋值

func main() {
	// if err := waitForServer("https://www.bilibili.co/"); err != nil {
	// 	fmt.Fprintf(os.Stderr, "site is down: %v\n", err)
	// 	os.Exit(1)
	// }

	// test_EOF()
	// testStringMap()
	test_anonymousfn()
}

func waitForServer(url string) error {
	const timeout = 1 * time.Minute
	deadline := time.Now().Add(timeout)
	for tries := 0; time.Now().Before(deadline); tries++ {
		fmt.Printf("tries %d\n", tries)
		data, err := http.Head(url)
		if err == nil {
			fmt.Println(data)
			return nil
		}

		log.Printf("server not responding (%s); retrying...", err)
		// 指数退避策略
		time.Sleep(time.Second << uint(tries))
	}
	return fmt.Errorf("server %s not failed to respond after %s", url, timeout)
}

func test_EOF() error {
	in := bufio.NewReader(os.Stdin)

	for {
		r, _, err := in.ReadRune()
		if err == io.EOF {
			break // 结束
		}
		if err != nil {
			return fmt.Errorf("read failed：%v\n", err)
		}
		fmt.Println(r)
	}
	return nil
}

func add1(r rune) rune {
	return r + 1
}

func testStringMap() {
	// strings.Map 对每个字符使用一个函数将结果拼接
	fmt.Println(strings.Map(add1, "HAL-9000"))
}

func test_anonymousfn() {
	str := strings.Map(func(r rune) rune { return r + 1 }, "HAL-9000")
	fmt.Println(str)

	f := squares()
	fmt.Println(f())
}

func squares() func() int {
	var x int
	return func() int {
		x++
		return x * x
	}
}
