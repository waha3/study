// use std::collections::HashMap;
// use std::thread;
// use std::time::Duration;

fn main() {
  // ! 闭包：可以捕获环境的匿名函数

  // ! 使用闭包创建行为的抽象
  // simulated_expensive_calculation(10);
  // generate_workout(30, 3);
  // generate_workout_with_closure(30, 3);

  // ! 闭包类型推断和注解
  // let closure = |m: u32| -> u32 {
  //   println!("calculating slowly...");
  //   thread::sleep(Duration::from_secs(2));
  //   m
  // };

  // ! 尝试调用一个被推断为两个不同类型的闭包
  // let example_closure = |x| x;
  // let s = example_closure(String::from("hello"));
  // let n = example_closure(5);

  // ! 使用带有泛型和 Fn trait 的闭包
  // generate_workout_with_closure_struct(20, 3);

  // let x = vec![1, 2, 3];
  // let equal_to_x = move |z| z == x;
  // let y = vec![1, 2, 3];
  // assert!(equal_to_x(y));

  // ! 使用迭代器处理元素序列
  // let v1 = vec![1, 2, 3];
  // let iter1 = v1.iter();
  // for i in iter1 {
  //   println!("get i is {}", i)
  // }

  // pub trait Iterator {
  //   // 关联类型
  //   type Item;

  //   fn next(&mut self) -> Option<Self::Item>;
  // }

  // ! 消费迭代器的方法

  // ! 产生其他迭代器的方法
  let v1 = vec![1, 2, 3];
  let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();
  // println!("x is {:?}", v2);
  assert_eq!(v2, vec![2, 3, 4]);
}

// fn simulated_expensive_calculation(intensity: u32) -> u32 {
//   println!("calculate slowy");
//   thread::sleep(Duration::from_secs(2));
//   intensity
// }

// fn generate_workout(intensity: u32, random_number: u32) {
//   // 这一步在不需要用到expensive_result的时候也会执行
//   let expensive_result = simulated_expensive_calculation(intensity);
//   if intensity < 25 {
//     println!("Today, do {} pushups!", expensive_result);
//     println!("Next, do {} situps!", expensive_result);
//   } else {
//     if random_number == 3 {
//       println!("Take a break today! Remember to stay hydrated!");
//     } else {
//       println!("Today, run for {} minutes!", expensive_result);
//     }
//   }
// }

// fn generate_workout_with_closure(intensity: u32, random_number: u32) {
//   // ! 重构使用闭包储存代码
//   let expensive_closure = |num| {
//     println!("calculating slowly...");
//     thread::sleep(Duration::from_secs(2));
//     num
//   };

//   if intensity < 25 {
//     println!("Today, do {} pushups!", expensive_closure(intensity));
//     println!("Next, do {} situps!", expensive_closure(intensity));
//   } else {
//     if random_number == 3 {
//       println!("Take a break today! Remember to stay hydrated!");
//     } else {
//       println!("Today, run for {} minutes!", expensive_closure(intensity));
//     }
//   }
// }

// struct Cacher<T>
// where
//   T: Fn(u32) -> u32,
// {
//   calculation: T,
//   value: Option<u32>,
// }

// impl<T> Cacher<T>
// where
//   T: Fn(u32) -> u32,
// {
//   fn new(calculation: T) -> Cacher<T> {
//     Cacher {
//       calculation,
//       value: None,
//     }
//   }

//   fn value(&mut self, arg: u32) -> u32 {
//     match self.value {
//       None => {
//         let v = (self.calculation)(arg);
//         self.value = Some(v);
//         v
//       }
//       Some(v) => v,
//     }
//   }
// }

// fn generate_workout_with_closure_struct(intensity: u32, random_number: u32) {
//   // ! 重构使用闭包储存代码
//   let mut expensive_closure = Cacher::new(|num| {
//     println!("calculating slowly...");
//     thread::sleep(Duration::from_secs(2));
//     num
//   });

//   if intensity < 25 {
//     println!("Today, do {} pushups!", expensive_closure.value(intensity));
//     println!("Next, do {} situps!", expensive_closure.value(intensity));
//   } else {
//     if random_number == 3 {
//       println!("Take a break today! Remember to stay hydrated!");
//     } else {
//       println!(
//         "Today, run for {} minutes!",
//         expensive_closure.value(intensity)
//       );
//     }
//   }
// }

// ! Cacher 实现的限制
// struct CacherV2<T>
// where
//   T: Fn(u32) -> u32,
// {
//   // value: Option<u32>,
//   calculation: T,
//   map: HashMap<u32, u32>,
// }

// impl<T> CacherV2<T>
// where
//   T: Fn(u32) -> u32,
// {
//   fn new(calculation: T) -> CacherV2<T> {
//     CacherV2 {
//       // value: None,
//       map: HashMap::new(),
//       calculation,
//     }
//   }

//   fn value(&mut self, arg: u32) -> u32 {
//     // let v = (self.calculation)(arg);
//     // (self.map).entry(arg).or_insert(v)
//   }
// }

// #[test]
// fn iter_sum() {
//   let v1 = vec![1, 2, 3];
//   let v1_iter = v1.iter();
//   let total: u32 = v1_iter.sum();
//   assert_eq!(total, 6);
// }

