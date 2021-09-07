function fast_exp(radix: number, n: number): number {
  let r = 1;
  while (n !== 0) {
    // mod 2
    if ((n & 1) === 1) {
      r = r * radix;
    }
    radix = radix * radix;
    n = n >> 1;
  }
  return r;
}

// fast_exp(2, 918);
