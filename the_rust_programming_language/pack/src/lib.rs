// mod front_of_house {
//   pub mod hosting {
//     pub fn add_white_list() {
//       println!("hello world");
//     }

//     fn seat_to_table() {}
//   }

//   mod serving {
//     fn take_order() {}
//     fn serve_order() {}
//     fn take_payment() {}
//   }
// }

// pub fn eat_at_restaurant() {
//   crate::front_of_house::hosting::add_white_list();
//   front_of_house::hosting::add_white_list();
// }

// // ! 使用 super 起始的相对路径
// fn serve_order() {}

// mod back_of_house {
//   // fn fix_incorrect_order() {
//   //   cook_order();
//   //   super::serve_order();
//   // }

//   // fn cook_order() {}
//   pub struct Breakfast {
//     pub toast: String,
//     seasonal_fruit: String,
//   }

//   impl Breakfast {
//     pub fn summer(toast: &str) -> Breakfast {
//       Breakfast {
//         toast: String::from(toast),
//         seasonal_fruit: String::from("aaa"),
//       }
//     }
//   }

//   pub enum Appetizer {
//     Soup,
//     Salad,
//   }
// }

// use crate::front_of_house::hosting;

// pub fn eat_at_restaurant() {
//   // let mut meal = back_of_house::Breakfast::summer("Rye");
//   // meal.toast = String::from("Wheat");
//   // println!("I'd like {} toast", meal.toast);

//   // let order1 = back_of_house::Appetizer::Soup;
//   // let order2 = back_of_house::Appetizer::Salad;

//   hosting::add_white_list();
//   hosting::add_white_list();
// }

// mod front_of_house {
//   pub mod hosting {
//       pub fn add_to_waitlist() {}
//   }
// }

// use self::front_of_house::hosting;

// pub fn eat_at_restaurant() {
//   hosting::add_to_waitlist();
// }

// ! 创建惯用的 use 路径

// mod front_of_house {
//   pub mod hosting {
//     pub fn add_to_waitlist() {}
//   }
// }

// use crate::front_of_house::hosting::add_to_waitlist;

// pub fn eat_at_restaurant() {
//   add_to_waitlist();
//   add_to_waitlist();
//   add_to_waitlist();
// }

// ! 使用 pub use 重导出名称
// mod front_of_house {
//   pub mod hosting {
//     pub fn add_to_waitlist() {}
//   }
// }

// pub use crate::front_of_house::hosting;

mod front_of_house;

pub use crate::front_of_house::hosting;

pub fn eat_restaurant() {
  hosting::add_to_waitlist();
}
