// #[derive(Debug)]
// struct Rectangle {
//   width: u32,
//   height: u32,
// }

// impl Rectangle {
//   fn can_hold(&self, other: &Rectangle) -> bool {
//     self.width > other.width && self.height > other.height
//   }
// }

#[cfg(test)]
mod tests {
  // #[test]
  // fn it_works() {
  //   let result = 2 + 2;
  //   assert_eq!(result, 4);
  // }

  // #[test]
  // fn exploration() {
  //   assert_eq!(2 + 2, 4);
  // }

  // #[test]
  // fn another() {
  //   panic!("make this test fail!");
  // }

  // ! 使用 assert! 宏来检查结果
  // use super::*;

  // #[test]
  // fn larger_can_hold_small() {
  //   let larger = Rectangle {
  //     width: 8,
  //     height: 7,
  //   };
  //   let smaller = Rectangle {
  //     width: 5,
  //     height: 1,
  //   };

  //   assert!(larger.can_hold(&smaller))
  // }

  // ! 使用 assert_eq! 和 assert_ne! 宏来测试相等
  // #[test]
  // fn it_adds_two() {
  //   assert_eq!(4, add_two(2));
  //   assert_ne!(5, add_two(10));
  // }

  // ! 自定义失败信息

  // ! 使用 should_panic 检查 panic
  // #[test]
  // #[should_panic]
  // fn greater_than_100() {
  //   Guess::new(200);
  // }

  // ! 将 Result<T, E> 用于测试
  // #[test]
  // fn it_works() -> Result<(), String> {
  //   if 2 + 2 == 3 {
  //     Ok(())
  //   } else {
  //     Err(String::from("it not works"))
  //   }
  // }


  // ! 控制测试如何运行

  // ! 并行或连续的运行测试
}

// pub fn add_two(a: i32) -> i32 {
//   a + 2
// }

// struct Guess {
//   value: i32,
// }

// impl Guess {
//   pub fn new(value: i32) -> Guess {
//     if value < 1 || value > 100 {
//       panic!("Guess value must be between 1 and 100, got {}.", value);
//     }
//     Guess { value }
//   }
// }
