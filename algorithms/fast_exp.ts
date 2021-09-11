function fast_exp(radix: number, n: number): number {
  let r = 1;
  let origin = n;

  n = Math.abs(n);

  while (n !== 0) {
    // mod 2
    if ((n & 1) === 1) {
      r = r * radix;
    }
    console.log(n);

    radix = radix * radix;
    // 得考虑负数2 ** 31 - 1是超过了最大正整数的范围了，所以得用无符号移动
    n = n >>> 1;
  }

  if (origin < 0) {
    return 1 / r;
  }
  return r;
}

// fast_exp(2, 918);
// fast_exp(1, -2147483648)