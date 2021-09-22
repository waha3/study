package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path"

	"crawl/links"
)

func main() {
	// breadthFirst(crawl, os.Args[1:])
	server()
}

func server() {
	fmt.Println("start")

	http.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) {
		fmt.Fprint(rw, "hello world")
	})
	http.HandleFunc("/crwal", func(rw http.ResponseWriter, r *http.Request) {
		breadthFirst(crawl, r.URL.Query()["url"])
	})

	http.HandleFunc("/header", func(rw http.ResponseWriter, r *http.Request) {
		fmt.Fprint(rw, links.Defer_title("http://gopl.io"))
	})

	http.HandleFunc("/readfile", func(rw http.ResponseWriter, r *http.Request) {
		fmt.Println(r.URL.Query())
		filename := r.URL.Query()["filename"]
		fmt.Fprint(rw, readFile(filename))
	})

	http.HandleFunc("/writefile", func(rw http.ResponseWriter, r *http.Request) {
		fetch(r.RequestURI)
	})

	err := http.ListenAndServe("localhost:7000", nil)
	if err != nil {
		fmt.Printf("%s", err)
	}
}

func breadthFirst(f func(item string) []string, workList []string) {
	seen := make(map[string]bool)

	for len(workList) > 0 {
		items := workList
		workList = nil
		for _, item := range items {
			if !seen[item] {
				seen[item] = true
				// f(item)... 将f返回的所有项都添加到workList
				workList = append(workList, f(item)...)
			}
		}
	}
}

func crawl(url string) []string {
	fmt.Println(url)
	list, err := links.Extract(url)
	if err != nil {
		log.Print(err)
	}
	return list
}

func readFile(filename []string) string {
	if len(filename) == 0 {
		return ""
	}

	f, err := os.Open(filename[0])
	if err != nil {
		fmt.Printf("read err %s", err)
		return ""
	}
	defer f.Close()
	data, err := io.ReadAll(f)
	if err != nil {
		fmt.Printf("read err %s", err)
		return ""
	}
	return string(data)
}

func fetch(url string) (filename string, n int64, err error) {
	fmt.Printf("url: %s\n", url)

	resp, err := http.Get(url)
	if err != nil {
		return "", 0, err
	}
	defer resp.Body.Close()

	local := path.Base(resp.Request.URL.Path)
	if local == "/" {
		local = "index.html"
	}
	f, err := os.Create(local)
	if err != nil {
		return "", 0, err
	}
	n, err = io.Copy(f, resp.Body)
	if closeErr := f.Close(); err == nil {
		err = closeErr
	}
	return local, n, err
}
