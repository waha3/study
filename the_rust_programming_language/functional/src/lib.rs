// #[derive(PartialEq, Debug)]
// struct Shoe {
//   size: u32,
//   style: String,
// }

// fn shoes_in_size(shoes: Vec<Shoe>, shoe_size: u32) -> Vec<Shoe> {
//   shoes.into_iter().filter(|s| s.size == shoe_size).collect()
// }

// #[cfg(test)]
// mod tests {
//   use super::*;

//   #[test]
//   fn filters_by_size() {
//     let shoes = vec![
//       Shoe {
//         size: 10,
//         style: String::from("sneaker"),
//       },
//       Shoe {
//         size: 13,
//         style: String::from("sandal"),
//       },
//       Shoe {
//         size: 10,
//         style: String::from("boot"),
//       },
//     ];

//     let in_my_size = shoes_in_size(shoes, 10);

//     assert_eq!(
//       in_my_size,
//       vec![
//         Shoe {
//           size: 10,
//           style: String::from("sneaker")
//         },
//         Shoe {
//           size: 10,
//           style: String::from("boot")
//         },
//       ]
//     );
//   }

//   #[test]
//   fn calling_next_directly() {
//     let mut counter = Counter::new();

//     assert_eq!(counter.next(), Some(1));
//     assert_eq!(counter.next(), Some(2));
//     assert_eq!(counter.next(), Some(3));
//     assert_eq!(counter.next(), Some(4));
//     assert_eq!(counter.next(), Some(5));
//     assert_eq!(counter.next(), None);
//   }
// }

// ! 实现 Iterator trait 来创建自定义迭代器
// struct Counter {
//   count: u32,
// }

// impl Counter {
//   fn new() -> Counter {
//     Counter { count: 0 }
//   }
// }

// impl Iterator for Counter {
//   type Item = u32;

//   fn next(&mut self) -> Option<Self::Item> {
//     if self.count < 5 {
//       self.count += 1;
//       Some(self.count)
//     } else {
//       None
//     }
//   }
// }

// ! 使用自定义迭代器中其他 Iterator trait 方法
