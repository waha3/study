package main

import (
	"fmt"
	"log"
	"net/http"

	"crawl/links"
)

func main() {
	// breadthFirst(crawl, os.Args[1:])
	fmt.Println("start")

	http.HandleFunc("/", func(rw http.ResponseWriter, r *http.Request) {
		fmt.Fprint(rw, "hello world")
	})
	http.HandleFunc("/crwal", func(rw http.ResponseWriter, r *http.Request) {
		breadthFirst(crawl, r.URL.Query()["url"])
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
