package _clock

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"net"
	"os"
	"strings"
	"time"
)

func Clock() {
	listener, err := net.Listen("tcp", "localhost:8000")
	if err != nil {
		log.Fatal(err)
	}

	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Print(err)
			continue
		}
		handleConn(conn)
	}
}

func mustCopy(dst io.Writer, src io.Reader) {
	if _, err := io.Copy(dst, src); err != nil {
		log.Fatal(err)
	}
}

// func handleConn(conn net.Conn) {
// 	defer conn.Close()
// 	for {
// 		_, err := io.WriteString(conn, time.Now().Format("15:04:05\n"))
// 		if err != nil {
// 			return
// 		}
// 		time.Sleep(1 * time.Second)
// 	}
// }

// 多个goroutine

func Clock2() {
	connect, err := net.Dial("tcp", "localhost:8000")
	if err != nil {
		log.Fatal(err)
	}
	defer connect.Close()
	go mustCopy(connect, os.Stdout)
	mustCopy(connect, os.Stdin)
}

func echo(c net.Conn, shout string, delay time.Duration) {
	fmt.Fprintln(c, '\t', strings.ToUpper(shout))
	time.Sleep(delay)
	fmt.Fprintln(c, "\t", shout)
	time.Sleep(delay)
	fmt.Fprintln(c, "\t", strings.ToLower(shout))
}

func handleConn(c net.Conn) {
	input := bufio.NewScanner(c)
	for input.Scan() {
		echo(c, input.Text(), 1*time.Second)
	}

	c.Close()
}
