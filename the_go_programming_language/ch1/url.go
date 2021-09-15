package main

import (
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
	"time"
)

func main() {
	fetchAll()
}

func base() {
	for _, url := range os.Args[1:] {
		resp, err := http.Get(url)
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
		}

		// resp.Body 可读数据流
		b, err := ioutil.ReadAll(resp.Body)
		// 关闭链接
		resp.Body.Close()

		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: %s: %v\n", url, err)
			// 返回1强值推出进程
			os.Exit(1)
		}
		fmt.Printf("%s", b)
	}
}

func copy_resp() {
	for _, url := range os.Args[1:] {
		has_prefix := strings.HasPrefix(url, "http")
		if !has_prefix {
			url = "http://" + url
		}

		resp, err := http.Get(url)
		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
		}

		// b, err := ioutil.ReadAll(resp.Body)
		bits, err := io.Copy(os.Stdout, resp.Body)
		if err != nil {
			fmt.Fprintf(os.Stderr, "copy error: %v", err)
		}
		resp.Body.Close()

		if err != nil {
			fmt.Fprintf(os.Stderr, "fetch: %s: %v\n", url, err)
			os.Exit(1)
		}
		fmt.Printf("%d\t%s", bits, resp.Status)
	}
}

// 并发获取url
// goroutine是一个并发的执行程序
// 通道时一种允许某一个例程向另一个例程传递指定类型的值的通信机制
// 一个goroutine 在通道上进行发送或者接收操作时，会阻塞
func fetchAll() {
	start := time.Now()
	// 创建一个字符通道
	ch := make(chan string)
	for _, url := range os.Args[1:] {
		// go 启动一个goroutine
		go fetch(url, ch)
	}

	for range os.Args[1:] {
		// 从通道中接受
		fmt.Println(<-ch)
	}
	// 保留两位小数的浮点数
	fmt.Printf("%.2fs spend\n", time.Since(start).Seconds())

}

func fetch(url string, ch chan<- string) {
	start := time.Now()
	resp, err := http.Get(url)
	if err != nil {
		// 发送到通道
		ch <- fmt.Sprint(err)
		return
	}

	// 输出流进行丢弃
	// Discard是一个io.Writer接口，对它的所有Write调用都会无实际操作的成功返回。
	// 类似于/dev/null中
	nbytes, err := io.Copy(ioutil.Discard, resp.Body)
	resp.Body.Close()

	if err != nil {
		ch <- fmt.Sprintf("while reading %s:%v", url, err)
		return
	}

	// 从start开始经过多长时间
	secs := time.Since(start).Seconds()
	// 在通道上发送一个值（ch <- expression）main 函数接收（<- ch）
	ch <- fmt.Sprintf("%.2fs %7d %s", secs, nbytes, url)
}
