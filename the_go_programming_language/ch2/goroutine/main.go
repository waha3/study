package main

import (
	"fmt"
	"gor/clock"
	"time"
)

// goroutine an channel 两种并发编程风格

func main() {
	// go spinner(100 * time.Microsecond)
	// const n = 45
	// fibN := fib(n)
	// fmt.Printf("\rFibonacci(%d) = %d\n", n, fibN)

	_clock.Clock()
	// _clock.Clock2()
}

func spinner(delay time.Duration) {
	for {
		for _, r := range `-\|/` {
			fmt.Printf("\r%c", r)
			time.Sleep(delay)
		}
	}
}

func fib(x int) int {
	if x < 2 {
		return x
	}
	return fib(x-1) + fib(x-2)
}
