// use crate::List2::{Cons, Nil};

// ! Box 允许创建递归类型
// ! cons list 的更多内容
// enum List {
//   Cons(i32, List),
//   Nil,
// }

// #[derive(Debug)]
// enum List2 {
//   Cons(i32, Box<List2>),
//   Nil,
// }

fn main() {
  // ! 智能指针
  // 指针 （pointer）是一个包含内存地址的变量的通用概念
  // * 智能指针（smart pointers）是一类数据结构，他们的表现类似指针，但是也拥有额外的元数据和功能
  // 在 Rust 中，普通引用和智能指针的一个额外的区别是引用是一类只借用数据的指针；相反，在大部分情况下，智能指针 拥有 他们指向的数据
  // 智能指针通常使用结构体实现。智能指针区别于常规结构体的显著特性在于其实现了 Deref 和 Drop trait

  // * Box<T>，用于在堆上分配值
  // * Rc<T>，一个引用计数类型，其数据可以有多个所有者
  // * Ref<T> 和 RefMut<T>，通过 RefCell<T> 访问。（ RefCell<T> 是一个在运行时而不是在编译时执行借用规则的类型）

  // ! 使用Box<T>指向堆上的数据

  // let b = Box::new(5);
  // println!("box is {}", b);

  // let list = Cons(1, Cons(2, Cons(3, Nil)));

  // ! 计算非递归类型的大小
  // let list2 = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
  // println!("list2 is {:?}", list2);

  // ! 通过 Deref trait 将智能指针当作常规引用处理
  // * 实现 Deref trait 允许我们重载 解引用运算符

  // ! 通过解引用运算符追踪指针的值
  // let x = 5;
  // let y = &x;
  // assert_eq!(5, x);
  // assert_eq!(5, *y);

  // ! 像引用一样使用 Box<T>
  // let x = 5;
  // let y = Box::new(x);
  // assert_eq!(5, *y);

  // ! 自定义智能指针

  // struct Mybox<T>(T);

  // impl<T> Mybox<T> {
  //   fn new(x: T) -> Mybox<T> {
  //     Mybox(x)
  //   }
  // }

  // impl<T> Deref for Mybox<T> {
  //   type Target = T;

  //   fn deref(&self) -> &Self::Target {
  //     &self.0
  //   }
  // }
  // let x = 5;
  // let y = Mybox::new(x);
  // assert_eq!(x, *y);

  // ! Deref 强制转换
  // struct Mybox<T>(T);

  // impl<T> Mybox<T> {
  //   fn new(x: T) -> Mybox<T> {
  //     Mybox(x)
  //   }
  // }

  // impl<T> Deref for Mybox<T> {
  //   type Target = T;

  //   fn deref(&self) -> &Self::Target {
  //     &self.0
  //   }
  // }

  // let s = Mybox::new(String::from("world"));
  // // Rust 会分析这些类型并使用任意多次 Deref::deref 调用以获得匹配参数的类型
  // hello(&s);

  // ! Deref 强制转换如何与可变性交互
  // Rust 在发现类型和 trait 实现满足三种情况时会进行 Deref 强制转换
  // T: Deref<Target=U> 时从 &T 到 &U。
  // T: DerefMut<Target=U> 时从 &mut T 到 &mut U。
  // T: Deref<Target=U> 时从 &mut T 到 &U。

  // ! 使用 Drop Trait 运行清理代码
  #[derive(Debug)]
  struct CustomSmartPointer {
    data: String,
  }

  impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
      println!("Dropping CustomSmartPointer with data `{}`!", self.data);
    }
  }

  let a = CustomSmartPointer {
    data: String::from("hello"),
  };
  let b = CustomSmartPointer {
    data: String::from("world"),
  };
  println!("custom pointer created {:?} {:?}", a, b);
}

// fn hello(s: &str) {
//   println!("hello {}", s);
// }
