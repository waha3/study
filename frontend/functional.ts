export {};

// 是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术

type curry<
  F extends (...args: any) => any,
  P extends any[] = Parameters<F>,
  R = ReturnType<F>
> = P extends [infer A, ...infer B]
  ? B extends []
    ? (arg: A) => R
    : (arg: A) => curry<(...args: B) => R>
  : R;

function curry(fn: (agrs: any) => any) {
  let cache: Parameters<fn> = [];

  return function infer(arg: any) {
    cache.push(arg);

    if (cache.length === fn.length) {
      return fn(...cache);
    } else {
      return infer;
    }
  };
}

function test_fn(a: number, b: number, c: number): number {
  return a + b + c;
}

var test1 = curry(test_fn);
var result = test1(1)(2)(3);
console.log(result);
