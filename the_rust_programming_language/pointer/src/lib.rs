// ! 内部可变性的用例：mock 对象

use std::cell::RefCell;
use std::rc::Rc;

pub trait Messager {
  fn send(&self, msg: &str);
}

pub struct LimitTracker<'a, T: Messager> {
  messager: &'a T,
  value: usize,
  max: usize,
}

impl<'a, T> LimitTracker<'a, T>
where
  T: Messager,
{
  pub fn new(messager: &T, max: usize) -> LimitTracker<T> {
    LimitTracker {
      messager,
      max,
      value: 0,
    }
  }

  pub fn set_value(&mut self, value: usize) {
    self.value = value;
    let percentage_of_max = self.value as f64 / self.max as f64;
    if percentage_of_max >= 1.0 {
      self.messager.send("Error: You are over your quota!");
    } else if percentage_of_max >= 0.9 {
      self
        .messager
        .send("Urgent warning: You've used up over 90% of your quota!");
    } else if percentage_of_max >= 0.75 {
      self
        .messager
        .send("Warning: You've used up over 75% of your quota!");
    }
  }
}

#[cfg(test)]
mod tests {
  use super::*;
  use std::cell::RefCell;

  struct MockMessager {
    sent_messages: RefCell<Vec<String>>,
  }

  impl MockMessager {
    fn new() -> MockMessager {
      MockMessager {
        sent_messages: RefCell::new(vec![]),
      }
    }
  }

  impl Messager for MockMessager {
    fn send(&self, message: &str) {
      // let mut one_borrow = self.sent_messages.borrow_mut();
      // let mut two_borrwo = self.sent_messages.borrow_mut();
      self.sent_messages.borrow_mut().push(String::from(message));
    }
  }

  #[test]
  fn it_sends_an_over_75_percent_warning_message() {
    let mock_messager = MockMessager::new();
    let mut limit_tracker = LimitTracker::new(&mock_messager, 100);
    limit_tracker.set_value(80);
    assert_eq!(mock_messager.sent_messages.borrow().len(), 1);
  }
}

// ! RefCell<T> 在运行时记录借用
// * borrow 方法返回 Ref<T> 类型的智能指针，borrow_mut 方法返回 RefMut<T> 类型的智能指针

// ! RefCell<T> 在任何时候只允许有多个不可变借用或一个可变借用

// ! 结合 Rc<T> 和 RefCell<T> 来拥有多个可变数据所有者




