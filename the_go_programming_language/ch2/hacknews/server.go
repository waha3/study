package server

import (
	"log"
	"net/http"
)

const HackNewsURL = "https://hacker-news.firebaseio.com"

func server() {
	err := http.ListenAndServe("http://localhost:8000", nil)
	if err != nil {
		log.Fatal(err)
	}
	http.HandleFunc("/", )
}

func getItems(id string) {
	http.Get(HackNewsURL + "/item" + id + "121003.json?print=pretty")
}
