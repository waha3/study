use std::collections::HashMap;

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

  // let mut s = String::from("hello");
  // let s1 = "aaaa";
  // s.push_str(" world");
  // s.push_str(s1);
  // s.push('在');
  // println!("s is {}, s1 is {}", s, s1);

  // ! 使用 + 运算符或 format! 宏拼接字符串
  // let s1 = String::from("hello");
  // let s2 = String::from(" world");
  // let s3 = s1 + &s2;
  // println!("s3 is {}", s3);

  // let s1 = String::from("tic");
  // let s2 = String::from("tac");
  // let s3 = String::from("toe");
  // let s = format!("{}-{}-{}", s1, s2, s3);
  // println!("s is {}", s);

  // ! 索引字符串
  // let s = String::from("hello");
  // let h = &s[1];

  // ! 字节、标量值和字形簇

  // ! 字符串 slice
  // let hello = "Здравствуйте";
  // let s = &hello[0..3];
  // println!("s is {}", s);

  // ! 遍历字符串的方法
  // let s = "नमस्ते";

  // for c in s.chars() {
  //   println!("{}", c);
  // }

  // for b in s.bytes() {
  //   println!("{}", b);
  // }

  // ! 使用 Hash Map 储存键值对
  // let mut scores = HashMap::new();
  // scores.insert("aa", 1);

  // let teams = vec![String::from("yellow"), String::from("blue")];
  // let scores = vec![10, 50];
  // let res: HashMap<_, _> = teams.into_iter().zip(scores.into_iter()).collect();
  // println!("res is {:?}", res);

  // ! 哈希 map 和所有权

  // ! 更新哈希 map

  // ! 覆盖一个值
  // let mut scores = HashMap::new();
  // scores.insert(String::from("blue"), 11);
  // scores.insert(String::from("blue"), 22);
  // println!("scores is {:?}", {});

  // ! 只在键没有对应值时插入
  // let mut scores = HashMap::new();
  // scores.insert(String::from("blue"), 11);
  // scores.entry(String::from("yellow")).or_insert(100);
  // scores.entry(String::from("blue")).or_insert(200);
  // println!("scores is {:?}", scores);

  // ! 根据旧值更新一个值
  // let s1 = "hello world wonderful world";
  // let mut map = HashMap::new();
  // for s in s1.split_whitespace() {
  //   let count = map.entry(s).or_insert(0);
  //   *count += 1;
  // }
  // println!("map is {:?}", map);

  // ! 哈希函数
}
