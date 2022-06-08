package main

import (
	"fmt"
)

// channel 就是goroutine的链接 每个channel就是一个具体的类型的导管
// op: send and operate
func main() {

}

func base(x int) {
	// init
	ch := make(chan int)

	// send
	ch <- x
	// receive
	x = <-ch
	// 接收
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
