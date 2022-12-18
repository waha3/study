use std::sync::{mpsc, Arc};
use std::thread::{self, JoinHandle};
// use std::time::Duration;
use std::rc::Rc;
use std::sync::Mutex;

fn main() {
  // ! 使用线程同时运行代码
  // * 在大部分现代操作系统中，已执行程序的代码在一个 进程（process）中运行，操作系统则负责管理多个进程。
  // * 在程序内部，也可以拥有多个同时运行的独立部分。运行这些独立部分的功能被称为 线程（threads）

  // ! 使用 spawn 创建新线程
  // thread::spawn(|| {
  //   for i in 1..10 {
  //     println!("{} from spawn thread", i);
  //     thread::sleep(Duration::from_millis(10));
  //   }
  // });

  // for i in 1..5 {
  //   println!("{} from main thread", i);
  //   thread::sleep(Duration::from_millis(10));
  // }

  // ! 使用 join 等待所有线程结束
  // * 会阻塞当前线程直到 handle 所代表的线程结束。阻塞（Blocking） 线程意味着阻止该线程执行工作或退出
  // let handle = thread::spawn(|| {
  //   for i in 1..10 {
  //     println!("{} from spawn thread", i);
  //     thread::sleep(Duration::from_millis(10));
  //   }
  // });

  // handle.join().unwrap();

  // for i in 1..10 {
  //   println!("{} from main thread", i);
  //   thread::sleep(Duration::from_millis(10));
  // }

  // handle.join().unwrap();

  // ! 线程与 move 闭包
  // let v = vec![1, 2, 3];
  // let handle = thread::spawn(|| {
  //   println!("v is {:?}", v);
  // });
  // drop(v);
  // handle.join().unwrap();

  // let v = vec![1, 2, 3];
  // let handle = thread::spawn(move || {
  //   println!("v is {:?}", v);
  // });
  // handle.join().unwrap();

  // ! 使用消息传递在线程间传送数据
  // ! Rust 中一个实现消息传递并发的主要工具是 信道（channel）
  // * 编程中的信息渠道（信道）有两部分组成，一个发送者（transmitter）和一个接收者（receiver）
  // * 当发送者或接收者任一被丢弃时可以认为信道被 关闭（closed）了

  // let (tx, rx) = mpsc::channel();
  // thread::spawn(move || {
  //   let s = String::from("hello");
  //   tx.send(s).unwrap();
  //   // 所有权已经移交
  //   // println!("s is {}", s);
  // });
  // let receiver = rx.recv().unwrap();
  // println!("receiver is {}", receiver);

  // ! 信道与所有权转移

  // ! 发送多个值并观察接收者的等待
  // let (tx, rx) = mpsc::channel();
  // thread::spawn(move || {
  //   let v = vec![
  //     String::from("hi"),
  //     String::from("from"),
  //     String::from("the"),
  //     String::from("thread"),
  //   ];

  //   for i in v {
  //     tx.send(i).unwrap();
  //     thread::sleep(Duration::from_millis(100));
  //   }
  // });

  // for j in rx {
  //   println!("recv is {}", j)
  // }

  // ! 通过克隆发送者来创建多个生产者
  // let (tx, rx) = mpsc::channel();
  // let tx_1 = tx.clone();

  // thread::spawn(move || {
  //   let v = vec![
  //     String::from("hi"),
  //     String::from("from"),
  //     String::from("the"),
  //     String::from("thread"),
  //   ];

  //   for i in v {
  //     tx_1.send(i).unwrap();
  //     thread::sleep(Duration::from_millis(1));
  //   }
  // });

  // thread::spawn(move || {
  //   let v = vec![
  //     String::from("hi"),
  //     String::from("from"),
  //     String::from("the"),
  //     String::from("thread"),
  //   ];

  //   for i in v {
  //     tx.send(i).unwrap();
  //     thread::sleep(Duration::from_millis(1));
  //   }
  // });

  // for j in rx {
  //   println!("j is {}", j);
  // }

  // ! 共享状态并发
  // ! 互斥器一次只允许一个线程访问数据
  // * 互斥器（mutex）是 mutual exclusion 的缩写，也就是说，任意时刻，其只允许一个线程访问某些数据
  // * 为了访问互斥器中的数据，线程首先需要通过获取互斥器的 锁（lock）来表明其希望访问数据。
  // * 锁是一个作为互斥器一部分的数据结构，它记录谁有数据的排他访问权。因此，我们描述互斥器为通过锁系统 保护（guarding）其数据

  // ! Mutex<T>的 API

  // let v = Mutex::new(5);
  // {
  //   let mut num = v.lock().unwrap();
  //   *num = 10;
  // }
  // println!("v is {:?}", v);

  // ! 在线程间共享 Mutex<T>
  // let counter = Mutex::new(5);
  // let mut handles: Vec<JoinHandle<()>> = vec![];
  // for _ in 0..10 {
  //   let handle = thread::spawn(move || {
  //     let mut m = counter.lock().unwrap();
  //     *m += 1;
  //   });
  //   handles.push(handle);
  // }

  // for handle in handles {
  //   handle.join().unwrap();
  // }
  // println!("counter is {}", *counter.lock().unwrap());

  // ! 多线程和多所有权
  // let counter = Rc::new(Mutex::new(0));
  // let mut handles: Vec<JoinHandle<()>> = vec![];
  // for _ in 0..10 {
  //   let counter = Rc::clone(&counter);
  //   let handle = thread::spawn(move || {
  //     let mut m = counter.lock().unwrap();
  //     *m += 1;
  //   });
  //   handles.push(handle);
  // }

  // for handle in handles {
  //   handle.join().unwrap();
  // }
  // println!("counter is {}", *counter.lock().unwrap());

  // ! 原子引用计数 Arc<T>
  // let counter = Arc::new(Mutex::new(0));
  // let mut handles: Vec<JoinHandle<()>> = vec![];
  // for _ in 0..10 {
  //   let counter = Arc::clone(&counter);
  //   let handle = thread::spawn(move || {
  //     let mut m = counter.lock().unwrap();
  //     *m += 1;
  //   });
  //   handles.push(handle);
  // }

  // for handle in handles {
  //   handle.join().unwrap();
  // }
  // println!("counter is {}", *counter.lock().unwrap());


  // ! 使用 Sync 和 Send trait 的可扩展并发
  // * 两个并发概念是内嵌于语言中的：std::marker 中的 Sync 和 Send trait

  // ! 通过 Send 允许在线程间转移所有权
  // * Send 标记 trait 表明实现了 Send 的类型值的所有权可以在线程间传送。几乎所有的 Rust 类型都是Send 的，不过有一些例外，包括 Rc<T>
  // * 任何完全由 Send 的类型组成的类型也会自动被标记为 Send。几乎所有基本类型都是 Send 的，除了第十九章将会讨论的裸指针（raw pointer）

  // ! Sync 允许多线程访问
  // ! 手动实现 Send 和 Sync 是不安全的
}
