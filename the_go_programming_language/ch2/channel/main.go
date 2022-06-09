package main

import (
	"fmt"
	"io"
	"log"
	"net"
	"os"
)

// ! channel 就是goroutine的链接 每个channel就是一个具体的类型的导管
// ! op: send and operate
func main() {
	// netcat()
	// pipe()
	// closeablePipe()
	singlePipeLine()
}

func base(x int) {
	// init
	ch := make(chan int)

	// send
	ch <- x
	// 赋值的接收表达式
	x = <-ch
	// 接收语句 丢弃结果
	<-ch
	// close
	close(ch)

	// 无缓冲
	noBufferChan := make(chan int)
	_noBufferChan := make(chan int, 0)
	// 有缓冲
	bufferChan := make(chan int, 3)

	fmt.Println(noBufferChan, _noBufferChan, bufferChan)
}

// 无缓冲通道
func netcat() {
	connect, err := net.Dial("tcp", "localhost:8000")
	if err != nil {
		log.Fatal(err)
	}
	done := make(chan struct{})
	go func() {
		io.Copy(os.Stdout, connect)
		log.Println("done")
		done <- struct{}{}
	}()
	mustCopy(connect, os.Stdin)
	connect.Close()
	<-done
}

func mustCopy(dst io.Writer, src io.Reader) {
	if _, err := io.Copy(dst, src); err != nil {
		log.Fatal(err)
	}
}

// PIPELINE
func pipe() {
	naturals := make(chan int)
	squares := make(chan int)

	go func() {
		for x := 0; ; x++ {
			naturals <- x
		}
	}()

	go func() {
		for {
			x := <-naturals
			squares <- x * x
		}
	}()

	for {
		fmt.Println(<-squares)
	}
}

func closeablePipe() {
	naturals := make(chan int)
	squares := make(chan int)

	go func() {
		for x := 0; x < 100; x++ {
			naturals <- x
		}
		close(naturals)
	}()

	go func() {
		for x := range naturals {
			squares <- x * x
		}
		close(squares)
	}()

	for x := range squares {
		fmt.Println(x)
	}
}

// 单向通道
func counter(out chan<- int) {
	for x := 0; x < 100; x++ {
		out <- x
	}
	close(out)
}

func squarer(out chan<- int, in <-chan int) {
	for v := range in {
		out <- v * v
	}
	close(out)
}

func printer(in <-chan int) {
	for v := range in {
		fmt.Println(v)
	}
}

func singlePipeLine() {
	naturals := make(chan int)
	squares := make(chan int)

	go counter(naturals)
	go squarer(squares, naturals)
	printer(squares)
}

// ! 缓冲通道 其有一个元素队列 发送的时候再队列的尾部插入一个元素 接收再队列的头部移除一个元素

// ! 并行循环

// ! 使用select多路复用



