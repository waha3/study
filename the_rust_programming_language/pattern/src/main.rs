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
  let x = Some(5);
  let y = 10;
  match x {
    Some(50) => println!("got 50"),
    Some(y) => println!("got y is {}", y),
    _ => println!("Default case, x = {:?}", x),
  }
  println!("at the end: x = {:?}, y = {:?}", x, y);
}

// fn print_coordinate(&(x, y): &(i32, i32)) {
//   println!("x y is {} {}", x, y)
// }
