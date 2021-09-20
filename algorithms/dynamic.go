package main

import (
	"fmt"
)

func main() {
	A := []int{0, 0, 0, 0, 1}
	B := []int{1, 0, 0, 0, 0}
	// A := []int{1, 2, 3, 2, 1}
	// B := []int{3, 2, 1, 4, 7}
	result := findLength(A, B)
	fmt.Println(result)
}

func findLength(nums1 []int, nums2 []int) int {
	dp := make([][]int, len(nums1))

	for i := 0; i < len(nums1); i++ {
		dp[i] = make([]int, len(nums2))
	}
	return lsc(nums1, nums2, len(nums1)-1, len(nums2)-1, dp)
}

func lsc(nums1 []int, nums2 []int, m int, n int, dp [][]int) int {
	if m == -1 || n == -1 {
		return 0
	}

	max := 0

	if dp[m][n] > 0 {
		return dp[m][n]
	}

	if nums1[m] == nums2[n] {
		return lsc(nums1, nums2, m-1, n-1, dp) + 1
	} else {
		for i := m; i >= 0; i-- {
			r := lsc(nums1, nums2, i, n, dp)
			if r > max {
				dp[i][n] = r
				max = r
			}
		}
	}
	return max
}
