fn main() {
  // ! 所有可能会用到模式的位置
  // ! match 分支
  // * match 表达式必须是 穷尽（exhaustive）的，意为 match 表达式所有可能的值都必须被考虑到
  // * _ 可以匹配所有情况，不过它从不绑定任何变量

  // ! if let 条件表达式
  //   let favorite_color: Option<&str> = None;
  //   let is_tudesday = false;
  //   let age: Result<u8, _> = "34".parse();

  //   if let Some(color) = favorite_color {
  //     println!("Using your favorite color, {}, as the background", color);
  //   } else if is_tudesday {
  //     println!("Tuesday is green day!");
  //   } else if let Ok(age) = age {
  //     if age > 30 {
  //       println!("Using purple as the background color");
  //     } else {
  //       println!("Using orange as the background color");
  //     }
  //   } else {
  //     println!("Using blue as the background color");
  //   }

  // ! while let 条件循环
  //   let mut stack = Vec::new();
  //   stack.push(1);
  //   stack.push(2);
  //   stack.push(3);

  //   while let Some(s) = stack.pop() {
  //     println!("s is {}", s);
  //   }

  // ! for 循环
  // let v = vec![1, 2, 3, 4];
  // for (index, value) in v.iter().enumerate() {
  //   println!("index is {}, value is {}", index, value);
  // }

  // ! let 语句
  //   let (x, y, z) = (1, 2, 3);
  // let (x, y) = (1, 2, 3);

  // ! 函数参数
  // let point = (10, 20);
  // print_coordinate(&point);

  // ! Refutability（可反驳性）: 模式是否会匹配失效
  // * 模式有两种形式：refutable（可反驳的）和 irrefutable（不可反驳的）。能匹配任何传递的可能值的模式被称为是 不可反驳的（irrefutable）。
  // * 一个例子就是 let x = 5; 语句中的 x，因为 x 可以匹配任何值所以不可能会失败。对某些可能的值进行匹配会失败的模式被称为是 可反驳的（refutable）。
  // * 一个这样的例子便是 if let Some(x) = a_value 表达式中的 Some(x)；如果变量 a_value 中的值是 None 而不是 Some，那么 Some(x) 模式不能匹配

  // ! 所有的模式语法
  // let x = 1;

  // match x {
  //   1 => println!("one"),
  //   2 => println!("two"),
  //   3 => println!("three"),
  //   _ => println!("anything"),
  // }

  // ! 匹配命名变量
  // let x = Some(5);
  // let y = 10;
  // match x {
  //   Some(50) => println!("got 50"),
  //   Some(y) => println!("got y is {}", y),
  //   _ => println!("Default case, x = {:?}", x),
  // }
  // println!("at the end: x = {:?}, y = {:?}", x, y);

  // ! 多个模式
  // let x = 1;
  // match x {
  //   1 | 2 => println!("1 or 2"),
  //   3 => println!("3"),
  //   _ => println!("anything"),
  // }

  // ! 通过 ..= 匹配值的范围
  // let x = 5;
  // match x {
  //   1..=5 => println!("x is {}", x),
  //   _ => println!("no match"),
  // }

  // ! 范围只允许用于数字或 char 值
  // let c = 'd';
  // match c {
  //   'a'..='z' => println!("c is {}", c),
  //   _ => println!("is not match"),
  // }

  // ! 解构并分解值
  // struct Point {
  //   x: i32,
  //   y: i32,
  // }
  // let p = Point { x: 0, y: 7 };
  // let Point { x: a, y: b } = p;
  // let Point { x, y } = p;
  // assert_eq!(a, 0);
  // assert_eq!(b, 7);
  // match p {
  //   Point { x, y: 0 } => println!("On the x axis at {}", x),
  //   Point { x: 0, y } => println!("On the y axis at {}", y),
  //   Point { x, y } => println!("On neither axis: ({}, {})", x, y),
  // }

  // ! 解构枚举
  // enum Message {
  //   Quit,
  //   Move { x: i32, y: i32 },
  //   Write(String),
  //   ChangeColor(i32, i32, i32),
  // }
  // let msg = Message::ChangeColor(0, 160, 255);
  // match msg {
  //   Message::Quit => println!("quit"),
  //   Message::Move { x, y } => println!("move x {} y {}", x, y),
  //   Message::Write(s) => println!("write s is {}", s),
  //   Message::ChangeColor(a, b, c) => println!("change color is {} {} {}", a, b, c),
  // }

  // ! 解构嵌套的结构体和枚举
  // enum Color {
  //   Rgb(i32, i32, i32),
  //   Hsv(i32, i32, i32),
  // }

  // enum Message {
  //   Quit,
  //   Move { x: i32, y: i32 },
  //   Write(String),
  //   ChangeColor(Color),
  // }

  // let msg = Message::ChangeColor(Color::Hsv(1, 2, 3));
  // match msg {
  //   Message::ChangeColor(Color::Hsv(h, s, v)) => println!("h s v is {} {} {}", h, s, v),
  //   Message::ChangeColor(Color::Rgb(r, g, b)) => println!("r g b is {} {} {}", r, g, b),
  //   _ => (),
  // }

  // ! 解构结构体和元组
  // struct Point {
  //   x: i32,
  //   y: i32,
  // }
  // let ((feet, inche), Point { x, y }) = ((10, 20), Point { x: 1, y: 2 });

  // ! 忽略模式中的值
  // * 使用 _ 忽略整个值
  // * 使用嵌套的 _ 忽略部分值
  // let mut some_thing = Some(10);
  // let new_some_thing = Some(20);
  // match (some_thing, new_some_thing) {
  //   (Some(_), Some(_)) => println!("is here"),
  //   _ => (),
  // }
  // println!("setting is {:?}", some_thing);

  // let numbers = (2, 4, 8, 16, 32);

  // match numbers {
  //   (first, _, third, _, fifth) => {
  //     println!("Some numbers: {}, {}, {}", first, third, fifth)
  //   }
  // }

  // ! 通过在名字前以一个下划线开头来忽略未使用的变量
  // ! 用 .. 忽略剩余值
  // struct Point {
  //   x: i32,
  //   y: i32,
  //   z: i32,
  // }
  // let p = Point { x: 0, y: 0, z: 0 };
  // match p {
  //   Point { x, .. } => println!("x is {}", x),
  // }

  // let numbers = (2, 4, 8, 16, 32);

  // match numbers {
  //   (first, .., last) => {
  //     println!("Some numbers: {}, {}", first, last);
  //   }
  // }

  // match numbers {
  //   (.., second, ..) => {
  //     println!("Some numbers: {}", second)
  //   }
  // }

  // ! 匹配守卫提供的额外条件
  // let num = Some(4);
  // match num {
  //   Some(x) if x < 5 => println!("x is {}", x),
  //   Some(x) => println!("here x is {}", x),
  //   None => (),
  // }

  // let x = Some(5);
  // let y = 10;

  // match x {
  //   Some(50) => println!("Got 50"),
  //   Some(n) if n == y => println!("Matched, n = {}", n),
  //   _ => println!("Default case, x = {:?}", x),
  // }

  // println!("at the end: x = {:?}, y = {}", x, y);

  // let x = 4;
  // let y = false;

  // match x {
  //   4 | 5 | 6 if y => println!("yes"),
  //   _ => println!("no"),
  // }

  // ! @ 绑定
  // * at 运算符（@）允许我们在创建一个存放值的变量的同时测试其值是否匹配模式
  enum Message {
    Hello { id: i32 },
  }
  let msg = Message::Hello { id: 10 };

  match msg {
    Message::Hello {
      id: id_var @ 1..=10,
    } => println!("found id_var {}", id_var),
    Message::Hello { id } => println!("id is {}", id),
  }
}

// fn print_coordinate(&(x, y): &(i32, i32)) {
//   println!("x y is {} {}", x, y)
// }
