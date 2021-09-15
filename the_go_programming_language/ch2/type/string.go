package main

import (
	"bytes"
	"fmt"
	"strconv"
	"unicode/utf8"
)

// 字符串是不可变字节序列 文本串被解读成按utf-8编码的unicode码点序列
// len() 可以返回字节数
// 越界访问会宕机
// 字符串的第i个字节不一定是第i个字符，非ascii码字符需要两个或以上的字节
// 字符串生成操作用s[i:j] j <= i
// +运算符可以链接两个字符串
// 字符串可以进行比较，按字节进行，字典序排序
// 字符串值无法改变，字符串内部的数据不允许修改
// 不可变意味着两个字符串安全公用同一段底层内存

func main() {
	// string_index()
	// deal_unicode()
	// fmt.Println(comma("123444"))
	// byteSlice()
	// fmt.Println(intsToString([]int{1, 2, 3}))
	// fmt.Println(no_recursive_comma("1231444"))
	// fmt.Println(isSameString("abc", "abc"))
	intToString()
}

func string_index() {
	s := "hello world"
	fmt.Println(len(s))
	// 通过索引访问 返回的是码点
	fmt.Println(s[0], s[7])
	s1 := s[2]
	s2 := s[2:3]
	fmt.Printf("byte: %b\n", s1)
	fmt.Printf("string: %s\n", s2)
	fmt.Println(s[:])
	fmt.Println(s[:5])
}

// 字符串字面量
// 字符串的值可以直接写成字符串字面量, go的源代码是按utf-8编码，并且go的字符串会按utf-8解读，所以在代码中我们可以将unicode码点写入字符串字面量
/*
   \a  警告
	 \b  退格符
	 \f  换页符
	 \n  换行符
	 \r  回车符
	 \t  制表符
	 \v  垂直制表符
	 \'  单引号
	 \"  双引号
	 \\  反斜杠
*/
// 十六进制转义字符 \xhh  八进制转义字符 \0000 （0-7）不能超过 \0377
// 原生字符串字面量书写形式`...`字面量内转义字符不起作用, 可以换行 换行符会被保留，回车符会被去掉

// Unicode
// unicode码点在go中叫文字符号（rune）int32类型 我们将文件符号的序列变成int32的序列 UTF-32或者叫UCS-4

// utf-8 是一种变长的编码，每个字符用1-4个字节表示
/*
 0xxxxxxx                              0 ~ 127
 110xxxxx 10xxxxxx                     128~2047
 1110xxxx 110xxxxx 10xxxxxx            2048~65535
 11110xxx 1110xxxx 110xxxxx 10xxxxxx   65535~0x10ffff
*/
// 不能通过下边直接访问第n个字符，
// 优点：代码紧凑，兼容ascii，自同步，前缀编码不会产生歧义，文字符号的字典字节顺序与unicode码点一致
// \uhhhh 表示16位码点值 \Uhhhhhhhh表示32位码点值
// "世界" == "\xe4\xb8\x96\xe7\x95\x8c" == "\u4e16\u754c" == "\U00004316\U0000754c"
func hasPrefix(s, prefix string) bool {
	return len(s) >= len(prefix) && s[:len(prefix)] == prefix
}

func hasSuffix(s, suffix string) bool {
	return len(s) >= len(suffix) && s[len(s)-len(suffix):] == suffix
}

func contains(s, substr string) bool {
	for i := 0; i < len(s); i++ {
		if hasPrefix(s[i:], substr) {
			return true
		}
	}
	return false
}

// 逐个处理unicode字符
// 当utf8解码器出现不合理字节时，会产生\ufffd 替换他
func deal_unicode() {
	s := "hello，世界"
	fmt.Println(len(s))
	fmt.Println(utf8.RuneCountInString(s))

	for i := 0; i < len(s); {
		r, size := utf8.DecodeRuneInString(s[i:])
		fmt.Printf("%d\t%c\n", i, r)
		i += size
	}

	for i, r := range "hello，世界" {
		fmt.Printf("%d\t%q\t%d\n", i, r, r)
	}

	ss := "プログラム"
	fmt.Printf("%x\n", ss)
	rr := []rune(s)
	fmt.Printf("%x\n", rr)

	// 整数值转换成字符串
	// fmt.Println(string(65))
	// fmt.Println(string(0x4eac))
	// fmt.Println(string(123456))
}

// 字节串和字节slice
// 标准包 bytes strings strconv unicode

func comma(s string) string {
	n := len(s)
	if n <= 3 {
		return s
	}
	return comma(s[:n-3]) + "," + s[n-3:]
}

func no_recursive_comma(s string) string {
	var buf bytes.Buffer

	n := len(s)
	for n > 3 {
		buf.WriteString(s[:n-3])
		buf.WriteByte(',')
		buf.WriteString(s[n-3:])
		n -= 3
	}
	return buf.String()
}

// [] byte(s)转换操作会分配新的字节数组，拷贝填入s含有的字节，并生成一个slice引用
// bytes包为高效处理字节slice会提供了Buffer类型
func byteSlice() {
	s := "abc"
	b := []byte(s)
	fmt.Printf("%v\n", b)
	s2 := string(b)
	fmt.Printf("%s\n", s2)
}

func intsToString(values []int) string {
	var buf bytes.Buffer
	// 接受byte参数 '[' 这个是作为ascii码 91显示的
	fmt.Println('[')
	buf.WriteByte('[')
	for i, v := range values {
		if i > 0 {
			buf.WriteString(", ")
		}
		fmt.Fprintf(&buf, "%d", v)
	}
	buf.WriteByte(']')
	return buf.String()
}

func isSameString(s1, s2 string) bool {
	return s1 == s2
}

// 支付串和数字的相互转换
// 1.使用fmt.Sprintf
// 2.strconv.Itoa (integer to ascii)

func intToString() {
	x := 123
	y := fmt.Sprintf("%d", x)
	fmt.Println(y, strconv.Itoa(x))
	fmt.Println(strconv.FormatInt(int64(x), 2))
	s := fmt.Sprintf("x=%b", x)
	// strconv包内的Atoi或者ParseInt函数用于解释表示整数的字符串，ParseUint用于无符号整数
	xx, err := strconv.Atoi("123")
	yy, err2 := strconv.ParseInt("123", 10, 64)
	if err != nil || err2 != nil {

	}
	fmt.Println(s, xx, yy)
}
