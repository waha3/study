// pub trait Summary {
//   fn summarize(&self) -> String;
// }

// use std::fmt::format;

// ! 为类型实现 trait
pub struct NewArticle {
  pub headline: String,
  pub location: String,
  pub author: String,
  pub content: String,
}

// impl Summary for NewArticle {
//   fn summarize(&self) -> String {
//     format!("{}, by {} ({})", self.headline, self.author, self.location)
//   }
// }

pub struct Tweet {
  pub username: String,
  pub content: String,
  pub reply: bool,
  pub retweet: bool,
}

// impl Summary for Tweet {
//   fn summarize(&self) -> String {
//     format!("{}: {}", self.username, self.content)
//   }
// }

// ! trait 默认实现

// pub trait Summary {
//   fn summarize(&self) -> String {
//     String::from("read more.")
//   }
// }

// pub trait Summary {
//   fn summarize_author(&self) -> String;
//   fn summarize(&self) -> String {
//     format!("read more from {} ...", self.summarize_author())
//   }
// }

// impl Summary for Tweet {
//   fn summarize_author(&self) -> String {
//     format!("@{}", self.username)
//   }
// }


// ! 生命周期省略（Lifetime Elision)
// fn first_word(s: &str) -> &str{
//   let bytes = s.as_bytes();

//   for (i, &item) in bytes.iter().enumerate() {
//     if item == b' ' {
//       return &s[0..i];
//     }
//   }
//   &s[..]
// }


// ! 方法定义中的生命周期注解
