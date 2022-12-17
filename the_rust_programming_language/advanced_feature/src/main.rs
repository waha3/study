// use advanced_feature::spilt_at_mut;
// use std::ops::Add;
// use std::fmt::{self, Display};
use hello_macro::HelloMacro;
use hello_macro_derive::HelloMacro;

#[derive(HelloMacro)]
struct Pancakes;

fn main() {
  // ! 不安全 Rust
  // * 解引用裸指针
  // * 调用不安全的函数或方法
  // * 访问或修改可变静态变量
  // * 实现不安全 trait
  // * 访问 union 的字段

  // ! 解引用裸指针
  // ! 裸指针与引用和智能指针的区别在于
  // * 允许忽略借用规则，可以同时拥有不可变和可变的指针，或多个指向相同位置的可变指针
  // * 不保证指向有效的内存
  // * 允许为空
  // * 不能实现任何自动清理功能

  // let mut num = 5;
  // let r1 = &num as *const i32;
  // let r2 = &mut num as *mut i32;
  // println!("r1 r2 {:?} {:?}", r1, r2);
  // let address = 0x0123456usize;
  // let r = address as *const i32;

  // unsafe {
  //   println!("r1 is {}", *r1);
  //   println!("r2 is {}", *r2);
  // }

  // ! 调用不安全函数或方法
  // unsafe {
  //   dangerous();
  // }

  // ! 创建不安全代码的安全抽象
  // let mut v = vec![1, 2, 3, 4, 5];
  // let r = &mut v[..];
  // let result = advanced_feature::spilt_at_mut(r, 2);
  // println!("result {:?}", result)

  // ! 使用 extern 函数调用外部代码
  // extern "C" {
  //   fn abs(input: i32) -> i32;
  // }

  // unsafe {
  //   println!("absolute value is {}", abs(-3));
  // }

  // ! 从其它语言调用 Rust 函数
  // #[no_mangle]
  // pub extern "C" fn call_from_c() {
  //   println!("call from c");
  // }

  // ! 访问或修改可变静态变量
  // * 全局变量在 Rust 中被称为 静态（static）变量
  // * 拥有可以全局访问的可变数据，难以保证不存在数据竞争，
  // * 这就是为何 Rust 认为可变静态变量是不安全的。任何可能的情况，请优先使用第十六章讨论的并发技术和线程安全智能指针，
  // * 这样编译器就能检测不同线程间的数据访问是否是安全的
  // println!("name is {}", HELLO_WORLD);
  // add_to_count(3);
  // unsafe {
  //   println!("count is {}", COUNTER);
  // }

  // ! 实现不安全 trait
  // ! 当 trait 中至少有一个方法中包含编译器无法验证的不变式（invariant）时 trait 是不安全的
  // unsafe trait Foo {}
  // unsafe impl Foo for i32 {}

  // ! 访问联合体中的字段
  // ! 何时使用不安全代码

  // ! 高级 trait

  // ! 关联类型在 trait 定义中指定占位符类型
  // * 关联类型（associated types）是一个将类型占位符与 trait 相关联的方式，这样 trait 的方法签名中就可以使用这些占位符类型
  // * 跟泛型的区别是关联类型只需要实现一遍
  // pub trait Iterator {
  //   type Item;

  //   fn next(&mut self) -> Option<Self::Item>;
  // }

  // ! 默认泛型类型参数和运算符重载
  // * 运算符重载（Operator overloading）是指在特定情况下自定义运算符（比如 +）行为的操作
  // * Rhs=Self：这个语法叫做 默认类型参数
  // trait Add<Rhs = Self> {
  //   type Output;

  //   fn add(self, rhs: Rhs) -> Self::Output;
  // }

  // #[derive(Debug, PartialEq, Clone, Copy)]
  // struct Point {
  //   x: i32,
  //   y: i32,
  // }

  // impl Add for Point {
  //   type Output = Point;

  //   fn add(self, other: Point) -> Point {
  //     Point {
  //       x: self.x + other.x,
  //       y: self.y + other.y,
  //     }
  //   }
  // }

  // assert_eq!(
  //   Point { x: 1, y: 2 } + Point { x: 2, y: 1 },
  //   Point { x: 3, y: 3 }
  // );

  // struct Millimeters(i32);
  // struct Meters(i32);

  // impl Add<Meters> for Millimeters {
  //   type Output = Millimeters;

  //   fn add(self, meters: Meters) -> Millimeters {
  //     Millimeters(self.0 + meters.0 * 1000)
  //   }
  // }

  // ! 完全限定语法与消歧义：调用相同名称的方法
  // trait Pilot {
  //   fn fly(&self);
  // }

  // trait Wizard {
  //   fn fly(&self);
  // }

  // struct Human;

  // impl Pilot for Human {
  //   fn fly(&self) {
  //     println!("This is your captain speaking.");
  //   }
  // }

  // impl Wizard for Human {
  //   fn fly(&self) {
  //     println!("up");
  //   }
  // }

  // impl Human {
  //   fn fly(&self) {
  //     println!("*waving arms furiously*");
  //   }
  // }

  // let person = Human;
  // person.fly();
  // Pilot::fly(&person);
  // Wizard::fly(&person);

  // ! 完全限定语法
  // * 定义 <Type as Trait>::function(receiver_if_method, next_arg, ...);
  // trait Animal {
  //   fn baby_name() -> String;
  // }

  // struct Dog;

  // impl Dog {
  //   fn baby_name() -> String {
  //     String::from("Spot")
  //   }
  // }

  // impl Animal for Dog {
  //   fn baby_name() -> String {
  //     String::from("Puppy")
  //   }
  // }

  // println!("A baby dog is called a {}", Dog::baby_name());
  // println!("A baby dog is called a {}", <Dog as Animal>::baby_name());

  // ! 父 trait 用于在另一个 trait 中使用某 trait 的功能
  // trait OutlinePrint: fmt::Display {
  //   fn outline_print(&self) {
  //     let output = &self.to_string();
  //     let len = output.len();
  //     println!("{}", "*".repeat(len + 4));
  //     println!("*{}*", " ".repeat(len + 2));
  //     println!("* {} *", output);
  //     println!("*{}*", " ".repeat(len + 2));
  //     println!("{}", "*".repeat(len + 4));
  //   }
  // }

  // struct Point {
  //   x: i32,
  //   y: i32,
  // }

  // impl OutlinePrint for Point {}

  // impl fmt::Display for Point {
  //   fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
  //     write!(f, "({}, {})", self.x, self.y)
  //   }
  // }

  // let p = Point { x: 10, y: 20 };
  // p.outline_print();

  // ! newtype 模式用以在外部类型上实现外部 trait
  // struct Wrapper(Vec<String>);

  // impl fmt::Display for Wrapper {
  //   fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
  //     write!(f, "[{}]", self.0.join(", "))
  //   }
  // }

  // let w = Wrapper(vec![String::from("hello"), String::from("world")]);
  // println!("w={}", w);

  // ! 高级类型
  // ! 为了类型安全和抽象而使用 newtype 模式
  // ! 类型别名用来创建类型同义词
  // type KiloMeters = u32;
  // let x: u32 = 5;
  // let y: KiloMeters = 5;
  // assert_eq!(x, y);
  // println!("x + y = {}", x + y);

  // type Thunk = Box<dyn Fn() + Send + 'static>;
  // let f: Thunk = Box::new(|| println!("hi"));
  // type Result<T> = std::result::Result<T, std::io::Error>;

  // ! 从不返回的 never type
  // * Rust 有一个叫做 ! 的特殊类型。在类型理论术语中，它被称为 empty type，因为它没有值。
  // * 我们更倾向于称之为 never type。这个名字描述了它的作用：在函数从不返回的时候充当返回值
  // * match 语句和一个以 continue 结束的分支
  // * panic
  // * loop

  // ! 动态大小类型和 Sized trait
  // * 运行时才能知道大小
  // let s1:str = "hello world";
  // fn generic<T: ?Sized>(t: T) {}
  // * ?Sized 上的 trait bound 意味着 “T 可能是也可能不是 Sized” 同时这个注解会覆盖泛型类型必须在编译时拥有固定大小的默认规则

  // ! 高级函数与闭包
  // ! 函数指针
  // * fn 被称为 函数指针
  // * 不同于闭包，fn 是一个类型而不是一个 trait
  // let answer = do_twice(add_one, 10);
  // println!("answer is {}", answer);

  // let v = vec![1, 2, 3, 4];
  // let r1: Vec<String> = v.iter().map(|x| x.to_string()).collect();
  // let r2: Vec<String> = v.iter().map(ToString::to_string).collect();

  // #[derive(Debug)]
  // enum Status {
  //   Value(u32),
  //   Stop,
  // }
  // let r3: Vec<Status> = (0u32..20).map(Status::Value).collect();
  // println!("r1 r2 r3 {:?} {:?} {:?}", r1, r2, r3);

  // ! 返回闭包
  // * 闭包表现为 trait, 这意味着不能直接返回闭包
  // fn return_closure() -> Box<dyn Fn(i32) -> i32> {
  //   Box::new(|x| x + 1)
  // }

  // ! 宏
  // * 宏（Macro）指的是 Rust 中一系列的功能：使用 macro_rules! 的 声明（Declarative）宏，和三种 过程（Procedural）宏：
  // * 自定义 #[derive] 宏在结构体和枚举上指定通过 derive 属性添加的代码
  // * 类属性（Attribute-like）宏定义可用于任意项的自定义属性
  // * 类函数宏看起来像函数不过作用于作为参数传递的 token

  // ! 从根本上来说，宏是一种为写其他代码而写代码的方式，即所谓的 元编程（metaprogramming）
  // ! 宏和函数的区别
  // * 一个函数签名必须声明函数参数个数和类型。相比之下，宏能够接收不同数量的参数
  // * 实现宏不如实现函数的一面是宏定义要比函数定义更复杂
  // * 宏和函数的最后一个重要的区别是：在一个文件里调用宏 之前 必须定义它，或将其引入作用域，而函数则可以在任何地方定义和调用

  // #[macro_export]
  // macro_rules! vec {
  //   ($($x:expr), *) => {
  //     {
  //       let mut temp_vec = Vec::new();
  //       $(
  //         temp_vec.push($x);
  //       )*
  //       temp_vec
  //     }
  //   };
  // }

  // ! 用于从属性生成代码的过程宏
  // * 有三种类型的过程宏（自定义派生（derive），类属性和类函数
  // Pancakes::hello_macro();

  // ! 类属性宏
  // * 类属性宏与自定义派生宏相似，不同的是 derive 属性生成代码，它们（类属性宏）能让你创建新的属性
  // * derive 只能用于结构体和枚举；属性还可以用于其它的项，比如函数

  // #[route(GET, "/")]
  // fn index() {}

  // #[proc_macro_attribute]
  // pub fn route(attr: TokenStream, item: TokenStream) -> TokenStream {}

  // ! 类函数宏
  // * 类函数（Function-like）宏的定义看起来像函数调用的宏。类似于 macro_rules!，它们比函数更灵活；例如，可以接受未知数量的参数
  // #[proc_macro]
  // pub fn sql(input: TokenStream) -> TokenStream {}
}

// static HELLO_WORLD: &str = "hello world";
// static mut COUNTER: u32 = 0;

// unsafe fn dangerous() {
//   println!("hello world");
// }

// fn add_to_count(inc: u32) {
//   unsafe { COUNTER += inc }
// }

// fn add_one(x: i32) -> i32 {
//   x + 1
// }

// fn do_twice(f: fn(i32) -> i32, arg: i32) -> i32 {
//   f(arg) + f(arg)
// }
