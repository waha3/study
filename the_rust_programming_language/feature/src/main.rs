// use std::clone;
use std::fs::File;
// use std::io::ErrorKind;
use std::io::{self, Read};
use std::net::IpAddr;

fn main() {
  // let x = 10;
  // x = 100;

  // let mut x = 5;
  // x = 6;

  // const GOAT = "messi";
  // const TIME: u32 = 1000;

  // ! shadowing
  // let x = 5;
  // let x = x + 1;

  // {
  //   let x = x * 2;
  //   println!("the scope inner value is {x}");
  // }

  // println!("the value is {x}");

  // let spaces = "    ";
  // let spaces = spaces.len();

  // println!("spaces is {spaces}");

  // let mut spaces = "    ";
  // spaces = spaces.len();

  // ! 标量类型

  // ! 所有权

  // let mut s = String::from("hello");
  // s.push_str(" world");

  // println!("this world is {s}");

  // let s2 = s;

  // println!("{s}");

  // let num1 = 100;
  // let num2 = num1;

  // println!("{num1}");

  // let s1 = String::from("hello");
  // let s2 = s1.clone();

  // println!("s1 is {s1}, s2 is {s2}");

  // ! 所有权与函数

  // let s = String::from("hello world");

  // take_ownership(s);

  // // println!("{}", s);

  // let x = 100;

  // makes_copy(x);

  // println!("after fn {}", x);

  // ! 返回值与作用域

  // let s1 = give_ownership();
  // let s2 = String::from("hello");
  // let s3 = take_and_give_back(s2);

  // println!("s3 {}", s3);

  // let s1 = String::from("hello");
  // let (s2, len) = calculcate_length(s1);
  // println!("s2 is {}, len is {}", s2, len);

  // ! 引用与借用
  // let s1 = String::from("hello");
  // let len = calculcate_length2(&s1);
  // println!("len is {}", len);

  // let s = String::from("hello");
  // change(&s);

  // ! 可变引用
  // let mut s = String::from("hello");
  // change2(&mut s);

  // let mut s = String::from("hello");
  // let r1 = &mut s;
  // let r2 = &mut s;
  // println!("r1 is {r1}, r2 is {r2}");

  // ! 悬垂引用

  // ! Slice 类型
  // ! 字符串 slice
  // let s = String::from("hello world");
  // let hello = &s[0..5];
  // let world = &s[6..11];
  // let slice = &s[..2];
  // println!("one is {hello}, two is {world} slice is {slice}");

  // let s = String::from("hello world");
  // let first = first_word(&s);
  // println!("first is {first}");

  // ! 结构体的定义和实例化
  // struct User {
  //   name: String,
  //   active: bool,
  //   email: String,
  //   sign_in_count: u64,
  // }

  // let mut user1 = User {
  //   name: String::from("hello"),
  //   active: true,
  //   email: String::from("89672..@qq.com"),
  //   sign_in_count: 1000,
  // };

  // user1.name = String::from("haha");

  // let use2 = User {
  //   active: false,
  //   ..user1
  // };

  // // ! 元组结构体
  // struct Color(i32, i32, i32);
  // let black = Color(1, 2, 255);

  // // !  类单元结构体
  // struct AlwaysEqual;

  // ! 结构体数据的所有权

  // ! 通过派生 trait 增加实用功能

  // #[derive(Debug)]
  // struct Retangle {
  //   width: i32,
  //   height: i32,
  // }

  // let rect1 = Retangle {
  //   width: 100,
  //   height: 100,
  // };

  // println!("{:#?}", rect1);

  // ! 方法语法
  // struct Retangle {
  //   width: i32,
  //   height: i32,
  // }

  // impl Retangle {
  //   fn area(&self) -> i32 {
  //     self.width * self.height
  //   }
  //   fn width(&self) -> bool {
  //     self.width > 0
  //   }
  // }

  // let rect1 = Retangle {
  //   width: 100,
  //   height: 100,
  // };

  // println!("area is {}", rect1.area());

  // ! 关联函数
  // struct Retangle {
  //   width: i32,
  //   height: i32,
  // }

  // impl Retangle {
  //   fn square(size: i32) -> Self {
  //     Self {
  //       width: size,
  //       height: size,
  //     }
  //   }
  // }

  // ! 枚举和模式匹配
  // enum IpAddrKind {
  //   V4,
  //   V6,
  // }

  // ! 枚举值
  // let four = IpAddrKind::V4;
  // let six = IpAddrKind::V6;

  // struct IpAddr {
  //   kind: IpAddrKind,
  //   address: String,
  // };

  // let home = IpAddr {
  //   kind: IpAddrKind::V4,
  //   address: String::from("168:1:2:10"),
  // };

  // enum IpAddr {
  //   V4(String),
  //   V6(String),
  // };

  // let home = IpAddr::V4(String::from("127:0:0:1"));

  // enum Message {
  //   Quit,
  //   Move { x: i32, y: i32 },
  //   Write(String),
  //   ChangeColor(i32, i32, i32),
  // }

  // impl Message {
  //   fn call(&self) {}
  // }

  // ! Option 枚举和其相对于空值的优势
  // let x = 5;
  // let y = Some(10);
  // let sum = x + y;

  // let five = Some(5);
  // let six = plus_one(five);
  // let none = plus_one(None);

  // print!("six is {:?}, none is {:?}", six, none);

  // ! 匹配是穷尽的

  // ! 通配模式和 _ 占位符
  // let dice_roll = 9;
  // match dice_roll {
  //   3 => add_fancy_hat(),
  //   7 => remove_fancy_hat(),
  //   // other => move_player(other),
  //   // _ => reroll(),
  //   _ => (),
  // }

  // ! if let 简洁控制流
  // let config_max = Some(3u8);

  // match config_max {
  //   Some(max) => println!("max is {}", max),
  //   _ => (),
  // }

  // if let Some(max) = config_max {
  //   println!(
  //     "
  //   max is {max}."
  //   )
  // }

  // ! 错误处理
  // ! 可恢复的（recoverable）和 不可恢复的（unrecoverable）错误

  // ! 用 panic! 处理不可恢复的错误
  // panic!("crash and burn");

  // ! 用 Result 处理可恢复的错误
  // let f = File::open("../rustfmt.toml");
  // let f = match f {
  //   Ok(file) => file,
  //   Err(err) => panic!("file cause some err {:?}", err),
  // };

  // ! 匹配不同的错误
  // let f = File::open("hello.text");
  // let f = match f {
  //   Ok(file) => file,
  //   Err(err) => match err.kind() {
  //     ErrorKind::NotFound => match File::create("hello.text") {
  //       Ok(fc) => fc,
  //       Err(e) => panic!("err is {:?}", e),
  //     },
  //     other_error => panic!("{:?} happen", other_error),
  //   },
  // };

  // let f = File::open("hello.text").unwrap_or_else(|error| {
  //   if error.kind() == ErrorKind::NotFound {
  //     File::create("hello.text").unwrap_or_else(|error| {
  //       panic!("create happen {:?}", error);
  //     })
  //   } else {
  //     panic!("open happen {:?}", error);
  //   }
  // });

  // ! 失败时 panic 的简写：unwrap 和 expect
  // let f = File::open("hello.text").unwrap();
  // let f1 = File::open("hello.text").expect("file don not exist");

  // ! 传播错误
  // let s = read_username_from_file();
  // println!("s is {:?}", s);

  // ! 传播错误的简写：? 运算符

  // ! 要不要 panic!

  // let home: IpAddr = "127.0.0.1".parse().unwrap();

  // pub struct Guess {
  //   value: i32,
  // }

  // impl Guess {
  //   pub fn new(value: i32) -> Guess {
  //     if value < 0 || value > 100 {
  //       panic!("the guess should between 0 and 100, but got {}", value);
  //     }

  //     Guess { value }
  //   }

  //   pub fn value(&self) -> i32 {
  //     self.value
  //   }
  // }

  // ! 泛型、Trait 和生命周期

  // ! 提取函数来减少重复

  // ! 结构体定义中的泛型
  // struct Point<T> {
  //   x: T,
  //   y: T,
  // }

  // let integer = Point { x: 10, y: 10 };

  // let str = Point { x: "aa", y: "bb" };

  // struct Point2<T, U> {
  //   x: T,
  //   y: U,
  // }

  // ! 结构体定义中的泛型
}

// fn take_ownership(some_string: String) {
//   println!("{}", some_string);
// }

// fn makes_copy(some_integer: i32) {
//   println!("{}", some_integer)
// }

// fn give_ownership() -> String {
//   let some_string = String::from("yours");
//   return some_string;
// }

// fn take_and_give_back(s: String) -> String {
//   s
// }

// fn calculcate_length(s: String) -> (String, usize) {
//   let length = s.len();
//   (s, length)
// }

// fn calculcate_length2(s: &String) -> usize {
//   s.len()
// }

// fn change(s: &String) {
//   s.push_str("world");
// }

// fn change2(s: &mut String) {
//   s.push_str(" world");
//   println!("changed value is {s}");
// }

// fn dangle() -> &String {
//   let s = String::from("hello");
//   &s
// }

// fn first_word(s: &String) -> &str {
//   let bytes = s.as_bytes();

//   for (i, &item) in bytes.iter().enumerate() {
//     if item == b' ' {
//       return &s[0..i];
//     }
//   }
//   return &s[..];
// }

// enum Coin {
//   Penny,
//   Nickel,
//   Dime,
//   Quarter,
// }

// fn value_in_cents(coin: Coin) -> u8 {
//   match coin {
//     Coin::Penny => 1,
//     Coin::Nickel => 5,
//     Coin::Dime => 10,
//     Coin::Quarter => 25,
//   }
// }

// fn plus_one(x: Option<i32>) -> Option<i32> {
//   match x {
//     None => None,
//     Some(i) => Some(i + 1),
//   }
// }

// fn add_fancy_hat() {}

// fn remove_fancy_hat() {}

// fn move_player(num_spaces: u8) {
//   println!("num_spaces is {}", num_spaces);
// }

// fn reroll() {}

// fn read_username_from_file() -> Result<String, io::Error> {
//   // let f = File::open("hello.txt");
//   // let mut f = match f {
//   //   Ok(file) => file,
//   //   Err(err) => return Err(err),
//   // };

//   // let mut s = String::new();
//   // match f.read_to_string(&mut s) {
//   //   Ok(_) => Ok(s),
//   //   Err(e) => Err(e),
//   // }

//   let mut s = String::new();
//   File::open("hello.txt")?.read_to_string(&mut s)?;
//   Ok(s)
// }

// fn largest<T>(list: &[T]) -> T {
//   let mut largest = list[0];
//   for &item in list {
//     if item > largest {
//       largest = item;
//     }
//   }
//   return largest;
// }
