package main

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"sync"
	"time"
)

func main() {
	// server2()
	swicth_fn()
}

func server1() {
	// 处理url
	// "/" 可以匹配所有前缀是这样的路径
	http.HandleFunc("/", handler)
	// 监听8000端口
	// Fatal等价于{l.Print(v...); os.Exit(1)}
	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

func handler(w http.ResponseWriter, r *http.Request) {
	// 写入出response
	fmt.Fprintf(w, "URL.PARH = %q\n", r.URL.Path)
}

var mu sync.Mutex
var count int

func server2() {
	http.HandleFunc("/", server3_handler)
	http.HandleFunc("/count", server2_counter)
	// ListenAndServe使用指定的监听地址和处理器启动一个HTTP服务端。
	// 处理器参数通常是nil，这表示采用包变量DefaultServeMux作为处理器。Handle和HandleFunc函数可以向DefaultServeMux添加处理器
	log.Fatal(http.ListenAndServe("localhost:7000", nil))
}

func server2_handler(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	count++
	mu.Unlock()
	fmt.Fprintf(w, "url path = %q\n", r.URL.Path)
}

func server2_counter(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	fmt.Fprintf(w, "count %d\n", count)
	mu.Unlock()
}

// test curl -X POST localhost:7000 -H "Content-Type: application/x-www-form-urlencoded" -d "param1=value1&param2=value2"
func server3_handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "%s %s %s\n", r.Method, r.URL, r.Proto)
	for k, v := range r.Header {
		fmt.Fprintf(w, "Header[%q] = %q\n", k, v)
	}

	fmt.Fprintf(w, "Host = %q\n", r.Host)
	fmt.Fprintf(w, "remote address = %q\n", r.RemoteAddr)
	if err := r.ParseForm(); err != nil {
		log.Print(err)
	}
	for k, v := range r.Form {
		fmt.Fprintf(w, "form[%q] = %q\n", k, v)
	}

	// 打印url query param
	for k, v := range r.URL.Query() {
		fmt.Fprintf(w, "query[%q] = %q\n", k, v)
	}

	// param 要手动去获取 go里面没有对应的api
	fmt.Fprintf(w, "param = %q\n", r.URL.Path)
}

// 代码中输出流的三种类型， os.Stdout ioutil.Discard fmt.Fprintf
// 他们都满足一个通用的interface io.Writer

// go中switch
func swicth_fn() {
	var heads, tails int
	switch coinflip() {
	case "heads":
		heads++
	case "tails":
		tails++
	default:
		fmt.Println("landed on edge")
	}
	fmt.Printf("%d\t%d", heads, tails)
}

func coinflip() string {
	// 相同的seed 产生的随机数也是相同的
	rand.Seed(time.Now().UTC().UnixNano())
	random := rand.Intn(10)
	fmt.Printf("rand %d\n", random)
	if random > 5 {
		return "heads"
	}
	return "tails"
}

// tagless 选择 等价于switch true
func Signum(x int) int {
	switch {
	case x > 0:
		return +1
	default:
		return 0
	case x < 0:
		return -1
	}
}

// 指针：go提供了指针，他的值是变量的地址 go中的指针式显式可见的
// 使用“&”操作符可以获取变量的地址，使用“*”操作符可以获取指针引用变量的值 但是指针不能进行算数运算（和c语言不一样）
// c语言中指针地址的偏移可以获取到其他变量的值
