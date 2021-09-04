// 不支持new operater
function bind(fn, module, ...args1) {
  return function (...args2) {
    let args = [...args1, ...args2];
    return fn.apply(module, args);
  };
}

Function.prototype.fakeBind = function () {
  if (typeof this !== "function") {
    throw new Error("");
  }
  var slice = Array.prototype.slice;
  var self = this;
  var thisArgs = arguments[0];
  var args = slice.call(arguments, 1);
  return function () {
    self.apply(thisArgs, args.concat(slice.call(arguments)));
  };
};

// 支持new
// 修改绑定的函数会影响到当前的函数对象
Function.prototype.fakeBind = function () {
  if (typeof this !== "function") {
    throw new Error("");
  }
  var slice = Array.prototype.slice;
  var self = this;
  var thisArgs = arguments[0];
  var args = slice.call(arguments, 1);
  var binder = function () {
    return thisArgs.apply(
      this instanceof binder ? this : self,
      args.concat(slice(arguments))
    );
  };

  binder.prototype = this.prototype;
  return binder;
};


// bind 函数返回的函数对象是没有prototype的
Function.prototype.fakeBind = function () {
  if (typeof this !== "function") {
    throw new Error("");
  }
  var slice = Array.prototype.slice;
  var self = this;
  var thisArgs = arguments[0];
  var args = slice.call(arguments, 1);
  var noop = function () {};
  var binder = function () {
    return thisArgs.apply(
      this instanceof noop ? this : self,
      args.concat(slice(arguments))
    );
  };

  this.prototype = noop.prototype;
  binder.prototype = new noop();
  return binder;
};


Function.prototype.fakeBind = function () {
    if (typeof this !== "function") {
      throw new Error("");
    }
    var slice = Array.prototype.slice;
    var self = this;
    var thisArgs = arguments[0];
    var args = slice.call(arguments, 1);
    var noop = function () {};
    var binder = function () {
      return thisArgs.apply(
        this instanceof noop ? this : self,
        args.concat(slice(arguments))
      );
    };
  
    noop.prototype = this.prototype;
    binder.prototype = new noop();
    noop.prototype = null;
    return binder;
  };
