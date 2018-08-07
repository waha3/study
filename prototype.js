// 显式混入
function mixin(sourceObj, targetObj) {
  Object.getOwnPropertyNames(sourceObj)
    .filter(key => !(key in targetObj))
    .forEach(key => (targetObj[key] = sourceObj[key]));
  return targetObj;
}

// demo
let Vehicle = {
  engines: 1,
  ignition() {
    console.log("turning on my engine");
  },
  drive() {
    this.ignition();
    console.log("steering and moving forward");
  }
};

let Car = mixin(Vehicle, {
  wheels: 4,
  drive() {
    Vehicle.drive.call(this);
    console.log(`rolling on all ${this.wheels} wheels`);
  }
});

// 寄生式继承
// demo

function Vehicle() {
  this.engines = 1;
}

Vehicle.prototype.ignition = function() {
  console.log("turning on my engine");
};

Vehicle.prototype.drive = function() {
  console.log(this.engines);
  console.log("steering and moving forward");
};

function Car() {
  let car = new Vehicle();
  car.wheels = 4;
  car.engines = 2;

  let vehDrive = car.drive;

  car.drive = function() {
    vehDrive.call(this);
    console.log(`rolling on all ${this.wheels} wheels`);
  };

  return car;
}

// 隐式混入
let Something = {
  cool() {
    this.greeting = "hello world";
    this.count = this.count ? this.count : 1;
  }
};

let Another = {
  cool() {
    Something.cool.call(this);
  }
};

// [[Prototype]]

let anotherObj = {
  a: 2
};

let myObj = Object.create(anotherObj);

// 原型链的屏蔽相同属性的规则 obj.name = 'han'
// 1. 原型链上存在该属性访问 并且没有被 标记 writeable: false => 直接添加
// 2. 原型链上存在该属性访问 标记为writeable: false => 无法修改屏蔽 （严格模式下会报错）
// 3. 原型链上存在该属性访问 是个 setter => 不会屏蔽或者修改

var a = {};
Object.defineProperty(a, "name", {
  writable: false
});
var b = {};
b.__proto__ = a;
b.name = "han"; // 被拦截

var obj = {
  age: 22
};
var myObj = Object.create(obj);
obj.age; // 22
myObj.age; // 22
myObj.age++;
myObj.age; // 23
obj.age; // 22
myObj.hasOwnProperty("age"); // true

function Foo() {}
Foo.prototype === Object.getPrototypeOf(new Foo()); // true
