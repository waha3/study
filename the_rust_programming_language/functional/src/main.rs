use std::thread;
use std::time::Duration;

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
