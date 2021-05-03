function instanceOf(obj, target) {
  if (!~Object.prototype.toString.call(target).indexOf("object")) {
    throw new Error("right side should be an object");
  }

  // while (obj.__proto__) {
  //     if (obj.__proto__ === target.prototype) {
  //         return true
  //     }
  //     obj = obj.__proto__;
  // }
  // return false;

  var cur = Object.getPrototypeOf(obj);

  while (cur) {
    if (cur === target.prototype) {
      return true;
    }
    cur = Object.getPrototypeOf(cur);
  }

  return false;
}
