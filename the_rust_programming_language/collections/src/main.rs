use std::{fmt::Debug, vec};

fn main() {
  // ! 使用 Vector 储存列表

  // ! 新建 vector
  // let vec: Vec<i32> = Vec::new();

  // // vec! 宏
  // let vec2 = vec![1, 2, 3];

  // println!("vec {:?} {:?}", vec, vec2);

  // ! 更新 vector
  // let mut vec = Vec::new();
  // vec.push(1);
  // vec.push(2);

  // ! 读取 vector 的元素
  // let vec = vec![1, 2, 3, 4, 5];
  // let third = &vec[2];
  // println!("third ele is {}", third);

  // match vec.get(2) {
  //   Some(third) => println!("this is {}", third),
  //   None => println!("is None"),
  // }

  // let v = vec![1, 2, 3, 4, 5];
  // let does_not_exist = &v[100];

  // let does_not_exist_2 = v.get(100);
  // println!("does not exist is {:?}", does_not_exist_2);

  // let mut v = vec![1,2,3,4];
  // let first = &v[0];
  // v.push(5);
  // println!("first ele is {}", first);

  // ! 遍历 vector 中的元素

  // let v = vec![1, 3, 6, 9];
  // for i in &v {
  //   println!("vec i is {}", i);
  // }

  // let mut v = vec![1, 3, 6, 9];
  // for i in &mut v {
  //   *i += 50;
  // }
  // println!("v is {:?}", v);

  // ! 使用枚举来储存多种类型
  // #[derive(Debug)]
  // enum SpreadsheetCell {
  //   Int(i32),
  //   Float(f64),
  //   Text(String),
  // }

  // let v = vec![
  //   SpreadsheetCell::Int(10),
  //   SpreadsheetCell::Float(10.01),
  //   SpreadsheetCell::Text(String::from("hello world")),
  // ];

  // println!("v is {:?}", v);

  // ! 使用字符串储存 UTF-8 编码的文本
  // let mut s = String::new();
  // let data = "initial content";
  // let s = s.to_string();
  // let s = data.to_string();
  // let hello = String::from("السلام عليكم");
  // println!("len is {}", hello.len());

  // ! 更新字符串
  let s1 = String::from("hello");
  let s2 = String::from(" world");
  let s3 = s1 + &s2;
  println!("s3 is {}", s3);
}
