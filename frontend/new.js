function fakeNew(fn, ...args) {
  let obj = Object.create(fn.prototype);
  let result = fn.apply(obj, args);
  
  if (typeof result === "object" && result !== null) {
    return result;
  }

  return obj;
}

var fn = function (name) {
  this.name = name;
  this.say = function () {
    console.log(this.name);
  };
};

var obj = {
  name: "hello",
  say: function () {
    console.log(this.name);
  },
};

var res = fakeNew(fn, "waha");
var obj = fakeNew(obj.say);
console.log(obj);
