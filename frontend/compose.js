function compose(...funsArgs) {
  funsArgs = Array.from(funsArgs);
  let length = funsArgs.length;
  return function (...args) {
    let index = 0;
    let result = funsArgs[index].apply(this, args);
    while (++index < length) {
      result = funsArgs[index].call(this, result);
    }
    return result;
  };
}

function sum(a, b) {
  return a + b;
}

function square(n) {
  return n * n
}

var composedFn = compose(sum, square)
var result = composedFn(1,2)
console.log(result)
