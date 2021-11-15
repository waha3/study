class FakeWeakMap {
  constructor() {
    this.random = function (p, r) {
      return Math.floor(Math.random() * (r - p + 1)) + p;
    };
    this.guid = String(this.random(0, 10000));
  }

  get(key) {
    return key[this.guid] ? key[this.guid][1] : null;
  }

  set(key, value) {
    if (key !== Object(key)) {
      throw new TypeError("Invalid value used as weak map key");
    }
    Object.defineProperty(key, this.guid, {
      value: [key, value],
      writable: true,
    });
    return this;
  }

  has(key) {
    return !!key[this.guid];
  }

  delete(key) {
    if (!this.has(key)) {
      return false;
    }
    key[this.guid] = undefined;
    return this.get(key);
  }
}

let weakmap = new FakeWeakMap();
let obj1 = {};
let obj2 = function () {};
weakmap.set(obj1, 111);
weakmap.set(obj2, 222);
let res = weakmap.get(obj2);
weakmap.delete(obj1);
console.log(weakmap);
