package lib

// pc[i]是i的种群统计
var pc [256]byte

func init() {
	for i := range pc {
		pc[i] = pc[i/2] + byte(i&1)
	}
}

func PopCount(x uint64) int {
	return int(pc[byte(x>>(0*8))]) +
		int(pc[byte(x>>(1*8))]) +
		int(pc[byte(x>>(2*8))]) +
		int(pc[byte(x>>(3*8))]) +
		int(pc[byte(x>>(4*8))]) +
		int(pc[byte(x>>(5*8))]) +
		int(pc[byte(x>>(6*8))]) +
		int(pc[byte(x>>(7*8))])
}

func PopCount2(x uint64) int {
	var r int
	for i := 0; i < 9; i++ {
		r += int(pc[byte(x>>(i*8))])
	}
	return r
}

// 统计位
func PopCount3(x uint64) int {
	var r int
	for i := 0; i < 64; i++ {
		if (x>>i)&1 == 1 {
			r += 1
		}
	}
	return r
}
