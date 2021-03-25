const isFunction = (handle) => typeof handle === "function";

const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

class PromiseA {
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error(`Promise resolver ${handle} is not a function`);
    }
    // pending, fulfilled, or rejected
    this.status = PENDING;
    this.value = undefined;

    this.resolveQuene = [];
    this.rejectQuene = [];

    try {
      handle(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }

  _resolve(val) {
    console.log(val);
    // 只执行一次 reject或者resolve
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
    this.value = val;
  }

  _reject(err) {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    this.value = err;
  }

  then(onFulfilled, onRejected) {
    console.log(this.status);
    // return new PromiseA((resolveNext, rejectNext) => {
    switch (this.status) {
      case PENDING:
        this.resolveQuene.push(onFulfilled);
        this.rejectQuene.push(onRejected);
        break;
      case FULFILLED:
        console.log(this.value);
        console.log(onFulfilled);
        // if (isFunction(onFulfilled)) {

        // }
        // resolveNext(1111)

        break;
      case REJECTED:
        if (isFunction(onRejected)) {
          onRejected(this.value);
        }
        break;
      default:
        break;
    }
    // });
  }

  catch() {}

  all() {}

  race() {}

  finally() {}
}

a = new PromiseA((resolve) =>
  setTimeout(() => {
    resolve(11111);
  }, 1000)
);

a.then((res) => console.log(res));
