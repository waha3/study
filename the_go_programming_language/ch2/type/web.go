package main

import (
	"encoding/json"
	"fmt"
	"log"
)

// * JSON
// ! JavaScript对象表示法
// ! json 包含字符串，数字，布尔值，数组，对象
// ! 字符串是用双引号括起来的unicode码点，反斜杠作为转义符\uhhh数字转义得到的是utf-16的编码（javascript中的字符都是utf-16编码的）
// ! 每个元素用逗号隔开, 两边用括号括起来

func main() {
	test_JSON()
}

func test_JSON() {
	type Moive struct {
		Title  string
		Year   int
		Color  bool
		Actors []string
	}
	var moives = []Moive{
		{Title: "Casablanca", Year: 1942, Color: false,
			Actors: []string{"Humphrey Bogart", "Ingrid Bergman"}},
		{Title: "Cool Hand Luke", Year: 1967, Color: true,
			Actors: []string{"Paul Newman"}},
		{Title: "Bullitt", Year: 1968, Color: true,
			Actors: []string{"Steve McQueen", "Jacqueline Bisset"}},
	}

	json_str, err := json.Marshal(moives)
	// ! 第二参数是每行前缀字符串 第三个字符串是缩进字符串
	json_str_formated, err := json.MarshalIndent(moives, "", "\t")
	if err != nil {
		log.Fatal("json fomart error")
	}
	fmt.Printf("%s\n", json_str)
	fmt.Printf("%s\n", json_str_formated)
}
