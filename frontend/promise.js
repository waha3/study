// Promises/A+ https://www.ituring.com.cn/article/66566#note-1
const PromiseState = {
  Pending: "pending",
  Fullfiled: "fullfiled",
  Rejected: "rejected",
};

function noop() {}

// promise 解决过程
function resolve(promise, x) {
  console.log(promise, x);
  // x 与 promise 相等
  if (promise === x) {
    promise.state = PromiseState.Rejected;
    throw TypeError("promise is equal with x");
  }

  // x 为 Promise ，则使 promise 接受 x 的状态
  if (x instanceof Promise) {
    // x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
    if (x.state === PromiseState.Pending) {
      // promise.state === PromiseState.Pending;
    }

    if (x.state === PromiseState.Fullfiled) {
      promise.state = x.state;
      promise.doneValue = x.state;
    }

    if (x.state === PromiseState.Rejected) {
      promise.state = x.state;
      promise.reason = x.reason;
    }
  }

  // x 为对象或函数
  if ((typeof x === "object" && x != null) || typeof x === "function") {
    try {
      let then = x.then;
      then.call(x, promise.resolve, promise.reject);
    } catch (error) {
      promise.state = PromiseState.Rejected;
      promise.reason = error;
    }
  }
}

function reject(reason) {}

function Promise(resolver) {
  this.state = PromiseState.Pending;
  this.doneValue = null;
  this.reason = null;
  this.deffers = [];

  if (typeof resolver !== "function") {
    throw TypeError(`Promise resolver ${resolver} is not function`);
  }

  if (resolver !== noop) {
    resolver(
      (data) => {
        this.state === PromiseState.Fullfiled;
        this.doneValue = data;
        this.deffers.forEach((deffer) => {
          deffer(data);
        });
      },
      (error) => {
        this.state === PromiseState.Rejected;
        this.reason = error;
      }
    );
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
  onRejected = typeof onRejected === "function" ? onRejected : null;
  // console.log(onFulfilled);
  // let hasInvoke = false;

  // if (typeof onFulfilled === "function") {
  //   if (!hasInvoke) {
  //     hasInvoke = true;
  //     // 实践中要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行
  //     // 这里用宏任务实现
  //     // setTimeout(() => {
  //     //   // TODO 必须作为函数被调用
  //     //   onFulfilled.call(globalThis, this.doneValue);
  //     // }, 0);
  //     this.deffers.push(() => {
  //       setTimeout(() => {
  //         onFulfilled();
  //       }, 0);
  //     });
  //   }
  // }

  // // if (typeof onRejected === "function") {
  // //   let hasInvoke = false;
  // //   if (this.state === PromiseState.Rejected && !hasInvoke) {
  // //     hasInvoke = true;
  // //     setTimeout(() => {
  // //       onRejected.call(globalThis, this.reason);
  // //     });
  // //   }
  // // }

  // let promise2 = new Promise(noop);
  // // resolve(promise2, x);
  // return promise2;

  let promise2 = new Promise((resolve, reject) => {
    if (this.state === PromiseState.Pending) {
      this.onFulfilled.push(() => {
        setTimeout(onFulfilled, 0);
      });
    }
  });
  return promise2;
};

Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("hello world");
  }, 2000);
});

promise
  .then((res) => {
    console.log(1, res);
  })
  .then(() => console.log(2))
  .then(() => {
    console.log(3);
  });

promise.then((res) => {
  console.log(4, res);
});

module.exports = Promise;
