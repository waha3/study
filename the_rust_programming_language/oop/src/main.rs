fn main() {
  // ! 面向对象语言的特征
  // pub struct AveragedCollection {
  //   list: Vec<i32>,
  //   average: f64,
  // }

  // impl AveragedCollection {
  //   fn add(&mut self, value: i32) {
  //     self.list.push(value);
  //     self.update_average();
  //   }

  //   fn remove(&mut self) -> Option<i32> {
  //     match self.list.pop() {
  //       Some(v) => {
  //         self.update_average();
  //         Some(v)
  //       }
  //       None => None,
  //     }
  //   }
  //   fn average(&self) -> f64 {
  //     self.average
  //   }
  //   fn update_average(&mut self) {
  //     let total: i32 = self.list.iter().sum();
  //     self.average = total as f64 / self.list.len() as f64
  //   }
  // }
  // ! 对象包含数据和行为
  // ! 封装隐藏了实现细节

  // ! 继承，作为类型系统与代码共享
  // * 继承（Inheritance）是一个很多编程语言都提供的机制，一个对象可以定义为继承另一个对象的定义，这使其可以获得父对象的数据和行为，而无需重新定义
  // * 多态（Polymorphism）很多人将多态描述为继承的同义词。不过它是一个有关可以用于多种类型的代码的更广泛的概念。对于继承来说，这些类型通常是子类。 Rust 则通过泛型来对不同的可能类型进行抽象，
  // * 并通过 trait bounds 对这些类型所必须提供的内容施加约束。这有时被称为 bounded parametric polymorphism

  // 顾及不同类型值的 trait 对象
  // ! 定义通用行为的 trait
  // pub trait Draw {
  //   fn draw(&self);
  // }

  // pub struct Screen {
  //   components: Vec<Box<dyn Draw>>,
  // }

  // impl Screen {
  //   pub fn run(&self) {
  //     for component in self.components.iter() {
  //       component.draw();
  //     }
  //   }
  // }

  // pub trait Draw {
  //   fn draw(&self);
  // }

  // pub struct Screen<T: Draw> {
  //   components: Vec<T>,
  // }

  // impl<T> Screen<T>
  // where
  //   T: Draw,
  // {
  //   pub fn run(&self) {
  //     for component in self.components.iter() {
  //       component.draw();
  //     }
  //   }
  // }

  // // ! 实现 trait
  // pub struct Button {
  //   pub width: u32,
  //   pub height: u32,
  //   pub label: String,
  // }

  // impl Draw for Button {
  //   fn draw(&self) {}
  // }

  // ! 实现 trait

  // ! trait对象需要类型安全
  // * 返回值不是 Self
  // * 没有泛型类型的参数

  // pub trait Clone {
  //   fn clone(&self) -> Self;
  // }

  // pub struct Screen {
  //   pub components: Vec<Box<dyn Clone>>,
  // }

  // ! 面向对象设计模式的实现
  // * 状态模式（state pattern）是一个面向对象设计模式
}
